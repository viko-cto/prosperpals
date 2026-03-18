---
stepsCompleted:
  - 1-ux-design-specification
inputDocuments:
  - _bmad/_bmad-output/planning-artifacts/product-brief-prosperpals-agentic-2026-03-07.md
  - _bmad/_bmad-output/planning-artifacts/prd-prosperpals-agentic.md
  - /home/node/clawd/research/prosperpals/bmad-session-notes-product-brief.md
  - docs1/Design ProsperPals App/NAVIGATION_FLOW.md
workflowType: 'ux-design'
phase: 'ux-design'
step: 1
stepName: 'specification-and-flows'
elicitationMethods:
  - comparative-analysis-matrix
  - critique-and-refine
  - cross-functional-war-room
status: 'complete'
---

# UX Design Specification - ProsperPals

**Product:** ProsperPals  
**Owner:** Nikolas / CopenDapp Labs  
**Prepared by:** Viko  
**Date:** 2026-03-18  
**Status:** Draft complete — ready for architecture and epic breakdown

## Executive Summary

ProsperPals must feel like a calm, premium financial companion first and a gamified learning system second. The UI should communicate trust within the first few seconds, then reveal motivation, rewards, and social energy as an overlay rather than as the visual foundation. The design target is **Revolut-level clarity with Duolingo-level behavioral reinforcement**, without ever drifting into childish, noisy, or shame-based finance UI.

The core UX promise is:
1. **Show useful value fast** — a first insight or first simulator action in under 80 seconds.
2. **Make daily money awareness feel lightweight** — one number, one mood, one next action.
3. **Turn effort into momentum** — logging earns ProsperCoins, ProsperCoins unlock learning and simulator depth.
4. **Keep trust visible at every step** — educational framing, transparent data provenance, and strict privacy boundaries.

This specification translates the approved product brief and PRD into a mobile-first interaction system, screen model, conversation pattern library, and design language that architecture and implementation can build from without inventing core UX rules later.

## UX North Star

### Experience Outcome

By the end of the first week, a successful ProsperPals user should feel:
- **less surprised** by where money goes,
- **more confident** about what is safe to spend,
- **curious instead of intimidated** by investing,
- **rewarded rather than judged** for engaging with their finances.

### UX Success Criteria

| UX goal | Target | Design implication |
|---|---:|---|
| Time to first useful value | <= 80 seconds median | Onboarding cannot require bank linking, long forms, or category setup before value appears |
| Goldie to Fin continuation | > 80% | Handoff must be explicit, contextual, and visually smooth |
| Day-2 return motivation | Strong enough that users re-open without a push | Home screen must answer “where do I stand today?” at a glance |
| Companion confusion | < 10% reported confusion | Active companion identity must always be visible |
| Receipt correction burden | < 15% require major manual correction | Review UX must be fast, editable, and confidence-scored |
| Off mode usefulness | Users still perceive ProsperPals as differentiated | Core loop, insights, and simulator must survive without competitive chrome |

## Experience Principles

### 1. Calm confidence beats hype
The visual base should feel financially credible, modern, and breathable. Gamification elements exist to reinforce progress, not dominate the screen.

### 2. One-glance value before deep interaction
Every primary surface should answer one question immediately:
- Home: “Where do I stand today?”
- Goldie: “What should I log or notice?”
- Fin: “What happened in my portfolio, and why?”
- Family: “What progress is visible without exposing private money data?”

### 3. Passive hook + active action
The UX must support both:
- **Passive viewing:** Daily Spending Power, mood state, portfolio movement.
- **Active action:** log, scan, invest, review, invite, or learn.

### 4. Reward awareness, not spending
ProsperCoins are earned for logging, reflection, clean categorization, learning, zero-spend acknowledgement, and consistent use — never for spending more money.

### 5. Handoffs should feel guided, not magical
Goldie and Fin are distinct modes of one coherent product. Users should never feel the app changed personality without explanation.

### 6. Privacy must be obvious
Whenever data could be shared, reviewed, estimated, or imported, the UI must label it clearly. Shared learning is social; financial details are private.

