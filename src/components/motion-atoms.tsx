'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

/**
 * Motion primitives used across architectural variants.
 * All respect `prefers-reduced-motion`.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ───────── CountUp ─────────
// Animates a number from 0 → `to` once it enters the viewport.
export function CountUp({
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  className,
  style,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame: number;
    const start = performance.now();
    const dur = duration * 1000;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setValue(easeOut(t) * to);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  // For integer counts use round; for floats, leave 1 decimal
  const formatted = Number.isInteger(to) ? Math.round(value).toString() : value.toFixed(1);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ───────── LetterReveal / WordReveal ─────────
// Splits a string and reveals letter-by-letter or word-by-word.
export function WordReveal({
  text,
  delay = 0,
  stagger = 0.05,
  className,
  style,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) {
    return <span className={className} style={style}>{text}</span>;
  }

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.06em' }}>
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
            style={{ display: 'inline-block', marginRight: i < words.length - 1 ? '0.28em' : 0 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ───────── MagneticHover ─────────
// 3D tilt that follows the cursor. Use sparingly on hero cards.
export function MagneticHover({
  children,
  strength = 8,
  scale = 1.015,
  className,
  style,
}: {
  children: ReactNode;
  strength?: number; // deg of tilt at max distance
  scale?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 250, damping: 22 });

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 22 } }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ───────── Marquee ─────────
// CSS-driven infinite horizontal scroll. Provide content twice (or set
// `repeat=true` and we'll duplicate the children).
export function Marquee({
  children,
  speed = 36,
  reverse = false,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number; // seconds for one full loop
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={{ overflow: 'hidden', display: 'flex', ...style }}>
      <div
        style={{
          display: 'flex',
          gap: 'inherit',
          whiteSpace: 'nowrap',
          animation: `dfyMarquee ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

// ───────── Reveal ─────────
// Generic fade-up wrapper. Use for ordinary section reveals.
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className,
  style,
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  amount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ───────── StaggerGroup ─────────
export const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerGroup({
  children,
  className,
  style,
  amount = 0.15,
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  amount?: number;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div variants={staggerChildVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

// ───────── SparklinePath ─────────
// SVG path that draws itself once when in view.
export function SparklinePath({
  d,
  color = '#000',
  strokeWidth = 2,
  duration = 1.2,
  delay = 0,
}: {
  d: string;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <motion.path
      ref={ref}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: reduce ? 1 : 0 }}
      animate={{ pathLength: inView ? 1 : reduce ? 1 : 0 }}
      transition={{ duration, delay, ease: EASE }}
    />
  );
}
