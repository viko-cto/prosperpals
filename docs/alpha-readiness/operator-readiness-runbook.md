# ProsperPals Operator Readiness Runbook

This runbook is the minimum credible support and incident shell for a small hosted alpha.

## 1. Roles and visibility

| Role | What they can see | What they can do | What they cannot do | Current status | Evidence |
|---|---|---|---|---|---|
| User | Own onboarding, money logs, receipt candidates, simulator history, explainability surfaces tied to the current demo session | Review/correct own receipt inputs, use onboarding/simulator flows, request help manually outside the app | View `/app/support`, change feature flags, perform admin actions | manual fallback | `docs/alpha-readiness/evidence/operator-readiness/role-access-definition.md` |
| Founder/operator | Same user-facing surfaces plus `/app/support` when the viewer is internal (`@prosperpals.local`) and `supportTraceView` remains enabled | Inspect support timeline, request IDs, trace IDs, receipt failures, and release-safety checks for the current demo session | Impersonate other users, perform real account intervention, export/delete from the UI, manage dedicated support/admin roles | manual fallback | `docs/alpha-readiness/evidence/operator-readiness/role-access-definition.md` |
| Support-only | Not implemented | None beyond founder/operator access | No least-privilege support persona exists | open blocker | `docs/alpha-readiness/evidence/operator-readiness/role-access-definition.md` |
| Admin-only | Not implemented | None beyond code/env access outside the app | No app-native admin controls for flag changes, deletions, or overrides exist | open blocker | `docs/alpha-readiness/evidence/operator-readiness/role-access-definition.md` |

## 2. Auditable actions

Every operator-side action affecting user trust should be actor-scoped and timestamped.

### What is traceable today
- receipt creation, receipt failure, and receipt confirmation preserve request/trace references,
- internal support-surface access now writes an actor-scoped `support.timeline.viewed` audit event with timestamp, request ID, trace ID, and subject context,
- the support timeline renders those references together with trust-critical context,
- receipt failure records preserve failure stage, recovery action, and provider reference.

### What is still missing
- the current audit sink is still local-runtime instead of hosted durable,
- feature-flag / safety-toggle changes are not actor-logged,
- account-access interventions are not implemented,
- support-only/admin-only boundaries are still not implemented.

Record evidence for:
- viewing sensitive artifacts,
- making corrections or overrides,
- account-access interventions,
- manual receipt review actions,
- feature-flag / safety-toggle changes,
- export or deletion handling.

Current evidence: `docs/alpha-readiness/evidence/operator-readiness/operator-auditability-proof.md`

## 3. User help path
- **Primary support channel:** founder-managed direct recruitment/interview contact path (manual fallback; not product-native)
- **Fallback support channel:** none yet standardized in repo
- **Owner on first response:** founder/operator
- **Target response time during alpha:** manual, same-day where possible; not yet encoded in tooling
- **Escalation owner:** founder/operator
- **Evidence:** `docs/alpha-readiness/evidence/operator-readiness/support-help-path.md`

## 4. Export and deletion path

### Export request
- intake path: manual request outside the app
- owner: founder/operator
- manual fallback: gather cookie-backed onboarding state plus matching local JSONL / receipt artifact records for the current user
- expected turnaround: manual / not yet operationalized in tooling
- evidence note: `docs/alpha-readiness/evidence/operator-readiness/export-deletion-fallback.md`

### Deletion request
- intake path: manual request outside the app
- owner: founder/operator
- manual fallback: remove current demo user records from cookie/local sinks and record completion externally until audit tooling exists
- expected turnaround: manual / not yet operationalized in tooling
- evidence note: `docs/alpha-readiness/evidence/operator-readiness/export-deletion-fallback.md`

## 5. Support scenarios

### A. User says “this receipt is wrong”
1. acknowledge the issue
2. confirm whether the candidate was reviewed or still pending
3. keep ambiguous data from becoming canonical truth
4. inspect the receipt timeline using request/trace IDs if founder/operator review is needed
5. confirm corrected state or safe fallback to the user

### B. User asks “are you giving me financial advice?”
1. restate the education-not-advice boundary in plain language
2. point to the explainability surface
3. confirm no real trade or recommendation is being executed
4. log the incident externally if wording confusion is severe enough to affect trust

### C. User asks for deletion or export
1. confirm identity using the approved pre-alpha manual process
2. log the request timestamp and owner outside the app until audit tooling exists
3. execute the documented manual fallback if tooling is incomplete
4. confirm completion back to the user
5. record the evidence note

### D. User reports a trust-critical bug
1. capture exact flow and screenshot/path if available
2. decide whether the issue affects canonical truth, privacy, or operator access
3. disable the affected surface with the narrowest available feature flag if a safe toggle exists
4. notify escalation owner
5. record incident note and user impact

## 6. Incident pause criteria

Pause the hosted alpha or affected feature if any of the following occurs:
- ambiguous or failed receipt data can become canonical truth,
- operator access is discovered to be unaudited or over-broad,
- user data is visible across accounts,
- the product is materially presenting itself as financial advice,
- deletion/export handling cannot be explained clearly,
- feature flags are changed without clear owner control,
- or local-runtime persistence drift breaks trust-critical continuity.

Evidence: `docs/alpha-readiness/evidence/operator-readiness/incident-pause-and-escalation.md`

## 7. Founder-facing daily check
- outstanding trust-critical tickets: review `/app/support` timeline plus latest receipt failure records
- unresolved deletion/export/help requests: track manually outside the app until real audit tooling exists
- incidents in last 24h: consult the incident evidence note and latest timeline entries
- manual fallbacks currently in force: support channel, export/delete handling, operator audit logging, and role separation
- recommendation: continue / constrain / pause based on incident criteria above
