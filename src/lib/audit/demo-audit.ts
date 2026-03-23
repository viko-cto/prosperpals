import { promises as fs } from "node:fs";
import path from "node:path";
import { auditEventSchema } from "../../modules/finance/contracts.ts";

export type DemoAuditEvent = ReturnType<typeof auditEventSchema.parse>;
export type SupportInterventionCode = "receipt_capture_paused";

export const SUPPORT_TIMELINE_VIEWED_EVENT = "support.timeline.viewed";
export const SUPPORT_INTERVENTION_APPLIED_EVENT = "support.intervention.applied";
export const SUPPORT_INTERVENTION_CLEARED_EVENT = "support.intervention.cleared";

export type ActiveSupportIntervention = {
  code: SupportInterventionCode;
  actorUserId?: string;
  subjectUserId?: string;
  occurredAt: string;
  requestId: string;
  traceId?: string;
  reason: string;
  path: string;
  supportTraceView: boolean;
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

function getSinkPath() {
  return process.env.PROSPERPALS_DEMO_AUDIT_PATH ?? DEFAULT_SINK_PATH;
}

async function ensureSinkDir() {
  await fs.mkdir(path.dirname(getSinkPath()), { recursive: true });
}

export async function readDemoAuditEvents(filters: {
  actorUserId?: string;
  subjectUserId?: string;
  eventCodes?: string[];
  limit?: number;
} = {}): Promise<DemoAuditEvent[]> {
  const { actorUserId, subjectUserId, eventCodes, limit = 8 } = filters;

  try {
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

  await ensureSinkDir();
  await fs.appendFile(getSinkPath(), `${JSON.stringify(parsed)}\n`, "utf8");
  return parsed;
}

function toSupportInterventionCode(value: unknown): SupportInterventionCode | null {
  return value === "receipt_capture_paused" ? value : null;
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
      supportTraceView: input.supportTraceView
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
  interventionCode: SupportInterventionCode;
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
      path: input.path,
      reason: input.reason,
      supportTraceView: input.supportTraceView
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
      occurredAt: event.occurredAt,
      requestId: event.requestId,
      traceId: event.traceId,
      reason: String(event.payload.reason ?? "unspecified"),
      path: String(event.payload.path ?? "unknown"),
      supportTraceView: event.payload.supportTraceView === true
    }));
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
