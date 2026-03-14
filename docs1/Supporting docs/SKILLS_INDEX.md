# SponCite Skills Index

This directory contains reusable skills for the SponCite project. Each skill is a self-contained package with documentation, execution scripts, and research materials.

## Available Skills

### 1. LinkedIn Builder
**Path**: `.skills/linkedin-builder/`
**Version**: 1.0.0
**Status**: ✅ Active
**Category**: Design & Architecture Study

**Purpose**: Study LinkedIn's design patterns, architecture, feed functionality, navigation, and styling to apply proven B2B SaaS patterns to SponCite.

**Key Features**:
- Comprehensive research checklist for LinkedIn analysis
- Playwright automation for screenshot capture
- Design system mapping (LinkedIn → SponCite)
- 3-week implementation roadmap
- Component implementation guides

**Use When**:
- Working on feed functionality
- Implementing navigation components
- Designing sidebar widgets
- Improving UI/UX consistency
- Refactoring dashboard layouts

**Quick Start**:
```bash
.skills/linkedin-builder/execute.sh
```

**Documentation**:
- Main: `linkedin-builder/skill.md`
- README: `linkedin-builder/README.md`
- Quick Ref: `linkedin-builder/quick-reference.md`
- Checklist: `linkedin-builder/research-checklist.md`
- Automation: `linkedin-builder/playwright-automation.md`

**Current SponCite Issues Addressed**:
- ✅ Feed doesn't work
- ✅ Side card links broken
- ✅ Top nav styling poor with dead ends
- ✅ Difficult dashboard discovery
- ✅ Styling inconsistencies

---

## How to Use Skills

### Creating a New Skill

Follow the Skill Seekers Guide pattern:

1. **Create skill directory**:
   ```bash
   mkdir -p .skills/skill-name/{outputs,research,analysis}
   ```

2. **Create core files**:
   - `skill.md` - Main skill documentation
   - `README.md` - Overview and quick start
   - `execute.sh` - Execution script (optional)
   - `quick-reference.md` - Quick reference card (optional)

3. **Add to this index**:
   - Add entry in "Available Skills" section
   - Include version, status, category, purpose

### Using an Existing Skill

1. **Read the README**:
   ```bash
   open .skills/[skill-name]/README.md
   ```

2. **Execute the skill**:
   ```bash
   .skills/[skill-name]/execute.sh
   ```
   OR ask Claude Code to execute with instructions from `skill.md`

3. **Review outputs**:
   - Screenshots: `.skills/[skill-name]/outputs/screenshots/`
   - Research: `.skills/[skill-name]/outputs/research/`
   - Analysis: `.skills/[skill-name]/outputs/analysis/`

### Skill Structure Template

```
.skills/skill-name/
├── README.md                   # Overview, quick start
├── skill.md                    # Main skill documentation
├── execute.sh                  # Execution script (optional)
├── quick-reference.md          # Quick ref card (optional)
├── research-checklist.md       # Step-by-step guide (if applicable)
├── automation.md               # Automation scripts (if applicable)
└── outputs/                    # Generated during execution
    ├── screenshots/            # Visual captures
    ├── research/               # Research documentation
    └── analysis/               # Technical analysis
```

## Skill Metadata Standards

Each skill should include:

```yaml
metadata:
  name: "Skill Name"
  version: "1.0.0"
  status: "active | deprecated | experimental"
  category: "Design | Architecture | Testing | etc."
  tags: ["tag1", "tag2", "tag3"]
  created: "YYYY-MM-DD"
  updated: "YYYY-MM-DD"
  author: "Claude Code | Human | Team"

purpose:
  summary: "One-line description"
  detailed: "Longer explanation of what this skill does"

triggers:
  conditions: ["When to activate this skill"]
  keywords: ["Keywords that suggest using this skill"]

outcomes:
  primary: ["Main results from executing skill"]
  secondary: ["Additional benefits"]

requirements:
  tools: ["Required tools"]
  knowledge: ["Required understanding"]
  resources: ["External resources needed"]

integration:
  taskmaster: "How to integrate with Task Master"
  related_skills: ["Other skills that complement this one"]
```

## Skill Categories

### Design & Architecture
- LinkedIn Builder
- Design System Builder (future)
- Component Library Audit (future)

### Development Workflows
- API Pattern Analyzer (future)
- Database Schema Designer (future)
- Testing Strategy Builder (future)

### Research & Analysis
- Competitor Analysis (future)
- User Flow Mapping (future)
- Performance Audit (future)

### Quality Assurance
- Accessibility Audit (future)
- Security Review (future)
- Code Quality Check (future)

## Best Practices

### Skill Creation
1. **Clear Purpose**: Single, well-defined goal
2. **Comprehensive Docs**: Easy to understand and follow
3. **Automation**: Executable scripts where possible
4. **Outputs**: Organized, reusable results
5. **Integration**: Works with existing tools (Task Master, etc.)

### Skill Usage
1. **Read First**: Understand skill before executing
2. **Follow Structure**: Complete all phases in order
3. **Document**: Record findings and observations
4. **Share**: Update skill with improvements
5. **Maintain**: Keep skills up-to-date

### Skill Maintenance
1. **Version Control**: Track changes with versions
2. **Status Updates**: Mark deprecated or experimental
3. **Documentation**: Update docs when patterns change
4. **Testing**: Verify skills work as expected
5. **Feedback**: Incorporate user feedback

## Integration with Task Master

Skills complement Task Master workflows:

1. **Research Phase**: Use skills to gather information
2. **Planning Phase**: Use skill outputs to create tasks
3. **Implementation**: Follow skill guides during execution
4. **Validation**: Use skill checklists to verify completion

Example workflow:
```bash
# 1. Execute research skill
.skills/linkedin-builder/execute.sh

# 2. Review outputs
open .skills/linkedin-builder/outputs/research/

# 3. Create Task Master tasks from roadmap
task-master add-task --prompt="Implement LinkedIn-inspired header" --research
task-master expand --id=<task-id> --research

# 4. Execute tasks using skill component guides
task-master show <task-id>  # Review implementation details
# ... implement using skill patterns ...

# 5. Complete and iterate
task-master set-status --id=<task-id> --status=done
```

## Skill Status Definitions

- **✅ Active**: Fully functional, maintained, recommended for use
- **🧪 Experimental**: In development, use with caution
- **⚠️ Deprecated**: Outdated, use newer alternative
- **🔒 Archived**: Historical reference, not for active use

## Contributing

To add a new skill to this index:

1. Create skill directory with proper structure
2. Write comprehensive documentation
3. Test execution workflow
4. Add entry to "Available Skills" section
5. Update this index metadata

## Support

For issues with skills:
- Check skill's README troubleshooting section
- Review skill documentation
- Ask Claude Code for help with execution
- Update skill documentation with solutions

---

**Last Updated**: 2025-11-05
**Total Skills**: 1
**Active Skills**: 1
**Project**: SponCite v1
