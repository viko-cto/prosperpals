---
stepsCompleted:
  - 1-p0-mvp-launch-epics
  - 2-p1-sprint-2-4-enhancements
  - 3-p2-post-mvp-expansion
inputDocuments:
  - _bmad/_bmad-output/planning-artifacts/product-brief-prosperpals-agentic-2026-03-07.md
  - _bmad/_bmad-output/planning-artifacts/prd-prosperpals-agentic.md
  - _bmad/_bmad-output/planning-artifacts/ux-design-prosperpals.md
  - _bmad/_bmad-output/planning-artifacts/architecture-prosperpals.md
  - /home/node/clawd/research/prosperpals/bmad-session-notes-product-brief.md
workflowType: 'epics-stories'
phase: 'epics-stories'
step: 3
stepName: 'p2-post-mvp-expansion'
elicitationMethods:
  - architecture-decision-records
  - cross-functional-war-room
  - self-consistency-validation
status: 'draft-complete'
---

# Epics & Stories Breakdown - ProsperPals

**Product:** ProsperPals  
**Owner:** Nikolas / CopenDapp Labs  
**Prepared by:** Viko  
**Date:** 2026-03-19  
**Status:** P0 + P1 + P2 backlog complete — ready for readiness check

## Overview

This document translates the approved ProsperPals product brief, PRD, UX specification, and architecture into the first durable delivery backlog for engineering. This step deliberately focuses on **P0 MVP launch requirements** only: the minimum coherent set of epics and stories needed to prove the category thesis in Denmark-first launch conditions.

The P0 backlog is designed around one product truth: ProsperPals only works if a user can move through **Log -> Earn -> Invest -> Learn -> Repeat** quickly, trust the numbers, and feel helped rather than judged.

This step therefore prioritizes:
- fast first-session value without mandatory bank linking
- Goldie-led spending awareness with Daily Spending Power
- ProsperCoins as a reward for awareness, not spending volume
- Fin-led educational simulation with real market data and explicit trust labels
- privacy-safe sharing and family preview value
- auditability, provenance, consent, and release safety from day 1

## Prioritization Frame

### P0 in this step
Build the Denmark-first MVP launch backbone.

### P1 in the next step
Add Sprint 2-4 enhancements, especially MobilePay automation, richer insight quality, and broader family/premium depth.

### P2 in the final epic step
Add post-MVP scale-up: PSD2/open banking breadth, multi-market expansion, deeper personalization, and advanced support/tooling maturity.

## Requirements Inventory

### Functional Requirement Clusters Used for P0 Decomposition

- **FR-001 to FR-007:** onboarding, intent capture, first loop completion, and 80-second time-to-value
- **FR-008 to FR-012:** companion role rules, tone, and fallback presentation logic
- **FR-013 to FR-016:** forward-looking spending guidance and receipt review requirements
- **FR-017 to FR-024:** ProsperCoins, streaks, anti-spend incentives, and mode-driven motivation
- **FR-025 to FR-032:** family preview, safe sharing, and compliance/trust boundaries
- **FR-033 to FR-041:** Goldie capture flows, OCR confidence handling, Daily Spending Power, recurring detection, zero-spend, PDF/CSV audit, and recovery guidance
- **FR-042 to FR-049:** Goldie-to-Fin handoff, first pick experience, adaptive learning, scenarios, and education-not-advice enforcement
- **FR-050 to FR-056:** ProsperCoin award logic, anti-abuse controls, sinks, and future reward expansion compatibility
- **FR-057 to FR-063:** curated simulator universe, quote freshness, portfolio views, trade limits, and learning cards
- **FR-064 to FR-070:** share templates, family roles, preview flows, recap behavior, co-present challenges, and invite mechanics
- **FR-071 to FR-076:** Full/Lite/Off mode behavior, normalized ranking, achievement logic, reduced celebration intensity, and healthy progression rules
- **FR-077 to FR-084:** canonical `MoneyEvent`, provenance metadata, review gates, deterministic planning logic, provider adapters, and replay-safe recalculation
- **FR-085 to FR-088:** append-only ledgers for ProsperCoins and simulator execution plus derived read models
- **FR-089 to FR-095:** shared conversation thread, explainability bundles, share-safe projections, consent grants, audit events, and privacy-safe notifications
- **FR-096 to FR-104:** idempotent writes, offline queues, domain events, normalized provider adapters, quote freshness contracts, staged sources, and policy-safe AI generation

### Non-Functional Requirements Used in P0

- **NFR-001:** first meaningful authenticated view in <= 2.5s p95 on mid-range mobile over 4G
- **NFR-002:** manual money-event confirmation + reward response in <= 1.5s p95 online
- **NFR-003:** receipt parse initial result or progress state in <= 6s p95
- **NFR-004:** Daily Spending Power read <= 1.0s p95 and forced refresh <= 4.0s p95
- **NFR-005:** portfolio summary <= 2.0s p95 and trade resolution <= 2.5s p95 when quotes are fresh
- **NFR-006:** core logging/balance/portfolio APIs >= 99.5% monthly availability
- **NFR-007:** ProsperCoin and simulator ledgers must be atomic, durable, replay-safe, and retry-safe
- **NFR-008:** encryption in transit and at rest; secrets rotated outside app code
- **NFR-009:** trust-critical ledgers/canonical finance records support RPO <= 5 minutes and RTO <= 60 minutes
- **NFR-010:** all user-facing insights, rewards, and trade confirmations must be traceable internally
- **NFR-011:** offline-captured events sync within <= 30s p95 after reconnect
- **NFR-012:** notifications must never expose private financial fields
- **NFR-013:** all market prices display freshness metadata; >4h quotes show degraded labels
- **NFR-014:** sensitive audit events retained for at least 24 months

### Additional Architecture and UX Requirements That Shape P0

- Landing route remains user-controlled with **no auto-redirect**.
- Goldie and Fin are two personas over one shared conversation/orchestration system.
- Trust-critical writes and AI orchestration must stay on **Node runtimes**, not edge-first execution.
- The MVP is a **web-first PWA** with mobile-first interaction and one-handed primary flows.
- `MoneyEvent`, ProsperCoin ledger events, and simulator executions are the trust-critical canonical records.
- Share cards, previews, and family recaps may only read from **share-safe projections**, never raw finance tables.
- Provider adapters must keep launch-day manual/receipt/PDF/CSV sources on the same downstream data model as future MobilePay/PSD2 sources.
- Feature flags, trace IDs, smoke tests, and migration gates are P0 concerns because trust failures in a finance product are launch-killers.
- Daily Spending Power, portfolio movement, and trust/provenance labels must survive mixed-freshness states gracefully.
- Full/Lite/Off modes are presentation variants over the same product core, not separate implementation branches.
- Receipt review must be faster than manual entry and always show confidence/review state.
- Family value must feel like collaborative coaching, not surveillance.

## P0 Epic List

### Epic P0.1: Reach first value fast and safely
A new user can start ProsperPals, authenticate, choose intent and product intensity, and reach a meaningful first value moment without bank linking or confusion.

**Primary FRs covered:** FR-001 to FR-007, FR-008, FR-011 to FR-012, FR-021, FR-042 to FR-045, FR-071 to FR-072, FR-089, FR-096 to FR-098  
**Key NFRs:** NFR-001, NFR-002, NFR-010, NFR-011

### Epic P0.2: Capture money and understand today
A user can log money events, review OCR results, see Daily Spending Power, and uncover recurring/subscription patterns from launch-day sources.

