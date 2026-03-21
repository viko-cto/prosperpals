# ProsperPals — Cohort Recruitment and Hosted Hardening Kickoff

**Date:** 2026-03-21  
**Phase:** alpha-readiness  
**Step:** 3-cohort-recruitment-and-hosted-hardening-kickoff  
**Status:** complete

## Why this artifact exists

The prior alpha-readiness brief defined **who** ProsperPals should test with, **what** must be validated, and **which trust-hardening gates** must be cleared before a Denmark-first hosted alpha.

This kickoff artifact turns that brief into an execution package the team can actually run next week without hand-wavy interpretation.

It has two jobs:

1. start recruiting the right first cohort, and  
2. launch the hosted hardening work in a way that protects trust instead of quietly expanding scope.

---

## 1. Kickoff decision in one sentence

ProsperPals should spend the next execution slice on a **12-user Denmark-first interview wave plus a tightly scoped hosted-hardening sprint**, with all work judged against one question:

**Does this increase confidence that a small real-user alpha will feel calm, useful, and trustworthy?**

If not, it is backlog gravity, not alpha-readiness.

---

## 2. Recruitment plan

### Target cohort
Recruit **12 interview participants** total:

- **6 budget-first users**
- **6 invest-first users**

After synthesis, convert the strongest-fit and most engaged participants into a hosted alpha cohort of **8-10 users**.

### Cohort shape
Aim for the following spread:

- **4-5 students**
- **4-5 early-career workers**
- **2 mixed-profile swing users** who care about budgeting and are investing-curious
- **balanced gender representation where possible**
- **at least 3 users living independently** and actively managing rent, groceries, shared payments, or subscriptions

### Non-negotiable fit criteria
Every participant should:

- be **18-26**,
- live in **Denmark**,
- regularly use **MobilePay** or similarly frequent digital payments,
- manage at least part of their own spending,
- be comfortable with an English-first product,
- understand they are testing an **education-first prototype**, not a real investing product.

### Exclusions
Exclude anyone who:

- expects real investment recommendations,
- needs live bank syncing on day one,
- is looking for a brokerage or tax tool,
- cannot tolerate rough edges,
- would require immediate Danish-only localization for useful feedback.

---

## 3. Recruitment channels and sourcing order

### Tier 1 — Warm intros first
Use first because trust and attendance quality are better.

1. **Nikolas network**
   - design school peers
   - creative/commerce students
   - recent graduates in Copenhagen
2. **Founder/family network**
   - cousins, family friends, trusted referrals
   - friends of the family who fit the 18-26 profile
3. **Friendly young professionals**
   - first-job workers
   - recent movers into independent living

### Tier 2 — Semi-warm community outreach
Use only after Tier 1 is moving.

1. university student groups
2. entrepreneurship/student Slack or Discord communities
3. Copenhagen youth/early-career circles

### Tier 3 — Controlled cold outreach
Only if coverage is still weak in one archetype.

1. targeted posts in local student channels
2. personal outreach to second-degree connections
3. campus community boards/messages

**Rule:** do not spray broad cold outreach until the team sees which archetype mix is underrepresented.

---

## 4. Archetype tagging rubric

To avoid recruiting twelve versions of the same user, tag each candidate before scheduling.

### Budget-first indicators
- worries about overspending more than missing gains
- wants clearer daily/weekly spending boundaries
- tracks or has tried to track spending before
- feels anxiety, guilt, or fog around everyday money decisions
- responds positively to “money left this week” framing

### Invest-first indicators
- curious about investing but inconsistent or hesitant
- has tried small investing apps, YouTube learning, or paper-trading
- wants more confidence and less fear of doing something stupid
- responds positively to “learn before you risk real money” framing
- sees budgeting as necessary but not motivating on its own

### Mixed-profile indicators
- wants spending control and future growth confidence
- likes the idea of learning through progress systems
- could plausibly become a bridge user between the two lanes

