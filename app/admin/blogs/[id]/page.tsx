"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Save, Upload } from "lucide-react";
import Link from "next/link";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();

  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [content, setContent] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");
  const [status, setStatus] = React.useState("draft");
  const [fetching, setFetching] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  React.useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        setFetching(true);
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setExcerpt(data.excerpt || "");
          setContent(data.content);
          setCoverImage(data.cover_image || "/images/case_thermal.webp");
          setStatus(data.status);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        alert("Failed to load blog post data.");
        router.push("/admin/blogs");
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id, supabase, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog-covers/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("assets")
        .getPublicUrl(filePath);

      setCoverImage(publicUrl);
    } catch (err: any) {
      console.error("Error uploading image:", err);
      alert(`Image upload failed: ${err.message || err}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      alert("Please fill in the title, slug, and content fields.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("blogs")
        .update({
          title,
          slug,
          excerpt,
          content,
          cover_image: coverImage,
          status,
          published_at: status === "published" ? new Date().toISOString() : null
        })
        .eq("id", id);

      if (error) throw error;

      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving blog post:", err);
      alert(`Failed to save blog post: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
        <Loader2 className="size-8 animate-spin text-primary" />
        <span className="text-xs">Fetching blog post details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link href="/admin/blogs" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#070b19] font-semibold transition-colors cursor-pointer">
          <ChevronLeft className="size-4" />
          Back to Blogs
        </Link>
        <span className="text-xs font-bold text-slate-400">Editor Workspace</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-[#070b19] mb-6">Edit Blog Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                required
                placeholder="How Managed Engineering Orchestrators Drive Value"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Slug / Canonical URL Path
              </label>
              <input
                type="text"
                id="slug"
                required
                placeholder="value-of-engineering-orchestration"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Cover Image
              </label>
              <div className="flex gap-4 items-center">
                {coverImage && (
                  <div className="relative size-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                    <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-grow flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                    id="blog-image-upload"
                  />
                  <label
                    htmlFor="blog-image-upload"
                    className="inline-flex items-center gap-1.5 px-3 h-10 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors shrink-0"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="size-3.5" />
                        Upload
                      </>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Or cover image URL..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="flex-grow bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3 py-2 text-xs text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Publishing Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] outline-none cursor-pointer"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Live to Site)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
              Excerpt / Brief Summary
            </label>
            <input
              type="text"
              id="excerpt"
              placeholder="A brief 1-2 sentence description of the article..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
              Article Content (Markdown support)
            </label>
            <textarea
              id="content"
              rows={12}
              required
              placeholder="Write your article markdown content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all resize-none font-mono"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-4 transition-all flex items-center justify-center gap-2 group shadow-sm cursor-pointer border-0"
          >
            {loading ? (
              <>
                <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving post changes...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </div>

    </div>
  );
}
