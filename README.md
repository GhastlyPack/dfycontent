# DFY Content — Marketing Site

The marketing website + qualifier funnel for **DFY Content**, a done-for-you short-form video service. Clones clients' face + voice with AI, produces and publishes social content on their behalf.

**Live:** [dfycontent.io](https://dfycontent.io)

This repo is the **marketing site**. The production application (`app.dfycontent.io`) is a separate repo (`GhastlyPack/DFYcontent_app`) and is not part of this codebase.

---

## Quick start

```bash
# Install
npm install

# Develop
npm run dev          # → http://localhost:3000

# Build (run before pushing significant changes)
npm run build

# Production preview
npm run start
```

Push to `main` → Vercel auto-deploys to `dfycontent.io`.

---

## Tech stack

- Next.js 15.4 (App Router) + React 19 + TypeScript
- No Tailwind — inline styles + theme object + targeted CSS in `globals.css`
- framer-motion for animations
- next/font for typography (Plus Jakarta Sans + Inter + 4 variant fonts)
- MDX (next-mdx-remote + gray-matter) for blog, glossary, customer cases
- Vercel for hosting; auto-deploy on push to `main`
- Customer.io Track API for lead capture + segmentation
- Calendly for booking (env var setup pending — see `ROADMAP.md`)

---

## Repo orientation

| File | Purpose |
|---|---|
| **`CLAUDE.md`** | Memory file for Claude agents. **Read this first if you're an AI agent picking up this repo.** |
| **`ROADMAP.md`** | What's done, what's blocking, what's next. |
| **`COPY-BRIEF.md`** | Per-page copy briefs for the copy bot. Where to put real copy. |
| **`SETUP.md`** | One-time deployment / integration checklist (domain, Vercel, Customer.io, Calendly). |
| `src/` | All app code |
| `content/` | MDX files for blog, glossary, customers, resources |
| `public/llms.txt` | Hand-written facts for AI crawler citation (AEO) |
| `.claude/skills/ui-ux-pro-max/` | Installed UI/UX skill — design-system search via Python |

---

## Funnel

```
/                  (lander — multiple variants live)
  ↓ "Get Started"
/apply             (5-step qualifier: contact info + 4 questions)
  ↓ POST /api/lead → Customer.io identify + contact_submitted event
  ↓ POST /api/lead → Customer.io qualification_completed event
  ↓ server returns { qualified: bool }
/dnq?reason=…      (sorry, not a fit — budget < $2k or won't commit setup)
   — or —
/book              (qualified — Calendly inline embed)
  ↓ Calendly event_scheduled postMessage
  ↓ POST /api/booked → Customer.io call_booked event
/booked            (confirmation)
```

`lead.variant` is captured in `sessionStorage` based on which lander the visitor landed on, sent through to Customer.io as the `lander_variant` customer attribute + as a field on every event.

---

## Key URLs (live site)

**Funnel:** [/](https://dfycontent.io/) → [/apply](https://dfycontent.io/apply) → [/dnq](https://dfycontent.io/dnq) or [/book](https://dfycontent.io/book) → [/booked](https://dfycontent.io/booked)

**Audience variants:** [/business-owner](https://dfycontent.io/business-owner) · [/creator](https://dfycontent.io/creator) · [/coach](https://dfycontent.io/coach)

**Architectural variants:** [/v-minimal](https://dfycontent.io/v-minimal) · [/v-editorial](https://dfycontent.io/v-editorial) · [/v-sales-letter](https://dfycontent.io/v-sales-letter) · [/v-bento](https://dfycontent.io/v-bento) · [/v-video](https://dfycontent.io/v-video) · [/v-faq](https://dfycontent.io/v-faq) · [/v-stats](https://dfycontent.io/v-stats) · [/v-testimonials](https://dfycontent.io/v-testimonials) · [/v-before-after](https://dfycontent.io/v-before-after) · [/v-dark](https://dfycontent.io/v-dark)

**Team review of all variants:** [/variants](https://dfycontent.io/variants)

**Marketing pages:** [/about](https://dfycontent.io/about) · [/how-it-works](https://dfycontent.io/how-it-works) · [/pricing](https://dfycontent.io/pricing) · [/faq](https://dfycontent.io/faq) · [/contact](https://dfycontent.io/contact)

**Content:** [/blog](https://dfycontent.io/blog) · [/glossary](https://dfycontent.io/glossary) · [/customers](https://dfycontent.io/customers) · [/vs](https://dfycontent.io/vs) · [/for](https://dfycontent.io/for)

**Lead-gen:** [/resources](https://dfycontent.io/resources) · [/tools/content-roi-calculator](https://dfycontent.io/tools/content-roi-calculator)

**Machine-readable:** [/sitemap.xml](https://dfycontent.io/sitemap.xml) · [/robots.txt](https://dfycontent.io/robots.txt) · [/llms.txt](https://dfycontent.io/llms.txt)

---

## Environment variables (set in Vercel)

| Name | Description | Status |
|---|---|---|
| `CUSTOMERIO_SITE_ID` | Customer.io Track API site ID (server-only) | ✓ set |
| `CUSTOMERIO_TRACK_API_KEY` | Customer.io Track API key (server-only) | ✓ set |
| `CUSTOMERIO_REGION` | `us` or `eu` | ✓ set |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly event-type URL for booking embed | ✗ NOT YET SET — see `ROADMAP.md` |

Local development uses `.env.local` (gitignored) — copy from `.env.example`.

---

## License

Proprietary. Not for external use or redistribution.
