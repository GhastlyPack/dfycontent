import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/schema';
import {
  getAllBlogPosts,
  getAllGlossaryTerms,
  getAllCustomers,
  BLOG_CATEGORIES,
  categorySlug,
} from '@/lib/content';

/**
 * Auto-generates sitemap.xml at build time.
 * Includes every static route + every dynamic route discovered from MDX content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  type Entry = {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    lastModified?: Date;
  };

  const staticRoutes: Entry[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },

    // Foundation
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/how-it-works', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/apply', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/legal/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/legal/terms', priority: 0.2, changeFrequency: 'yearly' },

    // Audience variants
    { path: '/business-owner', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/creator', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/coach', priority: 0.85, changeFrequency: 'monthly' },

    // Architectural variants (lower priority while shortlisting)
    { path: '/v-minimal', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-editorial', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-sales-letter', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-bento', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-video', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-faq', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-stats', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-testimonials', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-before-after', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/v-dark', priority: 0.4, changeFrequency: 'monthly' },

    // Content hub indexes
    { path: '/blog', priority: 0.85, changeFrequency: 'daily' },
    { path: '/glossary', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/customers', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/resources', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/vs', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/for', priority: 0.85, changeFrequency: 'monthly' },

    // Comparison pages
    { path: '/vs/heygen', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/vs/synthesia', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/vs/captions', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/vs/hiring-an-agency', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/vs/doing-it-yourself', priority: 0.8, changeFrequency: 'monthly' },

    // Industry pages
    { path: '/for/saas-founders', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/for/coaches', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/for/consultants', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/for/agency-owners', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/for/real-estate', priority: 0.8, changeFrequency: 'monthly' },

    // Tools
    { path: '/tools/content-roi-calculator', priority: 0.75, changeFrequency: 'monthly' },
  ];

  // Blog post category pages
  const categoryRoutes: Entry[] = BLOG_CATEGORIES.map((c) => ({
    path: `/blog/category/${categorySlug(c)}`,
    priority: 0.7,
    changeFrequency: 'weekly',
  }));

  // Dynamic content
  const blogRoutes: Entry[] = getAllBlogPosts().map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: new Date(p.frontmatter.updatedAt ?? p.frontmatter.publishedAt),
  }));

  const glossaryRoutes: Entry[] = getAllGlossaryTerms().map((t) => ({
    path: `/glossary/${t.slug}`,
    priority: 0.65,
    changeFrequency: 'monthly',
  }));

  const customerRoutes: Entry[] = getAllCustomers().map((c) => ({
    path: `/customers/${c.slug}`,
    priority: 0.75,
    changeFrequency: 'yearly',
    lastModified: new Date(c.frontmatter.publishedAt),
  }));

  const all = [
    ...staticRoutes,
    ...categoryRoutes,
    ...blogRoutes,
    ...glossaryRoutes,
    ...customerRoutes,
  ];

  return all.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: r.lastModified ?? now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
