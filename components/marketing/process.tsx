"use client";

import { motion, Variants } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Scope & Secure",
    desc: "We sign NDAs upfront. Our project coordinators detail your technical parameters, budgets, and milestones."
  },
  {
    num: "02",
    title: "Match Specialists",
    desc: "We select and brief vetted specialists from our global network who have the exact domain expertise your project requires."
  },
  {
    num: "03",
    title: "Manage & Coordinate",
    desc: "AproMax acts as your single point of contact, managing timelines, milestone updates, and cross-functional syncing."
  },
  {
    num: "04",
    title: "QA Check & Deliver",
    desc: "Our QA team verifies all CAD drawings, simulation outputs, and codes against strict compliance checks before final handover."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
};

export default function Process() {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-border relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Execution Flow
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
            How We Work
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            A disciplined, pipeline-driven development model built for technical clarity at every project stage.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[22px] left-[10%] right-[10%] h-0.5 bg-border z-0" />

          {steps.map((step) => (
            <motion.div 
              key={step.num}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 group cursor-default"
            >
              {/* Number Bubble */}
              <div className="size-11 rounded-full bg-white border-2 border-primary-container flex items-center justify-center text-primary-container font-heading font-bold text-sm mb-6 shadow-sm group-hover:bg-primary-container group-hover:text-white transition-colors duration-300">
                {step.num}
              </div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-base text-foreground mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-[12.5px] leading-relaxed max-w-[240px] lg:max-w-none">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
