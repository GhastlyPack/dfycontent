'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, Button } from '@/components/atoms';
import { Reveal } from '@/components/motion-atoms';
import { CountUp } from '@/components/motion-atoms';
import { theme } from '@/lib/theme';

const COPY = {
  hero: {
    eyebrow: 'Free tool',
    h1: 'Content ROI Calculator',
    sub: 'See what your DIY content is actually costing you — and what done-for-you would save.',
  },
  // Bot can rewrite the explanation below.
  explanation: [
    "Most founders look at content as a fixed cost: $X per month for a tool, or $0 for DIY. The honest math is different — DIY content is the most expensive option because it's measured in your time, and your time has a market value.",
    "This calculator does that math. Enter your hourly value, your time per piece, and your desired cadence. We compare DIY against done-for-you at our entry tier and let you decide.",
  ],
};

function field(label: string): React.CSSProperties {
  return {};
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <label style={{ fontFamily: theme.fonts.body, fontSize: 14, fontWeight: 600, color: theme.palette.fg }}>
          {label}
        </label>
        <span style={{ fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700, color: theme.palette.accent, letterSpacing: '-0.015em' }}>
          {value}
          <span style={{ fontSize: 14, color: theme.palette.fgMuted, marginLeft: 4 }}>{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: theme.palette.accent,
        }}
      />
    </div>
  );
}

