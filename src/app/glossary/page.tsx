import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';
import { getAllGlossaryTerms } from '@/lib/content';
import { jsonLd, breadcrumbSchema, SITE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Glossary — DFY Content',
  description:
    'Plain-language definitions for AI content, voice cloning, done-for-you services, and related terms.',
};

export default function GlossaryIndexPage() {
  const terms = getAllGlossaryTerms();

  // Group by first letter
  const byLetter = terms.reduce<Record<string, typeof terms>>((acc, t) => {
    const letter = t.frontmatter.term[0]?.toUpperCase() ?? '#';
    (acc[letter] ??= []).push(t);
    return acc;
  }, {});
  const letters = Object.keys(byLetter).sort();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'Glossary', url: `${SITE.url}/glossary` },
            ])
          ),
        }}
      />
      <Nav />
      <main>
        <PageHeader
          eyebrow="Glossary"
          title="Plain definitions for AI content terms."
          subtitle="Every term we use, defined in 1-3 sentences. Built for fast scanning and AI citation."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Glossary' },
          ]}
        />

        <Section>
          <Container>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              {letters.length === 0 ? (
                <p style={{ color: theme.palette.fgMuted, textAlign: 'center' }}>
                  No glossary terms yet.
                </p>
              ) : (
                letters.map((letter) => (
                  <Reveal key={letter}>
                    <section style={{ marginBottom: 48 }}>
                      <h2
                        style={{
                          fontFamily: theme.fonts.display,
                          fontSize: 28,
                          fontWeight: 800,
                          margin: 0,
                          marginBottom: 16,
                          letterSpacing: '-0.025em',
                          color: theme.palette.accent,
                          paddingBottom: 8,
                          borderBottom: `2px solid ${theme.palette.accentBg}`,
                        }}
                      >
                        {letter}
                      </h2>
                      <StaggerGroup style={{ display: 'flex', flexDirection: 'column', gap: 8 }} staggerDelay={0.04}>
                        {byLetter[letter].map((t) => (
                          <StaggerChild key={t.slug}>
                            <Link
                              href={`/glossary/${t.slug}`}
                              style={{
                                display: 'block',
                                padding: '16px 20px',
                                background: theme.palette.surface,
                                border: `1px solid ${theme.palette.borderSoft}`,
                                borderRadius: theme.radius.lg,
                                transition: 'border-color .15s, background .15s',
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                                <h3 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 18, fontWeight: 700, letterSpacing: '-0.015em' }}>
                                  {t.frontmatter.term}
                                </h3>
                                <span style={{ color: theme.palette.accent, fontSize: 13, fontWeight: 600 }}>Read →</span>
                              </div>
                              <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.55, color: theme.palette.fgMuted }}>
                                {t.frontmatter.definition}
                              </p>
                            </Link>
                          </StaggerChild>
                        ))}
                      </StaggerGroup>
                    </section>
                  </Reveal>
                ))
              )}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
