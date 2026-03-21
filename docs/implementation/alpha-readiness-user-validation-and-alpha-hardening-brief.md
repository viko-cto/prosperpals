# ProsperPals — User Validation and Alpha Hardening Brief

**Date:** 2026-03-21  
**Phase:** alpha-readiness  
**Step:** 2-user-validation-and-alpha-hardening-brief  
**Status:** complete

## Why this brief exists

The gap-close plan established what still blocks a credible ProsperPals alpha. This brief turns that diagnosis into an execution-ready plan.

The goal is not to keep polishing a demo in isolation. The goal is to prove, with real Denmark-first users and hosted trust rails, that ProsperPals deserves a small alpha cohort.

## Alpha recommendation in one sentence

Run a **small Denmark-first alpha for 18-26 year olds in Denmark**, using **manual + receipt-first money capture only**, with **no live bank connectivity**, after the team clears a short list of hosted trust-hardening gates and validates that users actually understand the Goldie → Fin learning loop.

## Working thesis to validate

ProsperPals wins early if it feels like:

1. **a calm money companion, not a budgeting lecture**,
2. **a learning tool, not fake trading theater**, and
3. **a trustworthy product, not a growth-hacked fintech skin**.

If Denmark-first alpha users do not feel those three things quickly, more feature work is noise.

---

## 1. Denmark-first alpha cohort definition

### Recommended cohort size
- **Validation interviews:** 12 total users
  - **6 budget-first users**
  - **6 invest-first users**
- **Hosted alpha cohort after interviews:** 8-10 users

This is intentionally small. The point is learning density, not vanity sample size.

### Inclusion criteria
Participants should:
- live in Denmark,
- be **18-26 years old**,
- use **MobilePay** or an equivalent daily digital payment flow,
- manage at least some of their own spending decisions,
- be comfortable using a mobile-first English product,
- represent one of the two current ProsperPals archetypes:
  - **budget-first:** wants control, less stress, clearer daily limits,
  - **invest-first:** curious about investing but not yet confident or disciplined.

### Exclusion criteria for the first alpha
Do **not** include in the first cohort:
- minors,
- users expecting real investment recommendations,
- users who need live bank syncing on day one,
- users who would treat the simulator as a serious brokerage substitute,
- users with low tolerance for early-product rough edges.

This keeps the first alpha inside the product’s current trust boundary.

### Denmark-first recruiting channels
Use warm and semi-warm channels before broad cold outreach:

1. **Nikolas design/student network**
   - Copenhagen-area friends, peers, student groups, recent grads.
2. **Founder/family network**
   - trusted intros to young adults who already manage their own spending.
3. **Local university / early-career communities**
   - CBS, KU, DTU, design/media/business student circles.
4. **Young professionals in Copenhagen**
   - first-job, first-apartment, first-real-budget users.

### Recruitment target mix
Aim for:
- **4-5 students**,
- **4-5 early-career workers**,
- **2 mixed-profile swing users** who are budget-conscious but also curious about investing.

That mix is better than overfitting to only students.

### Incentive recommendation
- Offer a simple **150-250 DKK gift card** or equivalent thank-you.
- Do **not** use cash-like in-product rewards as the research incentive.

This avoids muddying whether ProsperCoins feel motivating inside the product.

---

## 2. Validation questions that matter

The interviews should answer these questions before any Denmark-first alpha gets called credible.

### Core wedge questions
1. Does **Daily Spending Power** feel immediately useful or just decorative?
2. Do users understand why **Goldie** exists?
3. Do users understand why **Fin** exists, and why it is distinct from Goldie?
4. Does the **ProsperCoin** loop feel motivating, childish, or confusing?
5. Does the simulator feel like **learning** or like **fake wealth cosplay**?

### Trust questions
6. Do users believe the app is helping them learn, rather than quietly giving financial advice?
7. Do receipt review and explainability make the product feel safer?
8. What is the first moment where trust drops?
9. What data use assumption makes users uneasy?
10. Do users feel more comfortable with manual/receipt-first capture than with immediate bank linking?

### Denmark-first behavior questions
11. Does the current flow match how Danish young adults think about:
    - MobilePay,
    - card spending,
    - shared meals,
    - subscriptions,
    - “money left this week” vs traditional monthly budgeting?
12. Which everyday spending categories feel natural vs imported from US-style finance apps?

### Outcome questions
13. Would the user come back tomorrow?
14. What exact value would bring them back?
15. What feature should be cut because they do not care?

