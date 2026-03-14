# Agent Routing & Selection Guide

**Purpose**: Guide Claude Code to evaluate tasks and select the most appropriate specialized agents, frameworks, or handle tasks directly, following enterprise best practices.

## Core Principle: Right Tool for the Job

Before starting any task, Claude Code should assess:
1. **Task Complexity**: Simple vs complex, single vs multi-step
2. **Domain Expertise**: General vs specialized knowledge required
3. **Framework Alignment**: Does task match a specific methodology (BMAD, Spec-Kit, Task Master)?
4. **Agent Availability**: Are specialized agents available for this domain?
5. **Efficiency**: Will delegation improve quality/speed vs direct handling?

## Decision Tree: Task Assessment

```mermaid
graph TD
    A[New Task Request] --> B{Task Type?}

    B -->|Product Planning| C{Greenfield or Brownfield?}
    C -->|Greenfield| D[Use BMAD Method]
    C -->|Brownfield| E[Use BMAD Brownfield]

    B -->|Specification Driven| F[Use Spec-Kit Workflow]

    B -->|Task Management| G{Tasks Exist?}
    G -->|Yes| H[Use Task Master]
    G -->|No| I{Need Task Tracking?}
    I -->|Yes| J[Initialize Task Master]
    I -->|No| K[Direct Implementation]

    B -->|Specialized Domain| L{Agent Available?}
    L -->|Yes| M[Delegate to Specialist]
    L -->|No| K

    B -->|General Coding| N{Complexity?}
    N -->|High| O[Consider Architecture Agent]
    N -->|Medium| P[Consider Quality Review}
    N -->|Low| K

    D --> Q[BMAD Orchestrator]
    E --> Q
    F --> R[Spec-Kit Commands]
    H --> S[Task Master Commands]
    M --> T[SuperClaude Agents]
    O --> T
    P --> T
```

## Framework Selection Matrix

| Task Scenario | Recommended Approach | Primary Tools | Reasoning |
|---------------|---------------------|---------------|-----------|
| **New product from scratch** | BMAD Method | `@analyst`, `@pm`, `@architect` | Structured planning, comprehensive docs, multi-agent coordination |
| **Enterprise web app** | Spec-Kit + BMAD | `/speckit.constitution`, `@architect` | Constitutional principles, test-first, spec-driven |
| **Add feature to existing** | Task Master + BMAD | `task-master parse-prd`, `@dev` | Granular tracking, prevent vibecoding |
| **Simple bug fix** | Direct | Claude Code native | Overhead not justified |
| **Security implementation** | SuperClaude Agent | `@agent-security` | Specialized security expertise |
| **Performance optimization** | SuperClaude Agent | `@agent-performance-engineer` | Domain-specific optimization patterns |
| **UI/UX component** | SuperClaude Agent + Magic MCP | `@agent-frontend`, Magic MCP | UI expertise + component generation |
| **Complex architecture** | BMAD + SuperClaude | `@architect` + `@agent-system-architect` | High-level planning + detailed design |
| **Testing strategy** | BMAD QA + SuperClaude | `@qa`, `@agent-quality-engineer` | Comprehensive test planning |
| **Documentation** | SuperClaude Agent | `@agent-technical-writer` | Professional documentation standards |

## Available Agent Frameworks

### 1. BMAD Method Agents

Located in `.bmad-core/agents/` (if installed)

**Core Agents:**
- `@analyst` - Market research, project briefs, competitive analysis
- `@pm` - Product requirements, PRD creation, user stories
- `@po` - Product owner, document validation, epic/story sharding
- `@architect` - System architecture, tech stack, design patterns
- `@ux-expert` - UX specifications, UI component design
- `@sm` - Scrum master, story drafting, development coordination
- `@dev` - Implementation, coding, testing
- `@qa` - Quality assurance, risk assessment, test strategy

**When to Use**: Structured product development, comprehensive planning, multi-agent workflows

### 2. SuperClaude Agents

Located in `~/.claude/agents/` or `.claude/agents2/`

