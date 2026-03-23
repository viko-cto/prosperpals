import Link from "next/link";
import { requireViewerSession } from "@/lib/auth/session";
import { recordSupportTimelineViewAudit } from "@/lib/audit/demo-audit";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";
import { getDemoSupportConsole } from "@/lib/support/demo-support";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";
import {
  applyReceiptCapturePauseAction,
  clearReceiptCapturePauseAction
} from "./actions";

type SupportPageProps = {
  searchParams?: Promise<{ intervention?: string }>;
};

export default async function SupportPage({ searchParams }: SupportPageProps) {
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
  const resolved = (await searchParams) ?? {};
  const activeReceiptCapturePause = supportConsole.activeInterventions.find(
    (intervention) => intervention.code === "receipt_capture_paused"
  );

  const logPreview = toStructuredLog("support.timeline.rendered", requestContext, {
    support_trace_view: flags.supportTraceView,
    timeline_count: supportConsole.timeline.length,
    active_intervention_count: supportConsole.activeInterventions.length,
    receipt_capture_paused: Boolean(activeReceiptCapturePause),
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

        {resolved.intervention ? (
          <section className="panel" style={{ marginBottom: 24 }}>
            <h2>Latest intervention update</h2>
            <p>
              {resolved.intervention === "receipt-capture-paused"
                ? "Receipt capture is now paused for this subject until an internal reviewer clears it."
                : "Receipt capture pause was cleared, so the intake lane is open again."}
            </p>
          </section>
        ) : null}

        <section className="grid cols-2" style={{ alignItems: "start" }}>
          <article className="hero">
            <div className="grid" style={{ gap: 14 }}>
              <span className="badge">Internal support surface</span>
              <p>
                This timeline is the boring, important part: one place to inspect onboarding,
                rewards, trades, receipts, and operator actions without reading raw runtime files
                by hand.
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

        <section className="grid cols-2" style={{ marginTop: 24, alignItems: "start" }}>
          <article className="panel">
            <div className="panel-header-row">
              <h2>Current intervention state</h2>
              <span className={activeReceiptCapturePause ? "status-pill status-pill--stale" : "status-pill status-pill--verified"}>
                {activeReceiptCapturePause ? "Receipt capture paused" : "No active hold"}
              </span>
            </div>
            {activeReceiptCapturePause ? (
              <div className="grid" style={{ gap: 12, marginTop: 16 }}>
                <div className="card compact-card">
                  <strong>Receipt intake is paused</strong>
                  <span className="muted-line">New receipt candidates are blocked until support clears the hold.</span>
                </div>
                <div className="meta">
                  <div><strong>Reason</strong>: {activeReceiptCapturePause.reason}</div>
                  <div><strong>Applied at</strong>: {activeReceiptCapturePause.occurredAt}</div>
                  <div><strong>Actor</strong>: {activeReceiptCapturePause.actorUserId ?? "unknown"}</div>
                  <div><strong>Subject</strong>: {activeReceiptCapturePause.subjectUserId ?? session.userId}</div>
                </div>
                <form action={clearReceiptCapturePauseAction} className="grid" style={{ gap: 12 }}>
                  <input type="hidden" name="subjectUserId" value={session.userId} />
                  <label>
                    <span className="field-label">Clear reason</span>
                    <input type="text" name="reason" defaultValue="receipt capture reopened after support review" />
                  </label>
                  <button className="primary" type="submit">Clear receipt capture pause</button>
                </form>
              </div>
            ) : (
              <div className="grid" style={{ gap: 12, marginTop: 16 }}>
                <p>
                  No active receipt-intake hold is in force for this subject. If a trust-critical
                  receipt issue appears, pause the lane here so the product stops accepting new
                  candidates before support review finishes.
                </p>
                <form action={applyReceiptCapturePauseAction} className="grid" style={{ gap: 12 }}>
                  <input type="hidden" name="subjectUserId" value={session.userId} />
                  <label>
                    <span className="field-label">Pause reason</span>
                    <input type="text" name="reason" defaultValue="receipt lineage review in progress" />
                  </label>
                  <button className="primary" type="submit">Pause receipt capture</button>
                </form>
              </div>
            )}
          </article>

          <article className="panel">
            <h2>What this intervention rail proves</h2>
            <ul className="list" style={{ marginTop: 16 }}>
              <li>Support actions are no longer limited to a passive page-view audit.</li>
              <li>Receipt-intake pause and resume actions now write actor/subject/request/trace-scoped audit events.</li>
              <li>The audit trail also drives live receipt-capture blocking instead of acting like a decorative log.</li>
              <li>The control is still narrow by design: same-subject proof, not hosted multi-account admin power.</li>
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
