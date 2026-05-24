'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { theme } from '@/lib/theme';
import type { Budget, Content, Issue, Setup } from '@/lib/types';
import {
  Btn,
  DisplayHeadline,
  Eyebrow,
  Field,
  KPIRow,
  OptionCard,
  QuestionFrame,
  Ticker,
  TopBar,
} from '@/components/atoms';

type Screen = 'hero' | 'q1' | 'q2' | 'q3' | 'q4';

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
  const [screen, setScreen] = useState<Screen>('hero');
  const [contact, setContact] = useState<Contact>({});
  const [answers, setAnswers] = useState<Answers>({ issues: [] });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from sessionStorage on mount
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

  // Persist on change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ screen, contact, answers }));
    } catch {
      // ignore
    }
  }, [screen, contact, answers]);

  function go(next: Screen) {
    setError(null);
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      {screen === 'hero' && (
        <HeroBody
          contact={contact}
          patchContact={patchContact}
          submitContact={submitContact}
          submitting={submitting}
          error={error}
        />
      )}
      {screen === 'q1' && (
        <Q1
          value={answers.content}
          setValue={(v) => setAnswers((a) => ({ ...a, content: v }))}
          go={go}
        />
      )}
      {screen === 'q2' && (
        <Q2
          values={answers.issues}
          setValues={(vs) => setAnswers((a) => ({ ...a, issues: vs }))}
          go={go}
        />
      )}
      {screen === 'q3' && (
        <Q3
          value={answers.budget}
          setValue={(v) => setAnswers((a) => ({ ...a, budget: v }))}
          go={go}
        />
      )}
      {screen === 'q4' && (
        <Q4
          value={answers.setup}
          setValue={(v) => setAnswers((a) => ({ ...a, setup: v }))}
          go={go}
          submit={submitFinal}
          submitting={submitting}
          error={error}
        />
      )}
    </div>
  );
}

// ───────── Hero ─────────
function HeroBody({
  contact,
  patchContact,
  submitContact,
  submitting,
  error,
}: {
  contact: Contact;
  patchContact: (k: keyof Contact, v: string) => void;
  submitContact: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const valid = !!(contact.firstName && contact.lastName && contact.email && contact.phone);
  const isSplit = theme.heroLayout === 'split';

  return (
    <>
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: isSplit ? 'minmax(0, 1.15fr) minmax(320px, 1fr)' : '1fr',
          gap: isSplit ? 48 : 64,
          padding: isSplit ? '64px 48px 0' : '88px 48px 0',
          maxWidth: 1440,
          width: '100%',
          margin: '0 auto',
          alignItems: isSplit ? 'center' : 'start',
        }}
      >
        <div
          style={{
            textAlign: isSplit ? 'left' : 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            minWidth: 0,
          }}
        >
          <DisplayHeadline
            eyebrow={theme.headline.eyebrow}
            big={theme.headline.big}
            accent={theme.headline.accent}
            sub={theme.headline.sub}
            align={isSplit ? 'left' : 'center'}
          />
        </div>

        <ContactCard
          contact={contact}
          patchContact={patchContact}
          valid={valid}
          submitting={submitting}
          onSubmit={submitContact}
          error={error}
        />
      </div>

      {isSplit && (
        <div
          style={{
            padding: '64px 48px 0',
            maxWidth: 1440,
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
              borderTop: `1px solid ${theme.palette.border}`,
              borderBottom: `1px solid ${theme.palette.border}`,
            }}
          >
            <KPIRow n="30+" l="pieces published / month, in your voice" />
            <KPIRow n="0" l="hours you spend filming" border />
            <KPIRow n="14" l="days from setup to first post" border />
          </div>
        </div>
      )}

      <Ticker />
    </>
  );
}

function ContactCard({
  contact,
  patchContact,
  valid,
  submitting,
  onSubmit,
  error,
}: {
  contact: Contact;
  patchContact: (k: keyof Contact, v: string) => void;
  valid: boolean;
  submitting: boolean;
  onSubmit: () => void;
  error: string | null;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      style={{
        background: theme.palette.surface,
        border: `1px solid ${theme.palette.border}`,
        borderRadius: theme.direction === 'studio' ? 20 : 6,
        padding: '36px 36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Eyebrow>60-second qualification</Eyebrow>
        <span
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: theme.palette.muted,
          }}
        >
          4 questions
        </span>
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: theme.fonts.display,
          fontSize: 28,
          fontWeight: theme.fonts.weight,
          letterSpacing: theme.fonts.tracking,
          lineHeight: 1.05,
        }}
      >
        Let&apos;s see if we&apos;re a fit.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
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

      <Btn type="submit" disabled={!valid || submitting} onClick={onSubmit} full>
        {submitting ? 'Saving…' : 'Start qualifying  →'}
      </Btn>
      {error && (
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: '#ff7a7a',
            fontFamily: theme.fonts.body,
            textAlign: 'center',
          }}
          role="alert"
        >
          {error}
        </p>
      )}
      <p
        style={{
          margin: 0,
          fontSize: 12,
          color: theme.palette.muted,
          textAlign: 'center',
          fontFamily: theme.fonts.body,
        }}
      >
        We won&apos;t spam you. We don&apos;t have time for that either.
      </p>
    </form>
  );
}

// ───────── Question screens ─────────
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
    <QuestionFrame
      step={1}
      total={4}
      eyebrow="Question 01"
      question="Do you currently make content?"
      hint="It's okay if you don't — most of our clients didn't either."
      onBack={() => go('hero')}
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
    </QuestionFrame>
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
    <QuestionFrame
      step={2}
      total={4}
      eyebrow="Question 02"
      question="What's actually stopping you?"
      hint="Pick as many as apply. We've heard them all."
      onBack={() => go('q1')}
      onNext={() => go('q3')}
      canNext={values.length > 0}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
    </QuestionFrame>
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
    <QuestionFrame
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
    </QuestionFrame>
  );
}

function Q4({
  value,
  setValue,
  go,
  submit,
  submitting,
  error,
}: {
  value: Setup | undefined;
  setValue: (v: Setup) => void;
  go: (s: Screen) => void;
  submit: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const opts: { v: Setup; l: string; s: string; dq?: boolean }[] = [
    { v: 'yes', l: 'Yes', s: 'I can carve out 1-2 hours, once, to make this work.' },
    { v: 'no', l: 'No', s: "I genuinely can't commit any time. Even once.", dq: true },
  ];
  return (
    <>
      <QuestionFrame
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
        {error && (
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: '#ff7a7a',
              fontFamily: theme.fonts.body,
            }}
            role="alert"
          >
            {error}
          </p>
        )}
      </QuestionFrame>
    </>
  );
}
