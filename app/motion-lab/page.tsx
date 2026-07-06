'use client';

/**
 * /motion-lab — internal scroll-linked transition prototype.
 *
 * Not linked from the site, excluded from indexing.
 * Evaluates the Mellasia opening → Forno Nero handoff as one composed
 * sticky-stage scene, driven entirely by native scroll progress
 * (motion useScroll + useTransform, all mappings linear + reversible).
 *
 * Choreography (progress 0..1 across the 240vh container):
 *   0.00–0.12  hero at rest, Forno hidden
 *   0.10–0.30  Forno frame fades in while still low in the stage
 *   0.12–0.38  hero content (title, meta, rules, aperture) fades out, -28px lift
 *   0.15–0.75  Forno rises 78vh→0 and scales 0.84→1 (origin bottom-center)
 *   0.15–0.55  Forno top clip resolves 14%→0
 *   0.55–0.85  residual hero atmosphere tapers to 0.35 (continuity, not blackout)
 *   0.75–1.00  dwell — Forno dominant, stage settled
 *
 * To remove: delete the app/motion-lab/ folder.
 */

import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';

const FORNO_VIDEO_SRC = '/forno/forno-video-first.mp4';
// Final editorial width — dominant but never full-bleed (stage padding
// keeps it off the viewport edges on top of this cap).
const FORNO_FRAME_WIDTH = 'min(92vw, 1360px)';

export default function MotionLabPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  // 240vh container, 100vh sticky stage → 140vh of pinned scroll maps to 0..1.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ─── Forno frame ─────────────────────────────────────────────
  // Idiomatic framer style props (y / scale / opacity as MotionValues)
  // — a raw `transform` template string desyncs after re-renders
  // (resize snapshots the style and drops the subscription).
  const fornoOpacity = useTransform(scrollYProgress, [0.10, 0.30], [0, 1]);
  const fornoY       = useTransform(scrollYProgress, [0.15, 0.75], ['78vh', '0vh']);
  const fornoScale   = useTransform(scrollYProgress, [0.15, 0.75], [0.84, 1]);
  const fornoClipPct = useTransform(scrollYProgress, [0.15, 0.55], [14, 0]);
  const fornoClipPath: MotionValue<string> = useMotionTemplate`inset(${fornoClipPct}% 0 0 0)`;

  // ─── Hero content (title, meta, rules, aperture — one group) ─
  // Fully gone by 0.38, before Forno reaches its dominant position.
  const heroOpacity = useTransform(scrollYProgress, [0.12, 0.38], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0.12, 0.38], [0, -28]);

  // ─── Residual hero atmosphere ────────────────────────────────
  // The warm stage light persists after the type recedes, tapering only
  // once Forno is dominant. Continuity of the same cinematic space.
  const ambientOpacity = useTransform(scrollYProgress, [0.55, 0.85], [1, 0.35]);

  // ─── Imperative opacity writes ───────────────────────────────
  // framer v12 renders `opacity` MotionValues through WAAPI, which
  // desyncs from scroll progress on some machines (stale compositor
  // layer / lagging animation). Transforms track fine via the style
  // attribute, so only opacity is written manually here.
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const ambientLayerRef = useRef<HTMLDivElement>(null);
  const fornoLayerRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(heroOpacity, 'change', (v) => {
    const el = heroLayerRef.current;
    if (el) {
      el.style.opacity = String(v);
      // Fully release the compositor layer once invisible.
      el.style.visibility = v <= 0.001 ? 'hidden' : 'visible';
    }
  });
  useMotionValueEvent(ambientOpacity, 'change', (v) => {
    if (ambientLayerRef.current) ambientLayerRef.current.style.opacity = String(v);
  });
  useMotionValueEvent(fornoOpacity, 'change', (v) => {
    if (fornoLayerRef.current) fornoLayerRef.current.style.opacity = String(v);
  });

  // ─── Scroll-gated video playback (skipped under reduced motion) ─
  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;
    return scrollYProgress.on('change', (v) => {
      if (v >= 0.10 && video.paused) {
        video.play().catch(() => {});
      } else if (v < 0.10 && !video.paused) {
        video.pause();
      }
    });
  }, [scrollYProgress, reduced]);

  // ─── Reduced motion: no sticky choreography at all ───────────
  // Hero and Forno render as two normal in-flow blocks, static,
  // final-state. Video stays paused on its first frame.
  if (reduced) {
    return (
      <main style={{ background: 'var(--ink-0)', color: 'var(--bone-0)', minHeight: '100vh' }}>
        <LabHeader />
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <HeroAtmosphere />
          <div style={{ position: 'relative', width: '100%' }}>
            <HeroContent />
          </div>
        </section>
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 'clamp(24px,4vw,64px)',
          }}
        >
          <div
            className="lab-forno-frame grain grain-strong"
            style={{
              position: 'relative',
              width: FORNO_FRAME_WIDTH,
              aspectRatio: '21 / 9',
            }}
          >
            <FornoFrameContent videoRef={videoRef} />
          </div>
        </section>
        <LabFooter />
        <MobileStyles />
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--ink-0)', color: 'var(--bone-0)', minHeight: '100vh' }}>
      <LabHeader />

      {/* ─── Scroll container ─────────────────────────────────
          Tall outer + sticky inner stage = native browser scroll,
          no jacking, no lock, no hidden scrollbar. */}
      <div ref={containerRef} style={{ height: '240vh', position: 'relative' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: 'var(--ink-0)',
          }}
        >
          {/* ─── AMBIENT LAYER (z 0) — persists behind the handoff ─── */}
          <div
            ref={ambientLayerRef}
            aria-hidden
            style={{
              opacity: 1,
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <HeroAtmosphere />
          </div>

          {/* ─── HERO CONTENT LAYER (z 1) — fully gone by p 0.38 ─── */}
          <motion.div
            ref={heroLayerRef}
            style={{
              opacity: 1,
              y: heroY,
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              willChange: 'transform',
            }}
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <HeroContent />
            </div>
          </motion.div>

          {/* ─── FORNO LAYER (z 2) — rises 0.15→0.75 ─── */}
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
              ref={fornoLayerRef}
              className="lab-forno-frame grain grain-strong"
              style={{
                y: fornoY,
                scale: fornoScale,
                opacity: 0,
                clipPath: fornoClipPath,
                position: 'relative',
                width: FORNO_FRAME_WIDTH,
                aspectRatio: '21 / 9',
                transformOrigin: '50% 100%',
                willChange: 'transform, clip-path',
              }}
            >
              <FornoFrameContent videoRef={videoRef} />
            </motion.div>
          </div>

          {/* Progress strip — internal debug aid */}
          <ProgressStrip progress={scrollYProgress} reduced={false} />
        </div>
      </div>

      <LabFooter />
      <MobileStyles />
    </main>
  );
}

