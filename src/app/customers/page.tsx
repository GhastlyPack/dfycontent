import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { Reveal, StaggerGroup, StaggerChild } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';
import { getAllCustomers, formatDate } from '@/lib/content';
import { jsonLd, breadcrumbSchema, SITE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Customers — DFY Content',
  description:
    'Real results from founders, operators, and consultants we\'ve cloned. Specific numbers, real timelines, plain stories.',
};

export default function CustomersIndexPage() {
  const customers = getAllCustomers();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'Customers', url: `${SITE.url}/customers` },
            ])
          ),
        }}
      />
      <Nav />
      <main>
        <PageHeader
          eyebrow="Customers"
          title="Real founders. Real results."
          subtitle="Stories from clients we've cloned — with specific numbers and concrete timelines. Names used with permission."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Customers' },
          ]}
        />

        <Section>
          <Container>
            <div style={{ maxWidth: 1080, margin: '0 auto' }}>
              {customers.length === 0 ? (
                <Reveal>
                  <p style={{ color: theme.palette.fgMuted, textAlign: 'center', fontSize: 17 }}>
                    Case studies coming soon. We&apos;re writing them as our cohort ramps.
                  </p>
                </Reveal>
              ) : (
                <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }} staggerDelay={0.08}>
                  {customers.map((c) => (
                    <StaggerChild key={c.slug}>
                      <Link
                        href={`/customers/${c.slug}`}
                        style={{
                          display: 'block',
                          background: theme.palette.surface,
                          border: `1px solid ${theme.palette.borderSoft}`,
                          borderRadius: theme.radius.xl,
                          padding: 28,
                          height: '100%',
                          boxShadow: theme.shadow.card,
                          color: theme.palette.fg,
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent, marginBottom: 8 }}>
                          {c.frontmatter.industry}
                        </div>
                        <h3 style={{ fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                          {c.frontmatter.client}
                        </h3>
                        <p style={{ margin: '4px 0 16px', fontSize: 13, color: theme.palette.fgMuted }}>
                          {c.frontmatter.role}
                        </p>
                        <div style={{ padding: '14px 16px', background: theme.palette.accentBg, borderRadius: theme.radius.md, fontFamily: theme.fonts.display, fontSize: 17, fontWeight: 600, color: theme.palette.fg, letterSpacing: '-0.01em' }}>
                          {c.frontmatter.result}
                        </div>
                        {c.frontmatter.quote && (
                          <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: 1.55, color: theme.palette.fgMuted, fontStyle: 'italic' }}>
                            &ldquo;{c.frontmatter.quote}&rdquo;
                          </p>
                        )}
                        <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: theme.palette.accent }}>
                          Read the full story →
                        </div>
                      </Link>
                    </StaggerChild>
                  ))}
                </StaggerGroup>
              )}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
