'use client';

import type { ReactNode } from 'react';
import { theme } from '@/lib/theme';
import { Container, Eyebrow, Section } from '@/components/atoms';
import { Reveal } from '@/components/motion-atoms';
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';

/**
 * Standard page header for marketing pages.
 * Centered eyebrow + h1 + sub + optional breadcrumbs.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  align = 'center',
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: Crumb[];
  align?: 'center' | 'left';
}) {
  return (
    <Section tight style={{ paddingTop: 'clamp(48px, 7vw, 96px)' }}>
      <Container>
        <div
          style={{
            maxWidth: 800,
            margin: align === 'center' ? '0 auto' : 0,
            textAlign: align,
            display: 'flex',
            flexDirection: 'column',
            alignItems: align === 'center' ? 'center' : 'flex-start',
            gap: 18,
          }}
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Reveal>
              <Breadcrumbs items={breadcrumbs} />
            </Reveal>
          )}
          {eyebrow && (
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <h1
              className="h-section"
              style={{
                margin: 0,
                fontSize: 'clamp(36px, 6vw, 60px)',
                letterSpacing: '-0.025em',
              }}
            >
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.2}>
              <p
                className="t-lead"
                style={{
                  margin: 0,
                  maxWidth: 640,
                  fontFamily: theme.fonts.body,
                }}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}
