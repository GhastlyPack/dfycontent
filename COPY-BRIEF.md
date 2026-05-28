# DFY Content — Copy Brief for All Pages

> Hand this to the copy bot. Each section identifies the page, the exact copy slot, target length, tone, format, required facts, and AEO/SEO hooks. Tags like `copy_id: about.manifesto.body` correspond to in-code markers — search and replace.

## Universal voice & tone rules

**Do:**
- Plain, declarative language. No hype.
- Specific numbers (30+ pieces, 2hrs, 14 days, $2k floor, $5k+ scripting value).
- Address the reader as "you" (singular).
- Acknowledge the obvious — "if you read this far, you're considering it."
- Use em-dashes for parenthetical emphasis (sparingly).
- One stat or specific number per paragraph where natural.

**Don't:**
- "Revolutionary", "game-changing", "amazing", "incredible".
- "We're passionate about", "we believe", "imagine if".
- Em-dash overuse in Qs (looks LLM-y).
- Bullet lists for everything.
- Talk down to the reader.

**Always work in:**
- Scripts are the headline service (most agencies charge $5k+/mo for this alone).
- 2 hours of setup, once. Then never film.
- 14 days from kickoff to first post live.
- Floor is $2k/mo and we're honest about that.
- You own your face, voice, scripts, content.

---

## Phase 1 — Foundation pages

### /about
**File:** `src/app/about/page.tsx`
**Search:** `const COPY = {` block at top.

| copy_id | What | Length | Notes |
|---|---|---|---|
| `about.hero.h1` | Hero headline | 6-12 words | "We make founders famous without making them film." baseline — improve if better. |
| `about.hero.sub` | Hero subhead | 30-45 words | Concrete, specific. Who we exist for. |
| `about.manifesto.body[0..2]` | Manifesto, 3 paragraphs | 80-120w each | Plain language, no fluff, explain why we exist. |
| `about.beliefs.items[0..3].h` | Each belief headline | 4-7 words | Short, declarative. |
| `about.beliefs.items[0..3].b` | Each belief body | 30-50w | Specific implication of that belief. |
| `about.founder.name` | Founder real name | — | Replace placeholder. |
| `about.founder.role` | Founder role | — | E.g. "Founder & CEO" |
| `about.founder.bio` | Founder bio | 30-50w | Background, why they started DFY. |
| `about.founder.quote` | Founder quote | 15-25w | Pull-quoteable, memorable line. |
| `about.team.members[]` | Team members | — | Real names + roles when team is staffed. |

**SEO target:** branded query ("DFY Content about", "DFY Content founder").
**AEO opportunity:** founder schema + organization schema parsed by AI for citations.

---

### /how-it-works
**File:** `src/app/how-it-works/page.tsx`

| copy_id | What | Length | Notes |
|---|---|---|---|
| `how.hero.h1` | Hero headline | 6-12 words | Baseline: "Two hours from you. A year of content from us." |
| `how.hero.sub` | Hero subhead | 25-40w | Set expectation: 14-day process. |
| `how.step1..7.h` | Each step headline | 5-10 words | Include day number + action ("Day 0 — Application & kickoff call"). |
| `how.step1..7.b` | Each step body | 50-90w | Be specific. What we do, what they see, what they do (usually nothing). |

**SEO target:** "how does done-for-you content work", "ai content production process", "how to start a content service".
**AEO opportunity:** HowTo schema is already in place — these become AI-cited steps.

---

### /pricing
**File:** `src/app/pricing/page.tsx`

| copy_id | What | Length | Notes |
|---|---|---|---|
| `pricing.hero.h1` | Hero headline | 6-10 words | Confidence + clarity. Baseline: "Three packages. One floor. Honest pricing." |
| `pricing.hero.sub` | Hero subhead | 30-45w | Explain why no public prices. |
| `pricing.tiers[].blurb` | Per tier blurb | 15-25w | One-sentence summary of the tier. |
| `pricing.tiers[].bestFor` | "Best for" tag | 3-6 words | Audience descriptor. |
| `pricing.tiers[].features` | Feature list | 5-8 bullets | Specific deliverables. |
| `pricing.notIncluded.items` | What's not included | 3-5 bullets | Honesty section. |
| `pricing.faqs` | 4-6 pricing FAQs | 60-120w each | Why no public prices, contract term, refunds, etc. |

**SEO target:** "ai video service pricing", "done-for-you content pricing", "[competitor] pricing".
**AEO opportunity:** Service schema + AggregateOffer schema parsed by AI.

