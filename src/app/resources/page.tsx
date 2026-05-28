import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Resources — DFY Content',
  description:
    'Templates, guides, and frameworks for thinking about content operations. Free downloads.',
};

const RESOURCES = [
  {
    slug: 'two-hour-content-system',
    title: 'The 2-Hour Content System',
    desc: 'Our internal methodology, written down. The exact framework we use to onboard clients in a single session and run the next 12 months on autopilot.',
    format: 'PDF · 24 pages',
    cta: 'Get the playbook',
    gated: true,
  },
  {
    slug: 'ai-video-buyers-guide',
    title: 'AI Video Service Buyer\'s Guide (2026)',
    desc: 'Side-by-side matrix of every AI video tool and done-for-you service on the market. What they cost, who they fit, what to ask before signing.',
    format: 'PDF · 18 pages',
    cta: 'Download the guide',
    gated: true,
  },
  {
    slug: 'founder-content-calendar',
    title: 'Founder-Led Content Calendar Template',
    desc: '90 days of post ideas mapped to founder business cycles. Use as-is or adapt. Built for B2B founders building public brand.',
    format: 'Notion template',
    cta: 'Open the template',
    gated: true,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Resources"
          title="Free downloads for content operators."
          subtitle="Templates, methodology docs, and buyer guides. The same frameworks we use internally — and that we hand to qualified prospects."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Resources' },
          ]}
        />

        <Section>
          <Container>
            <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, maxWidth: 1080, margin: '0 auto' }} staggerDelay={0.08}>
              {RESOURCES.map((r) => (
                <StaggerChild key={r.slug}>
                  <div style={{ background: theme.palette.surface, border: `1px solid ${theme.palette.borderSoft}`, borderRadius: theme.radius.xl, padding: 28, height: '100%', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: theme.shadow.card }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent }}>
                      {r.format}
                    </div>
                    <h3 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                      {r.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: theme.palette.fgMuted, flex: 1 }}>
                      {r.desc}
                    </p>
                    <Button href={`/resources/${r.slug}`} variant="primary">
                      {r.cta}  →
                    </Button>
                  </div>
                </StaggerChild>
              ))}
            </StaggerGroup>
          </Container>
        </Section>

        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                  Want resources delivered when we publish?
                </h2>
                <p style={{ margin: '12px 0 24px', fontSize: 16, color: theme.palette.fgMuted, lineHeight: 1.6 }}>
                  We send 1-2 templates / guides per month to a small list. No selling, no sequences. Just the work.
                </p>
                <NewsletterSignup />
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
