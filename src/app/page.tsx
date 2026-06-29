"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowRight,
  TickCircle
} from "iconsax-react";

import GooeyNav from "@/components/GooeyNav";
import IconWave from "@/components/IconWave";
import ParticleInteractiveCards from "@/components/ParticleInteractiveCards";
import CaseStudySlider from "@/components/CaseStudySlider";
import InteractiveArchitecturalCard from "@/components/InteractiveArchitecturalCard";

// Navigation Items
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#trust" },
  { label: "About", href: "#about" }
];



// Service categories data
const serviceCategories = [
  {
    id: "branding",
    title: "Branding & Identity",
    icon: ColorsSquare,
    premium: false,
    description: "Crafting high-fidelity brand assets and strategies that establish market presence and command premium positioning.",
    details: [
      "Brand Strategy & Positioning",
      "Visual Identity & Logomarks",
      "Comprehensive Typography & Color Systems",
      "Corporate Brand Guidelines"
    ]
  },
  {
    id: "web-dev",
    title: "Website Design & Development",
    icon: Monitor,
    premium: true, // highlighted with ElectricBorder
    description: "Building bespoke, high-performance web systems using React, Next.js, and clean Tailwind CSS architectures.",
    details: [
      "Headless CMS Implementations",
      "Editorial & Corporate Portals",
      "Interactive Product Landing Pages",
      "Core Web Vitals Optimization"
    ]
  },
  {
    id: "app-dev",
    title: "App Development",
    icon: Mobile,
    premium: true, // highlighted with ElectricBorder
    description: "Engineering high-performance iOS and Android applications using Swift, Kotlin, or robust cross-platform architectures.",
    details: [
      "Native iOS (Swift) & Android (Kotlin)",
      "High-Fidelity React Native Apps",
      "Real-time Data Synchronizations",
      "Offline-first Storage Architecture"
    ]
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    icon: Bezier,
    premium: false,
    description: "Defining premium user experiences through meticulous research, user-journey mapping, and high-fidelity interactive prototyping.",
    details: [
      "Digital Product Design",
      "Meticulous Wireframing & Prototyping",
      "Custom Multi-platform Design Systems",
      "User Research & Usability Testing"
    ]
  },
  {
    id: "ai-auto",
    title: "AI & Automation",
    icon: Cpu,
    premium: true, // highlighted with ElectricBorder
    description: "Infusing applications with artificial intelligence, fine-tuned models, and robust automated task-execution workflows.",
    details: [
      "LLM & Generative API Integrations",
      "Custom Autonomous AI Agents",
      "Business Workflow Automation",
      "Semantic Search & Vector DB setups"
    ]
  },
  {
    id: "eng",
    title: "Engineering & Development",
    icon: Code,
    premium: false,
    description: "Building robust, type-safe full-stack software architectures designed to process complex business logic at scale.",
    details: [
      "RESTful & GraphQL API Architectures",
      "High-performance Database Schemas",
      "Real-time Socket Integrations",
      "Legacy Codebase Modernization"
    ]
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    icon: Cloud,
    premium: false,
    description: "Orchestrating highly available, secure, and auto-scaling cloud deployments with automated delivery pipelines.",
    details: [
      "AWS & Google Cloud Setup",
      "Infrastructure as Code (Terraform)",
      "Automated CI/CD Pipelines",
      "Zero-downtime Serverless Setups"
    ]
  },
  {
    id: "startup",
    title: "Startup Solutions",
    icon: Flash,
    premium: false,
    description: "Helping early-stage companies build, launch, and validate their MVPs with rapid speed and technical authority.",
    details: [
      "Rapid MVP Scoping & Engineering",
      "Technical Pitch Deck Validation",
      "Fast-track Proof of Concepts",
      "CTO-as-a-Service Advisory"
    ]
  },
  {
    id: "marketing",
    title: "Marketing & Growth",
    icon: Chart,
    premium: false,
    description: "Implementing high-converting growth loops, deep analytics tracking, and advanced technical search-engine optimization.",
    details: [
      "Advanced Technical SEO Audit",
      "Conversion Rate Optimization (CRO)",
      "Custom Attribution & Tracking Setup",
      "Automated User Onboarding Funnels"
    ]
  },
  {
    id: "content",
    title: "Content Creation",
    icon: VideoPlay,
    premium: false,
    description: "Generating luxury-grade assets, interactive components, and high-fidelity graphics that tell a compelling product story.",
    details: [
      "3D Product Renderings & Mockups",
      "Interactive Web Animation Assets",
      "Social Brand Engagement Assets",
      "Corporate Media Asset Toolkits"
    ]
  },
  {
    id: "creative",
    title: "Creative Design",
    icon: Paintbucket,
    premium: false,
    description: "Designing elegant layouts, interactive decks, and bespoke editorial materials for investor presentations.",
    details: [
      "Premium Pitch Deck Styling",
      "Bespoke Editorial & Print Design",
      "Custom Investor Collaterals",
      "Exhibition & Event Graphics"
    ]
  },
  {
    id: "copy",
    title: "Content & Copywriting",
    icon: DocumentText,
    premium: false,
    description: "Crafting clear, persuasive brand messages and highly precise technical documentation that communicates complexity with ease.",
    details: [
      "Brand Narrative & Tone Guidelines",
      "Conversion & Growth Copywriting",
      "Precise Developer & Api Docs",
      "Search-Engine Optimized Copy Strategy"
    ]
  }
];

