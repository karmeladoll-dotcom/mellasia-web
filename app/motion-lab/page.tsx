'use client';

/**
 * /motion-lab — internal scroll-linked transition prototype.
 *
 * Not linked from the site, excluded from indexing.
 * Built to evaluate the Mellasia opening → Forno Nero handoff
 * as one composed sticky-stage scene, controlled entirely by
 * native scroll progress via motion's useScroll + useTransform.
 *
 * To remove: delete the app/motion-lab/ folder.
 */

import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';

export default function MotionLabPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // 240vh of scroll distance → useScroll progress 0..1.
  // Sticky stage pins for 140vh of that, which is where the choreography plays.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ─── Forno frame transforms ──────────────────────────────────
  // 0.10 → frame fades in from below
  // 0.15..0.70 → rises 72vh → 0, scales 0.86 → 1, clip-top 18% → 0
  // 0.70..1.00 → fully settled, no further motion
  const fornoOpacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);
  const fornoYVh     = useTransform(scrollYProgress, [0.15, 0.70], [72, 0]);
  const fornoScale   = useTransform(scrollYProgress, [0.15, 0.70], [0.86, 1]);
  const fornoClipPct = useTransform(scrollYProgress, [0.15, 0.70], [18, 0]);

  const fornoTransform: MotionValue<string> = useMotionTemplate`translateY(${fornoYVh}vh) scale(${fornoScale})`;
  const fornoClipPath:  MotionValue<string> = useMotionTemplate`inset(${fornoClipPct}% 0 0 0)`;

  // ─── Hero recede (controlled) ────────────────────────────────
  // Stable 0..0.20, full fade-out across 0.20..0.60. Hero is fully gone
  // by the time the Forno frame becomes the dominant visual.
  const heroOpacity = useTransform(scrollYProgress, [0.20, 0.60], [1, 0]);
  const heroYPx     = useTransform(scrollYProgress, [0.20, 0.60], [0, -20]);
  const heroTransform: MotionValue<string> = useMotionTemplate`translateY(${heroYPx}px)`;

  // ─── Forno video playback (scroll-gated) ─────────────────────
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    return scrollYProgress.on('change', (v) => {
      if (v >= 0.10 && video.paused) {
        video.play().catch(() => {});
      } else if (v < 0.10 && !video.paused) {
        video.pause();
      }
    });
  }, [scrollYProgress]);

  // Static fallbacks under reduced motion.
  const fornoStyle = reduced
    ? { transform: 'translateY(0) scale(1)', opacity: 1, clipPath: 'inset(0 0 0 0)' }
    : { transform: fornoTransform, opacity: fornoOpacity, clipPath: fornoClipPath };

  const heroStyle = reduced
    ? { transform: 'translateY(0)', opacity: 1 }
    : { transform: heroTransform, opacity: heroOpacity };

  return (
    <main style={{ background: 'var(--ink-0)', color: 'var(--bone-0)', minHeight: '100vh' }}>
      <LabHeader />

      {/* ─── Scroll container ─────────────────────────────────
          Tall outer + sticky inner stage = native browser scroll,
          no jacking, no lock, no hidden scrollbar. */}
      <div
        ref={containerRef}
        style={{ height: '240vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: 'var(--ink-0)',
          }}
        >
          {/* ─── HERO LAYER (recedes only at 0.60→1.00) ─── */}
          <motion.div
            style={{
              ...heroStyle,
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1.25fr) minmax(0,1fr)',
              alignItems: 'center',
              gap: 'clamp(40px,6vw,96px)',
              maxWidth: 1440,
              margin: '0 auto',
              padding:
                'clamp(108px,12vh,140px) clamp(20px,5vw,64px) clamp(64px,8vh,96px)',
              willChange: 'transform, opacity',
            }}
          >
            {/* Left — Mellasia opening title card */}
            <div style={{ position: 'relative' }}>
              {/* Soft overhead light atmosphere (static, decorative) */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -80,
                  left: '28%',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(255,250,238,1) 0%, rgba(244,241,234,0.6) 35%, rgba(178,106,60,0.4) 65%, transparent 100%)',
                  boxShadow:
                    '0 0 22px rgba(244,241,234,0.45), 0 0 56px rgba(178,106,60,0.3)',
                  opacity: 0.9,
                  pointerEvents: 'none',
                }}
              />
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -68,
                  left: 'calc(28% - 180px)',
                  width: 360,
                  height: 480,
                  marginLeft: -180,
                  background:
                    'radial-gradient(ellipse 42% 100% at 50% 0%, rgba(244,241,234,0.20) 0%, rgba(244,241,234,0.10) 18%, rgba(178,106,60,0.06) 42%, transparent 86%)',
                  filter: 'blur(14px)',
                  opacity: 0.45,
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  fontFamily: 'var(--font-ui), system-ui, sans-serif',
                  fontSize: 10.5,
                  fontWeight: 500,
                  letterSpacing: '0.42em',
                  color: 'var(--bone-mute)',
                  textTransform: 'uppercase',
                  marginBottom: 'clamp(32px,5vw,48px)',
                }}
              >
                MELLASIA · STUDIO · ZAGREB / WORLDWIDE
              </div>

              <h1 style={{ margin: 0 }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(48px, 8.4vw, 128px)',
                    lineHeight: 0.94,
                    letterSpacing: '-0.02em',
                    color: 'var(--bone-0)',
                  }}
                >
                  Websites that feel
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'clamp(14px,2.2vw,24px)',
                    marginTop: 'clamp(8px,1vw,14px)',
                    paddingLeft: 'clamp(0px,6vw,100px)',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 'clamp(32px,5vw,72px)',
                      height: 1,
                      background: 'var(--ember)',
                      alignSelf: 'center',
                      flex: '0 0 auto',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      fontSize: 'clamp(42px, 7.4vw, 116px)',
                      lineHeight: 0.96,
                      letterSpacing: '-0.02em',
                      color: 'var(--bone-1)',
                      display: 'inline-block',
                    }}
                  >
                    like a{' '}
                    <em
                      style={{
                        fontFamily: 'var(--font-accent)',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        letterSpacing: '-0.025em',
                        fontSize: '1.06em',
                        color: 'var(--bone-0)',
                      }}
                    >
                      world
                    </em>
                    <span style={{ color: 'var(--ember)' }}>.</span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Right — small echo aperture (same language as homepage) */}
            <div
              className="grain"
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                background: 'var(--ink-warm-1)',
                overflow: 'hidden',
                boxShadow:
                  'inset 0 1px 0 rgba(244,241,234,0.06), 0 80px 120px -60px rgba(0,0,0,0.9)',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg,#100B08 0%,#0A0807 55%,#050403 100%)',
                  zIndex: 1,
                }}
              />
              <div
                aria-hidden
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
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(120% 90% at 50% 45%, transparent 30%, rgba(3,2,1,0.65) 95%)',
                  zIndex: 3,
                }}
              />
            </div>
          </motion.div>

          {/* ─── FORNO LAYER — rises from below 0.15→0.70 ─── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              pointerEvents: 'none',
              padding: 'clamp(24px,4vw,64px)',
            }}
          >
            <motion.div
              style={{
                ...fornoStyle,
                position: 'relative',
                width: 'min(96vw, 1440px)',
                aspectRatio: '21 / 9',
                transformOrigin: '50% 50%',
                willChange: 'transform, opacity, clip-path',
              }}
              className="grain grain-strong"
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--ink-warm-1)',
                  overflow: 'hidden',
                  boxShadow:
                    'inset 0 1px 0 rgba(244,241,234,0.05), 0 100px 140px -70px rgba(0,0,0,0.95)',
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, #100B08 0%, #0A0807 50%, #050302 100%)',
                    zIndex: 1,
                  }}
                />
                <div
                  aria-hidden
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
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    right: '-5%',
                    top: '-20%',
                    width: '55%',
                    height: '90%',
                    background:
                      'radial-gradient(circle at 70% 30%, rgba(244,241,234,0.08) 0%, transparent 65%)',
                    filter: 'blur(6px)',
                    zIndex: 2,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(100% 75% at 38% 60%, transparent 35%, rgba(2,2,1,0.78) 95%)',
                    zIndex: 3,
                  }}
                />
                <div
                  aria-hidden
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

                {/* Top-left status */}
                <span
                  style={{
                    position: 'absolute',
                    top: 'clamp(20px,2.5vw,32px)',
                    left: 'clamp(24px,3.5vw,40px)',
                    color: 'var(--bone-dim)',
                    fontFamily: 'var(--font-ui), system-ui, sans-serif',
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.36em',
                    textTransform: 'uppercase',
                    zIndex: 5,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--ember)',
                      boxShadow: '0 0 12px rgba(178,106,60,0.6)',
                    }}
                  />
                  Featured project · 01
                </span>

                {/* Bottom title block */}
                <div
                  style={{
                    position: 'absolute',
                    left: 'clamp(24px,3.5vw,40px)',
                    right: 'clamp(24px,3.5vw,40px)',
                    bottom: 'clamp(28px,4vw,44px)',
                    zIndex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(10px,1.4vw,16px)',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--bone-mute)',
                      fontFamily: 'var(--font-ui), system-ui, sans-serif',
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: '0.36em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Hospitality · Digital Experience
                  </span>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--bone-0)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(44px, 7.4vw, 112px)',
                      fontWeight: 400,
                      lineHeight: 0.96,
                      letterSpacing: '-0.025em',
                    }}
                  >
                    Forno Nero
                  </p>
                </div>

                {/* Bottom-right credit */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 'clamp(20px,2.5vw,32px)',
                    right: 'clamp(24px,3.5vw,40px)',
                    color: 'var(--bone-mute)',
                    fontFamily: 'var(--font-ui), system-ui, sans-serif',
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.36em',
                    textTransform: 'uppercase',
                    zIndex: 5,
                  }}
                >
                  MMXXVI
                </span>

                <div
                  className="forno-media-slot"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 4,
                    pointerEvents: 'none',
                  }}
                >
                  <video
                    ref={videoRef}
                    src="/forno/forno-video-first.mp4"
                    muted
                    loop
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Progress strip — internal debug aid */}
          <ProgressStrip progress={scrollYProgress} reduced={!!reduced} />
        </div>
      </div>

      {/* After-stage spacer so the prototype boundary is clear */}
      <footer
        style={{
          padding: 'clamp(64px,10vw,120px) clamp(24px,5vw,80px)',
          borderTop: '1px solid var(--rule)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
            fontSize: 11,
            letterSpacing: '0.36em',
            color: 'var(--bone-mute)',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          End of prototype
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
            fontSize: 14,
            color: 'var(--bone-dim)',
            maxWidth: 540,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Scroll back up to replay the choreography in reverse. Sticky stage
          releases here — native scroll continues normally past this point.
        </p>
      </footer>
    </main>
  );
}

