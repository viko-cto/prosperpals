import Link from "next/link";
import { requireViewerSession } from "@/lib/auth/session";
import {
  getDemoOnboardingState,
  getIntentLabel,
  normalizeIntent
} from "@/lib/onboarding/demo-state";
import {
  formatCurrency,
  getFirstValueDurationSeconds,
  getStarterBaselineDailyMinor
} from "@/lib/finance/first-value";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";
import {
  saveOnboardingPreferencesAction,
  submitBudgetFirstAction
} from "./actions";

type OnboardingPageProps = {
  searchParams?: Promise<{ intent?: string }>;
};

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const session = await requireViewerSession();
  const state = await getDemoOnboardingState();
  const requestContext = await getRequestContext();
  const resolved = (await searchParams) ?? {};
  const selectedIntent = normalizeIntent(resolved.intent ?? state.selectedIntent);
  const firstValueSeconds = state.firstValueCompletedAt
    ? getFirstValueDurationSeconds(state.onboardingStartedAt, state.firstValueCompletedAt)
    : null;

  const analyticsPreview = toStructuredLog("onboarding.flow.viewed", requestContext, {
    auth_provider: session.authProvider,
    selected_intent: selectedIntent,
    selected_mode: state.mode,
    target_time_to_value_seconds: 80,
    first_value_completed: Boolean(state.firstValueCompletedAt),
    measured_time_to_value_seconds: firstValueSeconds
  });

  return (
    <main>
      <div className="shell">
        <div className="header">
          <div>
            <span className="eyebrow">Sprint 1 chunk</span>
            <h1 style={{ marginTop: 12 }}>First-value onboarding + Goldie loop</h1>
          </div>
          <Link className="button secondary" href="/app">
            Back to app home
          </Link>
        </div>

        <section className="grid cols-2" style={{ alignItems: "start" }}>
          <article className="hero">
            <div className="grid" style={{ gap: 14 }}>
              <span className="badge">Signed in as {session.email}</span>
              <p>
                This flow preserves the chosen entry path, keeps gamification intensity as a
                preference instead of a fork, and now bridges directly into Sprint 2: Goldie can
                fund the first Fin simulator slice with visible ProsperCoin rewards.
              </p>
            </div>

            <form action={saveOnboardingPreferencesAction}>
              <div className="grid cols-3 intent-grid">
                {[
                  ["budget-first", "Start with Goldie", "Log one recent spend and get a calm, useful first insight."],
                  ["invest-first", "Practice investing", "See the explicit Goldie → Fin handoff before the simulator slice lands."],
                  ["family-preview", "Preview family value", "Inspect the trust-safe household coaching angle without raw money exposure."]
                ].map(([value, label, description]) => (
                  <label key={value} className={`choice-card ${selectedIntent === value ? "choice-card--active" : ""}`}>
                    <input type="radio" name="intent" value={value} defaultChecked={selectedIntent === value} />
                    <strong>{label}</strong>
                    <span>{description}</span>
                  </label>
                ))}
              </div>

              <div className="grid cols-3 mode-grid" style={{ marginTop: 16 }}>
                {[
                  ["full", "Full mode", "Celebrations and progression visible"],
                  ["lite", "Lite mode", "Default: premium, calm, less noisy"],
                  ["off", "Off mode", "No gamification theater; same core product logic"]
                ].map(([value, label, description]) => (
                  <label key={value} className={`choice-card ${state.mode === value ? "choice-card--active" : ""}`}>
                    <input type="radio" name="mode" value={value} defaultChecked={state.mode === value} />
                    <strong>{label}</strong>
                    <span>{description}</span>
                  </label>
                ))}
              </div>

              <div className="actions" style={{ marginTop: 20 }}>
                <button className="primary" type="submit">
                  Continue with {getIntentLabel(selectedIntent)}
                </button>
              </div>
            </form>
          </article>

          <article className="panel">
            <h2>Instrumentation preview</h2>
            <pre>{JSON.stringify(analyticsPreview, null, 2)}</pre>
          </article>
        </section>

        {selectedIntent === "budget-first" ? (
          <section className="grid cols-2" style={{ marginTop: 24, alignItems: "start" }}>
            <article className="panel">
              <h2>Budget-first first-value form</h2>
              <p>
                Demo baseline Daily Spending Power starts at {formatCurrency(getStarterBaselineDailyMinor(), "DKK")}/day
                before any linked accounts exist. One manual event is enough to produce a visible
                planning shift.
              </p>

              <form action={submitBudgetFirstAction} style={{ marginTop: 16 }}>
                <input type="hidden" name="mode" value={state.mode} />
                <label>
                  <span className="field-label">Where did the money go?</span>
                  <input type="text" name="merchantLabel" placeholder="Netto groceries" defaultValue="Netto groceries" />
                </label>
                <label>
                  <span className="field-label">How much? (DKK)</span>
                  <input type="number" step="0.01" min="1" name="amountMajor" defaultValue="148.50" />
                </label>
                <label>
                  <span className="field-label">Category</span>
                  <input type="text" name="categoryId" defaultValue="groceries" />
                </label>
                <button className="primary" type="submit">
                  Log first money event with Goldie
                </button>
              </form>
            </article>

            <article className="panel">
              <h2>What this chunk proves</h2>
              <ul className="list">
                <li>Entry-path selection survives the public → auth → protected transition.</li>
                <li>Mode preference persists without branching product logic.</li>
                <li>One manual event turns into a canonical finance record candidate, a visible first insight, and a ProsperCoin award reason.</li>
                <li>Daily Spending Power appears before MobilePay or PSD2 are wired.</li>
              </ul>
            </article>
          </section>
        ) : null}

        {selectedIntent === "invest-first" ? (
          <section style={{ marginTop: 24 }}>
            <article className="panel">
              <h2>Invest-first handoff preview</h2>
              <p>
                Goldie still opens the door. Choosing the invest-first path now grants one starter
                ProsperCoin funding event, but Fin only takes over through an explicit handoff.
                That keeps the education-not-advice boundary visible instead of magical.
              </p>
              <div className="grid cols-3" style={{ marginTop: 16 }}>
                {(state.finHandoff?.starterAssets ?? []).map((asset) => (
                  <div key={asset.symbol} className="card compact-card">
                    <strong>{asset.name}</strong>
                    <span className="muted-line">{asset.symbol}</span>
                    <span className="muted-line">{asset.freshnessLabel}</span>
                    <p>{asset.whyItIsHere}</p>
                  </div>
                ))}
              </div>
              <div className="actions" style={{ marginTop: 16 }}>
                <Link className="button primary" href="/app/simulator">
                  Open Fin simulator
                </Link>
              </div>
            </article>
          </section>
        ) : null}

        {selectedIntent === "family-preview" ? (
          <section style={{ marginTop: 24 }}>
            <article className="panel">
              <h2>Family preview guardrail</h2>
              <p>
                Family value should feel like collaborative coaching, not surveillance. This slice
                stays preview-only and deliberately avoids raw transaction exposure.
              </p>
              <div className="grid cols-2" style={{ marginTop: 16 }}>
                <div className="card compact-card">
                  <strong>Allowed in preview</strong>
                  <ul className="list">
                    <li>Learning streaks</li>
                    <li>Challenge completion</li>
                    <li>Share-safe summaries</li>
                  </ul>
                </div>
                <div className="card compact-card">
                  <strong>Blocked in preview</strong>
                  <ul className="list">
                    <li>Raw merchant feeds</li>
                    <li>Live household balance exposure</li>
                    <li>Silent background monitoring</li>
                  </ul>
                </div>
              </div>
            </article>
          </section>
        ) : null}
      </div>
    </main>
  );
}
