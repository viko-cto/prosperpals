"use server";

import { redirect } from "next/navigation";
import {
  type ReleaseFlagOverrideName,
  recordReleaseFlagOverrideAudit,
  recordSupportApprovalRequestedAudit,
  recordSupportBoundaryBlockedAudit,
  recordSupportInterventionAudit
} from "@/lib/audit/demo-audit";
import { isInternalOperatorEmail, requireViewerSession } from "@/lib/auth/session";
import { getEffectiveFeatureFlags } from "@/lib/feature-flags/config";
import {
  type OperatorCapability,
  CrossAccountSubjectInterventionRequiresApprovalError,
  assertOperatorCapability,
  assertSubjectScopedInterventionAllowed
} from "@/lib/support/operator-access";
import { getRequestContext } from "@/lib/telemetry/request-context";

async function requireInternalSupportViewer(capability: OperatorCapability) {
  const session = await requireViewerSession();
  const internalUser = isInternalOperatorEmail(session.email);
  const flags = await getEffectiveFeatureFlags({
    countryCode: "DK",
    internalUser
  });

  if (!flags.supportTraceView) {
    throw new Error("Support trace view is disabled for this viewer.");
  }

  assertOperatorCapability(session, capability);
  return { session, flags };
}

function readReason(formData: FormData, fallback: string) {
  return String(formData.get("reason") ?? "").trim() || fallback;
}

async function requireSubjectScopedSupportMutation(
  formData: FormData,
  capability: OperatorCapability
) {
  const { session, flags } = await requireInternalSupportViewer(capability);
  const requestContext = await getRequestContext();
  const requestedSubjectUserId = String(formData.get("subjectUserId") ?? "").trim() || undefined;

  try {
    const { subjectUserId } = assertSubjectScopedInterventionAllowed({
      viewerUserId: session.userId,
      requestedSubjectUserId,
      capability
    });

    return { session, flags, requestContext, subjectUserId };
  } catch (error) {
    if (error instanceof CrossAccountSubjectInterventionRequiresApprovalError) {
      await recordSupportBoundaryBlockedAudit({
        actorUserId: session.userId,
        subjectUserId: error.subjectUserId,
        requestId: requestContext.requestId,
        traceId: requestContext.traceId,
        path: "/app/support",
        reason: `Cross-account ${capability} stays read-only until an approval-backed workflow exists`,
        supportTraceView: flags.supportTraceView,
        roleUsed: session.operatorRole,
        capability,
        boundaryCode: "cross_account_subject_action_requires_approval"
      });

      redirect(`/app/support?subject=${encodeURIComponent(error.subjectUserId)}&boundary=cross-account-action-blocked`);
    }

    throw error;
  }
}

function readReleaseFlagName(formData: FormData): ReleaseFlagOverrideName {
  const value = String(formData.get("flagName") ?? "").trim();

  if (value === "receiptCapture" || value === "simulatorStarter") {
    return value;
  }

  throw new Error(`Unsupported audited release flag: ${value || "missing"}`);
}

export async function applyReceiptCapturePauseAction(formData: FormData) {
  const { session, flags, requestContext, subjectUserId } = await requireSubjectScopedSupportMutation(
    formData,
    "receipt_capture_intervention"
  );

  await recordSupportInterventionAudit({
    actorUserId: session.userId,
    subjectUserId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: "/app/support",
    reason: readReason(formData, "receipt lineage review in progress"),
    supportTraceView: flags.supportTraceView,
    roleUsed: session.operatorRole,
    interventionCode: "receipt_capture_paused",
    action: "applied"
  });

  redirect("/app/support?intervention=receipt-capture-paused");
}

export async function clearReceiptCapturePauseAction(formData: FormData) {
  const { session, flags, requestContext, subjectUserId } = await requireSubjectScopedSupportMutation(
    formData,
    "receipt_capture_intervention"
  );

  await recordSupportInterventionAudit({
    actorUserId: session.userId,
    subjectUserId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: "/app/support",
    reason: readReason(formData, "receipt capture reopened after support review"),
    supportTraceView: flags.supportTraceView,
    roleUsed: session.operatorRole,
    interventionCode: "receipt_capture_paused",
    action: "cleared"
  });

  redirect("/app/support?intervention=receipt-capture-resumed");
}

export async function requestCrossAccountReceiptInterventionApprovalAction(formData: FormData) {
  const { session, flags } = await requireInternalSupportViewer("receipt_capture_intervention");
  const requestContext = await getRequestContext();
  const requestedSubjectUserId = String(formData.get("subjectUserId") ?? "").trim();

  if (!requestedSubjectUserId) {
    throw new Error("Missing subject user id for approval request");
  }

  if (requestedSubjectUserId === session.userId) {
    throw new Error("Approval request is only needed for cross-account subject actions");
  }

  await recordSupportApprovalRequestedAudit({
    actorUserId: session.userId,
    subjectUserId: requestedSubjectUserId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: "/app/support",
    reason: readReason(formData, "Requesting founder approval for a bounded cross-account receipt hold"),
    supportTraceView: flags.supportTraceView,
    roleUsed: session.operatorRole,
    code: "cross_account_receipt_capture_intervention",
    requestedCapability: "receipt_capture_intervention",
    approvalOwner: "founder-operator",
    requestedAction: "apply or clear a receipt capture hold for a reviewed subject outside the operator's own account",
    status: "pending"
  });

  redirect(`/app/support?subject=${encodeURIComponent(requestedSubjectUserId)}&approval=requested`);
}

export async function applyReleaseFlagOverrideAction(formData: FormData) {
  const { session, flags } = await requireInternalSupportViewer("release_flag_override");
  const requestContext = await getRequestContext();
  const flagName = readReleaseFlagName(formData);

  await recordReleaseFlagOverrideAudit({
    actorUserId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: "/app/support",
    reason: readReason(formData, `${flagName} kill switch engaged during hosted-alpha hardening review`),
    scope: "denmark-alpha-hosted",
    supportTraceView: flags.supportTraceView,
    roleUsed: session.operatorRole,
    flagName,
    enabled: false,
    action: "applied"
  });

  redirect(`/app/support?releaseOverride=${flagName}-disabled`);
}

export async function clearReleaseFlagOverrideAction(formData: FormData) {
  const { session, flags } = await requireInternalSupportViewer("release_flag_override");
  const requestContext = await getRequestContext();
  const flagName = readReleaseFlagName(formData);

  await recordReleaseFlagOverrideAudit({
    actorUserId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: "/app/support",
    reason: readReason(formData, `${flagName} audited override cleared after hosted-alpha review`),
    scope: "denmark-alpha-hosted",
    supportTraceView: flags.supportTraceView,
    roleUsed: session.operatorRole,
    flagName,
    enabled: false,
    action: "cleared"
  });

  redirect(`/app/support?releaseOverride=${flagName}-cleared`);
}
