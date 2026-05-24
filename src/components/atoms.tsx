'use client';

import type { CSSProperties, ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { theme } from '@/lib/theme';
import { fadeUp, fadeUpSmall, inViewProps, stagger } from '@/lib/motion';

// ───────── Container & Section helpers ─────────
// Just thin semantic wrappers around the .container / .section classes from globals.css

export function Container({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`container ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Section({
  children,
  id,
  tight,
  className = '',
  style,
}: {
  children: ReactNode;
  id?: string;
  tight?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section id={id} className={`${tight ? 'section-tight' : 'section'} ${className}`} style={style}>
      {children}
    </section>
  );
}

// ───────── Eyebrow ─────────
export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span className="t-eyebrow" style={style}>
      {children}
    </span>
  );
}

// ───────── Button ─────────
type ButtonVariant = 'primary' | 'dark' | 'ghost';
type ButtonSize = 'md' | 'lg';

export function Button({
  children,
  onClick,
  disabled,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  style,
  full,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit';
  style?: CSSProperties;
  full?: boolean;
}) {
  const bg =
    variant === 'primary'
      ? theme.palette.accent
      : variant === 'dark'
        ? theme.palette.dark
        : 'transparent';
  const color =
    variant === 'ghost' ? theme.palette.fg : theme.palette.onAccent;
  const border =
    variant === 'ghost' ? `1px solid ${theme.palette.border}` : 'none';
  const padding = size === 'lg' ? '18px 32px' : '14px 24px';
  const fontSize = size === 'lg' ? 16 : 15;

  const base: CSSProperties = {
    appearance: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: bg,
    color,
    border,
    padding,
    fontFamily: theme.fonts.body,
    fontSize,
    fontWeight: 600,
    letterSpacing: '-0.005em',
    borderRadius: theme.radius.pill,
    opacity: disabled ? 0.45 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: full ? '100%' : 'auto',
    boxShadow:
      variant === 'primary'
        ? '0 4px 14px rgba(108, 92, 231, 0.28)'
        : variant === 'dark'
          ? '0 4px 14px rgba(26, 29, 58, 0.18)'
          : 'none',
    ...style,
  };

  const Comp = href ? motion.a : motion.button;
  return (
    <Comp
      {...(href ? { href } : { type, onClick, disabled })}
      whileHover={disabled ? undefined : { scale: 1.025 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      style={base}
    >
      {children}
    </Comp>
  );
}

// ───────── Card ─────────
export function Card({
  children,
  style,
  hoverable,
  accent,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  hoverable?: boolean;
  accent?: boolean; // adds accent-tinted gradient corner
  className?: string;
}) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2, boxShadow: theme.shadow.cardHover } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
      style={{
        background: accent
          ? `linear-gradient(135deg, ${theme.palette.surface} 0%, ${theme.palette.accentBg} 100%)`
          : theme.palette.surface,
        border: `1px solid ${theme.palette.borderSoft}`,
        borderRadius: theme.radius.xl,
        boxShadow: theme.shadow.card,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ───────── ScrollReveal ─────────
// Wrap any block; fades + slides in on scroll-into-view.
export function ScrollReveal({
  children,
  variants = fadeUp,
  className,
  style,
  as = 'div',
}: {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'header';
}) {
  const Comp = as === 'section' ? motion.section : as === 'header' ? motion.header : motion.div;
  return (
    <Comp
      {...inViewProps}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </Comp>
  );
}

// Stagger container — children should use fadeUp (or similar) for cascade reveal.
export function ScrollStagger({
  children,
  className,
  style,
  variants = stagger,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variants?: Variants;
}) {
  return (
    <motion.div
      {...inViewProps}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
  variants = fadeUpSmall,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

// ───────── SectionTitle (centered eyebrow + h2 + sub) ─────────
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
}) {
  return (
    <ScrollReveal
      style={{
        textAlign: align,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap: 16,
        maxWidth: align === 'center' ? 720 : 'none',
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
      }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="h-section" style={{ margin: 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p className="t-lead" style={{ margin: 0, maxWidth: 560 }}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}

// ───────── Field (form input) ─────────
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
          fontFamily: theme.fonts.body,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.01em',
          color: theme.palette.fg,
        }}
      >
        {label}
        {optional && (
          <span style={{ color: theme.palette.fgSubtle, fontWeight: 500 }}>
            {' '}
            · optional
          </span>
        )}
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
          background: theme.palette.surface,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: theme.radius.md,
          padding: '14px 16px',
          fontSize: 16,
          fontFamily: theme.fonts.body,
          color: theme.palette.fg,
          outline: 'none',
          transition: 'border-color .15s, box-shadow .15s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = theme.palette.accent;
          e.currentTarget.style.boxShadow = `0 0 0 4px ${theme.palette.accentBg}`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = theme.palette.border;
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </label>
  );
}

// ───────── OptionCard (question option) ─────────
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
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.15 }}
      style={{
        appearance: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        background: selected ? theme.palette.accentBg : theme.palette.surface,
        color: theme.palette.fg,
        border: `1.5px solid ${selected ? theme.palette.accent : theme.palette.border}`,
        borderRadius: theme.radius.lg,
        padding: '18px 20px',
        fontFamily: theme.fonts.body,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        width: '100%',
        boxShadow: selected ? `0 0 0 4px ${theme.palette.accentBg}` : 'none',
        transition: 'background .15s, border-color .15s, box-shadow .15s',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>
          {label}
        </span>
        {sub && (
          <span style={{ fontSize: 14, color: theme.palette.fgMuted }}>{sub}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {badge && (
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: theme.palette.fgMuted,
              padding: '4px 8px',
              borderRadius: theme.radius.sm,
              background: theme.palette.bgSubtle,
            }}
          >
            {badge}
          </span>
        )}
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: multi ? 6 : 999,
            border: `1.5px solid ${selected ? theme.palette.accent : theme.palette.border}`,
            background: selected ? theme.palette.accent : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6L5 8.5L9.5 4"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </div>
    </motion.button>
  );
}

// ───────── ProgressBar ─────────
export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: theme.fonts.body,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: theme.palette.fgMuted,
        }}
      >
        Step {String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div
        style={{
          flex: 1,
          height: 4,
          background: theme.palette.bgSubtle,
          borderRadius: 999,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={false}
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            background: theme.palette.accent,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
}

// ───────── StepCircle (big purple numbered circle) ─────────
export function StepCircle({ n }: { n: number | string }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        flexShrink: 0,
        borderRadius: 999,
        background: theme.palette.accent,
        color: theme.palette.onAccent,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: theme.fonts.display,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '-0.01em',
      }}
    >
      {String(n).padStart(2, '0')}
    </div>
  );
}

// ───────── PillTag (used for floating hero tags) ─────────
export function PillTag({
  label,
  dotColor = theme.palette.accent,
  style,
}: {
  label: string;
  dotColor?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 18px',
        background: theme.palette.surface,
        border: `1px solid ${theme.palette.borderSoft}`,
        borderRadius: theme.radius.pill,
        boxShadow: theme.shadow.md,
        fontFamily: theme.fonts.body,
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.fg,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: dotColor,
        }}
      />
      {label}
    </div>
  );
}

// ───────── Star (testimonial ratings) ─────────
export function Star({ filled = true, size = 14 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5l2.06 4.18 4.61.67-3.34 3.25.79 4.59L8 12.04l-4.12 2.16.79-4.59L1.33 6.36l4.61-.67L8 1.5z"
        fill={filled ? theme.palette.accent : 'none'}
        stroke={theme.palette.accent}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
