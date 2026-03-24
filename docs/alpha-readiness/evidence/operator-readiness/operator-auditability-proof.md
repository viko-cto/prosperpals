# Operator Auditability Proof

**Date:** 2026-03-24 08:55 UTC  
**Lane:** operator/access readiness  
**Prepared by:** BMAD catch-up worker

## What was reviewed

- `src/lib/audit/demo-audit.ts`
- `src/lib/support/demo-support.ts`
- `src/app/app/support/page.tsx`
- `src/app/app/support/actions.ts`
- `src/app/app/receipts/actions.ts`
- `src/app/app/receipts/page.tsx`
- `src/modules/finance/contracts.ts`
- `src/lib/telemetry/request-context.ts`
- `src/lib/feature-flags/config.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`

## What is auditable today

### 1. Support-view access is actor-scoped and timestamped
Opening `/app/support` as an internal viewer writes a durable operator audit event into the demo audit sink.

Each `support.timeline.viewed` event captures:
- `occurredAt`
- `actorUserId`
- `subjectUserId`
- `requestId`
- `traceId`
- `path`
- `reason`
- `supportTraceView`

### 2. Receipt-intake interventions are now actor-audited too
The support surface now supports a narrow but real intervention: pausing and clearing new receipt capture for the current subject.

Each intervention write captures:
- `occurredAt`
- `actorUserId`
- `subjectUserId`
- `requestId`
- `traceId`
- `interventionCode`
- `path`
- `reason`
- `supportTraceView`

Event codes now include:
- `support.intervention.applied`
- `support.intervention.cleared`

That closes the previous gap where support-side auditability existed only for passive viewing.

### 3. The intervention rail now controls trust-critical behavior
The current active `receipt_capture_paused` intervention is derived from the latest audit history for the subject.

That state is not decorative:
- `/app/support` shows whether the receipt lane is paused,
- `/app/receipts` shows the hold and who/why applied it,
- and `startReceiptReviewAction` refuses to create new receipt candidates while the audited pause remains active.

So the repo now proves an operator action can be:
- explicitly invoked,
- actor-scoped,
- timeline-visible,
- and enforced on a trust-sensitive capture path.

### 4. Audit writes are duplicate-safe per request
The demo audit writer still suppresses duplicate writes for the same:
- `requestId`
- `eventCode`
- `actorUserId`
- `subjectUserId`

That reduces the risk of noisy rerenders or repeated submits fabricating extra operator history.

## What is NOT auditable enough yet

### 1. The audit sink is still local-runtime, not hosted durable
The operator audit path is more useful now, but the sink still lands in `.prosperpals-runtime/demo-operator-audit.jsonl` or `PROSPERPALS_DEMO_AUDIT_PATH`.

So this is stronger proof of operator behavior, not closure of hosted durability.

### 2. Feature-flag and safety-toggle changes are now actor-logged in the repo demo path
The support surface now exposes actor-audited release overrides for:
- `receiptCapture`
- `simulatorStarter`

Each override write captures:
- `occurredAt`
- `actorUserId`
- `requestId`
- `traceId`
- `flagName`
- `enabled`
- `scope`
- `path`
- `reason`
- `supportTraceView`

Event codes now include:
- `release.flag.override.applied`
- `release.flag.override.cleared`

The running product path now folds those overrides into effective flag evaluation, so this is not just a note-taking rail:
- `/app/receipts` blocks new candidate creation when `receiptCapture` is forced off,
- `/app/simulator` blocks new starter trades when `simulatorStarter` is forced off,
- and `/app/support` surfaces both the override state and the matching audit history.

### 3. Cross-account intervention and role separation are still absent
The new intervention rail is intentionally narrow and bound to the current support subject.

There is still no product-native path for:
- least-privilege support-only access,
- admin-only control boundaries,
- impersonation,
- session rescue,
- or founder-approved cross-account intervention.

That is safer than inventing hidden backdoors, but it means hosted multi-user alpha readiness remains unproven.

### 4. Audit durability still does not survive redeploys in a hosted sense
Even though intervention state is derived from audit history, that history is still local-runtime only.

So the current rail improves operator correctness inside the repo demo, but it does **not** yet prove hosted survivability.

## Checklist-grade verdict

- Support views of sensitive artifacts are auditable -> **manual fallback**
- Corrections / overrides are auditable -> **manual fallback**
- Narrow receipt-intake interventions are auditable -> **manual fallback**
- Account-access interventions are auditable -> **open blocker**
- Feature-flag / safety-toggle changes are auditable -> **manual fallback**

## Why the NO-GO remains locked

This step materially improves the operator-readiness lane because the repo now has actor-scoped audit proof for:
- support-surface access,
- a live receipt-intake pause / clear intervention,
- and release-override changes for receipt capture plus the simulator starter rail.

But hosted alpha remains **NO-GO** because:
- audit durability is still local-runtime,
- support-only/admin-only role separation is still absent,
- cross-account intervention is still unproven,
- and interview evidence is still unpopulated.

## Exact next hardening move this points to

1. Move the audit sink onto authoritative hosted durability.
2. Add explicit support/admin boundaries before any cross-account intervention exists.
3. Keep the alpha **NO-GO** locked while the interview evidence pack is populated.