### 7. Denmark-first, architecture-friendly
DKK, Danish receipt patterns, and MobilePay expectations should be visible in copy and defaults, while the layout and information model remain reusable for other markets.

## Information Architecture and Navigation Model

### Entry Model

The application starts at a full-screen landing/onboarding route (`/`) with **no sidebar or app chrome**. The landing screen must never auto-redirect. Users explicitly choose where to begin.

### Primary Entry Actions

- **Start with Goldie** → `/chat-goldie`
- **Explore Dashboard** → `/net-worth`
- **Chat with Fin** → `/chat-fin`
- Feature cards link to `net-worth`, `spending-insights`, and `goals`

### Authenticated App Shell

To reconcile current route thinking with mobile-first execution, ProsperPals should use one information architecture with two shells:

#### Mobile shell
- Bottom navigation with 5 primary destinations
- Floating quick action for scan/log
- Contextual top bar with companion/avatar and trust state

#### Desktop/tablet shell
- Left rail / sidebar navigation
- Wider content canvas with persistent secondary panels where useful
- Same destination model as mobile

### Recommended Primary Navigation Map

| Destination | Purpose | Typical route alignment |
|---|---|---|
| Home | Daily Spending Power, portfolio snapshot, streak, prompts | `/net-worth` or future `/home` |
| Goldie | Logging, budgeting, recurring spend awareness, daily chat | `/chat-goldie` |
| Fin | Simulator, explanations, learning tracks, what-if views | `/chat-fin` + simulator routes |
| Insights | Spending trends, subscriptions, safe-to-spend, forecasts | `/spending-insights` |
| Goals / Progress | ProsperCoins, keys, streaks, leagues, mode controls | `/goals` |

### Secondary Navigation Areas

Accessible from profile, rail, or stacked settings menus:
- Family Space
- Subscriptions Audit
- Banks / Imports
- Settings / Gamification Mode
- Privacy & Sharing Controls
- Notifications / Weekly League / Challenges

## Design System

### Visual Direction

**Brand posture:** premium minimal, optimistic, intelligent, non-judgmental.  
**Reference energy:** Revolut clarity, Notion-like breathing room, Duolingo retention mechanics, not Snapchat chaos.  
**Hard rule:** no purple or indigo. Use blue as the trust anchor.

### Color System

| Token | Hex | Usage |
|---|---|---|
| Primary / Sky | `#0EA5E9` | Primary CTA, highlights, key focus states |
| Action Blue | `#3B82F6` | Links, active states, charts, trusted data emphasis |
| Ink 900 | `#0F172A` | Primary text and high-trust surfaces |
| Slate 700 | `#334155` | Secondary text |
| Slate 200 | `#E2E8F0` | Borders, dividers |
| Slate 50 | `#F8FAFC` | App backgrounds |
| Surface White | `#FFFFFF` | Cards, sheets, modals |
| ProsperCoin Gold | `#F59E0B` | ProsperCoins, reward cues, earned-state accents |
| Success Emerald | `#10B981` | Positive movement, completed states |
| Warning Amber | `#F59E0B` | Review needed, pending confidence |
| Danger Coral | `#EF4444` | Overspend alerts, destructive actions |
| Copper Key | `#B45309` | Prosperity tier visuals |
| Silver Key | `#94A3B8` | Prosperity tier visuals |
| Gold Key | `#EAB308` | Prosperity tier visuals |

#### Color usage rules
- Blue is the trust/control color.
- Gold is the reward color.
- Green is reserved for positive financial movement or completion, not for generic decoration.
- Red is used sparingly and never for shaming language.
- Large surfaces remain neutral; gamification colors appear in chips, progress bars, and celebratory moments.

### Typography

- **Primary typeface:** Inter
- **Display style:** Semibold, tight but not compressed
- **Body style:** Regular/Medium, high legibility, 16px minimum base on mobile

