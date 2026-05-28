import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button } from '@/components/atoms';
import { Reveal } from '@/components/motion-atoms';
import { FAQAccordion, type FAQItem } from '@/components/FAQAccordion';
import { theme } from '@/lib/theme';
import { jsonLd, faqSchema, breadcrumbSchema, SITE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'FAQ — DFY Content',
  description:
    'Everything we get asked about the service: the AI clone, scripting, pricing, contracts, ownership, results. Plain answers.',
};

/**
 * COPY: 30 questions across 6 categories.
 * Bot can rewrite any individual Q/A while preserving the structure.
 * Each Q stays a real question a buyer would ask. Each A is 60-150 words.
 */
type Category = { name: string; items: FAQItem[] };

const CATEGORIES: Category[] = [
  {
    name: 'The product',
    items: [
      { q: 'What does DFY Content actually do?', a: "We're a done-for-you short-form video service. You spend ~2 hours with us in a studio session (in person or remote). We clone your face and voice with AI, write every script, produce every video, edit it, and publish to every platform you're on. You approve everything before it goes live. The cycle runs weekly, forever." },
      { q: 'How is this different from HeyGen, Synthesia, or Captions?', a: 'Those are tools — you operate them yourself. We are a service that uses similar tools, but the difference is what surrounds the model: strategy, scripting, editing, posting, ongoing review. With HeyGen you save filming time. With us you save filming time AND the time of running a content operation.' },
      { q: 'Is the AI clone realistic?', a: "Close friends regularly mistake our cloned output for actual filming. The realism comes from the 1-2 hour capture session — we get enough source material that the model produces output that sounds like you, paces like you, and looks like you. Voice clone is trained on a dedicated ElevenLabs Pro account per client." },
      { q: 'What platforms do you publish to?', a: 'TikTok, Instagram Reels, YouTube Shorts, LinkedIn, X (Twitter). Whichever combination is in your package. We do not publish long-form YouTube (over 60 seconds) — that requires a different production pipeline and is not part of v1.' },
      { q: 'Do you produce content other than short-form video?', a: 'Not yet. The product is short-form talking-head video — the format that gets the most reach for the least investment. We may add long-form video, written posts, or carousels in future, but the AI clone tech is purpose-built for talking-head video right now.' },
    ],
  },
  {
    name: 'Scripting & strategy',
    items: [
      { q: 'Who writes the scripts?', a: 'Our team of human writers. They read your brand, your audience, your past content, and what is converting in your niche this week. They write every script — hook, body, CTA — for your approval. AI delivers the lines. Humans write the lines.' },
      { q: "Can I write the scripts myself?", a: "Yes. Plenty of clients prefer that route, especially early on. We'll still review, polish for our v2 punctuation playbook (ElevenLabs reads punctuation as performance), and run production. The scripting service is included whether or not you use it." },
      { q: 'How do you know what to write about?', a: "Onboarding brief covers your audience, your offer, recent wins, stories. From there we build a 30-day content calendar — hooks aimed at your niche, topics tied to your sales cycle. Each week we draft against that calendar and incorporate feedback from what is performing." },
      { q: 'Do I get to approve scripts before they go into production?', a: 'Always. You see scripts before voice generation. You see voice + first-frame before animation. You see final cuts before publishing. Three approval gates, by design.' },
      { q: 'What if I hate a script?', a: 'Kill it. Send notes. We revise. We turn revisions in 24 hours. If we send a draft you reject, it costs you nothing — the production cost only kicks in when you approve.' },
    ],
  },
  {
    name: 'Pricing & contracts',
    items: [
      { q: 'How much does it cost?', a: 'Three tiers. Starter at $2-5k/mo, Pro at $5-10k/mo, Premium at $10-20k+/mo. The right tier depends on platforms and volume — the 60-second qualifier routes you to it accurately.' },
      { q: 'Why is the floor $2k/mo?', a: 'Production cost. Scripting (human writers), ElevenLabs Pro account, AI generation (image + animation), human editing, posting. Below $2k we cannot produce work we are willing to put our name on. We say no to lower budgets — it protects both sides.' },
      { q: 'Is there a contract term?', a: '3 months minimum. The studio session, voice clone, and onboarding work do not pay back inside of one month. After the initial term, we go month-to-month with 30 days notice.' },
      { q: 'Can I cancel? Do I keep the clone?', a: "Yes and yes. You own your face, your voice, your scripts. Cancel anytime after the minimum term and you keep the trained clone and every script we have written for you. We do not lock your likeness up." },
      { q: 'Do you offer refunds?', a: "If we don't deliver what's in the contract — yes. We've never issued one. The qualifier on the home page is the first refund-prevention mechanism: we sort out fit before money changes hands." },
    ],
  },
  {
    name: 'Time & process',
    items: [
      { q: 'How much of my time does this actually take?', a: 'Two hours, once, for the studio session. Then about 30 minutes per week of review (approving scripts, approving cuts). That is the entire ongoing time commitment. If you want to be more involved — script notes, topic input — the door is open. Most clients trust the process by month 2.' },
      { q: 'How long until my first post is live?', a: '14 days from kickoff. Day 1-2 studio session. Day 3-7 clone + initial scripts. Day 8-12 production. Day 13-14 your final approval. Day 14 we publish.' },
      { q: 'What does the studio session look like?', a: "In-person or remote. 1-2 hours. We capture your face from multiple angles in your usual setting, and capture your voice reading ~20-30 prepared sentences. It's deliberately conversational, not a corporate shoot. The output is the corpus that trains your clone forever." },
      { q: 'What happens if I miss a script approval window?', a: "We hold the queue. If you go on vacation, we pause and resume on your return. We do not auto-publish scripts you have not approved — that defeats the whole point." },
      { q: 'How do you handle revisions?', a: "Three rounds per piece. Inline notes via the dashboard. Most pieces go live on round 1. Revisions return within 24 hours." },
    ],
  },
  {
    name: 'The AI specifically',
    items: [
      { q: 'Is this a deepfake?', a: "Technically it uses the same underlying technology (face + voice cloning), but every piece is consented, scripted, and approved by you. A deepfake by definition impersonates someone without consent. This is the opposite — you commission every output." },
      { q: 'Will my audience know it is AI?', a: "Most do not. The realism is high enough that even close friends mistake it for actual filming. We are not hiding it — if you want to disclose 'made with AI', we support that — but we are also not advertising it for you." },
      { q: 'What about content authenticity guidelines on TikTok / Instagram?', a: "Current platform policies do not require disclosure for AI-assisted content unless it impersonates real events or misleads. Since the content is you, scripted by your team, with your approval, it sits inside platform terms. We track policy changes and would update guidance if that shifts." },
      { q: 'Can the AI go off-script?', a: 'No. Each piece is a closed loop: human-written script → voice clone reads it exactly → animation matches that audio. The model has no autonomy. It is a delivery vehicle for content you approved.' },
      { q: 'What tools do you use behind the scenes?', a: 'ElevenLabs v2 multilingual for voice (one dedicated Pro account per client). Gemini / Nanobanana Pro for the character reference sheet and first-frame variants. Creatify Aurora for animation. Custom ffmpeg pipelines for stitching, color, and captions. Full stack documented internally.' },
    ],
  },
  {
    name: 'Results & guarantees',
    items: [
      { q: 'What kind of results should I expect?', a: "Honest answer: depends on your offer, audience, and starting point. Median client goes from 1-4 posts/month to 20-30+. Engagement follows posting consistency more than any other factor. We don't promise follower count — we promise output cadence." },
      { q: 'Do you guarantee follower growth?', a: 'No. Anyone who guarantees growth without controlling your business, your offer, or your audience response is selling you something. We control output and quality. Growth is downstream of that plus your offer-market fit.' },
      { q: 'Can I see examples of your output?', a: 'Yes — the customers page has case studies, and we share examples on the qualifier call. We do not publish a portfolio publicly because most clients prefer their face on social be associated with their brand, not ours.' },
      { q: 'What if it does not work for my niche?', a: 'We will tell you on the qualifier. Niches that work best: B2B SaaS, professional services, coaching, consulting, agency owners, operators with personal brands. Niches that struggle: things requiring physical demonstration (product reviews of physical products, hands-on tutorials).' },
      { q: 'Can I get a sample piece before signing?', a: 'No. The capture session is the entire production. We cannot generate a sample without first doing the 1-2 hour studio session, which is part of the engagement. The qualifier + a call is how we both decide.' },
    ],
  },
];

