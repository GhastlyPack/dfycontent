'use client';

import { useEffect, useState } from 'react';
import { theme } from '@/lib/theme';
import { Eyebrow, TopBar } from '@/components/atoms';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

export function BookScreen() {
  const [firstName, setFirstName] = useState<string>('friend');

  useEffect(() => {
    const n = sessionStorage.getItem('lead.firstName');
    if (n) setFirstName(n);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <div
        style={{
          flex: 1,
          padding: '72px 48px',
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Eyebrow>You qualified · 1 of 12 in May</Eyebrow>
          <h1
            style={{
              margin: 0,
              fontFamily: theme.fonts.display,
              fontSize: 'clamp(56px, 8vw, 112px)',
              fontWeight: theme.fonts.weight,
              letterSpacing: theme.fonts.tracking,
              lineHeight: 0.92,
              color: theme.palette.fg,
            }}
          >
            You&apos;re in,{' '}
            <span
              style={{
                color: theme.palette.accent,
                fontStyle: theme.fonts.italic ? 'italic' : 'normal',
              }}
            >
              {firstName}.
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: theme.palette.muted,
              maxWidth: 620,
              lineHeight: 1.55,
            }}
          >
            Pick a 30-minute slot with our founder. We&apos;ll walk through your goals, what
            we&apos;d post for you, and what we&apos;d charge.
          </p>
        </div>

        <CalendlyEmbed />

        <div
          style={{
            padding: 16,
            borderRadius: theme.direction === 'studio' ? 12 : 4,
            border: `1px dashed ${theme.palette.border}`,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            color: theme.palette.muted,
            lineHeight: 1.6,
            maxWidth: 720,
          }}
        >
          <div style={{ color: theme.palette.fg, marginBottom: 4 }}>↪ Heads up</div>
          No-shows lose their slot for the quarter. If you can&apos;t make it, reschedule.
        </div>
      </div>
    </div>
  );
}
