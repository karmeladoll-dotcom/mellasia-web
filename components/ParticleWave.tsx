'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  baseY: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
  size: number;
  opacity: number;
}

interface BokehOrb {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GOLD = '#D4A574';
    const GOLD_R = 212, GOLD_G = 165, GOLD_B = 116;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Particles
    const particles: Particle[] = [];
    const COUNT = 170;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        baseY: Math.random() * H,
        speed: 0.25 + Math.random() * 0.55,
        amplitude: 18 + Math.random() * 40,
        frequency: 0.003 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
        size: 0.6 + Math.random() * 1.8,
        opacity: 0.15 + Math.random() * 0.45,
      });
    }

    // Bokeh orbs
    const orbs: BokehOrb[] = [];
    for (let i = 0; i < 5; i++) {
      orbs.push({
        x: (i + 0.5) * (W / 5) + (Math.random() - 0.5) * 120,
        y: H * (0.2 + Math.random() * 0.6),
        radius: 80 + Math.random() * 140,
        opacity: 0.04 + Math.random() * 0.06,
        pulseSpeed: 0.4 + Math.random() * 0.6,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Wave line configs
    const waveLines = [
      { baseY: H * 0.3, amplitude: 40, frequency: 0.004, speed: 0.4, opacity: 0.10 },
      { baseY: H * 0.5, amplitude: 55, frequency: 0.003, speed: 0.25, opacity: 0.20 },
      { baseY: H * 0.72, amplitude: 35, frequency: 0.005, speed: 0.55, opacity: 0.15 },
    ];

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw bokeh orbs
      const t = performance.now() / 1000;
      orbs.forEach((orb) => {
        const pulse = Math.sin(t * orb.pulseSpeed + orb.pulseOffset) * 0.3 + 0.7;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${orb.opacity * pulse})`);
        grad.addColorStop(0.5, `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${orb.opacity * 0.4 * pulse})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw wave lines
      waveLines.forEach((wl) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${wl.opacity})`;
        ctx.lineWidth = 2.5;
        for (let x = 0; x <= W; x += 2) {
          const y = wl.baseY + Math.sin(x * wl.frequency + time * wl.speed) * wl.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw particles
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const y = p.baseY + Math.sin(p.x * p.frequency + time + p.phase) * p.amplitude;
        const dx = p.x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = dist < 150 ? (1 - dist / 150) : 0;

        if (glow > 0) {
          // Glow ring
          const glowGrad = ctx.createRadialGradient(p.x, y, 0, p.x, y, p.size * 8 + glow * 12);
          glowGrad.addColorStop(0, `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${0.5 * glow})`);
          glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(p.x, y, p.size * 8 + glow * 12, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, y, p.size + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${p.opacity + glow * 0.5})`;
        ctx.fill();

        // Move particle
        p.x += p.speed;
        if (p.x > W + 10) p.x = -10;
      });

      time += 0.012;
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
      waveLines[0].baseY = H * 0.3;
      waveLines[1].baseY = H * 0.5;
      waveLines[2].baseY = H * 0.72;
      orbs.forEach((orb, i) => {
        orb.x = (i + 0.5) * (W / 5) + (Math.random() - 0.5) * 120;
        orb.y = H * (0.2 + Math.random() * 0.6);
      });
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
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
