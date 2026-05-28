'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';

export type IndustryConfig = {
  industry: string;
  hero: {
    eyebrow: string;
    h1: ReactNode;
    sub: string;
  };
  painPoints: { h: string; b: string }[];
  whyWeFit: {
    title: string;
    body: ReactNode;
    bullets: string[];
  };
  outcomes?: { metric: string; label: string }[];
  faq?: { q: string; a: string }[];
};

export function IndustryPage({ config }: { config: IndustryConfig }) {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow={config.hero.eyebrow}
          title={config.hero.h1}
          subtitle={config.hero.sub}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'For', href: '/for' },
            { label: config.industry },
          ]}
        />

        {/* Pain points */}
        <Section>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 720, margin: '0 auto 48px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent }}>
                  The pattern we see
                </span>
                <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, margin: '12px 0 0', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  What we hear from {config.industry.toLowerCase()}.
                </h2>
              </div>
            </Reveal>

            <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, maxWidth: 1080, margin: '0 auto' }} staggerDelay={0.08}>
              {config.painPoints.map((p, i) => (
                <StaggerChild key={i}>
                  <div style={{ background: theme.palette.surface, border: `1px solid ${theme.palette.borderSoft}`, borderRadius: theme.radius.xl, padding: 24, height: '100%', boxShadow: theme.shadow.card }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent, marginBottom: 8 }}>
                      0{i + 1}
                    </div>
                    <h3 style={{ fontFamily: theme.fonts.display, fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: '-0.015em' }}>{p.h}</h3>
                    <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.6, color: theme.palette.fgMuted }}>{p.b}</p>
                  </div>
                </StaggerChild>
              ))}
            </StaggerGroup>
          </Container>
        </Section>

        {/* Why we fit */}
        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 880, margin: '0 auto' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent }}>
                  Why we fit
                </span>
                <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, margin: '12px 0 24px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {config.whyWeFit.title}
                </h2>
                <div style={{ fontSize: 17, lineHeight: 1.7, color: theme.palette.fg, marginBottom: 24 }}>
                  {config.whyWeFit.body}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {config.whyWeFit.bullets.map((b, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 16, color: theme.palette.fg, lineHeight: 1.6 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
                        <circle cx="10" cy="10" r="10" fill={theme.palette.accent} />
                        <path d="M6 10l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* Outcomes */}
        {config.outcomes && config.outcomes.length > 0 && (
          <Section>
            <Container>
              <Reveal>
                <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
                  <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                    Typical first 90 days.
                  </h2>
                </div>
              </Reveal>
              <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 1080, margin: '0 auto' }} staggerDelay={0.08}>
                {config.outcomes.map((o, i) => (
                  <StaggerChild key={i}>
                    <div style={{ padding: '32px 24px', background: theme.palette.surface, border: `1px solid ${theme.palette.borderSoft}`, borderRadius: theme.radius.xl, textAlign: 'center', boxShadow: theme.shadow.card }}>
                      <div style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(40px, 6vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.95, color: theme.palette.accent }}>
                        {o.metric}
                      </div>
                      <div style={{ marginTop: 8, fontSize: 13, color: theme.palette.fgMuted, lineHeight: 1.5 }}>
                        {o.label}
                      </div>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerGroup>
            </Container>
          </Section>
        )}

        {/* FAQ */}
        {config.faq && config.faq.length > 0 && (
          <Section style={{ background: theme.palette.bgSubtle }}>
            <Container>
              <Reveal>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                  <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                    Common questions
                  </h2>
                  <div style={{ marginTop: 24 }}>
                    {config.faq.map((f, i) => (
                      <div key={i} style={{ padding: '20px 0', borderBottom: `1px solid ${theme.palette.borderSoft}` }}>
                        <h3 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>{f.q}</h3>
                        <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.65, color: theme.palette.fgMuted }}>{f.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </Container>
          </Section>
        )}

        {/* CTA */}
        <Section>
          <Container>
            <Reveal>
              <div style={{ background: `linear-gradient(135deg, ${theme.palette.accent} 0%, ${theme.palette.accentSoft} 100%)`, borderRadius: theme.radius.xxl, padding: '56px 28px', textAlign: 'center', color: '#fff', boxShadow: '0 20px 60px rgba(108, 92, 231, 0.32)' }}>
                <h2 className="h-section" style={{ margin: 0, color: '#fff' }}>
                  See if we&apos;re a fit for you.
                </h2>
                <p style={{ margin: '12px 0 24px', fontSize: 17, color: 'rgba(255,255,255,0.9)', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                  60-second qualifier built for {config.industry.toLowerCase()}.
                </p>
                <Button href="/apply" size="lg" style={{ background: '#fff', color: theme.palette.accent }}>
                  Start qualifying  →
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
