"use client";
import React from "react";

interface LogoLoopProps {
  items: React.ReactNode[];
  speed?: number; // duration of loop in seconds
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function LogoLoop({
  items,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = ""
}: LogoLoopProps) {
  const durationStyle = { "--marquee-duration": `${speed}s` } as React.CSSProperties;

  return (
    <div 
      className={`overflow-hidden w-full relative flex py-6 select-none group ${className}`} 
      style={durationStyle}
    >
      {/* Editorial fading masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
      
      <div 
        className={`flex min-w-full shrink-0 gap-16 md:gap-24 items-center animate-marquee ${
          direction === "right" ? "[animation-direction:reverse]" : ""
        } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
      >
        {/* First set of items */}
        <div className="flex shrink-0 gap-16 md:gap-24 items-center justify-around min-w-full">
          {items.map((item, idx) => (
            <div key={`loop-1-${idx}`} className="flex items-center justify-center shrink-0 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              {item}
            </div>
          ))}
        </div>
        {/* Duplicate set of items for seamless infinite wrap */}
        <div className="flex shrink-0 gap-16 md:gap-24 items-center justify-around min-w-full">
          {items.map((item, idx) => (
            <div key={`loop-2-${idx}`} className="flex items-center justify-center shrink-0 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
