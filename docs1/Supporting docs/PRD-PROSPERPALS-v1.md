# ProsperPals Product Requirements Document (PRD)
> Version 1.0 | February 2026
> Authors: Vadim + Viko
> Status: FOUNDATION DOCUMENT

---

## 🎯 Executive Summary

**ProsperPals** is an AI-powered financial companion platform built on the **Agentic OS architecture** pioneered for SponCite. It combines Slack's real-time communication model with Notion's modular workspaces to create a unified financial wellness experience.

**Core Innovation:** Two AI companions with distinct personalities — **Goldie** 🪙 (daily financial wellness) and **Fin** 📈 (wealth building mentor) — working together in a Slack-like environment with integrated workspaces, dashboards, and external service connections.

---

## 📐 Architecture Overview

### Inherited from SponCite

| Pattern | SponCite | ProsperPals |
|---------|----------|-------------|
| **Core Model** | Agentic OS | Agentic OS |
| **UI Paradigm** | Slack + Notion hybrid | Slack + Notion hybrid |
| **Integration Layer** | MCP (Model Context Protocol) | MCP |
| **AI Framework** | Vercel AI SDK + ToolLoopAgent | Vercel AI SDK + ToolLoopAgent |

### ProsperPals-Specific Additions

- **Dual-Agent System**: Goldie + Fin (vs. single-agent per domain in SponCite)
- **Family Workspaces**: Multi-user with role-based views
- **Privacy-First**: GDPR-native, minimal data collection, local-first where possible
- **Gamification Layer**: Achievements, streaks, challenges integrated into UI

---

## 🏗️ Technical Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15 + React 19 | Streaming AI responses, RSC |
| **UI Framework** | Tailwind CSS + Shadcn/UI | Clean, accessible, Slack-aesthetic |
| **AI SDK** | Vercel AI SDK 6.0 | ToolLoopAgent for multi-step reasoning |
| **LLM Routing** | LiteLLM | Unified API, GDPR compliance, PII masking |
| **Database** | Supabase + pgvector | Real-time sync, semantic search for advice |
| **Open Banking** | Plaid (US) / Tink (EU) / Nordic API Gateway | PSD2 compliance, bank connections |
| **Workflows** | n8n / Zapier | External integrations |
| **Hosting** | Vercel + Supabase | Edge-optimized, EU data residency option |

---

## 🤖 AI Companions

### Goldie 🪙 — Daily Financial Wellness

**Personality:**
- Warm, encouraging, emoji-friendly
- Celebrates small wins
- Never judgmental about spending
- Focuses on awareness and gentle habit building

**Domains:**
- Daily spending awareness
- Budget tracking and nudges
- Bill reminders
- Saving goal progress
- Subscription management
- Smart categorization

**Example Interaction:**
> Goldie: "Hey! ☀️ You've spent €127 this week — that's €23 under your target! Want to sweep that into your summer trip fund? 🏖️"

---

### Fin 📈 — Wealth Building Mentor

**Personality:**
- Analytical but approachable
- Teacher mindset — explains the "why"
- Builds confidence through education
- Focused on long-term thinking

**Domains:**
- Investment education
- Portfolio simulation (virtual investing)
- Compound growth visualization
- Emergency fund planning
- Net worth tracking
- Financial literacy modules

**Example Interaction:**
> Fin: "Your emergency fund just hit €2,000 — solid foundation! 💪 Ready for Level 2? Let me show you how a €100/month index fund contribution could grow over 10 years. Spoiler: it's more exciting than you'd think."

---

### Companion Handoff Protocol

The companions seamlessly hand off based on context:

```
User: "I want to start investing but I'm not sure if I can afford it"
→ Goldie: [Analyzes budget] "Let me check your numbers... You have €150/month free after essentials. Want to chat with Fin about what you could do with that?"
→ User: "Yeah, let's do it"
→ Fin: [Enters conversation] "Great to see you! Goldie tells me you've got €150 to work with. Here are 3 paths, from cautious to adventurous..."
```

---

## 📱 UI Architecture

### Navigation Sidebar (Persistent — Left)

