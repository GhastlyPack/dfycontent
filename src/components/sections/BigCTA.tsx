'use client';

import { motion } from 'framer-motion';
import { theme } from '@/lib/theme';
import { Button, Container, ScrollReveal } from '@/components/atoms';
import type { Variant } from '@/lib/variants';

export function BigCTA({ variant }: { variant: Variant }) {
  return (
    <section className="section" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <Container>
        <ScrollReveal
          style={{
            position: 'relative',
            borderRadius: theme.radius.xxl,
            background: `linear-gradient(135deg, ${theme.palette.accent} 0%, ${theme.palette.accentSoft} 100%)`,
            padding: '56px 28px',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(108, 92, 231, 0.32)',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            aria-hidden
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: 320,
              height: 320,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.16)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '-40%',
              left: '-10%',
              width: 360,
              height: 360,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <h2
              className="h-section"
              style={{
                margin: 0,
                color: '#fff',
              }}
            >
              {variant.bigCta.title}
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: theme.fonts.body,
                fontSize: 17,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: 480,
                lineHeight: 1.5,
              }}
            >
              {variant.bigCta.sub}
            </p>
            <div style={{ marginTop: 12 }}>
              <Button
                href="/apply"
                size="lg"
                style={{
                  background: '#fff',
                  color: theme.palette.accent,
                  boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
                }}
              >
                Start qualifying  →
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
