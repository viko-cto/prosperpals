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
| External alpha user | Demo-authenticated viewer whose email does **not** end with `@prosperpals.local`; non-internal emails are clamped to `user` role | Can use `/app`, onboarding, simulator, receipts, and explainability surfaces tied to the current demo session | Cannot open `/app/support`; cannot change flags; cannot perform operator actions; cannot view another user from product UI | **Manual fallback** |
| Founder/operator | Internal demo viewer (`@prosperpals.local`) with `founder-operator` role preview via session/cookie | Can open `/app/support`, inspect support timeline rows, use support-safe receipt holds, and apply admin-only release overrides while the audit trail records which role was used | Cannot impersonate another user, cannot perform a real cross-account intervention, cannot export/delete from the UI, cannot rely on this demo role path as hosted auth | **Manual fallback** |
| Support-only | Internal demo viewer with `support` role preview via session/cookie | Can open `/app/support`, inspect the current-subject timeline, and apply/clear the narrow receipt-capture hold | Cannot apply global release overrides, impersonate another user, export/delete from the UI, or manage account-level interventions | **Manual fallback** |
| Admin-only | Internal demo viewer with `admin` role preview via session/cookie | Can open `/app/support`, inspect the current-subject timeline, and apply/clear the audited release overrides for `receiptCapture` and `simulatorStarter` | Cannot use the support-only receipt hold rail by default, impersonate another user, export/delete from the UI, or perform account-level interventions | **Manual fallback** |

## What this proves

### 1. The operator boundary is explicit in product behavior now
The repo now has a real distinction between:
- normal user-facing app routes,
- support-only receipt-hold actions,
- admin-only release overrides,
- and founder/operator sessions that temporarily carry both hats.

That is materially better than a single broad internal gate.

### 2. Least privilege exists in demo shape, not durable hosted truth
The running app now has dedicated support-only and admin-only role previews with action-level guards.

But the current role assignment still depends on demo cookies/session state, not durable hosted identity.

### 3. Demo auth is still not alpha-safe multi-user auth
`src/app/auth/demo/route.ts` still sets one hard-coded demo `userId`.
That means this repo slice is proving operator boundary shape and audit semantics, not a hosted multi-user access model suitable for external alpha.

## Honest verdict

The role/access model is now documented clearly enough to stop hand-waving, but it is **not** strong enough to relax the hosted-alpha NO-GO.

The biggest remaining access blockers are:
1. no durable hosted role assignment beyond the demo session,
2. no actor-scoped operator identity beyond the current demo user cookie,
3. no cross-account intervention model,
4. and no multi-user-safe auth boundary for the hosted alpha path.

## Exact next hardening move this points to

1. Replace demo-only identity with real per-user auth and durable role assignment.
2. Keep the intervention policy matrix as the canonical support-safe vs admin-only contract.
3. Ensure hosted operator actions carry actor identity separate from subject user identity.
4. Keep `/app/support` internal-only until those controls are durable and auditable.
