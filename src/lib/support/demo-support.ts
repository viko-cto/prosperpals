import { readDemoAuditEvents } from "../audit/demo-audit.ts";
import { getReleaseSafetySummary } from "../operations/release-safety.ts";
import { readDemoReceiptRecords } from "../receipts/demo-receipts.ts";
import { readDemoLedgerRecords } from "../simulator/demo-simulator.ts";
import { readDemoAnalyticsEvents } from "../telemetry/demo-event-store.ts";

export type SupportTimelineItem = {
  id: string;
  occurredAt: string;
  type: "analytics" | "ledger" | "receipt" | "audit";
  title: string;
  subtitle: string;
  traceId?: string;
  requestId?: string;
  details: string[];
};

function toTimelineTitle(event: string) {
  switch (event) {
    case "onboarding.first-value.completed":
      return "First value completed";
    case "rewards.awarded":
      return "ProsperCoins awarded";
    case "simulator.trade.executed":
      return "Starter trade executed";
    case "simulator.trade.blocked":
      return "Starter trade blocked";
    case "receipt.candidate.created":
      return "Receipt candidate created";
    case "receipt.candidate.failed":
      return "Receipt capture failed safely";
    case "receipt.candidate.confirmed":
      return "Receipt candidate confirmed";
    default:
      return event;
  }
}

export async function getDemoSupportConsole(userId: string, context: {
  countryCode?: string;
  internalUser?: boolean;
} = {}) {
  const [analyticsEvents, ledgerRecords, receiptRecords, auditEvents, releaseSafety] = await Promise.all([
    readDemoAnalyticsEvents(userId, 12),
    readDemoLedgerRecords(userId),
    readDemoReceiptRecords(userId),
    readDemoAuditEvents({ subjectUserId: userId, limit: 6 }),
    getReleaseSafetySummary(context)
  ]);

  const analyticsTimeline: SupportTimelineItem[] = analyticsEvents.map((event, index) => ({
    id: `analytics-${index}-${event.occurredAt}`,
    occurredAt: event.occurredAt,
    type: "analytics",
    title: toTimelineTitle(event.event),
    subtitle: event.message ?? event.headline ?? event.event,
    traceId: event.traceId,
    requestId: event.requestId,
    details: [
      `Intent: ${event.selectedIntent}`,
      `Mode: ${event.mode}`,
      ...(event.assetName ? [`Asset: ${event.assetName}`] : []),
      ...(event.reasonCode ? [`Reason: ${event.reasonCode}`] : []),
      ...(event.firstValueSeconds != null ? [`First value time: ${event.firstValueSeconds}s`] : [])
    ]
  }));

  const ledgerTimeline: SupportTimelineItem[] = ledgerRecords.map((record) => ({
    id: record.kind === "prospercoin_ledger" ? record.id : record.id,
    occurredAt: record.occurredAt,
    type: "ledger",
    title:
      record.kind === "prospercoin_ledger"
        ? `Ledger ${record.eventKind}`
        : `Trade ${record.assetName}`,
    subtitle:
      record.kind === "prospercoin_ledger"
        ? record.explanation
        : `${record.assetName} starter slice with ${record.quoteFreshnessLabel}`,
    traceId: record.traceId,
    requestId: record.requestId,
    details:
      record.kind === "prospercoin_ledger"
        ? [
            `Reason: ${record.reasonCode}`,
            `Coins: ${record.coins}`,
            `Reference type: ${record.referenceType}`
          ]
        : [
            `Asset: ${record.symbol}`,
            `Starter trade coins: ${record.starterTradeCoins}`,
            `Freshness: ${record.quoteFreshnessSeconds}s`,
            `Snapshot: ${record.executionPriceSnapshotId}`
          ]
  }));

  const receiptTimeline: SupportTimelineItem[] = receiptRecords.map((record) => ({
    id: record.kind === "receipt_candidate" ? record.candidateId : record.id,
    occurredAt: record.occurredAt,
    type: "receipt",
    title:
      record.kind === "receipt_candidate"
        ? "Receipt OCR candidate"
        : record.kind === "receipt_failure"
          ? "Receipt capture failure"
          : "Receipt review confirmed",
    subtitle:
      record.kind === "receipt_candidate"
        ? `${record.merchantLabel} · ${record.confidenceLabel}`
        : record.kind === "receipt_failure"
          ? `${record.failureCode} · ${record.userMessage}`
          : record.explanation,
    traceId: record.traceId,
    requestId: record.requestId,
    details:
      record.kind === "receipt_candidate"
        ? [
            `Amount minor: ${record.amountMinor}`,
            `Category: ${record.categoryId}`,
            `Review status: ${record.reviewStatus}`
          ]
        : record.kind === "receipt_failure"
          ? [
              `Stage: ${record.failureStage}`,
              `Recovery: ${record.recoveryAction}`,
              `Provider ref: ${record.providerReference}`
            ]
          : [
              `Money event id: ${record.moneyEventId}`,
              `Correction applied: ${record.correctionApplied ? "yes" : "no"}`,
              `Category: ${record.categoryId}`
            ]
  }));

  const auditTimeline: SupportTimelineItem[] = auditEvents.map((event) => ({
    id: event.id ?? `${event.eventCode}-${event.requestId}`,
    occurredAt: event.occurredAt,
    type: "audit",
    title:
      event.eventCode === "support.timeline.viewed"
        ? "Operator support timeline viewed"
        : event.eventCode,
    subtitle:
      event.actorUserId && event.subjectUserId
        ? `Actor ${event.actorUserId} accessed support context for ${event.subjectUserId}`
        : "Operator audit event recorded",
    traceId: event.traceId,
    requestId: event.requestId,
    details: [
      `Reason: ${String(event.payload.reason ?? "unspecified")}`,
      `Path: ${String(event.payload.path ?? "unknown")}`,
      `Support trace flag: ${event.payload.supportTraceView === true ? "enabled" : "disabled"}`
    ]
  }));

  const timeline = [...auditTimeline, ...analyticsTimeline, ...ledgerTimeline, ...receiptTimeline]
    .sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime())
    .slice(0, 16);

  return {
    timeline,
    releaseSafety,
    redactionPolicy: [
      "Support timeline keeps request IDs, trace IDs, and object references — not raw secrets.",
      "Notification contracts forbid merchant names, amounts, categories, safe-to-spend values, and budget shortfalls.",
      "Receipt OCR candidates stay reviewable until a user confirms the parse."
    ]
  };
}
