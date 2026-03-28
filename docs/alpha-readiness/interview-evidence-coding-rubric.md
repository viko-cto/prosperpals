# ProsperPals Interview Evidence Coding Rubric

Use this file to turn raw session notes into **defensible threshold math** for the current BMAD step:

**`alpha-readiness / interview-evidence-and-hosted-hardening-execution`**

It does **not** soften the hosted-alpha **NO-GO**.

It exists because the repo already had:
- a fixed 12-slot cohort design,
- recruiting and scheduling rules,
- deterministic session and batch note files,
- and explicit pass/fail thresholds,

but it still lacked one shared rule set for how a facilitator converts a messy real conversation into a counted result **without hand-waving**.

Without this rubric, the likely failure modes were obvious:
- threshold math drifting from quotes into memory,
- two note takers scoring the same session differently,
- borderline reactions getting rounded up because the batch “felt good,”
- and final GO / NO-GO discussions turning into narrative instead of sourced evidence.

---

## 1. Operating principle

> If a threshold result cannot be traced to a quote, an observed behavior, or a clearly documented facilitator judgement in the same session note, it does not count.

The purpose of this rubric is not to make research feel academic.

The purpose is to stop ProsperPals from claiming interview evidence it has not actually earned.

---

## 2. Minimum note quality gate

Before scoring any session, confirm the session note contains all of the following:

- participant alias and slot id
- archetype + life-stage judgement
- first-30-seconds reaction
- Goldie notes
- Fin notes
- Goldie -> Fin handoff notes
- Daily Spending Power reaction
- ProsperCoins reaction
- trust-drop moment
- return-intent section
- at least **2 direct quotes** or quote-quality paraphrases clearly marked as such

If 2 or more items are missing:
- do **not** update threshold math,
- keep the tracker row out of `logged`,
- and either repair the note the same day or mark the session as low-quality / potentially excluded.

---

## 3. Scoring workflow after each interview

Use this order every time:

1. finish the raw session note first
2. capture the strongest supporting quote and strongest caution quote
3. score each threshold using the decision rules below
4. write one evidence snippet beside each scored row
5. update the canonical tracker only after the note is scoreable
6. update the batch synthesis from the scored notes, not from memory

### Same-day rule
If scoring slips to a later day, mark that as an evidence-process miss in the next batch synthesis.

---

## 4. Session-level coding scale

Use these values when the session template asks for a result:

- **pass** = threshold condition clearly met
- **fail** = threshold condition clearly not met
- **yes** = negative condition clearly present
- **no** = negative condition clearly absent
- **borderline** = do not count yet; keep in session note until clarified or resolved in synthesis

### Counting rule
For the canonical tracker and final scorecard:
- `pass` counts toward the positive numerator
- `fail` does not count
- `yes` counts toward the negative numerator
- `no` does not count toward the negative numerator
- `borderline` should be resolved in the same-day note if possible; if not, treat it conservatively as **not passed** until the evidence is clearer

Do not turn `borderline` into `pass` because the batch needs a better number.

---

## 5. Threshold-by-threshold decision rules

### A. Goldie vs Fin understood without heavy prompting
**Pass when:**
- the participant can explain Goldie and Fin as meaningfully different roles,
- and does so without the facilitator having to fully restate both roles first.

**Typical pass signals:**
- Goldie is described as day-to-day spending / money awareness / budgeting help
- Fin is described as learning, investing, or future-building help
- the participant can explain the difference in their own words

**Fail when:**
- the participant keeps merging Goldie and Fin into one vague “AI money helper”
- or only gives the correct distinction after a strong facilitator rescue
- or still appears unsure after clarification

**Do not pass if:**
- the participant is merely repeating the facilitator’s phrasing back verbatim after coaching.

### B. Daily Spending Power seen as useful or promising
**Pass when:**
- the participant says it is useful now,
- or says they would likely use it with minor expected improvements,
- or clearly reacts as if it solves a real budgeting / control problem.

**Fail when:**
- it is described as decorative, obvious, fake, anxiety-inducing without value, or not relevant
- or the participant cannot explain why they would look at it again

**Borderline example:**
- “Maybe useful, but only if it gets more accurate later.”
This is not an automatic pass; capture the quote and decide conservatively.

### C. Fin interpreted as learning-oriented
**Pass when:**
- the participant frames Fin as a learning tool, practice space, or education-first investing surface
- and does not primarily frame it as gambling, fake flexing, or covert advice

**Fail when:**
- Fin is mostly interpreted as fake trading fluff, hype, or advice disguised as education
- or the participant cannot tell whether the product is teaching or steering them

### D. ProsperCoins positive or neutral
**Pass when:**
- the participant reaction is motivating, acceptable, playful-but-fine, or indifferent in a non-damaging way

