# ProsperPals Interview Evidence Closeout and Threshold Update Runbook

Use this file to move a real interview from **"call completed"** to **decision-grade evidence** without losing rigor or inventing progress.

This artifact supports the current BMAD step:

**`alpha-readiness / interview-evidence-and-hosted-hardening-execution`**

It does **not** soften the hosted-alpha **NO-GO**.

It exists because the repo already had the right raw ingredients:
- deterministic session note files,
- a coding rubric,
- a canonical tracker,
- batch and final synthesis templates,
- and a re-decision dashboard surface,

but it still lacked one explicit operational contract for the **same-day closeout chain**.

Without that chain, the likely failure modes are boring and dangerous:
- a call happens but the note lands half-finished,
- threshold scores get updated from memory later,
- the tracker shows movement before the evidence is actually scoreable,
- batch synthesis lags until important nuance is forgotten,
- and the re-decision memo inherits confidence the underlying notes did not earn.

---

## 1. Elicitation methods applied

### First Principles
Used to reduce interview closeout to its minimum trustworthy unit: one session only counts when the note is evidence-complete, the tracker update is sourced, and the threshold math can be defended.

### Pre-mortem
Used to design against the most likely execution failure: ProsperPals looks like it is learning fast because calls happened, while the evidence chain is actually broken by stale notes, rounded-up borderline scores, or tracker-first optimism.

### Cross-Functional War Room
Used to align facilitator behavior, design-learning capture, founder decision needs, and BMAD evidence discipline into one same-day workflow instead of four disconnected habits.

---

## 2. Operating principle

> A completed call is not progress. A scoreable note with sourced tracker math is progress.

This runbook exists to stop the interview lane from claiming traction before the repo contains defensible evidence.

---

## 3. The closeout chain

Every real interview should move through this exact sequence on the **same day**:

1. **Raw note completion**
2. **Minimum note quality gate**
3. **Threshold scoring using the rubric**
4. **Tracker update from the scored note**
5. **Batch synthesis update or queue decision**
6. **Re-decision dashboard delta capture if the session changes a visible threshold or blocker posture**

If the chain stops at step 2 or 3, the session is still operationally useful — but it does **not** yet count toward clearing the NO-GO.

---

## 4. Same-day closeout SLA

### Required same-day outputs
By end of day for each completed interview:
- the matching session note exists and is materially complete,
- the threshold table is scored with evidence snippets and confidence,
- the canonical tracker row is updated from that scored note,
- and the batch owner knows whether synthesis can be updated now or must wait for the remaining sessions.

### Process-miss rule
Treat the closeout as a process miss when any of the following are true:
- the call happened but the note is still skeletal,
- the note exists but threshold rows are blank,
- tracker counts changed before threshold evidence was added,
- or the session is being verbally used in decisions before the note is scoreable.

Process misses should be called out in the next batch synthesis rather than quietly ignored.

---

## 5. Step-by-step closeout workflow

### Step 1 — Finish the raw session note
Use:
- `docs/alpha-readiness/interview-session-log-template.md`

Confirm the note captures at minimum:
- first 30 seconds reaction,
- onboarding reaction,
- first-value / Daily Spending Power reaction,
- Goldie notes,
- Fin notes,
- Goldie -> Fin handoff notes,
- ProsperCoins reaction,
- receipt-review reaction,
- trust-drop moment,
- return intent,
- and at least 2 direct quotes or quote-quality paraphrases.

### Step 2 — Run the minimum note quality gate
Use:
- `docs/alpha-readiness/interview-evidence-coding-rubric.md`

If 2 or more required elements are missing:
- do **not** update threshold math,
- leave the tracker out of `logged`,
- and either repair the note same day or mark the session as low-quality / exclusion-risk.

### Step 3 — Score the session conservatively
Score each threshold directly in the session note using the rubric.

Rules:
- `pass` counts only when the evidence clearly supports it,
- `borderline` is **not** a hidden pass,
- negative conditions (`childish/scammy/game-like`, `severe unresolved trust issue`) should be scored conservatively,
- and any threshold without a concrete evidence snippet stays unresolved.

### Step 4 — Capture the two most important proof fragments
Before touching the tracker, write these in the session note:
- **strongest support signal** — the quote or behavior most supportive of the wedge,
- **strongest caution signal** — the quote or behavior most likely to weaken GO confidence.

If the session lacks either, the note is probably still too vague.

### Step 5 — Update the canonical tracker from the note
Use:
- `docs/alpha-readiness/interview-evidence-tracker.md`

Update only what the note now proves:
- session status,
- participant alias,
- source used,
- key outcome,
- trust risk,
- counts-toward-threshold value,
- coverage summary deltas,
- and threshold scoreboard deltas.

**Critical rule:** do not update the threshold scoreboard first and promise to fill evidence later.

### Step 6 — Decide the batch-synthesis action
Use:
- `docs/alpha-readiness/interview-batch-synthesis-template.md`

After every logged session, mark one of these states privately or in the batch file:
- **queued** — fewer than 3 notes are logged in this batch,
- **ready** — the third session note is logged and synthesis should be completed within 24 hours,
- **blocked** — one or more notes are too weak to synthesize honestly.

