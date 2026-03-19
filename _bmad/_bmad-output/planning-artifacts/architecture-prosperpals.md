---
stepsCompleted:
  - 1-foundation-and-system-topology
  - 2-data-security-and-integration-boundaries
inputDocuments:
  - _bmad/_bmad-output/planning-artifacts/product-brief-prosperpals-agentic-2026-03-07.md
  - _bmad/_bmad-output/planning-artifacts/prd-prosperpals-agentic.md
  - _bmad/_bmad-output/planning-artifacts/ux-design-prosperpals.md
  - _bmad/_bmad-output/planning-artifacts/research/technical-prosperpals-stack-resilience-architecture-research-2026-03-07.md
  - docs/bmad-workflow-plan.md
workflowType: 'architecture'
phase: 'architecture'
step: 3
stepName: 'runtime-operations-and-delivery'
elicitationMethods:
  - architecture-decision-records
  - cross-functional-war-room
  - critique-and-refine
status: 'complete'
---

# Architecture Decision Document - ProsperPals

**Product:** ProsperPals  
**Owner:** Nikolas / CopenDapp Labs  
**Prepared by:** Viko  
**Date:** 2026-03-19  
**Status:** Architecture complete — ready for epic/story decomposition

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

## Step 2 — Data, Security, and Integration Boundaries

Step 2 turns the Step 1 topology into enforceable backend rules. The goal is to answer the questions that actually determine whether ProsperPals can be trusted in production:
- what data lives where
- who is allowed to read it
- how noisy imports become canonical records
- how retries avoid double-posting
- how offline capture, provider failures, and stale market data degrade safely

The posture for this step is deliberately conservative: **private financial data is isolated, deterministic services own trust-critical state transitions, and every external provider is treated as unreliable until normalized, verified, and audited.**

## Data Architecture and Canonical Storage Boundaries

### Core schema domains

ProsperPals should keep one Postgres database with explicit schema-level separation between major trust domains:

```text
auth/identity domain
  users
  profiles
  households
  household_members
  consent_grants

finance domain
  money_events
  money_event_revisions
  artifacts
  parsed_candidates
  import_connections
  import_jobs
  recurring_patterns
  planning_profiles
  spending_power_snapshots

value domain
  prospercoin_ledger_events
  prospercoin_balance_views
  virtual_portfolios
  virtual_orders
  virtual_trade_executions
  virtual_position_views

conversation and learning domain
  conversation_threads
  conversation_messages
  insight_records
  explanation_feedback
  learning_tracks
  learning_progress
  scenario_estimates

sharing and audit domain
  share_artifacts
  weekly_recaps
  family_challenges
  audit_events
  outbox_events
```

This is still one operational database, but the boundaries should be reflected in migration folders, service ownership, and SQL/RLS review. The point is not organizational beauty. The point is to reduce accidental joins between incompatible trust zones.

### Table classification rules

| Data zone | Tables / entities | Read posture | Write posture | Notes |
|---|---|---|---|---|
| **Private financial source-of-truth** | `money_events`, `money_event_revisions`, `planning_profiles`, `spending_power_snapshots` | user + tightly scoped backend services only | deterministic services only for derived writes | no family/share surface may query these directly |
| **Sensitive import and artifact zone** | `artifacts`, `parsed_candidates`, `import_connections`, `import_jobs` | user + import/review services only | provider adapters + review flows | raw imported noise stays here until normalized |
| **Trust-critical value ledgers** | `prospercoin_ledger_events`, `virtual_trade_executions` | user-readable summaries, backend writes only | append-only service writes only | never user-mutable |
| **Derived projections** | `prospercoin_balance_views`, `virtual_position_views`, `recurring_patterns`, `weekly_recaps` | user-facing and share-safe depending on type | rebuildable by jobs/services | must be safe to recompute |
| **Conversation / explanation** | `conversation_*`, `insight_records`, `scenario_estimates` | user + orchestration services | AI layer writes only after policy checks | must reference fact bundles, not raw free-form truth |
| **Share-safe social** | `share_artifacts`, safe recap projections | user-selected audiences only | projection service only | contains no raw private finance fields |
| **System audit** | `audit_events`, `outbox_events` | internal/admin via least privilege | all sensitive flows append here | immutable trail for reversals and incident review |

