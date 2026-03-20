# ProsperPals — Sprint 1 First-Value Onboarding and Goldie Loop

**Date:** 2026-03-20  
**Phase:** implementation  
**Step:** sprint-1-first-value-onboarding-and-goldie-loop  
**Status:** complete (chunk 1 + chunk 2 complete)

## What Sprint 1 shipped

Sprint 1 turns ProsperPals from a trust scaffold into a believable first-value product slice.

### 1. Entry-path preservation from landing -> auth -> protected app
- Landing CTAs carry intent-specific `next` targets into sign-in.
- The onboarding flow preserves the selected intent across the public/authenticated boundary.
- The selected paths map to the three real launch promises:
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

### 6. Protected home-card experience
- Reworked `/app` from a scaffold-heavy status page into a real first-value home surface.
- Added compact cards for Daily Spending Power, Goldie insight state, and Fin handoff readiness.
- Added a durable analytics timeline so post-redirect product state can still be inspected on the home route.

### 7. Durable analytics/event capture
- Added an append-only demo analytics sink at `.prosperpals-runtime/demo-analytics.jsonl`.
- Onboarding preference saves now write `onboarding.preferences.saved` events.
- Budget-first completion now writes `onboarding.first-value.completed` events with:
  - intent
  - mode
  - request + trace IDs
  - measured time to value
  - merchant label
  - amount
  - Daily Spending Power outcome
  - Goldie headline
- The home screen reads recent user-scoped events back and summarizes target performance.

## Elicitation methods applied

### 1. First Principles
Used to keep the slice honest: the user must be able to preserve intent, log one real expense, receive one useful first-value insight, and still see the result after the redirect.

### 2. Cross-Functional War Room
Used to keep product, design, and engineering aligned around a calm premium surface, inspectable operational state, and education-not-advice boundaries.

### 3. Critique & Refine
Used to push Sprint 1 to a clean stopping point instead of leaving the home route as an infrastructure dump with no durable product signal.

## Deliverables created or updated
- `.gitignore`
- `src/app/app/page.tsx`
- `src/app/app/onboarding/actions.ts`
- `src/app/globals.css`
- `src/lib/telemetry/demo-event-store.ts`
- `docs/implementation/sprint-1-first-value-onboarding-and-goldie-loop.md`

## Exit criteria status after Sprint 1

### A new user can preserve an entry path through auth
**Met**.

### A new user can log one money event and see one useful insight
**Met**.

### No mandatory bank linking exists in the first-value flow
**Met**.

### Core loop events are inspectable after redirect
**Met** via append-only durable analytics events and home-route timeline rendering.

### The protected shell behaves like a product surface rather than a raw scaffold
**Met**.

## What remains outside Sprint 1
- ProsperCoins crediting and visible reward progression
- Fin simulator execution path
- persistent database-backed analytics/event ingestion beyond the demo file sink
- receipt capture / OCR path
- operator/admin support surfaces for real event inspection

## Recommended next step

Continue with **implementation / sprint-2-reward-loop-and-fin-simulator-starter-slice**.
