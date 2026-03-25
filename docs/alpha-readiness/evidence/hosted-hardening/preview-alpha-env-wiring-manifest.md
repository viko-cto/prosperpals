# Preview + Alpha Environment Wiring Manifest

**Date:** 2026-03-25 09:15 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD work block 2

## Why this exists

The repo now has hosted-capable durability paths for the trust-critical ProsperPals alpha lanes, but the linked Vercel project audit proved there is still **no live environment wiring** in the deployment surface.

That makes the blocker precise:

> the next honest step is not “run another proof someday.”  
> the next honest step is to wire preview/alpha env vars explicitly, then run hosted-only proof against the right target.

This manifest turns that blocker into an operator-ready setup document.

## Canonical blocker source

See:
- `docs/alpha-readiness/evidence/hosted-hardening/preview-env-audit-2026-03-25.md`

That note proves the linked Vercel project currently has **zero configured environment variables**.

## Separation rule

ProsperPals must treat these as separate deployment targets:
- **preview** = internal proof surface for hosted durability and release checks
- **alpha** = the small Denmark-first founder-operated cohort surface

If alpha still runs on the same Vercel project as preview, the env values must still be documented and promoted deliberately rather than inherited by accident.

## Minimum environment contract

### Public app context
| Variable | Required in preview | Required in alpha | Example / rule |
|---|---:|---:|---|
| `NEXT_PUBLIC_APP_URL` | yes | yes | Exact deployed URL for the target environment |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | yes | Public anon key |
| `PROSPERPALS_ENV` | yes | yes | `preview` or `alpha` |
| `PROSPERPALS_FEATURE_FLAGS_JSON` | yes | yes | Explicit JSON, never implicit defaults |

### Trust-critical hosted durability modes
| Variable | Preview value | Alpha value | Why it matters |
|---|---|---|---|
| `PROSPERPALS_AUDIT_DURABILITY_MODE` | `hosted-only` | `hosted-only` | Fails closed if operator audit durability is not truly hosted |
| `PROSPERPALS_LEDGER_DURABILITY_MODE` | `hosted-only` | `hosted-only` | Prevents fake durability for rewards and simulator trades |
| `PROSPERPALS_ANALYTICS_DURABILITY_MODE` | `hosted-only` | `hosted-only` | Prevents local-only cohort-learning claims |
| `PROSPERPALS_ONBOARDING_DURABILITY_MODE` | `hosted-only` | `hosted-only` | Prevents cookie/local-only first-value continuity claims |
| `PROSPERPALS_RECEIPT_DURABILITY_MODE` | `hosted-only` | `hosted-only` | Prevents receipt review/artifact durability from silently falling back |

### Hosted table names
| Variable | Preview value | Alpha value |
|---|---|---|
| `PROSPERPALS_AUDIT_TABLE` | `demo_operator_audit_events` | `demo_operator_audit_events` |
| `PROSPERPALS_LEDGER_TABLE` | `demo_ledger_records` | `demo_ledger_records` |
| `PROSPERPALS_ANALYTICS_TABLE` | `demo_analytics_events` | `demo_analytics_events` |
| `PROSPERPALS_ONBOARDING_TABLE` | `demo_onboarding_states` | `demo_onboarding_states` |
| `PROSPERPALS_RECEIPT_TABLE` | `demo_receipt_records` | `demo_receipt_records` |
| `PROSPERPALS_RECEIPT_ARTIFACT_TABLE` | `demo_receipt_artifacts` | `demo_receipt_artifacts` |

### Server-only secret
| Variable | Required in preview | Required in alpha | Why it matters |
|---|---:|---:|---|
| `PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY` | yes | yes | Required for hosted smoke proof and server-side durability adapters |

### Optional proof output
| Variable | Preview recommendation | Alpha recommendation | Why |
|---|---|---|---|
| `PROSPERPALS_HOSTED_SMOKE_REPORT_PATH` | `docs/alpha-readiness/evidence/hosted-hardening/generated/preview-hosted-proof-YYYY-MM-DD.md` | `docs/alpha-readiness/evidence/hosted-hardening/generated/alpha-hosted-proof-YYYY-MM-DD.md` | Keeps proof notes deterministic and auditable |

## Recommended feature-flag baseline

### Preview
Use preview to keep proof broad enough for auditability without pretending the product is open:

```json
{"mobilepayBeta":false,"psd2Beta":false,"familyPreview":true,"simulatorStarter":true,"receiptCapture":true}
```

### Alpha
Use alpha with the same trust-critical defaults unless a reviewed release decision says otherwise:

```json
{"mobilepayBeta":false,"psd2Beta":false,"familyPreview":true,"simulatorStarter":true,"receiptCapture":true}
```

