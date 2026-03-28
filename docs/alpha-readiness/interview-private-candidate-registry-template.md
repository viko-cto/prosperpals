# ProsperPals Private Candidate Registry Template

Use this file to define the **offline-only registry contract** for real interview participants before any alias appears in repo artifacts.

This artifact supports the current BMAD step:

**`alpha-readiness / interview-evidence-and-hosted-hardening-execution`**

It does **not** soften the hosted-alpha **NO-GO**.

It exists because the interview lane had already gained:
- a fixed 12-slot cohort design,
- a screener,
- a recruiting/outreach pack,
- a Batch 01 assignment board,
- and a canonical evidence tracker,

but it still lacked one explicit rule set for the private handoff layer where real people are matched to slot aliases.

Without this layer, the most likely failure modes were predictable:
- real names leaking into repo files or screenshots,
- the same person being screened twice under different temporary labels,
- slot aliases being assigned before the source / screener record is stable,
- or scheduled calls becoming hard to audit because the private contact owner and repo-visible alias were never cleanly linked.

---

## 1. Elicitation methods applied

### First Principles
Used to reduce the problem to its minimum trustworthy unit: one private record per real candidate, one deterministic path from private identity to repo alias, and no ambiguity about who owns follow-up.

### Pre-mortem
Used to design against the likely operational failures: privacy leakage, duplicate sourcing, last-minute slot swapping, and interviews that happen without a durable provenance trail.

### Cross-Functional War Room
Used to keep recruiting, product learning, operator discipline, and privacy handling on one contract instead of spreading them across separate habits.

---

## 2. What this registry is for

This registry is **offline/private only**.

It should live in a private sheet, note, CRM, or founder-managed doc that is **not committed to the repo**.

Use it to manage the real-world layer between:
- actual human identity,
- screener answers,
- outreach/scheduling ownership,
- and the slot alias that eventually appears in repo artifacts.

The repo remains alias-only.

This registry is the missing bridge that lets the team work with real humans without contaminating the evidence pack.

---

## 3. Non-negotiable privacy rules

- Real names, emails, phone numbers, social handles, and profile URLs stay **outside the repo**.
- Repo artifacts use **slot aliases only** (`PP-B01`, `PP-I01`, etc.).
- Every real candidate gets exactly **one private registry row**.
- A slot alias is assigned only when the candidate is the approved active participant for that slot.
- If a candidate is replaced, the slot alias follows the active participant and the previous private row is marked as backup / rejected / withdrawn.
- Screenshots of the private registry should be treated as sensitive and should not be pasted into repo evidence files.

---

## 4. Required private registry columns

Use these columns in the offline registry.

| Field | Required? | Purpose |
| --- | --- | --- |
| Registry ID | yes | Stable private row id for dedupe and audit |
| Private contact owner | yes | Who owns outreach / follow-up |
| Real-world name | yes | Offline identity only |
| Primary contact method | yes | Email / phone / DM / referral path |
| Source bucket | yes | founder-network / second-degree-referral / external-community |
| Founder-network? | yes | yes / no |
| Social cluster / source note | yes | Helps prevent three similar recruits |
| Initial outreach date | yes | Shows whether the pipeline is actually moving |
| Current private status | yes | sourced / messaged / replied / screened-fit / screened-borderline / scheduled-pending-alias / backup / rejected / withdrawn |
| Proposed slot | yes | PP-B01 / PP-I01 / PP-M01 / etc / undecided |
| Archetype hypothesis | yes | budget-first / invest-first / mixed |
| Digital-payments fit | yes | yes / borderline / no |
| Hosted-alpha fit | yes | yes / maybe / no |
| Screener summary | yes | One compact summary of the fit |
| One-sentence slot rationale | yes | Why this person belongs in that slot |
| Main risk | yes | Why this candidate could still be wrong |
| Backup / active | yes | active / backup |
| Scheduled time | no | Filled only once actually booked |
| Repo slot alias assigned? | yes | yes / no |
| Repo slot alias | no | `PP-B01`, `PP-I01`, etc. once approved |
| Assignment board updated? | yes | yes / no |
| Tracker updated? | yes | yes / no |
| Session note prepared? | yes | yes / no |
| Last action date | yes | Prevents quiet drift |
| Next action | yes | Forces explicit ownership |

---

## 5. Canonical state machine

Use these private statuses:
- `sourced`
- `messaged`
- `replied`
- `screened-fit`
- `screened-borderline`
- `scheduled-pending-alias`
- `backup`
- `rejected`
- `withdrawn`