**Architecture & Design:**
- `@agent-system-architect` - Distributed systems, microservices, scalability
- `@agent-backend-architect` - API design, server-side architecture
- `@agent-frontend-architect` - UI architecture, component design, accessibility
- `@agent-devops-architect` - CI/CD, infrastructure, deployment

**Quality & Analysis:**
- `@agent-security-engineer` - Security architecture, threat modeling, compliance
- `@agent-performance-engineer` - Performance optimization, profiling
- `@agent-root-cause-analyst` - Debugging, systematic investigation
- `@agent-quality-engineer` - Testing strategy, QA planning
- `@agent-refactoring-expert` - Code quality, SOLID principles, technical debt

**Specialized Development:**
- `@agent-python-expert` - Python development, frameworks, best practices
- `@agent-requirements-analyst` - Requirements discovery, specification

**Communication & Learning:**
- `@agent-technical-writer` - Documentation, API docs, user guides
- `@agent-learning-guide` - Educational content, tutorials, explanations

**When to Use**: Domain-specific expertise, specialized knowledge, quality reviews

### 3. Local Project Agents

Located in `.claude/agents2/`

**Additional Specialists:**
- Language experts: TypeScript, JavaScript, Python, Rust, Go, etc.
- Framework specialists: Django, FastAPI, React, etc.
- Domain specialists: AI/ML, blockchain, payment integration, etc.
- SEO specialists: Content, keyword strategy, structure
- Testing specialists: TDD orchestrator, test automation

**When to Use**: Project-specific expertise, language/framework specialization

## Task Evaluation Process

### Before Starting Any Task

1. **Read the Request**
   - What is being asked?
   - What's the scope?
   - What's the complexity?

2. **Assess Complexity**
   - Simple (< 3 steps, single file): Handle directly
   - Medium (3-7 steps, multiple files): Consider agents
   - Complex (>7 steps, multiple systems): Use frameworks

3. **Identify Domain**
   - General coding: Direct or minimal agent support
   - Specialized (security, performance, architecture): Specialist agent
   - Product planning: BMAD Method
   - Specification driven: Spec-Kit
   - Task tracking needed: Task Master

4. **Check Agent Availability**
   - Is there a specialist agent for this domain?
   - Would the agent add value vs overhead?
   - Is this a one-off task or part of a larger workflow?

5. **Make Decision**
   - Use framework if it matches the workflow
   - Delegate to specialist if expertise needed
   - Handle directly if simple and within capabilities

## Decision Patterns by Task Type

### Planning & Requirements

| Task | Decision | Command |
|------|----------|---------|
| Create PRD from scratch | BMAD Method | `@analyst` → `@pm` |
| Convert brief to PRD | BMAD Method | `@pm Create PRD from brief` |
| Establish project principles | Spec-Kit | `/speckit.constitution` |
| Define requirements spec | Spec-Kit | `/speckit.specify` |
| Analyze requirements | BMAD or SuperClaude | `@analyst` or `@agent-requirements-analyst` |

### Architecture & Design

| Task | Decision | Command |
|------|----------|---------|
| System architecture | BMAD Method | `@architect Create architecture` |
| Microservices design | SuperClaude Agent | `@agent-system-architect` |
| API design | BMAD or SuperClaude | `@architect` or `@agent-backend-architect` |
| Frontend architecture | SuperClaude Agent | `@agent-frontend-architect` |
| Database design | Direct or Agent | `@agent-backend-architect` for complex |

### Implementation

| Task | Decision | Command |
|------|----------|---------|
| Simple feature (<3 files) | Direct | Claude Code native |
| Complex feature (>3 files) | Task Master + BMAD | `task-master next` + `@dev` |
| Security implementation | SuperClaude Agent | `@agent-security` |
| Performance optimization | SuperClaude Agent | `@agent-performance-engineer` |
| UI component | SuperClaude + Magic MCP | `@agent-frontend` + Magic |

### Quality & Testing

