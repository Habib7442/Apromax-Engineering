import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Calendar, ChevronRight, ArrowLeft } from "lucide-react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blogs")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return {};

  return {
    title: `${post.title} | AproMax Engineering Blog`,
    description: post.excerpt || "Technical engineering article written by AproMax specialists."
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="font-medium text-slate-900 truncate max-w-[200px]">
              {post.title}
            </span>
          </div>

          {/* Back Action */}
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#070b19] font-semibold mb-8 transition-colors cursor-pointer">
            <ArrowLeft className="size-4" />
            Back to Articles
          </Link>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <Calendar className="size-4 text-slate-400" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span className="text-primary font-bold">AproMax Insights</span>
            </div>
            
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-[#070b19] tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed italic border-l-2 border-primary/40 pl-4 py-1">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Featured Cover Image */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 aspect-[16/9] shadow-sm bg-slate-50 mb-10 md:mb-12">
            <Image
              src={post.cover_image || "/images/case_thermal.webp"}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-slate max-w-none text-[#070b19] text-xs md:text-sm leading-relaxed whitespace-pre-wrap space-y-6">
            {post.content}
          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
