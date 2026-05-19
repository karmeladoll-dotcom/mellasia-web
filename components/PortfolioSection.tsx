'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

const PORTFOLIO_ITEMS = [
  { category: 'MENU DESIGN',          title: 'Soul House Restaurant',       image: '/images/soul-house-menu.png' },
  { category: 'BRANDING',             title: 'Soul House Visual Identity',  image: '/images/soul-house-logo.png' },
  { category: 'SAAS PRODUCT',         title: 'BalkanBites Platform',        image: '/images/balkanbites-logo.svg' },
  { category: 'RESTAURANT MARKETING', title: 'Bocca di Lupo Campaign',      image: '/images/bocca-di-lupo-1.png' },
  { category: 'SOCIAL MEDIA',         title: 'Bocca di Lupo Content',       image: '/images/bocca-di-lupo-2.png' },
  { category: 'SOCIAL MEDIA',         title: 'Bocca di Lupo Promo',         image: '/images/bocca-di-lupo-3.png' },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  item,
  onClose,
}: {
  item: { title: string; image: string } | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (item) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!mounted || !item) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* X button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'rgba(255,255,255,0.08)',
          color: '#ffffff',
          fontSize: '18px',
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s, border-color 0.2s',
          backdropFilter: 'blur(8px)',
          zIndex: 10000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(212,165,116,0.25)';
          e.currentTarget.style.borderColor = 'rgba(212,165,116,0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
        }}
      >
        ✕
      </button>

      {/* Image wrapper — stops click propagation so clicking image doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '88vw',
          maxHeight: '82vh',
          width: '100%',
          height: '100%',
          transform: visible ? 'scale(1)' : 'scale(0.9)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          quality={95}
          sizes="88vw"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* Caption */}
      <p
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.55)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          letterSpacing: '1.5px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {item.title}
      </p>
    </div>,
    document.body
  );
}

// ─── Portfolio Card with 3-D tilt ─────────────────────────────────────────────

function PortfolioCard({
  category,
  title,
  image,
  index,
  onClick,
}: {
  category: string;
  title: string;
  image: string;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;

    // Shadow moves opposite to tilt direction
    const shadowX = -rotateY * 3;
    const shadowY = rotateX * 2 + 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = `${shadowX}px ${shadowY}px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(212,165,116,0.3)`;
    card.style.borderColor = 'rgba(212,165,116,0.4)';

    const img = card.querySelector('.card-img') as HTMLElement | null;
    if (img) img.style.transform = 'scale(1.05)';
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.boxShadow = 'none';
    card.style.borderColor = 'rgba(212,165,116,0.12)';

    const img = card.querySelector('.card-img') as HTMLElement | null;
    if (img) img.style.transform = 'scale(1)';
  }, []);

  return (
    <ScrollReveal delay={0.08 * index}>
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: '#111111',
          border: '1px solid rgba(212,165,116,0.12)',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          willChange: 'transform',
          // 0.1s for tilt tracking, 0.4s for return
          transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out, border-color 0.3s ease',
        }}
        onMouseEnter={() => {
          const card = cardRef.current;
          if (!card) return;
          // Snap transition to fast during hover for responsive tilt
          card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out, border-color 0.3s ease';
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <Image
            className="card-img"
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={95}
            style={{
              objectFit: 'cover',
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        </div>

        {/* Card meta */}
        <div style={{ padding: '16px 20px 20px' }}>
          <span style={{
            color: '#D4A574',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            display: 'block',
            marginBottom: '7px',
          }}>
            {category}
          </span>
          <span style={{
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 400,
            fontFamily: "'DM Sans', sans-serif",
            display: 'block',
            lineHeight: 1.4,
          }}>
            {title}
          </span>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function PortfolioSection() {
  const { t } = useLanguage();
  const [lightboxItem, setLightboxItem] = useState<{ title: string; image: string } | null>(null);

  return (
    <section
      id="portfolio"
      style={{
        background: '#080808',
        padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,60px)',
      }}
    >
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            {t.portfolio.label}
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
            {t.portfolio.title}{' '}
            <span style={{ color: '#D4A574', fontStyle: 'italic' }}>{t.portfolio.titleItalic}</span>
          </h2>
        </ScrollReveal>

        {/* Responsive grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="portfolio-grid"
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard
              key={i}
              category={item.category}
              title={item.title}
              image={item.image}
              index={i}
              onClick={() => setLightboxItem({ title: item.title, image: item.image })}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
