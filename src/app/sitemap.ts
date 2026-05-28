import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/schema';

/**
 * Auto-generates sitemap.xml at build time.
 * Every static route the marketing site exposes should be listed here.
 * Dynamic routes (blog posts, glossary terms, case studies) will be
 * appended programmatically once MDX content exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
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

    // Architectural variants — keep at lower priority while we're shortlisting
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
  ];

  return staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
