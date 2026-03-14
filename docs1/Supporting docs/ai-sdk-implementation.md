# AI SDK Implementation Guide for SponCite

**Last Updated**: 2025-10-21
**Purpose**: Detailed guide for implementing AI SDK Elements in SponCite platform

## Overview

The Vercel AI SDK Elements provide pre-built React components for AI-powered interfaces. This guide focuses on implementing them for SponCite's clinical trial matching and feasibility workflows.

**Official Documentation**: https://ai-sdk.dev/elements/overview

---

## Setup

### 1. Installation

```bash
npm install ai @ai-sdk/react @ai-sdk/openai
npm install @ai-sdk/elements
```

### 2. Environment Configuration

Add to `/Users/vadimfedulov/sponcite-v1/.env.local`:

```bash
# AI SDK Configuration
OPENAI_API_KEY=sk-... # Already configured
AI_SDK_MODEL=gpt-4o-mini # Cost-effective for matching
AI_SDK_MAX_TOKENS=2048
AI_SDK_TEMPERATURE=0.7
```

### 3. Base API Route Setup

Create `/Users/vadimfedulov/sponcite-v1/app/api/ai/chat/route.ts`:

```typescript
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: `You are an AI assistant for SponCite, a clinical trial site discovery platform.

    Your role is to help pharmaceutical sponsors (like Dr. Vance) find qualified clinical research sites.

    When analyzing trial requirements, consider:
    - Trial type (Drug, Device, IVDR)
    - Therapeutic area and indication
    - Patient population requirements
    - Site capabilities and certifications
    - Geographic preferences

    Always provide reasoning for your recommendations and cite specific site qualifications.`,
  })

  return result.toDataStreamResponse()
}
```

---

## Core Components Implementation

### 1. Chain of Thought Component

**Use Case**: Show step-by-step reasoning for site matching

**Location**: `/Users/vadimfedulov/sponcite-v1/components/ai/chain-of-thought-display.tsx`

```typescript
'use client'

import { ChainOfThought } from '@ai-sdk/elements'

interface MatchingStep {
  title: string
  description: string
  status: 'pending' | 'active' | 'complete'
}

interface ChainOfThoughtDisplayProps {
  steps: MatchingStep[]
  trialType: 'drug' | 'device' | 'ivdr'
}

export function ChainOfThoughtDisplay({
  steps,
  trialType
}: ChainOfThoughtDisplayProps) {
  const typeColors = {
    drug: 'border-blue-500 text-blue-700',
    device: 'border-green-500 text-green-700',
    ivdr: 'border-purple-500 text-purple-700',
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">
        Matching Process
      </h3>
      <ChainOfThought
        steps={steps}
        className={`border-l-4 ${typeColors[trialType]}`}
      />
    </div>
  )
}
```

**Usage Example**:

```typescript
// In sponsor matching wizard
const matchingSteps = [
  {
    title: 'Analyzing Trial Requirements',
    description: 'Phase III oncology trial requiring 50 patients',
    status: 'complete'
  },
  {
    title: 'Filtering Sites by Therapeutic Area',
    description: 'Found 23 sites with oncology expertise',
    status: 'complete'
  },
  {
    title: 'Checking GCP Certification',
    description: '18 sites have verified GCP credentials',
    status: 'active'
  },
  {
    title: 'Calculating Match Confidence',
    description: 'Scoring sites based on performance metrics',
    status: 'pending'
  }
]

<ChainOfThoughtDisplay steps={matchingSteps} trialType="drug" />
```

---

### 2. Reasoning Component

**Use Case**: Explain AI match scores and recommendations

**Location**: `/Users/vadimfedulov/sponcite-v1/components/ai/match-reasoning.tsx`

```typescript
'use client'

import { Reasoning } from '@ai-sdk/elements'

interface MatchReasoningProps {
  siteName: string
  matchScore: number
  factors: {
    category: string
    score: number
    explanation: string
  }[]
  trialType: 'drug' | 'device' | 'ivdr'
}

export function MatchReasoning({
  siteName,
  matchScore,
  factors,
  trialType
}: MatchReasoningProps) {
  const typeColors = {
    drug: 'bg-blue-50 border-blue-200',
    device: 'bg-green-50 border-green-200',
    ivdr: 'bg-purple-50 border-purple-200',
  }

  return (
    <Reasoning
      className={`rounded-lg border p-4 ${typeColors[trialType]}`}
      title={`Why ${siteName} is a ${matchScore}% match`}
    >
      <div className="space-y-3">
        {factors.map((factor, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{factor.category}</span>
                <span className="text-sm text-gray-600">{factor.score}%</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {factor.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Reasoning>
  )
}
```

