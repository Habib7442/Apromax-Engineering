"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const featuredProjects = [
  {
    title: "Structural Thermal Optimization",
    client: "Aerospace Enclosures Corp",
    metric: "35% Heat Dissipation Imp.",
    category: "FEA & CFD Simulation",
    image: "/images/case_thermal.webp",
    desc: "Redesigning internal structural ducts and heat sink fins using ANSYS Fluent to eliminate localized hotspots in extreme environmental modules."
  },
  {
    title: "Zenith Industrial Plant Assembly",
    client: "Zenith Energy Group",
    metric: "450+ SolidWorks Model Nodes",
    category: "Plant & Mechanical Eng.",
    image: "/images/case_plant.webp",
    desc: "Developing full structural blueprint drafting, pipeline route models, and valve configurations for a modular gas processing plant in Texas."
  }
];

export default function FeaturedCases() {
  return (
    <section className="bg-background py-20 lg:py-28 border-b border-border relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left panel: Big Typography and Call to Action - Slides from Left */}
          <motion.div 
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between py-2"
          >
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
                Proof of Concept
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight leading-tight mb-6">
                Building Outcomes, <br className="hidden md:inline" />
                One Design at a Time
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
                We believe engineering excellence is measured in millimeters and percentages. Review some of our recent B2B client outcomes solved by our multidisciplined specialists.
              </p>
            </div>
            
            <div className="mt-8 lg:mt-0">
              <Link href="/case-studies">
                <Button className="bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg px-6 py-5 group shadow-sm hover:shadow cursor-pointer">
                  See All Case Studies
                  <ArrowUpRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right panel: Project cards in an asymmetrical layout - Slides from Right */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, x: 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -4, scale: 1.005 }}
                className="bg-white rounded-xl border border-border overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-sm hover:shadow-md transition-shadow group cursor-default"
              >
                {/* Visual Thumbnail */}
                <div className="md:col-span-5 p-6 flex flex-col justify-between text-white relative min-h-[180px] md:min-h-auto overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                    className="object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[0.5px] z-0" />

                  {/* Backdrop blueprint grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.15] pointer-events-none z-10" 
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                      backgroundSize: "16px 16px"
                    }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded w-max relative z-20">
                    {project.category}
                  </span>
                  
                  {/* Outcomes Badge */}
                  <div className="relative z-20 transition-transform duration-300 group-hover:translate-y-px">
                    <span className="text-[9px] font-bold text-white/80 uppercase">Result Metrics</span>
                    <p className="font-heading font-bold text-lg text-accent">{project.metric}</p>
                  </div>
                </div>

                {/* Content body */}
                <div className="md:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{project.client}</span>
                    <h3 className="font-heading font-semibold text-base text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-[12.5px] leading-relaxed">
                      {project.desc}
                    </p>
                  </div>

                  <div className="border-t border-border pt-4 mt-6 flex justify-end">
                    <Link 
                      href="/case-studies"
                      className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group/link cursor-pointer"
                    >
                      Read Case Study <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
