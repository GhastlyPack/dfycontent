import type { Metadata } from 'next';
import { IndustryPage, type IndustryConfig } from '@/components/templates/IndustryPage';

export const metadata: Metadata = {
  title: 'DFY Content for real estate — Local visibility without daily filming',
  description: 'Real estate agents win on local visibility. We build the content engine so your face stays in front of buyers and sellers in your market — without you filming.',
};

const CONFIG: IndustryConfig = {
  industry: 'Real Estate',
  hero: {
    eyebrow: 'For real estate',
    h1: (
      <>
        Own your market <span style={{ color: '#6c5ce7' }}>without filming a single tour.</span>
      </>
    ),
    sub: "Sellers pick the agent they recognize. Buyers do too. Visibility is the moat. We build it — neighborhood-specific scripts, your face, every platform your market scrolls.",
  },
  painPoints: [
    {
      h: 'Showings, contracts, closings eat the week',
      b: "Real estate is the most calendar-fragmented service business. There is no four-hour filming block. There never will be.",
    },
    {
      h: "Other agents are everywhere on TikTok and Instagram",
      b: "Every market has 3-5 agents posting daily. They're winning the listings before the call.",
    },
    {
      h: "Generic content doesn't move local markets",
      b: "Buyers and sellers care about THEIR neighborhood, THEIR price tier, THEIR question. Most automated content services miss that completely.",
    },
  ],
  whyWeFit: {
    title: 'We script around your specific market — not generic real estate content.',
    body: (
      <>
        <p>
          Onboarding includes your geography, your price tier, your typical client profile, and the questions
          you get asked weekly. Scripts reference your zip codes, your neighborhoods, your seasonal cycles.
        </p>
        <p>
          The output is YOUR face answering YOUR buyers&apos; questions about YOUR market. Across every platform
          buyers scroll. Without you ever filming.
        </p>
      </>
    ),
    bullets: [
      "Scripts geo-tuned to your specific market — not 'general real estate'",
      "Content cadence stays consistent through escrow, closings, and chaos",
      "Local SEO benefit — your name + neighborhood, repeated across platforms",
      "Free up evenings: no more 9pm filming sessions for tomorrow's post",
    ],
  },
  outcomes: [
    { metric: '30+', label: 'market-specific pieces / month' },
    { metric: '14d', label: 'from kickoff to live posts' },
    { metric: '5+', label: 'platforms your prospects scroll' },
    { metric: '0', label: 'evenings filming tomorrow\'s content' },
  ],
  faq: [
    {
      q: 'My brokerage requires compliance review on all posts. Compatible?',
      a: "Yes. We work with regulated environments. Compliance review fits between our final cut and our publishing step — we don't post until your broker / compliance signs off.",
    },
    {
      q: "Can you handle listing-specific content (specific properties)?",
      a: "Yes but with caveats. We avoid making specific listing claims that could create liability. We can produce neighborhood tours, market commentary, and seller/buyer education — all of which drive the same listings.",
    },
    {
      q: 'My market is rural / small population — is this overkill?',
      a: "Maybe. If your TAM is under ~500 households, the math gets thin. Our floor is $2k/mo. We'll be honest about whether the volume justifies the spend on the qualifier.",
    },
  ],
};

export default function Page() {
  return <IndustryPage config={CONFIG} />;
}
