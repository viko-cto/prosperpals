---
stepsCompleted:
  - 1-foundation-and-system-topology
inputDocuments:
  - _bmad/_bmad-output/planning-artifacts/product-brief-prosperpals-agentic-2026-03-07.md
  - _bmad/_bmad-output/planning-artifacts/prd-prosperpals-agentic.md
  - _bmad/_bmad-output/planning-artifacts/ux-design-prosperpals.md
  - _bmad/_bmad-output/planning-artifacts/research/technical-prosperpals-stack-resilience-architecture-research-2026-03-07.md
  - docs/bmad-workflow-plan.md
workflowType: 'architecture'
phase: 'architecture'
step: 1
stepName: 'foundation-and-system-topology'
elicitationMethods:
  - architecture-decision-records
  - first-principles
  - cross-functional-war-room
status: 'in-progress'
---

# Architecture Decision Document - ProsperPals

**Product:** ProsperPals  
**Owner:** Nikolas / CopenDapp Labs  
**Prepared by:** Viko  
**Date:** 2026-03-19  
**Status:** Step 1 complete — architecture foundation locked, detailed data/security/integration design next

## Executive Summary

ProsperPals should be built as a **web-first, mobile-first modular monolith** on **Next.js + Supabase + Vercel AI SDK**, with strong trust boundaries between deterministic financial computation and LLM-generated explanation. This architecture is deliberately boring in the right places: one primary app runtime, one source-of-truth database, one canonical money-event model, one shared conversation context for Goldie and Fin, and one staged ingestion layer that can grow from manual entry to MobilePay and then PSD2 without rewriting downstream logic.

The goal of this architecture phase is not to over-distribute the system too early. The goal is to preserve the category-defining loop — **Log → Earn → Invest → Learn → Repeat** — while protecting the product against the two failure modes most likely to kill it early:
1. **trust collapse** from incorrect financial facts, broken imports, or privacy mistakes
2. **execution collapse** from over-engineering a small-team MVP into an enterprise microservice maze

So the Step 1 architecture stance is:
- **single product codebase** for the MVP
- **modular domain boundaries** inside that codebase
- **Postgres as system of record**
- **append-only ledgers** for trust-critical value systems
- **provider adapters** for all third-party data sources
- **AI as interpreter, never as accountant**
- **share-safe projections** for family/social surfaces
- **offline-tolerant capture** for the mobile-first experience

This foundation keeps the MVP shippable while preserving clean upgrade paths for scale, regional expansion, and future native clients.

## Architecture Scope for This Step

This first architecture slice establishes the system foundation needed before deeper technical specification:
- top-level system topology
- runtime and deployment boundaries
- core service responsibilities
- primary stack decisions
- trust and compliance guardrails
- the first vertical slice architecture for the 80-second onboarding loop
- ADR-style decisions that downstream epic writing can build on

This step intentionally does **not** fully specify:
- complete database schema and table-by-table RLS rules
- full provider-specific MobilePay / PSD2 contracts
- detailed queue/job orchestration internals
- CI/CD, observability, and incident response depth
- story-level implementation breakdown

Those belong in the next architecture slices.

## Architecture Drivers

### Product drivers from the Product Brief / PRD

The architecture must preserve these product truths:
- **80 seconds to first value** with no mandatory bank-linking before usefulness
- **Goldie and Fin as two personas of one shared product brain**
- **ProsperCoins and simulator actions as trust-critical ledgers**
- **manual entry first, MobilePay second, PSD2 third**, without downstream rewrites
- **financial wellness education, not financial advice**
- **shareable learning progress without exposing private spending data**
- **Full / Lite / Off modes as presentation changes, not product forks**

### NFR drivers from the PRD

The architecture must support:
- fast mobile interaction and low-latency first actions
- offline or degraded-mode capture for core logging workflows
- strong traceability for insights, rewards, and simulator actions
- encryption, auditability, and least-privilege data access
- high-confidence data provenance labeling (`verified`, `estimated`, `parsed`, `suspect`)
- idempotent writes for flaky mobile networks and retries
- transparent market-data freshness