**Primary FRs covered:** FR-013 to FR-016, FR-033 to FR-041, FR-077 to FR-084, FR-096 to FR-102  
**Key NFRs:** NFR-002, NFR-003, NFR-004, NFR-006, NFR-010, NFR-011

### Epic P0.3: Earn progress without rewarding unhealthy behavior
A user can earn ProsperCoins for awareness, preserve motivation through healthy progression rules, and switch product intensity without losing value.

**Primary FRs covered:** FR-017, FR-020 to FR-024, FR-039, FR-050 to FR-056, FR-071 to FR-076, FR-085, FR-088  
**Key NFRs:** NFR-002, NFR-007, NFR-010

### Epic P0.4: Learn investing with Fin in a trust-safe simulator
A user can spend ProsperCoins in an educational simulator, see trustworthy market freshness, and receive explanations that feel useful rather than risky or promotional.

**Primary FRs covered:** FR-018 to FR-019, FR-042 to FR-049, FR-057 to FR-063, FR-086 to FR-090, FR-100, FR-104  
**Key NFRs:** NFR-005, NFR-007, NFR-010, NFR-013

### Epic P0.5: Share learning safely and preview family value
A sponsor or learner can see family-plan value, share progress safely, and engage in a small collaborative loop without exposing private financial data.

**Primary FRs covered:** FR-025 to FR-027, FR-064 to FR-070, FR-091 to FR-095, FR-103  
**Key NFRs:** NFR-008, NFR-010, NFR-012, NFR-014

### Epic P0.6: Make every number explainable and every launch reversible
Users, support, and compliance stakeholders can trust the system because facts are explainable, consent is enforceable, and failures are observable and recoverable.

**Primary FRs covered:** FR-028 to FR-032, FR-077 to FR-104 (trust, consent, audit, replay, policy, events, and notifications), plus operational architecture requirements from the architecture phase  
**Key NFRs:** NFR-006 to NFR-014

## Detailed P0 Epics and Stories

## Epic P0.1: Reach first value fast and safely

**Goal:** deliver the first coherent ProsperPals experience without mandatory bank linking, with explicit control over intent, mode, and the Goldie-to-Fin transition.

### Story P0.1.1: Launch landing, entry points, and controlled authentication shell
**Description:** Build the unauthenticated landing route and auth handoff so users can start with Goldie, practice investing, or preview family value without being auto-redirected or losing context.

**Acceptance Criteria:**
- **Given** a new visitor opens ProsperPals, **when** the landing route loads, **then** the visitor sees three primary entry paths (`Start with Goldie`, `Practice investing`, `Preview family value`) **and** the route does not auto-redirect.
- **Given** a visitor selects an entry path and signs up or signs in, **when** authentication succeeds, **then** the product resumes the selected path **and** preserves locale defaults for Denmark-first launch (`da-DK`/DKK-ready profile settings or equivalent).
- **Given** the user has not completed onboarding, **when** they return after auth interruption or refresh, **then** onboarding state is resumable **and** duplicate profile creation is prevented.

**Estimated Complexity:** M

### Story P0.1.2: Budget-first onboarding to first logged insight
**Description:** Deliver the budget-first first-session flow where Goldie collects one expense, explains its immediate consequence, and gets the user to their first useful value moment within the 80-second target.

**Acceptance Criteria:**
- **Given** a new user chooses the budget-first path, **when** Goldie prompts for a recent expense, **then** the user can submit it via text, voice-to-text, structured manual entry, or receipt initiation **and** no mandatory category setup appears first.
- **Given** a valid first expense is confirmed, **when** Goldie responds, **then** the user sees the recorded amount/category, an immediate consequence or spending-context insight, **and** the response is explicitly non-judgmental.
- **Given** analytics are enabled, **when** the user completes this first-session flow, **then** the system emits onboarding and first-value events **and** measures whether the flow remained within the 80-second promise.

**Estimated Complexity:** M

### Story P0.1.3: Invest-first onboarding with explicit Goldie-to-Fin handoff
**Description:** Deliver the invest-first onboarding path where Goldie frames the simulator as educational, hands off explicitly to Fin, and the user makes one meaningful first pick without confusion.

**Acceptance Criteria:**
- **Given** a new user chooses `Practice investing`, **when** onboarding begins, **then** Goldie frames the simulator as educational, not advisory, **and** the user receives starter ProsperCoins or the equivalent approved first-session funding path.
- **Given** the user is ready to continue, **when** Goldie hands off to Fin, **then** the handoff is explicit in copy and UI state **and** the active companion identity remains visible.
- **Given** Fin presents the first pick screen, **when** it renders, **then** exactly three recognizable assets are shown with one-line relevance hooks and freshness context **and** no recommendation language is used.

**Estimated Complexity:** M

### Story P0.1.4: Persist user preferences for mode, explanation depth, and companion presentation
**Description:** Store and apply profile-level preferences so ProsperPals remembers gamification intensity, explanation depth, and companion presentation/fallback behavior across sessions.

**Acceptance Criteria:**
- **Given** a user chooses Full, Lite, or Off mode during onboarding or later, **when** the preference is saved, **then** it persists across sessions **and** does not fork the underlying product logic.
- **Given** a user gives feedback that Fin is too basic or too advanced, **when** the preference is updated, **then** future explanations reflect the new depth target **and** existing conversation context remains intact.
- **Given** companion presentation fallback is enabled for a test cohort or configuration, **when** the user resumes the app, **then** the shared conversation still works **and** no data migration is required.

**Estimated Complexity:** S

## Epic P0.2: Capture money and understand today

**Goal:** make launch-day data capture genuinely useful even before MobilePay or PSD2 exist, while preserving canonical records, confidence handling, and traceable planning outputs.

### Story P0.2.1: Canonical MoneyEvent write path for manual, text, and voice-assisted logging
**Description:** Create the authenticated command flow that turns manual/text/voice-assisted user inputs into canonical `MoneyEvent` records with idempotency, source labeling, and review state.

**Acceptance Criteria:**
- **Given** an authenticated user logs a money event by text, voice-to-text, or structured quick action, **when** the event is submitted, **then** the system normalizes it into one canonical `MoneyEvent` contract **and** stores amount in minor units plus currency code.
- **Given** the same write is retried because of offline replay or network retry, **when** the request carries the same idempotency key, **then** no duplicate canonical event is created **and** the user receives a consistent outcome.
- **Given** the input is incomplete or low-confidence, **when** normalization finishes, **then** the system preserves confidence/provenance metadata **and** routes the event into the correct confirm-or-review state instead of inventing certainty.

**Estimated Complexity:** L

### Story P0.2.2: Receipt OCR parse, review sheet, and confirmation flow
**Description:** Build receipt ingestion for Sprint 1 so a user can scan a receipt, review extracted fields, correct them quickly, and post only confirmed records.

**Acceptance Criteria:**
- **Given** a user uploads or captures a receipt, **when** OCR/parsing runs, **then** the product returns an initial parse result or explicit progress state within the P0 latency budget **and** shows merchant/date/total/category confidence where available.
- **Given** any extracted field is low-confidence, **when** the review sheet opens, **then** the product highlights what needs attention **and** requires explicit confirmation before posting a canonical `MoneyEvent`.
- **Given** a user confirms or edits the parsed receipt, **when** posting succeeds, **then** Goldie can immediately convert the record into a spending insight **and** the scan-review path is measurably faster than full manual entry.

**Estimated Complexity:** L