const COPY = {
  hero: {
    eyebrow: 'FAQ',
    h1: 'Every question we get asked, answered.',
    sub: "30 questions across pricing, the AI, contracts, time commitment, and what to expect. Plain language — no marketing fluff.",
  },
  cta: {
    title: 'Still have questions?',
    sub: 'The 60-second qualifier is the fastest way to find out if we\'re a fit. Or reach out below.',
  },
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'FAQ' },
];

export default function FAQPage() {
  // Flatten all FAQs for schema
  const allFAQs: FAQItem[] = CATEGORIES.flatMap((c) => c.items);
  const schema = faqSchema(allFAQs.map((f) => ({ q: f.q, a: f.a })));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: SITE.url },
              { name: 'FAQ', url: `${SITE.url}/faq` },
            ])
          ),
        }}
      />

      <Nav />
      <main>
        <PageHeader
          eyebrow={COPY.hero.eyebrow}
          title={COPY.hero.h1}
          subtitle={COPY.hero.sub}
          breadcrumbs={BREADCRUMBS}
        />

        {/* Categories */}
        <Section>
          <Container>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              {CATEGORIES.map((cat, ci) => (
                <Reveal key={cat.name} delay={ci * 0.05}>
                  <div style={{ marginBottom: 56 }}>
                    <h2
                      style={{
                        fontFamily: theme.fonts.display,
                        fontSize: 'clamp(22px, 3vw, 28px)',
                        fontWeight: 700,
                        margin: 0,
                        marginBottom: 8,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {cat.name}
                    </h2>
                    <FAQAccordion items={cat.items} defaultOpenIndex={ci === 0 ? 0 : -1} />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                <h2 className="h-section" style={{ margin: 0 }}>{COPY.cta.title}</h2>
                <p className="t-lead" style={{ margin: '12px 0 24px' }}>{COPY.cta.sub}</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button href="/apply" size="lg">Start qualifying  →</Button>
                  <Button href="/contact" variant="ghost" size="lg">Contact us</Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
