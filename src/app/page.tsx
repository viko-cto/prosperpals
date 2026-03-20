import Link from "next/link";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";

const launchSlices = [
  "Controlled entry routes for Goldie, Fin, and family preview",
  "Goldie first-value onboarding with Daily Spending Power and visible reward reasons",
  "Fin starter simulator slice with quote freshness labels and one immutable virtual trade",
  "Request/trace propagation plus durable analytics and demo-ledger sinks"
];

export default function LandingPage() {
  const flags = evaluateFeatureFlags({ countryCode: "DK" });

  return (
    <main>
      <div className="shell">
        <div className="header">
          <div>
            <span className="eyebrow">ProsperPals Sprint 2</span>
          </div>
          <nav className="nav">
            <Link className="button secondary" href="/auth/sign-in?next=/app">
              Demo sign in
            </Link>
            <a className="button secondary" href="/api/health">
              Health endpoint
            </a>
          </nav>
        </div>

        <section className="hero">
          <div className="grid" style={{ gap: 16 }}>
            <h1>Log it. Earn it. Trade it. Learn from it.</h1>
            <p>
              ProsperPals has now moved beyond pure scaffolding. The current prototype proves the
              Denmark-first starter loop: protected/public routing, Goldie first-value onboarding,
              visible ProsperCoin rewards, explicit Goldie → Fin handoff, and one trust-safe
              virtual trade with honest quote freshness.
            </p>
          </div>

          <div className="kpis">
            <div className="kpi">
              <strong>&lt;80s</strong>
              <span>Target to first real financial value</span>
            </div>
            <div className="kpi">
              <strong>Append-only</strong>
              <span>ProsperCoins + simulator ledgers</span>
            </div>
            <div className="kpi">
              <strong>DK-first</strong>
              <span>Manual + receipt launch, MobilePay later</span>
            </div>
          </div>

          <div className="actions">
            <Link className="button primary" href="/auth/sign-in?next=/app/onboarding%3Fintent%3Dbudget-first">
              Start with Goldie
            </Link>
            <Link className="button secondary" href="/auth/sign-in?next=/app/onboarding%3Fintent%3Dinvest-first">
              Practice investing
            </Link>
            <Link className="button secondary" href="/auth/sign-in?next=/app/onboarding%3Fintent%3Dfamily-preview">
              Preview family value
            </Link>
          </div>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>What the current starter slice ships</h2>
            <ul className="list">
              {launchSlices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h2>Initial flag posture</h2>
            <pre>{JSON.stringify(flags, null, 2)}</pre>
            <p className="footer-note">
              MobilePay and PSD2 stay dark until this Denmark-first manual-and-reward loop behaves
              cleanly under real usage.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
