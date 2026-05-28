import type { Metadata } from 'next';
import { ComparisonPage, type ComparisonConfig } from '@/components/templates/ComparisonPage';

export const metadata: Metadata = {
  title: 'DFY Content vs Synthesia — Service vs enterprise SaaS',
  description: 'Synthesia is an enterprise AI avatar platform for internal video. DFY Content is a marketing content service. Side-by-side + honest verdict.',
};

const CONFIG: ComparisonConfig = {
  competitor: 'Synthesia',
  competitorUrl: 'https://synthesia.io',
  hero: {
    eyebrow: 'vs Synthesia',
    h1: (
      <>
        DFY Content <span style={{ color: '#6c5ce7' }}>vs Synthesia</span>
      </>
    ),
    sub: "Synthesia is built for enterprise internal video — training, comms, onboarding. DFY Content is built for marketing — the founder's face on social. Different products, often confused.",
  },
  rows: [
    { attribute: 'Primary use case', us: 'External marketing (social media)', them: 'Internal video (training, comms)', winner: 'tie' },
    { attribute: 'Avatar type', us: 'Your real face & voice', them: 'Stock avatars or custom (paid tier)', winner: 'us' },
    { attribute: 'Production model', us: 'Service (we write, produce, post)', them: 'SaaS (you operate it)', winner: 'us' },
    { attribute: 'Scripting', us: 'Human writers, included', them: 'You provide scripts', winner: 'us' },
    { attribute: 'Output destinations', us: 'TikTok / IG / YT / LI / X', them: 'Internal LMS, training portals', winner: 'tie' },
    { attribute: 'Monthly cost', us: '$2k - $20k', them: '$22 - $500+', winner: 'them' },
    { attribute: 'Custom avatar setup', us: '~2hr session, day 2', them: 'Optional, mid-tier feature', winner: 'tie' },
    { attribute: 'Best for', us: 'Founders building public brand', them: 'L&D teams, comms', winner: 'tie' },
  ],
  verdict: {
    title: 'Different sport, different bat.',
    body: (
      <>
        <p>
          Synthesia is excellent for what it&rsquo;s built for: training videos, internal comms, onboarding flows. It scales to thousands of videos a year inside an enterprise. The avatars are studio-quality.
        </p>
        <p>
          But Synthesia isn&rsquo;t designed for the founder posting on TikTok. Their workflow assumes a scriptwriter, an instructional designer, a comms manager. Not a single operator trying to post 30 pieces a month on three platforms.
        </p>
        <p>
          We&rsquo;re built for the latter. Different problem, different shape.
        </p>
      </>
    ),
    whenThem: "You're running L&D, internal comms, or product training at an enterprise. You need scalable video for a team that already has a content workflow. Synthesia wins.",
    whenUs: "You're a founder, operator, or solo creator. You want your real face on social media. Synthesia is overbuilt and under-scoped for that. We're built for it.",
  },
};

export default function Page() {
  return <ComparisonPage config={CONFIG} slug="synthesia" />;
}
