import Link from "next/link";
import { recordSupportTimelineViewAudit } from "@/lib/audit/demo-audit";
import {
  isInternalOperatorEmail,
  requireViewerSession
} from "@/lib/auth/session";
import { getEffectiveFeatureFlags } from "@/lib/feature-flags/config";
import {
  describeOperatorRole,
  getOperatorCapabilities,
  hasOperatorCapability
} from "@/lib/support/operator-access";
import { getDemoSupportConsole } from "@/lib/support/demo-support";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";
import {
  applyReceiptCapturePauseAction,
  applyReleaseFlagOverrideAction,
  clearReceiptCapturePauseAction,
  clearReleaseFlagOverrideAction
} from "./actions";

type SupportPageProps = {
  searchParams?: Promise<{ intervention?: string; releaseOverride?: string }>;
};

const releaseFlagMeta = {
  receiptCapture: {
    title: "Receipt capture",
    summary: "Global kill switch for new receipt candidate creation during hosted-alpha trust review.",
    fallbackDisableReason: "receipt capture kill switch engaged during hosted-alpha hardening review",
    fallbackClearReason: "receipt capture audited override cleared after hosted-alpha review"
  },
  simulatorStarter: {
    title: "Fin simulator starter",
    summary: "Global kill switch for the ProsperCoins-to-simulator starter trade loop.",
    fallbackDisableReason: "simulator starter kill switch engaged during hosted-alpha hardening review",
    fallbackClearReason: "simulator starter audited override cleared after hosted-alpha review"
  }
} as const;

