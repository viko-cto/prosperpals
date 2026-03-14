# ProsperPal Claude Code Setup Guide

## Step 1: Initial Project Setup
First, paste this into Claude Code:

```
Create a Next.js 14 app with TypeScript, Tailwind CSS, and the app directory structure. Set up the following:

1. Clean the default Next.js template
2. Create a folder structure with:
   - app/ (for pages)
   - components/ (for reusable components)
   - lib/ (for utilities and configs)
   - hooks/ (for custom hooks)
   - types/ (for TypeScript types)
3. Install these dependencies:
   - @supabase/supabase-js @supabase/auth-helpers-nextjs
   - framer-motion lucide-react
   - @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-slot
   - sonner (for toast notifications)
   - recharts (for charts)
   - date-fns
4. Create a .env.local.example file with placeholders for Supabase
5. Set up a basic color scheme with blue and gold accents
```

## Step 2: Create Homepage
After the initial setup completes, paste:

```
Create a beautiful landing page at app/page.tsx with:

1. A hero section with glassmorphism effect (backdrop-blur, semi-transparent backgrounds)
2. Navigation bar with logo and "Get Started" button
3. The heading "Welcome to ProsperPal" with tagline "Turn your financial journey into an adventure"
4. Three feature cards showing:
   - "Earn ProsperCoins" - Reward for every budget entry
   - "Level Up" - Track progress with achievements
   - "Invest & Learn" - Virtual investment simulator
5. Dark gradient background (blue to purple)
6. Golden accent colors for highlights
7. Smooth animations using framer-motion
8. Mobile responsive design
9. Add a "Coming Soon" banner at the top
```

## Step 3: Set Up Supabase Configuration
Next, paste:

```
Create Supabase configuration:

1. Create lib/supabase/client.ts for client-side Supabase
2. Create lib/supabase/server.ts for server-side Supabase
3. Create types/supabase.ts with placeholder types
4. Add helpful comments explaining where to get Supabase URL and anon key
5. Create a middleware.ts file for auth protection
```

## Step 4: Create Authentication Pages
Then paste:

```
Create a complete authentication system:

1. app/auth/login/page.tsx - Login page with:
   - Email/password form
   - Google OAuth button  
   - "Remember me" checkbox
   - Link to signup
   - Glassmorphism card design
   - Form validation
   - Loading states

2. app/auth/signup/page.tsx - Signup page with:
   - Name, email, password fields
   - Password strength indicator
   - Terms acceptance checkbox
   - Google OAuth option
   - Link to login

3. app/auth/callback/route.ts - OAuth callback handler

4. components/auth/auth-form.tsx - Reusable auth form component

Use framer-motion for animations, lucide-react for icons, and glassmorphism design
```

## Step 5: Create Dashboard Layout
Paste this:

```
Create the main dashboard layout:

1. app/dashboard/layout.tsx with:
   - Bottom navigation for mobile (5 tabs: Home, Goals, Chat, Wallet, Profile)
   - Side navigation for desktop
   - User avatar and notification bell in header
   - Dark/light mode toggle
   - Glassmorphism effects
   - Active route highlighting

2. app/dashboard/page.tsx with placeholder cards for:
   - Total balance
   - ProsperCoins balance  
   - Current streak
   - Recent transactions
   - Quick actions

3. components/ui/bottom-nav.tsx - Mobile navigation component
4. components/ui/side-nav.tsx - Desktop navigation component

Use lucide-react icons and ensure responsive design
```

## Step 6: Database Schema Script
Create the database setup:

```
Create a file scripts/database-schema.sql with complete Supabase schema:

1. profiles table (extends auth.users)
2. user_stats table (points, coins, streaks, level)
3. achievements table 
4. user_achievements junction table
5. financial_accounts table
6. transactions table
7. financial_goals table
8. Row Level Security policies for all tables
9. Helper functions for common operations

Include helpful comments explaining each table's purpose
```

## Step 7: Create Basic Components
Build essential UI components:

```
Create these reusable components in components/ui/:

1. button.tsx - Primary, secondary, ghost variants with loading state
2. card.tsx - Glassmorphism card with hover effects
3. input.tsx - Styled input with error states
4. badge.tsx - For achievements and tags
5. progress.tsx - For goal tracking
6. avatar.tsx - User avatar component
7. toast.tsx - Notification toasts setup

All components should:
- Use Tailwind CSS
- Support dark mode
- Have TypeScript types
- Include hover/focus states
- Be accessibility compliant
```

## Step 8: ProsperCoins Display Component
Create the gamification display:

```
Create components/prosperity/coins-display.tsx:

1. Animated coin counter that increments smoothly
2. Golden coin icon (use lucide-react Circle icon styled gold)
3. Click animation when coins are earned
4. Mini "+10" animation when points are added
5. Glassmorphism background
6. TypeScript props for current amount and animation triggers
```

## Step 9: Git Setup
Initialize version control:

```
Set up Git for the project:

1. Create a comprehensive .gitignore file
2. Initialize git repository
3. Make initial commit with message "Initial ProsperPal setup"
4. Create a README.md with:
   - Project description
   - Setup instructions
   - Environment variables needed
   - Tech stack list
```

## Step 10: Development Scripts
Final setup step:

```
Update package.json with useful scripts:

1. "dev" - run development server
2. "build" - build for production
3. "start" - start production server
4. "lint" - run ESLint
5. "type-check" - TypeScript checking
6. "db:push" - push schema to Supabase (placeholder)
7. "db:generate-types" - generate TypeScript types from Supabase

Also add a proper project description and author
```

---

## How to Use These Prompts:

1. **Paste one prompt at a time** into Claude Code
2. **Wait for each to complete** before moving to the next
3. **Review the generated code** - Claude Code will show you what it's creating
4. **Test as you go** - Run `npm run dev` after Step 2 to see your site

## After All Steps Complete:

1. **Create Supabase Account**
   - Go to supabase.com
   - Create new project
   - Get your project URL and anon key
   - Add them to .env.local

2. **Run the Database Schema**
   - Copy the contents of scripts/database-schema.sql
   - Paste into Supabase SQL editor
   - Run it

3. **Connect to GitHub**
   ```bash
   git remote add origin https://github.com/copendapplabs/prosperpals.git
   git push -u origin main
   ```

4. **Deploy to Vercel**
   - Push will trigger auto-deployment
   - Add environment variables in Vercel dashboard

## Troubleshooting Tips:

- If Claude Code seems stuck, press Enter
- If you get errors, ask Claude Code to fix them: "Fix the error: [paste error]"
- If npm install fails, try: "run npm install with --legacy-peer-deps flag"
- If you want to see the file structure, ask: "show me the current file structure"

## Quick Commands for Claude Code:

- "Show me what files we've created so far"
- "Run the development server"
- "Install any missing dependencies"
- "Create a test user in the database"
- "Show me the current page in the browser"