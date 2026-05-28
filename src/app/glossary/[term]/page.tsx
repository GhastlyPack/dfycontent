import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ArticleLayout } from '@/components/ArticleLayout';
import { mdxComponents } from '@/components/mdx-components';
import { Container } from '@/components/atoms';
import { theme } from '@/lib/theme';
import { getAllGlossaryTerms, getGlossaryTerm } from '@/lib/content';
import { jsonLd, definedTermSchema, breadcrumbSchema, SITE } from '@/lib/schema';

export async function generateStaticParams() {
  return getAllGlossaryTerms().map((t) => ({ term: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) return {};
  return {
    title: `${t.frontmatter.term} — DFY Content Glossary`,
    description: t.frontmatter.definition,
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) notFound();

  const fm = t.frontmatter;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            definedTermSchema({
              name: fm.term,
              description: fm.definition,
              url: `${SITE.url}/glossary/${term}`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'Glossary', url: `${SITE.url}/glossary` },
              { name: fm.term, url: `${SITE.url}/glossary/${term}` },
            ])
          ),
        }}
      />
      <Nav />
      <main>
        <ArticleLayout
          eyebrow="Glossary"
          title={fm.term}
          subtitle={fm.definition}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Glossary', href: '/glossary' },
            { label: fm.term },
          ]}
        >
          <MDXRemote
            source={t.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </ArticleLayout>

        {fm.related && fm.related.length > 0 && (
          <section style={{ paddingTop: 16, paddingBottom: 80 }}>
            <Container>
              <div style={{ maxWidth: 720, margin: '0 auto' }}>
                <h3 style={{ fontFamily: theme.fonts.display, fontSize: 16, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: theme.palette.fgMuted, margin: 0, marginBottom: 12 }}>
                  Related terms
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {fm.related.map((r) => {
                    const slug = r
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');
                    return (
                      <Link
                        key={r}
                        href={`/glossary/${slug}`}
                        style={{
                          padding: '8px 14px',
                          background: theme.palette.accentBg,
                          color: theme.palette.accent,
                          borderRadius: 999,
                          fontFamily: theme.fonts.body,
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {r}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
