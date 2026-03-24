# Hosted Analytics PostgREST Durability Path

**Date:** 2026-03-24 15:15 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD catch-up worker

## What changed in this chunk

ProsperPals now has a repo-native hosted durability path for founder-visible cohort telemetry instead of leaving onboarding, reward, simulator, and receipt-learning analytics trapped in the local JSONL sink.

The new path adds:
- a PostgREST-backed analytics adapter in `src/lib/telemetry/demo-event-store.ts`,
- environment-driven selection between local fallback and hosted durability,
- a strict `hosted-only` mode so preview/alpha can fail closed instead of silently falling back,
- a Supabase migration for `public.demo_analytics_events`,
- and automated proof in `test/demo-analytics-durability.test.mjs`.

## Code and artifacts reviewed

- `src/lib/telemetry/demo-event-store.ts`
- `src/app/app/page.tsx`
- `src/lib/support/demo-support.ts`
- `test/demo-analytics-durability.test.mjs`
- `supabase/migrations/20260324150500_demo_analytics_events.sql`
- `.env.example`

## What now passes

### 1. Founder-visible cohort telemetry no longer has to be local-only
When `PROSPERPALS_SUPABASE_URL` plus `PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY` are present, analytics events can be read and written through PostgREST on `public.demo_analytics_events`.

That directly strengthens the alpha-readiness lane because the founder-visible home card and support console both depend on this telemetry for event counts, first-value timing, and recent trust-critical user actions.

### 2. Hosted rollout can fail closed for cohort learning
When `PROSPERPALS_ANALYTICS_DURABILITY_MODE=hosted-only`, the telemetry path refuses silent fallback to `.prosperpals-runtime/demo-analytics.jsonl`.

That matters because a preview or alpha environment should not pretend it has durable cohort-health reporting if it is actually writing to local runtime storage.

### 3. The hosted analytics path is test-covered
`test/demo-analytics-durability.test.mjs` now verifies that a configured hosted analytics path can:
- append first-value and reward telemetry,
- read those events back through the hosted adapter,
- preserve founder-visible summary outputs,
- and avoid creating the local JSONL analytics sink.

## What still does NOT pass yet

### 1. This is capability proof, not deployed preview proof
The repo can now use hosted durability for analytics, but there is still no real preview/alpha smoke artifact proving the deployed environment is wired to the Supabase table.

### 2. Onboarding state and receipt review state are still not hosted-durable
This chunk improves founder-visible cohort telemetry, but the current user-state contract still depends on:
- onboarding state in cookies,
- receipt candidates/confirmations in local runtime storage,
- and receipt upload artifacts in local runtime storage.

### 3. Return-behavior reporting is stronger, but still not enough for a GO
Hosted analytics improves the ability to observe first value, rewards, simulator actions, and receipt-review outcomes, but it does not by itself close the broader NO-GO because preview rollout proof, interview evidence, and broader trust-state migration are still missing.

## Verdict by checklist line

### B1. Durable hosted truth
- Analytics-backed cohort telemetry is hosted-capable -> **manual fallback** until preview/alpha env wiring and smoke proof are attached

### B3. Observability for learning
- First aha is trackable -> **manual fallback**
- Return behavior is trackable -> **manual fallback**
- Founder-visible cohort-health reporting exists -> **manual fallback**

## Exact next move after this chunk

1. Wire `demo_analytics_events` into the same real preview/alpha environment as the audit + ledger tables and attach one honest smoke artifact.
2. Reuse the hosted durability pattern for onboarding state or receipt review state so visible product continuity no longer depends on cookies/local runtime sinks.
3. Keep the hosted-alpha NO-GO locked until deployed proof, broader state migration, and interview evidence exist.
