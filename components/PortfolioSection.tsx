'use client';

import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

const PORTFOLIO_ITEMS = [
  { category: 'RESTAURANT BRANDING', title: 'Stara Vura: Visual Identity' },
  { category: 'MENU DESIGN', title: 'Konoba Adriatic: Seasonal Menu' },
  { category: 'SOCIAL MEDIA', title: 'La Piazza: Instagram Campaign' },
  { category: 'VIDEO PRODUCTION', title: 'Restoran Mala Barka: Launch Reel' },
  { category: 'BRAND STRATEGY', title: 'Kafić Stari Grad: Rebranding' },
  { category: 'PRINT & PACKAGING', title: 'Bakery Zrno: Packaging Design' },
];

function PortfolioCard({
  category,
  title,
  index,
}: {
  category: string;
  title: string;
  index: number;
}) {
  return (
    <ScrollReveal delay={0.08 * index}>
      <div
        style={{
          background: '#111111',
          border: '1px solid rgba(212,165,116,0.12)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          cursor: 'default',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.borderColor = 'rgba(212,165,116,0.38)';
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(212,165,116,0.12)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Image placeholder */}
        <div
          style={{
            aspectRatio: '4/3',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 50%, #181818 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '60px', height: '60px',
            background: 'linear-gradient(135deg, rgba(212,165,116,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: '80px', height: '80px',
            background: 'radial-gradient(ellipse at bottom right, rgba(212,165,116,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <span style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '14px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            letterSpacing: '1px',
          }}>
            Coming soon
          </span>
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

export default function PortfolioSection() {
  const { t } = useLanguage();

  return (
    <section
      id="portfolio"
      style={{
        background: '#080808',
        padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,60px)',
      }}
    >
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
            <PortfolioCard key={i} category={item.category} title={item.title} index={i} />
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
