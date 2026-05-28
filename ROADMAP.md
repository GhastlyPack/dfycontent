# DFY Content Marketing Site — Roadmap

> Forward-looking plan. Start at the top. `CLAUDE.md` for context, this for priority order.

---

## ✅ Shipped

### Foundation
- Next.js 15 + App Router + TypeScript scaffolding
- Vercel deploy + DNS on `dfycontent.io`
- Customer.io Track API integration (identify, contact_submitted, qualification_completed, call_booked events)
- Domain at apex + www, Vercel auto-deploy on push to `main`
- 5-step qualifier funnel at `/apply` (contact info + 4 questions) with DQ routing to `/dnq` or qualified routing to `/book`

### Design system
- Light mode theme (warm light bg, indigo accent, deep navy text)
- Locked in `src/lib/theme.ts`
- Plus Jakarta Sans (display) + Inter (body) + 4 variant-specific fonts via `next/font/google`
- Mobile-first responsive layer in `globals.css`
- Reusable atoms: Button, Container, Section, Eyebrow, Field, OptionCard, Card, ProgressBar, StepCircle, PillTag
- Framer-motion primitives: Reveal, StaggerGroup, MagneticHover, Marquee, CountUp, WordReveal, SparklinePath
- CSS keyframes for above-the-fold (hero) animations to avoid SSR/hydration FOIC

### Landers (14 variants)
- 4 audience copy variants: `/`, `/business-owner`, `/creator`, `/coach`
- 10 architectural variants: `/v-minimal`, `/v-editorial`, `/v-sales-letter`, `/v-bento`, `/v-video`, `/v-faq`, `/v-stats`, `/v-testimonials`, `/v-before-after`, `/v-dark`
- Designer-grade motion calibrated per variant
- `/variants` internal team review page
- `lead.variant` attribution to Customer.io

### Foundation pages
- `/about` — manifesto, beliefs, founder card, team grid
- `/how-it-works` — 7-step 14-day process with HowTo schema
- `/pricing` — 3 tiers, what's-not-included, Service schema
- `/faq` — 30 Q/A in 6 categories with FAQPage schema
- `/contact` — 3-channel routing
- `/legal/privacy` + `/legal/terms` — placeholder structure with lawyer-review banners

### Content engine (Phase 2)
- MDX infrastructure (gray-matter + next-mdx-remote)
- `/blog` index + `/blog/[slug]` post template + `/blog/category/[category]`
- `/glossary` index + `/glossary/[term]` with DefinedTerm schema
- `/customers` index + `/customers/[slug]` case study template
- 3 sample blog posts (Strategy / AI explainers categories)
- 5 sample glossary terms
- 1 sample customer case study (placeholder)

### Comparison pages (`/vs/*`)
- `/vs/heygen`, `/vs/synthesia`, `/vs/captions`, `/vs/hiring-an-agency`, `/vs/doing-it-yourself`
- Each with comparison table, honest verdict, "pick them if / pick us if" cards
- Shared `ComparisonPage` template at `src/components/templates/`

### Industry pages (`/for/*`)
- `/for/saas-founders`, `/for/coaches`, `/for/consultants`, `/for/agency-owners`, `/for/real-estate`
- Each with pain points, why-we-fit, outcome stats, FAQ
- Shared `IndustryPage` template

### Lead-gen (Phase 3)
- `/resources` with 3 lead-magnet stubs
- `/tools/content-roi-calculator` (interactive with CountUp)
- `NewsletterSignup` client component (ESP-agnostic, currently simulates success)