### First-principles architecture implications

From first principles, ProsperPals only works if these are true:
1. **Money facts are deterministic.** Users will forgive slow polish before they forgive wrong numbers.
2. **The AI always explains something real.** Goldie and Fin must narrate pre-computed facts, not invent financial truth.
3. **The loop works before integrations do.** Manual and receipt flows must already sit on the same architecture that later imports use.
4. **Family growth cannot compromise privacy.** Growth surfaces and private finance surfaces must be structurally separated.
5. **The team must be able to ship it.** Architecture must multiply a small team, not bury it.

## Recommended Platform Stance

### Delivery model

**MVP client strategy:** web-first PWA, optimized for mobile browsers and installable home-screen use.  
**Post-MVP client strategy:** optional native wrapper or React Native app once the domain and API contracts are stable.

This matches the current reality:
- product and UX work are already centered on a web implementation
- the team needs one canonical UI + backend path first
- ProsperPals needs mobile behavior more than it needs App Store-native complexity on day 1

### Core stack

| Layer | Decision | Why this fits ProsperPals |
|---|---|---|
| Product shell | **Next.js 15 App Router** | one full-stack codebase, server components, route handlers, server actions, streaming UI, good Vercel fit |
| UI | **React 19 + Tailwind + shadcn/ui-style component system** | fast iteration, mobile-first control, strong design-system fit with the existing UX spec |
| Hosting | **Vercel** | strong deployment ergonomics, preview workflows, edge/node split, AI-friendly runtime |
| Primary database | **Supabase Postgres** | relational source of truth, RLS, SQL rigor, auth/storage/realtime in one platform |
| Auth | **Supabase Auth** | integrated identity, secure session handling, simpler MVP surface |
| AI orchestration | **Vercel AI SDK 6** | shared Goldie/Fin orchestration, streaming, tool composition, policy-aware AI service layer |
| Storage | **Supabase Storage** | receipt, PDF, share artifact, and preview asset storage under one auth model |
| Background work | **Postgres-backed jobs + serverless workers / scheduled functions** | enough for MVP without introducing broker-first complexity |
| Observability baseline | **Vercel analytics/logging + app logs + AI tracing layer** | sufficient first-step stack, expandable later |

### Architectural style

**Chosen style:** modular monolith with event-driven internals.

That means:
- one deployable application at MVP
- explicit domain modules inside the codebase
- domain events and outbox-style side effects for decoupling
- no microservice split until operational pain actually justifies it

This gives ProsperPals the reliability and team speed of a monolith while keeping the internal seams clean enough for future extraction.

## Top-Level System Architecture

### System context diagram description

```text
[ User on mobile web / desktop web ]
            |
            v
[ Next.js App on Vercel ]
  - App Router UI
  - Route Handlers / Server Actions
  - Auth/session enforcement
  - Domain application services
  - Goldie/Fin orchestration layer
            |
            +------------------------------+
            |                              |
            v                              v
[ Supabase Platform ]                [ External Providers ]
  - Postgres + RLS                   - Market data provider(s)
  - Auth                             - OCR / document parsing
  - Storage                          - MobilePay connector
  - Realtime                         - PSD2/open banking connector(s)
            |
            v
[ Derived views / ledgers / projections ]
  - Money events
  - Spending power snapshots
  - ProsperCoin ledger
  - Simulator portfolio + trades
  - Family-safe share projections
```

### Runtime split

ProsperPals should use **three runtime zones** instead of one undifferentiated backend:

1. **Client/UI zone**
   - rendering, interaction, local optimistic state, offline capture queue
   - no trust-critical finance computation

2. **Application/API zone**
   - route handlers, server actions, orchestration, validation, authorization, domain services
   - where write orchestration and policy enforcement live

3. **Data/integration zone**
   - canonical storage, ledgers, provider normalization, derived read models, background jobs
   - where reconciliation and repeatable financial logic live

