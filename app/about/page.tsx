"use client";

import * as React from "react";
import Image from "next/image";
import { Lightbulb, Star, Handshake, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";

const values = [
  {
    icon: Lightbulb,
    title: "Integrity",
    desc: "We operate with transparency, honesty, and ethics in all our interactions."
  },
  {
    icon: Star,
    title: "Excellence",
    desc: "We strive for exceptional quality and performance in everything we do."
  },
  {
    icon: Handshake,
    title: "Collaboration",
    desc: "We believe in the power of teamwork and collaboration to achieve outstanding results."
  },
  {
    icon: Rocket,
    title: "Innovation",
    desc: "We encourage creativity, experimentation, and learning to stay ahead of the curve."
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdff]">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />

      <main className="flex-grow py-8 md:py-16 text-[#070b19] relative overflow-hidden">
        {/* Subtle blur background effects */}
        <div className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full bg-blue-100/30 blur-[130px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-cyan-100/20 blur-[130px] pointer-events-none transform-gpu" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header section */}
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4 md:mb-6 text-primary sm:whitespace-nowrap"
            >
              About AproMax Engineering LLP
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto"
            >
              AproMax Engineering is a highly regarded multidisciplinary engineering and design firm that seamlessly integrates a wide array of expertise in engineering, design, and advanced technology to propel progress and foster innovation. Our dedicated team, composed of passionate problem-solvers and skilled engineers, is committed to providing state-of-the-art solutions that are meticulously tailored to address the unique challenges and requirements of our clients.
            </motion.p>
          </div>

          {/* Mission & Vision Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 group shadow-sm min-h-[340px] sm:min-h-[380px] md:h-[420px] flex flex-col justify-end"
            >
              <Image
                src="/images/mission_teamwork.webp"
                alt="Our Mission teamwork"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              {/* Overlaid dark bottom block */}
              <div className="relative bg-[#0c122c]/90 border-t border-white/10 p-5 sm:p-6 md:p-8 text-white z-10 backdrop-blur-sm">
                <h2 className="font-heading font-bold text-base sm:text-lg md:text-xl text-[#06b6d4] mb-2">
                  Our Mission
                </h2>
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                  Our mission is to empower progress through engineering excellence. We strive to deliver high-quality solutions, foster a culture of innovation, build long-term relationships, and make a positive impact on the communities we serve.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 group shadow-sm min-h-[340px] sm:min-h-[380px] md:h-[420px] flex flex-col justify-end"
            >
              <Image
                src="/images/vision_strategy.webp"
                alt="Our Vision strategy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Overlaid dark bottom block */}
              <div className="relative bg-[#0c122c]/90 border-t border-white/10 p-5 sm:p-6 md:p-8 text-white z-10 backdrop-blur-sm">
                <h2 className="font-heading font-bold text-base sm:text-lg md:text-xl text-[#06b6d4] mb-2">
                  Our Vision
                </h2>
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                  Our vision is to become a globally recognized leader in engineering excellence, driving innovation and sustainable progress that improves lives and shapes a better future.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Our Values Section */}
          <div className="border-t border-slate-200/80 pt-8 md:pt-12">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-center text-[#070b19] mb-8 md:mb-12">
              Our Values
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/45 shadow-sm"
                  >
                    <div className="size-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-5">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[#070b19] mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {value.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
