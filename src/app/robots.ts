import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/schema';

/**
 * /robots.txt — allow everything except API + internal review pages.
 * AI crawlers (GPTBot, ClaudeBot, etc.) are explicitly welcomed
 * for AEO citation purposes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/variants', // internal team review page, doesn't need to be indexed
        ],
      },
      // Explicit allow for known AI crawlers (some pay attention to specific rules)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GoogleOther', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
