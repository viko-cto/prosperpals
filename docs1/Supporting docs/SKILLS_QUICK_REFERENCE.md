# Skills Quick Reference Guide

## Overview

You now have **two complementary skill collections** installed:

1. **Anthropic Skills** - Task-oriented skills for deliverables
2. **Superpowers Skills** - Methodology skills for processes

## Quick Decision Tree

```
What do you need?
│
├─ Create/manipulate files? → Anthropic Skills
│  ├─ PDF operations → "Use the PDF skill"
│  ├─ Word documents → "Use the docx skill"
│  ├─ Excel files → "Use the xlsx skill"
│  ├─ PowerPoint → "Use the pptx skill"
│  └─ Build MCP server → "Use the mcp-builder skill"
│
└─ Improve process/approach? → Superpowers Skills
   ├─ Stuck on problem → "Use the when-stuck skill"
   ├─ Debugging issue → "Use the systematic-debugging skill"
   ├─ Planning work → "Use the writing-plans skill"
   ├─ Testing code → "Use the test-driven-development skill"
   └─ Reducing complexity → "Use the simplification-cascades skill"
```

## Anthropic Skills (15 skills)

### Document Creation & Manipulation
| Skill | Use For | Example Command |
|-------|---------|-----------------|
| **pdf** | PDF extraction, creation, merging | "Use the PDF skill to extract form fields from contract.pdf" |
| **docx** | Word document creation/editing | "Use the docx skill to create a project proposal" |
| **pptx** | PowerPoint presentations | "Use the pptx skill to create investor deck" |
| **xlsx** | Excel spreadsheets and analysis | "Use the xlsx skill to analyze trial enrollment data" |

### Development Tools
| Skill | Use For | Example Command |
|-------|---------|-----------------|
| **mcp-builder** | Creating MCP servers | "Use the mcp-builder skill to create a Stripe MCP server" |
| **webapp-testing** | Playwright browser testing | "Use the webapp-testing skill to test the login flow" |
| **artifacts-builder** | React components with shadcn/ui | "Use the artifacts-builder skill to build a data table" |

### Design & Creative
| Skill | Use For | Example Command |
|-------|---------|-----------------|
| **canvas-design** | Visual art in PNG/PDF | "Use the canvas-design skill to create infographic" |
| **algorithmic-art** | Generative art with p5.js | "Use the algorithmic-art skill for background patterns" |
| **theme-factory** | Professional themes for artifacts | "Use the theme-factory skill to apply dark theme" |
| **brand-guidelines** | Anthropic brand colors/typography | "Use the brand-guidelines skill for consistent styling" |

### Communication & Content
| Skill | Use For | Example Command |
|-------|---------|-----------------|
| **internal-comms** | Status reports, newsletters, FAQs | "Use the internal-comms skill to write weekly update" |
| **slack-gif-creator** | Animated GIFs for Slack | "Use the slack-gif-creator skill for celebration GIF" |

### Meta
| Skill | Use For | Example Command |
|-------|---------|-----------------|
| **skill-creator** | Creating custom skills | "Use the skill-creator skill to build a custom skill" |
| **template-skill** | Starting template | "Use the template-skill as base" |

## Superpowers Skills (30 skills)

### 🐛 Debugging (4 skills)
| Skill | Use When | Key Principle |
|-------|----------|---------------|
| **systematic-debugging** | ANY bug or test failure | NO FIXES WITHOUT ROOT CAUSE FIRST |
| **root-cause-tracing** | Symptom clear, cause hidden | Find the actual source |
| **defense-in-depth** | Building error handling | Multiple layers of protection |
| **verification-before-completion** | Before marking task done | NO COMPLETION WITHOUT VERIFICATION |

### 🧠 Problem-Solving (6 skills)
| Skill | Use When | What It Does |
|-------|----------|--------------|
| **when-stuck** | Not sure what to do | Dispatches to right technique |
| **simplification-cascades** | Complexity spiraling | Systematically reduce complexity |
| **collision-zone-thinking** | Need innovation | Force metaphors for breakthroughs |
| **inversion-exercise** | Forced by assumptions | Question premises by inverting |
| **scale-game** | Scaling concerns | Think 1x → 10x → 100x → 1000x |
| **meta-pattern-recognition** | Recurring patterns | Find patterns across domains |

### 🧪 Testing (3 skills)
| Skill | Use For | Key Rule |
|-------|---------|----------|
| **test-driven-development** | ANY feature implementation | NO CODE WITHOUT FAILING TEST FIRST |
| **testing-anti-patterns** | Reviewing test quality | Recognize bad patterns |
| **condition-based-waiting** | Playwright/async tests | Wait for conditions, not timeouts |

