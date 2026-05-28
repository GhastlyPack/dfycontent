import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';
import { jsonLd, organizationSchema, breadcrumbSchema, SITE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About DFY Content — The story, the team, the manifesto',
  description:
    'DFY Content was built for founders, operators, and creators who refuse to spend their week filming. Here\'s why we exist and how we work.',
};

/**
 * ───────────── COPY (replace placeholders) ─────────────
 * Each text block tagged with a copy_id the bot can find + replace.
 */
const COPY = {
  hero: {
    eyebrow: 'About',
    h1: 'We make founders famous without making them film.',
    sub: "DFY Content was started for the people whose face should be on social, whose calendar says it never will be. We're the team that closes that gap.",
  },

  manifesto: {
    // copy_id: about.manifesto.body — 250-400w plain language manifesto
    title: 'Why we exist.',
    body: [
      "The most valuable thing a founder can do for their brand is show up on social — consistently, in their voice, on every platform their audience scrolls. Almost none of them do it. Not because they don't want to. Because their week doesn't have a four-hour filming block in it, and never will.",
      "DFY Content was built for those people. We clone their face and voice with AI, write every script, produce every cut, and publish to every platform — so they spend two hours with us, once, and never film again. The week stays theirs. The audience compounds anyway.",
      "We are not a tool. We are not a SaaS. We are a service that uses tools — including AI — to do the work that a four-person content team would otherwise do. Strategy, scripting, capture, production, posting. End-to-end. In your voice. Forever.",
    ],
  },

  beliefs: {
    title: 'What we believe.',
    items: [
      {
        // copy_id: about.beliefs.0
        h: "Your face is yours, forever.",
        b: "You own the clone. You own the scripts. You own the content. If you cancel, you keep all of it. We don't lock your likeness up.",
      },
      {
        // copy_id: about.beliefs.1
        h: "Scripting is the headline service.",
        b: "Anyone can run a model. The reason this works is human writers, in the room, crafting every hook around your audience and offer. AI delivers. Humans direct.",
      },
      {
        // copy_id: about.beliefs.2
        h: "We say no to the wrong fit.",
        b: "If your budget is below our floor, or you can't carve out two hours, we'll tell you on the qualifier. We'd rather lose the deal than overpromise.",
      },
      {
        // copy_id: about.beliefs.3
        h: "Cost transparency, day one.",
        b: "Per-video production cost is logged and visible. We see margins. We don't run loss-leaders, and we don't quietly inflate prices.",
      },
    ],
  },

  founder: {
    // copy_id: about.founder — replace with real name + headshot
    name: 'Founder Name',
    role: 'Founder & CEO',
    bio:
      "Spent 10 years watching brilliant founders fail to show up online. Started DFY Content to fix that for the next ten.",
    quote:
      "Two hours of your time, then never film again. That math should change how every operator thinks about social.",
  },

  team: {
    title: 'The team behind it.',
    sub: 'Writers, editors, AI engineers, and operators. Small on purpose.',
    // copy_id: about.team — replace with real team members
    members: [
      { name: 'TBD', role: 'Head of Scripting', initials: 'TB' },
      { name: 'TBD', role: 'Lead Editor', initials: 'TB' },
      { name: 'TBD', role: 'AI Engineering', initials: 'TB' },
      { name: 'TBD', role: 'Client Success', initials: 'TB' },
    ],
  },

  cta: {
    title: 'See if we\'re a fit.',
    sub: '60-second qualifier. No spam.',
  },
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'About' },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema(
              BREADCRUMBS.map((b) => ({
                name: b.label,
                url: b.href ? `${SITE.url}${b.href}` : `${SITE.url}/about`,
              }))
            )
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

        {/* Manifesto */}
        <Section>
          <Container>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <Reveal>
                <h2 className="h-section" style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 40px)' }}>
                  {COPY.manifesto.title}
                </h2>
              </Reveal>
              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {COPY.manifesto.body.map((p, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.05}>
                    <p style={{ fontSize: 18, lineHeight: 1.7, color: theme.palette.fg, margin: 0 }}>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Beliefs */}
        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
                <h2 className="h-section" style={{ margin: 0 }}>{COPY.beliefs.title}</h2>
              </div>
            </Reveal>
            <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }} staggerDelay={0.08}>
              {COPY.beliefs.items.map((b, i) => (
                <StaggerChild key={i}>
                  <div style={{ background: theme.palette.surface, border: `1px solid ${theme.palette.borderSoft}`, borderRadius: theme.radius.xl, padding: 28, height: '100%', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: theme.shadow.card }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent }}>
                      0{i + 1}
                    </span>
                    <h3 className="h-card" style={{ margin: 0 }}>{b.h}</h3>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: theme.palette.fgMuted }}>{b.b}</p>
                  </div>
                </StaggerChild>
              ))}
            </StaggerGroup>
          </Container>
        </Section>

        {/* Founder card */}
        <Section>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 920, margin: '0 auto', display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, alignItems: 'start' }} className="dfy-founder-grid">
                {/* Placeholder portrait */}
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: 18, background: `linear-gradient(135deg, ${theme.palette.accent}, ${theme.palette.accentSoft})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: theme.fonts.display, fontSize: 56, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {COPY.founder.name.slice(0, 1)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent }}>
                    From the founder
                  </span>
                  <blockquote style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.015em' }}>
                    &ldquo;{COPY.founder.quote}&rdquo;
                  </blockquote>
                  <p style={{ margin: 0, fontSize: 15, color: theme.palette.fgMuted, lineHeight: 1.6 }}>
                    {COPY.founder.bio}
                  </p>
                  <div>
                    <div style={{ fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 16 }}>{COPY.founder.name}</div>
                    <div style={{ fontSize: 13, color: theme.palette.fgMuted, marginTop: 2 }}>{COPY.founder.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* Team */}
        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
                <h2 className="h-section" style={{ margin: 0 }}>{COPY.team.title}</h2>
                <p className="t-lead" style={{ margin: '12px 0 0' }}>{COPY.team.sub}</p>
              </div>
            </Reveal>
            <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }} staggerDelay={0.08}>
              {COPY.team.members.map((m, i) => (
                <StaggerChild key={i}>
                  <div style={{ background: theme.palette.surface, border: `1px solid ${theme.palette.borderSoft}`, borderRadius: theme.radius.xl, padding: 24, textAlign: 'center', boxShadow: theme.shadow.card }}>
                    <div style={{ width: 72, height: 72, borderRadius: 999, background: `linear-gradient(135deg, ${theme.palette.accent}, ${theme.palette.accentSoft})`, color: '#fff', fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                      {m.initials}
                    </div>
                    <div style={{ fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 16 }}>{m.name}</div>
                    <div style={{ fontSize: 13, color: theme.palette.fgMuted, marginTop: 2 }}>{m.role}</div>
                  </div>
                </StaggerChild>
              ))}
            </StaggerGroup>
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
