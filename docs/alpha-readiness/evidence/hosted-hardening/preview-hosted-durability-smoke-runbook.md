# Preview Hosted Durability Smoke Runbook

**Date:** 2026-03-24 13:15 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD work block 3

## Why this exists

ProsperPals already has repo-native hosted durability adapters for:
- operator audit events (`demo_operator_audit_events`)
- reward + starter trade ledger records (`demo_ledger_records`)

What was still missing was an **honest, repeatable smoke procedure** that proves those hosted paths are actually wired in preview/alpha and that fail-closed `hosted-only` mode does not silently fall back to local runtime sinks.

This runbook closes that gap.

It adds a single command that:
1. requires hosted-only durability for both audit and ledger paths,
2. writes an audit event through the hosted adapter,
3. writes a reward credit and starter trade through the hosted ledger adapter,
4. reads the records back,
5. fails if local JSONL fallback files are created,
6. optionally emits a markdown proof note.

## Command

```bash
PROSPERPALS_ENV=preview \
PROSPERPALS_SUPABASE_URL=https://<project>.supabase.co \
PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY=<service-role-key> \
PROSPERPALS_AUDIT_DURABILITY_MODE=hosted-only \
PROSPERPALS_LEDGER_DURABILITY_MODE=hosted-only \
PROSPERPALS_HOSTED_SMOKE_REPORT_PATH=docs/alpha-readiness/evidence/hosted-hardening/generated/preview-hosted-durability-smoke-latest.md \
npm run smoke:hosted-durability
```

## Required conditions before running

- The Supabase migrations for `demo_operator_audit_events` and `demo_ledger_records` are already applied.
- The preview/alpha environment has the correct Supabase URL + service role key.
- The smoke run should target a non-user-facing preview/alpha setup, not production.
- `PROSPERPALS_AUDIT_DURABILITY_MODE=hosted-only` and `PROSPERPALS_LEDGER_DURABILITY_MODE=hosted-only` are set explicitly.

## What counts as PASS

A successful run means:
- the script exits 0,
- the JSON output shows an audit read-back count >= 1,
- the ledger read-back count is >= 3,
- `ledgerPath` reports `supabase:<table>` rather than a local file path,
- and no local fallback sinks were created.

## What counts as FAIL

Treat the smoke as failed if any of these happen:
- required env vars are missing,
- either durability lane is not in `hosted-only`,
- audit write/read does not round-trip,
- reward/trade ledger records do not round-trip,
- the trade is blocked unexpectedly,
- or local JSONL fallback files are created.

## Output handling

### Console output
The script prints a JSON result with:
- environment label,
- request id / trace id,
- audit read-back count,
- ledger read-back count,
- available/earned/debited ProsperCoins,
- local sink creation flags.

### Optional markdown proof note
If `PROSPERPALS_HOSTED_SMOKE_REPORT_PATH` is set, the script also writes a markdown report.

Recommended location:
- `docs/alpha-readiness/evidence/hosted-hardening/generated/preview-hosted-durability-smoke-latest.md`

## What this does NOT prove

This smoke run is intentionally narrow.

It does **not** prove:
- onboarding durability,
- analytics durability,
- receipt candidate durability,
- support/admin least-privilege maturity,
- or interview evidence.

So even after a PASS, the hosted-alpha **NO-GO remains locked** until those other blockers are closed.

## Exact next move after this artifact

1. Run the smoke in the real preview/alpha environment.
2. Attach the generated markdown proof note under `docs/alpha-readiness/evidence/hosted-hardening/generated/`.
3. Update the hosted-hardening checklist from `manual fallback` to `complete` only for the lines actually proven by that smoke.
4. Reuse the same pattern for onboarding/analytics/receipts so more of the trust surface stops depending on cookie/local-runtime state.
