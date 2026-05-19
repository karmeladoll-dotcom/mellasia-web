'use client';

import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,60px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <ScrollReveal>
          <p
            style={{
              color: '#D4A574',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: '24px',
            }}
          >
            {t.about.label}
          </p>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal delay={100}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px,5vw,64px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: 'clamp(48px,8vw,80px)',
            }}
          >
            {t.about.title}{' '}
            <em style={{ color: '#D4A574', fontStyle: 'italic' }}>{t.about.titleItalic}</em>
          </h2>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="about-grid">
          {/* Left: text */}
          <ScrollReveal delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(15px,1.4vw,17px)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {t.about.paragraph1}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(15px,1.4vw,17px)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {t.about.paragraph2}
              </p>
            </div>
          </ScrollReveal>

          {/* Right: founder photo placeholder */}
          <ScrollReveal delay={220}>
            <div
              style={{
                border: '1px solid rgba(212,165,116,0.2)',
                borderRadius: '20px',
                aspectRatio: '3/4',
                background: '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(212,165,116,0.4)',
                  letterSpacing: '1px',
                }}
              >
                {t.about.photoPlaceholder}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
