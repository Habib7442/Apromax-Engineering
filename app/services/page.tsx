import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Wrench, Compass, Code, Activity, Hammer, Layers, ArrowRight } from "lucide-react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Services | AproMax Engineering",
  description: "Technical scoping, simulation, and software development services coordinated through a vetted network of global specialists."
};

const services = [
  {
    slug: "engineering",
    icon: Wrench,
    name: "Engineering Services",
    desc: "Comprehensive coordination of multi-disciplinary engineering processes. We align electrical wiring schemas, mechanical tolerances, piping layouts, and electronic controls under robust structural standards.",
    bullets: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Electronics Engineering", "Control Systems", "Plant Engineering"],
    image: "/images/service_engineering.webp"
  },
  {
    slug: "design",
    icon: Compass,
    name: "Design & 3D Modeling",
    desc: "From initial conceptual drafts and SolidWorks 3D CAD modeling to complete manufacturing blueprints, industrial assembly specs, and specialized ergonomic casing styling.",
    bullets: ["CAD Design Drafting", "3D Component Modeling", "Product Shell Design", "Industrial Styling", "UX/UI Interface Mockups"],
    image: "/images/service_design.webp"
  },
  {
    slug: "web-app",
    icon: Code,
    name: "Web And App Development",
    desc: "Architecting modern web platforms, custom database dashboards, secure customer billing portals, responsive corporate layouts, and cross-platform native iOS & Android applications.",
    bullets: ["Website Design & Prototyping", "Full-Stack Web Dev", "Responsive UI/UX Layouts", "Custom Customer Portals", "iOS & Android Apps"],
    image: "/images/service_web.webp"
  },
  {
    slug: "analysis",
    icon: Activity,
    name: "Analysis & Simulation",
    desc: "High-fidelity finite element analysis (FEA) and computational fluid dynamics (CFD) structural simulations to check load distributions, heat sinks, fluid stress, and thermodynamics.",
    bullets: ["Structural Finite Element Analysis", "Thermal Dissipation Simulation", "CFD Flow & Aerodynamics", "Failure Prediction Solvers"],
    image: "/images/case_thermal.webp"
  },
  {
    slug: "prototyping",
    icon: Hammer,
    name: "Development & Testing",
    desc: "Bridging the gap between mathematical model and real-world production. We coordinate prototype load verifications, physical stress tests, and custom control software code.",
    bullets: ["Prototype Hardware Verification", "Physical Stress Testing", "Custom Software Solvers", "Python / C++ Integration", "Java / JS Control Pipelines"],
    image: "/images/about_engineers.webp"
  },
  {
    slug: "specialized",
    icon: Layers,
    name: "Specialized Services",
    desc: "Niche engineering capabilities including reverse engineering legacy hardware, value engineering optimizations, forensic failure analysis, and patent-ready IP drawings.",
    bullets: ["Legacy Reverse Engineering", "Value Engineering Optimization", "Failure Forensics", "Intellectual Property Drawings"],
    image: "/images/case_plant.webp"
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdff]">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />

      <main className="flex-grow py-12 md:py-20 text-[#070b19] relative overflow-hidden">
        {/* Subtle blur background effects */}
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-blue-100/30 blur-[130px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-cyan-100/20 blur-[130px] pointer-events-none transform-gpu" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header section */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">
              Our Capabilities
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-[#070b19]">
              Engineering & Design Services
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              We coordinate technical scoping, simulation, and software development, mapping your project parameters to a global network of vetted specialists.
            </p>
          </div>

          {/* Services Stack (Alternating Rows for clean layout) */}
          <div className="space-y-20 md:space-y-32">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isEven = idx % 2 === 0;
              
              return (
                <div
                  key={service.slug}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-500 transform translate-y-0 opacity-100 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Left: Image block */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-3xl overflow-hidden border border-slate-200 aspect-[16/10] shadow-sm group bg-slate-50">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-slate-900/5 transition-opacity group-hover:opacity-0" />
                    </div>
                  </div>

                  {/* Right: Content details */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="size-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-6">
                      <Icon className="size-6 text-primary" />
                    </div>

                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#070b19] tracking-tight mb-4">
                      {service.name}
                    </h2>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Core Service Areas
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-center gap-2.5 text-[#070b19] text-xs">
                            <span className="size-1.5 rounded-full bg-primary shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={`/services/${service.slug}`}>
                      <Button className="w-full sm:w-auto h-11 bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg px-6 flex items-center justify-center gap-2 group cursor-pointer border-0">
                        View Service Details
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Banner */}
          <div className="bg-slate-950 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden mt-20 md:mt-32 border border-white/5 shadow-lg">
            {/* Background design glow */}
            <div className="absolute top-[-50%] left-[-20%] w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none transform-gpu" />
            <div className="absolute bottom-[-50%] right-[-20%] w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none transform-gpu" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-white">
                Initiate Your Project Scoping
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-lg">
                Submit your project specifications and schedule a coordination meeting with AproMax. We'll outline availability and coordinate with vetted specialists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg px-6 flex items-center justify-center gap-2 group cursor-pointer border-0">
                    Request Consultation
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/book" className="w-full sm:w-auto">
                  <Button className="w-full h-11 border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 font-semibold rounded-lg px-6 transition-all cursor-pointer">
                    Book Calendar Slot
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
