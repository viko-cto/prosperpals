# Hosted Audit PostgREST Durability Path

**Date:** 2026-03-24 09:15 UTC  
**Lane:** hosted hardening  
**Prepared by:** BMAD work block 2

## What changed in this chunk

ProsperPals now has a repo-native path for writing operator audit events to hosted durable storage instead of only the local JSONL sink.

The new path adds:
- a PostgREST-backed audit adapter in `src/lib/audit/demo-audit.ts`,
- environment-driven selection between local fallback and hosted durability,
- a strict `hosted-only` mode so alpha/staging can fail closed instead of silently falling back,
- and a Supabase migration for `public.demo_operator_audit_events`.

## Code and artifacts reviewed

- `src/lib/audit/demo-audit.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`
- `supabase/migrations/20260324091500_demo_operator_audit_events.sql`

## What now passes

### 1. The audit path no longer has to be local-only
When `PROSPERPALS_SUPABASE_URL` plus `PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY` are present, audit reads/writes can target PostgREST on a hosted Supabase table.

### 2. Hosted audit rollout can fail closed
When `PROSPERPALS_AUDIT_DURABILITY_MODE=hosted-only`, the audit path refuses silent local fallback. That matters for alpha because it prevents fake confidence after a hosted-config break.

### 3. The hosted path is test-covered
`test/sprint-3-explainability-operator-safety.test.mjs` now verifies that a configured hosted audit path writes and reads via fetch/PostgREST without creating the local JSONL sink.

## What still does NOT pass yet

### 1. This is a capability, not proof of deployed configuration
The repo now supports hosted audit durability, but the actual alpha/staging environment still needs the secrets, table rollout, and smoke-test evidence.

### 2. Other trust-critical state is still local-runtime
This chunk only moved the operator audit lane forward. Analytics, receipts, reward ledger, simulator trades, and onboarding state still rely on cookies or local runtime sinks unless separately migrated.

### 3. Broader operator boundaries are still incomplete
Support-only/admin-only role separation and broader cross-account controls are still open blockers even with stronger audit storage.

## Verdict by checklist line

### B1. Durable hosted truth
- Support and audit traces survive redeploys -> **manual fallback** until hosted env config + smoke proof are attached

## Exact next move after this chunk

1. Wire the hosted audit table into the actual preview/alpha environment and capture one smoke proof note.
2. Reuse the same hosted-durability pattern for analytics and the most trust-critical user-facing records.
3. Keep the NO-GO locked until interview evidence and the remaining state-migration blockers are closed.
