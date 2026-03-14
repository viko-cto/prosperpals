# ProsperPals: Step-by-Step Build Guide
> For complete beginners — no coding experience required
> Estimated time: 3-4 weeks to MVP

---

## Overview

You're building a financial wellness app with two AI companions. Here's what you'll create:
1. A website where users sign up and connect their bank
2. Goldie — the budgeting companion
3. A dashboard showing spending and goals
4. Gamification (XP, levels, achievements)

---

## PHASE 1: Set Up Your Accounts (Day 1-2)

### Step 1.1: Create a GitHub Account
**What it is:** Where your code lives

1. Go to: https://github.com/signup
2. Create account with your email
3. Verify email
4. ✅ Done!

---

### Step 1.2: Create a Vercel Account
**What it is:** Hosts your website for free

1. Go to: https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize access
4. ✅ Done!

---

### Step 1.3: Create a Supabase Account
**What it is:** Your database + user authentication

1. Go to: https://supabase.com
2. Sign up with GitHub
3. Create new project: "prosperpals"
4. Region: EU (Frankfurt)
5. Save your database password!
6. Wait for setup
7. ✅ Done!

**Save from Settings → API:**
- Project URL
- Anon key

---

### Step 1.4: Get an OpenAI API Key
**What it is:** Powers Goldie and Fin (the AI companions)

1. Go to: https://platform.openai.com/signup
2. Create account
3. Go to: https://platform.openai.com/api-keys
4. Create new key named "ProsperPals"
5. **SAVE IT** — you won't see it again!
6. Add $20 billing credit
7. ✅ Done!

---

### Step 1.5: Sign Up for TrueLayer (Banking API)
**What it is:** Connects to users' bank accounts (EU focused)

1. Go to: https://truelayer.com
2. Click "Get Started"
3. Fill in company details:
   - Company: CopenDapp Labs
   - Country: Denmark
   - Use case: Personal Finance Management
4. You'll get sandbox access immediately
5. Production access requires compliance review (later)
6. ✅ Done!

