import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ArticleLayout } from '@/components/ArticleLayout';
import { mdxComponents } from '@/components/mdx-components';
import { getAllCustomers, getCustomer, formatDate } from '@/lib/content';
import { theme } from '@/lib/theme';
import { jsonLd, breadcrumbSchema, SITE } from '@/lib/schema';

export async function generateStaticParams() {
  return getAllCustomers().map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCustomer(slug);
  if (!c) return {};
  return {
    title: `${c.frontmatter.client} — Customer Story — DFY Content`,
    description: c.frontmatter.result,
  };
}

export default async function CustomerCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCustomer(slug);
  if (!c) notFound();

  const fm = c.frontmatter;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'Customers', url: `${SITE.url}/customers` },
              { name: fm.client, url: `${SITE.url}/customers/${slug}` },
            ])
          ),
        }}
      />
      <Nav />
      <main>
        <ArticleLayout
          eyebrow={fm.industry}
          title={fm.client}
          subtitle={fm.result}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Customers', href: '/customers' },
            { label: fm.client },
          ]}
          meta={
            <>
              <span>{fm.role}</span>
              <span aria-hidden style={{ color: theme.palette.fgSubtle }}>·</span>
              <span>{formatDate(fm.publishedAt)}</span>
            </>
          }
        >
          {fm.quote && (
            <blockquote
              style={{
                margin: '0 0 32px',
                padding: 28,
                background: `linear-gradient(135deg, ${theme.palette.accentBg} 0%, ${theme.palette.surface} 100%)`,
                borderLeft: `4px solid ${theme.palette.accent}`,
                borderRadius: theme.radius.lg,
                fontFamily: theme.fonts.display,
                fontSize: 22,
                lineHeight: 1.4,
                color: theme.palette.fg,
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}
            >
              &ldquo;{fm.quote}&rdquo;
            </blockquote>
          )}
          <MDXRemote
            source={c.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </ArticleLayout>
      </main>
      <Footer />
    </>
  );
}
