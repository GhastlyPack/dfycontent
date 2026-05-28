import type { Metadata } from 'next';
import { IndustryPage, type IndustryConfig } from '@/components/templates/IndustryPage';

export const metadata: Metadata = {
  title: 'DFY Content for SaaS founders — Build a public brand without filming',
  description: 'SaaS founders ship product, raise capital, hire teams. They don\'t have time to film TikToks. We do the content; you stay focused on the company.',
};

const CONFIG: IndustryConfig = {
  industry: 'SaaS Founders',
  hero: {
    eyebrow: 'For SaaS founders',
    h1: (
      <>
        Be a founder-led brand <span style={{ color: '#6c5ce7' }}>without becoming an influencer.</span>
      </>
    ),
    sub: 'Your customers buy from founders they trust. Your week doesn\'t have a content block in it. We bridge that gap — script, clone, edit, post — in your voice, in your name, without your time.',
  },
  painPoints: [
    {
      h: "Pipeline is built on trust you don't have yet",
      b: "B2B SaaS sales cycles get faster when prospects show up already knowing you. They can't if you don't post.",
    },
    {
      h: "Filming is the first thing dropped when shipping slips",
      b: "When the sprint slips, content slips. When fundraising hits, content drops to zero. Cadence dies before it starts.",
    },
    {
      h: "Your competitors are everywhere",
      b: "Every B2B niche has founders publishing daily. They're winning attention you should own.",
    },
  ],
  whyWeFit: {
    title: 'We were built for founders who refuse to film.',
    body: (
      <>
        <p>
          The founders winning attention in 2026 didn&apos;t suddenly find an extra 10 hours a week. They outsourced
          the production. We&apos;re the operation that makes that possible.
        </p>
        <p>
          You give us two hours, once. We give you back twelve months of content, in your voice, on every platform.
        </p>
      </>
    ),
    bullets: [
      "Scripts written around your sales narrative — not generic 'founder content'",
      "Cadence locked through fundraises, launches, ship slips",
      "Posts go to your real accounts — engagement compounds on you, not us",
      "$2k-20k/mo replaces a $20k+/mo content team",
    ],
  },
  outcomes: [
    { metric: '30+', label: 'pieces / month in your voice' },
    { metric: '2hrs', label: 'your only time commitment' },
    { metric: '14d', label: 'from kickoff to live posts' },
    { metric: '$0', label: 'team headcount required' },
  ],
  faq: [
    {
      q: 'I\'m pre-seed / small team — is this overkill?',
      a: 'Probably. Our floor is $2k/mo because production cost is real. If you\'re pre-revenue or under ~$500k ARR, DIY or a single contractor probably wins. We start to make sense around $1M+ ARR or with funded series A teams.',
    },
    {
      q: 'What if my product is technical and hard to explain?',
      a: "We work with technical founders frequently. Our writers do deep onboarding on your product, your customer, and your competitors. If we can't write to your niche, we tell you on the qualifier.",
    },
    {
      q: 'Can I use the clone for fundraising / investor updates too?',
      a: "Yes — though those usually shouldn't be AI-delivered. We can produce script + record direction, but most investor-facing video benefits from the trust of a manually-recorded message.",
    },
  ],
};

export default function Page() {
  return <IndustryPage config={CONFIG} />;
}
