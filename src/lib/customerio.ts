import type { LeadContact } from './types';

// Customer.io Track API
// Docs: https://customer.io/docs/api/track/
//   PUT  /api/v1/customers/{id}            -> identify / update attributes
//   POST /api/v1/customers/{id}/events     -> track an event

function baseUrl(): string {
  const region = (process.env.CUSTOMERIO_REGION ?? 'us').toLowerCase();
  return region === 'eu'
    ? 'https://track-eu.customer.io/api/v1'
    : 'https://track.customer.io/api/v1';
}

function authHeader(): string {
  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const key = process.env.CUSTOMERIO_TRACK_API_KEY;
  if (!siteId || !key) {
    throw new Error('Missing CUSTOMERIO_SITE_ID or CUSTOMERIO_TRACK_API_KEY env var');
  }
  return 'Basic ' + Buffer.from(`${siteId}:${key}`).toString('base64');
}

async function cio(method: 'PUT' | 'POST', path: string, body: unknown): Promise<void> {
  const res = await fetch(`${baseUrl()}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Customer.io ${method} ${path} failed: ${res.status} ${text}`);
  }
}

// Use email (lowercased, trimmed) as the Customer.io customer_id.
// Simple, stable for a marketing funnel; can be swapped for a UUID later.
export function leadId(email: string): string {
  return email.trim().toLowerCase();
}

export async function identifyLead(contact: LeadContact): Promise<void> {
  const id = leadId(contact.email);
  await cio('PUT', `/customers/${encodeURIComponent(id)}`, {
    email: contact.email,
    first_name: contact.firstName,
    last_name: contact.lastName,
    phone: contact.phone,
    social_handle: contact.socialHandle ?? '',
    created_at: Math.floor(Date.now() / 1000),
  });
}

export async function trackEvent(
  email: string,
  name: string,
  data: Record<string, unknown> = {}
): Promise<void> {
  const id = leadId(email);
  await cio('POST', `/customers/${encodeURIComponent(id)}/events`, {
    name,
    data,
    timestamp: Math.floor(Date.now() / 1000),
  });
}
