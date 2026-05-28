import type { Metadata } from 'next';
import { IndustryPage, type IndustryConfig } from '@/components/templates/IndustryPage';

export const metadata: Metadata = {
  title: 'DFY Content for coaches — Build authority and inbound pipeline',
  description: 'Coaches need consistent visibility to fill calendars. We script every piece around your methodology, your clone delivers, our team publishes.',
};

const CONFIG: IndustryConfig = {
  industry: 'Coaches',
  hero: {
    eyebrow: 'For coaches',
    h1: (
      <>
        Be the coach your prospects <span style={{ color: '#6c5ce7' }}>find first.</span>
      </>
    ),
    sub: "Your business runs on inbound. Inbound runs on visibility. Visibility runs on consistency you don't have time for. We run the visibility engine, in your voice, around your methodology.",
  },
  painPoints: [
    {
      h: 'Calendar full of clients, none filming content',
      b: "The full client calendar is the win condition. It's also why you can't make content. Self-defeating loop.",
    },
    {
      h: "Free advice gets repurposed by every other coach",
      b: "You're already saying the right things on calls. Nobody outside your roster hears them. Your insights compound for clients only.",
    },
    {
      h: 'Inbound dries up between launches',
      b: "Without consistent content, inbound spikes around launches and dies between them. Steady visibility = steady pipeline.",
    },
  ],
  whyWeFit: {
    title: "We script around your methodology — not generic 'coach content.'",
    body: (
      <>
        <p>
          The difference between us and a generic content agency: we onboard on YOUR framework. Your specific
          terminology, your case studies, your offer structure. Every piece is written to attract the kind of
          client you already convert.
        </p>
        <p>
          Two hours of your time — once — and your inbound pipeline runs through every platform your prospects
          scroll.
        </p>
      </>
    ),
    bullets: [
      "Scripts reflect your actual methodology, not industry platitudes",
      "Content calendar aligned with your launch cycle and pricing pages",
      "Authority compounds — your face, on every platform, every week",
      "$2k-10k/mo for what would take you 10+ hours/week to produce",
    ],
  },
  outcomes: [
    { metric: '30+', label: 'pieces / month in your voice' },
    { metric: '4×', label: 'typical posting cadence increase' },
    { metric: '14d', label: 'from kickoff to live posts' },
    { metric: '30min', label: 'weekly review (your only ongoing time)' },
  ],
  faq: [
    {
      q: "Will the AI sound like me? I'm not a polished speaker.",
      a: "Yes — and that's the point. We capture your actual cadence, not a corporate version of you. Friends and clients regularly can't tell the difference.",
    },
    {
      q: 'I have proprietary frameworks — will you reveal them in scripts?',
      a: "We script the demonstration of value, not the framework itself. Hooks, examples, mini case studies, methodology references — yes. The full IP behind your paid program — no. We work this out in onboarding.",
    },
    {
      q: 'Can my assistant or chief of staff handle the weekly review?',
      a: 'Yes. Most clients delegate the approval workflow after month 2. We work with your team directly if you prefer.',
    },
  ],
};

export default function Page() {
  return <IndustryPage config={CONFIG} />;
}