If alpha changes from preview, the difference must be written in a dated proof note before rollout.

## Wiring procedure

### 1. Confirm the linked Vercel target
```bash
cd /tmp/prosperpals
cat .vercel/project.json
```

### 2. Add preview vars explicitly
Example pattern:

```bash
VERCEL_TOKEN=$(cat /home/node/.config/vercel/token)

printf "%s" "https://<project>.vercel.app" | npx vercel env add NEXT_PUBLIC_APP_URL preview --token "$VERCEL_TOKEN"
printf "%s" "https://<project>.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL preview --token "$VERCEL_TOKEN"
printf "%s" "<anon-key>" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview --token "$VERCEL_TOKEN"
printf "%s" "preview" | npx vercel env add PROSPERPALS_ENV preview --token "$VERCEL_TOKEN"
printf "%s" '{"mobilepayBeta":false,"psd2Beta":false,"familyPreview":true,"simulatorStarter":true,"receiptCapture":true}' | npx vercel env add PROSPERPALS_FEATURE_FLAGS_JSON preview --token "$VERCEL_TOKEN"
printf "%s" "hosted-only" | npx vercel env add PROSPERPALS_AUDIT_DURABILITY_MODE preview --token "$VERCEL_TOKEN"
printf "%s" "hosted-only" | npx vercel env add PROSPERPALS_LEDGER_DURABILITY_MODE preview --token "$VERCEL_TOKEN"
printf "%s" "hosted-only" | npx vercel env add PROSPERPALS_ANALYTICS_DURABILITY_MODE preview --token "$VERCEL_TOKEN"
printf "%s" "hosted-only" | npx vercel env add PROSPERPALS_ONBOARDING_DURABILITY_MODE preview --token "$VERCEL_TOKEN"
printf "%s" "hosted-only" | npx vercel env add PROSPERPALS_RECEIPT_DURABILITY_MODE preview --token "$VERCEL_TOKEN"
printf "%s" "demo_operator_audit_events" | npx vercel env add PROSPERPALS_AUDIT_TABLE preview --token "$VERCEL_TOKEN"
printf "%s" "demo_ledger_records" | npx vercel env add PROSPERPALS_LEDGER_TABLE preview --token "$VERCEL_TOKEN"
printf "%s" "demo_analytics_events" | npx vercel env add PROSPERPALS_ANALYTICS_TABLE preview --token "$VERCEL_TOKEN"
printf "%s" "demo_onboarding_states" | npx vercel env add PROSPERPALS_ONBOARDING_TABLE preview --token "$VERCEL_TOKEN"
printf "%s" "demo_receipt_records" | npx vercel env add PROSPERPALS_RECEIPT_TABLE preview --token "$VERCEL_TOKEN"
printf "%s" "demo_receipt_artifacts" | npx vercel env add PROSPERPALS_RECEIPT_ARTIFACT_TABLE preview --token "$VERCEL_TOKEN"
printf "%s" "<service-role-key>" | npx vercel env add PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY preview --token "$VERCEL_TOKEN"
printf "%s" "docs/alpha-readiness/evidence/hosted-hardening/generated/preview-hosted-proof-$(date -u +%F).md" | npx vercel env add PROSPERPALS_HOSTED_SMOKE_REPORT_PATH preview --token "$VERCEL_TOKEN"
```

### 3. Repeat for alpha explicitly
Use the same pattern but replace `preview` with `production` **only if** the Vercel production environment is the intended alpha target.

If alpha is hosted elsewhere, write a dedicated proof note and do not pretend Vercel production automatically equals alpha.

### 4. Verify what is present before running smoke
```bash
VERCEL_TOKEN=$(cat /home/node/.config/vercel/token)
npx vercel env ls --token "$VERCEL_TOKEN"
```

### 5. Run hosted-only proof only after verification
Run the hosted durability smoke only after the env listing clearly shows the required variables.

## What counts as complete for this chunk

This env-wiring blocker is only considered closed when:
1. preview env vars are visibly present,
2. alpha env vars are visibly present or explicitly documented as intentionally shared,
3. hosted-only durability modes are set for **audit + ledger + analytics + onboarding + receipts**,
4. the service role key is present for the target environment,
5. a real hosted smoke proof note exists under `generated/`,
6. the checklist can move from `open blocker` / `manual fallback` to `complete` only for the lanes actually proven.

## What this does not solve

This manifest does **not** close:
- interview evidence gaps,
- support-only/admin-only role maturity,
- broader cross-account interventions,
- or the overall alpha GO/NO-GO decision.

It only makes the deployment-side blocker explicit and executable.

## Decision posture

**NO-GO remains locked** until env wiring is real, proof is attached, and the human evidence pack catches up.
