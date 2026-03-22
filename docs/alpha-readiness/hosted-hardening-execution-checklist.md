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
  - status:
  - proof note:
- [ ] Reward ledger is hosted and durable  
  - status:
  - proof note:
- [ ] Simulator trades are hosted and durable  
  - status:
  - proof note:
- [ ] Receipt candidates survive redeploys  
  - status:
  - proof note:
- [ ] Support and audit traces survive redeploys  
  - status:
  - proof note:
- [ ] No critical path depends on local runtime file sinks  
  - status:
  - proof note:

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
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/hosted-hardening/alpha-env-and-release-safety-baseline.md`

## B3. Observability for learning
- [ ] First aha is trackable  
  - status:
  - proof note:
- [ ] Return behavior is trackable  
  - status:
  - proof note:
- [ ] Trust-critical failures are visible  
  - status:
  - proof note:
- [ ] Receipt errors and support issues are triaged quickly  
  - status:
  - proof note:
- [ ] Founder-visible cohort-health reporting exists  
  - status:
  - proof note:

## C. Receipt realism
- [ ] Real upload path exists  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-failure-path.md`
- [ ] Stored asset metadata links to parse candidate  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-failure-path.md`
- [ ] OCR/provider origin is recorded  
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-failure-path.md`
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
  - status: open blocker
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-failure-path.md`
- [x] Ambiguous candidates never auto-post to canonical truth  
  - status: complete
  - proof note: `docs/alpha-readiness/evidence/receipts/receipt-lineage-ambiguous-path.md`

## D. Operator/access readiness
- [ ] User / founder-operator / support-only / admin-only visibility is defined  
  - status:
  - proof note:
- [ ] Support views of sensitive artifacts are auditable  
  - status:
  - proof note:
- [ ] Corrections / overrides are auditable  
  - status:
  - proof note:
- [ ] Account-access interventions are auditable  
  - status:
  - proof note:
- [ ] Feature-flag / safety-toggle changes are auditable  
  - status:
  - proof note:
- [ ] Least-privilege support path exists  
  - status:
  - proof note:
- [ ] Manual help / export / deletion path exists  
  - status:
  - proof note:
- [ ] Incident pause criteria exist  
  - status:
  - proof note:

## Current blockers
1. The receipt path is still a typed demo parse; there is no real file upload/storage/provider chain yet (`receipt-lineage-failure-path.md`).
2. `artifactId` lineage exists inside demo records, but it is not yet linked to stored asset metadata or provider output (`receipt-lineage-failure-path.md`).

## Decision posture
- Current recommendation if review were held today: NO-GO
- Why the NO-GO remains locked: receipt realism is still demo-only even though duplicate confirmation is now suppressed; real upload/provider evidence and hosted durability are still absent.
- What exact artifacts would change that answer next: a real upload/provider happy/ambiguous/failure evidence set plus hosted durability proof beyond local runtime file sinks.
