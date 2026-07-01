"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Save, Upload } from "lucide-react";
import Link from "next/link";

export default function EditCaseStudyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();

  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [client, setClient] = React.useState("");
  const [metric, setMetric] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [challenge, setChallenge] = React.useState("");
  const [approach, setApproach] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const [status, setStatus] = React.useState("draft");
  const [fetching, setFetching] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  React.useEffect(() => {
    if (!id) return;
    const fetchCase = async () => {
      try {
        setFetching(true);
        const { data, error } = await supabase
          .from("case_studies")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setClient(data.client);
          setMetric(data.metric || "");
          setCategory(data.category);
          setImage(data.image || "/images/case_thermal.webp");
          setDesc(data.desc || "");
          setChallenge(data.challenge);
          setApproach(data.approach);
          setSolution(data.solution);
          setStatus(data.status);
        }
      } catch (err) {
        console.error("Error fetching case study:", err);
        alert("Failed to load case study data.");
        router.push("/admin/case-studies");
      } finally {
        setFetching(false);
      }
    };

    fetchCase();
  }, [id, supabase, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `case-covers/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("assets")
        .getPublicUrl(filePath);

      setImage(publicUrl);
    } catch (err: any) {
      console.error("Error uploading image:", err);
      alert(`Image upload failed: ${err.message || err}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !client || !category || !challenge || !approach || !solution) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("case_studies")
        .update({
          title,
          slug,
          client,
          metric,
          category,
          image,
          desc,
          challenge,
          approach,
          solution,
          status
        })
        .eq("id", id);

      if (error) throw error;

      router.push("/admin/case-studies");
      router.refresh();
    } catch (err: any) {
      console.error("Error updating case study:", err);
      alert(`Failed to save case study: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
        <Loader2 className="size-8 animate-spin text-primary" />
        <span className="text-xs">Fetching case study details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link href="/admin/case-studies" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#070b19] font-semibold transition-colors cursor-pointer">
          <ChevronLeft className="size-4" />
          Back to Case Studies
        </Link>
        <span className="text-xs font-bold text-slate-400">Editor Workspace</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-[#070b19] mb-6">Edit Case Study</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                required
                placeholder="Structural Thermal Optimization"
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
                placeholder="structural-thermal-optimization"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="client" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Client Name
              </label>
              <input
                type="text"
                id="client"
                required
                placeholder="Aerospace Enclosures Corp"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="metric" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Key Performance Metric
              </label>
              <input
                type="text"
                id="metric"
                placeholder="35% Heat Dissipation Imp."
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all font-medium text-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="category" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Category / Domain Vertical
              </label>
              <input
                type="text"
                id="category"
                required
                placeholder="FEA & CFD Simulation"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
              />
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

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                Featured Portfolio Image
              </label>
              <div className="flex gap-4 items-center">
                {image && (
                  <div className="relative size-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                    <img src={image} alt="Case Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-grow flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                    id="case-image-upload"
                  />
                  <label
                    htmlFor="case-image-upload"
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
                    placeholder="Or featured image URL..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-grow bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3 py-2 text-xs text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="desc" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
              Concise Overview Description
            </label>
            <textarea
              id="desc"
              rows={3}
              placeholder="Short paragraph summarizing the case study for the listing page..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all resize-none"
            />
          </div>

          {/* Detailed challenge, approach, solution blocks */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <h3 className="font-heading font-bold text-[#070b19] text-base">Challenge-Approach-Solution Details</h3>

            <div>
              <label htmlFor="challenge" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                1. The Challenge
              </label>
              <textarea
                id="challenge"
                rows={5}
                required
                placeholder="What complex engineering problem did the client face? Specify dimensional, temperature, or load constraints..."
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label htmlFor="approach" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                2. Our Approach
              </label>
              <textarea
                id="approach"
                rows={5}
                required
                placeholder="How did our team scope, allocate coordinators, and employ solvers? E.g., modeling heat fin dimensions or duct dynamics..."
                value={approach}
                onChange={(e) => setApproach(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label htmlFor="solution" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                3. The Solution & Result
              </label>
              <textarea
                id="solution"
                rows={5}
                required
                placeholder="What were the outcomes and validated engineering metrics? E.g., hot spots cleared, heat rejection optimized..."
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all resize-none"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-4 transition-all flex items-center justify-center gap-2 group shadow-sm cursor-pointer border-0"
          >
            {loading ? (
              <>
                <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving changes...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Case Study Changes
              </>
            )}
          </Button>
        </form>
      </div>

    </div>
  );
}
