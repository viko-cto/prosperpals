import { promises as fs } from "node:fs";
import path from "node:path";
import { auditEventSchema } from "../../modules/finance/contracts.ts";

export type DemoAuditEvent = ReturnType<typeof auditEventSchema.parse>;
export type SupportInterventionCode = "receipt_capture_paused";
export type SupportApprovalRequestCode = "cross_account_receipt_capture_intervention";
export type ReleaseFlagOverrideName = "receiptCapture" | "simulatorStarter";

export const SUPPORT_TIMELINE_VIEWED_EVENT = "support.timeline.viewed";
export const SUPPORT_INTERVENTION_APPLIED_EVENT = "support.intervention.applied";
export const SUPPORT_INTERVENTION_CLEARED_EVENT = "support.intervention.cleared";
export const SUPPORT_BOUNDARY_BLOCKED_EVENT = "support.boundary.blocked";
export const SUPPORT_APPROVAL_REQUESTED_EVENT = "support.approval.requested";
export const SUPPORT_APPROVAL_RESOLVED_EVENT = "support.approval.resolved";
export const RELEASE_FLAG_OVERRIDE_APPLIED_EVENT = "release.flag.override.applied";
export const RELEASE_FLAG_OVERRIDE_CLEARED_EVENT = "release.flag.override.cleared";

export type ActiveSupportIntervention = {
  code: SupportInterventionCode;
  actorUserId?: string;
  subjectUserId?: string;
  roleUsed?: string;
  approvalRequestId?: string;
  occurredAt: string;
  requestId: string;
  traceId?: string;
  reason: string;
  path: string;
  supportTraceView: boolean;
};

export type PendingSupportApprovalRequest = {
  code: SupportApprovalRequestCode;
  actorUserId?: string;
  subjectUserId?: string;
  roleUsed?: string;
  occurredAt: string;
  requestId: string;
  traceId?: string;
  reason: string;
  path: string;
  supportTraceView: boolean;
  requestedCapability: string;
  approvalOwner: string;
  requestedAction: string;
  status: "pending";
};

export type ResolvedSupportApprovalRequest = Omit<PendingSupportApprovalRequest, "status"> & {
  status: "approved" | "rejected";
  approvalRequestId: string;
  resolvedAt: string;
  resolvedByUserId?: string;
  resolutionReason: string;
  consumedAt?: string;
  consumedByRequestId?: string;
  consumedEventCode?: string;
};

export type ActiveReleaseFlagOverride = {
  flagName: ReleaseFlagOverrideName;
  enabled: boolean;
  actorUserId?: string;
  roleUsed?: string;
  occurredAt: string;
  requestId: string;
  traceId?: string;
  reason: string;
  path: string;
  scope: string;
  supportTraceView: boolean;
};

type HostedAuditConfig = {
  url: string;
  serviceKey: string;
  table: string;
  mode: "prefer-hosted" | "hosted-only";
};

export class SupportInterventionBlockedError extends Error {
  readonly code: SupportInterventionCode;
  readonly intervention: ActiveSupportIntervention;

  constructor(intervention: ActiveSupportIntervention) {
    super(`Support intervention active: ${intervention.code}`);
    this.name = "SupportInterventionBlockedError";
    this.code = intervention.code;
    this.intervention = intervention;
  }
}

const DEFAULT_RUNTIME_DIR = path.join(process.cwd(), ".prosperpals-runtime");
const DEFAULT_SINK_PATH = path.join(DEFAULT_RUNTIME_DIR, "demo-operator-audit.jsonl");
const DEFAULT_HOSTED_TABLE = "demo_operator_audit_events";

function getSinkPath() {
  return process.env.PROSPERPALS_DEMO_AUDIT_PATH ?? DEFAULT_SINK_PATH;
}

function getHostedAuditConfig(): HostedAuditConfig | null {
  const url =
    process.env.PROSPERPALS_SUPABASE_URL
    ?? process.env.NEXT_PUBLIC_SUPABASE_URL
    ?? process.env.SUPABASE_URL;
  const serviceKey =
    process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY
    ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    serviceKey,
    table: process.env.PROSPERPALS_AUDIT_TABLE ?? DEFAULT_HOSTED_TABLE,
    mode:
      process.env.PROSPERPALS_AUDIT_DURABILITY_MODE === "hosted-only"
        ? "hosted-only"
        : "prefer-hosted"
  };
}

function getHostedAuditUrl(config: HostedAuditConfig, query = "") {
  return `${config.url}/rest/v1/${config.table}${query}`;
}

async function ensureSinkDir() {
  await fs.mkdir(path.dirname(getSinkPath()), { recursive: true });
}