### Database decision set (ADR extension)

#### ADR-009 — Use private-source tables plus share-safe projection tables

**Decision**  
Private finance tables and shareable/family tables must be structurally different tables and views, not the same records with UI hiding.

**Rationale**
- privacy mistakes usually happen through convenience joins
- family and growth features create pressure to “just expose a little more data”
- structural separation is cheaper than constantly re-auditing ad hoc filters

**Consequence**
- recap and sharing flows require explicit projection jobs
- team velocity is slightly lower, privacy confidence is much higher

#### ADR-010 — Use append-only audit and value ledgers for irreversible or trust-critical events

**Decision**  
ProsperCoin awards/debits, simulator executions, consent changes, import credential changes, and admin corrections all create immutable audit rows.

**Rationale**
- financial trust requires reconstruction after bugs, abuse, or support disputes
- reversals should be modeled as compensating events, not silent edits

**Consequence**
- support tooling must learn to read event history
- debugging gets easier because history stops disappearing

## Row-Level Security and Access Control Model

Supabase RLS should be treated as a real boundary, not as marketing security. Application code can still enforce business rules, but the database should reject obviously illegal cross-user access even if an API bug appears upstream.

### RLS posture by entity type

| Entity type | Baseline RLS rule | Extra controls |
|---|---|---|
| User-owned records | `auth.uid() = user_id` | soft-delete visibility restricted; service role only for repair tools |
| Household membership | readable only to active members | membership status + role filter + revocation timestamp enforced |
| Consent grants | grantor can read/write own grants; grantee never edits | revocation writes audited; projections re-evaluated on change |
| Share artifacts | readable by owner or signed share token scope | expiry and visibility scope enforced server-side |
| Ledgers | user may read own derived balances and trade history; no direct insert/update/delete | backend service role only for append operations |
| Import credentials metadata | owner-readable summary only, secrets hidden | encrypted provider tokens kept outside normal query paths |
| Audit events | not directly user-readable except curated support/debug surfaces later | internal least-privilege only |

### Access model layers

1. **Database identity gate** — RLS ensures the wrong user cannot see the wrong row.
2. **Service authorization gate** — domain service checks role, consent, feature flags, plan level, and data-class rules.
3. **Projection gate** — family/social surfaces can only read pre-approved safe models.
4. **AI policy gate** — Goldie/Fin can see fact bundles appropriate to the task, not arbitrary raw tables.

### Consent enforcement model

Consent is not a generic boolean. It should be modeled as a typed grant with:
- `grantor_user_id`
- `grantee_scope` (household, invitee, share-link audience)
- `data_category`
- `access_level`
- `granted_at`
- `revoked_at`
- `source_surface`

Any share- or family-facing read path must check **active consent at read time** or read from a projection materialized while that consent was active. On revocation, the projection job must tombstone or rebuild affected share-safe artifacts.

## Import Adapter and Canonicalization Architecture

### Import pipeline

All non-manual ingestion paths should follow one staged pipeline:

```text
provider payload / uploaded artifact
  -> adapter-specific parse
  -> normalization candidate
  -> dedupe / fingerprinting
  -> confidence + verification assignment
  -> review if required
  -> canonical MoneyEvent post
  -> domain events / rewards / planning refresh
```

### Provider adapter contract

Each import adapter must emit a normalized contract before any downstream business logic runs:

```ts
type NormalizedMoneyEventCandidate = {
  externalRef?: string
  sourceType: 'receipt' | 'pdf' | 'csv' | 'mobilepay' | 'psd2'
  sourceAccountRef?: string
  occurredAt: string
  bookingDate?: string
  amountMinor: number
  currency: string
  direction: 'debit' | 'credit'
  merchantLabel?: string
  rawMerchantLabel?: string
  categoryHint?: string
  descriptionRaw?: string
  confidenceScore: number
  verificationState: 'verified-imported' | 'user-confirmed' | 'estimated' | 'system-suspect'
  dedupeFingerprint: string
  sourcePayloadRef: string
}
```

