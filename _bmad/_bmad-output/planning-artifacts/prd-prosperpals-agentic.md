---
stepsCompleted:
  - 1-prd-foundation
  - 2-prd-feature-detail
  - 3-prd-data-and-interface-contracts
inputDocuments:
  - _bmad/_bmad-output/planning-artifacts/product-brief-prosperpals-agentic-2026-03-07.md
  - /home/node/clawd/research/prosperpals/bmad-session-notes-product-brief.md
  - /home/node/clawd/research/prosperpals/2026-03-16.md
  - /home/node/clawd/research/prosperpals/2026-03-17.md
workflowType: 'prd'
phase: 'prd'
step: 3
stepName: 'data-and-interface-contracts'
elicitationMethods:
  - architecture-decision-records
  - cross-functional-war-room
  - self-consistency-validation
status: 'draft-in-progress'
---

# Product Requirements Document - ProsperPals

**Product:** ProsperPals  
**Owner:** Nikolas / CopenDapp Labs  
**Prepared by:** Viko  
**Date:** 2026-03-17  
**Status:** Draft — Steps 1-3 complete

## Executive Summary

ProsperPals is an AI-first financial wellness product for Denmark-first users who want clearer cash flow, lower money anxiety, and a practical path into investing without being dropped into a spreadsheet or a brokerage interface. Its category-defining loop is simple: **Log spending → Earn ProsperCoins → Invest in a simulator → Learn from outcomes → Repeat.**

The product must win on three things competitors routinely fail at: fast first-session value, shame-free guidance, and explainable behavior change. The first session must deliver a real financial insight in under 80 seconds. The daily experience must feel supportive rather than judgmental. The long-term experience must convert tracking into better decisions, not just prettier charts.

ProsperPals uses two companion personas with one shared product brain:
- **Goldie** leads daily spending awareness, budgeting, and motivation.
- **Fin** leads investing education, forecasting, and scenario thinking.

Goldie is always the default entry point. Fin appears only when investing or learning context is triggered, and the handoff must feel intentional, not confusing. If testing shows the dual-companion presentation causes friction, the product must be able to fall back to one adaptive companion without changing core capabilities.

ProsperPals is explicitly positioned as **financial wellness education and organization**, not financial advice. The product helps users understand spending, simulate future outcomes, and learn financial concepts. It must not recommend specific real-world financial products, make suitability claims, or imply regulated advisory behavior.

## Success Criteria

### North Star

**Weekly Active Core Loop Completions (WACLC):** unique users who complete at least one full Log → Earn → Invest → Learn cycle in a given week.

This metric is the clearest test of the product thesis. If users only log, the product is a tracker. If users only invest, the product is a toy simulator. ProsperPals works only when the full loop becomes habitual.

### Launch Targets

| Metric | Target | Why It Matters |
|---|---:|---|
| Onboarding completion | >= 70% budget-first / >= 80% invest-first | Validates the 80-second promise |
| Goldie-to-Fin handoff continuation | > 80% | Confirms the dual-companion model is helping, not interrupting |
| Day-7 retention | >= 35% overall | Indicates the experience is useful after novelty fades |
| Weekly Active Core Loop Completions | >= 40% of registered users by Month 1 | Validates category fit |
| First useful insight delivered | <= 80 seconds median | Reduces first-session friction |
| Receipt-scanning trust score | >= 85% accepted without manual correction in Danish launch set | Keeps manual-entry MVP viable |
| Thomas family-plan conversion | >= 30% of family-intent users by Day 30 | Proves monetization path |
| Confusion reports about companions | < 10% of surveyed users | Protects brand clarity |

### Anti-Metrics

ProsperPals must not optimize for raw transaction count, time in app, absolute leaderboard wealth, or manipulative notification opens. Those metrics can grow while product trust shrinks.

## Product Scope

### Product Outcome

By the end of Month 1, a successful ProsperPals user should be able to answer three questions with confidence:
1. **Where does my money actually go?**
2. **What is safe to spend before payday?**
3. **What would happen if I redirected some of this money into saving or investing?**

### MVP Scope

The MVP must include:
- conversational expense logging through text, receipt photo, or simple manual input
- Goldie-guided spending awareness and budget visibility
- ProsperCoin earning tied to meaningful financial actions
- a real-market-data investment simulator powered by virtual currency only
- Fin-guided explanations of investment outcomes and basic concepts
- onboarding paths for budget-first, invest-first, and teach-family intent
- gamification modes: **Full**, **Lite**, **Off**
- Daily Spending Power or equivalent forward-looking spend guidance
- safe sharing of learning milestones without exposing private financial data
- Denmark-first localization, including DKK context and Danish receipt patterns

### Launch Sequencing Constraints

The launch plan is fixed and must be reflected in all subsequent requirements:
- **Sprint 1:** manual entry + receipt scanning + CSV/PDF-style bridge workflows where needed
- **Sprint 2:** MobilePay import
- **Sprint 3-4:** PSD2/open banking integration
- transaction ingestion must be treated as a staged capability, but the user experience must remain coherent across all stages

### Explicitly Out of Scope for MVP

The MVP must not include:
- real-money trading or brokerage execution
- personalized investment advice
- loan, insurance, or credit product recommendations
- autonomous bill payment or account transfers
- open-market token trading
- public wealth-based leaderboards using absolute monetary values
- hidden family/partner visibility into private spending data

## User Archetypes and Jobs to Be Done

### Primary Behavioral Archetypes

#### 1. Budget-First
**Job to be done:** “Help me understand where my money goes and stop the monthly surprise.”

These users enter through anxiety reduction and cash-flow clarity. Their first win is a meaningful spending insight. Their second win is realizing that budget awareness can fund learning and investing.

#### 2. Invest-First
**Job to be done:** “Help me learn investing in a way that feels real before I risk real money.”

These users enter through curiosity and future orientation. Their first win is making a simulated pick that feels consequential. Their retention hook is discovering that better money habits give them more room to invest.

### Monetization Persona

#### 3. Teach-Family
**Job to be done:** “Help me teach financial literacy and see visible progress without policing someone’s private finances.”

This persona pays when the product demonstrates educational value and shared accountability without becoming surveillance software.

### Design Principles Derived from Elicitation

From first-principles analysis, pre-mortem review, and cross-functional challenge, the following principles are mandatory:
- **Clarity before complexity:** first-session value beats feature breadth.
- **Shame-free tone:** insights must feel useful, never scolding.
- **Configurable intensity:** gamification must adapt to user preference without removing core value.
- **Forward-looking guidance:** the product must help users act on tomorrow, not only review yesterday.
- **Privacy-separated virality:** learning progress may be shareable; personal finances are private by default.
- **Denmark-first realism:** if launch depends entirely on perfect bank sync, the launch will fail.

## Core Experience Requirements

### 1. Core Loop Contract

ProsperPals exists to reinforce one loop:
1. user logs a real financial action or data point
2. product rewards the action with ProsperCoins
3. user invests coins in a simulator with recognizable assets
4. Fin explains what happened and what it means
5. Goldie reconnects the learning to the user’s real spending behavior

Every major feature must strengthen at least one step in this loop. Features that do not strengthen the loop are lower priority by default.

### 2. Companion Model Contract

