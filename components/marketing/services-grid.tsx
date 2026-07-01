"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings, Compass, Monitor, ShieldAlert, Cpu, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Settings,
    name: "Engineering Services",
    desc: "Managed coordination of mechanical, electrical, civil, electronics, control systems, and plant layouts.",
    slug: "engineering",
    image: "/images/service_engineering.png",
    chips: ["Mechanical", "Electrical", "Civil", "Electronics", "Control Systems", "Plant", "Automotive", "Energy & Utilities", "Industrial Equipment"],
    glowColor: "group-hover:border-[#0a5cf0]/50 group-hover:shadow-[#0a5cf0]/5"
  },
  {
    icon: Compass,
    name: "Design Services",
    desc: "From conceptual CAD drafts and 3D component models to industrial styling and assembly blueprints.",
    slug: "design",
    image: "/images/service_design.png",
    chips: ["CAD Design", "3D Modeling", "Product Design", "Industrial Design", "UX/UI Design"],
    glowColor: "group-hover:border-[#06b6d4]/50 group-hover:shadow-[#06b6d4]/5"
  },
  {
    icon: Monitor,
    name: "Web And App Development",
    desc: "Enterprise-grade web platforms, custom customer portals, responsive layouts, and cross-platform mobile apps.",
    slug: "web-app",
    image: "/images/service_web.png",
    chips: ["Website Design", "Website Dev", "Responsive Web", "E-commerce", "Mobile Apps", "Cross-Platform", "Enterprise Apps", "Custom Apps"],
    glowColor: "group-hover:border-[#10b981]/50 group-hover:shadow-[#10b981]/5"
  },
  {
    icon: ShieldAlert,
    name: "Analysis Services",
    desc: "High-fidelity finite element analysis (FEA) and computational fluid dynamics (CFD) load, thermal, and flow testing.",
    slug: "analysis",
    image: "/images/case_thermal.png",
    chips: ["Structural Analysis", "Thermal Analysis", "FEA Solver", "CFD Flow"],
    glowColor: "group-hover:border-[#6366f1]/50 group-hover:shadow-[#6366f1]/5"
  },
  {
    icon: Cpu,
    name: "Development Services",
    desc: "Bridging the gap between design and reality with prototype verification, hardware testing, and custom software.",
    slug: "prototyping",
    image: "/images/about_engineers.png",
    chips: ["Prototype Dev", "Product Testing", "Custom Software", "Python / C++", "Java / JS"],
    glowColor: "group-hover:border-[#f59e0b]/50 group-hover:shadow-[#f59e0b]/5"
  },
  {
    icon: HeartHandshake,
    name: "Other Services",
    desc: "Niche capabilities including legacy reverse engineering, failure forensics, value optimization, and IP files.",
    slug: "specialized",
    image: "/images/case_plant.png",
    chips: ["Reverse Engineering", "Value Engineering", "Failure Analysis", "IP Development"],
    glowColor: "group-hover:border-[#f43f5e]/50 group-hover:shadow-[#f43f5e]/5"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
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
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Core Disciplines
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
            Our 6 Service Pillars
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Delivering cross-disciplinary expertise from micro-electronics coding to industrial-scale structural fluid simulations.
          </p>
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105 z-0"
                />

                {/* Dark Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 z-10" />

                {/* Content container */}
                <div className="relative z-20 flex flex-col justify-between h-full flex-grow">
                  <div>
                    {/* Icon container */}
                    <div className="size-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <Icon className="size-5" />
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
