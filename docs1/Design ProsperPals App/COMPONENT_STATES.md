# ProsperPals Component State Variants

This document showcases all reusable components with their various states for design consistency.

---

## 1. PremiumCheckbox Component

**File:** `/src/app/components/PremiumCheckbox.tsx`

### Props
```typescript
interface PremiumCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string | ReactNode;
  variant?: "gold" | "blue";
}
```

### States

#### ☐ Default (Unchecked)
```tsx
<PremiumCheckbox
  checked={false}
  onChange={() => {}}
  label="Remember me"
  variant="gold"
/>
```
**Visual:**
- 18×18 px box
- Transparent background
- Border: 1.5px border-white/20
- Border radius: 5px

#### ☐ Hover (Unchecked)
**Visual:**
- Border brightens to border-white/40
- Subtle glow: 0 0 6px rgba(255,255,255,0.1)

#### ☑ Checked
```tsx
<PremiumCheckbox
  checked={true}
  onChange={() => {}}
  label="Remember me"
  variant="gold"
/>
```
**Visual:**
- Gold gradient fill: from-yellow-400 to-yellow-500
- White check icon (w-3 h-3, stroke-[3])
- Glow: 0 0 8px rgba(255,215,0,0.4)
- Border: transparent

#### ☑ Checked + Hover
**Visual:**
- Brightness increases: brightness-110
- Enhanced glow: 0 0 12px rgba(255,215,0,0.4)