This forces MobilePay and PSD2 providers to become interchangeable at the business-logic layer. If a provider changes shape, only the adapter should scream. The planning, reward, and AI layers should stay boring.

### Dedupe and reconciliation rules

A candidate should be considered a potential duplicate when enough of the following overlap:
- normalized amount + currency
- occurred-at window within policy threshold
- merchant fingerprint similarity
- provider reference equality when available
- same artifact hash / same parsed line identity

Duplicate handling rules:
- **exact match:** suppress canonical repost, keep audit link
- **high-confidence near match:** mark `system-suspect` and queue review
- **partial conflict:** preserve both candidates, surface reconciliation UI, do not award duplicate ProsperCoins until resolved

### Reconciliation stance by source

| Source | Canonicality default | Human review expectation | Special rule |
|---|---|---|---|
| Manual entry | canonical immediately if valid | low | user intent itself is authoritative, but may be `estimated` |
| Receipt OCR | candidate first | medium | amount + merchant may auto-post only at very high confidence |
| PDF/CSV bridge | candidate or mixed batch | medium-high | powerful for audits, but noisy enough to demand review UX |
| MobilePay | near-canonical after adapter + dedupe | low-medium | still must normalize and preserve sync job lineage |
| PSD2 | near-canonical after adapter + dedupe | low-medium | strongest long-term source, but provider outages and schema quirks are expected |

## Offline, Idempotency, and Retry Semantics

A mobile-first finance product cannot behave like every request is online, unique, and perfectly delivered. Step 2 locks the retry model so duplicate writes do not erode trust.

### Client idempotency contract

Every trust-critical client write must carry:
- `idempotency_key`
- `client_created_at`
- `client_mutation_type`
- `client_device_id/session_id`

The server should persist an idempotency record keyed by `(user_id, mutation_type, idempotency_key)` with the resulting canonical object id and response envelope hash. Retries should return the original success payload instead of re-running business logic.

### Ordered offline replay rules

Offline queue ordering should be preserved for:
1. money-event creation
2. parsed-candidate confirmations
3. trade submissions
4. consent changes

If replay order is broken, derived views can become surprising even if data is technically valid. That is unacceptable for user trust.

### Retry safety rules

| Operation | Retry safe? | Rule |
|---|---|---|
| Manual money log | yes | same idempotency key returns original event and reward outcome |
| Receipt upload | yes | same file hash + idempotency key returns original artifact or parse job |
| Candidate confirm | yes with key | repeat returns same resulting canonical event ids |
| Coin award | no direct client retry | always derived from server-side rule evaluation tied to source reference |
| Trade submit | yes with key until execution state resolved | duplicate order creation forbidden |
| Consent revoke | yes | revocation is monotonic; repeating it should be harmless |

#### ADR-011 — Make idempotency a first-class persisted subsystem

**Decision**  
Idempotency handling should be stored in durable server-side records, not only in ephemeral cache.

**Rationale**
- mobile finance writes happen across reconnects, deployments, and flaky networks
- losing idempotency memory during a cold start is how duplicate money events happen

**Consequence**
- write paths are a little more involved
- user trust survives retry storms and bad hotel Wi-Fi

## Security, Encryption, and Secret Management

### Security posture

ProsperPals should assume that the most damaging early incident is not a sophisticated nation-state breach. It is a boring but devastating privacy mistake: overexposed logs, leaked provider credentials, unsafe notification payloads, or an overly broad service token. Step 2 architecture therefore favors containment over cleverness.

### Encryption requirements

| Data type | At-rest handling | In-transit handling | Additional controls |
|---|---|---|---|
| User PII | database encryption + provider-managed disk encryption | TLS everywhere | restricted admin visibility |
| Provider tokens / refresh secrets | encrypted via managed secret store / KMS-backed envelope | never returned to client after setup | rotate and audit on reconnect/change |
| Receipt / statement artifacts | encrypted object storage | signed upload/download URLs only | malware/content-type checks + expiry |
| Audit and ledger events | database encryption | TLS | append-only semantics + retention policy |
| Notification payloads | minimal data only | provider TLS | no private-financial content permitted |

### Secret handling rules

