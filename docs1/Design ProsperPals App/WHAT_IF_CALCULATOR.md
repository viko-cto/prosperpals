# What If Calculator - Gen Z Pre-Signup Experience

## Overview
A mobile-first interactive calculator that shows value BEFORE asking users to sign up. This is the first screen users see when opening ProsperPals.

## Access
Navigate to: `/what-if`

## Design Philosophy
**Value First, Sign-up Later** - Let users experience the magic before committing.

---

## 🎨 Visual Design

### Color Palette (Warm & Inviting)
- **Coral:** `#FF6B6B` - Primary accent, expense sliders
- **Soft Gold:** `#FFD93D` - Secondary accent, income slider, Goldie character
- **Cream Background:** `#FFF8F0` → `#FFF5EB` → `#FFE4D6` (gradient)
- **Text:** `#2C2C2C` (dark), `#666` (medium), `#999` (light)

### Typography
- **Title:** 30px bold
- **Body:** 14px regular
- **Numbers:** 18-36px bold gradient text

### Rounded Corners
- **Cards:** 24px border-radius
- **Progress Ring:** Fully circular
- **Buttons:** 16px border-radius
- **Sliders:** Fully rounded (pill shape)

### Shadows
- **Cards:** Soft coral shadow `0_8px_32px_rgba(255,107,107,0.15)`
- **Sliders:** Thumb shadow on hover
- **Goldie:** Gold glow `0_8px_32px_rgba(255,217,61,0.5)`

---

## 🎮 Interactive Elements

### 1. Progress Ring (Animated)
**Purpose:** Real-time visualization of savings potential