---

## 3. Two-stage validation plan

### Stage 1 — Moderated prototype/interview wave
**Goal:** identify whether the wedge is real before scaling the alpha.

**Format**
- 45-60 minute moderated sessions
- mobile-first walkthrough using the current build
- English by default, Danish framing available when helpful
- structured note capture in one shared template

**Tasks to observe**
1. Enter the product and explain what ProsperPals appears to be.
2. Complete onboarding preference selection.
3. Log spending / review first-value flow.
4. React to Goldie’s first insight.
5. Open the simulator and explain what Fin is for.
6. Review a receipt candidate.
7. Explain what data the product seems to keep and why.

**Required evidence captured per session**
- first impression in the first 30 seconds,
- aha moment or no aha,
- confusion points,
- trust concerns,
- willingness-to-return score (1-5),
- role clarity for Goldie vs Fin,
- ProsperCoin reaction,
- quote from the user that best captures the product’s perceived value.

### Stage 2 — Small hosted alpha
**Goal:** verify repeat behavior and trust durability outside interviews.

**Format**
- 8-10 users
- 10-14 day hosted alpha
- manual entry + receipt upload only
- support channel controlled by founders
- explicit weekly check-in touchpoint

**Alpha observation targets**
- repeat visits,
- repeated money logging,
- at least one return to simulator after first use,
- trust issues or confusion tickets,
- whether users voluntarily mention Daily Spending Power or Goldie insights as the reason they returned.

---

## 4. Trust-hardening priorities before opening the hosted alpha

These are the highest-value hardening moves. They should be treated as launch-gating work, not backlog garnish.

### Priority 0 — Hosted persistence for trust-critical state
**Why it matters:** a finance product cannot feel trustworthy if core truth depends on demo-state behavior.

**Must be true before alpha:**
- onboarding state persists per user,
- reward ledger persists durably,
- simulator trades persist durably,
- receipt candidates persist durably,
- support/audit traces survive redeploys.

**Owner:** implementation owner  
**Gate:** no critical path depends on local runtime file sinks.

### Priority 1 — Role boundaries and internal access control
**Why it matters:** operator/support visibility cannot remain prototype-soft once real users exist.

**Must be true before alpha:**
- explicit founder/operator roles,
- user vs support views separated,
- no shared soft access path to user financial artifacts,
- support actions logged with actor + timestamp,
- ability to disable operator features quickly.

**Owner:** implementation owner + Vadim for policy decisions  
**Gate:** support access is intentional, auditable, and least-privilege.

### Priority 2 — Real receipt upload + OCR lineage
**Why it matters:** receipt ingestion is the most trust-sensitive input path in the current wedge.

**Must be true before alpha:**
- real upload flow exists,
- stored asset metadata exists,
- OCR/provider response is traceable,
- candidate-first review remains mandatory,
- ambiguous or low-confidence parses never auto-post to canonical money state.

**Owner:** implementation owner  
**Gate:** user can see and correct receipt candidates before anything becomes truth.

### Priority 3 — Consent, deletion, and advice-boundary clarity
**Why it matters:** users need plain-language confidence that ProsperPals is educational and reversible.

**Must be true before alpha:**
- plain-language data-use copy,
- explicit “education, not financial advice” wording,
- visible explanation of simulator boundaries,
- basic export/delete support path,
- internal process for handling data deletion requests.

**Owner:** Vadim  
**Gate:** the team can explain data use, deletion, and non-advice boundaries without hedging.

### Priority 4 — Alpha analytics and release safety
**Why it matters:** if the team cannot see failures or revert safely, the alpha teaches the wrong lessons.

**Must be true before alpha:**
- event tracking for aha and return behavior,
- release-safety checks tied to deploy flow,
- issue triage path for alpha bugs,
- environment parity across preview and production-like alpha setup,
- one founder-visible dashboard or report for cohort health.

**Owner:** implementation owner + Nikolas for evidence review needs  
**Gate:** the team can detect breakage, confusion, and drop-off quickly.

---

## 5. What success looks like in user validation

These are the minimum evidence thresholds for calling the wedge promising.

