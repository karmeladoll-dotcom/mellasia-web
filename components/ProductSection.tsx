'use client';

import ScrollReveal from './ScrollReveal';

const FEATURES = [
  { icon: '📸', title: 'Caption', desc: 'Upload a photo, AI writes the perfect caption', hero: false },
  { icon: '✂️', title: 'Remove BG', desc: 'Remove background from any food photo instantly', hero: false },
  { icon: '🎨', title: 'AI Image', desc: 'Generate or enhance food photography with AI', hero: false },
  { icon: '✨', title: 'Smart Post', desc: 'Complete post: AI creates both the image and caption, ready for Instagram', hero: true },
];

export default function ProductSection() {
  return (
    <section
      id="product"
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
            01 — Product
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
            marginBottom: '20px',
            maxWidth: '700px',
          }}>
            Meet{' '}
            <span style={{ color: '#D4A574', fontStyle: 'italic' }}>BalkanBites</span>
            {' '}— your AI marketing team.
          </h2>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal delay={0.2}>
          <p style={{
            color: 'rgba(255,255,255,0.48)',
            fontSize: 'clamp(14px,1.6vw,17px)',
            lineHeight: 1.75,
            maxWidth: '580px',
            marginBottom: '60px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
          }}>
            Upload a dish photo, AI writes the caption and generates a post for Instagram — in under a minute.
            No copywriter, no photographer, no monthly agency bill.
          </p>
        </ScrollReveal>

        {/* Product Mockup Card */}
        <ScrollReveal delay={0.3}>
          <div style={{
            background: 'linear-gradient(145deg, #111111, #1a1a1a)',
            borderRadius: '20px',
            border: '1px solid rgba(212,165,116,0.15)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Golden glow at bottom */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: '200px',
              background: 'radial-gradient(ellipse at bottom, rgba(212,165,116,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Header */}
            <div style={{
              padding: 'clamp(24px,3vw,40px) clamp(24px,3vw,40px) 28px',
              borderBottom: '1px solid rgba(212,165,116,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '28px' }}>🍴</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '22px',
                  fontWeight: 400,
                  color: '#D4A574',
                  letterSpacing: '1px',
                }}>BalkanBites</div>
                <div style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '12px',
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: '2px',
                }}>balkanbites.online</div>
              </div>
              <span style={{
                background: '#D4A574',
                color: '#0A0A0A',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1px',
                padding: '5px 12px',
                borderRadius: '100px',
                textTransform: 'uppercase',
                fontFamily: "'DM Sans', sans-serif",
              }}>Start for €1</span>
            </div>

            {/* Feature Grid */}
            <div style={{
              padding: 'clamp(24px,3vw,40px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}>
              {FEATURES.map((f, i) => (
                <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} hero={f.hero} />
              ))}
            </div>

            {/* Stats bar */}
            <div style={{
              borderTop: '1px solid rgba(212,165,116,0.1)',
              padding: 'clamp(18px,2.5vw,28px) clamp(24px,3vw,40px)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              justifyContent: 'space-between',
            }}>
              <StatItem label="Platforms" value="Instagram · Facebook · TikTok" />
              <StatItem label="Generation time" value="< 30 sec" />
              <StatItem label="Starting price" value="€1" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, hero }: { icon: string; title: string; desc: string; hero: boolean }) {
  return (
    <div
      style={{
        background: hero ? 'rgba(212,165,116,0.08)' : 'rgba(212,165,116,0.05)',
        border: hero ? '2px solid #D4A574' : '1px solid rgba(212,165,116,0.12)',
        borderRadius: '14px',
        padding: '22px 20px',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default',
        position: 'relative',
        boxShadow: hero ? '0 0 28px rgba(212,165,116,0.18), inset 0 0 20px rgba(212,165,116,0.04)' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(212,165,116,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        if (!hero) e.currentTarget.style.borderColor = 'rgba(212,165,116,0.28)';
        if (hero) e.currentTarget.style.boxShadow = '0 0 44px rgba(212,165,116,0.28), inset 0 0 24px rgba(212,165,116,0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = hero ? 'rgba(212,165,116,0.08)' : 'rgba(212,165,116,0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
        if (!hero) e.currentTarget.style.borderColor = 'rgba(212,165,116,0.12)';
        if (hero) e.currentTarget.style.boxShadow = '0 0 28px rgba(212,165,116,0.18), inset 0 0 20px rgba(212,165,116,0.04)';
      }}
    >
      {hero && (
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#D4A574',
          color: '#0A0A0A',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          padding: '3px 9px',
          borderRadius: '100px',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Most powerful
        </span>
      )}
      <div style={{ fontSize: '26px', marginBottom: '12px' }}>{icon}</div>
      <div style={{
        color: hero ? '#D4A574' : '#ffffff',
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '6px',
        fontFamily: "'DM Sans', sans-serif",
      }}>{title}</div>
      <div style={{
        color: 'rgba(255,255,255,0.42)',
        fontSize: '12px',
        lineHeight: 1.5,
        fontFamily: "'DM Sans', sans-serif",
      }}>{desc}</div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginBottom: '4px',
        fontFamily: "'DM Sans', sans-serif",
      }}>{label}</div>
      <div style={{
        color: '#D4A574',
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
      }}>{value}</div>
    </div>
  );
}
