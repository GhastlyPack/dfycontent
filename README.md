# DFY Content — Lander

Marketing site + qualification funnel for **DFY Content**, a done-for-you social-media service that clones you with AI and produces content with your avatar.

## Flow

```
/  (lander + multi-step questionnaire)
   |- step 1: contact info  -> POST /api/lead { kind: 'contact' }  -> Customer.io identify + contact_submitted event
   |- steps 2-5: qualifier questions
   |- submit                -> POST /api/lead { kind: 'qualify' }  -> Customer.io qualification_completed event
                                                                    -> server returns { qualified: bool }
/dnq      (sorry, not a fit — for budget < $2k or won't commit setup)
/book     (qualified — inline Calendly embed; on event_scheduled -> /booked)
/booked   (confirmation — POST /api/booked -> Customer.io call_booked event)
```

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Customer.io + Calendly values
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

See `.env.example`. **Customer.io keys are server-only** (no `NEXT_PUBLIC_` prefix) — they live in the Track API server-side path. The Calendly URL is public.

## Deployment

See [SETUP.md](./SETUP.md) for the one-time domain / Vercel / Customer.io / Calendly checklist.