### Story P0.2.3: Daily Spending Power, mood label, and forward-looking home card
**Description:** Compute and display the forward-looking money state that answers “where do I stand today?” with clear provenance and mixed-freshness handling.

**Acceptance Criteria:**
- **Given** a user opens the authenticated home view, **when** current planning data is available, **then** the home screen shows Daily Spending Power, a mood label (`tight`, `comfortable`, `flush`, or equivalent), **and** explains the inputs used.
- **Given** the user has irregular income mode enabled, **when** the spending-power card is rendered, **then** it uses rolling-average planning rules **and** preserves prior event history.
- **Given** some inputs are estimated, corrected, or stale, **when** the card is shown, **then** the data state is labeled clearly **and** the UI degrades gracefully instead of pretending full certainty.

**Estimated Complexity:** M

### Story P0.2.4: Recurring obligations and Sprint 1 PDF/CSV spending audit
**Description:** Let users upload a statement artifact in Sprint 1 to identify recurring obligations, category patterns, and likely forgotten subscriptions before automated bank sync exists.

**Acceptance Criteria:**
- **Given** a user uploads a supported PDF or CSV artifact, **when** the import pipeline completes, **then** the records are normalized through staged source adapters **and** linked to the same canonical downstream model as manual and receipt events.
- **Given** sufficient evidence exists across user-entered or uploaded data, **when** Goldie surfaces recurring patterns, **then** likely subscriptions and obligations are shown with confidence states **and** are clearly distinguishable from guesses.
- **Given** MobilePay or later bank automation is added in a future phase, **when** the user upgrades, **then** prior Sprint 1 learning is preserved **and** the user does not feel forced to start over.

**Estimated Complexity:** L

## Epic P0.3: Earn progress without rewarding unhealthy behavior

**Goal:** make ProsperCoins and progression feel motivating while protecting the product from coin farming, shame loops, and spend-more-to-win mechanics.

### Story P0.3.1: ProsperCoin ledger, award rules, and visible reward reasons
**Description:** Implement the append-only ProsperCoin ledger and user-facing award explanations so awareness actions feel rewarding and auditable.

**Acceptance Criteria:**
- **Given** a qualifying awareness action occurs, **when** reward logic runs, **then** ProsperCoins are posted as immutable ledger events linked to the triggering source object **and** balance is derived from the ledger rather than hand-maintained fields.
- **Given** a reward is posted, **when** the user sees the result, **then** the UI explains in plain language why the reward was earned **and** the explanation references the qualifying behavior rather than spend volume.
- **Given** later non-cash sinks or catalogs are added, **when** the ledger model is reused, **then** historical balances and event history remain valid without migration of prior reward events.

**Estimated Complexity:** M

### Story P0.3.2: Anti-abuse, duplicate suppression, and low-confidence reward gating
**Description:** Prevent exploitative reward farming without punishing legitimate high-frequency users or offline retries.

**Acceptance Criteria:**
- **Given** duplicate, velocity-spike, or obviously low-confidence actions are detected, **when** reward evaluation runs, **then** the product blocks or limits full reward credit **and** records the reason internally.
- **Given** a user later validates a previously low-confidence entry, **when** the validation is accepted, **then** deferred ProsperCoin value can be awarded according to configured rules **and** the user sees why the reward changed.
- **Given** an honest user logs multiple legitimate actions in a short period, **when** anti-abuse rules execute, **then** the user is not silently penalized beyond the documented rule thresholds **and** the ledger remains replay-safe.

**Estimated Complexity:** M

### Story P0.3.3: Streaks, zero-spend continuity, freeze protection, and mode-safe progression
**Description:** Build the healthy motivation layer so consistency and awareness count, even when the user spends nothing or misses a day.

**Acceptance Criteria:**
- **Given** a user explicitly marks a day as zero-spend, **when** the day is confirmed, **then** streak continuity can be preserved **and** the product celebrates awareness rather than spending activity.
- **Given** a user has earned or purchased streak protection, **when** they miss an eligible day, **then** the system consumes a freeze according to configured rules **and** prevents a guilt-quit style reset.
- **Given** a user switches between Full, Lite, and Off modes, **when** progression surfaces re-render, **then** core value elements remain intact **and** competitive/cosmetic layers change without loss of data or progress.

**Estimated Complexity:** M

## Epic P0.4: Learn investing with Fin in a trust-safe simulator

**Goal:** prove the educational investing thesis without drifting into product recommendation, stale-data confusion, or toy-like randomness.

### Story P0.4.1: Curated launch asset universe and quote freshness service
**Description:** Create the launch-ready market data layer for a small, recognizable asset universe with visible freshness and degraded-state behavior.

**Acceptance Criteria:**
- **Given** the simulator loads for a P0 user, **when** the launch asset list is fetched, **then** the user sees a curated set of recognizable assets **and** the product does not expose advanced or obscure instruments outside MVP scope.
- **Given** market data is displayed anywhere in the simulator, **when** the UI renders, **then** freshness metadata and source state are visible **and** quotes older than the configured threshold are labeled degraded.
- **Given** quotes are too stale for safe educational execution, **when** the user attempts a trade, **then** the product blocks or warns according to policy **and** never presents stale execution as if it were fresh.

**Estimated Complexity:** M

### Story P0.4.2: Virtual trade execution backed by immutable ledgers
**Description:** Let users spend ProsperCoins on long-only virtual trades that remain traceable to quote snapshots and reward events.

**Acceptance Criteria:**
- **Given** a user has sufficient ProsperCoins and fresh enough quote data, **when** they submit a trade, **then** the system creates an immutable simulator execution record linked to the quote snapshot and linked ProsperCoin debit event.
- **Given** a trade request is retried or duplicated, **when** the platform processes it, **then** the execution remains idempotent **and** no double-debit occurs.
- **Given** an unsupported action such as leverage, margin, shorting, options, or copy trading is attempted, **when** the command is evaluated, **then** the trade is rejected **and** the user receives MVP-safe guidance.

**Estimated Complexity:** L

### Story P0.4.3: Portfolio summary, movement explanation, and next-day learning card
**Description:** Give users a reason to return by showing portfolio movement in plain language and connecting it back to learning.

**Acceptance Criteria:**
- **Given** a user has at least one virtual position, **when** they open the home or Fin workspace, **then** they can review portfolio value, position-level change, and simple history in ProsperCoin terms **and** the screen includes market freshness labels.
- **Given** a material portfolio move occurs, **when** Fin generates the follow-up card, **then** the card explains what moved and why it matters in plain language **and** stays inside education-only policy boundaries.
- **Given** the user completed the first-pick flow earlier, **when** they return on a later day, **then** the experience reinforces “check back tomorrow” behavior **and** links the movement to a next learning action.

**Estimated Complexity:** M

### Story P0.4.4: Educational scenarios and adaptive explanation depth
**Description:** Let users ask Fin “what if” questions and receive explanations tuned to their knowledge level without crossing into personalized advice.

**Acceptance Criteria:**
- **Given** a user asks a what-if question about redirecting spend, saving more, or changing a virtual allocation, **when** Fin responds, **then** the result is labeled educational/scenario-based **and** avoids certainty or suitability language.
- **Given** the user has explicit or inferred beginner/intermediate/advanced depth settings, **when** Fin explains a result, **then** the explanation matches that level **and** remains concise enough for mobile use.
- **Given** Fin uses underlying product facts, **when** the explanation is rendered, **then** the user can access a “why am I seeing this?” path that connects the narrative to source bundles or fact bundles.

**Estimated Complexity:** M