**Scheduling rule:** no more than **2 mixed-profile users** should replace core archetype slots.

---

## 5. Outreach package

### Outreach message template

> Hey — I’m helping test a new mobile-first money app for young adults in Denmark. It’s designed to help people understand spending better, build confidence, and learn investing in a low-stakes way. We’re looking for 18-26 year olds for a 45-60 minute feedback session next week. It’s not a banking app or investment product — more of a calm learning companion. We’ll give a 150-250 DKK thank-you gift card for your time. Interested?

### Follow-up qualifier questions
Send only after they show interest:

1. How old are you?  
2. Do you live in Denmark?  
3. Are you more interested in:
   - getting better control of spending,
   - learning investing with less stress,
   - or both?  
4. Do you regularly use MobilePay / card payments for day-to-day spending?  
5. Would you be okay testing an English-first early product and giving honest feedback in a 45-60 minute session?

### Scheduling note
When confirming a session, include:

- session length,
- remote/in-person format,
- thank-you incentive,
- clear statement that this is **not financial advice**,
- expectation that the app includes prototype elements.

---

## 6. Interview operations plan

### Session format
- **45-60 minutes**
- moderated walkthrough
- one facilitator, one note-taker when possible
- mobile-first flow
- prototype/build shown live

### Per-session checklist
Before session:
- candidate archetype tagged
- consent language ready
- note template opened
- test account prepared
- fallback route ready if one flow breaks

During session:
- capture first impression in first 30 seconds
- observe onboarding choice and interpretation
- observe reaction to Daily Spending Power
- observe understanding of Goldie vs Fin
- observe simulator reaction
- observe receipt-review trust reaction
- ask “Would you come back tomorrow? Why?”

After session:
- assign confidence score for archetype fit
- assign trust score
- record strongest quote
- label findings as **keep / change / cut / unresolved**
- decide whether candidate is suitable for hosted alpha follow-up

### Daily synthesis cadence
Do not wait until all twelve are done.

After every **3 sessions**, run a mini-review:
- recurring confusion,
- recurring delight,
- trust drop moments,
- whether recruitment mix needs rebalancing,
- whether UI wording needs immediate tightening before the next sessions.

This prevents wasting the back half of the interview wave.

---

## 7. Hosted hardening kickoff scope

The hardening work should run in parallel with recruitment, but it must remain tightly bounded.

### Hardening lane A — Durable truth
**Goal:** eliminate prototype-local trust assumptions.

#### Must land
- hosted persistence for onboarding state
- hosted persistence for reward ledger
- hosted persistence for simulator trades
- hosted persistence for receipt candidates
- durable support/audit traces

#### Done means
No critical user flow depends on local runtime file state or instance-specific memory.

### Hardening lane B — Operator boundaries
**Goal:** make support access real and accountable.

#### Must land
- explicit founder/operator roles
- role-gated support tooling
- actor-scoped logging for support actions
- quick disable path for operator-only features

#### Done means
The team can explain exactly who can see what and why.

### Hardening lane C — Receipt trust path
**Goal:** make the most sensitive ingestion path real enough for alpha.

#### Must land
- file upload path
- stored asset metadata
- OCR/provider adapter boundary
- parse lineage visibility
- candidate-first review remains mandatory
- ambiguous receipt data never becomes canonical truth automatically

#### Done means
A user can upload a receipt, inspect what the system thinks happened, and correct it before it counts.

### Hardening lane D — Alpha observability and safety
**Goal:** detect breakage and user confusion fast.

#### Must land
- event tracking for first aha and returns
- deploy checks/release safety in the alpha path
- founder-visible bug/issue triage flow
- preview/prod-like environment parity
- one lightweight cohort-health reporting surface

#### Done means
The team can spot breakage, confusion, and drop-off within a day instead of discovering it by accident.

---

## 8. Parallel execution board

### Week 1 focus

