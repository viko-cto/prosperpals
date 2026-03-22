import Link from "next/link";
import { requireViewerSession } from "@/lib/auth/session";
import { recordSupportTimelineViewAudit } from "@/lib/audit/demo-audit";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";
import { getDemoSupportConsole } from "@/lib/support/demo-support";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";

export default async function SupportPage() {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const internalUser = session.email.endsWith("@prosperpals.local");
  const flags = evaluateFeatureFlags({
    countryCode: "DK",
    internalUser
  });

  if (!flags.supportTraceView) {
    return (
      <main>
        <div className="shell">
          <div className="panel">
            <h1>Support trace view is disabled</h1>
            <p>
              This route is intentionally internal-only. Turn on the support trace flag for an
              internal user before exposing the operator timeline.
            </p>
            <div className="actions" style={{ marginTop: 16 }}>
              <Link className="button secondary" href="/app">Back to app home</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  await recordSupportTimelineViewAudit({
    actorUserId: session.userId,
    subjectUserId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: requestContext.path,
    reason: "internal support timeline review",
    supportTraceView: flags.supportTraceView
  });

  const supportConsole = await getDemoSupportConsole(session.userId, {
    countryCode: "DK",
    internalUser
  });

  const logPreview = toStructuredLog("support.timeline.rendered", requestContext, {
    support_trace_view: flags.supportTraceView,
    timeline_count: supportConsole.timeline.length,
    release_checks: supportConsole.releaseSafety.checks.length
  });

  return (
    <main>
      <div className="shell">
        <div className="header">
          <div>
            <span className="eyebrow">Sprint 3 slice</span>
            <h1 style={{ marginTop: 12 }}>Operator timeline + release safety</h1>
          </div>
          <div className="actions">
            <Link className="button secondary" href="/app/explainability">Explainability</Link>
            <Link className="button secondary" href="/app">Back to app home</Link>
          </div>
        </div>

        <section className="grid cols-2" style={{ alignItems: "start" }}>
          <article className="hero">
            <div className="grid" style={{ gap: 14 }}>
              <span className="badge">Internal support surface</span>
              <p>
                This timeline is the boring, important part: one place to inspect onboarding,
                rewards, trades, and receipt review states without reading raw storage files by hand.
              </p>
            </div>
          </article>

          <article className="panel">
            <h2>Redaction policy</h2>
            <ul className="list">
              {supportConsole.redactionPolicy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="panel" style={{ marginTop: 24 }}>
          <div className="panel-header-row">
            <h2>Support timeline</h2>
            <span className="eyebrow">{supportConsole.timeline.length} recent items</span>
          </div>
          <div className="timeline" style={{ marginTop: 16 }}>
            {supportConsole.timeline.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-item__meta">
                  <strong>{item.title}</strong>
                  <span className="muted-line">{item.occurredAt}</span>
                </div>
                <div className="timeline-item__body">
                  <p>{item.subtitle}</p>
                  <ul className="list">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <div className="meta" style={{ marginTop: 8 }}>
                    {item.requestId ? <div><strong>Request</strong>: <code>{item.requestId}</code></div> : null}
                    {item.traceId ? <div><strong>Trace</strong>: <code>{item.traceId}</code></div> : null}
                    <div><strong>Source</strong>: {item.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24, alignItems: "start" }}>
          <article className="panel">
            <h2>Release safety checks</h2>
            <div className="grid" style={{ gap: 12, marginTop: 16 }}>
              {supportConsole.releaseSafety.checks.map((check) => (
                <div key={check.id} className="card compact-card">
                  <div className="panel-header-row">
                    <strong>{check.label}</strong>
                    <span className={check.ok ? "status-pill status-pill--verified" : "status-pill status-pill--stale"}>
                      {check.ok ? "OK" : "Needs attention"}
                    </span>
                  </div>
                  <span className="muted-line">{check.detail}</span>
                </div>
              ))}
            </div>
            <div className="meta" style={{ marginTop: 16 }}>
              <div><strong>Migration dir</strong>: <code>{supportConsole.releaseSafety.migrationDir}</code></div>
              <div><strong>Latest migration</strong>: {supportConsole.releaseSafety.latestMigration ?? "none"}</div>
              <div><strong>Monotonic filenames</strong>: {supportConsole.releaseSafety.monotonic ? "yes" : "no"}</div>
            </div>
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
