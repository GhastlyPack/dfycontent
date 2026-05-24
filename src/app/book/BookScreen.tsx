'use client';

import { useEffect, useState } from 'react';
import { theme } from '@/lib/theme';
import { Container, Eyebrow, ScrollReveal, Section } from '@/components/atoms';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

export function BookScreen() {
  const [firstName, setFirstName] = useState<string>('friend');

  useEffect(() => {
    const n = sessionStorage.getItem('lead.firstName');
    if (n) setFirstName(n);
  }, []);

  return (
    <Section>
      <Container>
        <ScrollReveal style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center', alignItems: 'center' }}>
            <Eyebrow>You qualified · welcome aboard</Eyebrow>
            <h1 className="h-section" style={{ margin: 0 }}>
              You&apos;re in,{' '}
              <span style={{ color: theme.palette.accent }}>{firstName}.</span>
            </h1>
            <p className="t-lead" style={{ margin: 0, maxWidth: 560 }}>
              Pick a 30-minute slot with our founder. We&apos;ll walk through your
              goals, what we&apos;d post for you, and what we&apos;d charge.
            </p>
          </div>

          <CalendlyEmbed />

          <div
            style={{
              padding: 18,
              borderRadius: theme.radius.lg,
              border: `1px dashed ${theme.palette.borderAccent}`,
              fontFamily: theme.fonts.body,
              fontSize: 13,
              color: theme.palette.fgMuted,
              lineHeight: 1.55,
              maxWidth: 720,
              margin: '0 auto',
              background: theme.palette.surface,
            }}
          >
            <strong style={{ color: theme.palette.fg }}>↪ Heads up — </strong>
            no-shows lose their slot for the quarter. If you can&apos;t make it,
            reschedule from your confirmation email.
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