- provider access tokens must not live in front-end state, browser storage, or analytics payloads
- server logs must redact auth headers, provider payload secrets, statement content, and file URLs
- local/dev environments must use separate provider apps and test accounts
- support/admin tooling must never expose raw provider tokens, only health/status metadata

### Audit-event minimum set

ProsperPals should always emit audit events for:
- login and account recovery anomalies
- import connection create/update/delete
- provider credential refresh failures
- canonical money-event reversals or admin corrections
- ProsperCoin ledger reversals
- trade execution and trade rejection due to stale data
- consent grant create/revoke/expire
- share artifact creation for non-private scopes

## Market Data Resilience and Stale-Quote Policy

The simulator only works if users understand what prices mean and how fresh they are. Market data must be treated like a semi-trusted external dependency, not a magical truth stream.

### Quote policy

| State | Freshness rule | UX posture | Execution posture |
|---|---|---|---|
| `fresh` | within asset-class threshold | normal | allow trade |
| `delayed-but-acceptable` | beyond live threshold but inside educational safe threshold | label delay clearly | allow with warning |
| `stale` | older than safe threshold | degraded banner + explanation | block new trades |
| `provider-degraded` | fallback source active | show source/freshness badge | allow only if fallback meets threshold |

Suggested launch thresholds:
- equities/ETFs: trade block if quote older than 4 hours during market-open educational windows
- crypto: trade block if quote older than 30 minutes
- closed-market periods may use last close, but that state must be obvious

### Market data fallback strategy

1. primary provider quote fetch
2. secondary provider fallback if primary fails
3. if neither qualifies, preserve last known quote for display only and block new execution
4. generate Fin explanation that labels the limitation instead of pretending certainty

## Background Jobs, Outbox, and Event Processing Lifecycle

Step 2 does not require a full broker architecture, but it does require disciplined asynchronous processing.

### Outbox/event lifecycle

```text
transaction commits canonical record
  -> writes outbox event in same DB transaction
  -> background worker claims event
  -> executes side effect idempotently
  -> marks outbox event processed / retries with backoff
```

### P0 asynchronous jobs

- parsed artifact processing
- recurring pattern refresh
- spending-power snapshot regeneration
- ProsperCoin balance projection rebuild
- portfolio position refresh after trade
- recap/share artifact generation
- market quote refresh
- stale-data / failed-import alerting

### Failure handling rules

- side effects must be idempotent and reference the canonical source object
- permanent failures create audit events and operator-visible logs
- reward or trade side effects may not silently fail after the user sees success
- projections may lag briefly, but the source-of-truth record must not be ambiguous

## Implementation Boundary Recommendations

### Suggested Supabase schema grouping

- `public_identity_*` or `identity.*` for user/profile/household/consent
- `finance.*` for canonical money + planning data
- `ingest.*` for artifacts, adapters, jobs, parsed candidates
- `value.*` for ProsperCoins and simulator ledgers
- `engagement.*` for conversations, insights, learning
- `sharing.*` for share-safe projections
- `system.*` for audit and outbox tables

Exact schema names are flexible. The separation principle is not.

### Suggested server module ownership

| Module | Owns | Must not own |
|---|---|---|
| `imports` | adapters, normalization, dedupe, sync jobs | reward decisions, AI narration |
| `money-events` | canonical posting, revisions, review resolution | direct family sharing |
| `planning` | spending power, recurring detection, safe-to-spend facts | direct provider parsing |
| `prosperity` | ProsperCoin ledger/rules/balance projections | raw market data fetching |
| `simulator` | orders, executions, positions, price policy | household permission logic |
| `companions` | persona orchestration, explanation generation, policy filtering | numeric truth generation |
| `sharing` | safe projections, recap artifacts, invite previews | raw transaction reads outside approved projection inputs |
| `system` | audit, outbox, idempotency store, secrets integrations | product-specific business meaning |

## Step 3 — Runtime Operations and Delivery Architecture

Step 3 turns the trusted system design into a shippable operating model. The question here is not just "can ProsperPals be built?" It is "can a small team ship it repeatedly without breaking financial trust, privacy, or learning momentum?"