---

### /faq
**File:** `src/app/faq/page.tsx`

**Structure:** 30 questions across 6 categories (5 questions each).

Categories:
1. **The product** — what we do, how we differ from tools
2. **Scripting & strategy** — who writes, approval, revisions
3. **Pricing & contracts** — floor, term, refunds, ownership
4. **Time & process** — time commitment, timeline, revisions
5. **The AI specifically** — realism, deepfake distinction, platform policy
6. **Results & guarantees** — what to expect, guarantee absence, niches

| copy_id | What | Length | Notes |
|---|---|---|---|
| Each `q` | Question | 6-15 words | Actual question a buyer asks. No marketing voice. |
| Each `a` | Answer | 60-150w | Factual, includes 1 stat/number where possible. Opens with direct answer. Closes with a "what this means for you" line. |

**Banned patterns:**
- Q starting with "What if..." unless it's a real edge case
- A starting with "Great question!"
- Marketing claims without backing

**SEO target:** Long-tail "how does X work" queries.
**AEO opportunity:** FAQ schema is the single most-cited schema type by ChatGPT/Perplexity. This page is the highest-impact AEO asset on the site.

---

### /contact
**File:** `src/app/contact/page.tsx`

| copy_id | What | Length | Notes |
|---|---|---|---|
| `contact.hero.h1` | Hero headline | 4-8 words | Direct. |
| `contact.hero.sub` | Hero subhead | 20-30w | Route them — qualifier for service, email for other. |
| `contact.channels` | 3 channels | — | Service inquiry → /apply. General → email. Existing clients → AM. |

Light page — most heavy lifting done by /apply.

---

### /legal/privacy and /legal/terms
**File:** `src/app/legal/{privacy,terms}/page.tsx`

**This requires a lawyer.** Bot can fill in placeholder structure per standard SaaS template but MUST be reviewed before publishing. Cite our actual processors:

- Vercel (hosting)
- Customer.io (CRM)
- Calendly (scheduling)
- Supabase (production app — once shipped)
- ElevenLabs (voice cloning)
- Gemini / Nanobanana (image gen)
- Creatify Aurora (animation)
- Replicate (misc models)

