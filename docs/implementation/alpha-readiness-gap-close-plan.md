# ProsperPals — Alpha Readiness Gap-Close Plan

**Date:** 2026-03-21  
**Phase:** alpha-readiness  
**Step:** 1-gap-close-plan  
**Status:** complete

## Why this exists

ProsperPals has finished the current BMAD implementation lane through Sprint 3. The prototype now proves the core experience contract:

- protected shell + trust-aware routing,
- budget-first onboarding and first insight,
- ProsperCoin reward loop,
- Fin starter simulator,
- explainability,
- receipt candidate review,
- operator/support traces,
- release-safety checks.

That is enough to stop pretending this is still a vague concept. It is **not** enough to call the product alpha-ready.

This artifact closes the handoff gap between **implementation-complete demo** and **credible alpha launch preparation**.

## What the current build already proves

1. **Value can appear fast**  
   A user can move from onboarding intent to a concrete money insight and visible Daily Spending Power.

2. **Rewards can reinforce awareness without hiding the logic**  
   ProsperCoins are explained, ledgered, and linked to visible actions.

3. **Fin has an honest starter role**  
   The simulator is not fake-investing theater; it uses visible quote freshness and immutable demo trade records.

4. **Trust is being built before scale**  
   Receipt review, explainability, operator traces, and privacy-safe notifications exist early.

## What still blocks alpha credibility

### 1. Demo-state persistence is still local-runtime oriented
The product proves flows, but core state still relies on demo sinks and local runtime files for parts of the experience.

**Alpha implication:** a hosted multi-user alpha cannot depend on per-instance demo files for critical paths.

### 2. Auth and role boundaries are still prototype-grade
The shell is protected, but support/operator access and role segmentation are still intentionally lightweight.

**Alpha implication:** internal tooling must not share the same soft trust assumptions as the demo shell.

### 3. Receipt ingestion stops before real upload/OCR operations
Candidate-first review is the correct trust model, but provider integration and durable artifact storage are not yet live.

**Alpha implication:** the most trust-sensitive input path remains partially simulated.

### 4. Analytics prove events exist, not that learning loops work
Current instrumentation is enough for development validation, but not enough to judge cohort behavior, aha moments, or feature retention in a real alpha.

**Alpha implication:** we can measure app activity, but not yet the product-learning questions that matter.

### 5. Launch readiness depends on human validation outside the codebase
The BMAD documents already require pre-MVP interviews. The app is ahead of that evidence gate.

**Alpha implication:** shipping more code without validating the two archetypes would be fake progress.

## Elicitation methods applied

### 1. First Principles
Used to separate “the prototype works” from “the product is ready to be trusted by real people.” Finance alpha readiness depends on durable truth, visible provenance, and controlled operations—not prettier demos.

### 2. Cross-Functional War Room
Used to reconcile product, design, engineering, ops, and compliance needs into a single next-slice plan instead of five disconnected wishlists.

### 3. Critique & Refine
Used to cut vanity next steps. This plan avoids decorative backlog items and focuses on the handful of moves that would materially change launch readiness.

## Recommended next execution sequence

### Track A — Validation before feature sprawl
**Goal:** confirm the build solves a real problem for the two archetypes before layering more complexity.

1. Run **5-8 interviews per archetype** using the existing prototype and scripted walkthroughs.
2. Validate whether users understand:
   - Goldie vs Fin roles,
   - why ProsperCoins exist,
   - whether Daily Spending Power feels useful,
   - whether the simulator feels educational rather than gimmicky,
   - whether receipt review feels trustworthy.
3. Turn findings into one ranked evidence memo with:
   - keep,
   - change,
   - cut,
   - unresolved questions.

**Exit signal:** the team can name which parts of the current prototype users immediately value, which parts confuse them, and which parts are pure founder projection.

### Track B — Alpha infrastructure hardening
**Goal:** replace remaining demo-grade trust assumptions with hosted alpha-safe rails.

1. Wire real Supabase-backed persistence for onboarding, rewards, trades, receipt candidates, and support traces where still demo-backed.
2. Add proper operator/admin authorization boundaries.
3. Move release-safety checks into CI-enforced gates where practical.
4. Add hosted environment configuration for Vercel + Supabase preview/prod parity.
5. Add seeded-but-recoverable alpha fixtures so demos do not depend on ad-hoc local runtime state.

**Exit signal:** the product can survive redeploys, multiple users, and basic support/debugging without relying on local file sinks.

### Track C — Real receipt and ingestion trust slice
**Goal:** make the most trust-sensitive input path real enough for alpha.

1. Add file upload flow for receipts.
2. Persist uploaded artifact metadata and candidate parse lineage.
3. Integrate one OCR/parser provider behind an adapter boundary.
4. Keep the existing candidate-first review rule intact.
5. Extend tests to prove ambiguous parses never auto-post to canonical money truth.

**Exit signal:** receipt capture is no longer a simulation, and trust posture improves rather than degrades.

## Recommended next BMAD slice

If ProsperPals continues immediately, the next step should be:

**`alpha-readiness / 2-user-validation-and-alpha-hardening-brief`**

That slice should produce a single durable artifact combining:
- interview plan,
- alpha success rubric,
- hosted hardening checklist,
- evidence-based go/no-go criteria for a small Denmark-first alpha.

## Explicit non-priorities right now

Do **not** spend the next slice on:
- more gamification cosmetics,
- social/viral loops,
- PSD2/open-banking expansion,
- portfolio complexity,
- fancy dashboards for internal vanity metrics.

Those can wait. Right now the job is proving the current wedge is real and trustworthy.

## Deliverables created or updated
- `docs/implementation/alpha-readiness-gap-close-plan.md`
- `README.md`

## Outcome

ProsperPals now has a durable bridge from completed prototype implementation to the next decision-worthy execution slice. The lane is no longer “finished and vague”; it is **implementation-complete with an explicit alpha-readiness next step**.
