# Preview Hosted Durability Smoke Runbook

**Date:** 2026-03-24 13:15 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD work block 3

## Why this exists

ProsperPals already has repo-native hosted durability adapters for:
- operator audit events (`demo_operator_audit_events`)
- reward + starter trade ledger records (`demo_ledger_records`)
- founder-visible cohort telemetry (`demo_analytics_events`)
- onboarding continuity (`demo_onboarding_states`)
- receipt review + artifact durability (`demo_receipt_records`, `demo_receipt_artifacts`)

What was still missing was an **honest, repeatable smoke procedure** that proves those hosted paths are actually wired in preview/alpha and that fail-closed `hosted-only` mode does not silently fall back to local runtime sinks.

This runbook closes that gap.

It adds a single command that:
1. requires hosted-only durability for the audit, ledger, and analytics paths,
2. requires hosted-only durability for onboarding and receipt review/artifact paths too,
3. writes an audit event through the hosted adapter,
4. writes first-value analytics through the hosted adapter,
5. writes and restores onboarding state through the hosted adapter,
6. captures and confirms a receipt candidate with hosted artifact + review persistence,
7. writes a reward credit and starter trade through the hosted ledger adapter,
8. reads the records back,
9. fails if local JSONL fallback files or receipt-upload runtime artifacts are created,
10. optionally emits a markdown proof note.

## Command

```bash
PROSPERPALS_ENV=preview \
PROSPERPALS_SUPABASE_URL=https://<project>.supabase.co \
PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY=<service-role-key> \
PROSPERPALS_AUDIT_DURABILITY_MODE=hosted-only \
PROSPERPALS_LEDGER_DURABILITY_MODE=hosted-only \
PROSPERPALS_ANALYTICS_DURABILITY_MODE=hosted-only \
PROSPERPALS_ONBOARDING_DURABILITY_MODE=hosted-only \
PROSPERPALS_RECEIPT_DURABILITY_MODE=hosted-only \
PROSPERPALS_HOSTED_SMOKE_REPORT_PATH=docs/alpha-readiness/evidence/hosted-hardening/generated/preview-hosted-durability-smoke-latest.md \
npm run smoke:hosted-durability
```

## Required conditions before running

- The Supabase migrations for `demo_operator_audit_events`, `demo_ledger_records`, and `demo_analytics_events` are already applied.
- The Supabase migrations for `demo_onboarding_states`, `demo_receipt_records`, and `demo_receipt_artifacts` are also already applied.
- The preview/alpha environment has the correct Supabase URL + service role key.
- The smoke run should target a non-user-facing preview/alpha setup, not production.
- `PROSPERPALS_AUDIT_DURABILITY_MODE=hosted-only`, `PROSPERPALS_LEDGER_DURABILITY_MODE=hosted-only`, `PROSPERPALS_ANALYTICS_DURABILITY_MODE=hosted-only`, `PROSPERPALS_ONBOARDING_DURABILITY_MODE=hosted-only`, and `PROSPERPALS_RECEIPT_DURABILITY_MODE=hosted-only` are set explicitly.

## What counts as PASS

A successful run means:
- the script exits 0,
- the JSON output shows an audit read-back count >= 1,
- the analytics read-back count is >= 1,
- the ledger read-back count is >= 3,
- the onboarding location reports `supabase:<table>` and a first-value completion timestamp is read back,
- the receipt sink and artifact sink both report `supabase:<table>`,
- the receipt confirmation count is >= 1,
- `analyticsPath` reports `supabase:<table>` rather than a local file path,
- `ledgerPath` reports `supabase:<table>` rather than a local file path,
- and no local fallback sinks or local receipt-upload runtime directories were created.

## What counts as FAIL

Treat the smoke as failed if any of these happen:
- required env vars are missing,
- any durability lane is not in `hosted-only`,
- audit write/read does not round-trip,
- analytics write/read does not round-trip,
- onboarding write/read does not round-trip,
- receipt capture/confirmation does not round-trip,
- reward/trade ledger records do not round-trip,
- the trade is blocked unexpectedly,
- or local JSONL fallback files / receipt-upload runtime artifacts are created.

## Output handling

### Console output
The script prints a JSON result with:
- environment label,
- request id / trace id,
- audit read-back count,
- analytics read-back count,
- ledger read-back count,
- onboarding location + restored first-value fields,
- receipt sink paths + receipt confirmation count,
- analytics summary event count,
- available/earned/debited ProsperCoins,
- local sink creation flags.

### Optional markdown proof note
If `PROSPERPALS_HOSTED_SMOKE_REPORT_PATH` is set, the script also writes a markdown report.

Recommended location:
- `docs/alpha-readiness/evidence/hosted-hardening/generated/preview-hosted-durability-smoke-latest.md`

## What this does NOT prove

This smoke run is intentionally bounded.

It does **not** prove:
- support/admin least-privilege maturity,
- interview evidence,
- or that preview and alpha are safely separated by release policy.

It **does** define the deployment-proof bar for the now-hosted-capable trust lanes: audit, ledger, analytics, onboarding, and receipt review/artifacts.

So even after a PASS, the hosted-alpha **NO-GO remains locked** until those other blockers are closed.

## Exact next move after this artifact

1. Load the target-specific source values and run `npm run vercel:env-contract -- --target <preview|production> --mode check` using `docs/alpha-readiness/evidence/hosted-hardening/preview-alpha-env-wiring-manifest.md`.
2. If the check shows missing keys, run the same helper with `--mode sync` instead of hand-adding one variable at a time.
3. Run the smoke in the real preview/alpha environment.
4. Attach the generated markdown proof note under `docs/alpha-readiness/evidence/hosted-hardening/generated/`.
5. Update the hosted-hardening checklist from `manual fallback` to `complete` only for the lines actually proven by that smoke note plus any separate role-boundary evidence.
