# ProsperPals Interview Evidence Tracker

Use this file as the canonical operating tracker for the interview lane inside:

**`alpha-readiness / interview-evidence-and-hosted-hardening-execution`**

This tracker exists to prevent four common failure modes:
1. recruiting a lopsided cohort and calling it insight,
2. letting session notes drift without synthesis,
3. hand-waving threshold progress without real numerator/denominator math,
4. and pretending Batch 01 is ready when no slot-level intake sheet exists.

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

This table now mirrors the fixed slot architecture from `docs/alpha-readiness/interview-cohort-plan-and-screener.md` so recruiting can attach to the actual evidence design instead of a generic 1-12 placeholder list.

| Slot | Batch | Target archetype | Target life stage | Digital-payments fit target | Hosted-alpha fit target | Preferred source | Current participant alias | Screener rationale | Source used | Status | Target session note | Batch synthesis | Key outcome | Trust risk | Counts toward threshold |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PP-B01 | Batch 01 | budget-first | student | yes | maybe | external / referral | TBC | TBC | TBC | recruited | `evidence/interviews/session-01-pp-b01.md` | `evidence/interviews/batch-01-sessions-01-03.md` | — | — | no |
| PP-I01 | Batch 01 | invest-first | student | yes | yes | external / community | TBC | TBC | TBC | recruited | `evidence/interviews/session-02-pp-i01.md` | `evidence/interviews/batch-01-sessions-01-03.md` | — | — | no |
| PP-M01 | Batch 01 | mixed | student | yes | maybe | external | TBC | TBC | TBC | recruited | `evidence/interviews/session-03-pp-m01.md` | `evidence/interviews/batch-01-sessions-01-03.md` | — | — | no |
| PP-B02 | Batch 02 | budget-first | early-career | yes | yes | referral / external | TBC | TBC | TBC | recruited | `evidence/interviews/session-04-pp-b02.md` | `evidence/interviews/batch-02-sessions-04-06.md` | — | — | no |
| PP-I02 | Batch 02 | invest-first | early-career | yes | yes | referral | TBC | TBC | TBC | recruited | `evidence/interviews/session-05-pp-i02.md` | `evidence/interviews/batch-02-sessions-04-06.md` | — | — | no |
| PP-M02 | Batch 02 | mixed | early-career | yes | yes | referral | TBC | TBC | TBC | recruited | `evidence/interviews/session-06-pp-m02.md` | `evidence/interviews/batch-02-sessions-04-06.md` | — | — | no |
| PP-B03 | Batch 03 | budget-first | student or early-career | yes | maybe | external | TBC | TBC | TBC | recruited | `evidence/interviews/session-07-pp-b03.md` | `evidence/interviews/batch-03-sessions-07-09.md` | — | — | no |
| PP-I03 | Batch 03 | invest-first | mixed | yes | maybe | community | TBC | TBC | TBC | recruited | `evidence/interviews/session-08-pp-i03.md` | `evidence/interviews/batch-03-sessions-07-09.md` | — | — | no |
| PP-M03 | Batch 03 | mixed | mixed | yes | yes | second-degree referral | TBC | TBC | TBC | recruited | `evidence/interviews/session-09-pp-m03.md` | `evidence/interviews/batch-03-sessions-07-09.md` | — | — | no |
| PP-B04 | Batch 04 | budget-first | mixed | no or light | no or maybe | founder network cap slot | TBC | TBC | TBC | recruited | `evidence/interviews/session-10-pp-b04.md` | `evidence/interviews/batch-04-sessions-10-12.md` | — | — | no |
| PP-I04 | Batch 04 | invest-first | early-career | yes | yes | referral / external | TBC | TBC | TBC | recruited | `evidence/interviews/session-11-pp-i04.md` | `evidence/interviews/batch-04-sessions-10-12.md` | — | — | no |
| PP-M04 | Batch 04 | mixed | mixed | no or light | maybe | founder network cap slot | TBC | TBC | TBC | recruited | `evidence/interviews/session-12-pp-m04.md` | `evidence/interviews/batch-04-sessions-10-12.md` | — | — | no |

### Table use rules
- `Current participant alias` stays `TBC` until a real candidate is assigned offline and approved for this slot.
- `Screener rationale` should be a one-sentence why-this-slot explanation before any row moves to `scheduled`.
- `Source used` must record the actual source once known so source-cap drift is visible early.
- `Target session note` is pre-created as a deterministic filename so same-day note hygiene does not depend on memory.

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

### Source-mix coverage
- **Founder / family / close-friend slots used:** 0 / maximum 4
- **Second-degree referrals used:** 0 / minimum 3 target
- **External / community recruits used:** 0 / minimum 3 target
- **Batch 01 non-founder-network slots locked:** 0 / minimum 1 required before scheduling is considered healthy

### Batch coverage
- **Batch 01 (PP-B01, PP-I01, PP-M01):** intake sheet ready, deterministic note files prepared, participants unassigned
- **Batch 02 (PP-B02, PP-I02, PP-M02):** not started
- **Batch 03 (PP-B03, PP-I03, PP-M03):** not started
- **Batch 04 (PP-B04, PP-I04, PP-M04):** not started

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
2. The cohort is still unassigned at the participant level, even though the slot design, batch structure, and note filenames are now locked.
3. The re-decision dashboard still has zero evidence behind its interview section.
4. Recruiting and scheduling discipline must follow `docs/alpha-readiness/interview-recruitment-and-scheduling-runbook.md` and `docs/alpha-readiness/interview-recruiting-outreach-pack.md` so the first batch does not drift into convenience sampling or sloppy alias handling.

### Next actions
- [ ] source and screen Batch 01 candidates offline using `docs/alpha-readiness/interview-recruiting-outreach-pack.md`
- [ ] assign real participants into Batch 01 slots `PP-B01`, `PP-I01`, and `PP-M01` using `docs/alpha-readiness/interview-batch-01-assignment-board.md`
- [ ] record source + screener rationale in the tracker before marking any Batch 01 row `scheduled`
- [ ] ensure Batch 01 contains at least one non-founder-network recruit before locking times
- [ ] pre-create the three Batch 01 session note files from the deterministic filenames above before the calls happen
- [ ] complete sessions 01-03 and publish the first batch synthesis
- [ ] keep the threshold scoreboard sourced only from linked notes
- [ ] use the same tracker in every re-decision prep so the interview blocker cannot be softened by narrative