```
┌─────────────────────────────────┐
│ 🌟 PROSPERPALS                  │
├─────────────────────────────────┤
│                                 │
│ 🤖 COMPANIONS                   │
│   ├─ 🪙 Goldie (Daily)          │
│   └─ 📈 Fin (Wealth)            │
│                                 │
│ 📊 WORKSPACES                   │
│   ├─ 💰 Budget Central          │
│   ├─ 📚 Learning Hub            │
│   ├─ 🎮 Virtual Portfolio       │
│   ├─ 🎯 Goals & Milestones      │
│   └─ 👨‍👩‍👧 Family Space            │
│                                 │
│ 📋 DASHBOARDS                   │
│   ├─ 📈 Net Worth               │
│   ├─ 💳 Spending Insights       │
│   └─ 🔄 Subscriptions           │
│                                 │
│ 🔌 INTEGRATIONS                 │
│   ├─ 🏦 Banks (3 connected)     │
│   ├─ 📅 Google Calendar         │
│   └─ + Add Integration          │
│                                 │
│ ⚙️ Settings                     │
└─────────────────────────────────┘
```

### Workspace Canvas (Dynamic — 60/40 Split)

- **Chat Interface (60%)**: Conversational thread with active companion
- **Live Preview (40%)**: Real-time visualization (charts, forms, progress)

---

## 🗂️ Workspaces

### 1. Budget Central 💰

**Purpose:** Daily spending management and awareness

**Features:**
- Transaction feed with AI-powered categorization
- Monthly budget overview with visual progress bars
- Superstore transaction splitting ("Was this groceries or household?")
- Bill calendar with payment predictions
- "Money left until payday" countdown

**Companion Lead:** Goldie 🪙

**Dashboard Widgets:**
- Spending by category (donut chart)
- Daily spend trend (sparkline)
- Upcoming bills (list)
- Savings rate (percentage)

---

### 2. Learning Hub 📚

**Purpose:** Financial literacy through bite-sized lessons

**Features:**
- Micro-lessons (2-5 min modules)
- Topic tracks: Budgeting Basics → Investing 101 → Advanced Strategies
- Interactive quizzes
- Progress badges and streaks
- "Explain like I'm 5" mode for any concept

**Companion Lead:** Fin 📈

**Module Examples:**
- "What is compound interest?" (with interactive calculator)
- "Index funds vs. individual stocks" (decision tree)
- "Emergency fund: How much is enough?" (personalized calculator)
- "Credit scores explained" (myth-buster format)

---

### 3. Virtual Portfolio 🎮

**Purpose:** Learn investing with zero risk

**Features:**
- Paper trading with real market data
- Start with €10,000 virtual money
- Build and track mock portfolios
- See what "would have happened" scenarios
- Compete with friends (optional leaderboards)
- Graduate to real investing when ready

**Companion Lead:** Fin 📈

**Dashboard Widgets:**
- Portfolio performance chart
- Holdings breakdown
- Trade history
- "If this were real" profit/loss

---

### 4. Goals & Milestones 🎯

**Purpose:** Visual progress toward financial goals

**Features:**
- Goal creation wizard ("What are you saving for?")
- Automatic sweep suggestions
- Milestone celebrations (confetti!)
- Goal sharing with accountability partners
- Compound growth projections

**Companion Lead:** Goldie 🪙 (celebration) + Fin 📈 (projections)

**Goal Types:**
- Emergency fund (3-6 months)
- Travel fund
- Big purchase (car, electronics)
- House down payment
- Retirement (long-term)

---

### 5. Family Space 👨‍👩‍👧

**Purpose:** Shared financial management for households

**Features:**
- Multiple profiles (partners, kids)
- Role-based views (Admin vs. Member)
- Shared goals and individual goals
- Age-appropriate modes for children
- "Money talks" conversation starters
- Allowance tracking (for kids)

**Companion Lead:** Both (Goldie for kids, Fin for adult discussions)

**Modes:**
- **Couple Mode**: Shared visibility, individual privacy for personal spending
- **Family Mode**: Kid-friendly dashboards, teaching moments
- **Solo Mode**: Full individual control

---

## 📋 Dashboards

### Net Worth Dashboard 📈
- Assets vs. Liabilities visualization
- Trend over time (monthly/yearly)
- Account breakdown
- Net worth milestones

### Spending Insights Dashboard 💳
- Category breakdown with trends
- Merchant analysis ("You spend €89/mo at Starbucks")
- Anomaly detection ("Unusual charge?")
- Comparative benchmarks ("Similar users spend X")

### Subscriptions Dashboard 🔄
- All recurring charges detected
- Annual cost visualization
- Cancel with one click (where supported)
- "Forgotten" subscription alerts

