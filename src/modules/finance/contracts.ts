import { z } from "zod";

export const moneyEventSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  idempotencyKey: z.string().min(8),
  eventType: z.enum(["expense", "income", "refund", "transfer_adjustment"]),
  amountMinor: z.number().int(),
  currency: z.string().length(3),
  occurredAt: z.string().datetime(),
  merchantLabel: z.string().min(1).max(120).optional(),
  categoryId: z.string().min(1).max(80).optional(),
  sourceType: z.enum(["manual", "receipt_ocr", "pdf_csv_bridge", "mobilepay", "psd2"]),
  verificationState: z.enum(["user_confirmed", "parsed_reviewed", "import_verified", "system_suspect"]),
  confidenceScore: z.number().min(0).max(1),
  importJobId: z.string().uuid().optional(),
  artifactId: z.string().uuid().optional(),
  traceId: z.string().uuid().optional()
});

export const prosperCoinLedgerEventSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  idempotencyKey: z.string().min(8),
  eventKind: z.enum(["credit", "debit", "reversal"]),
  deltaCoins: z.number().int(),
  reasonCode: z.string().min(2).max(80),
  referenceType: z.string().min(2).max(80),
  referenceId: z.string().uuid().optional(),
  traceId: z.string().uuid().optional()
});

export const virtualTradeExecutionSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  portfolioId: z.string().uuid(),
  idempotencyKey: z.string().min(8),
  assetId: z.string().min(1).max(40),
  units: z.number().positive(),
  executionPriceSnapshotId: z.string().uuid(),
  coinsDebited: z.number().int().positive(),
  traceId: z.string().uuid().optional()
});

export const consentGrantSchema = z.object({
  id: z.string().uuid().optional(),
  grantorUserId: z.string().uuid(),
  granteeScope: z.string().min(2).max(80),
  dataCategory: z.enum(["learning_progress", "household_summary", "family_preview"]),
  accessLevel: z.enum(["view", "share", "coach"]),
  grantedAt: z.string().datetime().optional(),
  revokedAt: z.string().datetime().nullable().optional()
});

export const auditEventSchema = z.object({
  id: z.string().uuid().optional(),
  occurredAt: z.string().datetime(),
  actorUserId: z.string().uuid().nullable().optional(),
  subjectUserId: z.string().uuid().nullable().optional(),
  eventCode: z.string().min(4).max(120),
  traceId: z.string().uuid().optional(),
  requestId: z.string().min(6),
  payload: z.record(z.unknown()).default({})
});
