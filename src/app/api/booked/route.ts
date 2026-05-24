import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/customerio';

export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = (await req.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!body.email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }
  try {
    await trackEvent(body.email, 'call_booked', { source: 'calendly_embed' });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/booked]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
