import type { Metadata } from 'next';
import { ComparisonPage, type ComparisonConfig } from '@/components/templates/ComparisonPage';

export const metadata: Metadata = {
  title: 'DFY Content vs doing it yourself — The hidden cost of DIY content',
  description: 'DIY content looks free until you measure your own hours. We do the math. The honest verdict on when DIY actually wins.',
};

const CONFIG: ComparisonConfig = {
  competitor: 'Doing it yourself',
  hero: {
    eyebrow: 'vs DIY',
    h1: (
      <>
        DFY Content <span style={{ color: '#6c5ce7' }}>vs doing it yourself</span>
      </>
    ),
    sub: "The most expensive option, measured in your hours. We do the math — and tell you when DIY is honestly the right call.",
  },
  rows: [
    { attribute: 'Monthly cost', us: '$2k - $20k', them: '$0 (just your time)', winner: 'them' },
    { attribute: 'Your time per piece', us: '~1 min approval', them: '30-90 min (write, film, edit, post)', winner: 'us' },
    { attribute: 'Consistency', us: 'Weekly cadence, locked', them: 'Drops within 30 days for most', winner: 'us' },
    { attribute: 'Production quality', us: 'Broadcast-grade', them: 'Whatever you can manage', winner: 'us' },
    { attribute: 'Scripting expertise', us: 'Human writers daily', them: 'Whatever you write', winner: 'us' },
    { attribute: 'Editing expertise', us: 'Pro editors', them: 'Whatever you learn', winner: 'us' },
    { attribute: 'Strategic input', us: 'Built in', them: 'You research / improvise', winner: 'us' },
    { attribute: 'Emotional cost', us: 'Zero — you never film', them: 'High — most quit', winner: 'us' },
    { attribute: 'When it actually works', us: 'Always (if budget fits)', them: 'When you genuinely love it', winner: 'tie' },
  ],
  verdict: {
    title: 'Time is the most expensive thing you own.',
    body: (
      <>
        <p>
          DIY content is free on the books and expensive in reality. If a founder is worth $200/hour to their business, a 30-piece content month at 30 minutes per piece is $3,000 of their time — assuming they actually do it. Most don&rsquo;t.
        </p>
        <p>
          The math we&rsquo;ve watched play out: founders try DIY for 30-60 days, burn out, stop. The cost wasn&rsquo;t financial. It was attention. They lost 30-60 days of execution on the actual business while filming TikToks that flopped.
        </p>
        <p>
          DIY wins when you genuinely enjoy the process. If filming, scripting, and editing energize you, the marginal time cost is recreation, not work. That&rsquo;s a real category and we won&rsquo;t talk you out of it.
        </p>
      </>
    ),
    whenThem: "You actually enjoy filming. You'd be on social anyway. The output IS the business (e.g. you ARE a creator). The marginal hour spent on content is fun, not friction.",
    whenUs: "You should post but won't. You've tried DIY and abandoned it twice. The business needs the visibility but your week doesn't have a 4-hour filming block in it.",
  },
};

export default function Page() {
  return <ComparisonPage config={CONFIG} slug="doing-it-yourself" />;
}
