import { headers } from "next/headers";

export type RequestContext = {
  requestId: string;
  sessionId: string;
  traceId: string;
  path: string;
  userId?: string;
  runtime: string;
};

export async function getRequestContext(): Promise<RequestContext> {
  const headerStore = await headers();
  return {
    requestId: headerStore.get("x-request-id") ?? crypto.randomUUID(),
    sessionId: headerStore.get("x-session-id") ?? "anonymous",
    traceId: headerStore.get("x-trace-id") ?? crypto.randomUUID(),
    path: headerStore.get("x-invoke-path") ?? "unknown",
    userId: headerStore.get("x-demo-user-id") ?? undefined,
    runtime: process.env.PROSPERPALS_ENV ?? process.env.NODE_ENV ?? "development"
  };
}

export function toStructuredLog(event: string, context: RequestContext, payload: Record<string, unknown> = {}) {
  return {
    event,
    request_id: context.requestId,
    session_id: context.sessionId,
    trace_id: context.traceId,
    path: context.path,
    user_id: context.userId,
    runtime: context.runtime,
    ...payload
  };
}
