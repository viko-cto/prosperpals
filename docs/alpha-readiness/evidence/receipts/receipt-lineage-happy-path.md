# Receipt Lineage — Happy Path

**Date:** 2026-03-22  
**Evidence type:** repo-state trace from current code plus passing local test run  
**Decision use:** proves the current demo slice now preserves lineage from uploaded/simulated asset → candidate → user review → reviewed canonical money event, while still not proving hosted readiness.

## Verdict

The implemented receipt flow now preserves a fuller lineage chain:
- a real uploaded file or simulated artifact is stored first,
- artifact metadata is written with `artifactId`, storage data, and parser/provider lineage,
- a receipt candidate is written before canonical truth changes,
- the user-facing review sheet shows confidence and provenance,
- confirmation creates a reviewed `MoneyEvent` that preserves the same `artifactId` and trace lineage.

What is **not** yet proven here:
- external OCR provider integration,
- hosted durability across deployments,
- production-grade upload/provider failure handling.

## Evidence basis

### Current test execution in this run
`npm test` passed on 2026-03-22, including:
- `receipt OCR candidates stay reviewable until explicit confirmation`
- `uploaded receipt artifacts persist metadata and stay linked to candidate lineage`
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
`startReceiptReviewAction` now accepts an optional file upload (`receiptFile`) along with merchant/amount/category hints.

### 2. Artifact is stored before candidate creation
`captureReceiptCandidate(...)` now creates a durable `receipt_artifact` record first.

That artifact includes:
- `artifactId`
- `storageMode` (`uploaded` or `simulated`)
- `storagePath`
- `fileName`
- `mimeType`
- `sizeBytes`
- `parserProvider`
- `parserModel`
- `providerReference`

### 3. Candidate is written before money truth changes
After artifact persistence, the runtime appends a `receipt_candidate` record that reuses the same `artifactId`.

At this stage the flow still has a parse candidate, not canonical truth.

### 4. User sees the review boundary clearly
`/app/receipts` renders a review sheet that explicitly shows:
- confidence,
- review message,
- provenance hint,
- current review state,
- and the rule: **“Canonical money event only after confirmation.”**

### 5. Confirmation creates reviewed canonical truth
`confirmReceiptReviewAction` calls `confirmReceiptCandidate(...)`.

That function creates:
- a reviewed `MoneyEvent` with `sourceType = receipt_ocr`,
- `verificationState = parsed_reviewed`,
- preserved `artifactId`,
- preserved `traceId`,
- and a matching `receipt_confirmation` record.

### 6. Downstream surfaces keep the path inspectable
After confirmation:
- analytics writes `receipt.candidate.confirmed`,
- explainability can show the receipt card as `parsed-reviewed`,
- support timeline can show the candidate and confirmation with request/trace IDs,
- the receipt page can show the latest artifact metadata beside the review state.

## Practical alpha readout

This note is enough to support the following checklist claims:
- **Real upload path exists** — yes, in the bounded demo/runtime lane.
- **Stored asset metadata links to parse candidate** — yes.
- **OCR/provider origin is recorded** — yes, at demo-lineage level.
- **User correction is required before truth changes** — yes.
- **Canonical truth keeps request/trace lineage** — yes.

It is **not** enough to claim:
- hosted durability,
- external OCR provider readiness,
- production-grade receipt infrastructure.

## Remaining limits

The current flow is still demo-backed via local runtime files. It now has much better artifact lineage, but uploaded assets and artifact metadata are not yet hosted on durable infrastructure.