| Level | Size | Weight | Use |
|---|---:|---:|---|
| Display L | 32 | 700 | Landing hero, major number moments |
| Display M | 24 | 700 | Section headers, Daily Spending Power |
| Heading | 20 | 600 | Card titles, feature sections |
| Title | 18 | 600 | Screen titles |
| Body | 16 | 400/500 | Main text |
| Support | 14 | 400/500 | Help text, annotations |
| Micro | 12 | 500 | Status labels, confidence badges |

### Spacing and Radius

- 4pt spacing scale with common steps: 4 / 8 / 12 / 16 / 24 / 32
- Card radius: 20px
- Input radius: 16px
- Pill/chip radius: 999px
- Comfortable vertical spacing is part of the premium feel; avoid dense dashboard packing on mobile.

### Component Language

#### Core cards
- Elevated white or tinted neutral background
- Strong title + one primary metric + one action
- Optional supportive subtitle and confidence/status chip

#### Buttons
- Primary: filled sky blue
- Secondary: soft blue tint or neutral outline
- Tertiary: text button with icon
- Destructive: coral outline or filled only in high-risk dialogs

#### Chips and badges
Used for:
- data trust state (`Verified`, `Estimated`, `Needs review`)
- mood state (`Tight`, `Comfortable`, `Flush`)
- gamification mode (`Full`, `Lite`, `Off`)
- companion state (`Goldie`, `Fin`)

#### Bottom sheets and drawers
Preferred for:
- receipt review
- simulator trade confirmation
- mode switching
- privacy consent details
- family share controls

### Iconography and Illustration

- Clean rounded line icons
- Minimal use of decorative illustrations
- Goldie and Fin should have distinct avatar treatments, not cartoon mascots
- Avatar style should feel polished and emotionally warm, closer to premium wellness assistants than gaming NPCs

### Motion

Motion should reassure and orient, not entertain for its own sake.

Use motion for:
- companion handoff transitions
- reward confirmation
- successful receipt scan parsing
- weekly league movement
- card expansion / sheet transitions

Avoid:
- bouncing dashboards
- constant pulsing CTAs
- excessive confetti for everyday actions

## Responsive Layout Framework

### Mobile-first layout priorities

Mobile is the primary design target. Each major screen should be usable one-handed and legible without zooming.

#### Mobile content pattern
1. Sticky top bar
2. Hero insight card or chat header
3. Primary action zone
4. Secondary context modules
5. Bottom navigation / floating quick action

### Desktop adaptation

Desktop should not become a different product. It should provide:
- wider charts and tables,
- persistent summary rails,
- side-by-side chat + context where valuable,
- easier family dashboard review,
- smoother PDF/CSV import flows.

## Key Screen Specifications and Wireframe Descriptions

### 1. Landing / Onboarding Home (`/`)

**Purpose:** explain the value proposition and let the user choose an entry path without friction.

**Layout:**
- Hero headline: “Track your money. Earn virtual currency. Learn to invest.”
- Short subcopy focused on financial confidence, not jargon
- Three primary cards: Start with Goldie, Explore Dashboard, Chat with Fin
- Three benefit cards below: Spending clarity, Real-market simulator, ProsperCoins progress
- Lightweight trust strip: education-not-advice, private by default, Denmark-first launch

**Primary actions:**
- Start with Goldie
- Explore Dashboard
- Chat with Fin

**Design notes:**
- No forced signup wall before understanding the product
- No auto-redirects
- If auth is required, make it a short interruption after a CTA tap, not before

### 2. Intent Selection Screen

**Purpose:** personalize the first session while keeping the choice simple.

**Layout:**
- Title: “What do you want help with first?”
- Three intent cards: Fix my spending, Practice investing, Help my family learn
- Small note: “You can switch later”

**Primary actions:** select one intent card

**Design notes:**
- Prefer behavior framing over persona labels
- Use one-line emotional promises under each card

### 3. Budget-First First Session

**Purpose:** prove value through one real expense and one immediate insight.

**Layout:**
- Goldie chat occupies top 60%
- Quick entry tray at bottom with: text, voice, scan receipt
- After first entry, a compact insight card appears inline
- ProsperCoins earned animation appears in place, not as a modal interruption
- Fin invitation appears as a distinct inline card: “Want to invest what you just earned?”

