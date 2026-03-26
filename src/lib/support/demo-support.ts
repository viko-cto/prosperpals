import {
  RELEASE_FLAG_OVERRIDE_APPLIED_EVENT,
  RELEASE_FLAG_OVERRIDE_CLEARED_EVENT,
  SUPPORT_BOUNDARY_BLOCKED_EVENT,
  SUPPORT_INTERVENTION_APPLIED_EVENT,
  SUPPORT_INTERVENTION_CLEARED_EVENT,
  SUPPORT_TIMELINE_VIEWED_EVENT,
  describeReleaseFlagOverride,
  getActiveReleaseFlagOverrides,
  getActiveSupportInterventions,
  readDemoAuditEvents
} from "../audit/demo-audit.ts";
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
  const [analyticsEvents, ledgerRecords, receiptRecords, auditEvents, activeInterventions, activeReleaseOverrides, releaseSafety] = await Promise.all([
    readDemoAnalyticsEvents(userId, 12),
    readDemoLedgerRecords(userId),
    readDemoReceiptRecords(userId),
    readDemoAuditEvents({ limit: 24 }),
    getActiveSupportInterventions(userId),
    getActiveReleaseFlagOverrides(),
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

  const auditTimeline: SupportTimelineItem[] = auditEvents.map((event) => {
    const interventionCode = String(event.payload.interventionCode ?? "unknown");
    const flagName = String(event.payload.flagName ?? "unknown");
    const flagLabel =
      flagName === "receiptCapture" || flagName === "simulatorStarter"
        ? describeReleaseFlagOverride(flagName)
        : flagName;
    const supportTraceState = event.payload.supportTraceView === true ? "enabled" : "disabled";
    const roleUsed = typeof event.payload.roleUsed === "string" ? event.payload.roleUsed : "unspecified";

    const title =
      event.eventCode === SUPPORT_TIMELINE_VIEWED_EVENT
        ? "Operator support timeline viewed"
        : event.eventCode === SUPPORT_BOUNDARY_BLOCKED_EVENT
          ? "Cross-account subject action blocked"
          : event.eventCode === SUPPORT_INTERVENTION_APPLIED_EVENT && interventionCode === "receipt_capture_paused"
            ? "Receipt capture paused"
            : event.eventCode === SUPPORT_INTERVENTION_CLEARED_EVENT && interventionCode === "receipt_capture_paused"
              ? "Receipt capture pause cleared"
              : event.eventCode === RELEASE_FLAG_OVERRIDE_APPLIED_EVENT
                ? `${flagLabel} override applied`
                : event.eventCode === RELEASE_FLAG_OVERRIDE_CLEARED_EVENT
                  ? `${flagLabel} override cleared`
                  : event.eventCode;

    const subtitle =
      event.eventCode === SUPPORT_TIMELINE_VIEWED_EVENT
        ? event.actorUserId && event.subjectUserId
          ? `Actor ${event.actorUserId} accessed support context for ${event.subjectUserId}`
          : "Operator audit event recorded"
        : event.eventCode === SUPPORT_BOUNDARY_BLOCKED_EVENT
          ? event.actorUserId && event.subjectUserId
            ? `Actor ${event.actorUserId} was blocked from mutating support context for ${event.subjectUserId}`
            : "Cross-account subject action was blocked"
          : event.eventCode === RELEASE_FLAG_OVERRIDE_APPLIED_EVENT || event.eventCode === RELEASE_FLAG_OVERRIDE_CLEARED_EVENT
            ? event.actorUserId
              ? `Actor ${event.actorUserId} changed ${flagName} for ${String(event.payload.scope ?? "alpha-hosted")}`
              : `Operator changed ${flagName}`
            : event.actorUserId && event.subjectUserId
              ? `Actor ${event.actorUserId} changed ${interventionCode} for ${event.subjectUserId}`
              : `Operator changed ${interventionCode}`;

    const details =
      event.eventCode === SUPPORT_TIMELINE_VIEWED_EVENT
        ? [
            `Reason: ${String(event.payload.reason ?? "unspecified")}`,
            `Role used: ${roleUsed}`,
            `Path: ${String(event.payload.path ?? "unknown")}`,
            `Support trace flag: ${supportTraceState}`
          ]
        : event.eventCode === SUPPORT_BOUNDARY_BLOCKED_EVENT
          ? [
              `Capability: ${String(event.payload.capability ?? "unknown")}`,
              `Boundary: ${String(event.payload.boundaryCode ?? "unknown")}`,
              `Role used: ${roleUsed}`,
              `Reason: ${String(event.payload.reason ?? "unspecified")}`,
              `Path: ${String(event.payload.path ?? "unknown")}`,
              `Support trace flag: ${supportTraceState}`
            ]
          : event.eventCode === RELEASE_FLAG_OVERRIDE_APPLIED_EVENT || event.eventCode === RELEASE_FLAG_OVERRIDE_CLEARED_EVENT
            ? [
                `Flag: ${flagName}`,
                `Enabled: ${String(event.payload.enabled ?? "n/a")}`,
                `Scope: ${String(event.payload.scope ?? "alpha-hosted")}`,
                `Role used: ${roleUsed}`,
                `Reason: ${String(event.payload.reason ?? "unspecified")}`,
                `Path: ${String(event.payload.path ?? "unknown")}`,
                `Support trace flag: ${supportTraceState}`
              ]
            : [
                `Intervention: ${interventionCode}`,
                `Role used: ${roleUsed}`,
                `Reason: ${String(event.payload.reason ?? "unspecified")}`,
                `Path: ${String(event.payload.path ?? "unknown")}`,
                `Support trace flag: ${supportTraceState}`
              ];

    return {
      id: event.id ?? `${event.eventCode}-${event.requestId}`,
      occurredAt: event.occurredAt,
      type: "audit",
      title,
      subtitle,
      traceId: event.traceId,
      requestId: event.requestId,
      details
    };
  });

  const timeline = [...auditTimeline, ...analyticsTimeline, ...ledgerTimeline, ...receiptTimeline]
    .sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime())
    .slice(0, 16);

  return {
    timeline,
    activeInterventions,
    activeReleaseOverrides,
    releaseSafety,
    redactionPolicy: [
      "Support timeline keeps request IDs, trace IDs, and object references — not raw secrets.",
      "Notification contracts forbid merchant names, amounts, categories, safe-to-spend values, and budget shortfalls.",
      "Receipt OCR candidates stay reviewable until a user confirms the parse."
    ]
  };
}
