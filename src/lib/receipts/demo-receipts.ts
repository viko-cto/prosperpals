import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  calculateDailySpendingPower,
  createGoldieInsight
} from "../finance/first-value.ts";
import { moneyEventSchema } from "../../modules/finance/contracts.ts";

const DEFAULT_RUNTIME_DIR = path.join(process.cwd(), ".prosperpals-runtime");
const DEFAULT_RECEIPT_PATH = path.join(DEFAULT_RUNTIME_DIR, "demo-receipts.jsonl");
const DEFAULT_RECEIPT_ARTIFACTS_PATH = path.join(DEFAULT_RUNTIME_DIR, "demo-receipt-artifacts.jsonl");
const DEFAULT_RECEIPT_UPLOAD_DIR = path.join(DEFAULT_RUNTIME_DIR, "receipt-uploads");
const REVIEW_THRESHOLD = 0.85;

const receiptArtifactRecordSchema = z.object({
  kind: z.literal("receipt_artifact"),
  artifactId: z.string().uuid(),
  userId: z.string().uuid(),
  occurredAt: z.string().datetime(),
  requestId: z.string().min(6),
  traceId: z.string().uuid(),
  storageMode: z.enum(["uploaded", "simulated"]),
  storagePath: z.string().min(1),
  fileName: z.string().min(1).max(180),
  mimeType: z.string().min(3).max(120),
  sizeBytes: z.number().int().nonnegative(),
  parserProvider: z.string().min(2).max(120),
  parserModel: z.string().min(2).max(120),
  providerReference: z.string().min(4).max(180),
  sourceHint: z.string().min(2).max(160)
});

const receiptCandidateRecordSchema = z.object({
  kind: z.literal("receipt_candidate"),
  candidateId: z.string().uuid(),
  artifactId: z.string().uuid(),
  userId: z.string().uuid(),
  occurredAt: z.string().datetime(),
  requestId: z.string().min(6),
  traceId: z.string().uuid(),
  merchantLabel: z.string().min(1).max(120),
  amountMinor: z.number().int().positive(),
  currency: z.string().length(3),
  categoryId: z.string().min(1).max(80),
  confidenceScore: z.number().min(0).max(1),
  confidenceLabel: z.string().min(2).max(80),
  parseStatus: z.enum(["parsed", "confirmed"]),
  reviewStatus: z.enum(["needs_review", "ready_to_confirm", "confirmed"]),
  sourceHint: z.string().min(2).max(160),
  reviewMessage: z.string().min(1).max(240)
});

const receiptFailureRecordSchema = z.object({
  kind: z.literal("receipt_failure"),
  id: z.string().uuid(),
  artifactId: z.string().uuid(),
  userId: z.string().uuid(),
  occurredAt: z.string().datetime(),
  requestId: z.string().min(6),
  traceId: z.string().uuid(),
  failureStage: z.enum(["upload_validation", "provider_parse"]),
  failureCode: z.string().min(2).max(80),
  recoveryAction: z.string().min(2).max(240),
  userMessage: z.string().min(1).max(240),
  providerReference: z.string().min(4).max(180),
  storageMode: z.enum(["uploaded", "simulated"])
});

const receiptConfirmationRecordSchema = z.object({
  kind: z.literal("receipt_confirmation"),
  id: z.string().uuid(),
  candidateId: z.string().uuid(),
  artifactId: z.string().uuid(),
  moneyEventId: z.string().uuid(),
  userId: z.string().uuid(),
  occurredAt: z.string().datetime(),
  requestId: z.string().min(6),
  traceId: z.string().uuid(),
  merchantLabel: z.string().min(1).max(120),
  amountMinor: z.number().int().positive(),
  currency: z.string().length(3),
  categoryId: z.string().min(1).max(80),
  confidenceScore: z.number().min(0).max(1),
  correctionApplied: z.boolean(),
  explanation: z.string().min(1).max(320)
});

const receiptRecordSchema = z.discriminatedUnion("kind", [
  receiptCandidateRecordSchema,
  receiptFailureRecordSchema,
  receiptConfirmationRecordSchema
]);

