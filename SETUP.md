# DFY Content — One-time setup checklist

Things you (the human) need to do that I (Claude) can't. Work top to bottom — each step depends on the one above it.

---

## 1. Domain

Buy the domain at any registrar. **Recommended: Cloudflare Registrar** (no markup, free WHOIS privacy).

- [Cloudflare](https://dash.cloudflare.com/?to=/:account/domains/register) — `dfycontent.com` or similar
- [Porkbun](https://porkbun.com) — solid alternative, similar pricing
- [Namecheap](https://www.namecheap.com) — fine, but pricier and more upsells

**Don't** configure DNS yet — Vercel will do that for you in step 3.

> Tell me the exact domain you bought so I can plug it into the right places.

---

## 2. Push the repo to GitHub

I haven't pushed yet — I'll do this in a single command once you say you're ready, but the repo is `GhastlyPack/dfycontent` and you're already authed as `GhastlyPack` via `gh`, so this is essentially zero-effort. Just say the word.

---

## 3. Vercel

1. Go to <https://vercel.com/new>
2. **Import Git Repository** → pick `GhastlyPack/dfycontent`
3. Framework preset: **Next.js** (auto-detected)
4. Leave build/output settings on default
5. **Environment Variables** — add these (all four, for Production + Preview + Development):

   | Name | Value | Notes |
   |---|---|---|
   | `CUSTOMERIO_SITE_ID` | (from step 4) | Server-only |
   | `CUSTOMERIO_TRACK_API_KEY` | (from step 4) | Server-only |
   | `CUSTOMERIO_REGION` | `us` or `eu` | Default `us` |
   | `NEXT_PUBLIC_CALENDLY_URL` | (from step 5) | Public, exposed to browser |

6. Hit **Deploy**. First build ~1-2 min.
7. Once deployed: **Settings → Domains → Add** your domain. Vercel walks you through DNS — either delegate nameservers (cleanest) or add the two records it shows.

---

## 4. Customer.io

You said you already have an account.

1. Log in → **Settings → Account Settings → API Credentials → Track API Keys**
2. Create a key named `dfycontent-lander` (or use an existing one)
3. Copy the **Site ID** and the **API Key** — paste them into Vercel env vars above
4. Confirm your **region** (top-right of the dashboard tells you US vs EU)

### What gets sent

Server-side from `/api/lead` and `/api/booked`:

- `identifyLead` (PUT `/customers/{email}`) — first_name, last_name, phone, social_handle, created_at
- Event `contact_submitted` — fires after step 1 (contact form). Data: name + phone + handle
- Event `qualification_completed` — fires on final submit. Data: `content`, `issues[]`, `budget`, `setup`, `qualified` (bool)
- Event `call_booked` — fires when Calendly emits `event_scheduled`. Data: `source`

Customer.io customer_id = lowercased email. Simple, stable, easy to dedupe.

### Suggested campaigns

- **Hot leads**: trigger on `qualification_completed` where `qualified = true` AND no `call_booked` within 1 hour → reminder email with the `/book` link
- **DQ nurture**: trigger on `qualification_completed` where `qualified = false` AND `budget = 0-2k` → long-form value email; circle back in 90 days
- **No-show recovery**: post-call workflow off `call_booked`

---

## 5. Calendly

You don't have an account yet — start here.

1. Sign up at <https://calendly.com> (Standard tier is fine; **Teams** if you need round-robin)
2. Create an **Event Type**:
   - **Name**: "DFY Content — intro call" (or similar)
   - **Duration**: 30 min
   - **Location**: Google Meet (set up the integration when prompted)
   - **Availability**: pick the windows you'll actually take calls
   - **Confirmation page**: leave default — our embed handles the post-booking redirect
3. Grab the public URL — looks like `https://calendly.com/your-handle/intro-call`
4. Paste it into Vercel env var `NEXT_PUBLIC_CALENDLY_URL`
5. Redeploy (Vercel does this automatically on env var change, or hit "Redeploy" in the dashboard)

### How it talks to our site

Calendly's inline widget posts a `message` to the parent window when a booking completes. `CalendlyEmbed.tsx` listens for `event === 'calendly.event_scheduled'`, fires `/api/booked` → Customer.io, then redirects to `/booked`. No webhook or API key needed.

The embed is themed dark to match our palette via Calendly's query params (`background_color`, `text_color`, `primary_color`).

---

## 6. Smoke test

Once everything's wired and deployed:

1. Open `https://yourdomain.com` in an incognito window
2. Fill the contact form with **your real email** → Continue
3. Check Customer.io → **People** — you should see yourself, with `contact_submitted` in the activity log within ~5s
4. Walk through Q1-Q4 picking a **qualified** path (`$2k-$5k`, `Yes`) → Submit
5. Confirm you land on `/book` and Calendly loads
6. Book a slot → confirm redirect to `/booked` and `call_booked` event in Customer.io
7. Repeat with a **DQ** path (`$0-$2k`, anything) → confirm `/dnq?reason=budget`
8. Repeat with `setup = No` → confirm `/dnq?reason=setup`

If anything's off, tell me which step and we'll debug.
