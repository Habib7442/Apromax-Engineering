import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("case_studies")
    .select("title, desc")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!item) return {};

  return {
    title: `${item.title} | AproMax Case Studies`,
    description: item.desc || "Learn how AproMax Engineering solves complex client issues."
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdff]">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />

      <main className="flex-grow py-8 md:py-12 text-[#070b19] relative overflow-hidden">
        {/* Subtle blur background effects */}
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-blue-100/30 blur-[130px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-cyan-100/20 blur-[130px] pointer-events-none transform-gpu" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/case-studies" className="hover:text-primary transition-colors">
              Case Studies
            </Link>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="font-medium text-slate-900 truncate max-w-[200px]">
              {item.title}
            </span>
          </div>

          {/* Back Button */}
          <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#070b19] font-semibold mb-8 transition-colors cursor-pointer">
            <ArrowLeft className="size-4" />
            Back to Case Studies
          </Link>

          {/* Title & Metadata Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                {item.category}
              </span>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-[#070b19] tracking-tight leading-tight">
                {item.title}
              </h1>
              {item.desc && (
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              )}
            </div>

            {/* Metric Block */}
            {item.metric && (
              <div className="lg:col-span-4 bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">Outcome Verified</span>
                <span className="font-heading font-extrabold text-2xl md:text-3xl text-emerald-700 leading-none">
                  {item.metric}
                </span>
                <span className="text-[11px] text-emerald-600 mt-2 leading-tight">
                  Calculated against baseline parameters using simulation models.
                </span>
              </div>
            )}
          </div>

          {/* Detail Columns Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Left: Image & Fact Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 aspect-[16/10] shadow-sm bg-slate-50 w-full">
                <Image
                  src={item.image || "/images/case_thermal.webp"}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Fact Card */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="font-heading font-semibold text-[#070b19] text-xs uppercase tracking-wider">Project Profile</h4>
                <div className="space-y-3 text-xs">
                  {item.client && (
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Client Partner</span>
                      <span className="font-bold text-[#070b19]">{item.client}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Specialist Field</span>
                    <span className="font-bold text-[#070b19]">{item.category}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Coordination Hub</span>
                    <span className="font-bold text-primary">Assam, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Challenge, Approach, Solution Blocks */}
            <div className="lg:col-span-7 space-y-8">
              {/* Challenge */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-red-600">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider">The Challenge</h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                  {item.challenge}
                </p>
              </div>

              {/* Approach */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Our Approach</h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                  {item.approach}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider">The Solution & Result</h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                  {item.solution}
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
