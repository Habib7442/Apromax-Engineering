"use client";

import Image from "next/image";
import { Award, Compass, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const valueProps = [
  {
    icon: Compass,
    title: "Single Point of Contact",
    desc: "Speak directly with a dedicated coordinator who handles technical parameters, translations, timelines, and progress updates.",
    iconClass: "text-[#0a5cf0] bg-[#0a5cf0]/10 border-[#0a5cf0]/20",
    hoverGlow: "hover:border-[#0a5cf0]/30 hover:shadow-[0_8px_30px_rgb(10,92,240,0.04)]"
  },
  {
    icon: ShieldCheck,
    title: "Rigorous QA Review",
    desc: "All calculations, mesh refinements, tolerances, and CAD designs are audited by senior engineers before final project handback.",
    iconClass: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20",
    hoverGlow: "hover:border-[#10b981]/30 hover:shadow-[0_8px_30px_rgb(16,185,129,0.04)]"
  },
  {
    icon: ShieldAlert,
    title: "IP-Safe & NDA-First",
    desc: "All client design documents, proprietary configurations, and repository codes are isolated under strict digital permissions.",
    iconClass: "text-[#f43f5e] bg-[#f43f5e]/10 border-[#f43f5e]/20",
    hoverGlow: "hover:border-[#f43f5e]/30 hover:shadow-[0_8px_30px_rgb(244,63,94,0.04)]"
  },
  {
    icon: Award,
    title: "Global Delivery Advantage",
    desc: "Based in Guwahati (Assam, India), we leverage overlapping time-zones to keep engineering cycles running 24/7, providing agile B2B turnarounds.",
    iconClass: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/20",
    hoverGlow: "hover:border-[#f59e0b]/30 hover:shadow-[0_8px_30px_rgb(245,158,11,0.04)]"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(6,182,212,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        {/* Row 1: Copy on Left, 4 Grid Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          {/* Left copy text block - Animates from left */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
              Our Core Strengths
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight leading-tight mb-6">
              Why Global Engineering Teams Choose AproMax
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              Engineering outsourcing shouldn&apos;t feel like a black box. We bridge the gap with clear communication, technical expertise, and rigorous quality standards.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Whether you need to scale up a CAD drafting pipeline, simulate thermal stress on structural frames, or construct custom industrial web panels, we coordinate the entire execution process to guarantee successful delivery.
            </p>
          </div>

          {/* Right features blocks - Staggered from right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valueProps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.title} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ scale: 1.01 }}
                  className={`bg-[#fcfdff] rounded-xl border border-border p-6 transition-all duration-300 cursor-default ${item.hoverGlow}`}
                >
                  <div className={`size-10 rounded-lg flex items-center justify-center border shadow-sm mb-4 transition-transform duration-300 hover:rotate-6 ${item.iconClass}`}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-base text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Two Image Cards on the exact same horizontal level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative rounded-xl overflow-hidden border border-border aspect-[16/9] shadow-sm group"
          >
            <Image
              src="/images/about_engineers.png"
              alt="Engineers collaborating on machinery"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <span className="text-[9px] font-bold uppercase tracking-wider text-accent">QA Verification</span>
              <h4 className="font-heading font-semibold text-sm mt-0.5 text-white">Vetted Specialist Network</h4>
              <p className="text-[11px] text-white/70 mt-1 leading-relaxed max-w-sm">
                Every project is backed by strict NDA isolation and cross-examined by senior coordinators before delivery.
              </p>
            </div>
          </motion.div>

          {/* Image Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden border border-border aspect-[16/9] shadow-sm group"
          >
            <Image
              src="/images/case_thermal.png"
              alt="CAD thermal simulation rendering"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <span className="text-[9px] font-bold uppercase tracking-wider text-accent">Simulation Scoping</span>
              <h4 className="font-heading font-semibold text-sm mt-0.5 text-white">Advanced Solver Analysis & CFD</h4>
              <p className="text-[11px] text-white/70 mt-1 leading-relaxed max-w-sm">
                Access specialized analysts skilled in mechanical load paths, thermal dissipation flow grids, and vibration node testing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