/* ─── Hero atmosphere — stage light, no type ──────────────────────
   Lens + cone + warm floor. Lives in the ambient layer so it outlasts
   the hero text during the handoff. */
function HeroAtmosphere() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        maxWidth: 1440,
        margin: '0 auto',
        pointerEvents: 'none',
      }}
    >
      {/* Overhead lens */}
      <span
        style={{
          position: 'absolute',
          top: 'clamp(48px, 8vh, 96px)',
          left: '19%',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,250,238,1) 0%, rgba(244,241,234,0.6) 35%, rgba(178,106,60,0.4) 65%, transparent 100%)',
          boxShadow:
            '0 0 22px rgba(244,241,234,0.45), 0 0 56px rgba(178,106,60,0.3)',
          opacity: 0.9,
        }}
      />
      {/* Light cone */}
      <span
        style={{
          position: 'absolute',
          top: 'clamp(52px, 8.5vh, 100px)',
          left: '19%',
          width: 380,
          height: 520,
          marginLeft: -184,
          background:
            'radial-gradient(ellipse 42% 100% at 50% 0%, rgba(244,241,234,0.20) 0%, rgba(244,241,234,0.10) 18%, rgba(178,106,60,0.06) 42%, transparent 86%)',
          filter: 'blur(14px)',
          opacity: 0.45,
          mixBlendMode: 'screen',
        }}
      />
      {/* Warm floor — reflected light at the base of the stage */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '45%',
          background:
            'radial-gradient(120% 80% at 50% 100%, rgba(178,106,60,0.07) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}

/* ─── Hero content — title card group (fades as one) ─────────────── */
function HeroContent() {
  return (
    <div
      className="lab-hero-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.25fr) minmax(0,1fr)',
        alignItems: 'center',
        gap: 'clamp(40px,6vw,96px)',
        maxWidth: 1440,
        margin: '0 auto',
        padding: 'clamp(108px,12vh,140px) clamp(20px,5vw,64px) clamp(64px,8vh,96px)',
      }}
    >
      {/* Left — opening title card */}
      <div style={{ position: 'relative' }}>
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

      {/* Right — echo aperture (fades with the group) */}
      <div
        className="lab-hero-aperture grain"
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
            background: 'linear-gradient(180deg,#100B08 0%,#0A0807 55%,#050403 100%)',
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
    </div>
  );
}

/* ─── Forno frame interior — atmosphere, video, scrim, titles ────── */
function FornoFrameContent({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  return (
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
      {/* CSS atmosphere — visible until the video's first frame paints */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #100B08 0%, #0A0807 50%, #050302 100%)',
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

      {/* Media slot — the real Forno footage */}
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
          src={FORNO_VIDEO_SRC}
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Editorial bottom scrim — constant, keeps the title legible
            over bright footage. Not animated. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 45%, rgba(5,3,2,0.72) 100%)',
          }}
        />
      </div>

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
    </div>
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
        Scroll slowly through the next section. The opening title card recedes
        as the Forno Nero frame rises into the same cinematic stage. Native
        scroll, sticky stage, no scroll lock. Test with Reduce Motion to
        verify the static fallback.
      </p>
    </header>
  );
}

function LabFooter() {
  return (
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
  );
}

function MobileStyles() {
  return (
    <style>{`
      @media (max-width: 900px) {
        .lab-hero-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
        .lab-hero-aperture {
          display: none !important;
        }
        .lab-forno-frame {
          aspect-ratio: 3 / 2 !important;
        }
      }
    `}</style>
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
