import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { Reveal } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';
import {
  BLOG_CATEGORIES,
  categorySlug,
  categoryFromSlug,
  getBlogPostsByCategory,
  formatDate,
} from '@/lib/content';
import { jsonLd, breadcrumbSchema, SITE } from '@/lib/schema';

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: categorySlug(c) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryFromSlug(category);
  if (!cat) return {};
  return {
    title: `${cat} — DFY Content Blog`,
    description: `Posts in the ${cat} category.`,
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categoryFromSlug(category);
  if (!cat) notFound();

  const posts = getBlogPostsByCategory(cat);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'Blog', url: `${SITE.url}/blog` },
              { name: cat, url: `${SITE.url}/blog/category/${category}` },
            ])
          ),
        }}
      />
      <Nav />
      <main>
        <PageHeader
          eyebrow={cat}
          title={`Posts in ${cat}`}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: cat },
          ]}
        />

        <Section tight>
          <Container>
            <Reveal>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 880, margin: '0 auto' }}>
                <CategoryPill href="/blog" label="All" />
                {BLOG_CATEGORIES.map((c) => (
                  <CategoryPill
                    key={c}
                    href={`/blog/category/${categorySlug(c)}`}
                    label={c}
                    active={c === cat}
                  />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>

        <Section>
          <Container>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              {posts.length === 0 ? (
                <p style={{ color: theme.palette.fgMuted, textAlign: 'center' }}>
                  No posts in this category yet.
                </p>
              ) : (
                posts.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.04}>
                    <article style={{ padding: '28px 0', borderBottom: `1px solid ${theme.palette.borderSoft}` }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, fontSize: 12, color: theme.palette.fgSubtle }}>
                        {formatDate(p.frontmatter.publishedAt)}
                      </div>
                      <h2 style={{ margin: '0 0 8px', fontFamily: theme.fonts.display, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                        <Link href={`/blog/${p.slug}`} style={{ color: theme.palette.fg }}>
                          {p.frontmatter.title}
                        </Link>
                      </h2>
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: theme.palette.fgMuted, maxWidth: 680 }}>
                        {p.frontmatter.description}
                      </p>
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

function CategoryPill({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      style={{
        padding: '8px 16px',
        background: active ? theme.palette.fg : theme.palette.surface,
        color: active ? theme.palette.bg : theme.palette.fg,
        border: `1px solid ${active ? theme.palette.fg : theme.palette.borderSoft}`,
        borderRadius: 999,
        fontFamily: theme.fonts.body,
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {label}
    </Link>
  );
}