## Epic P0.5: Share learning safely and preview family value

**Goal:** make family monetization believable in MVP by showing collaborative educational value without turning ProsperPals into surveillance software.

### Story P0.5.1: Share-safe milestone templates and growth-safe share artifacts
**Description:** Allow users to create milestone/streak/simulator share cards from safe projections that exclude private finance details.

**Acceptance Criteria:**
- **Given** a user completes an eligible milestone, lesson, streak, or simulator highlight, **when** they create a share template, **then** the artifact contains only approved safe fields **and** excludes transaction amounts, merchants, safe-to-spend values, and budget shortfalls.
- **Given** a share artifact is generated, **when** the underlying data is queried, **then** it is built from share-safe projection models rather than raw transaction tables **and** provenance remains traceable internally.
- **Given** social visibility is disabled or reduced, **when** the user views the same milestone, **then** the learning/progress still exists **and** public-style share prompts stay suppressed.

**Estimated Complexity:** M

### Story P0.5.2: Family preview, sponsor/learner roles, and invite flow
**Description:** Build the MVP family entry experience so a sponsor can understand the plan’s value before another real user joins.

**Acceptance Criteria:**
- **Given** a teach-family user enters family space before inviting anyone, **when** the preview loads, **then** the product shows safe sample milestones and recap examples **and** does not require another real household member to exist.
- **Given** the sponsor invites a learner/member, **when** the invite is generated, **then** the flow uses a deep-linked preview and clear role framing **and** avoids spammy in-product nag patterns.
- **Given** roles are assigned, **when** family access is enforced, **then** sponsor/parent and learner/member permissions are distinct **and** raw private finance data remains private by default.

**Estimated Complexity:** M

### Story P0.5.3: Weekly family recap and co-present challenge loop
**Description:** Deliver one lightweight collaborative family loop that reinforces learning and consistency rather than private-money monitoring.

**Acceptance Criteria:**
- **Given** an active family pair or preview state exists, **when** the weekly recap is generated, **then** it prioritizes learning progress, consistency, and challenge outcomes **and** avoids raw financial totals.
- **Given** a co-present challenge is available, **when** one member is less active than the other, **then** the challenge still works using the approved low-friction format **and** does not require both parties to be daily active users.
- **Given** any family-facing surface is rendered, **when** a consent or role restriction blocks a field, **then** the field stays hidden **and** the UI explains the boundary without exposing the blocked data.

**Estimated Complexity:** M

## Epic P0.6: Make every number explainable and every launch reversible

**Goal:** ensure ProsperPals can earn trust operationally, not just narratively, through provenance, policy enforcement, support visibility, and safe release discipline.

### Story P0.6.1: Fact bundles, provenance states, and “why am I seeing this?” views
**Description:** Build the trust surface that links user-facing numbers and explanations back to source records, rules versions, and freshness/confidence states.

**Acceptance Criteria:**
- **Given** Goldie or Fin shows an insight, reward, or simulator explanation, **when** the user opens the explanation detail, **then** they can see a meaningful “why am I seeing this?” view **and** the underlying source/fact bundle is traceable internally.
- **Given** a displayed value is verified, estimated, corrected, suspect, or stale, **when** it appears in UI, **then** that state is reflected in both phrasing and supporting metadata **and** the UI does not flatten them into false certainty.
- **Given** internal audit or support tooling is used, **when** an operator inspects the event, **then** the tool exposes timestamps, source type, rule version, and related object IDs without exposing unnecessary secrets.

**Estimated Complexity:** M

### Story P0.6.2: Consent grants, revocation, and privacy-safe notification boundaries
**Description:** Enforce granular consent and safe notifications so family and sharing features can grow without privacy leakage.

**Acceptance Criteria:**
- **Given** a user grants family or sharing permissions, **when** the grant is stored, **then** it captures category, audience, access level, and timestamp **and** is auditable.
- **Given** a consent grant is revoked, **when** future dashboards, previews, or recaps are generated, **then** revoked data is excluded immediately **and** the revocation is visible in audit history.
- **Given** a push notification or lock-screen-visible preview is sent, **when** payload validation runs, **then** forbidden private-financial fields are blocked **and** contract tests enforce the boundary.

**Estimated Complexity:** M

### Story P0.6.3: Domain events, trace IDs, support views, and release safety gates
**Description:** Put the operating discipline in place so the team can trace the core loop end-to-end, support users confidently, and promote releases safely.

**Acceptance Criteria:**
- **Given** a core loop state change occurs, **when** the product processes it, **then** the required domain events are emitted (`money.logged`, `candidate.confirmed`, `coins.awarded`, `trade.executed`, `insight.generated`, `share.created`, and equivalent P0 events) **and** shared correlation IDs propagate across request, job, and explanation layers.
- **Given** internal support tooling is opened for a user, **when** support investigates a problem, **then** timeline, ledger, trade, consent, import, and flag/cohort views are available **and** secrets or unnecessary PII stay redacted.
- **Given** code is promoted toward production, **when** the release pipeline runs, **then** migration safety checks, core-loop smoke tests, and required secret/config validation pass before production promotion **and** failures stop promotion instead of silently degrading trust.

**Estimated Complexity:** L

## P0 Coverage Notes

The P0 backlog intentionally covers the first buildable slice implied by the PRD and architecture:
1. onboarding intent capture
2. one manual or receipt-based `MoneyEvent`
3. deterministic reward award
4. Daily Spending Power update
5. explicit Goldie-to-Fin handoff
6. one virtual trade
7. next-day explanation card

That slice is now backed by the minimum family/share, provenance, consent, and operational stories needed to keep the category thesis trustworthy at launch.

## Detailed P1 Epics and Stories

P1 covers the first post-launch expansion window: the Sprint 2 to Sprint 4 enhancements that turn a credible Denmark-first MVP into a sticky product with better data quality, better family monetization, and a more durable educational loop.

The P1 backlog is deliberately constrained by three rules:
1. it must reuse the P0 canonical data and ledger contracts rather than create alternate paths
2. it must increase user confidence faster than it increases surface area
3. it must deepen the existing loop before introducing novel adjacency bets

## P1 Epic List

### Epic P1.1: Add MobilePay as the first automated transaction rail
Bring the most culturally relevant Denmark-first payment source into ProsperPals without breaking the manual-first canonical model or trust posture.

### Epic P1.2: Turn connected activity into better recurring-spend intelligence
Use richer connected transaction history to improve recurring detection, subscription awareness, and forward-looking planning quality.

### Epic P1.3: Make family premium feel worth paying for
Expand family learning and sponsor visibility in ways that feel collaborative, premium, and privacy-safe rather than surveillance-heavy.

### Epic P1.4: Make Fin smarter without becoming advice
Deepen simulator insight quality, learning paths, and portfolio understanding while staying inside education-only policy boundaries.

### Epic P1.5: Introduce healthy social progression only after the core loop is stable
Layer in stronger leagues and challenge mechanics only when anti-abuse, mode preferences, and emotional-safety rules are already proven.

## Epic P1.1: Add MobilePay as the first automated transaction rail

**Goal:** reduce manual capture burden for Denmark-first users by introducing MobilePay-backed ingestion and reconciliation on the same canonical contracts used in P0.

### Story P1.1.1: MobilePay connection, consent copy, and account-link lifecycle
**Description:** Build the first-party connection flow for MobilePay import so users can link, re-authenticate, and disconnect with explicit consent boundaries and understandable expectations.

