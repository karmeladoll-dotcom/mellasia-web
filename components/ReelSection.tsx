'use client';

import ScrollReveal from './ScrollReveal';

const VIDEOS = [
  {
    id: 'uiubbiDvPnc',
    tag: 'Promo',
    title: 'Restaurant post in 30 seconds',
    year: '2026',
    vertical: true,
  },
  {
    id: 'HhmkBLttloI',
    tag: 'Campaign',
    title: 'Vaš restoran zaslužuje bolji marketing',
    year: '2026',
    vertical: true,
  },
  {
    id: 'K5HdEyfORjM?start=774',
    tag: 'Product Film',
    title: 'BalkanBites — Mentorship Presentation',
    year: '2026',
    vertical: false,
  },
];

export default function ReelSection() {
  return (
    <section
      id="reel"
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
            03 — Reel
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
            marginBottom: '56px',
          }}>
            Stories,{' '}
            <span style={{ color: '#D4A574', fontStyle: 'italic' }}>in motion.</span>
          </h2>
        </ScrollReveal>

        {/* Video Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {VIDEOS.map((video, i) => (
            <ScrollReveal key={video.id} delay={0.1 * (i + 1)}>
              <VideoCard {...video} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  id,
  tag,
  title,
  year,
  vertical,
}: {
  id: string;
  tag: string;
  title: string;
  year: string;
  vertical: boolean;
}) {
  const paddingBottom = vertical ? '120%' : '56.25%';

  return (
    <div
      style={{
        background: '#111111',
        borderRadius: '16px',
        border: '1px solid rgba(212,165,116,0.12)',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,165,116,0.12)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Video embed */}
      <div style={{ position: 'relative', paddingBottom, height: 0, overflow: 'hidden' }}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>

      {/* Meta */}
      <div style={{ padding: '18px 20px' }}>
        <span style={{
          color: '#D4A574',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontFamily: "'DM Sans', sans-serif",
          display: 'block',
          marginBottom: '6px',
        }}>{tag}</span>
        <span style={{
          color: '#ffffff',
          fontSize: '15px',
          fontWeight: 400,
          fontFamily: "'DM Sans', sans-serif",
          display: 'block',
          marginBottom: '4px',
          lineHeight: 1.4,
        }}>{title}</span>
        <span style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '12px',
          fontFamily: "'DM Sans', sans-serif",
        }}>{year}</span>
      </div>
    </div>
  );
}
