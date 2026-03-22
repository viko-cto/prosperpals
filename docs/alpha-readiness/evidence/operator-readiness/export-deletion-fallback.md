# Export and Deletion Manual Fallback

**Date:** 2026-03-22 18:18 UTC  
**Lane:** operator/access readiness  
**Prepared by:** BMAD catch-up worker

## What was reviewed

- `src/lib/onboarding/demo-state.ts`
- `src/lib/telemetry/demo-event-store.ts`
- `src/lib/simulator/demo-simulator.ts`
- `src/lib/receipts/demo-receipts.ts`
- `src/lib/auth/session.ts`

## Current storage reality

The running demo path still stores trust-relevant state in:
- onboarding cookie state,
- local JSONL analytics,
- local JSONL reward/trade ledger records,
- local JSONL receipt candidate/confirmation/failure records,
- and local uploaded receipt artifacts.

That means export/deletion is not yet a product-native workflow. It is a manual operator exercise.

## Manual export fallback

### What can be exported today
For the current demo path, the team can manually gather the current user's records from:
- onboarding state (browser cookie-backed),
- analytics JSONL events,
- ledger JSONL records,
- receipt JSONL records,
- and uploaded receipt artifact files tied to the same `artifactId` lineage.

### What is still missing
- no in-app export request surface,
- no one-click export bundle,
- no durable audit trail that the export occurred,
- and no hosted multi-user-safe identity boundary proving which user asked.

### Honest status
**Manual fallback only**.

## Manual deletion fallback

### What can be deleted today
A founder/operator could manually remove the current demo user's local records by:
1. confirming the request outside the app,
2. deleting the demo cookie-backed onboarding state,
3. removing matching JSONL records for the user,
4. removing uploaded artifact files tied to that user,
5. and recording completion in an external ops note until an in-product audit trail exists.

### What makes this unsafe for real hosted alpha
- demo auth currently uses a hard-coded user ID,
- deletion is not actor-audited,
- and local runtime sinks are not a credible user-rights handling system for external alpha users.

### Honest status
**Manual fallback only**.

## Checklist-grade verdict

- Manual help / export / deletion path exists -> **manual fallback**
- Account-access interventions are auditable -> **open blocker**

## Why the NO-GO remains locked

The team can describe how to handle a deletion/export request manually, but the current repo still lacks the identity certainty, audit trail, and hosted durability needed to make that claim safe for external alpha.

## Exact next hardening move this points to

1. Move trust-critical state onto authoritative hosted persistence.
2. Add a user-visible export/delete request path.
3. Attach actor-scoped audit events to each request and completion step.
4. Remove dependence on the hard-coded demo identity before any external hosted cohort.
