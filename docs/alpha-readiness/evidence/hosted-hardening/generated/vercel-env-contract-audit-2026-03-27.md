# Vercel Env Contract Audit — Preview + Production

- **Generated at:** 2026-03-27T08:43:16.684Z
- **Lane:** hosted hardening
- **Command:** `node scripts/hosted-env-contract-audit.mjs`
- **Decision posture:** NO-GO remains locked

## Why this audit exists

The ProsperPals repo already has a repeatable env-contract checker at `scripts/vercel-env-contract.mjs`, but the evidence lane still depended on ad-hoc terminal output and a single older preview-only note.

This audit makes the blocker current and durable by checking **both** linked Vercel targets, saving the exact output in-repo, and keeping the hosted-alpha NO-GO tied to evidence instead of memory.

## Target summary

| Target | Status | Missing remote keys | Resolved app URL |
| --- | --- | ---: | --- |
| preview | blocked | 18 | https://prosperpals-app-git-ppdev1-vadims-projects-5e8f49e5.vercel.app |
| production | blocked | 18 | https://prosperpals-app.vercel.app |

## What this proves

- The linked Vercel targets do **not** yet satisfy the recorded env contract, so hosted durability proof is still blocked upstream of the smoke harness.
- The blocker is now expressed against the same repo-native contract the team would use for sync work, not a hand-maintained checklist alone.
- The generated note is safe to cite in the alpha-readiness checklist and re-decision packet because it preserves the exact command output.

## Honest next move

1. Load the real Supabase URL + anon key + service role key into the env-contract sync flow for the intended target(s).
2. Re-run this audit after sync so the repo captures which target actually moved from blocked to ready.
3. Only run the hosted-only durability smoke once this note shows the target is ready; until then the hosted alpha NO-GO stays honest.

## Raw command output

### preview

- Exit code: 1

```text
# ProsperPals Vercel env contract (check)
- Project: prosperpals-app (prj_WdX96FObPfLM4v22E1eVc8xMuGXT)
- Org: team_dIjuxdFy3vjFiOlRFzNxdqF1
- Target: preview

| Key | Remote | Source | Value |
| --- | --- | --- | --- |
| NEXT_PUBLIC_APP_URL | missing | source:linked-vercel:preview | https://prosperpals-app-git-ppdev1-vadims-projects-5e8f49e5.vercel.app |
| NEXT_PUBLIC_SUPABASE_URL | missing | missing:PROSPERPALS_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_URL | <missing> |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | missing | missing:PROSPERPALS_SUPABASE_ANON_KEY|NEXT_PUBLIC_SUPABASE_ANON_KEY | <missing> |
| PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY | missing | missing:PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY | <missing> |
| PROSPERPALS_ENV | missing | literal | preview |
| PROSPERPALS_FEATURE_FLAGS_JSON | missing | literal | {"mobilepayBeta":false,"psd2Beta":false,"familyPreview":true,"simulatorStarter":true,"receiptCapture":true} |
| PROSPERPALS_AUDIT_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_LEDGER_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_ANALYTICS_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_ONBOARDING_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_RECEIPT_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_AUDIT_TABLE | missing | literal | demo_operator_audit_events |
| PROSPERPALS_LEDGER_TABLE | missing | literal | demo_ledger_records |
| PROSPERPALS_ANALYTICS_TABLE | missing | literal | demo_analytics_events |
| PROSPERPALS_ONBOARDING_TABLE | missing | literal | demo_onboarding_states |
| PROSPERPALS_RECEIPT_TABLE | missing | literal | demo_receipt_records |
| PROSPERPALS_RECEIPT_ARTIFACT_TABLE | missing | literal | demo_receipt_artifacts |
| PROSPERPALS_HOSTED_SMOKE_REPORT_PATH | missing | literal | docs/alpha-readiness/evidence/hosted-hardening/generated/preview-hosted-proof-2026-03-27.md |

Missing remote keys: 18
```

### production

- Exit code: 1

```text
# ProsperPals Vercel env contract (check)
- Project: prosperpals-app (prj_WdX96FObPfLM4v22E1eVc8xMuGXT)
- Org: team_dIjuxdFy3vjFiOlRFzNxdqF1
- Target: production

| Key | Remote | Source | Value |
| --- | --- | --- | --- |
| NEXT_PUBLIC_APP_URL | missing | source:linked-vercel:production | https://prosperpals-app.vercel.app |
| NEXT_PUBLIC_SUPABASE_URL | missing | missing:PROSPERPALS_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_URL | <missing> |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | missing | missing:PROSPERPALS_SUPABASE_ANON_KEY|NEXT_PUBLIC_SUPABASE_ANON_KEY | <missing> |
| PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY | missing | missing:PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY | <missing> |
| PROSPERPALS_ENV | missing | literal | alpha |
| PROSPERPALS_FEATURE_FLAGS_JSON | missing | literal | {"mobilepayBeta":false,"psd2Beta":false,"familyPreview":true,"simulatorStarter":true,"receiptCapture":true} |
| PROSPERPALS_AUDIT_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_LEDGER_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_ANALYTICS_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_ONBOARDING_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_RECEIPT_DURABILITY_MODE | missing | literal | hosted-only |
| PROSPERPALS_AUDIT_TABLE | missing | literal | demo_operator_audit_events |
| PROSPERPALS_LEDGER_TABLE | missing | literal | demo_ledger_records |
| PROSPERPALS_ANALYTICS_TABLE | missing | literal | demo_analytics_events |
| PROSPERPALS_ONBOARDING_TABLE | missing | literal | demo_onboarding_states |
| PROSPERPALS_RECEIPT_TABLE | missing | literal | demo_receipt_records |
| PROSPERPALS_RECEIPT_ARTIFACT_TABLE | missing | literal | demo_receipt_artifacts |
| PROSPERPALS_HOSTED_SMOKE_REPORT_PATH | missing | literal | docs/alpha-readiness/evidence/hosted-hardening/generated/alpha-hosted-proof-2026-03-27.md |

Missing remote keys: 18
```

## Verdict

Hosted-alpha remains NO-GO. The current repo can describe and check the contract, but the linked Vercel targets are still missing required wiring.
