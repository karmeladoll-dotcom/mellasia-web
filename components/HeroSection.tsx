'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const ParticleWave = dynamic(() => import('./ParticleWave'), { ssr: false });

export default function HeroSection() {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Staggered entrance animation
    elementsRef.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 130);
    });
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    elementsRef.current[i] = el;
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
    >
      <ParticleWave />

      {/* Vignette overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.7) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(20px,5vw,60px)',
        paddingTop: '100px',
        maxWidth: '900px',
        width: '100%',
      }}>
        {/* Badge */}
        <span
          ref={setRef(0)}
          style={{
            display: 'inline-block',
            color: 'rgba(212,165,116,0.85)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            padding: '7px 18px',
            border: '1px solid rgba(212,165,116,0.22)',
            borderRadius: '100px',
            marginBottom: '36px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Creative Agency · Est. 2026
        </span>

        {/* Heading */}
        <h1
          ref={setRef(1)}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px, 8.5vw, 110px)',
            fontWeight: 300,
            lineHeight: 1.08,
            margin: '0 0 28px 0',
            letterSpacing: '-0.5px',
          }}
        >
          <span style={{ color: '#ffffff', display: 'block' }}>Crafting brands</span>
          <span style={{ color: '#D4A574', fontStyle: 'italic', display: 'block' }}>that linger.</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={setRef(2)}
          style={{
            color: 'rgba(255,255,255,0.48)',
            fontSize: 'clamp(15px,1.8vw,18px)',
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: '540px',
            margin: '0 0 44px 0',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          AI-powered restaurant marketing, cinematic storytelling, and digital experiences — from Zagreb to the world.
        </p>

        {/* CTA Buttons */}
        <div
          ref={setRef(3)}
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a
            href="#product"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-block',
              background: '#D4A574',
              color: '#0A0A0A',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              padding: '14px 32px',
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,165,116,0.35)';
              e.currentTarget.style.background = '#E8C9A0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = '#D4A574';
            }}
          >
            Explore our work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.5px',
              padding: '14px 32px',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.25)',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D4A574';
              e.currentTarget.style.color = '#D4A574';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
            }}
          >
            Start a project
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.5,
        }}
      >
        <span style={{
          fontSize: '9px',
          letterSpacing: '3px',
          color: 'rgba(212,165,116,0.8)',
          textTransform: 'uppercase',
          fontFamily: "'DM Sans', sans-serif",
        }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, #D4A574, transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
