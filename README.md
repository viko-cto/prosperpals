# ProsperPals

AI-first personal finance companion for Gen Z (Goldie & Fin).

## Status
ProsperPals has completed the BMAD planning pipeline and has now entered implementation.

**Current implementation step:** `sprint-0-foundation-and-trust-scaffolding`

## What exists now
- BMAD planning artifacts in `_bmad/_bmad-output/planning-artifacts/`
- Next.js 15 App Router scaffold for the product shell
- Public (`/`) and protected (`/app`) route separation
- Demo auth shell for local/preview use until Supabase auth wiring is added
- Supabase SQL migrations for canonical trust-critical tables
- Server-evaluated feature flags and request/trace propagation
- Idempotency tests for money, reward, and trade writes

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

## Immediate next step
`implementation / sprint-1-first-value-onboarding-and-goldie-loop`