- Goldie is the default interface for all new users.
- Fin is introduced explicitly, never silently swapped in.
- Goldie owns budgeting, logging, recurring-spend awareness, safe-to-spend framing, streaks, and emotional tone.
- Fin owns simulator education, opportunity-cost framing, market explanations, and learning tracks.
- Users must not need to decide which companion to choose before they have product context.
- If role confusion exceeds the accepted threshold, ProsperPals must be able to merge presentation into one adaptive companion without reworking product behavior.

### 3. Onboarding Journeys

#### Budget-First Onboarding
The user must:
1. answer one intent-setting question
2. log one expense in a low-friction format
3. receive an immediate explanation of what that expense means for their week
4. earn ProsperCoins from that action
5. see an invitation into the simulator as a reward, not as a detour

#### Invest-First Onboarding
The user must:
1. answer the same intent-setting question
2. receive starter ProsperCoins immediately
3. meet Fin through an explicit handoff
4. choose from three recognizable assets with a one-line rationale for each
5. be invited back to track the result and earn more coins through real financial awareness

#### Teach-Family Onboarding
The user must:
1. see the value of the family experience without encountering an empty dashboard
2. preview milestones, learning progress, and shared challenge mechanics using safe sample data
3. understand what can be shared and what remains private
4. have a clear invite path to bring another family member into the product

### 4. Daily Use Requirements

The day-to-day product must provide:
- a forward-looking spending view, not just a transaction log
- recurring-spend awareness and forgotten-subscription detection when data quality allows
- streaks and nudges that reinforce awareness rather than transaction volume
- daily or near-daily reasons to return for invest-first users through simulator movement and explanation
- weekly reasons to return for family-plan users through progress, challenges, and milestone visibility

### 5. Gamification Modes

#### Full Mode
For users who enjoy visible progress, collection, streaks, and competition. Includes ProsperCoins, achievements, leagues, and social-style motivation.

#### Lite Mode
For users who want progress and rewards without overt competition. Includes ProsperCoins and learning progress, excludes leagues/clan-style pressure.

#### Off Mode
For users who dislike gamified presentation. Removes competitive and cosmetic layers but **retains** the core differentiators: Goldie, Fin, the simulator, and learning-based financial coaching.

### 6. Sharing and Family Boundaries

ProsperPals must separate **shareable learning progress** from **private financial data**.

Shareable by default only when the user opts in:
- lessons completed
- learning milestones
- simulator progress and educational achievements
- Prosperity Key tier or equivalent progress markers

Never shared without granular consent:
- income
- transaction history
- category-level spending detail
- safe-to-spend values
- budget shortfalls or overspend states

## Foundational Functional Requirements

### Onboarding and Core Loop

- **FR-001** Users can state their primary intent at onboarding as budget-first, invest-first, or teach-family.
- **FR-002** ProsperPals shall deliver a first useful financial insight or first meaningful simulator action within 80 seconds median time from signup completion.
- **FR-003** Users can log at least one expense during onboarding through text, receipt photo, or structured manual entry.
- **FR-004** Logging a valid financial action shall award ProsperCoins immediately with a visible explanation of why the reward was earned.
- **FR-005** The first simulator choice shall present three recognizable assets and a brief explanation of why each is relevant or interesting now.
- **FR-006** Goldie shall explicitly introduce Fin before the first investment handoff.
- **FR-007** Users can complete at least one full Log → Earn → Invest → Learn loop during their first session.

### Companion Behavior

- **FR-008** Goldie shall remain the default conversational lead unless the active task clearly shifts into investment or education context.
- **FR-009** Fin shall explain simulator outcomes in plain language appropriate to the user’s demonstrated knowledge level.
- **FR-010** Users can indicate when Fin’s explanation is too basic or too advanced, and future explanations shall adapt accordingly.
- **FR-011** Companion messaging shall avoid judgmental framing for overspending, missed logs, or streak breaks.
- **FR-012** ProsperPals shall support a fallback presentation mode where companion distinctions are reduced without removing core capabilities.

### Budgeting and Insight Delivery

- **FR-013** Users can view a forward-looking spending picture for the current pay cycle or month, including what is safe to spend before the next income event.
- **FR-014** Goldie shall surface at least one spending insight that connects current behavior to a meaningful weekly or monthly consequence.
- **FR-015** Users with irregular income can use planning views based on rolling averages rather than only fixed monthly assumptions.
- **FR-016** Receipt-scanning results shall always be reviewable before they become part of the user’s record.

### ProsperCoins and Simulator

- **FR-017** ProsperCoins shall be earned for meaningful financial-awareness actions, not for raw spending volume.
- **FR-018** Users can spend ProsperCoins in a virtual portfolio using real asset prices for educational simulation only.
- **FR-019** Fin shall connect simulator outcomes back to real-world opportunity cost, savings behavior, or learning progress.
- **FR-020** ProsperPals shall limit exploitative or spammy ProsperCoin farming without penalizing legitimate high-frequency users.

### Gamification and Motivation

- **FR-021** Users can switch between Full, Lite, and Off gamification modes at onboarding or later in settings.
- **FR-022** A zero-spend day can count as a successful streak day when the user acknowledges it in the product.
- **FR-023** Streak protection shall exist to prevent one missed day from collapsing long-term motivation.
- **FR-024** Competitive displays shall use normalized progress measures rather than absolute personal wealth.

### Family and Sharing

- **FR-025** Teach-family users can preview the family experience without requiring another household member to have already generated live data.
- **FR-026** Users can share learning milestones without exposing transaction-level or budget-level information.
- **FR-027** Family participation shall support encouragement and challenge mechanics without exposing private scores, quiz failures, or sensitive financial details by default.

### Compliance and Trust

- **FR-028** ProsperPals shall present itself as an educational and organizational tool, not as a provider of financial advice.
- **FR-029** The product shall not recommend specific real-world financial products as suitable for a given user.
- **FR-030** Users can understand why a key insight, category judgment, or simulator explanation was generated.
- **FR-031** Users can distinguish between verified financial data and user-estimated or approximate entries.
- **FR-032** Shared financial visibility between adults shall require explicit, granular, revocable consent.

## Validation Gates Before PRD Finalization

The following must be validated before the PRD is considered complete:
- conduct **5-8 pre-MVP interviews per primary archetype**
- verify whether budget-first and invest-first remain meaningfully distinct after week 2 of use
- usability-test the Goldie-to-Fin handoff and confirm continuation rate assumptions
- test whether Thomas-first acquisition works independently of Sofia-led sharing
- confirm that Off mode remains compelling enough to avoid becoming a generic budgeting dashboard

## Step 1 Hardening Summary

This foundation draft was deliberately narrowed and strengthened through three elicitation lenses:
- **First Principles:** cut feature sprawl back to the smallest loop that creates financial clarity and investing motivation.
- **Pre-mortem:** hardened around likely launch failures: onboarding friction, sync dependency, companion confusion, empty family states, and meaningless gamification.
- **Cross-Functional War Room:** reconciled product, design, compliance, and growth needs into one set of guardrails so later architecture and epic-writing do not drift into contradiction.

## Step 2 Elicitation Outcomes

### Comparative Analysis Matrix

