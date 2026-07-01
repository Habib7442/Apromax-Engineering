import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ChevronRight } from "lucide-react";
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

      <main className="flex-grow py-8 md:py-16 text-[#070b19] relative overflow-hidden">
        {/* Subtle blur background effects */}
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-blue-100/30 blur-[130px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-cyan-100/20 blur-[130px] pointer-events-none transform-gpu" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
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

          {/* Title & Category Header */}
          <div className="space-y-4 mb-8">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">
              {item.category}
            </span>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-[#070b19] tracking-tight leading-tight max-w-4xl">
              {item.title}
            </h1>
            {item.desc && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-4xl">
                {item.desc}
              </p>
            )}
          </div>

          {/* Featured Panoramic Cover Image */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 aspect-[21/9] shadow-sm bg-slate-50 mb-10 w-full">
            <Image
              src={item.image || "/images/case_thermal.webp"}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Horizontal Project Profile Facts Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm text-xs mb-16">
            {item.client ? (
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Client Partner</span>
                <span className="font-bold text-[#070b19]">{item.client}</span>
              </div>
            ) : (
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Client Partner</span>
                <span className="text-slate-400 italic">Undisclosed</span>
              </div>
            )}
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Expertise Field</span>
              <span className="font-bold text-[#070b19]">{item.category}</span>
            </div>
            {item.metric ? (
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Outcome Verified</span>
                <span className="font-bold text-emerald-600">{item.metric}</span>
              </div>
            ) : (
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Outcome Verified</span>
                <span className="text-slate-400 italic">Fully Validated</span>
              </div>
            )}
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Coordination Hub</span>
              <span className="font-bold text-primary">Assam, India</span>
            </div>
          </div>

          {/* Lane-by-Lane Storytelling Content Deep Dive */}
          <div className="space-y-12 md:space-y-16 pt-12 border-t border-slate-200">
            
            {/* Lane 1: The Challenge */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-4">
                <span className="text-red-500 font-mono font-bold text-xs uppercase tracking-wider block mb-1.5">01 / Challenge</span>
                <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#070b19] leading-snug">The Engineering Obstacle</h2>
                <div className="h-1 w-10 bg-red-500 mt-3 rounded-full" />
              </div>
              <div className="lg:col-span-8">
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                  {item.challenge}
                </p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Lane 2: Our Approach */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-4">
                <span className="text-primary font-mono font-bold text-xs uppercase tracking-wider block mb-1.5">02 / Approach</span>
                <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#070b19] leading-snug">Coordination & Solution Path</h2>
                <div className="h-1 w-10 bg-primary mt-3 rounded-full" />
              </div>
              <div className="lg:col-span-8">
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                  {item.approach}
                </p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Lane 3: The Solution & Result */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-4">
                <span className="text-emerald-500 font-mono font-bold text-xs uppercase tracking-wider block mb-1.5">03 / Outcome</span>
                <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#070b19] leading-snug">The Validated Results</h2>
                <div className="h-1 w-10 bg-emerald-500 mt-3 rounded-full" />
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                  {item.solution}
                </p>

                {/* Highlight Outcome Block */}
                {item.metric && (
                  <div className="bg-emerald-50/60 border border-emerald-100/80 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">Key Performance Gain</span>
                      <span className="font-heading font-extrabold text-2xl md:text-3xl text-emerald-700 leading-none block">
                        {item.metric}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-600 leading-relaxed max-w-xs block font-medium">
                      Calculated and verified against baseline parameters using analytical simulation solvers.
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
