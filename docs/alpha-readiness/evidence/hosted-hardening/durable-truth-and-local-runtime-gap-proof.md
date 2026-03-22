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

### 1. Onboarding state is not hosted durable
`src/lib/onboarding/demo-state.ts` stores onboarding progress in a cookie. That can persist for a returning browser, but it is not an authoritative hosted user-state system and is not enough for a real alpha trust claim.

### 2. Reward ledger and simulator trades are not yet hosted durable in the running product path
`src/lib/simulator/demo-simulator.ts` writes ProsperCoin and virtual trade records to a local JSONL sink under `.prosperpals-runtime/` unless overridden by env vars.

This means the current runtime path still depends on local file persistence rather than an authoritative hosted ledger for the surfaced alpha experience.

### 3. Receipt candidates do not yet survive true hosted redeploy expectations
`src/lib/receipts/demo-receipts.ts` writes receipt candidates and confirmations to the same local runtime folder.

Even before the upload/provider gap, the receipt review path is still demo-local persistence, not a hosted artifact + parse + review chain.

### 4. Support/audit traces are not hosted durable yet
`src/lib/telemetry/demo-event-store.ts` writes analytics and support-visible traces to local JSONL.

This is useful for local proof and tests, but not strong enough for founder-visible hosted cohort reporting or reliable audit survival across redeploys.

### 5. Critical alpha learning paths still depend on local file sinks
The repo currently uses local file sinks for the user-visible alpha learning loop, support timeline evidence, and receipt review evidence.

That keeps the hosted-alpha NO-GO locked.

## Manual fallbacks currently available

- The schema/migration layer provides the target hosted shape for money, rewards, and trades.
- Local JSONL sinks provide bounded demo persistence for development and review.
- Cookie persistence gives a lightweight repeat-visit experience for onboarding.

These are valid development aids, not hosted alpha closure.

## Verdict by checklist line

### B1. Durable hosted truth
- Onboarding state persists per user -> **manual fallback**
- Reward ledger is hosted and durable -> **open blocker**
- Simulator trades are hosted and durable -> **open blocker**
- Receipt candidates survive redeploys -> **open blocker**
- Support and audit traces survive redeploys -> **open blocker**
- No critical path depends on local runtime file sinks -> **open blocker**

## Why this is not yet safe for CONDITIONAL GO

Because the current surfaced experience still stores trust-critical alpha evidence in local runtime files and cookies, a deploy/redeploy/instance shift could break continuity or audit confidence. The database direction is credible, but the running trust path is not yet migrated onto it.

## Exact next hardening move this proof points to

Move the surfaced alpha path off cookie/JSONL persistence for:
1. onboarding progress,
2. ProsperCoin ledger + virtual trades,
3. receipt candidates/confirmations,
4. support/audit timeline events.

Until that happens, hosted truth remains partly architectural intent and partly demo-local behavior.