| Task | Decision | Command |
|------|----------|---------|
| Risk assessment | BMAD QA | `@qa *risk` |
| Test strategy | BMAD QA or SuperClaude | `@qa *design` or `@agent-quality-engineer` |
| Security audit | SuperClaude Agent | `@agent-security-engineer` |
| Performance testing | SuperClaude Agent | `@agent-performance-engineer` |
| Code review | BMAD QA or SuperClaude | `@qa *review` or `@agent-code-reviewer` |

### Documentation

| Task | Decision | Command |
|------|----------|---------|
| API documentation | SuperClaude Agent | `@agent-technical-writer` |
| User guides | SuperClaude Agent | `@agent-technical-writer` |
| Tutorial content | SuperClaude Agent | `@agent-learning-guide` |
| Technical specs | BMAD or SuperClaude | `@architect` or `@agent-docs-architect` |

## Multi-Agent Coordination

### When to Use Multiple Agents

**Complex Feature Development:**
```bash
# Coordinate multiple specialists
@architect Design the system               # Architecture
@agent-security Review security aspects     # Security validation
@agent-performance Optimize design          # Performance review
@dev Implement the feature                  # Development
@qa *review                                 # Quality review
```

**Full-Stack Development:**
```bash
@agent-frontend-architect Design UI
@agent-backend-architect Design API
@agent-security Review authentication
@agent-quality-engineer Plan testing
```

**System Troubleshooting:**
```bash
@agent-root-cause-analyst Investigate issue
@agent-performance-engineer Check performance
@agent-security-engineer Check for vulnerabilities
```

## Framework Integration Patterns

### BMAD + Task Master

```bash
# 1. BMAD Planning
@pm Create PRD
@architect Create architecture

# 2. Parse to Task Master
task-master parse-prd docs/prd.md

# 3. Development Loop
task-master next
@dev Implement task
task-master set-status --id=<id> --status=done
```

### BMAD + SuperClaude Agents

```bash
# 1. BMAD Planning
@architect Create architecture

# 2. Specialized Review
@agent-security-engineer Review security
@agent-performance-engineer Optimize design

# 3. Implementation
@dev Implement with specialist guidance
```

### Spec-Kit + Task Master

```bash
# 1. Spec-Kit Planning
/speckit.constitution
/speckit.specify
/speckit.plan

# 2. Task Generation
/speckit.tasks

# 3. Task Master Tracking
task-master parse-prd .specify/specs/<feature>/spec.md
task-master next
```

## Common Pitfalls & Solutions

### Pitfall 1: Over-Delegation
**Problem**: Delegating simple tasks to agents unnecessarily
**Solution**: Handle tasks directly if <3 steps and no specialized expertise needed

### Pitfall 2: Wrong Agent Selection
**Problem**: Using backend architect for frontend tasks
**Solution**: Match agent expertise to task domain (see matrix above)

### Pitfall 3: Framework Mismatch
**Problem**: Using BMAD for simple bug fixes
**Solution**: Use frameworks for their intended purposes (see decision tree)

### Pitfall 4: No Quality Review
**Problem**: Skipping QA agents for security-critical code
**Solution**: Always involve security/QA agents for high-risk tasks

### Pitfall 5: Ignoring Task Master
**Problem**: Vibecoding between tasks, losing systematic approach
**Solution**: Use Task Master for complex multi-step workflows

## Best Practices

### 1. Start Simple, Scale Up
- Begin with direct implementation
- Add agents only when needed
- Use frameworks for appropriate scope

### 2. Match Expertise to Domain
- Security tasks → Security agent
- Performance tasks → Performance agent
- Architecture tasks → Architecture agent

### 3. Follow Frameworks Properly
- BMAD: Complete planning before development
- Spec-Kit: Constitution → Spec → Plan → Tasks → Implement
- Task Master: Parse → Expand → Next → Implement → Complete

### 4. Quality Gates
- Always review security-critical code
- Performance test scalability concerns
- QA review before completion

### 5. Documentation
- Use technical writer agents for comprehensive docs
- Document decisions in appropriate framework files
- Maintain clean commit history

