import { getRequestContext } from "@/lib/telemetry/request-context";

export async function GET() {
  const context = await getRequestContext();

  return Response.json({
    status: "ok",
    app: "prosperpals",
    phase: "implementation",
    step: "sprint-0-foundation-and-trust-scaffolding",
    requestId: context.requestId,
    traceId: context.traceId,
    runtime: context.runtime
  });
}
