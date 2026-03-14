# Skill Seekers - Documentation Skill Creator

## What is Skill Seekers?

**Skill Seekers is NOT a skill** - it's a **tool to CREATE skills** from any documentation website.

Instead of manually creating Claude skills, Skill Seekers:
1. Scrapes any documentation website automatically
2. Organizes content into categories
3. Uses AI to enhance with examples
4. Packages everything into a .zip file ready to upload to Claude

## Installation Location

```
/Users/vadimfedulov/sponcite-v1/tools/skill-seekers/
```

**Note**: Installed as a **development tool**, not a Claude plugin.

## Why This is Valuable for SponCite

### 1. Create Skills for Services We Use

**Immediate Use Cases:**
```bash
# Create Stripe API skill
cd tools/skill-seekers
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --enhance-local

# Create Supabase skill
python3 cli/doc_scraper.py --name supabase --url https://supabase.com/docs --enhance-local

# Create Next.js 15 skill (latest version)
python3 cli/doc_scraper.py --name nextjs15 --url https://nextjs.org/docs --enhance-local

# Create Vercel skill
python3 cli/doc_scraper.py --name vercel --url https://vercel.com/docs --enhance-local

# Create Resend API skill
python3 cli/doc_scraper.py --name resend --url https://resend.com/docs --enhance-local
```

### 2. Create Skills for Clinical Trial Domain

**Research & Compliance:**
```bash
# FDA regulations
python3 cli/doc_scraper.py --name fda-device-trials --url https://www.fda.gov/medical-devices/ --enhance-local

# ICH guidelines
python3 cli/doc_scraper.py --name ich-guidelines --url https://www.ich.org/page/ich-guidelines --enhance-local

# EMA regulations
python3 cli/doc_scraper.py --name ema-clinical-trials --url https://www.ema.europa.eu/en/human-regulatory/research-development/clinical-trials --enhance-local
```

### 3. Create Skills for Internal Documentation

**SponCite-Specific:**
```bash
# Convert PRD to skill
python3 cli/doc_scraper.py --name sponcite-product --url file:///path/to/docs --enhance-local

# API documentation skill
python3 cli/doc_scraper.py --name sponcite-api --url http://localhost:3000/api/docs --enhance-local
```

## Quick Start Guide

### Prerequisites

```bash
# Install Python dependencies (only 2!)
pip3 install requests beautifulsoup4

# Optional: For AI enhancement via API
pip3 install anthropic
export ANTHROPIC_API_KEY=sk-ant-...
```

### Basic Usage

**Method 1: Use Preset Configs**
```bash
cd /Users/vadimfedulov/sponcite-v1/tools/skill-seekers

# Use React preset
python3 cli/doc_scraper.py --config configs/react.json

# Use Django preset
python3 cli/doc_scraper.py --config configs/django.json

# See all presets
ls configs/
```

**Method 2: Quick Mode (No Config Needed)**
```bash
# Simple one-liner
python3 cli/doc_scraper.py \
  --name stripe \
  --url https://stripe.com/docs/api \
  --description "Stripe API for payments"
```

**Method 3: Interactive Mode**
```bash
# Guided questions
python3 cli/doc_scraper.py --interactive
```

### With AI Enhancement (Recommended)

**Option 1: Local Enhancement (FREE - uses Claude Code Max)**
```bash
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --enhance-local
```

**Option 2: API Enhancement (requires API key)**
```bash
export ANTHROPIC_API_KEY=sk-ant-...
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --enhance
```

### Output Structure

```
tools/skill-seekers/output/
├── stripe_data/          # Scraped raw data (cached for reuse)
│   ├── pages/           # JSON files (one per page)
│   └── summary.json     # Overview
│
├── stripe/              # The skill (ready to upload)
│   ├── SKILL.md        # Enhanced with real examples
│   ├── references/     # Categorized documentation
│   │   ├── index.md
│   │   ├── api.md
│   │   ├── webhooks.md
│   │   └── ...
│   └── scripts/        # Empty (add custom scripts)
│
└── stripe.zip          # Packaged skill ready for upload
```

## Recommended Skills to Create for SponCite

### Priority 1: Service Integrations

| Service | Why | Command |
|---------|-----|---------|
| **Stripe** | Billing integration | `python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --enhance-local` |
| **Supabase** | Database operations | `python3 cli/doc_scraper.py --name supabase --url https://supabase.com/docs --enhance-local` |
| **Next.js 15** | Latest framework features | `python3 cli/doc_scraper.py --name nextjs15 --url https://nextjs.org/docs --enhance-local` |
| **Vercel** | Deployment platform | `python3 cli/doc_scraper.py --name vercel --url https://vercel.com/docs --enhance-local` |

### Priority 2: Clinical Trial Compliance

