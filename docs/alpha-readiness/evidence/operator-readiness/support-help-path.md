# Support and Help Path

**Date:** 2026-03-22 18:18 UTC  
**Lane:** operator/access readiness  
**Prepared by:** BMAD catch-up worker

## What was reviewed

- `src/app/app/receipts/page.tsx`
- `src/app/app/receipts/actions.ts`
- `src/app/app/explainability/page.tsx`
- `src/app/app/support/page.tsx`
- `src/lib/support/demo-support.ts`

## Current help posture

ProsperPals has partial self-serve trust surfaces, but it does **not** yet have a product-native external support channel.

### User-facing help that exists now
1. **Explainability surface** via `/app/explainability`  
   Helps answer why a number, recommendation, or prompt appeared without pretending the product is fully autonomous.

2. **Receipt review + failure guidance** via `/app/receipts`  
   The receipt lane can now fail safely, preserve a failure record, and redirect the user into a retry path instead of silently inventing canonical truth.

3. **Internal operator timeline** via `/app/support`  
   This is useful for founders/internal operators, but it is intentionally not exposed to external users.

## What does not exist yet

- no support inbox configured in the repo,
- no support form,
- no user-visible ticket status,
- no export/delete request UI,
- no response-time SLA captured in product configuration,
- and no support-only role.

## Honest alpha fallback

Because the Denmark-first cohort is intended to be manually recruited and closely watched, the only honest support path today is:

1. user reports an issue through the founder-managed recruitment/interview contact path,
2. founder/operator inspects the internal support timeline,
3. user is guided back to the safe path in-product where possible,
4. and unresolved trust-critical issues trigger a pause decision instead of ad hoc improvisation.

That is a workable **manual fallback** for a tiny pre-alpha cohort, not a scalable hosted support system.

## Scenario map

| Scenario | Current user-visible path | Internal operator path | Status |
|---|---|---|---|
| Wrong receipt parse | User can review/edit at `/app/receipts` before truth posts | Founder/operator can inspect receipt candidate/failure/confirmation timeline in `/app/support` | **Manual fallback** |
| Advice-boundary confusion | User can open `/app/explainability` and see plain-language framing | Founder/operator can review exact flow context using trace/request IDs | **Manual fallback** |
| Trust-critical bug | No dedicated external incident form exists | Founder/operator can inspect release-safety + timeline context and decide whether to pause | **Manual fallback** |
| Export/delete help | No product-native request path exists | Must be handled manually outside the app | **Open blocker** |

## Why the NO-GO remains locked

ProsperPals can help an internal operator reconstruct issues, but it cannot yet claim a credible external help system for real hosted alpha users.

## Exact next hardening move this points to

1. Standardize one founder-controlled support channel before inviting external users.
2. Add a minimal user-visible help/export/delete request path.
3. Preserve request/trace IDs in any support workflow so help stays auditable.
4. Keep the cohort small enough that manual fallback does not collapse under its own weight.