**Usage Example**:

```typescript
<MatchReasoning
  siteName="City Medical Research Institute"
  matchScore={92}
  trialType="drug"
  factors={[
    {
      category: 'Therapeutic Expertise',
      score: 95,
      explanation: '10+ years oncology trial experience, 15 completed Phase III trials'
    },
    {
      category: 'Patient Access',
      score: 88,
      explanation: 'Database of 5,000+ oncology patients, strong recruitment record'
    },
    {
      category: 'GCP Compliance',
      score: 100,
      explanation: 'ISO 14155 certified, zero major audit findings in 3 years'
    },
    {
      category: 'Performance Metrics',
      score: 85,
      explanation: '92% enrollment success rate, average 45-day startup time'
    }
  ]}
/>
```

---

### 3. Chatbot Component

**Use Case**: Natural language trial search and site discovery

**Location**: `/Users/vadimfedulov/sponcite-v1/components/ai/trial-search-chat.tsx`

```typescript
'use client'

import { useChat } from 'ai/react'
import {
  Chatbot,
  Message,
  PromptInput,
  Suggestion
} from '@ai-sdk/elements'

interface TrialSearchChatProps {
  trialType: 'drug' | 'device' | 'ivdr'
  userRole: 'sponsor' | 'site'
}

export function TrialSearchChat({
  trialType,
  userRole
}: TrialSearchChatProps) {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({
      api: '/api/ai/trial-matching',
      body: { trialType, userRole },
    })

  const suggestions = trialType === 'drug'
    ? [
        'Find sites with oncology expertise in Phase III trials',
        'Sites with 90%+ enrollment success in cardiovascular studies',
        'GCP-certified sites in Northeast US with 100+ patient database'
      ]
    : trialType === 'device'
    ? [
        'Sites with Class III device trial experience',
        'Facilities with climate-controlled storage for sensitive devices',
        'Sites experienced in implantable device trials'
      ]
    : [ // IVDR
        'Labs certified for ISO 15189 diagnostic testing',
        'Sites with molecular diagnostics platforms',
        'Clinical labs with FDA CLIA certification'
      ]

  return (
    <Chatbot className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Ask me anything about finding clinical trial sites:
            </p>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Suggestion
                  key={index}
                  text={suggestion}
                  onClick={() => {
                    handleInputChange({
                      target: { value: suggestion }
                    } as any)
                    handleSubmit(new Event('submit') as any)
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isUser={message.role === 'user'}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
            Searching sites...
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <PromptInput
          value={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          placeholder="Describe your trial site requirements..."
          disabled={isLoading}
        />
      </div>
    </Chatbot>
  )
}
```

---

### 4. Actions Component

**Use Case**: Interactive actions in AI responses

**Location**: `/Users/vadimfedulov/sponcite-v1/components/ai/ai-actions.tsx`

```typescript
'use client'

import { Actions } from '@ai-sdk/elements'
import { useRouter } from 'next/navigation'

interface AIActionsProps {
  siteId?: string
  actions: {
    label: string
    action: 'shortlist' | 'feasibility' | 'view-profile' | 'compare'
    variant: 'primary' | 'secondary' | 'outline'
  }[]
}

export function AIActions({ siteId, actions }: AIActionsProps) {
  const router = useRouter()

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case 'shortlist':
        // Add to shortlist logic
        console.log('Adding to shortlist:', siteId)
        break
      case 'feasibility':
        router.push(`/sponsor/feasibility/new?siteId=${siteId}`)
        break
      case 'view-profile':
        router.push(`/sponsor/sites/${siteId}`)
        break
      case 'compare':
        // Add to comparison logic
        console.log('Adding to comparison:', siteId)
        break
    }
  }

  return (
    <Actions
      actions={actions.map(action => ({
        ...action,
        onClick: () => handleAction(action.action)
      }))}
      className="flex gap-2 mt-4"
    />
  )
}
```