### 🤝 Collaboration (10 skills)
| Skill | Use For |
|-------|---------|
| **writing-plans** | Creating development plans |
| **executing-plans** | Implementing plans systematically |
| **remembering-conversations** | Maintaining context across sessions |
| **brainstorming** | Structured ideation |
| **dispatching-parallel-agents** | Coordinating multiple Claude instances |
| **subagent-driven-development** | Delegating to specialized agents |
| **using-git-worktrees** | Working on multiple branches |
| **finishing-a-development-branch** | Completing feature branches |
| **requesting-code-review** | Preparing code for review |
| **receiving-code-review** | Processing review feedback |

### 🔬 Research (1 skill)
| Skill | Use For |
|-------|---------|
| **tracing-knowledge-lineages** | Tracking knowledge evolution |

### 🏗️ Architecture (1 skill)
| Skill | Use For |
|-------|---------|
| **preserving-productive-tensions** | Maintaining architectural trade-offs |

### 📚 Meta (5 skills)
| Skill | Use For |
|-------|---------|
| **using-skills** | Learning how to use skills effectively |
| **writing-skills** | Creating custom skills |
| **testing-skills-with-subagents** | Testing skill effectiveness |
| **sharing-skills** | Sharing custom skills |
| **gardening-skills-wiki** | Maintaining skills documentation |
| **pulling-updates-from-skills-repository** | Updating skills |

## Common SponCite Workflows

### 1. Implementing New Feature
```bash
# Plan
"Use the writing-plans skill to plan user authentication"

# Implement with TDD
"Use the test-driven-development skill for auth implementation"

# Verify
"Use the verification-before-completion skill"

# Test in browser
"Use the webapp-testing skill to test login flow"
```

### 2. Debugging Production Issue
```bash
# Debug systematically
"Use the systematic-debugging skill to investigate Stripe webhook failure"

# Find root cause
"Use the root-cause-tracing skill"

# Fix with tests
"Use the test-driven-development skill to add regression test"
```

### 3. Creating Documentation
```bash
# Create PRD
"Use the docx skill to create Product Requirements Document"

# Create pitch deck
"Use the pptx skill to create investor presentation"

# Analyze data
"Use the xlsx skill to analyze trial enrollment metrics"
```

### 4. When Stuck
```bash
# Dispatch to right technique
"Use the when-stuck skill"

# If complexity issue
"Use the simplification-cascades skill"

# If need innovation
"Use the collision-zone-thinking skill"

# If scaling concerns
"Use the scale-game skill"
```

### 5. Parallel Development
```bash
# Setup worktrees
"Use the using-git-worktrees skill for auth and billing work"

# Coordinate work
"Use the dispatching-parallel-agents skill"

# Finish branches
"Use the finishing-a-development-branch skill"
```

### 6. Code Review
```bash
# Before requesting review
"Use the requesting-code-review skill to prepare my PR"

# After receiving feedback
"Use the receiving-code-review skill to process comments"
```

## Pro Tips

### Combine Skills
```
"Use the writing-plans skill and the scale-game skill to plan the matching system"
```

### Chain Skills
```
"Use the when-stuck skill"
→ Identifies you need simplification
→ "Use the simplification-cascades skill"
```

### Skills + Task Master
```
# Plan with skills
"Use the writing-plans skill for Epic 2"

# Execute with Task Master
task-master parse-prd plan.md
task-master expand --all

# Track with skills
"Use the executing-plans skill with Task Master"
```

### Skills + SuperClaude Framework
Your SuperClaude modes work great with skills:
- **MODE_Introspection** + `meta-pattern-recognition`
- **MODE_Task_Management** + `executing-plans`
- **MODE_Brainstorming** + `brainstorming` + `collision-zone-thinking`

## Installation Status

✅ **Anthropic Skills**: 15 task-oriented skills
✅ **Superpowers Skills**: 30 methodology skills
✅ **Total**: 45 skills ready to use

**Location**: `~/.claude/plugins/repos/`

**Configuration**: `~/.claude/plugins/config.json`

## How to Use

Just mention the skill in your message:
```
"Use the [skill-name] skill to [what you want to do]"
```

No special commands needed - Claude Code recognizes the skills automatically.

---

**Quick Access Files:**
- Full Anthropic list: `CLAUDE_SKILLS_INSTALLED.md`
- Full Superpowers list: `SUPERPOWERS_SKILLS_INSTALLED.md`
- This reference: `SKILLS_QUICK_REFERENCE.md`
