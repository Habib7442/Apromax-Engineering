import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Globe, ArrowUpRight } from "lucide-react";
import Header from "@/components/marketing/header";
import { Button } from "@/components/ui/button";
import Footer from "@/components/marketing/footer";

export const metadata = {
  title: "Case Studies & Project Portfolios | AproMax Engineering",
  description: "Explore our recent multidisciplinary project outcomes in CAD modeling, FEA simulation, CFD flow, and control software systems."
};

export default async function CaseStudiesPage() {
  const supabase = await createClient();
  const { data: cases } = await supabase
    .from("case_studies")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">
              Outcome Verification
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl tracking-tight mb-6 text-[#070b19]">
              Case Studies & Portfolios
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Review documented engineering design achievements, structural stress simulations, and flow analytics verified by our team.
            </p>
          </div>

          {/* Cases Grid */}
          {!cases || cases.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl max-w-2xl mx-auto shadow-sm">
              <Globe className="size-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg text-[#070b19] mb-1">Portfolio Under Review</h3>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-xs mx-auto">
                Our lead engineers are currently drafting technical challenge briefs. Please check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cases.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] bg-slate-50 w-full overflow-hidden border-b border-slate-100">
                      <Image
                        src={item.image || "/images/case_thermal.webp"}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                      
                      {/* Metric Tag overlay */}
                      {item.metric && (
                        <div className="absolute top-4 right-4 bg-emerald-500/90 text-white font-heading font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                          {item.metric}
                        </div>
                      )}
                    </div>

                    {/* Metadata Content */}
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                        <span>{item.category}</span>
                        {item.client && (
                          <>
                            <span>•</span>
                            <span>{item.client}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-xl text-[#070b19] leading-snug mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      {item.desc && (
                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="p-6 md:p-8 pt-0">
                    <Link href={`/case-studies/${item.slug}`} className="w-full">
                      <Button className="w-full h-11 bg-slate-50 border border-slate-200 text-[#070b19] hover:bg-primary hover:text-white hover:border-primary font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 group/btn cursor-pointer transition-all">
                        Explore Case Study
                        <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
