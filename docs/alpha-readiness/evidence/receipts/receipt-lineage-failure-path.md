# Receipt Lineage — Failure Path / Remaining Hosted Gaps

**Date:** 2026-03-22  
**Evidence type:** repo-state gap note after bounded upload-lineage implementation  
**Decision use:** documents what the new upload/path artifact work closes, and what still blocks hosted alpha.

## Verdict

ProsperPals now has a **bounded real upload path inside the demo runtime**, plus stored artifact metadata and parser/provider lineage.

But a real hosted/provider failure path still does **not** exist yet.

So this is progress, not closure.

## What changed in this run

The repo now supports:
- optional receipt file upload from `/app/receipts`,
- persisted receipt artifact records in a dedicated artifact sink,
- stored file metadata (`fileName`, `mimeType`, `sizeBytes`, `storagePath`),
- parser/provider lineage (`parserProvider`, `parserModel`, `providerReference`),
- linkage from uploaded artifact → `artifactId` → parse candidate → reviewed confirmation.

## Evidence basis

### Repo files used for this readout
- `src/app/app/receipts/page.tsx`
- `src/app/app/receipts/actions.ts`
- `src/lib/receipts/demo-receipts.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`
- `docs/alpha-readiness/hosted-hardening-execution-checklist.md`

## What the repo actually does today

### 1. A bounded upload path now exists
The receipt page now accepts an optional file upload (`receiptFile`).

`startReceiptReviewAction(...)` reads the uploaded file and passes its bytes into `captureReceiptCandidate(...)`.

### 2. Stored asset metadata now exists
The runtime now writes a `receipt_artifact` record before creating the candidate. That record includes:
- `artifactId`
- `storageMode`
- `storagePath`
- `fileName`
- `mimeType`
- `sizeBytes`
- `parserProvider`
- `parserModel`
- `providerReference`

That closes the earlier gap where `artifactId` existed only as an unattached lineage token.

### 3. Parser/provider origin is now recorded
Candidate provenance is no longer just a static starter-corpus string.

It now carries a lineage hint such as:
- `demo-ocr-upload-gateway • receipt-lineage-v1 • uploaded`

That is still demo-grade, but it is honest and inspectable.

## What still does **not** exist

### 1. No real external OCR provider call
There is still no network OCR request, provider response payload, retry/backoff logic, or timeout/error object.

### 2. No hosted durability proof
Artifact metadata and uploaded files still land in local runtime paths under `.prosperpals-runtime/`.

That means the current lane is still vulnerable to redeploy/reset loss and cannot yet claim hosted durability.

### 3. No provider-specific failure handling
The app still does not distinguish:
- unreadable image,
- provider timeout,
- provider rate-limit,
- malformed provider payload,
- or storage write failure.

### 4. No user-facing failed-upload recovery UX
The upload path exists, but there is not yet an explicit safe recovery surface for failed upload/provider states beyond the existing manual review posture.

## Practical alpha readout

This note now changes the checklist posture as follows:
- **Real upload path exists** → now real enough for the demo/runtime lane, but still not hosted-closure proof.
- **Stored asset metadata links to parse candidate** → now present in the repo.
- **OCR/provider origin is recorded** → now present in the repo.
- **OCR failure degrades honestly and safely** → still an open blocker.

## What still needs to happen before hosted alpha can soften

At minimum, ProsperPals still needs repo-native proof for:
1. hosted durability beyond local runtime files,
2. explicit OCR/upload/provider error-state handling,
3. user-visible failure recovery when receipt parsing/upload breaks,
4. and ideally an authoritative storage/provider record instead of demo-only provider labels.