export type ReceiptArtifactRecord = z.infer<typeof receiptArtifactRecordSchema>;
export type ReceiptCandidateRecord = z.infer<typeof receiptCandidateRecordSchema>;
export type ReceiptFailureRecord = z.infer<typeof receiptFailureRecordSchema>;
export type ReceiptConfirmationRecord = z.infer<typeof receiptConfirmationRecordSchema>;
export type ReceiptRecord = z.infer<typeof receiptRecordSchema>;

export type ReceiptReviewState = {
  sinkPath: string;
  artifactSinkPath: string;
  pendingCandidate?: ReceiptCandidateRecord;
  latestArtifact?: ReceiptArtifactRecord;
  latestFailure?: ReceiptFailureRecord;
  latestConfirmed?: ReceiptConfirmationRecord & {
    dailySpendingPowerMinor: number;
    headline: string;
    body: string;
  };
  recentCandidates: ReceiptCandidateRecord[];
  confirmationCount: number;
  failureCount: number;
};

type ReceiptCaptureResult =
  | { status: "candidate"; candidate: ReceiptCandidateRecord; artifact: ReceiptArtifactRecord }
  | { status: "failed"; failure: ReceiptFailureRecord; artifact: ReceiptArtifactRecord };

type ReceiptConfirmationResult = {
  candidate: ReceiptCandidateRecord;
  confirmation: ReceiptConfirmationRecord;
  moneyEvent: z.infer<typeof moneyEventSchema>;
  insight: ReturnType<typeof createGoldieInsight> & {
    dailySpendingPowerMinor: number;
    currency: string;
  };
  alreadyConfirmed: boolean;
};

function getReceiptPath() {
  return process.env.PROSPERPALS_DEMO_RECEIPT_PATH ?? DEFAULT_RECEIPT_PATH;
}

function getReceiptArtifactsPath() {
  return process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH ?? DEFAULT_RECEIPT_ARTIFACTS_PATH;
}

function getReceiptUploadDir() {
  return process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR ?? DEFAULT_RECEIPT_UPLOAD_DIR;
}

async function ensureReceiptDir() {
  await fs.mkdir(path.dirname(getReceiptPath()), { recursive: true });
}

async function ensureReceiptArtifactDir() {
  await fs.mkdir(path.dirname(getReceiptArtifactsPath()), { recursive: true });
  await fs.mkdir(getReceiptUploadDir(), { recursive: true });
}

function getConfidenceScore(merchantLabel: string, amountMinor: number) {
  const merchant = merchantLabel.trim().toLowerCase();
  let score = 0.72;

  if (merchant.length >= 4) {
    score += 0.1;
  }

  if (/(netto|føtex|foetex|rema|espresso|7-eleven|joe|lagkage|normal)/i.test(merchant)) {
    score += 0.12;
  }

  if (amountMinor >= 1_000 && amountMinor <= 300_000) {
    score += 0.08;
  }

  return Math.min(0.97, Math.round(score * 100) / 100);
}

function getConfidenceLabel(confidenceScore: number) {
  if (confidenceScore >= 0.92) {
    return "High-confidence parse — still review before posting";
  }

  if (confidenceScore >= REVIEW_THRESHOLD) {
    return "Medium-confidence parse — quick review recommended";
  }

  return "Low-confidence parse — confirmation required";
}

function getReviewStatus(confidenceScore: number): ReceiptCandidateRecord["reviewStatus"] {
  return confidenceScore >= 0.92 ? "ready_to_confirm" : "needs_review";
}

function buildReviewMessage(confidenceScore: number) {
  if (confidenceScore >= 0.92) {
    return "OCR feels confident enough to prefill the review sheet, but ProsperPals still waits for explicit confirmation before posting money truth.";
  }

  if (confidenceScore >= REVIEW_THRESHOLD) {
    return "The parse looks usable, but this is exactly where trust gets won or lost. Review merchant, total, and category before Goldie treats it as canonical.";
  }

  return "This parse is too fuzzy to fake certainty. Review what Goldie thinks it saw, then correct the merchant, amount, or category before anything is posted.";
}

