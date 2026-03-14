# AI Infrastructure - Final Production Configuration

**Date**: 2025-10-21
**Status**: ✅ Production Ready
**Task**: #64 Complete

---

## Executive Summary

SponCite's AI infrastructure is now fully configured and operational using LiteLLM proxy with three-tier model routing, database integration, caching, and comprehensive observability.

### Key Achievements
- ✅ LiteLLM proxy deployed on DigitalOcean (159.89.14.230:4000)
- ✅ Three-tier model routing (Gemini/Grok/Claude)
- ✅ Supabase database integration with pgvector
- ✅ Redis caching for cost optimization
- ✅ Vercel AI SDK 5 streaming integration
- ✅ PII masking for GDPR compliance
- ✅ Cost tracking dashboard operational

---

## Production Configuration

### Environment Variables (.env.local)

```bash
# LiteLLM Production Configuration
LITELLM_URL=http://159.89.14.230:4000/v1
LITELLM_API_KEY=sk-sponcite-7f3d8a2b9c4e5f6a1b2c3d4e5f6a7b8c

# Model Selection (production values)
LITELLM_MODEL_CHEAP=router/cheap        # Gemini 2.0 Flash Lite
LITELLM_MODEL_STANDARD=router/standard  # Grok-4-Fast-Reasoning
LITELLM_MODEL_COMPLEX=router/complex    # Claude Sonnet 4.5

# Feature Flags
AI_ENABLED=true
AI_STREAMING=true
AI_STRUCTURED_OUTPUT=true

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://bnwzyuhumupwdouxegaz.supabase.co
SUPABASE_SERVICE_KEY=<service_key>
DATABASE_URL=postgresql://postgres:<password>@db.bnwzyuhumupwdouxegaz.supabase.co:5432/postgres
```

---

## Model Tier Strategy

### Tier 1: Cheap (router/cheap)
**Model**: Gemini 2.0 Flash Lite
**Cost**: Lowest (~$0.10 per 1M tokens)
**Use Cases**:
- Simple entity extraction
- Binary classifications
- Quick data validation
- Completeness checks
- Basic categorization

**When to Use**:
```typescript
// Simple extraction tasks
const model = 'router/cheap'
const result = await generateText({
  model,
  prompt: 'Extract therapeutic areas from: {{document}}'
})
```

### Tier 2: Standard (router/standard)
**Model**: Grok-4-Fast-Reasoning
**Cost**: Medium (~$1.50 per 1M tokens)
**Use Cases**:
- Conversational AI (chatbot)
- Natural language search
- Profile completeness suggestions
- Standard query parsing
- Multi-step reasoning

**When to Use**:
```typescript
// Conversational interactions
const model = 'router/standard'
const { messages } = useChat({
  api: '/api/ai/trial-search-chat',
  body: { model }
})
```

### Tier 3: Complex (router/complex)
**Model**: Claude Sonnet 4.5
**Cost**: Highest (~$3.00 per 1M tokens)
**Use Cases**:
- Match score explanations with reasoning
- Complex profile field generation
- Multi-document analysis
- High-quality content drafting
- Advanced chain-of-thought reasoning

**When to Use**:
```typescript
// Complex reasoning tasks
const model = 'router/complex'
const result = await streamText({
  model,
  system: 'Provide detailed match reasoning...',
  tools: { calculateMatchScore, analyzeCapabilities }
})
```

---

## Integration Architecture

### 1. LiteLLM Proxy
**Location**: http://159.89.14.230:4000
**Dashboard**: http://159.89.14.230:4000/ui
**Features**:
- Unified API for all models
- Built-in Redis caching
- Automatic fallback routing
- Cost tracking per request
- PII masking for GDPR
- Rate limiting by user/org

### 2. Database Integration
**Service**: Supabase PostgreSQL
**Extensions**: pgvector for embeddings
**Connection**: Connection pooler for edge functions
**Features**:
- Vector similarity search
- Semantic search capability
- Session storage
- User preferences
- Match history

### 3. Caching Layer
**Service**: Redis (via LiteLLM)
**TTL**: 15 minutes for common queries
**Cache Keys**:
- Natural language search queries
- Site match calculations
- Profile suggestions
- Common entity extractions

**Expected Cache Hit Rate**: >60%

### 4. Streaming Infrastructure
**SDK**: Vercel AI SDK 5
**Protocol**: Server-Sent Events (SSE)
**Features**:
- Real-time response streaming
- Token-by-token rendering
- Cancellable requests
- Progress indicators

---

## API Usage Patterns

### Pattern 1: Simple Text Generation
```typescript
// app/api/ai/extract/route.ts
import { createLiteLLMClient } from '@/lib/litellm'
import { generateText } from 'ai'

export async function POST(req: Request) {
  const { document, extractionType } = await req.json()

  const litellm = createLiteLLMClient()

  const result = await generateText({
    model: litellm.models.cheap, // Gemini 2.0 Flash Lite
    prompt: `Extract ${extractionType} from: ${document}`,
    maxTokens: 500
  })

  return Response.json({ extracted: result.text })
}
```