**Acceptance Criteria:**
- **Given** an eligible Denmark-first user opens transaction-source settings, **when** they choose to connect MobilePay, **then** the flow explains what ProsperPals will import, how often it refreshes, and what remains private **and** the user must explicitly consent before the link is created.
- **Given** the user completes MobilePay authorization, **when** the connection succeeds, **then** the source is stored as a provider adapter instance on the same staged-source model as manual, receipt, PDF, and CSV imports **and** the UI shows last-sync state.
- **Given** the connection expires or the user disconnects it, **when** the lifecycle state changes, **then** sync jobs stop, historical imported events remain traceable by source, **and** revocation is auditable without deleting canonical finance history.

**Estimated Complexity:** L

### Story P1.1.2: Reconciliation of imported events against manual and receipt history
**Description:** Match MobilePay imports against previously logged money activity so users gain automation without duplicate noise or broken balances.

**Acceptance Criteria:**
- **Given** a MobilePay transaction is imported, **when** the reconciliation service evaluates it, **then** the system attempts to match it against prior manual, receipt, or statement-derived events using configured similarity and timing rules **and** surfaces the confidence of any proposed match.
- **Given** the system detects a likely duplicate, **when** the user reviews the event, **then** ProsperPals merges or links the records according to policy **and** never silently double-counts the spend in Daily Spending Power or reward logic.
- **Given** reconciliation confidence is low or conflicting, **when** Goldie presents the result, **then** the user gets a lightweight review decision path **and** the canonical record keeps provenance for both the imported candidate and the final confirmed event.

**Estimated Complexity:** L

### Story P1.1.3: Incremental sync, refresh states, and degraded-import handling
**Description:** Operate MobilePay as a reliable automated source with sane refresh behavior, observable sync states, and user-facing recovery copy.

**Acceptance Criteria:**
- **Given** a MobilePay source is active, **when** scheduled or user-triggered refresh runs, **then** the sync processes incrementally using provider cursors or equivalent checkpoints **and** imported records remain idempotent under retry.
- **Given** the provider is delayed, partially unavailable, or rate-limited, **when** the import state is shown in-product, **then** the user sees the last successful sync, degraded status, and recovery guidance **and** stale automated data never masquerades as current truth.
- **Given** sync health regresses for a cohort after release, **when** operators inspect telemetry, **then** source-level health and job traces are visible **and** the feature can be degraded or rolled back behind existing flags without corrupting downstream models.

**Estimated Complexity:** M

## Epic P1.2: Turn connected activity into better recurring-spend intelligence

**Goal:** make ProsperPals more useful once connected data arrives by increasing the quality of recurring pattern detection, forecasting inputs, and intervention timing.

### Story P1.2.1: Connected recurring-obligation detection with confidence tiers
**Description:** Upgrade recurring detection so Goldie can identify subscriptions, bills, and habitual charges from linked activity with clearer confidence and cleaner review.

**Acceptance Criteria:**
- **Given** a user has enough connected transaction history, **when** recurring analysis runs, **then** ProsperPals groups likely recurring merchants or obligations into candidate series with cadence, amount range, and confidence tier.
- **Given** Goldie presents a likely recurring item, **when** the user inspects it, **then** the product distinguishes confirmed obligations from suggested patterns **and** allows the user to correct merchant grouping or cadence.
- **Given** a recurring candidate is confirmed or dismissed, **when** planning models update, **then** Daily Spending Power and related forward-looking cards recompute using the decision **and** the underlying event history remains replay-safe.

**Estimated Complexity:** M

### Story P1.2.2: Subscription-change alerts and spend-drift explanation
**Description:** Surface meaningful movement in bills and subscriptions so users notice creep, churn, and anomalies without being spammed.

**Acceptance Criteria:**
- **Given** a known recurring merchant changes materially in amount, frequency, or category, **when** ProsperPals detects the change, **then** Goldie can create a concise drift alert with the before/after pattern and confidence state.
- **Given** multiple alerts compete for attention, **when** prioritization runs, **then** the product ranks alerts by likely impact on user planning and suppresses low-value noise according to notification policy.
- **Given** the user opens a change alert, **when** the explanation is shown, **then** they can see why the pattern was flagged, what source data supports it, **and** what lightweight next action is available.

**Estimated Complexity:** M

### Story P1.2.3: Better forecasting inputs from connected income and bill patterns
**Description:** Improve the planning engine using connected data so Daily Spending Power becomes more resilient for salary, irregular income, and high-variance spending patterns.

**Acceptance Criteria:**
- **Given** connected transaction history contains recognizable payroll or income-like patterns, **when** planning state recalculates, **then** the engine can separate likely income events from expenses **and** use them as weighted forward-looking inputs rather than naive raw averages.
- **Given** the user has irregular or mixed income, **when** forecasting is rendered, **then** the product explains that the plan is based on observed ranges or recent variability **and** labels confidence accordingly.
- **Given** new connected data materially changes the outlook, **when** the home view refreshes, **then** Goldie explains what changed in practical terms **and** the user can trace the update back to supporting events.

**Estimated Complexity:** L

## Epic P1.3: Make family premium feel worth paying for

**Goal:** deepen sponsor-and-learner value so the family plan feels like a real educational product tier, not just a share feature.

### Story P1.3.1: Family learning dashboard with role-safe progress visibility
**Description:** Build the premium family dashboard that shows learning momentum, milestone progress, and challenge participation without exposing private transaction details.

**Acceptance Criteria:**
- **Given** a sponsor opens the family dashboard, **when** eligible members exist, **then** the dashboard shows progress summaries, lesson streaks, and challenge states drawn from share-safe projections **and** excludes private finance detail by design.
- **Given** a learner/member opens the same family space, **when** their role-scoped view renders, **then** they see their own learning context plus approved shared milestones **and** sponsor-only management tools stay hidden.
- **Given** a consent scope changes, **when** the dashboard reloads or recaps regenerate, **then** the visible metrics update immediately **and** revoked fields disappear without stale caching leaks.

**Estimated Complexity:** M

### Story P1.3.2: Guided family challenges, prompts, and recap templates
**Description:** Add a richer set of collaborative learning loops so families have reasons to return weekly without needing both parties active every day.

**Acceptance Criteria:**
- **Given** a sponsor wants to run a collaborative activity, **when** they start a family challenge, **then** the product offers approved templates for savings, habit, or learning goals **and** avoids framing that could shame a learner for private spending.
- **Given** a challenge period ends, **when** ProsperPals generates the recap, **then** the summary highlights learning progress, wins, and next-step prompts **and** uses safe projection data only.
- **Given** one household member is inactive, **when** recap logic runs, **then** the system can still produce a meaningful collaborative summary or nudge path **and** does not collapse the family loop into a blank state.

**Estimated Complexity:** M

### Story P1.3.3: Premium family paywall moments and upgrade evidence surfaces
**Description:** Show family-plan monetization at the moments where value is clearest, using proof of educational progress rather than generic upsell copy.

**Acceptance Criteria:**
- **Given** a free user reaches a family-relevant milestone or preview depth threshold, **when** the upgrade prompt appears, **then** it references visible family-learning value already experienced in-product **and** does not rely on fear-based gating.
- **Given** the family premium paywall is shown, **when** the comparison renders, **then** it distinguishes free preview features from premium ongoing coaching, recaps, and role-safe visibility in simple language.
- **Given** the user dismisses or converts on a premium moment, **when** analytics events are emitted, **then** the team can attribute upgrade performance to the specific evidence surface or trigger path.

**Estimated Complexity:** M

