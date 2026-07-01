"use client";

import { CheckCircle2, Globe2, Compass, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: CheckCircle2,
    value: "250+",
    label: "Projects Coordinated",
    desc: "Successfully managed design, simulation, and custom B2B software deliveries."
  },
  {
    icon: Globe2,
    value: "3+",
    label: "Global Markets Served",
    desc: "Orchestrating cross-border technical compliance for US, GCC, and Indian client contracts."
  },
  {
    icon: Compass,
    value: "15+",
    label: "Core Toolsets Supported",
    desc: "Accessing specialists skilled in SolidWorks, Autodesk, ANSYS Fluent, and custom IDEs."
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "IP & NDA Isolation",
    desc: "Rigorous digital sandbox protocols securing all client designs across vendor matches."
  }
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
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Stats() {
  return (
    <section className="bg-gradient-to-br from-[#081537] to-primary-container text-white py-20 relative overflow-hidden">
      {/* Decorative background grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label} 
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex flex-col items-center text-center p-6 border border-white/5 bg-white/5 rounded-xl backdrop-blur-sm transition-shadow hover:shadow-[0_8px_30px_rgba(6,182,212,0.06)] cursor-default"
              >
                {/* Icon wrapper */}
                <div className="size-11 rounded-full bg-white/10 flex items-center justify-center text-accent mb-4">
                  <Icon className="size-5" />
                </div>
                
                {/* Count value */}
                <span className="font-heading font-bold text-4xl text-white mb-2 tracking-tight">
                  {stat.value}
                </span>
                
                {/* Label */}
                <h4 className="font-heading font-semibold text-xs text-accent mb-1 uppercase tracking-wider">
                  {stat.label}
                </h4>
                
                {/* Desc */}
                <p className="text-white/60 text-[12px] leading-relaxed max-w-[220px]">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
