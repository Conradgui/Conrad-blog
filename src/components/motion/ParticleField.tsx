"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const mouse = { x: 0, y: 0 };
    let activeMouse = false;

    const particles: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
    }[] = [];

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      activeMouse = true;
    };

    const handleMouseLeave = () => {
      activeMouse = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize particles
    const particleCount = 180;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        const d = activeMouse ? Math.hypot(mouse.x - p.x, mouse.y - p.y) : Infinity;

        // Mouse attraction
        if (d < 180 && activeMouse) {
          p.x += (mouse.x - p.x) * 0.0018;
          p.y += (mouse.y - p.y) * 0.0018;
        }

        // Particle movement
        p.x += p.dx;
        p.y += p.dy;

        // Bounce off walls
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(190, 200, 194, 0.24)";
        ctx.fill();

        // Draw interactive ring
        if (d < 140 && activeMouse) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(142, 160, 147, 0.06)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            // Dynamic opacity based on distance
            const opacity = 0.12 - dist / 1100;
            if (opacity > 0) {
              ctx.strokeStyle = `rgba(150, 160, 154, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none print:hidden"
    />
  );
}
