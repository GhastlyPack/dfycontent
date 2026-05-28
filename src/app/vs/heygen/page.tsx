import type { Metadata } from 'next';
import { ComparisonPage, type ComparisonConfig } from '@/components/templates/ComparisonPage';

export const metadata: Metadata = {
  title: 'DFY Content vs HeyGen — Service vs DIY tool',
  description: 'HeyGen is an AI video tool you operate yourself. DFY Content is a done-for-you service. Side-by-side comparison + the honest verdict.',
};

const CONFIG: ComparisonConfig = {
  competitor: 'HeyGen',
  competitorUrl: 'https://heygen.com',
  hero: {
    eyebrow: 'vs HeyGen',
    h1: (
      <>
        DFY Content <span style={{ color: '#6c5ce7' }}>vs HeyGen</span>
      </>
    ),
    sub: "HeyGen is a tool. You operate it. DFY Content is a service that uses similar tools — but also writes the scripts, runs the production, and posts the content. Here's when each makes sense.",
  },
  rows: [
    { attribute: 'Category', us: 'Service (done-for-you)', them: 'SaaS tool (DIY)', winner: 'us' },
    { attribute: 'Time to first post', us: '14 days, hands-off after day 2', them: 'Same day, if you have a script', winner: 'them' },
    { attribute: 'Scripting included', us: 'Yes — human writers', them: 'No — you write or hire elsewhere', winner: 'us' },
    { attribute: 'Editing / posting', us: 'Included end-to-end', them: 'You handle it', winner: 'us' },
    { attribute: 'Monthly cost', us: '$2k - $20k', them: '~$24 - $720/mo', winner: 'them' },
    { attribute: 'Your time per piece', us: '~1 min approval', them: '15-30 min script + edit + post', winner: 'us' },
    { attribute: 'Quality ceiling', us: 'High — human editorial', them: 'High if you operate well', winner: 'tie' },
    { attribute: 'Strategy / cadence', us: 'We own it', them: "You own it", winner: 'us' },
    { attribute: 'Best for', us: 'Founders who won\'t operate a tool', them: 'Operators who will', winner: 'tie' },
  ],
  verdict: {
    title: "HeyGen is cheaper. We are faster, end-to-end.",
    body: (
      <>
        <p>
          HeyGen wins on raw cost. Their plans top out at ~$720/month for enterprise. Ours start at $2,000.
          That gap is roughly &mdash; not coincidentally &mdash; the cost of a part-time scriptwriter and editor.
          You can replicate what we do by buying HeyGen plus hiring two people. Some founders should.
        </p>
        <p>
          We&rsquo;re a better fit when your bottleneck isn&rsquo;t the tool &mdash; it&rsquo;s the operation. Strategy, scripting, posting,
          consistency. If you&rsquo;ve already tried a tool and abandoned it after three weeks, the tool wasn&rsquo;t the problem.
        </p>
      </>
    ),
    whenThem: "You have 30 min/week to operate a content tool, you've written scripts before, and you actually enjoy the posting workflow. HeyGen at $99/mo is the right call.",
    whenUs: "You have less than 1 hour/week to think about content, no scriptwriter, and a track record of starting content systems and abandoning them. The service model is built for you.",
  },
  faq: [
    {
      q: 'Can I use HeyGen and DFY Content together?',
      a: 'In principle yes, but in practice the workflows overlap. Most clients pick one. If you have a HeyGen library already, we can ingest the voice and avatar work to skip parts of our onboarding.',
    },
    {
      q: 'What about the AI clone quality?',
      a: "Comparable. Both use similar underlying voice cloning tech. We use ElevenLabs Pro voice clones (one per client). HeyGen uses their proprietary model. Realism is close enough that it's not a deciding factor.",
    },
    {
      q: 'Why so much more expensive?',
      a: "The price gap is the cost of human labor — scripting, editing, posting, strategy. Removing all of that from your plate is what the premium pays for. If your time is worth less than ~$80/hr to you, HeyGen is more economical.",
    },
  ],
};

export default function Page() {
  return <ComparisonPage config={CONFIG} slug="heygen" />;
}
