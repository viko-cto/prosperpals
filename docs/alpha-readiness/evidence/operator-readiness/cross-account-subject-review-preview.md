# Cross-Account Subject Review Preview

**Date:** 2026-03-26 09:15 UTC  
**Lane:** operator/access readiness  
**Prepared by:** ProsperPals BMAD work block 2

## Why this exists

The operator lane already had actor-scoped audit records and separated support-safe receipt holds from admin-only release overrides.

What it did **not** yet show in the product was the difference between:
- the operator who is signed in,
- and the user account whose support context is being reviewed.

That gap matters because a hosted alpha cannot rely on founders mentally tracking who they are acting **as** versus who they are acting **on**.

## What changed in repo behavior

The support surface now accepts an explicit subject context and makes it visible in the UI:
- current operator identity still comes from the viewer session,
- selected subject is resolved separately,
- support timeline view audits now record the selected subject rather than silently assuming the actor and subject are the same,
- and the page shows when the operator is in a **cross-account review (read-only)** state.

## Deliberate boundary

This change does **not** introduce impersonation or hidden admin power.

When the selected subject differs from the signed-in operator:
- receipt-hold controls stay disabled by default,
- release override controls stay visible but non-mutable from that review context,
- the server action path now also rejects forged `subjectUserId` mutations and records a boundary-blocked audit event instead of trusting UI state alone,
- the UI can create an explicit **pending approval request** for a bounded cross-account receipt-hold action, with actor / subject / role / requested capability / approval owner / reason captured in audit,
- founder/operator can now resolve that request in-product, producing a durable **approved** audit event with approval request id + resolver identity,
- and only then does the bounded cross-account receipt-hold rail unlock for that subject context.

That keeps the lane honest:

> the repo now proves explicit actor-vs-subject review context plus a narrow approval-backed receipt-hold workflow,
> but it still does **not** pretend broad cross-account intervention or hosted role maturity is solved.

## Why this is useful now

This preview moves the blocker from vague language to a more testable state:
- support reviewers can see the intended subject boundary in product behavior,
- audit evidence for timeline views now preserves actor-vs-subject separation more honestly,
- and the remaining gap is narrower: durable hosted approval plus subject-scoped intervention workflows.

## Honest status after this change

- **Improved:** actor-vs-subject review clarity in the running support surface, server-side enforcement that keeps forged cross-account mutations blocked, and a bounded founder-approved cross-account receipt-hold rail with explicit approval resolution audit
- **Still blocked:** durable hosted role assignment beyond demo cookies, wider approval-backed cross-account intervention, export/deletion maturity, and deployed hosted proof for the operator lane
- **NO-GO:** still locked

## Exact next move this points to

Keep this read-only subject review preview in place, then add a durable approval-backed workflow for any future cross-account intervention so the audit trail can answer:
- who looked,
- who acted,
- on whose account,
- under which role,
- for what reason,
- and with whose approval.
