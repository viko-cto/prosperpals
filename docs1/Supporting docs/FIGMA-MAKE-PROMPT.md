# ProsperPals — Figma Make Prompt
> Use this prompt in Figma Make to generate the UI/UX prototype
> Created: February 10, 2026

---

## 🎯 Master Prompt (Copy This)

```
Design a modern financial wellness app called "ProsperPals" with a Slack-inspired layout. The app has two AI companions: Goldie (warm, encouraging, gold accents) for daily budgeting and Fin (analytical, trustworthy, blue accents) for investing education.

LAYOUT STRUCTURE:
- Left sidebar (240px, dark gray #1a1a2e) with navigation
- Main content area with 60/40 split: chat interface (left) and live preview panel (right)
- Soft gradients, rounded corners (12px), subtle shadows
- Font: Inter or similar clean sans-serif

NAVIGATION SIDEBAR:
- Logo "ProsperPals" with sparkle icon at top
- Section: COMPANIONS
  - Goldie (gold coin emoji, warm glow indicator)
  - Fin (chart emoji, blue glow indicator)
- Section: WORKSPACES
  - Budget Central (money bag icon)
  - Learning Hub (book icon)
  - Virtual Portfolio (game controller icon)
  - Goals & Milestones (target icon)
  - Family Space (family icon)
- Section: DASHBOARDS
  - Net Worth (trending up icon)
  - Spending Insights (pie chart icon)
  - Subscriptions (refresh icon)
- Section: INTEGRATIONS
  - Banks (3 connected badge)
  - Google Calendar
  - Add Integration button
- Settings at bottom

COLOR PALETTE:
- Background: #0f0f1a (dark mode) or #f8f9fa (light mode)
- Goldie accent: #FFD700 (gold) with warm orange gradients
- Fin accent: #4A90D9 (trustworthy blue) with cool gradients
- Success: #10B981 (green)
- Warning: #F59E0B (amber)
- Text: #FFFFFF on dark, #1a1a2e on light

DESIGN 10 SCREENS:
1. Onboarding welcome with Goldie and Fin introduction
2. Budget Central workspace with spending donut chart
3. Chat interface with Goldie showing budget advice
4. Chat interface with Fin explaining index funds
5. Learning Hub with micro-lesson cards
6. Virtual Portfolio dashboard with mock holdings
7. Goals screen with progress bars and confetti
8. Family Space with multiple profiles
9. Subscriptions dashboard showing all recurring charges
10. Settings with bank connections and integrations

STYLE NOTES:
- Use glassmorphism for cards (backdrop blur, subtle transparency)
- Companion avatars: Goldie = friendly gold coin character, Fin = wise blue fish/dolphin character
- Progress bars with gradient fills
- Micro-interactions feel: floating action buttons, smooth transitions
- Gamification: visible badges, streaks, achievement popups
- Mobile-first but show desktop layouts too
```

---

## 📱 Individual Screen Prompts

### Screen 1: Onboarding Welcome

```
Design an onboarding welcome screen for ProsperPals financial app.

CENTER: Two friendly AI companion characters side by side
- Left: Goldie - a warm, glowing gold coin character with a friendly smile, emanating golden sparkles
- Right: Fin - a wise, approachable blue fish/dolphin character with glasses, emanating blue wisdom particles

BELOW: Welcome text
"Meet Your Financial Companions"
"Goldie helps with daily budgeting. Fin teaches you to invest."

BOTTOM: Two buttons
- "Start with Goldie" (gold gradient button)
- "Start with Fin" (blue gradient button)

BACKGROUND: Dark gradient (#0f0f1a to #1a1a2e) with subtle constellation pattern

STYLE: Warm, inviting, playful but professional. The characters should feel like helpful friends, not corporate mascots.
```

---

### Screen 2: Budget Central Workspace

