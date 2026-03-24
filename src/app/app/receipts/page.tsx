import Link from "next/link";
import { getActiveSupportInterventions } from "@/lib/audit/demo-audit";
import { requireViewerSession } from "@/lib/auth/session";
import { getEffectiveFeatureFlags } from "@/lib/feature-flags/config";
import { formatCurrency } from "@/lib/finance/first-value";
import { getDemoReceiptReviewState } from "@/lib/receipts/demo-receipts";
import { getRequestContext, toStructuredLog } from "@/lib/telemetry/request-context";
import {
  confirmReceiptReviewAction,
  startReceiptReviewAction
} from "./actions";

type ReceiptPageProps = {
  searchParams?: Promise<{ candidateId?: string; confirmed?: string; failure?: string; blocked?: string }>;
};

export default async function ReceiptReviewPage({ searchParams }: ReceiptPageProps) {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const internalUser = session.email.endsWith("@prosperpals.local");
  const flags = await getEffectiveFeatureFlags({
    countryCode: "DK",
    internalUser
  });
  const receiptState = await getDemoReceiptReviewState(session.userId);
  const activeInterventions = await getActiveSupportInterventions(session.userId);
  const activeReceiptCapturePause = activeInterventions.find(
    (intervention) => intervention.code === "receipt_capture_paused"
  );
  const resolved = (await searchParams) ?? {};
  const candidate = receiptState.pendingCandidate;
  const receiptCapturePaused = Boolean(activeReceiptCapturePause);
  const receiptCaptureDisabled = !flags.receiptCapture;
  const receiptCaptureBlocked = receiptCapturePaused || receiptCaptureDisabled;

  const logPreview = toStructuredLog("receipt.review.rendered", requestContext, {
    pending_candidate: candidate?.candidateId ?? null,
    candidate_query: resolved.candidateId ?? null,
    failure_query: resolved.failure ?? null,
    blocked_query: resolved.blocked ?? null,
    receipt_capture_paused: receiptCapturePaused,
    receipt_capture_enabled: flags.receiptCapture,
    latest_confirmation: receiptState.latestConfirmed?.candidateId ?? null,
    latest_artifact: receiptState.latestArtifact?.artifactId ?? null,
    latest_failure: receiptState.latestFailure?.id ?? null,
    confirmation_count: receiptState.confirmationCount,
    failure_count: receiptState.failureCount
  });

  return (
    <main>
      <div className="shell">
        <div className="header">
          <div>
            <span className="eyebrow">Sprint 3 slice</span>
            <h1 style={{ marginTop: 12 }}>Receipt review + provenance</h1>
          </div>
          <div className="actions">
            <Link className="button secondary" href="/app/explainability#receipt-review">
              Why am I seeing this?
            </Link>
            <Link className="button secondary" href="/app">
              Back to app home
            </Link>
          </div>
        </div>

        {resolved.blocked === "receipt_capture_disabled" ? (
          <section className="panel" style={{ marginBottom: 24 }}>
            <h2>Receipt capture is globally disabled</h2>
            <div className="grid cols-2" style={{ alignItems: "start" }}>
              <div className="card compact-card">
                <strong>Hosted-alpha kill switch is active</strong>
                <span className="muted-line">
                  An actor-audited release override forced receipt capture off while trust hardening stays in progress.
                </span>
              </div>
              <div className="meta">
                <div><strong>Current state</strong>: receipt capture disabled</div>
                <div><strong>Why it matters</strong>: no new OCR candidates should enter the lane until review clears.</div>
                <div><strong>Next step</strong>: clear the audited override from <Link href="/app/support">/app/support</Link>.</div>
              </div>
            </div>
          </section>
        ) : null}

        {resolved.blocked === "receipt_capture_paused" && activeReceiptCapturePause ? (
          <section className="panel" style={{ marginBottom: 24 }}>
            <h2>Receipt capture is temporarily paused</h2>
            <div className="grid cols-2" style={{ alignItems: "start" }}>
              <div className="card compact-card">
                <strong>New receipt intake is blocked</strong>
                <span className="muted-line">
                  Support applied a narrow hold so trust review can finish before any new receipt
                  candidates enter the lane.
                </span>
              </div>
              <div className="meta">
                <div><strong>Reason</strong>: {activeReceiptCapturePause.reason}</div>
                <div><strong>Applied at</strong>: {activeReceiptCapturePause.occurredAt}</div>
                <div><strong>Actor</strong>: {activeReceiptCapturePause.actorUserId ?? "unknown"}</div>
                <div><strong>Next step</strong>: clear the hold from <Link href="/app/support">/app/support</Link> after support review.</div>
              </div>
            </div>
          </section>
        ) : null}

        {receiptState.latestFailure ? (
          <section className="panel" style={{ marginBottom: 24 }}>
            <h2>Latest safe failure recovery</h2>
            <div className="grid cols-2" style={{ alignItems: "start" }}>
              <div className="card compact-card">
                <span className="eyebrow">{receiptState.latestFailure.failureStage.replaceAll("_", " ")}</span>
                <strong>{receiptState.latestFailure.failureCode}</strong>
                <span className="muted-line">{receiptState.latestFailure.userMessage}</span>
              </div>
              <div className="meta">
                <div><strong>Recovery action</strong>: {receiptState.latestFailure.recoveryAction}</div>
                <div><strong>Provider ref</strong>: {receiptState.latestFailure.providerReference}</div>
                <div><strong>Storage mode</strong>: {receiptState.latestFailure.storageMode}</div>
                <div><strong>Failure count</strong>: {receiptState.failureCount}</div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="grid cols-2" style={{ alignItems: "start" }}>
          <article className="hero">
            <div className="grid" style={{ gap: 14 }}>
              <span className="badge">Signed in as {session.email}</span>
              <p>
                Sprint 3 hardens the launch path against OCR magic-thinking. Receipt intake now
                supports a bounded real upload path, records artifact metadata plus parser lineage,
                and still only posts money truth after explicit confirmation.
              </p>
            </div>

            <form action={startReceiptReviewAction} encType="multipart/form-data">
              <div className="grid cols-2" style={{ alignItems: "start" }}>
                <label>
                  <span className="field-label">Receipt image or PDF</span>
                  <input
                    type="file"
                    name="receiptFile"
                    accept="image/*,application/pdf,text/plain"
                    disabled={receiptCaptureBlocked}
                  />
                  <span className="muted-line">
                    Optional for now. Uploading creates stored artifact metadata; skipping it keeps a
                    simulated artifact so the review loop still works.
                  </span>
                </label>
                <div className="card compact-card">
                  <span className="eyebrow">Current posture</span>
                  <strong>
                    {receiptCaptureDisabled
                      ? "Global receipt capture kill switch active"
                      : receiptCapturePaused
                        ? "Receipt capture paused"
                        : "Real upload, demo durability"}
                  </strong>
                  <span className="muted-line">
                    {receiptCaptureDisabled
                      ? "An actor-audited release override forced the feature flag off. Hosted alpha remains NO-GO until the trust review clears it."
                      : receiptCapturePaused
                        ? "Support has paused new receipt intake pending review. Existing evidence stays visible, but new candidates are blocked."
                        : "This proves asset lineage better, but runtime storage is still local-file based, so hosted alpha remains NO-GO."}
                  </span>
                </div>
              </div>

              <div className="grid cols-3" style={{ alignItems: "start", marginTop: 14 }}>
                <label>
                  <span className="field-label">Receipt merchant hint</span>
                  <input type="text" name="merchantLabel" defaultValue="Føtex City" disabled={receiptCaptureBlocked} />
                </label>
                <label>
                  <span className="field-label">Parsed total (DKK)</span>
                  <input
                    type="number"
                    name="amountMajor"
                    step="0.01"
                    min="1"
                    defaultValue="226.45"
                    disabled={receiptCaptureBlocked}
                  />
                </label>
                <label>
                  <span className="field-label">Draft category</span>
                  <input type="text" name="categoryId" defaultValue="groceries" disabled={receiptCaptureBlocked} />
                </label>
              </div>
              <div className="actions">
                <button className="primary" type="submit" disabled={receiptCaptureBlocked}>Create receipt candidate</button>
                <Link className="button secondary" href="/app/support">Open operator timeline</Link>
              </div>
            </form>
          </article>

          <article className="panel">
            <h2>What this receipt slice proves</h2>
            <ul className="list">
              <li>Receipt OCR does not auto-post straight into the money model.</li>
              <li>Confidence and review state stay visible on the user-facing sheet.</li>
              <li>Confirmed receipts are explainable back to candidate, artifact, and trace IDs.</li>
              <li>Support can inspect the capture path without raw-database archaeology.</li>
              <li>Uploaded assets now record storage metadata plus parser/provider lineage.</li>
              <li>Failed uploads/OCR parses surface a safe recovery lane instead of silently faking a candidate.</li>
              <li>Support can now pause new receipt intake with an audited intervention when trust review is still open.</li>
              <li>Receipt capture can also be forced off globally through an actor-audited release override.</li>
            </ul>
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24, alignItems: "start" }}>
          <article className="panel">
            <h2>Receipt review sheet</h2>
            {candidate ? (
              <form action={confirmReceiptReviewAction}>
                <input type="hidden" name="candidateId" value={candidate.candidateId} />
                <div className="card compact-card">
                  <strong>{candidate.confidenceLabel}</strong>
                  <span className="muted-line">{candidate.reviewMessage}</span>
                  <span className="muted-line">Candidate ID: {candidate.candidateId}</span>
                </div>
                <label>
                  <span className="field-label">Merchant</span>
                  <input type="text" name="merchantLabel" defaultValue={candidate.merchantLabel} />
                </label>
                <label>
                  <span className="field-label">Amount (DKK)</span>
                  <input
                    type="number"
                    name="amountMajor"
                    step="0.01"
                    min="1"
                    defaultValue={(candidate.amountMinor / 100).toFixed(2)}
                  />
                </label>
                <label>
                  <span className="field-label">Category</span>
                  <input type="text" name="categoryId" defaultValue={candidate.categoryId} />
                </label>
                <div className="grid cols-3">
                  <div className="card compact-card">
                    <span className="eyebrow">Provenance</span>
                    <strong>{Math.round(candidate.confidenceScore * 100)}%</strong>
                    <span className="muted-line">{candidate.sourceHint}</span>
                  </div>
                  <div className="card compact-card">
                    <span className="eyebrow">Posting rule</span>
                    <strong>Candidate first</strong>
                    <span className="muted-line">Canonical money event only after confirmation.</span>
                  </div>
                  <div className="card compact-card">
                    <span className="eyebrow">Current state</span>
                    <strong>{candidate.reviewStatus.replaceAll("_", " ")}</strong>
                    <span className="muted-line">Parse status: {candidate.parseStatus}</span>
                  </div>
                </div>
                <button className="primary" type="submit">Confirm receipt and post reviewed event</button>
              </form>
            ) : (
              <p>
                No pending receipt candidate right now. Create one and this review sheet will hold
                the parse in a human-checkable state instead of auto-committing it.
              </p>
            )}
          </article>

          <article className="panel">
            <h2>Latest confirmed receipt</h2>
            {receiptState.latestConfirmed ? (
              <div className="grid" style={{ gap: 14 }}>
                <div className="card compact-card">
                  <strong>{receiptState.latestConfirmed.headline}</strong>
                  <span className="muted-line">{receiptState.latestConfirmed.body}</span>
                </div>
                <div className="meta">
                  <div>
                    <strong>Merchant</strong>: {receiptState.latestConfirmed.merchantLabel}
                  </div>
                  <div>
                    <strong>Amount</strong>: {formatCurrency(receiptState.latestConfirmed.amountMinor, receiptState.latestConfirmed.currency)}
                  </div>
                  <div>
                    <strong>Daily Spending Power</strong>: {formatCurrency(receiptState.latestConfirmed.dailySpendingPowerMinor, receiptState.latestConfirmed.currency)}/day
                  </div>
                  <div>
                    <strong>Correction applied</strong>: {receiptState.latestConfirmed.correctionApplied ? "Yes" : "No"}
                  </div>
                </div>
                <div className="actions">
                  <Link className="button secondary" href="/app/explainability#receipt-review">
                    Review explanation detail
                  </Link>
                </div>
              </div>
            ) : (
              <p>
                Confirm one candidate and Goldie will turn the reviewed receipt into a visible,
                traceable spending insight here.
              </p>
            )}
          </article>
        </section>

        <section className="grid cols-2" style={{ marginTop: 24 }}>
          <article className="panel">
            <h2>Receipt runtime sinks</h2>
            <div className="meta">
              <div><strong>Candidate sink path</strong>: <code>{receiptState.sinkPath}</code></div>
              <div><strong>Artifact sink path</strong>: <code>{receiptState.artifactSinkPath}</code></div>
              <div><strong>Pending candidate</strong>: {candidate ? candidate.candidateId : "none"}</div>
              <div><strong>Receipt capture feature flag</strong>: {flags.receiptCapture ? "enabled" : "disabled"}</div>
              <div><strong>Receipt capture paused</strong>: {receiptCapturePaused ? "yes" : "no"}</div>
              <div><strong>Confirmation count</strong>: {receiptState.confirmationCount}</div>
              <div><strong>Failure count</strong>: {receiptState.failureCount}</div>
            </div>
          </article>

          <article className="panel">
            <h2>Latest artifact metadata</h2>
            {receiptState.latestArtifact ? (
              <div className="meta">
                <div><strong>Artifact ID</strong>: {receiptState.latestArtifact.artifactId}</div>
                <div><strong>Storage mode</strong>: {receiptState.latestArtifact.storageMode}</div>
                <div><strong>File</strong>: {receiptState.latestArtifact.fileName}</div>
                <div><strong>MIME type</strong>: {receiptState.latestArtifact.mimeType}</div>
                <div><strong>Bytes</strong>: {receiptState.latestArtifact.sizeBytes}</div>
                <div><strong>Stored at</strong>: <code>{receiptState.latestArtifact.storagePath}</code></div>
                <div><strong>Parser provider</strong>: {receiptState.latestArtifact.parserProvider}</div>
                <div><strong>Parser model</strong>: {receiptState.latestArtifact.parserModel}</div>
                <div><strong>Provider ref</strong>: {receiptState.latestArtifact.providerReference}</div>
                <div><strong>Source hint</strong>: {receiptState.latestArtifact.sourceHint}</div>
              </div>
            ) : (
              <p>No artifact metadata yet. Upload a receipt or create a simulated candidate first.</p>
            )}
          </article>
        </section>

        <section className="panel" style={{ marginTop: 24 }}>
          <h2>Structured log preview</h2>
          <pre>{JSON.stringify(logPreview, null, 2)}</pre>
        </section>
      </div>
    </main>
  );
}
