'use client';

import { useLanguage } from '@/lib/LanguageContext';
import MellasiaMark from './MellasiaMark';

export default function Footer() {
  const { t } = useLanguage();

  const STUDIO_LINKS = [
    { label: t.footer.linkWork, href: '#work' },
    { label: t.footer.linkStudio, href: '#studio' },
    { label: t.footer.linkLab, href: '#lab' },
    { label: t.footer.linkContact, href: '#contact' },
  ];

  const CONNECT_LINKS = [
    { label: 'hello@mellasia.com', href: 'mailto:hello@mellasia.com', external: false },
    { label: 'Instagram', href: 'https://www.instagram.com/mellasia/', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karmela-sen-22244683/', external: true },
    { label: 'YouTube', href: 'https://www.youtube.com/@Mellasia', external: true },
  ];

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--ink-1)',
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        borderTop: '1px solid var(--rule)',
      }}
    >
      {/* Soft restrained watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.12em',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(48px, 12vw, 180px)',
          fontWeight: 300,
          color: 'rgba(244,241,234,0.04)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
          letterSpacing: '0.18em',
        }}
      >
        MELLASIA
      </div>

      <div
        className="footer-grid"
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: 'clamp(64px, 8vw, 96px) clamp(20px, 5vw, 60px) clamp(40px, 5vw, 56px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.9fr) minmax(0, 0.9fr)',
          gap: 'clamp(36px, 5vw, 64px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <MellasiaMark />
          <p
            style={{
              color: 'var(--bone-dim)',
              fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
              fontSize: '13.5px',
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: '36ch',
              margin: '20px 0 0 0',
            }}
          >
            {t.footer.description}
          </p>
        </div>

        <div>
          <p
            style={{
              color: 'var(--bone-mute)',
              fontFamily: "var(--font-ui), system-ui, sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              margin: '0 0 20px 0',
            }}
          >
            {t.footer.studioHeading}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {STUDIO_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(l.href);
                }}
                style={{
                  color: 'var(--bone-dim)',
                  fontFamily: "var(--font-ui), system-ui, sans-serif",
                  fontSize: '14px',
                  textDecoration: 'none',
                  width: 'fit-content',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone-0)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--bone-dim)')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p
            style={{
              color: 'var(--bone-mute)',
              fontFamily: "var(--font-ui), system-ui, sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              margin: '0 0 20px 0',
            }}
          >
            {t.footer.connectHeading}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CONNECT_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                style={{
                  color: 'var(--bone-dim)',
                  fontFamily: "var(--font-ui), system-ui, sans-serif",
                  fontSize: '14px',
                  textDecoration: 'none',
                  width: 'fit-content',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone-0)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--bone-dim)')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--rule)',
          padding: 'clamp(16px, 2.5vw, 24px) clamp(20px, 5vw, 60px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            color: 'var(--bone-mute)',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: '12px',
            letterSpacing: '0.04em',
          }}
        >
          {t.footer.copyright} · {t.footer.authorLine}
        </span>
        <span
          style={{
            color: 'var(--bone-mute)',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: '12px',
            letterSpacing: '0.04em',
          }}
        >
          {t.footer.tagline}
        </span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </footer>
  );
}
