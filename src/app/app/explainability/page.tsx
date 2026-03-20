import Link from "next/link";
import { requireViewerSession } from "@/lib/auth/session";
import { getDemoExplainabilityCards } from "@/lib/explainability/demo-explainability";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";

function statusClass(status: string) {
  switch (status) {
    case "verified":
      return "status-pill status-pill--verified";
    case "parsed-reviewed":
      return "status-pill status-pill--reviewed";
    case "stale":
      return "status-pill status-pill--stale";
    case "review-required":
      return "status-pill status-pill--needs-review";
    default:
      return "status-pill status-pill--estimated";
  }
}

export default async function ExplainabilityPage() {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const cards = await getDemoExplainabilityCards(session.userId);

  const logPreview = toStructuredLog("explainability.rendered", requestContext, {
    card_count: cards.length,
    card_ids: cards.map((card) => card.id)
  });

  return (
    <main>
      <div className="shell">
        <div className="header">
          <div>
            <span className="eyebrow">Sprint 3 slice</span>
            <h1 style={{ marginTop: 12 }}>Why am I seeing this?</h1>
          </div>
          <div className="actions">
            <Link className="button secondary" href="/app/receipts">Receipt review</Link>
            <Link className="button secondary" href="/app">Back to app home</Link>
          </div>
        </div>

        <section className="hero">
          <div className="grid" style={{ gap: 14 }}>
            <span className="badge">Signed in as {session.email}</span>
            <p>
              Explainability in ProsperPals should feel calm, not legalistic. Users need to see why a
              number or prompt appeared, and operators need enough trace context to debug it without
              spelunking raw tables.
            </p>
          </div>
        </section>

        <section className="grid" style={{ marginTop: 24 }}>
          {cards.map((card) => (
            <article key={card.id} id={card.id} className="panel explainability-panel">
              <div className="panel-header-row">
                <div>
                  <span className="eyebrow">Explanation card</span>
                  <h2 style={{ marginTop: 12 }}>{card.title}</h2>
                </div>
                <span className={statusClass(card.status)}>{card.statusLabel}</span>
              </div>
              <div className="grid cols-2" style={{ marginTop: 18, alignItems: "start" }}>
                <div className="card compact-card">
                  <span className="eyebrow">What the user sees</span>
                  <strong>{card.summary}</strong>
                  <span className="muted-line">{card.explanation}</span>
                  <p>{card.userFacingWhy}</p>
                </div>

                <div className="grid" style={{ gap: 16 }}>
                  <div className="card compact-card">
                    <span className="eyebrow">Inputs</span>
                    <ul className="list">
                      {card.inputs.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="card compact-card">
                    <span className="eyebrow">Operator notes</span>
                    <ul className="list">
                      {card.operatorNotes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Explainability rules in this slice</h2>
            <ul className="list">
              <li>Derived numbers stay tied to visible source types and rule versions.</li>
              <li>Receipt OCR outputs remain candidates until the user confirms them.</li>
              <li>Fin explanations keep quote freshness and trade provenance visible.</li>
              <li>Support gets trace and request IDs, not raw secrets.</li>
            </ul>
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
