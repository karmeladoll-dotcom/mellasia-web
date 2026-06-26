'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import type { Language } from '@/lib/translations';
import MellasiaMark from './MellasiaMark';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.work, href: '#work' },
    { label: t.nav.capabilities, href: '#capabilities' },
    { label: t.nav.forWhom, href: '#for-whom' },
    { label: t.nav.studio, href: '#studio' },
    { label: t.nav.lab, href: '#lab' },
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
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
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
        padding: scrolled
          ? '14px clamp(20px, 5vw, 60px)'
          : '22px clamp(20px, 5vw, 60px)',
        background: scrolled ? 'rgba(10,10,10,0.86)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('#hero');
        }}
        style={{ textDecoration: 'none' }}
        aria-label="Mellasia — home"
      >
        <MellasiaMark />
      </a>

      <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href);
            }}
            style={{
              color: 'var(--bone-dim)',
              fontFamily: "var(--font-ui), system-ui, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              transition: 'color 0.25s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone-0)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--bone-dim)')}
          >
            {link.label}
          </a>
        ))}

        <button
          onClick={toggleLang}
          aria-label="Toggle language"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'transparent',
            border: '1px solid var(--rule-strong)',
            borderRadius: '2px',
            padding: '5px 12px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            transition: 'all 0.25s',
            color: 'var(--bone-dim)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--bone-0)';
            e.currentTarget.style.color = 'var(--bone-0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--rule-strong)';
            e.currentTarget.style.color = 'var(--bone-dim)';
          }}
        >
          <span style={{ color: language === 'hr' ? 'var(--bone-0)' : 'var(--bone-mute)' }}>HR</span>
          <span style={{ color: 'var(--bone-mute)', margin: '0 3px' }}>|</span>
          <span style={{ color: language === 'en' ? 'var(--bone-0)' : 'var(--bone-mute)' }}>EN</span>
        </button>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#contact');
          }}
          style={{
            color: 'var(--bone-0)',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            padding: '8px 20px',
            border: '1px solid var(--rule-strong)',
            borderRadius: '2px',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--bone-0)';
            e.currentTarget.style.background = 'rgba(244,241,234,0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--rule-strong)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {t.nav.cta}
        </a>
      </div>

      <button
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger-btn"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
        }}
      >
        <span
          style={{
            width: '22px',
            height: '1.2px',
            background: menuOpen ? 'var(--bone-0)' : 'var(--bone-dim)',
            display: 'block',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
          }}
        />
        <span
          style={{
            width: '22px',
            height: '1.2px',
            background: menuOpen ? 'var(--bone-0)' : 'var(--bone-dim)',
            display: 'block',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            width: '22px',
            height: '1.2px',
            background: menuOpen ? 'var(--bone-0)' : 'var(--bone-dim)',
            display: 'block',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
          }}
        />
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(10,10,10,0.97)',
            backdropFilter: 'blur(14px)',
            borderBottom: '1px solid var(--rule)',
            padding: '20px clamp(20px,5vw,60px) 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                color: 'var(--bone-1)',
                fontFamily: 'var(--font-ui), system-ui, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggleLang}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'transparent',
              border: '1px solid var(--rule-strong)',
              borderRadius: '2px',
              padding: '7px 16px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              fontFamily: "var(--font-ui), system-ui, sans-serif",
              width: 'fit-content',
              color: 'var(--bone-dim)',
            }}
          >
            <span style={{ color: language === 'hr' ? 'var(--bone-0)' : 'var(--bone-mute)' }}>HR</span>
            <span style={{ color: 'var(--bone-mute)', margin: '0 4px' }}>|</span>
            <span style={{ color: language === 'en' ? 'var(--bone-0)' : 'var(--bone-mute)' }}>EN</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            style={{
              color: 'var(--bone-0)',
              fontFamily: "var(--font-ui), system-ui, sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '10px 22px',
              border: '1px solid var(--rule-strong)',
              borderRadius: '2px',
              width: 'fit-content',
              marginTop: '4px',
            }}
          >
            {t.nav.cta}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