The answer should still be boring in the right places:
- one production app surface
- one primary database
- one disciplined deployment pipeline
- one release model that separates **deploy** from **expose**
- one tracing story that connects money facts, AI explanations, and user-visible incidents

This step defines the runtime split, CI/CD controls, observability, feature-flag rollout model, performance budgets, and operational runbooks required to move from architecture intent to engineering execution.

## Operational Architecture Goals

ProsperPals operations should optimize for five outcomes:
1. **safe shipping velocity** for a small product team
2. **deterministic recovery** when providers, workers, or AI flows fail
3. **controlled staged rollout** across Denmark-first launch waves
4. **support-grade debugging** without exposing sensitive finance data
5. **clear release confidence** before new logic touches trust-critical flows

From a first-principles perspective, the real operational risk is not traffic scale. It is silent trust erosion through bad releases, ambiguous data freshness, orphaned jobs, or impossible-to-debug companion behavior.

## Runtime Topology and Deployment Shape

ProsperPals should run as one product system across a few intentionally different runtime lanes.

### Recommended runtime lanes

| Runtime lane | Primary platform | Owns | Must not own |
|---|---|---|---|
| **Web rendering lane** | Vercel Next.js web runtime | landing pages, authenticated UI rendering, read-heavy dashboards, safe streaming UI | canonical finance writes or long-running imports |
| **Application command lane** | Next.js Node route handlers / server actions | authenticated writes, orchestration, policy checks, idempotent commands, companion tool calls | browser-visible secrets, uncontrolled retries |
| **Worker lane** | scheduled/background Node workers tied to Postgres/outbox queues | imports, projection rebuilds, recurring detection, recaps, quote refresh, retry/backoff processing | user-interactive rendering |
| **Data platform lane** | Supabase Postgres/Auth/Storage/Realtimes | source-of-truth records, ledgers, RLS, artifacts, event state | product business rules embedded in ad hoc SQL jobs |
| **Provider edge lane** | external APIs / webhooks | market data, OCR, MobilePay, PSD2 callbacks, email/push providers | internal truth decisions before normalization |

### Runtime policy

ProsperPals should treat **web latency**, **command correctness**, and **background completion** as different classes of work.

- **Web rendering lane** should optimize for fast first paint and one-glance trust labels.
- **Application command lane** should optimize for correctness, authorization, and durable write semantics.
- **Worker lane** should optimize for retries, backoff, observability, and replay safety.

That means a receipt upload confirmation should not compete in the same execution shape as a homepage read, and a recap-generation retry should not block a money-event post.

### Edge vs Node stance

ProsperPals should prefer **Node runtime** for all authenticated write flows, import processing, and AI orchestration. Edge runtimes may be used later for safe read acceleration, marketing pages, or low-risk cached surfaces, but they should not become the default for trust-critical product logic.

**Why:**
- Node gives better control for SDK compatibility, crypto, tracing, and heavier policy middleware.
- Finance and AI write paths are more sensitive to determinism and auditability than raw global latency.
- Denmark-first MVP does not need edge-compute heroics; it needs predictable behavior.

#### ADR-012 — Keep trust-critical writes and AI orchestration on Node runtimes

**Decision**  
Authenticated writes, import commands, simulator executions, and companion orchestration should run on Node-based server runtimes rather than edge-first execution.

**Rationale**
- better library/runtime compatibility for finance, crypto, provider SDKs, and tracing
- simpler debugging and lower surprise for a small team
- easier control over timeouts, retries, and secret access

**Consequence**
- some non-critical reads may be marginally slower than edge-first patterns
- the product gains more predictable correctness where it matters

## Environment and Promotion Model

ProsperPals should use **four named environments** with disciplined promotion rules:

| Environment | Purpose | Data posture | Promotion rule |
|---|---|---|---|
| `local` | fast developer iteration | synthetic/dev data only | no provider production creds |
| `preview` | PR validation and stakeholder review | seeded non-production data | auto-created from branches |
| `staging` | pre-production integration validation | sanitized staging data + test providers | main-branch deploy + migration gate |
| `production` | user-facing Denmark launch | production data | promoted only from green main with explicit release intent |

### Promotion principles

