# ProsperPals — Sprint 0 Foundation and Trust Scaffolding

**Date:** 2026-03-20  
**Phase:** implementation  
**Step:** sprint-0-foundation-and-trust-scaffolding  
**Status:** complete

## What this step shipped

Sprint 0 turns ProsperPals from a BMAD planning repo into a real engineering baseline.

### 1. Next.js app shell with public/protected routing
- Bootstrapped a **Next.js 15 App Router** codebase in-place.
- Added a public landing route (`/`) and a protected app shell (`/app`).
- Added route middleware that:
  - protects authenticated routes,
  - issues request/session/trace identifiers,
  - preserves a clear boundary between public and authenticated surfaces.
- Added a temporary **demo-cookie auth provider** so local and preview environments can run before real Supabase auth wiring lands.

### 2. Typed trust-critical contracts in code
Added `src/modules/finance/contracts.ts` with typed runtime contracts for:
- `MoneyEvent`
- `ProsperCoinLedgerEvent`
- `VirtualTradeExecution`
- `ConsentGrant`
- `AuditEvent`

This keeps the most sensitive records explicit before feature work starts.

### 3. Supabase schema baseline for Sprint 0
Added initial migrations for the core trust spine:
- `profiles`
- `consent_grants`
- `money_events`
- `money_event_revisions`
- `prospercoin_ledger_events`
- `virtual_portfolios`
- `market_price_snapshots`
- `virtual_trade_executions`
- `audit_events`
- `outbox_events`

Key properties already enforced:
- append-only ledger posture for rewards and trade executions,
- canonical `MoneyEvent` contract,
- unique idempotency keys on trust-critical write paths,
- trace IDs available on trust-sensitive records,
- separate consent and audit scaffolding before family/social features expand.

### 4. Server-evaluated feature-flag baseline
Added typed feature-flag evaluation in `src/lib/feature-flags/config.ts`.

This prevents rollout sequencing from becoming environment-fork chaos and keeps Denmark-first gating explicit:
- manual entry + receipt capture: on
- simulator starter: on
- family preview: on
- MobilePay beta: off by default
- PSD2 beta: off by default
- support trace view: internal only

### 5. Telemetry and trace propagation baseline
Added:
- `instrumentation.ts`
- request-context helpers in `src/lib/telemetry/request-context.ts`
- middleware propagation of `request_id`, `session_id`, and `trace_id`
- a health endpoint exposing runtime trace context

This gives ProsperPals a coherent “what happened?” trail before money, rewards, and simulator flows start branching.

### 6. Idempotency verification harness
Added a lightweight database test harness using `pg-mem`.

The test proves that repeated writes using the same idempotency key resolve cleanly against the schema for:
- `money_events`
- `prospercoin_ledger_events`
- `virtual_trade_executions`

That is the exact failure mode a finance product cannot fake its way through later.

## Elicitation methods applied

### 1. First Principles
Used to keep Sprint 0 honest: protect money truth, reward truth, and trade truth before building delightful UX around them.

### 2. Architecture Decision Records
Used to mirror the locked architecture choices rather than improvising a prototype-shaped backend.

### 3. Cross-Functional War Room
Used to make sure design/demo velocity did not block engineering setup, and engineering setup did not quietly skip consent/audit foundations.

## Deliverables created
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `.env.example`
- `middleware.ts`
- `instrumentation.ts`
- `src/app/**`
- `src/lib/auth/session.ts`
- `src/lib/feature-flags/config.ts`
- `src/lib/telemetry/request-context.ts`
- `src/modules/finance/contracts.ts`
- `supabase/migrations/20260320122600_sprint0_foundation_and_trust_scaffolding.sql`
- `supabase/policies/001_sprint0_baseline_rls.sql`
- `test/trust-idempotency.test.mjs`

## Exit criteria check

### Local + preview environments run reliably
**Met** via a self-contained Next.js app shell and demo auth path that does not require immediate third-party setup.

### Schema migrations are reproducible
**Met** via checked-in SQL migration files.

### One test write to each trust-critical canonical table succeeds idempotently
**Met** via automated `pg-mem` tests covering canonical money, reward ledger, and trade execution tables.

### Core observability hooks exist before UI orchestration grows
**Met** via middleware-generated correlation IDs, request context helpers, and the health endpoint.

## Recommended next step

**implementation / sprint-1-first-value-onboarding-and-goldie-loop**

That is now the correct next move: wire the budget-first and invest-first onboarding paths onto the trust spine built here.
