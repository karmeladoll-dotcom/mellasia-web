'use client';

import ScrollReveal from './ScrollReveal';
import ContactForm from './ContactForm';
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

function LetterheadCard() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full">
      {/* Gold aurora glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,165,116,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative rounded-xl text-center"
        style={{
          border: '1px solid rgba(212,165,116,0.25)',
          background: 'rgba(212,165,116,0.03)',
          padding: '36px 32px',
        }}
      >
        <p
          className="text-xl font-light tracking-[6px] text-[#D4A574]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          MELLASIA
        </p>

        <div className="mx-auto my-5 h-px w-10 bg-[#D4A574]" />

        <p
          className="text-[10px] tracking-[2.5px] text-[#555]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t.contact.letterheadRe}
        </p>

        <p
          className="mt-1 text-[17px] italic text-[#bbb]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t.contact.letterheadSubject}
        </p>

        <div
          className="my-6 border-t"
          style={{ borderColor: 'rgba(212,165,116,0.15)' }}
        />

        <p
          className="text-sm italic leading-relaxed text-[#888]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          &ldquo;{t.contact.letterheadQuote}&rdquo;
        </p>

        <p
          className="mt-6 text-[10px] tracking-[2.5px] text-[#555]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t.contact.letterheadDatestamp}
        </p>

        <div
          className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full text-xl text-[#D4A574]"
          style={{
            border: '1.5px solid rgba(212,165,116,0.5)',
            background: 'rgba(212,165,116,0.06)',
            fontFamily: "'Cormorant Garamond', serif",
          }}
          aria-hidden="true"
        >
          M
        </div>

        <p
          className="mt-5 text-[11px] text-[#666]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          hello@mellasia.com
        </p>
        <p
          className="mt-1 text-[11px] text-[#555]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t.contact.letterheadCity}
        </p>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="bg-[#0A0A0A] px-5 py-24 md:px-[60px]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:gap-12">
        {/* Left column — form side */}
        <ScrollReveal className="w-full md:w-[58%] md:flex-shrink-0">
          <div className="text-left">
            <p
              className="mb-[22px] text-[11px] font-medium uppercase tracking-[4px] text-[#D4A574]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t.contact.label}
            </p>

            <h2
              className="mb-[22px] text-[clamp(32px,5.5vw,72px)] font-light leading-[1.12] text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t.contact.titleLine1}{' '}
              <span className="block italic text-[#D4A574]">{t.contact.titleItalic}</span>
            </h2>

            <p
              className="mb-10 max-w-md text-sm text-[#777]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t.contact.subtitle}
            </p>

            <div id="kontakt-forma" className="w-full">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>

        {/* Right column — letterhead card */}
        <ScrollReveal delay={0.2} className="mt-12 w-full md:mt-0 md:w-[42%] md:self-center">
          <LetterheadCard />
        </ScrollReveal>
      </div>

      {/* Fallback email & social links */}
      <ScrollReveal delay={0.35}>
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="mx-auto h-px w-20 bg-[#D4A574]/30" />
          <p
            className="mt-6 text-center text-sm text-white/60"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.contact.fallback_text}
          </p>
          <div className="mt-4 text-center">
            <a
              href="mailto:hello@mellasia.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4A574] px-9 py-4 text-[15px] font-medium tracking-[0.5px] text-[#0A0A0A] no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:bg-[#E8C9A0] hover:shadow-[0_16px_50px_rgba(212,165,116,0.4)]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              hello@mellasia.com ↗
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                className="block text-white/30 transition-[color,transform] duration-[250ms] hover:-translate-y-0.5 hover:text-[#D4A574]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