export default async function SupportPage({ searchParams }: SupportPageProps) {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const internalUser = isInternalOperatorEmail(session.email);
  const flags = await getEffectiveFeatureFlags({
    countryCode: "DK",
    internalUser
  });
  const roleLabel = describeOperatorRole(session.operatorRole);
  const capabilityLabels = getOperatorCapabilities(session.operatorRole).map((capability) => capability.replaceAll("_", " "));
  const canViewSupportTimeline = hasOperatorCapability(session.operatorRole, "support_timeline_view");
  const canManageReceiptHold = hasOperatorCapability(session.operatorRole, "receipt_capture_intervention");
  const canManageReleaseOverrides = hasOperatorCapability(session.operatorRole, "release_flag_override");

  if (!flags.supportTraceView || !canViewSupportTimeline) {
    return (
      <main>
        <div className="shell">
          <div className="panel">
            <h1>Support trace view is unavailable</h1>
            <p>
              This route is intentionally internal-only and also requires a role with
              <code> support_timeline_view </code> capability. Turn on the support trace flag for
              an internal user before exposing the operator timeline.
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
    supportTraceView: flags.supportTraceView,
    roleUsed: session.operatorRole
  });

  const supportConsole = await getDemoSupportConsole(session.userId, {
    countryCode: "DK",
    internalUser
  });
  const resolved = (await searchParams) ?? {};
  const activeReceiptCapturePause = supportConsole.activeInterventions.find(
    (intervention) => intervention.code === "receipt_capture_paused"
  );
  const activeReleaseOverrideByFlag = new Map(
    supportConsole.activeReleaseOverrides.map((override) => [override.flagName, override])
  );

  const logPreview = toStructuredLog("support.timeline.rendered", requestContext, {
    support_trace_view: flags.supportTraceView,
    operator_role: session.operatorRole,
    timeline_count: supportConsole.timeline.length,
    active_intervention_count: supportConsole.activeInterventions.length,
    active_release_override_count: supportConsole.activeReleaseOverrides.length,
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

        {resolved.releaseOverride ? (
          <section className="panel" style={{ marginBottom: 24 }}>
            <h2>Latest release override update</h2>
            <p>
              {resolved.releaseOverride.endsWith("-disabled")
                ? `${resolved.releaseOverride.replace(/-disabled$/, "")} is now forced off through an actor-audited release override.`
                : `${resolved.releaseOverride.replace(/-cleared$/, "")} returned to baseline flag evaluation after the override was cleared.`}
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
            <h2>Current role boundary</h2>
            <div className="grid" style={{ gap: 10, marginTop: 16 }}>
              <div><strong>Viewer role</strong>: {roleLabel}</div>
              <div><strong>Email</strong>: {session.email}</div>
              <div><strong>Capabilities</strong>: {capabilityLabels.length ? capabilityLabels.join(", ") : "none"}</div>
              <div className="muted-line">
                Receipt holds are support-only. Release overrides are admin-only. Founder/operator
                temporarily carries both hats while hosted role assignment stays unresolved.
              </div>
            </div>
          </article>
        </section>

        <section className="panel" style={{ marginTop: 24 }}>
          <h2>Redaction policy</h2>
          <ul className="list" style={{ marginTop: 16 }}>
            {supportConsole.redactionPolicy.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
                  <div><strong>Role used</strong>: {activeReceiptCapturePause.roleUsed ?? "unspecified"}</div>
                </div>
                {canManageReceiptHold ? (
                  <form action={clearReceiptCapturePauseAction} className="grid" style={{ gap: 12 }}>
                    <input type="hidden" name="subjectUserId" value={session.userId} />
                    <label>
                      <span className="field-label">Clear reason</span>
                      <input type="text" name="reason" defaultValue="receipt capture reopened after support review" />
                    </label>
                    <button className="primary" type="submit">Clear receipt capture pause</button>
                  </form>
                ) : (
                  <p className="muted-line">This role can inspect the active hold but cannot clear it.</p>
                )}
              </div>
            ) : (
              <div className="grid" style={{ gap: 12, marginTop: 16 }}>
                <p>
                  No active receipt-intake hold is in force for this subject. If a trust-critical
                  receipt issue appears, pause the lane here so the product stops accepting new
                  candidates before support review finishes.
                </p>
                {canManageReceiptHold ? (
                  <form action={applyReceiptCapturePauseAction} className="grid" style={{ gap: 12 }}>
                    <input type="hidden" name="subjectUserId" value={session.userId} />
                    <label>
                      <span className="field-label">Pause reason</span>
                      <input type="text" name="reason" defaultValue="receipt lineage review in progress" />
                    </label>
                    <button className="primary" type="submit">Pause receipt capture</button>
                  </form>
                ) : (
                  <p className="muted-line">This role can review the timeline but cannot apply the support-only receipt hold.</p>
                )}
              </div>
            )}
          </article>

          <article className="panel">
            <h2>What this intervention rail proves</h2>
            <ul className="list" style={{ marginTop: 16 }}>
              <li>Support actions are no longer limited to a passive page-view audit.</li>
              <li>Receipt-intake pause and resume actions now write actor/subject/request/trace-scoped audit events.</li>
              <li>The audit trail now records which operator role was used for each action.</li>
              <li>Release overrides are explicitly separated from support-safe receipt holds instead of hiding behind one broad internal gate.</li>
              <li>The control is still narrow by design: same-subject proof, not hosted multi-account admin power.</li>
            </ul>
          </article>
        </section>

        <section className="panel" style={{ marginTop: 24 }}>
          <div className="panel-header-row">
            <h2>Audited release overrides</h2>
            <span className="eyebrow">Global safety toggles</span>
          </div>
          <div className="grid cols-2" style={{ marginTop: 16, alignItems: "start" }}>
            {(Object.keys(releaseFlagMeta) as Array<keyof typeof releaseFlagMeta>).map((flagName) => {
              const meta = releaseFlagMeta[flagName];
              const activeOverride = activeReleaseOverrideByFlag.get(flagName);
              const flagEnabled = flags[flagName];

              return (
                <div key={flagName} className="card compact-card" style={{ gap: 12 }}>
                  <div className="panel-header-row">
                    <strong>{meta.title}</strong>
                    <span className={flagEnabled ? "status-pill status-pill--verified" : "status-pill status-pill--stale"}>
                      {flagEnabled ? "Enabled" : activeOverride ? "Forced off" : "Disabled"}
                    </span>
                  </div>
                  <span className="muted-line">{meta.summary}</span>
                  {activeOverride ? (
                    <div className="meta">
                      <div><strong>Reason</strong>: {activeOverride.reason}</div>
                      <div><strong>Applied at</strong>: {activeOverride.occurredAt}</div>
                      <div><strong>Actor</strong>: {activeOverride.actorUserId ?? "unknown"}</div>
                      <div><strong>Role used</strong>: {activeOverride.roleUsed ?? "unspecified"}</div>
                      <div><strong>Scope</strong>: {activeOverride.scope}</div>
                    </div>
                  ) : (
                    <div className="meta">
                      <div><strong>Baseline state</strong>: {flagEnabled ? "enabled" : "disabled by default/env"}</div>
                      <div><strong>Current source</strong>: audited override not active</div>
                    </div>
                  )}
                  {canManageReleaseOverrides ? (
                    activeOverride ? (
                      <form action={clearReleaseFlagOverrideAction} className="grid" style={{ gap: 12 }}>
                        <input type="hidden" name="flagName" value={flagName} />
                        <label>
                          <span className="field-label">Clear reason</span>
                          <input type="text" name="reason" defaultValue={meta.fallbackClearReason} />
                        </label>
                        <button className="primary" type="submit">Clear audited override</button>
                      </form>
                    ) : (
                      <form action={applyReleaseFlagOverrideAction} className="grid" style={{ gap: 12 }}>
                        <input type="hidden" name="flagName" value={flagName} />
                        <label>
                          <span className="field-label">Disable reason</span>
                          <input type="text" name="reason" defaultValue={meta.fallbackDisableReason} />
                        </label>
                        <button className="primary" type="submit">Force off with audit trail</button>
                      </form>
                    )
                  ) : (
                    <p className="muted-line">This control is admin-only. Non-admin roles can see the current release state but cannot change it here.</p>
                  )}
                </div>
              );
            })}
          </div>
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
              <div><strong>Active audited overrides</strong>: {supportConsole.releaseSafety.activeOverrides.length}</div>
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