**Features:**
- SVG circle with gradient stroke
- Animates from 0% to calculated savings rate
- Smooth 0.8s easeOut transition
- Gradient: Coral → Gold
- Background ring in cream (#FFE4D6)

**Center Display:**
```
In 12 months
€14,400
saved
```

### 2. Playful Sliders (5 total)

#### Income Slider 💰
- **Range:** €1,000 - €8,000
- **Step:** €100
- **Color:** Gold gradient track
- **Thumb:** Gold with white border

#### Rent Slider 🏠
- **Range:** €0 - €2,000
- **Step:** €50
- **Color:** Coral gradient track
- **Thumb:** Coral with white border

#### Food Slider 🍕
- **Range:** €0 - €1,000
- **Step:** €25
- **Color:** Coral gradient track

#### Subscriptions Slider 📱
- **Range:** €0 - €500
- **Step:** €10
- **Color:** Coral gradient track

#### Other Fun Stuff Slider ✨
- **Range:** €0 - €1,000
- **Step:** €25
- **Color:** Coral gradient track

**Slider UX:**
- 28px custom thumbs with hover scale effect
- Smooth gradient backgrounds
- Real-time value display above each slider
- Touch-friendly on mobile

---

## 🪙 Goldie Character

### Design
- **Size:** 80px × 80px
- **Shape:** Circular coin with border
- **Gradient:** Gold (FFD93D → FFC93D → FFB93D)
- **Border:** 4px bright gold (#FFED4E)
- **Shadow:** Glowing gold aura

### Facial Features
- **Eyes:** Two small black dots that blink
- **Smile:** Curved bottom line
- **Sparkle:** Animated ✨ that pulses

### Animations
1. **Float:** Gentle up-down motion (8px range, 2s cycle)
2. **Tilt:** Subtle rotation (-5° to +5°, 3s cycle)
3. **Blink:** Eyes close/open every 3 seconds
4. **Sparkle:** Appears/fades every 1.5s

### Position
- Fixed bottom-right corner
- 96px from bottom (above CTA)
- 24px from right edge

### Speech Bubble (Context-Aware)

Appears above Goldie with reactions based on savings rate:

| Savings Rate | Emoji | Message |
|--------------|-------|---------|
| ≥30% | 🤩 | "Wow! You're a superstar!" |
| 20-29% | 😊 | "Looking great!" |
| 10-19% | 😌 | "Good start!" |
| 1-9% | 🙂 | "Keep going!" |
| 0% | 😅 | "Let's find some savings!" |

**Speech Bubble Style:**
- White background
- Rounded corners (16px)
- Soft shadow
- Appears with scale + fade animation
- Changes instantly as user adjusts sliders

---

## 💰 Savings Calculation

### Formula
```javascript
monthlySavings = income - (rent + food + subscriptions + other)
yearlySavings = monthlySavings × 12
savingsRate = (monthlySavings / income) × 100
```

### Display Logic
- All amounts formatted with thousand separators (€1,234)
- Negative savings shows €0
- Percentage rounded to nearest whole number
- Real-time updates (no delay)

---

## 🎯 Call-to-Action

### Primary CTA (Bottom)
**Text:** "Want Goldie to make this happen? →"

**Style:**
- Small text (14px)
- Gray color (#666)
- Hover: Darker (#2C2C2C)
- Arrow translates right on hover
- No background (text-only link)

**Behavior:**
- Clicking navigates to `/auth` (sign-up page)
- Preserves calculator state in session storage (optional enhancement)

---

## 📱 Mobile Optimization

### Layout
- Full-screen mobile-first design
- 24px horizontal padding
- Vertical scroll enabled
- No fixed navigation (clean canvas)

### Touch Targets
- Sliders: Full-width touch area
- Thumbs: 28px (exceeds 44px when including padding)
- CTA: 44px minimum height

### Performance
- SVG animations (GPU-accelerated)
- CSS transforms for Goldie (smooth 60fps)
- Debounced slider updates (instant visual feedback)

---

## 🎭 Micro-Interactions

### On Load
1. Header fades in from top (0.3s delay)
2. Progress ring scales up (0.2s delay)
3. Sliders fade in (0.4s delay)
4. CTA fades in (0.6s delay)
5. Goldie slides in from right (0.8s delay)

### During Interaction
1. Slider thumb scales on hover/touch
2. Progress ring animates smoothly
3. Yearly savings number scales on change
4. Goldie's speech bubble swaps with fade
5. Background gradient pulses subtly

### Hover States
- Slider thumbs: Scale 1.1x + enhanced shadow
- CTA arrow: Translate right 4px
- All transitions: 200ms ease

---

## 🧠 Psychology & Conversion

### Why This Works

**1. Instant Value**
- Users see potential savings immediately
- No commitment required to explore

**2. Playful Interaction**
- Sliders are more engaging than text fields
- Real-time feedback creates "aha!" moments

**3. Emotional Connection**
- Goldie reacts to their numbers
- Speech bubbles create personality
- Warm colors feel friendly, not corporate

**4. Low-Pressure CTA**
- Small text at bottom (not pushy)
- Question format ("Want Goldie to...")
- Arrow suggests continuation, not obligation

**5. Mobile-First**
- Gen Z lives on mobile
- Touch-optimized sliders feel native
- One-handed scrolling works perfectly

---

## 🚀 Future Enhancements

### Phase 2
- [ ] Save calculator state to localStorage
- [ ] Add "Share my results" feature
- [ ] Comparison: "You save more than 68% of users!"
- [ ] Animation when crossing savings milestones

### Phase 3
- [ ] Seasonal Goldie variants (holiday themes)
- [ ] More expense categories (customizable)
- [ ] City cost-of-living adjustments
- [ ] Currency selector (EUR/USD/GBP)

### Phase 4
- [ ] Multi-step onboarding flow starts here
- [ ] Pre-fill sign-up form with calculator data
- [ ] Email "Save your calculation" option
- [ ] Social proof: "Join 50,000+ savers"

---

## 🎨 Component Architecture

### File Structure
```
/src/app/screens/WhatIfCalculator.tsx
  - Main component (380 lines)
  - Self-contained (no external dependencies)
  - Uses Motion React for animations
  - Custom CSS for slider styling
```

### State Management
```typescript
const [income, setIncome] = useState(2500);
const [rentCost, setRentCost] = useState(800);
const [foodCost, setFoodCost] = useState(400);
const [subscriptionsCost, setSubscriptionsCost] = useState(150);
const [otherCost, setOtherCost] = useState(300);
```

### Calculations (Real-time)
```typescript
const totalExpenses = rentCost + foodCost + subscriptionsCost + otherCost;
const monthlySavings = Math.max(0, income - totalExpenses);
const yearlySavings = monthlySavings * 12;
const savingsRate = (monthlySavings / income) * 100;
```

---

## 📊 Success Metrics

### Primary KPIs
1. **Time on Page:** Target 30+ seconds
2. **Slider Interactions:** Target 5+ adjustments
3. **CTA Click Rate:** Target 40%+
4. **Sign-up Conversion:** Track from calculator → account

### Secondary Metrics
- Average savings calculated: €X,XXX
- Most adjusted slider: (Food? Rent?)
- Mobile vs Desktop usage
- Bounce rate vs traditional landing page

---

## 🎯 A/B Test Ideas

### Variant A (Current)
- Goldie in bottom-right corner
- 5 sliders
- "Want Goldie to make this happen?"

### Variant B (Alternative)
- Goldie in center above ring
- 3 sliders (simplified: Income, Fixed, Variable)
- "Start saving with Goldie →"

### Variant C (Aggressive)
- Primary button instead of text link
- "See My Personalized Plan" CTA
- Goldie celebrates when >20% savings

---

**Status:** ✅ Complete & Production-Ready  
**Route:** `/what-if`  
**Created:** February 24, 2026  
**Design:** Mobile-first Gen Z fintech experience