export default function ContentROICalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState(200); // $/hr
  const [minPerPiece, setMinPerPiece] = useState(45); // minutes per piece end-to-end
  const [piecesPerWeek, setPiecesPerWeek] = useState(4);

  const calc = useMemo(() => {
    const hoursPerWeek = (piecesPerWeek * minPerPiece) / 60;
    const hoursPerMonth = hoursPerWeek * 4.33;
    const monthlyDIYCost = hoursPerMonth * hourlyRate;
    const monthlyDFY = 2000; // entry tier floor
    const savedMonthly = Math.max(0, monthlyDIYCost - monthlyDFY);
    const savedAnnual = savedMonthly * 12;
    const hoursSavedAnnual = hoursPerMonth * 12;
    return {
      hoursPerWeek: Math.round(hoursPerWeek * 10) / 10,
      hoursPerMonth: Math.round(hoursPerMonth),
      monthlyDIYCost: Math.round(monthlyDIYCost),
      monthlyDFY,
      savedMonthly: Math.round(savedMonthly),
      savedAnnual: Math.round(savedAnnual),
      hoursSavedAnnual: Math.round(hoursSavedAnnual),
      pickDFY: monthlyDIYCost > monthlyDFY,
    };
  }, [hourlyRate, minPerPiece, piecesPerWeek]);

  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow={COPY.hero.eyebrow}
          title={COPY.hero.h1}
          subtitle={COPY.hero.sub}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'ROI Calculator' },
          ]}
        />

        <Section>
          <Container>
            <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {COPY.explanation.map((p, i) => (
                <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: theme.palette.fgMuted }}>
                  {p}
                </p>
              ))}
            </div>
          </Container>
        </Section>

        {/* Calculator */}
        <Section style={{ background: theme.palette.bgSubtle }}>
          <Container>
            <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: 24 }} className="dfy-calc-grid">
              {/* Inputs */}
              <Reveal>
                <div style={{ background: theme.palette.surface, border: `1px solid ${theme.palette.borderSoft}`, borderRadius: theme.radius.xl, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, boxShadow: theme.shadow.card }}>
                  <h2 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em' }}>
                    Your inputs
                  </h2>
                  <Slider label="Your hourly value" value={hourlyRate} onChange={setHourlyRate} min={50} max={1000} step={25} unit="/hr" />
                  <Slider label="Time per finished piece" value={minPerPiece} onChange={setMinPerPiece} min={10} max={180} step={5} unit="min" />
                  <Slider label="Pieces per week (your goal)" value={piecesPerWeek} onChange={setPiecesPerWeek} min={1} max={14} step={1} unit="/wk" />

                  <div
                    style={{
                      padding: 16,
                      background: theme.palette.bgSubtle,
                      borderRadius: theme.radius.md,
                      fontFamily: theme.fonts.body,
                      fontSize: 14,
                      color: theme.palette.fgMuted,
                      lineHeight: 1.55,
                    }}
                  >
                    <strong style={{ color: theme.palette.fg }}>Your DIY time: </strong>
                    {calc.hoursPerWeek}hrs/week, {calc.hoursPerMonth}hrs/month
                  </div>
                </div>
              </Reveal>

              {/* Results */}
              <Reveal delay={0.1}>
                <div style={{ background: `linear-gradient(135deg, ${theme.palette.accentBg} 0%, ${theme.palette.surface} 100%)`, border: `2px solid ${theme.palette.borderAccent}`, borderRadius: theme.radius.xl, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, boxShadow: theme.shadow.card }}>
                  <h2 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em' }}>
                    The honest math
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ padding: 16, background: theme.palette.surface, borderRadius: theme.radius.md, border: `1px solid ${theme.palette.borderSoft}` }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.fgMuted }}>
                        DIY cost / mo
                      </div>
                      <div style={{ fontFamily: theme.fonts.display, fontSize: 36, fontWeight: 700, color: theme.palette.fg, marginTop: 4, letterSpacing: '-0.025em', lineHeight: 1 }}>
                        $<CountUp to={calc.monthlyDIYCost} duration={0.8} />
                      </div>
                    </div>
                    <div style={{ padding: 16, background: theme.palette.surface, borderRadius: theme.radius.md, border: `1px solid ${theme.palette.borderSoft}` }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.fgMuted }}>
                        DFY entry tier
                      </div>
                      <div style={{ fontFamily: theme.fonts.display, fontSize: 36, fontWeight: 700, color: theme.palette.fg, marginTop: 4, letterSpacing: '-0.025em', lineHeight: 1 }}>
                        $2,000
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: 20, background: theme.palette.surface, borderRadius: theme.radius.md, border: `1px solid ${theme.palette.borderSoft}` }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.accent }}>
                      Annual savings with DFY
                    </div>
                    <div style={{ fontFamily: theme.fonts.display, fontSize: 48, fontWeight: 800, color: calc.pickDFY ? theme.palette.accent : theme.palette.fgMuted, marginTop: 4, letterSpacing: '-0.03em', lineHeight: 1 }}>
                      $<CountUp to={calc.savedAnnual} duration={1.0} />
                    </div>
                    <div style={{ marginTop: 8, fontSize: 13, color: theme.palette.fgMuted }}>
                      Plus <strong style={{ color: theme.palette.fg }}>{calc.hoursSavedAnnual}</strong> hours back, every year.
                    </div>
                  </div>

                  <div
                    style={{
                      padding: 16,
                      borderRadius: theme.radius.md,
                      background: calc.pickDFY ? theme.palette.accentBg : '#fef3c7',
                      border: `1px solid ${calc.pickDFY ? theme.palette.borderAccent : '#fde68a'}`,
                      fontFamily: theme.fonts.body,
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: theme.palette.fg,
                    }}
                  >
                    <strong>{calc.pickDFY ? 'The math says DFY.' : 'The math says DIY (or a different tier).'}</strong>{' '}
                    {calc.pickDFY
                      ? `If your time really is worth $${hourlyRate}/hr, every month of DIY at this cadence costs $${calc.savedMonthly} more than our entry tier.`
                      : `At this hourly rate and cadence, DIY makes sense purely on cost. Real reasons to still consider us: consistency, quality ceiling, and the fact you've probably abandoned this cadence twice before.`}
                  </div>

                  <Button href="/apply" full size="lg">
                    Run the qualifier  →
                  </Button>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Method */}
        <Section>
          <Container>
            <Reveal>
              <div style={{ maxWidth: 720, margin: '0 auto' }}>
                <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, margin: 0, letterSpacing: '-0.015em' }}>
                  How we calculate it
                </h2>
                <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: theme.palette.fgMuted }}>
                  Monthly hours = (pieces/week × minutes/piece × 4.33 weeks) ÷ 60. <br />
                  DIY cost = monthly hours × your hourly value. <br />
                  Savings = DIY cost − DFY entry tier ($2,000/mo). <br />
                </p>
                <p style={{ marginTop: 12, fontSize: 14, color: theme.palette.fgSubtle, lineHeight: 1.6 }}>
                  Conservative assumptions: we use our floor tier ($2k) regardless of platform count.
                  We don&apos;t add the soft costs (mental load, context switching, dropped quality on rushed pieces).
                  Real-world DIY almost always costs more than this calculator shows.
                </p>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