### SEO / AEO
- Schema markup throughout (Organization, Service, FAQPage, HowTo, Article, DefinedTerm, BreadcrumbList, Person)
- Auto-generated `/sitemap.xml`
- `/robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot, CCBot
- `/llms.txt` at root with company facts for AI citation

### Operational docs
- `CLAUDE.md` — agent memory
- `ROADMAP.md` — this file
- `COPY-BRIEF.md` — per-page copy briefs for the copy bot
- `SETUP.md` — deployment + integration checklist (original)
- `README.md` — human-facing project intro

---

## 🔴 Blocking (do these first)

### 1. Calendly setup
**Status:** completely blocked. `/book` shows "Calendly not configured" notice.
**What's needed:**
- Create `team@dfycontent.io` Google Workspace user
- Founder shares his Google Calendar with team@ at "See only free/busy" permission
- Sign up Calendly as team@; create event type "DFY Content — intro call" (30 min, Google Meet)
- Configure event type to check founder's shared calendar for conflicts
- Grab public Calendly URL → paste into Vercel as `NEXT_PUBLIC_CALENDLY_URL` env var
- Redeploy
- Set up Customer.io workflow to email team@ on `call_booked` event (so founder can be manually added as guest to each booking)
- Smoke test `/apply` → `/book` → `/booked` flow end-to-end

**Once done:** mark task #7 complete. Funnel is fully functional.

### 2. Legal review
**Status:** `/legal/privacy` and `/legal/terms` have warning banners ("Placeholder content — requires legal review"). Pages are visible but should not be considered binding.
**What's needed:**
- Run through a generator (Termly, Iubenda) seeded with actual processor list
  - Processors used: Vercel, Customer.io, Calendly, ElevenLabs, Gemini/Nanobanana, Creatify Aurora, Replicate, Supabase (production app)
- Lawyer review (especially the AI-likeness + clone IP ownership clauses)
- Remove placeholder banners, publish final versions

---

## 🟡 Priority (do these next)

### 3. Founder identity
**What's needed:**
- Real founder name (currently placeholder "Founder Name")
- Bio (30-50w)
- Headshot (replace gradient initial placeholder)
- Role title
- Pull-quote (15-25w)

**Files to update:**
- `src/app/about/page.tsx` (COPY.founder)
- `src/lib/schema.ts` (SITE.founder)
- `public/llms.txt` (Founder section)

### 4. Real team members
**What's needed:**
- Names + roles for `src/app/about/page.tsx` COPY.team.members (4 slots)

### 5. Copy bot pass on COPY-BRIEF.md
**What's needed:**
- Bot reads `COPY-BRIEF.md`
- Replaces all `[Copy needed]` markers in MDX files (`content/**/*.mdx`)
- Replaces all `const COPY = { ... }` placeholder strings in `src/app/*/page.tsx`
- Commits in batches by page
- Preserves all `copy_id` markers for future edits

**Expected output**: ~70 pages of polished copy across foundation, comparisons, industries, blog stubs, glossary, FAQ.

### 6. Newsletter ESP wiring
**What's needed:**
- Pick ESP: Customer.io (already in stack — easiest), Beehiiv, ConvertKit, Loops.
- Wire `NewsletterSignup.tsx` to actually POST to that ESP
- Confirm subscription email flow works

### 7. Real testimonials + case studies
**What's needed:**
- Get permission from 2-3 existing clients to use names + outcomes
- Write 2-3 real case studies in `content/customers/*.mdx`
- Replace placeholder quote in `src/app/v-testimonials/page.tsx` and across audience-variant testimonials sections
- Replace `/customers/sample-case.mdx` with real case (or delete it)

### 8. Founder photo for hero card
**What's needed:**
- Replace gradient placeholder card in `src/components/sections/Hero.tsx` (and corresponding hero cards in other variants) with real founder image or product mockup

---

## 🟢 Soon (after blockers cleared)

### 9. Variant shortlisting
After the team reviews `/variants`, narrow 14 → 2-3 to test as paid traffic destinations. Then:
- Update Customer.io to segment by `lander_variant` attribute
- Set up A/B comparison (qualified-rate, DQ-rate, booked-rate per variant)
- Decommission losing variants from sitemap (or keep at low priority)

### 10. Blog content production
Currently 3 stub posts. Bot should write the 10 priority topics listed in `COPY-BRIEF.md`:
- how-ai-voice-cloning-works (stubbed)
- done-for-you-content-vs-content-team
- how-to-script-content-in-your-voice
- ai-content-disclosure-platforms-2026
- why-founders-dont-post-on-social
- ai-avatar-realism-test
- the-2-hour-content-system (stubbed)
- picking-an-ai-video-service-2026
- voice-cloning-vs-deepfake-difference (stubbed)
- content-roi-for-founders

After initial 10: 4-8 posts/month cadence.

### 11. Glossary expansion
Currently 5 stubs. Bot to expand to ~20 terms (listed in `COPY-BRIEF.md`).

### 12. Lead magnet PDFs
`/resources` currently links to placeholder lead-magnet pages. Need:
- "The 2-Hour Content System" — internal methodology one-pager (PDF or Notion)
- "AI Video Service Buyer's Guide" — comparison matrix
- "Founder-Led Content Calendar" — 90-day template

### 13. Real photography
- Founder headshots (multiple angles)
- Team photos
- Behind-the-scenes / studio session imagery (for `/how-it-works`)
- Optional: brand-shoot for hero imagery

---

## 🔵 Later / Parking lot

### Performance + perf metrics
- Lighthouse audit on top 10 routes
- Core Web Vitals monitoring (Vercel Analytics)
- Image optimization (once real images land)
- Consider Tailwind switch if styling becomes painful (currently inline-styles + atoms works fine)

### Analytics
- PostHog or Plausible for behavioral analytics (Vercel Analytics covers traffic basics)
- Funnel analytics in Customer.io (already wired, just needs dashboard setup)

### Production app coordination
- Once `app.dfycontent.io` ships, marketing site should link to it from authenticated states (e.g. "Log in to your account" in nav for existing clients)
- Decide on a unified design system between marketing and app
- Consider: cross-domain auth, shared theme tokens, shared logo/branding

### v1.1 production decisions (from PRD)
- Captioning provider — currently ElevenLabs Studio, evaluating Whisper + ffmpeg + Submagic
- Background ambient sound tool selection
- Topaz manual fallback procedure
- Modal vs Fly.io decision once volume materializes

### SEO content scaling
- After initial 10 blog posts: tracker for keyword rank
- After 20 glossary terms: link-density audit (internal linking)
- Consider hiring a freelance writer for category depth

### Additional landers
If the data warrants:
- More audience variants (executives, lawyers, creators by platform)
- More architectural variants (interactive demo, calculator-driven)

### International
- i18n setup (not needed yet — current target is US)
- Geo-targeted variants if global expansion happens

### Programmatic SEO
- Auto-generated city + industry + role combos (e.g. `/for/coaches/los-angeles`)
- Glossary cross-product comparisons
- Only worth it after volume + content production cadence are stable

---

## ❌ Explicitly out of scope (for this repo)

- The production app at `app.dfycontent.io` — that's `GhastlyPack/DFYcontent_app`, separate codebase
- Client portal — also in the production app, not marketing
- Billing — also production app
- Sign-up flow — production app
- Anything related to the actual cloning / video generation pipeline

---

## Decisions log (so future agents understand the why)

- **Inline styles, not Tailwind.** Decision made early; design changed multiple times; inline + theme object proved easier to refactor than tailwind utility soup. Won't switch unless variants explode in count.
- **No CMS.** MDX in `content/` is simpler than Sanity/Contentful for this volume. Bot edits files, Vercel rebuilds. Move to CMS if writers struggle with git workflow.
- **Indigo accent, light mode.** Pivoted from original neon-lime-on-dark direction (felt "too AI") after team feedback. Inspired by TaskGo template, refined by feel.
- **Mobile-first methodology.** All CSS targets mobile by default. Most paid ad traffic lands on phones first.
- **Schema markup everywhere.** AEO (citation by AI search) is a 2026 priority equal to traditional SEO. Pages are designed for AI parseability.
- **Two variant axes (audience + architectural).** Audience copies let us test ad angles. Architectural variants let us test entire design philosophies. Orthogonal — we can multiply them later if useful.
- **Calendly via team@ account workaround.** Founder doesn't have Calendly. We create `team@dfycontent.io`, share founder calendar at "free/busy" level, configure conflict detection. Bookings land on team@'s calendar; manual step to add founder as guest per booking.
- **Customer.io as both CRM and email/automation.** One vendor for lead capture + segmentation + future workflows. Already wired.