**Primary actions:**
- log expense
- review category if needed
- continue to Fin or stay with Goldie

**Design notes:**
- Logging must feel like chatting, not form completion
- Keep structured fields progressive, only requested if confidence is low

### 4. Invest-First First Session

**Purpose:** make the simulator feel consequential immediately, then tie it back to real awareness behavior.

**Layout:**
- Goldie intro with starter coins
- Smooth handoff card to Fin
- Three recognizable asset cards visible above the fold
- Each asset card contains logo, name, one-line “why it matters,” and simple risk tag
- Confirmation sheet explains the choice is virtual and educational

**Primary actions:**
- choose asset
- confirm virtual buy
- opt in to daily portfolio updates

**Design notes:**
- First pick cannot feel random; avoid obscure instruments
- The follow-up promise should create a reason to return tomorrow

### 5. Home / Daily Check-In Screen

**Purpose:** become the Day-2 and Day-30 retention anchor.

**Layout hierarchy:**
1. **Daily Spending Power hero** with mood word (`Tight`, `Comfortable`, `Flush`)
2. **Portfolio movement card** with one-line Fin explanation
3. **Goldie prompt card** (“Anything to log from yesterday?”)
4. **Streak / ProsperCoins row**
5. **Recurring spend or subscription insight**
6. Optional family or league module depending on mode and permissions

**Primary actions:**
- quick log
- scan receipt
- view portfolio
- see spending insights

**Design notes:**
- This screen should be useful even if the user does nothing else
- The top hero should carry the product on low-energy days

### 6. Goldie Conversation Workspace

**Purpose:** be the easiest place to log and reflect on money.

**Layout:**
- Companion header with Goldie identity and current context
- Conversational thread with mixed message + card blocks
- Persistent composer with text, microphone, scan icon, add manually icon
- Quick-reply chips: `Log expense`, `Zero-spend day`, `Show subscriptions`, `What’s safe today?`
- Right under the latest system response: provenance chip if data is estimated or parsed from OCR

**Primary actions:**
- log money event
- ask safe-to-spend question
- review recurring bills
- move into Fin context

**Design notes:**
- Goldie tone should be encouraging and concrete
- Avoid giant walls of assistant text; use small paragraphs and support cards

### 7. Fin Conversation + Simulator Workspace

**Purpose:** teach through outcomes, not lectures.

**Layout:**
- Fin header with current portfolio value and market freshness label
- Split content blocks: conversation thread + portfolio action cards
- Tab switch or stacked sections for `Portfolio`, `Learn`, `What If`
- Trade limit meter (for full/lite modes) shown as learning friction, not punishment

**Primary actions:**
- review holdings
- make a virtual trade
- ask “what happened?”
- open learning track

**Design notes:**
- Fin should use charts sparingly and explain them in plain language
- Never let the simulator resemble a real brokerage execution flow too closely

### 8. Spending Insights Screen

**Purpose:** convert raw transaction history into understandable patterns.

**Layout:**
- Pay-cycle selector at top
- Daily Spending Power summary
- Category trend cards
- Merchant / subscription highlights
- “If this continues…” forecast module
- Opportunity cost module for users who opt in

**Primary actions:**
- review categories
- edit/correct entries
- identify subscriptions
- compare periods

**Design notes:**
- Lead with insight statements, not charts alone
- Category edits should be quick inline interactions, not deep settings flows

### 9. Receipt Scan Capture and Review

**Purpose:** make manual-entry MVP feel smart instead of tedious.

**Capture state:**
- Camera with simple framing guide
- Hint text tuned for Danish retail receipts
- Option to upload image if camera quality is poor

**Review state:**
- Merchant + date + total shown first
- Item list or category summary underneath
- Confidence labels for parsed fields
- One-tap confirm/edit affordances
- Earning summary at bottom: “Confirmed receipt → +X ProsperCoins” 

**Design notes:**
- Always review before commit
- If confidence is low, collapse to total + category confirmation instead of pretending precision

### 10. Subscription Audit / Statement Upload

