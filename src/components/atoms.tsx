'use client';

import type { CSSProperties, ReactNode } from 'react';
import { theme } from '@/lib/theme';

const STUDIO_RADIUS = theme.direction === 'studio';

// ───────── Eyebrow ─────────
export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: theme.fonts.mono,
        fontSize: 11,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: theme.palette.muted,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 99,
          background: theme.palette.accent,
          display: 'inline-block',
        }}
      />
      {children}
    </div>
  );
}

// ───────── Btn ─────────
export function Btn({
  children,
  onClick,
  disabled,
  variant = 'primary',
  style,
  full,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
  style?: CSSProperties;
  full?: boolean;
  type?: 'button' | 'submit';
}) {
  const isPrimary = variant === 'primary';
  return (
    <button
      className="dfy-btn"
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        appearance: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: isPrimary ? theme.palette.accent : 'transparent',
        color: isPrimary ? theme.palette.onAccent : theme.palette.fg,
        padding: '18px 28px',
        fontFamily: theme.fonts.mono,
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 600,
        borderRadius: STUDIO_RADIUS ? 999 : 4,
        border: isPrimary ? 'none' : `1px solid ${theme.palette.border}`,
        opacity: disabled ? 0.35 : 1,
        transition: 'transform .15s ease, background .2s ease, opacity .2s ease',
        width: full ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        ...style,
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(0.985)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
}

// ───────── Field ─────────
export function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  optional,
  autoFocus,
  autoComplete,
  required,
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  optional?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span
        style={{
          fontFamily: theme.fonts.mono,
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: theme.palette.muted,
        }}
      >
        {label}
        {optional && <span style={{ opacity: 0.5 }}> · optional</span>}
      </span>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        required={required}
        style={{
          appearance: 'none',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${theme.palette.border}`,
          padding: '12px 0',
          fontSize: 18,
          fontFamily: theme.fonts.body,
          color: theme.palette.fg,
          outline: 'none',
          transition: 'border-color .2s',
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = theme.palette.accent)}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = theme.palette.border)}
      />
    </label>
  );
}

// ───────── OptionCard ─────────
export function OptionCard({
  selected,
  onClick,
  label,
  sub,
  badge,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  sub?: string;
  badge?: string | null;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        background: selected ? theme.palette.accent : theme.palette.surface,
        color: selected ? theme.palette.onAccent : theme.palette.fg,
        border: `1px solid ${selected ? theme.palette.accent : theme.palette.border}`,
        borderRadius: STUDIO_RADIUS ? 12 : 6,
        padding: '20px 22px',
        fontFamily: theme.fonts.body,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        transition: 'all .15s ease',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.borderColor = theme.palette.fg + '55';
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.borderColor = theme.palette.border;
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>{label}</span>
        {sub && <span style={{ fontSize: 13, opacity: 0.7 }}>{sub}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {badge && (
          <span
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.6,
            }}
          >
            {badge}
          </span>
        )}
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: multi ? 4 : 99,
            border: `1.5px solid ${selected ? theme.palette.onAccent : theme.palette.border}`,
            background: selected ? theme.palette.onAccent : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {selected && (
            <span
              style={{
                width: multi ? 10 : 8,
                height: multi ? 10 : 8,
                background: theme.palette.accent,
                borderRadius: multi ? 2 : 99,
              }}
            />
          )}
        </span>
      </div>
    </button>
  );
}

// ───────── ProgressBar ─────────
export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: theme.fonts.mono,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: theme.palette.muted,
        }}
      >
        Step {String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div
        style={{
          flex: 1,
          height: 2,
          background: theme.palette.border,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${(step / total) * 100}%`,
            background: theme.palette.accent,
            transition: 'width .4s cubic-bezier(.4,0,.2,1)',
          }}
        />
      </div>
    </div>
  );
}