## Epic P1.4: Make Fin smarter without becoming advice

**Goal:** improve learning depth and simulator usefulness without crossing regulatory boundaries or overwhelming mobile-first users.

### Story P1.4.1: Richer portfolio analytics and category-level explanation cards
**Description:** Expand the simulator workspace so users can understand concentration, gain/loss drivers, and simple diversification lessons in plain language.

**Acceptance Criteria:**
- **Given** a user has multiple virtual positions, **when** the enhanced portfolio view renders, **then** the product can show simple concentration, sector/category exposure, and change drivers in an educational format appropriate to their depth setting.
- **Given** Fin explains a gain or loss driver, **when** the card is shown, **then** it links the narrative to observable market movement or portfolio mix rather than unsupported model opinion.
- **Given** the user prefers Lite or Off mode, **when** analytics surfaces are displayed, **then** educational depth remains available **and** cosmetic or competitive embellishments stay appropriately reduced.

**Estimated Complexity:** M

### Story P1.4.2: Themed learning paths and scenario packs
**Description:** Organize Fin’s educational experience into repeatable themes so users can go beyond one-off trades into structured learning.

**Acceptance Criteria:**
- **Given** a user wants more than basic trade feedback, **when** they open Fin’s learning area, **then** the product offers themed scenario or lesson packs such as diversification, volatility, long-term compounding, or opportunity cost.
- **Given** a user enters a themed path, **when** Fin presents the lesson, **then** the sequence builds on prior actions and explanation depth settings **and** keeps all content explicitly educational rather than prescriptive.
- **Given** a path milestone is completed, **when** rewards or recap content are generated, **then** ProsperCoins, achievements, or follow-up prompts are granted according to the same ledger and anti-abuse rules used elsewhere.

**Estimated Complexity:** M

### Story P1.4.3: Multi-day simulator insights and habit-to-investing feedback loops
**Description:** Close the loop more tightly by showing how real-world behavior changes create more room for simulation learning over time.

**Acceptance Criteria:**
- **Given** a user has both logging history and simulator activity, **when** Fin generates a multi-day insight, **then** the product can connect spending-awareness improvements to increased virtual investing capacity or better scenario outcomes.
- **Given** the insight uses mixed sources across time, **when** it is rendered, **then** freshness, confidence, and source provenance remain available through the explanation path.
- **Given** the user acts on the suggested learning prompt, **when** they continue the loop, **then** Goldie and Fin maintain one coherent conversation state instead of fragmenting context across features.

**Estimated Complexity:** M

## Epic P1.5: Introduce healthy social progression only after the core loop is stable

**Goal:** add competitive and communal motivation carefully, only after the reward system, mode controls, and trust posture are already resilient.

### Story P1.5.1: League cohorts and normalized ranking surfaces
**Description:** Build league-style progression that rewards consistency and learning behavior instead of absolute spending or wealth.

**Acceptance Criteria:**
- **Given** a user is eligible for league participation, **when** rankings are generated, **then** the score uses normalized learning/progress signals rather than absolute money values or spend volume.
- **Given** a user is in Lite or Off mode, **when** the product renders progression surfaces, **then** league visibility is reduced or hidden according to preference while the underlying achievements remain intact.
- **Given** a cohort configuration changes or a league is disabled behind a flag, **when** the feature state updates, **then** user balances, streaks, and core progression history remain unaffected.

**Estimated Complexity:** M

### Story P1.5.2: Time-boxed individual and shared challenges with abuse controls
**Description:** Add stronger challenge mechanics that can motivate return behavior without incentivizing spammy logging or unhealthy comparison.

**Acceptance Criteria:**
- **Given** a user starts or joins a challenge, **when** rules are presented, **then** the challenge objective is tied to approved awareness or learning actions **and** not to raw transaction count or spend amount.
- **Given** the system detects challenge-related farming, collusion, or suspicious action velocity, **when** scoring runs, **then** rewards are limited according to policy **and** the relevant reasons are visible internally for support/review.
- **Given** a challenge ends, **when** recap and rewards are generated, **then** the product celebrates progress without humiliating low performers **and** offers an easy next-step continuation.

**Estimated Complexity:** M

### Story P1.5.3: Experimentation hooks for progression tuning and emotional safety
**Description:** Create the instrumentation and flag model needed to tune gamification intensity safely after launch.

**Acceptance Criteria:**
- **Given** the team wants to adjust reward pacing, challenge cadence, or league visibility, **when** the configuration is changed, **then** the relevant rules can be tuned behind feature flags or config without schema-breaking migrations.
- **Given** a new progression experiment runs, **when** telemetry is collected, **then** the team can compare retention, loop completion, and confusion/stress signals across cohorts.
- **Given** an experiment causes negative emotional-safety outcomes or abuse regressions, **when** it is disabled, **then** the product can revert quickly **and** historical user progress remains valid.

**Estimated Complexity:** M

## P1 Coverage Notes

The P1 backlog extends the same core loop rather than replacing it:
1. automated capture reduces friction after manual trust is established
2. connected recurring intelligence sharpens Goldie’s practical value
3. family premium adds a real monetization path with safer role clarity
4. richer simulator education increases return value for invest-first users
5. stronger progression is delayed until abuse controls and emotional safety are ready

This keeps ProsperPals disciplined: better data first, deeper value second, stronger game mechanics last.

## Detailed P2 Epics and Stories

P2 covers the first real expansion era after Denmark-first product/market proof: ProsperPals becomes broader, more adaptive, and more operationally mature without abandoning the original loop. The point of P2 is not to pile on “enterprise later” fantasies. The point is to expand what already works into something that can survive more banks, more countries, more household structures, and more support load.

The P2 backlog is governed by three rules:
1. every expansion feature must still resolve back to the same canonical finance, ledger, consent, and explanation model
2. multi-market growth must increase user trust, not just geographic reach
3. personalization must remain assistive, explainable, and revocable rather than opaque or over-automated

## P2 Epic List

### Epic P2.1: Scale from one Denmark-first rail to a durable open-banking ingestion platform
Extend ProsperPals from manual + MobilePay into broader PSD2/open-banking coverage using the same staged-source architecture, stronger reconciliation, and region-aware adapter operations.

### Epic P2.2: Expand ProsperPals across Nordics and then the EU without losing product trust
Localize planning logic, currency, copy, compliance posture, and operational support for multi-market rollout while preserving one coherent product core.

### Epic P2.3: Personalize coaching and education using validated behavior history
Make Goldie and Fin more adaptive over time using explicitly explainable models, consent-aware history, and user-controlled preference tuning.

### Epic P2.4: Mature partner rewards and non-cash value exchange without breaking the economy
Evolve ProsperCoins from a pure internal loop mechanic into a future-ready non-cash reward ecosystem with controlled sinks, partner offers, and fraud-resistant redemption logic.

### Epic P2.5: Build the operational maturity needed for scale, trust, and experimentation
Upgrade internal tooling, support, analytics, release discipline, and experimentation governance so the team can expand safely without turning the product into chaos.

## Epic P2.1: Scale from one Denmark-first rail to a durable open-banking ingestion platform

**Goal:** add PSD2/open-banking breadth without creating per-provider product behavior, duplicate finance states, or fragile reconciliation debt.

### Story P2.1.1: Multi-provider bank connection orchestration and account-source normalization
**Description:** Introduce the orchestration layer that can manage multiple open-banking providers, account lifecycles, and account metadata while preserving one source contract downstream.

