'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * SpotlightStatement — editorial spotlight reveal.
 *
 * Behaviour:
 *   • IntersectionObserver wakes the component when ~30% of the statement is visible.
 *   • A ~900 ms gate lets the section's entrance reveal settle first.
 *   • Then a soft oval light sweeps left → right across the full sentence
 *     over 2600 ms, while the sentence brightens to soft-bone.
 *   • "feel" and "decide" finish brighter than the surrounding words and
 *     hold a subtle luminous state after the sweep.
 *   • A warm/brass aperture halo fades in behind the text and stays.
 *   • Re-plays every time the Studio section re-enters the viewport
 *     (no IntersectionObserver disconnect — toggled state drives the class).
 *   • prefers-reduced-motion → final state shown immediately, no transitions.
 */
export default function SpotlightStatement() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [sweeping, setSweeping] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return;
    }

    let sweepTimer: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            // Wait for the section's own entrance reveal to settle,
            // then run the sweep.
            sweepTimer = window.setTimeout(() => setSweeping(true), 900);
          } else {
            // Reset so the next entry replays the animation cleanly.
            if (sweepTimer !== undefined) {
              window.clearTimeout(sweepTimer);
              sweepTimer = undefined;
            }
            setSweeping(false);
            setActive(false);
          }
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (sweepTimer !== undefined) window.clearTimeout(sweepTimer);
    };
  }, []);

  const className = [
    'spotlight-statement',
    active ? 'is-active' : '',
    sweeping ? 'is-sweeping' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={className}
      aria-label="What should someone feel before they decide?"
    >
      <p className="spotlight-text">
        What should someone{' '}
        <span className="spotlight-word spotlight-word--a">feel</span>
        {' '}before they{' '}
        <span className="spotlight-word spotlight-word--b">decide</span>?
      </p>

      {/* Sweep overlay — a soft oval that translates across the text */}
      <span className="spotlight-sweep" aria-hidden="true" />

      <style>{`
        .spotlight-statement {
          position: relative;
          padding: clamp(40px, 7vw, 88px) clamp(4px, 1.5vw, 20px);
          isolation: isolate;
        }

        /* Aperture halo — stronger warm/brass bloom, fades in once active. */
        .spotlight-statement::before {
          content: '';
          position: absolute;
          left: -10%;
          right: -10%;
          top: 4%;
          bottom: 4%;
          background:
            radial-gradient(
              ellipse 70% 80% at 32% 50%,
              rgba(178, 106, 60, 0.18) 0%,
              rgba(126, 106, 74, 0.12) 28%,
              rgba(126, 106, 74, 0.04) 50%,
              transparent 72%
            );
          filter: blur(22px);
          opacity: 0;
          transition: opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: -1;
        }
        .spotlight-statement.is-active::before {
          opacity: 1;
        }

        .spotlight-text {
          position: relative;
          margin: 0;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(28px, 4.6vw, 64px);
          line-height: 1.15;
          letter-spacing: -0.022em;
          color: var(--bone-dim);
          max-width: 24ch;
          /* The whole sentence brightens to soft-bone as the sweep passes. */
          transition: color 2600ms cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 2;
        }
        .spotlight-statement.is-sweeping .spotlight-text {
          color: var(--bone-1);
        }

        /* feel / decide — finish brighter and retain a faint luminous state. */
        .spotlight-word {
          display: inline-block;
          color: var(--bone-dim);
          transition: color 2600ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: color;
        }
        .spotlight-word--a { transition-delay: 280ms; }
        .spotlight-word--b { transition-delay: 1100ms; }
        .spotlight-statement.is-sweeping .spotlight-word {
          color: var(--bone-0);
        }
        /* Subtle persistent luminous state on the two anchor words. */
        .spotlight-statement.is-sweeping .spotlight-word--a,
        .spotlight-statement.is-sweeping .spotlight-word--b {
          background:
            radial-gradient(
              ellipse 90% 60% at 50% 60%,
              rgba(244, 241, 234, 0.10) 0%,
              transparent 70%
            );
          background-clip: padding-box;
          border-radius: 4px;
          padding: 0 0.05em;
          margin: 0 -0.05em;
        }

        /* The oval sweep — single pass, blurred bone+brass light. */
        .spotlight-sweep {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -45%;
          width: 55%;
          background:
            radial-gradient(
              ellipse 55% 85% at 50% 50%,
              rgba(244, 241, 234, 0.22) 0%,
              rgba(178, 106, 60, 0.12) 38%,
              transparent 72%
            );
          filter: blur(18px);
          opacity: 0;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 1;
          will-change: transform, opacity;
        }
        .spotlight-statement.is-sweeping .spotlight-sweep {
          animation: spotlightSweep 2600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes spotlightSweep {
          0%   { transform: translateX(0);    opacity: 0; }
          12%  {                              opacity: 1; }
          88%  {                              opacity: 1; }
          100% { transform: translateX(255%); opacity: 0; }
        }

        /* Reduced-motion contract — final readable state, no movement. */
        @media (prefers-reduced-motion: reduce) {
          .spotlight-statement::before,
          .spotlight-text,
          .spotlight-word,
          .spotlight-sweep {
            transition: none !important;
            animation: none !important;
          }
          .spotlight-statement::before { opacity: 1; }
          .spotlight-text { color: var(--bone-1); }
          .spotlight-word { color: var(--bone-0); }
          .spotlight-sweep { display: none; }
        }

        /* Mobile — keep halo and sweep from dominating. */
        @media (max-width: 600px) {
          .spotlight-statement::before {
            left: -4%;
            right: -4%;
            filter: blur(14px);
          }
          .spotlight-sweep {
            filter: blur(12px);
            width: 65%;
            left: -55%;
          }
          .spotlight-text {
            max-width: 18ch;
          }
        }
      `}</style>
    </div>
  );
}
