'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { theme } from '@/lib/theme';

export function CalendlyEmbed() {
  const router = useRouter();
  const [url, setUrl] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_CALENDLY_URL;
    if (!base) {
      setMissing(true);
      return;
    }
    let next = base;
    try {
      const u = new URL(base);
      const email = sessionStorage.getItem('lead.email') ?? '';
      const name = sessionStorage.getItem('lead.name') ?? '';
      if (email) u.searchParams.set('email', email);
      if (name) u.searchParams.set('name', name);
      // Dark theme params Calendly supports
      u.searchParams.set('hide_event_type_details', '0');
      u.searchParams.set('background_color', '161614');
      u.searchParams.set('text_color', 'f5f4ef');
      u.searchParams.set('primary_color', 'd9ff3d');
      next = u.toString();
    } catch {
      // fall back to raw base
    }
    setUrl(next);
  }, []);

  useEffect(() => {
    function handler(e: MessageEvent) {
      if (typeof e.data !== 'object' || e.data === null) return;
      const data = e.data as { event?: string };
      if (data.event !== 'calendly.event_scheduled') return;
      const email =
        typeof window !== 'undefined' ? sessionStorage.getItem('lead.email') : null;
      const go = () => router.push('/booked');
      if (email) {
        void fetch('/api/booked', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }).finally(go);
      } else {
        go();
      }
    }
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [router]);

  if (missing) {
    return (
      <div
        style={{
          border: `1px dashed ${theme.palette.border}`,
          borderRadius: 8,
          padding: 24,
          fontFamily: theme.fonts.mono,
          fontSize: 12,
          color: theme.palette.muted,
          lineHeight: 1.6,
          textAlign: 'center',
        }}
      >
        <div style={{ color: theme.palette.fg, marginBottom: 6 }}>
          Calendly not configured.
        </div>
        Set <code>NEXT_PUBLIC_CALENDLY_URL</code> in your environment to enable booking.
      </div>
    );
  }

  if (!url) {
    return (
      <div
        style={{
          height: 720,
          background: theme.palette.surface,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: 8,
          opacity: 0.5,
        }}
      />
    );
  }

  return (
    <>
      <div
        className="calendly-inline-widget dfy-calendly"
        data-url={url}
        style={{
          minWidth: 320,
          height: 720,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: 8,
          overflow: 'hidden',
          background: theme.palette.surface,
        }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
