"use client";

import * as React from "react";
import Link from "next/link";
import { Plane, Car, Zap, Settings, Cpu, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";

const industries = [
  {
    icon: Plane,
    name: "Aerospace & Defense",
    desc: "Coordinating structural simulation, thermal enclosure stress testing, and high-fidelity fluid-dynamics modeling using ANSYS and Nastran solvers for extreme high-altitude modules.",
    specialties: ["Thermal FEA", "CFD Enclosures", "Vibration Solvers", "Stress Analysis"]
  },
  {
    icon: Car,
    name: "Automotive & Mobility",
    desc: "Delivering chassis design blueprints, component stress calculations, aerodynamic CFD simulations, and custom hardware testing structures for electric and combustion platforms.",
    specialties: ["Aerodynamics CFD", "Tolerances & Clearances", "Chassis Stress", "Component CAD"]
  },
  {
    icon: Zap,
    name: "Energy & Utilities",
    desc: "Developing 3D plant route configurations, modular piping systems, heat exchange flow validations, and pipeline fluid calculations for renewable power and gas processing plants.",
    specialties: ["Piping Configurations", "Heat Exchange Flow", "Modular Assemblies", "Valve Stress"]
  },
  {
    icon: Settings,
    name: "Industrial Machinery",
    desc: "Engineering complex multi-part component CAD assemblies, legacy reverse-engineering blueprints, material safety margin testing, and automated factory machine layouts.",
    specialties: ["Reverse Engineering", "Material Safety Factors", "Tolerances", "Component Assemblies"]
  },
  {
    icon: Cpu,
    name: "Electronics & High-Tech",
    desc: "Designing PCB layouts, thermal dissipate shell models, custom hardware-level software scripts, and IoT interface controls for consumer and industrial devices.",
    specialties: ["Thermal Dissipation", "PCB Styling", "IoT Interface", "Hardware Controls"]
  },
  {
    icon: Heart,
    name: "Medical Devices",
    desc: "Scoping ergonomic enclosure CAD designs, material load tolerance simulations, and custom control software adhering to rigorous biomedical safety and regulatory guidelines.",
    specialties: ["Regulatory Design", "Material Tolerances", "Ergonomics CAD", "Biomedical Models"]
  }
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdff]">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />

      <main className="flex-grow py-12 md:py-20 text-[#070b19] relative overflow-hidden">
        {/* Subtle blur background effects */}
        <div className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full bg-blue-100/30 blur-[130px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-cyan-100/20 blur-[130px] pointer-events-none transform-gpu" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header section */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-primary uppercase tracking-widest block mb-3"
            >
              Domain Verticals
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-[#070b19]"
            >
              Industries We Serve
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              AproMax Engineering coordinates scoping, simulation, and software development for high-stakes projects across multiple sectors, combining vetted global experts with localized quality management.
            </motion.p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-primary/45 shadow-sm hover:shadow-md cursor-default"
                >
                  <div>
                    {/* Icon container */}
                    <div className="size-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-6">
                      <Icon className="size-6 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-semibold text-xl text-[#070b19] mb-3">
                      {ind.name}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {ind.desc}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Key Focus Areas
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.specialties.map((spec) => (
                        <span 
                          key={spec}
                          className="text-[11px] font-medium text-primary bg-blue-50 border border-blue-100/50 px-2.5 py-0.5 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-950 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden mt-16 md:mt-24 shadow-lg border border-white/5"
          >
            {/* Background design glow */}
            <div className="absolute top-[-50%] left-[-20%] w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none transform-gpu" />
            <div className="absolute bottom-[-50%] right-[-20%] w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none transform-gpu" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-white">
                Have a Project in One of These Sectors?
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-lg">
                Partner with our dedicated team in India to draft a custom technical scope, align deliverables, and match your project requirements to vetted specialists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg px-6 flex items-center justify-center gap-2 group cursor-pointer border-0">
                    Request Scoping Call
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/book" className="w-full sm:w-auto">
                  <Button className="w-full h-11 border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 font-semibold rounded-lg px-6 transition-all cursor-pointer">
                    Direct Calendar Book
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