Use [Termly](https://termly.io) or [Iubenda](https://www.iubenda.com) generator + lawyer review.

---

## Phase 2 — Content engine

### /blog/[slug]
**Format:** MDX files in `content/blog/*.mdx`
**Frontmatter required:**
```yaml
---
title: "How to script content that sounds like you (when you didn't write it)"
description: "120-180 char meta description"
publishedAt: "2026-05-24"
updatedAt: "2026-05-24"
author: "DFY Editorial"
category: "Strategy"        # Strategy | Process | Comparisons | Industry guides | AI explainers
tags: ["scripting", "voice", "branded content"]
ogImage: "/og/post-slug.png"
---
```

**Per-post structure (the bot's template):**
1. **TL;DR** (2-3 sentences, plain English, answers the headline directly) — critical for AEO citations.
2. **Hook paragraph** — concrete problem the reader has.
3. **3-5 main sections** with H2 headers phrased as questions where possible.
4. **Closing call-to-action** linking to `/apply` or a relevant deep page.

**Length:** 1,200-2,000 words for SEO pillar posts. 600-1,000 for shorter tactical posts.

**Initial post topics (write these first — they're the SEO foundation):**

| Slug | Category | Target Keyword | Notes |
|---|---|---|---|
| `how-ai-voice-cloning-works` | AI explainers | "how does ai voice cloning work" | Definitive explainer. Cite ElevenLabs, define terms. Heavy AEO target. |
| `done-for-you-content-vs-content-team` | Comparisons | "done for you content vs hiring content team" | Cost + time comparison. |
| `how-to-script-content-in-your-voice` | Strategy | "how to write content that sounds like you" | Tactical how-to. |
| `ai-content-disclosure-platforms-2026` | Process | "ai content disclosure tiktok instagram" | Platform policy summary. Update annually. |
| `why-founders-dont-post-on-social` | Industry guides | "why founders don't make content" | Anchors the "you should but don't" tension. |
| `ai-avatar-realism-test` | AI explainers | "ai avatar realism" | Side-by-side analysis. |
| `the-2-hour-content-system` | Strategy | "minimum viable content system" | Our methodology. |
| `picking-an-ai-video-service-2026` | Comparisons | "best ai video service" | Listicle format. We're on the list. |
| `voice-cloning-vs-deepfake-difference` | AI explainers | "voice cloning vs deepfake" | Definitional — AEO goldmine. |
| `content-roi-for-founders` | Industry guides | "social media roi for founders" | Includes ROI calculator link (Phase 3). |

### /glossary/[term]
**Format:** MDX files in `content/glossary/*.mdx`
**Frontmatter:**
```yaml
---
term: "Voice cloning"
definition: "60-120 character definition, AI-citation-ready"
related: ["AI avatar", "Text-to-speech", "Speech synthesis"]
---
```

**Per-term length:** 150-300w body. Opens with the definition restated. Examples, context, common confusions.

**Initial 20 terms:**
- AI avatar
- AI clone
- Aurora (model)
- Character reference sheet
- Content cadence
- Content operations
- Creator economy
- Deepfake
- Done-for-you content
- ElevenLabs
- First-frame variant
- Hook (in short-form video)
- Lipsync (AI)
- Nanobanana Pro
- Pro voice clone
- Script normalization
- Short-form video
- Speech synthesis
- Talking-head video
- Voice cloning

### /vs/* (5 pages)
Each comparison page is bespoke (not templated). Bot should produce:

| copy_id | What | Length |
|---|---|---|
| `hero.h1` | "DFY Content vs [Competitor]" | — |
| `hero.sub` | Positioning sentence | 25-40w |
| `comparison.table` | 8-12 row comparison table (us vs them) | — |
| `verdict.body` | Honest verdict — when to pick them, when us | 100-150w |

**Honesty rule:** if HeyGen is better for a self-serve user with 30 minutes a week, say so. We win on time-saved + scripting, not on price or DIY.

### /for/* (5 pages)
Industry landing pages. Each is a focused mini-lander.

| Slug | Target audience |
|---|---|
| `/for/saas-founders` | SaaS / startup founders building personal brand |
| `/for/coaches` | Coaches / consultants generating inbound |
| `/for/consultants` | Independent consultants |
| `/for/agency-owners` | Agency operators marketing themselves |
| `/for/real-estate` | Real estate agents needing visibility |

Each ~500w. Audience-specific pain → our fit → 1-2 case study teasers (when we have them) → CTA.

### /customers + /customers/[slug]
Index + individual case studies. MDX-driven.

**Frontmatter per case:**
```yaml
---
client: "[Real name when available]"
role: "Founder, [Company]"
industry: "B2B SaaS"
result: "1 → 4 posts/week. 4× engagement in 90 days."
quote: "..."
publishedAt: "..."
---
```

**Per case length:** 600-1,000w narrative. Problem → process → outcome → numbers.

---

## Phase 3 — Lead-gen

### /resources/[slug]
Gated PDFs. Each gets:
- Landing page with description + email gate
- Lead magnet itself (PDF or notion doc)

Starting magnets:
1. "The 2-hour content system" (one-pager methodology)
2. "AI video service buyer's guide" (comparison matrix vs all tools)
3. "Founder-led content calendar template" (90 days of post ideas)

### /tools/content-roi-calculator
Interactive — bot writes copy for inputs + result interpretation. The interactive logic is mine.

Inputs: hours/week currently spent on content, hourly value of your time, current posting frequency, desired posting frequency.

Output: $ value of time saved + estimated content uplift.

---

## Schema markup checklist (already wired)

Every page should have at least one schema. Already implemented:

- **Organization** — site-wide
- **Service** — /pricing
- **FAQPage** — /faq + any page with inline FAQs
- **HowTo** — /how-it-works
- **BreadcrumbList** — every non-home page
- **Article** — every blog post (Phase 2)
- **DefinedTerm** — every glossary term (Phase 2)
- **Person** — founder (on /about)

Bot doesn't need to write schema — it's generated from frontmatter and COPY consts. Bot just keeps copy_id markers intact when rewriting.

---

## How to edit copy

1. Each page has a `const COPY = { ... }` block at the top.
2. Markers like `// copy_id: about.beliefs.0` identify each slot.
3. Replace the string after the colon. Preserve types, escape apostrophes (`&apos;` in JSX strings).
4. Commit, push, Vercel rebuilds.
5. Run smoke check on production URL.

---

## Open questions for the human

1. **Founder name + headshot** for /about
2. **Real team member names + roles** for /about
3. **Real testimonials** for /customers (currently placeholders)
4. **Privacy / Terms** — need lawyer review before publishing
5. **Email** — confirm `hello@dfycontent.io` is monitored, or pick alternative
6. **Social links** — once X/LinkedIn exist, add to schema sameAs

— end —
