import Link from "next/link";
import { requireViewerSession } from "@/lib/auth/session";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";
import { formatCurrency, getFirstValueDurationSeconds } from "@/lib/finance/first-value";
import { getDemoOnboardingState, getIntentLabel } from "@/lib/onboarding/demo-state";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";

export default async function AppHomePage() {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const onboardingState = await getDemoOnboardingState();
  const flags = evaluateFeatureFlags({
    countryCode: "DK",
    internalUser: session.email.endsWith("@prosperpals.local")
  });
  const firstValueSeconds = onboardingState.firstValueCompletedAt
    ? getFirstValueDurationSeconds(onboardingState.onboardingStartedAt, onboardingState.firstValueCompletedAt)
    : null;

  const logPreview = toStructuredLog("app.shell.rendered", requestContext, {
    auth_provider: session.authProvider,
    rollout: onboardingState.firstValueCompletedAt ? "sprint-1-chunk-1" : "sprint-0",
    selected_intent: onboardingState.selectedIntent,
    first_value_completed: Boolean(onboardingState.firstValueCompletedAt),
    first_value_seconds: firstValueSeconds
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
            <h2>Onboarding state</h2>
            <ul className="list">
              <li><strong>Selected path:</strong> {getIntentLabel(onboardingState.selectedIntent)}</li>
              <li><strong>Mode:</strong> {onboardingState.mode.toUpperCase()}</li>
              <li><strong>First value:</strong> {onboardingState.firstValueCompletedAt ? "Complete" : "Not yet complete"}</li>
              <li><strong>Target:</strong> under 80 seconds to first useful money insight</li>
            </ul>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link className="button primary" href={`/app/onboarding?intent=${onboardingState.selectedIntent}`}>
                {onboardingState.firstValueCompletedAt ? "Refine onboarding flow" : "Complete first-value flow"}
              </Link>
            </div>
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
                    <strong>Measured time to value</strong>: {firstValueSeconds ?? "n/a"}s
                  </div>
                </div>
              </div>
            ) : (
              <p>
                Sprint 1 chunk 1 is wired, but this account has not completed the first-value flow yet.
                Run onboarding once and the app will stop feeling like an empty scaffold.
              </p>
            )}
          </article>

          <article className="panel">
            <h2>Structured log preview</h2>
            <pre>{JSON.stringify(logPreview, null, 2)}</pre>
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Server-evaluated flags</h2>
            <pre>{JSON.stringify(flags, null, 2)}</pre>
          </article>

          <article className="panel">
            <h2>What Sprint 1 chunk 1 now unlocks</h2>
            <ul className="list">
              <li>Budget-first and invest-first onboarding routes now behave like real product paths.</li>
              <li>Goldie can produce one first useful insight before any bank-linking dependency exists.</li>
              <li>The protected shell can render visible progress instead of just infrastructure metadata.</li>
              <li>Fin handoff posture is visible without pretending the simulator trade loop already exists.</li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