- code reaches `preview` automatically
- code reaches `staging` from main after tests + schema checks
- code reaches `production` only after a release decision, not just because a merge happened
- feature exposure is controlled by flags, not by branch proliferation

This keeps the team fast without letting “merged” mean “visible to users.”

## CI/CD and Release Engineering Model

### Recommended pipeline stages

```text
pull request opened
  -> lint + typecheck + unit tests
  -> schema diff validation
  -> policy / contract tests
  -> preview deploy
  -> stakeholder review if UX-sensitive
merge to main
  -> integration tests against staging services
  -> migration safety checks
  -> build artifact + release notes stub
  -> staging deployment
release candidate approved
  -> production deploy
  -> post-deploy smoke flows
  -> feature-flag expose by cohort
```

### P0 pipeline gates

Before any production promotion, the pipeline should verify:
- TypeScript build, lint, and formatter compliance
- unit coverage for deterministic finance logic
- contract tests for `MoneyEvent`, ProsperCoin, quote freshness, and consent flows
- migration safety checks against current staging schema
- basic Playwright-level smoke flows for onboarding, log, award, handoff, and trade confirmation
- secret/config presence validation for required providers

### Migration safety rules

Migration mistakes are one of the fastest ways to destroy a small-team finance product. ProsperPals should therefore use these rules:

1. **expand-migrate-contract** for any risky schema change
2. destructive drops require explicit delayed cleanup, never same-release removal
3. every migration must be reversible in operational intent, even if not literally down-migrated
4. seed/test fixtures must cover current and next schema versions during transition windows
5. RLS policy diffs must be reviewed like code, not treated as setup noise

#### ADR-013 — Use preview/staging/production promotion with migration gates and post-deploy smoke tests

**Decision**  
ProsperPals should ship through preview → staging → production with explicit migration checks and post-deploy smoke validation rather than direct merge-to-prod automation.

**Rationale**
- money, consent, and simulator systems are too sensitive for blind promotion
- small teams need release confidence more than maximum deployment frequency
- architecture quality depends on catching schema and policy drift early

**Consequence**
- releases gain a small amount of ceremony
- rollback confidence and sleep quality improve dramatically

## Feature Flags and Denmark-First Rollout Strategy

Deploying code and exposing product capability should be separate controls.

### Flag classes

| Flag class | Example | Owner | Notes |
|---|---|---|---|
| **operational** | enable outbox worker batch mode | engineering | used for safe infra tuning |
| **market rollout** | MobilePay beta enabled | product/engineering | cohort/region gated |
| **experience** | Full vs Lite vs Off default | product/design | presentation only, same ledgers underneath |
| **provider fallback** | switch quote provider priority | engineering/ops | emergency containment |
| **support/debug** | enable verbose trace view for internal staff | engineering | never user-visible |

### Denmark-first exposure path

1. internal team accounts
2. trusted alpha cohort
3. Denmark manual-entry public beta
4. MobilePay limited cohort
5. broader Denmark rollout
6. PSD2 staged adoption once ingestion quality is proven

Flags should be audience-aware using attributes such as:
- country / locale
- onboarding archetype
- account age
- tester cohort
- feature entitlement / plan
- import-provider eligibility

#### ADR-014 — Control rollout with server-evaluated feature flags, not environment forks

**Decision**  
Launch sequencing for manual entry, MobilePay, PSD2, and family surfaces should be controlled by server-evaluated flags and cohort rules rather than separate codebases or environment-specific logic forks.

**Rationale**
- launch roadmap already requires staged capability exposure
- environment forks create hidden divergence and make debugging harder
- server-side evaluation keeps sensitive gating logic out of the client

**Consequence**
- flag hygiene becomes an architecture concern
- the team can expose features gradually without rewriting flows

## Observability, Tracing, and Alerting

ProsperPals needs one coherent story for “what happened?” across product, finance, and AI events.

### Telemetry stack requirements

At minimum, the product should emit:
- structured application logs
- request traces for authenticated commands
- job traces for outbox/worker processing
- domain metrics for key loop conversions and failures
- AI/tool invocation traces with prompt/policy version metadata
- audit events for trust-critical actions

### Required correlation identifiers

