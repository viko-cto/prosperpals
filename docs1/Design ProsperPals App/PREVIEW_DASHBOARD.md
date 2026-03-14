# Preview Dashboard - Sneak Peek Experience

## Overview
A mobile-first "sneak peek" screen showing what a user's financial life *could* look like with ProsperPals. This is shown **before sign-up** to create aspiration and desire.

## Access
Navigate to: `/preview`

## Design Philosophy
**"A Window Into A Better Financial Life"** - Show, don't tell. Let users visualize their future financial success.

---

## 🎨 Visual Design

### Color Palette (Warm & Aspirational)
- **Base:** Warm neutrals (#F5F3F0 → #F8F6F3 → #FAF8F5)
- **Soft Gold:** #D4AF37, #E5C68D, #C9B382
- **Muted Sage Green:** #A8D5BA (success, savings)
- **Supporting Colors:**
  - Peach: #E8B4A8
  - Sky Blue: #89B5D9
  - Lavender: #D4A5D4
  - Warm Orange: #F4A259
  - Butter Yellow: #F7D08A

### Typography
**Font Family:** Plus Jakarta Sans (rounded sans-serif)
- **Title:** 18px semibold
- **Body:** 15px regular
- **Numbers:** 24-32px bold
- **Small text:** 12px medium

### Glass Morphism Effect
- **Cards:** `bg-white/60 backdrop-blur-md border-white/80`
- **Shadows:** Soft, multi-layered: `0_8px_32px_rgba(0,0,0,0.06)`
- **Borders:** White with 80% opacity
- **Overlay:** Subtle frosted glass effect over entire screen

---

## 📊 Content Sections

### 1. Header (Top)

#### Goldie Character (Top-Left)
- **Size:** 64px circular coin
- **Gradient:** Gold (#E5C68D → #D4AF37 → #C9B382)
- **Border:** 3px cream border (#F0E5D0)
- **Shadow:** Gold glow `0_4px_20px_rgba(212,175,55,0.3)`
- **Animation:** Gentle wiggle every 5 seconds (rotate -5° to +5°)
- **Thumbs up emoji:** Positioned top-right of coin, scales in with spring animation

**Facial Features:**
- Eyes: Two small black dots (1.5px each)
- Smile: Curved bottom line (5px wide, 2.5px tall)

#### Savings Streak (Top-Right)
```
This Week
🔥 12 days
```
- **Badge:** Gradient orange background (#FFA500/20 → #FF6B35/20)
- **Border:** Orange tint (#FFA500/30)
- **Rounded:** Full (pill shape)
- **Animation:** Scales in with spring effect

---

### 2. Goldie's Message Card

**Content:**
> "You're doing great! Your savings are up 12% this week, and you're spending mindfully. Keep it up! 🌟"

**Design:**
- Glass card with frosted background
- Goldie avatar (40px coin) on left
- Name "Goldie" in semibold
- Message text in relaxed gray (#5C5850)
- 32px border-radius (very rounded)

**Animation:**
- Slides in from left (x: -20 → 0)
- 0.2s delay

---

### 3. Spending Overview Card

#### Top Stats
```
Total Spent        Saved
€758               32%
```

#### Spending Bubbles (Organic Layout)
**NOT a pie chart** - floating bubbles with organic positioning!

**6 Categories:**
1. **Groceries** 🛒 - €245 - Sage green (#A8D5BA) - 120px
2. **Coffee** ☕ - €67 - Warm orange (#F4A259) - 85px
3. **Transport** 🚇 - €89 - Sky blue (#89B5D9) - 95px
4. **Eating Out** 🍽️ - €134 - Peach (#E8B4A8) - 105px
5. **Entertainment** 🎬 - €45 - Lavender (#D4A5D4) - 75px
6. **Shopping** 👕 - €178 - Butter yellow (#F7D08A) - 110px

**Bubble Design:**
- Circular with emoji, category name, and amount
- Semi-transparent (90% opacity)
- Soft shadows
- Hover: Scale 1.1x
- Float animation: Up-down motion (staggered timing)

**Positioning:**
- Organic, non-overlapping layout
- Positioned absolutely within 320px × 256px container
- Largest bubbles toward center/bottom
- Smaller bubbles near top

**Legend (Below Bubbles):**
- Shows top 3 categories
- Small colored dot + category name
- Pills with frosted background

**Animation:**
- Each bubble scales in with spring animation
- Staggered delays (0.6s + index * 0.1s)
- Continuous float motion

---

### 4. Daily Spending Trend Card

#### Header
```
Daily Spending     🡅 Improving
```

#### Chart
**Simple line chart** showing 7 days:
- Mon: €45
- Tue: €52
- Wed: €38
- Thu: €61
- Fri: €55
- Sat: €72
- Sun: €48

**Visual Elements:**
- **Grid lines:** 3 horizontal lines (opacity 30%)
- **Area fill:** Gradient sage green (40% → 0% opacity)
- **Line:** 3px stroke, sage green (#A8D5BA), rounded caps
- **Dots:** 4px circles with white stroke, on each data point
- **Day labels:** Below chart in gray

**Animation:**
- Line draws from left to right (pathLength: 0 → 1, 1.5s)
- Area fades in (0.8s)
- Dots pop in one by one (spring animation)
- Day labels fade in

---

## 🪟 Frosted Glass Overlay

**Purpose:** Indicates this is demo/preview data

**Design:**
- Covers entire screen
- Gradient: `transparent → white/10 → white/30`
- Backdrop blur: 2px (very subtle)
- Pointer events: none (doesn't block clicks)
- Fades in after 2 seconds

**Effect:**
- Creates "looking through a window" feeling
- Adds depth and separation
- Signals "this could be yours"

---

## 🎯 Floating CTA (Bottom)

### Primary Button
**Text:** "See YOUR Numbers"  
**Subtext:** "Connect your bank securely"

**Design:**
- Full-width with 24px margin
- Gold gradient: #D4AF37 → #E5C68D → #C9B382
- Very rounded: 20px border-radius
- Padding: 20px
- Shadow: Gold glow `0_8px_32px_rgba(212,175,55,0.3)`
- Hover: Enhanced shadow `0_12px_40px_rgba(212,175,55,0.4)`

**Icon:**
- White circular button (48px) on right
- Arrow icon with pulse animation (x: 0 → 5 → 0, infinite)
- Frosted background (white/20)

**Animation:**
- Slides up from bottom (y: 100 → 0)
- Spring animation
- 1.8s delay

### Trust Indicator
```
🔒 Bank-level encryption • No sign-up required to explore
```
- Small gray text below button
- Fades in at 2.2s

---

## 🏷️ Demo Badge (Top Center)

```
✨ Demo Preview
```

**Design:**
- Fixed position top center
- Frosted white pill badge
- Subtle shadow
- Slides down from top (2.5s delay)

**Purpose:**
- Clear indicator this is sample data
- Builds trust (transparency)
- Creates curiosity ("I want MY data")

---

## 🎭 Micro-Interactions

### On Load Sequence
1. **0.0s** - Header fades in (Goldie + Streak)
2. **0.2s** - Goldie's message slides in
3. **0.4s** - Spending overview card appears
4. **0.6s** - First spending bubble pops in
5. **0.7-1.1s** - Remaining bubbles pop in
6. **0.8s** - Trend card appears
7. **1.0s** - Line chart starts drawing
8. **1.3-1.6s** - Chart dots appear
9. **1.5s** - Day labels fade in
10. **1.8s** - CTA button slides up
11. **2.0s** - Frosted overlay fades in
12. **2.2s** - Trust indicator appears
13. **2.5s** - Demo badge slides down

### Continuous Animations
- **Goldie:** Wiggles every 5 seconds
- **Streak badge:** Static (already animated in)
- **Spending bubbles:** Float up/down continuously (3-4s cycles, staggered)
- **CTA arrow:** Pulses horizontally (1.5s cycle)
- **Background gradient:** Subtle pulse on two circles

### Hover States
- **Spending bubbles:** Scale 1.1x, cursor pointer
- **CTA button:** Enhanced shadow
- All transitions: 200-300ms ease

---

## 📱 Mobile Optimization

### Layout
- Full-screen mobile-first
- 24px horizontal padding
- 32px top padding
- Vertical scroll enabled
- Fixed CTA at bottom (32px from bottom)

### Touch Targets
- CTA button: Full-width, 80px tall (including padding)
- Spending bubbles: 75-120px (naturally large)

### Performance
- SVG chart (GPU-accelerated)
- CSS transforms for animations
- Backdrop-blur optimized
- No heavy JavaScript calculations

---

## 🧠 Psychology & Conversion

### Why This Works

**1. Aspirational Visualization**
- Users see themselves succeeding
- Sample data is realistic but impressive (32% savings)
- Beautiful design = "this is the life I want"

**2. Social Proof (Implied)**
- "12 day streak" suggests habit-forming app
- "Improving" trend shows upward momentum
- Goldie's positive message validates progress

**3. Framing: "YOUR Numbers"**
- Personal pronouns create ownership
- "Could be yours" messaging
- Preview badge signals exclusivity

**4. Trust Building**
- Transparent about demo data (badge + overlay)
- Bank-level encryption messaging
- "No sign-up required to explore"

**5. Soft Sell**
- Beautiful experience first, CTA second
- CTA appears late in animation sequence
- Button text focuses on benefit ("See YOUR Numbers")

**6. Warm Color Psychology**
- Gold = Success, achievement, premium
- Sage green = Growth, prosperity, calm
- Warm neutrals = Trustworthy, friendly, approachable

---

## 🚀 User Journey

### Recommended Flow
```
Landing Page
    ↓
What If Calculator (/what-if)
    ↓
Preview Dashboard (/preview) ← You are here
    ↓
Sign Up / Auth (/auth)
    ↓
Onboarding (/onboarding)
    ↓
Main App (/home)
```

### Integration Points

**From What If Calculator:**
- User plays with sliders, sees potential savings
- CTA: "Want to see what this looks like?" → Preview Dashboard

**From Preview Dashboard:**
- User sees aspirational vision
- CTA: "Connect your bank to see YOUR numbers" → Sign Up

**Entry Points:**
- Direct link from marketing materials
- App Store preview screens
- Social media campaigns
- "Try demo" button on landing page

---

## 🎨 Component Architecture

### File Structure
```
/src/app/screens/PreviewDashboard.tsx
  - Main component (380 lines)
  - Self-contained
  - Uses Motion React for animations
  - Google Fonts: Plus Jakarta Sans
```

### State Management
```typescript
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  setIsVisible(true); // Triggers frosted overlay
}, []);
```

### Data (Sample/Demo)
```typescript
const spendingBubbles = [
  { category: "Groceries", amount: 245, emoji: "🛒", color: "#A8D5BA", size: 120 },
  // ... 5 more categories
];

const trendData = [
  { day: "Mon", amount: 45 },
  // ... 6 more days
];
```

---

## 📊 Success Metrics

### Primary KPIs
1. **Time on Page:** Target 45+ seconds
2. **Scroll Depth:** Target 100% (see full screen)
3. **CTA Click Rate:** Target 50%+
4. **Sign-up Conversion:** Track preview → account creation

### Secondary Metrics
- Bubble interactions (hover count)
- Entry source (calculator vs direct)
- Mobile vs desktop usage
- Repeat visits (indicates high interest)

---

## 🎯 A/B Test Ideas

### Variant A (Current)
- Sample week data
- "See YOUR Numbers" CTA
- Frosted overlay

### Variant B (Personalized)
- Use data from What If Calculator
- "Make This Real" CTA
- No overlay (feels more personal)

### Variant C (Social Proof)
- Add "Join 50,000+ savers" badge
- Show comparison: "You'll save more than 68% of users"
- Stronger green indicators

### Variant D (Urgency)
- "Limited: Connect now for 3 months premium free"
- Timer element
- More prominent CTA

---

## 🔧 Technical Details

### Dependencies
- Motion React (animations)
- React Router (navigation)
- Lucide React (icons)
- Google Fonts (Plus Jakarta Sans)

### Browser Support
- Chrome/Edge: Full support
- Safari: Full support (backdrop-blur optimized)
- Firefox: Full support
- Mobile browsers: Optimized

### Performance
- **FCP:** <1.5s
- **LCP:** <2.5s
- **TTI:** <3.5s
- **Animations:** 60fps on mobile

---

## 💡 Future Enhancements

### Phase 2
- [ ] Connect to What If Calculator (carry over data)
- [ ] Add sound effects (subtle, optional)
- [ ] Personalized Goldie messages based on data
- [ ] More categories (customizable)

### Phase 3
- [ ] Animated transitions between categories
- [ ] Tap bubble to see details
- [ ] Share preview as image
- [ ] Compare with friends' previews

### Phase 4
- [ ] AI-generated insights based on preview interactions
- [ ] Video explainer overlay
- [ ] Voice interaction with Goldie
- [ ] Dark mode variant

---

**Status:** ✅ Complete & Production-Ready  
**Route:** `/preview`  
**Created:** February 24, 2026  
**Design:** Mobile-first aspirational preview experience  
**Font:** Plus Jakarta Sans (rounded, friendly)
