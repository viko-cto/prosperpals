# Hosted Ledger PostgREST Durability Path

**Date:** 2026-03-24 12:39 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD catch-up worker

## What changed in this chunk

ProsperPals now has a repo-native hosted durability path for the user-facing reward ledger and starter simulator trade records instead of only the local JSONL runtime sink.

The new path adds:
- a PostgREST-backed ledger adapter in `src/lib/simulator/demo-simulator.ts`,
- environment-driven selection between local fallback and hosted durability,
- a strict `hosted-only` mode so preview/alpha can fail closed instead of silently falling back,
- and a Supabase migration for `public.demo_ledger_records`.

## Code and artifacts reviewed

- `src/lib/simulator/demo-simulator.ts`
- `test/demo-reward-loop.test.mjs`
- `supabase/migrations/20260324123900_demo_ledger_records.sql`

## What now passes

### 1. Reward and trade records no longer have to be local-only
When `PROSPERPALS_SUPABASE_URL` plus `PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY` are present, ProsperCoin credits/debits and virtual starter trade executions can be read/written through PostgREST on a hosted Supabase table.

### 2. Hosted rollout can fail closed for the trust loop
When `PROSPERPALS_LEDGER_DURABILITY_MODE=hosted-only`, the running product path refuses silent fallback to `.prosperpals-runtime/demo-ledger.jsonl`.

That matters because reward/trade continuity is part of the visible trust surface. If the hosted path breaks, alpha should break loudly instead of pretending the ledger is still durable.

### 3. The hosted ledger path is test-covered
`test/demo-reward-loop.test.mjs` now verifies that a configured hosted ledger path can:
- award starter ProsperCoins,
- execute a starter trade,
- read the combined record set back through the hosted adapter,
- and avoid creating the local JSONL ledger sink.

## What still does NOT pass yet

### 1. This is capability proof, not deployed preview proof
The repo can now use hosted durability for the reward/trade loop, but there is still no real preview/alpha smoke artifact proving the deployed environment is wired to the Supabase table.

### 2. The linked Vercel project still does not prove hosted rollout readiness
A repo-native check against the linked `prosperpals-app` Vercel project showed that both preview and production currently have no configured environment variables.

That means the hosted ledger path cannot honestly be claimed as deployed yet.

### 3. Other trust-critical state is still local-runtime
This chunk only moved the reward/trade ledger lane forward. Onboarding, analytics, and receipt candidate state still depend on cookies or local runtime sinks unless separately migrated.

## Verdict by checklist line

### B1. Durable hosted truth
- Reward ledger is hosted and durable -> **manual fallback** until preview/alpha env wiring and smoke proof are attached
- Simulator trades are hosted and durable -> **manual fallback** until preview/alpha env wiring and smoke proof are attached

## Exact next move after this chunk

1. Wire both hosted tables (`demo_operator_audit_events` and `demo_ledger_records`) into a real preview/alpha environment and capture one honest smoke proof note.
2. Reuse the same durability pattern for onboarding or analytics so founder-visible cohort learning stops depending on cookie/local runtime state.
3. Keep the hosted-alpha NO-GO locked until deployed proof and interview evidence exist.