async function appendReceiptRecords(records: ReceiptRecord[]) {
  if (!records.length) {
    return;
  }

  await ensureReceiptDir();
  await fs.appendFile(
    getReceiptPath(),
    `${records.map((record) => JSON.stringify(record)).join("\n")}\n`,
    "utf8"
  );
}

async function appendReceiptArtifactRecords(records: ReceiptArtifactRecord[]) {
  if (!records.length) {
    return;
  }

  await ensureReceiptArtifactDir();
  await fs.appendFile(
    getReceiptArtifactsPath(),
    `${records.map((record) => JSON.stringify(record)).join("\n")}\n`,
    "utf8"
  );
}

function buildReviewedMoneyEvent(input: {
  userId: string;
  candidateId: string;
  artifactId: string;
  occurredAt: string;
  traceId: string;
  merchantLabel: string;
  amountMinor: number;
  currency: string;
  categoryId: string;
  confidenceScore: number;
  moneyEventId: string;
}) {
  return moneyEventSchema.parse({
    id: input.moneyEventId,
    userId: input.userId,
    idempotencyKey: `receipt-confirmation:${input.userId}:${input.candidateId}`,
    eventType: "expense",
    amountMinor: input.amountMinor,
    currency: input.currency,
    occurredAt: input.occurredAt,
    merchantLabel: input.merchantLabel,
    categoryId: input.categoryId,
    sourceType: "receipt_ocr",
    verificationState: "parsed_reviewed",
    confidenceScore: input.confidenceScore,
    artifactId: input.artifactId,
    traceId: input.traceId
  });
}

function buildReceiptConfirmationResult(input: {
  candidate: ReceiptCandidateRecord;
  confirmation: ReceiptConfirmationRecord;
  alreadyConfirmed: boolean;
}): ReceiptConfirmationResult {
  const moneyEvent = buildReviewedMoneyEvent({
    userId: input.confirmation.userId,
    candidateId: input.confirmation.candidateId,
    artifactId: input.confirmation.artifactId,
    occurredAt: input.confirmation.occurredAt,
    traceId: input.confirmation.traceId,
    merchantLabel: input.confirmation.merchantLabel,
    amountMinor: input.confirmation.amountMinor,
    currency: input.confirmation.currency,
    categoryId: input.confirmation.categoryId,
    confidenceScore: input.confirmation.confidenceScore,
    moneyEventId: input.confirmation.moneyEventId
  });

  const dailySpendingPowerMinor = calculateDailySpendingPower(input.confirmation.amountMinor);
  const insight = createGoldieInsight({
    merchantLabel: input.confirmation.merchantLabel,
    amountMinor: input.confirmation.amountMinor,
    currency: input.confirmation.currency,
    dailySpendingPowerMinor
  });

  return {
    candidate: input.candidate,
    confirmation: input.confirmation,
    moneyEvent,
    insight: {
      ...insight,
      dailySpendingPowerMinor,
      currency: input.confirmation.currency
    },
    alreadyConfirmed: input.alreadyConfirmed
  };
}

export async function readDemoReceiptRecords(userId?: string): Promise<ReceiptRecord[]> {
  try {
    const raw = await fs.readFile(getReceiptPath(), "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return receiptRecordSchema.parse(JSON.parse(line));
        } catch {
          return null;
        }
      })
      .filter((record): record is ReceiptRecord => Boolean(record && (!userId || record.userId === userId)));
  } catch {
    return [];
  }
}

export async function readDemoReceiptArtifactRecords(userId?: string): Promise<ReceiptArtifactRecord[]> {
  try {
    const raw = await fs.readFile(getReceiptArtifactsPath(), "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return receiptArtifactRecordSchema.parse(JSON.parse(line));
        } catch {
          return null;
        }
      })
      .filter(
        (record): record is ReceiptArtifactRecord => Boolean(record && (!userId || record.userId === userId))
      );
  } catch {
    return [];
  }
}

