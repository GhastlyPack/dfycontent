import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ArticleLayout } from '@/components/ArticleLayout';
import { mdxComponents } from '@/components/mdx-components';
import {
  getAllBlogPosts,
  getBlogPost,
  getRelatedBlogPosts,
  categorySlug,
  formatDate,
  readingTime,
} from '@/lib/content';
import { theme } from '@/lib/theme';
import { jsonLd, articleSchema, breadcrumbSchema, SITE } from '@/lib/schema';

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} — DFY Content`,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.publishedAt,
      modifiedTime: post.frontmatter.updatedAt,
      authors: post.frontmatter.author ? [post.frontmatter.author] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const related = getRelatedBlogPosts(slug, 3);

  const schemas = [
    articleSchema({
      title: fm.title,
      description: fm.description,
      url: `${SITE.url}/blog/${slug}`,
      datePublished: fm.publishedAt,
      dateModified: fm.updatedAt,
      author: fm.author,
      image: fm.ogImage,
    }),
    breadcrumbSchema([
      { name: 'Home', url: SITE.url },
      { name: 'Blog', url: `${SITE.url}/blog` },
      { name: fm.title, url: `${SITE.url}/blog/${slug}` },
    ]),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(s) }}
        />
      ))}
      <Nav />
      <main>
        <ArticleLayout
          eyebrow={fm.category}
          title={fm.title}
          subtitle={fm.description}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: fm.title },
          ]}
          meta={
            <>
              <span>{formatDate(fm.publishedAt)}</span>
              <span aria-hidden style={{ color: theme.palette.fgSubtle }}>·</span>
              <span>{readingTime(post.content)}</span>
              {fm.author && (
                <>
                  <span aria-hidden style={{ color: theme.palette.fgSubtle }}>·</span>
                  <span>by {fm.author}</span>
                </>
              )}
              <span aria-hidden style={{ color: theme.palette.fgSubtle }}>·</span>
              <Link
                href={`/blog/category/${categorySlug(fm.category)}`}
                style={{
                  padding: '4px 10px',
                  background: theme.palette.accentBg,
                  color: theme.palette.accent,
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {fm.category}
              </Link>
            </>
          }
        >
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
              },
            }}
          />
        </ArticleLayout>

        {/* Related posts */}
        {related.length > 0 && (
          <section style={{ paddingTop: 32, paddingBottom: 80, background: theme.palette.bgSubtle }}>
            <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 24px 0' }}>
              <h2 style={{ fontFamily: theme.fonts.display, fontSize: 24, fontWeight: 700, margin: 0, marginBottom: 24, letterSpacing: '-0.015em' }}>
                Keep reading
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    style={{
                      background: theme.palette.surface,
                      border: `1px solid ${theme.palette.borderSoft}`,
                      borderRadius: theme.radius.lg,
                      padding: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      color: theme.palette.fg,
                    }}
                  >
                    <span style={{ fontFamily: theme.fonts.body, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: theme.palette.accent }}>
                      {r.frontmatter.category}
                    </span>
                    <h3 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 17, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                      {r.frontmatter.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: 13, color: theme.palette.fgMuted, lineHeight: 1.5 }}>
                      {r.frontmatter.description.slice(0, 110)}
                      {r.frontmatter.description.length > 110 ? '…' : ''}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