```
Design a Budget Central workspace screen with Slack-like layout.

LEFT SIDEBAR (dark, 240px):
- ProsperPals logo
- Navigation with "Budget Central" highlighted (gold accent)
- Other nav items grayed out

MAIN AREA (60% width):
Chat interface with Goldie
- Goldie's avatar (small gold coin character)
- Message bubble: "Good morning! 🌅 You've spent €127 this week — €23 under budget! Want to sweep the extra to your summer trip fund?"
- User response input at bottom

RIGHT PANEL (40% width):
Budget Overview Card with glassmorphism effect:
- "February Budget" header
- Circular progress chart showing 65% spent
- "€1,850 / €2,800" text
- Category breakdown list:
  - 🍕 Food: €420 (green, under)
  - 🚗 Transport: €180 (yellow, close)
  - 🛍️ Shopping: €350 (red, over)
  - 📱 Subscriptions: €89 (green)

BOTTOM: Quick action buttons
- "View all transactions"
- "Adjust budget"
- "Set aside money"

COLORS: Dark theme with gold accent highlights for Goldie-related elements
```

---

### Screen 3: Chat with Goldie

```
Design a conversational chat interface with Goldie AI companion.

LEFT: Navigation sidebar (collapsed state, icons only, 64px)

MAIN CHAT AREA:
Thread showing conversation:

GOLDIE: "I noticed a €45 charge at H&M. Want me to categorize this?"
[Inline buttons: "Clothing" "Shopping" "Other"]

USER: Selected "Clothing"

GOLDIE: "Got it! 👕 Your clothing budget is at €120/€150 this month. You're doing great!"

GOLDIE: "Quick tip: There's a sale season coming next week. Want me to remind you to wait?"
[Inline buttons: "Yes, remind me" "No thanks"]

USER: "Yes, remind me"

GOLDIE: "Done! I'll ping you on Friday. In the meantime, here's what €45 could become if invested for 10 years... 💡"
[Shows mini compound growth visualization: €45 → €87]

MESSAGE INPUT:
- Text field with placeholder "Ask Goldie anything..."
- Attachment icon (receipt scanning)
- Voice input icon

RIGHT PANEL:
Quick Stats Card:
- "Today's spending: €67"
- "Weekly average: €182"
- "Next bill: Netflix (Feb 15)"

DESIGN: Warm, encouraging tone. Message bubbles have soft rounded corners. Goldie's messages have subtle gold glow. Interactive elements are clearly tappable.
```

---

### Screen 4: Chat with Fin (Investing Education)

```
Design a conversational chat interface with Fin AI companion for investing education.

MAIN CHAT AREA:
Thread showing educational conversation:

FIN: "Welcome to your first investing lesson! 📊 Let's start simple: Do you know what an index fund is?"
[Inline buttons: "Yes, explain anyway" "No, teach me" "Skip to advanced"]

USER: "No, teach me"

FIN: "Perfect! Think of an index fund like a basket of fruits 🍎🍊🍋..."
[Rich card with animated illustration showing basket metaphor]

FIN: "Instead of buying one apple (stock), you buy the whole basket. If one fruit goes bad, others are still fresh. That's diversification!"

FIN: "Quick quiz: Why is a basket safer than a single fruit?"
[Multiple choice: A) More vitamins B) Less risk if one goes bad C) Tastes better]

USER: Selected B

FIN: "🎯 Exactly! You're getting it. Ready to see how this works with real numbers?"
[Button: "Show me the math" with blue gradient]

RIGHT PANEL:
Progress Card:
- "Investing 101" module
- Progress bar: 15% complete
- Estimated time: 8 min remaining
- Badge preview: "📊 Index Fund Graduate"

DESIGN: Cool blue tones for Fin. Educational content uses clear visual metaphors. Interactive quiz elements. Professional but approachable.
```

---

### Screen 5: Learning Hub

