"use client";
import React, { useRef, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function InteractiveArchitecturalCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Spring physics for tilt & 3D rotation
  const rawX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });
  const rawY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });

  // Mouse tilt handlers
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      rawX.set(-dy * 25);
      rawY.set(dx * 25);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // Rotations for inner elements based on cursor distance
  const rotateInnerSquare = useTransform(rawY, [-25, 25], [-45, 45]);
  const rotateDiamond = useTransform(rawX, [-25, 25], [45, -45]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-square w-full max-w-[680px] mx-auto bg-white border border-[#ECECEC] rounded-[40px] overflow-hidden flex items-center justify-center p-8 md:p-14 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] transition-shadow duration-500 cursor-crosshair select-none"
      style={{ perspective: "800px" }}
    >
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#C4C4C4 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Interactive 3D Sphere Component */}
      <motion.div
        style={{
          rotateX: rawX,
          rotateY: rawY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 18 } }}
        className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-[#262626] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-neutral-700 overflow-hidden"
      >
        {/* Specular Light Reflection */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.15) 0%, transparent 65%)",
          }}
        />

        {/* Technical Coordinate Crosshairs (Full Width & Height of Sphere) */}
        <svg
          viewBox="0 0 240 240"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Main Axis Lines */}
          <line x1="0" y1="120" x2="240" y2="120" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <line x1="120" y1="0" x2="120" y2="240" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

          {/* Outer dashed guide circle */}
          <circle cx="120" cy="120" r="85" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        </svg>

        {/* Dynamic Interactive Inner Geometries */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
          {/* Layer 1: Outer Square (tilts with mouse) */}
          <motion.div
            style={{ rotate: rotateInnerSquare }}
            className="absolute inset-0 border border-white/40 rounded-sm"
          />

          {/* Layer 2: Inner Diamond (rotates inversely with mouse vertical move) */}
          <motion.div
            style={{ rotate: rotateDiamond }}
            className="absolute inset-2 border border-white/20 rounded-sm"
          />

          {/* Center Point Indicator */}
          <div className="w-2.5 h-2.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10" />
        </div>
      </motion.div>
    </div>
  );
}
