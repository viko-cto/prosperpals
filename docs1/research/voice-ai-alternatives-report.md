# Voice AI Alternatives to ElevenLabs -- Cost-Effectiveness Research Report

**Prepared for:** ProsperPals (Gamified Financial Wellness App for Gen Z)
**Date:** March 7, 2026
**Objective:** Identify voice AI solutions that are more cost-effective than ElevenLabs ($0.08--0.10/min for voice agent calls + LLM passthrough costs)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [ElevenLabs Baseline (Current)](#elevenlabs-baseline)
3. [Alternative 1: OpenAI Realtime API / TTS](#1-openai-realtime-api--tts)
4. [Alternative 2: Google Cloud Text-to-Speech](#2-google-cloud-text-to-speech)
5. [Alternative 3: Amazon Polly + Transcribe](#3-amazon-polly--transcribe)
6. [Alternative 4: Microsoft Azure Speech Services](#4-microsoft-azure-speech-services)
7. [Alternative 5: Deepgram](#5-deepgram)
8. [Alternative 6: PlayHT (PlayAI)](#6-playht-playai)
9. [Alternative 7: Cartesia](#7-cartesia)
10. [Alternative 8: Fish Audio](#8-fish-audio)
11. [Alternative 9: Open-Source Self-Hosted](#9-open-source-self-hosted)
12. [Hybrid Architecture Strategies](#hybrid-architecture-strategies)
13. [Pricing Comparison Table](#pricing-comparison-table)
14. [Recommendations for ProsperPals](#recommendations-for-prosperpals)
15. [Sources](#sources)

---

## Executive Summary

ElevenLabs is the current quality leader in voice AI but is among the most expensive options at $0.08--0.10/minute for conversational AI (recently reduced ~50% from prior rates). Several alternatives offer significant savings:

- **Best overall value:** Deepgram ($0.05--0.07/min for voice agents) or Cartesia ($0.014--0.06/min) offer 30--80% savings with competitive quality.
- **Best budget option:** Google Cloud TTS + a separate STT provider can achieve ~$0.01--0.02/min for TTS alone, but requires building the orchestration layer yourself.
- **Best quality-to-cost ratio:** Fish Audio ($0.015/1K chars, #1 on TTS-Arena2) delivers ElevenLabs-comparable quality at 45--70% lower cost.
- **Best for full control:** Self-hosted open-source (Piper / XTTS-v2) can reduce marginal costs to near-zero after ~$50--500/month infrastructure investment.
- **Best hybrid approach:** Use a cheap TTS (Google/Piper) for UI sounds, notifications, and non-critical audio; reserve a premium provider (ElevenLabs/Fish Audio) for key coaching conversations.

---

## ElevenLabs Baseline

| Metric | Value |
|---|---|
| **Voice Agent Cost** | $0.08/min (Business annual) to $0.10/min (Starter/Creator/Pro) |
| **TTS API Cost** | ~$0.18--0.30 per 1K characters (plan-dependent) |
| **LLM Passthrough** | Currently absorbed by ElevenLabs; will eventually be passed through |
| **Silence Discount** | 95% discount for silence > 10 seconds |
| **Voice Quality** | Industry-leading realism, emotional depth, prosody (64.57% prosody accuracy) |
| **Latency (TTFA)** | ~75--135ms (Flash v2.5) |
| **Streaming** | Yes, real-time streaming supported |
| **GDPR / EU Residency** | SOC2 + GDPR compliant; EU data residency for Enterprise customers only |
| **Languages** | 70+ languages |

**Cost at scale (10K min/month):** ~$800--1,000/month + future LLM passthrough costs.

---

## 1. OpenAI Realtime API / TTS

### Realtime API (Speech-to-Speech Conversations)

| Metric | Value |
|---|---|
| **Model** | gpt-realtime (GA), gpt-realtime-mini |
| **Audio Input** | $32/1M tokens ($0.40/1M cached) |
| **Audio Output** | $64/1M tokens |
| **Effective Cost** | ~$0.04/min of speech-to-speech (with token caching) |
| **Latency** | Sub-second, native speech-to-speech (no STT/TTS pipeline) |
| **Streaming** | Yes, native real-time streaming |
| **GDPR** | OpenAI offers EU data processing; check current DPA |

### Standard TTS API (Text-to-Speech Only)

| Metric | Value |
|---|---|
| **tts-1 (Standard)** | $15/1M characters (~$0.015/min of audio) |
| **tts-1-hd (Premium)** | $30/1M characters (~$0.03/min of audio) |
| **Max Input** | 4,096 characters per request |
| **Streaming** | Yes (Opus format for low latency) |
| **Voices** | 6 built-in voices, no custom voice cloning |

### Assessment for ProsperPals

- **Realtime API at ~$0.04/min is ~50--60% cheaper than ElevenLabs** for conversational use cases.
- Includes the LLM in the price (no separate LLM cost), which is a major advantage.
- Limited voice customization -- only preset voices, no cloning.
- Best suited if you want an all-in-one conversational agent without managing STT + LLM + TTS separately.

**Savings vs ElevenLabs:** 50--60% (Realtime API), 80--85% (TTS-only)

---

## 2. Google Cloud Text-to-Speech

| Metric | Value |
|---|---|
| **Standard Voices** | $4/1M characters |
| **WaveNet Voices** | $16/1M characters |
| **Neural2 Voices** | $16/1M characters |
| **Chirp 3 HD Voices** | $30/1M characters |
| **Free Tier** | 4M chars/month (Standard), 1M chars/month (WaveNet) |
| **Streaming** | Yes, gRPC streaming synthesis |
| **Latency** | ~100--200ms TTFA for neural voices |
| **Languages** | 380+ voices across 75+ languages |
| **GDPR / EU** | Full EU data residency, GDPR compliant, ISO 27001 |

### Google Cloud Speech-to-Text (for completeness)

| Metric | Value |
|---|---|
| **Standard** | $0.024/min (streaming), $0.016/min (batch) |
| **Chirp 2** | Enhanced accuracy, similar pricing |
| **Free Tier** | 60 minutes/month |

### Cost Estimate (Combined STT + TTS)

Assuming ~1,000 characters of TTS output per minute of conversation:
- **WaveNet/Neural2:** ~$0.016/min (TTS) + $0.024/min (STT) = **~$0.04/min total**
- **Standard voices:** ~$0.004/min (TTS) + $0.024/min (STT) = **~$0.028/min total**
- Does NOT include LLM costs (add ~$0.01--0.03/min for GPT-4o-mini or similar)

### Assessment for ProsperPals

- Extremely cost-effective for TTS, especially with the generous free tier.
- WaveNet/Neural2 quality is good but noticeably below ElevenLabs in emotional expressiveness.
- Chirp 3 HD voices are competitive with premium providers.
- Requires building your own orchestration layer (STT + LLM + TTS pipeline).
- Excellent GDPR compliance and EU data residency.

**Savings vs ElevenLabs:** 50--70% (excluding LLM costs)

---

## 3. Amazon Polly + Transcribe

### Amazon Polly (TTS)

| Metric | Value |
|---|---|
| **Standard Voices** | $4.80/1M characters |
| **Neural Voices** | $19.20/1M characters |
| **Generative Voices** | $30/1M characters |
| **Free Tier** | 1M chars/month (Neural) or 5M chars/month (Standard) for 12 months |
| **Streaming** | Yes, real-time streaming via HTTP/2 |
| **Latency** | ~100--200ms |
| **SSML Support** | Full SSML for prosody, emphasis, breaks |

### Amazon Transcribe (STT)

| Metric | Value |
|---|---|
| **Standard** | $0.024/min |
| **Streaming** | $0.024/min (real-time) |
| **Free Tier** | 60 minutes/month for 12 months |

### Cost Estimate (Combined)

- **Neural Polly + Transcribe:** ~$0.019/min (TTS) + $0.024/min (STT) = **~$0.043/min** (excluding LLM)
- **Standard Polly + Transcribe:** ~$0.005/min (TTS) + $0.024/min (STT) = **~$0.029/min**

### Assessment for ProsperPals

- Deep AWS ecosystem integration if already on AWS.
- Neural voices are decent but lag behind ElevenLabs and even Google in naturalness.
- Generative voices are newer and more expressive but pricier.
- Strong compliance story (SOC2, HIPAA, GDPR) with full EU region availability.
- Requires building your own orchestration.

**Savings vs ElevenLabs:** 45--65% (excluding LLM costs)

---

## 4. Microsoft Azure Speech Services

### Text-to-Speech

| Metric | Value |
|---|---|
| **Neural TTS** | $15--16/1M characters |
| **Neural HD V2** | $30/1M characters |
| **Custom Neural Voice** | $24/1M characters (synthesis) + $52/hr (training) + $4.04/hr (hosting) |
| **Free Tier** | 0.5M characters/month |
| **Streaming** | Yes, real-time WebSocket streaming |
| **Latency** | ~100--150ms |
| **Languages** | 400+ voices, 140+ languages |
| **GDPR** | Full EU data residency, comprehensive compliance certifications |

### Speech-to-Text

| Metric | Value |
|---|---|
| **Real-time STT** | $1/audio hour ($0.017/min) |
| **Custom Speech** | $1.40/audio hour |
| **Free Tier** | 5 hours/month |

### Cost Estimate (Combined)

- **Neural TTS + Real-time STT:** ~$0.016/min (TTS) + $0.017/min (STT) = **~$0.033/min** (excluding LLM)
- **Neural HD V2 + STT:** ~$0.03/min + $0.017/min = **~$0.047/min**

### Assessment for ProsperPals

- Best option if already in the Microsoft/Azure ecosystem.
- Custom Neural Voice allows creating a unique brand voice (significant upfront cost).
- Azure OpenAI integration makes it easy to add LLM in the same ecosystem.
- Very strong GDPR compliance with EU West data centers.
- Neural quality is competitive but ElevenLabs still leads in expressiveness.

**Savings vs ElevenLabs:** 40--60% (excluding LLM costs)

---

## 5. Deepgram

### Speech-to-Text (Nova-2/Nova-3)

| Metric | Value |
|---|---|
| **Pay-As-You-Go (Streaming)** | $0.0077/min |
| **Pay-As-You-Go (Batch)** | $0.0043/min |
| **Growth Plan (Streaming)** | $0.0065/min |
| **High Volume** | As low as $0.003/min |
| **Free Credits** | $200 for new accounts |

### Text-to-Speech (Aura-2)

| Metric | Value |
|---|---|
| **API Pricing** | $0.030/1K characters |
| **Falcon Model** | $0.01/min |
| **Latency** | ~90ms TTFA (Aura-2), optimized for streaming |

### Voice Agent API (Combined STT + TTS)

| Metric | Value |
|---|---|
| **Pay-As-You-Go** | $0.08/min |
| **Growth Plan** | $0.07/min |
| **BYO TTS (Pay-As-You-Go)** | $0.06/min |
| **BYO TTS (Growth)** | $0.05/min |

### Assessment for ProsperPals

- **Voice Agent API at $0.05--0.07/min is 12--37% cheaper than ElevenLabs.**
- STT is best-in-class for price/performance -- significantly cheaper than Google/AWS/Azure.
- TTS (Aura-2) is 40% cheaper than ElevenLabs Flash per 1K characters ($0.030 vs $0.050).
- Aura-2 scores higher on speech naturalness (57.78% "High" vs ElevenLabs 44.98%) but lower on prosody control.
- Self-hosted/on-premises deployment available for GDPR compliance (SOC2, HIPAA, GDPR).
- BYO TTS option lets you pair Deepgram STT with a cheaper or higher-quality TTS provider.

**Savings vs ElevenLabs:** 12--37% (Voice Agent), 70--90% (STT only)

---

## 6. PlayHT (PlayAI)

| Metric | Value |
|---|---|
| **Free Plan** | 12,500 chars/month (~1 min audio) |
| **Creator Plan** | $31--39/month for 50K words |
| **Pro Plan** | $99/month for 200K words |
| **API Pricing** | $0.02--0.24 per 1K characters (voice-dependent) |
| **Play3.0 Mini Latency** | < 300ms (Turbo model) |
| **Streaming** | Yes |
| **Voice Cloning** | 30 seconds of audio required |
| **Languages** | 140+ (cross-language cloning) |

### Assessment for ProsperPals

- Mid-range pricing -- not the cheapest, not the most expensive.
- Play3.0 quality is decent but generally considered below ElevenLabs and Fish Audio.
- Voice cloning with just 30 seconds of audio is convenient.
- Less competitive on price compared to Deepgram, Cartesia, or Google Cloud.
- Limited information on GDPR / EU data residency for enterprise use.

**Savings vs ElevenLabs:** 10--30% (depends heavily on plan and voice selection)

---

## 7. Cartesia

| Metric | Value |
|---|---|
| **TTS Price** | $0.03/min (standard), down to $0.014/min (high volume) |
| **Per-Character** | $46.70/1M characters (Sonic 2.0 & Sonic Turbo) |
| **Free Tier** | 10,000--20,000 characters |
| **Pro Plan** | $5/month for 100K characters |
| **Scale Plan** | $299/month for 8M characters |
| **Voice Agent** | $0.06/min (standard), $0.014/min (enterprise) |
| **Latency (Sonic 2.0)** | ~90ms TTFA |
| **Latency (Sonic Turbo)** | ~40ms TTFA -- industry-leading |
| **Streaming** | Yes, optimized for real-time |
| **Languages** | 40+ languages |
| **Compliance** | SOC 2 Type 2, HIPAA, PCI Level 2, on-premise available |

### Assessment for ProsperPals

- **Sonic Turbo at 40ms TTFA is the fastest in the industry** -- ideal for real-time coaching.
- At $0.014--0.03/min for TTS, it is 63--82% cheaper than ElevenLabs.
- State space model architecture delivers excellent quality with minimal latency.
- Enterprise tier with on-premise deployment is strong for compliance.
- Startup grant offers 4 months of Scale Plan free -- good for ProsperPals' stage.
- Voice quality is very good but ElevenLabs still edges ahead on emotional range.

**Savings vs ElevenLabs:** 25--82% (depending on tier and usage)

---

## 8. Fish Audio

| Metric | Value |
|---|---|
| **Free Tier** | 8,000 credits/month (~7 min S1 audio) |
| **Plus Plan** | $5.50--11/month |
| **Premium Plan** | Credits for ~200 min of S1 generations |
| **API Pricing** | ~$15/1M characters |
| **Quality Ranking** | #1 on TTS-Arena2 (flagship S1 model) |
| **Word Error Rate** | 0.8% (on par with ElevenLabs) |
| **Latency** | < 500ms |
| **Emotional Control** | Professional-grade |
| **Languages** | 140+ |

### Assessment for ProsperPals

- **#1 ranked on TTS-Arena2** -- quality matches or exceeds ElevenLabs in blind tests.
- 45--70% cheaper than ElevenLabs for equivalent quality.
- Excellent emotional control for coaching scenarios.
- Relatively newer entrant; enterprise features and compliance certifications less established.
- No dedicated voice agent platform -- would need to build orchestration yourself.

**Savings vs ElevenLabs:** 45--70%

---

## 9. Open-Source Self-Hosted

### Piper TTS

| Metric | Value |
|---|---|
| **License** | MIT (archived Oct 2025; forked to GPL-3.0 by Open Home Foundation) |
| **Cost** | Free (software); infrastructure only |
| **Quality** | Good for medium models; below commercial providers |
| **Latency** | Low (~50--150ms on adequate hardware) |
| **Hardware** | Runs on Raspberry Pi 4/5; no GPU required |
| **Languages** | 35+ with pre-trained voices on Hugging Face |
| **Streaming** | Yes, real-time synthesis on-device |
| **Best For** | Non-critical audio, UI sounds, notifications |

### XTTS-v2 (Coqui TTS)

| Metric | Value |
|---|---|
| **License** | MPL-2.0 |
| **Cost** | Free (software); GPU infrastructure required |
| **Quality** | High -- competitive with mid-tier commercial providers |
| **Voice Cloning** | Zero-shot with 6-second audio sample |
| **GPU Required** | Single mid-range GPU (model ~2GB) |
| **Languages** | 20+ (cross-lingual cloning) |
| **Latency** | Good for shorter texts; depends on GPU |
| **Note** | Coqui AI shut down Dec 2025; community maintains the open-source code |

### Bark (by Suno)

| Metric | Value |
|---|---|
| **License** | MIT |
| **Cost** | Free (software); GPU required |
| **Quality** | Highly expressive (emotions, laughter, breathing) |
| **GPU Required** | 6--12GB VRAM minimum (bark-small) |
| **Latency** | Higher than Piper/XTTS; not optimized for streaming |
| **Best For** | Expressive character voices, storytelling |
| **Limitation** | Inconsistent; research-grade, not production-ready |

### Self-Hosting Cost Analysis

| Scenario | Monthly Cost | Break-Even vs ElevenLabs |
|---|---|---|
| **Mini PC (home/office)** | $35--55/month (amortized) | 3--4 months at 1K min/month |
| **Cloud GPU (T4/A10)** | $150--400/month | 2--3 months at 5K min/month |
| **Cloud CPU (for Piper)** | $50--100/month | 1--2 months at 1K min/month |
| **Developer Setup Time** | 40--120 hours initial | One-time cost |

After break-even, marginal cost per minute approaches **$0.001--0.005/min** (infrastructure only).

### Assessment for ProsperPals

- Huge long-term savings if you have the engineering capacity.
- Piper is the best option for lightweight, low-resource deployment.
- XTTS-v2 offers the best quality among open-source options with voice cloning.
- Full data control -- ideal for GDPR compliance (data never leaves your infrastructure).
- Risk: maintaining open-source TTS infrastructure requires ongoing engineering investment.
- Quality gap vs commercial providers is narrowing but still noticeable for premium use cases.

**Savings vs ElevenLabs:** 90--99% at scale (after break-even)

---

## Hybrid Architecture Strategies

### Strategy 1: Tiered Quality Approach

| Use Case | Provider | Est. Cost/Min | Quality Need |
|---|---|---|---|
| UI sounds, confirmations, notifications | Piper (self-hosted) | ~$0.002 | Low |
| Standard coaching responses | Google Cloud WaveNet or Cartesia | ~$0.02--0.03 | Medium |
| Key emotional coaching moments | ElevenLabs or Fish Audio | ~$0.08--0.10 | High |
| Real-time conversational agent | OpenAI Realtime API | ~$0.04 | High |

**Blended cost estimate:** If 60% of audio is low/medium tier and 40% is premium, the blended rate drops to approximately **$0.03--0.04/min** (60--70% savings).

### Strategy 2: Deepgram STT + Cartesia TTS

- Deepgram Nova-3 for STT: $0.0065--0.0077/min
- Cartesia Sonic Turbo for TTS: $0.014--0.03/min
- Your own LLM (e.g., GPT-4o-mini): ~$0.01--0.02/min
- **Total: ~$0.03--0.06/min** (37--62% savings vs ElevenLabs)
- Ultra-low latency (40ms TTS + fast STT)

### Strategy 3: OpenAI Realtime for Conversations + Cheap TTS for Everything Else

- OpenAI Realtime API for live coaching calls: ~$0.04/min (includes LLM)
- Google Cloud Standard TTS for pre-generated tips, notifications: ~$0.004/min
- **Blended: ~$0.02--0.04/min** depending on conversation-to-notification ratio

### Strategy 4: Fish Audio for All TTS + Deepgram for STT

- Fish Audio S1 for TTS: ~$0.015/1K chars (~$0.015/min)
- Deepgram Nova-3 for STT: $0.0065/min
- LLM of choice: ~$0.01--0.02/min
- **Total: ~$0.03--0.04/min** with #1 ranked TTS quality

---

## Pricing Comparison Table

### TTS-Only Pricing (per 1M characters)

| Provider | Model | Price/1M Chars | ~Price/Min | Quality Tier |
|---|---|---|---|---|
| Google Cloud | Standard | $4 | $0.004 | Basic |
| Amazon Polly | Standard | $4.80 | $0.005 | Basic |
| Google Cloud | WaveNet/Neural2 | $16 | $0.016 | Good |
| OpenAI | tts-1 | $15 | $0.015 | Good |
| Microsoft Azure | Neural TTS | $15--16 | $0.016 | Good |
| Fish Audio | S1 | ~$15 | $0.015 | Excellent (#1 Arena) |
| Amazon Polly | Neural | $19.20 | $0.019 | Good |
| Microsoft Azure | Custom Neural | $24 | $0.024 | Very Good |
| Deepgram | Aura-2 | $30/1K chars | $0.01 (Falcon) | Good |
| OpenAI | tts-1-hd | $30 | $0.03 | Very Good |
| Google Cloud | Chirp 3 HD | $30 | $0.03 | Very Good |
| Microsoft Azure | Neural HD V2 | $30 | $0.03 | Very Good |
| Cartesia | Sonic 2.0/Turbo | $46.70 | $0.03 | Very Good |
| ElevenLabs | Flash v2.5 | ~$50/1K chars | $0.05+ | Excellent |

### Voice Agent / Conversational AI Pricing (per minute, all-in)

| Provider | Plan | Price/Min | Includes |
|---|---|---|---|
| Cartesia | Enterprise | $0.014 | TTS only |
| Cartesia | Standard | $0.03--0.06 | TTS only |
| OpenAI | Realtime API | ~$0.04 | STT + LLM + TTS |
| Deepgram | Voice Agent (BYO TTS, Growth) | $0.05 | STT + orchestration |
| Deepgram | Voice Agent (Growth) | $0.07 | STT + TTS |
| Deepgram | Voice Agent (PAYG) | $0.08 | STT + TTS |
| ElevenLabs | Business (annual) | $0.08 | STT + TTS (no LLM) |
| ElevenLabs | Starter/Creator/Pro | $0.10 | STT + TTS (no LLM) |

### Latency Comparison (Time to First Audio)

| Provider | Model | TTFA |
|---|---|---|
| Cartesia | Sonic Turbo | ~40ms |
| ElevenLabs | Flash v2.5 | ~75ms |
| Cartesia | Sonic 2.0 | ~90ms |
| Deepgram | Aura-2 | ~90ms |
| OpenAI | tts-1 | ~100ms |
| Google Cloud | Neural2 | ~100--200ms |
| Piper | Medium model | ~50--150ms |
| XTTS-v2 | Standard | ~150--300ms |
| PlayHT | Play3.0 Turbo | < 300ms |
| Fish Audio | S1 | < 500ms |

---

## GDPR / European Data Residency Summary

| Provider | GDPR Compliant | EU Data Residency | On-Premise Option | Key Certifications |
|---|---|---|---|---|
| ElevenLabs | Yes | Enterprise only | No | SOC2 |
| Google Cloud | Yes | Yes (EU regions) | No | ISO 27001, SOC2 |
| Microsoft Azure | Yes | Yes (EU West) | No (hybrid possible) | ISO 27001, SOC2, HIPAA |
| Amazon AWS | Yes | Yes (EU regions) | No | ISO 27001, SOC2, HIPAA |
| Deepgram | Yes | Yes (self-hosted) | Yes | SOC2, HIPAA |
| Cartesia | Yes | Enterprise (on-premise) | Yes | SOC2 Type 2, HIPAA, PCI |
| OpenAI | Partial | Check current DPA | No | SOC2 |
| Fish Audio | Unclear | Not documented | No | Limited info |
| PlayHT | Unclear | Not documented | No | Limited info |
| Self-Hosted | N/A (you control) | Full control | Yes | Your responsibility |

---

## Recommendations for ProsperPals

### Short-Term (0--3 months): Quick Wins

1. **Switch to OpenAI Realtime API for live coaching conversations** -- at ~$0.04/min (including LLM), this is immediately 50--60% cheaper than ElevenLabs + separate LLM costs. No orchestration to build.
2. **Use Google Cloud Standard/WaveNet TTS for pre-generated content** (tips, notifications, lesson narration) -- near-free with the 1--4M character/month free tier.

### Medium-Term (3--6 months): Optimize

3. **Evaluate Cartesia Sonic Turbo** for real-time coaching -- 40ms latency is ideal for interactive coaching, and at $0.03/min it is significantly cheaper. Apply for their startup grant (4 months free on Scale Plan).
4. **Pilot Fish Audio S1** as a premium TTS alternative -- #1 ranked quality at 45--70% less than ElevenLabs. Test whether quality meets your coaching voice standards.
5. **Implement Deepgram Nova-3 for STT** -- at $0.0065/min it is the best price/performance for speech recognition, and pairs well with any TTS provider via their BYO TTS voice agent option.

### Long-Term (6--12 months): Scale

6. **Build a hybrid pipeline:** Deepgram STT ($0.0065/min) + Cartesia Sonic Turbo TTS ($0.03/min) + GPT-4o-mini ($0.01/min) = ~$0.05/min total. This gives you full control and 37--50% savings.
7. **Evaluate self-hosting Piper** for non-critical audio (UI confirmations, short notifications) to reduce costs further.
8. **Negotiate enterprise pricing** with your chosen provider once you have volume data -- most providers offer significant discounts at scale.

### Estimated Savings at 10,000 minutes/month

| Approach | Monthly Cost | Savings vs ElevenLabs ($0.08--0.10/min) |
|---|---|---|
| ElevenLabs (current) | $800--1,000 | Baseline |
| OpenAI Realtime API | ~$400 | 50--60% |
| Deepgram Voice Agent | $500--700 | 12--37% |
| Cartesia + Deepgram + LLM | ~$450--500 | 37--50% |
| Fish Audio + Deepgram + LLM | ~$350--400 | 50--60% |
| Hybrid (tiered quality) | ~$300--400 | 60--70% |
| Self-hosted + premium hybrid | ~$150--250 | 70--85% |

---

## Sources

- [ElevenLabs Conversational AI Pricing Cut Announcement](https://elevenlabs.io/blog/we-cut-our-pricing-for-conversational-ai)
- [ElevenLabs Pricing Page](https://elevenlabs.io/pricing)
- [ElevenLabs Agents Cost FAQ](https://help.elevenlabs.io/hc/en-us/articles/29298065878929-How-much-does-ElevenLabs-Agents-formerly-Conversational-AI-cost)
- [ElevenLabs European Data Residency](https://elevenlabs.io/blog/introducing-european-data-residency)
- [ElevenLabs GDPR Data Residency Docs](https://elevenlabs.io/docs/conversational-ai/legal/gdpr)
- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [OpenAI Realtime API Announcement (gpt-realtime)](https://openai.com/index/introducing-gpt-realtime/)
- [OpenAI Realtime API Pricing ~$0.04/min (kwindla on X)](https://x.com/kwindla/status/1961473869115765177)
- [OpenAI TTS Cost Calculator (Mar 2026)](https://costgoat.com/pricing/openai-tts)
- [OpenAI Realtime API Pricing Calculator (Skywork)](https://skywork.ai/blog/agent/openai-realtime-api-pricing-2025-cost-calculator/)
- [gpt-realtime-mini Pricing (eesel.ai)](https://www.eesel.ai/blog/gpt-realtime-mini-pricing)
- [Deepgram Pricing Page](https://deepgram.com/pricing)
- [Deepgram vs ElevenLabs Comparison](https://deepgram.com/learn/deepgram-vs-elevenlabs)
- [Deepgram TTS ElevenLabs Alternatives](https://deepgram.com/learn/text-to-speech-elevenlabs-alternatives)
- [Deepgram Pricing 2026 (Nova-3 Breakdown)](https://brasstranscripts.com/blog/deepgram-pricing-per-minute-2025-real-time-vs-batch)
- [Deepgram Best TTS APIs 2026](https://deepgram.com/learn/best-text-to-speech-apis-2026)
- [Google Cloud Text-to-Speech Pricing](https://cloud.google.com/text-to-speech/pricing)
- [Google Cloud TTS Overview](https://cloud.google.com/text-to-speech)
- [Google Cloud TTS Pricing (Speechactors)](https://speechactors.com/article/google-cloud-pricing-and-plans/)
- [Amazon Polly Pricing](https://aws.amazon.com/polly/pricing/)
- [Amazon Polly Pricing Guide (Astuto)](https://www.astuto.ai/blogs/amazon-polly-pricing-and-cost-optimization)
- [Microsoft Azure Speech Services Pricing](https://azure.microsoft.com/en-us/pricing/details/speech/)
- [Azure Speech-to-Text Real Costs](https://brasstranscripts.com/blog/azure-speech-services-pricing-2025-microsoft-ecosystem-costs)
- [Azure Custom Neural Voice Pricing (Microsoft Q&A)](https://learn.microsoft.com/en-us/answers/questions/1346760/custom-neural-voice-pricing)
- [Cartesia Pricing Page](https://cartesia.ai/pricing)
- [Cartesia Sonic 3 Pricing (eesel.ai)](https://www.eesel.ai/blog/cartesia-sonic-3-pricing)
- [Cartesia AI Review (Smallest.ai)](https://smallest.ai/blog/cartesia-ai-review-2025-features-pricing-and-comparison)
- [Cartesia Top ElevenLabs Alternatives](https://cartesia.ai/learn/top-elevenlabs-alternatives)
- [Fish Audio AI Voice Generator Comparison](https://fish.audio/vs/)
- [Fish Audio Cheapest TTS API for Developers](https://fish.audio/blog/cheapest-text-to-speech-api-developers/)
- [Fish Audio Pricing & Plans](https://fish.audio/plan/)
- [PlayHT Pricing](https://play.ht/pricing/)
- [PlayHT Pricing Guide (Voice.ai)](https://voice.ai/hub/tts/play-ht-pricing/)
- [Camb AI ElevenLabs Alternatives](https://www.camb.ai/blog-post/elevenlabs-alternatives)
- [Smallest.ai ElevenLabs Alternatives](https://smallest.ai/blog/elevenlabs-alternatives-tts)
- [Murf.ai ElevenLabs Alternatives](https://murf.ai/alternative/elevenlabs)
- [Speechmatics Best TTS APIs 2026](https://www.speechmatics.com/company/articles-and-news/best-tts-apis-in-2025-top-12-text-to-speech-services-for-developers)
- [Voice AI Pricing Comparison (CloudTalk)](https://www.cloudtalk.io/blog/how-much-does-voice-ai-cost/)
- [Voice AI Platform Pricing Comparison (Retell AI)](https://www.retellai.com/resources/voice-ai-platform-pricing-comparison-2025)
- [Best TTS APIs for Real-Time Voice Agents (Inworld)](https://inworld.ai/resources/best-voice-ai-tts-apis-for-real-time-voice-agents-2026-benchmarks)
- [Best AI Voice Generators 2026 (Inworld)](https://inworld.ai/resources/best-ai-voice-generators)
- [Open-Source TTS Alternatives (Smallest.ai)](https://smallest.ai/blog/open-source-tts-alternatives-compared)
- [Local TTS Guide 2026 (LocalClaw)](https://localclaw.io/blog/local-tts-guide-2026)
- [Open Source TTS Guide (qcall.ai)](https://qcall.ai/text-to-speech-open-source)
- [Coqui TTS Review (qcall.ai)](https://qcall.ai/coqui-tts-review)
- [Open Source ElevenLabs Alternatives (Nerdynav)](https://nerdynav.com/open-source-ai-voice/)
- [ElevenLabs Alternatives (ocdevel)](https://ocdevel.com/blog/20250720-tts)
- [Piper TTS (GitHub)](https://github.com/rhasspy/piper)
- [Open-Source TTS Models Compared (Inferless)](https://www.inferless.com/learn/comparing-different-text-to-speech---tts--models-part-2)
- [Open-Source TTS Models (BentoML)](https://www.bentoml.com/blog/exploring-the-world-of-open-source-text-to-speech-models)
- [XTTS Hosting (DatabaseMart)](https://www.databasemart.com/ai/xtts)
- [Coqui TTS GitHub](https://github.com/coqui-ai/TTS)