```
Design a Learning Hub workspace showing micro-lesson cards.

LEFT SIDEBAR: Navigation with "Learning Hub" highlighted (blue accent)

MAIN AREA:
Header: "Learning Hub 📚"
Subtitle: "Master your finances, one lesson at a time"

PROGRESS OVERVIEW:
Horizontal card showing:
- 🔥 7-day streak
- 12 lessons completed
- 3 badges earned
- Next milestone: "Complete 5 more for Investment Beginner badge"

LESSON TRACKS (horizontal scrolling rows):

Track 1: "Budgeting Basics" ✅ (completed, green check)
- 6 lessons, 100% complete

Track 2: "Investing 101" 🔵 (in progress)
- Cards showing lessons:
  1. "What are stocks?" ✅ (3 min, completed)
  2. "Index funds explained" ✅ (5 min, completed)  
  3. "Risk vs Reward" 🔵 (4 min, current - highlighted)
  4. "Building your first portfolio" 🔒 (locked)
  5. "When to buy/sell" 🔒 (locked)

Track 3: "Advanced Strategies" 🔒 (locked)
- Grayed out with lock icons
- "Complete Investing 101 to unlock"

FEATURED LESSON (large card):
"This week's featured: Compound Interest Magic ✨"
- Thumbnail showing growth curve
- "4 min read"
- "Taught by Fin"
- Start button

DESIGN: Card-based layout with progress indicators. Gamification visible (streaks, badges). Clear visual hierarchy. Locked content creates motivation.
```

---

### Screen 6: Virtual Portfolio Dashboard

```
Design a Virtual Portfolio workspace for paper trading practice.

LEFT SIDEBAR: Navigation with "Virtual Portfolio" highlighted (game controller icon, purple accent)

MAIN AREA:

HEADER:
"Your Virtual Portfolio 🎮"
"Practice investing with €10,000 play money"

PORTFOLIO SUMMARY (large card):
- Total Value: €10,847.32 (+8.47%)
- Starting: €10,000
- Profit/Loss: +€847.32 (green with up arrow)
- Line chart showing 30-day performance

HOLDINGS TABLE:
| Holding | Shares | Avg Cost | Current | P/L |
|---------|--------|----------|---------|-----|
| 🍎 AAPL | 5 | €178 | €192 | +€70 🟢 |
| 📊 VOO (S&P 500) | 10 | €420 | €445 | +€250 🟢 |
| 🚗 TSLA | 2 | €245 | €210 | -€70 🔴 |
| 💰 Cash | - | - | €3,200 | - |

QUICK ACTIONS:
- "Buy Stock" button (green)
- "Sell Stock" button (red)
- "Research" button (blue)

RIGHT PANEL:
"What would have happened?" card:
- "If this were real money..."
- "You'd have made €847 in 30 days"
- "That's 8.5% return vs 2.1% savings account"

Leaderboard preview:
- "Friends Leaderboard 🏆"
- Your rank: #3 of 12
- Top: Sarah (+12.3%)

FIN INSIGHT (bottom):
Fin avatar with message: "Your tech allocation is 45%. Consider diversifying into other sectors. Want to learn about sector rotation?"

DESIGN: Game-like feel with leaderboards and achievements. Clear profit/loss indicators. Educational tie-ins from Fin.
```

---

### Screen 7: Goals & Milestones