### Pattern 2: Streaming Chat
```typescript
// app/api/ai/trial-search-chat/route.ts
import { createLiteLLMClient } from '@/lib/litellm'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages, trialType } = await req.json()

  const litellm = createLiteLLMClient()

  const result = await streamText({
    model: litellm.models.standard, // Grok-4-Fast-Reasoning
    messages,
    system: `AI assistant for ${trialType} trial site discovery...`,
    tools: {
      searchSites: {
        description: 'Search for clinical trial sites',
        execute: async (params) => {
          // Database search logic
        }
      }
    }
  })

  return result.toDataStreamResponse()
}
```

### Pattern 3: Structured Output
```typescript
// app/api/ai/match-reasoning/route.ts
import { createLiteLLMClient } from '@/lib/litellm'
import { generateObject } from 'ai'
import { z } from 'zod'

const matchReasoningSchema = z.object({
  overallScore: z.number().min(0).max(100),
  factors: z.array(z.object({
    category: z.string(),
    score: z.number(),
    explanation: z.string(),
    evidence: z.array(z.string())
  }))
})

export async function POST(req: Request) {
  const { siteId, trialRequirements } = await req.json()

  const litellm = createLiteLLMClient()

  const result = await generateObject({
    model: litellm.models.complex, // Claude Sonnet 4.5
    schema: matchReasoningSchema,
    prompt: `Analyze site-trial match: Site ${siteId} vs ${JSON.stringify(trialRequirements)}`
  })

  return Response.json(result.object)
}
```

---

## LiteLLM Client Configuration

### Client Setup
```typescript
// lib/litellm.ts
import { createOpenAI } from '@ai-sdk/openai'

export function createLiteLLMClient() {
  const baseURL = process.env.LITELLM_URL
  const apiKey = process.env.LITELLM_API_KEY

  if (!baseURL || !apiKey) {
    throw new Error('LiteLLM configuration missing')
  }

  const client = createOpenAI({
    baseURL,
    apiKey,
    compatibility: 'compatible' // OpenAI-compatible mode
  })

  return {
    client,
    models: {
      cheap: process.env.LITELLM_MODEL_CHEAP || 'router/cheap',
      standard: process.env.LITELLM_MODEL_STANDARD || 'router/standard',
      complex: process.env.LITELLM_MODEL_COMPLEX || 'router/complex'
    }
  }
}
```

### Usage in API Routes
```typescript
import { createLiteLLMClient } from '@/lib/litellm'
import { generateText } from 'ai'

const litellm = createLiteLLMClient()

// Use appropriate tier
const result = await generateText({
  model: litellm.models.standard, // or .cheap, .complex
  prompt: '...'
})
```

---

## Cost Optimization Strategy

### 1. Model Selection by Complexity
- **Simple tasks** → router/cheap (Gemini)
- **Standard conversations** → router/standard (Grok)
- **Complex reasoning** → router/complex (Claude)

### 2. Caching Strategy
```typescript
// LiteLLM automatically caches identical requests
// TTL: 15 minutes
// Expected savings: 40-60% reduction in API calls
```

### 3. Prompt Compression
```typescript
// Before: 500 tokens
const verbosePrompt = `
Please analyze this clinical trial site and provide detailed information about...
[lengthy explanation]
`

// After: 200 tokens
const compressedPrompt = `
Analyze site capabilities for ${trialType} ${phase} trial:
Required: ${requirements}
Output: JSON {capabilities, match_score, reasoning}
`
```

### 4. Response Streaming
```typescript
// Stream responses to reduce perceived latency
// Users see partial results immediately
// Can cancel long-running requests early
const stream = await streamText({
  model: litellm.models.standard,
  prompt: '...'
})
```

### 5. Cost Tracking
**Dashboard**: http://159.89.14.230:4000/ui

**Metrics Available**:
- Total requests per model
- Token usage per model
- Cost per request
- Average latency
- Cache hit rate
- Error rate

**Cost Targets**:
- Token usage per MAU: <100k
- Cost per active org: <$5/month
- Overall AI costs: <$500/month (100 active orgs)

---

## Security & Compliance

### PII Masking (GDPR)
```yaml
enabled: true
patterns:
  - email addresses
  - phone numbers
  - IP addresses
  - social security numbers
  - medical record numbers

action: mask_with_asterisks
log_detection: true
```

### Rate Limiting
```yaml
by_user:
  requests_per_minute: 60
  requests_per_hour: 1000

by_organization:
  requests_per_minute: 300
  requests_per_hour: 5000

by_ip:
  requests_per_minute: 100
```

### API Key Security
```yaml
storage: environment_variables
rotation: quarterly
access_logs: enabled
audit_trail: enabled
```

---

## Monitoring & Observability

