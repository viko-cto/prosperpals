# Operator Role and Access Definition

**Date:** 2026-03-22 18:18 UTC  
**Lane:** operator/access readiness  
**Prepared by:** BMAD catch-up worker

## What was reviewed

- `src/lib/auth/session.ts`
- `src/app/auth/demo/route.ts`
- `src/lib/feature-flags/config.ts`
- `src/app/app/page.tsx`
- `src/app/app/support/page.tsx`
- `src/lib/support/demo-support.ts`

## Current repo-state role map

| Role | How it is recognized today | What it can see/do | What it cannot do | Status |
|---|---|---|---|---|
| External alpha user | Demo-authenticated viewer whose email does **not** end with `@prosperpals.local` | Can use `/app`, onboarding, simulator, receipts, and explainability surfaces tied to the current demo session | Cannot open `/app/support`; cannot change flags; cannot perform operator actions; cannot view another user from product UI | **Manual fallback** |
| Founder/operator | Demo-authenticated viewer whose email **does** end with `@prosperpals.local` and therefore gets `supportTraceView` when the flag remains enabled | Can open `/app/support`, inspect support timeline rows, release-safety checks, request IDs, and trace IDs for the current demo session | Cannot impersonate another user, cannot perform a real account intervention, cannot export/delete from the UI, cannot manage flags from an admin console | **Manual fallback** |
| Support-only | Not implemented | None beyond whatever a founder/operator already has | No distinct least-privilege support persona exists | **Open blocker** |
| Admin-only | Not implemented | None beyond code-level/env access outside the app | No app-native admin controls for feature flags, deletions, overrides, or account access exist | **Open blocker** |

## What this proves

### 1. The operator boundary is at least explicit now
The repo does have a real distinction between:
- normal user-facing app routes, and
- the internal-only support surface gated by `supportTraceView` plus the `@prosperpals.local` email check.

That is better than a hidden support backdoor.

### 2. Least privilege is still not fully real
The only operator boundary in the running app is:
- internal email domain check, and
- a feature-flag gate.

There is still no dedicated support-only or admin-only role with narrower permissions.

### 3. Demo auth is still not alpha-safe multi-user auth
`src/app/auth/demo/route.ts` sets a hard-coded demo `userId`.
That means this repo slice is still proving operator flow shape, not a hosted multi-user access model suitable for external alpha.

## Honest verdict

The role/access model is now documented clearly enough to stop hand-waving, but it is **not** strong enough to relax the hosted-alpha NO-GO.

The biggest remaining access blockers are:
1. no support-only role,
2. no admin-only role,
3. no actor-scoped operator identity beyond the demo session,
4. and no multi-user-safe auth boundary for the hosted alpha path.

## Exact next hardening move this points to

1. Replace demo-only identity with real per-user auth.
2. Add explicit support-only and admin-only authorization boundaries.
3. Ensure operator actions carry actor identity separate from subject user identity.
4. Keep `/app/support` internal-only until those controls are durable and auditable.