**Purpose:** deliver a strong Marcus-style “aha” before bank integrations are live.

**Layout:**
- Simple upload surface for PDF/CSV/bank statement bridge
- Progress state with parsing indicators
- Results list grouped as `Keep`, `Review`, `Potentially forgotten`
- Each item has an annualized cost preview and optional Fin reframing

**Primary actions:**
- upload statement
- mark keep/cancel/review
- convert findings into goals or reminders

**Design notes:**
- Treat this like a guided reveal, not a static report
- After MobilePay becomes available, use this screen to explain the upgrade path instead of replacing it abruptly

### 11. Goals / ProsperCoins / Progress Screen

**Purpose:** show motivation systems without turning the app into a casino.

**Layout:**
- ProsperCoins balance hero
- Key progress ladder (Copper → Silver → Gold)
- Current streak / freeze status
- League position if Full mode is enabled
- “How to earn more” list focused on awareness actions
- “What ProsperCoins unlock” section

**Primary actions:**
- see progress
- switch mode
- redeem unlocks inside simulator/learning system
- view milestones

**Design notes:**
- Rewards should feel earned and explain their utility
- Lite and Off mode users should still see progress, but with reduced competition framing

### 12. Family Space

**Purpose:** support teaching and shared momentum without financial surveillance.

**Layout:**
- Family progress summary card
- Learning milestones and challenge widgets
- Invite flow for another member
- Privacy explainer card that states what is and is not shared
- Weekly recap card designed to be viewed together

**Primary actions:**
- invite family member
- start challenge
- view milestones
- manage sharing permissions

**Design notes:**
- Default language should be “learn together,” not “monitor each other”
- Design for co-present usage: parent and child viewing one screen together

### 13. Settings, Mode Control, and Privacy Center

**Purpose:** give users control over tone, gamification intensity, and data-sharing clarity.

**Layout:**
- Gamification mode switcher with previews of each mode
- Notification controls
- Sharing permissions
- Connected data sources
- Export/delete/privacy requests
- Companion preference and explanation depth settings

**Primary actions:**
- switch Full/Lite/Off
- connect/disconnect imports
- manage consent
- adjust explanation depth

**Design notes:**
- Users should understand the effect of each mode before switching
- Consent history should be human-readable, not legalese-only

## Core User Flows

### Flow 1: Budget-first first session
1. User taps **Start with Goldie**.
2. Intent card confirms spending-awareness path.
3. Goldie asks for one recent expense.
4. User enters via text, voice, or scan.
5. Goldie confirms category and explains immediate consequence.
6. ProsperCoins are awarded.
7. Fin invitation appears with a clear reason to continue.
8. User either enters simulator now or returns to home with a reason to come back.

**Critical friction to avoid:** category setup, forced account linking, long onboarding questionnaires.

### Flow 2: Invest-first first session
1. User chooses **Practice investing**.
2. Goldie frames the simulator as educational and rewards starter action.
3. Explicit handoff to Fin.
4. Fin presents three recognizable assets.
5. User makes one virtual choice.
6. Fin explains what to watch and when to return.
7. Home screen now includes portfolio movement and a prompt to earn more coins through awareness.

**Critical friction to avoid:** overly technical investing language, too many portfolio controls, fake urgency.

### Flow 3: Daily passive + active loop
1. User opens app.
2. Home screen shows Daily Spending Power + mood.
3. User optionally checks portfolio movement.
4. Goldie offers a lightweight action.
5. User logs, scans, or confirms zero-spend day.
6. Progress updates immediately.

**Design objective:** even if the user only glances, the app still delivers value.

### Flow 4: Receipt-to-insight flow
1. User taps scan.
2. Captures receipt.
3. OCR parses merchant/date/total/items.
4. Review sheet highlights confidence.
5. User confirms or edits.
6. Goldie converts the receipt into a spending insight.
7. ProsperCoins awarded.

**Design objective:** scan review must be faster than manual entry.

