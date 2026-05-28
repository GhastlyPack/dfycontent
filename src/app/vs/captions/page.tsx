import type { Metadata } from 'next';
import { ComparisonPage, type ComparisonConfig } from '@/components/templates/ComparisonPage';

export const metadata: Metadata = {
  title: 'DFY Content vs Captions — Service vs mobile editing app',
  description: 'Captions is a mobile-first AI video creation app for creators. DFY Content is a done-for-you service. Comparison for founders deciding between them.',
};

const CONFIG: ComparisonConfig = {
  competitor: 'Captions',
  competitorUrl: 'https://captions.ai',
  hero: {
    eyebrow: 'vs Captions',
    h1: (
      <>
        DFY Content <span style={{ color: '#6c5ce7' }}>vs Captions</span>
      </>
    ),
    sub: "Captions is a mobile-first AI editing app — captioning, repurposing, light cloning. DFY Content is a service that does the whole operation. Comparison for the founders torn between them.",
  },
  rows: [
    { attribute: 'Format', us: 'Service', them: 'Mobile / desktop app', winner: 'tie' },
    { attribute: 'Primary use', us: 'End-to-end content production', them: 'Editing + light AI features', winner: 'us' },
    { attribute: 'You film?', us: 'Once, for 2 hours, ever', them: 'Yes, ongoing', winner: 'us' },
    { attribute: 'Scripting', us: 'Human writers, included', them: 'You write', winner: 'us' },
    { attribute: 'AI avatar', us: 'Full clone (face + voice)', them: 'Light cloning features', winner: 'us' },
    { attribute: 'Editing', us: 'Our editors handle it', them: 'You handle with their tools', winner: 'us' },
    { attribute: 'Posting', us: 'We post to every platform', them: 'You post', winner: 'us' },
    { attribute: 'Monthly cost', us: '$2k - $20k', them: '$10 - $100', winner: 'them' },
  ],
  verdict: {
    title: 'Captions is a tool. We are the operation.',
    body: (
      <>
        <p>
          Captions is a great product if you&rsquo;re already a creator who films regularly and wants to speed up the editing and captioning workflow. It&rsquo;s built for someone holding the camera.
        </p>
        <p>
          DFY Content is built for someone who hasn&rsquo;t held the camera in months and never will. Different user, different price tier, different value prop. Both can be the right answer — depending on which one you are.
        </p>
      </>
    ),
    whenThem: "You film weekly or daily, you enjoy the process, you just want better editing tools. Captions at $20-100/mo is the right call.",
    whenUs: "You haven't filmed in 60 days. You won't film next week either. The bottleneck isn't editing speed — it's the entire operation. We replace it.",
  },
};

export default function Page() {
  return <ComparisonPage config={CONFIG} slug="captions" />;
}
