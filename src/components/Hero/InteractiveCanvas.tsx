import React, { useEffect, useRef } from 'react';
import './InteractiveCanvas.css';

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, radius: 130 };

    // ── throttled mouse move ──────────────────────────
    let mouseThrottle = 0;
    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - mouseThrottle < 16) return; // cap at ~60fps
      mouseThrottle = now;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    // ── debounced resize ─────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }, 150);
    };

    // ── Particle class ───────────────────────────────
    class Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      baseX: number; baseY: number;

      constructor() {
        this.x = this.baseX = Math.random() * canvas!.width;
        this.y = this.baseY = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 1.6 + 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Soft boundary bounce
        if (this.x < 0 || this.x > canvas!.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height)  this.vy *= -1;

        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }
      }

      draw(isDark: boolean) {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = isDark
          ? 'rgba(0, 255, 135, 0.45)'
          : 'rgba(2, 132, 199, 0.25)';
        ctx!.fill();
      }
    }

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 45 : 90;
      particles = Array.from({ length: count }, () => new Particle());
    };

    // ── draw connections between close particles ─────
    const drawConnections = (isDark: boolean) => {
      const maxDist = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = ((maxDist - dist) / maxDist) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = isDark
              ? `rgba(0, 255, 135, ${alpha})`
              : `rgba(4, 120, 87, ${alpha})`;
            ctx!.lineWidth = 0.7;
            ctx!.stroke();
          }
        }
      }
    };

    // ── main render loop ─────────────────────────────
    const animate = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(isDark); });
      drawConnections(isDark);
      animId = requestAnimationFrame(animate);
    };

    // ── bootstrap ────────────────────────────────────
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    animate();

    window.addEventListener('resize',     onResize,     { passive: true });
    window.addEventListener('mousemove',  onMouseMove,  { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize',     onResize);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-canvas" />;
};
