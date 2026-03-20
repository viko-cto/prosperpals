# Execution Kickoff - ProsperPals P0

**Phase:** execution-kickoff  
**Step:** 1-p0-build-sequence  
**Date:** 2026-03-20 UTC  
**Owner:** Nikolas / CopenDapp Labs  
**Status:** Ready for engineering kickoff

## Purpose

BMAD planning is complete. This document converts that planning set into the first execution-ready build sequence for the ProsperPals P0 MVP.

This is not a rewrite of the PRD. It is the bridge between planning and shipping.

## Executive Call

**ProsperPals should now move into P0 implementation.**

The right first slice is not “build everything in P0.” It is the smallest trustworthy loop that proves the product thesis:

1. user enters ProsperPals through a controlled landing/onboarding path
2. user logs one real money event
3. Goldie returns one useful spending insight
4. ProsperCoins reward the awareness action
5. Goldie hands off clearly to Fin
6. user completes one virtual trade in the simulator
7. user can return to a next-day learning state

If that slice works, the product has a heartbeat. If it does not, polishing more screens is mostly theater.

## Elicitation Methods Applied

### 1. First Principles
Used to reduce the kickoff to the minimum loop required to prove user value, trust, and retention potential.

### 2. Cross-Functional War Room
Used to sequence work so product, design, engineering, data, and compliance can move in parallel without inventing policy mid-build.

### 3. Critique & Refine
Used to remove fake urgency and overbuild risk from the first sprint plan.

## Build Objective for the First Execution Slice

**Target outcome:** a Denmark-first mobile-first PWA prototype where one authenticated user can complete:
- onboarding / intent capture
- one canonical `MoneyEvent`
- one Daily Spending Power update
- one ProsperCoin award
- one explicit Goldie -> Fin handoff
- one virtual trade with freshness labels
- one explainable next-state summary

## What Must Exist Before Sprint 1 Is Called Done

### Product truth
- Denmark-first positioning preserved
- education-not-advice policy preserved
- Goldie and Fin remain distinct in role and language
- Full/Lite/Off remain presentation intensity controls, not separate product forks

### Trust truth
- canonical `MoneyEvent` contract in place
- ProsperCoin and simulator ledgers append-only and traceable
- quote freshness visible in simulator
- provenance / explanation path available for user-facing numbers
- no silent duplication on retries or offline replay

### UX truth
- landing route stays user-controlled
- first-value path feels calm, premium, and non-judgmental
- handoff between Goldie and Fin is visible and understandable
- mobile-first primary flows remain one-handed and short

## Recommended Sprint Sequence

## Sprint 0: Foundation and trust-critical scaffolding

### Goal
Stand up the app shell and the trust-critical data spine before feature glitter appears.

### Deliverables
- Next.js app shell with authenticated/unauthed routing
- Supabase project structure and initial schema migrations
- canonical `MoneyEvent` schema
- ProsperCoin ledger schema
- simulator execution ledger schema
- basic consent / audit event scaffolding
- feature flag and environment configuration baseline
- initial telemetry and trace ID propagation

### Exit criteria
- local + preview environments run reliably
- schema migrations are reproducible
- one test write to each trust-critical canonical table succeeds idempotently
- core observability hooks exist before UI orchestration grows

## Sprint 1: First-value onboarding and Goldie loop

### Goal
Get a user to first meaningful value in under the 80-second target.

### Deliverables
- landing page with three entry paths
- auth handoff preserving selected path
- onboarding flow for budget-first and invest-first entry
- mode preference persistence (Full/Lite/Off)
- manual money logging flow
- Goldie response surface with first practical insight
- Daily Spending Power initial computation and home card
- analytics for first-value completion timing

### Exit criteria
- a new user can authenticate, log one money event, and see one useful insight
- no mandatory bank linking exists in the first-value flow
- core loop events are emitted and inspectable

## Sprint 2: Reward loop and Fin simulator starter slice

### Goal
Prove the ProsperCoins -> learn-to-invest transition without ambiguity.

### Deliverables
- ProsperCoin award engine for approved awareness actions
- visible reason-for-reward UI
- Goldie -> Fin explicit handoff state
- curated launch asset list
- quote freshness labels
- one virtual trade flow backed by immutable ledgers
- first portfolio summary view