| Domain | Why | Command |
|--------|-----|---------|
| **FDA Device Trials** | Regulatory compliance | `python3 cli/doc_scraper.py --name fda-device --url https://www.fda.gov/medical-devices/device-advice-comprehensive-regulatory-assistance/clinical-trials-medical-devices --enhance-local` |
| **ICH-GCP** | Good Clinical Practice | Create config for ICH guidelines |
| **EMA Guidelines** | European regulations | Create config for EMA site |

### Priority 3: Development Tools

| Tool | Why | Command |
|------|-----|---------|
| **Prisma** | Database ORM | `python3 cli/doc_scraper.py --name prisma --url https://www.prisma.io/docs --enhance-local` |
| **TailwindCSS 4** | Latest CSS framework | `python3 cli/doc_scraper.py --name tailwind4 --url https://tailwindcss.com/docs --enhance-local` |
| **Playwright** | Testing framework | `python3 cli/doc_scraper.py --name playwright --url https://playwright.dev/docs/intro --enhance-local` |

## Advanced Features

### 1. Skip Scraping (Use Cached Data)

```bash
# Scrape once
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api

# Later, rebuild instantly from cache
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --skip-scrape
```

### 2. Checkpoint/Resume for Large Docs

```bash
# For large documentation (10K+ pages)
python3 cli/doc_scraper.py --config configs/large-docs.json

# If interrupted, resume from checkpoint
python3 cli/doc_scraper.py --config configs/large-docs.json --resume
```

### 3. Split Large Documentation

```bash
# For massive docs like AWS (40K pages)
python3 cli/split_config.py configs/aws.json --strategy router

# Creates multiple focused sub-skills
# - aws-s3.json
# - aws-ec2.json
# - aws-lambda.json
# etc.
```

### 4. Create Custom Configs

```json
{
  "name": "sponcite-api",
  "description": "SponCite internal API documentation",
  "base_url": "http://localhost:3000/api/docs",
  "selectors": {
    "main_content": "article",
    "title": "h1",
    "code_blocks": "pre code"
  },
  "url_patterns": {
    "include": ["/api/", "/docs/"],
    "exclude": ["/blog", "/about"]
  },
  "categories": {
    "authentication": ["auth", "login", "token"],
    "matching": ["match", "feasibility", "sites"],
    "billing": ["stripe", "payment", "subscription"]
  },
  "rate_limit": 0.5,
  "max_pages": 500,
  "checkpoint": {
    "enabled": true,
    "interval": 100
  }
}
```

## Uploading Created Skills to Claude

### Option 1: Automatic Upload (with API key)

```bash
# Set API key
export ANTHROPIC_API_KEY=sk-ant-...

# Package and upload
python3 cli/package_skill.py output/stripe/ --upload
```

### Option 2: Manual Upload (no API key needed)

```bash
# Package skill
python3 cli/package_skill.py output/stripe/

# Opens output/ folder automatically
# Then manually:
# 1. Go to https://claude.ai/skills
# 2. Click "Upload Skill"
# 3. Select output/stripe.zip
# 4. Done!
```

## Complete Workflow Example

### Creating a Stripe Skill (Step-by-Step)

```bash
# 1. Navigate to Skill Seekers
cd /Users/vadimfedulov/sponcite-v1/tools/skill-seekers

# 2. Create Stripe skill with local AI enhancement (FREE)
python3 cli/doc_scraper.py \
  --name stripe \
  --url https://stripe.com/docs/api \
  --description "Stripe API for payment processing" \
  --enhance-local

# Wait 20-40 minutes for scraping + 60 seconds for enhancement

# 3. Check the output
cat output/stripe/SKILL.md  # Should be comprehensive with examples

# 4. Package the skill
python3 cli/package_skill.py output/stripe/

# 5. Upload to Claude
# - Opens output/ folder
# - Upload stripe.zip to https://claude.ai/skills

# 6. Use the skill in Claude Code
"Use the stripe skill to implement subscription billing"
```

### Creating Multiple Skills in Parallel

```bash
# Create all service skills at once
for service in stripe supabase vercel resend; do
  python3 cli/doc_scraper.py \
    --name $service \
    --url https://$service.com/docs \
    --enhance-local &
done
wait

# Package all
for dir in output/*/; do
  python3 cli/package_skill.py "$dir"
done
```

## Tips & Best Practices

### 1. Test with Small Page Limit First

```bash
# Test with just 20 pages (fast)
python3 cli/doc_scraper.py \
  --name stripe-test \
  --url https://stripe.com/docs/api \
  --max-pages 20

# If good, scrape full docs
python3 cli/doc_scraper.py \
  --name stripe \
  --url https://stripe.com/docs/api \
  --enhance-local
```

### 2. Estimate Page Count Before Scraping