function buildReceiptFailure(input: {
  userId: string;
  artifactId: string;
  requestId: string;
  traceId: string;
  occurredAt: string;
  failureStage: ReceiptFailureRecord["failureStage"];
  failureCode: string;
  recoveryAction: string;
  userMessage: string;
  providerReference: string;
  storageMode: ReceiptFailureRecord["storageMode"];
}) {
  return receiptFailureRecordSchema.parse({
    kind: "receipt_failure",
    id: crypto.randomUUID(),
    artifactId: input.artifactId,
    userId: input.userId,
    occurredAt: input.occurredAt,
    requestId: input.requestId,
    traceId: input.traceId,
    failureStage: input.failureStage,
    failureCode: input.failureCode,
    recoveryAction: input.recoveryAction,
    userMessage: input.userMessage,
    providerReference: input.providerReference,
    storageMode: input.storageMode
  });
}

async function persistReceiptArtifact(input: {
  userId: string;
  requestId: string;
  traceId: string;
  occurredAt: string;
  artifactId: string;
  upload?: {
    fileName: string;
    mimeType: string;
    bytes: Buffer;
  };
}): Promise<ReceiptArtifactRecord> {
  await ensureReceiptArtifactDir();

  const rawExtension = input.upload?.fileName.includes(".")
    ? input.upload.fileName.slice(input.upload.fileName.lastIndexOf("."))
    : ".txt";
  const sanitizedExtension = rawExtension.replace(/[^a-zA-Z0-9.]/g, "") || ".txt";
  const storageMode = input.upload ? "uploaded" : "simulated";
  const storagePath = input.upload
    ? path.join(getReceiptUploadDir(), `${input.artifactId}${sanitizedExtension}`)
    : path.join(getReceiptUploadDir(), `${input.artifactId}-simulated.txt`);

  const fileBuffer = input.upload?.bytes ?? Buffer.from("simulated receipt payload", "utf8");
  await fs.writeFile(storagePath, fileBuffer);

  const artifact = receiptArtifactRecordSchema.parse({
    kind: "receipt_artifact",
    artifactId: input.artifactId,
    userId: input.userId,
    occurredAt: input.occurredAt,
    requestId: input.requestId,
    traceId: input.traceId,
    storageMode,
    storagePath,
    fileName: input.upload?.fileName ?? "simulated-receipt.txt",
    mimeType: input.upload?.mimeType || "text/plain",
    sizeBytes: fileBuffer.byteLength,
    parserProvider: storageMode === "uploaded" ? "demo-ocr-upload-gateway" : "demo-ocr-simulator",
    parserModel: storageMode === "uploaded" ? "receipt-lineage-v1" : "receipt-simulator-v1",
    providerReference: `${storageMode}:${input.artifactId}`,
    sourceHint:
      storageMode === "uploaded"
        ? "User uploaded a real receipt asset into the demo runtime before parse review"
        : "No file uploaded; seeded simulated receipt artifact for prototype review loop"
  });

  await appendReceiptArtifactRecords([artifact]);
  return artifact;
}

function shouldSimulateProviderFailure(merchantLabel: string) {
  return /fail|broken|error/i.test(merchantLabel);
}