| Design Question | Common Market Pattern | ProsperPals Decision |
|---|---|---|
| How do users get value in the first session? | Force account-linking or hide value behind a paywall/trial wall | Deliver value with manual logging, receipt scan, or starter ProsperCoins before any bank connection is required |
| How should AI feel? | One generic chatbot or a gimmicky, snarky assistant | Use Goldie for daily money confidence and Fin for investing/forecasting, with one shared context and explicit handoffs |
| What should gamification reward? | Time in app, raw transaction count, or spending volume | Reward awareness quality, reflection, consistency, and learning progress |
| How should investing be introduced? | Drop users into complex tickers, watchlists, and trading mechanics | Start with three recognizable assets, simple long-only simulation, and plain-language explanations |
| What makes family premium worth paying for? | Shared household ledger or surveillance-style visibility | Shared learning progress, milestone visibility, and co-present challenges while keeping private finances private by default |
| What drives retention? | Nagging reminders and category housekeeping | Pair a passive hook (Daily Spending Power + portfolio movement) with an active hook (ProsperCoins + streaks + learning) |

### Red Team vs Blue Team

| Red Team Concern | Blue Team Response |
|---|---|
| Users will spam tiny or duplicate logs to farm ProsperCoins | Add quality scoring, duplicate detection, validation states, and daily/weekly earn caps; rewards are tied to awareness behaviors, not spend amount |
| Two companions will confuse users | Goldie is always the default, Fin appears only through explicit handoff or direct investment intent, and the active companion is always visible |
| Off mode turns ProsperPals into a generic dashboard | Off mode removes cosmetic competition only; it keeps Goldie, Fin, simulator learning, and core insights |
| Family premium becomes covert financial surveillance | Family view shares milestones, recaps, and challenge outcomes; transaction detail and safe-to-spend remain private unless explicitly shared |
| The simulator could be interpreted as financial advice | Keep it virtual-only, label data freshness and source, avoid suitability language, and explain outcomes as education rather than recommendations |
| Manual-entry MVP will feel like homework | Support conversational capture, receipt scanning, zero-spend acknowledgement, and one-time PDF/CSV audit bridges before MobilePay/PSD2 automation arrives |

### Critique & Refine Decisions

- Fin should not interrupt basic budgeting. He appears when the user asks to invest, runs a scenario, or opens a learning/investing surface.
- ProsperCoins must unlock capability and motivation, not just vanity. Core coin sinks in MVP are simulator trades, streak protection, and selected advanced learning actions.
- Thomas conversion should begin with shareable learning artifacts and a family preview, not cold invite spam.
- Market outcomes must always be translated into human meaning: what changed, why it matters, and what the user can learn from it.

## Detailed Feature Specifications

### Feature Area 1 — Goldie: Daily Financial Wellness Companion

**Purpose:** Give users a calm, shame-free daily operating layer for money. Goldie should answer: *What happened, what matters, and what is safe to do next?*

#### MVP behavior
- Goldie is the default entry point for every new user.
- Goldie supports conversational expense capture, receipt capture, and lightweight manual structure.
- Goldie produces a forward-looking Daily Spending Power view with a mood label and explanation.
- Goldie detects recurring obligations and spend drift when data quality allows.
- Goldie anchors the emotional tone of the product: encouraging, direct, never scolding.

#### Core flows
1. **Fast log:** user types or says “Spent 50 kr on lunch,” Goldie parses, confirms only if needed, awards ProsperCoins, and updates Daily Spending Power.
2. **Receipt flow:** user uploads a photo, Goldie extracts merchant, amount, date, and likely category with confidence labels.
3. **Morning check-in:** user sees Daily Spending Power, mood label, upcoming bills, and one suggested next action.
4. **Recovery mode:** if the user overspends, Goldie reframes into recovery options for the next days rather than guilt language.
5. **Sprint 1 audit bridge:** Goldie can guide a one-time statement/PDF/CSV upload to identify subscriptions and recurring leakage before auto-import is live.

#### Detailed requirements
- **FR-033** Users can log money events through natural language text, voice-to-text input, structured quick actions, or receipt photo.
- **FR-034** Goldie shall extract amount, merchant, date, tentative category, and confidence score from receipt and free-text inputs when possible.
- **FR-035** Goldie shall ask the minimum necessary follow-up question only when confidence is low or the missing field would materially change the insight shown.
- **FR-036** Goldie shall present a Daily Spending Power number plus a plain-language mood label (for example: tight, comfortable, flush) and explain the inputs used.
- **FR-037** Users with irregular income can switch Goldie from fixed-pay-cycle planning to rolling-average planning without losing history.
- **FR-038** Goldie shall identify likely recurring obligations and forgotten subscriptions from entered, scanned, uploaded, or connected transaction data when evidence is sufficient.
- **FR-039** Users can mark a day as a zero-spend day and keep streak continuity when they actively acknowledge it.
- **FR-040** Goldie shall support a one-time PDF/CSV-style spending audit in Sprint 1 to surface recurring charges and category patterns before bank automation exists.
- **FR-041** Goldie shall offer recovery guidance after overspend events and must avoid shame-based or moralizing wording.

#### Explicitly out of scope for MVP
- Autonomous bill payment or account transfers
- Credit-product or loan recommendations
- Full bookkeeping/accounting workflows

### Feature Area 2 — Fin: Investment Education and Scenario Companion

**Purpose:** Turn curiosity about investing into structured learning without crossing into regulated advice. Fin should answer: *What happened in my virtual portfolio, why did it happen, and what can I learn?*

#### MVP behavior
- Fin appears only after explicit handoff from Goldie or direct user navigation into investing/learning.
- Fin offers a clean first-pick experience with recognizable assets and one-line hooks.
- Fin calibrates explanation depth over time.
- Fin translates simulated market movement into educational meaning and real-life trade-off framing.

#### Handoff protocol
1. Goldie introduces Fin by name and states the reason for the handoff.
2. Fin opens with one sentence of context referencing the user’s just-completed action.
3. The UI clearly indicates which companion is active.
4. The user can return to Goldie at any point without losing conversational context.

#### Detailed requirements
- **FR-042** Goldie shall explicitly introduce Fin before the first investing or scenario-planning interaction and provide the user a clear reason for the handoff.
- **FR-043** Fin’s first-pick screen shall show three recognizable assets with a one-line explanation of why each is currently interesting, without implying a recommendation.
- **FR-044** The MVP simulator shall support long-only, virtual-only, fractional purchases funded solely by ProsperCoins.
- **FR-045** Fin shall adapt explanation depth across at least beginner, intermediate, and advanced levels based on user behavior and explicit feedback.
- **FR-046** Fin shall translate portfolio moves into understandable daily-life equivalents or opportunity-cost framing when helpful.
- **FR-047** Users can ask Fin “what if” questions about saving, redirecting spend, or changing virtual allocations and receive scenario estimates labeled as educational.
- **FR-048** Fin shall not present suitability language, certainty claims, or individualized real-world investment recommendations.
- **FR-049** Fin shall tie learning modules and explanations to actual user behavior, recent portfolio changes, or recently logged spending patterns where relevant.

#### Explicitly out of scope for MVP
- Real-money trading or brokerage execution
- Margin, leverage, options, shorting, or copy trading
- Portfolio performance claims framed as likely real-world outcomes