This separation matters because it keeps the LLM and the UI away from the core accounting logic.

## Core Subsystems and Responsibilities

### 1. Client Experience Layer

**Responsibilities**
- onboarding and intent capture
- Goldie / Fin conversation UI
- receipt capture and review flows
- Daily Spending Power home screen
- simulator views and educational cards
- family preview and share-safe surfaces
- offline capture queue for manual events and confirmations

**Key constraints**
- mobile-first, one-handed, low-friction interaction
- visible provenance and freshness states
- PWA-friendly caching and reconnect behavior

### 2. Identity, Session, and Policy Layer

**Responsibilities**
- authentication and session lifecycle
- role resolution (user, sponsor, learner/member, admin/support)
- consent checks before share/family access
- enforcement of “education, not advice” policy rules at AI and product boundaries

**Key constraints**
- least privilege
- explicit consent over implied sharing
- revocation must take effect quickly across read models

### 3. Financial Capture and Normalization Layer

**Responsibilities**
- accept manual entries, receipt confirmations, PDF/CSV bridge uploads, MobilePay syncs, PSD2 syncs
- normalize them all into one canonical `MoneyEvent`
- apply dedupe, verification states, and candidate review logic
- emit domain events after posting canonical records

**Key constraints**
- source-specific parsing, source-agnostic downstream model
- idempotent write paths
- reviewable candidates instead of fake automation certainty

### 4. Planning and Insight Layer

**Responsibilities**
- compute Daily Spending Power
- detect recurring patterns and subscriptions
- produce spending summaries, drift flags, and recovery guidance inputs
- create traceable fact bundles for Goldie explanations

**Key constraints**
- deterministic computations only
- approximate phrasing when inputs are estimated or sparse
- versioned calculation rules for replay and debugging

### 5. ProsperCoins and Progression Layer

**Responsibilities**
- award and debit ProsperCoins via append-only ledger events
- maintain derived balance views, streak state, and progression state
- enforce anti-abuse reward rules and normalization logic

**Key constraints**
- no mutable coin balances as a source of truth
- no rewarding raw spend volume
- replay-safe event history

### 6. Simulator and Market Data Layer

**Responsibilities**
- maintain curated asset catalog
- fetch and cache market quotes with freshness metadata
- execute virtual trades against quote snapshots
- update positions and portfolio summaries
- trigger learning cards and Fin explanations after material moves

**Key constraints**
- virtual-only behavior must be unmistakable
- price freshness must be visible
- no trade execution without tied quote snapshot + ledger event

### 7. Companion Orchestration Layer

**Responsibilities**
- maintain one conversation thread with persona overlays
- decide when Goldie stays active vs when Fin joins
- invoke deterministic services and tool outputs
- generate safe explanations, scenario narration, and educational guidance

**Key constraints**
- LLM may explain facts, not create them
- persona switch is presentation + policy, not separate memory stores
- all high-impact outputs must pass compliance and policy filtering

### 8. Sharing and Family Projection Layer

**Responsibilities**
- generate share-safe milestone cards
- generate family preview and weekly recap artifacts
- expose only allowed projections to family surfaces

**Key constraints**
- no direct reads from private transaction tables for family views
- milestone visibility and private finance visibility are different systems

## First Vertical Slice Architecture

The first buildable architecture slice should validate the category thesis end to end:

```text
Onboarding intent capture
  -> manual text or receipt-based money event
  -> canonical MoneyEvent post
  -> ProsperCoin award event
  -> Spending Power snapshot refresh
  -> Goldie explanation
  -> explicit handoff to Fin
  -> one virtual trade
  -> portfolio/trade confirmation
  -> next-day learning card / movement explanation
```

### Why this is the right slice

It tests the things that matter most:
- whether logging can feel light enough
- whether rewards feel immediate and meaningful
- whether the Goldie → Fin handoff works
- whether the simulator feels real enough to create return behavior
- whether the traceability model holds together across facts, rewards, and explanations

