# Durable Truth and Local Runtime Gap Proof

**Date:** 2026-03-22 09:15 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD catch-up worker

## What was verified

This note checks whether the current ProsperPals implementation can honestly claim hosted durability for trust-critical alpha paths.

Code and artifact review covered:
- `src/lib/onboarding/demo-state.ts`
- `src/lib/telemetry/demo-event-store.ts`
- `src/lib/simulator/demo-simulator.ts`
- `docs/alpha-readiness/evidence/hosted-hardening/hosted-ledger-postgrest-durability-path.md`
- `src/lib/receipts/demo-receipts.ts`
- `test/demo-reward-loop.test.mjs`
- `test/sprint-3-explainability-operator-safety.test.mjs`
- `test/trust-idempotency.test.mjs`

## What passes today

### 1. The canonical database direction is real
The SQL trust baseline exists and is tested for idempotent writes in:
- `supabase/migrations/20260320122600_sprint0_foundation_and_trust_scaffolding.sql`
- `test/trust-idempotency.test.mjs`

This is real progress: money events, ProsperCoin ledger writes, and virtual trade executions have a durable-hosted shape at the schema level.

### 2. Demo trust flows are explicit, not hidden
The implementation does not pretend to be more hosted than it is.
Current demo runtime sinks are visible in code:
- onboarding state -> HTTP cookie (`pp_demo_onboarding`)
- analytics -> `.prosperpals-runtime/demo-analytics.jsonl`
- reward/trade ledger -> `.prosperpals-runtime/demo-ledger.jsonl`
- receipt candidates/confirmations -> `.prosperpals-runtime/demo-receipts.jsonl`

That honesty matters because it prevents a false alpha-readiness claim.

## What does NOT pass yet

### 1. Onboarding state now has a hosted-capable durability path, but not deployed proof
`src/lib/onboarding/demo-state.ts` can now read/write onboarding progress through PostgREST to `public.demo_onboarding_states`, with a `hosted-only` fail-closed mode and test proof in `test/demo-onboarding-durability.test.mjs`.

That is real progress because first-value continuity no longer has to remain cookie-only. But it is still only **manual fallback** until a real preview/alpha environment is wired and a smoke artifact proves the hosted table is live in deployment.

### 2. Reward ledger and simulator trades now have a hosted-capable durability path, but not deployed proof
`src/lib/simulator/demo-simulator.ts` can now write ProsperCoin and virtual trade records through PostgREST to `public.demo_ledger_records`, with a `hosted-only` fail-closed mode and test proof in `test/demo-reward-loop.test.mjs`.

That is real progress, but it is still only **manual fallback** until a real preview/alpha environment is wired and a smoke artifact proves the hosted table is live in deployment.

### 3. Receipt candidates do not yet survive true hosted redeploy expectations
`src/lib/receipts/demo-receipts.ts` writes receipt candidates and confirmations to the same local runtime folder.

Even before the upload/provider gap, the receipt review path is still demo-local persistence, not a hosted artifact + parse + review chain.

### 4. Support/audit traces and founder-visible analytics now have hosted-capable paths, but preview proof is still missing
Operator audit events now have their own hosted-capable path in `src/lib/audit/demo-audit.ts`, and analytics in `src/lib/telemetry/demo-event-store.ts` can now also write through PostgREST to `public.demo_analytics_events` with a strict `hosted-only` mode.

That is meaningful progress because support/audit evidence and founder-visible cohort reporting no longer have to stay local-only. But both lanes are still only **manual fallback** until a real preview/alpha environment is wired and a smoke artifact proves the hosted tables are live in deployment.

### 5. Critical alpha continuity still depends on local sinks in key user-state lanes
The repo still relies on local sinks for receipt review state and receipt-upload artifacts, while onboarding continuity still lives in cookies.

That keeps the hosted-alpha NO-GO locked even though the analytics, audit, and ledger lanes are now hosted-capable.

## Manual fallbacks currently available

- The schema/migration layer provides the target hosted shape for money, rewards, and trades.
- Local JSONL sinks provide bounded demo persistence for development and review.
- Cookie persistence gives a lightweight repeat-visit experience for onboarding.

These are valid development aids, not hosted alpha closure.

## Verdict by checklist line

### B1. Durable hosted truth
- Onboarding state persists per user -> **manual fallback**
- Reward ledger is hosted and durable -> **manual fallback**
- Simulator trades are hosted and durable -> **manual fallback**
- Receipt candidates survive redeploys -> **open blocker**
- Support and audit traces survive redeploys -> **manual fallback**
- Founder-visible cohort telemetry is hosted-capable -> **manual fallback**
- No critical path depends on local runtime file sinks -> **open blocker**

## Why this is not yet safe for CONDITIONAL GO

Because the current surfaced experience still stores trust-critical alpha evidence in local runtime files and cookies, a deploy/redeploy/instance shift could break continuity or audit confidence. The database direction is credible, but the running trust path is not yet migrated onto it.

## Exact next hardening move this proof points to

Move the surfaced alpha path off remaining local-runtime persistence for:
1. receipt candidates/confirmations plus receipt-upload artifacts,
2. deployed preview/alpha rollout proof for the audit, ledger, and analytics hosted paths,
3. preview/alpha rollout proof for the new hosted onboarding path.

Until that happens, hosted truth remains partly architectural intent and partly demo-local behavior.
ocal behavior.
