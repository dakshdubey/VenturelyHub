"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  ColorsSquare,
  Monitor,
  Mobile,
  Bezier,
  Cpu,
  Code,
  Cloud,
  Flash,
  Chart,
  VideoPlay,
  Paintbucket,
  DocumentText,
  Global,
  Setting2,
  Magicpen,
  Camera,
  ShoppingCart,
  SearchNormal1,
  MessageText,
  Microscope,
} from "iconsax-react";

const ICON_COLOR = "#111111";
const ICON_SIZE = 22;

export default function IconWave() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xTranslation = useTransform(scrollYProgress, [0, 1], ["80px", "-250px"]);
  const scrollPhase = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2.5]);

  // Service icons matching VenturelyHub's offerings
  const coreIcons = [
    <Monitor   key="web"       size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Mobile    key="app"       size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Bezier    key="uiux"      size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <ColorsSquare key="brand"  size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Cpu       key="ai"        size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Code      key="sdk"       size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Cloud     key="cloud"     size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Global    key="seo"       size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Chart     key="analytics" size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <VideoPlay key="video"     size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Paintbucket key="graphic" size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <DocumentText key="copy"   size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Flash     key="startup"   size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Setting2  key="devops"    size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Magicpen  key="creative"  size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <Camera    key="photo"     size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <ShoppingCart key="ecom"   size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <SearchNormal1 key="research" size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
    <MessageText key="consult" size={ICON_SIZE} color={ICON_COLOR} variant="Bulk" />,
  ];

  // Duplicate to fill the row
  const icons = [
    ...coreIcons,
    ...coreIcons.map((icon, idx) =>
      React.cloneElement(icon, { key: `dup-${idx}` })
    ),
  ];

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-white py-16 flex flex-col justify-center items-center relative select-none"
    >
      <motion.div
        style={{ x: xTranslation }}
        className="flex items-center gap-3 md:gap-4 whitespace-nowrap min-w-max px-16 py-16"
      >
        {icons.map((icon, idx) => (
          <WavyPill
            key={idx}
            index={idx}
            icon={icon}
            scrollPhase={scrollPhase}
          />
        ))}
      </motion.div>
    </div>
  );
}

interface WavyPillProps {
  index: number;
  icon: React.ReactNode;
  scrollPhase: MotionValue<number>;
}

function WavyPill({ index, icon, scrollPhase }: WavyPillProps) {
  const amplitude = 28;
  const frequency = 0.4;

  const yOffset = useTransform(scrollPhase, (phase: number) => {
    return Math.sin(index * frequency + phase) * amplitude;
  });

  return (
    // suppressHydrationWarning prevents the React SSR/client float-precision mismatch warning
    <motion.div
      style={{ y: yOffset }}
      suppressHydrationWarning
      className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-[#ECECEC] flex items-center justify-center text-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:scale-110 hover:border-neutral-400 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer shrink-0"
    >
      {icon}
    </motion.div>
  );
}