**Acceptance Criteria:**
- **Given** a user in a supported market opens bank connection settings, **when** they start the open-banking flow, **then** the product can route them through the appropriate provider or aggregator **and** capture region/bank/account metadata on the staged-source model rather than inventing market-specific tables.
- **Given** one user connects multiple accounts or institutions, **when** the connection completes, **then** account identity, consent window, sync status, and currency are preserved distinctly **and** downstream processing still resolves into canonical `MoneyEvent` and account reference contracts.
- **Given** a provider changes terms, scopes, or refresh requirements, **when** the lifecycle state updates, **then** the product shows understandable reconnect guidance **and** bank-link fragility never silently corrupts planning state.

**Estimated Complexity:** L

### Story P2.1.2: Cross-provider reconciliation and duplicate suppression at scale
**Description:** Harden transaction matching so the same real-world event can flow through manual, MobilePay, and open-banking sources without breaking trust.

**Acceptance Criteria:**
- **Given** the same financial event arrives from multiple source types, **when** reconciliation evaluates it, **then** the product can link or merge candidate records using source-aware confidence rules **and** expose why the chosen canonical outcome won.
- **Given** provider feeds disagree on merchant text, timestamps, or settlement timing, **when** reconciliation runs, **then** the engine uses region-aware tolerances **and** preserves raw provenance for audit/support inspection.
- **Given** reconciliation policy changes after launch, **when** historical events are replayed or re-evaluated, **then** the canonical record lineage remains explainable **and** user-facing balances do not drift silently.

**Estimated Complexity:** L

### Story P2.1.3: Consent renewal, provider degradation handling, and source-quality scoring
**Description:** Operate a multi-provider ingestion system with visible source health, trust-aware fallbacks, and user-facing quality signals.

**Acceptance Criteria:**
- **Given** a bank connection approaches consent expiry, **when** the renewal window begins, **then** ProsperPals prompts the user with market-appropriate copy **and** keeps planning-state degradation explicit if renewal is delayed.
- **Given** a provider becomes unreliable, rate-limited, or partially degraded, **when** import jobs and freshness checks run, **then** the system can score source quality, suppress unsafe conclusions, **and** downgrade user-visible confidence rather than pretending continuity.
- **Given** support or operations reviews the ingestion fleet, **when** dashboards render, **then** source health, reconnect burden, reconciliation error rates, and bank/provider-level incident traces are available for triage.

**Estimated Complexity:** M

## Epic P2.2: Expand ProsperPals across Nordics and then the EU without losing product trust

**Goal:** preserve the quiet, premium, trust-first ProsperPals experience while adapting to different currencies, financial habits, languages, and regulatory surfaces.

### Story P2.2.1: Multi-currency planning, display, and market-awareness foundations
**Description:** Add robust currency handling so ProsperPals can plan, explain, and simulate across non-DKK users without UI or logic confusion.

**Acceptance Criteria:**
- **Given** a user operates outside the Denmark-first DKK default, **when** they onboard or connect accounts, **then** the product stores primary currency, display preferences, and source currencies explicitly **and** avoids mixed-currency math without conversion metadata.
- **Given** planning or simulator views use converted values, **when** they render, **then** exchange-rate source and freshness are labeled where relevant **and** the user can still understand original-value context when needed.
- **Given** a user crosses markets or uses multi-currency accounts, **when** home and portfolio summaries compute, **then** the product remains understandable on mobile **and** never implies false precision across FX states.

**Estimated Complexity:** L

### Story P2.2.2: Region-aware copy, education framing, and compliance boundary packs
**Description:** Package market-specific wording, disclosures, and education boundaries so ProsperPals can launch country by country without policy drift.

**Acceptance Criteria:**
- **Given** ProsperPals is enabled for a new market, **when** onboarding, simulator education, and sharing copy load, **then** the product can select region-appropriate language packs, disclosure text, and support links **and** keep the education-not-advice stance consistent.
- **Given** local rules or review guidance differ by market, **when** policy content is updated, **then** the change can be versioned and rolled out by market or cohort **and** support/audit tools can identify which policy pack a user saw.
- **Given** translation or localization quality is incomplete for a market, **when** rollout readiness is evaluated, **then** launch can be blocked or feature-limited by policy rather than shipping half-translated trust surfaces.

**Estimated Complexity:** M

### Story P2.2.3: Market rollout controls, support readiness, and region-safe feature flags
**Description:** Give the team the operational switches needed to launch ProsperPals market by market instead of one risky all-at-once expansion.

**Acceptance Criteria:**
- **Given** the team enables a new Nordic or EU market, **when** feature rollout starts, **then** bank-source availability, simulator asset sets, paywall logic, and policy packs can be controlled independently by market.
- **Given** support load or trust incidents spike in a specific region, **when** the issue is identified, **then** the team can throttle or roll back only the affected market-facing features **and** keep other markets stable.
- **Given** rollout readiness is reviewed, **when** the scorecard is generated, **then** localization completeness, provider coverage, policy approval, support documentation, and analytics readiness are all required gates.

**Estimated Complexity:** M

## Epic P2.3: Personalize coaching and education using validated behavior history

**Goal:** make ProsperPals feel increasingly “for me” while remaining controllable, explainable, and clearly bounded.

### Story P2.3.1: Adaptive habit profile for Goldie and explanation profile for Fin
**Description:** Build the user model layer that tracks stable behavior tendencies and preferred explanation style without turning the companions into black boxes.

**Acceptance Criteria:**
- **Given** a user builds enough history, **when** profile adaptation runs, **then** ProsperPals can infer stable tendencies such as logging consistency, category drift sensitivity, simulator curiosity, and explanation depth preference **and** store them in an auditable profile model.
- **Given** Goldie or Fin adapts based on that profile, **when** the user sees a changed prompt or explanation style, **then** the behavior remains explainable in plain language **and** user controls can override the adaptation.
- **Given** a user resets or reduces personalization, **when** the preference changes, **then** adaptive behaviors back off without deleting canonical financial history or breaking ongoing loops.

**Estimated Complexity:** M

### Story P2.3.2: Predictive nudges and recovery coaching with explicit confidence boundaries
**Description:** Surface higher-quality proactive coaching based on observed habits while avoiding manipulative or overconfident “AI knows your life” vibes.

**Acceptance Criteria:**
- **Given** ProsperPals detects a likely upcoming budget pinch, routine lapse, or teachable simulator moment, **when** it generates a proactive nudge, **then** the nudge is labeled as a prediction or pattern-based suggestion **and** includes confidence-appropriate language.
- **Given** the system lacks enough evidence or source quality is degraded, **when** proactive coaching logic evaluates, **then** it suppresses or softens the nudge rather than fabricating urgency.
- **Given** a user engages with a recovery or planning nudge, **when** the loop continues, **then** the product can connect the nudge back to measurable outcomes for future tuning without crossing into punitive surveillance.

**Estimated Complexity:** M

### Story P2.3.3: Longitudinal learning plans and household-stage tailoring
**Description:** Move beyond one-off lessons into longer educational arcs tuned to where the user or family is in their financial journey.

**Acceptance Criteria:**
- **Given** a user or family cohort has accumulated enough activity, **when** the learning planner runs, **then** ProsperPals can offer a longer path such as “stabilize spending,” “build investing confidence,” or “teach a teen safely” using approved educational modules.
- **Given** a longitudinal path is active, **when** weekly recaps or simulator prompts are shown, **then** the product aligns them with the active learning arc **and** still respects Lite/Off mode presentation preferences.
- **Given** the user changes life stage, household role, or motivation, **when** path selection updates, **then** the next plan can shift without invalidating prior progress or explanation history.

