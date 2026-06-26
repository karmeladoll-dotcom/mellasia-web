'use client';

import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function StudioSection() {
  const { t } = useLanguage();

  return (
    <section
      id="studio"
      style={{
        background: 'var(--ink-1)',
        padding: 'clamp(128px, 18vw, 200px) clamp(20px, 5vw, 60px)',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(40px, 5vw, 56px)',
        }}
      >
        <ScrollReveal>
          <p
            style={{
              color: 'var(--bone-mute)',
              fontFamily: 'var(--font-ui), system-ui, sans-serif',
              fontSize: '10.5px',
              fontWeight: 500,
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {t.studio.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          {/* Key section statement — Gambarino display, with the second */}
          {/* Telma moment of the page on the italic accent ("not templates."). */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px, 4.8vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--bone-0)',
              margin: 0,
            }}
          >
            {t.studio.title}{' '}
            <em
              style={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'normal',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                color: 'var(--bone-0)',
              }}
            >
              {t.studio.titleItalic}
            </em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <p
            style={{
              color: 'var(--bone-dim)',
              fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
              fontSize: 'clamp(16px, 1.4vw, 18px)',
              fontWeight: 300,
              lineHeight: 1.85,
              margin: 0,
            }}
          >
            {t.studio.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.24}>
          <div
            style={{
              marginTop: 'clamp(16px, 3vw, 32px)',
              paddingTop: 'clamp(28px, 4vw, 40px)',
              borderTop: '1px solid var(--rule)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(18px, 2.5vw, 28px)',
            }}
          >
            {t.studio.principles.map((p, i) => (
              <div
                key={p}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  alignItems: 'baseline',
                  columnGap: 'clamp(16px, 2vw, 24px)',
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
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <p
                  style={{
                    color: 'var(--bone-1)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(22px, 2.4vw, 30px)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  {p}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
