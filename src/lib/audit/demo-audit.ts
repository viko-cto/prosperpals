import { promises as fs } from "node:fs";
import path from "node:path";
import { auditEventSchema } from "../../modules/finance/contracts.ts";

export type DemoAuditEvent = ReturnType<typeof auditEventSchema.parse>;

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
  limit?: number;
} = {}): Promise<DemoAuditEvent[]> {
  const { actorUserId, subjectUserId, limit = 8 } = filters;

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
    eventCode: "support.timeline.viewed",
    traceId: input.traceId,
    requestId: input.requestId,
    payload: {
      path: input.path,
      reason: input.reason,
      supportTraceView: input.supportTraceView
    }
  });
}
