'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';

export type ComparisonRow = {
  attribute: string;
  us: ReactNode;
  them: ReactNode;
  winner?: 'us' | 'them' | 'tie';
};

export type ComparisonConfig = {
  competitor: string;
  competitorUrl?: string;
  hero: {
    eyebrow: string;
    h1: ReactNode;
    sub: string;
  };
  rows: ComparisonRow[];
  verdict: {
    title: string;
    body: ReactNode;
    whenThem: string;
    whenUs: string;
  };
  faq?: { q: string; a: string }[];
};

export function ComparisonPage({ config, slug }: { config: ComparisonConfig; slug: string }) {
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
            { label: 'Compare', href: '/vs' },
            { label: config.competitor },
          ]}
        />

        {/* Comparison table */}
        <Section>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 1040, margin: '0 auto', background: theme.palette.surface, border: `1px solid ${theme.palette.borderSoft}`, borderRadius: theme.radius.xxl, overflow: 'hidden', boxShadow: theme.shadow.card }}>
                {/* Header row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    background: theme.palette.bgSubtle,
                    borderBottom: `2px solid ${theme.palette.borderSoft}`,
                  }}
                >
                  <div style={{ padding: '20px 24px', fontFamily: theme.fonts.body, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.fgMuted }}>
                    Attribute
                  </div>
                  <div style={{ padding: '20px 24px', fontFamily: theme.fonts.display, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: theme.palette.accent, borderLeft: `1px solid ${theme.palette.borderSoft}` }}>
                    DFY Content
                  </div>
                  <div style={{ padding: '20px 24px', fontFamily: theme.fonts.display, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: theme.palette.fg, borderLeft: `1px solid ${theme.palette.borderSoft}` }}>
                    {config.competitor}
                  </div>
                </div>
                {/* Rows */}
                {config.rows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      borderBottom: i < config.rows.length - 1 ? `1px solid ${theme.palette.borderSoft}` : 'none',
                    }}
                  >
                    <div style={{ padding: '20px 24px', fontFamily: theme.fonts.body, fontSize: 14, fontWeight: 600, color: theme.palette.fg }}>
                      {row.attribute}
                    </div>
                    <div
                      style={{
                        padding: '20px 24px',
                        fontFamily: theme.fonts.body,
                        fontSize: 14,
                        color: theme.palette.fg,
                        borderLeft: `1px solid ${theme.palette.borderSoft}`,
                        background: row.winner === 'us' ? theme.palette.accentBg : 'transparent',
                        lineHeight: 1.55,
                      }}
                    >
                      {row.us}
                    </div>
                    <div
                      style={{
                        padding: '20px 24px',
                        fontFamily: theme.fonts.body,
                        fontSize: 14,
                        color: theme.palette.fg,
                        borderLeft: `1px solid ${theme.palette.borderSoft}`,
                        background: row.winner === 'them' ? '#fef3c7' : 'transparent',
                        lineHeight: 1.55,
                      }}
                    >
                      {row.them}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* Verdict */}
        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 880, margin: '0 auto' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent }}>
                  The honest verdict
                </span>
                <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, margin: '12px 0 24px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {config.verdict.title}
                </h2>
                <div style={{ fontSize: 17, lineHeight: 1.7, color: theme.palette.fg, marginBottom: 32 }}>
                  {config.verdict.body}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="dfy-verdict-grid">
                  <div style={{ padding: 24, background: '#fef3c7', borderRadius: theme.radius.lg, border: '1px solid #fde68a' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#92400e', marginBottom: 8 }}>
                      Pick {config.competitor} if
                    </div>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: theme.palette.fg }}>{config.verdict.whenThem}</p>
                  </div>
                  <div style={{ padding: 24, background: theme.palette.accentBg, borderRadius: theme.radius.lg, border: `1px solid ${theme.palette.borderAccent}` }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent, marginBottom: 8 }}>
                      Pick us if
                    </div>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: theme.palette.fg }}>{config.verdict.whenUs}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* FAQ */}
        {config.faq && config.faq.length > 0 && (
          <Section>
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
                  Talk to a human first.
                </h2>
                <p style={{ margin: '12px 0 24px', fontSize: 17, color: 'rgba(255,255,255,0.9)', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                  60-second qualifier. We&apos;ll tell you straight if {config.competitor} is the better call.
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
