import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Terms of Service — DFY Content',
  description: 'Terms governing your use of DFY Content website and services.',
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'May 24, 2026';

/**
 * COPY: Placeholder structure. REQUIRES LAWYER REVIEW.
 * Bot should fill from a standard SaaS / service contract template,
 * plus DFY-specific clauses about AI-generated likeness and IP ownership.
 */
const SECTIONS = [
  { h: 'Acceptance of terms', b: '[Copy needed.]' },
  { h: 'Description of service', b: '[Copy needed — describe the marketing website and the application/qualifier process. Service contracts for actual content production are separate signed agreements.]' },
  { h: 'Eligibility', b: '[Copy needed — must be 18+, must be legally authorized to bind your business.]' },
  { h: 'User responsibilities', b: '[Copy needed — accurate information on the qualifier, no abusive or fraudulent use.]' },
  { h: 'Intellectual property — your likeness', b: '[Copy needed — DFY-specific: client retains ownership of their face, voice, and produced content. DFY retains the right to display approved samples in case studies with consent. AI clone may not be used to impersonate the client outside the agreed scope.]' },
  { h: 'Intellectual property — our materials', b: '[Copy needed — website content, design, scripts written by our team, methodologies. DFY ownership.]' },
  { h: 'AI-generated content disclosure', b: '[Copy needed — content delivered may be generated using AI tools. Client warrants they have consented to that use of their likeness for the production scope.]' },
  { h: 'Payment terms', b: '[Copy needed — refer to the signed service contract for actual payment terms. The website does not transact.]' },
  { h: 'Termination', b: '[Copy needed — when we may terminate, when the client may, post-termination data handling.]' },
  { h: 'Warranties and disclaimers', b: '[Copy needed — standard disclaimers for service businesses + AI-specific disclaimers.]' },
  { h: 'Limitation of liability', b: '[Copy needed.]' },
  { h: 'Indemnification', b: '[Copy needed.]' },
  { h: 'Governing law', b: '[Copy needed — jurisdiction.]' },
  { h: 'Changes to these terms', b: '[Copy needed.]' },
  { h: 'Contact', b: 'Questions about these terms: hello@dfycontent.io.' },
];

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Legal', href: '/legal/privacy' },
  { label: 'Terms' },
];

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Legal"
          title="Terms of Service"
          subtitle={`Last updated: ${LAST_UPDATED}`}
          breadcrumbs={BREADCRUMBS}
          align="left"
        />

        <Section>
          <Container>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <div
                style={{
                  padding: 18,
                  background: '#fff7ed',
                  border: '1px solid #fed7aa',
                  borderRadius: theme.radius.lg,
                  marginBottom: 40,
                  fontSize: 13,
                  color: '#9a3412',
                  lineHeight: 1.6,
                }}
              >
                <strong>Placeholder content.</strong> Sections marked with [Copy needed] require legal review before publishing.
              </div>

              {SECTIONS.map((s, i) => (
                <section key={i} style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700, margin: 0, marginBottom: 12, letterSpacing: '-0.015em' }}>
                    {i + 1}. {s.h}
                  </h2>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: theme.palette.fg }}>{s.b}</p>
                </section>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
