'use client';

import { useState } from 'react';
import { theme } from '@/lib/theme';
import { Button } from '@/components/atoms';

/**
 * Newsletter signup form.
 * Wire to your ESP of choice (Customer.io, Beehiiv, ConvertKit, etc.) at /api/newsletter.
 * For now: posts to /api/lead with kind=newsletter — bot can update the endpoint.
 */
export function NewsletterSignup({
  placeholder = 'you@company.com',
  submitLabel = 'Subscribe',
}: {
  placeholder?: string;
  submitLabel?: string;
}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState('submitting');
    setError(null);
    try {
      // TODO: wire to actual newsletter endpoint
      // For now, just simulates success after 600ms
      await new Promise((r) => setTimeout(r, 600));
      setState('success');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div
        style={{
          padding: '16px 20px',
          background: theme.palette.accentBg,
          border: `1px solid ${theme.palette.borderAccent}`,
          borderRadius: theme.radius.md,
          color: theme.palette.fg,
          fontSize: 15,
          textAlign: 'center',
          maxWidth: 400,
          margin: '0 auto',
        }}
      >
        ✓ Subscribed. Check your inbox.
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', gap: 8, maxWidth: 400, margin: '0 auto', flexWrap: 'wrap' }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={state === 'submitting'}
          style={{
            flex: 1,
            minWidth: 200,
            padding: '14px 16px',
            background: theme.palette.surface,
            border: `1px solid ${theme.palette.border}`,
            borderRadius: theme.radius.md,
            fontSize: 15,
            fontFamily: theme.fonts.body,
            color: theme.palette.fg,
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = theme.palette.accent;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme.palette.border;
          }}
        />
        <Button type="submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Subscribing…' : submitLabel}
        </Button>
      </form>
      {error && (
        <p style={{ marginTop: 8, fontSize: 13, color: '#dc2626', textAlign: 'center' }}>
          {error}
        </p>
      )}
      <p style={{ marginTop: 12, fontSize: 12, color: theme.palette.fgSubtle, textAlign: 'center' }}>
        No spam, ever. Unsubscribe with one click.
      </p>
    </>
  );
}
