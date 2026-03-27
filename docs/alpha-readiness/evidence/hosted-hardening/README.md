# Hosted Hardening Evidence Folder

Store proof notes and check artifacts for the hosted trust-hardening lane here.

## Expected evidence types
- durable truth / redeploy survival proof
- environment/config checklist notes
- feature-flag and release-safety notes
- observability / cohort-health notes
- manual fallback notes where full implementation is not yet present

## Example filenames
- `durable-truth-redeploy-proof.md`
- `alpha-env-config-checklist.md`
- `feature-flag-defaults-proof.md`
- `release-safety-and-rollback-proof.md`
- `cohort-health-reporting-proof.md`
- `hosted-receipt-postgrest-durability-path.md`
- `generated/vercel-env-contract-audit-YYYY-MM-DD.md`

## Repeatable env-contract audit

Use `npm run smoke:hosted-env-contract-audit` to capture a dated markdown snapshot of the linked Vercel preview + production env-contract state under `generated/`.

This is intentionally different from `npm run vercel:env-contract`:
- `vercel:env-contract` checks or syncs one target at a time,
- `smoke:hosted-env-contract-audit` saves the current blocker state as durable evidence for the checklist and re-decision packet.

Every note should answer:
1. what was tested or verified,
2. what passed,
3. what remains manual,
4. and why the current state is or is not safe for CONDITIONAL GO.
