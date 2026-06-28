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
  ArrowDown,
  TickCircle
} from "iconsax-react";

import GooeyNav from "@/components/GooeyNav";
import ElectricBorder from "@/components/ElectricBorder";
import LogoLoop from "@/components/LogoLoop";

// Navigation Items
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#trust" },
  { label: "About", href: "#about" }
];

// Tech stack items for LogoLoop
const techLogos = [
  <span key="next" className="font-mono text-base font-bold tracking-tight text-neutral-900">NEXT.JS 15</span>,
  <span key="react" className="font-mono text-base font-bold tracking-tight text-neutral-900">REACT 19</span>,
  <span key="ts" className="font-mono text-base font-bold tracking-tight text-neutral-900">TYPESCRIPT</span>,
  <span key="tail" className="font-mono text-base font-bold tracking-tight text-neutral-900">TAILWIND 4.0</span>,
  <span key="node" className="font-mono text-base font-bold tracking-tight text-neutral-900">NODEJS</span>,
  <span key="aws" className="font-mono text-base font-bold tracking-tight text-neutral-900">AMAZON AWS</span>,
  <span key="gcp" className="font-mono text-base font-bold tracking-tight text-neutral-900">GOOGLE CLOUD</span>,
  <span key="openai" className="font-mono text-base font-bold tracking-tight text-neutral-900">OPENAI API</span>,
  <span key="framer" className="font-mono text-base font-bold tracking-tight text-neutral-900">FRAMER MOTION</span>,
  <span key="vercel" className="font-mono text-base font-bold tracking-tight text-neutral-900">VERCEL DEPLOY</span>
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
                <span className="font-mono text-xs font-semibold">37.7749° N, 122.4194° W</span>
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

      {/* BRAND & TECH LOGO MARQUEE */}
      <section className="bg-white border-y border-[#ECECEC]">
        <LogoLoop items={techLogos} speed={25} />
      </section>

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#ECECEC]">
            <div>
              <span className="small-label">Capabilities</span>
              <h2 className="section-title mt-2 text-neutral-900 uppercase tracking-tight">ENGINEERING & CREATIVE SERVICES</h2>
            </div>
            <p className="body-text max-w-md">
              We have structured our multi-disciplinary capabilities into 12 core divisions to take startups from idea to institutional grade.
            </p>
          </div>

          {/* Asymmetrical Editorial Grid for Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedCategory === category.id;

              const CardContent = (
                <div 
                  className={`bg-white p-8 rounded-3xl border border-[#ECECEC] h-full flex flex-col justify-between transition-all duration-300 ${
                    !category.premium ? "hover:border-neutral-400 hover:shadow-sm" : ""
                  } cursor-pointer`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3.5 bg-[#F5F5F5] rounded-2xl text-neutral-900 border border-[#ECECEC]">
                        <Icon size="24" variant="Bulk" />
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-neutral-400"
                      >
                        <ArrowDown size="20" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold tracking-tight mb-3 text-neutral-900">
                      {category.title}
                    </h3>
                    
                    {/* Short Description */}
                    <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                      {category.description}
                    </p>
                  </div>

                  {/* Expandable Services list */}
                  <div className="w-full">
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden mb-6 border-t border-[#ECECEC] pt-4"
                        >
                          <ul className="space-y-3">
                            {category.details.map((detail, index) => (
                              <li key={index} className="flex items-center gap-2.5 text-sm text-neutral-700 font-medium">
                                <TickCircle size="16" className="text-neutral-900 shrink-0" variant="Bold" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action trigger */}
                    <div className="flex justify-between items-center text-xs font-mono font-bold tracking-wider uppercase pt-4 border-t border-[#F5F5F5]">
                      <span>{category.premium ? "FLAGSHIP CAPABILITY" : "SERVICE DIVISION"}</span>
                      <span className="text-[#0F62FE]">VIEW DETAILS</span>
                    </div>
                  </div>
                </div>
              );

              return (
                <div key={category.id} className="relative">
                  {category.premium ? (
                    <ElectricBorder 
                      color="#111111" 
                      borderRadius={24} 
                      chaos={0.08}
                      speed={0.8}
                    >
                      {CardContent}
                    </ElectricBorder>
                  ) : (
                    CardContent
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
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
            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
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
            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
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
            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
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
            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
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
            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96">
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
            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-[#ECECEC] flex flex-col justify-between h-96 md:col-span-2 lg:col-span-1">
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
        className="py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#FAFAFA] border-t border-[#ECECEC]"
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
          <div className="relative aspect-square bg-white border border-[#ECECEC] rounded-3xl overflow-hidden flex items-center justify-center p-12">
            <div className="absolute inset-0 bg-[radial-gradient(#ECECEC_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
            <svg width="240" height="240" viewBox="0 0 240 240" className="overflow-visible opacity-80">
              {/* Complex blueprint visual */}
              <circle cx="120" cy="120" r="100" stroke="#ECECEC" strokeWidth="1" />
              <circle cx="120" cy="120" r="70" stroke="#111111" strokeWidth="0.75" strokeDasharray="4 4" />
              <rect x="70" y="70" width="100" height="100" stroke="#ECECEC" strokeWidth="1" fill="none" />
              <line x1="20" y1="120" x2="220" y2="120" stroke="#ECECEC" strokeWidth="0.5" />
              <line x1="120" y1="20" x2="120" y2="220" stroke="#ECECEC" strokeWidth="0.5" />
              <motion.path 
                d="M50 120 L120 50 L190 120 L120 190 Z" 
                stroke="#111111" strokeWidth="1" fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "120px 120px" }}
              />
              <circle cx="120" cy="120" r="4" fill="#111111" />
            </svg>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#ECECEC] py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/venturely.jpeg"
                alt="Venturely Hub Logo"
                width={40}
                height={40}
                className="rounded-xl grayscale hairline-border"
              />
              <span className="font-mono text-lg font-bold tracking-widest text-neutral-900">VENTURELY HUB</span>
            </div>
            <p className="text-sm text-neutral-500 max-w-sm">
              We help startups and enterprises build, launch, and grow robust digital products with premium engineering standards.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">NAVIGATE</span>
              <a href="#home" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Home</a>
              <a href="#services" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Services</a>
              <a href="#trust" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Why Us</a>
              <a href="#about" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">About</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">LEGAL</span>
              <span className="text-sm text-neutral-500 cursor-default">Privacy Policy</span>
              <span className="text-sm text-neutral-500 cursor-default">Terms of Service</span>
            </div>
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">LOCATION</span>
              <span className="text-sm text-neutral-500 cursor-default">San Francisco, CA</span>
              <span className="text-sm text-neutral-500 cursor-default">Remote Global</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-[#ECECEC] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-400">
          <span>&copy; {new Date().getFullYear()} VENTURELY HUB INC. ALL RIGHTS RESERVED.</span>
          <span>CRAFTED IN SILICON VALLEY WITH PRECISION</span>
        </div>
      </footer>
    </div>
  );
}
