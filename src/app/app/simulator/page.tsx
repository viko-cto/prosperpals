import Link from "next/link";
import { requireViewerSession } from "@/lib/auth/session";
import { formatCurrency } from "@/lib/finance/first-value";
import { getDemoOnboardingState } from "@/lib/onboarding/demo-state";
import {
  formatProsperCoins,
  getDemoRewardLoopSummary
} from "@/lib/simulator/demo-simulator";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";
import { submitStarterTradeAction } from "./actions";

type SimulatorPageProps = {
  searchParams?: Promise<{ trade?: string; asset?: string }>;
};

export default async function SimulatorPage({ searchParams }: SimulatorPageProps) {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const onboardingState = await getDemoOnboardingState();
  const rewardLoop = await getDemoRewardLoopSummary(session.userId);
  const resolved = (await searchParams) ?? {};

  const logPreview = toStructuredLog("fin.simulator.rendered", requestContext, {
    selected_intent: onboardingState.selectedIntent,
    selected_mode: onboardingState.mode,
    available_coins: rewardLoop.availableCoins,
    position_count: rewardLoop.portfolio.positionCount,
    latest_trade_asset: rewardLoop.latestTrade?.assetId ?? null,
    trade_query_state: resolved.trade ?? null
  });

  return (
    <main>
      <div className="shell">
        <div className="header">
          <div>
            <span className="eyebrow">Sprint 2 slice</span>
            <h1 style={{ marginTop: 12 }}>Fin simulator starter trade</h1>
          </div>
          <div className="actions">
            <Link className="button secondary" href="/app/onboarding?intent=invest-first">
              Back to onboarding
            </Link>
            <Link className="button secondary" href="/app/explainability#fin-trade">
              Why am I seeing this?
            </Link>
            <Link className="button secondary" href="/app">
              Back to app home
            </Link>
          </div>
        </div>

        <section className="grid cols-2" style={{ alignItems: "start" }}>
          <article className="hero">
            <div className="grid" style={{ gap: 14 }}>
              <span className="badge">Signed in as {session.email}</span>
              <p>
                This slice proves the reward loop stays honest: Goldie earns or funds ProsperCoins,
                Fin takes over explicitly, quote freshness stays visible, and one virtual trade lands
                in an append-only ledger instead of a hand-waved fake balance.
              </p>
            </div>

            <div className="grid cols-3">
              <div className="card compact-card">
                <span className="eyebrow">Available</span>
                <strong>{formatProsperCoins(rewardLoop.availableCoins)}</strong>
                <span className="muted-line">Balance derived from immutable demo ledger events.</span>
              </div>
              <div className="card compact-card">
                <span className="eyebrow">Latest reward</span>
                <strong>{rewardLoop.latestReward?.reasonCode ?? "No reward yet"}</strong>
                <span className="muted-line">{rewardLoop.latestReward?.explanation ?? "Complete onboarding or choose invest-first to fund the first simulator slice."}</span>
              </div>
              <div className="card compact-card">
                <span className="eyebrow">Portfolio</span>
                <strong>{rewardLoop.portfolio.positionCount ? `${rewardLoop.portfolio.positionCount} starter position` : "No starter trade yet"}</strong>
                <span className="muted-line">
                  {rewardLoop.portfolio.positionCount
                    ? `${formatProsperCoins(rewardLoop.portfolio.estimatedValueCoins)} estimated current value.`
                    : "Run one clean starter trade and the first portfolio summary unlocks here."}
                </span>
              </div>
            </div>
          </article>

          <article className="panel">
            <h2>Goldie → Fin handoff</h2>
            <p>{onboardingState.finHandoff?.handoffBody ?? "Fin stays quiet until Goldie has enough signal to make the trade educational instead of gimmicky."}</p>
            {resolved.trade ? (
              <div className="card compact-card" style={{ marginTop: 16 }}>
                <strong>Latest action</strong>
                <span className="muted-line">Trade state: {resolved.trade}</span>
                {resolved.asset ? <span className="muted-line">Asset: {resolved.asset}</span> : null}
              </div>
            ) : null}
          </article>
        </section>

        <section style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Curated launch asset list</h2>
            <div className="grid cols-3" style={{ marginTop: 16 }}>
              {rewardLoop.assetUniverse.map((asset) => (
                <div key={asset.assetId} className="card compact-card">
                  <div>
                    <strong>{asset.name}</strong>
                    <div className="muted-line">{asset.symbol}</div>
                  </div>
                  <div className="meta">
                    <div><strong>Starter cost</strong>: {formatProsperCoins(asset.starterTradeCoins)}</div>
                    <div><strong>Reference price</strong>: {formatCurrency(asset.priceMinor, asset.currency)}</div>
                    <div><strong>Freshness</strong>: {asset.freshnessLabel}</div>
                  </div>
                  <p>{asset.whyItIsHere}</p>
                  <span className="muted-line">{asset.learningAngle}</span>

                  <form action={submitStarterTradeAction}>
                    <input type="hidden" name="assetId" value={asset.assetId} />
                    <button className={asset.tradeable && !asset.blockedReason ? "primary" : "secondary"} type="submit" disabled={!asset.tradeable || Boolean(asset.blockedReason)}>
                      {asset.tradeable && !asset.blockedReason ? `Buy starter slice for ${asset.starterTradeCoins} coins` : asset.blockedReason ?? "Trade unavailable"}
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>First portfolio summary</h2>
            {rewardLoop.portfolio.positionCount ? (
              <div className="grid" style={{ gap: 14 }}>
                {rewardLoop.portfolio.positions.map((position) => (
                  <div key={position.assetId} className="card compact-card">
                    <strong>{position.assetName}</strong>
                    <span className="muted-line">{position.symbol}</span>
                    <span className="muted-line">{position.units.toFixed(4)} units · cost {formatProsperCoins(position.costCoins)}</span>
                    <span className="muted-line">Current estimate {formatProsperCoins(position.currentValueCoins)} · {position.freshnessLabel}</span>
                    <p>{position.learningHeadline}</p>
                    <span className="muted-line">Provenance: linked to quote snapshot and immutable ProsperCoin debit.</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No starter trade yet. The first completed trade turns this panel into a real portfolio summary instead of empty simulator theater.</p>
            )}
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
