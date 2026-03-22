# Receipt Lineage — Failure Path / Missing Hosted Pieces

**Date:** 2026-03-22  
**Evidence type:** repo-state gap note  
**Decision use:** documents what is still missing before ProsperPals can claim a real hosted receipt lane.

## Verdict

A real upload/provider failure path does **not** exist yet in the repo.

The current Sprint 3 receipt slice is a safe demo of candidate-first review, not a production or hosted receipt ingestion rail.

## Evidence basis

### Repo files used for this readout
- `src/app/app/receipts/page.tsx`
- `src/app/app/receipts/actions.ts`
- `src/lib/receipts/demo-receipts.ts`
- `src/lib/feature-flags/config.ts`
- `src/lib/operations/release-safety.ts`
- `docs/implementation/sprint-3-explainability-receipt-intake-and-operator-safety.md`

## What the repo actually does today

### 1. No real file upload path
The receipt page currently asks for:
- merchant label,
- parsed amount,
- draft category.

It does **not** collect a file upload, image blob, or storage handle.

### 2. No real OCR provider call
`startReceiptReviewAction` forwards user-entered values directly into `captureReceiptCandidate(...)`.

There is no provider request, provider response object, retry path, timeout handling, or provider-specific error surface.

### 3. No real stored asset metadata
`captureReceiptCandidate(...)` generates an `artifactId`, which helps preserve lineage inside the demo records.

But that `artifactId` is not linked to:
- an uploaded asset record,
- storage metadata,
- checksum/hash,
- MIME type,
- or a provider job/result object.

### 4. No real provider origin record
The current candidate stores a static:
- `sourceHint = "Receipt OCR candidate — Denmark-first starter corpus"`

That is useful demo provenance, but it is **not** real OCR/provider origin evidence.

## What safe fallback exists today

The repo does at least preserve the safer operating posture:
- manual entry remains enabled,
- receipt capture is feature-flagged explicitly,
- the candidate-first review rule prevents silent auto-posting.

That makes the demo trust posture better than fake automation, but it is still not a hosted-ready receipt rail.

## Practical alpha readout

This note keeps the following checklist items as **open blockers**:
- **Real upload path exists**
- **Stored asset metadata links to parse candidate**
- **OCR/provider origin is recorded**
- **OCR failure degrades honestly and safely**

## What would close these blockers

At minimum, ProsperPals needs repo-native evidence for:
1. uploaded receipt asset creation,
2. storage metadata linked to candidate + confirmation,
3. provider/source metadata recorded on the parse,
4. explicit failure handling for provider timeout/error/unreadable input,
5. and a user-visible safe fallback when OCR fails.