### Feature Area 3 — ProsperCoins Economy

**Purpose:** Reward attention, consistency, and learning in a way that makes the core loop habit-forming without incentivizing harmful behavior.

#### Economy design principles
- Users earn coins for **awareness quality**, not for spending more money.
- Coins are a motivational and educational utility, not a cash-equivalent asset.
- The economy must feel meaningful by unlocking actions and progress, not just a score label.

#### MVP earn and spend model

| Action Type | Reward Logic | Guardrail |
|---|---|---|
| Complete first onboarding loop | one-time starter award | granted once per account |
| Log a new valid spend/income event | small-to-medium reward based on completeness and novelty | duplicates or spam entries reduced or blocked |
| Validate a receipt parse | reward for confirming a useful correction | only if the review meaningfully improves data quality |
| Zero-spend acknowledgement | once-per-day reward | requires explicit confirmation, not passive inactivity |
| Weekly reflection / learning completion | medium reward | capped to prevent loop abuse |
| Family challenge / quiz participation | reward for genuine participation | private data never required |

Coins can be spent on:
- virtual simulator purchases
- streak protection / recovery mechanics
- selected advanced learning labs or challenge entries

#### Detailed requirements
- **FR-050** ProsperCoins shall be awarded according to rules based on awareness actions, reflection, validation, and learning rather than raw monetary spend volume.
- **FR-051** Every ProsperCoin award shall show the user why it was earned in plain language.
- **FR-052** The system shall apply daily and weekly anti-abuse controls, including duplicate detection, velocity checks, and once-only rewards where appropriate.
- **FR-053** Low-confidence or obviously duplicate entries shall not receive full ProsperCoin rewards until the user validates them.
- **FR-054** Users can spend ProsperCoins on virtual trades, streak protection, and approved educational/gameplay sinks in MVP.
- **FR-055** ProsperCoins in MVP shall not be withdrawable, transferable, or redeemable for cash.
- **FR-056** The underlying ledger shall support future non-cash reward catalog expansion without invalidating existing balances or event history.

### Feature Area 4 — Investment Simulator

**Purpose:** Give users a credible, low-friction sandbox for learning how markets move, how choices compound, and why investing behavior matters.

#### MVP behavior
- The simulator uses real market data with clearly labeled freshness.
- Users start with a curated, recognizable asset set rather than a broad searchable market universe.
- The product emphasizes learning and reflection over high-frequency trading.

#### Simulator rules
- Curated asset list at launch: recognizable equities, broad-market exposure, and major crypto assets only.
- Simple order model: buy/sell virtual units with ProsperCoins; no advanced order types in MVP.
- Daily movement explanation from Fin is more important than chart depth.
- Free-tier usage is intentionally constrained to support deliberate learning.

#### Detailed requirements
- **FR-057** The simulator shall present a curated launch universe of recognizable assets and expand only when the educational case is clear.
- **FR-058** Every portfolio screen shall show the timestamp and source freshness of market data used for educational simulation.
- **FR-059** Users can review portfolio value, position-level change, and simple gain/loss history in ProsperCoin terms and plain-language summaries.
- **FR-060** Free-tier users shall have a limited number of simulator trades per day to preserve deliberate learning; premium can expand limits later without changing core rules.
- **FR-061** The MVP shall not include leverage, margin, options, shorting, copy trading, or social signal mirroring.
- **FR-062** Fin shall generate a short learning card when a material portfolio move occurs, explaining what moved and why it matters.
- **FR-063** The simulator shall clearly distinguish market-closed behavior, delayed pricing, and any stale-data state so users do not mistake it for live execution.

### Feature Area 5 — Family and Shared Learning Flows

**Purpose:** Create a monetizable family experience built around encouragement and financial literacy transfer, not surveillance.

#### MVP behavior
- Family premium is anchored in learning visibility, weekly recap, and co-present challenges.
- Shareable artifacts and previews should convert Thomas-like buyers before a second household member fully signs up.
- Private spending data stays private unless a user intentionally expands visibility.

#### Core family journeys
1. **Share-first conversion:** Sofia shares a milestone or simulator win card; Thomas opens a family preview explaining what the paid plan unlocks.
2. **Weekly recap:** family members review streaks, lessons, and challenge outcomes together, ideally in a co-present moment.
3. **Challenge the Parent:** light competitive learning activity that is fun in real time without exposing sensitive numbers.

#### Detailed requirements
- **FR-064** Users can generate share templates for milestones, lesson completions, streaks, and simulator highlights without exposing private budget or transaction data.
- **FR-065** The family model shall support at least two roles in MVP: sponsor/parent and learner/member, with clear permissions.
- **FR-066** The product shall provide a family preview experience with safe sample data before invite acceptance or purchase.
- **FR-067** Weekly family recap shall prioritize learning progress, consistency, and challenge outcomes over raw financial totals.
- **FR-068** Transaction-level spending data, income, safe-to-spend values, and budget shortfalls shall remain private by default in family contexts.
- **FR-069** The MVP shall support at least one co-present challenge format, such as quiz or prediction play, that works even if only one member uses the product daily.
- **FR-070** Family invitations shall use deep-linked previews and shareable context rather than aggressive in-product invite spam.

### Feature Area 6 — Gamification System and Mode Controls

**Purpose:** Make consistent financial behavior rewarding without making the product childish, noisy, or manipulative.

#### Mode matrix

| System | Full | Lite | Off |
|---|---|---|---|
| ProsperCoins balance and earning | Visible | Visible | Visible |
| Streaks and milestone tracking | Visible | Visible | Minimal / quiet |
| Leagues / clans / public competition | Visible | Hidden | Hidden |
| Celebration intensity | High | Medium | Low |
| Goldie + Fin companion system | On | On | On |
| Investment simulator | On | On | On |
| Share templates | Optional | Optional | Optional |

#### Prosperity progression
- **Prosperity Keys** should represent skill and consistency milestones, not absolute wealth.
- Achievements should celebrate awareness, reflection, and resilience (for example: first weekly review, first recovery after overspend, first month of consistency).
- Streak protection prevents one bad day from collapsing long-term behavior change.

#### Detailed requirements
- **FR-071** Users can choose Full, Lite, or Off mode during onboarding and change modes later without losing data or progress.
- **FR-072** Off mode shall retain the core loop, Goldie, Fin, simulator learning, and core insights while removing most competitive and cosmetic layers.
- **FR-073** League, leaderboard, and challenge ranking systems shall use normalized progress measures rather than absolute wealth or income.
- **FR-074** Achievements and Prosperity Keys shall be tied to meaningful behaviors and learning milestones rather than raw spend count or app-open count.
- **FR-075** Users can reduce celebration intensity, motion, and social visibility for accessibility and preference reasons.
- **FR-076** Recovery behaviors, zero-spend awareness, and steady consistency shall contribute to progression so the system does not reward unhealthy spending activity.

## Canonical Feature Journeys

### Budget-First first session
1. User selects budget-first intent.
2. Goldie asks for one recent expense.
3. User logs via text or receipt.
4. Goldie updates Daily Spending Power and awards ProsperCoins.
5. Goldie invites an optional handoff to Fin for the first virtual investment.
6. Fin explains the result tomorrow in plain language.

### Invest-First first session
1. User selects invest-first intent.
2. Goldie grants starter ProsperCoins and frames the simulator as education.
3. Fin appears through explicit handoff with three recognizable assets.
4. User makes first virtual purchase.
5. Goldie reconnects the experience to real-world tracking as the way to earn more learning power.

### Teach-Family conversion flow
1. Learner shares a milestone or simulator card.
2. Sponsor opens a preview with sample weekly recap and family learning value.
3. Sponsor starts premium trial or purchase.
4. Family uses recap and challenge surfaces without exposing private financial detail.

## Feature Sequencing and Dependency Notes

| Area | Sprint 1 | Sprint 2 | Sprint 3-4 |
|---|---|---|---|
| Transaction capture | manual entry, receipt scan, PDF/CSV bridge | MobilePay import | PSD2/open banking expansion |
| Goldie insight quality | user-entered + upload-derived | stronger recurring-spend detection | higher-confidence full cash-flow view |
| Fin context | simulator + manual behavior links | MobilePay-informed trade-off insights | PSD2-informed forecasting |
| Subscription detection | upload/manual based | MobilePay-informed | PSD2/open banking informed |
| Family premium | share templates + weekly recap + challenges | richer progress data | broader household workflows |

## Step 2 Hardening Summary

This feature-detail step was shaped by three serious elicitation methods:
- **Comparative Analysis Matrix:** identified where ProsperPals must deliberately diverge from YNAB, Monarch, Cleo, and generic investing apps — especially on first-session value, tone, and family monetization.
- **Red Team vs Blue Team:** hardened the design against coin farming, companion confusion, family surveillance, advice drift, and manual-entry fatigue.
- **Critique & Refine:** tightened the feature set around the real differentiator — the Earn-to-Learn loop — and removed vague or ornamental behavior that would dilute the product.

## Data and Interface Contracts

This section defines the canonical product contracts that engineering, design, analytics, and compliance can build against without re-arguing the meaning of a user, money event, reward, trade, or share. The goal is to keep Sprint 1 manual entry, Sprint 2 MobilePay, and Sprint 3-4 PSD2/open banking on one continuous data model instead of three different systems stitched together later.

### Contract Design Principles

- **One canonical financial record model:** every money input path normalizes into the same `MoneyEvent` contract.
- **Facts first, narrative second:** deterministic services calculate balances, streaks, prices, and rewards; Goldie and Fin explain those facts but do not invent them.
- **Source traceability everywhere:** every meaningful user-facing number must be traceable to raw source records, confidence state, and freshness.
- **Privacy-separated read models:** household/family sharing can only read from explicitly share-safe projections, never directly from private financial tables.
- **Launch-stage continuity:** manual, receipt, PDF/CSV, MobilePay, and PSD2 are sources, not product forks.
- **Multi-currency ready from day 1:** Denmark-first UI may default to DKK, but the underlying model must not hardcode one currency.
- **Append-only ledgers for trust-critical systems:** ProsperCoins, simulator trades, and sensitive audit events must be reconstructable from immutable event history.

### Canonical Domain Entities

#### Identity, Preferences, and Household Context

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `UserAccount` | Core user identity and lifecycle | `id`, `email/phone`, `displayName`, `countryCode`, `baseCurrency`, `createdAt`, `status` | Base currency defaults to DKK for Denmark launch but remains editable. |
| `UserProfile` | Behavioral configuration and onboarding choices | `userId`, `primaryIntent`, `gamificationMode`, `finLevel`, `activeCompanionPresentation`, `locale`, `timezone` | `primaryIntent` is an onboarding hint, not an access restriction. |
| `Household` | Shared context for family or future couple scenarios | `id`, `name`, `planType`, `createdBy`, `status` | MVP supports family preview and parent/learner roles; architecture must not assume single-user forever. |
| `HouseholdMember` | Membership and role assignment | `householdId`, `userId`, `role`, `joinedAt`, `status` | Roles start with `sponsor` and `learner/member`; permissions are explicit. |
| `ConsentGrant` | Granular share/review permissions | `id`, `grantorUserId`, `granteeScope`, `dataCategory`, `accessLevel`, `createdAt`, `revokedAt` | Required for any household sharing beyond share-safe learning artifacts. |
| `NotificationPreference` | Delivery and privacy settings | `userId`, `channel`, `enabled`, `privacyMode`, `quietHours` | Prevents sensitive financial detail from leaking to lock screens. |

#### Financial Capture and Planning Entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `MoneyEvent` | Canonical financial record for spending, income, refund, transfer-like events | `id`, `userId`, `eventType`, `amountMinor`, `currency`, `occurredAt`, `merchantLabel`, `categoryId`, `sourceType`, `verificationState`, `confidenceScore`, `importJobId?`, `artifactId?`, `createdAt` | The single source-of-truth contract for manual entry, OCR, PDF/CSV, MobilePay, and PSD2-normalized records. |
| `MoneyEventRevision` | User corrections or system reclassification history | `id`, `moneyEventId`, `changedFields`, `oldValue`, `newValue`, `changedBy`, `changedAt`, `reasonCode` | Preserves trust when categories or amounts are corrected. |
| `Artifact` | Uploaded receipt, PDF statement, CSV, or image metadata | `id`, `userId`, `artifactType`, `storagePath`, `uploadedAt`, `parseStatus`, `hash`, `pageCount?` | Stores document provenance without embedding parse results into the file object. |
| `ParsedCandidate` | Machine-generated extraction candidates awaiting review/posting | `id`, `artifactId`, `candidateType`, `payloadJson`, `confidenceScore`, `reviewStatus` | Required for low-confidence OCR and bank-statement bridge flows. |
| `ImportConnection` | External source connection metadata | `id`, `userId`, `providerType`, `providerAccountRef`, `status`, `lastSyncAt`, `cursor`, `permissionsJson` | Provider-agnostic wrapper for MobilePay and PSD2 connectors. |
| `ImportJob` | Individual sync or batch import run | `id`, `connectionId?`, `sourceType`, `startedAt`, `completedAt`, `status`, `dedupeSummary`, `errorCode?` | Enables replay, reconciliation, and staged rollouts. |
| `RecurringPattern` | Detected recurring obligations or subscriptions | `id`, `userId`, `merchantFingerprint`, `typicalAmountMinor`, `cadence`, `confidenceScore`, `status`, `lastMatchedAt` | Derived model, never the raw source of truth. |
| `PlanningProfile` | Budgeting assumptions and pay-cycle logic | `userId`, `planningMode`, `payCycleAnchor`, `rollingWindowDays`, `incomeCadence`, `lastUpdatedAt` | Supports fixed monthly and irregular-income planning. |
| `SpendingPowerSnapshot` | Materialized daily planning view | `id`, `userId`, `snapshotDate`, `safeToSpendMinor`, `currency`, `moodLabel`, `inputWindowJson`, `calculationVersion`, `generatedAt` | Cached read model for the passive daily hook. |

#### ProsperCoins, Progression, and Engagement Entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `ProsperCoinLedgerEvent` | Append-only ProsperCoin balance history | `id`, `userId`, `eventKind`, `deltaCoins`, `reasonCode`, `referenceType`, `referenceId`, `createdAt`, `idempotencyKey` | Balance is derived, never hand-edited. |
| `ProsperCoinBalanceView` | Fast current balance read model | `userId`, `availableCoins`, `pendingCoins`, `lifetimeEarned`, `lastCalculatedAt` | Rebuildable from the ledger. |
| `StreakState` | Current streak and freeze status | `userId`, `streakDays`, `lastQualifiedDate`, `freezeCount`, `updatedAt` | Derived from qualifying actions and freeze usage. |
| `AchievementProgress` | Skill and milestone progression | `id`, `userId`, `achievementCode`, `progress`, `status`, `awardedAt?` | Must represent behavior/learning, not wealth. |
| `LeagueSeasonMembership` | Optional competitive grouping | `id`, `userId`, `seasonId`, `leagueTier`, `scoreNormalized`, `status` | Hidden in Lite/Off but data model remains compatible. |

#### Simulator, Market Data, and Learning Entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `AssetCatalog` | Curated simulator asset universe | `assetId`, `symbol`, `displayName`, `assetType`, `region`, `launchStatus`, `educationTag` | MVP uses recognizable equities, broad exposure, and major crypto only. |
| `MarketPriceSnapshot` | Immutable price point used for display or trade | `id`, `assetId`, `priceMinor`, `currency`, `capturedAt`, `provider`, `delayClass`, `freshnessSeconds` | Freshness must be surfaced in-product. |
| `VirtualPortfolio` | User’s simulator portfolio shell | `id`, `userId`, `baseCurrency`, `createdAt`, `status` | One active portfolio per user in MVP is acceptable, but model should not prevent future themed portfolios. |
| `VirtualPosition` | Current holdings read model | `portfolioId`, `assetId`, `units`, `avgCostCoins`, `marketValueCoins`, `updatedAt` | Derived from executed trades plus current price snapshots. |
| `VirtualOrder` | User trade intent | `id`, `portfolioId`, `assetId`, `side`, `requestedUnits`, `quotedPriceSnapshotId`, `quotedCostCoins`, `submittedAt`, `status` | Supports review/confirmation before execution when needed. |
| `VirtualTradeExecution` | Immutable executed trade ledger | `id`, `orderId`, `portfolioId`, `assetId`, `units`, `executionPriceSnapshotId`, `coinsDebited`, `executedAt` | Critical for auditability and replay. |
| `LearningTrack` | Structured education curriculum | `trackId`, `title`, `level`, `topic`, `status` | Enables beginner/intermediate/advanced progression. |
| `LearningProgress` | User-specific lesson progression | `userId`, `trackId`, `lessonId`, `state`, `score?`, `completedAt?` | Private by default; only milestone-safe projections are shareable. |
| `ScenarioEstimate` | What-if modeling output | `id`, `userId`, `scenarioType`, `inputsJson`, `resultJson`, `assumptionsJson`, `generatedAt`, `label` | Explicitly educational, not advisory. |

#### Conversation, Insight, and Sharing Entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `ConversationThread` | Shared context between Goldie/Fin and the user | `id`, `userId`, `activePersona`, `contextVersion`, `createdAt`, `updatedAt` | One thread with persona overlays preserves continuity and fallback-to-one-companion capability. |
| `ConversationMessage` | Individual turn in the conversation | `id`, `threadId`, `authorType`, `personaTag`, `messageType`, `body`, `createdAt`, `factBundleId?` | Persona tag records Goldie vs Fin without splitting history. |
| `InsightRecord` | Generated financial or educational insight | `id`, `userId`, `insightType`, `factBundleJson`, `explanationMessageId`, `confidenceBand`, `createdAt`, `dismissedAt?` | Every insight must trace back to deterministic inputs. |
| `ExplanationFeedback` | User calibration feedback for AI outputs | `id`, `messageId`, `feedbackType`, `topic`, `createdAt` | Used to tune depth and tone over time. |
| `ShareArtifact` | Social/share-safe card or preview | `id`, `userId`, `artifactType`, `projectionJson`, `visibilityScope`, `createdAt`, `expiresAt?` | Must not contain private financial facts. |
| `WeeklyRecap` | Family-safe summary artifact | `id`, `userId`, `householdId?`, `summaryPeriod`, `summaryJson`, `visibilityLevel`, `generatedAt` | Reads from safe projections only. |
| `FamilyChallenge` | Co-present learning activity | `id`, `householdId`, `challengeType`, `rulesJson`, `startedAt`, `completedAt?`, `status` | Designed for engagement without exposing private spend detail. |
| `AuditEvent` | Sensitive system and policy trail | `id`, `userId?`, `eventType`, `subjectType`, `subjectId`, `metadataJson`, `createdAt` | Required for compliance review, reversals, and incident response. |

### Core State and Verification Contracts

#### Money Event verification states

| State | Meaning | User Impact |
|---|---|---|
| `verified-imported` | Imported from trusted external source and passed dedupe rules | Eligible for full insights and reward logic subject to rule caps |
| `user-confirmed` | Parsed or entered record reviewed/confirmed by the user | Eligible for full insights and most rewards |
| `estimated` | User-entered approximation or low-confidence import | Included in planning with approximate language |
| `system-suspect` | Potential duplicate, malformed, or abuse-flagged record | Excluded from full rewards until resolved |
| `reversed` | Voided by user/system with audit trail | Must not silently disappear from history |

#### Trade execution states

`quoted` → `submitted` → `executed` or `expired` or `rejected`

The product must never present a trade as executed without an associated price snapshot, coin debit event, and execution timestamp. If price freshness breaches launch thresholds, the order must be blocked or explicitly labeled before execution.

#### Consent lifecycle

`granted` → `active` → `revoked` → `expired`

Revocation must stop new household recaps, new share projections, and new partner/family visibility immediately. Historical audit events remain for compliance, but live household read models must update on the next projection cycle.

## Technical and Interface Requirements

### Canonical data contracts

- **FR-077** ProsperPals shall normalize manual entry, receipt OCR, PDF/CSV imports, MobilePay imports, and PSD2 imports into one canonical `MoneyEvent` contract.
- **FR-078** All monetary amounts shall be stored as integer minor units plus ISO currency code; UI formatting shall be a presentation concern.
- **FR-079** Every `MoneyEvent`, `MarketPriceSnapshot`, and `InsightRecord` shall carry provenance metadata including source type, created/generated time, and confidence or freshness state.
- **FR-080** Low-confidence parsed candidates shall require review or explicit user confirmation before becoming posted `MoneyEvent` records.
- **FR-081** Deterministic calculation services shall produce Daily Spending Power, category totals, recurring pattern detection, ProsperCoin awards, and trade math; Goldie and Fin may explain these outputs but shall not author the underlying numeric facts.
- **FR-082** The transaction import layer shall use provider adapters so MobilePay and PSD2 integrations can be added without changing the `MoneyEvent` contract or downstream logic.
- **FR-083** Import jobs shall be replayable and idempotent, with duplicate detection based on provider reference, timestamp windows, normalized amount, and merchant fingerprint where available.
- **FR-084** Derived planning models such as `RecurringPattern` and `SpendingPowerSnapshot` shall be recalculable from canonical source records and versioned calculation rules.

### ProsperCoins and simulator contracts

- **FR-085** ProsperCoins shall be stored in an append-only ledger with reference links to the triggering action, and current balance shall be computed from ledger events rather than manually maintained as a mutable field.
- **FR-086** Simulator trades shall be stored as immutable execution records linked to both a quoted market snapshot and the ProsperCoin ledger event used to fund the trade.
- **FR-087** ProsperPals shall block or explicitly warn on trade execution when market price freshness exceeds the configured education-safe threshold for that asset class.
- **FR-088** Portfolio holdings, streak counts, and league scores shall be exposed as derived read models that can be rebuilt from ledgers and qualifying events.

### Conversation, sharing, and trust contracts

- **FR-089** Goldie and Fin shall operate on a shared conversation thread with persona tags so the product can preserve context while still presenting distinct companions.
- **FR-090** Every user-facing insight and explanation shall be linked to a fact bundle or source bundle that can be surfaced in a “why am I seeing this?” view.
- **FR-091** Share artifacts, family previews, and weekly recaps shall be generated from share-safe projection models and shall not query private transaction-level tables directly.
- **FR-092** Sharing permissions shall be modeled as granular consent grants by data category, audience, and access level, with revocation timestamps.
- **FR-093** Revoking a consent grant shall stop future household or family visibility immediately and shall remove revoked data from future recaps, previews, and dashboards.
- **FR-094** ProsperPals shall create auditable security events for consent changes, import connection changes, trade execution, account recovery, and any admin-level data correction.
- **FR-095** Push notifications, previews, and lock-screen-visible content shall not contain transaction amounts, merchant names, spending categories, safe-to-spend values, or budget shortfall data.

### API and integration contracts

- **FR-096** All client write operations that create or mutate trust-critical records shall accept an idempotency key so offline retries and network retries do not create duplicate events.
- **FR-097** The platform shall support offline capture queues for manual entries and user confirmations, with duplicate suppression and ordered replay on reconnect.
- **FR-098** All core loop state changes shall emit domain events for analytics and orchestration, including at minimum `money.logged`, `candidate.confirmed`, `coins.awarded`, `trade.executed`, `insight.generated`, and `share.created`.
- **FR-099** External provider adapters shall normalize upstream schemas into canonical internal contracts before any reward, planning, or AI logic runs.
- **FR-100** Market data services shall expose quote source, freshness, delay class, and fallback-provider status to downstream simulator and explanation services.
- **FR-101** The import interface shall support staged sources from launch day: `manual`, `receipt`, `pdf`, `csv`, `mobilepay`, and `psd2`.
- **FR-102** All insight-generation services shall distinguish verified, user-confirmed, estimated, corrected, and suspect data states in both logic and user-facing phrasing.
- **FR-103** Family preview mode shall use isolated safe sample data and shall not require another real household member to exist before value is shown.
- **FR-104** AI generation interfaces shall enforce an education-only policy layer that blocks suitability language, certainty claims, or direct real-world product recommendations before responses reach the user.

## Interface Specifications

### Client-facing API surface

| Endpoint / Action | Purpose | Required Request Fields | Contract Notes |
|---|---|---|---|
| `POST /api/onboarding/intent` | Persist primary intent and default mode | `primaryIntent`, `gamificationMode`, `timezone`, `locale` | Must be editable later; no hard lock on product access. |
| `POST /api/money-events` | Create manual money event | `idempotencyKey`, `eventType`, `amountMinor`, `currency`, `occurredAt`, `merchantLabel?`, `categoryId?`, `sourceType=manual` | Returns posted event plus reward preview if eligible. |
| `POST /api/artifacts` | Upload receipt/PDF/CSV/image artifact | `artifactType`, `file`, `idempotencyKey` | Returns artifact id and parse status. |
| `POST /api/artifacts/{id}/parse` | Start or retry parse | `parseMode` | Produces `ParsedCandidate` records; low-confidence candidates remain reviewable. |
| `POST /api/parsed-candidates/{id}/confirm` | Turn candidate into canonical event(s) | `idempotencyKey`, `confirmationMode`, `overrides?` | Must preserve original candidate payload and any user edits. |
| `POST /api/import-connections` | Create MobilePay/PSD2 connection | `providerType`, `authPayload`, `permissions` | Returns connection status and next sync expectations. |
| `POST /api/import-jobs` | Trigger manual sync | `connectionId` or `sourceType` | Sync must be safe to retry. |
| `GET /api/spending-power` | Read latest Daily Spending Power | `date?` | Returns snapshot, calculation inputs, and freshness/version info. |
| `GET /api/prospercoins/balance` | Read available coin state | none | Returned balance must reconcile to ledger state. |
| `POST /api/simulator/orders` | Submit virtual trade | `idempotencyKey`, `assetId`, `side`, `requestedUnits` or `requestedCoins`, `quoteSnapshotId` | Reject if quote stale beyond policy threshold or if coins insufficient. |
| `GET /api/portfolio/summary` | Portfolio overview | `portfolioId?` | Returns holdings, latest quote freshness, gain/loss summaries, and learning prompts. |
| `POST /api/fin/scenarios` | Request educational what-if scenario | `scenarioType`, `inputsJson` | Must label outputs educational and persist assumptions. |
| `POST /api/shares` | Create share-safe card | `artifactType`, `sourceReference`, `visibilityScope` | Input may reference milestone or simulator highlight, never raw financial tables. |
| `POST /api/households/invitations` | Invite family member or open preview path | `householdId?`, `inviteeContact?`, `previewMode` | Preview must work without a live second member. |

### Internal service contracts

| Service Contract | Input | Output | Failure Behavior |
|---|---|---|---|
| `TransactionNormalizationService` | raw source payload + source metadata | one or more canonical `MoneyEvent` objects + dedupe hints | Marks records `system-suspect` rather than dropping ambiguous data silently |
| `RewardRulesService` | canonical event or learning action | ProsperCoin ledger delta + explanation text key | Must be deterministic and versioned |
| `PlanningEngine` | canonical money events + planning profile + recurring patterns | `SpendingPowerSnapshot` + explanation facts | If data is sparse, output approximate ranges instead of false precision |
| `MarketQuoteService` | asset ids | `MarketPriceSnapshot` records with freshness metadata | Falls back to secondary provider and flags degraded mode |
| `SimulatorExecutionService` | trade intent + quote snapshot + balance state | `VirtualTradeExecution` + ledger events + updated positions | Must be atomic; partial success is forbidden |
| `InsightComposer` | fact bundle + persona + topic + calibration state | explanation payload + compliance annotations | Must reject blocked advisory language |
| `ShareProjectionService` | milestone/summary reference + visibility policy | share-safe projection JSON | Must fail closed if source reference contains private finance fields |

### Domain event contracts

| Event | Trigger | Required Payload |
|---|---|---|
| `money.logged` | Posted money event created | `userId`, `moneyEventId`, `sourceType`, `verificationState`, `amountMinor`, `currency`, `occurredAt` |
| `candidate.confirmed` | Parsed candidate approved | `userId`, `candidateId`, `artifactId`, `resultingMoneyEventIds[]` |
| `coins.awarded` | ProsperCoin ledger credit posted | `userId`, `ledgerEventId`, `deltaCoins`, `reasonCode`, `referenceType`, `referenceId` |
| `trade.executed` | Simulator trade execution posted | `userId`, `portfolioId`, `tradeExecutionId`, `assetId`, `coinsDebited`, `quoteSnapshotId` |
| `insight.generated` | Goldie or Fin insight persisted | `userId`, `insightId`, `insightType`, `confidenceBand`, `personaTag` |
| `share.created` | Share artifact generated | `userId`, `shareArtifactId`, `artifactType`, `visibilityScope` |

## Trust, Compliance, and Audit Requirements

### Data classification and handling contract

| Data Class | Examples | Default Visibility | Handling Rule |
|---|---|---|---|
| `private-financial` | raw transactions, safe-to-spend value, income, category spend | only the user | never exposed through share projections or household views without explicit grant |
| `private-learning` | lesson attempts, quiz mistakes, explanation feedback | only the user | family views may show milestone completion, never raw score by default |
| `share-safe-progress` | milestones completed, simulator highlight, streak badge, Prosperity Key tier | user-controlled sharing | generated through safe projections only |
| `system-sensitive` | auth events, device history, import credentials metadata | internal only | encrypted, audited, least-privilege access |

### Compliance operating rules

- Financial education positioning must be reflected not only in copy, but in interface behavior, data labels, and API policy enforcement.
- Simulator choices may highlight why an asset is educationally relevant, but they must not imply suitability for the user’s real money.
- Every insight that uses estimated data must visibly hedge its phrasing.
- Household sharing defaults to milestone visibility, not financial surveillance.
- Auditability is a product requirement, not a back-office extra, because trust failures in financial products are product failures.

## Measurable Non-Functional Requirements

- **NFR-001 Performance:** The authenticated mobile app shell shall render the first meaningful view in <= 2.5 seconds p95 on a mid-range mobile device over 4G.
- **NFR-002 Logging Latency:** Manual money-event submission shall return confirmation and reward outcome in <= 1.5 seconds p95 when the device is online.
- **NFR-003 OCR Latency:** Receipt parsing shall return an initial parse result or clear progress state in <= 6 seconds p95.
- **NFR-004 Planning Latency:** Reading the latest Daily Spending Power snapshot shall complete in <= 1.0 second p95; a forced recalculation shall complete in <= 4.0 seconds p95.
- **NFR-005 Simulator Responsiveness:** Portfolio summary retrieval shall complete in <= 2.0 seconds p95, and trade submission shall resolve to executed/rejected/expired in <= 2.5 seconds p95 when quotes are fresh.
- **NFR-006 Reliability:** Core logging, balance, and portfolio APIs shall achieve >= 99.5% monthly availability excluding scheduled maintenance.
- **NFR-007 Ledger Integrity:** ProsperCoin awards, debits, and simulator executions shall be atomic, durable, and replay-safe; the system shall tolerate retries without double-posting.
- **NFR-008 Security:** All financial and identity data shall be encrypted in transit and at rest; secrets and provider credentials shall be stored outside application code and rotated on a defined schedule.
- **NFR-009 Recovery Objectives:** Backup and recovery procedures shall support an RPO of <= 5 minutes and an RTO of <= 60 minutes for trust-critical ledgers and canonical financial records.
- **NFR-010 Traceability:** 100% of user-facing insights, rewards, and trade confirmations shall be traceable to underlying source records, rules versions, and timestamps in internal audit views.
- **NFR-011 Offline Resilience:** Offline-captured manual entries and confirmations shall sync within <= 30 seconds p95 after reconnect and preserve original client timestamps.
- **NFR-012 Privacy by Notification:** Contract tests shall enforce that push payloads never include private-financial fields such as merchant, amount, category, or safe-to-spend values.
- **NFR-013 Data Freshness Transparency:** 100% of displayed market prices shall include freshness metadata; quotes older than 4 hours shall show a degraded-state label.
- **NFR-014 Audit Retention:** Sensitive audit events covering consent, import connections, account recovery, and trade execution shall be retained for at least 24 months.

## Step 3 Elicitation Outcomes

### Architecture Decision Records

| ADR | Decision | Why It Was Chosen | Product Consequence |
|---|---|---|---|
| ADR-001 | Use one canonical `MoneyEvent` model across all ingestion paths | Prevent Sprint 1, Sprint 2, and Sprint 3-4 from becoming separate systems | Goldie, planning, rewards, and analytics can work consistently regardless of source |
| ADR-002 | Separate deterministic financial computation from LLM explanation | Trust collapses if the LLM becomes the calculator | Engineering must maintain fact bundles and rule engines as first-class services |
| ADR-003 | Use append-only ledgers for ProsperCoins and simulator executions | Auditability and reversibility matter more than convenience | Balances and holdings become derived views, not hand-edited state |
| ADR-004 | Goldie and Fin share one thread with persona tags | Supports explicit handoffs plus fallback to one adaptive companion | Conversation continuity survives persona presentation changes |
| ADR-005 | Build family views from share-safe projections only | Privacy and virality need different data paths | Family features cannot accidentally expose raw finance data |
| ADR-006 | Make currency multi-currency in storage from day 1 | Denmark-first must not become Denmark-locked | UI can stay DKK-first while architecture stays Nordic/EU-ready |

### Cross-Functional War Room Resolutions

- **Design + Engineering:** low-confidence parsing must create reviewable candidates, not auto-posted transactions, because trust beats automation theater.
- **Product + Compliance:** the first-pick asset flow remains allowed only if framed as education and bound to policy checks that block suitability language.
- **Growth + Privacy:** share cards and family previews are permitted growth surfaces only if they are backed by projection models that exclude private spend data.
- **Operations + Engineering:** idempotency and replay were treated as launch requirements, not later hardening, because offline mobile usage and flaky connectivity are normal use cases.
- **Product + Analytics:** event emission was required at the contract layer so WACLC and step-level funnel analysis do not depend on ad hoc front-end instrumentation.

### Self-Consistency Validation for This Step

- The contracts preserve the **80-second onboarding** promise by keeping manual entry, OCR, and starter-invest flows on the same write APIs and reward rules.
- The contracts protect the **financial wellness, not advice** positioning by separating educational explanation from recommendation logic and enforcing policy checks before AI output reaches users.
- The contracts preserve **Off mode** by making gamification visibility a presentation concern; the core simulator, planning, and companion contracts still work even when competition layers are hidden.
- The contracts support **Thomas conversion without surveillance** by modeling family previews and share cards as safe projections rather than raw household ledger access.
- The contracts support **Denmark-first launch sequencing** while remaining extensible for MobilePay, PSD2, and later multi-currency expansion.

## Step 3 Hardening Summary

This contracts step was deliberately hardened through three complementary elicitation methods:
- **Architecture Decision Records:** forced explicit choices on canonical records, ledgers, companion context, privacy boundaries, and multi-currency readiness so the architecture cannot drift later.
- **Cross-Functional War Room:** reconciled design smoothness, growth needs, legal boundaries, analytics needs, and engineering realities into one set of enforceable contracts.
- **Self-Consistency Validation:** verified that the new contracts do not break the 80-second promise, the off-mode promise, the education-not-advice position, or the family privacy model established earlier in the PRD.

 would dilute the product.

