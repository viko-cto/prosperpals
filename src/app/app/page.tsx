import { requireViewerSession } from "@/lib/auth/session";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";

export default async function AppHomePage() {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const flags = evaluateFeatureFlags({
    countryCode: "DK",
    internalUser: session.email.endsWith("@prosperpals.local")
  });

  const logPreview = toStructuredLog("app.shell.rendered", requestContext, {
    auth_provider: session.authProvider,
    rollout: "sprint-0"
  });

  return (
    <main>
      <div className="shell">
        <div className="header">
          <div>
            <span className="eyebrow">Protected route</span>
            <h1 style={{ marginTop: 12 }}>ProsperPals app shell</h1>
          </div>
          <form action="/auth/sign-out" method="post">
            <button className="secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>

        <section className="grid cols-2">
          <article className="panel">
            <div className="badge">Authenticated boundary live</div>
            <div className="meta" style={{ marginTop: 18 }}>
              <div><strong>User</strong>: {session.email}</div>
              <div><strong>User ID</strong>: <code>{session.userId}</code></div>
              <div><strong>Request ID</strong>: <code>{requestContext.requestId}</code></div>
              <div><strong>Trace ID</strong>: <code>{requestContext.traceId}</code></div>
              <div><strong>Path</strong>: <code>{requestContext.path}</code></div>
            </div>
          </article>

          <article className="panel">
            <h2>What Sprint 1 now unlocks</h2>
            <ul className="list">
              <li>Budget-first and invest-first onboarding routes can reuse this auth shell.</li>
              <li>Goldie and Fin handoff can inherit request-scoped tracing from day one.</li>
              <li>Canonical money/reward/trade writes can stay idempotent under retries.</li>
              <li>Feature rollouts can stay cohort-based instead of turning into env forks.</li>
            </ul>
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Server-evaluated flags</h2>
            <pre>{JSON.stringify(flags, null, 2)}</pre>
          </article>

          <article className="panel">
            <h2>Structured log preview</h2>
            <pre>{JSON.stringify(logPreview, null, 2)}</pre>
          </article>
        </section>
      </div>
    </main>
  );
}
