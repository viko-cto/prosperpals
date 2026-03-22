# Operator Auditability Proof

**Date:** 2026-03-22 21:25 UTC  
**Lane:** operator/access readiness  
**Prepared by:** BMAD catch-up worker

## What was reviewed

- `src/lib/audit/demo-audit.ts`
- `src/lib/support/demo-support.ts`
- `src/app/app/support/page.tsx`
- `src/modules/finance/contracts.ts`
- `src/lib/telemetry/request-context.ts`
- `src/lib/feature-flags/config.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`

## What is auditable today

### 1. Support-view access is now actor-scoped and timestamped
Opening `/app/support` as an internal viewer now writes a durable operator audit event into the demo audit sink.

Each `support.timeline.viewed` event captures:
- `occurredAt`
- `actorUserId`
- `subjectUserId`
- `requestId`
- `traceId`
- `path`
- `reason`
- `supportTraceView`

That is the first real proof path using the existing `auditEventSchema` instead of leaving it as an unused contract.

### 2. Support-console reconstruction still carries request and trace references
Receipt creation, receipt failure, receipt confirmation, rewards, trades, and support-surface access now all show up in the internal timeline with request/trace context.

That makes it possible to answer:
- who opened the support surface,
- which user context was being inspected,
- and which trust-critical events were visible in the same review window.

### 3. Audit writes are duplicate-safe per request
The demo audit writer suppresses duplicate writes for the same:
- `requestId`
- `eventCode`
- `actorUserId`
- `subjectUserId`

That reduces the risk of a noisy or repeated server render producing fake extra operator history.

## What is NOT auditable enough yet

### 1. The audit sink is still local-runtime, not hosted durable
The new operator audit path proves actor-scoped logging exists, but the sink still lands in `.prosperpals-runtime/demo-operator-audit.jsonl` or `PROSPERPALS_DEMO_AUDIT_PATH`.

So it improves operator readiness, but it does **not** close hosted durability.

### 2. Feature-flag and safety-toggle changes are still not actor-logged
Feature flags are evaluated from defaults plus `PROSPERPALS_FEATURE_FLAGS_JSON`, but the repo still does not persist:
- who changed a flag,
- when it changed,
- why it changed,
- or what cohort it affected.

### 3. Account-access interventions are still absent
There is still no product-native path for:
- impersonation,
- session rescue,
- owner-approved account intervention,
- or support-side correction override.

That is safer than a hidden backdoor, but it means those interventions remain unproven and unauditable.

### 4. The current subject scope is still narrow
The wired path currently records support-surface review against the current session user.

That is enough to prove the audit rail exists, but not yet enough to prove least-privilege founder/support review across a hosted multi-user alpha.

## Checklist-grade verdict

- Support views of sensitive artifacts are auditable -> **manual fallback**
- Corrections / overrides are auditable -> **manual fallback**
- Account-access interventions are auditable -> **open blocker**
- Feature-flag / safety-toggle changes are auditable -> **open blocker**

## Why the NO-GO remains locked

This step materially improves the operator-readiness lane because the repo now has a real actor-scoped audit trail for support-surface access.

But hosted alpha remains **NO-GO** because:
- audit durability is still local-runtime,
- feature-flag and safety-toggle changes are still unaudited,
- support/admin role separation is still absent,
- and interview evidence is still unpopulated.

## Exact next hardening move this points to

1. Move the audit sink onto authoritative hosted durability.
2. Extend the same audit rail to feature-flag / kill-switch changes.
3. Add explicit support/admin boundaries before any cross-account intervention exists.
4. Keep the alpha **NO-GO** locked while the interview evidence pack is populated.
