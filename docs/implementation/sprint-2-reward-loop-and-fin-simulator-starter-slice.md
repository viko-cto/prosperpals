# ProsperPals — Sprint 2 Reward Loop and Fin Simulator Starter Slice

**Date:** 2026-03-20  
**Phase:** implementation  
**Step:** sprint-2-reward-loop-and-fin-simulator-starter-slice  
**Status:** complete

## What Sprint 2 shipped

Sprint 2 turns the Sprint 1 first-value moment into the first full ProsperPals thesis loop:
**log -> earn -> handoff -> trade -> review**.

### 1. ProsperCoin reward engine with visible reasons
- Added a durable demo ledger at `.prosperpals-runtime/demo-ledger.jsonl`.
- Added append-only ProsperCoin credit/debit records with:
  - idempotency keys
  - request + trace IDs
  - reason codes
  - human-readable explanations
- Budget-first first value now awards **30 ProsperCoins** for the first awareness action.
- Invest-first intent now grants a one-time **20 ProsperCoin** starter credit so the simulator can be tested without touching real money.

### 2. Explicit Goldie -> Fin bridge that actually lands somewhere
- Kept Goldie as the first-value and trust-setting surface.
- Extended the handoff so the app now has a real `/app/simulator` destination instead of a placeholder future promise.
- The handoff copy explicitly frames the simulator as educational and freshness-aware, not advisory.

### 3. Curated launch asset list with honest quote freshness
- Added a small launch asset universe for the starter slice:
  - Novo Nordisk
  - S&P 500 ETF
  - Ørsted
- Each asset now carries:
  - reference price
  - freshness label
  - starter trade cost in ProsperCoins
  - “why this is here” teaching context
- The stale quote path is now explicit: Ørsted intentionally renders as **trade-blocked** when its quote exceeds the safe freshness threshold.

### 4. One virtual trade flow backed by immutable demo ledgers
- Added a Fin simulator page with server actions for starter trades.
- Executed trades write two append-only records together:
  - `virtual_trade_execution`
  - matching ProsperCoin debit ledger event
- Duplicate trade retries are suppressed via idempotency keys and return the original trade instead of double-debiting coins.

### 5. First portfolio summary view on the protected home surface
- `/app` now reads reward + trade state from the durable demo ledger.
- Added visible summary of:
  - available ProsperCoins
  - latest reward explanation
  - executed starter trade
  - estimated portfolio value in ProsperCoins
  - asset-level freshness labels
- The home route now behaves like a real reward-loop surface rather than only an onboarding state dump.

### 6. Durable telemetry for reward and trade states
- Extended the demo analytics sink to capture:
  - `rewards.awarded`
  - `simulator.trade.executed`
  - `simulator.trade.blocked`
- This keeps the Sprint 2 loop inspectable after redirects and across demo sessions.

## Elicitation methods applied

### 1. First Principles
Used to reduce Sprint 2 to the minimum believable reward loop: coins must be earned or explicitly funded, trade freshness must be honest, and the first portfolio state must survive after redirect.

### 2. Cross-Functional War Room
Used to keep product, design, and engineering aligned around one non-negotiable rule: finance trust beats simulator theater. That pushed visible reward reasons, stale-quote blocking, and append-only ledgers into the slice instead of leaving them for “later hardening.”

### 3. Critique & Refine
Used to cut out fake depth. Instead of a broad watchlist, complicated orders, or decorative gamification, Sprint 2 ships one calm starter trade path and one real portfolio summary.

## Deliverables created or updated
- `src/lib/simulator/demo-simulator.ts`
- `src/app/app/simulator/page.tsx`
- `src/app/app/simulator/actions.ts`
- `src/app/app/page.tsx`
- `src/app/app/onboarding/actions.ts`
- `src/app/app/onboarding/page.tsx`
- `src/lib/finance/first-value.ts`
- `src/lib/telemetry/demo-event-store.ts`
- `src/app/page.tsx`
- `src/app/auth/sign-in/page.tsx`
- `src/app/globals.css`
- `test/demo-reward-loop.test.mjs`
- `docs/implementation/sprint-2-reward-loop-and-fin-simulator-starter-slice.md`

## Exit criteria status after Sprint 2

### One user can complete log -> earn -> handoff -> virtual trade in one coherent session
**Met**.

### Reward explanations are visible instead of magical
**Met**.

### Stale or unsafe quote states are handled honestly
**Met** via trade-blocking freshness logic.

### Duplicate trade retries do not create trust failures
**Met** via idempotent starter-trade suppression.

### The protected app shell now reflects reward and portfolio state
**Met**.

## What remains outside Sprint 2
- receipt OCR and review sheet
- richer explainability surfaces (`Why am I seeing this?`)
- support/operator timeline for reward + trade debugging
- production database-backed reward/trade services beyond the demo ledger
- rollout smoke tests and migration safety checks tied to operator workflows

## Recommended next step

Continue with **implementation / sprint-3-explainability-receipt-intake-and-operator-safety**.