**Usage in AI Response**:

```typescript
// In API route response
const siteRecommendation = {
  content: "I found City Medical Research Institute - 92% match for your oncology trial.",
  actions: [
    {
      label: '📋 Request Feasibility',
      action: 'feasibility',
      variant: 'primary'
    },
    {
      label: '⭐ Add to Shortlist',
      action: 'shortlist',
      variant: 'secondary'
    },
    {
      label: '👁️ View Profile',
      action: 'view-profile',
      variant: 'outline'
    }
  ]
}
```

---

### 5. Context Component

**Use Case**: Maintain trial search context across sessions

**Location**: `/Users/vadimfedulov/sponcite-v1/components/ai/search-context.tsx`

```typescript
'use client'

import { Context } from '@ai-sdk/elements'
import { useState, useEffect } from 'react'

interface SearchContextData {
  trialType: 'drug' | 'device' | 'ivdr'
  therapeuticArea?: string
  phase?: string
  patientCount?: number
  geographicPreferences?: string[]
}

export function SearchContext() {
  const [context, setContext] = useState<SearchContextData | null>(null)

  useEffect(() => {
    // Load context from localStorage
    const savedContext = localStorage.getItem('sponcite-search-context')
    if (savedContext) {
      setContext(JSON.parse(savedContext))
    }
  }, [])

  const updateContext = (newContext: Partial<SearchContextData>) => {
    const updated = { ...context, ...newContext }
    setContext(updated as SearchContextData)
    localStorage.setItem('sponcite-search-context', JSON.stringify(updated))
  }

  if (!context) return null

  return (
    <Context
      data={context}
      className="bg-blue-50 border border-blue-200 rounded-lg p-3"
    >
      <div className="text-sm space-y-1">
        <p className="font-medium">Current Search Context:</p>
        <ul className="text-gray-600 space-y-1">
          <li>Trial Type: {context.trialType.toUpperCase()}</li>
          {context.therapeuticArea && (
            <li>Area: {context.therapeuticArea}</li>
          )}
          {context.phase && <li>Phase: {context.phase}</li>}
          {context.patientCount && (
            <li>Patients: {context.patientCount}</li>
          )}
        </ul>
      </div>
    </Context>
  )
}
```

---

### 6. Inline Citation Component

**Use Case**: Reference regulatory guidelines and certifications

**Location**: `/Users/vadimfedulov/sponcite-v1/components/ai/regulatory-citation.tsx`

```typescript
'use client'

import { InlineCitation } from '@ai-sdk/elements'

interface RegulatoryCitationProps {
  regulation: 'GCP' | 'ISO-14155' | 'FDA-21-CFR' | 'CLIA' | 'ISO-15189'
  context: string
}

export function RegulatoryCitation({
  regulation,
  context
}: RegulatoryCitationProps) {
  const citations = {
    'GCP': {
      title: 'ICH E6(R2) Good Clinical Practice',
      url: 'https://www.ich.org/page/efficacy-guidelines',
      description: 'International standard for clinical trial conduct'
    },
    'ISO-14155': {
      title: 'ISO 14155:2020 - Clinical Investigation of Medical Devices',
      url: 'https://www.iso.org/standard/71690.html',
      description: 'Good clinical practice for medical device trials'
    },
    'FDA-21-CFR': {
      title: 'FDA 21 CFR Part 11',
      url: 'https://www.fda.gov/regulatory-information',
      description: 'Electronic records and signatures regulation'
    },
    'CLIA': {
      title: 'CLIA Laboratory Certification',
      url: 'https://www.cms.gov/clia',
      description: 'Clinical Laboratory Improvement Amendments'
    },
    'ISO-15189': {
      title: 'ISO 15189:2022 - Medical Laboratories',
      url: 'https://www.iso.org/standard/76677.html',
      description: 'Quality and competence requirements for medical labs'
    }
  }

  const citation = citations[regulation]

  return (
    <InlineCitation
      title={citation.title}
      url={citation.url}
      description={citation.description}
      context={context}
    />
  )
}
```

**Usage Example**:

