# ProsperPals Interview Session Facilitation and Closeout Checklist

Use this checklist during the current BMAD step:

**`alpha-readiness / interview-evidence-and-hosted-hardening-execution`**

It exists to prevent a very boring but very dangerous failure mode:
- the team books real calls,
- gets decent conversation,
- and still fails to produce decision-grade evidence because note quality, quote capture, scoring, and tracker handoff drift.

This checklist does **not** soften the hosted-alpha **NO-GO**.
It simply makes the first real interview wave easier to run honestly.

---

## 1. Elicitation methods applied

### First Principles
Used to reduce "run an interview well" into the minimum evidence moves required for a counted session: right participant, right contrast, right quotes, right scoring, right same-day handoff.

### Pre-mortem
Used to design against the most likely Batch 01 failures: facilitator over-explaining Goldie vs Fin, missing the first trust-drop moment, forgetting to capture direct quotes, and updating the tracker from memory later.

### Critique & Refine
Used to keep the checklist operational rather than bloated. If an item does not improve evidence quality or threshold defensibility, it does not belong here.

---

## 2. What counts as a successful session

A session is only successful for this alpha-readiness lane when all of the following are true:
- the participant is still a fit for the assigned slot,
- the note captures the first reaction and the first trust-drop moment,
- at least **2 direct quotes** or clearly marked quote-quality paraphrases are recorded,
- the threshold table is scored using `docs/alpha-readiness/interview-evidence-coding-rubric.md`,
- the facilitator records one strongest support signal and one strongest caution signal,
- and the canonical tracker can be updated from the note without guessing.

If the conversation happened but these things did not, the session may still be real — but it is not yet clean evidence.

---

## 3. Before the call

### Participant and slot check
- [ ] confirm the participant alias matches the intended slot (`PP-B01`, `PP-I01`, etc.)
- [ ] confirm source bucket is known and acceptable for batch mix
- [ ] confirm the session note file already exists and is the correct deterministic filename
- [ ] confirm the participant still appears to fit the assigned archetype well enough to learn from the slot
- [ ] confirm the facilitator knows which evidence goal matters most for this slot

### Evidence-prep check
- [ ] session template is open before the call starts
- [ ] threshold scoring rubric is open or easily reachable
- [ ] one note taker is explicitly responsible for quote capture
- [ ] one person is explicitly responsible for same-day tracker handoff
- [ ] time is reserved after the session for scoring and cleanup on the same day

### Facilitator guardrails
- [ ] do not explain Goldie and Fin too early; let the participant reveal confusion first
- [ ] do not defend ProsperCoins immediately after a weak reaction; capture the real reaction first
- [ ] do not rescue trust interpretation too fast; identify the first trust-drop moment first
- [ ] do not improvise policy claims around advice, data handling, export, or deletion beyond what the product and runbooks actually support

---

## 4. During the call

### Capture these moments no matter what
- [ ] first-30-seconds interpretation of what ProsperPals is
- [ ] first confusion about Goldie vs Fin, if it appears
- [ ] first reaction to Daily Spending Power
- [ ] first reaction to ProsperCoins
- [ ] first concern about receipt handling or data use
- [ ] first trust-drop moment
- [ ] explicit return-intent statement

### Quote discipline
- [ ] capture at least 2 direct quotes or quote-quality paraphrases
- [ ] capture 1 strongest supportive quote
- [ ] capture 1 strongest caution quote
- [ ] mark paraphrases clearly if they are not verbatim

### Facilitator restraint rules
- [ ] do not count a participant as understanding Goldie vs Fin if they only repeat the facilitator's explanation back
- [ ] do not round a polite ProsperCoins reaction up to positive if the tone suggests discomfort
- [ ] do not treat a vague "maybe useful" Daily Spending Power comment as a pass without concrete why
- [ ] do not bury a severe trust issue inside general positive notes

---

## 5. Immediately after the call

### Minimum note quality gate
Before anyone leaves the note, confirm it contains:
- [ ] participant alias and slot id
- [ ] archetype + life-stage judgement
- [ ] first-30-seconds reaction
- [ ] Goldie notes
- [ ] Fin notes
- [ ] Goldie -> Fin handoff notes
- [ ] Daily Spending Power reaction
- [ ] ProsperCoins reaction
- [ ] trust-drop moment
- [ ] return-intent section
- [ ] at least 2 direct quotes or quote-quality paraphrases

If 2 or more are missing:
- do **not** update threshold math yet,
- do **not** call the session `logged`,
- and fix the note the same day if possible.

### Threshold scoring closeout
- [ ] score the six threshold rows using `docs/alpha-readiness/interview-evidence-coding-rubric.md`
- [ ] include one evidence snippet per row
- [ ] keep borderline rows conservative instead of rounding up
- [ ] record confidence per row
- [ ] identify one strongest support signal
- [ ] identify one strongest caution signal

---

## 6. Tracker and batch handoff

### Canonical tracker handoff
Update `docs/alpha-readiness/interview-evidence-tracker.md` only after the note is scoreable.

- [ ] set status appropriately (`completed-awaiting-notes`, `logged`, or `excluded`)
- [ ] confirm the session counts toward threshold math only if the note is fully logged
- [ ] update source used if it changed from planned source
- [ ] record key outcome and trust risk in plain language
- [ ] update coverage summary only from the scored note
- [ ] update threshold scoreboard only from evidence-backed rows

### Batch synthesis handoff
- [ ] if this is the third session in a batch, update the relevant batch synthesis file the same day
- [ ] record any threshold row that felt fragile or depended on borderline judgement
- [ ] record any wording or trust fix that should happen before the next batch
- [ ] pause scheduling if a severe unresolved trust issue should trigger a stop rule

---

## 7. Red flags that should block a "logged" status

Do **not** mark a session as `logged` if any of the following are true:
- the note mostly reflects facilitator summary instead of participant language
- Goldie vs Fin understanding is inferred rather than evidenced
- ProsperCoins reaction is described as "fine" or "okay" with no supporting quote
- the first trust-drop moment is missing
- severe trust concern is present but unresolved and not scored clearly
- the tracker would need guesswork to update source, outcome, or threshold counts

In those cases the note is still salvageable — but not yet decision-grade.

---

## 8. Slot-specific prompts for Batch 01

### PP-B01
Primary evidence question:
> does manual logging + Daily Spending Power feel useful enough to overcome beginner skepticism quickly?

### PP-I01
Primary evidence question:
> does Fin read as learning-oriented rather than fake-trading fluff for an investing-curious participant?

### PP-M01
Primary evidence question:
> does the Goldie -> Fin handoff feel coherent without heavy facilitator rescue for a hybrid participant?

Use these as emphasis prompts, not as scripts to force the answer.

---

## 9. Immediate next actions

- [ ] use this checklist in the first real Batch 01 session
- [ ] keep it open beside the prepared session file during the call
- [ ] update the tracker from the note, not from memory after the fact
- [ ] update the first batch synthesis the same day session 03 is completed

---

## 10. Outcome

ProsperPals now has a concrete **interview-execution closeout checklist** bridging the gap between "we prepared the docs" and "we can reliably convert live conversations into threshold-grade evidence."

That is a real alpha-readiness move because the main interview blocker is no longer design ambiguity — it is execution hygiene.

The hosted-alpha **NO-GO remains locked** until real sessions and hosted proof land.
