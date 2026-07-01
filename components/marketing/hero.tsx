"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "engineering",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const serviceLabels: Record<string, string> = {
      engineering: "Engineering (Mechanical/Electrical)",
      design: "Design (CAD/3D Product)",
      development: "Web and App Development",
      analysis: "Analysis Services (CFD/FEA)",
      other: "Specialized/Other Services"
    };

    const serviceLabel = serviceLabels[formData.service] || formData.service;
    
    const messageText = `Hello AproMax! I would like to request a consultation.

*First Name:* ${formData.firstName}
*Last Name:* ${formData.lastName}
*Work Email:* ${formData.email}
*Service of Interest:* ${serviceLabel}
*Project Notes:* ${formData.message || "N/A"}`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919101362280?text=${encodedMessage}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(whatsappUrl, "_blank");
    }, 800);
  };

  return (
    <section className="relative overflow-hidden bg-[#070b19] py-16 lg:py-24 border-b border-white/5">
      {/* 1. Background Video & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Loop video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-65 absolute inset-0"
        >
          <source src="/api/hero-video" type="video/mp4" />
          <source src="https://sdgenxchgjsoyoecoctv.supabase.co/storage/v1/object/public/assets/team-video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay backdrop to maintain high text contrast */}
        <div className="absolute inset-0 bg-[#070b19]/45" />


        
        {/* Glow 1: Indigo */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[10%] left-[10%] w-96 h-96 rounded-full bg-[#0a5cf0]/20 blur-[120px]"
        />
        
        {/* Glow 2: Cyan */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#06b6d4]/15 blur-[130px]"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[580px]">
          {/* Left Panel: Content Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-white"
          >
            {/* Tagline */}
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFF5E0] bg-[#FFF5E0]/10 border border-[#FFF5E0]/20 px-3 py-1 rounded-full uppercase tracking-widest mb-6 w-fit"
            >
              Engineering Services
            </motion.span>
            
            {/* Headline */}
            <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight leading-[1.05] mb-6">
              <span className="text-[#FFF5E0]">Creative</span> <span className="text-white">&</span> <span className="text-[#06b6d4]">Professional</span>
            </h1>
            
            {/* Brief description */}
            <p className="text-[#ECEFF4] text-base md:text-lg leading-relaxed max-w-lg mb-8">
              AproMax Engineering is a multidisciplinary firm combining expertise in engineering, design, and technology to drive progress and innovation. Our team of passionate problem-solvers delivers innovative solutions that meet unique client needs.
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/services">
                <Button className="w-full sm:w-auto h-12 bg-[#0a5cf0] hover:bg-[#0a5cf0]/90 text-white font-semibold rounded-lg px-6 shadow-md hover:shadow-lg transition-all group cursor-pointer border-0">
                  Explore Services
                  <ArrowRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button className="w-full sm:w-auto h-12 border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/20 font-semibold rounded-lg px-6 transition-all cursor-pointer">
                  About AproMax
                </Button>
              </Link>
            </div>
            
            {/* Footer Trust Indicator */}
            <div className="border-t border-white/10 pt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[22px] font-bold text-accent font-heading">250+</span>
                <span className="text-xs text-white/50 leading-none">Projects<br />Delivered</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-[22px] font-bold text-accent font-heading">99.2%</span>
                <span className="text-xs text-white/50 leading-none">On-Time<br />Milestones</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-[22px] font-bold text-accent font-heading">ISO 9001</span>
                <span className="text-xs text-white/50 leading-none">Aligned<br />Quality Standards</span>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Glassmorphic Consultation Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(11,18,32,0.3)] relative overflow-hidden group/form">
              {/* Subtle top bar active element */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-[#0a5cf0]" />

              {submitted ? (
                <div className="text-center py-12 animate-in fade-in duration-300">
                  <div className="size-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent animate-bounce">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2 text-white">Request Received</h3>
                  <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you. An AproMax engineering lead will review your project parameters and reach out within 1 business day under full confidentiality.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">
                      Request <span className="text-accent">Consultation</span>
                    </h3>
                    <p className="text-[12px] text-white/60 mt-1">
                      Confidential B2B scoping. Response within <span className="text-accent font-bold">24 hours</span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                      Service of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0d1527] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                    >
                      <option value="engineering">Engineering (Mechanical/Electrical)</option>
                      <option value="design">Design & 3D Modeling (CAD)</option>
                      <option value="analysis">Analysis & Simulation (FEA/CFD)</option>
                      <option value="prototyping">Prototyping & Development</option>
                      <option value="web-app">Web & Custom App Development</option>
                      <option value="specialized">Specialized / Niche Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                      Project Notes / Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief description of requirements, tolerances, or solver inputs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none min-h-[60px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 mt-1 bg-[#0a5cf0] hover:bg-[#0a5cf0]/90 text-white font-bold rounded-lg text-xs shadow-md transition-all cursor-pointer border-0"
                  >
                    {loading ? "Processing..." : "Get a Free Consultation"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
