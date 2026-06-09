'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  opacityPhase: number;
  cycleDuration: number;
  opacityMin: number;
  opacityMax: number;
  driftTimer: number;
}

const PARTICLE_COUNT = 35;
const GOLD_R = 212;
const GOLD_G = 165;
const GOLD_B = 116;
const REPULSE_RADIUS = 100;

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const createParticle = (): Particle => {
      const speed = 0.1 + Math.random() * 0.2;
      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: 1 + Math.random(),
        opacityPhase: Math.random() * Math.PI * 2,
        cycleDuration: 3 + Math.random() * 5,
        opacityMin: 0.15,
        opacityMax: 0.15 + Math.random() * 0.35,
        driftTimer: 120 + Math.random() * 240,
      };
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, createParticle);

    const draw = (timestamp: number) => {
      const t = timestamp / 1000;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        p.driftTimer -= 1;
        if (p.driftTimer <= 0) {
          const speed = 0.1 + Math.random() * 0.2;
          const angle = Math.random() * Math.PI * 2;
          p.baseVx = Math.cos(angle) * speed;
          p.baseVy = Math.sin(angle) * speed;
          p.driftTimer = 120 + Math.random() * 240;
        }

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSE_RADIUS) * 0.08;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -4) p.x = W + 4;
        else if (p.x > W + 4) p.x = -4;
        if (p.y < -4) p.y = H + 4;
        else if (p.y > H + 4) p.y = -4;

        const opacity =
          p.opacityMin +
          (p.opacityMax - p.opacityMin) *
            (0.5 + 0.5 * Math.sin((t * Math.PI * 2) / p.cycleDuration + p.opacityPhase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${opacity})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
