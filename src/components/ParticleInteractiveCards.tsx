"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

type HoverSide = "none" | "left" | "right";

export default function ParticleInteractiveCards() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverSide, setHoverSide] = useState<HoverSide>("none");
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x: nx, y: ny };
    setHoverSide(nx < 0.5 ? "left" : "right");
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverSide("none");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener("resize", handleResize);

    // Dense full-section stipple dots
    const numBgDots = 1800;
    const bgDots: {
      x: number; y: number;
      originX: number; originY: number;
      r: number; opacity: number;
    }[] = [];
    for (let i = 0; i < numBgDots; i++) {
      const rx = Math.random();
      const ry = Math.random();
      bgDots.push({
        x: rx, y: ry,
        originX: rx, originY: ry,
        r: Math.random() * 0.7 + 0.5,
        opacity: Math.random() * 0.2 + 0.08,
      });
    }

    // ── Left side hover shape: { } curly brackets ──
    const bracketPoints: { x: number; y: number; side: "left" }[] = [];
    const numPts = 160;
    // Left { on left half
    for (let i = 0; i < numPts; i++) {
      const t = i / numPts;
      let x = 0.16;
      const y = 0.25 + t * 0.5;
      if (t < 0.2) x = 0.16 + Math.pow(1 - t / 0.2, 2) * 0.06;
      else if (t > 0.8) x = 0.16 + Math.pow((t - 0.8) / 0.2, 2) * 0.06;
      else if (t >= 0.45 && t <= 0.55) x = 0.16 - Math.sin(((t - 0.45) / 0.1) * Math.PI) * 0.035;
      bracketPoints.push({ x: x + (Math.random() - 0.5) * 0.015, y: y + (Math.random() - 0.5) * 0.015, side: "left" });
    }
      // Right } on left half
      for (let i = 0; i < numPts; i++) {
        const t = i / numPts;
        let x = 0.36;
        const y = 0.25 + t * 0.5;
        if (t < 0.2) x = 0.36 - Math.pow(1 - t / 0.2, 2) * 0.06;
        else if (t > 0.8) x = 0.36 - Math.pow((t - 0.8) / 0.2, 2) * 0.06;
        else if (t >= 0.45 && t <= 0.55) x = 0.36 + Math.sin(((t - 0.45) / 0.1) * Math.PI) * 0.035;
        bracketPoints.push({ x: x + (Math.random() - 0.5) * 0.015, y: y + (Math.random() - 0.5) * 0.015, side: "left" });
      }

      // ── Right side hover shape: 6 orbital circles ──
      const orbitPoints: { x: number; y: number; side: "right" }[] = [];
      const numCircles = 6;
      const ptsPerCircle = 55;
      for (let c = 0; c < numCircles; c++) {
        const angle = (c / numCircles) * Math.PI * 2;
        const cx = 0.75 + Math.cos(angle) * 0.085;
        const cy = 0.5 + Math.sin(angle) * 0.2;
        for (let p = 0; p < ptsPerCircle; p++) {
          const pa = (p / ptsPerCircle) * Math.PI * 2;
          orbitPoints.push({
            x: cx + Math.cos(pa) * 0.06 + (Math.random() - 0.5) * 0.012,
            y: cy + Math.sin(pa) * 0.12 + (Math.random() - 0.5) * 0.012,
            side: "right",
          });
        }
      }

      // Build particles for each side
      const makeParticles = <T extends { x: number; y: number }>(targets: T[], side: "left" | "right") =>
        targets.map((pt) => {
          const rx = side === "left" ? Math.random() * 0.5 : 0.5 + Math.random() * 0.5;
          const ry = Math.random();
          return {
            x: rx, y: ry,
            randomX: rx, randomY: ry,
            targetX: pt.x, targetY: pt.y,
            r: Math.random() * 1.0 + 0.7,
            speed: Math.random() * 0.035 + 0.045,
            alpha: Math.random() * 0.65 + 0.35,
            isAccent: Math.random() < 0.1,
          };
        });

      const leftParticles = makeParticles(bracketPoints, "left");
      const rightParticles = makeParticles(orbitPoints, "right");

      let leftAlpha = 0;
      let rightAlpha = 0;

      const render = () => {
        ctx.clearRect(0, 0, width, height);

        const isLeft = hoverSide === "left";
        const isRight = hoverSide === "right";

        leftAlpha += ((isLeft ? 1 : 0) - leftAlpha) * 0.07;
        rightAlpha += ((isRight ? 1 : 0) - rightAlpha) * 0.07;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Draw background stipple
        ctx.fillStyle = "#111111";
        for (let i = 0; i < bgDots.length; i++) {
          const dot = bgDots[i];
          const dx = dot.x - mx;
          const dy = dot.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const isActiveZone = (dot.x < 0.5 && isLeft) || (dot.x >= 0.5 && isRight);
          if (isActiveZone && dist < 0.2) {
            const force = (0.2 - dist) * 0.06;
            dot.x += (dx / (dist || 1)) * force;
            dot.y += (dy / (dist || 1)) * force;
          } else {
            dot.x += (dot.originX - dot.x) * 0.04;
            dot.y += (dot.originY - dot.y) * 0.04;
          }
          ctx.globalAlpha = dot.opacity;
          ctx.beginPath();
          ctx.arc(dot.x * width, dot.y * height, dot.r * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw left bracket particles
        if (leftAlpha > 0.005) {
          for (const p of leftParticles) {
            const destX = isLeft ? p.targetX : p.randomX;
            const destY = isLeft ? p.targetY : p.randomY;
            p.x += (destX - p.x) * p.speed;
            p.y += (destY - p.y) * p.speed;
            ctx.globalAlpha = p.alpha * leftAlpha;
            ctx.fillStyle = p.isAccent ? "#EF4444" : "#0F62FE";
            ctx.beginPath();
            ctx.arc(p.x * width, p.y * height, p.r * window.devicePixelRatio, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw right orbit particles
        if (rightAlpha > 0.005) {
          for (const p of rightParticles) {
            const destX = isRight ? p.targetX : p.randomX;
            const destY = isRight ? p.targetY : p.randomY;
            p.x += (destX - p.x) * p.speed;
            p.y += (destY - p.y) * p.speed;
            ctx.globalAlpha = p.alpha * rightAlpha;
            ctx.fillStyle = p.isAccent ? "#EF4444" : "#0F62FE";
            ctx.beginPath();
            ctx.arc(p.x * width, p.y * height, p.r * window.devicePixelRatio, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }, [hoverSide]);

  return (
    <section
      className="relative bg-white select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Full-section canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Two-column layout, no boxes */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "820px" }}>

        {/* LEFT — For Startups */}
        <div className="flex flex-col items-center justify-center text-center px-16 md:px-24 py-32 gap-8">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span className="text-xs font-semibold text-neutral-400 tracking-widest uppercase">
              For Startups &amp; Builders
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
          </div>

          <div className="flex flex-col gap-3 max-w-md">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.05] font-sans">
              Build fast.<br />Ship faster.
            </h3>
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed font-sans">
              VenturelyHub turns your idea into a production-grade product — with elite engineers, designer, and AI infrastructure at your side.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 px-9 py-4 bg-neutral-900 text-white font-semibold text-sm rounded-full hover:bg-neutral-800 transition-colors shadow-md"
          >
            Start Your Project
          </motion.button>
        </div>

        {/* RIGHT — For Enterprises */}
        <div className="flex flex-col items-center justify-center text-center px-16 md:px-24 py-32 gap-8">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
            <span className="text-xs font-semibold text-neutral-400 tracking-widest uppercase">
              For Enterprises &amp; Teams
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
          </div>

          <div className="flex flex-col gap-3 max-w-md">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.05] font-sans">
              Scale smart.<br />Own it all.
            </h3>
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed font-sans">
              Custom SDKs, white-label systems and AI pipelines — built for teams that need institutional-grade technology without the overhead.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 px-9 py-4 bg-white border border-neutral-200 text-neutral-800 font-semibold text-sm rounded-full hover:bg-neutral-50 hover:border-neutral-300 transition-colors shadow-sm"
          >
            Explore Enterprise
          </motion.button>
        </div>
      </div>
    </section>
  );
}
