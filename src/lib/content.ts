/**
 * MDX content loaders for blog, glossary, customers, resources.
 * Run server-side at build time (Next.js statically generates everything).
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export type BlogCategory =
  | 'Strategy'
  | 'Process'
  | 'Comparisons'
  | 'Industry guides'
  | 'AI explainers';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Strategy',
  'Process',
  'Comparisons',
  'Industry guides',
  'AI explainers',
];

export function categorySlug(c: BlogCategory): string {
  return c.toLowerCase().replace(/\s+/g, '-');
}

export function categoryFromSlug(slug: string): BlogCategory | null {
  return BLOG_CATEGORIES.find((c) => categorySlug(c) === slug) ?? null;
}

export type BlogFrontmatter = {
  title: string;
  description: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  author?: string;
  category: BlogCategory;
  tags?: string[];
  ogImage?: string;
  draft?: boolean;
};

export type GlossaryFrontmatter = {
  term: string;
  definition: string;
  related?: string[];
};

export type CustomerFrontmatter = {
  client: string;
  role: string;
  industry: string;
  result: string;
  quote?: string;
  publishedAt: string;
  ogImage?: string;
};

export type ResourceFrontmatter = {
  title: string;
  description: string;
  format: 'pdf' | 'template' | 'guide';
  gated?: boolean;
  publishedAt: string;
};

type AnyDoc<F> = { slug: string; frontmatter: F; content: string };

function safeReadDir(p: string): string[] {
  try {
    return fs.readdirSync(p);
  } catch {
    return [];
  }
}

function loadAll<F>(folder: string): AnyDoc<F>[] {
  const dir = path.join(CONTENT_ROOT, folder);
  return safeReadDir(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const parsed = matter(raw);
      const slug = f.replace(/\.mdx?$/, '');
      return { slug, frontmatter: parsed.data as F, content: parsed.content };
    });
}

function loadOne<F>(folder: string, slug: string): AnyDoc<F> | null {
  const dir = path.join(CONTENT_ROOT, folder);
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const c of candidates) {
    const full = path.join(dir, c);
    if (fs.existsSync(full)) {
      const raw = fs.readFileSync(full, 'utf8');
      const parsed = matter(raw);
      return { slug, frontmatter: parsed.data as F, content: parsed.content };
    }
  }
  return null;
}

// ───────── Blog ─────────
export function getAllBlogPosts() {
  return loadAll<BlogFrontmatter>('blog')
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

export function getBlogPost(slug: string) {
  return loadOne<BlogFrontmatter>('blog', slug);
}

export function getBlogPostsByCategory(category: BlogCategory) {
  return getAllBlogPosts().filter((p) => p.frontmatter.category === category);
}

export function getRelatedBlogPosts(slug: string, max = 3) {
  const all = getAllBlogPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  // Same category first, then most recent
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aSame = a.frontmatter.category === current.frontmatter.category ? -1 : 1;
      const bSame = b.frontmatter.category === current.frontmatter.category ? -1 : 1;
      return aSame - bSame;
    })
    .slice(0, max);
}

// ───────── Glossary ─────────
export function getAllGlossaryTerms() {
  return loadAll<GlossaryFrontmatter>('glossary').sort((a, b) =>
    a.frontmatter.term.localeCompare(b.frontmatter.term)
  );
}

export function getGlossaryTerm(slug: string) {
  return loadOne<GlossaryFrontmatter>('glossary', slug);
}

// ───────── Customers ─────────
export function getAllCustomers() {
  return loadAll<CustomerFrontmatter>('customers').sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );
}

export function getCustomer(slug: string) {
  return loadOne<CustomerFrontmatter>('customers', slug);
}

// ───────── Resources ─────────
export function getAllResources() {
  return loadAll<ResourceFrontmatter>('resources').sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );
}

export function getResource(slug: string) {
  return loadOne<ResourceFrontmatter>('resources', slug);
}

// ───────── Format helpers ─────────
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}