```typescript
<p>
  This site maintains {' '}
  <RegulatoryCitation
    regulation="GCP"
    context="Site is ICH GCP certified with zero major audit findings"
  />
  {' '} certification with verified compliance records.
</p>
```

---

## Advanced Implementation Patterns

### 1. Progressive Feasibility Workflow

Combine multiple AI SDK elements for the progressive feasibility feature:

```typescript
'use client'

import { useState } from 'react'
import { ChainOfThought } from '@ai-sdk/elements'
import { MatchReasoning } from '@/components/ai/match-reasoning'
import { AIActions } from '@/components/ai/ai-actions'

export function ProgressiveFeasibilityWorkflow() {
  const [stage, setStage] = useState<'quick' | 'detailed'>('quick')

  return (
    <div className="space-y-6">
      {/* Stage 1: Quick 3-Question Match */}
      {stage === 'quick' && (
        <>
          <ChainOfThoughtDisplay
            steps={quickMatchSteps}
            trialType="drug"
          />

          <MatchReasoning
            siteName="City Medical Research"
            matchScore={85}
            trialType="drug"
            factors={quickFactors}
          />

          <AIActions
            actions={[
              {
                label: 'Good enough - Request Feasibility',
                action: 'feasibility',
                variant: 'primary'
              },
              {
                label: 'Need more details',
                action: () => setStage('detailed'),
                variant: 'secondary'
              }
            ]}
          />
        </>
      )}

      {/* Stage 2: Detailed Analysis (if requested) */}
      {stage === 'detailed' && (
        <>
          <ChainOfThoughtDisplay
            steps={detailedMatchSteps}
            trialType="drug"
          />

          <MatchReasoning
            siteName="City Medical Research"
            matchScore={92}
            trialType="drug"
            factors={detailedFactors}
          />

          {/* More detailed information here */}
        </>
      )}
    </div>
  )
}
```

---

## API Route Examples

### Trial Matching API

**Location**: `/Users/vadimfedulov/sponcite-v1/app/api/ai/trial-matching/route.ts`

```typescript
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, trialType, userRole } = await req.json()

  const systemPrompts = {
    drug: `You are assisting with pharmaceutical drug trials. Focus on:
    - Patient populations and enrollment capabilities
    - Therapeutic area expertise
    - GCP compliance and regulatory history
    - PI qualifications in specific therapeutic areas`,

    device: `You are assisting with medical device trials. Focus on:
    - Technical infrastructure and equipment
    - Storage requirements for sensitive devices
    - Staff technical qualifications
    - Device-specific regulatory compliance (ISO 14155)`,

    ivdr: `You are assisting with in vitro diagnostic trials. Focus on:
    - Laboratory certifications (CLIA, ISO 15189)
    - Diagnostic testing platforms and capabilities
    - Quality management systems
    - Sample handling and storage protocols`
  }

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: `You are an AI assistant for SponCite clinical trial site discovery.

    ${systemPrompts[trialType as keyof typeof systemPrompts]}

    Always provide:
    1. Chain of thought reasoning for your recommendations
    2. Specific match factors and scores
    3. Relevant regulatory citations
    4. Actionable next steps

    Format responses with clear structure for UI rendering.`,

    tools: {
      searchSites: {
        description: 'Search for clinical trial sites matching criteria',
        parameters: {
          therapeuticArea: { type: 'string' },
          trialPhase: { type: 'string' },
          location: { type: 'string' },
          certifications: { type: 'array' }
        },
        execute: async (params) => {
          // Call to database/search service
          return { sites: [] /* search results */ }
        }
      },
      calculateMatchScore: {
        description: 'Calculate match confidence score',
        parameters: {
          siteId: { type: 'string' },
          requirements: { type: 'object' }
        },
        execute: async (params) => {
          // Scoring logic
          return { score: 0, factors: [] }
        }
      }
    }
  })

  return result.toDataStreamResponse()
}
```

---

## Testing Strategy

### 1. Component Testing

