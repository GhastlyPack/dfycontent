'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { theme } from '@/lib/theme';
import type { Budget, Content, Issue, Setup } from '@/lib/types';
import {
  Button,
  Container,
  Eyebrow,
  Field,
  OptionCard,
  ProgressBar,
  Section,
} from '@/components/atoms';

type Screen = 'contact' | 'q1' | 'q2' | 'q3' | 'q4';

type Contact = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  handle?: string;
};

type Answers = {
  content?: Content;
  issues: Issue[];
  budget?: Budget;
  setup?: Setup;
};

const STORAGE_KEY = 'dfy.flow';

export function Flow() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>('contact');
  const [contact, setContact] = useState<Contact>({});
  const [answers, setAnswers] = useState<Answers>({ issues: [] });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        screen?: Screen;
        contact?: Contact;
        answers?: Answers;
      };
      if (parsed.contact) setContact(parsed.contact);
      if (parsed.answers) setAnswers({ ...parsed.answers, issues: parsed.answers.issues ?? [] });
      if (parsed.screen) setScreen(parsed.screen);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ screen, contact, answers }));
    } catch {
      // ignore
    }
  }, [screen, contact, answers]);

  function go(next: Screen | null) {
    setError(null);
    if (next === null) {
      router.push('/');
      return;
    }
    setScreen(next);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function patchContact(k: keyof Contact, v: string) {
    setContact((c) => ({ ...c, [k]: v }));
  }

  async function submitContact() {
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.phone) {
      setError('Please fill in name, email, and phone.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const variant = (typeof window !== 'undefined' && sessionStorage.getItem('lead.variant')) || 'founder';
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'contact',
          contact: {
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            socialHandle: contact.handle ?? '',
          },
          variant,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Failed to save contact info');
      }
      sessionStorage.setItem('lead.email', contact.email);
      sessionStorage.setItem('lead.firstName', contact.firstName);
      sessionStorage.setItem('lead.name', `${contact.firstName} ${contact.lastName}`.trim());
      go('q1');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  async function submitFinal() {
    if (!answers.content || !answers.budget || !answers.setup || !contact.email) {
      setError('Please answer every question.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const variant = (typeof window !== 'undefined' && sessionStorage.getItem('lead.variant')) || 'founder';
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'qualify',
          email: contact.email,
          answers: {
            content: answers.content,
            issues: answers.issues,
            budget: answers.budget,
            setup: answers.setup,
          },
          variant,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Failed to submit');
      }
      const data = (await res.json()) as { qualified: boolean };
      sessionStorage.removeItem(STORAGE_KEY);
      if (data.qualified) {
        router.push('/book');
      } else {
        const reason = answers.budget === '0-2k' ? 'budget' : 'setup';
        router.push(`/dnq?reason=${reason}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setSubmitting(false);
    }
  }

  return (
    <Section>
      <Container>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <AnimatePresence mode="wait">
            {screen === 'contact' && (
              <ScreenWrap key="contact">
                <ContactStep
                  contact={contact}
                  patchContact={patchContact}
                  submit={submitContact}
                  submitting={submitting}
                  error={error}
                  onBack={() => go(null)}
                />
              </ScreenWrap>
            )}
            {screen === 'q1' && (
              <ScreenWrap key="q1">
                <Q1
                  value={answers.content}
                  setValue={(v) => setAnswers((a) => ({ ...a, content: v }))}
                  go={go}
                />
              </ScreenWrap>
            )}
            {screen === 'q2' && (
              <ScreenWrap key="q2">
                <Q2
                  values={answers.issues}
                  setValues={(vs) => setAnswers((a) => ({ ...a, issues: vs }))}
                  go={go}
                />
              </ScreenWrap>
            )}
            {screen === 'q3' && (
              <ScreenWrap key="q3">
                <Q3
                  value={answers.budget}
                  setValue={(v) => setAnswers((a) => ({ ...a, budget: v }))}
                  go={go}
                />
              </ScreenWrap>
            )}
            {screen === 'q4' && (
              <ScreenWrap key="q4">
                <Q4
                  value={answers.setup}
                  setValue={(v) => setAnswers((a) => ({ ...a, setup: v }))}
                  submit={submitFinal}
                  submitting={submitting}
                  error={error}
                  go={go}
                />
              </ScreenWrap>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}

function ScreenWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      {children}
    </motion.div>
  );
}

function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="dfy-form-card"
      style={{
        background: theme.palette.surface,
        border: `1px solid ${theme.palette.borderSoft}`,
        borderRadius: theme.radius.xxl,
        boxShadow: theme.shadow.card,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {children}
    </div>
  );
}

// ───────── Steps ─────────

function ContactStep({
  contact,
  patchContact,
  submit,
  submitting,
  error,
  onBack,
}: {
  contact: Contact;
  patchContact: (k: keyof Contact, v: string) => void;
  submit: () => void;
  submitting: boolean;
  error: string | null;
  onBack: () => void;
}) {
  return (
    <>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Eyebrow>60-second qualification</Eyebrow>
        <h1 className="h-section" style={{ margin: 0 }}>
          Let&apos;s see if we&apos;re a fit.
        </h1>
        <p className="t-lead" style={{ margin: 0, maxWidth: 480 }}>
          Tell us a bit about yourself — we&apos;ll route you to the team if there&apos;s a match.
        </p>
      </div>

      <FormCard>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          <div className="dfy-form-name-row" style={{ display: 'grid', gap: 16 }}>
            <Field
              label="First name"
              value={contact.firstName}
              onChange={(v) => patchContact('firstName', v)}
              placeholder="Sam"
              autoComplete="given-name"
              autoFocus
              required
            />
            <Field
              label="Last name"
              value={contact.lastName}
              onChange={(v) => patchContact('lastName', v)}
              placeholder="Reyes"
              autoComplete="family-name"
              required
            />
          </div>
          <Field
            label="Email"
            type="email"
            value={contact.email}
            onChange={(v) => patchContact('email', v)}
            placeholder="sam@company.com"
            autoComplete="email"
            required
          />
          <Field
            label="Phone"
            type="tel"
            value={contact.phone}
            onChange={(v) => patchContact('phone', v)}
            placeholder="+1 (555) 123-4567"
            autoComplete="tel"
            required
          />
          <Field
            label="Social handle"
            value={contact.handle}
            onChange={(v) => patchContact('handle', v)}
            placeholder="@samreyes"
            optional
          />

          <Button type="submit" full disabled={submitting} onClick={submit} size="lg">
            {submitting ? 'Saving…' : 'Continue  →'}
          </Button>

          {error && (
            <p
              role="alert"
              style={{
                margin: 0,
                fontSize: 13,
                color: '#dc2626',
                fontFamily: theme.fonts.body,
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: theme.palette.fgSubtle,
              textAlign: 'center',
              fontFamily: theme.fonts.body,
            }}
          >
            We won&apos;t spam you. We don&apos;t have time for that either.
          </p>
        </form>
      </FormCard>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="ghost" onClick={onBack}>
          ← Back to home
        </Button>
      </div>
    </>
  );
}

function QuestionShell({
  step,
  total,
  eyebrow,
  question,
  hint,
  children,
  onBack,
  onNext,
  canNext,
  nextLabel = 'Continue',
  submitting,
  error,
}: {
  step: number;
  total: number;
  eyebrow: string;
  question: string;
  hint?: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  canNext: boolean;
  nextLabel?: string;
  submitting?: boolean;
  error?: string | null;
}) {
  return (
    <>
      <ProgressBar step={step} total={total} />

      <FormCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="h-section" style={{ margin: 0, fontSize: 'clamp(26px, 4vw, 36px)' }}>
            {question}
          </h2>
          {hint && (
            <p style={{ margin: 0, fontSize: 15, color: theme.palette.fgMuted, lineHeight: 1.55 }}>
              {hint}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>

        {error && (
          <p
            role="alert"
            style={{
              margin: 0,
              fontSize: 13,
              color: '#dc2626',
              fontFamily: theme.fonts.body,
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            paddingTop: 4,
          }}
        >
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Button onClick={onNext} disabled={!canNext || submitting}>
            {submitting ? 'Submitting…' : `${nextLabel}  →`}
          </Button>
        </div>
      </FormCard>
    </>
  );
}

function Q1({
  value,
  setValue,
  go,
}: {
  value: Content | undefined;
  setValue: (v: Content) => void;
  go: (s: Screen) => void;
}) {
  const opts: { v: Content; l: string; s: string }[] = [
    { v: 'yes', l: 'Yes', s: 'I post consistently across one or more platforms.' },
    { v: 'inconsistent', l: 'Yes — but not consistently', s: 'I post when I have time. Which is never.' },
    { v: 'no', l: 'No', s: "I haven't really started. That's why I'm here." },
  ];
  return (
    <QuestionShell
      step={1}
      total={4}
      eyebrow="Question 01"
      question="Do you currently make content?"
      hint="It's okay if you don't — most of our clients didn't either."
      onBack={() => go('contact')}
      onNext={() => go('q2')}
      canNext={!!value}
    >
      {opts.map((o) => (
        <OptionCard
          key={o.v}
          selected={value === o.v}
          label={o.l}
          sub={o.s}
          onClick={() => setValue(o.v)}
        />
      ))}
    </QuestionShell>
  );
}

function Q2({
  values,
  setValues,
  go,
}: {
  values: Issue[];
  setValues: (vs: Issue[]) => void;
  go: (s: Screen) => void;
}) {
  const opts: { v: Issue; l: string; s: string }[] = [
    { v: 'time', l: 'Time to film', s: 'My calendar is already full.' },
    { v: 'ideas', l: 'Ideas to film', s: "I don't know what to talk about." },
    { v: 'comfort', l: 'Comfort on camera', s: 'I freeze the moment a lens is on me.' },
    { v: 'editing', l: 'Editing', s: 'Cutting, captions, hooks — none of it.' },
  ];
  function toggle(v: Issue) {
    setValues(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  }
  return (
    <QuestionShell
      step={2}
      total={4}
      eyebrow="Question 02"
      question="What's actually stopping you?"
      hint="Pick as many as apply. We've heard them all."
      onBack={() => go('q1')}
      onNext={() => go('q3')}
      canNext={values.length > 0}
    >
      <div className="dfy-q-options-grid" style={{ display: 'grid', gap: 12 }}>
        {opts.map((o) => (
          <OptionCard
            key={o.v}
            multi
            selected={values.includes(o.v)}
            label={o.l}
            sub={o.s}
            onClick={() => toggle(o.v)}
          />
        ))}
      </div>
    </QuestionShell>
  );
}

function Q3({
  value,
  setValue,
  go,
}: {
  value: Budget | undefined;
  setValue: (v: Budget) => void;
  go: (s: Screen) => void;
}) {
  const opts: { v: Budget; l: string; s: string; dq?: boolean }[] = [
    { v: '0-2k', l: '$0 – $2k', s: 'Below our floor — we should be honest about that.', dq: true },
    { v: '2-5k', l: '$2k – $5k', s: 'Starter clone, 1 platform, 20 pieces / mo.' },
    { v: '5-10k', l: '$5k – $10k', s: 'Most popular. 2 platforms, 30+ pieces, ad-ready.' },
    { v: '10-20k', l: '$10k – $20k', s: 'Full coverage across all major platforms.' },
    { v: '20k+', l: '$20k+', s: 'White-glove, weekly strategy, dedicated team.' },
  ];
  return (
    <QuestionShell
      step={3}
      total={4}
      eyebrow="Question 03"
      question="What's your monthly budget for this?"
      hint="Be honest — we'd rather find out now than waste your time on a call."
      onBack={() => go('q2')}
      onNext={() => go('q4')}
      canNext={!!value}
    >
      {opts.map((o) => (
        <OptionCard
          key={o.v}
          selected={value === o.v}
          label={o.l}
          sub={o.s}
          badge={o.dq ? 'below floor' : null}
          onClick={() => setValue(o.v)}
        />
      ))}
    </QuestionShell>
  );
}

function Q4({
  value,
  setValue,
  submit,
  submitting,
  error,
  go,
}: {
  value: Setup | undefined;
  setValue: (v: Setup) => void;
  submit: () => void;
  submitting: boolean;
  error: string | null;
  go: (s: Screen) => void;
}) {
  const opts: { v: Setup; l: string; s: string; dq?: boolean }[] = [
    { v: 'yes', l: 'Yes', s: 'I can carve out 1-2 hours, once, to make this work.' },
    { v: 'no', l: 'No', s: "I genuinely can't commit any time. Even once.", dq: true },
  ];
  return (
    <QuestionShell
      step={4}
      total={4}
      eyebrow="Question 04 — last one"
      question="Can you give us 1-2 hours to set this up?"
      hint="One session. We capture your face, voice, and the way you actually talk. After that, you're hands-off."
      onBack={() => go('q3')}
      onNext={submit}
      canNext={!!value}
      nextLabel="Submit"
      submitting={submitting}
      error={error}
    >
      {opts.map((o) => (
        <OptionCard
          key={o.v}
          selected={value === o.v}
          label={o.l}
          sub={o.s}
          badge={o.dq ? 'deal-breaker' : null}
          onClick={() => setValue(o.v)}
        />
      ))}
    </QuestionShell>
  );
}