Every trust-critical workflow should carry:
- `request_id`
- `user_id` or internal subject reference
- `session_id`
- `idempotency_key` where relevant
- `source_object_id` for canonical finance events
- `trace_id` shared across app, worker, and AI layers

This is how ProsperPals avoids the classic support nightmare where the database knows one thing, logs know another, and the companion explanation cannot be reconstructed.

### P0 operational dashboards

Operations should have at least these dashboards:
1. **Core loop health** — onboarding success, log success, award success, trade success
2. **Import health** — artifact backlog, parse failure rate, provider sync error rate, review queue age
3. **Market data health** — quote freshness, provider fallback rate, stale-trade blocks
4. **Companion health** — tool-call failure rate, policy-block rate, explanation latency, hallucination/appeal feedback
5. **Privacy/security health** — auth anomalies, token refresh failures, suspicious access attempts, consent-projection rebuild failures

### Alert posture

Page-worthy alerts should be reserved for:
- canonical write failure spikes
- duplicate-write/idempotency anomalies
- outbox backlog beyond threshold
- market data freshness breach during active trading windows
- provider token refresh collapse
- widespread auth/session failures
- elevated AI policy-block or explanation failure rates after deploy

Non-page alerts can cover slower drift like recap failures or rising OCR correction burden.

#### ADR-015 — Use shared trace identifiers across money events, jobs, and AI explanations

**Decision**  
ProsperPals should require shared correlation IDs across synchronous requests, asynchronous jobs, and AI explanation flows.

**Rationale**
- support and debugging require reconstruction of cross-layer behavior
- the product’s trust promise depends on proving where an explanation came from
- without shared tracing, the team will lose days to incident archaeology

**Consequence**
- every module must participate in trace propagation
- observability becomes cheaper over time instead of more chaotic

## Performance and Reliability Budgets

The architecture should define acceptable latency and reliability targets now so story decomposition does not accidentally optimize the wrong things.

### P0 latency budgets

| Flow | Target |
|---|---:|
| First authenticated home render | <= 2.5s on typical mobile connection |
| Manual expense log confirmation | <= 1.5s median |
| ProsperCoin award visibility after valid log | <= 2.0s |
| Goldie response with deterministic fact bundle | <= 4.0s median |
| Goldie → Fin handoff ready state | <= 2.5s after trigger |
| Virtual trade confirmation | <= 2.0s with fresh quote |
| Receipt parse initial acknowledgement | <= 1.5s |
| Receipt parse full review ready | <= 20s P95 |

### Reliability budgets

| Capability | Budget |
|---|---:|
| Canonical money-event posting success | >= 99.5% |
| ProsperCoin award side-effect completion within 60s | >= 99.0% |
| Quote freshness compliance during eligible trade windows | >= 99.0% |
| Outbox retry recovery without manual intervention | >= 95% of transient failures |
| Daily recap generation by scheduled deadline | >= 98% |

### Degradation rules

If the system cannot meet full functionality, it should degrade in this order:
1. block risky actions before showing false certainty
2. preserve source-of-truth writes even if projections lag
3. show explicit freshness / degraded-state labels
4. reduce AI flourish before reducing deterministic insight quality
5. fall back to manual workflows before breaking the core loop entirely

## Support, Debuggability, and Internal Tooling

ProsperPals will need internal visibility before it needs enterprise admin tooling. The minimum viable support surface should let the team answer:
- did the user action reach the system?
- did it create a canonical object?
- did the reward/trade/explanation side effects fire?
- was a provider issue, policy block, or user-data issue responsible?

### P0 internal support views

- user timeline by trace id and canonical object ids
- money-event revision history and dedupe status
- ProsperCoin ledger timeline with rule-code references
- trade execution history with quote freshness labels
- import connection health and last sync outcome
- companion message trace with fact-bundle reference and policy outcome
- flag/cohort exposure state for the user

These tools should be internal-only and redact secrets, raw artifacts, and unnecessary PII by default.

## Backup, Recovery, and Incident Discipline

ProsperPals should assume failures will happen and design for calm recovery rather than heroic improvisation.

### P0 recovery posture

