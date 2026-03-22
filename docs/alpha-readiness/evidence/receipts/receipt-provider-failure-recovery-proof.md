# Receipt Provider Failure Recovery Proof

**Date:** 2026-03-22 15:15 UTC  
**Lane:** alpha-readiness / interview-evidence-and-hosted-hardening-execution  
**Focus:** explicit upload/OCR failure recovery

## What was tested

The receipt lane was extended so ProsperPals no longer pretends every uploaded artifact can become a review candidate.

This proof covers two bounded failure cases:

1. **upload validation failure** — unsupported file type is stored as artifact metadata, but OCR stops before any candidate exists.
2. **provider parse failure** — provider/OCR outage is modeled as a safe failure record, not a partial candidate.

The automated proof currently exercises the provider-failure branch via:
- `test/sprint-3-explainability-operator-safety.test.mjs`
- `captureReceiptCandidate(...)` with a controlled failure trigger in `src/lib/receipts/demo-receipts.ts`

## What now passes

- Uploaded receipt artifacts still get an `artifactId`, storage metadata, and lineage fields even when parse fails.
- Failed captures append a durable `receipt_failure` record to the receipt runtime sink.
- No `receipt_candidate` is created on provider failure.
- No canonical money event is created on provider failure.
- The receipts UI now surfaces the latest safe failure with:
  - failure stage,
  - failure code,
  - recovery action,
  - provider reference,
  - storage mode,
  - running failure count.
- Support timeline now includes failure events, so operators can see recovery guidance without raw log archaeology.

## User-visible recovery contract

When receipt parsing fails, ProsperPals must say the honest thing:

> parsing failed safely, no money truth changed, and the user can retry or switch to manual entry.

That contract now exists in code and UI.

## What remains manual / incomplete

- The provider failure is still a **simulated bounded failure trigger**, not a live external OCR outage.
- There is still no hosted durable object storage or managed queue behind this lane.
- Retry backoff, escalation policy, and operator retry tooling are not yet implemented.
- Failure analytics are still demo-runtime only.

## Why this is not enough for CONDITIONAL GO yet

This closes a real trust gap: the product now proves that failure is handled explicitly instead of being hidden behind optimistic demo behavior.

But hosted alpha is still **NO-GO** because:
- durability is still local runtime,
- provider integration is not real,
- interview evidence remains largely unpopulated,
- operator-readiness evidence is still incomplete.

## Repo surfaces touched

- `src/lib/receipts/demo-receipts.ts`
- `src/app/app/receipts/actions.ts`
- `src/app/app/receipts/page.tsx`
- `src/lib/telemetry/demo-event-store.ts`
- `src/lib/support/demo-support.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`
