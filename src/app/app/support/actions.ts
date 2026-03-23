"use server";

import { redirect } from "next/navigation";
import {
  recordSupportInterventionAudit
} from "@/lib/audit/demo-audit";
import { requireViewerSession } from "@/lib/auth/session";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";
import { getRequestContext } from "@/lib/telemetry/request-context";

async function requireInternalSupportViewer() {
  const session = await requireViewerSession();
  const internalUser = session.email.endsWith("@prosperpals.local");
  const flags = evaluateFeatureFlags({
    countryCode: "DK",
    internalUser
  });

  if (!flags.supportTraceView) {
    throw new Error("Support trace view is disabled for this viewer.");
  }

  return { session, flags };
}

function readReason(formData: FormData, fallback: string) {
  return String(formData.get("reason") ?? "").trim() || fallback;
}

export async function applyReceiptCapturePauseAction(formData: FormData) {
  const { session, flags } = await requireInternalSupportViewer();
  const requestContext = await getRequestContext();
  const subjectUserId = String(formData.get("subjectUserId") ?? "").trim() || session.userId;

  await recordSupportInterventionAudit({
    actorUserId: session.userId,
    subjectUserId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: "/app/support",
    reason: readReason(formData, "receipt lineage review in progress"),
    supportTraceView: flags.supportTraceView,
    interventionCode: "receipt_capture_paused",
    action: "applied"
  });

  redirect("/app/support?intervention=receipt-capture-paused");
}

export async function clearReceiptCapturePauseAction(formData: FormData) {
  const { session, flags } = await requireInternalSupportViewer();
  const requestContext = await getRequestContext();
  const subjectUserId = String(formData.get("subjectUserId") ?? "").trim() || session.userId;

  await recordSupportInterventionAudit({
    actorUserId: session.userId,
    subjectUserId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: "/app/support",
    reason: readReason(formData, "receipt capture reopened after support review"),
    supportTraceView: flags.supportTraceView,
    interventionCode: "receipt_capture_paused",
    action: "cleared"
  });

  redirect("/app/support?intervention=receipt-capture-resumed");
}