**Fail when:**
- the reaction is materially negative even if not fully severe
- or the participant associates ProsperCoins with manipulation, cringe, childishness, or scamminess strongly enough that it weakens product trust

**Important:**
A merely polite reaction is not automatically positive.
If the participant visibly disengages or qualifies the reaction with distrust, score conservatively.

### E. Childish / scammy / too game-like reaction
**Yes when:**
- the participant explicitly uses those terms or a close equivalent,
- or clearly communicates that the product feels immature, manipulative, gimmicky, casino-like, or untrustworthy because of the gamified layer.

**No when:**
- the participant may dislike a detail but does not frame the overall product that way.

**Closeness rule:**
Phrases like “this feels a bit like a game for kids,” “kinda scammy,” “too gimmicky,” or “I wouldn’t trust this with real money because it feels fake” should count as **yes**.

### F. Severe unresolved trust issue present
**Yes when:**
- the participant expresses a trust concern with **severe** impact,
- and the current product explanation or flow does not resolve it well enough within the session.

Examples:
- clear fear the app is secretly giving advice
- clear refusal to use it due to data misuse concerns
- clear refusal due to receipt ambiguity or transaction honesty concerns
- any reaction that should pause recruitment until reviewed

**No when:**
- concerns are mild or moderate,
- or the participant raises a real concern but the session evidence suggests the current flow already resolves it sufficiently.

**Conservative rule:**
If the facilitator writes `severity = severe`, the threshold should rarely remain `no` unless there is explicit evidence of resolution.

---

## 6. Evidence-snippet rules

Each scored threshold row should include at least one of:
- a direct quote,
- a near-direct paraphrase marked as paraphrase,
- a concrete observed behavior,
- or a tightly scoped facilitator judgement tied to a moment in the note.

Good evidence snippets:
- “Goldie is like the daily money coach and Fin is for learning what happens if I invest.”
- “I’d actually check this tomorrow to see how much I can still spend.”
- Participant kept calling Fin “fake trading” after clarification.
- Participant paused at receipt review and said “I don’t know what you’re saving here.”

Weak evidence snippets:
- “seemed to get it”
- “positive overall”
- “not too worried”
- “probably useful”

If the evidence snippet is weak, the score is weak.

---

## 7. Batch synthesis rules

When writing the batch synthesis:
- aggregate from scored session notes only
- call out any threshold row that depended on borderline judgement
- surface disagreements between archetypes instead of averaging them away
- record whether any score changed after same-day note cleanup

### Batch caution rule
If two or more sessions in a batch rely on low-confidence scoring for the same threshold, note that the threshold is **still fragile** even if the raw count looks acceptable.

---

## 8. Final synthesis rules

The final synthesis should:
- cite session ids or batch files for every threshold conclusion
- separate "working wedge" evidence from "still fragile" evidence
- explicitly list any borderline scoring decisions that materially affected the final recommendation

If the threshold scoreboard looks passable only because multiple borderline sessions were rounded up, the final decision should remain **NO-GO** or at best **CONDITIONAL GO** with that fragility called out.

---

## 9. Suggested session-level coding block

Use this structure inside each session note after the threshold section:

| Threshold | Result | Evidence quote / behavior | Confidence |
| --- | --- | --- | --- |
| Goldie vs Fin understood without heavy prompting | pass / fail / borderline |  | high / medium / low |
| Daily Spending Power useful or promising | pass / fail / borderline |  | high / medium / low |
| Fin interpreted as learning-oriented | pass / fail / borderline |  | high / medium / low |
| ProsperCoins positive or neutral | pass / fail / borderline |  | high / medium / low |
| Childish / scammy / too game-like reaction | yes / no / borderline |  | high / medium / low |
| Severe unresolved trust issue present | yes / no / borderline |  | high / medium / low |

This is the minimum structure required to make later aggregation honest.

---

## 10. Immediate next actions

- [ ] use this rubric for the first real Batch 01 session instead of freeform threshold scoring
- [ ] update the pre-created session note files so the evidence-snippet table is already present
- [ ] update the tracker only after the session note is scored with evidence
- [ ] cite session ids in the first batch synthesis instead of summarizing from memory

---

## 11. Outcome

ProsperPals now has an explicit **note-to-threshold evidence contract** for the interview lane.

That is a real alpha-readiness step because it reduces a live blocker:
- the team can no longer claim interview progress from vibes alone,
- threshold math can now be traced back to session evidence,
- and the eventual GO / CONDITIONAL GO / NO-GO review has a tighter proof standard.

The hosted-alpha **NO-GO remains locked** because this improves evidence quality, not evidence volume.
