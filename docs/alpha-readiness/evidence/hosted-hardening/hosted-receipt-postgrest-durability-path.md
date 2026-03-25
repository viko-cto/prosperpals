# Hosted Receipt PostgREST Durability Path

**Date:** 2026-03-25 06:30 UTC  
**Lane:** hosted hardening / receipt realism  
**Prepared by:** BMAD catch-up worker

## What changed

ProsperPals now has a hosted-capable durability path for the remaining receipt review state that was still trapped in local runtime files.

This step adds:
- a PostgREST-backed receipt review adapter in `src/lib/receipts/demo-receipts.ts`,
- hosted tables for both receipt records and receipt artifacts,
- a strict `hosted-only` mode so preview/alpha can fail closed instead of silently recreating local receipt sinks,
- and test coverage proving candidate creation, confirmation, and uploaded artifact metadata can round-trip through the hosted path without creating local JSONL or upload files.

## What is hosted now

When `PROSPERPALS_SUPABASE_URL` plus `PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY` are present, the receipt lane can now persist through PostgREST on:
- `public.demo_receipt_records`
- `public.demo_receipt_artifacts`

The hosted path covers:
- receipt candidates,
- receipt failures,
- receipt confirmations,
- uploaded/simulated artifact metadata,
- and a bounded demo artifact payload (`artifactPayloadBase64`) so the alpha receipt lineage no longer has to depend on local runtime uploads just to survive redeploys.

## Why this matters

Before this change, the repo had already made audit, ledger, analytics, and onboarding hosted-capable, but the receipt lane still depended on:
- `.prosperpals-runtime/demo-receipts.jsonl`
- `.prosperpals-runtime/demo-receipt-artifacts.jsonl`
- `.prosperpals-runtime/receipt-uploads/`

That meant the most trust-sensitive capture/review lane still had a redeploy fragility gap even after the rest of the alpha hardening work improved.

Now the receipt lane follows the same truth contract as the other hosted-capable demo surfaces:
- prefer hosted when configured,
- allow bounded local fallback for development when not in strict mode,
- and fail closed in `hosted-only` mode.

## Proof in repo

### Code
- `src/lib/receipts/demo-receipts.ts`

### Schema
- `supabase/migrations/20260325061000_demo_receipt_durability.sql`

### Test
- `test/demo-receipt-durability.test.mjs`

That test proves:
1. a hosted artifact row is written,
2. a hosted receipt candidate row is written,
3. confirmation writes the reviewed candidate update plus confirmation row,
4. read-back uses the hosted tables,
5. and no local receipt JSONL or upload directory is created while `PROSPERPALS_RECEIPT_DURABILITY_MODE=hosted-only`.

## Current status

- **Receipt review state survives redeploys:** manual fallback  
- **Receipt artifacts survive redeploys:** manual fallback  
- **Hosted-only fail-closed mode exists:** complete  
- **Real preview/alpha rollout proof exists:** open blocker

## What still does not count as done

This is a hosted-capable path, not deployed proof.

The NO-GO stays locked until the team also captures:
- a real preview/alpha proof note showing the hosted receipt tables are wired in deployment,
- broader environment/release evidence,
- and the still-missing interview evidence and operator-boundary closure.

## Exact next move this points to

Run a real preview/alpha proof pass with hosted receipt durability enabled, attach the evidence note, and keep the NO-GO locked while interview evidence and operator/admin boundary gaps remain open.
