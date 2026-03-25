# Durable Truth and Local Runtime Gap Proof

**Date:** 2026-03-25 06:30 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD catch-up worker

## What was verified

This note checks whether the current ProsperPals implementation can honestly claim hosted durability for trust-critical alpha paths.

Code and artifact review covered:
- `src/lib/onboarding/demo-state.ts`
- `src/lib/telemetry/demo-event-store.ts`
- `src/lib/simulator/demo-simulator.ts`
- `src/lib/audit/demo-audit.ts`
- `src/lib/receipts/demo-receipts.ts`
- `test/demo-onboarding-durability.test.mjs`
- `test/demo-reward-loop.test.mjs`
- `test/demo-analytics-durability.test.mjs`
- `test/demo-receipt-durability.test.mjs`
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

Current development/runtime fallbacks are visible in code and configuration. That honesty matters because it prevents a false alpha-readiness claim.

## What does NOT pass yet

### 1. Onboarding state now has a hosted-capable durability path, but not deployed proof
`src/lib/onboarding/demo-state.ts` can now read/write onboarding progress through PostgREST to `public.demo_onboarding_states`, with a `hosted-only` fail-closed mode and test proof in `test/demo-onboarding-durability.test.mjs`.

That is real progress because first-value continuity no longer has to remain cookie-only. But it is still only **manual fallback** until a real preview/alpha environment is wired and a proof artifact shows the hosted table is live in deployment.

### 2. Reward ledger and simulator trades now have a hosted-capable durability path, but not deployed proof
`src/lib/simulator/demo-simulator.ts` can now write ProsperCoin and virtual trade records through PostgREST to `public.demo_ledger_records`, with a `hosted-only` fail-closed mode and test proof in `test/demo-reward-loop.test.mjs`.

That is real progress, but it is still only **manual fallback** until a real preview/alpha environment is wired and a proof artifact shows the hosted table is live in deployment.

### 3. Receipt review state now has a hosted-capable durability path, but not deployed proof
`src/lib/receipts/demo-receipts.ts` can now read/write receipt candidates, failures, confirmations, and bounded artifact payloads through PostgREST to `public.demo_receipt_records` plus `public.demo_receipt_artifacts`, with a strict `hosted-only` mode and test proof in `test/demo-receipt-durability.test.mjs`.

That is real progress because the receipt review path no longer has to remain demo-local persistence. But it is still only **manual fallback** until a real preview/alpha environment is wired and a proof artifact shows the hosted tables are live in deployment.

### 4. Support/audit traces and founder-visible analytics now have hosted-capable paths, but preview proof is still missing
Operator audit events now have their own hosted-capable path in `src/lib/audit/demo-audit.ts`, and analytics in `src/lib/telemetry/demo-event-store.ts` can now also write through PostgREST to `public.demo_analytics_events` with a strict `hosted-only` mode.

That is meaningful progress because support/audit evidence and founder-visible cohort reporting no longer have to stay local-only. But both lanes are still only **manual fallback** until a real preview/alpha environment is wired and a proof artifact shows the hosted tables are live in deployment.

### 5. Critical alpha continuity is now hosted-capable in repo, but deployed proof is still missing
The repo now has hosted-capable paths for onboarding continuity, analytics, audit, reward/trade ledger state, and the receipt review/artifact lane.

That is enough to shrink the blocker from “missing hosted path” to “missing deployed proof and strict environment wiring.” The hosted-alpha NO-GO still stays locked because no real preview/alpha evidence yet proves those lanes are live without local fallback in deployment.

## Manual fallbacks currently available

- The schema/migration layer provides the target hosted shape for money, rewards, trades, onboarding, audit, analytics, and receipts.
- Local fallbacks still exist for development when strict hosted-only mode is not enabled.
- The smoke harness now proves audit + ledger + analytics + onboarding + receipt durability together in repo, but all five lanes still need a real deployed preview/alpha evidence note.

These are valid development aids, not hosted alpha closure.

## Verdict by checklist line

### B1. Durable hosted truth
- Onboarding state persists per user -> **manual fallback**
- Reward ledger is hosted and durable -> **manual fallback**
- Simulator trades are hosted and durable -> **manual fallback**
- Receipt candidates survive redeploys -> **manual fallback**
- Support and audit traces survive redeploys -> **manual fallback**
- Founder-visible cohort telemetry is hosted-capable -> **manual fallback**
- No critical path depends on local runtime file sinks -> **open blocker**

## Why this is not yet safe for CONDITIONAL GO

Because the current surfaced experience still lacks real preview/alpha proof that the hosted paths are wired and enforced in deployment, a config break or instance shift could still collapse back into manual/local behavior outside strict hosted-only mode. The database direction is now credible across the full trust lane, but the running deployed proof is still missing.

## Exact next hardening move this proof points to

Prove the now-hosted-capable trust lanes in a real preview/alpha environment for:
1. audit, ledger, analytics, onboarding, and receipt durability,
2. strict hosted-only enforcement without silent local fallback,
3. and founder/operator evidence attachment into the alpha-readiness folder.

Until that happens, hosted truth remains partly implementation-ready and partly unproven in deployment.
