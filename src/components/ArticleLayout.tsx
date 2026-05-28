'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { theme } from '@/lib/theme';
import { Container, Section, Button } from '@/components/atoms';
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';
import { Reveal } from '@/components/motion-atoms';

/**
 * Shared layout shell for long-form content: blog posts, glossary terms,
 * customer case studies. Renders title, meta, breadcrumbs, MDX children, CTA.
 */
export function ArticleLayout({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  meta,
  children,
  ctaTitle = 'See if we’re a fit.',
  ctaSub = '60-second qualifier. No spam.',
  ctaLabel = 'Start qualifying  →',
  ctaHref = '/apply',
  sidebar,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: Crumb[];
  meta?: ReactNode;
  children: ReactNode;
  ctaTitle?: string;
  ctaSub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  sidebar?: ReactNode;
}) {
  return (
    <Section style={{ paddingTop: 'clamp(48px, 7vw, 88px)' }}>
      <Container>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Reveal>
              <div style={{ marginBottom: 24 }}>
                <Breadcrumbs items={breadcrumbs} />
              </div>
            </Reveal>
          )}
          {eyebrow && (
            <Reveal>
              <span
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: theme.palette.accent,
                }}
              >
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1
              style={{
                fontFamily: theme.fonts.display,
                fontSize: 'clamp(34px, 5vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                margin: '14px 0 16px',
                color: theme.palette.fg,
              }}
            >
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.1}>
              <p
                style={{
                  margin: 0,
                  fontSize: 19,
                  lineHeight: 1.6,
                  color: theme.palette.fgMuted,
                  fontFamily: theme.fonts.body,
                }}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
          {meta && (
            <Reveal delay={0.15}>
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: `1px solid ${theme.palette.borderSoft}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                  fontFamily: theme.fonts.body,
                  fontSize: 13,
                  color: theme.palette.fgMuted,
                }}
              >
                {meta}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.2}>
          <article
            style={{
              maxWidth: 720,
              margin: '40px auto 0',
              padding: '0 4px',
            }}
            className="dfy-article"
          >
            {children}
          </article>
        </Reveal>

        {sidebar && (
          <div style={{ maxWidth: 720, margin: '32px auto 0' }}>{sidebar}</div>
        )}

        {/* Inline CTA */}
        <Reveal delay={0.1}>
          <div
            style={{
              maxWidth: 720,
              margin: '64px auto 0',
              padding: 32,
              borderRadius: theme.radius.xl,
              background: `linear-gradient(135deg, ${theme.palette.accent} 0%, ${theme.palette.accentSoft} 100%)`,
              color: '#fff',
              textAlign: 'center',
              boxShadow: '0 16px 48px rgba(108, 92, 231, 0.32)',
            }}
          >
            <h3
              style={{
                fontFamily: theme.fonts.display,
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 700,
                margin: 0,
                letterSpacing: '-0.015em',
              }}
            >
              {ctaTitle}
            </h3>
            <p
              style={{
                margin: '10px 0 20px',
                fontSize: 15,
                color: 'rgba(255,255,255,0.92)',
                maxWidth: 420,
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.55,
              }}
            >
              {ctaSub}
            </p>
            <Link
              href={ctaHref}
              style={{
                display: 'inline-block',
                padding: '14px 24px',
                background: '#fff',
                color: theme.palette.accent,
                fontFamily: theme.fonts.body,
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 999,
              }}
            >
              {ctaLabel}
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
