'use client';

import { useState, useRef, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

function AccordionItem({
  num,
  name,
  desc,
  isFirst,
}: {
  num: string;
  name: string;
  desc: string;
  isFirst: boolean;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.opacity = '1';
    } else {
      el.style.maxHeight = '0';
      el.style.opacity = '0';
    }
  }, [open]);

  return (
    <div
      style={{
        borderTop: isFirst ? '1px solid rgba(212,165,116,0.12)' : 'none',
        borderBottom: '1px solid rgba(212,165,116,0.12)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(18px,2.5vw,26px) 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s',
          borderRadius: '2px',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,165,116,0.03)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'none';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px,3vw,36px)' }}>
          <span style={{
            color: 'rgba(212,165,116,0.35)',
            fontSize: '13px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            minWidth: '24px',
          }}>{num}</span>
          <span style={{
            color: open ? '#D4A574' : '#ffffff',
            fontSize: 'clamp(14px,2vw,18px)',
            fontWeight: 400,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'color 0.25s',
          }}>{name}</span>
        </div>

        <span style={{
          color: '#D4A574',
          fontSize: '22px',
          fontWeight: 300,
          lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          display: 'block',
          flexShrink: 0,
          marginLeft: '16px',
        }}>+</span>
      </button>

      <div
        ref={contentRef}
        className="accordion-content"
        style={{ maxHeight: '0', opacity: '0' }}
      >
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 'clamp(13px,1.5vw,16px)',
          lineHeight: 1.75,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          padding: '0 0 clamp(18px,2.5vw,28px) clamp(40px,7vw,60px)',
          maxWidth: '600px',
        }}>{desc}</p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();

  const SERVICES = [
    { num: '01', name: t.services.service1Name, desc: t.services.service1Desc },
    { num: '02', name: t.services.service2Name, desc: t.services.service2Desc },
    { num: '03', name: t.services.service3Name, desc: t.services.service3Desc },
    { num: '04', name: t.services.service4Name, desc: t.services.service4Desc },
    { num: '05', name: t.services.service5Name, desc: t.services.service5Desc },
  ];

  return (
    <section
      id="services"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,60px)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
            {t.services.label}
          </p>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.1}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px,5vw,64px)',
            fontWeight: 300,
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '60px',
          }}>
            {t.services.title}{' '}
            <span style={{ color: '#D4A574', fontStyle: 'italic' }}>{t.services.titleItalic}</span>
          </h2>
        </ScrollReveal>

        {/* Accordion */}
        <ScrollReveal delay={0.15}>
          <div style={{ maxWidth: '800px' }}>
            {SERVICES.map((s, i) => (
              <AccordionItem key={s.num} {...s} isFirst={i === 0} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
