'use client';

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

function PortfolioCard({
  category,
  title,
  image,
  index,
}: {
  category: string;
  title: string;
  image: string;
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
          const img = e.currentTarget.querySelector('.card-img') as HTMLElement | null;
          if (img) img.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(212,165,116,0.12)';
          e.currentTarget.style.boxShadow = 'none';
          const img = e.currentTarget.querySelector('.card-img') as HTMLElement | null;
          if (img) img.style.transform = 'scale(1)';
        }}
      >
        {/* Image */}
        <div
          style={{
            aspectRatio: '4/3',
            overflow: 'hidden',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <img
            className="card-img"
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
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
            <PortfolioCard key={i} category={item.category} title={item.title} image={item.image} index={i} />
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