If this slice is clumsy, the rest of the product is noise. If this slice works, the product category is plausible.

## Core Architectural Decisions (ADR Set)

### ADR-001 — Build the MVP as a web-first PWA on Next.js App Router

**Decision**  
ProsperPals MVP will ship as a web-first PWA using Next.js App Router rather than parallel web + native clients.

**Rationale**
- one product surface for a small team
- strong fit with the UX spec’s mobile-first shell
- faster delivery of the 80-second core loop
- easier alignment of UI, auth, and server logic

**Consequence**
- native-device features should be wrapped behind interfaces, not baked straight into browser-specific code
- mobile installability and offline behavior become P0 UX responsibilities

### ADR-002 — Use a modular monolith, not microservices, for the MVP

**Decision**  
Keep ProsperPals as one deployable application with strong internal domain modules.

**Rationale**
- small-team velocity beats service sprawl
- trust-critical domains can still be isolated through modules, ledgers, and events
- future extraction remains possible where seams are clean

**Consequence**
- architectural discipline moves inside the repo structure and domain boundaries
- integration points must still be explicit even without separate deployables

### ADR-003 — Supabase Postgres is the source of truth for all trust-critical product state

**Decision**  
Money events, ledgers, portfolio trades, progression state inputs, and consent grants all land in Postgres-backed canonical records.

**Rationale**
- financial trust requires replayability and auditability
- Postgres fits structured, relational, compliance-sensitive data better than document-first stores
- RLS is a real security boundary, not an afterthought

**Consequence**
- denormalized views are projections, never source-of-truth records
- schema design and migrations become architecture-level work, not implementation trivia

### ADR-004 — Separate deterministic financial computation from LLM explanation

**Decision**  
All balances, spending power, recurring detection, reward calculations, and simulator math are computed by deterministic services before Goldie or Fin say anything.

**Rationale**
- wrong numbers destroy trust faster than bad tone
- compliance posture depends on explainability and controlled outputs
- testing deterministic logic is dramatically easier than validating free-form reasoning

**Consequence**
- AI services operate on fact bundles and policy filters
- every important insight must be traceable to data + rule versions

### ADR-005 — Goldie and Fin share one conversation and one orchestration layer

**Decision**  
Goldie and Fin are implemented as persona overlays within one conversation/orchestration service, not as separate agent backends.

**Rationale**
- shared memory and context are required by the PRD
- fallback to a single adaptive companion must remain a config/presentation change
- handoffs should feel intentional, not like context resets

**Consequence**
- persona tagging is required at the message level
- prompt and policy layering become first-class architecture concerns

### ADR-006 — Use a provider adapter + normalization pipeline for all transaction ingestion

**Decision**  
Manual, OCR, PDF/CSV, MobilePay, and PSD2 inputs all pass through source-specific adapters and normalize into the same canonical `MoneyEvent` contract.

**Rationale**
- Sprint 1, Sprint 2, and Sprint 3-4 must be one evolving system, not three rewrites
- downstream logic for rewards, planning, and insights should not care where the event came from
- provider churn is inevitable; internal contracts must stay stable

**Consequence**
- ingestion complexity is concentrated in one boundary
- verification state and confidence metadata become core fields, not optional embellishments

### ADR-007 — Use append-only ledgers for ProsperCoins and simulator executions

**Decision**  
ProsperCoins and virtual trades are recorded as immutable events with derived balance/position views.

**Rationale**
- mutable balances are easy to corrupt and hard to audit
- reversal, replay, anti-abuse analysis, and dispute handling require event history
- later feature expansion depends on trustworthy event sourcing for value systems

**Consequence**
- balance views and holdings must be recalculable
- writes become slightly more disciplined, but trust improves sharply

### ADR-008 — Start event-driven side effects with a Postgres outbox pattern, not a broker-first architecture

**Decision**  
ProsperPals should emit domain events from canonical writes and process them with outbox/job patterns before introducing dedicated message brokers.

