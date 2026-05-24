// screens.jsx — all flow screens for DFY Content
// Each screen receives { theme, state, setState, go } where:
//   theme  = { palette, fonts, direction, heroLayout, headline }
//   state  = full app state (contact, answers, …)
//   setState(patch) merges into state
//   go(screen) navigates

const { useState, useMemo, useEffect } = React;

// ───────────────── shared atoms ─────────────────

function Eyebrow({ theme, children, style }) {
  return (
    <div style={{
      fontFamily: theme.fonts.mono,
      fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
      color: theme.palette.muted,
      display: 'flex', alignItems: 'center', gap: 8,
      ...style,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 99,
        background: theme.palette.accent, display: 'inline-block',
      }}></span>
      {children}
    </div>
  );
}

function Btn({ theme, children, onClick, disabled, variant = 'primary', style, full }) {
  const isPrimary = variant === 'primary';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        appearance: 'none', border: 0, cursor: disabled ? 'not-allowed' : 'pointer',
        background: isPrimary ? theme.palette.accent : 'transparent',
        color: isPrimary ? theme.palette.onAccent : theme.palette.fg,
        padding: '18px 28px',
        fontFamily: theme.fonts.mono,
        fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
        borderRadius: theme.direction === 'studio' ? 999 : 4,
        border: isPrimary ? 'none' : `1px solid ${theme.palette.border}`,
        opacity: disabled ? 0.35 : 1,
        transition: 'transform .15s ease, background .2s ease, opacity .2s ease',
        width: full ? '100%' : 'auto',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        ...style,
      }}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.985)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  );
}

