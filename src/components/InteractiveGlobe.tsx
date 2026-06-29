"use client";
import { useRef, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Spring physics for smooth rotation
  const rawX = useSpring(0, { stiffness: 120, damping: 18, mass: 0.6 });
  const rawY = useSpring(0, { stiffness: 120, damping: 18, mass: 0.6 });

  // Glow offset follows tilt
  const glowX = useTransform(rawY, [-30, 30], ["-20px", "20px"]);
  const glowY = useTransform(rawX, [-30, 30], ["20px", "-20px"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      rawX.set(-dy * 28);
      rawY.set(dx * 28);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // SVG globe grid lines — ellipses simulate 3D latitude/longitude
  const latitudes = [0.28, 0.5, 0.72]; // y ratios on 160px viewBox
  const longitudes = [0.28, 0.5, 0.72]; // x ratios

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center select-none"
      style={{ perspective: "700px", width: 200, height: 200 }}
    >
      {/* Dynamic glow that shifts with tilt */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute inset-0 rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-4 rounded-full bg-neutral-400 opacity-10 blur-2xl" />
      </motion.div>

      {/* The globe sphere */}
      <motion.div
        style={{
          rotateX: rawX,
          rotateY: rawY,
          transformStyle: "preserve-3d",
          width: 168,
          height: 168,
          background: "radial-gradient(circle at 38% 35%, #3a3a3a 0%, #1a1a1a 55%, #0d0d0d 100%)",
          boxShadow:
            "0 32px 64px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
        whileHover={{ scale: 1.04 }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 18 } }}
        className="relative rounded-full overflow-hidden cursor-crosshair"
      >
        {/* Specular highlight */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 60,
            height: 38,
            top: 18,
            left: 26,
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.13) 0%, transparent 70%)",
            transform: "rotate(-20deg)",
          }}
        />

        {/* SVG Globe Grid */}
        <svg
          viewBox="0 0 168 168"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.55 }}
        >
          {/* Clipping circle */}
          <defs>
            <clipPath id="globe-clip">
              <circle cx="84" cy="84" r="84" />
            </clipPath>
          </defs>

          <g clipPath="url(#globe-clip)">
            {/* Latitude lines (horizontal arcs rendered as ellipses) */}
            {latitudes.map((ratio, i) => {
              const cy = ratio * 168;
              // Ellipse squish: the further from center the narrower the height
              const distFromCenter = Math.abs(ratio - 0.5);
              const ry = 6 - distFromCenter * 10;
              return (
                <ellipse
                  key={`lat-${i}`}
                  cx={84}
                  cy={cy}
                  rx={84}
                  ry={Math.max(ry, 1.5)}
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth={ratio === 0.5 ? 1.2 : 0.8}
                />
              );
            })}

            {/* Longitude lines (vertical ellipses) */}
            {longitudes.map((ratio, i) => {
              const cx = ratio * 168;
              const distFromCenter = Math.abs(ratio - 0.5);
              const rx = 6 - distFromCenter * 10;
              return (
                <ellipse
                  key={`lon-${i}`}
                  cx={cx}
                  cy={84}
                  rx={Math.max(rx, 1.5)}
                  ry={84}
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth={ratio === 0.5 ? 1.2 : 0.8}
                />
              );
            })}

            {/* Center inner square accent */}
            <rect
              x={84 - 27}
              y={84 - 27}
              width={54}
              height={54}
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.8}
              rx={2}
            />

            {/* Center crosshair dot */}
            <circle cx={84} cy={84} r={2.5} fill="rgba(255,255,255,0.5)" />
          </g>
        </svg>
      </motion.div>

      {/* Subtle outer ring */}
      <div
        className="absolute rounded-full border border-neutral-200 pointer-events-none"
        style={{ width: 196, height: 196, opacity: 0.5 }}
      />
    </div>
  );
}
