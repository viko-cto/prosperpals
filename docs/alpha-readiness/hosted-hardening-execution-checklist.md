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
  - status:
  - proof note:
- [ ] Required secrets/config are documented  
  - status:
  - proof note:
- [ ] Feature flags/defaults are explicit  
  - status:
  - proof note:
- [ ] Release-safety checks exist for the alpha path  
  - status:
  - proof note:
- [ ] Rollback / kill-switch procedure exists  
  - status:
  - proof note:

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
  - status:
  - proof note:
- [ ] Stored asset metadata links to parse candidate  
  - status:
  - proof note:
- [ ] OCR/provider origin is recorded  
  - status:
  - proof note:
- [ ] Low-confidence parses are visibly flagged  
  - status:
  - proof note:
- [ ] User correction is required before truth changes  
  - status:
  - proof note:
- [ ] Reprocessing the same receipt does not create duplicate truth  
  - status:
  - proof note:
- [ ] OCR failure degrades honestly and safely  
  - status:
  - proof note:
- [ ] Ambiguous candidates never auto-post to canonical truth  
  - status:
  - proof note:

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
1.
2.
3.

## Decision posture
- Current recommendation if review were held today:
- Why the NO-GO remains locked:
- What exact artifacts would change that answer next:
