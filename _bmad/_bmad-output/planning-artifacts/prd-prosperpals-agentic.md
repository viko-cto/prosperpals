---
stepsCompleted:
  - 1-prd-foundation
inputDocuments:
  - _bmad/_bmad-output/planning-artifacts/product-brief-prosperpals-agentic-2026-03-07.md
  - /home/node/clawd/research/prosperpals/bmad-session-notes-product-brief.md
  - /home/node/clawd/research/prosperpals/2026-03-16.md
  - /home/node/clawd/research/prosperpals/2026-03-17.md
workflowType: 'prd'
phase: 'prd'
step: 1
stepName: 'foundation'
elicitationMethods:
  - first-principles
  - pre-mortem
  - cross-functional-war-room
status: 'draft-in-progress'
---

# Product Requirements Document - ProsperPals

**Product:** ProsperPals  
**Owner:** Nikolas / CopenDapp Labs  
**Prepared by:** Viko  
**Date:** 2026-03-17  
**Status:** Draft — Step 1 foundation complete

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
