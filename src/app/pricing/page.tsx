import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';
import { jsonLd, serviceSchema, breadcrumbSchema, SITE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Pricing — DFY Content',
  description:
    'Three packages: Starter, Pro, Premium. Starts at $2k/mo. Scripts, capture, production, editing, posting — all included. No public price list; we qualify first.',
};

type Tier = {
  name: string;
  range: string;
  blurb: string;
  bestFor: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const COPY = {
  hero: {
    eyebrow: 'Pricing',
    h1: 'Three packages. One floor. Honest pricing.',
    sub: "We don't publish exact prices because the right tier depends on your volume, platforms, and growth goals. The qualifier sorts that in 60 seconds.",
  },

  tiers: [
    {
      name: 'Starter',
      range: '$2k – $5k / mo',
      blurb: 'Built for one platform, ~20 pieces a month. The "stop being invisible" tier.',
      bestFor: 'Solo founders & consultants',
      features: [
        '1 platform of your choice',
        '~20 pieces of content / month',
        'Full scripting included',
        '1 outfit / look',
        'Weekly content calendar',
        'Standard turnaround (5 business days)',
      ],
      cta: 'Apply for Starter',
    },
    {
      name: 'Pro',
      range: '$5k – $10k / mo',
      blurb: 'Most popular. 2 platforms, ~30+ pieces a month, ad-ready cuts.',
      bestFor: 'Operators serious about audience',
      features: [
        '2-3 platforms',
        '30+ pieces of content / month',
        'Full scripting + strategy',
        '2-3 outfits / looks',
        'Weekly content calendar',
        'Priority turnaround (3 business days)',
        'Ad creative variants on request',
      ],
      cta: 'Apply for Pro',
      highlight: true,
    },
    {
      name: 'Premium',
      range: '$10k – $20k+ / mo',
      blurb: 'Full coverage. Every platform. White-glove. Dedicated strategist.',
      bestFor: 'Founders going for category dominance',
      features: [
        'All major platforms',
        '50+ pieces of content / month',
        'Full scripting + ongoing strategy',
        'Unlimited outfits / looks',
        'Dedicated strategist',
        'Same-week turnaround',
        'Ad creative variants',
        'Monthly performance review call',
      ],
      cta: 'Apply for Premium',
    },
  ] as Tier[],

  notIncluded: {
    title: "What's not in any package (yet).",
    items: [
      'Paid ad management — we make the creative, you (or an agency) run the ads.',
      'Long-form video editing (YouTube videos over 60 seconds).',
      "Audience growth guarantees — we don't promise follower counts.",
      'Client portal access — coming in v2.',
    ],
  },

  faqs: [
    {
      q: 'Why not list exact prices?',
      a: "Three reasons. (1) The right tier depends on your platforms and volume, and we'd rather quote accurately than make you guess. (2) We don't want to attract sub-floor budgets that we can't serve well. (3) The 60-second qualifier already routes you to the right number — there's no extra friction.",
    },
    {
      q: 'Is there a contract term?',
      a: "Yes — 3 months minimum. The math of the studio session, voice clone, and onboarding doesn't pay back in less than a quarter. After the initial term, we operate month-to-month.",
    },
    {
      q: "What's included that other services charge for separately?",
      a: 'Scripting is the big one. Most content agencies charge $3-5k/mo for scriptwriting alone. Production-only services then charge another $3-5k on top. We include both.',
    },
    {
      q: 'Do you offer refunds?',
      a: "If we don't deliver what we promised in the contract, yes. We've never had to issue one. The qualifier is the first refund-prevention mechanism.",
    },
  ],

  cta: {
    title: "60 seconds to find your tier.",
    sub: 'No commitment. We tell you straight if we\'re not a fit.',
  },
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing' },
];

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'Pricing', url: `${SITE.url}/pricing` },
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

        {/* Tier cards */}
        <Section>
          <Container>
            <StaggerGroup
              className="dfy-pricing-grid"
              style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, maxWidth: 1180, margin: '0 auto' }}
              staggerDelay={0.1}
            >
              {COPY.tiers.map((t) => (
                <StaggerChild key={t.name}>
                  <div
                    style={{
                      background: t.highlight
                        ? `linear-gradient(135deg, ${theme.palette.accentBg} 0%, ${theme.palette.surface} 100%)`
                        : theme.palette.surface,
                      border: t.highlight
                        ? `2px solid ${theme.palette.accent}`
                        : `1px solid ${theme.palette.borderSoft}`,
                      borderRadius: theme.radius.xxl,
                      padding: 32,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 18,
                      boxShadow: t.highlight ? theme.shadow.lg : theme.shadow.card,
                      position: 'relative',
                    }}
                  >
                    {t.highlight && (
                      <span
                        style={{
                          position: 'absolute',
                          top: -14,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          padding: '6px 14px',
                          background: theme.palette.accent,
                          color: '#fff',
                          fontFamily: theme.fonts.body,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          borderRadius: 999,
                        }}
                      >
                        Most popular
                      </span>
                    )}
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.fgMuted, marginBottom: 4 }}>
                        {t.bestFor}
                      </div>
                      <h3 style={{ fontFamily: theme.fonts.display, fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                        {t.name}
                      </h3>
                      <div style={{ fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 600, color: theme.palette.accent, marginTop: 6, letterSpacing: '-0.015em' }}>
                        {t.range}
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: theme.palette.fgMuted }}>{t.blurb}</p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {t.features.map((f) => (
                        <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: theme.palette.fg, lineHeight: 1.5 }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                            <circle cx="8" cy="8" r="8" fill={theme.palette.accentBg} />
                            <path d="M5 8l2 2 4-4" stroke={theme.palette.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button href="/apply" full variant={t.highlight ? 'primary' : 'ghost'} style={{ marginTop: 'auto' }}>
                      {t.cta}  →
                    </Button>
                  </div>
                </StaggerChild>
              ))}
            </StaggerGroup>
          </Container>
        </Section>

        {/* Not included */}
        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 720, margin: '0 auto' }}>
                <h2 className="h-section" style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 36px)' }}>
                  {COPY.notIncluded.title}
                </h2>
                <p style={{ marginTop: 12, fontSize: 16, color: theme.palette.fgMuted, lineHeight: 1.6 }}>
                  We&apos;d rather tell you up front. If you need any of these, we&apos;ll point you to who does it well.
                </p>
                <ul style={{ marginTop: 28, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {COPY.notIncluded.items.map((i, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 16, color: theme.palette.fg, lineHeight: 1.6, padding: '14px 18px', background: theme.palette.surface, borderRadius: theme.radius.lg, border: `1px solid ${theme.palette.borderSoft}` }}>
                      <span style={{ color: theme.palette.fgSubtle, fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 4, letterSpacing: '0.05em' }}>—</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* Small FAQ */}
        <Section>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 720, margin: '0 auto 40px', textAlign: 'center' }}>
                <h2 className="h-section" style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 36px)' }}>
                  Common pricing questions.
                </h2>
              </div>
            </Reveal>
            <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {COPY.faqs.map((f, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div style={{ padding: '24px 0', borderBottom: `1px solid ${theme.palette.borderSoft}` }}>
                    <h3 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>{f.q}</h3>
                    <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.65, color: theme.palette.fgMuted }}>{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <Reveal>
              <div style={{ background: `linear-gradient(135deg, ${theme.palette.accent} 0%, ${theme.palette.accentSoft} 100%)`, borderRadius: theme.radius.xxl, padding: '56px 28px', textAlign: 'center', color: '#fff', boxShadow: '0 20px 60px rgba(108, 92, 231, 0.32)' }}>
                <h2 className="h-section" style={{ margin: 0, color: '#fff' }}>{COPY.cta.title}</h2>
                <p style={{ margin: '12px 0 24px', fontSize: 17, color: 'rgba(255,255,255,0.9)', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>{COPY.cta.sub}</p>
                <Button href="/apply" size="lg" style={{ background: '#fff', color: theme.palette.accent }}>
                  Find my tier  →
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
