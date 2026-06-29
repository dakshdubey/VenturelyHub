"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function ParticleInteractiveCards() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white select-none overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StippleCard
          type="bracket"
          badge="Available at no charge"
          title="For developers"
          subtitle="Achieve new heights."
          buttonText="Get Started"
          buttonVariant="dark"
        />
        <StippleCard
          type="orbit"
          badge="Now Available!"
          title="For organizations"
          subtitle="Level up your entire team."
          buttonText="Explore Enterprise"
          buttonVariant="light"
        />
      </div>
    </section>
  );
}

interface StippleCardProps {
  type: "bracket" | "orbit";
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonVariant: "dark" | "light";
}

function StippleCard({
  type,
  badge,
  title,
  subtitle,
  buttonText,
  buttonVariant,
}: StippleCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
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

    // Generate static stipple background dots
    const numBgDots = 400;
    const bgDots: { x: number; y: number; originX: number; originY: number; r: number; opacity: number }[] = [];
    for (let i = 0; i < numBgDots; i++) {
      const rx = Math.random();
      const ry = Math.random();
      bgDots.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        r: Math.random() * 0.85 + 0.65,
        opacity: Math.random() * 0.35 + 0.15,
      });
    }

    // Generate target shapes for hover
    const bracketPoints: { x: number; y: number }[] = [];
    const numPointsPerSide = 130;

    // Left bracket {
    for (let i = 0; i < numPointsPerSide; i++) {
      const t = i / numPointsPerSide;
      let x = 0.22;
      let y = 0.25 + t * 0.5;
      if (t < 0.2) {
        x = 0.22 + Math.pow(1 - t / 0.2, 2) * 0.08;
      } else if (t > 0.8) {
        x = 0.22 + Math.pow((t - 0.8) / 0.2, 2) * 0.08;
      } else if (t >= 0.45 && t <= 0.55) {
        const mid = (t - 0.45) / 0.1;
        x = 0.22 - Math.sin(mid * Math.PI) * 0.04;
      }
      bracketPoints.push({
        x: x + (Math.random() - 0.5) * 0.02,
        y: y + (Math.random() - 0.5) * 0.02,
      });
    }

    // Right bracket }
    for (let i = 0; i < numPointsPerSide; i++) {
      const t = i / numPointsPerSide;
      let x = 0.78;
      let y = 0.25 + t * 0.5;
      if (t < 0.2) {
        x = 0.78 - Math.pow(1 - t / 0.2, 2) * 0.08;
      } else if (t > 0.8) {
        x = 0.78 - Math.pow((t - 0.8) / 0.2, 2) * 0.08;
      } else if (t >= 0.45 && t <= 0.55) {
        const mid = (t - 0.45) / 0.1;
        x = 0.78 + Math.sin(mid * Math.PI) * 0.04;
      }
      bracketPoints.push({
        x: x + (Math.random() - 0.5) * 0.02,
        y: y + (Math.random() - 0.5) * 0.02,
      });
    }

    // Target 2: 6 orbital circles (flower / gear structure)
    const orbitPoints: { x: number; y: number }[] = [];
    const numCircles = 6;
    const pointsPerCircle = 42;
    const centerRadius = 0.23;
    const circleRadius = 0.11;

    for (let c = 0; c < numCircles; c++) {
      const angle = (c / numCircles) * Math.PI * 2;
      const cx = 0.5 + Math.cos(angle) * centerRadius;
      const cy = 0.5 + Math.sin(angle) * centerRadius;

      for (let p = 0; p < pointsPerCircle; p++) {
        const pAngle = (p / pointsPerCircle) * Math.PI * 2;
        orbitPoints.push({
          x: cx + Math.cos(pAngle) * circleRadius + (Math.random() - 0.5) * 0.018,
          y: cy + Math.sin(pAngle) * circleRadius + (Math.random() - 0.5) * 0.018,
        });
      }
    }

    const activeTargets = type === "bracket" ? bracketPoints : orbitPoints;

    // Interactive Particles state with individual spring lerping
    const particles = activeTargets.map((pt) => {
      const rx = Math.random();
      const ry = Math.random();
      return {
        x: rx,
        y: ry,
        randomX: rx,
        randomY: ry,
        targetX: pt.x,
        targetY: pt.y,
        r: Math.random() * 1.1 + 0.75,
        speed: Math.random() * 0.04 + 0.05, // Smooth spring speed per particle
        alpha: Math.random() * 0.6 + 0.4,
        isRed: Math.random() < 0.12,
      };
    });

    let currentHoverAlpha = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth alpha fade on hover
      const targetAlpha = isHovered ? 1 : 0;
      currentHoverAlpha += (targetAlpha - currentHoverAlpha) * 0.06;

      // Draw & gently drift background dots
      ctx.fillStyle = "#111111";
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < bgDots.length; i++) {
        const dot = bgDots[i];
        // Subtle magnetic pull away from mouse
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.25 && isHovered) {
          const force = (0.25 - dist) * 0.08;
          dot.x += (dx / dist) * force;
          dot.y += (dy / dist) * force;
        } else {
          dot.x += (dot.originX - dot.x) * 0.05;
          dot.y += (dot.originY - dot.y) * 0.05;
        }

        ctx.globalAlpha = dot.opacity * (1 - currentHoverAlpha * 0.3);
        ctx.beginPath();
        ctx.arc(dot.x * width, dot.y * height, dot.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw morphing active particles
      if (currentHoverAlpha > 0.005) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Determine current goal position based on hover state
          const destinationX = isHovered ? p.targetX : p.randomX;
          const destinationY = isHovered ? p.targetY : p.randomY;

          // Smooth exponential lerp towards destination
          p.x += (destinationX - p.x) * p.speed;
          p.y += (destinationY - p.y) * p.speed;

          // Render particle
          ctx.globalAlpha = p.alpha * currentHoverAlpha;
          ctx.fillStyle = p.isRed ? "#EF4444" : "#0F62FE";
          ctx.beginPath();
          ctx.arc(p.x * width, p.y * height, p.r * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, type]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative rounded-3xl border border-[#ECECEC] bg-white p-12 md:p-16 flex flex-col items-center justify-center text-center min-h-[440px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden group cursor-pointer"
    >
      {/* Interactive Stipple Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
        {/* Pill Badge */}
        <div className="bg-white/80 border border-[#ECECEC] backdrop-blur-md px-4 py-1.5 rounded-full shadow-2xs">
          <span className="text-xs font-medium text-neutral-600 tracking-tight">
            {badge}
          </span>
        </div>

        {/* Headings */}
        <div className="flex flex-col gap-1">
          <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-none font-sans">
            {title}
          </h3>
          <p className="text-2xl md:text-3xl font-normal text-neutral-600 tracking-tight font-sans">
            {subtitle}
          </p>
        </div>

        {/* Button */}
        <div className="mt-2">
          {buttonVariant === "dark" ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3.5 bg-neutral-900 text-white font-medium text-sm rounded-full shadow-sm hover:bg-neutral-800 transition-colors"
            >
              {buttonText}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3.5 bg-white border border-[#ECECEC] text-neutral-800 font-medium text-sm rounded-full shadow-2xs hover:bg-neutral-50 transition-colors"
            >
              {buttonText}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
