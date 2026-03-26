# Operator Intervention Policy Matrix

**Date:** 2026-03-26 06:11 UTC  
**Lane:** operator/access readiness  
**Prepared by:** BMAD catch-up worker

This matrix is the canonical inventory for operator-side actions inside the current alpha-readiness lane.

It exists to stop two failure modes:
1. calling every internal control "support" even when it is actually an admin power,
2. pretending the founder can safely wear every hat without the audit trail saying which hat was used.

## Current role model in repo behavior

The demo session now carries an explicit operator role preview through a bounded internal cookie/session path:
- `user`
- `support`
- `admin`
- `founder-operator`

The running support surface uses that role to separate support-safe actions from admin-only actions.

**Important:** this is still a demo/internal preview of the boundary, not durable hosted auth.

## Canonical action matrix

| Action | Current route / surface | Risk tier | Required role in repo behavior | Current enforcement state | Audit expectation | Honest status |
|---|---|---|---|---|---|---|
| View support timeline for current subject | `/app/support` | medium | `support`, `admin`, or `founder-operator` | route guard checks `support_timeline_view` capability | actor, subject, role used, request ID, trace ID, reason | manual fallback |
| Pause receipt capture for current subject | `/app/support` receipt hold rail | medium | `support` or `founder-operator` | action guard checks `receipt_capture_intervention` capability | actor, subject, role used, request ID, trace ID, reason, intervention code | manual fallback |
| Clear receipt capture hold for current subject | `/app/support` receipt hold rail | medium | `support` or `founder-operator` | action guard checks `receipt_capture_intervention` capability | actor, subject, role used, request ID, trace ID, reason, intervention code | manual fallback |
| Force off `receiptCapture` | `/app/support` release overrides | high | `admin` or `founder-operator` | action guard checks `release_flag_override` capability | actor, role used, request ID, trace ID, scope, reason, flag name | manual fallback |
| Clear `receiptCapture` override | `/app/support` release overrides | high | `admin` or `founder-operator` | action guard checks `release_flag_override` capability | actor, role used, request ID, trace ID, scope, reason, flag name | manual fallback |
| Force off `simulatorStarter` | `/app/support` release overrides | high | `admin` or `founder-operator` | action guard checks `release_flag_override` capability | actor, role used, request ID, trace ID, scope, reason, flag name | manual fallback |
| Clear `simulatorStarter` override | `/app/support` release overrides | high | `admin` or `founder-operator` | action guard checks `release_flag_override` capability | actor, role used, request ID, trace ID, scope, reason, flag name | manual fallback |
| Export user data | manual only | high | founder/operator approval only | not product-native | request log + completion evidence outside app | open blocker |
| Delete user data | manual only | high | founder/operator approval only | not product-native | request log + completion evidence outside app | open blocker |
| Cross-account session rescue / impersonation | not implemented | critical | none yet | intentionally absent | actor, subject, role used, approval owner, reason, outcome | open blocker |
| Request approval for cross-account receipt hold | `/app/support` cross-account review | medium | `support` or `founder-operator` | actor can create a pending approval request, but cannot self-execute the hold | actor, subject, role used, request ID, trace ID, approval owner, requested capability, requested action, reason, pending status | manual fallback |

## What this closes

This matrix closes the repo-level ambiguity about which current controls are:
- support-safe,
- admin-only,
- or still founder-manual / absent.

It also gives the audit trail an explicit place to point when a founder/operator temporarily carries both roles.

## What it does **not** close

This matrix does **not** prove:
- durable hosted role assignment,
- multi-user-safe auth,
- cross-account intervention safety,
- export/deletion workflow maturity,
- or hosted survivability of the full operator lane.

So the hosted-alpha **NO-GO** still stays locked.

## Exact next move this points to

Keep the matrix as the canonical policy source, then pair it with:
1. durable hosted identity/role assignment,
2. cross-account intervention audit rules,
3. approval-backed export/deletion evidence,
4. and deployed hosted audit proof.
