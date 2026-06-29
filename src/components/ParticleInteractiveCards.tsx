"use client";
import React, { useRef, useEffect, useState } from "react";
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
    const numBgDots = 450;
    const bgDots: { x: number; y: number; r: number; opacity: number }[] = [];
    for (let i = 0; i < numBgDots; i++) {
      bgDots.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 0.9 + 0.6,
        opacity: Math.random() * 0.35 + 0.15,
      });
    }

    // Generate target shapes for hover
    // Target 1: Code brackets { }
    const bracketPoints: { x: number; y: number }[] = [];
    const numPointsPerSide = 140;

    // Left bracket {
    for (let i = 0; i < numPointsPerSide; i++) {
      const t = i / numPointsPerSide; // 0 to 1
      let x = 0.25;
      let y = 0.25 + t * 0.5;
      // Curve left bracket
      if (t < 0.2) {
        x = 0.25 + Math.pow(1 - t / 0.2, 2) * 0.08;
      } else if (t > 0.8) {
        x = 0.25 + Math.pow((t - 0.8) / 0.2, 2) * 0.08;
      } else if (t >= 0.45 && t <= 0.55) {
        const mid = (t - 0.45) / 0.1;
        x = 0.25 - Math.sin(mid * Math.PI) * 0.04;
      }
      // Add random jitter to create stippled hand-drawn particle feel
      bracketPoints.push({
        x: x + (Math.random() - 0.5) * 0.025,
        y: y + (Math.random() - 0.5) * 0.025,
      });
    }

    // Right bracket }
    for (let i = 0; i < numPointsPerSide; i++) {
      const t = i / numPointsPerSide;
      let x = 0.75;
      let y = 0.25 + t * 0.5;
      if (t < 0.2) {
        x = 0.75 - Math.pow(1 - t / 0.2, 2) * 0.08;
      } else if (t > 0.8) {
        x = 0.75 - Math.pow((t - 0.8) / 0.2, 2) * 0.08;
      } else if (t >= 0.45 && t <= 0.55) {
        const mid = (t - 0.45) / 0.1;
        x = 0.75 + Math.sin(mid * Math.PI) * 0.04;
      }
      bracketPoints.push({
        x: x + (Math.random() - 0.5) * 0.025,
        y: y + (Math.random() - 0.5) * 0.025,
      });
    }

    // Target 2: 6 orbital circles (flower / gear structure)
    const orbitPoints: { x: number; y: number }[] = [];
    const numCircles = 6;
    const pointsPerCircle = 45;
    const centerRadius = 0.22;
    const circleRadius = 0.11;

    for (let c = 0; c < numCircles; c++) {
      const angle = (c / numCircles) * Math.PI * 2;
      const cx = 0.5 + Math.cos(angle) * centerRadius;
      const cy = 0.5 + Math.sin(angle) * centerRadius;

      for (let p = 0; p < pointsPerCircle; p++) {
        const pAngle = (p / pointsPerCircle) * Math.PI * 2;
        orbitPoints.push({
          x: cx + Math.cos(pAngle) * circleRadius + (Math.random() - 0.5) * 0.02,
          y: cy + Math.sin(pAngle) * circleRadius + (Math.random() - 0.5) * 0.02,
        });
      }
    }

    const activeTargets = type === "bracket" ? bracketPoints : orbitPoints;

    // Interactive Particles state
    const particles = activeTargets.map((pt) => {
      return {
        currX: Math.random(),
        currY: Math.random(),
        targetX: pt.x,
        targetY: pt.y,
        r: Math.random() * 1.1 + 0.7,
        alpha: Math.random() * 0.5 + 0.5,
      };
    });

    let hoverProgress = 0; // 0 to 1 smooth transition

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth hover progress lerp
      const targetProgress = isHovered ? 1 : 0;
      hoverProgress += (targetProgress - hoverProgress) * 0.08;

      // Draw background stipple dots
      ctx.fillStyle = "#111111";
      for (let i = 0; i < bgDots.length; i++) {
        const dot = bgDots[i];
        ctx.globalAlpha = dot.opacity * (1 - hoverProgress * 0.4);
        ctx.beginPath();
        ctx.arc(dot.x * width, dot.y * height, dot.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw blue hover particles morphing into target shape
      if (hoverProgress > 0.01) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          // Lerp position towards target point
          const px = (p.currX + (p.targetX - p.currX) * hoverProgress) * width;
          const py = (p.currY + (p.targetY - p.currY) * hoverProgress) * height;

          ctx.globalAlpha = p.alpha * hoverProgress;
          ctx.fillStyle = i % 7 === 0 ? "#EF4444" : "#0F62FE"; // Occasional subtle red stipple accent like in reference image!
          ctx.beginPath();
          ctx.arc(px, py, p.r * window.devicePixelRatio, 0, Math.PI * 2);
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
      className="relative rounded-3xl border border-[#ECECEC] bg-[#FDFDFD] p-12 md:p-16 flex flex-col items-center justify-center text-center min-h-[440px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden group cursor-pointer"
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
