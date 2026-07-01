"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { Edit2, Trash2, Check, X, Search, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  service: string;
  status: string;
  message: string;
}

export default function LeadsAdminPage() {
  const supabase = createClient();
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Edit Row State
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<Partial<Lead>>({});
  const [savingId, setSavingId] = React.useState<string | null>(null);

  // Message Modal State
  const [activeMessage, setActiveMessage] = React.useState<string | null>(null);

  const fetchLeads = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  React.useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle Edit Action
  const startEdit = (lead: Lead) => {
    setEditingId(lead.id);
    setEditForm(lead);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    try {
      setSavingId(id);
      const { error } = await supabase
        .from("leads")
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          email: editForm.email,
          service: editForm.service,
          status: editForm.status,
          message: editForm.message
        })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setLeads(leads.map((l) => (l.id === id ? { ...l, ...editForm } as Lead : l)));
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.error("Error saving lead details:", err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  // Handle Delete Action
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;

      setLeads(leads.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error deleting lead:", err);
      alert("Failed to delete lead.");
    }
  };

  // Filters leads by search term
  const filteredLeads = leads.filter((lead) => {
    const fullName = `${lead.first_name} ${lead.last_name}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      (lead.service && lead.service.toLowerCase().includes(query))
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
            placeholder="Search leads by name, email, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg pl-9 pr-4 py-2.5 text-xs text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
          />
        </div>
        <Button onClick={fetchLeads} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs px-4 h-9 cursor-pointer">
          Refresh Table
        </Button>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="text-xs">Loading inbound leads database...</span>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-400 text-xs">No leads found matching your query.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Date Received</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Service</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Inquiry Message</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#070b19]">
              {filteredLeads.map((lead) => {
                const isEditing = editingId === lead.id;
                
                return (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-2 text-slate-500 font-medium whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    
                    <td className="py-4 font-semibold">
                      {isEditing ? (
                        <div className="flex gap-2 max-w-[200px]">
                          <input
                            type="text"
                            value={editForm.first_name || ""}
                            onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                            className="w-1/2 border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs"
                          />
                          <input
                            type="text"
                            value={editForm.last_name || ""}
                            onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                            className="w-1/2 border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs"
                          />
                        </div>
                      ) : (
                        `${lead.first_name} ${lead.last_name}`
                      )}
                    </td>
                    
                    <td className="py-4">
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email || ""}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-full max-w-[180px]"
                        />
                      ) : (
                        lead.email
                      )}
                    </td>
                    
                    <td className="py-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.service || ""}
                          onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-full max-w-[150px]"
                        />
                      ) : (
                        lead.service || <span className="text-slate-400 italic">None</span>
                      )}
                    </td>
                    
                    <td className="py-4">
                      {isEditing ? (
                        <select
                          value={editForm.status || ""}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs cursor-pointer"
                        >
                          <option value="pending_booking">Pending Booking</option>
                          <option value="booked">Booked</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                            lead.status === "booked"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}
                        >
                          {lead.status === "booked" ? "Booked" : "Pending Booking"}
                        </span>
                      )}
                    </td>
                    
                    <td className="py-4 max-w-[160px] truncate">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.message || ""}
                          onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                          className="border border-slate-200 focus:border-primary rounded px-2 py-1 text-xs w-full"
                        />
                      ) : lead.message ? (
                        <button
                          onClick={() => setActiveMessage(lead.message)}
                          className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer"
                        >
                          <MessageSquare className="size-3.5 shrink-0" />
                          <span className="truncate max-w-[120px] text-left">{lead.message}</span>
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
                              onClick={() => saveEdit(lead.id)}
                              disabled={savingId === lead.id}
                              className="size-7 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded flex items-center justify-center cursor-pointer border-0"
                              title="Save Changes"
                            >
                              {savingId === lead.id ? (
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
                              onClick={() => startEdit(lead)}
                              className="size-7 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded flex items-center justify-center cursor-pointer border-0"
                              title="Edit Lead"
                            >
                              <Edit2 className="size-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="size-7 bg-red-50 hover:bg-red-100 text-red-600 rounded flex items-center justify-center cursor-pointer border-0"
                              title="Delete Lead"
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
            <h3 className="font-heading font-bold text-lg text-[#070b19] mb-4">Lead Inquiry Message</h3>
            <p className="text-slate-600 text-xs leading-relaxed max-h-60 overflow-y-auto bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
              {activeMessage}
            </p>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setActiveMessage(null)} className="bg-primary text-white text-xs px-4 h-9 cursor-pointer border-0">
                Close Message
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
