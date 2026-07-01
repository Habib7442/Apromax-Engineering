"use client";

import * as React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  status: string;
}

export default function BlogsAdminPage() {
  const supabase = createClient();
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const fetchBlogs = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("id, created_at, title, slug, status")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  React.useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog post.");
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search articles by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg pl-9 pr-4 py-2.5 text-xs text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Button onClick={fetchBlogs} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs px-4 h-9 cursor-pointer flex-grow sm:flex-grow-0">
            Refresh
          </Button>
          <Link href="/admin/blogs/new" className="flex-grow sm:flex-grow-0">
            <Button className="bg-primary hover:bg-primary/95 text-white font-semibold text-xs px-4 h-9 cursor-pointer border-0 flex items-center gap-1.5 w-full">
              <Plus className="size-4" />
              New Blog Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Blogs Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="text-xs">Loading articles archive...</span>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-400 text-xs">No blogs found. Click "New Blog Post" to publish your first article.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Created Date</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Slug / URL</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#070b19]">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pl-2 text-slate-500 font-medium whitespace-nowrap">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>
                  
                  <td className="py-4 font-bold text-[#070b19] max-w-[280px] truncate">
                    {blog.title}
                  </td>
                  
                  <td className="py-4 text-slate-500 font-mono text-[11px]">
                    /blog/{blog.slug}
                  </td>
                  
                  <td className="py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                        blog.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  
                  <td className="py-4 text-right pr-2">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blogs/${blog.id}`}>
                        <button
                          className="size-7 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded flex items-center justify-center cursor-pointer border-0"
                          title="Edit Blog"
                        >
                          <Edit className="size-3.5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="size-7 bg-red-50 hover:bg-red-100 text-red-600 rounded flex items-center justify-center cursor-pointer border-0"
                        title="Delete Blog"
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
