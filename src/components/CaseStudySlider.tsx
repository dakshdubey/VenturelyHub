"use client";
import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";

interface CaseStudy {
  id: string;
  role: string;
  roleOverlay: string;
  description: string;
  image: string;
  buttonText: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "software",
    role: "Custom Software Engineering",
    roleOverlay: "Engineered\nto scale",
    description: "Custom technology infrastructure, core web systems, and internal modules built for performance.",
    image: "/assets/case_dev.png",
    buttonText: "Watch case",
  },
  {
    id: "ai",
    role: "AI & Model Orchestration",
    roleOverlay: "Intelligent\npipelines",
    description: "Deploying secure LLM fine-tuning setups, neural search systems, and high-performance vector databases.",
    image: "/assets/case_lead.png",
    buttonText: "Watch case",
  },
  {
    id: "branding",
    role: "High-Fidelity Branding",
    roleOverlay: "Identity &\npositioning",
    description: "Crafting beautiful brand identity designs, user experiences, and visual languages that command authority.",
    image: "/assets/case_founder.png",
    buttonText: "Watch case",
  },
];

export default function CaseStudySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Drag-to-scroll with momentum ──────────────────────────────────────────
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const hasDragged = useRef(false);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");

  const stopMomentum = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const applyMomentum = useCallback(() => {
    if (!scrollRef.current) return;
    velocity.current *= 0.92; // friction coefficient
    if (Math.abs(velocity.current) < 0.5) {
      scrollRef.current.style.scrollSnapType = "x mandatory";
      rafId.current = null;
      return;
    }
    scrollRef.current.scrollLeft += velocity.current;
    rafId.current = requestAnimationFrame(applyMomentum);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    stopMomentum();
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    scrollStartLeft.current = scrollRef.current.scrollLeft;
    velocity.current = 0;
    scrollRef.current.style.scrollSnapType = "none";
    setCursor("grabbing");
    e.preventDefault();
  }, [stopMomentum]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    const now = Date.now();
    const dt = now - lastTime.current || 1;
    velocity.current = (lastX.current - e.clientX) / dt * 16;
    lastX.current = e.clientX;
    lastTime.current = now;
    scrollRef.current.scrollLeft = scrollStartLeft.current - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setCursor("grab");
    if (Math.abs(velocity.current) > 1) {
      rafId.current = requestAnimationFrame(applyMomentum);
    } else if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = "x mandatory";
    }
  }, [applyMomentum]);

  const onMouseLeave = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setCursor("grab");
    if (Math.abs(velocity.current) > 1) {
      rafId.current = requestAnimationFrame(applyMomentum);
    } else if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = "x mandatory";
    }
  }, [applyMomentum]);

  // ── Arrow button scroll ───────────────────────────────────────────────────
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -760 : 760;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-white select-none overflow-hidden">
      <div className="px-10 md:px-16 lg:px-20 mb-16">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {/* Left — title */}
          <div>
            <h2 className="section-title text-neutral-900 tracking-tight leading-[1.1] font-sans">
              Built for performance<br />designed for conversion
            </h2>
          </div>
          {/* Right — description */}
          <div className="lg:max-w-xs xl:max-w-sm">
            <p className="text-neutral-500 text-sm leading-relaxed font-sans lg:text-right">
              VenturelyHub takes digital products from raw concepts to institutional-grade systems, combining deep backend engineering with high-fidelity creative design.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Slider — drag enabled */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-10 md:px-16 lg:px-20 pb-8"
        style={{ scrollSnapType: "x mandatory", cursor }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {caseStudies.map((item) => (
          <CaseStudyCard key={item.id} item={item} hasDragged={hasDragged} />
        ))}
      </div>

      {/* Bottom Slider Arrow Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-end gap-3 mt-4">
        <button
          onClick={() => scroll("left")}
          className="w-9 h-9 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          aria-label="Previous slide"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-9 h-9 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          aria-label="Next slide"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}

function CaseStudyCard({ item, hasDragged }: { item: CaseStudy; hasDragged: React.MutableRefObject<boolean> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic button springs
  const buttonX = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });
  const buttonY = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();

      // Magnetic button: relative to bottom-right anchor
      const cx = rect.left + rect.width * 0.82;
      const cy = rect.top + rect.height * 0.85;
      buttonX.set((e.clientX - cx) * 0.5);
      buttonY.set((e.clientY - cy) * 0.5);
    },
    [buttonX, buttonY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    buttonX.set(0);
    buttonY.set(0);
  }, [buttonX, buttonY]);

  return (
    <div
      className="shrink-0 w-[90vw] sm:w-[680px] md:w-[760px] lg:w-[840px] flex flex-col gap-5 group"
      style={{ scrollSnapAlign: "start", pointerEvents: "auto" }}
      onClickCapture={(e) => { if (hasDragged.current) e.stopPropagation(); }}
    >
      {/* Static Image Card (No tilt/scale) */}
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative aspect-[16/9.5] min-h-[380px] md:min-h-[480px] w-full rounded-[36px] overflow-hidden bg-neutral-200 border border-[#ECECEC] shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
      >
        <Image
          src={item.image}
          alt={item.role}
          fill
          className="object-cover object-center"
          draggable={false}
        />

        {/* Subtle Dark Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Text Overlay on Left */}
        <div className="absolute top-10 left-10 z-10 max-w-[220px]">
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight whitespace-pre-line font-sans drop-shadow-sm">
            {item.roleOverlay}
          </h3>
        </div>

        {/* Magnetic Watch Case pill */}
        <div className="absolute bottom-10 right-10 md:bottom-12 md:right-12 z-20 pointer-events-none">
          <motion.div
            style={{ x: buttonX, y: buttonY }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
            className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-neutral-900 font-medium text-xs md:text-sm flex items-center gap-2.5 shadow-xl border border-white/40"
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L1.5 10.3301L1.5 1.66987L9 6Z" fill="#111111"/>
            </svg>
            <span>{item.buttonText}</span>
          </motion.div>
        </div>
      </div>

      {/* Subtext info below image */}
      <div className="px-2 pt-1 flex flex-col gap-0.5">
        <h4 className="text-sm font-semibold text-neutral-900 font-sans">
          {item.role}
        </h4>
        <p className="text-xs text-neutral-500 font-sans">
          {item.description}
        </p>
      </div>
    </div>
  );
}