---

## 🔌 Integrations (MCP-Based)

### Bank Connections 🏦
- **Protocol**: PSD2 / Open Banking
- **Providers**: Tink (EU), Plaid (US), Nordic API Gateway (DK/SE/NO)
- **Features**: Real-time transaction sync, balance alerts, account linking

### Google Calendar 📅
- Import bill due dates
- Payday awareness
- Goal milestone reminders
- Spending-free day challenges

### Other Connectors
| Integration | Purpose |
|-------------|---------|
| **Apple Health** | Correlate spending with wellness (optional) |
| **Spotify/Netflix** | Subscription detection |
| **Email (read-only)** | Receipt parsing, subscription detection |
| **Investment Brokers** | Real portfolio sync (when ready) |
| **Slack/Discord** | Goal celebration notifications |

---

## 🎮 Gamification System

### Achievement Badges
- 🏅 **First Budget**: Created your first budget
- 💯 **Perfect Week**: Stayed under budget for 7 days
- 🔥 **30-Day Streak**: Logged in 30 days straight
- 💰 **Emergency Ready**: Hit 3 months emergency fund
- 📈 **First Investment**: Made first (virtual) trade
- 👨‍👩‍👧 **Family Finances**: Added a family member

### Challenges
- Weekly spending challenges
- "No-spend day" tracking
- Savings races (compete with friends)
- Learning module completions

### Rewards
- Unlock premium features
- Cosmetic upgrades (companion outfits, themes)
- Referral bonuses

---

## 🔐 Privacy & Security

### Core Principles
1. **Minimal Data**: Only collect what's necessary
2. **EU Data Residency**: All data stored in EU
3. **No Third-Party Sharing**: Zero data sales
4. **Local-First Processing**: Categorization on-device where possible
5. **Transparent AI**: Explain why recommendations are made

### Technical Measures
- End-to-end encryption for sensitive data
- Bank-grade security (SOC 2 Type II target)
- Biometric authentication
- Session management and device trust

---

## 🗺️ MVP Scope (4-Week Sprint)

### Week 1-2: Foundation
- [ ] Auth + onboarding flow
- [ ] Sidebar navigation scaffold
- [ ] Goldie companion (basic chat)
- [ ] Budget Central workspace (mock data)

### Week 3: Core Features
- [ ] Transaction import (manual + CSV)
- [ ] AI categorization
- [ ] Spending dashboard
- [ ] Goal creation

### Week 4: Polish + Fin
- [ ] Fin companion (basic chat)
- [ ] Learning Hub (3 modules)
- [ ] Virtual Portfolio (mock trading)
- [ ] Family Space (invite flow)

### Post-MVP
- [ ] Bank connection (Tink integration)
- [ ] Google Calendar sync
- [ ] Full gamification
- [ ] Mobile apps (React Native)

---

## 📊 Success Metrics

| Metric | Target | Why |
|--------|--------|-----|
| **DAU/MAU** | >40% | Engagement health |
| **7-day retention** | >60% | Initial stickiness |
| **30-day retention** | >35% | Habit formation |
| **Premium conversion** | >10% | Revenue |
| **NPS** | >50 | User satisfaction |
| **Learning completion** | >70% per module | Content quality |

---

## 🎨 Design Principles

1. **Calm, Not Judgmental**: Soft gradients, neutral palettes, encouraging language
2. **Progressive Complexity**: Simple by default, power features discoverable
3. **Personality Through Design**: Goldie = warm tones, Fin = cool tones
4. **Mobile-First, Desktop-Beautiful**: Works everywhere, shines on big screens
5. **Accessibility**: WCAG 2.1 AA compliance

---

## 📎 Appendix: Tech Reference

### MCP Integration Example

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

### Companion Routing Logic

```javascript
// Simplified routing between Goldie and Fin
function routeToCompanion(userIntent) {
  const finTopics = ["invest", "portfolio", "stocks", "compound", "net worth", "retirement"];
  const goldieTopics = ["budget", "spend", "save", "bill", "subscription", "goal"];
  
  if (finTopics.some(t => userIntent.includes(t))) return "fin";
  if (goldieTopics.some(t => userIntent.includes(t))) return "goldie";
  return "goldie"; // Default to daily wellness
}
```

---

*Document created: February 10, 2026*
*Last updated: February 10, 2026*