## Quick Reference

### When to Use Each Framework

**BMAD Method** ✅
- ✅ New product development
- ✅ Complex multi-agent workflows
- ✅ Comprehensive planning needed
- ✅ Structured Agile process
- ❌ Simple bug fixes
- ❌ One-off scripts

**Spec-Kit** ✅
- ✅ Enterprise applications
- ✅ Test-first development
- ✅ Constitutional principles needed
- ✅ Specification-driven process
- ❌ Prototypes/spikes
- ❌ Simple utilities

**Task Master** ✅
- ✅ Granular task tracking
- ✅ Prevent vibecoding
- ✅ Complex implementation
- ✅ Multi-step workflows
- ❌ Single-file changes
- ❌ Simple scripts

**SuperClaude Agents** ✅
- ✅ Domain expertise needed
- ✅ Quality reviews
- ✅ Specialized knowledge
- ✅ Complex problem solving
- ❌ Generic tasks Claude can handle
- ❌ Overhead > benefit

**Direct (Claude Code)** ✅
- ✅ Simple tasks (<3 steps)
- ✅ Quick fixes
- ✅ Generic coding
- ✅ File operations
- ❌ Security-critical code
- ❌ Complex architecture

## Summary Decision Matrix

| Scenario | Framework/Agent | Rationale |
|----------|----------------|-----------|
| New product planning | BMAD Method | Structured multi-agent planning |
| Enterprise web app | Spec-Kit + BMAD | Constitutional principles, test-first |
| Complex feature implementation | Task Master + BMAD | Granular tracking, systematic approach |
| Security implementation | SuperClaude Security | Specialized expertise |
| Performance optimization | SuperClaude Performance | Domain-specific patterns |
| UI component | SuperClaude Frontend + Magic | UI expertise + generation |
| Simple bug fix | Direct (Claude) | Overhead not justified |
| API documentation | SuperClaude Technical Writer | Professional docs |
| Code quality review | BMAD QA or SuperClaude | Systematic quality assessment |
| System architecture | BMAD + SuperClaude | High-level + detailed design |

## Workflow Examples

### Example 1: New Feature in Existing Project

```bash
# 1. Assess: Complex feature, needs tracking
# Decision: Task Master + SuperClaude agents

# 2. Create task from requirement
task-master add-task --prompt="Add real-time notifications" --research

# 3. Get next task
task-master next
task-master show 1.1

# 4. Specialized review if needed
@agent-performance-engineer Review real-time architecture

# 5. Implement
@dev Implement real-time notifications

# 6. Quality review
@agent-quality-engineer Review test coverage

# 7. Complete
task-master set-status --id=1.1 --status=done
```

### Example 2: Greenfield Enterprise App

```bash
# 1. Assess: New product, comprehensive planning needed
# Decision: BMAD Method + Spec-Kit + Task Master

# 2. Establish principles
/speckit.constitution

# 3. BMAD Planning Phase
@analyst Create project brief
@pm Create PRD from brief
@architect Create architecture

# 4. Specification
/speckit.specify [detailed requirements]
/speckit.plan [tech stack decisions]

# 5. Task breakdown
/speckit.tasks
task-master parse-prd docs/prd.md

# 6. Development with tracking
task-master next
@dev Implement
task-master set-status --id=<id> --status=done

# 7. Quality gates
@qa *review docs/stories/story-<id>.md
```

### Example 3: Simple Bug Fix

```bash
# 1. Assess: Simple fix, single file
# Decision: Direct handling

# 2. Read file, understand issue
# 3. Fix bug directly
# 4. Test
# 5. Commit

# No framework/agent needed - overhead > benefit
```

## References

- [BMAD Method Skill](.claude/skills/bmad-orchestrator.md)
- [Task Master Skill](.claude/skills/taskmaster-integration.md)
- [Spec-Kit Skill](.claude/skills/spec-kit-development.md)
- [SuperClaude Agents](SuperClaude-docs/SuperClaude agents.md)
- [Project Agents](.claude/agents2/README.md)
