"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { Edit2, Trash2, Check, X, Search, Loader2, MessageSquare, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Application {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  experience: number;
  position: string;
  message: string;
  resume_url: string | null;
}

export default function ApplicationsAdminPage() {
  const supabase = createClient();
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Edit Row State
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<Partial<Application>>({});
  const [savingId, setSavingId] = React.useState<string | null>(null);

  // Message Modal State
  const [activeMessage, setActiveMessage] = React.useState<string | null>(null);

  const fetchApplications = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  React.useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handle Edit Action
  const startEdit = (app: Application) => {
    setEditingId(app.id);
    setEditForm(app);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    try {
      setSavingId(id);
      const { error } = await supabase
        .from("applications")
        .update({
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          experience: editForm.experience,
          position: editForm.position,
          message: editForm.message
        })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setApplications(applications.map((a) => (a.id === id ? { ...a, ...editForm } as Application : a)));
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.error("Error saving application details:", err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  // Handle Delete Action
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) throw error;

      setApplications(applications.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application.");
    }
  };

  // Filter applications by search term
  const filteredApps = applications.filter((app) => {
    const query = searchQuery.toLowerCase();
    return (
      app.name.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      (app.position && app.position.toLowerCase().includes(query))
    );
  });

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
            placeholder="Search candidates by name, email, or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg pl-9 pr-4 py-2.5 text-xs text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
          />
        </div>
        <Button onClick={fetchApplications} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs px-4 h-9 cursor-pointer">
          Refresh Table
        </Button>
      </div>

      {/* Applications Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="text-xs">Loading career applications inbox...</span>
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-400 text-xs">No career applications found matching your query.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Date Applied</th>
                <th className="pb-3">Candidate</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Experience</th>
                <th className="pb-3">Position</th>
                <th className="pb-3">Resume</th>
                <th className="pb-3">Cover Message</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#070b19]">
              {filteredApps.map((app) => {
                const isEditing = editingId === app.id;
                
                return (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-2 text-slate-500 font-medium whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    
                    <td className="py-4 font-semibold">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-full max-w-[150px]"
                        />
                      ) : (
                        app.name
                      )}
                    </td>
                    
                    <td className="py-4">
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email || ""}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-full max-w-[160px]"
                        />
                      ) : (
                        app.email
                      )}
                    </td>
                    
                    <td className="py-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.phone || ""}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-full max-w-[130px]"
                        />
                      ) : (
                        app.phone
                      )}
                    </td>

                    <td className="py-4 font-medium pl-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.experience || 0}
                          onChange={(e) => setEditForm({ ...editForm, experience: parseInt(e.target.value, 10) || 0 })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-16"
                        />
                      ) : (
                        `${app.experience} yrs`
                      )}
                    </td>
                    
                    <td className="py-4 font-medium text-primary">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.position || ""}
                          onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-full max-w-[150px]"
                        />
                      ) : (
                        app.position
                      )}
                    </td>

                    <td className="py-4">
                      {app.resume_url ? (
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-semibold cursor-pointer"
                        >
                          <FileDown className="size-3.5" />
                          View PDF
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">None</span>
                      )}
                    </td>
                    
                    <td className="py-4 max-w-[150px] truncate">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.message || ""}
                          onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-full"
                        />
                      ) : app.message ? (
                        <button
                          onClick={() => setActiveMessage(app.message)}
                          className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer"
                        >
                          <MessageSquare className="size-3.5 shrink-0" />
                          <span className="truncate max-w-[100px] text-left">{app.message}</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 italic">No message</span>
                      )}
                    </td>
                    
                    <td className="py-4 text-right pr-2">
                      <div className="flex justify-end gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(app.id)}
                              disabled={savingId === app.id}
                              className="size-7 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded flex items-center justify-center cursor-pointer border-0"
                              title="Save Changes"
                            >
                              {savingId === app.id ? (
                                <Loader2 className="size-3.5 animate-spin" />
                              ) : (
                                <Check className="size-3.5" />
                              )}
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="size-7 bg-red-50 hover:bg-red-100 text-red-600 rounded flex items-center justify-center cursor-pointer border-0"
                              title="Cancel"
                            >
                              <X className="size-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(app)}
                              className="size-7 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded flex items-center justify-center cursor-pointer border-0"
                              title="Edit Application"
                            >
                              <Edit2 className="size-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="size-7 bg-red-50 hover:bg-red-100 text-red-600 rounded flex items-center justify-center cursor-pointer border-0"
                              title="Delete Candidate"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Modal overlay */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-200">
            <h3 className="font-heading font-bold text-lg text-[#070b19] mb-4">Candidate Cover Note</h3>
            <p className="text-slate-600 text-xs leading-relaxed max-h-60 overflow-y-auto bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
              {activeMessage}
            </p>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setActiveMessage(null)} className="bg-primary text-white text-xs px-4 h-9 cursor-pointer border-0">
                Close Notes
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
