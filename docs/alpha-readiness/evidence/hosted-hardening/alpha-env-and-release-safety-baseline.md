# Alpha Environment and Release Safety Baseline

**Date:** 2026-03-22 09:15 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD catch-up worker

## What was verified

This note checks whether ProsperPals has the minimum environment/release baseline for a disciplined small hosted alpha.

Code and artifact review covered:
- `src/lib/feature-flags/config.ts`
- `src/lib/operations/release-safety.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`
- `README.md`

## What passes today

### 1. Feature-flag defaults are explicit in code
`src/lib/feature-flags/config.ts` defines defaults for:
- `manualEntry`
- `receiptCapture`
- `simulatorStarter`
- `familyPreview`
- `mobilepayBeta`
- `psd2Beta`
- `supportTraceView`

This is good alpha hygiene because the Denmark-first slice is not relying on implied defaults.

### 2. Safety evaluation logic exists
`src/lib/operations/release-safety.ts` verifies:
- manual capture remains enabled,
- receipt capture flag remains enabled,
- simulator starter flow remains enabled,
- stale-quote blocking still exists,
- notification payloads respect privacy constraints,
- SQL migration presence is detectable.

### 3. Release-safety logic is exercised in tests
`test/sprint-3-explainability-operator-safety.test.mjs` verifies that the support console can surface release-safety checks and that notification privacy constraints remain enforced.

## What does NOT pass yet

### 1. Preview versus real alpha-hosted environment separation is not yet proven
There is no repo-native evidence note or deploy config proving a dedicated alpha-hosted environment distinct from preview/demo use.

### 2. Required secrets/config are not documented as an operator-ready checklist
The code reads env inputs such as `PROSPERPALS_FEATURE_FLAGS_JSON` and demo sink overrides, but the repo does not yet contain a founder/operator-ready env checklist for alpha.

### 3. Release safety exists as code, but not yet as a deploy gate
The release-safety summary is callable and test-covered, but there is no proof yet that deploys must pass it before alpha rollout.

### 4. Rollback / kill-switch procedure is still implicit
Feature flags suggest a possible kill-switch pattern, but there is no explicit runbook proving who can flip what, when, and how rollback is communicated.

## Verdict by checklist line

### B2. Alpha environment integrity
- Preview and alpha-hosted environments are clearly separated -> **open blocker**
- Required secrets/config are documented -> **open blocker**
- Feature flags/defaults are explicit -> **complete**
- Release-safety checks exist for the alpha path -> **manual fallback**
- Rollback / kill-switch procedure exists -> **open blocker**

## Why this is not yet safe for CONDITIONAL GO

ProsperPals has the beginnings of a release-safety spine, but not yet the operational proof that a small external cohort can be protected from config drift, deploy mistakes, or unclear rollback ownership.

## Exact next hardening move this proof points to

1. Add a real alpha env/config checklist.
2. Document who owns feature-flag and rollback actions.
3. Prove preview and alpha-hosted separation explicitly.
4. Promote release-safety from tested helper logic into a real deployment gate.
