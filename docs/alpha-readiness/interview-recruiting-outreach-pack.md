# ProsperPals Interview Recruiting Outreach Pack

Use this file to turn the already-defined Batch 01 slot design into real outreach without leaking participant names into the repo or drifting into convenience sampling.

This artifact supports the current BMAD step:

**`alpha-readiness / interview-evidence-and-hosted-hardening-execution`**

It does **not** soften the hosted-alpha **NO-GO**.

It exists because the repo already had:
- a fixed 12-slot cohort design,
- a screener,
- a canonical tracker,
- a Batch 01 assignment board,
- and scheduling / synthesis rules,

but it still lacked one practical bridge between “the slots are well defined” and “real people have been contacted, screened, aliased, and booked.”

That bridge now includes an explicit private-registry contract in `docs/alpha-readiness/interview-private-candidate-registry-template.md`, so the team has one offline place to hold real identity, ownership, dedupe, and slot-handoff state without leaking it into the repo.

Without that bridge, the most likely failure mode was obvious:
- founder network replies arrive first,
- the team fills the calendar,
- aliases get assigned late or sloppily,
- and Batch 01 looks active without actually meeting the source-mix or slot-fit bar.

---

## 1. Elicitation methods applied

### First Principles
Used to reduce the recruiting blocker to its smallest honest unit: the team needs a repeatable way to source, contact, screen, alias, and book candidates for `PP-B01`, `PP-I01`, and `PP-M01`.

### Pre-mortem
Used to design against the likely early-wave failures: three polite insiders, no non-founder-network participant, real names leaking into repo files, and scheduled calls with weak screener evidence.

### Critique and Refine
Used to remove vague “do outreach” language and replace it with concrete message templates, source discipline, and alias handoff rules.

---

## 2. What this pack is for

This pack covers the **pre-tracker** work that happens before a participant alias is ready to appear in:
- `docs/alpha-readiness/interview-batch-01-assignment-board.md`
- `docs/alpha-readiness/interview-evidence-tracker.md`

In other words:

> use this file to get from real human contact to slot-ready alias assignment.

Once a candidate is screened-fit and approved for a slot, the assignment board and canonical tracker take over.

---

## 3. Privacy and evidence rules

These rules stay fixed:

- Real participant names, phone numbers, emails, and profile links stay **offline**.
- Repo artifacts use **aliases only**.
- A person is not considered real recruiting progress until source + screener fit + proposed slot are recorded.
- A person is not considered slot-assigned progress until the alias is copied into the Batch 01 assignment board and canonical tracker.
- Batch 01 is still not healthy until at least **one non-founder-network recruit** is genuinely in play.
- Faster access to founder-network contacts is not evidence quality.

---

## 4. Candidate lifecycle before the repo tracker

Use these offline statuses before a participant graduates into repo-visible alias form:

1. `sourced` — identified but not contacted
2. `messaged` — first outreach sent
3. `replied` — candidate responded
4. `screened-fit` — screener says likely fit for one slot
5. `screened-borderline` — interesting but slot fit is weak or uncertain
6. `scheduled-pending-alias` — booked, but alias handoff not yet copied into repo docs
7. `rejected` — clearly off-target or bad timing
8. `backup` — usable reserve candidate, not the active slot owner

### Repo handoff rule
A candidate should appear in repo artifacts only when all four are true:
- source bucket is known,
- screener fit is written in one sentence,
- the intended slot is explicit,
- and an alias is assigned.

---

## 5. Batch 01 slot targeting cues

Use these cues while sourcing candidates so outreach is not generic.

### PP-B01 — budget-first
**Best-fit profile**
- student or young adult
- actively feels day-to-day spending pressure
- uses digital payments frequently
- not currently excited by investing tools
- likely to judge Daily Spending Power quickly

**Good sourcing clues**
- talks about stretching money through the month
- uses MobilePay or cards daily
- wants money clarity more than portfolio theory

**Avoid for this slot**
- already deep into investing communities
- highly polished fintech power users
- someone who mainly wants stock picks

### PP-I01 — invest-first
**Best-fit profile**
- student or early-career user
- curious about investing already
- wants learning and confidence, not gambling vibes
- likely to challenge whether Fin is educational vs fake-trading fluff

**Good sourcing clues**
- follows investing creators or reads about markets
- has tried demo investing, paper trading, or beginner portfolios
- wants to learn but still worries about mistakes

**Avoid for this slot**
- people who only care about pure budgeting
- people who already behave like advanced traders
- people who want speculative hype over learning

### PP-M01 — mixed
**Best-fit profile**
- uses digital payments often
- cares about both everyday money and learning to invest
- can pressure-test whether Goldie -> Fin feels natural

**Good sourcing clues**
- wants help balancing spending awareness with future planning
- not purely budget-only or invest-only
- may be willing to return for hosted-alpha follow-up if the first session feels honest

**Avoid for this slot**
- people who are too extreme on either side
- someone who needs heavy prompting just to stay in flow

---

## 6. Offline candidate capture template

Use this template in an offline/private note or sheet. For the full required column set and alias handoff rules, use `docs/alpha-readiness/interview-private-candidate-registry-template.md` as the canonical private-registry contract.

