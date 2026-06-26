'use client';

import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function LabTeaserSection() {
  const { t } = useLanguage();

  return (
    <section
      id="lab"
      style={{
        background: 'var(--ink-0)',
        padding: 'clamp(96px, 14vw, 168px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Header */}
        <div
          className="lab-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.55fr) minmax(0, 1fr)',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'baseline',
            marginBottom: 'clamp(48px, 7vw, 72px)',
          }}
        >
          <ScrollReveal>
            <p
              style={{
                color: 'var(--bone-mute)',
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: '10.5px',
                fontWeight: 500,
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                margin: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--ember)',
                  boxShadow: '0 0 8px rgba(178,106,60,0.55)',
                }}
              />
              {t.lab.eyebrow}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: 'var(--bone-0)',
                margin: '0 0 clamp(20px, 3vw, 28px) 0',
              }}
            >
              {t.lab.title}{' '}
              <em style={{ fontStyle: 'normal', color: 'var(--bone-1)' }}>
                {t.lab.titleItalic}
              </em>
            </h2>

            <p
              style={{
                color: 'var(--bone-dim)',
                fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
                fontSize: 'clamp(15px, 1.3vw, 16.5px)',
                fontWeight: 300,
                lineHeight: 1.75,
                margin: 0,
                maxWidth: '52ch',
              }}
            >
              {t.lab.body}
            </p>
          </ScrollReveal>
        </div>

        {/* ─── Single intentional Lab teaser plate ─────────────────── */}
        <ScrollReveal delay={0.18}>
          <div
            className="lab-plate grain"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '21 / 9',
              background: 'var(--ink-1)',
              overflow: 'hidden',
              border: '1px solid var(--rule)',
            }}
          >
            {/* Deep ground */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, #0E0E0D 0%, #0A0A09 55%, #060605 100%)',
                zIndex: 1,
              }}
            />

            {/* Distant cool bloom — top center */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(80% 60% at 50% 25%, rgba(244,241,234,0.06) 0%, rgba(244,241,234,0.02) 35%, transparent 65%)',
                zIndex: 2,
              }}
            />

            {/* Faint ember undertone — barely there, lower-center */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(60% 40% at 50% 90%, rgba(178,106,60,0.08) 0%, transparent 55%)',
                zIndex: 2,
              }}
            />

            {/* Concentrating vignette */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(110% 80% at 50% 50%, transparent 30%, rgba(2,2,2,0.78) 95%)',
                zIndex: 3,
              }}
            />

            {/* Horizon hairline */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '14%',
                right: '14%',
                top: '62%',
                height: 1,
                background:
                  'linear-gradient(90deg, transparent 0%, var(--rule) 50%, transparent 100%)',
                zIndex: 3,
              }}
            />

            {/* Plate text — centered, restrained */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(16px, 2vw, 24px)',
                padding: 'clamp(28px, 4vw, 48px)',
                zIndex: 5,
                textAlign: 'center',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--ember-soft)',
                  boxShadow: '0 0 18px rgba(178,106,60,0.45)',
                }}
              />
              <p
                style={{
                  color: 'var(--bone-1)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4.4vw, 56px)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  maxWidth: '20ch',
                }}
              >
                {t.lab.slotStatus}
              </p>
              <span
                style={{
                  color: 'var(--bone-mute)',
                  fontFamily: "var(--font-ui), system-ui, sans-serif",
                  fontSize: '10.5px',
                  fontWeight: 500,
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                }}
              >
                Concept Lab · MMXXVI
              </span>
            </div>

            {/* Plate corner credits — small, editorial */}
            <span
              style={{
                position: 'absolute',
                top: 'clamp(20px, 2.5vw, 28px)',
                left: 'clamp(24px, 3.5vw, 40px)',
                color: 'var(--bone-mute)',
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: '10px',
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                zIndex: 5,
              }}
            >
              Lab · Frame Ø
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: 'clamp(20px, 2.5vw, 28px)',
                right: 'clamp(24px, 3.5vw, 40px)',
                color: 'var(--bone-mute)',
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: '10px',
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                zIndex: 5,
              }}
            >
              {t.lab.moreSoon}
            </span>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lab-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .lab-plate {
            aspect-ratio: 4 / 5 !important;
          }
        }
      `}</style>
    </section>
  );
}