### Exit criteria
- one user can complete log -> earn -> handoff -> virtual trade in one coherent session
- stale or unsafe quote states are handled honestly
- duplicate trade or debit retries do not create trust failures

## Sprint 3: Explainability, receipt intake, and operator safety

### Goal
Harden trust and reduce fragile manual-only behavior.

### Deliverables
- receipt OCR upload + review sheet
- provenance states surfaced in UI
- “Why am I seeing this?” explanation detail
- support timeline view for canonical events / rewards / trades
- rollout smoke tests and migration safety checks
- privacy-safe notification contract tests

### Exit criteria
- ambiguous OCR states are reviewable, not magical
- support can inspect a broken user journey without raw-database archaeology
- release pipeline blocks unsafe promotions

## Parallel Validation Track (Do Not Wait for Engineering)

These are non-blocking for implementation start, but they should run in parallel immediately:
- 5-8 interviews per budget-first archetype
- 5-8 interviews per invest-first archetype
- Goldie -> Fin usability tests
- Denmark receipt corpus collection for OCR tuning
- legal review scheduling for advice-boundary and family-sharing posture

## Ownership Split

### Nikolas / Design
- onboarding polish
- Goldie / Fin visual identity and handoff clarity
- home card hierarchy
- simulator first-pick UI
- share-safe trust states and empty states

### Product / Founder
- interview scripts and validation synthesis
- pricing / premium hypotheses
- family monetization assumptions
- approval of launch asset universe

### Engineering
- canonical schemas and ledgers
- auth/app shell
- Daily Spending Power engine
- simulator execution flow
- explanation/fact bundle wiring
- observability / CI-CD guardrails

### Compliance / Review
- non-advice copy review
- consent / sharing boundary review
- notification privacy review

## First Engineering Epic Order

Build in this order:
1. **P0.6 trust scaffolding subset** — canonical records, ledgers, audit/trace plumbing
2. **P0.1 onboarding subset** — landing, auth, path preservation, preferences
3. **P0.2 manual logging subset** — first `MoneyEvent` and Daily Spending Power
4. **P0.3 reward subset** — ProsperCoin award + anti-duplication
5. **P0.4 simulator subset** — asset list, freshness, one trade, one summary
6. **P0.6 explainability subset** — why-am-I-seeing-this and support timeline
7. **P0.2 receipt subset** — OCR/review hardening

That order looks slightly boring. Good. Finance products should earn the right to be interesting.

## Definition of “Execution Started”

ProsperPals should only be considered truly in execution once all of the following are true:
- repo contains the first implementation branch or merged scaffold for the app shell
- canonical finance and ledger schemas exist in code
- one happy-path onboarding -> log -> insight flow works in preview
- progress tracking no longer points at BMAD readiness, but at build slices / implementation milestones

## Main Risks at Kickoff

### Risk 1: UI-first drift
The team could over-focus on premium polish before the trust-critical spine works.

**Mitigation:** no UI milestone counts as “done” if it does not bind to canonical records and real event flows.

### Risk 2: Companion confusion
Goldie and Fin could feel gimmicky if handoff and role boundaries are fuzzy.

**Mitigation:** prototype handoff early and test it before deep conversational surface work.

### Risk 3: Ledger shortcuts
Fast prototype pressure could tempt direct balance mutation instead of append-only ledgers.

**Mitigation:** treat ledger integrity as a non-negotiable architectural invariant from Sprint 0.

### Risk 4: OCR magic-thinking
Receipt scanning could be presented as smarter than it is.

**Mitigation:** always surface confidence and review states; never fake certainty.

## Recommended Immediate Next Action

**Start Sprint 0 implementation around app shell + canonical schema + trust-critical ledgers.**

That is the right first chunk because it unlocks every downstream user-facing loop without forcing rework later.

## Execution Conclusion

ProsperPals no longer needs more planning theater.
It needs a clean first implementation slice.

**Status:** BMAD complete, execution kickoff defined, P0 build sequencing ready.
**Next:** implementation / Sprint 0 foundation and trust scaffolding.
