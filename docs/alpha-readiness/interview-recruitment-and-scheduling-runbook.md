# ProsperPals Interview Recruitment and Scheduling Runbook

Use this file to move the interview lane from "we know the cohort shape" to "we can fill it without drifting into convenience sampling or note chaos."

This artifact supports the current BMAD step:

**`alpha-readiness / interview-evidence-and-hosted-hardening-execution`**

It does **not** soften the hosted-alpha **NO-GO**.

It gives the team a disciplined way to recruit, slot, schedule, confirm, and log the 12 required sessions so the interview blocker can be closed with actual evidence instead of founder optimism.

---

## 1. Why this exists

The repo already had:
- a canonical tracker,
- a fixed 12-slot cohort design,
- a screener,
- session/batch/final synthesis templates,
- and threshold math.

What was still missing was the operating layer between "good plan" and "real sessions on the calendar."

Without that layer, the likely failure modes were predictable:
1. filling the earliest slots with whoever says yes first,
2. losing source diversity because founder-network replies are faster,
3. scheduling sessions before screener fit is recorded,
4. letting completed calls sit without same-day notes,
5. and drifting into batch imbalance that later gets narrated as insight.

This runbook exists to make those failure modes visible early.

---

## 2. Elicitation methods applied

### Cross-Functional War Room
Used to align founder recruiting reality, design-learning needs, ops discipline, and evidence quality into one workflow instead of four separate assumptions.

### Pre-mortem
Used to design against the most likely interview-lane failure: a fast but weak cohort that produces plenty of calls and almost no trustworthy alpha signal.

### Critique and Refine
Used to trim vague recruiting advice and replace it with specific slot assignment, scheduling SLAs, source caps, and stop rules.

---

## 3. Operating principle

> A conversation only improves alpha-readiness if the participant fit is documented, the session is slotted intentionally, the note lands the same day, and the synthesis chain stays intact.

Anything else may still be interesting, but it does not count toward clearing the interview blocker.

---

## 4. Canonical workflow

Use this sequence for every participant.

### Stage 1 — Source candidate
Record candidate offline first, then map them to one of these recruiting buckets:
- direct founder/family/friend network,
- second-degree referral,
- external community / student / young professional group.

### Stage 2 — Screen candidate
Before any scheduling message is sent, answer the screener from:
- `docs/alpha-readiness/interview-cohort-plan-and-screener.md`

Required outputs:
- slot candidate,
- archetype hypothesis,
- digital-payments fit,
- hosted-alpha fit,
- one-sentence fit rationale.

### Stage 3 — Reserve slot
Update:
- `docs/alpha-readiness/interview-evidence-tracker.md`

A candidate may move from `recruited` to `scheduled` only when:
- a slot is assigned,
- the source is recorded,
- the screener fit rationale is written,
- and the batch implications still look balanced.

### Stage 4 — Schedule session
Schedule with a specific batch in mind.
Do **not** schedule in a way that creates three near-identical users in one batch just because their calendars were convenient.

### Stage 5 — Confirm and prep
Before the call:
- confirm time,
- confirm language/context suitability,
- confirm the participant still fits the assigned slot,
- create the target session-note filename in advance,
- and note the intended batch.

### Stage 6 — Run session
Immediately after the call:
- mark `completed-awaiting-notes`,
- capture strongest quote and trust-drop moment,
- then create the same-day session log.

### Stage 7 — Lock evidence
A session only becomes `logged` when the note exists in:
- `docs/alpha-readiness/evidence/interviews/`

A session only becomes `batched` when the relevant batch synthesis exists.

---

## 5. Batch-shaping rules

Use the canonical batch design from the cohort plan, but enforce these operational checks before confirming each batch.

### Batch composition guardrails
Every batch of three should contain:
- at least one user with strong daily digital-payment behavior,
- at least one user who looks plausible for hosted-alpha follow-up,
- and at least two different recruiting sources when possible.

### Avoid these batch mistakes
Do not allow a batch to become:
- all founder-network recruits,
- all budget-first,
- all invest-first,
- all highly polished fintech enthusiasts,
- or all borderline-fit users.

