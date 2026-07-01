import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/marketing/header";
import { Button } from "@/components/ui/button";
import Footer from "@/components/marketing/footer";

export const metadata = {
  title: "Insights & Engineering Blog | AproMax Engineering",
  description: "Stay updated with technical articles, simulation insights, and industry engineering guides written by our coordinators."
};

export default async function BlogLandingPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blogs")
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
              Corporate Insights
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl tracking-tight mb-6 text-[#070b19]">
              The AproMax Blog
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Read technical analysis, engineering scoping guides, reverse engineering best practices, and insights written by our lead coordinators.
            </p>
          </div>

          {/* Posts Grid */}
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl max-w-2xl mx-auto shadow-sm">
              <BookOpen className="size-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg text-[#070b19] mb-1">Check Back Soon</h3>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-xs mx-auto">
                We are currently drafting insights and engineering guides. Check back soon for details.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] bg-slate-50 w-full overflow-hidden border-b border-slate-100">
                      <Image
                        src={post.cover_image || "/images/case_thermal.webp"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>

                    {/* Metadata Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                        <Calendar className="size-3.5 text-slate-400" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-[#070b19] leading-snug mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="p-6 pt-0">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline group/btn cursor-pointer">
                      Read Article
                      <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