// ───────── DisplayHeadline ─────────
export function DisplayHeadline({
  eyebrow,
  big,
  accent,
  sub,
  align = 'left',
}: {
  eyebrow: string;
  big: string;
  accent: string;
  sub?: string;
  align?: 'left' | 'center';
}) {
  const f = theme.fonts;
  return (
    <div style={{ textAlign: align, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Eyebrow style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        {eyebrow}
      </Eyebrow>
      <h1
        className="dfy-display-h1"
        style={{
          margin: 0,
          fontFamily: f.display,
          fontWeight: f.weight,
          lineHeight: 0.92,
          letterSpacing: f.tracking,
          color: theme.palette.fg,
          overflowWrap: 'break-word',
        }}
      >
        {big}
        <br />
        <span
          style={{
            color: theme.palette.accent,
            fontStyle: f.italic ? 'italic' : 'normal',
          }}
        >
          {accent}
        </span>
      </h1>
      {sub && (
        <p
          style={{
            margin: 0,
            fontSize: 'clamp(16px, 1.4vw, 20px)',
            lineHeight: 1.5,
            color: theme.palette.muted,
            maxWidth: 560,
            marginLeft: align === 'center' ? 'auto' : 0,
            marginRight: align === 'center' ? 'auto' : 0,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ───────── TopBar ─────────
export function TopBar() {
  return (
    <div
      className="dfy-topbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 32px',
        borderBottom: `1px solid ${theme.palette.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: theme.palette.bg + 'ee',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 22,
            height: 22,
            background: theme.palette.accent,
            borderRadius: STUDIO_RADIUS ? 99 : 4,
          }}
        />
        <span
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          DFY / Content
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span
          className="dfy-topbar-status"
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: theme.palette.muted,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 99,
              background: '#34d399',
              boxShadow: '0 0 0 4px rgba(52,211,153,0.18)',
            }}
          />
          3 spots left this month
        </span>
      </div>
    </div>
  );
}

// ───────── Ticker ─────────
export function Ticker() {
  const items = ['NO CAMERA', 'NO EDITING', 'NO SCRIPTS', 'NO EXCUSES', 'JUST POSTING', '—'];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div
      style={{
        borderTop: `1px solid ${theme.palette.border}`,
        borderBottom: `1px solid ${theme.palette.border}`,
        overflow: 'hidden',
        padding: '14px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 48,
          whiteSpace: 'nowrap',
          animation: 'tickerScroll 36s linear infinite',
          fontFamily: theme.fonts.mono,
          fontSize: 13,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: theme.palette.fg,
        }}
      >
        {row.map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 48 }}>
            {it}
            <span style={{ color: theme.palette.accent }}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ───────── KPIRow ─────────
export function KPIRow({ n, l, border }: { n: string; l: string; border?: boolean }) {
  return (
    <div
      className="dfy-kpi-row"
      style={{
        padding: '32px 28px',
        borderLeft: border ? `1px solid ${theme.palette.border}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <span
        style={{
          fontFamily: theme.fonts.display,
          fontSize: 'clamp(48px, 5vw, 72px)',
          fontWeight: theme.fonts.weight,
          letterSpacing: theme.fonts.tracking,
          lineHeight: 0.9,
          color: theme.palette.fg,
        }}
      >
        {n}
      </span>
      <span
        style={{
          fontFamily: theme.fonts.body,
          fontSize: 14,
          color: theme.palette.muted,
          maxWidth: 240,
        }}
      >
        {l}
      </span>
    </div>
  );
}

// ───────── QuestionFrame ─────────
export function QuestionFrame({
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
  nextDisabledLabel,
  submitting,
}: {
  step: number;
  total: number;
  eyebrow: string;
  question: string;
  hint?: string;
  children: ReactNode;
  onBack: () => void;
  onNext: () => void;
  canNext: boolean;
  nextLabel?: string;
  nextDisabledLabel?: string;
  submitting?: boolean;
}) {
  return (
    <div
      className="dfy-qframe"
      style={{
        padding: '32px 48px 0',
        maxWidth: 920,
        width: '100%',
        margin: '0 auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ProgressBar step={step} total={total} />
      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 28, flex: 1 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className="dfy-qframe-h1"
          style={{
            margin: 0,
            fontFamily: theme.fonts.display,
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: theme.fonts.weight,
            letterSpacing: theme.fonts.tracking,
            lineHeight: 1.02,
            color: theme.palette.fg,
          }}
        >
          {question}
        </h1>
        {hint && (
          <p style={{ margin: 0, color: theme.palette.muted, fontSize: 17, maxWidth: 620 }}>{hint}</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
          {children}
        </div>
      </div>
      <div
        className="dfy-qframe-actions"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px 0 56px',
          gap: 16,
        }}
      >
        <Btn variant="ghost" onClick={onBack}>
          ← Back
        </Btn>
        <Btn onClick={onNext} disabled={!canNext || submitting}>
          {submitting ? (nextDisabledLabel ?? 'Submitting…') : `${nextLabel}  →`}
        </Btn>
      </div>
    </div>
  );
}