export async function captureReceiptCandidate(input: {
  userId: string;
  requestId: string;
  traceId: string;
  merchantLabel: string;
  amountMajor: number;
  categoryId: string;
  occurredAt?: string;
  upload?: {
    fileName: string;
    mimeType: string;
    bytes: Buffer;
  };
}): Promise<ReceiptCaptureResult> {
  const occurredAt = input.occurredAt ?? new Date().toISOString();
  const normalizedMerchantLabel = input.merchantLabel.trim() || "Unknown merchant";
  const amountMinor = Math.max(1, Math.round(input.amountMajor * 100));
  const artifactId = crypto.randomUUID();
  const artifact = await persistReceiptArtifact({
    userId: input.userId,
    requestId: input.requestId,
    traceId: input.traceId,
    occurredAt,
    artifactId,
    upload: input.upload
  });

  const unsupportedMimeType = input.upload?.mimeType
    ? !["image/jpeg", "image/png", "image/webp", "application/pdf", "text/plain"].includes(
        input.upload.mimeType
      )
    : false;

  if (unsupportedMimeType) {
    const failure = buildReceiptFailure({
      userId: input.userId,
      artifactId,
      requestId: input.requestId,
      traceId: input.traceId,
      occurredAt,
      failureStage: "upload_validation",
      failureCode: "UNSUPPORTED_FILE_TYPE",
      recoveryAction:
        "Retry with a JPG, PNG, WEBP, PDF, or plain-text receipt export so the review lane can preserve artifact lineage safely.",
      userMessage:
        "This file type is not supported for the alpha receipt lane yet. ProsperPals kept the upload metadata but stopped before OCR so nothing could silently post.",
      providerReference: `upload-validation:${artifactId}`,
      storageMode: artifact.storageMode
    });

    await appendReceiptRecords([failure]);
    return { status: "failed", failure, artifact };
  }

  if (shouldSimulateProviderFailure(normalizedMerchantLabel)) {
    const failure = buildReceiptFailure({
      userId: input.userId,
      artifactId,
      requestId: input.requestId,
      traceId: input.traceId,
      occurredAt,
      failureStage: "provider_parse",
      failureCode: "OCR_PROVIDER_UNAVAILABLE",
      recoveryAction:
        "Retry the capture or switch to manual merchant and amount entry while the provider lane is unhealthy. Canonical money truth stays unchanged until a reviewed candidate exists.",
      userMessage:
        "Receipt parsing failed safely. Goldie did not create a money event or review candidate, so you can retry without worrying about duplicate spending truth.",
      providerReference: `provider-failure:${artifactId}`,
      storageMode: artifact.storageMode
    });

    await appendReceiptRecords([failure]);
    return { status: "failed", failure, artifact };
  }

  const confidenceScore = getConfidenceScore(normalizedMerchantLabel, amountMinor);
  const candidate = receiptCandidateRecordSchema.parse({
    kind: "receipt_candidate",
    candidateId: crypto.randomUUID(),
    artifactId,
    userId: input.userId,
    occurredAt,
    requestId: input.requestId,
    traceId: input.traceId,
    merchantLabel: normalizedMerchantLabel,
    amountMinor,
    currency: "DKK",
    categoryId: input.categoryId.trim() || "groceries",
    confidenceScore,
    confidenceLabel: getConfidenceLabel(confidenceScore),
    parseStatus: "parsed",
    reviewStatus: getReviewStatus(confidenceScore),
    sourceHint: `${artifact.parserProvider} • ${artifact.parserModel} • ${artifact.storageMode}`,
    reviewMessage: buildReviewMessage(confidenceScore)
  });

  await appendReceiptRecords([candidate]);
  return { status: "candidate", candidate, artifact };
}

