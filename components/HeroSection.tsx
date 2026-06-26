'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * HeroSection — typographic poster.
 *
 * Composition rules:
 *   • Display line 1 carries the page (uppercase, condensed, 900).
 *   • Italic serif accent appears once, at "world.", as the controlled second voice.
 *   • Inter handles every neutral surface (meta, body, CTAs).
 *   • Aperture, grid, ember palette and the original single-reveal animation are preserved.
 */
export default function HeroSection() {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const apertureRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const aperture = apertureRef.current;
    if (aperture) {
      if (prefersReduced) {
        aperture.style.opacity = '1';
        aperture.style.filter = 'none';
        aperture.style.transform = 'none';
      } else {
        aperture.style.animation = 'apertureReveal 1800ms cubic-bezier(0.16,1,0.3,1) both';
      }
    }

    elementsRef.current.forEach((el, i) => {
      if (!el) return;
      if (prefersReduced) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        return;
      }
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      window.setTimeout(() => {
        if (!el) return;
        el.style.transition =
          'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 380 + i * 110);
    });
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    elementsRef.current[i] = el;
  };

  const scrollTo = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  // Split "like a world." → "like a " + "world" + "." so only the noun
  // takes the expressive italic. Translations remain authoritative.
  const accentText = t.hero.titleLine2.replace(/[.!?]+\s*$/, '');
  const accentPunct = t.hero.titleLine2.slice(accentText.length);
  const accentWords = accentText.trim().split(/\s+/);
  const accentLead = accentWords.slice(0, -1).join(' ');
  const accentNoun = accentWords[accentWords.length - 1] ?? '';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: 'var(--ink-0)',
        overflow: 'hidden',
      }}
    >
      {/* Section-wide ambient floor — reflected light at the bottom of the stage. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 60% at 50% 100%, rgba(178,106,60,0.05) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="hero-grid"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          alignItems: 'center',
          gap: 'clamp(40px, 6vw, 96px)',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: 'clamp(140px, 14vh, 180px) clamp(20px, 5vw, 64px) clamp(96px, 12vh, 140px)',
          minHeight: '100svh',
          zIndex: 2,
        }}
      >
        {/* ─── Left: typographic poster ──────────────────────────── */}
        <div className="hero-text-column" style={{ position: 'relative', zIndex: 2 }}>
          {/* Cinematic overhead projector — lens + cone of light. */}
          <div className="hero-spotlight" aria-hidden="true">
            <span className="hero-spotlight-lens" />
            <span className="hero-spotlight-cone" />
          </div>

          <span
            ref={setRef(0)}
            style={{
              display: 'inline-block',
              color: 'var(--bone-mute)',
              fontFamily: 'var(--font-ui), system-ui, sans-serif',
              fontSize: '10.5px',
              fontWeight: 500,
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(40px, 6vw, 56px)',
            }}
          >
            {t.hero.meta}
          </span>

          {/* H1 — single static layer. Gambarino display + one Telma noun.
              No bright overlay, no mask reveal. Layout is stable. */}
          <h1
            className="hero-title"
            style={{
              margin: '0 0 36px 0',
            }}
          >
            <span
              ref={setRef(1)}
              className="hero-display"
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(56px, 10.8vw, 168px)',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: 'var(--bone-0)',
              }}
            >
              {t.hero.titleLine1}
            </span>

            <span
              ref={setRef(2)}
              className="hero-accent-row"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'clamp(14px, 2.2vw, 28px)',
                marginTop: 'clamp(8px, 1vw, 16px)',
                paddingLeft: 'clamp(0px, 8vw, 132px)',
              }}
            >
              <span
                aria-hidden="true"
                className="hero-accent-rule"
                style={{
                  width: 'clamp(36px, 6vw, 88px)',
                  height: 1,
                  background: 'var(--ember)',
                  alignSelf: 'center',
                  flex: '0 0 auto',
                }}
              />
              <span
                className="hero-accent-text"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(48px, 9.6vw, 152px)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.02em',
                  display: 'inline-block',
                  color: 'var(--bone-1)',
                }}
              >
                {accentLead && (
                  <span style={{ marginRight: '0.18em' }}>{accentLead}</span>
                )}
                <em
                  className="hero-accent-noun"
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    letterSpacing: '-0.025em',
                    fontSize: '1.08em',
                    color: 'var(--bone-0)',
                  }}
                >
                  {accentNoun}
                </em>
                <span style={{ color: 'var(--ember)' }}>{accentPunct || '.'}</span>
              </span>
            </span>
          </h1>

          <p
            ref={setRef(3)}
            style={{
              maxWidth: '460px',
              color: 'var(--bone-dim)',
              fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
              fontSize: 'clamp(15px, 1.35vw, 17px)',
              fontWeight: 300,
              lineHeight: 1.75,
              margin: 'clamp(28px, 4vw, 40px) 0 clamp(40px, 5vw, 52px) 0',
              letterSpacing: '0.005em',
            }}
          >
            {t.hero.subtitle}
          </p>

          <div
            ref={setRef(4)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}
          >
            <a
              href="#work"
              onClick={scrollTo('#work')}
              className="hero-cta-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bone-0)',
                color: 'var(--ink-0)',
                fontFamily: 'var(--font-ui), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                padding: '14px 26px',
                borderRadius: '2px',
                textDecoration: 'none',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
              }}
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#contact"
              onClick={scrollTo('#contact')}
              className="hero-cta-ghost"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: 'var(--bone-0)',
                fontFamily: 'var(--font-ui), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                padding: '14px 26px',
                borderRadius: '2px',
                border: '1px solid var(--rule-strong)',
                textDecoration: 'none',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
            >
              {t.hero.ctaGhost}
            </a>
          </div>
        </div>

        {/* ─── Right: the Aperture (unchanged) ───────────────────── */}
        <div
          ref={apertureRef}
          className="hero-aperture grain"
          style={{
            position: 'relative',
            aspectRatio: '4 / 5',
            background: 'var(--ink-warm-1)',
            overflow: 'hidden',
            boxShadow:
              'inset 0 1px 0 rgba(244,241,234,0.06), 0 80px 120px -60px rgba(0,0,0,0.9)',
            willChange: 'opacity, filter, transform',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, #100B08 0%, #0A0807 55%, #050403 100%)',
              zIndex: 1,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-10%',
              bottom: '-10%',
              left: '52%',
              width: '38%',
              transform: 'translateX(-50%)',
              background:
                'radial-gradient(ellipse 38% 60% at 50% 38%, rgba(244,241,234,0.16) 0%, rgba(244,241,234,0.04) 35%, transparent 65%)',
              filter: 'blur(8px)',
              zIndex: 2,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '40%',
              background:
                'linear-gradient(180deg, transparent 0%, rgba(244,241,234,0.04) 60%, rgba(244,241,234,0.02) 100%)',
              zIndex: 2,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-10%',
              bottom: '-15%',
              width: '70%',
              height: '60%',
              background:
                'radial-gradient(circle at 30% 70%, rgba(178,106,60,0.22) 0%, rgba(178,106,60,0.06) 35%, transparent 60%)',
              filter: 'blur(6px)',
              zIndex: 2,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(120% 90% at 50% 45%, transparent 30%, rgba(3,2,1,0.65) 95%)',
              zIndex: 3,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '14%',
              right: '14%',
              top: '64%',
              height: 1,
              background:
                'linear-gradient(90deg, transparent 0%, var(--rule-strong) 50%, transparent 100%)',
              zIndex: 3,
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: 22,
              left: 24,
              color: 'var(--bone-mute)',
              fontFamily: 'var(--font-ui), system-ui, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              zIndex: 5,
            }}
          >
            I.
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: 22,
              right: 24,
              color: 'var(--bone-mute)',
              fontFamily: 'var(--font-ui), system-ui, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              zIndex: 5,
            }}
          >
            {t.hero.frameLabel}
          </span>
        </div>
      </div>

      {/* Static scroll cue — no loop animation. */}
      <div
        className="hero-scroll-cue"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 3,
        }}
      >
        <span
          style={{
            color: 'var(--bone-mute)',
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
          }}
        >
          {t.hero.scroll}
        </span>
        <div className="hairline-v" />
      </div>

      <style>{`
        /* ─── Cinematic overhead projector — primary hero signature ─── */
        /* Wrapper sits inside the left text column and overlays the title.   */
        .hero-spotlight {
          position: absolute;
          top: clamp(-110px, -8vh, -70px);
          left: 0;
          right: 0;
          height: clamp(420px, 70vh, 660px);
          pointer-events: none;
          z-index: 1;
          overflow: visible;
        }

        /* Lens — small ivory/brass source at top centre of the cone. */
        .hero-spotlight-lens {
          position: absolute;
          top: 0;
          left: clamp(26%, 30%, 34%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 250, 238, 1) 0%,
            rgba(244, 241, 234, 0.65) 35%,
            rgba(178, 106, 60, 0.4) 65%,
            transparent 100%
          );
          box-shadow:
            0 0 22px rgba(244, 241, 234, 0.55),
            0 0 56px rgba(178, 106, 60, 0.32);
          opacity: 0;
          transform: scale(0.6);
          animation: heroLensIgnite 1300ms cubic-bezier(0.22, 1, 0.36, 1) 150ms forwards;
        }

        /* Cone — soft atmospheric vertical shaft opening downward. */
        .hero-spotlight-cone {
          position: absolute;
          top: 4px;
          left: calc(clamp(26%, 30%, 34%) + 7px);
          width: clamp(280px, 38vw, 460px);
          height: clamp(380px, 60vh, 580px);
          margin-left: calc(clamp(280px, 38vw, 460px) / -2);
          background: radial-gradient(
            ellipse 42% 100% at 50% 0%,
            rgba(244, 241, 234, 0.20) 0%,
            rgba(244, 241, 234, 0.11) 18%,
            rgba(178, 106, 60, 0.06) 42%,
            rgba(126, 106, 74, 0.03) 62%,
            transparent 86%
          );
          filter: blur(14px);
          opacity: 0;
          transform: scaleX(0.06) scaleY(0.55);
          transform-origin: 50% 0%;
          mix-blend-mode: screen;
          animation: heroConeOpen 1900ms cubic-bezier(0.22, 1, 0.36, 1) 380ms forwards;
        }

        @keyframes heroLensIgnite {
          0%   { opacity: 0;    transform: scale(0.6); }
          35%  { opacity: 1;    transform: scale(1.15); }
          50%  { opacity: 0.72; transform: scale(1.05); }
          70%  { opacity: 1;    transform: scale(1.02); }
          100% { opacity: 0.9;  transform: scale(1); }
        }

        /* Cone opens and settles to a calm atmospheric presence.
           Stays subtle — never reads as a flashlight beam. */
        @keyframes heroConeOpen {
          0%   { opacity: 0;    transform: scaleX(0.06) scaleY(0.55); }
          24%  { opacity: 0.40; }
          60%  { opacity: 0.55; transform: scaleX(1.02) scaleY(1.01); }
          100% { opacity: 0.45; transform: scaleX(1)    scaleY(1); }
        }

        /* Telma "world." — restrained ivory/brass bloom behind the noun.
           Static after the bloom fades in. No flicker, no per-word animation. */
        .hero-accent-noun {
          position: relative;
          display: inline-block;
        }
        .hero-accent-noun::after {
          content: '';
          position: absolute;
          left: -18%;
          right: -18%;
          top: -14%;
          bottom: -18%;
          background: radial-gradient(
            ellipse 60% 65% at 50% 55%,
            rgba(178, 106, 60, 0.18) 0%,
            rgba(126, 106, 74, 0.10) 38%,
            transparent 72%
          );
          filter: blur(18px);
          opacity: 0;
          z-index: -1;
          pointer-events: none;
          animation: heroNounBloom 1400ms cubic-bezier(0.22, 1, 0.36, 1) 1500ms forwards;
        }
        @keyframes heroNounBloom {
          0%   { opacity: 0; }
          100% { opacity: 0.85; }
        }

        /* Reduced-motion contract — final calm state, no animation. */
        @media (prefers-reduced-motion: reduce) {
          .hero-spotlight-lens,
          .hero-spotlight-cone,
          .hero-accent-noun::after {
            animation: none !important;
          }
          .hero-spotlight-lens { opacity: 0.9; transform: scale(1); }
          .hero-spotlight-cone { opacity: 0.45; transform: scaleX(1) scaleY(1); }
          .hero-accent-noun::after { opacity: 0.85; }
        }

        .hero-cta-primary:hover {
          transform: translateY(-1px);
          background: #ffffff;
        }
        .hero-cta-ghost:hover {
          border-color: var(--bone-0);
          color: var(--bone-0);
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
            padding-top: 128px !important;
          }
          .hero-aperture {
            aspect-ratio: 3 / 4 !important;
            order: -1;
          }
          .hero-accent-row {
            padding-left: 0 !important;
            gap: 14px !important;
          }
        }
        @media (max-width: 600px) {
          .hero-aperture { aspect-ratio: 4 / 5 !important; }
          .hero-scroll-cue { display: none !important; }
          .hero-accent-rule {
            width: 28px !important;
          }
          /* Keep the projector cone scaled to the phone viewport. */
          .hero-spotlight {
            top: -64px;
            height: 360px;
          }
          .hero-spotlight-lens {
            left: 24%;
            width: 11px;
            height: 11px;
          }
          .hero-spotlight-cone {
            left: calc(24% + 6px);
            width: 78vw;
            height: 320px;
            margin-left: -39vw;
            filter: blur(12px);
          }
        }
      `}</style>
    </section>
  );
}
