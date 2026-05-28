import type { Metadata } from 'next';
import { ComparisonPage, type ComparisonConfig } from '@/components/templates/ComparisonPage';

export const metadata: Metadata = {
  title: 'DFY Content vs hiring a content agency — Cost & time comparison',
  description: 'Hiring a full content agency runs $20-40k/mo with a 4-person team. DFY Content replaces 4 of those 5 roles using AI. Honest cost + time comparison.',
};

const CONFIG: ComparisonConfig = {
  competitor: 'Hiring an agency',
  hero: {
    eyebrow: 'vs Hiring a content agency',
    h1: (
      <>
        DFY Content <span style={{ color: '#6c5ce7' }}>vs hiring an agency</span>
      </>
    ),
    sub: 'A full content team runs $20-40k/month. We replace the strategist, scriptwriter, videographer, and editor — leaving only you (for two hours, once).',
  },
  rows: [
    { attribute: 'Monthly cost', us: '$2k - $20k', them: '$20k - $40k', winner: 'us' },
    { attribute: 'Ramp time', us: '14 days to first live post', them: '60-120 days (hiring, onboarding)', winner: 'us' },
    { attribute: 'Your time per week', us: '~30 min review', them: '4-8 hr (filming, meetings)', winner: 'us' },
    { attribute: 'Production capacity', us: '30+ pieces/mo (Pro tier)', them: '10-30 pieces/mo typical', winner: 'us' },
    { attribute: 'Strategy quality', us: 'Comparable', them: 'Senior strategist on staff', winner: 'tie' },
    { attribute: 'Scripting', us: 'Human writers, AI delivers', them: 'Human writers, you deliver', winner: 'tie' },
    { attribute: 'Editing', us: 'Our editors, AI-assisted', them: 'Their editors, manual', winner: 'us' },
    { attribute: 'Headcount risk', us: 'None (service)', them: 'Hiring, firing, turnover', winner: 'us' },
    { attribute: 'Contract flexibility', us: '3 mo min, then monthly', them: '12 mo retainers typical', winner: 'us' },
  ],
  verdict: {
    title: 'We replace 4 of the 5 roles. Senior strategy is the only thing we don\'t.',
    body: (
      <>
        <p>
          A traditional content agency assembles a team: senior strategist, scriptwriter, videographer, editor, social manager. The math works if you want senior-level strategic thinking and have the budget for it.
        </p>
        <p>
          AI removes the production bottleneck for everything below the strategist. Scripting, capture, editing, posting — all of that can be operationalized at a fraction of the headcount cost. What&rsquo;s left is strategy and quality control, which we still do (just not at agency-senior depth).
        </p>
        <p>
          If your bottleneck is &ldquo;I need a senior CMO-level brain on my brand&rdquo; — hire an agency. If it&rsquo;s &ldquo;I need consistent output on social and I have a budget&rdquo; — us.
        </p>
      </>
    ),
    whenThem: "Your brand needs senior strategic positioning, PR alignment, integrated campaigns across paid + organic + content. You have $30k+/mo and prefer full-service.",
    whenUs: "Your strategy is clear, you just need the output engine running. We deliver more content per dollar with the same quality bar for ~5x less.",
  },
};

export default function Page() {
  return <ComparisonPage config={CONFIG} slug="hiring-an-agency" />;
}
