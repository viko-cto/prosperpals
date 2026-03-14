# Slack & Notion Platform Architecture Deep Dive
## Learnings for SponCite's UX Architecture
**Date:** February 9, 2026

---

## Executive Summary

Vadim's vision: **Slack-style navigation + Notion-style dashboards + AI agents in the sidebar** is exactly where the industry is heading. Both Slack and Notion have made this the core of their 2025-2026 strategy. This report breaks down how they built it and what SponCite can learn.

**Key Insight:** The future of productivity apps is **"Agentic Work OS"** — platforms where AI agents are first-class citizens alongside humans, working in shared context.

---

## Part 1: Slack's Architecture

### 1.1 Technical Foundation

| Layer | Technology | Purpose |
|-------|------------|---------|
| Language | PHP → Hack (HHVM) | 2x faster execution, static typing |
| Architecture | Monolith → Modular | Independent scaling, faster deploys |
| Database | MySQL sharded by workspace | Horizontal scaling |
| Message Queue | Redis → Kafka | High-throughput message processing |
| Real-time | WebSocket (MessageStore) | Instant updates across clients |
| Desktop | Electron | Cross-platform native feel |
| Mobile | Swift (iOS), Jetpack MVVM (Android) | Modern, maintainable codebases |

### 1.2 The "Unified Grid" Revolution (2024)

**What changed:** Slack rebuilt their entire architecture to move from workspace-centric to org-wide views.

**Before:** Users switched between workspaces manually. Data was siloed.

**After:** Single unified view across all workspaces. DMs tab, Activity tab, cross-workspace channels.

**Why this matters for SponCite:**
> "If data is shared between multiple workspaces on the same Grid, and users need to switch between those workspaces to do their jobs, why not provide a single, unified view of all the data a user can access?"

**SponCite Application:** Sponsors, Sites, and Subjects should all exist in a unified view. Don't make users switch between "Sponsor Portal" and "Site Portal" — give them one intelligent view that adapts to their role.

### 1.3 Slack as "Agentic Work OS"

**Slack's Dec 2025 announcement:** They're positioning as the platform where humans and AI agents work together.

**Key features:**
- **@Claude in Slack** — Tag AI agents directly in channels
- **Shared context** — Agents see the same messages humans see
- **Multiplayer AI** — Multiple people interact with agents in shared threads
- **Agent ecosystem** — OpenAI, Google, Perplexity, Notion, Cursor, Cognition all building agents for Slack

**Architecture insight:**
> "Deploying agents in Slack instantly makes them accessible to millions of daily users, embedding AI directly in the flow of work so people can interact with agents just as fluidly as they do with their human colleagues."

**SponCite Application:** Your 5 AI agents should live in the sidebar like Slack apps. Users @mention them in context. Agents can read conversation history for context.

---

## Part 2: Notion's Architecture

### 2.1 The Block Model (Foundational)

**Everything in Notion is a block.** This is the key architectural decision that enables all flexibility.

| Block Attribute | Purpose |
|----------------|---------|
| ID | Unique UUID for every block |
| Type | How block renders (page, paragraph, to-do, database row, etc.) |
| Properties | Data specific to block type (title, checked status, etc.) |
| Content | Array of child block IDs (enables nesting) |
| Parent | ID of parent block (for permissions) |

**Key insight:**
> "Text, images, lists, a row in a database, even pages themselves—these are all blocks, dynamic units of information that can be transformed into other block types or moved freely."

**Why this matters:**
- Same content can appear in multiple pages (references, not copies)
- Any block can contain any other block
- "Turn into" transforms block type without losing data
- Real-time sync is granular (per-block, not per-document)

**SponCite Application:** Think of clinical trial data as blocks:
- A "Site" is a block containing location, capacity, therapeutic areas
- A "Trial" is a block containing protocol, phases, endpoints
- A "Match" is a block connecting Site ↔ Trial with compatibility score
- Users can view the same data as cards, tables, Kanban boards, etc.

### 2.2 Database Architecture

**Notion's backend:**
- PostgreSQL on Amazon RDS
- 96 database servers (as of 2023)
- Sharded by workspace ID
- Node.js API servers with PgBouncer connection pooling

**The 200 Billion Blocks Problem:**
Notion stores 200B+ entities. They built a data lakehouse for analytics because the block model makes some queries expensive.

**SponCite Application:** Start simple (single Postgres), but design with sharding in mind. Consider:
- Shard by Sponsor ID for multi-tenant isolation
- Block-based schema for flexibility
- Separate analytics layer for reporting

### 2.3 Notion 3.0: Agents (Sept 2025)

**The big shift:** "Anything you can do in Notion, your Agent can do for you."

**Architecture:**
- Central reasoning model (GPT-5) coordinates modular sub-agents
- Sub-agents can: search Notion/Slack/web, edit databases, synthesize responses
- Tasks can run for 20+ minutes autonomously
- Agent has "memory" via Notion pages/databases

**Key features:**
1. **Personal Agent** — Understands your work, remembers context
2. **Custom Agents** — Specialized AI teammates (feedback wrangler, IT handler, etc.)
3. **Instructions Page** — Customize agent behavior with natural language
4. **MCP Integrations** — Lovable, Perplexity, Mistral, HubSpot, etc.
5. **Connectors** — Pulls context from Slack, Google Drive, GitHub

**Quote from Notion:**
> "We didn't want to retrofit the system. We needed an architecture that actually supports how reasoning models work."

**SponCite Application:** Your 5 agents should be Custom Agents that:
- Run autonomously on triggers (new trial posted → matching agent activates)
- Have instruction pages sponsors can customize
- Write results back to databases (not just chat responses)
- Can run for minutes doing complex analysis