### Batch closure rule
A batch is not closed until:
- all 3 session notes exist,
- the batch synthesis exists,
- threshold deltas are updated from notes,
- and any exclusion is recorded explicitly.

---

## 6. Recruiting source caps

These caps exist to keep the evidence credible.

### Whole-cohort caps
Across 12 slots:
- **max 4** direct founder/family/friend recruits,
- **min 3** second-degree referrals,
- **min 3** external-community recruits,
- **min 2** users with clear return-for-alpha potential.

### Early-wave protection
Before Batch 01 is complete:
- no more than **1** founder-network recruit should be scheduled unless other sources are failing,
- and at least **1** external or second-degree recruit should be in the first batch.

Reason: early signals shape the product language too much to let them come only from polite insiders.

---

## 7. Scheduling SLAs

### Same-day evidence SLA
If a session happens today, the session log should land today.

If that fails:
- mark the slot as a process miss,
- do not count it toward threshold math until the note exists,
- and flag the delay in the next batch synthesis.

### 24-hour synthesis SLA
Once the third session in a batch is logged, the batch synthesis should be created within 24 hours.

### Recontact SLA
If a strong hosted-alpha-fit participant finishes well, mark whether a second touchpoint should happen within 7 days.
This is not to start alpha early; it is to preserve a plausible follow-up pool.

---

## 8. Session readiness checklist

Before each interview, verify:
- [ ] assigned slot ID exists
- [ ] source recorded in tracker
- [ ] archetype hypothesis recorded
- [ ] digital-payments fit recorded
- [ ] hosted-alpha fit recorded
- [ ] one-sentence fit rationale written
- [ ] target session note filename prepared
- [ ] intended batch known
- [ ] facilitator knows which wedge/risk this slot is meant to test

If 2 or more checklist items are missing, reschedule rather than run a low-quality session.

---

## 9. Exclusion rules

A session can be excluded when:
- the participant turned out clearly off-target,
- the facilitator drifted too far from the intended flow,
- the note quality is too weak to support threshold scoring,
- or the participant was so primed that the reactions are not trustworthy.

When excluding a session:
- keep the note,
- mark the tracker status `excluded`,
- write the exclusion reason,
- and open a replacement slot instead of quietly shrinking the evidence bar.

---

## 10. Interview-lane stop rules

Pause new scheduling and review the lane if any of the following occur:
- 2 sessions in a row miss same-day notes,
- Batch 01 ends with lopsided source mix,
- 2 or more participants in a batch still cannot explain Goldie vs Fin after reasonable clarification,
- 2 or more participants call ProsperCoins childish, scammy, or manipulative,
- trust-drop moments cluster around receipt handling or product honesty,
- or hosted-alpha-fit users consistently say they would not come back.

These are not small research wrinkles. They are evidence-quality or wedge-quality warnings.

---

## 11. Minimal operating dashboard

Use the tracker as the source of truth, but review these five counts before every recruiting push:
- scheduled this week,
- logged same day,
- founder-network slots used,
- external / referral slots still open,
- hosted-alpha-plausible users already identified.

If the numbers are unclear, the next move is tracker hygiene — not more outreach.

---

## 12. Immediate next actions

- [ ] assign real candidate names/aliases to Batch 01 slots: `PP-B01`, `PP-I01`, `PP-M01`
- [ ] capture source + screener rationale for each before marking any of them `scheduled`
- [ ] ensure Batch 01 contains at least one non-founder-network recruit
- [ ] pre-create the three target session-note filenames before the calls happen
- [ ] publish Batch 01 synthesis within 24 hours of the third logged session

---

## 13. Outcome

ProsperPals now has an interview execution layer, not just an interview ambition.

The lane still has **zero completed sessions**, so the hosted-alpha **NO-GO remains locked**.

But the blocker is now narrower and more operational: the team has a concrete way to recruit, balance, schedule, and evidence the 12-session cohort without convenience-sample drift or note decay.