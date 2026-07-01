"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "AproMax coordinated and delivered critical thermal FEA simulations for our custom avionics chassis. Their specialist selection and QA vetting allowed us to proceed to physical prototyping without single-board failures.",
    author: "Dr. Marcus Vance",
    role: "Director of Engineering",
    company: "Aerospace Enclosures Corp (Texas)"
  },
  {
    quote: "We outsourced our core industrial dashboard development to the AproMax network. Their project management team delivered a responsive panel connecting to our Supabase storage in record time. Highly responsive coordination.",
    author: "Sarah Jenkins",
    role: "Product Principal",
    company: "Zenith Energy Group"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } }
};

export default function Testimonials() {
  return (
    <section className="bg-[#fcfdff] py-20 lg:py-28 border-b border-border relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Client Reviews
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
            Trusted by Builders
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Read what corporate engineering leads and product creators say about our delivery quality.
          </p>
        </div>

        {/* Testimonials List Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div 
              key={t.author}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.005 }}
              className="bg-white rounded-xl border border-border p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow cursor-default group"
            >
              {/* Quote Icon watermark */}
              <Quote className="absolute top-6 right-6 size-8 text-muted-foreground/10 group-hover:text-primary/10 transition-colors" />

              <div>
                <p className="text-foreground/90 italic text-[14.5px] leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-border pt-4 mt-2">
                <span className="block font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {t.author}
                </span>
                <span className="block text-[11px] text-muted-foreground mt-0.5">
                  {t.role} &bull; <strong className="font-medium text-secondary">{t.company}</strong>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