async function readHostedAuditEvents(): Promise<DemoAuditEvent[]> {
  const config = getHostedAuditConfig();

  if (!config) {
    return [];
  }

  const response = await fetch(
    getHostedAuditUrl(config, "?select=*&order=occurredAt.desc,id.desc&limit=256"),
    {
      headers: {
        apikey: config.serviceKey,
        Authorization: `Bearer ${config.serviceKey}`
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Hosted audit read failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  if (!Array.isArray(payload)) {
    throw new Error("Hosted audit read returned a non-array payload");
  }

  return payload
    .map((entry) => {
      try {
        return auditEventSchema.parse(entry);
      } catch {
        return null;
      }
    })
    .filter((event): event is DemoAuditEvent => Boolean(event));
}

async function appendHostedAuditEvent(event: DemoAuditEvent) {
  const config = getHostedAuditConfig();

  if (!config) {
    throw new Error("Hosted audit config is not available");
  }

  const response = await fetch(getHostedAuditUrl(config), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify([event])
  });

  if (!response.ok) {
    throw new Error(`Hosted audit write failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const inserted = Array.isArray(payload) ? payload[0] : payload;
  return auditEventSchema.parse(inserted);
}

async function readLocalAuditEvents(): Promise<DemoAuditEvent[]> {
  const raw = await fs.readFile(getSinkPath(), "utf8");
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        return auditEventSchema.parse(JSON.parse(line));
      } catch {
        return null;
      }
    })
    .filter((event): event is DemoAuditEvent => Boolean(event));
}

async function getStoredAuditEvents(): Promise<DemoAuditEvent[]> {
  const config = getHostedAuditConfig();

  if (!config) {
    return readLocalAuditEvents();
  }

  try {
    return await readHostedAuditEvents();
  } catch (error) {
    if (config.mode === "hosted-only") {
      throw error;
    }

    return readLocalAuditEvents();
  }
}

export async function readDemoAuditEvents(filters: {
  actorUserId?: string;
  subjectUserId?: string;
  eventCodes?: string[];
  limit?: number;
} = {}): Promise<DemoAuditEvent[]> {
  const { actorUserId, subjectUserId, eventCodes, limit = 8 } = filters;

  try {
    return (await getStoredAuditEvents())
      .filter((event): event is DemoAuditEvent => {
        if (!event) {
          return false;
        }

        if (actorUserId && event.actorUserId !== actorUserId) {
          return false;
        }

        if (subjectUserId && event.subjectUserId !== subjectUserId) {
          return false;
        }

        if (eventCodes?.length && !eventCodes.includes(event.eventCode)) {
          return false;
        }

        return true;
      })
      .slice(-limit)
      .reverse();
  } catch {
    return [];
  }
}

export async function appendDemoAuditEvent(event: DemoAuditEvent) {
  const parsed = auditEventSchema.parse({
    ...event,
    id: event.id ?? crypto.randomUUID(),
    payload: event.payload ?? {}
  });

  const existing = await readDemoAuditEvents({
    actorUserId: parsed.actorUserId ?? undefined,
    subjectUserId: parsed.subjectUserId ?? undefined,
    limit: 64
  });

  const duplicate = existing.find((candidate) =>
    candidate.requestId === parsed.requestId
    && candidate.eventCode === parsed.eventCode
    && candidate.actorUserId === parsed.actorUserId
    && candidate.subjectUserId === parsed.subjectUserId
  );

  if (duplicate) {
    return duplicate;
  }

  const hostedConfig = getHostedAuditConfig();

  if (hostedConfig) {
    try {
      return await appendHostedAuditEvent(parsed);
    } catch (error) {
      if (hostedConfig.mode === "hosted-only") {
        throw error;
      }
    }
  }

  await ensureSinkDir();
  await fs.appendFile(getSinkPath(), `${JSON.stringify(parsed)}\n`, "utf8");
  return parsed;
}

function toSupportInterventionCode(value: unknown): SupportInterventionCode | null {
  return value === "receipt_capture_paused" ? value : null;
}

function toSupportApprovalRequestCode(value: unknown): SupportApprovalRequestCode | null {
  return value === "cross_account_receipt_capture_intervention" ? value : null;
}

function toReleaseFlagOverrideName(value: unknown): ReleaseFlagOverrideName | null {
  return value === "receiptCapture" || value === "simulatorStarter" ? value : null;
}

function toBoolean(value: unknown) {
  return typeof value === "boolean" ? value : null;
}

export function describeReleaseFlagOverride(flagName: ReleaseFlagOverrideName) {
  switch (flagName) {
    case "receiptCapture":
      return "Receipt capture";
    case "simulatorStarter":
      return "Fin simulator starter";
    default:
      return flagName;
  }
}

export async function recordSupportTimelineViewAudit(input: {
  actorUserId: string;
  subjectUserId: string;
  requestId: string;
  traceId: string;
  occurredAt?: string;
  path: string;
  reason: string;
  supportTraceView: boolean;
  roleUsed?: string;
}) {
  return appendDemoAuditEvent({
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    actorUserId: input.actorUserId,
    subjectUserId: input.subjectUserId,
    eventCode: SUPPORT_TIMELINE_VIEWED_EVENT,
    traceId: input.traceId,
    requestId: input.requestId,
    payload: {
      path: input.path,
      reason: input.reason,
      supportTraceView: input.supportTraceView,
      roleUsed: input.roleUsed
    }
  });
}

export async function recordSupportInterventionAudit(input: {
  actorUserId: string;
  subjectUserId: string;
  requestId: string;
  traceId: string;
  occurredAt?: string;
  path: string;
  reason: string;
  supportTraceView: boolean;
  roleUsed?: string;
  interventionCode: SupportInterventionCode;
  approvalRequestId?: string;
  action: "applied" | "cleared";
}) {
  return appendDemoAuditEvent({
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    actorUserId: input.actorUserId,
    subjectUserId: input.subjectUserId,
    eventCode:
      input.action === "applied"
        ? SUPPORT_INTERVENTION_APPLIED_EVENT
        : SUPPORT_INTERVENTION_CLEARED_EVENT,
    traceId: input.traceId,
    requestId: input.requestId,
    payload: {
      interventionCode: input.interventionCode,
      approvalRequestId: input.approvalRequestId,
      path: input.path,
      reason: input.reason,
      supportTraceView: input.supportTraceView,
      roleUsed: input.roleUsed
    }
  });
}

export async function recordSupportBoundaryBlockedAudit(input: {
  actorUserId: string;
  subjectUserId: string;
  requestId: string;
  traceId: string;
  occurredAt?: string;
  path: string;
  reason: string;
  supportTraceView: boolean;
  roleUsed?: string;
  capability: string;
  boundaryCode: "cross_account_subject_action_requires_approval";
}) {
  return appendDemoAuditEvent({
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    actorUserId: input.actorUserId,
    subjectUserId: input.subjectUserId,
    eventCode: SUPPORT_BOUNDARY_BLOCKED_EVENT,
    traceId: input.traceId,
    requestId: input.requestId,
    payload: {
      capability: input.capability,
      boundaryCode: input.boundaryCode,
      path: input.path,
      reason: input.reason,
      supportTraceView: input.supportTraceView,
      roleUsed: input.roleUsed
    }
  });
}

export async function recordSupportApprovalRequestedAudit(input: {
  actorUserId: string;
  subjectUserId: string;
  requestId: string;
  traceId: string;
  occurredAt?: string;
  path: string;
  reason: string;
  supportTraceView: boolean;
  roleUsed?: string;
  code: SupportApprovalRequestCode;
  requestedCapability: string;
  approvalOwner: string;
  requestedAction: string;
  status?: "pending";
}) {
  return appendDemoAuditEvent({
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    actorUserId: input.actorUserId,
    subjectUserId: input.subjectUserId,
    eventCode: SUPPORT_APPROVAL_REQUESTED_EVENT,
    traceId: input.traceId,
    requestId: input.requestId,
    payload: {
      approvalRequestCode: input.code,
      requestedCapability: input.requestedCapability,
      approvalOwner: input.approvalOwner,
      requestedAction: input.requestedAction,
      status: input.status ?? "pending",
      path: input.path,
      reason: input.reason,
      supportTraceView: input.supportTraceView,
      roleUsed: input.roleUsed
    }
  });
}

export async function recordSupportApprovalResolvedAudit(input: {
  actorUserId: string;
  subjectUserId: string;
  requestId: string;
  traceId: string;
  occurredAt?: string;
  path: string;
  reason: string;
  supportTraceView: boolean;
  roleUsed?: string;
  code: SupportApprovalRequestCode;
  approvalRequestId: string;
  requestedCapability: string;
  approvalOwner: string;
  requestedAction: string;
  status: "approved" | "rejected";
  resolvedByUserId: string;
}) {
  return appendDemoAuditEvent({
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    actorUserId: input.actorUserId,
    subjectUserId: input.subjectUserId,
    eventCode: SUPPORT_APPROVAL_RESOLVED_EVENT,
    traceId: input.traceId,
    requestId: input.requestId,
    payload: {
      approvalRequestCode: input.code,
      approvalRequestId: input.approvalRequestId,
      requestedCapability: input.requestedCapability,
      approvalOwner: input.approvalOwner,
      requestedAction: input.requestedAction,
      status: input.status,
      resolvedByUserId: input.resolvedByUserId,
      path: input.path,
      reason: input.reason,
      supportTraceView: input.supportTraceView,
      roleUsed: input.roleUsed
    }
  });
}

async function getLatestSupportApprovalRecord(
  subjectUserId: string,
  code: SupportApprovalRequestCode
): Promise<PendingSupportApprovalRequest | ResolvedSupportApprovalRequest | null> {
  const events = await readDemoAuditEvents({
    subjectUserId,
    eventCodes: [SUPPORT_APPROVAL_REQUESTED_EVENT, SUPPORT_APPROVAL_RESOLVED_EVENT],
    limit: 128
  });

  for (const event of events) {
    const eventCode = toSupportApprovalRequestCode(event.payload.approvalRequestCode);

    if (!eventCode || eventCode !== code) {
      continue;
    }

    const status = String(event.payload.status ?? "pending");

    if (event.eventCode === SUPPORT_APPROVAL_REQUESTED_EVENT && status === "pending") {
      return {
        code,
        actorUserId: event.actorUserId ?? undefined,
        subjectUserId: event.subjectUserId ?? undefined,
        occurredAt: event.occurredAt,
        requestId: event.requestId,
        traceId: event.traceId,
        reason: String(event.payload.reason ?? "unspecified"),
        path: String(event.payload.path ?? "unknown"),
        supportTraceView: event.payload.supportTraceView === true,
        roleUsed: typeof event.payload.roleUsed === "string" ? event.payload.roleUsed : undefined,
        requestedCapability: String(event.payload.requestedCapability ?? "unknown"),
        approvalOwner: String(event.payload.approvalOwner ?? "founder-operator"),
        requestedAction: String(event.payload.requestedAction ?? "unknown"),
        status: "pending"
      };
    }

    if (event.eventCode === SUPPORT_APPROVAL_RESOLVED_EVENT && (status === "approved" || status === "rejected")) {
      return {
        code,
        actorUserId: event.actorUserId ?? undefined,
        subjectUserId: event.subjectUserId ?? undefined,
        occurredAt: event.occurredAt,
        requestId: event.requestId,
        traceId: event.traceId,
        reason: String(event.payload.reason ?? "unspecified"),
        path: String(event.payload.path ?? "unknown"),
        supportTraceView: event.payload.supportTraceView === true,
        roleUsed: typeof event.payload.roleUsed === "string" ? event.payload.roleUsed : undefined,
        requestedCapability: String(event.payload.requestedCapability ?? "unknown"),
        approvalOwner: String(event.payload.approvalOwner ?? "founder-operator"),
        requestedAction: String(event.payload.requestedAction ?? "unknown"),
        status,
        approvalRequestId: String(event.payload.approvalRequestId ?? "unknown"),
        resolvedAt: event.occurredAt,
        resolvedByUserId:
          typeof event.payload.resolvedByUserId === "string"
            ? event.payload.resolvedByUserId
            : undefined,
        resolutionReason: String(event.payload.reason ?? "unspecified")
      };
    }
  }

  return null;
}

export async function recordReleaseFlagOverrideAudit(input: {
  actorUserId: string;
  requestId: string;
  traceId: string;
  occurredAt?: string;
  path: string;
  reason: string;
  scope: string;
  supportTraceView: boolean;
  roleUsed?: string;
  flagName: ReleaseFlagOverrideName;
  enabled: boolean;
  action: "applied" | "cleared";
}) {
  return appendDemoAuditEvent({
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    actorUserId: input.actorUserId,
    eventCode:
      input.action === "applied"
        ? RELEASE_FLAG_OVERRIDE_APPLIED_EVENT
        : RELEASE_FLAG_OVERRIDE_CLEARED_EVENT,
    traceId: input.traceId,
    requestId: input.requestId,
    payload: {
      flagName: input.flagName,
      enabled: input.enabled,
      path: input.path,
      reason: input.reason,
      scope: input.scope,
      supportTraceView: input.supportTraceView,
      roleUsed: input.roleUsed
    }
  });
}

export async function getActiveSupportInterventions(subjectUserId: string) {
  const events = await readDemoAuditEvents({
    subjectUserId,
    eventCodes: [SUPPORT_INTERVENTION_APPLIED_EVENT, SUPPORT_INTERVENTION_CLEARED_EVENT],
    limit: 128
  });

  const latestByCode = new Map<SupportInterventionCode, DemoAuditEvent>();

  for (const event of events) {
    const interventionCode = toSupportInterventionCode(event.payload.interventionCode);

    if (!interventionCode || latestByCode.has(interventionCode)) {
      continue;
    }

    latestByCode.set(interventionCode, event);
  }

  return [...latestByCode.entries()]
    .filter(([, event]) => event.eventCode === SUPPORT_INTERVENTION_APPLIED_EVENT)
    .map(([code, event]): ActiveSupportIntervention => ({
      code,
      actorUserId: event.actorUserId ?? undefined,
      subjectUserId: event.subjectUserId ?? undefined,
      approvalRequestId:
        typeof event.payload.approvalRequestId === "string"
          ? event.payload.approvalRequestId
          : undefined,
      occurredAt: event.occurredAt,
      requestId: event.requestId,
      traceId: event.traceId,
      reason: String(event.payload.reason ?? "unspecified"),
      path: String(event.payload.path ?? "unknown"),
      supportTraceView: event.payload.supportTraceView === true,
      roleUsed: typeof event.payload.roleUsed === "string" ? event.payload.roleUsed : undefined
    }));
}

export async function getPendingSupportApprovalRequests(subjectUserId: string) {
  const codes: SupportApprovalRequestCode[] = ["cross_account_receipt_capture_intervention"];
  const results = await Promise.all(codes.map((code) => getLatestSupportApprovalRecord(subjectUserId, code)));
  return results.filter((entry): entry is PendingSupportApprovalRequest => Boolean(entry && entry.status === "pending"));
}

export async function getResolvedSupportApprovalRequests(subjectUserId: string) {
  const codes: SupportApprovalRequestCode[] = ["cross_account_receipt_capture_intervention"];
  const results = await Promise.all(codes.map((code) => getLatestSupportApprovalRecord(subjectUserId, code)));
  const resolved = results.filter((entry): entry is ResolvedSupportApprovalRequest => Boolean(entry && entry.status !== "pending"));

  if (!resolved.length) {
    return resolved;
  }

  const interventionEvents = await readDemoAuditEvents({
    subjectUserId,
    eventCodes: [SUPPORT_INTERVENTION_APPLIED_EVENT, SUPPORT_INTERVENTION_CLEARED_EVENT],
    limit: 256
  });

  return resolved.map((entry) => {
    if (entry.status !== "approved") {
      return entry;
    }

    const consumption = interventionEvents.find(
      (event) => String(event.payload.approvalRequestId ?? "") === entry.approvalRequestId
    );

    if (!consumption) {
      return entry;
    }

    return {
      ...entry,
      consumedAt: consumption.occurredAt,
      consumedByRequestId: consumption.requestId,
      consumedEventCode: consumption.eventCode
    };
  });
}

export async function getActiveReleaseFlagOverrides() {
  const events = await readDemoAuditEvents({
    eventCodes: [RELEASE_FLAG_OVERRIDE_APPLIED_EVENT, RELEASE_FLAG_OVERRIDE_CLEARED_EVENT],
    limit: 128
  });

  const latestByFlag = new Map<ReleaseFlagOverrideName, DemoAuditEvent>();

  for (const event of events) {
    const flagName = toReleaseFlagOverrideName(event.payload.flagName);

    if (!flagName || latestByFlag.has(flagName)) {
      continue;
    }

    latestByFlag.set(flagName, event);
  }

  return [...latestByFlag.entries()]
    .filter(([, event]) => event.eventCode === RELEASE_FLAG_OVERRIDE_APPLIED_EVENT)
    .flatMap(([flagName, event]): ActiveReleaseFlagOverride[] => {
      const enabled = toBoolean(event.payload.enabled);

      if (enabled == null) {
        return [];
      }

      return [{
        flagName,
        enabled,
        actorUserId: event.actorUserId ?? undefined,
        occurredAt: event.occurredAt,
        requestId: event.requestId,
        traceId: event.traceId,
        reason: String(event.payload.reason ?? "unspecified"),
        path: String(event.payload.path ?? "unknown"),
        scope: String(event.payload.scope ?? "alpha-hosted"),
        supportTraceView: event.payload.supportTraceView === true,
        roleUsed: typeof event.payload.roleUsed === "string" ? event.payload.roleUsed : undefined
      }];
    });
}

export async function assertReceiptCaptureAllowed(subjectUserId: string) {
  const interventions = await getActiveSupportInterventions(subjectUserId);
  const receiptCapturePause = interventions.find(
    (intervention) => intervention.code === "receipt_capture_paused"
  );

  if (receiptCapturePause) {
    throw new SupportInterventionBlockedError(receiptCapturePause);
  }
}
