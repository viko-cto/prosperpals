import Link from "next/link";
import { requireViewerSession } from "@/lib/auth/session";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";
import { formatCurrency, getFirstValueDurationSeconds } from "@/lib/finance/first-value";
import { getDemoOnboardingState, getIntentLabel } from "@/lib/onboarding/demo-state";
import { getDemoAnalyticsSummary } from "@/lib/telemetry/demo-event-store";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";

export default async function AppHomePage() {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const onboardingState = await getDemoOnboardingState();
  const analytics = await getDemoAnalyticsSummary(session.userId);
  const flags = evaluateFeatureFlags({
    countryCode: "DK",
    internalUser: session.email.endsWith("@prosperpals.local")
  });
  const firstValueSeconds = onboardingState.firstValueCompletedAt
    ? getFirstValueDurationSeconds(onboardingState.onboardingStartedAt, onboardingState.firstValueCompletedAt)
    : null;

  const logPreview = toStructuredLog("app.shell.rendered", requestContext, {
    auth_provider: session.authProvider,
    rollout: onboardingState.firstValueCompletedAt ? "sprint-1-chunk-2" : "sprint-0",
    selected_intent: onboardingState.selectedIntent,
    first_value_completed: Boolean(onboardingState.firstValueCompletedAt),
    first_value_seconds: firstValueSeconds,
    durable_event_count: analytics.eventCount,
    durable_target_met: analytics.targetMet
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
            <h2>Home card state</h2>
            <ul className="list">
              <li><strong>Selected path:</strong> {getIntentLabel(onboardingState.selectedIntent)}</li>
              <li><strong>Mode:</strong> {onboardingState.mode.toUpperCase()}</li>
              <li><strong>First value:</strong> {onboardingState.firstValueCompletedAt ? "Complete" : "Not yet complete"}</li>
              <li><strong>Target:</strong> under 80 seconds to first useful money insight</li>
              <li><strong>Durable events:</strong> {analytics.eventCount}</li>
            </ul>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link className="button primary" href={`/app/onboarding?intent=${onboardingState.selectedIntent}`}>
                {onboardingState.firstValueCompletedAt ? "Refine onboarding flow" : "Complete first-value flow"}
              </Link>
            </div>
          </article>
        </section>

        <section className="grid cols-3" style={{ marginTop: 24 }}>
          <article className="card compact-card">
            <span className="eyebrow">Daily Spending Power</span>
            <strong>
              {onboardingState.firstInsight
                ? `${formatCurrency(onboardingState.firstInsight.dailySpendingPowerMinor, onboardingState.firstInsight.currency)}/day`
                : "Waiting for first money event"}
            </strong>
            <span className="muted-line">
              {analytics.targetMet == null
                ? "No timed first-value event captured yet."
                : analytics.targetMet
                  ? `Target met in ${firstValueSeconds ?? analytics.latestFirstValue?.firstValueSeconds ?? 0}s.`
                  : `Target missed at ${firstValueSeconds ?? analytics.latestFirstValue?.firstValueSeconds ?? 0}s.`}
            </span>
          </article>

          <article className="card compact-card">
            <span className="eyebrow">Goldie</span>
            <strong>{onboardingState.firstInsight?.headline ?? "No first insight yet"}</strong>
            <span className="muted-line">
              {onboardingState.firstMoneyEvent
                ? `${formatCurrency(onboardingState.firstMoneyEvent.amountMinor, onboardingState.firstMoneyEvent.currency)} at ${onboardingState.firstMoneyEvent.merchantLabel}`
                : "Log one recent spend to make the home card feel alive."}
            </span>
          </article>

          <article className="card compact-card">
            <span className="eyebrow">Fin readiness</span>
            <strong>{onboardingState.finHandoff?.handoffHeadline ?? "Fin stays parked until Goldie has signal"}</strong>
            <span className="muted-line">
              {onboardingState.finHandoff?.starterAssets?.length
                ? `${onboardingState.finHandoff.starterAssets.length} starter assets staged for education-first handoff.`
                : "Starter asset preview will appear after intent selection or first-value completion."}
            </span>
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>First-value summary</h2>
            {onboardingState.firstInsight && onboardingState.firstMoneyEvent ? (
              <div className="grid" style={{ gap: 14 }}>
                <div className="card compact-card">
                  <strong>{onboardingState.firstInsight.headline}</strong>
                  <p>{onboardingState.firstInsight.body}</p>
                </div>
                <div className="meta">
                  <div>
                    <strong>Logged event</strong>: {formatCurrency(onboardingState.firstMoneyEvent.amountMinor, onboardingState.firstMoneyEvent.currency)} at {onboardingState.firstMoneyEvent.merchantLabel}
                  </div>
                  <div>
                    <strong>Daily Spending Power</strong>: {formatCurrency(onboardingState.firstInsight.dailySpendingPowerMinor, onboardingState.firstInsight.currency)}/day
                  </div>
                  <div>
                    <strong>Measured time to value</strong>: {firstValueSeconds ?? analytics.latestFirstValue?.firstValueSeconds ?? "n/a"}s
                  </div>
                </div>
              </div>
            ) : (
              <p>
                Sprint 1 chunk 2 is wired, but this account has not completed the first-value flow yet.
                Run onboarding once and the app will stop feeling like an empty scaffold.
              </p>
            )}
          </article>

          <article className="panel">
            <h2>Durable analytics timeline</h2>
            {analytics.recentEvents.length ? (
              <div className="grid" style={{ gap: 12 }}>
                {analytics.recentEvents.map((event) => (
                  <div key={`${event.occurredAt}-${event.event}`} className="card compact-card">
                    <strong>{event.event}</strong>
                    <span className="muted-line">{new Date(event.occurredAt).toLocaleString("en-DK", { dateStyle: "short", timeStyle: "medium", timeZone: "UTC" })} UTC</span>
                    <span className="muted-line">Intent: {event.selectedIntent} · Mode: {event.mode.toUpperCase()}</span>
                    {event.headline ? <span className="muted-line">{event.headline}</span> : null}
                  </div>
                ))}
              </div>
            ) : (
              <p>No durable analytics events yet. Saving preferences or completing onboarding will append them.</p>
            )}
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Structured log preview</h2>
            <pre>{JSON.stringify(logPreview, null, 2)}</pre>
          </article>

          <article className="panel">
            <h2>What Sprint 1 chunk 2 now unlocks</h2>
            <ul className="list">
              <li>The protected shell now behaves like a real home card instead of a scaffolding dump.</li>
              <li>Onboarding choices and first-value completion append to a durable event sink.</li>
              <li>Measured time-to-value can be inspected after the redirect, not only inside ephemeral action state.</li>
              <li>Goldie/Fin surfaces now have a visible bridge into the upcoming reward and simulator slice.</li>
            </ul>
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Server-evaluated flags</h2>
            <pre>{JSON.stringify(flags, null, 2)}</pre>
          </article>

          <article className="panel">
            <h2>Analytics sink</h2>
            <div className="meta">
              <div><strong>Path</strong>: <code>{analytics.sinkPath}</code></div>
              <div><strong>Recent event count</strong>: {analytics.eventCount}</div>
              <div><strong>Latest target verdict</strong>: {analytics.targetMet == null ? "Not measured yet" : analytics.targetMet ? "Met" : "Missed"}</div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
