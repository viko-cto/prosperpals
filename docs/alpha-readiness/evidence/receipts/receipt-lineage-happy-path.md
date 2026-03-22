# Receipt Lineage — Happy Path

**Date:** 2026-03-22  
**Evidence type:** repo-state trace from current code plus passing local test run  
**Decision use:** proves the current demo slice has a candidate-first reviewed posting path, but does **not** prove hosted receipt readiness.

## Verdict

The implemented receipt flow does preserve lineage from draft parse → user review → reviewed canonical money event.

What is real today:
- a receipt candidate is written before canonical truth changes,
- the candidate carries `candidateId`, `artifactId`, `requestId`, and `traceId`,
- the user-facing review sheet shows confidence and review status,
- confirmation creates a reviewed `MoneyEvent` with `sourceType = receipt_ocr` and `verificationState = parsed_reviewed`,
- explainability and support surfaces can inspect the reviewed path.

What is **not** yet proven here:
- real uploaded file storage,
- real OCR provider lineage,
- hosted durability across deployments.

## Evidence basis

### Current test execution in this run
`npm test` passed on 2026-03-22, including:
- `receipt OCR candidates stay reviewable until explicit confirmation`
- `support console aggregates safe timeline data and release checks`

### Repo files used for this trace
- `src/app/app/receipts/actions.ts`
- `src/app/app/receipts/page.tsx`
- `src/lib/receipts/demo-receipts.ts`
- `src/lib/explainability/demo-explainability.ts`
- `src/lib/support/demo-support.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`

## Trace

### 1. User starts receipt review
`startReceiptReviewAction` reads the signed-in session plus request context, then calls `captureReceiptCandidate(...)` with the typed merchant, amount, and category.

### 2. Candidate is written before money truth changes
`captureReceiptCandidate(...)` appends a `receipt_candidate` record to the receipt sink with:
- `candidateId`
- `artifactId`
- `userId`
- `requestId`
- `traceId`
- `confidenceScore`
- `confidenceLabel`
- `reviewStatus`
- `sourceHint`

At this stage the flow has a parse candidate, not canonical truth.

### 3. User sees the review boundary clearly
`/app/receipts` renders a review sheet that explicitly shows:
- confidence,
- review message,
- provenance hint,
- current review state,
- and the rule: **“Canonical money event only after confirmation.”**

### 4. Confirmation creates reviewed canonical truth
`confirmReceiptReviewAction` calls `confirmReceiptCandidate(...)`.

That function creates:
- a reviewed `MoneyEvent` with `sourceType = receipt_ocr`,
- `verificationState = parsed_reviewed`,
- preserved `artifactId`,
- preserved `traceId`,
- and a matching `receipt_confirmation` record.

It also appends a refreshed candidate record marked `confirmed` so the support surface can see the state change.

### 5. Downstream surfaces keep the path inspectable
After confirmation:
- analytics writes `receipt.candidate.confirmed`,
- explainability can show the receipt card as `parsed-reviewed`,
- support timeline can show the candidate and confirmation with request/trace IDs.

## Practical alpha readout

This note is enough to support the following checklist claims:
- **User correction is required before truth changes** — yes, in the current demo slice.
- **Canonical truth keeps request/trace lineage** — yes, in the current demo slice.

It is **not** enough to claim:
- real upload readiness,
- real provider lineage,
- hosted durability.

## Remaining limits

The current flow is still demo-backed via local runtime files. `artifactId` exists as lineage, but it is not yet linked to a real stored upload artifact or OCR provider record.