#### Recruitment owner — Vadim
- finalize outreach copy
- send first 10-15 warm messages
- maintain candidate tracker
- confirm first 4 sessions
- own the trust-language checklist

#### Design/research owner — Nikolas
- tighten Goldie vs Fin role cues before session 1
- polish the walkthrough path to remove prototype noise
- prepare structured interview notes board
- review confusion signals after each 3-session batch

#### Implementation owner
- finish durable persistence replacements for trust-critical state
- add role-gated operator boundaries
- begin real receipt upload + OCR lineage path
- wire alpha-safe observability and release checks

### Week 2 focus
- complete remaining 8 interview sessions
- promote strongest-fit users into hosted-alpha shortlist
- fold interview findings into wording and trust surfaces
- close the remaining launch-gating hardening items
- hold a formal go / conditional-go / no-go review

---

## 9. Working scorecard for this kickoff slice

Use this scorecard to keep the slice honest.

### Recruitment health
- at least **8 qualified candidates** identified in 5 days
- at least **4 sessions booked** in the first wave
- no archetype mix worse than **5/3** by the time sessions begin

### Validation discipline
- every session produces a note artifact
- every session ends with return-intent and trust assessment
- every 3-session batch yields a written synthesis delta

### Hosted hardening health
- critical persistence no longer relies on local demo sinks
- support roles are defined and testable
- receipt path is traceable and candidate-first
- release-safety path exists for hosted alpha

### Decision health
By the end of this step’s follow-on execution, the team should be able to answer:
- who the first alpha users are,
- why they are the right users,
- what they found valuable,
- what still threatens trust,
- whether ProsperPals deserves a hosted alpha now.

---

## 10. Risks and mitigations

### Risk 1 — Recruiting only “friendly” users
**Problem:** warm intros can bias results toward politeness.

**Mitigation:** explicitly ask for blunt criticism, and include a few semi-warm/non-family candidates.

### Risk 2 — Treating implementation progress as evidence
**Problem:** more shipping can create false confidence.

**Mitigation:** no hosted-alpha decision without interview evidence and trust-gate review.

### Risk 3 — Goldie and Fin remain too abstract
**Problem:** users may like the vibe but not understand the split.

**Mitigation:** test role clarity every session; tighten wording immediately between batches.

### Risk 4 — Receipt realism opens trust risk too early
**Problem:** a sloppy OCR path can reduce trust instead of increasing it.

**Mitigation:** preserve candidate-first review and strict no-auto-post rules.

### Risk 5 — Alpha starts before support is ready
**Problem:** real-user issues become chaotic.

**Mitigation:** role boundaries, issue triage, and founder-visible reporting are launch-gating requirements.

---

## 11. Recommended next BMAD step

After this kickoff artifact, the next meaningful BMAD step should be:

**`alpha-readiness / 4-interview-wave-synthesis-and-alpha-go-no-go`**

That step should consolidate:
- interview findings,
- updated trust/UI recommendations,
- hosted hardening completion status,
- and a formal **GO / CONDITIONAL GO / NO-GO** decision package for the first Denmark-first alpha.

---

## Deliverable created
- `docs/implementation/alpha-readiness-cohort-recruitment-and-hosted-hardening-kickoff.md`

## Elicitation methods applied

### First Principles
Used to reduce the kickoff to the only two things that matter now: the right users and trustworthy hosted rails.

### Cross-Functional War Room
Used to line up product, design, implementation, and support responsibilities into one execution board rather than separate wishlists.

### Critique & Refine
Used to strip out vanity launch tasks and keep the slice focused on trust, cohort quality, and decision-worthiness.

## Outcome

ProsperPals now has a concrete alpha-readiness kickoff artifact that translates the previous brief into:
- a sourcing plan,
- an outreach package,
- an interview ops rhythm,
- a parallel hosted-hardening scope,
- and a clear next decision step.

The lane is no longer “we should probably recruit people soon.” It is now a real execution kickoff.