export default function Home() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen text-[#111111] selection:bg-neutral-900 selection:text-white">
      {/* HEADER / FLOATING NAV CONTAINER */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <GooeyNav items={navItems} />
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ECECEC_1px,transparent_1px),linear-gradient(to_bottom,#ECECEC_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        {/* Hero Top Content */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 z-10">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/venturely.jpeg"
              alt="Venturely Hub Logo"
              width={32}
              height={32}
              className="rounded-lg object-cover grayscale hairline-border"
            />
            <span className="font-mono text-sm tracking-widest font-bold">VENTURELY HUB</span>
          </div>
          <div className="max-w-md">
            <span className="small-label">Silicon Valley Craftsmanship</span>
            <p className="body-text mt-2">
              We engineer products and brand systems capable of scaling to hundreds of millions. Precision design meets rigorous engineering.
            </p>
          </div>
        </div>

        {/* Massive Typography Hero Middle */}
        <div className="my-auto py-12 z-10 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-heading uppercase tracking-tighter text-neutral-900">
              BUILD <span className="text-[#ECECEC]">•</span> LAUNCH <span className="text-[#ECECEC]">•</span> GROW
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full"
          >
            <a
              href="#services"
              className="px-8 py-4 bg-neutral-900 text-white rounded-full font-medium text-sm flex items-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Capabilities <ArrowRight size="18" />
            </a>
            <a
              href="#trust"
              className="px-8 py-4 border border-neutral-200 text-neutral-800 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-neutral-50 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#trust")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Why Partner With Us
            </a>
          </motion.div>
        </div>

        {/* Abstract Engineering Inspired Graphic Composition */}
        <div className="w-full flex justify-end z-10 mt-6">
          <div className="w-full lg:w-3/5 border-t border-neutral-200 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-neutral-400">COORDINATE</span>
                <span className="font-mono text-xs font-semibold">15.4589° N, 75.0078° E</span>
              </div>
              <div className="w-px h-6 bg-neutral-200" />
              <div className="flex flex-col">
                <span className="font-mono text-xs text-neutral-400">ENGINEERED AT</span>
                <span className="font-mono text-xs font-semibold">SCALE</span>
              </div>
            </div>

            {/* Geometric SVG Drawing */}
            <div className="w-32 h-12 flex items-center justify-center opacity-60">
              <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="overflow-visible">
                <motion.circle 
                  cx="20" cy="20" r="12" 
                  stroke="#111111" strokeWidth="1" 
                  strokeDasharray="4 2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <circle cx="20" cy="20" r="3" fill="#111111" />
                <path d="M20 20 L60 20" stroke="#111111" strokeWidth="0.75" strokeDasharray="3 3" />
                <motion.rect 
                  x="54" y="14" width="12" height="12" 
                  stroke="#111111" strokeWidth="1"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "60px 20px" }}
                />
                <path d="M66 20 L100 20" stroke="#111111" strokeWidth="0.75" />
                <polygon points="100,17 106,20 100,23" fill="#111111" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL-DRIVEN DEVELOPER ICON WAVE */}
      <IconWave />



      {/* SERVICES SECTION */}
      <section
        id="services"
        className="py-24 md:py-32 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#ECECEC]">
            <div>
              <span className="small-label">Capabilities</span>
              <h2 className="section-title mt-2 text-neutral-900 uppercase tracking-tight">ENGINEERING &amp; CREATIVE SERVICES</h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <p className="body-text max-w-md md:text-right">
                We have structured our multi-disciplinary capabilities into 12 core divisions to take startups from idea to institutional grade.
              </p>
              {/* Arrow navigation */}
              <div className="flex gap-2">
                <button
                  id="svc-prev"
                  onClick={() => {
                    const el = document.getElementById("svc-carousel");
                    if (el) el.scrollBy({ left: -340, behavior: "smooth" });
                  }}
                  className="w-10 h-10 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  aria-label="Previous"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                  id="svc-next"
                  onClick={() => {
                    const el = document.getElementById("svc-carousel");
                    if (el) el.scrollBy({ left: 340, behavior: "smooth" });
                  }}
                  className="w-10 h-10 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  aria-label="Next"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable carousel — bleeds full width */}
        <div
          id="svc-carousel"
          className="flex gap-5 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-24 pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === category.id;

            // Unique gradient per card for visual variety
            const gradients = [
              "from-neutral-800 to-neutral-950",
              "from-slate-700 to-slate-950",
              "from-zinc-700 to-zinc-950",
              "from-stone-700 to-stone-950",
              "from-neutral-700 to-neutral-950",
              "from-gray-700 to-gray-950",
              "from-neutral-800 to-zinc-950",
              "from-slate-800 to-neutral-950",
              "from-zinc-800 to-slate-950",
              "from-stone-800 to-neutral-950",
              "from-neutral-900 to-stone-950",
              "from-gray-800 to-zinc-950",
            ];
            const idx = serviceCategories.indexOf(category);
            const grad = gradients[idx % gradients.length];

            return (
              <div
                key={category.id}
                className="shrink-0 w-[300px] md:w-[320px] bg-white rounded-3xl border border-[#ECECEC] overflow-hidden flex flex-col cursor-pointer hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] transition-all duration-300 group"
                style={{ scrollSnapAlign: "start" }}
                onClick={() => toggleCategory(category.id)}
              >
                {/* Dark visual header */}
                <div className={`relative h-44 bg-gradient-to-br ${grad} flex items-center justify-center overflow-hidden`}>
                  {/* Subtle grid overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${category.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${category.id})`}/>
                  </svg>
                  {/* Icon centered */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Icon size="28" color="white" variant="Bulk" />
                  </div>
                  {/* Premium badge */}
                  {category.premium && (
                    <div className="absolute top-3 right-3 bg-white/15 border border-white/25 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <span className="font-mono text-[10px] text-white font-bold tracking-wider">★ FLAGSHIP</span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-base font-bold tracking-tight text-neutral-900 mb-2 leading-snug">
                    {category.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed flex-1 line-clamp-3">
                    {category.description}
                  </p>

                  {/* Expandable services list */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-4 space-y-2 border-t border-[#ECECEC] pt-4"
                      >
                        {category.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                            <TickCircle size="14" className="text-neutral-900 shrink-0" variant="Bold" />
                            {detail}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#F5F5F5]">
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                      {category.premium ? "FLAGSHIP CAPABILITY" : "SERVICE DIVISION"}
                    </span>
                    <span className="text-xs text-[#0F62FE] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      VIEW DETAILS
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ENTERPRISE SCROLL SHOWCASE — sticky scroll two-column layout */}
      <section className="bg-white">
        {/* Section Header */}
        <div className="px-10 md:px-16 lg:px-20 py-20">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Special Capabilities</span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-3">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-neutral-900 uppercase leading-none">
              Enterprise<br />Solutions
            </h2>
            <p className="text-neutral-500 max-w-sm text-sm leading-relaxed lg:mb-1">
              Beyond standard services — we engineer proprietary systems, internal frameworks, and custom technology infrastructure built to last decades.
            </p>
          </div>
        </div>

        {/* Row 1 — Custom SDK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left — sticky text */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 lg:py-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans">
              Custom SDK<br />Development
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed max-w-sm font-sans">
              We engineer proprietary SDKs, internal frameworks, and software modules designed specifically for your business. Own your code, remove external dependencies, and scale indefinitely.
            </p>
          </div>
          {/* Right — visual panel styled like premium terminal screenshot */}
          <div className="flex items-center justify-center bg-white p-6 md:p-12 min-h-[60vh] lg:min-h-screen">
            <div className="w-full max-w-2xl aspect-[4/3] rounded-[32px] bg-black p-8 md:p-12 flex items-center justify-center shadow-xl relative overflow-hidden">
              {/* Starry background effect */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              {/* Terminal mock */}
              <div className="w-full rounded-2xl bg-[#16171d] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8 font-mono text-xs md:text-sm relative z-10">
                <div className="flex items-center gap-1.5 mb-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 text-neutral-500 text-xs">venturely-sdk / index.ts</span>
                </div>
                <div className="space-y-1.5 text-neutral-300 leading-relaxed">
                  <p><span className="text-purple-400">import</span> <span className="text-white">{"{ VenturelySdk }"}</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;@venturely/core&apos;</span></p>
                  <p className="text-neutral-600">&nbsp;</p>
                  <p><span className="text-blue-400">const</span> <span className="text-white">sdk</span> <span className="text-neutral-400">=</span> <span className="text-yellow-300">new</span> <span className="text-cyan-400">VenturelySdk</span><span className="text-white">{"({"}</span></p>
                  <p className="pl-4"><span className="text-blue-300">apiKey</span><span className="text-white">:</span> <span className="text-green-400">process.env.VH_KEY</span><span className="text-white">,</span></p>
                  <p className="pl-4"><span className="text-blue-300">org</span><span className="text-white">:</span> <span className="text-green-400">&apos;your-company&apos;</span><span className="text-white">,</span></p>
                  <p className="pl-4"><span className="text-blue-300">encryption</span><span className="text-white">:</span> <span className="text-orange-400">true</span><span className="text-white">,</span></p>
                  <p><span className="text-white">{"});"}</span></p>
                  <p className="text-neutral-600">&nbsp;</p>
                  <p><span className="text-purple-400">export</span> <span className="text-blue-400">const</span> <span className="text-yellow-300">processPayload</span> <span className="text-neutral-400">=</span> <span className="text-blue-400">async</span> <span className="text-white">(data) =&gt; {"{"}</span></p>
                  <p className="pl-4"><span className="text-blue-400">return</span> <span className="text-white">sdk.</span><span className="text-yellow-300">transform</span><span className="text-white">(data, {"{"} <span className="text-blue-300">secure</span>: <span className="text-orange-400">true</span> {"}"});</span></p>
                  <p><span className="text-white">{"}"}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — White-Label Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left — sticky text */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 lg:py-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans">
              White-Label<br />Products
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed max-w-sm font-sans">
              Deploy fully branded, production-ready digital products under your own identity. Built by our engineering teams, fully owned and hosted by yours.
            </p>
          </div>
          {/* Right — visual panel styled like the premium glowing bordered mockup */}
          <div className="flex items-center justify-center bg-white p-6 md:p-12 min-h-[60vh] lg:min-h-screen">
            <div className="w-full max-w-2xl aspect-[4/3] rounded-[32px] bg-neutral-100 p-8 md:p-12 flex items-center justify-center shadow-sm relative overflow-hidden border border-neutral-200/50">
              {/* Soft glow border background */}
              <div className="absolute inset-2 rounded-[24px] bg-[conic-gradient(from_0deg,#ffeedd,#e0f0ff,#ffe6f0,#ffeedd)] opacity-50 blur-xl pointer-events-none" />
              
              {/* Inside card */}
              <div className="w-full rounded-2xl border border-neutral-200/80 bg-white/95 backdrop-blur-md shadow-lg overflow-hidden relative z-10">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECECEC]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
                      <span className="text-white text-[8px] font-black">Y</span>
                    </div>
                    <span className="text-sm font-bold text-neutral-900">YourBrand</span>
                  </div>
                  <div className="flex gap-4 items-center text-xs text-neutral-400">
                    <span className="text-neutral-900 font-semibold">Settings</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="h-2 bg-neutral-100 rounded-full w-2/3" />
                  <div className="h-2 bg-neutral-100 rounded-full w-1/2" />
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {["Users", "Revenue", "Growth"].map(l => (
                      <div key={l} className="rounded-lg border border-[#ECECEC] p-4 bg-white">
                        <div className="text-[10px] text-neutral-400 mb-1">{l}</div>
                        <div className="text-base font-black text-neutral-900">—</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3 — AI Infrastructure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left — sticky text */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 lg:py-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans">
              AI Infrastructure<br />&amp; Pipelines
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed max-w-sm font-sans">
              End-to-end custom artificial intelligence solutions. We develop specialized LLM fine-tuning pipelines, secure RAG vector setups, and custom models tailored for security and scale.
            </p>
          </div>
          {/* Right — visual panel styled like blue radial glow core */}
          <div className="flex items-center justify-center bg-white p-6 md:p-12 min-h-[60vh] lg:min-h-screen">
            <div className="w-full max-w-2xl aspect-[4/3] rounded-[32px] bg-[#060814] flex items-center justify-center relative overflow-hidden shadow-xl">
              {/* Starry background dots */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
              
              {/* Radial blue core */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(30,80,255,0.45)_0%,rgba(10,20,80,0.25)_50%,transparent_80%)] blur-2xl" />
                <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(80,120,255,0.3)_0%,transparent_70%)] blur-xl" />
                <div className="relative z-10 text-center">
                  <p className="text-white text-xl font-bold tracking-tight">Venturely AI</p>
                  <p className="text-blue-300 text-xs mt-1 opacity-60">Infrastructure Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4 — Why Custom SDKs stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-5">Why Custom SDKs?</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6">
              Own Your<br />Technology Stack
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed max-w-sm">
              Unlike generic solutions, custom SDKs allow businesses to maintain complete control over critical systems while reducing dependency on third-party technologies. You ship faster, scale cheaper, and compete harder.
            </p>
          </div>
          <div className="flex items-center px-10 md:px-16 lg:px-20 py-20">
            <div className="grid grid-cols-2 gap-6 w-full">
              {[
                { stat: "10×", label: "Faster Internal Dev Cycles" },
                { stat: "0%", label: "Vendor Lock-in" },
                { stat: "100%", label: "Source Code Ownership" },
                { stat: "∞", label: "Scalability Ceiling" },
              ].map(({ stat, label }) => (
                <div key={label} className="border border-[#ECECEC] rounded-2xl p-6 bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow">
                  <div className="text-4xl font-black text-neutral-900 mb-1">{stat}</div>
                  <div className="text-xs text-neutral-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE STIPPLE PARTICLE CARDS */}
      <ParticleInteractiveCards />

      {/* CASE STUDY SLIDER SECTION */}
      <CaseStudySlider />

      {/* TRUST & ENGINEERING EXCELLENCE SECTION */}
      <section
        id="trust"
        className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-8 border-b border-[#ECECEC]">
            <div>
              <span className="small-label">Our Architecture</span>
              <h2 className="section-title mt-2 text-neutral-900 uppercase tracking-tight">RIGOROUS ENGINEERING METHODOLOGY</h2>
            </div>
            <p className="body-text max-w-md">
              We stand apart because we enforce software engineering principles that guarantee ownership, performance, and long-term viability.
            </p>
          </div>

          {/* Grid detailing the 7 Columns of Trust */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            
            {/* Column 1: Technology Ownership */}
            <div className="p-8 bg-white rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
              <div className="w-full">
                <span className="font-mono text-xs text-neutral-400">01 / OWNERSHIP</span>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-2 mb-4">Technology Ownership</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  We engineer clean, decoupled source code fully transferred to your repository. Zero vendor lock-in, zero subscription fees. You own your IP.
                </p>
              </div>
              <div className="w-full h-20 opacity-60 border-t border-[#ECECEC] pt-4 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 200 60" className="overflow-visible">
                  <rect x="10" y="10" width="80" height="40" rx="4" stroke="#111111" strokeWidth="1" fill="none" />
                  <rect x="110" y="10" width="80" height="40" rx="4" stroke="#111111" strokeWidth="1" fill="none" />
                  <path d="M90 30 L110 30" stroke="#111111" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="100" cy="30" r="3" fill="#111111" />
                </svg>
              </div>
            </div>

            {/* Column 2: Enterprise Engineering */}
            <div className="p-8 bg-white rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
              <div className="w-full">
                <span className="font-mono text-xs text-neutral-400">02 / STRUCTURE</span>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-2 mb-4">Enterprise Engineering</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Every product runs on strict type systems and layered architectures. No compromises on modularity, testing coverage, or code standards.
                </p>
              </div>
              <div className="w-full h-20 opacity-60 border-t border-[#ECECEC] pt-4 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 200 60" className="overflow-visible">
                  <line x1="20" y1="10" x2="180" y2="10" stroke="#111111" strokeWidth="1" />
                  <line x1="20" y1="30" x2="180" y2="30" stroke="#111111" strokeWidth="1" />
                  <line x1="20" y1="50" x2="180" y2="50" stroke="#111111" strokeWidth="1" />
                  <line x1="60" y1="10" x2="60" y2="50" stroke="#111111" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="140" y1="10" x2="140" y2="50" stroke="#111111" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>

            {/* Column 3: Scalable Systems */}
            <div className="p-8 bg-white rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
              <div className="w-full">
                <span className="font-mono text-xs text-neutral-400">03 / PERFORMANCE</span>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-2 mb-4">Scalable Systems</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Architected with autoscaling mechanisms, CDN cache-decay algorithms, and low latency database setups designed for global spikes.
                </p>
              </div>
              <div className="w-full h-20 opacity-60 border-t border-[#ECECEC] pt-4 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 200 60" className="overflow-visible">
                  <circle cx="100" cy="15" r="10" stroke="#111111" strokeWidth="1" fill="none" />
                  <circle cx="50" cy="45" r="10" stroke="#111111" strokeWidth="1" fill="none" />
                  <circle cx="150" cy="45" r="10" stroke="#111111" strokeWidth="1" fill="none" />
                  <path d="M90 20 L60 40" stroke="#111111" strokeWidth="1" />
                  <path d="M110 20 L140 40" stroke="#111111" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Column 4: Security */}
            <div className="p-8 bg-white rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
              <div className="w-full">
                <span className="font-mono text-xs text-neutral-400">04 / DEFENSE</span>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-2 mb-4">Robust Security</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  We enforce encryption-in-transit, strict header policies, access management controls, and automated compliance vulnerability checks.
                </p>
              </div>
              <div className="w-full h-20 opacity-60 border-t border-[#ECECEC] pt-4 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 200 60" className="overflow-visible">
                  <path d="M100 10 L140 20 L140 40 C140 50 100 55 100 55 C100 55 60 50 60 40 L60 20 Z" stroke="#111111" strokeWidth="1" fill="none" />
                  <circle cx="100" cy="32" r="6" stroke="#111111" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>

            {/* Column 5: AI First */}
            <div className="p-8 bg-white rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
              <div className="w-full">
                <span className="font-mono text-xs text-neutral-400">05 / INTELLIGENCE</span>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-2 mb-4">AI First Integration</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  From deep language models to prompt engineering, we build cognitive capabilities and vector-based automation straight into your systems.
                </p>
              </div>
              <div className="w-full h-20 opacity-60 border-t border-[#ECECEC] pt-4 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 200 60" className="overflow-visible">
                  <circle cx="70" cy="30" r="12" stroke="#111111" strokeWidth="1" fill="none" />
                  <circle cx="130" cy="30" r="12" stroke="#111111" strokeWidth="1" fill="none" />
                  <circle cx="100" cy="30" r="18" stroke="#111111" strokeWidth="0.75" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>

            {/* Column 6: Long Term Partnership */}
            <div className="p-8 bg-white rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
              <div className="w-full">
                <span className="font-mono text-xs text-neutral-400">06 / GROWTH</span>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-2 mb-4">Long Term Alliance</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  We are not a project vendor; we serve as strategic partners, supporting your systems, aligning technical pivots, and scaling through funding rounds.
                </p>
              </div>
              <div className="w-full h-20 opacity-60 border-t border-[#ECECEC] pt-4 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 200 60" className="overflow-visible">
                  <motion.path 
                    d="M20 50 Q70 45 100 25 T180 10" 
                    stroke="#111111" strokeWidth="1.25" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <circle cx="180" cy="10" r="3" fill="#111111" />
                </svg>
              </div>
            </div>

            {/* Column 7: Startup Focus */}
            <div className="p-8 bg-white rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96 md:col-span-2 lg:col-span-1">
              <div className="w-full">
                <span className="font-mono text-xs text-neutral-400">07 / ACCELERATION</span>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mt-2 mb-4">Startup Focus</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Designed for speed. We build working validation architectures in weeks, preparing your products for capital injection and customer onboarding.
                </p>
              </div>
              <div className="w-full h-20 opacity-60 border-t border-[#ECECEC] pt-4 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 200 60" className="overflow-visible">
                  <motion.path 
                    d="M100 30 A20 20 0 1 1 100 29.9" 
                    stroke="#111111" strokeWidth="1" fill="none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 30px" }}
                  />
                  <line x1="100" y1="10" x2="100" y2="20" stroke="#111111" strokeWidth="1" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-white border-t border-[#ECECEC]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="small-label">About Venturely Hub</span>
            <h2 className="section-title mt-4 text-neutral-900 uppercase tracking-tight leading-none mb-8">
              A TECHNOLOGY INNOVATION PARTNER. NOT AN AGENCY.
            </h2>
            <p className="body-text text-neutral-600 mb-6">
              We are a venture-building company and digital product engineering studio. We do not sell developer hours or generic templates. 
            </p>
            <p className="body-text text-neutral-600 mb-8">
              We invest our expertise into engineering custom digital architectures that survive traffic scale, pass rigorous audits, and secure enterprise contracts. We operate as your dedicated core technical arm, from initial strategy to production management.
            </p>
            <div className="flex gap-12 border-t border-[#ECECEC] pt-8">
              <div>
                <span className="font-mono text-3xl font-bold text-neutral-900">100%</span>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mt-1">IP Ownership Transfer</p>
              </div>
              <div>
                <span className="font-mono text-3xl font-bold text-neutral-900">12+</span>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mt-1">Specialized Divisions</p>
              </div>
              <div>
                <span className="font-mono text-3xl font-bold text-neutral-900">Scale</span>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mt-1">Built to Perform</p>
              </div>
            </div>
          </div>
          
          {/* Architectural Geometry visual for About */}
          <InteractiveArchitecturalCard />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#ECECEC] pt-24 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 font-display">
                Ready to scale?<br />Let&apos;s build.
              </h2>
              <p className="body-text mt-4 max-w-sm">
                Partner with Venturely Hub to design, engineer, and launch digital products that define your category.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">Company</span>
                <a href="#about" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">About Us</a>
                <a href="#trust" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Why Venturely</a>
                <a href="mailto:hello@venturelyhub.com" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Contact Us</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">Services</span>
                <a href="#services" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Website Design</a>
                <a href="#services" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">App Development</a>
                <a href="#services" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">AI & Automation</a>
              </div>
              <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
                <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">Location</span>
                <span className="text-sm text-neutral-500 cursor-default">Sampige Nagar, Dharwad</span>
                <span className="text-sm text-neutral-500 cursor-default">Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Massive Typographic Branding */}
          <div className="w-full border-t border-[#ECECEC] pt-12 pb-16 overflow-hidden select-none">
            <h1 className="text-[11vw] font-black tracking-tighter text-neutral-900 leading-none text-center font-display select-none">
              VenturelyHub
            </h1>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-[#ECECEC] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/venturely.jpeg"
                alt="Venturely Hub Logo"
                width={28}
                height={28}
                className="rounded-lg grayscale hairline-border"
              />
              <span className="font-bold tracking-widest text-neutral-900">VENTURELY HUB</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <span>&copy; {new Date().getFullYear()} VENTURELY HUB INC.</span>
              <a href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-neutral-900 transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
