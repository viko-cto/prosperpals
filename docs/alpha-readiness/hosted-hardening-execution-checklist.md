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
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/durable-truth-and-local-runtime-gap-proof.md`
- [ ] Reward ledger is hosted and durable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-ledger-postgrest-durability-path.md`
- [ ] Simulator trades are hosted and durable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-ledger-postgrest-durability-path.md`
- [ ] Receipt candidates survive redeploys  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/durable-truth-and-local-runtime-gap-proof.md`
- [ ] Support and audit traces survive redeploys  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/hosted-audit-postgrest-durability-path.md`
- [ ] No critical path depends on local runtime file sinks  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/durable-truth-and-local-runtime-gap-proof.md`

## B2. Alpha environment integrity
- [ ] Preview and alpha-hosted environments are clearly separated  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/alpha-env-and-release-safety-baseline.md`
- [ ] Required secrets/config are documented  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/alpha-env-and-release-safety-baseline.md`
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
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/durable-truth-and-local-runtime-gap-proof.md`
- [ ] Return behavior is trackable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/durable-truth-and-local-runtime-gap-proof.md`
- [ ] Trust-critical failures are visible  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`
- [ ] Receipt errors and support issues are triaged quickly  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/support-help-path.md`
- [ ] Founder-visible cohort-health reporting exists  
  - status: open blocker
  - proof note: `docs/alpha-readiness/redecision-dashboard-inputs.md`

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
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`
- [ ] Feature-flag / safety-toggle changes are auditable  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`
- [ ] Least-privilege support path exists  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/role-access-definition.md`
- [ ] Manual help / export / deletion path exists  
  - status: manual fallback
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/export-deletion-fallback.md`
- [x] Incident pause criteria exist  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/operator-readiness/incident-pause-and-escalation.md`

## Current blockers
1. Trust-critical user state still depends on cookie/local-runtime sinks instead of authoritative hosted durability.
2. Operator support-view access, the narrow receipt-capture pause/clear intervention, release overrides for receipt capture plus simulator starter, and the reward/trade ledger loop now have hosted-capable PostgREST durability paths in the repo, but preview/alpha environment rollout proof is still missing.
3. Support-only/admin-only roles and broader cross-account intervention controls are still absent.
4. Interview evidence and founder-visible cohort-health rollups are still largely unpopulated.

## Decision posture
- Current recommendation if review were held today: NO-GO
- Why the NO-GO remains locked: the receipt lane is materially stronger and both the operator-audit lane plus reward/trade ledger loop now have hosted-capable durability paths, but deployed rollout proof, broader state durability, and real support/admin boundaries are still missing.
- What exact artifacts would change that answer next: hosted env smoke proof for the audit + ledger paths, broader durability proof beyond local sinks, support/admin role boundaries, and populated interview/redecision evidence.
