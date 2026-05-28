/**
 * JSON-LD schema generators for SEO + AEO.
 * Output is meant to be JSON.stringify'd into a <script type="application/ld+json"> tag.
 */

export const SITE = {
  name: 'DFY Content',
  url: 'https://dfycontent.io',
  description:
    'We clone your face and voice with AI, then write, produce, and publish your social content. Two hours of setup. Content forever.',
  logo: 'https://dfycontent.io/og.png', // TODO: real logo asset
  email: 'hello@dfycontent.io',
  founder: {
    name: 'TBD Founder',
    role: 'Founder & CEO',
  },
} as const;

type FAQ = { q: string; a: string };

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: SITE.logo,
    email: SITE.email,
    founder: {
      '@type': 'Person',
      name: SITE.founder.name,
      jobTitle: SITE.founder.role,
    },
    sameAs: [
      // TODO: add real social links once they exist
      // 'https://x.com/dfycontent',
      // 'https://linkedin.com/company/dfycontent',
    ],
  };
}

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: SITE.name,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    description: SITE.description,
    serviceType: 'AI-powered done-for-you social media content production',
    areaServed: 'Worldwide',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '2000',
      highPrice: '20000',
      offerCount: '3',
    },
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  totalTime?: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      '@type': opts.author ? 'Person' : 'Organization',
      name: opts.author ?? SITE.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.logo },
    },
    ...(opts.image ? { image: opts.image } : {}),
  };
}

export function definedTermSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'DFY Content Glossary',
      url: `${SITE.url}/glossary`,
    },
  };
}

/**
 * Helper: serializes a schema object into a <script> tag string.
 * Use inside a server component like:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }} />
 */
export function jsonLd(schema: unknown): string {
  return JSON.stringify(schema);
}
