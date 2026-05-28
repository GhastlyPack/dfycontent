# DFY Content — Marketing Site Memory

> This is the entry point for any Claude agent picking up this repo. Read this first, then `ROADMAP.md` for what's next, then `COPY-BRIEF.md` if you're filling in copy.

---

## 1. What this repo is

The marketing website for **DFY Content** — a done-for-you short-form video service. Clients spend ~2 hours with the team in a one-time studio session. After that the team clones their face + voice with AI, writes every script, produces every video, and publishes to every platform. The client approves; the team handles everything else.

This repo:
- Live at **dfycontent.io** (hosted on Vercel, owned by `GhastlyPack/dfycontent` on GitHub)
- A long-form marketing site + qualifier funnel that routes leads to Calendly
- Wired to Customer.io for lead capture + segmentation

**This repo is NOT the production app.** The internal staff-only app where the actual cloning + video pipeline runs is a separate repo at `GhastlyPack/DFYcontent_app` (planned, scoped in the PRD). It lives at `app.dfycontent.io`. Do not confuse the two — they share a brand and a domain root but are otherwise unrelated codebases.

If you need product context, the PRD is at `C:/Users/16cro/Downloads/DFY_Content_Platform_PRD_v0.1.pdf` (on the user's machine, not in repo). Key facts from it:
- Voice cloning via ElevenLabs v2 multilingual (one Pro account per client)
- Image gen via Gemini / Nanobanana Pro
- Animation via Creatify Aurora
- Stitching via ffmpeg on Modal/Fly
- 14-day onboarding pipeline
- Pricing floor: $2k/mo
- Pricing tiers: Starter ($2-5k), Pro ($5-10k), Premium ($10-20k+)

---

## 2. Tech stack

- **Next.js 15.4 + App Router + TypeScript**
- **React 19**
- **No Tailwind.** Inline styles + a `theme.ts` object + targeted CSS in `globals.css` for responsive layout + animations.
- **framer-motion** for animations (scroll-triggered reveals, magnetic hover, etc.)
- **next/font/google** for typography (Plus Jakarta Sans display, Inter body, plus Instrument Serif, DM Serif Display, JetBrains Mono, Space Grotesk for variants)
- **MDX content** via `next-mdx-remote` + `gray-matter` for blog, glossary, customers
- **Vercel** for hosting, auto-deploy on push to `main`

Dependencies (see `package.json`):
```
framer-motion, gray-matter, next, next-mdx-remote,
rehype-autolink-headings, rehype-slug, remark-gfm
```

---

## 3. File / folder convention

```
src/
├── app/                     # Next.js App Router pages
│   ├── (all routes here)
│   ├── sitemap.ts           # auto-generated sitemap.xml
│   ├── robots.ts            # robots.txt (allows AI crawlers)
│   ├── globals.css          # CSS resets + responsive media queries + keyframes
│   ├── layout.tsx           # root layout, loads all fonts
│   └── page.tsx             # default lander (founder variant)
│
├── components/
│   ├── atoms.tsx            # reusable UI primitives (Button, Container, Section,
│   │                          Eyebrow, Field, OptionCard, Card, etc.)
│   ├── motion-atoms.tsx     # framer-motion-based primitives (Reveal, CountUp,
│   │                          MagneticHover, Marquee, WordReveal, StaggerGroup)
│   ├── mdx-components.tsx   # MDX element overrides (h1, p, table, etc.)
│   ├── PageHeader.tsx       # standard page header with breadcrumbs
│   ├── Breadcrumbs.tsx
│   ├── FAQAccordion.tsx
│   ├── ArticleLayout.tsx    # shared layout for blog/glossary/customers
│   ├── NewsletterSignup.tsx # client component for email capture
│   ├── TrackVariant.tsx     # writes lead.variant to sessionStorage
│   ├── Flow.tsx             # the qualifier funnel (5 steps)
│   ├── CalendlyEmbed.tsx
│   ├── Lander.tsx           # composes the default lander
│   ├── sections/            # lander sections (Hero, BentoFeatures, etc.)
│   └── templates/
│       ├── ComparisonPage.tsx   # /vs/* template
│       └── IndustryPage.tsx     # /for/* template
│
├── lib/
│   ├── theme.ts             # design tokens (palette, fonts, radius, shadow)
│   ├── motion.ts            # framer-motion variants
│   ├── content.ts           # MDX loaders (blog, glossary, customers, resources)
│   ├── schema.ts            # JSON-LD generators (Org, Service, FAQ, HowTo, etc.)
│   ├── variants.ts          # 4 audience copy variants (founder, etc.)
│   ├── types.ts             # form types (Lead, Answers, etc.)
│   ├── qualify.ts           # qualifier logic (budget != 0-2k && setup === yes)
│   └── customerio.ts        # CIO Track API client
│
content/                     # MDX content (NOT in src/)
├── blog/                    # *.mdx files; frontmatter: title, description,
│                              publishedAt, author, category, tags, ogImage
├── glossary/                # *.mdx; frontmatter: term, definition, related
├── customers/               # *.mdx; frontmatter: client, role, industry,
│                              result, quote, publishedAt
└── resources/               # *.mdx; frontmatter: title, description, format,
                               gated, publishedAt
```

---

## 4. Design system

Locked production theme in `src/lib/theme.ts`:

- **Background**: `#f0f0f3` (warm light gray)
- **Surface (cards)**: `#ffffff`
- **Foreground (text)**: `#1a1d3a` (deep navy)
- **Foreground muted**: `#5b6478`
- **Accent**: `#6c5ce7` (indigo/purple) — primary CTAs, accents
- **Accent soft**: `#a5b4fc` (lavender)
- **Accent bg**: `#eef0ff` (very light purple)
- **Border**: `rgba(26, 29, 58, 0.08)`

Typography:
- Display: **Plus Jakarta Sans** (`var(--font-display)`)
- Body: **Inter** (`var(--font-body)`)
- Variant-only: Instrument Serif, DM Serif Display, JetBrains Mono, Space Grotesk

Radius: 8 / 12 / 16 / 20 / 28 / pill
Shadow: layered, soft, navy-tinted (see `theme.shadow`)

**Mobile-first methodology** baked in. Base CSS targets small screens; `@media (min-width: 768px / 1024px)` adds desktop. Aggressive animations only on `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`.

---

## 5. Routes overview

**14 lander variants** (each writes `lead.variant` to sessionStorage for CIO attribution):

| Audience copy | Architectural |
|---|---|
| `/` (founder) | `/v-minimal` |
| `/business-owner` | `/v-editorial` |
| `/creator` | `/v-sales-letter` |
| `/coach` | `/v-bento` |
| | `/v-video` |
| | `/v-faq` |
| | `/v-stats` |
| | `/v-testimonials` |
| | `/v-before-after` |
| | `/v-dark` |

`/variants` = internal team review page listing all 14.

**Qualifier funnel:** `/apply` (contact info + 4 questions) → `/dnq?reason=...` or `/book` (Calendly) → `/booked`

**Marketing pages:**
- `/about`, `/how-it-works`, `/pricing`, `/faq`, `/contact`
- `/legal/privacy`, `/legal/terms` (NEED LAWYER REVIEW — warning banners visible)

**Content engine:**
- `/blog`, `/blog/[slug]`, `/blog/category/[category]` (3 sample posts in repo)
- `/glossary`, `/glossary/[term]` (5 sample terms in repo)
- `/customers`, `/customers/[slug]` (1 sample case in repo)

**Comparisons (SEO):**
- `/vs/heygen`, `/vs/synthesia`, `/vs/captions`, `/vs/hiring-an-agency`, `/vs/doing-it-yourself`

**Industry pages:**
- `/for/saas-founders`, `/for/coaches`, `/for/consultants`, `/for/agency-owners`, `/for/real-estate`

**Lead-gen:**
- `/resources` (3 lead-magnet stubs)
- `/tools/content-roi-calculator` (interactive)

**Machine-readable:**
- `/sitemap.xml`, `/robots.txt`, `/llms.txt` (AEO)

---

## 6. Variant system (important)

Two orthogonal variant axes:

1. **Audience copy variants** — same layout, different copy. Config in `src/lib/variants.ts`. Composed by `src/components/Lander.tsx`. Routes: `/`, `/[variant]/page.tsx` (dynamic, static-built via `generateStaticParams`).

2. **Architectural variants** — different layouts entirely. Each at `src/app/v-{name}/page.tsx`, self-contained. Different fonts, palettes, motion. They share `TrackVariant`, `/apply` funnel, but visually distinct.

Both write `sessionStorage.lead.variant` so Customer.io segments by ad angle. The `lander_variant` attribute on customer profile + on `contact_submitted` and `qualification_completed` events.

---

## 7. Copy workflow

Every static page has a `const COPY = { ... }` block at the top. Each text slot tagged with a `copy_id` comment marker. Bot search/replaces strings without touching structure.

MDX content (blog/glossary/customers) lives in `content/`. Bot edits `.mdx` files directly. Frontmatter parsed by `gray-matter` at build time.

**Source of truth:** [`COPY-BRIEF.md`](./COPY-BRIEF.md) at repo root. Has per-page briefs, tone rules, banned phrases, SEO/AEO targets, required facts.

---

## 8. SEO + AEO strategy

- **Schema markup** generated by `src/lib/schema.ts`: Organization, Service, FAQPage, HowTo, Article, DefinedTerm, BreadcrumbList, Person. Every relevant page includes JSON-LD.
- **`/llms.txt`** at repo root in `public/llms.txt` — emerging standard for AI crawlers. Contains company facts in clean markdown.
- **`/robots.txt`** explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot, CCBot.
- **`/sitemap.xml`** auto-generated by `src/app/sitemap.ts`, includes every static + MDX-derived route.
- **FAQ schema is the highest-impact AEO asset.** `/faq` has 30 Q/A pairs in 6 categories with full schema.
- **Glossary schema (`DefinedTerm`)** is the second-highest. AI engines aggressively cite definitions.
- Mobile-first responsive, fast static rendering, Core Web Vitals optimized.

---

## 9. Integrations

| Service | Status | Config |
|---|---|---|
| **Vercel** | ✓ Deployed | Auto-deploy on push to `main`. Env vars set in Vercel dashboard. |
| **Customer.io** | ✓ Wired | Track API. Env: `CUSTOMERIO_SITE_ID`, `CUSTOMERIO_TRACK_API_KEY`, `CUSTOMERIO_REGION`. Events: `contact_submitted`, `qualification_completed`, `call_booked`. Customer attribute: `lander_variant`. |
| **GitHub** | ✓ | `GhastlyPack/dfycontent`, `main` branch auto-deploys. |
| **Domain** | ✓ Live | dfycontent.io (GoDaddy registrar, Vercel-managed DNS records). Both apex + www work. |
| **Calendly** | ✗ NOT WIRED | Env var `NEXT_PUBLIC_CALENDLY_URL` not set. `/book` shows "Calendly not configured" notice. Plan in `SETUP.md` — team@dfycontent.io workaround discussed. |
| **Newsletter ESP** | ✗ NOT WIRED | `NewsletterSignup.tsx` simulates success but doesn't POST anywhere. Wire to Customer.io or another ESP. |

---

## 10. Conventions for edits

- **Inline styles, not Tailwind.** Reach for `theme.palette.*` / `theme.fonts.*` / `theme.radius.*` from `@/lib/theme`.
- **Reuse atoms.** Don't recreate buttons / containers / cards — they exist in `atoms.tsx`.
- **Mobile-first.** Default styles for small screens; add desktop with `@media (min-width: 768px)` in `globals.css`.
- **Motion-respectful.** Heavy motion gates on `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`. Use motion primitives from `motion-atoms.tsx`.
- **Schema on every new page.** Add appropriate JSON-LD from `@/lib/schema`.
- **Add new routes to `sitemap.ts`.** It's manual (not auto-discovery) for static routes. MDX-derived routes do auto-add.
- **Don't push directly to main if it breaks the build.** Always run `npm run build` before committing.
- **CLR/LF warnings on Windows are normal** — `.gitattributes` handles them. Ignore.

---

## 11. Common operations

```bash
# Develop
npm run dev          # http://localhost:3000

# Build (always do before committing big changes)
npm run build

# Add a blog post
# 1. Create content/blog/your-slug.mdx with frontmatter (see existing samples)
# 2. Build, commit, push. Sitemap auto-updates.

# Add a glossary term
# Same as above, but in content/glossary/

# Add a comparison page (/vs/[competitor])
# 1. Create src/app/vs/your-competitor/page.tsx
# 2. Build a ComparisonConfig and pass to <ComparisonPage>
# 3. Add to /vs index, sitemap, /llms.txt

# Add an industry page (/for/[industry])
# Same as above with <IndustryPage>

# Add a new variant lander
# 1. Create src/app/v-{name}/page.tsx, self-contained
# 2. Add to /variants directory, sitemap, COPY-BRIEF.md
```

---

## 12. Where to look for things

- **Where copy is**: `const COPY` blocks at top of `src/app/*/page.tsx` files OR `content/**/*.mdx`
- **Where styles are**: `src/lib/theme.ts` (tokens), `src/components/atoms.tsx` (primitives), `src/app/globals.css` (responsive overrides)
- **Where the funnel logic is**: `src/components/Flow.tsx` (5 steps), `src/app/api/lead/route.ts` (CIO write), `src/lib/qualify.ts` (DQ check)
- **Where motion lives**: `src/components/motion-atoms.tsx`
- **What's pending**: `ROADMAP.md`
- **What copy bot needs**: `COPY-BRIEF.md`
- **Original deployment guide**: `SETUP.md`

---

## 13. Skill installed

`ui-ux-pro-max` skill is installed at `.claude/skills/ui-ux-pro-max/`. It's a comprehensive UI/UX guidance + design-system search tool (50+ styles, 161 color palettes, 57 font pairings, 99 UX guidelines). Use it via:

```bash
python ".claude/skills/ui-ux-pro-max/scripts/search.py" "<query>" --design-system
```

Or invoke the skill in conversation if Claude Code surfaces it in the available-skills list.

---

## 14. The single most important context to absorb

The marketing site is **structurally done**. ~70 static routes built, all schema markup wired, AEO surface area in place. What's missing:

1. **Real copy** from the bot (existing copy is shippable but bot-improvable)
2. **Calendly wired** (only thing blocking the full `/book` funnel)
3. **Founder identity** (name, photo, bio — placeholders everywhere)
4. **Legal review** (privacy + terms pages have warning banners)
5. **Real testimonials and case studies** (placeholders currently)

Read `ROADMAP.md` for priority-ordered list. The structural work is done. The next phase is content and integrations.
