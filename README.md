# ProsperPals

AI-first personal finance companion for Gen Z (Goldie & Fin).

## Status
ProsperPals has completed the BMAD planning pipeline, the current implementation lane through Sprint 3, and the alpha-readiness decision chain through the locked pre-alpha NO-GO packet.

**Current status:** `alpha-readiness / interview-evidence-and-hosted-hardening-execution`

**Decision posture:** `NO-GO remains locked until interview evidence, hosted hardening, receipt realism, and operator readiness are captured in durable artifacts`

**Next recommended step:** keep the NO-GO locked while proving the new hosted audit + reward/trade ledger + analytics paths in a real preview/alpha environment, then migrate the remaining onboarding/receipt state and populate the remaining interview evidence in `docs/alpha-readiness/`. Return to a formal GO / CONDITIONAL GO / NO-GO re-decision only after that evidence exists.

## What exists now
- BMAD planning artifacts in `_bmad/_bmad-output/planning-artifacts/`
- Next.js 15 App Router prototype with public (`/`) and protected (`/app`) routes
- Demo auth shell for local/preview use until Supabase auth wiring is added
- Sprint 1 first-value onboarding with Goldie, Daily Spending Power, and durable onboarding analytics
- Sprint 2 reward loop with visible ProsperCoin reasons, explicit Goldie → Fin handoff, and a starter simulator route
- Sprint 3 trust hardening for receipt candidate review, explainability, operator traces, release safety, privacy-safe notifications, bounded upload/artifact receipt lineage, and actor-scoped support-view audit logging
- Durable demo ledgers for ProsperCoin credits/debits and virtual trade executions
- Curated launch asset list with honest quote freshness and stale-trade blocking
- Supabase SQL migrations for canonical trust-critical tables plus hosted-capable PostgREST durability paths for operator audit events and the demo reward/trade ledger
- Server-evaluated feature flags and request/trace propagation
- Idempotency tests for both SQL trust tables and the demo reward/trade loop
- Alpha-readiness gap-close, validation, kickoff, NO-GO decision, and execution-packet artifacts in `docs/implementation/`
- Repo-native alpha execution operating pack in `docs/alpha-readiness/` for interview logs, batch syntheses, hosted-hardening evidence, operator readiness, receipt realism, and re-decision dashboard inputs

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

## Prove hosted audit + ledger + analytics durability in preview/alpha
```bash
PROSPERPALS_ENV=preview \
PROSPERPALS_SUPABASE_URL=https://<project>.supabase.co \
PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY=<service-role-key> \
PROSPERPALS_AUDIT_DURABILITY_MODE=hosted-only \
PROSPERPALS_LEDGER_DURABILITY_MODE=hosted-only \
PROSPERPALS_ANALYTICS_DURABILITY_MODE=hosted-only \
PROSPERPALS_HOSTED_SMOKE_REPORT_PATH=docs/alpha-readiness/evidence/hosted-hardening/generated/preview-hosted-durability-smoke-latest.md \
npm run smoke:hosted-durability
```

This is the honest smoke gate for the current alpha-readiness blocker: it proves the hosted audit + reward/trade ledger + founder-visible analytics paths round-trip through PostgREST and fail if the app tries to fall back to local runtime JSONL sinks.

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
13. Alpha readiness → user validation and alpha hardening brief
14. Alpha readiness → cohort recruitment and hosted hardening kickoff
15. Alpha readiness → interview-wave synthesis and alpha go/no-go
16. Alpha readiness → execution evidence packet
17. Alpha readiness → interview evidence and hosted hardening execution operating pack

## Immediate next step
Populate the interview/evidence/checklist artifacts in `docs/alpha-readiness/`, prove the hosted audit + ledger + analytics paths in deployment, migrate the remaining receipt state off local-runtime sinks, keep the NO-GO locked, and re-enter decision review only after the required evidence exists.