### Stage 1 interview thresholds
Treat the interview wave as a **GO** only if:
- **>= 8 of 12 users** can explain the Goldie vs Fin distinction without coaching,
- **>= 8 of 12 users** say Daily Spending Power is useful or “something like this would help me,”
- **>= 7 of 12 users** interpret the simulator as a learning tool rather than fake-investing fluff,
- **>= 7 of 12 users** react positively or neutrally to ProsperCoins,
- **< 3 users** say the product feels childish, scammy, or too game-like,
- **0 unresolved severe trust reactions** remain around data use or hidden advice.

### Stage 2 hosted alpha thresholds
Treat the hosted alpha as a **GO** only if:
- **>= 6 of 8 users** or **>= 7 of 10 users** return at least twice after first use,
- **>= 60%** of users complete at least two money-log or receipt-review actions,
- **>= 50%** of users revisit Fin after their first simulator exposure,
- the team sees a clear primary value reason for return from user quotes,
- there are **0 P0 privacy/security/auth incidents**,
- there are **0 cases** of ambiguous receipt data becoming canonical truth without user review.

---

## 6. Go / conditional-go / no-go rubric

### GO
Proceed with the Denmark-first alpha only if all of the following are true:
- trust-hardening Priorities 0-4 are complete or have an explicit manual safety fallback,
- the interview thresholds above are met,
- at least one archetype shows strong repeat-intent,
- the product is consistently understood as educational guidance, not advice,
- no major role/access/privacy blocker is open.

### CONDITIONAL GO
Proceed with a smaller alpha (5-6 users max) only if:
- the core wedge tests well,
- one trust hardening item remains partially manual but safely controlled,
- the unresolved issue is operationally containable,
- the team agrees the remaining gap is execution risk, not trust risk.

### NO-GO
Do **not** open alpha yet if any of these are true:
- users repeatedly confuse Goldie and Fin,
- ProsperCoins consistently cheapen trust,
- users cannot explain why they would come back,
- receipt/OCR flow still feels unsafe or opaque,
- support/operator access is still prototype-soft,
- the product is repeatedly perceived as giving investment advice,
- the team cannot survive a redeploy or user-support issue without ad hoc fixes.

---

## 7. Owner-ready next actions

### Vadim — product, trust, and research owner
Complete in the next 5 business days:
1. Approve the first-alpha cohort definition: **18-26, Denmark, no minors, no live bank sync**.
2. Finalize the interview script and trust-language checklist.
3. Prepare the founder intro/recruitment message for warm outreach.
4. Define the manual fallback for delete/export/support requests during alpha.
5. Decide the exact GO / CONDITIONAL GO / NO-GO review date.

### Nikolas — design and research experience owner
Complete in the next 5 business days:
1. Polish the interview walkthrough path so the flow feels calm and premium, not prototype-chaotic.
2. Tighten the Goldie vs Fin role cues in the UI before interviews.
3. Refine receipt review/explainability screens to reduce uncertainty language.
4. Create one lightweight note-taking board for interview synthesis.
5. Rank the top trust-friction UI points after the first 3 sessions.

### Implementation owner — hosted alpha hardening owner
Complete in the next 7-10 business days:
1. Replace remaining demo-backed critical state with hosted persistence.
2. Add explicit operator/admin auth boundaries.
3. Ship receipt upload + OCR lineage behind candidate-first review.
4. Ensure audit/support traces are durable and actor-scoped.
5. Add deploy-time release safety and minimal alpha observability.

---

## 8. Recommended sequence for the next step

1. Freeze non-essential feature work.
2. Prepare interview assets and trust-language checklist.
3. Finish Priority 0 and Priority 1 hardening.
4. Run the 12-user interview wave.
5. Rank findings into:
   - keep,
   - change,
   - cut,
   - unresolved.
6. Finish Priority 2-4 hardening with findings folded in.
7. Hold a formal GO / CONDITIONAL GO / NO-GO review.
8. Only then open the hosted Denmark-first alpha.

## 9. Explicit non-priorities for the next slice

Do **not** burn the next cycle on:
- live PSD2/open banking,
- growth loops or sharing mechanics,
- family-account complexity,
- more simulator breadth,
- cosmetic reward expansion,
- vanity dashboard work.

That work becomes relevant only after the wedge and trust posture survive real users.

## Deliverable created
- `docs/implementation/alpha-readiness-user-validation-and-alpha-hardening-brief.md`

## Outcome

ProsperPals now has a concrete alpha-readiness brief that translates the gap-close plan into:
- a Denmark-first user-validation motion,
- a trust-hardening priority stack,
- explicit go/no-go criteria,
- and named owner-ready next actions.

The next move should be execution, not more abstract planning.
