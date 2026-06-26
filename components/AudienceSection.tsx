'use client';

import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function AudienceSection() {
  const { t } = useLanguage();

  return (
    <section
      id="for-whom"
      style={{
        background: 'var(--ink-0)',
        padding: 'clamp(112px, 18vw, 200px) clamp(20px, 5vw, 60px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft ambient bloom upper-right — atmospheric, not decorative */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '60%',
          height: '90%',
          background:
            'radial-gradient(circle at 60% 40%, rgba(244,241,234,0.035) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
        <ScrollReveal>
          <p
            style={{
              color: 'var(--bone-mute)',
              fontFamily: "var(--font-ui), system-ui, sans-serif",
              fontSize: '10.5px',
              fontWeight: 500,
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(40px, 6vw, 64px)',
            }}
          >
            {t.forWhom.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(54px, 9vw, 132px)',
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: '-0.015em',
              color: 'var(--bone-0)',
              margin: '0 0 clamp(48px, 7vw, 80px) 0',
              maxWidth: '14ch',
            }}
          >
            {t.forWhom.title}{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--bone-1)' }}>
              {t.forWhom.titleItalic}
            </em>
          </h2>
        </ScrollReveal>

        <div
          className="audience-statement"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.55fr) minmax(0, 1fr)',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'baseline',
            paddingTop: 'clamp(40px, 6vw, 64px)',
            borderTop: '1px solid var(--rule)',
          }}
        >
          <ScrollReveal delay={0.14}>
            <span
              style={{
                color: 'var(--bone-mute)',
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: '10px',
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
              }}
            >
              Partners
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p
              style={{
                color: 'var(--bone-1)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: 0,
                maxWidth: '34ch',
              }}
            >
              {t.forWhom.body}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.28}>
          <p
            style={{
              color: 'var(--bone-dim)',
              fontFamily: "var(--font-ui), system-ui, sans-serif",
              fontSize: 'clamp(12px, 1vw, 13.5px)',
              fontWeight: 500,
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              margin: 'clamp(56px, 8vw, 88px) 0 0 0',
              lineHeight: 2.4,
            }}
          >
            {t.forWhom.tags.join('  /  ')}
          </p>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .audience-statement {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
