'use client';

import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';
import { featuredWork } from '@/lib/content/works';

export default function FeaturedWorkSection() {
  const { t } = useLanguage();
  const liveUrl = featuredWork.liveUrl.trim();
  const hasLive = liveUrl.length > 0;

  return (
    <section
      id="work"
      style={{
        background: 'var(--ink-0)',
        padding: 'clamp(96px, 14vw, 168px) clamp(20px, 5vw, 60px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section header */}
        <div
          className="featured-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.55fr) minmax(0, 1fr)',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'end',
            marginBottom: 'clamp(56px, 8vw, 88px)',
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
              }}
            >
              {t.work.eyebrow}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.2vw, 56px)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--bone-0)',
                margin: 0,
              }}
            >
              {t.work.title}{' '}
              <span style={{ color: 'var(--bone-1)' }}>{t.work.titleItalic}</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* ─── Wide cinematic title-card plate ────────────────────── */}
        <ScrollReveal delay={0.14}>
          <div
            className="featured-plate grain grain-strong"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '21 / 9',
              background: 'var(--ink-warm-1)',
              overflow: 'hidden',
              boxShadow:
                'inset 0 1px 0 rgba(244,241,234,0.05), 0 100px 140px -70px rgba(0,0,0,0.95)',
            }}
          >
            {/* Deep warm under-ground */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, #100B08 0%, #0A0807 50%, #050302 100%)',
                zIndex: 1,
              }}
            />

            {/* Ember source — low-left, suggesting an oven mouth */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-8%',
                bottom: '-20%',
                width: '70%',
                height: '110%',
                background:
                  'radial-gradient(circle at 35% 78%, rgba(178,106,60,0.46) 0%, rgba(178,106,60,0.16) 28%, rgba(178,106,60,0.04) 50%, transparent 70%)',
                filter: 'blur(4px)',
                zIndex: 2,
              }}
            />

            {/* Counter-light — soft cool bloom on the upper-right */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: '-5%',
                top: '-20%',
                width: '55%',
                height: '90%',
                background:
                  'radial-gradient(circle at 70% 30%, rgba(244,241,234,0.08) 0%, rgba(244,241,234,0.02) 40%, transparent 65%)',
                filter: 'blur(6px)',
                zIndex: 2,
              }}
            />

            {/* Atmospheric heat shimmer band */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '8%',
                height: '20%',
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(178,106,60,0.10) 60%, transparent 100%)',
                filter: 'blur(8px)',
                zIndex: 2,
              }}
            />

            {/* Vignette — concentrates focus on title */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(100% 75% at 38% 60%, transparent 35%, rgba(2,2,1,0.78) 95%)',
                zIndex: 3,
              }}
            />

            {/* Horizon line — restrained scene rule */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '12%',
                right: '12%',
                top: '70%',
                height: 1,
                background:
                  'linear-gradient(90deg, transparent 0%, var(--rule-strong) 50%, transparent 100%)',
                zIndex: 3,
              }}
            />

            {/* ─── Plate overlay text ────────────────────────────── */}
            {/* Top-left: status */}
            <span
              style={{
                position: 'absolute',
                top: 'clamp(20px, 2.5vw, 32px)',
                left: 'clamp(24px, 3.5vw, 48px)',
                color: 'var(--bone-dim)',
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: '10px',
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                zIndex: 5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--ember)',
                  boxShadow: '0 0 12px rgba(178,106,60,0.6)',
                }}
              />
              {t.work.statusLabel} · 01
            </span>

            {/* Top-right: fallback note */}
            <span
              style={{
                position: 'absolute',
                top: 'clamp(20px, 2.5vw, 32px)',
                right: 'clamp(24px, 3.5vw, 48px)',
                color: 'var(--bone-mute)',
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: '10px',
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                zIndex: 5,
              }}
            >
              {t.work.fallbackNote}
            </span>

            {/* Center-left: title block */}
            <div
              style={{
                position: 'absolute',
                left: 'clamp(24px, 3.5vw, 48px)',
                right: 'clamp(24px, 3.5vw, 48px)',
                bottom: 'clamp(32px, 4vw, 52px)',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(12px, 1.5vw, 20px)',
              }}
            >
              <span
                style={{
                  color: 'var(--bone-mute)',
                  fontFamily: "var(--font-ui), system-ui, sans-serif",
                  fontSize: '10px',
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                }}
              >
                {t.work.category}
              </span>
              <p
                style={{
                  color: 'var(--bone-0)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(56px, 10vw, 148px)',
                  fontWeight: 400,
                  lineHeight: 0.96,
                  letterSpacing: '-0.025em',
                  margin: 0,
                }}
              >
                {t.work.name}
              </p>
              <p
                style={{
                  color: 'var(--bone-1)',
                  fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
                  fontSize: 'clamp(15px, 1.4vw, 17px)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  letterSpacing: '0.005em',
                  margin: 0,
                  maxWidth: '46ch',
                }}
              >
                {t.work.tagline}
              </p>
            </div>

            {/* Bottom-right: frame credit */}
            <span
              style={{
                position: 'absolute',
                bottom: 'clamp(20px, 2.5vw, 32px)',
                right: 'clamp(24px, 3.5vw, 48px)',
                color: 'var(--bone-mute)',
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: '10px',
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                zIndex: 5,
              }}
            >
              MMXXVI
            </span>
          </div>
        </ScrollReveal>

        {/* ─── Editorial credit row beneath the plate ────────────── */}
        <ScrollReveal delay={0.22}>
          <div
            className="featured-credit"
            style={{
              marginTop: 'clamp(36px, 5vw, 52px)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.4fr) minmax(0, 1fr) auto',
              gap: 'clamp(28px, 4vw, 56px)',
              alignItems: 'start',
              paddingTop: 'clamp(20px, 3vw, 28px)',
              borderTop: '1px solid var(--rule)',
            }}
          >
            <span
              style={{
                color: 'var(--bone-mute)',
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: '10px',
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
              }}
            >
              {t.work.category}
            </span>

            <p
              style={{
                color: 'var(--bone-dim)',
                fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
                fontSize: 'clamp(15px, 1.3vw, 16.5px)',
                fontWeight: 300,
                lineHeight: 1.75,
                margin: 0,
                maxWidth: '60ch',
              }}
            >
              {t.work.description}
            </p>

            <div style={{ justifySelf: 'end' }}>
              {hasLive ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-work-live"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'var(--bone-0)',
                    fontFamily: "var(--font-ui), system-ui, sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    padding: '13px 22px',
                    border: '1px solid var(--rule-strong)',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                  }}
                >
                  <span>{t.work.viewLive}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span
                  style={{
                    color: 'var(--bone-mute)',
                    fontFamily: "var(--font-ui), system-ui, sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.work.viewLive} — link pending
                </span>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .featured-work-live:hover {
          border-color: var(--bone-0);
          background: rgba(244,241,234,0.04);
        }
        @media (max-width: 900px) {
          .featured-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            align-items: start !important;
          }
          .featured-plate {
            aspect-ratio: 4 / 5 !important;
          }
          .featured-credit {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .featured-credit > div:last-child { justify-self: start !important; }
        }
      `}</style>
    </section>
  );
}