- daily verified database backups with documented restore test cadence
- object-storage recovery plan for receipts/statements and generated share artifacts
- runbook for provider outage mode (MobilePay, PSD2, quote provider, OCR)
- runbook for queue backlog recovery
- runbook for stale-quote trading freeze
- runbook for erroneous ProsperCoin or simulator event reversal via compensating entries

### Incident response stance

For trust-critical incidents, the product should prefer:
- temporary feature freeze
- explicit user-facing degraded labels
- reversible compensating actions
- audit-preserving repair steps

over silent mutation or hopeful retries.

## Engineering Readiness for Epic Decomposition

With Step 3 complete, the architecture is now specific enough to drive epics and stories. Engineering work can be decomposed along these operationally meaningful seams:
- app shell + onboarding runtime
- authenticated command/API layer
- money-event capture + normalization
- ProsperCoin ledger + projection jobs
- simulator execution + quote policy
- companion orchestration + fact-bundle pipeline
- sharing/family projections
- observability, support tooling, and release operations

This is the right level of resolution for epic writing: concrete enough to avoid fuzzy ownership, still abstract enough not to hardcode implementation trivia into the backlog.

## Open Items for Epic Decomposition

The next phase should translate architecture into:
- P0 epics for onboarding, logging, rewards, simulator, companion orchestration, and release safety
- P1 epics for MobilePay, family learning surfaces, and richer insights
- P2 epics for PSD2 scale-up, deeper personalization, and advanced support tooling
- acceptance criteria that preserve the latency, privacy, and trust budgets defined here

## Step 3 Elicitation Outcomes

### Architecture Decision Records
Used to lock release/promotion rules, Node-runtime discipline for trust-critical commands, cohort-based feature rollout, and shared-trace requirements before convenience shortcuts can fragment the operating model.

### Cross-Functional War Room
This step reconciled the needs of product, design, engineering, compliance, and support:
- product gets staged Denmark-first exposure without environment chaos
- design keeps a fast, calm UI because heavy work moves to command/worker lanes
- engineering gets clear promotion gates and runtime responsibilities
- compliance gets traceability and incident-grade audit posture
- support gets reconstructable timelines instead of guesswork

### Critique and Refine
The operating model was pressure-tested against common startup mistakes: merge-to-prod bravado, invisible feature drift, under-instrumented AI flows, schema breakage, and no-runbook incident handling. Each section was refined toward small-team realism rather than enterprise cosplay.

## Step 3 Hardening Summary

ProsperPals architecture is now complete for the BMAD architecture phase. The product has a coherent answer for:
- what gets built
- where trusted state lives
- how external noise becomes canonical truth
- how releases move safely into production
- how failures are traced, contained, and recovered

**Architecture verdict:** ready for `epics-stories` decomposition. The next work should convert these system boundaries, budgets, and rollout rules into P0/P1/P2 delivery units with acceptance criteria.



## Step 2 Elicitation Outcomes

### Architecture Decision Records
Used to lock structural privacy separation, immutable audit/value ledgers, and durable idempotency before implementation shortcuts can calcify into product risk.

### Red Team vs Blue Team
This step was stress-tested against the most likely launch failures:
- **Red team:** duplicate postings during reconnects, family privacy leaks via convenience joins, stale quote trading, token exposure, reward double-crediting, and provider-sync ambiguity.
- **Blue team response:** persisted idempotency store, projection-only sharing, stale-quote execution blocks, secret redaction/segregation, append-only ledgers, and adapter-first canonicalization.

### Self-Consistency Validation
Step 2 was checked against the approved brief, PRD, and UX spec to ensure:
- the 80-second onboarding promise still works with review and trust controls
- Off mode still preserves the same underlying ledgers and planning logic
- Goldie/Fin remain explanation layers over deterministic facts
- family monetization still operates without surveillance or raw-finance sharing
- Denmark-first launch sequencing still fits one canonical data model from manual entry to PSD2

## Step 2 Hardening Summary

This step converts ProsperPals from a good-looking architecture concept into a finance-grade system boundary design. The major outcome is simple: **private financial truth, reward value systems, simulator execution, AI explanation, and family sharing now have explicit fences between them.**

That means the next step can focus on operational architecture — deployment, observability, CI/CD, and rollout discipline — without reopening the core trust model.

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
