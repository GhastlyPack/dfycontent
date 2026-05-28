import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { Reveal } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';
import {
  getAllBlogPosts,
  BLOG_CATEGORIES,
  categorySlug,
  formatDate,
} from '@/lib/content';
import { jsonLd, breadcrumbSchema, SITE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Blog — DFY Content',
  description:
    'Strategy, process, comparisons, industry guides, and AI explainers — for founders and operators thinking about done-for-you content.',
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const breadcrumbs = [
    { name: 'Home', url: SITE.url },
    { name: 'Blog', url: `${SITE.url}/blog` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(breadcrumbs)) }}
      />
      <Nav />
      <main>
        <PageHeader
          eyebrow="Blog"
          title="Notes on done-for-you content."
          subtitle="Strategy, process, comparisons, industry guides, and AI explainers. Written for the founders who'd rather read than scroll."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Blog' },
          ]}
        />

        {/* Category pills */}
        <Section tight>
          <Container>
            <Reveal>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 880, margin: '0 auto' }}>
                <CategoryPill href="/blog" label="All" />
                {BLOG_CATEGORIES.map((c) => (
                  <CategoryPill key={c} href={`/blog/category/${categorySlug(c)}`} label={c} />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* Posts grid */}
        <Section>
          <Container>
            <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {posts.length === 0 ? (
                <p style={{ color: theme.palette.fgMuted, textAlign: 'center' }}>
                  No posts yet. Check back soon.
                </p>
              ) : (
                posts.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.04}>
                    <article style={{ padding: '28px 0', borderBottom: `1px solid ${theme.palette.borderSoft}` }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, fontSize: 12 }}>
                        <Link
                          href={`/blog/category/${categorySlug(p.frontmatter.category)}`}
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            background: theme.palette.accentBg,
                            color: theme.palette.accent,
                            fontFamily: theme.fonts.body,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            borderRadius: 999,
                          }}
                        >
                          {p.frontmatter.category}
                        </Link>
                        <span style={{ color: theme.palette.fgSubtle }}>
                          {formatDate(p.frontmatter.publishedAt)}
                        </span>
                      </div>
                      <h2 style={{ margin: '0 0 8px', fontFamily: theme.fonts.display, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                        <Link href={`/blog/${p.slug}`} style={{ color: theme.palette.fg }}>
                          {p.frontmatter.title}
                        </Link>
                      </h2>
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: theme.palette.fgMuted, maxWidth: 680 }}>
                        {p.frontmatter.description}
                      </p>
                      <Link
                        href={`/blog/${p.slug}`}
                        style={{ marginTop: 12, display: 'inline-block', fontSize: 14, fontWeight: 600, color: theme.palette.accent }}
                      >
                        Read →
                      </Link>
                    </article>
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

function CategoryPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        padding: '8px 16px',
        background: theme.palette.surface,
        border: `1px solid ${theme.palette.borderSoft}`,
        borderRadius: 999,
        fontFamily: theme.fonts.body,
        fontSize: 13,
        fontWeight: 500,
        color: theme.palette.fg,
        transition: 'background .15s, border-color .15s',
      }}
    >
      {label}
    </Link>
  );
}
