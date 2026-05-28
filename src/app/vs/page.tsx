import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Compare DFY Content — vs HeyGen, Synthesia, agencies, and DIY',
  description:
    'Honest comparisons of DFY Content against the alternatives. We tell you when to pick them.',
};

const ITEMS = [
  { slug: 'heygen', name: 'vs HeyGen', desc: 'Self-serve AI video tool. You operate it. We replace it AND the operator.' },
  { slug: 'synthesia', name: 'vs Synthesia', desc: 'Enterprise-focused AI avatar SaaS. Comparison: when you need a service vs a tool.' },
  { slug: 'captions', name: 'vs Captions', desc: 'Mobile-first AI video creation app. Different audience, different ceiling.' },
  { slug: 'hiring-an-agency', name: 'vs Hiring an agency', desc: '4-person content team for $20-40k/mo. We replace it for a fraction.' },
  { slug: 'doing-it-yourself', name: 'vs Doing it yourself', desc: 'The most expensive option, measured in your hours.' },
];

export default function VsIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Compare"
          title="Honest comparisons against the alternatives."
          subtitle="We don't pretend to be the only option. Here's the side-by-side for each one — including when you should pick them instead."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Compare' },
          ]}
        />
        <Section>
          <Container>
            <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, maxWidth: 1080, margin: '0 auto' }} staggerDelay={0.08}>
              {ITEMS.map((i) => (
                <StaggerChild key={i.slug}>
                  <Link
                    href={`/vs/${i.slug}`}
                    style={{
                      display: 'block',
                      background: theme.palette.surface,
                      border: `1px solid ${theme.palette.borderSoft}`,
                      borderRadius: theme.radius.xl,
                      padding: 24,
                      color: theme.palette.fg,
                      boxShadow: theme.shadow.card,
                    }}
                  >
                    <h3 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em' }}>
                      {i.name}
                    </h3>
                    <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.6, color: theme.palette.fgMuted }}>{i.desc}</p>
                    <span style={{ marginTop: 12, display: 'inline-block', fontSize: 13, fontWeight: 600, color: theme.palette.accent }}>
                      See the comparison →
                    </span>
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