### State rules
- `screened-fit` means the person plausibly belongs in a specific slot and has at least a one-sentence rationale.
- `scheduled-pending-alias` is allowed only if the candidate has a proposed slot and clear private ownership.
- A candidate should not receive a repo alias while still `screened-borderline`.
- `backup` means usable reserve, not hidden active participant.
- `withdrawn` should be used when a candidate was viable but opted out or went silent after meaningful progress.

---

## 6. Alias handoff protocol

A real participant should move from the private registry into repo artifacts only when all of the following are true:

- [ ] source bucket is known
- [ ] founder-network status is known
- [ ] archetype hypothesis is clear
- [ ] digital-payments fit is recorded
- [ ] hosted-alpha fit is recorded
- [ ] one-sentence slot rationale exists
- [ ] one private contact owner is responsible
- [ ] a slot has been approved for this person
- [ ] the corresponding deterministic session note file exists

### Handoff steps
1. confirm the active slot (`PP-B01`, `PP-I01`, etc.) in the private registry
2. mark `Repo slot alias assigned? = yes`
3. update `docs/alpha-readiness/interview-batch-01-assignment-board.md`
4. update `docs/alpha-readiness/interview-evidence-tracker.md`
5. prepare / verify the matching session note file
6. only then move the repo-visible status toward `scheduled`

If any of these are skipped, the batch is not scheduling-ready.

---

## 7. Duplicate-prevention rules

Use this checklist before creating a new private row:

- [ ] same real person not already present under another lead code
- [ ] same referrer has not already passed this person in another thread
- [ ] same source cluster is not already overrepresented in Batch 01
- [ ] the candidate is not already held as a backup for another slot without an explicit reason to duplicate consideration

### Anti-duplication rule
If one real person could fit multiple slots, keep **one private row** and change `Proposed slot` as evidence improves. Do not create multiple rows to “reserve optionality.”

---

## 8. Batch 01 readiness checks at the private layer

Before the team treats Batch 01 as ready to schedule, the private registry should show:

- at least **one active non-founder-network candidate** across `PP-B01`, `PP-I01`, and `PP-M01`
- at least **one backup candidate per slot**
- no slot relying on a candidate with `screened-borderline` status as the only option
- clear private ownership for every active candidate
- no unresolved dedupe ambiguity for the active three

If these are false, the next move is more sourcing/screening — not calendar locking.

---

## 9. Suggested offline row template

Use this exact template in a private sheet or note.

### Private candidate row
- **Registry ID:**
- **Private contact owner:**
- **Real-world name/contact:**
- **Primary contact method:**
- **Source bucket:** founder-network / second-degree-referral / external-community
- **Founder-network?:** yes / no
- **Social cluster / source note:**
- **Initial outreach date:**
- **Current private status:** sourced / messaged / replied / screened-fit / screened-borderline / scheduled-pending-alias / backup / rejected / withdrawn
- **Proposed slot:**
- **Archetype hypothesis:** budget-first / invest-first / mixed
- **Digital-payments fit:** yes / borderline / no
- **Hosted-alpha fit:** yes / maybe / no
- **Screener summary:**
- **One-sentence slot rationale:**
- **Main risk:**
- **Backup / active:** active / backup
- **Scheduled time:**
- **Repo slot alias assigned?:** yes / no
- **Repo slot alias:**
- **Assignment board updated?:** yes / no
- **Tracker updated?:** yes / no
- **Session note prepared?:** yes / no
- **Last action date:**
- **Next action:**

---

## 10. Operating rhythm

### Daily while Batch 01 is open
- review active + backup coverage by slot
- check whether source-mix drift is emerging
- clear stale `replied` or `screened-fit` rows before they silently rot
- make sure every active candidate has one named owner and one next action

### Before each new scheduled interview
- verify the private row is complete
- verify the repo alias handoff is complete
- verify the deterministic note file exists
- verify the candidate is still the active owner of that slot

### After each completed interview
- update the private row status
- record whether the candidate is plausible for hosted-alpha follow-up
- keep private scheduling / contact history offline
- keep all product evidence repo-visible only via alias-based session notes

---

## 11. Immediate next actions

- [ ] create the offline/private registry using the required columns above
- [ ] load current real outreach leads into the registry before assigning any repo aliases
- [ ] dedupe and mark source cluster for each Batch 01 lead
- [ ] make sure each active Batch 01 lead has a named owner and next action
- [ ] assign slot aliases only after the handoff checklist is satisfied
- [ ] do not let repo-visible scheduling outrun the private registry hygiene

---

## 12. Outcome

ProsperPals now has the missing **private identity-to-alias control layer** for the interview lane.

That is a real BMAD execution step because it turns “assign real participants” into a safer, auditable, privacy-respecting workflow rather than an informal founder-memory task.

The hosted-alpha **NO-GO remains locked** because this improves interview execution discipline, not the actual evidence count.
