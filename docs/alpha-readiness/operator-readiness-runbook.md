# ProsperPals Operator Readiness Runbook

This runbook is the minimum credible support and incident shell for a small hosted alpha.

## 1. Roles and visibility

| Role | What they can see | What they can do | What they cannot do |
|---|---|---|---|
| User | Own onboarding, money logs, receipt candidates, simulator history, explanations | Review/correct own inputs, request help/export/deletion | View other users or hidden operator notes |
| Founder/operator |  |  |  |
| Support-only |  |  |  |
| Admin-only |  |  |  |

## 2. Auditable actions

Every operator-side action affecting user trust should be actor-scoped and timestamped.

Record evidence for:
- viewing sensitive artifacts,
- making corrections or overrides,
- account-access interventions,
- manual receipt review actions,
- feature-flag / safety-toggle changes,
- export or deletion handling.

## 3. User help path
- **Primary support channel:**
- **Fallback support channel:**
- **Owner on first response:**
- **Target response time during alpha:**
- **Escalation owner:**

## 4. Export and deletion path

### Export request
- intake path:
- owner:
- manual fallback:
- expected turnaround:
- evidence note:

### Deletion request
- intake path:
- owner:
- manual fallback:
- expected turnaround:
- evidence note:

## 5. Support scenarios

### A. User says “this receipt is wrong”
1. acknowledge the issue
2. confirm whether the candidate was reviewed or still pending
3. prevent ambiguous data from becoming canonical truth
4. log operator action if any intervention occurs
5. confirm corrected state or safe fallback to the user

### B. User asks “are you giving me financial advice?”
1. restate the education-not-advice boundary in plain language
2. point to the simulator/trust explanation surface
3. confirm no real trade or recommendation is being executed
4. log if the wording caused confusion serious enough to affect alpha trust

### C. User asks for deletion or export
1. confirm identity using the approved alpha process
2. log the request timestamp and owner
3. execute the documented manual fallback if tooling is incomplete
4. confirm completion back to the user
5. record the evidence note

### D. User reports a trust-critical bug
1. capture exact flow and screenshot/path if available
2. decide whether the issue affects canonical truth, privacy, or operator access
3. pause affected feature if a kill-switch exists
4. notify escalation owner
5. record incident note and user impact

## 6. Incident pause criteria

Pause the hosted alpha or affected feature if any of the following occurs:
- ambiguous receipt data can become canonical truth,
- operator access is discovered to be unaudited or over-broad,
- user data is visible across accounts,
- the product is materially presenting itself as financial advice,
- deletion/export handling cannot be explained clearly,
- or a deploy breaks trust-critical state without a safe rollback path.

## 7. Founder-facing daily check
- outstanding trust-critical tickets:
- unresolved deletion/export/help requests:
- incidents in last 24h:
- manual fallbacks currently in force:
- recommendation: continue / constrain / pause