### Step 7 — Capture re-decision-visible deltas
Use:
- `docs/alpha-readiness/redecision-dashboard-inputs.md`

Update the dashboard only if the session changes a founder-visible status such as:
- a threshold moving materially toward or away from pass,
- the first severe unresolved trust reaction,
- a repeated Goldie/Fin confusion pattern,
- or a credible hosted-alpha follow-up pattern emerging.

Do **not** rewrite the dashboard for cosmetic movement.

---

## 6. Tracker update rules by field

### Status field
- `completed-awaiting-notes` = call happened, note not yet decision-grade
- `logged` = note is decision-grade and threshold table is scored
- `batched` = note is logged and included in a completed batch synthesis
- `excluded` = call happened but should not count toward threshold math

### Key outcome field
Write the highest-signal conclusion from the note, not a generic mood.

Good examples:
- `Daily Spending Power felt immediately useful; Goldie/Fin distinction held without rescue`
- `Fin read as fake trading after clarification; ProsperCoins stayed neutral`
- `Receipt-review wording triggered unresolved trust concern`

Weak examples:
- `overall positive`
- `good session`
- `interesting feedback`

### Trust risk field
Use it to capture the sharpest unresolved concern from the note.
If there is no meaningful risk, write `none surfaced in session` rather than leaving it blank.

### Counts toward threshold field
Set to `yes` only when:
- the session note is complete,
- threshold rows are scored,
- and the participant is not excluded.

---

## 7. Threshold update rules

### Positive thresholds
For:
- Goldie vs Fin understood without heavy prompting
- Daily Spending Power useful/promising
- Fin interpreted as learning-oriented
- ProsperCoins positive or neutral

Only increment the running result when the corresponding session row is `pass`.

### Negative thresholds
For:
- childish / scammy / too game-like
- severe unresolved trust issue present

Only increment the running result when the corresponding session row is `yes`.

### Borderline handling
When a session stays `borderline`:
- keep the session note scored as `borderline`,
- do not increment the tracker count,
- call out the ambiguity in the next batch synthesis,
- and avoid converting it into a pass just because the batch needs momentum.

---

## 8. Exclusion handling

A completed session may still be excluded when:
- the participant was clearly off-target,
- the note quality is too weak to support scoring,
- the facilitator drifted too far from the intended flow,
- or the participant was too primed for the result to be trusted.

When excluding a session:
1. keep the session note,
2. update the tracker status to `excluded`,
3. document the exclusion reason in the note and tracker,
4. leave threshold math unchanged,
5. and open the replacement need explicitly instead of shrinking the evidence bar.

---

## 9. Batch synthesis trigger rules

### Trigger to write synthesis
A batch synthesis becomes due when:
- all 3 sessions in the batch are `logged`,
- or a severe trust issue suggests pausing before the batch is complete.

### What must be sourced
The batch synthesis should reference:
- session ids,
- threshold rows,
- strongest support and caution signals,
- and any batch-level pattern that changed the recommended next move.

### What must not happen
Do **not** write a batch synthesis from memory after a verbal debrief if the notes are still incomplete.

---

## 10. Re-decision dashboard update rules

The dashboard is a roll-up surface, not a substitute for evidence.

Update it only when one of these becomes true:
- the first session is logged,
- a threshold numerator changes,
- a batch synthesis lands,
- a severe unresolved trust issue appears,
- or a recommendation-level change becomes supportable.

Each dashboard update should point back to:
- the session note(s),
- the batch synthesis if available,
- and the tracker state.

If a dashboard sentence cannot be linked back to those artifacts, it is probably narrative inflation.

---

## 11. Fast closeout checklist

Use this right after every session.

- [ ] session note completed beyond skeletal bullets
- [ ] minimum note quality gate passed
- [ ] threshold table scored with evidence snippets and confidence
- [ ] strongest support signal captured
- [ ] strongest caution signal captured
- [ ] tracker row updated from note
- [ ] threshold scoreboard changed only where note evidence supports it
- [ ] batch state marked queued / ready / blocked
- [ ] dashboard delta reviewed for true founder-visible change
- [ ] any process miss recorded for later synthesis

If 2 or more boxes are unchecked by end of day, the session should not be treated as clean progress.

---

## 12. Immediate next actions

- [ ] use this runbook during the first real Batch 01 interview closeout
- [ ] keep the tracker at `completed-awaiting-notes` until the threshold table is truly scored
- [ ] update batch synthesis only from logged notes
- [ ] update the re-decision dashboard only when session evidence materially changes the recommendation surface

---

## 13. Outcome

ProsperPals now has the missing **same-day interview evidence closeout contract**.

That is a real BMAD chunk because it narrows a live alpha-readiness failure mode:
- calls can no longer quietly masquerade as evidence,
- tracker math is harder to inflate,
- batch synthesis has an explicit trigger,
- and founder-visible recommendation updates are now tied to actual notes instead of vibes.

The hosted-alpha **NO-GO remains locked** because this improves evidence discipline, not evidence volume.
