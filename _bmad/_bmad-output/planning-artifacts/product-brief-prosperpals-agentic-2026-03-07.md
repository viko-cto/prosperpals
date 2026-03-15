---
stepsCompleted: [1, 2]
inputDocuments:
  - 'market-prosperpals-ai-financial-wellness-research-2026-03-07.md'
  - 'domain-ai-powered-gamified-financial-wellness-research-2026-03-07.md'
  - 'technical-prosperpals-stack-resilience-architecture-research-2026-03-07.md'
  - 'ProsperPals-PRD-v2.0.md'
  - '17-08-25 imp final Project Brief_ ProsperPals (v2.md'
  - '17-08-25 ProsperPals Product Requirements Document v1-John.md'
  - '16-08-25 The Prosperity Keys_ - A Ready Player One-Inspired Financial Revolution.md'
  - '16-08-25 imp tokens ProsperPals Product Requirements Document Final-03-07-25.md'
  - 'Prosper Pall comple Bluepring 22-06-25 _text_markdown.md'
  - 'prosperpal-implementation-guide.md'
  - 'prosperpal-claude-code-NEW STEP BY STEP setup22-06-25.md'
  - '15-08-25 Building ProsperPals Chat Interface-V0 Guide.md'
  - 'ProsperPals Product Requirements Document v4 11-07-25.md'
  - 'PROSPERPALS-EXECUTIVE-SUMMARY-EXPANDED.md'
  - 'PRD-PROSPERPALS-v1.md'
  - 'ProsperPals-Research-2026-02-04.md'
  - 'ProsperPals-Daily-Research-2026-02-08.md'
  - 'CELEBRATION_MOMENTS_GUIDE.md'
  - 'NAVIGATION_FLOW.md'
  - 'voice-ai-alternatives-report.md'
date: 2026-03-07
author: Nikolas
---

# Product Brief: prosperpals-agentic

## Executive Summary

ProsperPals is an AI-powered financial wellness platform that creates an entirely new product category: **budgeting that earns you investment education through simulation.** Every financial action a user takes — logging an expense, scanning a receipt, maintaining a budget — earns ProsperCoins, a virtual currency that can be invested in a real-market-data simulator to learn investing by doing it.

Through two AI companions — **Goldie** (daily budgeting and spending awareness) and **Fin** (investing education and wealth building) — ProsperPals replaces the boring, homework-like experience of traditional budgeting apps with an engaging, conversational, gamified journey toward financial wellness.

The platform addresses a fundamental failure in existing financial tools: they show you where your money *went* but never help you plan where it *should go*, and they never reward you for the hard work of tracking and learning. ProsperPals closes both gaps with a core loop that no competitor offers: **Log spending -> Earn ProsperCoins -> Invest in simulator with real market data -> Learn from results -> Repeat.**

Positioned as **financial wellness education** — never financial advice — ProsperPals avoids the regulatory burden of MiFID II licensing while directly addressing the EU's active Financial Literacy Strategy. Launching EU-first from Denmark with PSD2 open banking, the platform targets 65 million Gen Z Europeans in a market where no major competitor currently operates.

**One-liner:** *Track your money. Earn virtual currency. Learn to invest. Build real financial wellness.*

---

## Core Vision

### Problem Statement

People don't know where their money goes — and no tool effectively helps them find out or plan ahead. The cycle repeats every month: get paid, feel wealthy, spend freely, watch subscriptions and bills auto-debit, and end the month anxious and broke, wondering what happened. Bank apps show a transaction history — a rearview mirror — but offer zero forward-looking guidance on budgeting, saving, or investing.

This problem starts young, when people first receive money with no framework for understanding what a comfortable life actually costs — rent, subscriptions, insurance, transport, food — the budget required to simply exist is invisible. It persists into adulthood, where the gap between income and expenses remains unknown until it's too late each month. The fundamental question — "how much does it really take to fund my life, and what can I do with what's left?" — goes unanswered.

Beyond budgeting, there is a massive knowledge gap around investing. People want to invest but don't know what to buy, how much they could earn, or how to learn without risking real money. No accessible tool lets them simulate investment decisions with real market data in a risk-free environment connected to their actual financial behavior.

### Problem Impact

- **67%** of Gen Z report that their financial situation negatively impacts their mental health (Bankrate 2025)
- **56%** of 18-29 year-olds have no budget at all (NFCC Survey)
- **73%** abandon budgeting apps within 90 days — the tools aren't engaging enough (Adjust Mobile Report)
- **78%** of Gen Z want to invest but only **37%** actually do — the knowledge gap is massive (Fidelity 2025)
- **72%** say their social life has suffered due to money constraints (DailyPay Research)
- **93%** plan to make changes to money management — the intent is there, the tools aren't (Intuit 2026)

The result is a generation that *wants* to be financially responsible but has no engaging, accessible, or rewarding path to get there. Financial anxiety becomes a constant background stress affecting sleep, relationships, mental health, and quality of life.

### Why Existing Solutions Fall Short

| Solution | What's Wrong | ProsperPals Difference |
|----------|-------------|----------------------|
| **Bank apps** | Rearview mirror only — shows past transactions, zero forward planning | Forward-looking budgets, spending predictions, "money left until payday" |
| **YNAB** | Feels like homework — steep learning curve, rigid methodology, no engagement, no AI. Free trial leads to frustration and abandonment. | Conversational AI companions that guide you; value in 80 seconds, not 80 minutes |
| **Cleo** | US/mobile-only, unavailable in EU (cannot be used in Denmark), entertainment over education, single AI personality | EU-first, web + mobile, education-focused, dual companions (Goldie + Fin) |
| **Monarch/Copilot** | Paywall-gated — can't try before committing to annual subscription | Generous free tier that actually works — prove value before asking for money |
| **All of the above** | No gamification with purpose, no investment simulation, no reward for effort, static categories, not localized for EU currencies, no closed loop between budgeting and investing education | Core loop: tracking money earns virtual currency for investment simulation — a new category |

The core failure across all existing solutions: they treat budgeting as data entry (accounting) rather than as an engaging conversation about your financial future (wellness). And none connect the act of budgeting to the reward of learning to invest.

### Proposed Solution

ProsperPals is a **conversation-first financial wellness platform** built around one core innovation — the **Earn-to-Learn Loop:**

**The Core Loop:**
1. **Log** — Track income and spending through conversation with Goldie, receipt scanning, or manual entry
2. **Earn** — Every financial action earns ProsperCoins (virtual currency stored in database)
3. **Invest** — Spend ProsperCoins in a virtual market simulator powered by real stock and crypto API data
4. **Learn** — See investment results with Fin's educational context explaining what happened and why
5. **Repeat** — Better tracking = more coins = more investing = more learning = financial wellness

**Two AI Companions:**

- **Goldie** — Your warm, encouraging daily financial companion. She helps you track spending, categorize expenses, visualize budgets, and celebrate small wins. Goldie is the default companion — always there, never judgmental. She maps out income, subscriptions, rent, insurance, and all recurring expenses to show exactly how much disposable income you truly have.

- **Fin** — Your sharp, analytical wealth-building mentor. He appears when investment context is triggered — explaining concepts, running "what-if" scenarios, and guiding virtual portfolio decisions using real market data. Fin teaches risk, reward, and compound growth through hands-on simulation, never through lectures.

**Companion interaction rule:** Goldie is the default. Fin appears only when investment/education context is triggered. Users never have to choose — the system handles handoff seamlessly. **Design choice note:** The dual-companion model is a product design decision (stronger emotional connection, clearer mental models, better marketing), not a user requirement. The fundamental need is different interaction modes for different contexts. If user testing reveals confusion or cognitive overhead, the fallback is a single adaptive AI with contextual mode switching — same architecture, different presentation. **Architecture requirement (from Red Team):** Goldie and Fin must be implemented as modes/personas of a single AI service, not as two separate services. The fallback to a single adaptive companion must be a configuration change (swap two persona prompts for one unified prompt), not an architectural rewrite. This means: shared conversation history, shared user model, shared context window — with persona-specific system prompts and tone profiles layered on top. **Handoff quality metric (from Thesis Defense):** The Goldie-to-Fin transition is a specific UX moment that must be tested independently — not assumed to work because the architecture supports it. Success criteria: (1) >80% of users who reach the handoff continue into the simulator (if <80%, the transition is confusing or disruptive). (2) <10% of users report confusion about "who they're talking to" in post-session surveys. (3) Users who experience the handoff retain at higher rates than those who don't (the handoff should *increase* engagement, not interrupt it). Test the handoff with 5+ users in pre-launch usability testing. If it fails, activate the single-companion fallback before launch, not after churn data proves the problem. **Companion Distinction Metric (from First Principles Analysis):** The dual-companion model assumes users form distinct mental models of Goldie vs Fin. Define behavioral signals that indicate the distinction isn't working: (1) >20% of users ask Goldie investment questions or ask Fin budget questions (role confusion). (2) Users refer to both as "the app" or "the AI" in feedback, never by name (no distinct identity formed). (3) No measurable difference in engagement between users who experience the handoff and those who don't (the distinction adds no value). If any two of these three signals appear in the first 1,000 users, trigger the single-companion fallback. The architecture already supports this — the question is when to pull the trigger, not whether you can.

**First-Session Magic (80 seconds to value):**
1. Goldie greets you (10 seconds)
2. You tell her one expense — "I spent 50 kr on lunch" (20 seconds)
3. She logs it, you earn 50 ProsperCoins (10 seconds)
4. She asks "Want to invest them?" — handoff to Fin (10 seconds)
5. Fin shows 3 things to buy, you pick one (30 seconds)
6. Done. You have a virtual portfolio. Come back tomorrow to see how it performed.

