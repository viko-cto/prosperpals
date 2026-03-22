# Operator Auditability Proof

**Date:** 2026-03-22 18:18 UTC  
**Lane:** operator/access readiness  
**Prepared by:** BMAD catch-up worker

## What was reviewed

- `src/lib/support/demo-support.ts`
- `src/app/app/support/page.tsx`
- `src/app/app/receipts/actions.ts`
- `src/lib/receipts/demo-receipts.ts`
- `src/lib/telemetry/demo-event-store.ts`
- `src/modules/finance/contracts.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`

## What is auditable today

### 1. Trust-critical user-path events carry request and trace references
Receipt creation, receipt failure, and receipt confirmation all capture:
- `requestId`
- `traceId`
- `occurredAt`

Those references then show up in the support timeline and in the local JSONL sinks.

### 2. The internal support surface exposes reconstruction context
`/app/support` renders a timeline that includes:
- request IDs,
- trace IDs,
- receipt/reward/trade event details,
- and release-safety check results.

That makes issue reconstruction possible without digging blindly through source code.

### 3. Receipt failure handling is at least evidence-friendly
Receipt failure records preserve:
- failure stage,
- failure code,
- recovery action,
- provider reference,
- and user-visible messaging.

That is useful for post-incident review.

## What is NOT auditable enough yet

### 1. Support-view access itself is not durably logged
`src/app/app/support/page.tsx` creates a structured log preview for `support.timeline.rendered`, but that preview is not appended to a durable audit sink.

So the repo can show what an operator could inspect, but not yet prove who opened the support surface and when.

### 2. Actor-scoped operator audit events are not wired
`src/modules/finance/contracts.ts` defines `auditEventSchema`, including `actorUserId` and `subjectUserId`.

That is the right shape.

But there is no active writer/reader path proving that operator actions are actually being recorded into an audit trail.

### 3. Feature-flag and safety-toggle changes are not audit logged
Feature flags are evaluated from defaults plus `PROSPERPALS_FEATURE_FLAGS_JSON`, but the repo does not yet persist:
- who changed a flag,
- when it changed,
- why it changed,
- or what cohort it affected.

### 4. Account-access interventions are not represented
There is no product-native path for:
- impersonation,
- session rescue,
- owner-approved account intervention,
- or support-side correction override.

That is safer than a hidden backdoor, but it also means the account-intervention audit line is still unproven.

## Checklist-grade verdict

- Support views of sensitive artifacts are auditable -> **open blocker**
- Corrections / overrides are auditable -> **manual fallback**
- Account-access interventions are auditable -> **open blocker**
- Feature-flag / safety-toggle changes are auditable -> **open blocker**

## Why the NO-GO remains locked

The repo now has enough trace context to debug user-path issues, but not enough durable actor-scoped auditability to defend a hosted finance-adjacent alpha.

The missing piece is not more prose. It is a real audit event path.

## Exact next hardening move this points to

1. Persist operator audit events using the existing `auditEventSchema` shape.
2. Record support-surface access with actor ID, subject ID, request ID, trace ID, and reason.
3. Record every feature-flag / kill-switch change with actor + timestamp.
4. Keep manual correction flows biased toward user confirmation until operator overrides are fully audited.
