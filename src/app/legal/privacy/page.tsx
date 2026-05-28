import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/atoms';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Privacy Policy — DFY Content',
  description: 'How DFY Content collects, uses, and protects your data.',
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'May 24, 2026';

/**
 * COPY: Placeholder structure with section headers.
 * REQUIRES LAWYER REVIEW before publishing. Bot should fill in
 * actual policy text per section based on a standard SaaS template
 * (we use Customer.io, Vercel, Calendly, Supabase, ElevenLabs, Gemini, Replicate).
 */
const SECTIONS = [
  { h: 'Introduction', b: '[Copy needed — 1 paragraph: who we are, what this policy covers, effective date.]' },
  { h: 'Information we collect', b: '[Copy needed — list every category: contact info from the qualifier (name, email, phone, social handle), questionnaire answers (content cadence, issues, budget, setup commitment), booking data via Calendly, marketing analytics. Cite Customer.io for storage.]' },
  { h: 'How we use your information', b: '[Copy needed — service delivery, lead qualification, communication, marketing (with consent), analytics, fraud prevention.]' },
  { h: 'Sharing and third parties', b: '[Copy needed — list every processor: Vercel (hosting), Customer.io (CRM), Calendly (scheduling), Supabase (production app), ElevenLabs (voice), Gemini/Nanobanana (images), Creatify Aurora (video), Replicate (misc models). Link to each processor\'s privacy policy.]' },
  { h: 'Cookies and tracking', b: '[Copy needed — what cookies we set, what analytics tools we use, opt-out mechanism.]' },
  { h: 'Data retention', b: '[Copy needed — how long we keep contact records, signed-client data, voice clone data. Note: client-owned face/voice data follows the contract, not this policy.]' },
  { h: 'Your rights', b: '[Copy needed — GDPR/CCPA rights: access, deletion, portability, correction, opt-out of sale. How to exercise them. Response timeline.]' },
  { h: 'Children', b: 'DFY Content is not directed at children under 16. We do not knowingly collect data from anyone under 16.' },
  { h: 'Changes to this policy', b: '[Copy needed — how we notify of changes, where the latest version lives, how the effective date is updated.]' },
  { h: 'Contact', b: 'Questions about this policy: hello@dfycontent.io.' },
];

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Legal', href: '/legal/privacy' },
  { label: 'Privacy' },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Legal"
          title="Privacy Policy"
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
                <strong>Placeholder content.</strong> Sections marked with [Copy needed] require legal review before publishing. Do not treat this as legal advice.
              </div>

              {SECTIONS.map((s, i) => (
                <section key={i} style={{ marginBottom: 32 }}>
                  <h2
                    style={{
                      fontFamily: theme.fonts.display,
                      fontSize: 22,
                      fontWeight: 700,
                      margin: 0,
                      marginBottom: 12,
                      letterSpacing: '-0.015em',
                    }}
                  >
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
