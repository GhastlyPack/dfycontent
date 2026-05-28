import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Who DFY Content is for — Industry pages',
  description: 'How DFY Content fits specific industries: SaaS founders, coaches, consultants, agency owners, real estate.',
};

const INDUSTRIES = [
  { slug: 'saas-founders', name: 'SaaS Founders', desc: 'Public brand-building for founders running B2B and B2C SaaS companies.' },
  { slug: 'coaches', name: 'Coaches', desc: 'Inbound coaching pipeline built on consistent thought-leadership content.' },
  { slug: 'consultants', name: 'Consultants', desc: 'Authority positioning that fills your calendar without filming yours full.' },
  { slug: 'agency-owners', name: 'Agency Owners', desc: 'Personal brand visibility that wins client pitches before the pitch.' },
  { slug: 'real-estate', name: 'Real Estate', desc: 'Local visibility for agents, brokers, and developers building neighborhood authority.' },
];

export default function ForIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Who it's for"
          title="Industry-specific fits."
          subtitle="Same product, different angle. Pick the page that sounds like you."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'For' },
          ]}
        />
        <Section>
          <Container>
            <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, maxWidth: 1080, margin: '0 auto' }} staggerDelay={0.08}>
              {INDUSTRIES.map((i) => (
                <StaggerChild key={i.slug}>
                  <Link
                    href={`/for/${i.slug}`}
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
                      For {i.name}
                    </h3>
                    <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.6, color: theme.palette.fgMuted }}>{i.desc}</p>
                    <span style={{ marginTop: 12, display: 'inline-block', fontSize: 13, fontWeight: 600, color: theme.palette.accent }}>
                      See the fit →
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
