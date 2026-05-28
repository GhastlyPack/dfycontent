import type { Metadata } from 'next';
import { IndustryPage, type IndustryConfig } from '@/components/templates/IndustryPage';

export const metadata: Metadata = {
  title: 'DFY Content for agency owners — Win clients with personal brand visibility',
  description: 'Agency owners sell their team but get hired for themselves. We build the founder brand that closes deals before the pitch.',
};

const CONFIG: IndustryConfig = {
  industry: 'Agency Owners',
  hero: {
    eyebrow: 'For agency owners',
    h1: (
      <>
        Sell the agency. <span style={{ color: '#6c5ce7' }}>Build the founder brand.</span>
      </>
    ),
    sub: "Your team does the work. But your face is what closes the deal. Agency clients buy from founders they recognize. We make sure they recognize you.",
  },
  painPoints: [
    {
      h: 'You sell services that compete on personal brand',
      b: "Every agency selling content, marketing, branding, or design lives or dies on the founder's visibility. Yours included.",
    },
    {
      h: "You produce content for clients, not yourself",
      b: "The cobbler's kids. You're posting daily for clients while your own LinkedIn hasn't been touched in 6 months.",
    },
    {
      h: "Your team can't write in your voice",
      b: "Junior team writes for the agency's clients fine. They can't make YOUR LinkedIn sound like you. Voice is leadership-specific.",
    },
  ],
  whyWeFit: {
    title: "Your team builds for clients. We build for you.",
    body: (
      <>
        <p>
          We&apos;re the version of your own service, pointed at the founder. Same end product (content), different
          customer (you specifically, not the agency).
        </p>
        <p>
          Most agency owners we talk to are embarrassed to ask their own team to make their content. That gap is
          why we exist.
        </p>
      </>
    ),
    bullets: [
      "Scripts written around YOUR positioning, not your agency's services",
      "Frees your team to focus on client work, not founder content",
      "Inbound for your agency increases — pre-sold prospects find your team",
      "Less awkward than asking your own staff to make your TikToks",
    ],
  },
  outcomes: [
    { metric: '30+', label: 'pieces / month in your voice' },
    { metric: '14d', label: 'kickoff to live cadence' },
    { metric: '$5k', label: '+/mo in scripting value, included' },
    { metric: '4×', label: 'typical inbound lift in 90 days' },
  ],
  faq: [
    {
      q: "Won't this look weird — an agency outsourcing their own content?",
      a: "No one knows unless you tell them. Same way you don't disclose every contractor or tool you use to deliver client work. The output is yours.",
    },
    {
      q: "Could my team learn to do this for me instead?",
      a: "Technically yes — and some agencies do. The capacity tradeoff is the real question. Every hour your team spends on founder content is an hour not billed to clients. Outsourcing tends to win on margin.",
    },
    {
      q: 'Can you also do this for our clients?',
      a: "We do, occasionally — but most agency partnerships work better as a referral relationship. We focus on direct founder clients to keep the production pipeline focused. Talk to us if interested.",
    },
  ],
};

export default function Page() {
  return <IndustryPage config={CONFIG} />;
}
