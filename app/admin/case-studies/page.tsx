"use client";

import * as React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  status: string;
}

export default function CaseStudiesAdminPage() {
  const supabase = createClient();
  const [cases, setCases] = React.useState<CaseStudy[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const fetchCases = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("case_studies")
        .select("id, created_at, title, slug, client, category, status")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (err) {
      console.error("Error fetching case studies:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  React.useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study portfolio?")) {
      return;
    }

    try {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;

      setCases(cases.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting case study:", err);
      alert("Failed to delete case study.");
    }
  };

  const filteredCases = cases.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      
      {/* Table Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="size-4" />
          </div>
          <input
            type="text"
            placeholder="Search cases by title, client, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg pl-9 pr-4 py-2.5 text-xs text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Button onClick={fetchCases} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs px-4 h-9 cursor-pointer flex-grow sm:flex-grow-0">
            Refresh
          </Button>
          <Link href="/admin/case-studies/new" className="flex-grow sm:flex-grow-0">
            <Button className="bg-primary hover:bg-primary/95 text-white font-semibold text-xs px-4 h-9 cursor-pointer border-0 flex items-center gap-1.5 w-full">
              <Plus className="size-4" />
              New Case Study
            </Button>
          </Link>
        </div>
      </div>

      {/* Cases Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="text-xs">Loading case study list...</span>
        </div>
      ) : filteredCases.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-400 text-xs">No case studies found. Click "New Case Study" to upload your first portfolio project.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Created Date</th>
                <th className="pb-3">Project Title</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#070b19]">
              {filteredCases.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pl-2 text-slate-500 font-medium whitespace-nowrap">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  
                  <td className="py-4 font-bold text-[#070b19] max-w-[240px] truncate">
                    {item.title}
                  </td>
                  
                  <td className="py-4 text-slate-600 font-medium">
                    {item.client || <span className="text-slate-400 italic">None</span>}
                  </td>

                  <td className="py-4 text-slate-500 font-medium whitespace-nowrap">
                    {item.category}
                  </td>
                  
                  <td className="py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                        item.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  
                  <td className="py-4 text-right pr-2">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/case-studies/${item.id}`}>
                        <button
                          className="size-7 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded flex items-center justify-center cursor-pointer border-0"
                          title="Edit Case Study"
                        >
                          <Edit className="size-3.5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="size-7 bg-red-50 hover:bg-red-100 text-red-600 rounded flex items-center justify-center cursor-pointer border-0"
                        title="Delete Case Study"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
