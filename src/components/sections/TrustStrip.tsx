'use client';

import { theme } from '@/lib/theme';
import { Container, ScrollReveal, Section } from '@/components/atoms';

export function TrustStrip() {
  const logos = ['LIPSUM', 'LOREM', 'IPSUM', 'CIRCA', 'NEXTUS', 'AVERY'];

  return (
    <Section tight>
      <Container>
        <ScrollReveal
          style={{
            display: 'grid',
            gap: 32,
            alignItems: 'center',
          }}
          className="dfy-trust-grid"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 14,
                color: theme.palette.fgMuted,
                maxWidth: 220,
                lineHeight: 1.5,
              }}
            >
              Trusted by founders, consultants, and operators building public-facing
              brands.
            </span>
          </div>

          <div
            className="dfy-trust-logos"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              alignItems: 'center',
            }}
          >
            {logos.map((l) => (
              <div
                key={l}
                style={{
                  flex: '1 1 140px',
                  minWidth: 0,
                  padding: '14px 24px',
                  borderRadius: theme.radius.pill,
                  border: `1px solid ${theme.palette.borderAccent}`,
                  textAlign: 'center',
                  fontFamily: theme.fonts.display,
                  fontWeight: 700,
                  fontSize: 16,
                  color: theme.palette.fgSubtle,
                  letterSpacing: '0.08em',
                  background: theme.palette.surface,
                  opacity: 0.7,
                }}
              >
                {l}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
