# Skills Integration Guide

## Quick Start

The `.claude/skills/` directory contains 5 essential skills that will improve every aspect of building SponCite:

1. **Design Guide** - Modern, professional UI components
2. **Idea Validator** - Honest feedback before building
3. **Launch Planner** - Ship MVPs fast, no feature creep
4. **Marketing Writer** - Compelling copy that converts
5. **Roadmap Builder** - Prioritize what actually matters

## Auto-Loading Skills in Claude Code

To make these skills always available, add to your `CLAUDE.md`:

```markdown
## Development Skills

Before any implementation, reference these skills:

### UI/UX Development
@.claude/skills/design-guide.md - Follow for every UI component

### Product Decisions
@.claude/skills/idea-validator.md - Validate before building
@.claude/skills/launch-planner.md - Scope MVPs properly
@.claude/skills/roadmap-builder.md - Prioritize features

### Marketing & Launch
@.claude/skills/marketing-writer.md - Write compelling copy
```

## Usage Patterns

### Pattern 1: New Feature Request

```
User: "Let's add AI-powered site recommendations"

Claude (using skills):
1. [Idea Validator] → Evaluates market demand, feasibility, monetization
2. [Roadmap Builder] → Checks if this fits current stage priorities
3. [Launch Planner] → Scopes MVP version if validated
4. Response: "Before building, here's my analysis..."
```

### Pattern 2: Building UI Component

```
User: "Create a trial site card component"

Claude (using skills):
1. [Design Guide] → Checks spacing, colors, typography standards
2. Implements following 8px grid, trial type colors, accessibility
3. Response includes: Component with proper hover states, WCAG compliant contrast, mobile responsive
```

### Pattern 3: Writing Marketing Copy

```
User: "Write the landing page hero section"

Claude (using skills):
1. [Marketing Writer] → Reads codebase to understand product
2. Applies Problem-Solution-Benefit framework
3. Uses casual, benefit-focused voice
4. Response: Hero section with specific outcomes, not vague promises
```

## Skill Invocation Examples

### Explicit Invocation
```
"Use the Design Guide skill to review this component"
"Apply the Idea Validator skill to this feature idea"
"Following the Marketing Writer skill, draft launch copy"
```

### Implicit (Claude should auto-apply)
When you:
- Create UI components → Design Guide applied
- Discuss new features → Idea Validator + Roadmap Builder consulted
- Write any user-facing copy → Marketing Writer voice used
- Plan development → Launch Planner scoping applied

## Skill Checklist by Task Type

### Creating New Feature
- [ ] Idea Validator - Is this worth building?
- [ ] Roadmap Builder - Is this the right priority?
- [ ] Launch Planner - How do we scope the MVP?
- [ ] Design Guide - How should it look?
- [ ] Marketing Writer - How do we announce it?

### Fixing UI Issues
- [ ] Design Guide - What's the design standard?
- [ ] Check: Spacing, colors, typography, accessibility
- [ ] Verify: Mobile responsive, proper states, WCAG compliant

### Writing Copy
- [ ] Marketing Writer - What's the brand voice?
- [ ] Apply: Problem-Solution-Benefit framework
- [ ] Verify: Specific benefits, no buzzwords, clear CTA

### Planning Roadmap
- [ ] Roadmap Builder - What stage are we in?
- [ ] Prioritize: Retention > Core > Monetization > Growth
- [ ] Validate: User demand, not assumptions

## SponCite-Specific Examples

### Example 1: User Requests "Add Video Conferencing"

**Without Skills**:
"Sure, I can build video conferencing with WebRTC..."

**With Skills**:
```
[Idea Validator] → Evaluating...
- Market: Users already have Zoom/Teams
- Demand: No evidence users want this
- Feasibility: 2-3 weeks, complex integration
- Monetization: Unclear value add
- Verdict: SKIP IT

Recommendation: Users have video conferencing tools. Focus on improving core matching workflow instead. If users need to meet sites, suggest integration with their existing calendar tools.
```

### Example 2: Building Site Profile Card

**Without Skills**:
```tsx
<div className="card">
  <h2>{site.name}</h2>
  <p>{site.location}</p>
</div>
```

**With Skills** (Design Guide applied):
```tsx
<Card className="group hover:shadow-md transition-shadow duration-200">
  {/* Trial type color accent */}
  <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />

  <CardContent className="p-6 space-y-4">
    {/* Typography hierarchy - 8px grid spacing */}
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {site.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {site.location}
      </p>
    </div>

    {/* Verification badge - clear status indicator */}
    <Badge variant={site.verified ? "success" : "outline"}>
      {site.verified ? "✓ Verified" : "Registered"}
    </Badge>

    {/* Interactive elements - 44x44px touch targets */}
    <Button
      className="w-full"
      aria-label={`View details for ${site.name}`}
    >
      View Details
    </Button>
  </CardContent>
</Card>
```

### Example 3: Writing Feature Announcement

**Without Skills**:
"We've added a new feature to our platform that allows users to filter sites more efficiently using advanced algorithms."

**With Skills** (Marketing Writer applied):
```
## Find Your Perfect Site in Seconds

Tired of scrolling through hundreds of sites that don't match your trial?

Our new Smart Filters let you narrow down to sites that actually meet your requirements - in under 30 seconds.

✅ Filter by enrollment capacity (50+, 100+, 200+ patients)
✅ Find sites with specific therapeutic expertise
✅ Match sites by certification type (GCP, FDA inspected)

Try it now → [link]

P.S. This was our #1 most requested feature. What should we build next?
```

## Common Anti-Patterns (Now Avoided)

### ❌ Before Skills
- Generic purple gradients everywhere
- Inconsistent spacing (10px here, 15px there)
- "Revolutionary AI-powered platform leveraging..."
- Building features nobody asked for
- Spending weeks on non-core functionality

### ✅ After Skills
- Trial-specific color coding (Blue/Green/Purple)
- Consistent 8px grid spacing
- "Find clinical trial sites in 5 minutes, not 5 weeks"
- User-requested features only
- Ship core loop first, iterate based on feedback

## Measuring Skill Impact

Track these improvements:

**Design Quality**:
- [ ] WCAG AA compliance on all pages
- [ ] Consistent spacing throughout
- [ ] Professional, modern appearance
- [ ] Mobile responsive without issues

**Product Focus**:
- [ ] No feature creep in MVP
- [ ] User-requested features only post-launch
- [ ] Clear prioritization framework followed

**Marketing Effectiveness**:
- [ ] Clear value propositions
- [ ] Benefit-focused copy
- [ ] Higher conversion rates
- [ ] Better user engagement

**Development Speed**:
- [ ] Faster decision-making (less debate)
- [ ] Clearer scope (less rework)
- [ ] Better code quality (fewer design bugs)
- [ ] Ship weekly, not monthly

## Next Steps

1. **Read each skill** - Spend 20-30 min per skill understanding the frameworks
2. **Reference actively** - Invoke skills explicitly until they become habit
3. **Update as needed** - These are living documents, improve them as you learn
4. **Share learnings** - Document what works and what doesn't

## Skill Updates

As you use these skills:
- Note what works well
- Identify gaps or unclear guidance
- Update the skill documents
- Share improvements with team

Skills should evolve with your product and learnings.

---

*These skills transform SponCite from a prototype to a professional, modern B2B SaaS platform.*
