'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import type { Language } from '@/lib/translations';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.product, href: '#product' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.reel, href: '#reel' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLang = () => setLanguage(language === 'hr' ? 'en' : ('hr' as Language));

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '14px clamp(20px,5vw,60px)' : '22px clamp(20px,5vw,60px)',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,165,116,0.12)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(20px,2.5vw,26px)',
          fontWeight: 400,
          color: '#D4A574',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          textDecoration: 'none',
        }}
      >
        Mellasia
      </a>

      {/* Desktop links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '36px',
        }}
        className="desktop-nav"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.5px',
              textDecoration: 'none',
              transition: 'color 0.25s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A574')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            {link.label}
          </a>
        ))}

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          aria-label="Toggle language"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'transparent',
            border: '1px solid rgba(212,165,116,0.3)',
            borderRadius: '100px',
            padding: '5px 12px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '1px',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.25s',
            color: 'rgba(255,255,255,0.55)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.6)';
            e.currentTarget.style.color = '#D4A574';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
          }}
        >
          <span style={{ color: language === 'hr' ? '#D4A574' : 'rgba(255,255,255,0.4)' }}>HR</span>
          <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 3px' }}>|</span>
          <span style={{ color: language === 'en' ? '#D4A574' : 'rgba(255,255,255,0.4)' }}>EN</span>
        </button>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          style={{
            color: '#D4A574',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.5px',
            textDecoration: 'none',
            padding: '8px 22px',
            border: '1px solid rgba(212,165,116,0.45)',
            borderRadius: '100px',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.1)';
            e.currentTarget.style.borderColor = '#D4A574';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.45)';
          }}
        >
          {t.nav.cta}
        </a>
      </div>

      {/* Hamburger */}
      <button
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
        }}
        className="hamburger-btn"
      >
        <span style={{
          width: '24px', height: '1.5px',
          background: menuOpen ? '#D4A574' : 'rgba(255,255,255,0.8)',
          display: 'block',
          transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
        }} />
        <span style={{
          width: '24px', height: '1.5px',
          background: menuOpen ? '#D4A574' : 'rgba(255,255,255,0.8)',
          display: 'block',
          transition: 'all 0.3s',
          opacity: menuOpen ? 0 : 1,
        }} />
        <span style={{
          width: '24px', height: '1.5px',
          background: menuOpen ? '#D4A574' : 'rgba(255,255,255,0.8)',
          display: 'block',
          transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
        }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,165,116,0.12)',
          padding: '20px clamp(20px,5vw,60px) 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          animation: 'fadeIn 0.25s ease',
        }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '18px',
                fontWeight: 400,
                fontFamily: "'Cormorant Garamond', serif",
                textDecoration: 'none',
                letterSpacing: '1px',
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile language toggle */}
          <button
            onClick={toggleLang}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'transparent',
              border: '1px solid rgba(212,165,116,0.3)',
              borderRadius: '100px',
              padding: '7px 16px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '1px',
              fontFamily: "'DM Sans', sans-serif",
              width: 'fit-content',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            <span style={{ color: language === 'hr' ? '#D4A574' : 'rgba(255,255,255,0.4)' }}>HR</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 4px' }}>|</span>
            <span style={{ color: language === 'en' ? '#D4A574' : 'rgba(255,255,255,0.4)' }}>EN</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            style={{
              color: '#D4A574',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '10px 22px',
              border: '1px solid rgba(212,165,116,0.45)',
              borderRadius: '100px',
              width: 'fit-content',
              marginTop: '4px',
            }}
          >
            {t.nav.cta}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
