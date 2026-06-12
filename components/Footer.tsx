'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.product, href: '#product' },
    { label: t.nav.reel, href: '#reel' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const SERVICE_LINKS = [
    t.footer.service1,
    t.footer.service2,
    t.footer.service3,
    t.footer.service4,
    t.footer.service5,
  ];

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#0A0A0A',
      borderTop: 'none',
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',
    }}>
      {/* Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '-0.15em',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(60px,15vw,200px)',
        fontWeight: 300,
        color: 'rgba(255,255,255,0.05)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
        letterSpacing: '2px',
      }}>
        Mellasia
      </div>

      {/* Main footer content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(50px,8vw,90px) clamp(20px,5vw,60px) clamp(36px,5vw,56px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'clamp(36px,5vw,60px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Brand column */}
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '24px',
            fontWeight: 400,
            color: '#D4A574',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '16px',
          }}>
            Mellasia
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '13px',
            lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            maxWidth: '240px',
          }}>
            {t.footer.description}
          </p>
        </div>

        {/* Navigation column */}
        <div>
          <p style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontFamily: "'DM Sans', sans-serif",
          }}>{t.footer.navHeading}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A574')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Services column */}
        <div>
          <p style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontFamily: "'DM Sans', sans-serif",
          }}>{t.footer.servicesHeading}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SERVICE_LINKS.map((s) => (
              <a
                key={s}
                href="#services"
                onClick={(e) => { e.preventDefault(); handleClick('#services'); }}
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A574')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(212,165,116,0.07)',
        padding: 'clamp(16px,2.5vw,24px) clamp(20px,5vw,60px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.22)',
          fontSize: '12px',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {t.footer.copyright}
        </span>
        <span style={{
          color: 'rgba(255,255,255,0.22)',
          fontSize: '12px',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {t.footer.tagline}
        </span>
      </div>
    </footer>
  );
}
