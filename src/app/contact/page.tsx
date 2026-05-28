import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button } from '@/components/atoms';
import { Reveal } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';
import { jsonLd, breadcrumbSchema, SITE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact — DFY Content',
  description: 'Talking with us about a service inquiry, partnership, or press. Direct email + qualifier link.',
};

const COPY = {
  hero: {
    eyebrow: 'Contact',
    h1: 'Three ways to reach us.',
    sub: 'For most service inquiries the qualifier is faster. Press, partnership, or general questions use email.',
  },
  channels: [
    {
      kind: 'Service inquiry',
      label: '60-second qualifier',
      desc: 'The fastest path. We tell you straight if we\'re a fit, route to a call if we are.',
      cta: 'Start qualifying  →',
      href: '/apply',
      primary: true,
    },
    {
      kind: 'General questions',
      label: 'hello@dfycontent.io',
      desc: 'Press, partnerships, vendor inquiries, anything that isn\'t a service application.',
      cta: 'Email us',
      href: 'mailto:hello@dfycontent.io',
    },
    {
      kind: 'Existing clients',
      label: 'Your account manager',
      desc: 'You should already have a direct line. If not, reply to your most recent thread.',
      cta: null,
      href: null,
    },
  ],
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Contact' },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'Contact', url: `${SITE.url}/contact` },
            ])
          ),
        }}
      />

      <Nav />
      <main>
        <PageHeader
          eyebrow={COPY.hero.eyebrow}
          title={COPY.hero.h1}
          subtitle={COPY.hero.sub}
          breadcrumbs={BREADCRUMBS}
        />

        <Section>
          <Container>
            <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {COPY.channels.map((c, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    style={{
                      background: c.primary
                        ? `linear-gradient(135deg, ${theme.palette.accentBg} 0%, ${theme.palette.surface} 100%)`
                        : theme.palette.surface,
                      border: c.primary
                        ? `2px solid ${theme.palette.accent}`
                        : `1px solid ${theme.palette.borderSoft}`,
                      borderRadius: theme.radius.xl,
                      padding: 28,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      boxShadow: theme.shadow.card,
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.primary ? theme.palette.accent : theme.palette.fgMuted }}>
                      {c.kind}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 240 }}>
                        <h3 style={{ fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.015em' }}>
                          {c.label}
                        </h3>
                        <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.55, color: theme.palette.fgMuted }}>
                          {c.desc}
                        </p>
                      </div>
                      {c.cta && c.href && (
                        <div style={{ flexShrink: 0, alignSelf: 'center' }}>
                          <Button href={c.href} variant={c.primary ? 'primary' : 'ghost'}>
                            {c.cta}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.3}>
                <div
                  style={{
                    marginTop: 24,
                    padding: 24,
                    border: `1px dashed ${theme.palette.borderAccent}`,
                    borderRadius: theme.radius.lg,
                    fontFamily: theme.fonts.body,
                    fontSize: 13,
                    color: theme.palette.fgMuted,
                    lineHeight: 1.6,
                  }}
                >
                  <strong style={{ color: theme.palette.fg }}>Response time:</strong> service-inquiry replies typically within 1 business day. Press &amp; partnership within 2-3 business days. Existing-client support is whatever your contract says.
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
