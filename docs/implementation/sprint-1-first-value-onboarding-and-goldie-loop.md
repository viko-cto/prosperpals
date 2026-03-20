# ProsperPals — Sprint 1 First-Value Onboarding and Goldie Loop

**Date:** 2026-03-20  
**Phase:** implementation  
**Step:** sprint-1-first-value-onboarding-and-goldie-loop  
**Status:** in progress (chunk 1 complete)

## What this chunk shipped

This Sprint 1 chunk stops ProsperPals from being only a trust scaffold and starts proving the first product heartbeat.

### 1. Entry-path preservation from landing -> auth -> protected app
- Landing CTAs now carry intent-specific `next` targets into sign-in.
- The onboarding flow preserves the selected intent across the public/authenticated boundary.
- The selected paths now map to the three real launch promises:
  - `budget-first`
  - `invest-first`
  - `family-preview`

### 2. Persistent onboarding + mode preference state
- Added a demo onboarding state cookie so the app remembers:
  - selected entry intent
  - Full/Lite/Off mode preference
  - onboarding start timestamp
  - first-value completion timestamp
  - first manual money event summary
  - first Goldie insight summary
  - Fin handoff starter asset preview
- This proves the product can persist presentation preferences without forking underlying logic.

### 3. First-value budget flow with one manual money event
- Added `/app/onboarding` as the first protected implementation route for Sprint 1.
- Added a budget-first form that captures one recent expense using a manual-entry path.
- The flow validates and normalizes that event using the canonical `MoneyEvent` contract created in Sprint 0.
- The event is converted into a visible demo first-value moment instead of disappearing into a blank shell.

### 4. Goldie starter insight + Daily Spending Power demo computation
- Added deterministic starter Daily Spending Power calculation for the pre-bank-linking phase.
- Added a calm, non-judgmental Goldie response layer that turns the first expense into a practical first insight.
- The resulting state is durable enough to render on the protected home screen as a meaningful first-value milestone.

### 5. Explicit Goldie -> Fin handoff preview for the invest-first route
- Added an invest-first onboarding branch that shows the handoff posture before simulator execution is built.
- Starter assets are shown with freshness labels and “why this is here” teaching context.
- This keeps the education-not-advice boundary visible early.

### 6. First-value instrumentation preview
- Added onboarding analytics/log preview using the request/trace context established in Sprint 0.
- The flow now exposes the `target_time_to_value_seconds = 80` posture and whether first value has been completed.

## Elicitation methods applied

### 1. First Principles
Used to keep the chunk honest: a user must be able to preserve intent, log one real expense, and receive one useful first-value insight before more complexity lands.

### 2. Cross-Functional War Room
Used to ensure product/design/engineering concerns stayed aligned around calm onboarding, visible trust boundaries, and non-judgmental first insights.

### 3. Critique & Refine
Used to avoid fake completion by limiting this chunk to one durable slice instead of pretending all of Sprint 1 was done in one pass.

## Deliverables created or updated
- `src/app/page.tsx`
- `src/app/app/page.tsx`
- `src/app/app/onboarding/page.tsx`
- `src/app/app/onboarding/actions.ts`
- `src/lib/onboarding/demo-state.ts`
- `src/lib/finance/first-value.ts`
- `docs/implementation/sprint-1-first-value-onboarding-and-goldie-loop.md`

## What remains in Sprint 1
- richer home-card rendering for first-value completion state
- companion-specific surfaces in the protected shell
- analytics persistence beyond preview logs
- first-value completion timing emitted to a durable sink
- tighter copy/design pass for Nikolas

## Exit criteria status after this chunk

### A new user can preserve an entry path through auth
**Met** in the demo implementation.

### A new user can log one money event and see one useful insight
**Met** in the demo implementation.

### No mandatory bank linking exists in the first-value flow
**Met**.

### Core loop events are inspectable
**Partially met** via trace-aware log preview and durable demo cookie state; persistent analytics/event storage still remains.

## Recommended next chunk

Continue **implementation / sprint-1-first-value-onboarding-and-goldie-loop** with the protected home-card experience and durable analytics/event capture.