```
Design a Goals & Milestones screen with celebration elements.

LEFT SIDEBAR: Navigation with "Goals" highlighted (target icon, gold accent)

MAIN AREA:

HEADER:
"Your Goals 🎯"
Goldie avatar: "You're crushing it! 3 goals in progress."

ACTIVE GOALS (cards):

Goal 1: "Summer Trip to Greece 🏖️"
- Progress bar: 75% (€1,500 / €2,000)
- Monthly contribution: €200
- Target date: June 2026
- Goldie note: "On track! You'll reach this by May if you keep going!"
- [Add money] [Adjust goal] buttons

Goal 2: "Emergency Fund 🛡️"
- Progress bar: 50% (€3,000 / €6,000)
- Milestone celebration: "🎉 Just hit 3 months covered!"
- Confetti animation indicator
- Fin note: "Great foundation! After this, let's talk about growing your money."

Goal 3: "New Laptop 💻"
- Progress bar: 30% (€300 / €1,000)
- "Behind schedule" warning (yellow)
- Suggestion: "Add €50 more/month to hit your December target"

COMPLETED GOALS (collapsed section):
- "Paid off credit card ✅" (completed Jan 2026)
- "Built €500 buffer ✅" (completed Dec 2025)

CREATE NEW GOAL:
Floating action button with sparkle effect

RIGHT PANEL:
"Goal Projections" by Fin:
- Compound growth visualization
- "If you invested your emergency fund..."
- Interactive slider for time horizon

CELEBRATION MODAL (design as overlay):
- Confetti explosion
- "🎉 GOAL REACHED!"
- "You saved €2,000 for Greece!"
- Share buttons (optional)
- "What's next?" CTA

DESIGN: Celebratory feel with progress visualizations. Mix of Goldie (encouragement) and Fin (projections). Gamification with milestones.
```

---

### Screen 8: Family Space

```
Design a Family Space workspace for household financial management.

LEFT SIDEBAR: Navigation with "Family Space" highlighted (family icon)

MAIN AREA:

HEADER:
"Family Space 👨‍👩‍👧"
"Managing finances together"

FAMILY MEMBERS (horizontal scroll):
- Avatar 1: "Vadim" (Admin badge) - €1,200 this month
- Avatar 2: "Ani" (Admin badge) - €890 this month  
- Avatar 3: "Nikolas" (Teen mode) - €45 allowance left
- [+ Add family member] card

SHARED DASHBOARD:
"Household Overview"
- Combined spending: €2,135 / €4,000 budget
- Shared goals progress
- Upcoming shared bills

SHARED GOALS:
- "Family Vacation 2026" - €3,400 / €5,000 (68%)
  - Vadim contributed: €2,000
  - Ani contributed: €1,400
- "Home Renovation" - €800 / €10,000 (8%)

INDIVIDUAL VIEWS (tabs):
[Shared] [Vadim's View] [Ani's View] [Kids]

KIDS CORNER (when Kids tab selected):
- Simplified, colorful UI
- Nikolas's allowance tracker
- Savings jar visualization
- Simple goals: "New video game" - €30/€60
- Goldie kid-friendly messages

MONEY TALKS (card):
"Weekly family finance discussion topics"
- "Should we increase the vacation budget?"
- "Nikolas wants to save for a bike"
[Start family chat] button

DESIGN: Multiple user perspectives. Kid-friendly mode with playful elements. Clear contribution tracking. Privacy-respecting individual views.
```

---

### Screen 9: Subscriptions Dashboard

```
Design a Subscriptions management dashboard.

LEFT SIDEBAR: Navigation with "Subscriptions" highlighted (refresh icon)

MAIN AREA:

HEADER:
"Subscriptions Dashboard 🔄"
Goldie: "I found 12 recurring charges. Let's review them!"

SUMMARY CARDS (top row):
- Total Monthly: €127.45
- Total Yearly: €1,529.40
- "Forgotten" alerts: 2 ⚠️
- Potential savings: €34/month

SUBSCRIPTION LIST:
Grouped by category with visual cards:

STREAMING (€45.97/mo):
- Netflix €15.99 [Keep] [Cancel]
- Spotify €9.99 [Keep] [Cancel]
- Disney+ €8.99 [Keep] [Cancel]
- HBO Max €10.99 ⚠️ "Used 0 times last month" [Keep] [Cancel]

PRODUCTIVITY (€32.99/mo):
- Notion €8 [Keep] [Cancel]
- Figma €15 [Keep] [Cancel]
- 1Password €4.99 [Keep] [Cancel]
- Grammarly €4.99 ⚠️ "Duplicate with Notion AI?" [Keep] [Cancel]

HEALTH & FITNESS (€24.99/mo):
- Gym membership €24.99 [Keep] [Cancel]

OTHER (€23.50/mo):
- iCloud €2.99 [Keep] [Cancel]
- App subscriptions €20.51 [See details]

INSIGHTS PANEL (right):
"Subscription Health Check"
- Pie chart of spending by category
- Year-over-year comparison
- "You're spending 15% more on subscriptions vs last year"

GOLDIE RECOMMENDATION:
"Cancel HBO Max and save €132/year? You haven't used it since October."
[Yes, cancel] [Keep for now] [Remind me later]

DESIGN: Clean list view with clear action buttons. Warning indicators for unused subscriptions. Easy cancel flows. Monthly/yearly toggle.
```