function Field({ theme, label, value, onChange, type = 'text', placeholder, optional, autoFocus }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{
        fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: theme.palette.muted,
      }}>
        {label}{optional && <span style={{ opacity: 0.5 }}> · optional</span>}
      </span>
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          appearance: 'none', background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${theme.palette.border}`,
          padding: '12px 0', fontSize: 18,
          fontFamily: theme.fonts.body,
          color: theme.palette.fg,
          outline: 'none',
          transition: 'border-color .2s',
        }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = theme.palette.accent)}
        onBlur={e => (e.currentTarget.style.borderBottomColor = theme.palette.border)}
      />
    </label>
  );
}

function OptionCard({ theme, selected, onClick, label, sub, badge, multi }) {
  return (
    <button
      onClick={onClick}
      style={{
        appearance: 'none', textAlign: 'left', cursor: 'pointer',
        background: selected ? theme.palette.accent : theme.palette.surface,
        color: selected ? theme.palette.onAccent : theme.palette.fg,
        border: `1px solid ${selected ? theme.palette.accent : theme.palette.border}`,
        borderRadius: theme.direction === 'studio' ? 12 : 6,
        padding: '20px 22px',
        fontFamily: theme.fonts.body,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
        transition: 'all .15s ease',
        width: '100%',
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = theme.palette.fg + '55'; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = theme.palette.border; }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>{label}</span>
        {sub && <span style={{ fontSize: 13, opacity: 0.7 }}>{sub}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {badge && <span style={{
          fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.12em',
          textTransform: 'uppercase', opacity: 0.6,
        }}>{badge}</span>}
        <span style={{
          width: 22, height: 22, borderRadius: multi ? 4 : 99,
          border: `1.5px solid ${selected ? theme.palette.onAccent : theme.palette.border}`,
          background: selected ? theme.palette.onAccent : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {selected && <span style={{
            width: multi ? 10 : 8, height: multi ? 10 : 8,
            background: theme.palette.accent,
            borderRadius: multi ? 2 : 99,
          }}></span>}
        </span>
      </div>
    </button>
  );
}

function ProgressBar({ theme, step, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{
        fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: theme.palette.muted,
      }}>
        Step {String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div style={{ flex: 1, height: 2, background: theme.palette.border, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, width: `${(step / total) * 100}%`,
          background: theme.palette.accent, transition: 'width .4s cubic-bezier(.4,0,.2,1)',
        }}></div>
      </div>
    </div>
  );
}

function DisplayHeadline({ theme, eyebrow, big, accent, sub, align = 'left' }) {
  const isStudio = theme.direction === 'studio';
  const f = theme.fonts;
  return (
    <div style={{ textAlign: align, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Eyebrow theme={theme} style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}>{eyebrow}</Eyebrow>
      <h1 style={{
        margin: 0,
        fontFamily: f.display,
        fontWeight: f.weight,
        fontSize: 'clamp(44px, 7.5vw, 128px)',
        lineHeight: 0.92,
        letterSpacing: f.tracking,
        color: theme.palette.fg,
        overflowWrap: 'break-word',
      }}>
        {big}<br/>
        <span style={{
          color: theme.palette.accent,
          fontStyle: isStudio && f.italic ? 'italic' : 'normal',
        }}>{accent}</span>
      </h1>
      {sub && <p style={{
        margin: 0, fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.5,
        color: theme.palette.muted, maxWidth: 560,
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
      }}>{sub}</p>}
    </div>
  );
}

// Top status bar
function TopBar({ theme }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px',
      borderBottom: `1px solid ${theme.palette.border}`,
      position: 'sticky', top: 0, zIndex: 10,
      background: theme.palette.bg + 'ee',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 22, height: 22, background: theme.palette.accent,
          borderRadius: theme.direction === 'studio' ? 99 : 4,
        }}></div>
        <span style={{
          fontFamily: theme.fonts.mono, fontSize: 12, letterSpacing: '0.14em',
          textTransform: 'uppercase', fontWeight: 600,
        }}>DFY / Content</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{
          fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: theme.palette.muted,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: 99, background: '#34d399',
            boxShadow: '0 0 0 4px rgba(52,211,153,0.18)',
          }}></span>
          3 spots left · May
        </span>
      </div>
    </div>
  );
}

// Bottom ticker (operator direction only)
function Ticker({ theme }) {
  const items = ['NO CAMERA', 'NO EDITING', 'NO SCRIPTS', 'NO EXCUSES', 'JUST POSTING', '\u2014'];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div style={{
      borderTop: `1px solid ${theme.palette.border}`,
      borderBottom: `1px solid ${theme.palette.border}`,
      overflow: 'hidden', padding: '14px 0',
    }}>
      <div style={{
        display: 'flex', gap: 48, whiteSpace: 'nowrap',
        animation: 'tickerScroll 36s linear infinite',
        fontFamily: theme.fonts.mono, fontSize: 13, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: theme.palette.fg,
      }}>
        {row.map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 48 }}>
            {it}
            <span style={{ color: theme.palette.accent }}>●</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes tickerScroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

// ───────────────── HERO ─────────────────

function HeroScreen({ theme, state, setState, go }) {
  const { contact = {} } = state;
  const setContact = (k, v) => setState({ contact: { ...contact, [k]: v } });
  const valid = contact.firstName && contact.lastName && contact.email && contact.phone;

  const isSplit = theme.heroLayout === 'split';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} />
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: isSplit ? 'minmax(0, 1.15fr) minmax(320px, 1fr)' : '1fr',
        gap: isSplit ? 48 : 64,
        padding: isSplit ? '64px 48px 0' : '88px 48px 0',
        maxWidth: 1440, width: '100%', margin: '0 auto',
        alignItems: isSplit ? 'center' : 'start',
      }}>
        <div style={{ textAlign: isSplit ? 'left' : 'center', display: 'flex', flexDirection: 'column', gap: 32, minWidth: 0 }}>
          <DisplayHeadline theme={theme}
            eyebrow={theme.headline.eyebrow}
            big={theme.headline.big}
            accent={theme.headline.accent}
            sub={theme.headline.sub}
            align={isSplit ? 'left' : 'center'} />

          {!isSplit && (
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 14,
              marginTop: 8,
            }}>
              <KPI theme={theme} n="30+" l="pieces / mo" />
              <KPI theme={theme} n="0" l="hours filming" />
              <KPI theme={theme} n="14 days" l="to launch" />
            </div>
          )}
        </div>

        <ContactCard theme={theme} contact={contact} setContact={setContact} valid={valid}
          onSubmit={() => go('q1')} centered={!isSplit} />
      </div>

      {isSplit && (
        <div style={{ padding: '64px 48px 0', maxWidth: 1440, margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
            borderTop: `1px solid ${theme.palette.border}`,
            borderBottom: `1px solid ${theme.palette.border}`,
          }}>
            <KPIRow theme={theme} n="30+" l="pieces published / month, in your voice" />
            <KPIRow theme={theme} n="0" l="hours you spend filming" border />
            <KPIRow theme={theme} n="14" l="days from setup to first post" border />
          </div>
        </div>
      )}

      {theme.direction === 'operator' ? <Ticker theme={theme} /> : <Sigil theme={theme} />}
    </div>
  );
}

function KPI({ theme, n, l }) {
  return (
    <div style={{
      padding: '14px 20px', border: `1px solid ${theme.palette.border}`,
      borderRadius: theme.direction === 'studio' ? 12 : 4,
      display: 'flex', flexDirection: 'column', gap: 2, minWidth: 120,
    }}>
      <span style={{
        fontFamily: theme.fonts.display, fontSize: 28, fontWeight: theme.fonts.weight,
        letterSpacing: theme.fonts.tracking, lineHeight: 1,
      }}>{n}</span>
      <span style={{
        fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: theme.palette.muted,
      }}>{l}</span>
    </div>
  );
}

function KPIRow({ theme, n, l, border }) {
  return (
    <div style={{
      padding: '32px 28px',
      borderLeft: border ? `1px solid ${theme.palette.border}` : 'none',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <span style={{
        fontFamily: theme.fonts.display,
        fontSize: 'clamp(48px, 5vw, 72px)',
        fontWeight: theme.fonts.weight, letterSpacing: theme.fonts.tracking, lineHeight: 0.9,
        color: theme.palette.fg,
      }}>{n}</span>
      <span style={{
        fontFamily: theme.fonts.body, fontSize: 14, color: theme.palette.muted, maxWidth: 240,
      }}>{l}</span>
    </div>
  );
}

function Sigil({ theme }) {
  return (
    <div style={{
      padding: '64px 48px', maxWidth: 1440, margin: '0 auto', width: '100%',
      borderTop: `1px solid ${theme.palette.border}`,
    }}>
      <div style={{
        fontFamily: theme.fonts.display,
        fontStyle: theme.fonts.italic ? 'italic' : 'normal',
        fontSize: 'clamp(24px, 3vw, 36px)',
        color: theme.palette.muted, lineHeight: 1.3,
        maxWidth: 720,
      }}>
        “You don't need a content team. You need a clone, a calendar, and someone who's done this before.”
      </div>
    </div>
  );
}

function ContactCard({ theme, contact, setContact, valid, onSubmit, centered }) {
  return (
    <div style={{
      background: theme.palette.surface,
      border: `1px solid ${theme.palette.border}`,
      borderRadius: theme.direction === 'studio' ? 20 : 6,
      padding: '36px 36px 32px',
      display: 'flex', flexDirection: 'column', gap: 20,
      maxWidth: centered ? 560 : 'none',
      width: '100%',
      margin: centered ? '0 auto' : 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Eyebrow theme={theme}>60-second qualification</Eyebrow>
        <span style={{
          fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: theme.palette.muted,
        }}>4 questions</span>
      </div>
      <h2 style={{
        margin: 0, fontFamily: theme.fonts.display,
        fontSize: 28, fontWeight: theme.fonts.weight,
        letterSpacing: theme.fonts.tracking, lineHeight: 1.05,
      }}>
        Let's see if we're a fit.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Field theme={theme} label="First name" value={contact.firstName} onChange={v => setContact('firstName', v)} placeholder="Sam" autoFocus />
        <Field theme={theme} label="Last name"  value={contact.lastName}  onChange={v => setContact('lastName', v)}  placeholder="Reyes" />
      </div>
      <Field theme={theme} label="Email" type="email" value={contact.email} onChange={v => setContact('email', v)} placeholder="sam@company.com" />
      <Field theme={theme} label="Phone" type="tel"   value={contact.phone} onChange={v => setContact('phone', v)} placeholder="+1 (555) 123-4567" />
      <Field theme={theme} label="Social handle" value={contact.handle} onChange={v => setContact('handle', v)} placeholder="@samreyes" optional />

      <Btn theme={theme} disabled={!valid} onClick={onSubmit} full>
        Start qualifying  →
      </Btn>
      <p style={{ margin: 0, fontSize: 12, color: theme.palette.muted, textAlign: 'center', fontFamily: theme.fonts.body }}>
        We won't spam you. We don't have time for that either.
      </p>
    </div>
  );
}

// ───────────────── QUESTION FRAME ─────────────────

function QuestionFrame({ theme, step, total, eyebrow, question, hint, children, onBack, onNext, canNext, nextLabel = 'Continue' }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} />
      <div style={{ padding: '32px 48px 0', maxWidth: 920, width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ProgressBar theme={theme} step={step} total={total} />
        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 28, flex: 1 }}>
          <Eyebrow theme={theme}>{eyebrow}</Eyebrow>
          <h1 style={{
            margin: 0, fontFamily: theme.fonts.display,
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: theme.fonts.weight, letterSpacing: theme.fonts.tracking,
            lineHeight: 1.02, color: theme.palette.fg,
          }}>
            {question}
          </h1>
          {hint && <p style={{ margin: 0, color: theme.palette.muted, fontSize: 17, maxWidth: 620 }}>{hint}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            {children}
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '48px 0 56px', gap: 16,
        }}>
          <Btn theme={theme} variant="ghost" onClick={onBack}>← Back</Btn>
          <Btn theme={theme} onClick={onNext} disabled={!canNext}>{nextLabel}  →</Btn>
        </div>
      </div>
    </div>
  );
}

// ───────────────── QUESTIONS ─────────────────

function Q1({ theme, state, setState, go }) {
  const cur = state.answers?.content;
  const set = v => setState({ answers: { ...state.answers, content: v } });
  const opts = [
    { v: 'yes',          l: 'Yes',                          s: 'I post consistently across one or more platforms.' },
    { v: 'inconsistent', l: 'Yes \u2014 but not consistently', s: 'I post when I have time. Which is never.' },
    { v: 'no',           l: 'No',                           s: "I haven't really started. That's why I'm here." },
  ];
  return (
    <QuestionFrame theme={theme} step={1} total={4}
      eyebrow="Question 01"
      question="Do you currently make content?"
      hint="It's okay if you don't — most of our clients didn't either."
      onBack={() => go('hero')}
      onNext={() => go('q2')}
      canNext={!!cur}>
      {opts.map(o => (
        <OptionCard key={o.v} theme={theme} selected={cur === o.v}
          label={o.l} sub={o.s}
          onClick={() => set(o.v)} />
      ))}
    </QuestionFrame>
  );
}

function Q2({ theme, state, setState, go }) {
  const cur = state.answers?.issues || [];
  const toggle = v => {
    const next = cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v];
    setState({ answers: { ...state.answers, issues: next } });
  };
  const opts = [
    { v: 'time',    l: 'Time to film',     s: 'My calendar is already full.' },
    { v: 'ideas',   l: 'Ideas to film',    s: "I don't know what to talk about." },
    { v: 'comfort', l: 'Comfort on camera', s: 'I freeze the moment a lens is on me.' },
    { v: 'editing', l: 'Editing',          s: 'Cutting, captions, hooks — none of it.' },
  ];
  return (
    <QuestionFrame theme={theme} step={2} total={4}
      eyebrow="Question 02"
      question="What's actually stopping you?"
      hint="Pick as many as apply. We've heard them all."
      onBack={() => go('q1')}
      onNext={() => go('q3')}
      canNext={cur.length > 0}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {opts.map(o => (
          <OptionCard key={o.v} theme={theme} multi
            selected={cur.includes(o.v)}
            label={o.l} sub={o.s}
            onClick={() => toggle(o.v)} />
        ))}
      </div>
    </QuestionFrame>
  );
}

function Q3({ theme, state, setState, go }) {
  const cur = state.answers?.budget;
  const set = v => setState({ answers: { ...state.answers, budget: v } });
  const opts = [
    { v: '0-2k',    l: '$0 – $2k',        s: 'Below our floor — we should be honest about that.',          dq: true },
    { v: '2-5k',    l: '$2k – $5k',       s: 'Starter clone, 1 platform, 20 pieces / mo.' },
    { v: '5-10k',   l: '$5k – $10k',      s: 'Most popular. 2 platforms, 30+ pieces, ad-ready.' },
    { v: '10-20k',  l: '$10k – $20k',     s: 'Full coverage across all major platforms.' },
    { v: '20k+',    l: '$20k+',           s: 'White-glove, weekly strategy, dedicated team.' },
  ];
  return (
    <QuestionFrame theme={theme} step={3} total={4}
      eyebrow="Question 03"
      question="What's your monthly budget for this?"
      hint="Be honest — we'd rather find out now than waste your time on a call."
      onBack={() => go('q2')}
      onNext={() => go('q4')}
      canNext={!!cur}>
      {opts.map(o => (
        <OptionCard key={o.v} theme={theme} selected={cur === o.v}
          label={o.l} sub={o.s} badge={o.dq ? 'below floor' : null}
          onClick={() => set(o.v)} />
      ))}
    </QuestionFrame>
  );
}

function Q4({ theme, state, setState, go }) {
  const cur = state.answers?.setup;
  const set = v => setState({ answers: { ...state.answers, setup: v } });
  const opts = [
    { v: 'yes', l: 'Yes',  s: 'I can carve out 1-2 hours, once, to make this work.' },
    { v: 'no',  l: 'No',   s: "I genuinely can't commit any time. Even once.", dq: true },
  ];
  const isQualified = () => {
    const a = { ...state.answers, setup: cur };
    return a.budget && a.budget !== '0-2k' && a.setup === 'yes';
  };
  return (
    <QuestionFrame theme={theme} step={4} total={4}
      eyebrow="Question 04 \u2014 last one"
      question="Can you give us 1-2 hours to set this up?"
      hint="One session. We capture your face, voice, and the way you actually talk. After that, you're hands-off."
      onBack={() => go('q3')}
      onNext={() => go(isQualified() ? 'qualified' : 'dnq')}
      canNext={!!cur}
      nextLabel="Submit">
      {opts.map(o => (
        <OptionCard key={o.v} theme={theme} selected={cur === o.v}
          label={o.l} sub={o.s} badge={o.dq ? 'deal-breaker' : null}
          onClick={() => set(o.v)} />
      ))}
    </QuestionFrame>
  );
}

// ───────────────── DNQ ─────────────────

function DNQScreen({ theme, state, go }) {
  const reason = state.answers?.budget === '0-2k'
    ? { title: "Budget isn't there yet.",
        body: "Our floor is $2k/mo because cloning, scripting, editing and posting takes real production hours. Anything less and the work gets cheap — for you and for us.",
        cta: "Get our free playbook" }
    : { title: "We need 1-2 hours from you.",
        body: "Just once. Without your face on camera and your voice in our training set, there's literally nothing for us to clone. Come back when you can carve out the time.",
        cta: "Save this for later" };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} />
      <div style={{
        flex: 1, padding: '88px 48px',
        maxWidth: 920, width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: 40,
      }}>
        <Eyebrow theme={theme}>Not a fit — yet.</Eyebrow>
        <h1 style={{
          margin: 0, fontFamily: theme.fonts.display,
          fontSize: 'clamp(48px, 7vw, 96px)',
          fontWeight: theme.fonts.weight, letterSpacing: theme.fonts.tracking,
          lineHeight: 0.96, color: theme.palette.fg,
        }}>
          We don't think this<br/>
          <span style={{
            color: theme.palette.accent,
            fontStyle: theme.fonts.italic ? 'italic' : 'normal',
          }}>is going to work.</span>
        </h1>
        <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, color: theme.palette.muted, maxWidth: 640 }}>
          {reason.body}
        </p>

        <div style={{
          marginTop: 24, padding: '32px',
          background: theme.palette.surface,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: theme.direction === 'studio' ? 16 : 6,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 24, letterSpacing: theme.fonts.tracking }}>
              {reason.title}
            </h3>
            <span style={{
              fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: theme.palette.muted,
            }}>Why this is a no</span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              "We won't take your money if we can't deliver.",
              "We've watched too many agencies overpromise. We're not joining them.",
              "When the numbers change, come back. We'll still be here.",
            ].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: theme.fonts.mono, fontSize: 11,
                  color: theme.palette.accent, paddingTop: 4,
                }}>0{i + 1}</span>
                <span style={{ fontSize: 16, lineHeight: 1.55, color: theme.palette.fg }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Btn theme={theme}>{reason.cta}  →</Btn>
          <Btn theme={theme} variant="ghost" onClick={() => go('hero')}>← Start over</Btn>
        </div>
      </div>
    </div>
  );
}

// ───────────────── QUALIFIED + CALENDAR ─────────────────

function QualifiedScreen({ theme, state, setState, go }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Build a 14-day window starting tomorrow
  const days = useMemo(() => {
    const arr = [];
    const start = new Date();
    start.setDate(start.getDate() + 1);
    for (let i = 0; i < 14; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dow = d.getDay();
      arr.push({
        date: d,
        dow,
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        available: dow !== 0 && dow !== 6, // weekends off
      });
    }
    return arr;
  }, []);

  const slots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM'];

  const onBook = () => {
    setState({ booking: {
      date: selectedDate,
      time: selectedTime,
      dateLabel: selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '',
    } });
    go('booked');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} />
      <div style={{
        flex: 1, padding: '72px 48px',
        maxWidth: 1280, width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: 48,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Eyebrow theme={theme}>You qualified · 1 of 12 in May</Eyebrow>
          <h1 style={{
            margin: 0, fontFamily: theme.fonts.display,
            fontSize: 'clamp(56px, 8vw, 112px)',
            fontWeight: theme.fonts.weight, letterSpacing: theme.fonts.tracking,
            lineHeight: 0.92, color: theme.palette.fg,
          }}>
            You're in,{' '}
            <span style={{
              color: theme.palette.accent,
              fontStyle: theme.fonts.italic ? 'italic' : 'normal',
            }}>
              {state.contact?.firstName || 'friend'}.
            </span>
          </h1>
          <p style={{ margin: 0, fontSize: 18, color: theme.palette.muted, maxWidth: 620, lineHeight: 1.55 }}>
            Pick a 30-minute slot with our founder. We'll walk through your goals, what we'd post for you, and what we'd charge.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32,
          background: theme.palette.surface,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: theme.direction === 'studio' ? 20 : 8,
          padding: 32,
        }}>
          {/* Left: founder card + meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingRight: 32, borderRight: `1px solid ${theme.palette.border}` }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: 99,
                background: `linear-gradient(135deg, ${theme.palette.accent}, ${theme.palette.fg})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: theme.fonts.display, fontSize: 22, fontWeight: 700,
                color: theme.palette.bg,
              }}>DF</div>
              <div>
                <div style={{ fontFamily: theme.fonts.display, fontSize: 22, letterSpacing: theme.fonts.tracking }}>
                  with the founder
                </div>
                <div style={{ fontFamily: theme.fonts.mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: theme.palette.muted }}>
                  30 min · Google Meet
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: theme.palette.border }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Meta theme={theme} k="Duration"     v="30 minutes" />
              <Meta theme={theme} k="Location"     v="Google Meet (link on confirm)" />
              <Meta theme={theme} k="Timezone"     v={Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Los_Angeles'} />
              <Meta theme={theme} k="What we'll do" v="Review your goals, decide on platforms, scope the work." />
            </div>

            <div style={{
              marginTop: 12, padding: 16,
              borderRadius: theme.direction === 'studio' ? 12 : 4,
              border: `1px dashed ${theme.palette.border}`,
              fontFamily: theme.fonts.mono, fontSize: 12, color: theme.palette.muted,
              lineHeight: 1.6,
            }}>
              <div style={{ color: theme.palette.fg, marginBottom: 4 }}>↪ Heads up</div>
              No-shows lose their slot for the quarter. If you can't make it, reschedule.
            </div>
          </div>

          {/* Right: date + time picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.muted, marginBottom: 12 }}>
                Pick a day
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                {days.map((d, i) => {
                  const isSel = selectedDate && d.date.toDateString() === selectedDate.toDateString();
                  return (
                    <button
                      key={i}
                      disabled={!d.available}
                      onClick={() => { setSelectedDate(d.date); setSelectedTime(null); }}
                      style={{
                        appearance: 'none', cursor: d.available ? 'pointer' : 'not-allowed',
                        background: isSel ? theme.palette.accent : 'transparent',
                        color: isSel ? theme.palette.onAccent : (d.available ? theme.palette.fg : theme.palette.muted),
                        border: `1px solid ${isSel ? theme.palette.accent : theme.palette.border}`,
                        borderRadius: theme.direction === 'studio' ? 10 : 4,
                        padding: '12px 0',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                        opacity: d.available ? 1 : 0.3,
                        transition: 'all .15s',
                        fontFamily: theme.fonts.body,
                      }}
                      onMouseEnter={e => { if (d.available && !isSel) e.currentTarget.style.borderColor = theme.palette.fg + '88'; }}
                      onMouseLeave={e => { if (!isSel) e.currentTarget.style.borderColor = theme.palette.border; }}
                    >
                      <span style={{ fontSize: 10, fontFamily: theme.fonts.mono, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>{d.label}</span>
                      <span style={{ fontSize: 18, fontWeight: 600, fontFamily: theme.fonts.display, letterSpacing: theme.fonts.tracking }}>{d.dayNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.muted, marginBottom: 12 }}>
                Pick a time {selectedDate && <span style={{ color: theme.palette.fg, marginLeft: 8 }}>· {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {slots.map(s => {
                  const isSel = selectedTime === s;
                  const en = !!selectedDate;
                  return (
                    <button key={s}
                      disabled={!en}
                      onClick={() => setSelectedTime(s)}
                      style={{
                        appearance: 'none', cursor: en ? 'pointer' : 'not-allowed',
                        background: isSel ? theme.palette.accent : 'transparent',
                        color: isSel ? theme.palette.onAccent : theme.palette.fg,
                        border: `1px solid ${isSel ? theme.palette.accent : theme.palette.border}`,
                        borderRadius: theme.direction === 'studio' ? 10 : 4,
                        padding: '12px 0',
                        fontFamily: theme.fonts.mono, fontSize: 13, letterSpacing: '0.05em',
                        opacity: en ? 1 : 0.4, transition: 'all .15s',
                      }}
                      onMouseEnter={e => { if (en && !isSel) e.currentTarget.style.borderColor = theme.palette.fg + '88'; }}
                      onMouseLeave={e => { if (!isSel) e.currentTarget.style.borderColor = theme.palette.border; }}
                    >{s}</button>
                  );
                })}
              </div>
            </div>

            <Btn theme={theme} disabled={!selectedDate || !selectedTime} onClick={onBook} full style={{ marginTop: 6 }}>
              Confirm booking  →
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ theme, k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
      <span style={{
        fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: theme.palette.muted, flexShrink: 0,
        paddingTop: 2,
      }}>{k}</span>
      <span style={{ fontFamily: theme.fonts.body, fontSize: 14, color: theme.palette.fg, textAlign: 'right', maxWidth: 280 }}>
        {v}
      </span>
    </div>
  );
}

// ───────────────── BOOKED ─────────────────

function BookedScreen({ theme, state, go }) {
  const b = state.booking || {};
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} />
      <div style={{
        flex: 1, padding: '88px 48px',
        maxWidth: 920, width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: 36,
      }}>
        <Eyebrow theme={theme}>Confirmation #DFY-{Math.floor(Math.random() * 9000 + 1000)}</Eyebrow>

        <h1 style={{
          margin: 0, fontFamily: theme.fonts.display,
          fontSize: 'clamp(56px, 8vw, 112px)',
          fontWeight: theme.fonts.weight, letterSpacing: theme.fonts.tracking,
          lineHeight: 0.92, color: theme.palette.fg,
        }}>
          You're on the<br/>
          <span style={{
            color: theme.palette.accent,
            fontStyle: theme.fonts.italic ? 'italic' : 'normal',
          }}>calendar.</span>
        </h1>

        <div style={{
          background: theme.palette.surface,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: theme.direction === 'studio' ? 20 : 8,
          padding: '32px',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            paddingBottom: 24,
            borderBottom: `1px solid ${theme.palette.border}`,
            gap: 24,
          }}>
            <div>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.muted, marginBottom: 8 }}>When</div>
              <div style={{
                fontFamily: theme.fonts.display,
                fontSize: 28, fontWeight: theme.fonts.weight, letterSpacing: theme.fonts.tracking,
                lineHeight: 1.05,
              }}>{b.dateLabel}</div>
              <div style={{ fontFamily: theme.fonts.body, fontSize: 17, marginTop: 4, color: theme.palette.muted }}>{b.time} · 30 minutes</div>
            </div>
            <div>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.muted, marginBottom: 8 }}>Where</div>
              <div style={{
                fontFamily: theme.fonts.display,
                fontSize: 28, fontWeight: theme.fonts.weight, letterSpacing: theme.fonts.tracking,
                lineHeight: 1.05,
              }}>Google Meet</div>
              <div style={{ fontFamily: theme.fonts.body, fontSize: 17, marginTop: 4, color: theme.palette.muted }}>Link sent to {state.contact?.email || 'your email'}</div>
            </div>
          </div>

          <div style={{ paddingTop: 24 }}>
            <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.palette.muted, marginBottom: 16 }}>
              Before the call
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Find 2-3 creators in your space whose content you actually like.',
                "Think about the topics you'd never run out of opinions on.",
                "Bring your audience: who you'd want watching, not who watches now.",
              ].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: theme.fonts.mono, fontSize: 11, color: theme.palette.accent, paddingTop: 4 }}>0{i + 1}</span>
                  <span style={{ fontSize: 16, lineHeight: 1.55, color: theme.palette.fg }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Btn theme={theme}>Add to calendar  →</Btn>
          <Btn theme={theme} variant="ghost">Reschedule</Btn>
          <Btn theme={theme} variant="ghost" onClick={() => go('hero')}>← Start over</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  HeroScreen, Q1, Q2, Q3, Q4, DNQScreen, QualifiedScreen, BookedScreen,
});
