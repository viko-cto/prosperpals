# SponCite UI Component Ecosystem

**Last Updated**: 2025-10-21
**Purpose**: Comprehensive catalog of available UI components and libraries for SponCite development

## Overview

This document catalogs all available UI component libraries, prioritized by relevance to SponCite's clinical trial platform requirements. Components are organized by category with implementation priority levels.

---

## Priority Classification

- **🔴 CRITICAL**: Core platform functionality (trial matching, site profiles, dashboards)
- **🟡 HIGH**: Enhanced UX for key workflows (feasibility, verification, search)
- **🟢 MEDIUM**: Visual polish and engagement (animations, effects)
- **⚪ LOW**: Nice-to-have enhancements

---

## AI-Powered Components (🔴 CRITICAL)

### AI SDK Elements
**Source**: https://ai-sdk.dev/elements/overview
**Priority**: 🔴 CRITICAL - Core to AI-powered matching and feasibility

#### Essential Components

1. **Chain of Thought** - For progressive feasibility workflows
   - Use Case: Show reasoning behind site match scores
   - Implementation: Display step-by-step trial-site compatibility analysis
   - Trial Type: All (Drug, Device, IVDR)

2. **Reasoning** - For transparency in AI recommendations
   - Use Case: Explain why specific sites were matched
   - Implementation: Show confidence score calculations
   - Trial Type: All

3. **Chatbot** - For natural language trial search
   - Use Case: Dr. Vance can ask "Find sites with GCP experience in oncology"
   - Implementation: Conversational site discovery
   - Trial Type: All

4. **Context** - For maintaining conversation state
   - Use Case: Remember previous search criteria across sessions
   - Implementation: Persistent trial search history
   - Trial Type: All

5. **Actions** - For interactive AI responses
   - Use Case: "Add to shortlist", "Request feasibility" buttons in chat
   - Implementation: Action buttons in AI responses
   - Trial Type: All

6. **Artifact** - For generated reports and documents
   - Use Case: Generate feasibility summary PDFs
   - Implementation: AI-generated feasibility reports
   - Trial Type: All

7. **Inline Citation** - For regulatory compliance
   - Use Case: Reference regulatory guidelines in recommendations
   - Implementation: Link to FDA/EMA guidelines in AI responses
   - Trial Type: Device, IVDR (high regulatory focus)

#### Setup Guide
```typescript
// Basic AI SDK setup for SponCite
import { useChat } from 'ai/react'
import { ChainOfThought, Reasoning, Actions } from '@ai-sdk/elements'

export function TrialMatchingChat() {
  const { messages, input, handleSubmit } = useChat({
    api: '/api/trial-matching',
    // SponCite-specific configuration
  })

  return (
    <div className="trial-matching-interface">
      {messages.map(message => (
        <div key={message.id}>
          {message.chainOfThought && (
            <ChainOfThought steps={message.chainOfThought} />
          )}
          {message.reasoning && (
            <Reasoning explanation={message.reasoning} />
          )}
          {message.actions && (
            <Actions items={message.actions} />
          )}
        </div>
      ))}
    </div>
  )
}
```

**Code Examples Location**: `/claudedocs/ai-sdk-examples/`

---

## Form & Input Components (🔴 CRITICAL)

### Shadcn Form
**Source**: https://www.shadcn-form.com/
**Priority**: 🔴 CRITICAL - All data entry needs this

**Key Use Cases**:
- Trial protocol entry (sponsor side)
- Site profile creation (site side)
- Feasibility questionnaires (both sides)
- Verification forms (admin)

**Integration**: Already using react-hook-form + zod
**Status**: ✅ Available in project

**SponCite-Specific Patterns**:
```typescript
// Trial type-specific form validation
import { z } from 'zod'

const drugTrialSchema = z.object({
  therapeuticArea: z.string(),
  phase: z.enum(['I', 'II', 'III', 'IV']),
  patientPopulation: z.string(),
})

const deviceTrialSchema = z.object({
  deviceClass: z.enum(['I', 'II', 'III']),
  technicalRequirements: z.array(z.string()),
  storageConditions: z.string(),
})

const ivdrTrialSchema = z.object({
  diagnosticPlatform: z.string(),
  certifications: z.array(z.string()),
  labCapabilities: z.array(z.string()),
})
```

### File Upload Components
**Sources**:
- Aceternity UI: https://ui.aceternity.com/components/file-upload
- ShadCN Form: https://www.shadcn-form.com/

**Priority**: 🔴 CRITICAL
**Use Cases**:
- Protocol upload (PDF, DOCX)
- IRB approval documents
- Site certifications
- GCP certificates
- Financial disclosure forms

---

## Card Components (🟡 HIGH)

### Site Profile Cards
**Sources**:
- Aceternity UI: Card Hover Effect, Focus Cards, Direction Aware Hover
- Magic UI: Bento Grid, Magic Card
- 21st.dev: Card components

**Priority**: 🟡 HIGH
**Use Cases**:
- Site discovery grid (search results)
- Trial match cards
- Performance metric cards
- Verification status cards

**Trial Type Differentiation**:
```typescript
const trialTypeColors = {
  drug: 'border-blue-500',    // #0066CC
  device: 'border-green-500', // #00AA44
  ivdr: 'border-purple-500',  // #7733FF
}
```

### Bento Grid Layouts
**Sources**:
- Aceternity UI: Bento Grid
- Magic UI: Bento Grid

**Priority**: 🟡 HIGH
**Use Cases**:
- Dashboard layouts (sponsor & site)
- Feature showcase on landing page
- Admin analytics dashboard

---

## Navigation Components (🔴 CRITICAL)

