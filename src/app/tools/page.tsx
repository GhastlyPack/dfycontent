import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Free tools — DFY Content',
  description: 'Free interactive tools for content operators. ROI calculator, posting cadence simulator, more.',
};

const TOOLS = [
  {
    slug: 'content-roi-calculator',
    title: 'Content ROI Calculator',
    desc: 'See what your time on content is actually costing you — and what done-for-you would save.',
    cta: 'Run the calculator  →',
  },
  // Future tools:
  // { slug: 'cadence-simulator', title: 'Posting Cadence Simulator', desc: '...' },
  // { slug: 'script-readability-checker', title: 'Script Readability Checker', desc: '...' },
];

export default function ToolsIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Free tools"
          title="Tools for content operators."
          subtitle="Free, no signup. Built for people thinking about their own content economics."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Tools' },
          ]}
        />

        <Section>
          <Container>
            <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, maxWidth: 1080, margin: '0 auto' }} staggerDelay={0.08}>
              {TOOLS.map((t) => (
                <StaggerChild key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    style={{
                      display: 'block',
                      background: theme.palette.surface,
                      border: `1px solid ${theme.palette.borderSoft}`,
                      borderRadius: theme.radius.xl,
                      padding: 28,
                      color: theme.palette.fg,
                      boxShadow: theme.shadow.card,
                    }}
                  >
                    <h3 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em' }}>
                      {t.title}
                    </h3>
                    <p style={{ margin: '8px 0 12px', fontSize: 14, lineHeight: 1.6, color: theme.palette.fgMuted }}>{t.desc}</p>
                    <span style={{ fontSize: 13, fontWeight: 600, color: theme.palette.accent }}>{t.cta}</span>
                  </Link>
                </StaggerChild>
              ))}
            </StaggerGroup>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
