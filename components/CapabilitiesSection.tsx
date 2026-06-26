'use client';

import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

type Pillar = {
  num: string;
  name: string;
  purpose: string;
  bullets: string[];
};

export default function CapabilitiesSection() {
  const { t } = useLanguage();

  const pillars: Pillar[] = [
    {
      num: 'I',
      name: t.capabilities.pillar1Name,
      purpose: t.capabilities.pillar1Purpose,
      bullets: t.capabilities.pillar1Bullets,
    },
    {
      num: 'II',
      name: t.capabilities.pillar2Name,
      purpose: t.capabilities.pillar2Purpose,
      bullets: t.capabilities.pillar2Bullets,
    },
    {
      num: 'III',
      name: t.capabilities.pillar3Name,
      purpose: t.capabilities.pillar3Purpose,
      bullets: t.capabilities.pillar3Bullets,
    },
  ];

  return (
    <section
      id="capabilities"
      style={{
        background: 'var(--ink-1)',
        padding: 'clamp(96px, 14vw, 168px) clamp(20px, 5vw, 60px)',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header — manifesto style, tighter */}
        <div
          className="capabilities-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.55fr) minmax(0, 1fr)',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'baseline',
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
              {t.capabilities.eyebrow}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(34px, 4.4vw, 60px)',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.005em',
                color: 'var(--bone-0)',
                margin: 0,
              }}
            >
              {t.capabilities.title}{' '}
              <em style={{ fontStyle: 'normal', color: 'var(--bone-1)' }}>
                {t.capabilities.titleItalic}
              </em>
            </h2>
          </ScrollReveal>
        </div>

        {/* Manifesto credits */}
        <div
          className="capabilities-credits"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
          }}
        >
          {pillars.map((p, i) => (
            <ScrollReveal key={p.num} delay={0.1 + i * 0.06}>
              <div
                className="capability-credit"
                style={{
                  position: 'relative',
                  padding: 'clamp(8px, 2vw, 16px) clamp(20px, 3vw, 36px) 0 clamp(20px, 3vw, 36px)',
                  display: 'grid',
                  gridTemplateRows: 'auto auto 1fr auto',
                  gap: 'clamp(14px, 2vw, 22px)',
                  borderLeft: i === 0 ? 'none' : '1px solid var(--rule)',
                  minHeight: 'clamp(280px, 28vw, 360px)',
                }}
              >
                <span
                  style={{
                    color: 'var(--bone-mute)',
                    fontFamily: 'var(--font-ui), system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.24em',
                  }}
                >
                  {p.num}.
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(30px, 3.4vw, 46px)',
                    fontWeight: 400,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: 'var(--bone-0)',
                    margin: 0,
                  }}
                >
                  {p.name}
                </h3>

                <p
                  style={{
                    color: 'var(--bone-1)',
                    fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(15px, 1.4vw, 17px)',
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: '32ch',
                  }}
                >
                  {p.purpose}
                </p>

                <p
                  style={{
                    color: 'var(--bone-mute)',
                    fontFamily: "var(--font-ui), system-ui, sans-serif",
                    fontSize: '11.5px',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    lineHeight: 1.7,
                    margin: 0,
                    paddingTop: 'clamp(14px, 2vw, 22px)',
                    borderTop: '1px solid var(--rule)',
                  }}
                >
                  {p.bullets.join(' · ')}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .capabilities-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .capabilities-credits {
            grid-template-columns: 1fr !important;
          }
          .capability-credit {
            border-left: none !important;
            border-top: 1px solid var(--rule);
            padding: clamp(28px, 5vw, 40px) 0 clamp(28px, 5vw, 40px) 0 !important;
            min-height: auto !important;
          }
          .capability-credit:first-of-type {
            border-top: none;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