export async function confirmReceiptCandidate(input: {
  userId: string;
  candidateId: string;
  requestId: string;
  traceId: string;
  merchantLabel: string;
  amountMajor: number;
  categoryId: string;
  occurredAt?: string;
}) {
  const records = await readDemoReceiptRecords(input.userId);
  const candidate = [...records]
    .reverse()
    .find(
      (record): record is ReceiptCandidateRecord =>
        record.kind === "receipt_candidate" && record.candidateId === input.candidateId
    );

  if (!candidate) {
    throw new Error(`Receipt candidate not found: ${input.candidateId}`);
  }

  const existingConfirmation = [...records]
    .reverse()
    .find(
      (record): record is ReceiptConfirmationRecord =>
        record.kind === "receipt_confirmation" && record.candidateId === input.candidateId
    );

  if (existingConfirmation) {
    const confirmedCandidate = [...records]
      .reverse()
      .find(
        (record): record is ReceiptCandidateRecord =>
          record.kind === "receipt_candidate" &&
          record.candidateId === input.candidateId &&
          record.reviewStatus === "confirmed"
      ) ?? candidate;

    return buildReceiptConfirmationResult({
      candidate: confirmedCandidate,
      confirmation: existingConfirmation,
      alreadyConfirmed: true
    });
  }

  const occurredAt = input.occurredAt ?? new Date().toISOString();
  const amountMinor = Math.max(1, Math.round(input.amountMajor * 100));
  const merchantLabel = input.merchantLabel.trim() || candidate.merchantLabel;
  const categoryId = input.categoryId.trim() || candidate.categoryId;
  const correctionApplied =
    merchantLabel !== candidate.merchantLabel ||
    amountMinor !== candidate.amountMinor ||
    categoryId !== candidate.categoryId;

  const moneyEventId = crypto.randomUUID();
  buildReviewedMoneyEvent({
    userId: input.userId,
    candidateId: candidate.candidateId,
    artifactId: candidate.artifactId,
    occurredAt,
    traceId: input.traceId,
    merchantLabel,
    amountMinor,
    currency: candidate.currency,
    categoryId,
    confidenceScore: candidate.confidenceScore,
    moneyEventId
  });

  const confirmation = receiptConfirmationRecordSchema.parse({
    kind: "receipt_confirmation",
    id: crypto.randomUUID(),
    candidateId: candidate.candidateId,
    artifactId: candidate.artifactId,
    moneyEventId,
    userId: input.userId,
    occurredAt,
    requestId: input.requestId,
    traceId: input.traceId,
    merchantLabel,
    amountMinor,
    currency: candidate.currency,
    categoryId,
    confidenceScore: candidate.confidenceScore,
    correctionApplied,
    explanation: correctionApplied
      ? "Goldie posted the receipt only after you corrected the OCR draft. Review changed the money truth before it reached the planning layer."
      : "Goldie posted the receipt exactly as reviewed. Even the clean OCR path still requires explicit confirmation before money truth becomes canonical."
  });

  const candidateUpdate = receiptCandidateRecordSchema.parse({
    ...candidate,
    occurredAt,
    requestId: input.requestId,
    traceId: input.traceId,
    merchantLabel,
    amountMinor,
    categoryId,
    parseStatus: "confirmed",
    reviewStatus: "confirmed",
    reviewMessage: confirmation.explanation
  });

  await appendReceiptRecords([candidateUpdate, confirmation]);

  return buildReceiptConfirmationResult({
    candidate: candidateUpdate,
    confirmation,
    alreadyConfirmed: false
  });
}

export async function getDemoReceiptReviewState(userId: string): Promise<ReceiptReviewState> {
  const records = await readDemoReceiptRecords(userId);
  const artifacts = await readDemoReceiptArtifactRecords(userId);
  const candidates = records.filter(
    (record): record is ReceiptCandidateRecord => record.kind === "receipt_candidate"
  );
  const failures = records.filter(
    (record): record is ReceiptFailureRecord => record.kind === "receipt_failure"
  );
  const confirmations = records.filter(
    (record): record is ReceiptConfirmationRecord => record.kind === "receipt_confirmation"
  );
  const confirmedCandidateIds = new Set(confirmations.map((record) => record.candidateId));

  const pendingCandidate = [...candidates]
    .reverse()
    .find((candidate) => !confirmedCandidateIds.has(candidate.candidateId));
  const latestConfirmation = confirmations.at(-1);

  const latestConfirmed = latestConfirmation
    ? {
        ...latestConfirmation,
        dailySpendingPowerMinor: calculateDailySpendingPower(latestConfirmation.amountMinor),
        ...createGoldieInsight({
          merchantLabel: latestConfirmation.merchantLabel,
          amountMinor: latestConfirmation.amountMinor,
          currency: latestConfirmation.currency,
          dailySpendingPowerMinor: calculateDailySpendingPower(latestConfirmation.amountMinor)
        })
      }
    : undefined;

  return {
    sinkPath: getReceiptPath(),
    artifactSinkPath: getReceiptArtifactsPath(),
    pendingCandidate,
    latestArtifact: artifacts.at(-1),
    latestFailure: failures.at(-1),
    latestConfirmed,
    recentCandidates: [...candidates].reverse().slice(0, 4),
    confirmationCount: confirmations.length,
    failureCount: failures.length
  };
}