```bash
# Fast estimation (1-2 minutes)
python3 cli/estimate_pages.py configs/stripe.json

# Output shows:
# - Total pages discovered
# - Estimated scraping time
# - Recommended max_pages setting
```

### 3. Reuse Scraped Data

```bash
# Scrape once (20-40 minutes)
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api

# Rebuild multiple times (instant)
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --skip-scrape
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --skip-scrape --enhance-local
```

### 4. Finding the Right Selectors

```python
# Test selectors in Python
from bs4 import BeautifulSoup
import requests

url = "https://stripe.com/docs/api"
soup = BeautifulSoup(requests.get(url).content, 'html.parser')

# Try different selectors
print(soup.select_one('article'))
print(soup.select_one('main'))
print(soup.select_one('[role="main"]'))
```

## Integration with SponCite Development

### Workflow Integration

```bash
# When adding new service to SponCite:

# 1. Create skill for that service
cd tools/skill-seekers
python3 cli/doc_scraper.py --name <service> --url <docs-url> --enhance-local

# 2. Upload skill to Claude
python3 cli/package_skill.py output/<service>/ --upload

# 3. Use skill during development
# In Claude Code:
"Use the <service> skill to implement <feature>"
```

### Task Master Integration

```bash
# Add skill creation as tasks
task-master add-task --prompt="Create Stripe skill for billing integration"
task-master add-task --prompt="Create Supabase skill for database operations"
task-master add-task --prompt="Create FDA regulations skill for compliance"
```

## Maintenance & Updates

### Updating Skills

```bash
# When documentation updates:

# 1. Delete old data
rm -rf output/stripe_data/

# 2. Re-scrape
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --enhance-local

# 3. Re-package
python3 cli/package_skill.py output/stripe/

# 4. Re-upload to Claude
```

### Updating Skill Seekers Tool

```bash
cd /Users/vadimfedulov/sponcite-v1/tools/skill-seekers
git pull
```

## Troubleshooting

### No Content Extracted?
**Problem**: Scraped pages but no content
**Solution**: Check your CSS selectors
```bash
# Common selectors to try:
# - article
# - main
# - div[role="main"]
# - .documentation
# - .content
```

### Scraping Too Slow?
**Problem**: Taking hours to scrape
**Solution**: Adjust rate limit and max pages
```json
{
  "rate_limit": 0.2,  // Faster (was 0.5)
  "max_pages": 500    // Limit pages
}
```

### AI Enhancement Not Working?
**Problem**: SKILL.md still basic
**Solution**:
1. Check Claude Code is running
2. Use `--enhance-local` (not `--enhance`)
3. Wait for terminal to close (60 seconds)

### Want to Re-scrape Fresh?
```bash
# Clear all cached data
rm -rf output/stripe_data/

# Clear and re-scrape
python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --fresh
```

## Available Presets

Check `configs/` directory:
```bash
cd tools/skill-seekers
ls configs/

# Available:
# - godot.json (Godot Engine)
# - react.json (React)
# - vue.json (Vue.js)
# - django.json (Django)
# - fastapi.json (FastAPI)
```

## Summary

**Skill Seekers = Skill Creation Tool**

**Use it to:**
- ✅ Create skills from service documentation (Stripe, Supabase, etc.)
- ✅ Create skills from regulatory docs (FDA, EMA, ICH)
- ✅ Create skills from internal documentation
- ✅ Keep skills updated as docs change
- ✅ Never manually create skills again

**Key Commands:**
```bash
# Basic
python3 cli/doc_scraper.py --name <name> --url <url>

# With enhancement
python3 cli/doc_scraper.py --name <name> --url <url> --enhance-local

# Package
python3 cli/package_skill.py output/<name>/

# Upload
python3 cli/package_skill.py output/<name>/ --upload
```

## Next Steps

### Recommended First Skills to Create:

1. **Stripe** - For billing (immediate need for Epic 7)
2. **Supabase** - For database operations
3. **Next.js 15** - For latest framework features
4. **Playwright** - For better testing documentation

### Commands:
```bash
cd /Users/vadimfedulov/sponcite-v1/tools/skill-seekers

python3 cli/doc_scraper.py --name stripe --url https://stripe.com/docs/api --enhance-local
python3 cli/doc_scraper.py --name supabase --url https://supabase.com/docs --enhance-local
python3 cli/doc_scraper.py --name nextjs15 --url https://nextjs.org/docs --enhance-local
python3 cli/doc_scraper.py --name playwright --url https://playwright.dev/docs/intro --enhance-local
```

---

**Repository**: https://github.com/yusufkaraaslan/Skill_Seekers
**Location**: `/Users/vadimfedulov/sponcite-v1/tools/skill-seekers/`
**Type**: Skill Creation Tool (not a skill itself)
**Status**: ✅ Installed and ready to use