```typescript
// __tests__/ai/chain-of-thought-display.test.tsx
import { render, screen } from '@testing-library/react'
import { ChainOfThoughtDisplay } from '@/components/ai/chain-of-thought-display'

describe('ChainOfThoughtDisplay', () => {
  it('renders matching steps correctly', () => {
    const steps = [
      { title: 'Step 1', description: 'Analyzing', status: 'complete' },
      { title: 'Step 2', description: 'Filtering', status: 'active' }
    ]

    render(<ChainOfThoughtDisplay steps={steps} trialType="drug" />)

    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Analyzing')).toBeInTheDocument()
  })

  it('applies correct trial type styling', () => {
    const { container } = render(
      <ChainOfThoughtDisplay steps={[]} trialType="device" />
    )

    expect(container.querySelector('.border-green-500')).toBeInTheDocument()
  })
})
```

### 2. E2E Testing with Playwright

```typescript
// tests/e2e/ai-trial-matching.spec.ts
import { test, expect } from '@playwright/test'

test.describe('AI Trial Matching', () => {
  test('should show chain of thought for site matching', async ({ page }) => {
    await page.goto('/sponsor/trial-matching')

    // Enter trial requirements
    await page.fill('[name="therapeuticArea"]', 'Oncology')
    await page.selectOption('[name="phase"]', 'III')
    await page.click('button:has-text("Find Sites")')

    // Wait for AI response with chain of thought
    await expect(page.locator('.chain-of-thought')).toBeVisible()
    await expect(page.locator('text=Analyzing Trial Requirements')).toBeVisible()
  })

  test('should provide reasoning for match scores', async ({ page }) => {
    await page.goto('/sponsor/sites/site-123')

    await expect(page.locator('.match-reasoning')).toBeVisible()
    await expect(page.locator('text=Why City Medical is a')).toBeVisible()
    await expect(page.locator('text=Therapeutic Expertise')).toBeVisible()
  })
})
```

---

## Performance Optimization

### 1. Streaming Responses

Always use streaming for AI responses to improve perceived performance:

```typescript
const { messages, isLoading } = useChat({
  api: '/api/ai/chat',
  streamMode: 'stream-data', // Enable streaming
})
```

### 2. Caching Frequent Queries

```typescript
// Implement Redis caching for common search patterns
import { kv } from '@vercel/kv'

async function getCachedSiteMatches(queryKey: string) {
  const cached = await kv.get(`site-match:${queryKey}`)
  if (cached) return cached

  // Fetch fresh data
  const matches = await fetchSiteMatches()
  await kv.set(`site-match:${queryKey}`, matches, { ex: 3600 }) // 1 hour cache

  return matches
}
```

---

## Security Considerations

### 1. Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
})

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for')
  const { success } = await ratelimit.limit(ip ?? 'anonymous')

  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }

  return NextResponse.next()
}
```

### 2. Input Sanitization

```typescript
// Sanitize user inputs before sending to AI
import { sanitize } from 'isomorphic-dompurify'

function sanitizeUserMessage(message: string): string {
  return sanitize(message, {
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: []
  })
}
```

---

## Cost Optimization

### Model Selection by Use Case

```typescript
const modelConfig = {
  'quick-search': 'gpt-4o-mini',      // $0.150/1M input tokens
  'detailed-analysis': 'gpt-4o',      // $2.50/1M input tokens
  'match-scoring': 'gpt-4o-mini',     // Fast and cheap
  'report-generation': 'gpt-4o',      // Higher quality needed
}
```

### Token Usage Monitoring

```typescript
// Track token usage per user/organization
async function trackTokenUsage(userId: string, tokens: number) {
  await prisma.usageLog.create({
    data: {
      userId,
      tokens,
      cost: calculateCost(tokens),
      timestamp: new Date()
    }
  })
}
```

---

## Next Steps

1. ✅ Review this implementation guide
2. 🔄 Set up AI SDK in development environment
3. 🔄 Implement basic chatbot for trial search
4. 🔄 Add chain of thought to matching wizard
5. 🔄 Create reasoning display for match scores
6. 🔄 Build progressive feasibility workflow
7. 🔄 Write E2E tests for AI features
8. 🔄 Deploy and monitor performance

---

## Related Documentation

- [UI Component Ecosystem](/claudedocs/ui-component-ecosystem.md)
- [SponCite PRD](/docs/prd.md)
- [Testing Strategy](/docs/testing-strategy.md)