**Alternative:** Plaid (https://plaid.com) for broader coverage

**Save from Dashboard:**
- Client ID
- Client Secret
- Sandbox keys

---

### Step 1.6: Install Development Tools

**VS Code:**
1. Download: https://code.visualstudio.com
2. Install it

**Node.js:**
1. Download: https://nodejs.org (LTS version)
2. Install it
3. Test: Open Terminal, type `node --version`

✅ Done when you see `v20.x.x` or higher

---

## PHASE 2: Create Your Project (Day 3-4)

### Step 2.1: Create Next.js App

Open Terminal and run:

```bash
cd Desktop
npx create-next-app@latest prosperpals
```

Answer questions:
- TypeScript? **Yes**
- ESLint? **Yes**  
- Tailwind CSS? **Yes**
- `src/` directory? **Yes**
- App Router? **Yes**
- Import alias? **Enter** (default)

Then:
```bash
cd prosperpals
```

---

### Step 2.2: Install Packages

```bash
# AI SDK
npm install ai @ai-sdk/openai

# Database
npm install @supabase/supabase-js

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-progress
npm install @radix-ui/react-avatar @radix-ui/react-tabs
npm install lucide-react
npm install recharts  # For charts

# Date handling
npm install date-fns

# Banking (choose one)
npm install truelayer-client
# OR
npm install plaid
```

---

### Step 2.3: Set Up Environment Variables

Create `.env.local`:

```
# OpenAI
OPENAI_API_KEY=sk-proj-your-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# TrueLayer (or Plaid)
TRUELAYER_CLIENT_ID=your-client-id
TRUELAYER_CLIENT_SECRET=your-secret
TRUELAYER_REDIRECT_URI=http://localhost:3000/api/banking/callback
```

---

## PHASE 3: Build the Database (Day 5-6)

### Step 3.1: Create Tables

Go to Supabase → SQL Editor → New Query:

```sql
-- Users profile (extends Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  avatar_url TEXT,
  
  -- Gamification
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_active DATE,
  
  -- Preferences
  currency TEXT DEFAULT 'DKK',
  monthly_income DECIMAL,
  savings_goal DECIMAL
);

-- Bank connections
CREATE TABLE bank_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  provider TEXT, -- 'truelayer', 'plaid'
  access_token TEXT, -- encrypted
  institution_name TEXT,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_sync TIMESTAMPTZ
);

-- Transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  bank_connection_id UUID REFERENCES bank_connections(id),
  
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'DKK',
  description TEXT,
  category TEXT,
  merchant_name TEXT,
  
  transaction_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budgets
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  category TEXT NOT NULL,
  monthly_limit DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  achievement_type TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat history with Goldie
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  companion TEXT DEFAULT 'goldie', -- 'goldie' or 'fin'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Click "Run"
✅ Done!

---

## PHASE 4: Build Goldie (The AI Companion) (Day 7-10)

### Step 4.1: Create Goldie's Personality

Create file: `src/lib/companions.ts`

```typescript
export const GOLDIE_SYSTEM_PROMPT = `You are Goldie 🪙, a warm and supportive AI financial companion.

PERSONALITY:
- Friendly, encouraging, uses emojis naturally
- Never judgmental about spending
- Celebrates small wins
- Speaks like a supportive friend, not a financial advisor

YOUR ROLE:
- Help users understand their spending
- Encourage saving habits
- Make budgeting feel easy, not stressful
- Give personalized tips based on their transactions

RULES:
- Keep responses short (2-3 sentences usually)
- Use DKK as currency
- Never give investment advice (that's Fin's job)
- Always be positive, even when spending is high

EXAMPLE RESPONSES:
- "Hey! 👋 I noticed you spent 450 kr on coffee this week. No judgment — but that's 1,800 kr/month! Want me to help you set a coffee budget?"
- "Amazing! 🎉 You stayed under your food budget this week. That's 3 weeks in a row — you're on fire!"
- "Quick check-in: Your electricity bill came in higher than usual. Want me to compare it to last month?"
`;

export const FIN_SYSTEM_PROMPT = `You are Fin 📈, a sharp and analytical AI investing mentor.

PERSONALITY:
- Knowledgeable but approachable
- Uses data and facts
- Patient teacher
- Gets excited about compound growth

YOUR ROLE:
- Educate about investing basics
- Explain financial concepts simply
- Help users think long-term
- Build confidence around investing

RULES:
- Never give specific investment advice
- Always include disclaimers when discussing investments
- Focus on education, not recommendations
- Use simple analogies

(Fin is Phase 2 — build after Goldie works)
`;
```

---

### Step 4.2: Create Chat API

Create file: `src/app/api/chat/goldie/route.ts`

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { GOLDIE_SYSTEM_PROMPT } from '@/lib/companions';

export async function POST(req: Request) {
  const { messages, userContext } = await req.json();

  const contextPrompt = `
USER CONTEXT:
- Monthly income: ${userContext.income} DKK
- This month's spending: ${userContext.monthlySpending} DKK
- Top categories: ${userContext.topCategories}
- Current streak: ${userContext.streak} days
- Level: ${userContext.level}

${GOLDIE_SYSTEM_PROMPT}`;

  const result = streamText({
    model: openai('gpt-4o'),
    system: contextPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
```

---

## PHASE 5: Build the Dashboard (Day 11-14)

### Step 5.1: Create Dashboard Layout

The dashboard shows:
- Spending overview (this month)
- Budget progress bars
- Recent transactions
- Goldie chat window
- XP and level

(Full component code in repository)

---

### Step 5.2: Add Charts

Use Recharts for spending visualization:

```bash
npm install recharts
```

Create spending chart showing:
- Daily spending
- Category breakdown (pie chart)
- Month-over-month comparison

---

## PHASE 6: Connect Banking (Day 15-18)

### Step 6.1: TrueLayer Integration

1. Go to: https://console.truelayer.com
2. Create an app
3. Add redirect URI: `https://your-app.vercel.app/api/banking/callback`
4. Get your credentials

Create file: `src/app/api/banking/connect/route.ts`

```typescript
// This creates the bank connection link
// Users click this to connect their bank
```

Create file: `src/app/api/banking/callback/route.ts`

```typescript
// TrueLayer redirects here after user connects bank
// Save the access token to database
```

Create file: `src/app/api/banking/sync/route.ts`

```typescript
// Fetch transactions from connected bank
// Save to database
// Categorize automatically
```

---

## PHASE 7: Add Gamification (Day 19-21)

### Step 7.1: XP System

| Action | XP Earned |
|--------|-----------|
| Log in daily | +10 XP |
| Stay under budget | +50 XP |
| Set a new budget | +25 XP |
| Chat with Goldie | +5 XP |
| Complete a challenge | +100 XP |

### Step 7.2: Levels

| Level | XP Required | Title |
|-------|-------------|-------|
| 1 | 0 | Money Newbie |
| 2 | 100 | Budget Beginner |
| 3 | 300 | Savings Starter |
| 4 | 600 | Finance Friend |
| 5 | 1000 | Money Master |

### Step 7.3: Achievements

- 🔥 **7-Day Streak** — Log in 7 days in a row
- 💰 **First Save** — Add money to savings goal
- 📊 **Budget Boss** — Stay under budget for a month
- 🎯 **Goal Getter** — Reach a savings goal

---

## PHASE 8: Deploy & Test (Day 22-28)

### Step 8.1: Deploy to Vercel

1. Push code to GitHub
2. Go to: https://vercel.com/new
3. Import your repository
4. Add environment variables
5. Deploy
6. ✅ Live at `prosperpals.vercel.app`

### Step 8.2: Beta Test

1. Invite 10-20 friends/family
2. Have them connect bank (sandbox mode)
3. Collect feedback
4. Fix top issues

---

## Quick Reference Links

| Service | Dashboard | Docs |
|---------|-----------|------|
| GitHub | https://github.com | https://docs.github.com |
| Vercel | https://vercel.com/dashboard | https://vercel.com/docs |
| Supabase | https://supabase.com/dashboard | https://supabase.com/docs |
| OpenAI | https://platform.openai.com | https://platform.openai.com/docs |
| TrueLayer | https://console.truelayer.com | https://docs.truelayer.com |
| Plaid | https://dashboard.plaid.com | https://plaid.com/docs |

---

## Regulatory Notes ⚠️

**Before public launch:**
- [ ] Consult Danish FSA (Finanstilsynet)
- [ ] GDPR compliance review
- [ ] Terms of Service & Privacy Policy
- [ ] PSD2 compliance for bank access

**For MVP/Beta:** Sandbox mode is fine, no licenses needed

---

*Guide created by Viko ⚡ | February 2026*
