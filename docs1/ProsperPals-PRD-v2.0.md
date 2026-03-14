# ProsperPals — Product Requirements Document (PRD v2.0)

> **Version:** 2.0 | **Date:** March 7, 2026
> **Authors:** Nikolas Fedulov (Head of Design), Vadim Fedulov (CEO), Viko ⚡ (AI)
> **Company:** CopenDapp Labs ApS (subsidiary of Valine Parafed Holding ApS)
> **Status:** ACTIVE — Design & Architecture Phase

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [Target Users](#4-target-users)
5. [AI Companions — Goldie & Fin](#5-ai-companions--goldie--fin)
6. [Product Architecture](#6-product-architecture)
7. [Core Features & Workspaces](#7-core-features--workspaces)
8. [Gamification — The Prosperity Keys](#8-gamification--the-prosperity-keys)
9. [UI/UX Design System](#9-uiux-design-system)
10. [Technical Stack](#10-technical-stack)
11. [Integrations & Open Banking](#11-integrations--open-banking)
12. [Privacy, Security & Compliance](#12-privacy-security--compliance)
13. [Business Model & Pricing](#13-business-model--pricing)
14. [Competitive Landscape](#14-competitive-landscape)
15. [Go-to-Market Strategy](#15-go-to-market-strategy)
16. [Roadmap & Milestones](#16-roadmap--milestones)
17. [Success Metrics](#17-success-metrics)
18. [Risks & Mitigations](#18-risks--mitigations)
19. [Appendix](#19-appendix)

---

## 1. Executive Summary

**ProsperPals** is an AI-powered financial companion platform that helps Gen Z and young millennials (18–35) build healthy money habits through personalized guidance, gamification, and emotional support.

**One-liner:** *The financial wellness app that feels like talking to your smartest, kindest friend about money.*

### What Makes ProsperPals Different

Unlike every budgeting app that's essentially "a spreadsheet with a UI," ProsperPals introduces **two AI companions with distinct personalities**:

- **Goldie** 🪙 — Warm, supportive budgeting companion (daily financial wellness)
- **Fin** 📈 — Sharp, analytical investing mentor (wealth building & education)

This **dual-companion model** is unique in the market. No competitor — not Cleo, not YNAB, not Monarch — offers character-driven financial guidance with emotional intelligence.

### Key Stats Driving the Product

| Stat | Source |
|------|--------|
| 67% of Gen Z say finances negatively impact mental health | Deloitte 2025 |
| 85% of users prefer spreadsheets over budgeting apps | Reddit sentiment analysis |
| 45% of app complaints = subscription fatigue | Market research |
| 60% negative sentiment on budgeting apps overall | Reddit analysis |
| 20-30% transaction miscategorization across competitors | User reviews |

---

## 2. Problem Statement

### The User Problem

Young adults face a financial literacy crisis compounded by tools that make things worse:

1. **Finance feels scary and judgmental** — Apps show red numbers and shame overspending
2. **Budgeting apps are boring** — Spreadsheet UIs with no personality drive 60%+ abandonment in week 1
3. **Information overload** — Too many charts, categories, and settings before any value is delivered
4. **No emotional support** — Money is emotional, but every app treats it as purely mathematical
5. **Paywalled basics** — Core features locked behind $10-15/month subscriptions
6. **Bank sync failures** — 60% of complaints mention broken connections

### The Market Gap

| What Exists | What's Missing |
|-------------|----------------|
| Spreadsheet-style dashboards | Personality-driven guidance |
| Generic AI chatbots (Cleo) | Dual-companion system with distinct expertise |
| US-focused apps | EU-native with PSD2 open banking |
| Mobile-only (Cleo) | Web + Mobile (PWA first) |
| Entertainment OR education | Both — engaging AND genuinely educational |
| Paywall-heavy monetization | Generous free tier that works |

---

## 3. Solution Overview

ProsperPals is a **conversation-first** financial wellness platform. Users interact primarily through natural dialogue with Goldie and Fin, not through forms and menus.

### Core Architecture: Agentic OS

Built on the same Agentic OS pattern as SponCite (CopenDapp's clinical trials platform):

- **Slack-like communication** — Real-time chat with AI companions
- **Notion-like workspaces** — Modular, configurable views for different financial activities
- **MCP integrations** — Model Context Protocol for bank connections, calendar, and external services

### Design Philosophy

1. **Show value before asking for anything** (outcome-first onboarding)
2. **Calm, not corporate** — Warm tones, soft animations, zero guilt
3. **Companion-led, not dashboard-led** — Goldie & Fin guide the experience
4. **Progressive complexity** — Simple by default, power features discoverable
5. **Chat-first, not form-first** — Natural language over dropdown menus

---

## 4. Target Users

### Primary: Gen Z (18-27)

- First jobs, first budgets, first financial anxiety
- Comfortable with AI and chatbot interfaces
- Discover products via TikTok (46% prefer over Google)
- Value authenticity and transparency
- Mental health aware — want tools that feel supportive

### Secondary: Young Millennials (28-35)

- More complex finances (couples, families, investments)
- Switching from spreadsheets or frustrated with YNAB/Monarch
- Value education and long-term wealth building
- Willing to pay for tools that actually work

### User Personas

**🎓 Student Sofia (21, Copenhagen)**
- Part-time job, student loan, wants to stop living paycheck to paycheck
- Needs: Simple budgeting, subscription tracking, savings goals
- Companion preference: Goldie (warmth, no judgment)

**💼 Freelancer Felix (26, Berlin)**
- Irregular income, multiple expense categories, no retirement plan
- Needs: Variable income budgeting, tax prep help, investment education
- Companion preference: Both — Goldie for daily, Fin for strategy

**👫 Couple Chris & Emma (29, Stockholm)**
- Combined finances, saving for apartment, different money habits
- Needs: Shared goals, individual privacy, couples budgeting
- Companion preference: Goldie for gentle mediation, Fin for joint planning

---

## 5. AI Companions — Goldie & Fin

### Goldie 🪙 — Daily Financial Wellness

**Personality Profile:**
- Warm, encouraging, emoji-friendly
- Celebrates small wins ("You saved €23 more than last week! 🎉")
- Never judgmental about spending
- Proactive — reaches out first, doesn't wait to be asked
- Focuses on awareness and gentle habit building
- Voice: Like your most financially-savvy best friend

**Domains:**
- Daily spending awareness
- Budget tracking and nudges
- Bill reminders and payment predictions
- Saving goal progress and sweeps
- Subscription management (Essential Bills vs. Flexible)
- Smart transaction categorization
- Spending mood tracking

**Design Language:**
- Warm gold/coral color palette
- Soft, rounded UI elements
- Celebratory micro-animations
- Gentle, encouraging microcopy

**Example Interactions:**

> **Proactive check-in:**
> Goldie: "Hey! ☀️ You've spent €127 this week — that's €23 under your target! Want to sweep that into your summer trip fund? 🏖️"

> **Overspending (no guilt):**
> Goldie: "Your food budget went over by 230 kr this week. Totally normal — want me to adjust next week's plan so it balances out?"

> **Subscription alert:**
> Goldie: "Psst 👀 You haven't used your gym membership in 47 days. That's 399 kr/month. Want me to flag it for review?"

---

### Fin 📈 — Wealth Building Mentor

**Personality Profile:**
- Analytical but approachable
- Teacher mindset — explains the "why" behind everything
- Builds confidence through education, not commands
- Uses data and projections to make points
- Focused on long-term thinking and compound growth
- Voice: Like a patient finance professor who actually makes sense

**Domains:**
- Investment education (not advice — critical distinction)
- Portfolio simulation (virtual investing)
- Compound growth visualization
- Emergency fund planning
- Net worth tracking
- Financial literacy modules and quizzes
- Market education (what happened and why)

**Design Language:**
- Cool teal/navy color palette
- Slightly sharper (but still rounded) card edges
- Data visualization focus
- Confident, clear microcopy

**Example Interactions:**

> **Education moment:**
> Fin: "Your emergency fund just hit €2,000 — solid foundation! 💪 Ready for Level 2? Let me show you how €100/month in an index fund could grow over 10 years. Spoiler: it's more exciting than you think."

> **Market context:**
> Fin: "The S&P 500 dropped 2% today. Here's the thing: if you'd invested €1,000 five years ago and never looked at it, you'd still be up 47%. Markets go down. They also go back up. Let me show you the data."

---

### Companion Handoff Protocol

The companions seamlessly hand off based on context:

```
User: "I want to start investing but I'm not sure if I can afford it"

→ Goldie: [Analyzes budget] "Let me check your numbers... You have €150/month 
   free after essentials. Want to chat with Fin about what you could do with that?"

→ User: "Yeah, let's do it"

→ Fin: [Enters conversation] "Great to see you! Goldie tells me you've got €150 
   to work with. Here are 3 paths, from cautious to adventurous..."
```

---

## 6. Product Architecture

### Navigation Structure

```
┌──────────────────────────────────────┐
│ 🌟 PROSPERPALS                       │
├──────────────────────────────────────┤
│                                      │
│ 💬 COMPANIONS                        │
│   ├─ 🪙 Goldie (Daily Wellness)      │
│   └─ 📈 Fin (Wealth Building)        │
│                                      │
│ 📊 WORKSPACES                        │
│   ├─ 💰 Budget Central               │
│   ├─ 💳 Essential Bills              │
│   ├─ 🔄 Flexible Subscriptions       │
│   ├─ 🎯 Goals & Milestones           │
│   ├─ 📚 Learning Hub                 │
│   ├─ 🎮 Virtual Portfolio            │
│   └─ 👨‍👩‍👧 Family Space                 │
│                                      │
│ 📋 DASHBOARDS                        │
│   ├─ 📈 Net Worth                    │
│   ├─ 💳 Spending Insights            │
│   └─ 🏆 Prosperity Keys              │
│                                      │
│ 🔌 INTEGRATIONS                      │
│   ├─ 🏦 Banks (connected)            │
│   ├─ 📅 Calendar                     │
│   └─ + Add Integration               │
│                                      │
│ ⚙️ Settings                          │
└──────────────────────────────────────┘
```

### Layout: 60/40 Split

- **Chat Interface (60%):** Conversational thread with active companion
- **Live Preview (40%):** Real-time visualization (charts, forms, progress, dashboards)

The canvas view adapts based on conversation context — if Goldie is discussing subscriptions, the right panel shows the subscription breakdown. If Fin is explaining compound interest, the right panel shows the growth calculator.

---

## 7. Core Features & Workspaces

### 7.1 Budget Central 💰

**Lead Companion:** Goldie 🪙

| Feature | Description |
|---------|-------------|
| Transaction feed | AI-powered categorization with >95% accuracy target |
| Monthly overview | Visual progress bars per category |
| Smart splitting | "Was this groceries or household?" |
| Money countdown | "€342 left until payday" |
| Spending pulse | Contextual mini-dashboard showing daily trends |
| Quick corrections | 1-tap category fix (Goldie learns from corrections) |

**Key UX Principle:** No spreadsheet. Goldie narrates your spending story — "You've been eating out more this week, but your groceries are way down. Want to rebalance?"

---

### 7.2 Essential Bills 💳

**Lead Companion:** Goldie 🪙

Non-negotiable monthly expenses: rent, electricity, insurance, phone, transport.

| Feature | Description |
|---------|-------------|
| Bill list | Clean cards with name, amount, due date, auto-pay status |
| Calendar view | Visual timeline of when each bill hits |
| Payment predictions | "Your rent + electricity hit in 3 days — you're covered ✅" |
| Essentials ratio | Fin pops in: "Your essentials are 47% of income — healthy" |

---

### 7.3 Flexible Subscriptions 🔄

**Lead Companion:** Goldie 🪙

Optional recurring charges: Netflix, Spotify, gym, app subscriptions.

| Feature | Description |
|---------|-------------|
| Usage tracker | Green/amber/red indicators (used this week / this month / 30+ days ago) |
| Waste calculator | "3 unused subscriptions = 289 kr/month = a weekend trip 🏖️" |
| Cancel assist | Swipe-to-flag with cancel links and guidance |
| Reframe view | Shows subscription costs as alternative purchases |

---

### 7.4 Goals & Milestones 🎯

**Lead Companions:** Goldie (celebration) + Fin (projections)

| Feature | Description |
|---------|-------------|
| Goal wizard | Conversational setup: "What are you saving for?" |
| Auto-sweep | "You're €23 under budget — sweep to savings?" |
| Progress rings | Animated, satisfying progress visualization |
| Milestone celebrations | Goldie's micro-animations at 25%, 50%, 75%, 100% |
| Sharing | Share goals with accountability partners |
| Projection | Fin shows compound growth timeline |

**Goal Types:** Emergency fund, travel, big purchase, house deposit, education, retirement.

---

### 7.5 Learning Hub 📚

**Lead Companion:** Fin 📈

| Feature | Description |
|---------|-------------|
| Micro-lessons | 2-5 minute bite-sized modules |
| 5 Learning Paths | Budgeting Basics → Investing 101 → Advanced → Retirement → Tax |
| Interactive quizzes | Test knowledge with instant feedback |
| Calculators | Compound interest, emergency fund, retirement, loan payoff |
| Certificates | Completion badges and progress tracking |
| "Explain Like I'm 5" | Toggle for simpler explanations on any concept |

---

### 7.6 Virtual Portfolio 🎮

**Lead Companion:** Fin 📈

| Feature | Description |
|---------|-------------|
| Paper trading | €10,000 virtual money, real market data (15-min delay) |
| Portfolio builder | Create mock portfolios, test strategies |
| "What-if" scenarios | "If you'd invested €100/month since 2020..." |
| Leaderboards | Optional: compete with friends |
| Graduation | "Ready for real investing?" pathway |

---

### 7.7 Family Space 👨‍👩‍👧

**Lead Companions:** Goldie (kids mode) + Fin (adult discussions)

| Mode | Features |
|------|----------|
| **Couple** | Shared visibility, individual privacy for personal spending, joint goals |
| **Family** | Kid-friendly dashboards, teaching moments, allowance tracking |
| **Solo** | Full individual control (default) |

---

## 8. Gamification — The Prosperity Keys 🔑

*Inspired by Ready Player One — earning keys through real financial progress.*

### The Three Keys

| Key | Name | Requirements | Reward |
|-----|------|-------------|--------|
| 🔑 **Copper** | Foundation | Complete literacy basics, build €1,000 emergency fund, create working budget | Copper avatar frame, 1,000 ProsperCoins |
| 🔑 **Silver** | Growth | First profitable virtual investment, 3-month positive cash flow, help 5 community members | Silver avatar powers, 5,000 ProsperCoins |
| 🔑 **Gold** | Prosperity | Achieve personal freedom metric, mentor 10 users, create passive income stream | Gold transformation, 25,000 ProsperCoins |

### ProsperCoins

- Earned through positive financial behaviors
- **MVP:** Off-chain (PostgreSQL points system)
- **Phase 2:** On-chain (Coinbase Base L2, soulbound NFTs)
- Daily caps to prevent gaming
- Redeemable for: premium features, cosmetic upgrades, referral bonuses

### Achievement Badges

| Badge | Trigger |
|-------|---------|
| 🏅 First Budget | Created your first budget |
| 💯 Perfect Week | Stayed under budget for 7 days |
| 🔥 30-Day Streak | Logged in 30 consecutive days |
| 💰 Emergency Ready | Hit 3 months emergency fund |
| 📈 First Investment | Made first virtual trade |
| 👨‍👩‍👧 Family Finances | Added a family member |
| 💀 Subscription Slayer | Cancelled 3+ unused subscriptions |

### Challenges

- Weekly spending challenges ("No-spend Tuesday")
- Savings races (compete with friends)
- Learning module completions
- "Round-up" micro-saving challenges

---

## 9. UI/UX Design System

### Design Pillars

| Pillar | Principle | Why |
|--------|-----------|-----|
| **Trust Through Warmth** | Safety through personality, not corporate armor | Gen Z trusts apps that understand them, not ones that look like banks |
| **Outcome-First** | Show value before asking for data | Zero patience for setup — prove value in 3 seconds |
| **Companion Presence** | Goldie & Fin as real characters, not chatbot widgets | Relationships drive retention, not dashboards |
| **Calm Money** | Soft palettes, no guilt, never shame | Money is emotional — design must be supportive |

### Color System

| Element | Goldie's Domain | Fin's Domain | Shared |
|---------|----------------|--------------|--------|
| Primary | Warm Gold (#FFD93D) | Cool Teal (#0EA5E9) | Cream/Off-White (#FFF8F0) |
| Accent | Soft Coral (#FF6B6B) | Navy (#1E3A5F) | Sage Green (#10B981) |
| Background | Warm Cream | Cool Gray-Blue | Neutral Warm |
| Mood | Optimistic, celebratory | Analytical, confident | Calm, trustworthy |

### Typography

- **Primary:** Plus Jakarta Sans (rounded, friendly, modern)
- **Monospace:** JetBrains Mono (numbers, financial data)
- **Minimum:** 16px body, 14px secondary
- **Touch targets:** 44px minimum (WCAG)

### Motion & Animation

- Goldie: Bouncy spring animations, confetti on milestones, gentle shimmy on savings
- Fin: Clean slide transitions, smooth data reveals, confident chart animations
- Shared: Satisfying progress ring fills, soft haptic feedback, pulse on sync

### Component Library

- Rounded corners: 12-16px
- Soft shadows with warm tint
- Frosted glass overlays for modals
- Card-based layouts (Bento grid for dashboard)
- Thumb-friendly zones — primary actions in bottom 40% of screen
- Contextual color shifts based on financial health state

---

## 10. Technical Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15 + React 19 | Streaming AI responses, RSC, ISR |
| **UI Framework** | Tailwind CSS + Shadcn/UI | Clean, accessible, Slack-aesthetic |
| **AI SDK** | Vercel AI SDK 6.0 | ToolLoopAgent for multi-step reasoning |
| **AI Routing** | 3-tier model cascade | Cost optimization (see below) |
| **Database** | Supabase (PostgreSQL + pgvector) | Real-time sync, semantic search, Row Level Security |
| **Auth** | Supabase Auth | Email, Google, Apple SSO |
| **Open Banking** | TrueLayer / Tink (EU) | PSD2 compliance, bank connections |
| **Voice** | ElevenLabs | Goldie & Fin voice interactions |
| **Workflows** | n8n | External integrations, scheduled tasks |
| **Market Data** | Finnhub / Alpha Vantage | Real-time prices for Virtual Portfolio |
| **Hosting** | Vercel (Edge) + Supabase | EU data residency option |
| **Analytics** | PostHog | Privacy-friendly, self-hostable |

### AI Model Cascade (Cost Optimization)

| Tier | Model | Cost/M tokens | Use Case |
|------|-------|---------------|----------|
| **Fast** | Gemini 2.0 Flash | ~$0.10 | Transaction parsing, categorization, quick suggestions |
| **Standard** | Claude 3.5 Haiku | ~$0.80 | Goldie/Fin conversations, budget advice, lessons |
| **Complex** | Claude 3.5 Sonnet | ~$3.00 | Investment analysis, complex reasoning, edge cases |

**Projected costs:** ~€273/month at 1K users, ~€2,700/month at 10K users.

### Data Flywheel

Log ALL interactions from Day 1:
- User prompts
- Model selected
- Model responses
- User feedback (accepted/edited/retried)
- Task type and context

This becomes the golden dataset for future fine-tuning of Goldie & Fin personality models.

---

## 11. Integrations & Open Banking

### Bank Connections (MCP-Based)

| Provider | Geography | Pricing | Notes |
|----------|-----------|---------|-------|
| **TrueLayer** | EU/UK | Talk to sales | Recommended for EU launch |
| **Tink (Visa)** | Europe | Enterprise | Strong Nordic support |
| **Plaid** | US/Canada | Pay-as-you-go | For US expansion |
| **Yapily** | EU/UK | Developer-friendly | Alternative option |

**Launch strategy:** TrueLayer or Tink for EU → Add Plaid for US expansion.

### Other Integrations

| Integration | Purpose | Priority |
|-------------|---------|----------|
| Google Calendar | Bill reminders, payday awareness, spending-free challenges | MVP |
| Email (read-only) | Receipt parsing, subscription detection | Phase 2 |
| Apple Health | Correlate spending with wellness (opt-in) | Phase 3 |
| Investment Brokers | Real portfolio sync | Phase 3 (requires licensing) |
| Slack/Discord | Goal celebration notifications | Phase 2 |

### Aggregator Licensing

- **EU:** AIS license under PSD2 — or use a licensed aggregator (TrueLayer/Tink) to avoid direct licensing initially
- **PSD3/PSR (2026-2028):** Expanded data sharing, stronger SCA, granular consent UI requirements
- Design for PSD3 from Day 1 — biometrics, passkeys, account-by-account permissions

---

## 12. Privacy, Security & Compliance

### Core Privacy Principles

1. **Minimal data collection** — Only what's necessary
2. **EU data residency** — All data stored in EU
3. **Zero data sales** — Never, period
4. **Local-first processing** — Categorization on-device where possible
5. **Transparent AI** — Users understand why recommendations are made
6. **User control** — "Delete all my data instantly" button prominently displayed

### Security Architecture

| Measure | Implementation |
|---------|---------------|
| Encryption at rest | AES-256 for all financial data |
| Encryption in transit | TLS 1.3 |
| Authentication | Biometric + password, MFA required |
| Token management | Short-lived access tokens, HSM-backed key rotation |
| API security | OAuth2/OIDC, rate limiting, WAF |
| Zero trust | Private subnets, security groups, microservice isolation |
| Mobile security | Certificate pinning, jailbreak detection, secure Keychain/Keystore |

### Certifications Target

| Certification | Timeline | Purpose |
|---------------|----------|---------|
| SOC 2 Type II | Q4 2026 | Enterprise trust signal |
| ISO 27001 | 2027 | Information security management |
| PCI-DSS (if needed) | Phase 3 | Only if handling card data directly |

### Regulatory Compliance

#### EU AI Act (August 2, 2026 — CRITICAL)

AI systems affecting financial decisions = **high-risk classification**. Requirements:

- ✅ Risk management system for AI models
- ✅ High-quality, bias-mitigated training data
- ✅ Technical documentation for regulators
- ✅ Transparency & explainability — users must understand AI reasoning
- ✅ Mandatory human oversight — staff can override/stop the system
- ✅ Ongoing performance monitoring for drift and bias
- ✅ Conformity assessment before market placement

**Design implication:** Every Goldie/Fin recommendation needs a "Why this suggestion?" explainability card built into the UI.

#### Financial Advice Boundary (CRITICAL)

⚠️ **ProsperPals provides FINANCIAL WELLNESS, not FINANCIAL ADVICE.**

Goldie & Fin must NEVER:
- Recommend specific stocks, funds, or financial products
- Provide personalized investment advice
- Make suitability assessments
- Guarantee financial outcomes

Always include: "This is educational information, not financial advice."

Fin's investment features are **educational and simulated** until proper licensing is obtained.

#### GDPR

- Lawful basis for processing: Consent (explicit) + Contract (service delivery)
- Data minimization and purpose limitation
- Right to access, rectify, erase, port data
- Data Protection Impact Assessment (DPIA) required
- DPO appointment when scaling

---

## 13. Business Model & Pricing

### Freemium + Premium

| Tier | Price | Key Features |
|------|-------|-------------|
| **Free** | €0 | Goldie access, basic budgeting, 3 bank accounts, spending insights, 500 ProsperCoins/day cap |
| **Plus** | €5.99/mo | Full Goldie + Fin, unlimited accounts, advanced analytics, goals, 2x coins, Learning Hub |
| **Pro** | €12.99/mo | Voice companions, real-time data, Virtual Portfolio, Family Space, AI coach, API access |

### Why Free Tier Matters

Competitors charge €10-15/month for basics. Reddit sentiment: 60% recommend spreadsheets over paid apps. A generous free tier that actually works is our #1 growth lever and biggest trust signal.

### Revenue Projections

| Year | Users | Paying Users | Conversion | ARR |
|------|-------|-------------|------------|-----|
| 2026 | 10,000 | 500 | 5% | €36K |
| 2027 | 100,000 | 8,000 | 8% | €576K |
| 2028 | 500,000 | 50,000 | 10% | €4.5M |
| 2029 | 2,000,000 | 240,000 | 12% | €22M |

### Additional Revenue Streams

| Stream | Percentage | Notes |
|--------|-----------|-------|
| Subscriptions | 85% | Core revenue |
| Affiliate/referrals | 10% | Banking products, investment platforms |
| Data insights (anonymized) | 3% | Aggregate spending trends (opt-in only) |
| Enterprise/B2B | 2% | Financial wellness programs for companies |

---

## 14. Competitive Landscape

### Direct Competitors

| App | Price | Strength | Weakness | Our Edge |
|-----|-------|----------|----------|----------|
| **YNAB** | $14.99/mo | Proven method, loyal users | Steep learning curve, no AI, feels like homework | AI companions make budgeting accessible and fun |
| **Monarch** | $14.99/mo | Beautiful UI, couples support | No AI personality, premium only | Freemium + Goldie & Fin personalities |
| **Cleo** | $0-14.99/mo | 8M+ users, strong brand, sassy AI | US-only, mobile-only, entertainment > education | EU market, web+mobile, education-first, dual companions |
| **Copilot** | ~$10/mo | Clean design, good categorization | Apple-only, no gamification, US-only | Cross-platform, gamification, EU market |

### Cleo Competitive Alert 🚨

Cleo launched **Autopilot** (Feb 2026) — moving from chatbot to autonomous financial agent with multi-agent architecture. **Response:** Differentiate on education, EU market, and dual-companion personality system. Cleo entertains; ProsperPals empowers.

Cleo launched **3.0** (Feb 2026) — agentic reasoning + memory + voice. Still mobile-only, still US-focused.

### Our Competitive Moat

1. **Dual-companion system** — Unique, memorable, drives emotional connection
2. **EU-first** — PSD2 native, GDPR native, no US baggage
3. **Education-first gamification** — Teaches real skills, not just dopamine
4. **Free tier that works** — Breaks the paywall resentment cycle
5. **Personality > Dashboard** — Chat-first, not spreadsheet-first

### Market Size

| Metric | Value |
|--------|-------|
| EU Personal Finance App Market | €2.5B (2025) → €6B (2029) |
| Gen Z Population (EU) | 65 million |
| Target SAM | €500M (young adults seeking AI financial guidance) |
| Clinical trials software (SponCite) | $14.31B (2026) → $34.15B (2035) |

---

## 15. Go-to-Market Strategy

### Phase 1: Pre-Launch (Waitlist)

**Channel:** TikTok-first

- 46% of Gen Z prefer TikTok over Google for product discovery
- Content pillars:
  1. Relatable money moments ("POV: checking your account after the weekend")
  2. Goldie & Fin character reveals
  3. Education as entertainment ("50/30/20 explained with your Starbucks receipt")
  4. UGC challenges ("Roast Your Spending")
- Posting cadence: 2-4/day during launch month → 1-2/day after

**Waitlist Mechanics:**
- Position-based rewards (refer friends → move up)
- Tiers: Gold (top 100), Silver (top 1,000)
- First 1,000 to Copper Key = lifetime premium
- Weekly email drip with budgeting tips to keep list warm

### Phase 2: Beta Launch (Denmark)

- 500 beta users in Copenhagen
- Reddit community building (r/personalfinance, r/denmark)
- Product Hunt launch
- Micro-influencer partnerships (10K-250K followers in #MoneyTok)

### Phase 3: Public Launch

- App Store / Play Store (PWA first, native later)
- BetaList + Hacker News
- Partner with Danish financial institutions for trust signals
- EBAN Congress 2026 (Copenhagen) — angel investor networking

### Content Strategy

| Format | Platform | Frequency |
|--------|----------|-----------|
| Short-form video | TikTok, Instagram Reels | 1-2/day |
| Carousel/thread | Instagram, Twitter/X | 3/week |
| Community post | Reddit | 2/week |
| Blog/newsletter | Website | 1/week |
| AI video content | YouTube Shorts | 2/week |

**Campaign slogans:**
- Pre-launch: "The Keys Exist"
- Launch: "Unlock Your Prosperity"
- Growth: "Your Key to Prosperity"

---

## 16. Roadmap & Milestones

### Phase 1: Foundation (Q1-Q2 2026)

| Week | Milestone | Owner |
|------|-----------|-------|
| 1-2 | Auth + onboarding flow, sidebar scaffold | Dev |
| 1-2 | Goldie companion (basic chat) | Dev + AI |
| 3 | Budget Central (mock data), AI categorization | Dev |
| 4 | Fin companion (basic), Learning Hub (3 modules) | Dev + AI |
| 5-6 | Bank connection (TrueLayer/Tink) | Dev |
| 7-8 | Goals & Milestones, Essential Bills vs Flexible Subscriptions | Dev + Design |

**Key milestone:** Working MVP with Goldie chat + budgeting dashboard by April 30.

### Phase 2: Beta (Q2-Q3 2026)

| Target | Milestone |
|--------|-----------|
| May 31 | 500 beta users in Denmark |
| Jun 30 | Virtual Portfolio launched |
| Jul 31 | Family Space (Couple Mode) |
| Aug 31 | Public launch — 5,000 users, 250 paid |

### Phase 3: Scale (Q3-Q4 2026)

| Target | Milestone |
|--------|-----------|
| Sep 30 | Prosperity Keys gamification live |
| Oct 31 | PWA → Native mobile apps (React Native) |
| Nov 30 | Expand to Sweden, Norway |
| Dec 31 | Fin's full investment education suite |

### Phase 4: Growth (2027)

- 100K users target
- Real investment features (requires regulatory licensing)
- ProsperCoins on-chain (Base L2, soulbound NFTs)
- Enterprise wellness program (B2B)
- Additional EU markets (Germany, Netherlands, France)

---

## 17. Success Metrics

### Product Metrics

| Metric | Target (6 months) | Why |
|--------|-------------------|-----|
| MAU | 5,000 | Engagement proof |
| DAU/MAU Ratio | >30% | Stickiness |
| 7-day retention | >60% | Initial hook works |
| 30-day retention | >35% | Habit formation |
| Free-to-Paid Conversion | >5% | Revenue viability |
| User NPS | >50 | Product satisfaction |
| Avg. Sessions/Week | >4 | Daily habit forming |
| Goldie Messages/User/Week | >10 | Companion engagement |
| Learning Module Completion | >70% | Content quality |
| Transaction Categorization Accuracy | >95% | Core competence |

### Business Metrics

| Metric | Target (Year 1) |
|--------|-----------------|
| Registered Users | 10,000 |
| Paying Subscribers | 500 |
| ARR | €36K |
| CAC | <€15 |
| LTV | >€100 |
| Monthly Burn | <€5,000 |

---

## 18. Risks & Mitigations

| Risk | Severity | Likelihood | Mitigation |
|------|----------|-----------|------------|
| Cleo expands to EU aggressively | HIGH | MEDIUM | Move fast, establish brand in Nordics first, lean on education differentiator |
| EU AI Act compliance costs | HIGH | HIGH | Build explainability from Day 1, budget €85-160K for AI GRC automation tools |
| Bank sync reliability issues | HIGH | HIGH | Multi-provider strategy, graceful error states (Goldie explains), manual import fallback |
| Regulatory classification as financial advisor | HIGH | LOW | Strict guardrails on AI outputs, clear disclaimers, legal review of all Fin content |
| Low free-to-paid conversion | MEDIUM | MEDIUM | Ensure free tier is genuinely valuable, premium features feel worth it (not hostage-taking) |
| User trust with bank credentials | MEDIUM | MEDIUM | Transparency page, user controls, "Delete all data" button, SOC 2 certification |
| Competitor copies dual-companion model | MEDIUM | LOW | First-mover advantage, deep personality design, data flywheel improves over time |
| Economic downturn reduces fintech spending | LOW | MEDIUM | Free tier ensures accessibility regardless of economy |

---

## 19. Appendix

### A. Tech Reference: MCP Integration

```javascript
// Example: Google Calendar MCP Server
const calendarMCP = {
  primitives: {
    resources: ["calendar/events", "calendar/reminders"],
    tools: [
      { name: "create_reminder", params: ["title", "date", "amount"] },
      { name: "get_upcoming_bills", params: ["days_ahead"] }
    ],
    prompts: [
      "Add a reminder for [bill] on [date]",
      "When's my next payday?"
    ]
  }
}
```

### B. Companion Routing Logic

```javascript
function routeToCompanion(userIntent) {
  const finTopics = ["invest", "portfolio", "stocks", "compound", 
                     "net worth", "retirement", "market", "index fund"];
  const goldieTopics = ["budget", "spend", "save", "bill", "subscription", 
                        "goal", "groceries", "rent", "salary"];
  
  if (finTopics.some(t => userIntent.includes(t))) return "fin";
  if (goldieTopics.some(t => userIntent.includes(t))) return "goldie";
  return "goldie"; // Default to daily wellness
}
```

### C. Key Dates

| Date | Event | Relevance |
|------|-------|-----------|
| Aug 2, 2026 | EU AI Act full application | Goldie & Fin must be compliant |
| 2026-2028 | PSD3/PSR transition | Banking API changes |
| May 2026 | HIPAA encryption mandate (US) | If US expansion planned |
| Rolling | Antler Nordic residency | Funding opportunity |
| Mar 26, 2026 | Beyond Beta Batch #14 decision | Accelerator result |

### D. Research Sources

- Reddit sentiment analysis (r/personalfinance, r/budgeting, r/YNAB)
- Competitor app reviews (App Store, Play Store)
- KPMG Fintech Report 2025
- Deloitte Gen Z Financial Wellness Survey 2025
- EU AI Act documentation
- PSD2/PSD3 regulatory frameworks
- CopenDapp internal research (daily reports Feb-Mar 2026)

---

*Document prepared by Viko ⚡ for CopenDapp Labs*
*Version 2.0 — March 7, 2026*
*Based on: PRD v1.0, Executive Summary, Deep Dive Research, Daily Research Reports (Feb 5 – Mar 7, 2026)*

---

**Next Steps:**
1. Nikolas: Review design system section, validate color palette and component decisions
2. Vadim: Review business model, approve feature prioritization for MVP
3. Team: Lock MVP scope (what's in, what's deferred)
4. Begin BMAD v6.0 architecture planning sprint