### Primary Navigation
**Sources**:
- Aceternity UI: Floating Navbar, Sidebar
- Magic UI: Dock
- Kokonut UI: Smooth Tab, Smooth Drawer
- 21st.dev: Navbar/Navigation

**Priority**: 🔴 CRITICAL
**Use Cases**:
- Main app navigation
- Role-based menus (sponsor vs site)
- Trial type switching
- Search filters

### Tabs & Filters
**Sources**: Multiple libraries
**Priority**: 🔴 CRITICAL
**Use Cases**:
- Trial type tabs (Drug | Device | IVDR)
- Site profile sections
- Feasibility questionnaire sections

---

## Data Visualization (🟡 HIGH)

### Maps & Geolocation
**Sources**:
- Aceternity UI: World Map
- Magic UI: Dotted Map

**Priority**: 🟡 HIGH
**Use Cases**:
- Site location visualization
- Geographic site distribution
- Multi-country trial planning

### Charts & Metrics
**Sources**:
- Magic UI: Number Ticker, Orbiting Circles
- Aceternity UI: Timeline

**Priority**: 🟡 HIGH
**Use Cases**:
- Performance metrics (site success rates)
- Trial enrollment progress
- Response time analytics
- Match confidence scores

---

## Background & Effects (🟢 MEDIUM)

### Professional Backgrounds
**Sources**:
- Aceternity UI: Grid and Dot Backgrounds, Aurora Background
- Pattern Craft: https://patterncraft.fun/
- Vanta.js: https://www.vantajs.com/

**Priority**: 🟢 MEDIUM
**Use Cases**:
- Landing page hero sections
- Marketing pages
- Dashboard backgrounds
- Empty states

**Recommendation**: Use subtle, professional patterns. Avoid distracting animations.

---

## Text & Typography (🟢 MEDIUM)

### Animated Text Effects
**Sources**:
- Aceternity UI: Multiple text effects
- Magic UI: Typing Animation, Shimmer Text
- React Bits: Split Text, Blur Text, Gradient Text

**Priority**: 🟢 MEDIUM
**Use Cases**:
- Landing page headlines
- Feature announcements
- Call-to-action sections
- Success messages

---

## Buttons & CTAs (🟡 HIGH)

### Interactive Buttons
**Sources**:
- Aceternity UI: Tailwind CSS buttons, Hover Border Gradient
- Magic UI: Shiny Button, Rainbow Button
- Kokonut UI: Particle Button, Gradient Button

**Priority**: 🟡 HIGH
**Use Cases**:
- Primary CTAs ("Request Feasibility", "Submit Protocol")
- Secondary actions ("Save for Later", "Export Report")
- Destructive actions ("Cancel Trial", "Reject Site")

**Trial Type Theming**:
```typescript
const primaryButtons = {
  drug: 'bg-blue-600 hover:bg-blue-700',
  device: 'bg-green-600 hover:bg-green-700',
  ivdr: 'bg-purple-600 hover:bg-purple-700',
}
```

---

## Modal & Overlay Components (🟡 HIGH)

### Modals & Dialogs
**Sources**:
- Aceternity UI: Animated Modal
- 21st.dev: Modal/Dialog

**Priority**: 🟡 HIGH
**Use Cases**:
- Feasibility request forms
- Site verification workflows
- Confirmation dialogs
- Multi-step wizards

---

## Loading & Progress (🟡 HIGH)

### Loaders & Spinners
**Sources**:
- Aceternity UI: Multi Step Loader, Loader
- Kokonut UI: Loader
- 21st.dev: Spinner/Loader

**Priority**: 🟡 HIGH
**Use Cases**:
- AI matching in progress
- Document upload progress
- Search loading states
- Report generation

---

## Component Libraries Priority Matrix

| Library | Priority | Use Cases | Integration Effort |
|---------|----------|-----------|-------------------|
| AI SDK Elements | 🔴 CRITICAL | AI matching, reasoning | HIGH - Custom integration |
| ShadCN/UI | 🔴 CRITICAL | Forms, base components | ✅ Already integrated |
| Aceternity UI | 🟡 HIGH | Cards, effects, nav | MEDIUM - Copy/paste |
| Magic UI | 🟡 HIGH | Animations, interactions | MEDIUM - Copy/paste |
| 21st.dev | 🟡 HIGH | Sections, components | LOW - Magic MCP available |
| Motion.dev | 🟢 MEDIUM | Animations | LOW - Add library |
| Tailwind CSS | 🔴 CRITICAL | Styling system | ✅ Already integrated |
| Kokonut UI | 🟢 MEDIUM | Polish components | LOW - Copy/paste |
| React Bits | 🟢 MEDIUM | Text effects | LOW - Copy/paste |

---

## Implementation Strategy

### Phase 1: Foundation (Weeks 1-2)
1. ✅ ShadCN forms (already integrated)
2. 🔄 AI SDK Elements setup
3. 🔄 Core navigation components
4. 🔄 Card components for site profiles

### Phase 2: Enhancement (Weeks 3-4)
1. Data visualization (maps, charts)
2. Advanced form components (file upload)
3. Modal workflows
4. Loading states

### Phase 3: Polish (Weeks 5-6)
1. Background effects
2. Text animations
3. Button variations
4. Micro-interactions

---

## Next Steps

1. **Create AI SDK Integration Guide** → Separate detailed doc
2. **Build Component Storybook** → Catalog implemented components
3. **Establish Design Tokens** → Trial type colors, spacing, typography
4. **Create Component Skills** → Use Skill Seekers for frequently used patterns

---

## Related Documentation

- `/claudedocs/ai-sdk-implementation.md` - AI SDK detailed guide
- `/claudedocs/component-catalog.md` - Implemented component registry
- `/claudedocs/design-system.md` - SponCite design tokens & patterns
- `/skills/ui-development/` - Claude Code skills for UI components
