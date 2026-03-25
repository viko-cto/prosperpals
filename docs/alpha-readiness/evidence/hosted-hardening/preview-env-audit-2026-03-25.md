# Preview Environment Audit — Missing Hosted Wiring Proof

**Date:** 2026-03-25 07:17 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD work block 1

## Why this audit exists

The current ProsperPals alpha-readiness step says the next honest move is to attach **real preview/alpha proof** for the now-hosted-capable trust lanes.

Before claiming that proof, the deployment surface itself has to show the required hosted wiring.

This audit checked the linked Vercel project directly to answer a simple question:

> are the preview/alpha environment variables present yet for the hosted durability smoke path?

## What was inspected

### Linked Vercel project
From `.vercel/project.json`:
- project name: `prosperpals-app`
- project id: `prj_WdX96FObPfLM4v22E1eVc8xMuGXT`
- org id: `team_dIjuxdFy3vjFiOlRFzNxdqF1`

### Command run
```bash
VERCEL_TOKEN=$(cat /home/node/.config/vercel/token)
npx vercel env ls --token "$VERCEL_TOKEN"
```

### Result
```text
Retrieving project…
> No Environment Variables found for vadims-projects-5e8f49e5/prosperpals-app [202ms]
```

## What this proves

This is **not** a smoke failure inside the hosted durability script.

It is an earlier blocker:
- the linked hosted project currently has **no env wiring recorded in Vercel**,
- so the repo cannot yet produce honest preview/alpha proof for hosted-only durability,
- and the BMAD alpha-readiness lane must continue to hold **NO-GO**.

## Trust-critical variables still expected before hosted proof can count

At minimum, the preview/alpha proof lane still needs explicit hosted wiring for:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY`
- `PROSPERPALS_AUDIT_DURABILITY_MODE=hosted-only`
- `PROSPERPALS_LEDGER_DURABILITY_MODE=hosted-only`
- `PROSPERPALS_ANALYTICS_DURABILITY_MODE=hosted-only`
- `PROSPERPALS_ONBOARDING_DURABILITY_MODE=hosted-only`
- `PROSPERPALS_RECEIPT_DURABILITY_MODE=hosted-only`

If preview/alpha separation is intentional, those values must also be scoped clearly by environment rather than implied.

## Checklist impact

This audit keeps the following lines blocked:
- **B2 / Preview and alpha-hosted environments are clearly separated**
- **B2 / Required secrets/config are documented**
- all hosted-proof lines that still depend on a real preview/alpha smoke run

## Honest next move

1. Wire the required Vercel environment variables for preview and any distinct alpha-hosted target.
2. Re-run the hosted durability smoke in `hosted-only` mode.
3. Save the generated proof note under `docs/alpha-readiness/evidence/hosted-hardening/generated/`.
4. Only then soften checklist lines from `manual fallback` toward `complete`.

## Decision posture

**Recommendation remains: NO-GO**

Why:
- the repo now contains hosted-capable durability paths,
- but the live hosted environment still lacks the required env wiring,
- so there is still no real deployment proof for audit, ledger, analytics, onboarding, or receipt durability.
