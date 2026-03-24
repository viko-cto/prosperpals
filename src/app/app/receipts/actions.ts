"use server";

import { redirect } from "next/navigation";
import {
  SupportInterventionBlockedError,
  assertReceiptCaptureAllowed
} from "@/lib/audit/demo-audit";
import { requireViewerSession } from "@/lib/auth/session";
import { getEffectiveFeatureFlags } from "@/lib/feature-flags/config";
import { getDemoOnboardingState } from "@/lib/onboarding/demo-state";
import {
  captureReceiptCandidate,
  confirmReceiptCandidate
} from "@/lib/receipts/demo-receipts";
import { appendDemoAnalyticsEvent } from "@/lib/telemetry/demo-event-store";
import { getRequestContext } from "@/lib/telemetry/request-context";

async function readUploadedReceipt(formData: FormData) {
  const raw = formData.get("receiptFile");

  if (!(raw instanceof File) || raw.size === 0) {
    return undefined;
  }

  return {
    fileName: raw.name || "receipt-upload",
    mimeType: raw.type || "application/octet-stream",
    bytes: Buffer.from(await raw.arrayBuffer())
  };
}

export async function startReceiptReviewAction(formData: FormData) {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const internalUser = session.email.endsWith("@prosperpals.local");
  const flags = await getEffectiveFeatureFlags({
    countryCode: "DK",
    internalUser
  });
  const onboardingState = await getDemoOnboardingState(session.userId);
  const merchantLabel = String(formData.get("merchantLabel") ?? "").trim() || "Føtex City";
  const amountMajor = Number(formData.get("amountMajor") ?? 0) || 226.45;
  const categoryId = String(formData.get("categoryId") ?? "groceries").trim() || "groceries";
  const receiptUpload = await readUploadedReceipt(formData);
  const occurredAt = new Date().toISOString();

  if (!flags.receiptCapture) {
    redirect("/app/receipts?blocked=receipt_capture_disabled");
  }

  try {
    await assertReceiptCaptureAllowed(session.userId);
  } catch (error) {
    if (error instanceof SupportInterventionBlockedError && error.code === "receipt_capture_paused") {
      redirect("/app/receipts?blocked=receipt_capture_paused");
    }

    throw error;
  }

  const result = await captureReceiptCandidate({
    userId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    merchantLabel,
    amountMajor,
    categoryId,
    occurredAt,
    upload: receiptUpload
  });

  if (result.status === "failed") {
    await appendDemoAnalyticsEvent({
      event: "receipt.candidate.failed",
      occurredAt,
      userId: session.userId,
      requestId: requestContext.requestId,
      traceId: requestContext.traceId,
      path: requestContext.path,
      selectedIntent: onboardingState.selectedIntent,
      mode: onboardingState.mode,
      targetTimeToValueSeconds: 80,
      merchantLabel,
      amountMinor: Math.max(1, Math.round(amountMajor * 100)),
      currency: "DKK",
      headline: result.failure.failureCode,
      message: result.failure.userMessage
    });

    redirect(`/app/receipts?failure=${result.failure.id}`);
  }

  const candidate = result.candidate;

  await appendDemoAnalyticsEvent({
    event: "receipt.candidate.created",
    occurredAt,
    userId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: requestContext.path,
    selectedIntent: onboardingState.selectedIntent,
    mode: onboardingState.mode,
    targetTimeToValueSeconds: 80,
    merchantLabel: candidate.merchantLabel,
    amountMinor: candidate.amountMinor,
    currency: candidate.currency,
    headline: candidate.confidenceLabel,
    message: candidate.reviewMessage
  });

  redirect(`/app/receipts?candidateId=${candidate.candidateId}`);
}

export async function confirmReceiptReviewAction(formData: FormData) {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const onboardingState = await getDemoOnboardingState(session.userId);
  const candidateId = String(formData.get("candidateId") ?? "").trim();
  const merchantLabel = String(formData.get("merchantLabel") ?? "").trim();
  const amountMajor = Number(formData.get("amountMajor") ?? 0);
  const categoryId = String(formData.get("categoryId") ?? "groceries").trim() || "groceries";
  const occurredAt = new Date().toISOString();

  const result = await confirmReceiptCandidate({
    userId: session.userId,
    candidateId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    merchantLabel,
    amountMajor,
    categoryId,
    occurredAt
  });

  if (!result.alreadyConfirmed) {
    await appendDemoAnalyticsEvent({
      event: "receipt.candidate.confirmed",
      occurredAt,
      userId: session.userId,
      requestId: requestContext.requestId,
      traceId: requestContext.traceId,
      path: requestContext.path,
      selectedIntent: onboardingState.selectedIntent,
      mode: onboardingState.mode,
      targetTimeToValueSeconds: 80,
      merchantLabel: result.confirmation.merchantLabel,
      amountMinor: result.confirmation.amountMinor,
      currency: result.confirmation.currency,
      dailySpendingPowerMinor: result.insight.dailySpendingPowerMinor,
      headline: result.insight.headline,
      message: result.confirmation.explanation
    });
  }

  redirect(`/app/receipts?confirmed=${result.confirmation.candidateId}`);
}