### LiteLLM Dashboard
**URL**: http://159.89.14.230:4000/ui
**Metrics**:
- Request volume by model
- Latency percentiles (p50, p95, p99)
- Error rates
- Cost breakdown
- Cache performance

### Application Monitoring
```typescript
// Implement in API routes
import { trackAIMetrics } from '@/lib/observability'

trackAIMetrics({
  model: 'router/standard',
  operation: 'trial_search',
  latency: responseTime,
  tokens: tokensUsed,
  success: true
})
```

### Cost Alerts
```yaml
daily_limit: $50
weekly_limit: $200
monthly_limit: $500

alert_thresholds:
  - 50% of daily limit
  - 75% of daily limit
  - 90% of daily limit
  - 100% of daily limit (block requests)
```

---

## Updated Task Dependencies

### Task 64: Core AI Infrastructure ✅ COMPLETED
- LiteLLM proxy deployed
- Database integration complete
- Caching operational
- Monitoring active

### Task 65: Natural Language Search
**Updated Dependencies**: LiteLLM router/standard or router/complex
**Updated Stack**:
- Query parsing via Grok-4-Fast-Reasoning
- Embeddings via LiteLLM
- Vector search via Supabase pgvector
- Caching via Redis

### Task 67: AI-Powered Profile Assistant
**Updated Dependencies**: LiteLLM router/complex (Claude Sonnet 4.5)
**Updated Stack**:
- Document analysis via Claude
- Content drafting via Claude
- Suggestions via Grok (router/standard)
- Structured output mode enabled

### Task 73: AI Model Routing & Performance
**Updated Dependencies**: LiteLLM built-in routing
**Updated Stack**:
- Three-tier routing (cheap/standard/complex)
- Automatic caching
- Built-in fallbacks
- Dashboard monitoring

---

## Testing Strategy

### Unit Tests
```typescript
describe('LiteLLM Client', () => {
  it('should select correct model tier', () => {
    const client = createLiteLLMClient()
    expect(client.models.cheap).toBe('router/cheap')
    expect(client.models.standard).toBe('router/standard')
    expect(client.models.complex).toBe('router/complex')
  })

  it('should make successful API call', async () => {
    const result = await generateText({
      model: client.models.cheap,
      prompt: 'Test prompt'
    })
    expect(result.text).toBeDefined()
  })
})
```

### Integration Tests
```typescript
describe('AI Search Integration', () => {
  it('should return search results with <1.5s latency', async () => {
    const start = Date.now()
    const results = await searchSites('oncology Phase III sites')
    const latency = Date.now() - start

    expect(latency).toBeLessThan(1500)
    expect(results.length).toBeGreaterThan(0)
  })

  it('should cache repeated queries', async () => {
    await searchSites('cardiology sites')
    const cachedStart = Date.now()
    await searchSites('cardiology sites')
    const cachedLatency = Date.now() - cachedStart

    expect(cachedLatency).toBeLessThan(100) // Should be much faster
  })
})
```

### Performance Benchmarks
```yaml
p95_latency_targets:
  cheap_model: <500ms
  standard_model: <1000ms
  complex_model: <2000ms

cache_hit_rate: >60%
error_rate: <1%
availability: >99.5%
```

---

## Deployment Checklist

- [x] LiteLLM proxy deployed and accessible
- [x] Database connection pooler configured
- [x] Redis caching enabled
- [x] All three model tiers tested
- [x] Environment variables configured
- [x] Feature flags enabled
- [x] PII masking verified
- [x] Rate limiting configured
- [x] Cost tracking active
- [x] Dashboard accessible
- [x] Task #64 marked complete
- [x] Dependent tasks updated (65, 67, 73)
- [x] Documentation complete

---

## Next Steps

### Immediate (This Sprint)
1. ✅ Task #64 Complete - Infrastructure ready
2. 🔄 Implement natural language search (Task #65)
3. 🔄 Build AI profile assistant (Task #67)
4. 🔄 Create match reasoning UI (Task #66)

### Short-term (Next Sprint)
5. Implement feedback collection (Task #68)
6. Set up feature store (Task #69)
7. Build experiential memory (Task #70)

### Medium-term (Future Sprints)
8. Enhance observability (Task #71)
9. Strengthen security (Task #72)
10. Optimize routing (Task #73)
11. Polish UI integration (Task #74)

---

## Support & Resources

### Documentation
- LiteLLM Docs: https://docs.litellm.ai/
- Vercel AI SDK: https://sdk.vercel.ai/docs
- Supabase pgvector: https://supabase.com/docs/guides/ai

### Monitoring
- LiteLLM Dashboard: http://159.89.14.230:4000/ui
- Supabase Dashboard: https://app.supabase.com/project/bnwzyuhumupwdouxegaz

### Contact
- Infrastructure Issues: DevOps Team
- AI Feature Requests: Product Team
- Cost Concerns: Finance Team

---

**Status**: ✅ Production Ready
**Last Updated**: 2025-10-21
**Next Review**: 2025-11-04 (2 weeks)