---

### Screen 10: Settings & Integrations

```
Design a Settings screen focusing on bank connections and integrations.

LEFT SIDEBAR: Settings highlighted (gear icon)

MAIN AREA:

HEADER:
"Settings ⚙️"

TABS: [Profile] [Connected Accounts] [Integrations] [Privacy] [Notifications]

CONNECTED ACCOUNTS TAB (selected):

Bank Connections:
"Your linked bank accounts"

Connected:
- 🏦 Nordea (checking) - Connected ✅
  - Last sync: 2 min ago
  - [Refresh] [Disconnect]
  
- 🏦 Danske Bank (savings) - Connected ✅
  - Last sync: 5 min ago
  - [Refresh] [Disconnect]

- 💳 Revolut - Connected ✅
  - Last sync: 1 hour ago
  - [Refresh] [Disconnect]

[+ Connect another bank] button
Powered by Tink - bank-level security badge

---

INTEGRATIONS TAB:

Connected:
- 📅 Google Calendar ✅
  - Syncing bill reminders
  - [Configure] [Disconnect]

Available:
- 📧 Email (Gmail) 
  - "Scan receipts and detect subscriptions"
  - [Connect]
  
- 📱 Apple Health
  - "Correlate spending with wellness"
  - [Connect]
  
- 💬 Slack
  - "Get goal celebration notifications"
  - [Connect]

- 🏠 Smart Home
  - "Track utility costs"
  - [Connect]

Coming Soon (grayed):
- Investment brokers (Nordnet, Saxo)
- Crypto wallets

---

PRIVACY SECTION:
- "Your data stays in the EU" badge
- "We never sell your data" badge
- Download my data button
- Delete account (with warning)

DESIGN: Clean settings layout. Security badges visible. Easy connect/disconnect flows. Privacy-forward messaging.
```

---

## 🎨 Design System Reference

### Typography
```
Headings: Inter Bold
- H1: 32px
- H2: 24px
- H3: 18px

Body: Inter Regular, 16px
Caption: Inter Medium, 14px
```

### Spacing
```
Base unit: 4px
Common spacings: 8, 12, 16, 24, 32, 48
Card padding: 24px
Sidebar width: 240px (expanded), 64px (collapsed)
```

### Border Radius
```
Buttons: 8px
Cards: 12px
Avatars: 50%
Input fields: 8px
```

### Shadows
```
Card: 0 4px 12px rgba(0,0,0,0.1)
Modal: 0 8px 32px rgba(0,0,0,0.2)
Hover: 0 8px 24px rgba(0,0,0,0.15)
```

### Companion Colors
```
Goldie:
- Primary: #FFD700
- Gradient: linear-gradient(135deg, #FFD700, #FFA500)
- Glow: rgba(255, 215, 0, 0.3)

Fin:
- Primary: #4A90D9
- Gradient: linear-gradient(135deg, #4A90D9, #2563EB)
- Glow: rgba(74, 144, 217, 0.3)
```

---

## 📤 Export Instructions

After generating in Figma Make:

1. **Review all 10 screens** for consistency
2. **Add interactions** (button hovers, transitions)
3. **Create mobile variants** (375px width)
4. **Export as prototype** for stakeholder review
5. **Share link** with team for feedback

---

*Created: February 10, 2026*
*For: ProsperPals MVP Sprint*
