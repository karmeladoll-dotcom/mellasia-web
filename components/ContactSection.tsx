'use client';

import ScrollReveal from './ScrollReveal';
import ContactForm from './ContactForm';
import Viewfinder from './Viewfinder';
import { useLanguage } from '@/lib/LanguageContext';

const SOCIALS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Mellasia',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mellasia/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/karmela-sen-22244683/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function ContactPanel() {
  const { t } = useLanguage();

  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid var(--rule)',
        background: 'var(--ink-2)',
        padding: 'clamp(28px, 4vw, 44px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(20px, 3vw, 28px)',
      }}
    >
      <Viewfinder size={18} inset={12} color="var(--rule)" />

      <div>
        <p
          style={{
            color: 'var(--bone-mute)',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: '10px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            margin: '0 0 10px 0',
          }}
        >
          Email
        </p>
        <a
          href={`mailto:${t.contact.panelEmail}`}
          style={{
            color: 'var(--bone-0)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2.4vw, 26px)',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone-1)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--bone-0)')}
        >
          {t.contact.panelEmail}
        </a>
      </div>

      <div style={{ height: 1, background: 'var(--rule)', width: '40px' }} />

      <div>
        <p
          style={{
            color: 'var(--bone-mute)',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: '10px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            margin: '0 0 8px 0',
          }}
        >
          Location
        </p>
        <p
          style={{
            color: 'var(--bone-1)',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            margin: 0,
          }}
        >
          {t.contact.panelLocation}
        </p>
      </div>

      <div>
        <p
          style={{
            color: 'var(--bone-mute)',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: '10px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            margin: '0 0 8px 0',
          }}
        >
          Availability
        </p>
        <p
          style={{
            color: 'var(--bone-1)',
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            margin: 0,
          }}
        >
          {t.contact.panelAvailability}
        </p>
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 'clamp(20px, 3vw, 28px)',
          borderTop: '1px solid var(--rule)',
          display: 'flex',
          gap: '18px',
        }}
      >
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            style={{
              color: 'var(--bone-mute)',
              transition: 'color 0.2s, transform 0.2s',
              display: 'inline-flex',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--bone-0)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--bone-mute)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      style={{
        background: 'var(--ink-0)',
        padding: 'clamp(96px, 14vw, 160px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <ScrollReveal>
          <p
            style={{
              color: 'var(--bone-mute)',
              fontFamily: "var(--font-ui), system-ui, sans-serif",
              fontSize: '10.5px',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              marginBottom: '22px',
            }}
          >
            {t.contact.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              color: 'var(--bone-0)',
              margin: '0 0 14px 0',
            }}
          >
            {t.contact.titleLine1}{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--bone-1)' }}>
              {t.contact.titleItalic}
            </em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <p
            style={{
              color: 'var(--bone-dim)',
              fontFamily: 'var(--font-body), "DM Sans", system-ui, sans-serif',
              fontSize: 'clamp(15px, 1.3vw, 16px)',
              fontWeight: 300,
              lineHeight: 1.75,
              margin: '0 0 clamp(48px, 7vw, 72px) 0',
              maxWidth: '46ch',
            }}
          >
            {t.contact.subtitle}
          </p>
        </ScrollReveal>

        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'stretch',
          }}
        >
          <ScrollReveal delay={0.2}>
            <div id="kontakt-forma">
              <ContactForm />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.26}>
            <ContactPanel />
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
