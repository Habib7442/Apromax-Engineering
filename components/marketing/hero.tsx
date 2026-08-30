"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToForm = () => {
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#070b19] min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 border-b border-white/5">
      {/* 1. Background Video & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
        {/* Loop video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100 absolute inset-0 transform-gpu will-change-transform"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>

        {/* Subtle dim layer for contrast while keeping Earth video bright & vibrant */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Soft top & bottom gradient transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#070b19]/80" />
      </div>

      <div className="max-w-[1200px] w-full mx-auto px-4 md:px-12 relative z-10 py-4 sm:py-12">
        <div className="flex flex-col items-center text-center text-white max-w-4xl mx-auto">
          {/* Content Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center justify-center px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-sm font-semibold tracking-wider text-white mb-4 sm:mb-6 shadow-sm drop-shadow-sm">
              Approach, Maximize, Optimize
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold tracking-tight leading-[1.15] mb-4 sm:mb-6 text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              <span className="block text-[34px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2563eb] mb-1.5 sm:mb-2">
                Engineering Services
              </span>
              <span className="block text-[26px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Creative &amp; Professional
              </span>
            </h1>

            {/* Brief description */}
            <p className="text-[#ECEFF4] text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-6 sm:mb-8 text-center drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] font-normal px-2">
              <strong className="font-bold text-white">AproMax Engineering</strong> is a multidisciplinary firm combining expertise in engineering, design, and technology to drive progress and innovation. Our team of passionate problem-solvers delivers innovative solutions that meet unique client needs.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link href="/services" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-11 sm:h-12 bg-[#0a5cf0] hover:bg-[#0a5cf0]/90 text-white font-semibold text-sm sm:text-base rounded-lg px-6 shadow-md hover:shadow-lg transition-all group cursor-pointer border-0">
                  Explore Services
                  <ArrowRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Button
                onClick={scrollToForm}
                className="w-full sm:w-auto h-11 sm:h-12 border border-white/15 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/30 font-semibold text-sm sm:text-base rounded-lg px-6 transition-all cursor-pointer"
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