**Rationale**
- the product benefits from decoupled side effects now
- the team does not benefit from Kafka/NATS/SQS complexity on day 1
- outbox-style processing is enough for reward awards, snapshot refreshes, explanation generation, and recap jobs

**Consequence**
- event naming and idempotent consumers should be designed now
- broker adoption later remains possible if throughput or ops needs justify it

## Proposed Internal Module Structure

```text
src/
  app/
    (marketing)/
    (authenticated)/
    api/
  modules/
    onboarding/
    money-events/
    artifacts/
    imports/
    planning/
    prosperity/
    simulator/
    companions/
    learning/
    sharing/
    households/
    notifications/
  server/
    auth/
    policy/
    db/
    jobs/
    events/
    integrations/
      ocr/
      market-data/
      mobilepay/
      psd2/
  lib/
    schemas/
    formatting/
    feature-flags/
    telemetry/
  components/
    design-system/
    companion-ui/
    finance-ui/
    simulator-ui/
    family-ui/
  supabase/
    migrations/
    policies/
    seeds/
```

### Why this structure

It keeps the repo aligned to the product, not to generic technical layers alone. The module boundaries reflect the actual business domains that epics and stories will map to.

## Trust and Compliance Guardrails at the Architecture Level

These are non-negotiable architecture rules, not copywriting suggestions:

1. **No direct real-world suitability recommendations** in AI or UI surfaces.
2. **No family/social surface may read raw financial tables directly.**
3. **No financial explanation may be emitted without a linked fact bundle or source bundle.**
4. **No market trade may execute without quote freshness metadata.**
5. **No reward event may post without a rule code and reference object.**
6. **No imported or parsed event should silently become authoritative when confidence is low.**
7. **No notification payload may expose private financial facts.**

## Prototype and Implementation Boundary

The existing `docs1/Design ProsperPals App` work should be treated as a **design prototype and interaction reference**, not as the production runtime architecture. The production implementation should absorb its UX rules into the Next.js architecture rather than trying to promote the prototype stack directly into the product backend.

That prevents a common failure mode: allowing the prototype implementation shape to dictate the long-term product architecture.

## Risks Resolved by This Step

This foundation step explicitly reduces the following risks from the Product Brief / PRD:
- **manual-entry MVP drift** by giving manual and imported flows one canonical ingestion model
- **companion confusion** by locking Goldie/Fin into one orchestration service with visible persona layers
- **ProsperCoin trust problems** by using append-only ledgers instead of mutable counters
- **family privacy leakage** by making share-safe projections architectural rather than optional
- **small-team overload** by choosing a modular monolith instead of premature distributed systems

## Open Items for the Next Architecture Step

Step 2 should go deeper on:
- canonical database schema and table boundaries
- RLS model and consent enforcement patterns
- import adapter contracts and reconciliation model
- offline sync, idempotency, and retry semantics
- market data provider redundancy and stale-quote policy
- detailed security, encryption, and audit-event strategy
- background job execution model and event processing lifecycle

## Step 1 Hardening Summary

This architecture foundation was intentionally shaped by three elicitation methods:

### Architecture Decision Records
Used to lock the few choices that matter most before implementation starts: deployment model, data source of truth, companion architecture, ingestion pattern, and ledger strategy.

### First Principles
Used to strip away attractive but dangerous complexity. The result is an architecture optimized around trust, speed to learn, and team throughput — not theoretical scale theater.

### Cross-Functional War Room
Used to reconcile design, engineering, compliance, analytics, and growth needs into one coherent system shape:
- design gets a mobile-first PWA and shared companion context
- engineering gets a modular monolith with explicit boundaries
- compliance gets deterministic finance logic and policy-aware AI
- growth gets safe share projections and family preview paths
- analytics gets event-friendly seams without broker-first complexity

**Architecture verdict after Step 1:** strong enough to begin detailed architecture design and later epic decomposition, without locking the team into avoidable rework.