### Candidate capture
- **Private contact owner:**
- **Real-world name/contact:** *(offline only)*
- **Temporary lead code:**
- **Source bucket:** founder-network / second-degree-referral / external-community
- **Founder-network?:** yes / no
- **Proposed slot:** PP-B01 / PP-I01 / PP-M01 / undecided
- **Current status:** sourced / messaged / replied / screened-fit / screened-borderline / scheduled-pending-alias / backup / rejected
- **Digital-payments fit:** yes / borderline / no
- **Hosted-alpha fit:** yes / maybe / no
- **Archetype hypothesis:** budget-first / invest-first / mixed
- **Screener notes:**
- **One-sentence slot rationale:**
- **Main risk:**
- **Next action date:**

### Alias handoff fields
Only fill these once the candidate is slot-approved:
- **Repo alias:**
- **Assignment-board row updated?:** yes / no
- **Tracker row updated?:** yes / no
- **Session note prepared?:** yes / no

---

## 7. Suggested alias discipline

The repo already uses slot IDs like `PP-B01` and `PP-I01`.

Use this rule offline:
- keep real identity in the private sheet,
- use a temporary lead code while screening,
- and only copy the final slot alias into repo docs once the candidate is the chosen active participant for that slot.

### Example
- offline lead code: `lead-b01-a`
- approved slot: `PP-B01`
- repo-visible participant id: `PP-B01`

This avoids confusing “candidate aliases” with the canonical session aliases already baked into the evidence files.

---

## 8. Outreach message templates

Keep these short and human. The goal is to recruit good evidence, not sell a polished beta.

### A. Founder-network first contact

> Hey — I’m helping test an early personal-finance app concept for young adults in Denmark. We’re doing short research interviews about how people track spending, think about saving/investing, and what feels trustworthy vs annoying. It’s not a sales call and we’re not giving financial advice. Would you be open to a 20–30 min chat sometime next week?

### B. Second-degree referral ask

> Hey — I’m trying to speak with a few students / early-career people in Denmark who use digital payments a lot and have different attitudes toward budgeting vs investing. Do you know 1–2 people who might be a fit for a short product research interview? I can send a short blurb you can forward.

### C. Forwardable referral blurb

> I’m helping with early user research for a Denmark-first personal-finance learning product. We’re looking for students or early-career adults who use MobilePay/cards regularly and are willing to do a 20–30 min interview about money habits, budgeting, and investing learning. It’s exploratory research only — not financial advice, no public posting, and no pressure to join anything later.

### D. External-community outreach post / DM

> Hi — I’m recruiting a small number of Denmark-based students / early-career adults for short research interviews about everyday money tracking and beginner investing learning. Looking especially for people who use digital payments often and have opinions about what feels useful vs scammy in finance apps. Happy to share details privately if relevant.

### E. Screener follow-up after a positive reply

> Thanks — before we book, can I ask 4 quick fit questions?
> 1) Do you mostly pay digitally day to day (MobilePay/card/app)?
> 2) Are you more focused right now on controlling spending, learning to invest, or a mix?
> 3) Have you tried any budgeting or investing apps before?
> 4) If the first interview is useful, would you maybe be open to a short follow-up later?

### F. Scheduling confirmation

> Great — let’s lock [day/time]. This is a research conversation, not financial advice, and we’re mainly trying to understand what feels helpful, confusing, or untrustworthy in the flow. I’ll send a reminder before the session.

### G. Day-before reminder

> Quick reminder about tomorrow’s ProsperPals research chat at [time]. It should take about 20–30 minutes. We’ll focus on how you track spending, react to money guidance, and what would make an app feel genuinely useful vs gimmicky.

### H. Polite decline / keep-warm note

> Thanks again — I think we may prioritize a slightly different participant profile for this first wave, but I appreciate the reply. If we open another round that fits better, I may reach back out.

---

## 9. Batch 01 sourcing rules in outreach form

Before Batch 01 is treated as healthy, check these:

- [ ] at least one active candidate comes from **second-degree referral** or **external-community** sourcing
- [ ] no more than one active Batch 01 candidate is pure founder-network unless other sourcing has clearly failed
- [ ] `PP-B01`, `PP-I01`, and `PP-M01` are not all coming from the same social cluster
- [ ] at least one candidate looks plausible for hosted-alpha follow-up
- [ ] each slot has at least one backup candidate offline

If these are not true, the next move is more sourcing — not more scheduling.

---

## 10. Handoff into repo artifacts

Once a candidate is approved for one of the three Batch 01 slots:

1. update `docs/alpha-readiness/interview-batch-01-assignment-board.md`
2. replace `TBC` for that slot with the final slot alias
3. record the actual source bucket used
4. write the one-sentence slot rationale
5. update `docs/alpha-readiness/interview-evidence-tracker.md`
6. move the row to `scheduled` only when a real time is booked
7. confirm the matching session note file is ready before the call happens

This pack does not replace the board or the tracker.
It feeds them.

---

## 11. Immediate next actions

- [ ] build an offline/private candidate sheet using the template above
- [ ] source at least 2 plausible candidates per Batch 01 slot offline
- [ ] ensure at least 1 active Batch 01 candidate is non-founder-network
- [ ] screen candidates before giving any slot a repo alias
- [ ] update the Batch 01 assignment board only after a candidate is slot-approved
- [ ] keep real names offline and repo aliases clean

---

## 12. Outcome

ProsperPals now has a recruiting/outreach operating pack for the exact point where the interview lane was still weak: the step between “we know who we need” and “we have real, slot-ready participants with safe alias handling.”

This is real execution progress because it makes Batch 01 assignment operational instead of narrative-only.

It does **not** change the decision posture:
- no participant has been assigned yet,
- no session has been run yet,
- and the hosted-alpha **NO-GO remains locked**.