**Estimated Complexity:** M

## Epic P2.4: Mature partner rewards and non-cash value exchange without breaking the economy

**Goal:** evolve ProsperCoins carefully so they unlock richer value while preserving the original educational and anti-abuse intent.

### Story P2.4.1: Reward catalog service and controlled non-cash redemption ledger
**Description:** Add the service layer for future partner or internal reward redemption while keeping reward economics auditable and reversible.

**Acceptance Criteria:**
- **Given** ProsperPals introduces redeemable non-cash rewards, **when** a user browses the catalog, **then** items are defined by explicit inventory/rule metadata **and** redemption uses the same append-only ledger discipline as simulator debits.
- **Given** a redemption is requested, **when** the transaction succeeds or fails, **then** the ledger reflects a clear reservation/finalization outcome **and** support can trace the full lifecycle without manual guesswork.
- **Given** catalog items change price, availability, or partner status, **when** the catalog updates, **then** prior redemption history remains intact **and** stale offers cannot be redeemed accidentally.

**Estimated Complexity:** L

### Story P2.4.2: Partner-offer eligibility, fraud controls, and fairness rules
**Description:** Protect the product from turning ProsperCoins into a leaky promotional currency that rewards gaming more than learning.

**Acceptance Criteria:**
- **Given** a reward or partner offer has eligibility conditions, **when** the user attempts redemption, **then** ProsperPals validates account status, region, fraud flags, and required learning/progression criteria before approval.
- **Given** abnormal redemption behavior appears, **when** fraud checks run, **then** suspicious flows can be limited or held for review **and** the event is visible in internal tooling with reason codes.
- **Given** the team adds or removes partners, **when** rule configuration changes, **then** fairness and anti-abuse controls remain centrally governed rather than duplicated inside each offer flow.

**Estimated Complexity:** M

### Story P2.4.3: Reward economics dashboards and sink/balance tuning controls
**Description:** Give the team the instrumentation needed to keep ProsperCoins motivating without inflation, stagnation, or exploitative pressure.

**Acceptance Criteria:**
- **Given** operators review reward health, **when** the economics dashboard loads, **then** issuance, spend velocity, sink usage, redemption failures, and suspicious concentration patterns are visible by cohort and market.
- **Given** the team wants to adjust sink pricing or earning rates, **when** configuration changes are proposed, **then** the projected balance impact can be reviewed before rollout **and** changes can ship behind existing experimentation controls.
- **Given** an economy change harms loop completion or emotional safety, **when** the team rolls it back, **then** user balances and prior redemptions remain internally consistent.

**Estimated Complexity:** M

## Epic P2.5: Build the operational maturity needed for scale, trust, and experimentation

**Goal:** make ProsperPals operable by a growing team under real customer load without losing sight of trust, explainability, or product discipline.

### Story P2.5.1: Advanced support console for finance, companion, and source-debug workflows
**Description:** Expand internal tooling so support can understand what happened across money events, rewards, simulator actions, companion outputs, and consent boundaries in one place.

**Acceptance Criteria:**
- **Given** support investigates a user issue, **when** the advanced console loads, **then** timeline, source lineage, reconciliation state, ledger events, explanation bundles, and consent history are visible with role-safe redaction.
- **Given** the issue spans AI output and deterministic finance logic, **when** support inspects the trace, **then** they can distinguish fact generation from narrative generation **and** see which model/config/version was involved.
- **Given** the console is used in regulated or privacy-sensitive contexts, **when** access is granted, **then** elevated views are permissioned, audited, and revocable.

**Estimated Complexity:** L

### Story P2.5.2: Experiment registry, hypothesis tracking, and rollout governance
**Description:** Formalize how ProsperPals runs product and AI experiments so growth work cannot casually damage trust-critical behavior.

**Acceptance Criteria:**
- **Given** the team proposes an experiment, **when** it is registered, **then** the hypothesis, target cohorts, metrics, stop conditions, and trust-risk classification are captured before rollout.
- **Given** an experiment touches rewards, coaching, imports, or family visibility, **when** governance rules evaluate it, **then** required approvals or extra monitoring are enforced before exposure.
- **Given** experiment results are reviewed, **when** the registry is queried, **then** decision history and linked metrics remain searchable so future teams can avoid rerunning bad ideas.

**Estimated Complexity:** M

### Story P2.5.3: Reliability scorecards, incident rehearsal, and recovery automation
**Description:** Mature the trust posture with scorecards and incident routines that keep financial facts, ledgers, and user confidence recoverable under pressure.

**Acceptance Criteria:**
- **Given** the team reviews operational health, **when** the reliability scorecard is generated, **then** it includes ingestion latency, reconciliation error rate, stale-data exposure, notification safety, ledger integrity, and recovery time metrics.
- **Given** a critical incident rehearsal or postmortem occurs, **when** it is logged, **then** the linked source/system/market impact, rollback path, and follow-up actions are stored and reviewable.
- **Given** a recoverable failure affects calculations, imports, or reward posting, **when** recovery automation runs, **then** replay/rebuild tools can restore derived views from canonical records without inventing or losing trust-critical history.

**Estimated Complexity:** L

## P2 Coverage Notes

The P2 backlog expands ProsperPals without changing its spine:
1. open banking adds breadth but still flows through canonical finance contracts
2. new markets change packaging and policy, not product identity
3. personalization becomes deeper, but only with explicit confidence and user control
4. reward expansion stays non-cash, auditable, and anti-abuse-first
5. operational maturity grows in lockstep with user and market complexity

This keeps ProsperPals from becoming a messy “finance everything app.” It stays a financial-wellness product with a very specific loop and a very specific trust posture.

## Elicitation Outcomes Applied in This Step

### Architecture Decision Records
- Forced all post-MVP open-banking scale-up to reuse staged sources, canonical `MoneyEvent` contracts, and replay-safe ledgers instead of introducing region- or provider-specific shortcuts.
- Kept personalization as a profile-and-policy layer sitting on top of deterministic facts rather than turning companions into opaque autonomous advisors.
- Treated partner rewards as a controlled ledger and policy problem, not as a marketing plugin bolted awkwardly onto the coin system.

### Cross-Functional War Room
- Product, compliance, support, and platform concerns converged on market rollout as an operational discipline, not just a translation task.
- Support and reliability maturity were promoted into the P2 backlog because expansion without internal clarity would shred trust faster than any missing feature.
- Family and personalization expansion were constrained to keep collaboration helpful and educational instead of drifting toward surveillance or manipulative nudging.

### Self-Consistency Validation
- Verified that every P2 story still strengthens one of the loop layers: capture, understand, motivate, learn, or safely operate.
- Removed anything that implied real-money execution, advice-like automation, or black-box personalization.
- Ensured market expansion, reward evolution, and support tooling all point back to the same data provenance and consent boundaries already set in the PRD and architecture.

## Step 3 Hardening Summary

This P2 epic/story pass finishes the backlog with a scale-up plan that is bigger, but not sloppier.

What is now locked:
- post-MVP expansion is sequenced around durable platform growth: open banking -> market rollout -> adaptive coaching -> partner rewards -> operational maturity
- every expansion story still reuses canonical ledgers, staged ingestion, consent controls, and explainability contracts
- personalization and reward expansion stay tightly bounded so ProsperPals remains educational, premium, and trust-first
- the next BMAD step is now unambiguous: **run the readiness check across brief, PRD, UX, architecture, and epic backlog**
