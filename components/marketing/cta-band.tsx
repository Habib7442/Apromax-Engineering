"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTABand() {
  return (
    <section className="bg-gradient-to-br from-on-secondary-container to-primary-container text-white py-16 relative overflow-hidden">
      {/* Structural grid backdrop overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }}
      />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-2">
            Ready to Build with AproMax?
          </h2>
          <p className="text-white/70 text-[13.5px] md:text-sm max-w-lg leading-relaxed">
            Get in touch to secure an NDA, discuss tolerances, evaluate simulation boundary conditions, or schedule a direct consult with our engineering leads.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <Link href="/contact">
            <Button className="w-full md:w-auto h-12 bg-white hover:bg-white/90 text-primary-container font-semibold rounded-lg px-7 shadow-lg transition-transform hover:scale-[1.01] group">
              Get a Free Consultation
              <ArrowRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-0.5 text-primary-container" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
