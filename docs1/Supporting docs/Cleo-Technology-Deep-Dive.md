# Cleo Technology Deep Dive - February 8, 2026

## Executive Summary
Cleo is a **mobile-first fintech** built on React Native (iOS + Android). They just launched **Autopilot** (Feb 5, 2026) - their biggest update ever, moving from chatbot to autonomous financial agent. **No web app exists** - they're fully committed to mobile.

---

## 🏗️ Tech Stack

### Frontend
| Component | Technology |
|-----------|------------|
| **Mobile Framework** | React Native (cross-platform iOS + Android) |
| **Original Platform** | Facebook Messenger chatbot (2016-2018) |
| **Current Platform** | Standalone mobile app only |
| **Web App** | ❌ None - mobile only |

**History:** Cleo started as a Facebook Messenger bot, then hired Theodo UK to build their React Native app in just 7 weeks. They've scaled from there.

### Backend & AI Architecture
| Component | Details |
|-----------|---------|
| **Architecture** | Multi-agent system (proprietary) |
| **AI Models** | "Frontier AI models" (likely GPT-4 class + fine-tuned) |
| **Tooling** | Purpose-built financial tooling |
| **Banking Integration** | Plaid + direct bank APIs |

---

## 🤖 Autopilot Architecture (Launched Feb 5, 2026)

### The Four Components
```
┌─────────────────────────────────────────────────┐
│                   AUTOPILOT                     │
├─────────────┬─────────────┬──────────┬─────────┤
│   ONRAMP    │   ROADMAP   │  DAILY   │ ACTIONS │
│             │             │   PLAN   │         │
│ Financial   │ Creates     │ Personal │ Execute │
│ analysis &  │ long-term   │ daily    │ moves   │
│ context     │ goal plan   │ guidance │ for you │
└─────────────┴─────────────┴──────────┴─────────┘
         ↓             ↓           ↓          ↓
    "Understand"   "Plan"     "Guide"    "Act"
```

### Multi-Agent Architecture
- **Not a single AI** - multiple specialized agents working together
- Each agent handles discrete tasks (budgeting, saving, credit, etc.)
- Scales to handle different financial domains independently
- CEO quote: "The challenge isn't intelligence, it's execution"

### Current vs Future Capabilities
| Now | Future |
|-----|--------|
| Block merchants | Full portfolio optimization |
| Automated savings | Investment management |
| Bill payment alerts | Tax optimization |
| Spending insights | Cross-account orchestration |

---

## 📱 Platform Analysis

### Why Cleo is Mobile-Only
1. **Origin as Messenger bot** - Chat-first DNA
2. **Push notifications** - Critical for real-time financial alerts
3. **Bank app authentication** - OAuth flows easier in mobile
4. **Always-with-you** - Financial decisions happen anywhere
5. **App Store discovery** - Organic growth channel

### What Cleo DOESN'T Have
- ❌ Web dashboard
- ❌ Desktop app
- ❌ Browser extension
- ❌ Family/shared accounts (consumer-focused)

---

## 🌉 ProsperPals: Bridging Web & Mobile

### The Opportunity
Cleo's mobile-only approach leaves a gap. Many users want:
- **Desktop dashboard** for deeper analysis
- **Web onboarding** (easier than app download)
- **Cross-device sync** for power users

### Recommended Architecture for ProsperPals

```
┌────────────────────────────────────────────────────────┐
│                    PROSPERPALS                         │
├────────────────┬───────────────┬──────────────────────┤
│   WEB APP      │  MOBILE APP   │   SHARED BACKEND     │
│   (Next.js)    │  (React Native│   (Supabase/Node)    │
│                │   or Flutter) │                      │
├────────────────┼───────────────┼──────────────────────┤
│ • Onboarding   │ • Daily use   │ • AI companions      │
│ • Deep reports │ • Notifications│ • Gamification engine│
│ • Goal setting │ • Quick checks│ • Banking APIs       │
│ • Family view  │ • Voice input │ • User state sync    │
└────────────────┴───────────────┴──────────────────────┘
```

### Tech Stack Recommendation

| Layer | Recommendation | Why |
|-------|---------------|-----|
| **Web** | Next.js 15 + Vercel | Fast deployment, great DX |
| **Mobile** | React Native (Expo) | Share components with web |
| **Backend** | Supabase | Real-time, auth, PostgreSQL |
| **AI** | OpenAI GPT-4 + fine-tuned | Goldie & Fin personalities |
| **Banking** | Plaid | Industry standard |
| **Payments** | Stripe | For premium features |

### Why React Native over Flutter?
1. **Code sharing** with Next.js web app (React ecosystem)
2. **Larger talent pool** to hire from
3. **Cleo proves it scales** for fintech
4. **Expo** simplifies deployment

### Progressive Web App (PWA) Option
Could start with **PWA-first**:
- Single codebase (Next.js)
- Works on mobile browsers
- Push notifications (on Android, limited iOS)
- No app store approval needed
- Convert to native later when proven

---

## 💡 Differentiation Opportunities vs Cleo

| Cleo | ProsperPals Opportunity |
|------|------------------------|
| Single AI personality | **Dual companions** (Goldie + Fin) |
| Mobile only | **Web + Mobile** for flexibility |
| Individual focus | **Family/shared accounts** |
| Entertainment-first | **Education-first** gamification |
| US market | **European market** (Denmark first) |
| No investing guidance | **Fin = investing companion** |

---

## 🔑 Key Takeaways

1. **Cleo's moat is execution speed** - They move fast, ship weekly
2. **Multi-agent is the future** - Start designing ProsperPals this way
3. **Mobile-first, web-enhanced** - Cover both, unlike Cleo
4. **Personality is product** - Goldie & Fin need distinct voices
5. **Gamification must teach** - Not just dopamine hits

---

## Sources
- PRNewswire: Cleo Autopilot Launch (Feb 5, 2026)
- Theodo UK: Cleo React Native case study
- ExcellentWebWorld: Cleo-like app development guide
- App Store / Play Store listings
