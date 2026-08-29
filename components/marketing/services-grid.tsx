"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

// 1. Engineering Services Icon (Vibrant Blue/Cyan interlocking gear)
const EngineeringCardIcon = () => (
  <svg className="size-5 transition-transform duration-300 group-hover:rotate-[15deg]" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="url(#eng-card-grad)" strokeWidth="2.5" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" stroke="url(#eng-card-grad)" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="eng-card-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="100%" stopColor="#0072ff" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Design Services Icon (Creative Rose/Pink/Purple drafting geometric 'A')
const DesignCardIcon = () => (
  <svg className="size-5 transition-transform duration-300 group-hover:rotate-[-15deg]" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 21h3.5l2-5h5l2 5H21L12 2z" fill="url(#design-card-grad)" />
    <circle cx="12" cy="11" r="2.5" fill="#180f2d" />
    <defs>
      <linearGradient id="design-card-grad" x1="4" y1="2" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#d946ef" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. Web & App Development Icon (Teal/Emerald coding monitor screen)
const WebAppCardIcon = () => (
  <svg className="size-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="13" rx="2" stroke="url(#web-card-grad)" strokeWidth="2" />
    <path d="M7 21h10M12 16v5M8 9l-3 3 3 3M16 9l3 3-3 3" stroke="url(#web-card-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="web-card-grad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Analysis Services Icon (Indigo/Blue FEA load mesh with heat-map radial gradient)
const AnalysisCardIcon = () => (
  <svg className="size-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <path d="M3 12c3-6 5-9 9-9s6 3 9 9-5 9-9 9-6-3-9-9z" stroke="url(#analysis-card-grad)" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" fill="url(#analysis-card-heat)" />
    <defs>
      <linearGradient id="analysis-card-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
      <radialGradient id="analysis-card-heat" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="70%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

// 5. Development Services Icon (Orange/Gold processor microchip & circuit nodes)
const PrototypingCardIcon = () => (
  <svg className="size-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="url(#proto-card-grad)" strokeWidth="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="url(#proto-card-grad)" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="url(#proto-card-grad)" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="proto-card-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
  </svg>
);

// 6. Other Services Icon (Rose/Crimson shield with certified verification checkmark)
const OtherCardIcon = () => (
  <svg className="size-5 transition-transform duration-300 group-hover:rotate-[10deg]" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#other-card-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11l3 3 5-5" stroke="url(#other-card-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="other-card-grad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>
    </defs>
  </svg>
);

const services = [
  {
    icon: EngineeringCardIcon,
    name: "Engineering Services",
    desc: "Managed coordination of mechanical, electrical, civil, electronics, control systems, and plant layouts.",
    slug: "engineering",
    image: "/images/service_engineering.webp",
    chips: ["Mechanical", "Electrical", "Civil", "Electronics", "Control Systems", "Plant", "Automotive", "Energy & Utilities", "Industrial Equipment"],
    glowColor: "group-hover:border-[#0a5cf0]/50 group-hover:shadow-[#0a5cf0]/5"
  },
  {
    icon: DesignCardIcon,
    name: "Design Services",
    desc: "From conceptual CAD drafts and 3D component models to industrial styling and assembly blueprints.",
    slug: "design",
    image: "/images/service_design.webp",
    chips: ["CAD Design", "3D Modeling", "Product Design", "Industrial Design", "UX/UI Design"],
    glowColor: "group-hover:border-[#06b6d4]/50 group-hover:shadow-[#06b6d4]/5"
  },
  {
    icon: WebAppCardIcon,
    name: "Web And App Development",
    desc: "Enterprise-grade web platforms, custom customer portals, responsive layouts, and cross-platform mobile apps.",
    slug: "web-app",
    image: "/images/service_web.webp",
    chips: ["Website Design", "Website Dev", "Responsive Web", "E-commerce", "Mobile Apps", "Cross-Platform", "Enterprise Apps", "Custom Apps"],
    glowColor: "group-hover:border-[#10b981]/50 group-hover:shadow-[#10b981]/5"
  },
  {
    icon: AnalysisCardIcon,
    name: "Analysis Services",
    desc: "High-fidelity finite element analysis (FEA) and computational fluid dynamics (CFD) load, thermal, and flow testing.",
    slug: "analysis",
    image: "/images/case_thermal.webp",
    chips: ["Structural Analysis", "Thermal Analysis", "FEA Solver", "CFD Flow"],
    glowColor: "group-hover:border-[#6366f1]/50 group-hover:shadow-[#6366f1]/5"
  },
  {
    icon: PrototypingCardIcon,
    name: "Development Services",
    desc: "Bridging the gap between design and reality with prototype verification, hardware testing, and custom software.",
    slug: "prototyping",
    image: "/images/about_engineers.webp",
    chips: ["Prototype Dev", "Product Testing", "Custom Software", "Python / C++", "Java / JS"],
    glowColor: "group-hover:border-[#f59e0b]/50 group-hover:shadow-[#f59e0b]/5"
  },
  {
    icon: OtherCardIcon,
    name: "Other Services",
    desc: "Niche capabilities including legacy reverse engineering, failure forensics, value optimization, and IP files.",
    slug: "specialized",
    image: "/images/case_plant.webp",
    chips: ["Reverse Engineering", "Value Engineering", "Failure Analysis", "IP Development"],
    glowColor: "group-hover:border-[#f43f5e]/50 group-hover:shadow-[#f43f5e]/5"
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function ServicesGrid() {
  return (
    <section className="bg-[#fcfdff] py-20 lg:py-28 relative overflow-hidden">
      {/* Background design grids */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Core Disciplines
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight">
            Our Services
          </h2>
        </div>

        {/* Services Grid with Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative rounded-xl border border-border overflow-hidden flex flex-col justify-between min-h-[420px] p-6 transition-all duration-300 hover:shadow-2xl cursor-default ${service.glowColor}`}
              >
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  priority={service.slug === "engineering"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105 z-0"
                />

                {/* Dark Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 z-10" />

                {/* Content container */}
                <div className="relative z-20 flex flex-col justify-between h-full flex-grow">
                  <div>
                    {/* Icon container */}
                    <div className="size-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white mb-5 transition-all duration-300">
                      <Icon />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-semibold text-lg text-white mb-3 group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-[13px] leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  <div>
                    {/* Specialty chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-[10px] font-medium text-white/90 bg-white/10 px-2 py-0.5 rounded-full border border-white/10"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* Learn more link */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center text-xs font-bold text-accent hover:text-white transition-colors group/link mt-auto cursor-pointer"
                    >
                      Learn More
                      <ArrowRight className="size-3 ml-1 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