**First pick must feel consequential, not random (from Thesis Defense):** The 80-second promise lives or dies on step 5. If Fin shows 3 random tickers, the pick feels like a coin flip and the user has no reason to check back. Design constraints for the first pick: (1) Fin presents 3 *recognizable* assets the user has heard of (Novo Nordisk, Apple, Bitcoin — not obscure ETFs). (2) Each option includes a one-line "why this is interesting right now" hook ("Novo Nordisk is up 40% this year — here's why"). (3) Fin frames it as a real decision: "Which do you think will do best this week?" — not "pick one." (4) After picking, Fin says "I'll track this for you — check back tomorrow to see if you were right." The pick must feel like a *bet*, not a *button*. If users don't care which one they pick, the return hook is broken.

**Gamification with purpose (Duolingo-inspired mechanics):** ProsperCoins, Prosperity Keys (Copper/Silver/Gold achievement tiers), leaderboards, and clan competitions all reinforce the core loop. Every game mechanic teaches a financial wellness lesson.
- **Zero-spend day streak rule (from Trolley Problem):** A day with zero expenses is a valid streak day — logging "no spending today" counts. Goldie celebrates it: "Zero spending day — that's a win! Streak continues." Streaks measure *engagement with financial awareness*, not *transaction volume*. Checking Daily Spending Power and consciously deciding not to spend IS the behavior the product rewards. This prevents the perverse incentive of spending just to have something to log — which would directly contradict the loyalty loop inversion (rewarding awareness, not spending).
- **Streak freeze tokens:** Purchasable with ProsperCoins, let you miss a day without breaking your streak. Prevents the guilt-quit spiral where one missed day kills all motivation (Duolingo's most beloved retention feature). **Milestone-earned freezes (from Improv Yes-And):** Beyond purchasing, Sofia earns a free streak freeze for completing a learning milestone ("You finished 'What is Diversification?' — here's a streak freeze on the house"). This ties learning to retention: Fin's education literally protects Sofia's engagement. Learning = insurance against churn. Creates a virtuous cycle: learning → freeze earned → streak protected → more learning
- **Weekly rotating leagues:** ~30 users compete in weekly leagues (Duolingo model). Fresh group each week eliminates "permanent disadvantage" for late joiners and resolves the Sprint 1 vs Sprint 2 leaderboard fairness issue. Promotion/demotion between tiers adds stakes without lifetime pressure
- **Investment move limits (deliberate learning friction):** Fin limits daily simulator actions (e.g., 3 trades/day). Earn more moves by logging expenses (reinforces core loop). Prevents impulse-clicking through the simulator and forces deliberate research before acting — the constraint *is* the learning

**ProsperCoin one-liner (from Feynman test):** "Every time you log a real expense, you earn coins to practice investing with real stock data." One sentence, no jargon, self-explanatory. If the value prop needs more than this to make sense, it's too complex.

**ProsperCoin Value Path (Airline Miles Model):**
- **Tier 1 (MVP):** Database points. Earn through financial actions, invest in simulator, unlock premium features and leaderboard position. No regulation needed.
- **Tier 2 (Post-funding):** Redeemable for partner rewards — gift cards, financial education course discounts, exclusive content. Earn-through-behavior, redeem-through-curated-marketplace model (like airline miles). No securities classification.
- **Tier 3 (Scale — with legal counsel):** On-chain (Base L2) with soulbound properties. Redeemable for real perks through curated marketplace. Never tradeable on open exchanges. Follows airline miles legal framework — not securities.

**Critical positioning:** ProsperPals is financial wellness *education*, not financial advice. The platform never recommends specific stocks, funds, or financial products. Investment simulation uses real market API data for educational purposes only, with clear disclaimers. This eliminates the need for MiFID II financial advisory licensing while aligning with EU financial literacy initiatives.

**MVP regulatory approach:**
- ProsperCoins are off-chain database points (no token/securities regulation)
- NFT achievements are soulbound and non-transferable (no trading = no securities classification)
- Web3 integration deferred to post-funding with proper legal counsel
- All AI outputs include educational disclaimers — never personalized financial advice

### Key Differentiators

1. **The Earn-to-Learn Loop (Blue Ocean)** — No competitor connects budgeting to investment education through a virtual currency earned by financial behavior. This is a new product category: budgeting that earns you investment simulation currency. Track money -> earn ProsperCoins -> invest with real market data -> learn. **Loyalty loop inversion (from Thesis Defense — category-defining insight):** Traditional loyalty programs reward *spending* (spend more → earn more points → get discounts → spend more). ProsperCoins invert this: they reward *awareness of spending* (track more → earn more coins → learn investing → spend smarter). The redemption isn't discounts or cashback (which incentivize consumption) — it's education through simulation (which incentivizes financial literacy). This inversion is what makes ProsperPals a new category, not a loyalty program variant. If the loop ever drifts toward rewarding spending volume rather than tracking quality, the category claim collapses.

2. **Dual AI Companion System** — Two distinct AI personalities with specialized domains (Goldie for daily wellness, Fin for wealth building). Creates emotional connection, product depth, and clear mental models. Goldie is default; Fin appears contextually. No competitor offers this.

3. **80-Second Time-to-Value** — Full core loop experienced in the first session. Compare to YNAB (hours of setup), Monarch/Copilot (paywall before any value), Cleo (unavailable in EU). ProsperPals proves value before asking for anything.

**Three Value Layers (from Self-Consistency Validation):** The 80-second promise is layer 1 of 3. Each layer has explicit success criteria:
- **Instant value (80 seconds):** Novelty + first ProsperCoins + first portfolio pick. Success = user completes onboarding and has a virtual portfolio. Failure = user drops off before completing the core loop. This is the hook — it proves the product is different.
- **Quick win value (day 1-7):** First useful insight from Goldie ("You've spent 800 kr on food in 4 days") + first portfolio movement from Fin ("Your Novo Nordisk pick is up 3%"). Success = user returns at least 3 times in week 1. Failure = user never comes back after day 1. This is the proof — it shows the product is useful, not just novel.
- **Deep value (month 1+):** Behavioral change — user actually knows where money goes, has learned 3+ investment concepts, has adjusted spending based on insights. Success = user can answer "how much do you spend on food?" without checking. Failure = user uses app but behavior hasn't changed. This is the mission — the product delivers on "financial wellness," not just "financial tracking."
Each layer must independently justify continued use. If instant value is strong but quick win is weak, users churn at day 3. If quick win is strong but deep value is weak, users plateau at month 2. Design and measure each layer separately.

4. **EU-First, Age-Agnostic Architecture** — Marketing and tone target Gen Z in EU (Denmark first, then Nordics, then broader EU). But the product architecture — AI companions, core loop, simulator — serves any age. Expansion path: adjust tone and gamification intensity for broader demographics.

5. **ProsperCoin Value Path (Airline Miles Model)** — Credible progression from play money to real value without triggering securities regulation. MVP: in-app utility. Post-funding: partner reward redemption. Scale: on-chain with curated marketplace, never open-market tradeable.

6. **Forward-Looking, Not Backward-Looking** — While bank apps and competitors show where money *went*, ProsperPals shows where it *will go* and what happens if you redirect it toward savings and investments.

7. **Financial Wellness Positioning** — Education, not advice. Not just messaging — a deliberate regulatory strategy that eliminates MiFID II licensing barriers while genuinely serving users who need knowledge, not product recommendations. Aligns with EU Financial Literacy Strategy.

8. **Generous Free Tier** — In a market where competitors charge 10-15 EUR/month to even try, ProsperPals proves its value for free. Users who get better with money can even offset subscription costs through ProsperCoin rewards — aligning business model with user interest.

**Free vs Premium boundary (from Thesis Defense — the free tier must be useful but incomplete):** The free tier must solve a real problem (not be a crippled demo), while premium must solve a *pain* (not add a nice-to-have). Explicit boundary:

| Feature | Free | Premium (10-15 EUR/month) |
|---------|------|--------------------------|
| Core loop (log → earn → invest → learn) | Full access | Full access |
| Goldie conversations + Daily Spending Power | Full access | Full access |
| Fin's basic curriculum (beginner track) | Full access | Full access |
| Investment simulator (3 trades/day) | Full access | Unlimited trades + advanced order types |
| Fin's advanced tracks (sectors, risk, portfolio theory) | Locked after preview | Full access |
| Simulator analytics (sector analysis, "what-if" scenarios) | Locked | Full access |
| Historical portfolio performance (>30 days) | Locked | Full access |
| Family dashboard + learning progress visibility | Not available | Full access (Thomas's primary value) |
| Priority Fin responses + deeper analysis | Basic | Premium depth |
| Export budget data + insights | Not available | Full export |

**Boundary rationale:** Free users get the complete core loop and enough Fin education to experience 2-3 "aha moments." Premium unlocks *depth* (advanced learning, analytics, history) and *breadth* (family features, exports). The pain premium solves: "I've learned the basics and I want more" (Sofia/Marcus) or "I want to see my family's learning journey" (Thomas). If free users never hit the boundary, premium is priced wrong. If they hit it on day 1, free is too restrictive. Target: users hit the first premium gate (advanced Fin tracks) around week 2-3, when they've proven the product is valuable and are ready to invest in going deeper.

---

## Target Users

### Design Philosophy

Built for everyone. Marketed to Gen Z. Launched in Denmark. **Mobile-first** — Gen Z lives on phones; web is secondary. Denmark-first is about **founder-market fit** — cultural understanding (Janteloven, SU system, local merchants), not just technology (PSD2, MobilePay). Geographic expansion depends on cultural localization first, bank API availability second.

**Denmark validation criteria (from Thesis Defense — what success here must prove about the EU thesis):** Denmark is a controlled experiment, not the product's ceiling. Success in Denmark must validate these transferable hypotheses, not just local traction:
- **Core loop validation:** Do users complete the Earn-to-Learn loop at least 3x in week 1? (If yes → loop works regardless of market)
- **Retention without auto-import:** Do Sprint 1 users (manual entry) retain at 30% by day 30? (If yes → the product has value independent of banking integrations, which vary by country)
- **Archetype distribution:** Do all 3 archetypes appear in real usage, or does one dominate >80%? (If distributed → the multi-archetype model is real, not a design fiction)
- **Family plan willingness:** Do >30% of Thomas-archetype interviewees express willingness to pay? (If yes → family monetization transfers to other cultures)
- **Simulator engagement:** Do users check portfolio performance >3x/week? (If yes → the investment education hook works, not just the budgeting utility)
If Denmark succeeds on retention but fails on simulator engagement, the EU expansion is a budgeting app, not a financial wellness platform. If it succeeds on simulator but fails on family plan, the revenue model must pivot before expanding. Each metric validates a different piece of the EU thesis.

**Localization debt inventory (from Red Team analysis):** The following MVP design decisions are Denmark-specific and must be abstracted for geographic expansion. Surface these as architecture constraints:
- MobilePay integration (Denmark/Finland only) → must map to Swish (Sweden), Vipps (Norway), generic PSD2 fallback
- SU grant system references in Goldie's context → country-specific income source profiles
- Danish receipt OCR training data (Netto, Føtex, Rema 1000) → per-market retailer datasets
- Janteloven-informed sharing norms → cultural sensitivity profiles per market (achievement framing varies by culture)
- DKK as default currency → multi-currency from day 1 in data model, single currency in Sprint 1 UI
- Danish merchant categorization → locale-specific category mappings

None of these need to be solved for MVP, but the architecture must not hardcode Danish assumptions. Each item should be an abstraction point in the technical design.

**Daily Engagement Model (from Self-Consistency Validation):** The product requires two distinct daily actions, not one — and they serve different purposes:
- **Passive viewing (the open-app hook):** Check Daily Spending Power number + portfolio performance. This is why users open the app — a glanceable answer to "where do I stand?" No effort required, pure information pull. If this isn't compelling, users don't open the app at all.
- **Active entry (the in-app action):** Log an expense, scan a receipt, make a simulator trade. This is what earns ProsperCoins and feeds the core loop. If this feels like work, users open the app but don't engage.
Both are required; neither works alone. Passive-only users become lurkers who eventually churn (no coins, no simulator progress, no learning). Active-only users without a passive hook have no reason to return between logging sessions. Every retention feature must strengthen one or both: Daily Spending Power strengthens passive, ProsperCoins strengthen active, portfolio performance strengthens both.

ProsperPals follows a Slack/Notion-inspired modular architecture — the product adapts to the user, not the other way around. A 21-year-old student and a 48-year-old parent use the same platform with different intensity levels, gamification preferences, and AI sophistication settings. The core loop works identically; the experience scales to context.

**Visual design principle:** Premium minimal base (think Revolut, not Snapchat) with gamification elements layered on top. The product must look credible to a 48-year-old bank manager within 10 seconds of seeing it — Gen Z appeal comes from the AI personality and gamification layer, not from the visual design looking juvenile.

### Three Behavioral Archetypes (MVP)

The personas below illustrate three fundamental user archetypes that drive all MVP design decisions. Two use the product; one buys it:

1. **Budget-first** ("I don't know where my money goes") — Sofia represents this. The entry point is spending awareness; the simulator is the reward for tracking.
2. **Invest-first** ("I want to learn investing") — Marcus represents this, as do investing-curious Sofias. The entry point is the simulator; budgeting is the mechanism to fuel it. **Coin motivation design (from Feynman test):** The earning rate from logging expenses must make the simulator *meaningfully* better, not marginally. If 100 starter coins let you buy 3 stocks and logging a coffee earns 5 coins, the incentive is weak. Design lever: simulator features that unlock at coin thresholds (sector analysis at 500 coins, advanced charts at 1,000, "what-if" scenarios at 2,000) — so logging expenses unlocks *capability*, not just *quantity*. Marcus logs expenses because it makes Fin smarter, not just richer.
3. **Education-buyer** ("I want my family to learn about money") — Thomas represents this. He doesn't use the core loop daily; he pays for it. The segmentation question already has three answers — the archetype model matches.

The segmentation question at onboarding captures this behavioral split. Personas are storytelling tools for stakeholders and PRD readers — the product designs for archetypes, not demographics.

**Two-vs-Three Archetype Validation (from First Principles Analysis):** The three-archetype model assumes budget-first and invest-first are distinct user types. First principles suggests they may be one archetype ("I want to fix my money") with different entry preferences — Sofia enters through spending awareness, Marcus enters through the simulator, but both want financial improvement. If pre-MVP interviews reveal that budget-first and invest-first users converge on the same behaviors by week 2, the onboarding segmentation could simplify to two options ("fix my money" vs "teach my family"), reducing the under-tested-path risk. Test explicitly: do budget-first users who discover the simulator behave differently from invest-first users who discover budgeting? If not, the distinction is an onboarding preference, not an archetype.

**Validation requirement:** These personas are design hypotheses synthesized from research documents, not empirical findings. Pre-MVP user interviews (5-8 per archetype, in Denmark) are required before PRD finalization. The goal is not to validate — it's to be surprised by what we got wrong. **Thomas monetization kill criterion (from Red Team):** No existing product has proven parents will pay for their adult children's financial education app — this is a novel monetization hypothesis, not a validated pattern. Interview 5-8 parents specifically about willingness to pay for family financial education tools. If <30% express willingness to pay at 10-15 EUR/month, pivot revenue model to B2B2C (schools) or direct-to-user premium before committing to family plan as primary revenue driver.

**Sprint 1 honest positioning (from Feynman test):** In Sprint 1 (manual entry only, no MobilePay), 80%+ of Danish Gen Z transactions are already recorded by their bank. Asking users to re-enter digital transactions is duplication, not value. Sprint 1's real value proposition is: "Tell Goldie about the spending your bank *doesn't* see — cash tips, shared expenses, what that MobilePay charge was actually for — and earn coins to practice investing." Position manual entry as *completing* the picture, not *creating* it. The full "replace your bank app" value arrives in Sprint 2 with MobilePay auto-import.

### Primary Users (MVP)

**Sofia, 21 — Danish University Student** *(MVP core persona)*
- **Context:** Receives SU (Danish student grant) monthly plus cash tips from part-time café work. Lives in a shared flat in Aarhus. Has never had a budget that lasted more than two weeks.
- **Problem experience:** Gets SU on the 1st, feels rich, goes out with friends, buys clothes online, and by the 20th is eating ramen and borrowing from roommates. Has no idea where 60% of her money goes. Wants to invest but thinks "that's for people with real money."
- **Workarounds:** Screenshots bank app balance, mental math, asks parents for emergency transfers.
- **Success vision:** "I want to open my phone, see exactly how much I can spend today without ruining my month, and feel like I'm actually building something — not just surviving."
- **Daily Spending Power (from Exquisite Corpse — Sofia's atomic daily value):** Goldie's single most important daily output: "You have 127 kr per day for the next 16 days." Not a budget breakdown, not a pie chart — one number that answers "can I afford this?" This is the number Sofia checks every morning and the reason she doesn't delete the app. Requires: income, recurring expenses, and spending-to-date for the current pay period. Available from day 1 with manual entry; becomes automatic with MobilePay. **Mood-calibrated indicator (from Improv Yes-And):** The number alone doesn't tell Sofia how 127 compares to her normal. Add a single-word mood: "127 kr/day — *comfortable*" vs "42 kr/day — *tight*" vs "215 kr/day — *flush*." Goldie calibrates mood thresholds to Sofia's own spending history (not absolute amounts) — what's "comfortable" for Sofia is different from Marcus. The mood word makes the number *feel* like something without requiring mental math.
- **Key friction points (from focus group):**
  - Half her income is cash tips — entry must feel conversational, not like data entry (voice input, quick chat with Goldie). **But the bigger problem may be MobilePay micro-transaction invisibility:** Denmark is 80%+ digital payments. Sofia taps MobilePay 47 times a week and each tap feels like nothing — but they add up to 4,000 kr. Goldie's job isn't just logging; it's making each spend *feel real* ("You've tapped MobilePay 12 times today for 340 kr — more than yesterday's total")
  - Privacy from parents is essential — explicit opt-in sharing controls for any connected accounts
  - Leaderboards must use percentage-based metrics (% of income saved), not absolute amounts — prevents income shaming across user segments
- **Day 2 Home Screen (from Active Recall Testing):** The screen that determines whether Sofia comes back a third time. When Sofia opens the app the second time, she sees: (1) Daily Spending Power number with mood indicator — the passive hook, requires zero action. (2) Yesterday's portfolio performance with Fin's one-line explanation ("Your Novo Nordisk pick rose 1.2% — tech sector had a good day"). (3) Goldie greeting with contextual prompt ("Morning! Got any spending to log from last night?"). (4) Streak status (day 2 of 2). (5) ProsperCoin balance with delta since yesterday. This is the screen that converts a curious download into a returning user — every element must deliver value before Sofia taps anything.
- **Peer Observer Conversion (from Hindsight Reflection):** Sofia shows streaks and ProsperCoins to friends who never download. This "observer persona" — the peer who sees ProsperPals secondhand — needs a designed conversion path. Shareable artifacts (portfolio cards, learning milestones, streak screenshots) must be self-explanatory to non-users: include a one-line value prop and deep link, not just raw numbers. Design shared content so a non-user seeing it thinks "I want that too" — show the *feeling* (pride, progress, discovery) not just the *data* (coins, percentages). Without this, the viral loop leaks at the observation stage.

**Marcus, 25 — Junior Developer in Copenhagen** *(MVP — invest-first variant; shares the "practice investing" archetype with investing-curious Sofias)*
- **Context:** First "real job" after university, earning 32,000 DKK/month. Recently moved into his own apartment. Tried YNAB — set up categories for 40 minutes, entered three days of expenses, never returned.
- **Problem experience:** Makes decent money but has no idea if he's saving enough. Subscribes to things he forgets about. Knows he should invest but analysis paralysis keeps him in a savings account earning 0.5%. Watches investing YouTube but never acts.
- **Workarounds:** Checks bank balance obsessively, uses spreadsheets that he abandons after a week, follows r/personalfinance but doesn't apply advice.
- **Success vision:** "Show me where my money actually goes, automate the boring stuff, and let me practice investing without risking my rent money. And don't make me categorize every coffee."
- **Opportunity Cost Layer (from Exquisite Corpse — Marcus's investment lens on daily spending):** Fin overlays Sofia's Daily Spending Power number with investment potential: "You have 127 kr/day. If you save 30 kr/day, in 10 years that's 180,000 kr invested at 7% return." Not guilt — math. Every spending decision has a visible future cost. This is Fin's version of the daily number — it turns budgeting data into investing motivation. Toggle-able: users who find it stressful can turn it off. **Reverse opportunity cost (from Improv Yes-And):** The layer should also work in reverse — translating simulator *gains* into daily spending equivalents: "Your portfolio earned the equivalent of 12 kr today — that's 1 coffee you didn't have to give up." This makes the simulator feel like it's *giving* Marcus something tangible, not just showing abstract numbers. Forward direction (spending → future cost) motivates saving; reverse direction (gains → daily equivalent) rewards investing. Both reinforce the core loop from different emotional angles.
- **Key friction points (from focus group):**
  - Day 3+ retention is critical — ProsperCoins need tangible meaning ("you would have made 2,400 kr if this were real money"). **Marcus's true retention hook is subscription discovery** — surfacing forgotten charges he's still paying for. But this requires transaction data (MobilePay Sprint 2 or PSD2 Sprint 3-4). Honest gap: Marcus's full retention loop doesn't activate until transaction imports are live. The investing-first flow bridges this gap but doesn't fully replace it. **Sprint 1 bridge (from Red Team):** Bank statement PDF upload — Marcus uploads one PDF bank statement, Goldie identifies all subscriptions and forgotten charges in a one-time audit. No API integration needed, high-impact "aha moment" that proves value before MobilePay goes live. This is Marcus's day-1 hook: "Upload your last bank statement and I'll find money you're wasting." **Gamified subscription audit (from Improv Yes-And):** Instead of a static list, Goldie makes the audit a reveal: "I found 8 things. Want to see them one by one?" Each reveal earns ProsperCoins. Marcus rates each: "Keep / Cancel / Didn't know about this." Items marked "Didn't know" become Fin's opportunity cost examples ("That forgotten Spotify Family plan? 1,188 kr/year — invested at 7% for 10 years, that's 16,400 kr"). The audit becomes the onboarding experience, not just a feature
  - **Sprint 1 → Full Integration Migration (from Hindsight Reflection):** The bank statement PDF upload is a Sprint 1 bridge, but when MobilePay auto-import arrives in Sprint 2, existing Marcus users face a second onboarding moment: transitioning from "upload PDF" to "connected account." This migration UX must be designed proactively — Goldie walks Marcus through connecting MobilePay, reconciles previously uploaded data with live imports, and celebrates the upgrade ("Now I can see everything — no more uploads!"). If this transition feels like starting over, Marcus churns at the integration point instead of benefiting from it
  - Multi-currency support is essential — travels in EUR, lives in DKK
  - Fin must detect user sophistication level — Marcus already knows what a stock is; he wants sector analysis, not beginner explanations

### Secondary Users (& Monetization Persona — MVP via viral loop)

**Thomas, 48 — Danish Father** *(MVP monetization persona — converts through Sofia's engagement, no separate onboarding needed)*
- **Context:** Bank manager in Odense. Financially literate but digitally moderate. Tried teaching his daughter Sofia about compound interest with a spreadsheet — her eyes glazed over in 30 seconds. Discovers ProsperPals through Sofia's enthusiasm.
- **Problem experience:** Not a personal budgeting problem — his challenge is generational financial literacy transfer. Can't make his kids care about money management using traditional methods.
- **Interaction with product:** Downloads ProsperPals after Sofia shows him her virtual portfolio performance. Uses it casually for his own tracking but primarily values seeing Sofia engaged with financial concepts for the first time.
- **Success vision:** "If this app can teach my daughter about compound interest through doing it instead of me lecturing her, I'll pay for the family plan."
- **Monetization insight:** Thomas represents the **revenue path** — parents and professionals who pay for family/premium plans because the product delivers educational value they can't achieve alone. Sofia is on the free tier; Thomas pays day one if she's engaged. **Thomas pays for engagement, not features** — family plan must include a learning progress dashboard showing what Sofia has learned and achieved, not just premium feature access.
- **Revenue Model Priority Stack (from Self-Consistency Validation):** The document references multiple monetization approaches without ranking them. Explicit priority order:
  1. **Primary: Family plan** — Thomas pays 10-15 EUR/month for family dashboard + learning progress visibility. This is the revenue model the product is designed around. If this fails validation interviews (<30% willingness), the entire monetization strategy pivots.
  2. **Secondary: Direct premium** — Sofia/Marcus upgrade for advanced simulator features, detailed analytics, premium Fin analysis. Standard freemium conversion — proven model, lower ARPU than family plan.
  3. **Fallback: B2B2C (Schools)** — Institutional buyer (schools, employers) pays per-seat for financial literacy tool. Distribution channel that also validates educational positioning. Activates if consumer monetization underperforms.
  4. **Aspirational: ProsperCoin marketplace** — Tier 2/3 ProsperCoin redemption for partner rewards. Requires scale (100K+ users) and partner relationships. Not a launch revenue stream — a moat at scale.
  All four can coexist, but product decisions should optimize for #1 first, then #2. Never sacrifice family plan UX for B2B2C requirements.
- **Co-present Usage Mode (from Hindsight Reflection):** Thomas's primary engagement pattern isn't solo dashboard viewing — it's co-present with Sofia. She watches him take the "Challenge the Parent" quiz on her phone, and the social dynamic is the real hook. Design for this: quiz results should display in a way that's fun when both are watching (reveal animation, side-by-side score comparison). Fin's commentary should address both ("Sofia got 4/5 — Dad, your turn"). The family dashboard's "weekly recap" should be designed as a conversation starter at the dinner table, not a private analytics view. If Thomas only engages when Sofia is present, session design must optimize for those co-present moments rather than assuming solo use.
- **Thomas's session design (from Feynman test):** Thomas's in-app experience must be more than "glance at a dashboard once a month" — that's an email, not a product. A Thomas session (~5 min, weekly): (1) Weekly push notification: "Sofia completed 'What is Diversification?' this week — here's what she learned." (2) Opens family dashboard: sees Sofia's learning milestones, portfolio performance trend, streak status. (3) Engagement action: reacts to Sofia's milestone ("Great job!"), sets a family challenge ("Let's both learn about ETFs this week"), or invests family ProsperCoins in a shared portfolio pick. (4) Optional: checks his own budget summary or runs a compound growth scenario in the simulator. Thomas's retention metric is weekly engagement with family features, not daily app opens. **"Challenge the parent" quiz (from Improv Yes-And):** When Thomas sees "Sofia completed 'What is Diversification?'", add: "Do you know what diversification means? Take the same quiz Sofia took." Thomas isn't just a spectator — he's challenged to keep up. This transforms the family dynamic: Sofia isn't being watched, she's *teaching* her dad by proxy. If Thomas scores lower than Sofia, Fin says "Sofia got 4/5 — want to try again?" Competitive learning between generations increases both users' engagement and makes the family plan worth paying for.
- **Tangible Future Translation (from Exquisite Corpse — Thomas's educational lens):** Abstract financial numbers must be translated into real-world equivalents that make the future concrete: "30 kr/day saved = a used car in 5 years" or "= 3 months of rent." This is what makes the opportunity cost layer educational, not just mathematical. Fin maintains a library of tangible equivalents calibrated to Danish cost of living. This feature serves Thomas's educational value proposition — it's the financial conversation he can't have at the dinner table.
- **Simulator expansion (backlog):** Thomas's use case reveals demand for long-term compound growth scenarios ("what if I invested 2,000 kr/month for 20 years in an index fund?") vs Sofia's short-term stock picking. This is a different simulator mode — not MVP, but should be designed for from day 1.
- **Family engagement features (Post-MVP):** Shared family simulator portfolio ("let's invest 500 ProsperCoins together and discuss what to pick") — the financial conversation Thomas couldn't have with a spreadsheet. Family challenges ("reduce takeout by 20% this month, winner gets bonus ProsperCoins") transform Thomas from paying spectator to active participant, increasing his own retention and premium justification.
- **Key friction points (from focus group):**
  - Investment simulator must use real, recognizable stocks and ETFs — fictional assets undermine credibility and educational value
  - Gamification intensity must be adjustable — "serious mode" for users who want numbers without clans and leaderboards
  - Needs to trust the platform as educational, not a toy

### Post-MVP Expansion Users

**Lena & Erik, 28 — Young Couple in Stockholm** *(Post-MVP — couples functionality)*
- **Context:** Lena is a freelance graphic designer with irregular income (8,000-35,000 SEK/month). Erik works in logistics with a stable 34,000 SEK salary. Living together, splitting costs unevenly and fighting about it.
- **Problem experience:** Can't see each other's financial picture. Erik thinks Lena overspends on design supplies; Lena thinks Erik doesn't understand freelancer cash flow. No shared budget, no shared goals, no shared visibility. Arguments about money are their #1 relationship stress.
- **Workarounds:** Shared spreadsheet they stopped updating, Splitwise for splitting bills (but it doesn't budget), awkward monthly "money talks" that feel like audits.
- **Success vision:** "One place where we can both see if we're on track for rent and our vacation fund, without me having to justify every business expense." — Lena
- **Key friction points (from focus group):**
  - Couples need shared goals + separate personal tracking with granular privacy controls
  - Clear permission model — who can create, edit, or delete shared goals?
  - Goldie must understand irregular income patterns — averaging over 3-6 months, not rigid monthly assumptions that make freelancers feel like failures

### User Journey

**Discovery (segmented by persona):**
- **Sofia (students):** TikTok (primary), Instagram — short-form content showing the 80-second onboarding, ProsperCoin earnings, virtual portfolio results
- **Marcus (young professionals):** X/Twitter, Product Hunt, Hacker News, YouTube — deeper explainer content, dev community buzz, product launches
- **Lena & Erik (couples, post-MVP):** Instagram, word of mouth, partner referral — "my partner uses this and it saved us from money fights"
- **Thomas (parents):** Word of mouth from children, LinkedIn articles on financial literacy for families, financial wellness podcasts

**Onboarding (80 Seconds to First Financial Insight):**
0. Goldie asks one segmentation question: "What brings you here?" (learn budgeting / teach my family about money / practice investing) — sets 3 user preferences (gamification intensity, Fin's starting level, tone), same flow for everyone. **Analytics requirement:** track conversion and 30-day retention rates per segmentation answer — this predicts retention behavior and may reveal that "practice investing" users retain differently than "learn budgeting" users. Log all segmentation answers against subsequent user behavior to build a future behavioral detection model (v2 upgrade path: replace the question with automatic archetype detection based on observed actions)
1. Goldie greets you warmly in your persona's tone
2. You tell her one expense — voice, text, or receipt photo
3. She logs it, you earn your first ProsperCoins
4. **Persona-aware sequencing:** "learn budgeting" users get budget visibility context before investment handoff (Goldie shows what the expense means for their week first). "Practice investing" users get 100 starter ProsperCoins and go straight to Fin — invest first, then Goldie appears ("Want to earn more coins? Tell me about your spending."). "Teach family" users skip steps 2-4 and go straight to the family value proposition — "Here's what your family can learn together" + invite flow. **Day 1 empty-state problem:** If Sofia just started, Thomas's family dashboard is empty. Show a **demo/preview mode** with sample data ("Here's what Sofia's dashboard could look like in 30 days") so Thomas sees the promise, not a blank screen. Personal tracking offered as optional add-on, not the default. Thomas's time-to-value is seeing the family plan vision, not logging his own expense. **Investing-first daily trigger:** Fin sends a daily market insight on the user's portfolio ("Your Novo Nordisk pick is up 2.3% — here's why") to create an active return reason, since portfolio checking alone is passive.
5. "Want to invest them?" — **First-time Fin introduction:** Goldie explicitly introduces Fin ("Let me introduce you to Fin — he's the investment brain around here"). No silent switch — the handoff is a moment, not a glitch.
6. Fin shows 3 real assets to buy with your coins, you pick one
7. Done. You have a virtual portfolio. Come back tomorrow to see how it performed.

**First Week (post-MobilePay integration):** With auto-imports, Goldie shifts from passive listener to **proactive spending awareness engine** — she interrupts Sofia with spending context, not waiting for Sofia to come to her. Before MobilePay (Sprint 1): daily check-ins feel like chatting with a friend, not filing reports. ProsperCoin balance grows. You check your virtual portfolio performance — Fin explains why your pick went up or down. Goldie delivers two types of "insight interrupts": **financial insights** connecting spending to investment context ("You spent 600 kr on takeout this week. Your simulator portfolio earned 45 kr. The takeout cost 13x your investment gains.") and **behavioral consistency insights** celebrating habit formation ("You logged expenses 6 days in a row — last week was 2. Your consistency is up 200%."). The habit loop forms.

**First Month:** Full budget picture emerges — Goldie maps all income sources (including cash/irregular), subscriptions, recurring expenses, and shows your true disposable income. Virtual portfolio has enough history to show trends. Fin introduces new concepts based on your demonstrated level (beginner gets "what is diversification?", Marcus-types get sector rotation analysis). Prosperity Key progress visible.

**Ongoing:** Budget becomes automatic — Goldie flags anomalies, celebrates streaks, warns before overspending. Fin's simulator teaches progressively complex concepts. Leaderboard position reflects consistency, not wealth. Couples share financial goals while maintaining personal privacy. The question shifts from "where did my money go?" to "what should I do with what's left?"

### Focus Group Design Implications

| Discovery | Design Implication | Priority |
|-----------|-------------------|----------|
| Cash income is invisible to digital tools | Voice/chat-based entry for cash must be as frictionless as scanning a receipt | MVP |
| Income inequality makes absolute leaderboards toxic | All competitive features use percentage-based metrics relative to user's own income | MVP |
| Irregular income breaks monthly budgets | Goldie supports rolling averages (3/6 month) for freelancers and variable earners | MVP |
| Gamification alienates older users | **Three-mode gamification:** Full (Sofia — coins, leaderboards, clans, achievements), Lite (Marcus — coins and progress yes, clans and leaderboards no), Off (Thomas — financial impact metrics only: money saved, spending trends, budget adherence %). Each mode must be equally compelling for its target user. **"Off" mode clarification (from Red Team):** "Off" removes competitive/social gamification (leaderboards, clans, streaks, achievements) but retains AI companions (Goldie/Fin conversations), investment simulator, and learning paths. These are the core differentiators, not gamification features. Without this clarification, "Off" mode is just a budgeting dashboard competing with Revolut on pure utility — a losing position | MVP |
| AI sophistication mismatch causes churn | Fin adapts depth via simple 3-tier model (beginner/intermediate/advanced) based on user behavior. For advanced users, Goldie and Fin blend into a unified smart assistant voice (presentation layer, not architecture change) | MVP |
| Simulator credibility requires real assets | Investment simulator uses real stock/ETF tickers with real market data, never fictional assets | MVP |
| Couples need shared + private spaces | Shared goals dashboard with granular privacy controls, permission model, and GDPR-compliant consent | Post-MVP (architect now) |
| Multi-currency is table stakes for Nordics | Support DKK, SEK, NOK, EUR — launch DKK-only in Denmark, add currencies with geographic expansion | Post-MVP (architect now) |
| Family sharing needs privacy boundaries | Connected accounts are opt-in with user-controlled visibility per category, symmetrical between adults | Post-MVP (architect now) |

**"Architect now" note:** Post-MVP features marked "architect now" don't need to be built, but the MVP database schema, API design, and data models must not make them impossible. Single-user assumptions baked into core architecture will require rewrites later. Surface these in the Architecture section.

**Privacy vs virality boundary (from Red Team):** The product simultaneously requires strong privacy (Sofia hides finances from parents) and visible engagement (Sofia's activity converts Thomas). These goals conflict unless explicitly separated:
- **Learning progress sharing (viral-safe):** Milestones completed, concepts learned, simulator portfolio performance, Prosperity Key tier — this is what Thomas sees. Never includes spending amounts, budget categories, or income data
- **Financial data sharing (privacy-protected):** Spending data, budget details, income sources, transaction history — this is never shared without explicit opt-in, and never shared with the family dashboard. Even in couples mode, financial data sharing is granular and revocable
- Thomas's family dashboard shows "Sofia learned about 5 investment sectors" and "Sofia's portfolio is up 12%" — never "Sofia spent 4,000 kr on food"
- **Family dashboard shows milestones, not scores (from Trolley Problem):** Thomas sees *what* Sofia is learning ("Sofia is studying Risk & Diversification") and *that* she completed it ("Sofia completed Understanding Risk") — never *how well* she scored ("Sofia got 2/5"). Learning involves failure; if Sofia knows Dad sees every quiz score, she'll avoid hard topics or stop engaging with quizzes entirely. Fin privately encourages Sofia on retries ("Most people need 2-3 attempts — want to try again?"). This preserves Thomas's value proposition (visibility into engagement and learning progress) while protecting Sofia's autonomy to learn through mistakes without surveillance pressure

**GDPR note for shared features (Post-MVP):** Any shared financial data between users (couples, family) requires explicit, granular, revocable consent per data category. Sharing model must be symmetrical between adults — no implied parental oversight for users 18+.

### Critical Dependencies & Risk Mitigations (from Pre-mortem)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Manual-only entry kills retention (same trap as YNAB) | HIGH | CRITICAL | **Launch Strategy (from Debate Resolution):** Sprint 1: Ship with manual entry + receipt scanning (invest in OCR quality). Build a **transaction import architecture** (abstraction layer for multiple sources, ships with zero auto-imports at launch). Sprint 2 (weeks 2-3): MobilePay API activation through the import layer (covers 80%+ of Danish Gen Z daily transactions). Sprint 3-4: PSD2 open banking through same import layer (salary, subscriptions, rent). Cash batch mode from day 1. **Critical launch KPI: track "transactions per user per day" — if below 2 by day 7, escalate MobilePay to P0.** |
| ProsperCoins feel meaningless after week 2 | HIGH | HIGH | Frame virtual returns in real-money equivalents from day 1 ("If this were real money, you'd have earned 100 kr"). Unlock meaningful in-app rewards with ProsperCoins (premium Fin analysis, advanced charts, custom themes). Enable private friend leaderboards, not just global rankings of strangers. Anti-gaming guardrails: daily earning caps, pattern detection for spam entries, verified transactions (MobilePay/PSD2) earn bonus coins vs manual entries. **Anti-gaming false positive risk:** Daily earning caps must be calibrated for legitimate high-frequency users (students may log 8-10 small transactions/day). Cap on *earning velocity* (no more than X coins per minute), not on *daily transaction count*. Verified vs manual coin bonus must not create a two-class system — Sprint 1 users (manual only) should not be permanently disadvantaged on leaderboards when Sprint 2 users get MobilePay bonus. Solution: leaderboard seasons that reset, or separate leaderboard tiers by data source mix. |
| AI companions feel generic after novelty fades | MEDIUM | HIGH | MVP v1: Goldie references streak data + last 5 interactions (lightweight memory). Fin has structured 3-tier curriculum (basics → diversification → sectors → risk → portfolio theory). Full conversational memory is Post-MVP. Budget AI quality as a core product investment, not an afterthought. |
| Thomas alienated by Gen Z-optimized UX | MEDIUM | HIGH | Onboarding segmentation question sets persona-appropriate first impression and gamification defaults. Thomas's path leads with investment simulator and educational value, not clans and ProsperCoins. |
| Thomas never discovers ProsperPals (viral dependency single point of failure) | MEDIUM | HIGH | The current design relies entirely on Sofia sharing with Thomas — if she doesn't share (privacy, Janteloven, forgets), Thomas has no discovery path. **Redundancy required:** LinkedIn/podcast content marketing targeting financial literacy for families. "Family plan" landing page optimized for search ("teach kids about money Denmark"). In-app: Goldie prompts Sofia at milestone moments ("You just learned about diversification — want to share this achievement with someone?"). Thomas must also be discoverable through non-Sofia channels — the viral loop is the primary path, not the only path. **Thomas-First Discovery Path (from First Principles Analysis):** Thomas's problem ("I can't teach my kids about money") exists before Sofia uses ProsperPals. Design a Thomas-first onboarding: Thomas downloads independently (SEO, LinkedIn, podcast), sees the family plan vision with demo data, and *invites Sofia* ("I found this app — try it and I'll get the family plan so we can learn together"). This reverses the viral dependency: Thomas's invitation gives Sofia social permission to engage with a finance app, and Thomas is already primed to pay. The current Sofia→Thomas path remains primary, but Thomas→Sofia must also work. Interview question for pre-MVP validation: "Would you download a financial literacy app to share with your kids, or would you only try it if your kids showed it to you first?" |
| Couples mode amplifies financial inequality | LOW | MEDIUM | Design shared views with percentage framing (contribution as % of income), rolling averages (not monthly snapshots), and joint progress tracking ("65% to vacation fund" not "Lena: 2,000, Erik: 8,000"). |

### Design North Star: The 3 Aha Moments (from Reverse Engineering)

Every feature, design decision, and engineering sprint should be evaluated against: **"Does this make one of these 3 moments more likely?"**

1. **Sofia's aha (Month 1):** "I spend more on eating out than on my phone, rent, and Netflix combined." — Goldie's insight interrupt connecting spending categories to each other and to investment returns. This is the moment budgeting stops being data entry and becomes self-discovery.

2. **Marcus's aha (Month 1):** "If I'd invested that cancelled subscription money for 10 years, I'd have 72,000 kr." — Fin's compound growth projection turning a small savings into a vivid future. This is the moment the simulator stops being a game and becomes motivation to invest for real.

3. **Thomas's aha (Month 2-3):** "My daughter just explained P/E ratios to me. She learned it from an app." — Sofia's demonstrated knowledge proving the educational value proposition. This is the moment Thomas pays for the family plan.

**Critical dependency chain:** Sofia's retention IS Thomas's acquisition funnel. If Sofia churns at month 2, Thomas never converts. Every retention feature for Sofia is simultaneously a monetization feature for Thomas.

**Launch requirement:** Goldie must understand Danish kroner context and local merchants natively. Subscription detection must surface forgotten charges within the first week (Marcus's early win). Achievement sharing must be social-export-ready for Sofia's viral loop (month 3). These are not nice-to-haves — without them, the *aha moments* don't happen.

### Failure Mode Preventions (from Failure Mode Analysis)

**Goldie's insight interrupts must never feel judgmental:**
- Frame as discovery ("Here's something interesting..."), never criticism ("You spent too much on...")
- Always pair spending insights with an actionable next step ("Want to try a spending challenge?")
- User controls interrupt frequency (daily/weekly/off)
- Low-income users: compare to simulator potential, not to other categories

**Fin's sophistication model must be per-topic, not global:**
- A user can be beginner on bonds and intermediate on stocks simultaneously
- Add "I know this" / "tell me more" buttons on every Fin explanation for explicit feedback
- Auto-promote when user skips beginner explanations on a topic
- **Passive→active learning progression (Duolingo model):** Fin teaches concepts passively first (show what a P/E ratio is on the user's portfolio holdings), then tests actively (quiz: "Which of your holdings has the best P/E ratio?"). Learning has a funnel — exposure before application before mastery
- **Visible learning paths with progress bars:** Fin's curriculum must surface as named tracks with completion progress ("Stock Market Basics: 7/12 lessons", "Risk & Diversification: 2/8 lessons"). Gives Marcus a sense of "I'm getting somewhere" beyond open-ended simulation. Combines finite achievement (complete a track) with infinite practice (keep investing in the simulator) — users need both a destination and an ongoing reason to return

**Cash entry accuracy must degrade gracefully:**
- Cash tips are inherently estimated — Sofia says "around 300 kr" but the real number could be 250 or 350. Over time, budget accuracy diverges from reality
- Goldie must distinguish between verified transactions (MobilePay/PSD2) and estimated entries (cash) in all insights — hedging language for cash-heavy budgets ("Based on your estimates, you spent about...")
- Never show false precision on cash-based budgets — round percentages, use ranges ("40-50% on food" not "47.3%")
- Track the ratio of verified vs estimated entries per user — if >50% is manual/cash, flag insights as approximate and prioritize MobilePay onboarding
- Cash entry gaps (forgot to log for 3 days) must not trigger guilt — Goldie says "Welcome back! Want to do a quick catch-up?" not "You missed 3 days of logging"

**Receipt scanning must be trustworthy for Danish receipts:**
- Build Danish receipt training dataset before launch (Netto, Føtex, Rema 1000, Irma, local cafés)
- Always show scanned result for user confirmation before committing — never auto-commit
- If OCR confidence is low, Goldie asks conversationally: "I couldn't read this clearly — what store and amount?"
- Track OCR accuracy as a quality KPI — target 90%+ or it undermines trust

**Achievement sharing must respect Janteloven (Scandinavian humility norms):**
- Frame shares as learning milestones ("I learned about 5 investment sectors"), not financial achievements ("I tracked 10,000 kr")
- Share virtual portfolio performance, not personal budget data
- Sharing templates should provoke curiosity: "This app taught me what P/E ratio means in 30 seconds"

**Family viral loop needs explicit invite mechanics:**
- Don't rely solely on organic sharing — build a "show someone your portfolio" invite feature
- Bidirectional: Thomas can invite Sofia ("learn together"), Sofia can invite Thomas ("look what I learned")
- Frame as sharing *achievement*, not financial data — Sofia should feel proud, not embarrassed
- **Primary conversion engine is social sharing templates, not in-app invites.** Thomas converts when Sofia says at dinner "Dad, did you know Novo Nordisk's P/E ratio is 42?" — invest in screenshot-ready portfolio cards, learning milestone social exports, and shareable "I learned X" cards that make Sofia's knowledge visible outside the app. Embed UTM-tracked deep links in all shareable cards so when Thomas downloads, attribution traces back to Sofia's specific share

**Onboarding segmentation must be forgiving and fluid:**
- Make preferences easily changeable from settings at any time
- Add a "this doesn't feel right?" recalibration prompt at day 3
- If question is skipped, default to full gamification + beginner Fin (serves majority use case)
- **Archetype fluidity:** Users should not be locked into their initial choice. An investing-curious Sofia who picks "practice investing" must still encounter Goldie's spending awareness content within the first week — the segmentation question controls sequencing and emphasis, not access. Cross-pollinate: after invest-first users complete their first portfolio pick, Goldie appears ("Want to earn more coins? Let me show you something interesting about your spending"). After budget-first users log 5 expenses, Fin appears proactively ("You've earned enough to make your first investment — want to try?")
- **Failure risk:** If answer distribution is heavily skewed (e.g., 80% pick one option), the other two paths become undertested and under-optimized. Track distribution weekly during launch and consider A/B testing a 2-option variant if one path has <10% selection rate

**Retention success metrics must be persona-specific:**
- **Sofia (budget-first):** Daily logging activity — success = 4+ days/week logging by month 2
- **Marcus / investing-curious Sofia (invest-first):** Weekly portfolio engagement + earning new ProsperCoins — success = 3+ sessions/week
- **Thomas:** Monthly dashboard check on family learning progress — success = 1+ visit/month + active subscription
- Do NOT measure all users against a single DAU metric — different personas have different healthy engagement cadences

**Day 7 at-risk signals (early warning — trigger re-engagement nudge):**
- **Sofia at-risk:** Logged <3 expenses in week 1, or hasn't opened app in 2+ days, or earned coins but never checked simulator
- **Marcus at-risk:** Checked portfolio once and never earned more ProsperCoins, or opened app 1 time after onboarding, or Fin's first explanation got an "I know this" tap with no follow-up visit
- **Thomas at-risk:** Opened app once after onboarding but family dashboard was empty (Sofia hasn't shared), or never returned after seeing the demo preview
- Day 7 is the rescue window. Day 30 is the post-mortem. Intervene at day 7 with Goldie nudge ("Haven't seen you in a while — your ProsperCoins are waiting")

**Define the churned user (day 30 failure modes):**
- **Sofia churned:** Never received an insight interrupt (insufficient data logged), or ProsperCoins felt meaningless (never checked simulator), or first-session onboarding took too long (didn't complete core loop)
- **Marcus churned:** Fin's explanations were too basic (sophistication mismatch), or manual entry was too tedious (MobilePay not yet integrated), or simulator felt like a toy (no real-money equivalents shown)
- **Thomas churned:** Never saw Sofia's engagement (no sharing happened), or platform looked too juvenile (gamification not adjusted), or family plan didn't show learning progress (no dashboard)
- **Use these failure profiles to prioritize retention features** — preventing Sofia's churn is simultaneously preventing Thomas's churn (dependency chain)

**Post-MVP expansion market: Debt management**
- Many Gen Z users carry student loans or consumer debt — "where does my money go?" naturally leads to "how do I get out of debt?"
- Not MVP scope, but the Earn-to-Learn loop adapts: debt payoff strategies as Fin educational content, debt-free milestones as achievements
- Design architecture should not assume users are debt-free

**Post-MVP expansion channel: B2B2C (Schools)**
- Denmark mandates financial literacy in secondary education — ProsperPals as curriculum tool
- Teacher creates a "class" (like a clan), sets weekly challenges, tracks student engagement
- Same product, institutional buyer — schools are another "Thomas" (pay because students are engaged)
- Distribution channel that validates educational positioning and drives organic student-to-family viral loops

### Resilience Requirements (from Chaos Monkey Analysis)

**Graceful degradation is a UX requirement, not just an engineering concern.** When systems fail, the user experience must degrade conversationally (Goldie/Fin explain what's happening), never with error screens or silent failures.

| Failure Scenario | User Impact | Required Resilience |
|---|---|---|
| MobilePay/PSD2 API outage | Sofia/Marcus lose auto-imports, streaks at risk | Goldie explains conversationally, offers quick-log fallback. Streak counts "user engaged today" not "transactions imported." Backfill + reconciliation on recovery with catch-up insight |
| Stale market data (>4h delay) | Marcus sees discrepancy with real markets, credibility damaged | Freshness timestamps on all prices. Fin acknowledges delays. **Fallback data provider** — primary + secondary market API with automatic failover |
| Wrong AI insight (miscategorization, decimal error) | Trust destruction — if first surprising insight is wrong, all future insights questioned | Confidence scoring in insight pipeline. Hedging language on uncertain aggregations ("I think you spent about..."). Source data shown. One-tap "This doesn't look right" correction flow. Track insight accuracy as quality KPI |
| Account compromise | Catastrophic privacy violation — full spending history exposed | 2FA mandatory for linked/banking accounts. No financial data in push notifications. Encrypted PII at rest. Session anomaly detection (new device + location = re-auth). Instant family link revocation from either side |
| Financial data in notifications | Sofia's roommate or parent sees spending details on lock screen — trust destroyed, potential app deletion | **Notification privacy rule (from Trolley Problem):** Push notifications must be *behaviorally* personal but *financially* generic. Allowed: "Haven't seen you in a while — your ProsperCoins are waiting" or "Your portfolio moved today — check it out." Never allowed: amounts, categories, merchant names, or budget status. The notification must make sense to a stranger reading over Sofia's shoulder. Re-engagement nudges reference streaks, coins, and portfolio — never spending data. |
| ProsperCoin inflation bug | Leaderboard corruption, unfair balances, inflated learning milestones | Server-side rate limiting independent of business logic (circuit breaker). Transaction-level audit trail on coin ledger. Anomaly detection on earning velocity. Leaderboard freeze during anomalies. Rollback plan with user notification |
| Goldie-to-Fin handoff failure | Core loop broken — users earn coins but can't invest | Health check on Fin's service before offering handoff. If Fin is down, Goldie says "Fin is taking a break — I'll notify you when he's ready." Never fail silently. Queue investment intents for when Fin recovers |

**Implementation tiering:**
- **Day 1 (protects core loop):** API graceful degradation (MobilePay/market data), Goldie-to-Fin handoff resilience, basic coin rate limiting
- **Sprint 2:** Insight confidence scoring + hedging language, coin anomaly detection, leaderboard freeze logic
- **Sprint 3+:** 2FA for linked accounts, session anomaly detection, full audit trail, encrypted PII at rest

**Design principle:** Every failure mode should result in a conversational explanation from Goldie or Fin, never a technical error. Users should feel like the companion is being honest with them, not that the app is broken.

**Offline-first design requirement (from Active Recall Testing):** Mobile-first means signal-independent for core features. The app targets Gen Z users on the go — subway, campus, café with weak Wi-Fi. Core UX must never show a "no connection" error screen. Requirements: (1) Daily Spending Power displays from locally cached data (last sync). (2) Expense logging works offline — entries queue locally and sync on reconnect with conflict resolution. (3) Portfolio viewing shows last-known state with staleness indicator ("Prices as of 2 hours ago"). (4) Goldie conversations queue locally for send-on-reconnect; pre-cached responses handle common interactions offline. (5) Only features that inherently require live data (real-time market prices, leaderboard updates, new Fin lessons) may show connectivity-dependent states — and even these show cached last-known state, never a blank screen.

---

## Success Metrics & KPIs

*Step 4 — Completed via Pre-mortem, Shark Tank Pitch, and Comparative Analysis elicitations*

### North Star Metric

**Weekly Active Core Loop Completions (WACLC):** The number of unique users who complete at least one full Log → Earn → Invest → Learn cycle per week. This is the single metric that validates the product category. If users log expenses but never invest, or invest but never log, the core loop is broken and ProsperPals is just another budgeting app.

- **Launch target (Month 1):** 40% of registered users complete ≥1 full loop/week
- **Product-market fit signal (Month 3):** 25% of registered users complete ≥3 full loops/week
- **Scale readiness (Month 6):** 20% of all registered users are weekly active loop completers

### Persona-Specific KPIs

#### Sofia (Budget-First Archetype)

| Metric | Day 7 | Day 30 | Day 90 | Why It Matters |
|--------|--------|--------|--------|----------------|
| Onboarding completion (80-sec core loop) | 70% | — | — | If <70% complete the first loop, the 80-second promise is broken |
| Daily logging frequency | 3+ entries/week | 4+ days/week active | 4+ days/week active | Logging is the engine — no logs, no coins, no loop |
| ProsperCoin earning velocity | 200+ coins earned | 1,500+ cumulative | 5,000+ cumulative | Coins fund the simulator — earning velocity predicts investment engagement |
| Simulator engagement (from earned coins) | 1+ investment made | 3+ investments/week | Portfolio diversified across 3+ sectors | Sofia must cross the bridge from budgeting to investing |
| Daily Spending Power check frequency | 3+ views/week | 5+ views/week (habitual) | Daily (automatic behavior) | The passive hook — if she stops checking DSP, she stops opening the app |
| Insight interrupt engagement | — | 1+ "aha moment" insight received | 3+ insights acted on (changed behavior) | The "I spend more on eating out than rent" moment must happen by Month 1 |
| Streak maintenance | 3-day streak | 14-day streak | 30-day streak (with ≤2 freezes) | Streaks are the retention backbone — measures habit formation |
| Sharing/viral action | — | 1+ achievement shared externally | Referred 1+ user (Thomas conversion path) | Sofia's sharing IS Thomas's acquisition funnel |

**Sofia at-risk signals:** <3 expenses logged in week 1 · Earned coins but never opened simulator · Hasn't opened app in 48+ hours · Streak broken and no return within 72 hours

**Sofia success definition (Month 3):** Can answer "How much do you spend on food per month?" without checking. Has a virtual portfolio she checks weekly. Has shared at least one learning milestone externally.

#### Marcus (Invest-First Archetype)

| Metric | Day 7 | Day 30 | Day 90 | Why It Matters |
|--------|--------|--------|--------|----------------|
| Onboarding completion | 80% (higher than Sofia — Marcus is more tech-savvy) | — | — | Marcus expects fast, polished onboarding |
| Simulator session frequency | 3+ sessions/week | 5+ sessions/week | Daily portfolio check | The simulator is Marcus's primary engagement driver |
| Fin curriculum progression | Completed 2+ lessons | Completed "Stock Market Basics" track | 2+ tracks completed, intermediate level | Fin must adapt to Marcus's sophistication — too basic = churn |
| Expense logging (cross-pollination) | 1+ expense logged (from Goldie prompt) | 3+ days/week logging | Regular logger (budget awareness achieved) | Marcus enters for investing but must discover budgeting value |
| Subscription audit completion | 1 audit completed (bank statement upload) | — | — | Marcus's Sprint 1 "aha moment" — found forgotten charges |
| Opportunity cost engagement | — | Viewed 3+ opportunity cost projections | Used projection to cancel a real subscription | Fin's "if you'd invested that..." must drive real behavior change |
| ProsperCoin investment diversity | 3+ different assets held | Sector-diversified portfolio | Outperforming random picks (learning signal) | Shows genuine learning, not just clicking |

**Marcus at-risk signals:** Checked portfolio once, never earned more coins · Fin's first explanation got "I know this" with no follow-up · Opened app 1 time after onboarding · No expense logged by day 5

**Marcus success definition (Month 3):** Can explain 3+ investment concepts (P/E, diversification, compound interest) from experience. Has cancelled at least 1 unnecessary subscription. Logs expenses regularly to fuel his simulator portfolio.

#### Thomas (Education-Buyer / Monetization Persona)

| Metric | Day 7 | Day 30 | Day 90 | Why It Matters |
|--------|--------|--------|--------|----------------|
| Family plan conversion | — | 30% of Thomas-archetype users subscribed | 50% retained at full price | Thomas is the primary revenue driver — his conversion IS the business model |
| Weekly dashboard engagement | 1+ visit/week | 1+ visit/week (sustained) | 1+ visit/week with interaction | Thomas must engage weekly, not monthly — otherwise it's an email, not a product |
| Family challenge participation | — | 1+ challenge created or accepted | Regular participant (2+/month) | Challenges transform Thomas from spectator to active user |
| "Challenge the Parent" quiz completion | 1+ quiz taken | 3+ quizzes completed | Competing with Sofia regularly | The quiz is Thomas's personal engagement hook |
| Learning milestone reactions | 1+ reaction to Sofia's achievement | Regular reactions (weekly) | Initiating conversations about finances | Proxy for "is ProsperPals enabling family financial conversations?" |
| Co-present session frequency | — | 1+ session where Thomas and Sofia are both active | Regular co-present sessions | The dinner table moment — Thomas's retention depends on shared experiences |

**Thomas at-risk signals:** Opened app once but family dashboard was empty (Sofia hasn't shared) · Never returned after seeing demo preview · Subscribed but never engaged with family features after week 1

**Thomas success definition (Month 3):** Sofia explained a financial concept she learned from ProsperPals to Thomas. Thomas has an active subscription he considers worth the money. Has participated in at least 1 family challenge.

### Launch OKRs (Denmark MVP — First 90 Days)

**Objective 1: Validate the Core Loop**
- KR1: 500+ registered users in Denmark (organic + targeted marketing)
- KR2: 40% day-7 retention across all archetypes
- KR3: 25% of week-1 users complete ≥3 full core loops (Log→Earn→Invest→Learn)
- KR4: Median time-to-first-investment < 3 minutes from signup

**Objective 2: Prove the Dual Companion Model**
- KR1: >80% of users who reach Goldie-to-Fin handoff continue into the simulator
- KR2: <10% report confusion about "who they're talking to" in post-session surveys
- KR3: Fin sophistication level auto-adjusts for >60% of users by day 14 (beginner→intermediate)
- KR4: Users who experience the handoff retain at higher rates than those who don't

**Objective 3: Validate Revenue Model**
- KR1: 30%+ of Thomas-archetype users convert to family plan within 30 days
- KR2: Family plan monthly churn < 8%
- KR3: 10%+ of Sofia/Marcus users hit the premium gate (advanced Fin tracks) by week 3
- KR4: 5%+ of Sofia/Marcus convert to direct premium by day 60

**Objective 4: Prove Denmark-Specific Hypotheses**
- KR1: All 3 archetypes appear in real usage (no single archetype >70%)
- KR2: Sprint 1 users (manual entry) retain at 20%+ by day 30 (product has value without auto-import)
- KR3: Users check portfolio performance 3+x/week (investment education hook works)
- KR4: Receipt scanning accuracy >85% for Danish receipts (Netto, Føtex, Rema 1000)

### Revenue Metrics

| Metric | Month 1 | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|---------|----------|
| Registered users | 500 | 2,000 | 5,000 | 15,000 |
| WAU (Weekly Active Users) | 200 (40%) | 600 (30%) | 1,500 (30%) | 4,500 (30%) |
| Family plan subscribers | 10 | 60 | 200 | 800 |
| Direct premium subscribers | 5 | 40 | 150 | 600 |
| MRR (Monthly Recurring Revenue) | €150 | €1,200 | €4,250 | €17,000 |
| Blended ARPU (paying users) | €10 | €12 | €12.14 | €12.14 |

*Revenue assumptions: Family plan €15/month, Direct premium €10/month. Conservative conversion rates. No B2B2C or ProsperCoin marketplace revenue in Year 1.*

### Anti-Metrics (What We Explicitly Do NOT Optimize For)

These metrics, if optimized, would corrupt the product's mission:

1. **Total transactions logged** — Optimizing for volume incentivizes spam entries and undermines data quality. Optimize for *accuracy and consistency* instead.
2. **Daily Active Users (undifferentiated)** — Different personas have different healthy cadences. Thomas visiting weekly is success; forcing daily engagement is manipulation. Optimize for *persona-appropriate engagement frequency*.
3. **Time in app** — Long sessions may indicate confusion, not engagement. Optimize for *value delivered per session* (insight received, lesson learned, investment made).
4. **ProsperCoin total supply** — Inflating coin supply to make users "feel rich" destroys the economy. Optimize for *coin velocity* (earned → invested → learned from).
5. **Notification open rate** — High open rates achieved through anxiety-inducing or misleading notifications violate the financial wellness mission. Optimize for *notification-to-action rate* on genuinely helpful nudges.

### Measurement Infrastructure (MVP Requirements)

- **Event tracking:** Every core loop step (log, earn, invest, learn) tracked as discrete events with timestamps
- **Archetype tagging:** Onboarding segmentation answer persists as user attribute for all analytics
- **Cohort analysis:** Weekly cohorts from launch, segmented by archetype and acquisition channel
- **Funnel visualization:** Onboarding → First expense → First coin → First investment → Day 7 return → Day 30 active
- **A/B testing framework:** Needed by Sprint 2 for gamification intensity, Fin sophistication levels, and onboarding flow variants
- **Qualitative feedback loop:** In-app "How's it going?" prompt at day 3 and day 14 (NPS + open text). Post-churn survey for users who don't return after day 7.

### Pre-mortem: How These Metrics Could Lie

*Applied to stress-test the metrics framework:*

1. **High onboarding completion but low day-7 retention** → The 80-second loop is entertaining but not useful. Users complete it as a novelty, never return. **Response:** Track "reason for return" on day-2 visit — was it push notification, portfolio check, or organic?

2. **High simulator engagement but low expense logging** → Marcus-types love the game but never connect it to real finances. ProsperPals becomes a stock simulator, not a financial wellness tool. **Response:** WACLC (full loop metric) catches this — simulator-only engagement doesn't count as a loop completion.

3. **Thomas converts but Sofia churns** → Thomas pays because of the *promise*, not Sofia's actual engagement. Revenue looks good short-term but Thomas cancels when he realizes Sofia stopped using it. **Response:** Track "Sofia activity at time of Thomas conversion" — if Sofia is inactive when Thomas subscribes, flag for churn risk.

4. **Receipt scanning accuracy high in testing, low in production** → Training data was clean; real Danish receipts are crumpled, partial, in weird lighting. **Response:** Track real-world OCR confidence scores, not just accuracy on test sets. Auto-fallback to conversational entry when confidence < 70%.

5. **Streak metrics look great but mask "zombie users"** — Users log minimum entries to maintain streak but never engage with insights or simulator. **Response:** Distinguish "streak-maintaining" from "actively learning" users. Core loop completion is the real metric, not streak length.

### Comparative Benchmarks

| Metric | Industry Average (Fintech) | Duolingo (Gamified Ed) | ProsperPals Target | Rationale |
|--------|---------------------------|------------------------|-------------------|-----------|
| Day-1 retention | 25-30% | 45% | 50% | 80-sec onboarding + immediate portfolio = strong hook |
| Day-7 retention | 12-15% | 30% | 35% | Core loop + streaks + portfolio check = daily return reasons |
| Day-30 retention | 6-8% | 15% | 20% | Insight interrupts + Fin curriculum = sustained value |
| Free-to-paid conversion | 2-5% | 7% | 8% (combined family + premium) | Family plan is novel monetization lever |
| Monthly churn (paid) | 5-8% | 4% | 6% | Conservative — novel product, expect some early experimentation churn |
| NPS | 30-40 | 60+ | 45+ | Target: above fintech average, below Duolingo (they've had years to optimize) |

*Duolingo benchmarks used because ProsperPals is closer to gamified education than traditional fintech in engagement model.*
