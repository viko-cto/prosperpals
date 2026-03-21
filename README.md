# ProsperPals

AI-first personal finance companion for Gen Z (Goldie & Fin).

## Status
ProsperPals has completed the BMAD planning pipeline and the current implementation lane through Sprint 3.

**Current status:** `implementation-complete`

**Next recommended step:** `alpha-readiness / 1-gap-close-plan` completed → `alpha-readiness / 2-user-validation-and-alpha-hardening-brief`

## What exists now
- BMAD planning artifacts in `_bmad/_bmad-output/planning-artifacts/`
- Next.js 15 App Router prototype with public (`/`) and protected (`/app`) routes
- Demo auth shell for local/preview use until Supabase auth wiring is added
- Sprint 1 first-value onboarding with Goldie, Daily Spending Power, and durable onboarding analytics
- Sprint 2 reward loop with visible ProsperCoin reasons, explicit Goldie → Fin handoff, and a starter simulator route
- Sprint 3 trust hardening for receipt candidate review, explainability, operator traces, release safety, and privacy-safe notifications
- Durable demo ledgers for ProsperCoin credits/debits and virtual trade executions
- Curated launch asset list with honest quote freshness and stale-trade blocking
- Supabase SQL migrations for canonical trust-critical tables
- Server-evaluated feature flags and request/trace propagation
- Idempotency tests for both SQL trust tables and the demo reward/trade loop
- Alpha-readiness gap-close plan in `docs/implementation/alpha-readiness-gap-close-plan.md`

## Getting started
```bash
npm install
npm run dev
```

Open `http://localhost:3000` and use the demo sign-in to enter the protected shell.

## Test the trust baseline
```bash
npm test
```

This verifies that repeated writes to the core trust-critical tables remain idempotent.

## BMAD sequence completed
1. Analyst → Product Brief
2. PM → PRD
3. UX → UX spec
4. Architect → Architecture
5. PM/SM → Epics & Stories
6. QA → Implementation readiness review
7. Execution kickoff → P0 build sequence
8. Implementation → Sprint 0 foundation and trust scaffolding
9. Implementation → Sprint 1 first-value onboarding and Goldie loop
10. Implementation → Sprint 2 reward loop and Fin simulator starter slice
11. Implementation → Sprint 3 explainability, receipt intake, and operator safety
12. Alpha readiness → gap-close plan

## Immediate next step
`alpha-readiness / 2-user-validation-and-alpha-hardening-brief`