### Flow 5: Statement audit to MobilePay migration
1. User uploads statement in Sprint 1.
2. Goldie reveals recurring costs and forgotten subscriptions.
3. User tags items as keep/review/cancel.
4. Later, MobilePay import becomes available.
5. Goldie offers an upgrade path, explains reconciliation, and preserves prior learning.

**Design objective:** no “start over” feeling when automation arrives.

### Flow 6: Family invitation and co-present challenge
1. Teach-family user enters Family Space.
2. Preview shows safe sample milestones before another user joins.
3. User invites family member.
4. Shared challenge card becomes available.
5. Weekly recap is displayed in a format meant for joint viewing.

**Design objective:** make the family plan feel like collaborative coaching, not monitoring.

## Companion Conversation Patterns

### Goldie pattern library

**Goldie should sound:** warm, grounded, encouraging, never fluffy.

**Best Goldie jobs:**
- ask for one simple input
- translate spending into safe-to-spend context
- celebrate consistency
- soften correction requests without lowering trust
- steer users toward action when they feel anxious

**Goldie UI behaviors:**
- more chips, quick replies, and inline cards
- lighter data visualizations
- strong use of mood labels and next-step suggestions

### Fin pattern library

**Fin should sound:** sharper, calmer, analytical, concise.

**Best Fin jobs:**
- explain why a portfolio moved
- compare scenarios
- translate investment ideas into educational terms
- connect gains/losses to opportunity cost without moralizing

**Fin UI behaviors:**
- simple chart callouts
- asset cards with plain-language annotations
- learning modules tied to current user context

### Handoff pattern

Every Goldie → Fin transition should include:
1. a visible companion change,
2. a sentence explaining why Fin is joining,
3. preserved context from the prior interaction,
4. a clear next action.

**Example:**  
Goldie: “You just earned 50 ProsperCoins from logging lunch. Want Fin to help you use them in the simulator?”  
Tap → transition card → Fin appears with “Goldie said you want to practice with today’s 50 coins. Here are three recognizable picks to start with.”

### Trust and provenance patterns

Messages and cards must visibly distinguish:
- **Verified** imported data
- **Parsed** OCR or PDF-inferred data
- **Estimated** forecasted insights
- **User-entered** manual records

The user should never need to guess whether something is a fact, a guess, or a suggestion.

## Dashboard and Data Presentation Patterns

### Daily Spending Power card

Must include:
- one large number,
- pay-cycle context,
- mood word,
- optional delta vs normal pattern,
- one next action.

**Example structure:**
- `127 kr/day`
- `until next income in 16 days`
- `Comfortable`
- `12 kr/day below your usual pace`
- CTA: `Log yesterday’s spend`

### Portfolio movement card

Must include:
- today’s movement,
- one-line explanation,
- educational framing,
- CTA to open Fin.

### Subscription insight card

Must include:
- count or standout merchant,
- monthly/annualized amount,
- simple action (`Review`, `Keep`, `Cancel reminder`),
- no shaming copy.

### Progress row

Must include:
- ProsperCoins balance,
- streak status,
- key progress,
- optional league position in Full mode.

## Gamification Mode Behavior

### Full Mode
- Show league rank, streak ladder, key ladder, richer celebration moments.
- Keep the core finance surfaces calm; do not overlay gamification on every screen.

### Lite Mode
- Keep ProsperCoins, streaks, milestones, and key progression.
- Hide leagues, clan pressure, and highly competitive rankings.

### Off Mode
- Remove competitive framing and cosmetic reward emphasis.
- Keep the same information architecture, core loop, and educational simulator.
- Home screen still shows progress, but as utility rather than game status.

## Accessibility and Inclusive Design

### Baseline requirements
- WCAG 2.2 AA target
- Minimum 4.5:1 text contrast on core interfaces
- 44x44 minimum touch targets
- Dynamic type support on mobile
- Full keyboard navigation for web
- Screen-reader labels for all charts, toggles, and reward status indicators

### Financial accessibility considerations
- Do not rely on color alone for positive/negative movement
- Support plain-language explanations for financial terms
- Avoid shame-triggering red overload on overspend states
- Make all critical insights understandable without chart literacy

