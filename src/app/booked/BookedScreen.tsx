'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { theme } from '@/lib/theme';
import {
  Button,
  Container,
  Eyebrow,
  ScrollReveal,
  Section,
} from '@/components/atoms';

export function BookedScreen() {
  const [email, setEmail] = useState<string>('your email');

  useEffect(() => {
    const e = sessionStorage.getItem('lead.email');
    if (e) setEmail(e);
  }, []);

  return (
    <Section>
      <Container>
        <ScrollReveal style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Eyebrow>Booking confirmed</Eyebrow>
          <h1 className="h-section" style={{ margin: 0 }}>
            You&apos;re on the{' '}
            <span style={{ color: theme.palette.accent }}>calendar.</span>
          </h1>

          <div
            style={{
              background: theme.palette.surface,
              border: `1px solid ${theme.palette.borderSoft}`,
              borderRadius: theme.radius.xl,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              boxShadow: theme.shadow.card,
              marginTop: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.palette.fgSubtle,
                  marginBottom: 8,
                }}
              >
                Confirmation sent
              </div>
              <div className="h-card" style={{ margin: 0 }}>
                Check {email}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                  marginTop: 6,
                  color: theme.palette.fgMuted,
                }}
              >
                Calendar invite + Google Meet link are on their way.
              </div>
            </div>

            <div style={{ height: 1, background: theme.palette.borderSoft }} />

            <div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.palette.fgSubtle,
                  marginBottom: 14,
                }}
              >
                Before the call
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {[
                  'Find 2-3 creators in your space whose content you actually like.',
                  "Think about the topics you'd never run out of opinions on.",
                  "Bring your audience: who you'd want watching, not who watches now.",
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: theme.fonts.body,
                        fontSize: 11,
                        fontWeight: 700,
                        color: theme.palette.accent,
                        paddingTop: 4,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{ fontSize: 15, lineHeight: 1.55, color: theme.palette.fg, fontFamily: theme.fonts.body }}
                    >
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/" style={{ display: 'inline-flex' }}>
              <Button variant="ghost">← Back to home</Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
