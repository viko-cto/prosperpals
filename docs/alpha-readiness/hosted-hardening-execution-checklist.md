# ProsperPals Hosted Hardening Execution Checklist

Use this checklist as the live closure surface for the current alpha-readiness step.

**Allowed status values:**
- complete
- manual fallback
- open blocker

For every line marked complete or manual fallback, link the proof note under `docs/alpha-readiness/evidence/`.

---

## B1. Durable hosted truth
- [ ] Onboarding state persists per user  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/durable-truth-and-local-runtime-gap-proof.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-hosted-durability-smoke-runbook.md`
- [ ] Reward ledger is hosted and durable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-ledger-postgrest-durability-path.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-hosted-durability-smoke-runbook.md`
- [ ] Simulator trades are hosted and durable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-ledger-postgrest-durability-path.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-hosted-durability-smoke-runbook.md`
- [ ] Receipt candidates survive redeploys  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-receipt-postgrest-durability-path.md`, `docs/alpha-readiness/evidence/hosted-hardening/durable-truth-and-local-runtime-gap-proof.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-hosted-durability-smoke-runbook.md`
- [ ] Support and audit traces survive redeploys  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-audit-postgrest-durability-path.md`
- [ ] No critical path depends on local runtime file sinks  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/durable-truth-and-local-runtime-gap-proof.md`

## B2. Alpha environment integrity
- [ ] Preview and alpha-hosted environments are clearly separated  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/alpha-env-and-release-safety-baseline.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-alpha-env-wiring-manifest.md`
- [ ] Required secrets/config are documented  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/alpha-env-and-release-safety-baseline.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-alpha-env-wiring-manifest.md`
- [x] Feature flags/defaults are explicit  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/alpha-env-and-release-safety-baseline.md`
- [ ] Release-safety checks exist for the alpha path  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/alpha-env-and-release-safety-baseline.md`
- [ ] Rollback / kill-switch procedure exists  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/alpha-env-and-release-safety-baseline.md`

## B3. Observability for learning
- [ ] First aha is trackable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-analytics-postgrest-durability-path.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-hosted-durability-smoke-runbook.md`
- [ ] Return behavior is trackable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-analytics-postgrest-durability-path.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-hosted-durability-smoke-runbook.md`
- [ ] Trust-critical failures are visible  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`
- [ ] Receipt errors and support issues are triaged quickly  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/support-help-path.md`
- [ ] Founder-visible cohort-health reporting exists  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-analytics-postgrest-durability-path.md`, `docs/alpha-readiness/evidence/hosted-hardening/preview-hosted-durability-smoke-runbook.md`, `docs/alpha-readiness/redecision-dashboard-inputs.md`

## C. Receipt realism
- [x] Real upload path exists  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-happy-path.md`
- [x] Stored asset metadata links to parse candidate  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-happy-path.md`
- [x] OCR/provider origin is recorded  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-happy-path.md`
- [x] Low-confidence parses are visibly flagged  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-ambiguous-path.md`
- [x] User correction is required before truth changes  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-happy-path.md`
- [x] Reprocessing the same receipt does not create duplicate truth  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-idempotency-and-no-auto-post-proof.md`
- [ ] OCR failure degrades honestly and safely  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-provider-failure-recovery-proof.md`
- [x] Ambiguous candidates never auto-post to canonical truth  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-ambiguous-path.md`

## D. Operator/access readiness
- [ ] User / founder-operator / support-only / admin-only visibility is defined  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/role-access-definition.md`
- [ ] Support views of sensitive artifacts are auditable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`
- [ ] Corrections / overrides are auditable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`
- [ ] Account-access interventions are auditable  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`, `docs/alpha-readiness/evidence/operator-readiness/operator-admin-boundary-closure-plan.md`
- [ ] Feature-flag / safety-toggle changes are auditable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`
- [ ] Least-privilege support path exists  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/role-access-definition.md`, `docs/alpha-readiness/evidence/operator-readiness/operator-admin-boundary-closure-plan.md`
- [ ] Manual help / export / deletion path exists  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/export-deletion-fallback.md`
- [x] Incident pause criteria exist  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/incident-pause-and-escalation.md`

## Current blockers
1. Trust-critical alpha lanes now have hosted-capable durability paths in the repo, and the smoke harness can prove audit + ledger + analytics + onboarding + receipt persistence together, but preview/alpha rollout proof is still missing and local fallbacks remain available outside strict hosted-only wiring.
2. A direct 2026-03-25 hosted audit of the linked Vercel project found **no environment variables configured at all**, so the blocker is now concrete: hosted-proof work is stalled at missing env wiring, not just missing smoke output. The required preview/alpha variable set and exact wiring procedure are now documented in `docs/alpha-readiness/evidence/hosted-hardening/preview-alpha-env-wiring-manifest.md`, and the repo now includes `scripts/vercel-env-contract.mjs` / `npm run vercel:env-contract` to check or sync that contract repeatably instead of hand-applying each key. The helper now also auto-resolves preview/production app URLs from linked Vercel target metadata, which narrows the remaining manual source requirement to the real Supabase URL plus anon/service credentials unless an operator intentionally overrides the target URL.
3. Support-only/admin-only roles and broader cross-account intervention controls are still absent, though the exact acceptance bar is now pinned down in `docs/alpha-readiness/evidence/operator-readiness/operator-admin-boundary-closure-plan.md`.
4. Interview evidence and founder-visible cohort-health rollups are still largely unpopulated.

## Decision posture
- Current recommendation if review were held today: NO-GO
- Why the NO-GO remains locked: the receipt lane is now hosted-capable alongside the operator-audit lane, reward/trade ledger loop, founder-visible cohort analytics, and onboarding continuity, but deployed rollout proof, real support/admin boundaries, and populated interview evidence are still missing.
- What exact artifacts would change that answer next: a real preview/alpha hosted smoke proof note covering audit + ledger + analytics + onboarding + receipt lanes, support/admin role boundaries, and populated interview/redecision evidence.