### Cognitive load rules
- Ask for one thing at a time during onboarding
- Use progressive disclosure for advanced simulator actions
- Keep card density low on mobile
- Limit simultaneous metrics on the home screen to what supports immediate action

## Content and Microcopy Guidelines

### Tone rules
- Encouraging, specific, and practical
- Never sarcastic or guilt-inducing
- Never pretend certainty where the system is estimating
- Never blur education with advice

### Good copy patterns
- “You’ve got 127 kr/day until payday.”
- “This receipt looks like groceries. Want to confirm?”
- “Your Novo Nordisk practice pick rose today. Here’s the likely reason.”
- “This looks estimated until we verify it.”

### Avoid
- “You overspent again.”
- “Bad choice.”
- “You should buy…”
- “Guaranteed return.”

## Usability Validation Plan

Before implementation is treated as design-complete, run focused tests on:

1. **80-second first session** — can users reach value without coaching?
2. **Goldie → Fin handoff** — do users understand who is speaking and why?
3. **Day-2 home screen** — is the passive hook compelling enough?
4. **Receipt review** — is correction faster than manual entry?
5. **Mode switch clarity** — do users understand Full/Lite/Off consequences?
6. **Family privacy comprehension** — can users explain what is shared and what is not?
7. **Off mode differentiation** — does the product still feel meaningfully better than a plain budget tracker?

## Elicitation Outcomes

### Comparative Analysis Matrix

| Design question | Common market pattern | ProsperPals UX decision |
|---|---|---|
| First-session value | Ask for bank sync or account setup immediately | Deliver value through chat, receipt scan, or starter simulator path before sync |
| Finance visual language | Dense spreadsheets or neon gamification extremes | Calm premium base with reward overlays |
| AI interaction | One generic chatbot | Goldie and Fin with explicit visible context switching |
| Reward model | Points with vague meaning | ProsperCoins tied to learning and simulator capability |
| Family premium | Shared ledger / surveillance view | Shared milestones and challenges without transaction exposure |
| Off mode | Remove most differentiators | Remove competition aesthetics only; keep insights and simulator value |

### Critique & Refine Corrections

The UX draft was tightened in the following ways:
- Reduced dashboard clutter by forcing one dominant insight per primary screen.
- Prevented companion confusion by requiring active companion identity in the header and at handoff.
- Kept landing and onboarding independent from side-rail chrome to preserve focus and route clarity.
- Clarified that gamification mode changes presentation intensity, not core capability access.
- Strengthened trust states so parsed, estimated, and verified data are always distinguishable.

### Cross-Functional War Room Resolutions

Product, design, compliance, and engineering tensions were resolved as follows:
- **Compliance:** simulator and educational framing stay visible in Fin surfaces and trade confirmations.
- **Engineering:** one shared IA and route model support both mobile and desktop shells.
- **Growth:** shareable milestones are designed as self-explanatory artifacts without leaking private money data.
- **Operations:** statement upload remains a designed bridge, not a temporary hack, so Sprint 1 still feels intentional.
- **Design:** premium visual credibility remains the foundation even when Full mode is enabled.

## Implementation Handoff Notes

Architecture and epics should preserve these UX contracts:
- Landing route remains user-controlled with no auto-redirect behavior.
- Data provenance states must be supported structurally, not faked in copy.
- Companion identity, explanation depth, and mode settings must be profile-level preferences.
- Home screen must support mixed data freshness states gracefully.
- Family data model must separate milestone visibility from private finance detail access.
- Reward mechanics must be configurable by mode without rebuilding screen structure.

## UX Hardening Summary

This UX specification translates ProsperPals from a strong concept into a buildable interaction system. The design is intentionally biased toward:
- **fast trust,**
- **lightweight daily use,**
- **clear companion roles,**
- **meaningful rewards,**
- **privacy-safe social motivation.**

If built as specified, ProsperPals should feel different from both traditional budgeting software and gimmicky finance apps: a premium, shame-free financial wellness product that helps users understand today, act better tomorrow, and learn investing without getting lost in brokerage complexity.
