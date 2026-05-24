import { NextResponse } from 'next/server';
import type { LeadAnswers, LeadContact } from '@/lib/types';
import { identifyLead, trackEvent } from '@/lib/customerio';
import { isQualified } from '@/lib/qualify';

type ContactBody = { kind: 'contact'; contact: LeadContact; variant?: string };
type QualifyBody = { kind: 'qualify'; email: string; answers: LeadAnswers; variant?: string };
type Body = ContactBody | QualifyBody;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    if (body.kind === 'contact') {
      const c = body.contact;
      if (!c?.email || !c?.firstName || !c?.lastName) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      await identifyLead(c, body.variant);
      await trackEvent(c.email, 'contact_submitted', {
        first_name: c.firstName,
        last_name: c.lastName,
        phone: c.phone,
        social_handle: c.socialHandle ?? '',
        variant: body.variant ?? 'founder',
      });
      return NextResponse.json({ ok: true });
    }

    if (body.kind === 'qualify') {
      if (!body.email) {
        return NextResponse.json({ error: 'Missing email' }, { status: 400 });
      }
      const qualified = isQualified(body.answers);
      await trackEvent(body.email, 'qualification_completed', {
        content: body.answers.content,
        issues: body.answers.issues,
        budget: body.answers.budget,
        setup: body.answers.setup,
        qualified,
        variant: body.variant ?? 'founder',
      });
      return NextResponse.json({ ok: true, qualified });
    }

    return NextResponse.json({ error: 'Unknown kind' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/lead]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
