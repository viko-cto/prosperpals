# Operator/Admin Boundary Closure Plan

**Date:** 2026-03-25 15:15 UTC  
**Lane:** operator/access readiness  
**Prepared by:** BMAD work block 4

## Why this exists

ProsperPals now has clearer operator evidence than it did a day ago, but the remaining blocker is still too fuzzy: “support/admin boundaries are missing.”

That phrase is directionally true and operationally useless.

This note turns that blocker into a closure plan with explicit acceptance bars, so the pre-alpha **NO-GO** can stay locked for concrete reasons instead of vibes.

## Current honest state

What exists today:
- external alpha users can use the normal app surfaces,
- founder/operator access to `/app/support` is gated behind `@prosperpals.local` plus `supportTraceView`,
- support timeline access is actor-audited,
- narrow receipt-intake pause/clear interventions are actor-audited,
- release overrides for `receiptCapture` and `simulatorStarter` are actor-audited.

What does **not** exist today:
- a least-privilege support-only role,
- an admin-only role separate from support,
- a durable actor-vs-subject model for cross-account intervention,
- a product-native approval path for high-risk account actions,
- a decision-grade audit trail for cross-account access or session rescue.

## Closure objective

Before ProsperPals can soften the current NO-GO, the operator boundary must move from:

> founder-only internal support view with narrow audited controls

to:

> explicit least-privilege roles, actor/subject separation, and bounded audited intervention rules that can survive a small hosted alpha.

## Required boundary model

### 1. External alpha user
Can:
- see only their own onboarding, logs, receipts, simulator, and explainability state
- request help through the approved alpha support channel

Cannot:
- see any internal support surface
- see another user’s records
- trigger operator-only actions

### 2. Support-only
Can:
- view bounded support diagnostics for a specific user
- inspect receipt failure state, trust-safe timeline context, request IDs, and trace IDs
- apply only low-risk interventions explicitly approved for support

Cannot:
- change release flags
- export or delete user data
- impersonate users
- access environment/config secrets
- approve their own elevation into broader account actions

### 3. Admin-only
Can:
- manage high-risk configuration and account-level interventions
- approve or perform export/deletion/session-rescue flows when policy requires it
- manage feature-flag and release-safety changes

Cannot:
- use hidden unaudited shortcuts
- perform cross-account actions without actor identity, reason code, and audit record

### 4. Founder/operator
For alpha, founder/operator may temporarily hold both support and admin responsibilities, but only if the product still records which hat was being worn.

That means every high-risk action must still log:
- actor identity,
- subject identity,
- role used for the action,
- reason,
- request/trace context,
- outcome.

## Minimum acceptance bars

The blocker should not move from **open blocker** to **manual fallback** until all of the following are true.

### A. Role model is explicit in product behavior
- support-only and admin-only permissions are documented in repo truth
- route-level and action-level guards exist for both roles
- `/app/support` behavior reflects the intended permission split instead of one broad internal gate

### B. Actor and subject are separated
- every cross-account action records both the acting operator and the affected user
- support actions never silently inherit “current user” when the real subject is different
- audit records preserve role + subject + reason consistently

### C. High-risk actions are bounded
At minimum, these actions must have explicit policy notes and audit rules:
- account access / session rescue
- export handling
- deletion handling
- feature-flag overrides
- release-safety overrides
- receipt-lane pause/resume interventions

### D. Least privilege is real
- support-only cannot perform admin-only actions
- admin-only actions are not exposed through the support view without explicit elevation
- hidden founder shortcuts are treated as blockers, not conveniences

### E. Manual fallback is still founder-safe
If the app does not yet implement the full workflow, the repo must still define:
- who approves the action,
- where the request is logged,
- how completion is confirmed,
- what evidence note proves it happened.

## Recommended implementation order

1. **Authorization contract pass**  
   Define explicit support-only vs admin-only permissions in the repo contracts and route guards.

2. **Actor/subject audit pass**  
   Ensure support/admin actions always capture actor ID, subject ID, role, reason, request ID, and trace ID.

3. **High-risk action inventory**  
   Add a canonical list of interventions and classify each as support-safe, admin-only, or founder-manual.

4. **Approval + fallback notes**  
   For anything still manual, document the approval owner and the audit evidence note.

5. **Founder-facing verification pass**  
   Confirm a small alpha could explain “who touched what and why” without hand-waving.

## What would change the checklist state

### To move from `open blocker` -> `manual fallback`
Need:
- explicit support/admin boundary contract,
- actor-vs-subject audit model for cross-account actions,
- documented manual approval path for any still-manual high-risk action.

### To move from `manual fallback` -> `complete`
Need:
- product-enforced least-privilege boundaries,
- durable hosted audit trail for those actions,
- bounded tested flows for the approved intervention set.

## Honest verdict

ProsperPals is in a better place than “no operator model,” but not yet in a place where hosted alpha users should trust invisible founder powers.

So the correct posture is still:

> **NO-GO remains locked until operator/admin boundary closure is explicit, audited, and least-privilege by design.**

## Exact next move this points to

Create one canonical intervention inventory plus policy matrix, then wire route/action guards and actor/subject audit rules against that inventory before any hosted-alpha softening is considered.
