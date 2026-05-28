import type { Metadata } from 'next';
import { IndustryPage, type IndustryConfig } from '@/components/templates/IndustryPage';

export const metadata: Metadata = {
  title: 'DFY Content for consultants — Build authority without billable hours lost',
  description: 'Consultants bill by the hour. Content kills hours. We replace the production time so you can build the brand without losing the revenue.',
};

const CONFIG: IndustryConfig = {
  industry: 'Consultants',
  hero: {
    eyebrow: 'For consultants',
    h1: (
      <>
        Build authority. Don't lose <span style={{ color: '#6c5ce7' }}>billable hours doing it.</span>
      </>
    ),
    sub: "Every hour on content is an hour not billed. The math kills most consulting brands before they start. We remove the production hours — you keep the billing, you keep the brand.",
  },
  painPoints: [
    {
      h: 'Content directly trades against billable hours',
      b: "A consultant at $400/hr writing scripts is losing money on every post. The unit economics of DIY content for consultants are brutal.",
    },
    {
      h: "Authority compounds slowly — but inconsistently means never",
      b: "Stop posting for 30 days and you're back to zero discoverability. Most consultants try, drop off, and stay invisible.",
    },
    {
      h: "LinkedIn alone isn't enough anymore",
      b: "Your buyers are on TikTok, YouTube Shorts, and X too. Posting everywhere takes more hours you don't have.",
    },
  ],
  whyWeFit: {
    title: "Our $2k/mo floor is cheaper than 5 hours of your time.",
    body: (
      <>
        <p>
          If you bill $400/hour, our entry tier is roughly five hours of your billable rate per month — for a full
          content operation across every platform. The math works in our favor almost immediately.
        </p>
        <p>
          More importantly: you stop trading billable time for marketing time. The clock keeps ticking on client
          work while we run the brand.
        </p>
      </>
    ),
    bullets: [
      "Service pays for itself within ~5 hours of recovered billable time per month",
      "Scripts position you on your actual expertise — not generic 'thought leadership'",
      "Multi-platform without you opening five apps a day",
      "Onboarding fits into one billable-slot block (~2 hours)",
    ],
  },
  outcomes: [
    { metric: '30+', label: 'pieces / month' },
    { metric: '5hr', label: 'of your billable rate covers entry tier' },
    { metric: '2hr', label: 'one-time onboarding session' },
    { metric: '∞', label: 'after the 2hr session' },
  ],
  faq: [
    {
      q: "I work on confidential client engagements — what about NDA scope?",
      a: "We script around your areas of expertise, not your specific engagements. Anything tied to a particular client gets disclosed and approved by you before production. We've worked with consultants under strict NDAs.",
    },
    {
      q: "I'm a one-person shop — am I too small?",
      a: "If you're billing $200+/hour and want public-facing presence, the math works. If you're under $150/hour, the entry tier ($2k) might be a stretch. We'll be honest on the qualifier.",
    },
    {
      q: 'Can content drive RFP responses or proposal opportunities?',
      a: 'Indirectly — consistent visibility means prospects already know your work before they send an RFP. We can\'t guarantee specific RFPs but we can guarantee you stop being invisible during the comparison phase.',
    },
  ],
};

export default function Page() {
  return <IndustryPage config={CONFIG} />;
}
