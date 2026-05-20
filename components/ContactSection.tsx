'use client';

import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

const SOCIALS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Mellasia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mellasia/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/karmela-sen-22244683/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      style={{
        background: '#080808',
        padding: 'clamp(80px,12vw,160px) clamp(20px,5vw,60px)',
      }}
    >
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Label */}
        <ScrollReveal>
          <p style={{
            color: '#D4A574',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '22px',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {t.contact.label}
          </p>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.1}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px,5.5vw,72px)',
            fontWeight: 300,
            lineHeight: 1.12,
            color: '#ffffff',
            marginBottom: '22px',
          }}>
            {t.contact.titleLine1}{' '}
            <span style={{ color: '#D4A574', fontStyle: 'italic', display: 'block' }}>{t.contact.titleItalic}</span>
          </h2>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={0.2}>
          <p style={{
            color: 'rgba(255,255,255,0.42)',
            fontSize: 'clamp(14px,1.6vw,17px)',
            lineHeight: 1.75,
            marginBottom: '48px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            maxWidth: '440px',
          }}>
            {t.contact.subtitle}
          </p>
        </ScrollReveal>

        {/* CTA Button */}
        <ScrollReveal delay={0.3}>
          <a
            href="mailto:hello@mellasia.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#D4A574',
              color: '#0A0A0A',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              padding: '16px 36px',
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              marginBottom: '48px',
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 50px rgba(212,165,116,0.4)';
              e.currentTarget.style.background = '#E8C9A0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = '#D4A574';
            }}
          >
            hello@mellasia.com ↗
          </a>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.4}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  transition: 'color 0.25s, transform 0.25s',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#D4A574';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