---

## Part 3: The Hybrid Model for SponCite

### 3.1 Proposed Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     SPONCITE UNIFIED VIEW                        │
├─────────────┬───────────────────────────────────────────────────┤
│   SIDEBAR   │              MAIN WORKSPACE                        │
│             │                                                     │
│  ─────────  │  ┌─────────────────────────────────────────────┐  │
│  📊 Home    │  │  Trial Planner (Notion-style database)       │  │
│  💬 Chat    │  │  ┌────┬────┬────┬────┬────┐                  │  │
│  📋 Trials  │  │  │Site│Dist│Cap │Exp │Fit │ ← Columns        │  │
│  🏥 Sites   │  │  ├────┼────┼────┼────┼────┤                  │  │
│  👥 Team    │  │  │ A  │50mi│ 45 │ ✓  │92% │                  │  │
│             │  │  │ B  │120 │ 30 │ ✓  │87% │                  │  │
│  ─────────  │  │  └────┴────┴────┴────┴────┘                  │  │
│  🤖 AGENTS  │  │                                               │  │
│  ─────────  │  │  [Add view: Table | Board | Map | Timeline]  │  │
│  🔍 Scout   │  └─────────────────────────────────────────────┘  │
│  🎯 Matcher │                                                     │
│  📈 Analyst │  ┌─────────────────────────────────────────────┐  │
│  💬 Advisor │  │  Activity Feed (Slack-style)                 │  │
│  📝 Scribe  │  │  @Scout found 3 new sites matching Protocol  │  │
│             │  │  @Matcher updated compatibility scores        │  │
└─────────────┴──└─────────────────────────────────────────────┘──┘
```

### 3.2 Key UX Patterns to Adopt

#### From Slack:
1. **Channels/Threads Model** — Conversations organized by topic (per trial, per site)
2. **@mention Agents** — `@Scout find sites in California with oncology experience`
3. **Unified Inbox** — All activity across trials in one feed
4. **Integrations in Sidebar** — Apps/agents always accessible
5. **Real-time Presence** — See who's online, who's typing

#### From Notion:
1. **Block-based Content** — Everything is a composable unit
2. **Multiple Views** — Same data as Table, Board, Calendar, Map
3. **Databases with Relations** — Sites linked to Trials linked to Sponsors
4. **Templates** — Pre-built trial setups, site profiles
5. **Agent Instructions** — Customize how AI behaves per user/org

### 3.3 Technical Recommendations

| Component | Recommendation | Why |
|-----------|---------------|-----|
| Frontend | Next.js + React | Server components, fast, modern |
| Real-time | WebSockets (Socket.io or native) | Instant updates like Slack |
| Database | PostgreSQL + Supabase | Blocks model, real-time subscriptions |
| AI Agents | LangGraph or AutoGen | Multi-step autonomous workflows |
| Block Editor | Tiptap or BlockNote | Notion-like editing experience |
| Auth | Clerk or Auth.js | Multi-tenant with role-based access |

### 3.4 The Agent Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    SPONCITE AGENT ORCHESTRATOR                │
│                     (Central Reasoning Model)                  │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│   │ 🔍Scout │  │🎯Matcher│  │📈Analyst│  │💬Advisor│        │
│   │         │  │         │  │         │  │         │        │
│   │ Search  │  │ Compare │  │ Analyze │  │ Advise  │        │
│   │ CTG DB  │  │ Sites   │  │ Data    │  │ Users   │        │
│   └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│        │            │            │            │              │
│        └────────────┴────────────┴────────────┘              │
│                          │                                    │
│                    ┌─────┴─────┐                              │
│                    │   📝Scribe │                             │
│                    │  Document  │                             │
│                    │ Everything │                             │
│                    └───────────┘                              │
│                                                                │
│   SHARED CONTEXT: Workspace data, conversation history,       │
│   user preferences, connected tools (CTG, PubMed, etc.)       │
└──────────────────────────────────────────────────────────────┘
```

---

## Part 4: Actionable Next Steps

### Immediate (This Week)
1. **Review Relume Designs** — Check if current wireframes align with this vision
2. **Define Block Types** — What are the core "blocks" in SponCite? (Trial, Site, Match, Note, etc.)
3. **Map Agent Triggers** — What events should wake each agent?

### Short-term (Next 2 Weeks)
4. **Prototype the Sidebar** — Agent icons + chat interface
5. **Build Block Schema** — PostgreSQL tables for block-based architecture
6. **Choose Stack** — Confirm Next.js + Supabase + which AI framework

### Medium-term (Month 1)
7. **MVP Trial Planner** — Notion-style database with multiple views
8. **First Agent** — Scout or Matcher working end-to-end
9. **Real-time Sync** — See updates from agents instantly

---

## Part 5: Competitive Differentiation

**Why SponCite wins vs. competitors building old-school portals:**

| Feature | Traditional CTMS | SponCite |
|---------|------------------|----------|
| Data entry | Manual forms | AI agents auto-populate |
| Site search | Keyword filters | Natural language + AI matching |
| Views | Fixed layouts | Customizable blocks |
| Updates | Email notifications | Real-time in-app feed |
| Collaboration | Separate portals | Unified workspace |
| Intelligence | Static reports | Autonomous agents |

---

## Sources
- Slack Engineering: Unified Grid Architecture
- Notion Blog: The Data Model Behind Notion
- Notion 3.0 Release: Agents (Sept 2025)
- OpenAI Case Study: Notion's Rebuild for Agentic AI
- Salesforce/Slack: Claude Code Integration Announcement
- Multiple architecture deep-dives and Reddit discussions

---

*Report compiled by Viko ⚡ for SponCite strategic planning*