#### ☑ Focus (Keyboard Navigation)
**Visual:**
- Focus ring: 2px ring-white/60
- Ring offset: 2px ring-offset-[#1a1a2e]
- Works on both checked and unchecked states

### Variants

#### Gold Variant (Default)
- Checked fill: from-yellow-400 to-yellow-500
- Glow color: rgba(255,215,0,0.4)

#### Blue Variant
- Checked fill: from-blue-400 to-blue-500
- Glow color: rgba(59,130,246,0.4)

### Usage Examples

**Simple Label:**
```tsx
<PremiumCheckbox
  checked={rememberMe}
  onChange={setRememberMe}
  label="Remember me"
  variant="gold"
/>
```

**Complex Label with Links:**
```tsx
<PremiumCheckbox
  checked={agreedToTerms}
  onChange={setAgreedToTerms}
  variant="gold"
  label={
    <span>
      I agree to the{" "}
      <button className="text-yellow-400 hover:underline">
        Terms of Service
      </button>
    </span>
  }
/>
```

---

## 2. Toast Notification Component

**File:** `/src/app/components/Toast.tsx`

### Props
```typescript
interface ToastProps {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number; // milliseconds
  showUndo?: boolean;
  onUndo?: () => void;
  onClose?: () => void;
}
```

### States

#### ✅ Success Toast
```tsx
<Toast
  id="1"
  type="success"
  message="HBO Max canceled"
  duration={10000}
  onClose={() => {}}
/>
```
**Visual:**
- Background: from-green-500/20 to-emerald-500/10
- Border: border-green-500/30
- Text: text-green-400
- Icon: CheckCircle (green)

#### ❌ Error Toast
```tsx
<Toast
  id="2"
  type="error"
  message="Payment failed. Please update your card."
  duration={5000}
  onClose={() => {}}
/>
```
**Visual:**
- Background: from-red-500/20 to-red-600/10
- Border: border-red-500/30
- Text: text-red-400
- Icon: AlertCircle (red)

#### ℹ️ Info Toast
```tsx
<Toast
  id="3"
  type="info"
  message="Reminder: Electricity bill due tomorrow"
  duration={7000}
  onClose={() => {}}
/>
```
**Visual:**
- Background: from-blue-500/20 to-blue-600/10
- Border: border-blue-500/30
- Text: text-blue-400
- Icon: Info (blue)

#### ↶ Success with Undo
```tsx
<Toast
  id="4"
  type="success"
  message="Netflix canceled"
  showUndo={true}
  onUndo={() => restoreSubscription()}
  duration={10000}
  onClose={() => {}}
/>
```
**Visual:**
- Same as success toast
- Additional [Undo] button:
  - px-3 py-1.5
  - bg-white/10 hover:bg-white/20
  - border border-white/20
  - text-white font-semibold

### Animation
- **Enter:** opacity 0→1, y 50→0, scale 0.95→1 (300ms)
- **Exit:** opacity 1→0, y 0→20, scale 1→0.95 (200ms)
- **Auto-dismiss:** After duration (default 10s)

### Positioning
- Fixed bottom-right corner
- bottom-6 right-6
- Stacks vertically with gap-3
- z-50 (above most content)

### Container Usage
```tsx
<ToastContainer 
  toasts={[
    { id: "1", message: "Task completed", type: "success" },
    { id: "2", message: "New notification", type: "info" }
  ]} 
/>
```

---

## 3. EmptyState Component

**File:** `/src/app/components/EmptyState.tsx`

### Props
```typescript
interface EmptyStateProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}
```

### States

#### With Emoji
```tsx
<EmptyState
  emoji="🏦"
  title="No bank accounts connected"
  description="Connect your first bank account to start tracking your finances."
  primaryAction={{ 
    label: "Connect Bank", 
    onClick: () => {} 
  }}
/>
```
**Visual:**
- Emoji: text-6xl (60px)
- Title: text-2xl font-bold text-white
- Description: text-white/60 max-w-md
- Primary button: Gold gradient, shadow-glow

#### With Icon
```tsx
<EmptyState
  icon={Target}
  title="No goals set yet"
  description="Set your first financial goal and watch your progress."
  primaryAction={{ 
    label: "Create Goal", 
    onClick: () => {} 
  }}
/>
```
**Visual:**
- Icon container: w-16 h-16 rounded-full bg-white/5 border-white/10
- Icon: w-8 h-8 text-white/40

#### With Both Actions
```tsx
<EmptyState
  emoji="📚"
  title="Start learning"
  description="Explore courses to improve your financial knowledge."
  primaryAction={{ 
    label: "Browse Courses", 
    onClick: () => {} 
  }}
  secondaryAction={{ 
    label: "Skip for now", 
    onClick: () => {} 
  }}
/>
```
**Visual:**
- Primary: Gold gradient button (from-yellow-400 to-yellow-500)
- Secondary: Ghost button (bg-white/5 border-white/10)
- Buttons stack vertically on mobile, horizontal on desktop

### Layout
- Centered: flex items-center justify-center
- Padding: py-16 px-6
- Max width: max-w-md (on description)
- Spacing: mb-6 (icon), mb-3 (title), mb-8 (description)

---

## 4. Button Component States

### Primary Button (Gold Gradient)
```tsx
<button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-[#1a1a2e] font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] min-h-[44px]">
  Continue
</button>
```

**States:**
- **Default:** Gold gradient, dark text, glow shadow
- **Hover:** Darker gradient (yellow-500→600), scale: 1.02
- **Focus:** ring-2 ring-yellow-500/50 ring-offset-2
- **Active:** scale: 0.98
- **Disabled:** bg-gray-600 opacity-50 cursor-not-allowed

### Secondary Button (Ghost)
```tsx
<button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors min-h-[44px]">
  Cancel
</button>
```

**States:**
- **Default:** Semi-transparent white background
- **Hover:** Brighter background (white/10)
- **Focus:** ring-2 ring-white/40 ring-offset-2
- **Disabled:** opacity-50 cursor-not-allowed

### Danger Button (Destructive)
```tsx
<button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 text-xs font-medium transition-colors">
  <X className="w-3.5 h-3.5" />
  Cancel
</button>
```

**States:**
- **Default:** Red tint, red text and border
- **Hover:** Brighter red background
- **Focus:** ring-2 ring-red-500/50 ring-offset-2

### Icon Button
```tsx
<button className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white min-h-[44px] min-w-[44px]">
  <Settings className="w-5 h-5" />
</button>
```

**States:**
- **Default:** Transparent, muted icon
- **Hover:** Semi-transparent background, full white icon
- **Focus:** ring-2 ring-white/40 ring-offset-2

---

## 5. Input Component States

### Text Input
```tsx
<input
  type="text"
  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
  placeholder="Enter amount"
/>
```

**States:**
- **Default:** Semi-transparent, subtle border
- **Hover:** (optional) border-white/15
- **Focus:** Gold border, brighter background
- **Error:** border-red-500/50 bg-red-500/5
- **Disabled:** opacity-50 cursor-not-allowed

### Input with Icon
```tsx
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
  <input
    type="email"
    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
    placeholder="your@email.com"
  />
</div>
```

### Input with Action Button
```tsx
<div className="relative">
  <input
    type="password"
    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-4 pr-11 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
    placeholder="••••••••"
  />
  <button
    type="button"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
  >
    <Eye className="w-5 h-5" />
  </button>
</div>
```

---

## 6. Badge/Status Components

### Status Badges
```tsx
// Success
<span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-md text-xs text-green-400">
  <CheckCircle className="w-3 h-3" />
  Paid
</span>

// Warning
<span className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-md text-xs text-yellow-400">
  <AlertCircle className="w-3 h-3" />
  Upcoming
</span>

// Error
<span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 border border-red-500/30 rounded-md text-xs text-red-400">
  <AlertCircle className="w-3 h-3" />
  Overdue
</span>

// Info
<span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 rounded-md text-xs text-blue-400">
  <Clock className="w-3 h-3" />
  Processing
</span>
```

### Trend Badges
```tsx
// Positive (Green)
<div className="text-xs flex items-center gap-1 text-green-400">
  <TrendingUp className="w-3 h-3" />
  +12%
</div>

// Negative (Red)
<div className="text-xs flex items-center gap-1 text-red-400">
  <TrendingDown className="w-3 h-3" />
  -8%
</div>
```

---

## 7. Card Component

### Glass Card (Standard)
```tsx
<div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
  <h3 className="text-xl font-bold text-white mb-4">Card Title</h3>
  <p className="text-white/70">Card content goes here.</p>
</div>
```

**States:**
- **Default:** Subtle gradient, low-contrast border
- **Hover:** Brighter border (white/20)
- **Active/Selected:** border-yellow-500/50
- **Disabled:** opacity-50 pointer-events-none

### Accent Card (Warning)
```tsx
<div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 rounded-xl p-6">
  <div className="flex items-center gap-2 mb-2 text-yellow-400">
    <AlertCircle className="w-5 h-5" />
    <h4 className="font-semibold">Warning</h4>
  </div>
  <p className="text-white/90">Important message here.</p>
</div>
```

### Accent Card (Success)
```tsx
<div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-6">
  <div className="flex items-center gap-2 mb-2 text-green-400">
    <CheckCircle className="w-5 h-5" />
    <h4 className="font-semibold">Success</h4>
  </div>
  <p className="text-white/90">Positive message here.</p>
</div>
```

---

## 8. Money Display Components

### Large Amount Display
```tsx
import { formatMoney } from '../utils/formatMoney';

<div className="text-4xl font-bold text-white">
  {formatMoney(1234.56)}
</div>
// Output: €1,234.56
```

### Amount with Delta
```tsx
import { formatMoneyDelta } from '../utils/formatMoney';

const delta = formatMoneyDelta(500);

<div className="flex items-center gap-2">
  <div className="text-2xl font-bold text-white">
    {formatMoney(10500)}
  </div>
  <div className={`text-sm flex items-center gap-1 ${delta.className}`}>
    {delta.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
    {delta.formatted}
  </div>
</div>
```

### Percentage Display
```tsx
import { formatPercent } from '../utils/formatMoney';

<div className="text-green-400 text-sm">
  {formatPercent(15.5, { showSign: true })}
</div>
// Output: +15.5%
```

---

## 9. Loading States

### Skeleton Card
```tsx
<div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 animate-pulse">
  <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
  <div className="h-4 bg-white/10 rounded w-2/3 mb-2"></div>
  <div className="h-4 bg-white/10 rounded w-1/2"></div>
</div>
```

### Loading Spinner
```tsx
<div className="flex items-center justify-center p-8">
  <div className="w-8 h-8 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin"></div>
</div>
```

### Loading Button
```tsx
<button 
  disabled 
  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e] font-semibold rounded-lg opacity-70 cursor-not-allowed flex items-center gap-2"
>
  <div className="w-4 h-4 border-2 border-[#1a1a2e]/30 border-t-[#1a1a2e] rounded-full animate-spin"></div>
  Processing...
</button>
```

---

## 10. Modal/Dialog States

### Overlay
```tsx
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"></div>
```

### Modal Container
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
  >
    {/* Modal content */}
  </motion.div>
</div>
```

---

## Design System Summary

### Spacing Scale
- `gap-1` = 4px
- `gap-2` = 8px
- `gap-3` = 12px
- `gap-4` = 16px
- `gap-6` = 24px
- `gap-8` = 32px

### Border Radius Scale
- `rounded-md` = 6px (badges)
- `rounded-lg` = 8px (buttons)
- `rounded-xl` = 12px (cards)
- `rounded-2xl` = 16px (modals)
- `rounded-full` = 9999px (pills, avatars)

### Shadow Scale
- `shadow-sm` = Subtle (borders)
- `shadow` = Default (cards)
- `shadow-lg` = Elevated (dropdowns)
- `shadow-xl` = Floating (modals)
- `shadow-[0_0_20px_rgba(255,215,0,0.3)]` = Glow (primary buttons)

---

**Component Library Version:** 1.0  
**Last Updated:** February 23, 2026  
**Maintained by:** ProsperPals Design System Team
