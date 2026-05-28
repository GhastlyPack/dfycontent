import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button, StepCircle } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';
import { jsonLd, howToSchema, breadcrumbSchema, SITE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'How it works — DFY Content',
  description:
    'From kickoff to your first post live in 14 days. Here\'s the exact process: capture, scripting, AI clone production, editing, publishing.',
};

const COPY = {
  hero: {
    eyebrow: 'How it works',
    h1: 'Two hours from you. A year of content from us.',
    sub: "Here's the exact process — from the day you sign on to the day your first post goes live. 14 days, in detail.",
  },

  steps: [
    {
      // copy_id: how.step1
      i: 1,
      h: 'Day 0 — Application & kickoff call (30 min)',
      b: "We confirm fit on a quick call, sign the contract, set your kickoff date. You don't lift a finger past this. We send a brief asking about your audience, your offer, your wins, your stories.",
    },
    {
      // copy_id: how.step2
      i: 2,
      h: 'Day 2 — Studio session (1-2 hours, in-person or remote)',
      b: "The only time you'll spend on this. We capture your face from multiple angles in your usual setting. We capture your voice reading 20-30 prepared sentences. We capture the way you sigh, the way you pause, the words you repeat. That's the corpus.",
    },
    {
      // copy_id: how.step3
      i: 3,
      h: 'Day 3-5 — Avatar + voice clone built',
      b: "Behind the scenes: we generate a character reference sheet (~20 expressions, outfits, key details), train your voice clone on a dedicated ElevenLabs account, and lock the closet of outfit options you'll appear in.",
    },
    {
      // copy_id: how.step4
      i: 4,
      h: 'Day 5-8 — Scripts written, you review',
      b: "Our writers draft your first batch of scripts — around your audience, your goals, what's converting in your niche this week. You see them before they're produced. Approve, send notes, or kill any of them.",
    },
    {
      // copy_id: how.step5
      i: 5,
      h: 'Day 8-12 — Production',
      b: "Each approved script becomes a video. Your AI clone delivers the lines. Our editors polish hooks, cuts, captions, B-roll, thumbnails. You see the final cuts before anything goes live.",
    },
    {
      // copy_id: how.step6
      i: 6,
      h: 'Day 13 — Final approval',
      b: "You watch the queue, give thumbs-up or send revision notes. We turn revisions around in 24 hours.",
    },
    {
      // copy_id: how.step7
      i: 7,
      h: 'Day 14 — First post goes live',
      b: "We publish to every platform you're on. Engagement, DMs, comments come back to your real account — in your real voice. Then we run the cycle every week, forever.",
    },
  ],

  cta: {
    title: 'See if we\'re a fit.',
    sub: '60-second qualifier. We tell you straight if we\'re not the right call.',
  },
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'How it works' },
];

export default function HowItWorksPage() {
  const schema = howToSchema({
    name: 'How DFY Content produces your social media content',
    description: 'From kickoff to first post live in 14 days.',
    totalTime: 'P14D',
    steps: COPY.steps.map((s) => ({ name: s.h, text: s.b })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'How it works', url: `${SITE.url}/how-it-works` },
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

        {/* Steps */}
        <Section>
          <Container>
            <StaggerGroup
              style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 880, margin: '0 auto' }}
              staggerDelay={0.08}
              amount={0.1}
            >
              {COPY.steps.map((s) => (
                <StaggerChild key={s.i}>
                  <div
                    style={{
                      background: theme.palette.surface,
                      border: `1px solid ${theme.palette.borderSoft}`,
                      borderRadius: theme.radius.xl,
                      padding: 28,
                      display: 'flex',
                      gap: 22,
                      alignItems: 'flex-start',
                      boxShadow: theme.shadow.sm,
                    }}
                  >
                    <StepCircle n={s.i} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                      <h3 className="h-card" style={{ margin: 0 }}>{s.h}</h3>
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: theme.palette.fgMuted }}>{s.b}</p>
                    </div>
                  </div>
                </StaggerChild>
              ))}
            </StaggerGroup>
          </Container>
        </Section>

        {/* What happens after Day 14 */}
        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                <span style={{ display: 'inline-block', padding: '6px 14px', background: theme.palette.accentBg, color: theme.palette.accent, borderRadius: 999, fontFamily: theme.fonts.body, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  After day 14
                </span>
                <h2 className="h-section" style={{ margin: '20px 0 16px' }}>
                  The cycle runs itself.
                </h2>
                <p className="t-lead" style={{ margin: 0 }}>
                  Every week: new scripts drafted, you approve, we produce, we publish. Your only ongoing time commitment is 30 minutes of weekly review. That&apos;s it.
                </p>
              </div>
            </Reveal>
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
