# PostHog Analytics Integration Guide

## Overview

PostHog is integrated into the SponCite platform for comprehensive analytics, event tracking, session recording, and feature flags. This guide explains how to use PostHog effectively throughout the application.

## Configuration

### Environment Variables

Add these to your `.env.local` and deployment environment:

```env
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
```

**How to get your PostHog key:**
1. Sign up at [posthog.com](https://posthog.com) or [eu.posthog.com](https://eu.posthog.com) for EU hosting
2. Create a new project
3. Copy the Project API Key from Project Settings > Project API Key
4. Replace `phc_your_actual_posthog_project_key` with your actual key

**Note**: The `NEXT_PUBLIC_` prefix makes these variables available to the client-side code.

## Architecture

### Client-Side Tracking
- **File**: `app/providers.tsx`
- **Purpose**: Automatic page view tracking, user interactions, client-side events
- **Usage**: Wrap your app with `<PostHogProvider>` (already done in `app/layout.tsx`)

### Server-Side Tracking
- **File**: `lib/posthog/server.ts`
- **Purpose**: Track backend events, API calls, server actions
- **Usage**: Import `posthogServer` in Server Components, API Routes, or Server Actions

## Client-Side Usage

### Automatic Tracking

The following are automatically tracked:
- **Page views**: Every route change
- **Click events**: Buttons and links
- **Page leave events**: When users navigate away

### Manual Event Tracking

Use the `usePostHog` hook in any Client Component:

```typescript
'use client'

import { usePostHog } from 'posthog-js/react'

export function MyComponent() {
  const posthog = usePostHog()

  const handleAction = () => {
    posthog.capture('custom_event', {
      property1: 'value1',
      property2: 'value2',
    })
  }

  return <button onClick={handleAction}>Track Event</button>
}
```

### User Identification

Identify users after authentication:

```typescript
'use client'

import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

export function AuthenticatedLayout({ user }: { user: User }) {
  const posthog = usePostHog()

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
        role: user.role,
        organization: user.organization,
      })
    }
  }, [user, posthog])

  return <>{/* Your layout */}</>
}
```

### Feature Flags

Check feature flags in Client Components:

```typescript
'use client'

import { useFeatureFlagEnabled } from 'posthog-js/react'

export function MyComponent() {
  const isNewFeatureEnabled = useFeatureFlagEnabled('new-feature')

  if (isNewFeatureEnabled) {
    return <NewFeatureComponent />
  }

  return <OldFeatureComponent />
}
```

## Server-Side Usage

### API Routes

Track backend events in API routes:

```typescript
import { posthogServer, flushPostHog } from '@/lib/posthog/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()

  // Capture server-side event
  posthogServer.capture({
    distinctId: data.userId || 'anonymous',
    event: 'api_call_made',
    properties: {
      endpoint: '/api/sites',
      method: 'POST',
      success: true,
      responseTime: 150,
    },
  })

  // Process request...
  const result = await processRequest(data)

  // Flush events before response (important for serverless)
  await flushPostHog()

  return NextResponse.json(result)
}
```

### Server Components

Track page views or events in Server Components:

```typescript
import { posthogServer } from '@/lib/posthog/server'

export default async function PricingPage() {
  // Track server-side page view
  posthogServer.capture({
    distinctId: 'anonymous',
    event: '$pageview',
    properties: {
      $current_url: '/pricing',
      page_type: 'marketing',
    },
  })

  return <div>{/* Your page content */}</div>
}
```

### Server Actions

Track events in Server Actions:

```typescript
'use server'

import { posthogServer, flushPostHog } from '@/lib/posthog/server'

export async function createSite(formData: FormData) {
  const userId = await getCurrentUserId()

  posthogServer.capture({
    distinctId: userId,
    event: 'site_created',
    properties: {
      siteName: formData.get('name'),
      siteType: formData.get('type'),
    },
  })

  // Create site...
  const result = await saveSiteToDatabase(formData)

  // Flush events before function ends
  await flushPostHog()

  return result
}
```

## Key Events to Track

### Authentication Events
```typescript
// User registration
posthog.capture('user_registered', {
  role: 'sponsor', // or 'site'
  signupMethod: 'email', // or 'google', 'meta'
})

// User login
posthog.capture('user_logged_in', {
  method: 'email', // or 'oauth'
})

// User logout
posthog.capture('user_logged_out')
```

### Site Discovery Events
```typescript
// Search performed
posthog.capture('site_search', {
  query: searchTerm,
  filters: {
    trialType: 'drug',
    location: 'US',
    therapeutic_area: 'oncology',
  },
  resultsCount: 15,
})

// Site profile viewed
posthog.capture('site_profile_viewed', {
  siteId: site.id,
  siteName: site.name,
  isVerified: site.is_verified,
})

// Site added to shortlist
posthog.capture('site_shortlisted', {
  siteId: site.id,
  shortlistName: shortlist.name,
})
```

### Feasibility Events
```typescript
// Questionnaire started
posthog.capture('questionnaire_started', {
  questionnaireType: '3_question_wizard',
  trialType: 'drug',
})

// Questionnaire completed
posthog.capture('questionnaire_completed', {
  questionnaireType: '3_question_wizard',
  timeToComplete: 120, // seconds
  sitesMatched: 8,
})

// Feasibility request sent
posthog.capture('feasibility_request_sent', {
  siteId: site.id,
  questionnaireVersion: '1.0',
  expectedResponseTime: '24_hours',
})
```

### Introduction Events
```typescript
// Introduction requested
posthog.capture('introduction_requested', {
  sponsorId: sponsor.id,
  siteId: site.id,
  hasAttachment: !!pdfUrl,
})

// Introduction accepted
posthog.capture('introduction_accepted', {
  introductionId: introduction.id,
  responseTime: timeInHours,
})

// Introduction declined
posthog.capture('introduction_declined', {
  introductionId: introduction.id,
  declineReason: reason,
})
```

### Billing Events
```typescript
// Subscription started
posthog.capture('subscription_started', {
  plan: 'pro',
  billingPeriod: 'monthly',
  amount: 299,
})

// Subscription upgraded
posthog.capture('subscription_upgraded', {
  fromPlan: 'free',
  toPlan: 'pro',
  reason: 'site_limit_reached',
})

// Payment failed
posthog.capture('payment_failed', {
  plan: 'pro',
  errorCode: 'card_declined',
})
```

## Session Recording

### Enable for Specific Users
```typescript
posthog.startSessionRecording()
```

### Disable for Specific Users
```typescript
posthog.stopSessionRecording()
```

### Mask Sensitive Data

Add the `.sensitive` class to any element containing sensitive data:

```tsx
<input type="text" className="sensitive" placeholder="Credit card number" />
```

All input fields are automatically masked by default. Override in `app/providers.tsx` if needed.

## Feature Flags

### Create a Feature Flag

1. Go to PostHog Dashboard → Feature Flags
2. Click "New feature flag"
3. Set flag key (e.g., `new-matching-algorithm`)
4. Configure rollout percentage or user targeting
5. Save flag

### Use in Client Components

```typescript
'use client'

import { useFeatureFlagEnabled } from 'posthog-js/react'

export function MatchingWizard() {
  const useNewAlgorithm = useFeatureFlagEnabled('new-matching-algorithm')

  if (useNewAlgorithm) {
    return <NewMatchingAlgorithm />
  }

  return <LegacyMatchingAlgorithm />
}
```

### Use in Server Components

```typescript
import { posthogServer } from '@/lib/posthog/server'

export default async function Page({ params }: { params: { userId: string } }) {
  const isEnabled = await posthogServer.isFeatureEnabled(
    'new-matching-algorithm',
    params.userId
  )

  if (isEnabled) {
    return <NewMatchingAlgorithm />
  }

  return <LegacyMatchingAlgorithm />
}
```

## Testing

### Local Development

1. Set environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_test_project_key
   NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser DevTools → Network tab → Filter by "posthog"
4. Navigate the app and verify events are being captured
5. Check PostHog dashboard for events appearing

### Verify Integration

1. Navigate to a few pages in your local app
2. Go to PostHog Dashboard → Live Events
3. Verify `$pageview` events are appearing
4. Trigger custom events (e.g., button clicks)
5. Verify custom events appear in Live Events

### Debug Mode

PostHog runs in debug mode automatically in development. Check the console for PostHog logs.

## Privacy & Compliance

### GDPR Compliance

PostHog is GDPR-compliant when hosted in EU (https://eu.posthog.com):
- User data stored in EU servers
- Easy data export and deletion
- Privacy-focused session recording

### User Consent

Consider implementing a cookie consent banner:

```typescript
'use client'

import { usePostHog } from 'posthog-js/react'

export function CookieConsent() {
  const posthog = usePostHog()

  const acceptTracking = () => {
    posthog.opt_in_capturing()
    // Save consent preference
  }

  const rejectTracking = () => {
    posthog.opt_out_capturing()
    // Save consent preference
  }

  return (
    <div className="cookie-consent">
      <p>We use cookies to improve your experience</p>
      <button onClick={acceptTracking}>Accept</button>
      <button onClick={rejectTracking}>Reject</button>
    </div>
  )
}
```

### Data Retention

Configure in PostHog Dashboard → Project Settings → Data Retention:
- Events: 1 year (default)
- Session recordings: 3 months (recommended)
- Feature flag evaluations: 1 month

## Performance Optimization

### Reduce Bundle Size

PostHog is loaded asynchronously and doesn't block page rendering.

### Serverless Functions

Always call `flushPostHog()` at the end of API routes and Server Actions to ensure events are sent before the serverless function terminates:

```typescript
import { flushPostHog } from '@/lib/posthog/server'

export async function POST(request: Request) {
  // Your logic...

  await flushPostHog() // Critical for serverless!

  return response
}
```

## Troubleshooting

### Events Not Appearing

1. **Check environment variables**: Verify `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are set correctly
2. **Check browser console**: Look for PostHog initialization errors
3. **Check Network tab**: Verify requests are being sent to PostHog
4. **Check PostHog project**: Ensure you're looking at the correct project in the dashboard

### Ad Blockers

Ad blockers may block PostHog requests. Consider:
- Using a custom domain (proxy) for PostHog
- Adding PostHog to ad blocker whitelist for development

### TypeScript Errors

If you encounter TypeScript errors with PostHog types, ensure you have the latest version:

```bash
npm install posthog-js@latest posthog-node@latest
```

## Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Next.js Guide](https://posthog.com/docs/libraries/next-js)
- [PostHog React Hooks](https://posthog.com/docs/libraries/react)
- [PostHog Feature Flags](https://posthog.com/docs/feature-flags)
- [PostHog Session Recording](https://posthog.com/docs/session-replay)

## Next Steps

After integration is complete:
1. Set up key events for your user journeys (Task 55)
2. Configure session recording for user experience analysis (Task 56)
3. Implement A/B testing with feature flags (Task 57)
4. Create custom dashboards for business metrics (Task 58)
