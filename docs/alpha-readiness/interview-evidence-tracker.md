# ProsperPals Interview Evidence Tracker

Use this file as the canonical operating tracker for the interview lane inside:

**`alpha-readiness / interview-evidence-and-hosted-hardening-execution`**

This tracker exists to prevent three common failure modes:
1. recruiting a lopsided cohort and calling it insight,
2. letting session notes drift without synthesis,
3. hand-waving threshold progress without real numerator/denominator math.

The rule is simple:

> if a session is not logged here, it does not count toward clearing the NO-GO.

---

## 1. Target cohort shape

ProsperPals still needs a Denmark-first, MobilePay-literate cohort that can honestly pressure-test the wedge.

### Minimum evidence target
- **12 total sessions**
- **At least 4 budget-first participants**
- **At least 4 invest-first participants**
- **Up to 4 mixed participants**
- **At least 8 participants with clear daily digital-payment habits**
- **At least 6 participants who look plausible for a hosted alpha follow-up**

### Hard stop conditions for recruitment quality
Do **not** call the interview lane complete if any of the following are true:
- fewer than 4 budget-first sessions were completed,
- fewer than 4 invest-first sessions were completed,
- more than 4 sessions are still missing same-day notes,
- any completed batch of 3 lacks a synthesis artifact,
- the final threshold scorecard is based on memory instead of linked session notes.

---

## 2. Session pipeline states

Use one of these values in the tracker table:
- `recruited`
- `scheduled`
- `completed-awaiting-notes`
- `logged`
- `batched`
- `excluded`

### State rules
- A session only counts as **completed** when the conversation happened.
- A session only counts toward threshold math when it is **logged**.
- A session only counts toward batch closure when both the session note and the relevant batch synthesis exist.
- Mark a session **excluded** if it happened but should not count because the participant is too off-target, the note is unusable, or the facilitator deviated too far from the intended flow.

---

## 3. Canonical tracker table

| Slot | Participant ID | Archetype | Life stage | Digital-payments fit | Hosted-alpha fit | Source | Status | Session note | Batch synthesis | Key outcome | Trust risk | Counts toward threshold |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 02 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 03 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 04 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 05 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 06 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 07 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 08 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 09 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 10 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 11 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |
| 12 | TBC | budget-first / invest-first / mixed | TBC | yes / no | yes / maybe / no | TBC | recruited | — | — | — | — | no |

---

## 4. Coverage summary

Update this section after every logged session.

### Archetype coverage
- **Budget-first logged:** 0 / minimum 4
- **Invest-first logged:** 0 / minimum 4
- **Mixed logged:** 0 / maximum 4 useful flex slots

### Cohort quality coverage
- **Digital-payments fit confirmed:** 0 / minimum 8
- **Hosted-alpha plausible follow-up:** 0 / minimum 6
- **Sessions logged same day:** 0 / 12 target
- **Excluded sessions:** 0

### Batch coverage
- **Batch 01 (sessions 01-03):** not started
- **Batch 02 (sessions 04-06):** not started
- **Batch 03 (sessions 07-09):** not started
- **Batch 04 (sessions 10-12):** not started

---

## 5. Threshold scoreboard

Only update a row when the underlying session note exists.

| Threshold | Running result | Pass bar | Current status | Evidence source |
|---|---:|---:|---|---|
| Users who explain Goldie vs Fin without heavy prompting | 0 | >= 8 | open | session logs + final synthesis |
| Users who find Daily Spending Power useful or promising | 0 | >= 8 | open | session logs + final synthesis |
| Users who see Fin as learning-oriented | 0 | >= 7 | open | session logs + final synthesis |
| Users positive or neutral on ProsperCoins | 0 | >= 7 | open | session logs + final synthesis |
| Users calling it childish / scammy / too game-like | 0 | < 3 | open | session logs + final synthesis |
| Unresolved severe trust reactions | 0 | = 0 | open | session logs + batch syntheses + final synthesis |

### Threshold math rule
When a participant is excluded, document why in the tracker table and do **not** include them in the numerator.

---

## 6. Current blockers and next actions

### Current blockers
1. No real interview sessions are logged yet.
2. The cohort is not yet populated with actual participants, even though the slot design is now fixed in `docs/alpha-readiness/interview-cohort-plan-and-screener.md`.
3. The re-decision dashboard still has zero evidence behind its interview section.
4. Recruiting and scheduling discipline must now follow `docs/alpha-readiness/interview-recruitment-and-scheduling-runbook.md` so the first batch does not drift into convenience sampling.

### Next actions
- [ ] assign real participants into slots `PP-B01` through `PP-M04` using `docs/alpha-readiness/interview-cohort-plan-and-screener.md`
- [ ] use `docs/alpha-readiness/interview-recruitment-and-scheduling-runbook.md` to keep source mix, scheduling SLAs, and batch shape honest before marking any slot `scheduled`
- [ ] record screener outcomes in this tracker before marking any slot `scheduled`
- [ ] complete sessions 01-03 and publish the first batch synthesis
- [ ] keep the threshold scoreboard sourced only from linked notes
- [ ] use the same tracker in every re-decision prep so the interview blocker cannot be softened by narrative
