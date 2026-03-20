import Link from "next/link";
import { requireViewerSession } from "@/lib/auth/session";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";
import { formatCurrency, getFirstValueDurationSeconds } from "@/lib/finance/first-value";
import { getDemoOnboardingState, getIntentLabel } from "@/lib/onboarding/demo-state";
import { getDemoReceiptReviewState } from "@/lib/receipts/demo-receipts";
import { formatProsperCoins, getDemoRewardLoopSummary } from "@/lib/simulator/demo-simulator";
import { getDemoAnalyticsSummary } from "@/lib/telemetry/demo-event-store";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";

export default async function AppHomePage() {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const onboardingState = await getDemoOnboardingState();
  const analytics = await getDemoAnalyticsSummary(session.userId);
  const rewardLoop = await getDemoRewardLoopSummary(session.userId);
  const receiptState = await getDemoReceiptReviewState(session.userId);
  const flags = evaluateFeatureFlags({
    countryCode: "DK",
    internalUser: session.email.endsWith("@prosperpals.local")
  });
  const firstValueSeconds = onboardingState.firstValueCompletedAt
    ? getFirstValueDurationSeconds(onboardingState.onboardingStartedAt, onboardingState.firstValueCompletedAt)
    : null;

  const logPreview = toStructuredLog("app.shell.rendered", requestContext, {
    auth_provider: session.authProvider,
    rollout: receiptState.pendingCandidate || receiptState.latestConfirmed
      ? "sprint-3"
      : rewardLoop.portfolio.positionCount
        ? "sprint-2"
        : onboardingState.firstValueCompletedAt
          ? "sprint-1-chunk-2"
          : "sprint-0",
    selected_intent: onboardingState.selectedIntent,
    first_value_completed: Boolean(onboardingState.firstValueCompletedAt),
    first_value_seconds: firstValueSeconds,
    available_coins: rewardLoop.availableCoins,
    position_count: rewardLoop.portfolio.positionCount,
    durable_event_count: analytics.eventCount,
    durable_target_met: analytics.targetMet,
    receipt_confirmation_count: receiptState.confirmationCount,
    receipt_pending_candidate: receiptState.pendingCandidate?.candidateId ?? null
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
              <li><strong>Available ProsperCoins:</strong> {formatProsperCoins(rewardLoop.availableCoins)}</li>
              <li><strong>Starter trade:</strong> {rewardLoop.portfolio.positionCount ? "Executed" : "Not yet executed"}</li>
              <li><strong>Durable events:</strong> {analytics.eventCount}</li>
            </ul>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link className="button primary" href={`/app/onboarding?intent=${onboardingState.selectedIntent}`}>
                {onboardingState.firstValueCompletedAt ? "Refine onboarding flow" : "Complete first-value flow"}
              </Link>
              <Link className="button secondary" href="/app/simulator">
                {rewardLoop.portfolio.positionCount ? "Review Fin portfolio" : "Open Fin simulator"}
              </Link>
              <Link className="button secondary" href="/app/receipts">
                {receiptState.pendingCandidate ? "Review receipt candidate" : "Open receipt review"}
              </Link>
              <Link className="button secondary" href="/app/explainability">
                Why am I seeing this?
              </Link>
              {flags.supportTraceView ? (
                <Link className="button secondary" href="/app/support">
                  Operator timeline
                </Link>
              ) : null}
            </div>
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
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
            <span className="eyebrow">ProsperCoins</span>
            <strong>{formatProsperCoins(rewardLoop.availableCoins)}</strong>
            <span className="muted-line">
              {rewardLoop.latestReward?.explanation ?? "No reward posted yet. The first awareness action should fund the simulator bridge."}
            </span>
          </article>

          <article className="card compact-card">
            <span className="eyebrow">Goldie</span>
            <strong>{onboardingState.firstInsight?.headline ?? "No first insight yet"}</strong>
            <span className="muted-line">
              {onboardingState.firstMoneyEvent
                ? `${formatCurrency(onboardingState.firstMoneyEvent.amountMinor, onboardingState.firstMoneyEvent.currency)} at ${onboardingState.firstMoneyEvent.merchantLabel} · provenance: ${onboardingState.firstMoneyEvent.sourceType === "manual" ? "manual confirmed" : "reviewed parse"}`
                : "Log one recent spend to make the home card feel alive."}
            </span>
          </article>

          <article className="card compact-card">
            <span className="eyebrow">Fin portfolio</span>
            <strong>
              {rewardLoop.latestTrade
                ? `${rewardLoop.latestTrade.assetName} starter slice active`
                : onboardingState.finHandoff?.handoffHeadline ?? "Fin stays parked until Goldie has signal"}
            </strong>
            <span className="muted-line">
              {rewardLoop.latestTrade
                ? `${formatProsperCoins(rewardLoop.portfolio.estimatedValueCoins)} current estimate · ${rewardLoop.latestTrade.quoteFreshnessLabel}`
                : onboardingState.finHandoff?.starterAssets?.length
                  ? `${onboardingState.finHandoff.starterAssets.length} launch assets staged for the first trade.`
                  : "Starter asset preview will appear after intent selection or first-value completion."}
            </span>
          </article>

          <article className="card compact-card">
            <span className="eyebrow">Receipt review</span>
            <strong>
              {receiptState.pendingCandidate
                ? "Candidate waiting for review"
                : receiptState.latestConfirmed
                  ? "Latest receipt confirmed"
                  : "No receipt activity yet"}
            </strong>
            <span className="muted-line">
              {receiptState.pendingCandidate
                ? `${receiptState.pendingCandidate.merchantLabel} · ${Math.round(receiptState.pendingCandidate.confidenceScore * 100)}% confidence`
                : receiptState.latestConfirmed
                  ? `${receiptState.latestConfirmed.merchantLabel} · parsed then user-reviewed`
                  : "Sprint 3 adds candidate-first OCR review so ambiguous scans never post magically."}
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
            <h2>Reward loop + portfolio summary</h2>
            {rewardLoop.portfolio.positionCount ? (
              <div className="grid" style={{ gap: 12 }}>
                <div className="card compact-card">
                  <strong>{rewardLoop.latestTrade?.assetName}</strong>
                  <span className="muted-line">Invested {formatProsperCoins(rewardLoop.portfolio.investedCoins)} · current estimate {formatProsperCoins(rewardLoop.portfolio.estimatedValueCoins)}</span>
                  <span className="muted-line">{rewardLoop.latestTrade?.learningHeadline}</span>
                </div>
                {rewardLoop.portfolio.positions.map((position) => (
                  <div key={position.assetId} className="card compact-card">
                    <strong>{position.assetName}</strong>
                    <span className="muted-line">{position.units.toFixed(4)} units · {position.freshnessLabel}</span>
                    <span className="muted-line">Cost {formatProsperCoins(position.costCoins)} · value {formatProsperCoins(position.currentValueCoins)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid" style={{ gap: 12 }}>
                <p>
                  No starter trade yet. Goldie has done the first-value work; the next honest step is
                  sending ProsperCoins into one Fin-led virtual position with visible quote freshness.
                </p>
                <div className="actions">
                  <Link className="button primary" href="/app/simulator">
                    Run starter trade
                  </Link>
                </div>
              </div>
            )}
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Structured log preview</h2>
            <pre>{JSON.stringify(logPreview, null, 2)}</pre>
          </article>

          <article className="panel">
            <h2>What the current build now proves</h2>
            <ul className="list">
              <li>ProsperCoins are awarded for awareness actions with a visible reason instead of a vague score bump.</li>
              <li>Fin gets an explicit starter simulator route rather than a hand-wavy “coming soon” promise.</li>
              <li>Quote freshness is shown honestly, including trade-blocking when the feed is too stale.</li>
              <li>Receipt OCR now enters through a candidate-first review path instead of auto-posting magical certainty.</li>
              <li>Explainability and operator traces exist before this turns into a larger finance product.</li>
            </ul>
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Server-evaluated flags</h2>
            <pre>{JSON.stringify(flags, null, 2)}</pre>
          </article>

          <article className="panel">
            <h2>Runtime sinks</h2>
            <div className="meta">
              <div><strong>Analytics path</strong>: <code>{analytics.sinkPath}</code></div>
              <div><strong>Ledger path</strong>: <code>{rewardLoop.ledgerPath}</code></div>
              <div><strong>Recent event count</strong>: {analytics.eventCount}</div>
              <div><strong>Latest target verdict</strong>: {analytics.targetMet == null ? "Not measured yet" : analytics.targetMet ? "Met" : "Missed"}</div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
