import Link from "next/link";
import { evaluateFeatureFlags } from "@/lib/feature-flags/config";

const launchSlices = [
  "Controlled entry routes for Goldie, Fin, and family preview",
  "Canonical MoneyEvent + ProsperCoin + simulator ledger contracts",
  "Consent and audit scaffolding before social or family value",
  "Request/trace propagation from the first protected route"
];

export default function LandingPage() {
  const flags = evaluateFeatureFlags({ countryCode: "DK" });

  return (
    <main>
      <div className="shell">
        <div className="header">
          <div>
            <span className="eyebrow">ProsperPals Sprint 0</span>
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
            <h1>Trust scaffolding first. Glitter later.</h1>
            <p>
              This Sprint 0 scaffold gives ProsperPals the boring-but-correct base it needs:
              protected and public routes, typed trust-critical contracts, server-evaluated feature
              flags, telemetry IDs on every request, and Supabase migrations for the canonical
              money, reward, trade, consent, and audit tables.
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
            <h2>What Sprint 0 shipped</h2>
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
              MobilePay and PSD2 stay dark until the Denmark-first manual-entry loop is behaving.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
