# Hosted Onboarding PostgREST Durability Path

**Date:** 2026-03-24 21:45 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD catch-up worker

## What changed in this chunk

ProsperPals no longer has to treat first-value onboarding continuity as cookie-only state.

The repo now has a hosted durability path for onboarding progress in the same style as the existing audit, ledger, and analytics adapters:
- `src/lib/onboarding/demo-state.ts` can now read/write onboarding state through PostgREST when hosted credentials exist,
- `hosted-only` mode can fail closed instead of silently falling back to the `pp_demo_onboarding` cookie,
- a Supabase migration now defines `public.demo_onboarding_states`,
- and automated proof exists in `test/demo-onboarding-durability.test.mjs`.

## Code and artifacts reviewed

- `src/lib/onboarding/demo-state.ts`
- `src/app/app/onboarding/actions.ts`
- `src/app/app/onboarding/page.tsx`
- `src/app/app/page.tsx`
- `src/app/app/simulator/actions.ts`
- `src/app/app/simulator/page.tsx`
- `src/app/app/receipts/actions.ts`
- `src/lib/explainability/demo-explainability.ts`
- `test/demo-onboarding-durability.test.mjs`
- `supabase/migrations/20260324214500_demo_onboarding_states.sql`
- `.env.example`

## What now passes

### 1. First-value onboarding continuity no longer has to be cookie-only
When `PROSPERPALS_SUPABASE_URL` plus `PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY` are present, the onboarding state adapter can persist the selected intent, mode, first-value completion state, first insight summary, and Goldie → Fin handoff through `public.demo_onboarding_states`.

That directly reduces the hosted-alpha gap because the home shell, onboarding route, simulator handoff, receipt analytics context, and explainability layer all depend on this continuity state.

### 2. Hosted rollout can fail closed for onboarding continuity
When `PROSPERPALS_ONBOARDING_DURABILITY_MODE=hosted-only`, ProsperPals refuses to silently fall back to the cookie-backed onboarding state during read/write/delete operations.

That matters because preview or alpha should not pretend onboarding continuity survives redeploys if it is actually still browser-local state.

### 3. The hosted onboarding path is test-covered
`test/demo-onboarding-durability.test.mjs` verifies that a configured hosted onboarding path can:
- upsert onboarding progress,
- read it back through the hosted adapter,
- expose the hosted sink location honestly,
- and clear the stored onboarding state without relying on the cookie path.

## What still does NOT pass yet

### 1. This is capability proof, not deployed preview proof
The repo can now use hosted durability for onboarding state, but there is still no real preview/alpha smoke artifact proving the deployed environment is wired to `demo_onboarding_states`.

### 2. Receipt review state and receipt artifacts are still local-runtime blockers
This chunk closes the cookie-backed onboarding gap, but the receipt lane still depends on local runtime storage for:
- receipt candidates and confirmations,
- receipt artifact metadata,
- and uploaded receipt files.

### 3. The alpha NO-GO still stays locked
Hosted onboarding continuity is real progress, but it does not reopen alpha by itself because interview evidence is still missing, preview/alpha proof for the existing hosted paths is still missing, and the receipt durability lane remains incomplete.

## Verdict by checklist line

### B1. Durable hosted truth
- Onboarding state persists per user -> **manual fallback** until preview/alpha env wiring and smoke proof are attached
- No critical path depends on local runtime file sinks -> still **open blocker** because the receipt lane remains local-runtime dependent

## Exact next move after this chunk

1. Run honest preview/alpha smoke proof for the already-hosted audit + ledger + analytics paths and attach the generated artifact.
2. Reuse the same hosted durability pattern for receipt review state and receipt artifact storage so the remaining trust-critical continuity gap is no longer local-runtime bound.
3. Keep the hosted-alpha NO-GO locked until those proof artifacts and the missing interview evidence exist.