function LabHeader() {
  return (
    <header
      style={{
        padding: 'clamp(40px,6vw,72px) clamp(24px,5vw,64px) clamp(28px,3vw,40px)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-ui), system-ui, sans-serif',
          fontSize: 11,
          letterSpacing: '0.36em',
          color: 'var(--bone-mute)',
          textTransform: 'uppercase',
          marginBottom: 14,
        }}
      >
        Motion Lab · Internal Prototype · Not Linked
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(28px,3.6vw,48px)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--bone-0)',
        }}
      >
        Mellasia opening frame{' '}
        <span style={{ color: 'var(--bone-1)' }}>→ Forno Nero world.</span>
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
          fontSize: 14,
          color: 'var(--bone-dim)',
          maxWidth: 620,
          marginTop: 18,
          lineHeight: 1.7,
        }}
      >
        Scroll slowly through the next section. The opening title card holds
        its place while the Forno Nero frame rises from below into the same
        cinematic stage. Native scroll, sticky stage, no scroll lock. Test
        with Reduce Motion to verify the static fallback.
      </p>
    </header>
  );
}

function ProgressStrip({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const widthPct = useTransform(progress, [0, 1], ['0%', '100%']);
  const width = useMotionTemplate`${widthPct}`;
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-ui), system-ui, sans-serif',
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.36em',
          color: 'var(--bone-mute)',
          textTransform: 'uppercase',
        }}
      >
        Stage progress{reduced ? ' · reduced motion' : ''}
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 1,
          background: 'var(--rule)',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            background: 'var(--ember)',
            width: reduced ? '100%' : width,
          }}
        />
      </div>
    </div>
  );
}
