"use client";

import * as React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { 
  Mail, 
  FileText, 
  BookOpen, 
  Globe, 
  ArrowRight,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = React.useState({
    leadsCount: 0,
    leadsPending: 0,
    leadsBooked: 0,
    appsCount: 0,
    blogsCount: 0,
    casesCount: 0
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [
          { count: leadsAll },
          { count: leadsPending },
          { count: leadsBooked },
          { count: appsCount },
          { count: blogsCount },
          { count: casesCount }
        ] = await Promise.all([
          supabase.from("leads").select("*", { count: "exact", head: true }),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "pending_booking"),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "booked"),
          supabase.from("applications").select("*", { count: "exact", head: true }),
          supabase.from("blogs").select("*", { count: "exact", head: true }),
          supabase.from("case_studies").select("*", { count: "exact", head: true })
        ]);

        setStats({
          leadsCount: leadsAll || 0,
          leadsPending: leadsPending || 0,
          leadsBooked: leadsBooked || 0,
          appsCount: appsCount || 0,
          blogsCount: blogsCount || 0,
          casesCount: casesCount || 0
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [supabase]);

  const cards = [
    {
      title: "Inbound Leads",
      value: stats.leadsCount,
      desc: `${stats.leadsBooked} scheduled • ${stats.leadsPending} pending`,
      icon: Mail,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      href: "/admin/leads"
    },
    {
      title: "Careers Applications",
      value: stats.appsCount,
      desc: "Vetted candidates & resumes",
      icon: FileText,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      href: "/admin/applications"
    },
    {
      title: "Published Blogs",
      value: stats.blogsCount,
      desc: "Dynamic marketing insights",
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      href: "/admin/blogs"
    },
    {
      title: "Case Studies",
      value: stats.casesCount,
      desc: "Outcome verification portfolios",
      icon: Globe,
      color: "bg-cyan-50 text-cyan-600 border-cyan-100",
      href: "/admin/case-studies"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19]">
            Welcome Back, Admin Coordinator
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm mt-1">
            Track customer scoping inquiries, applications, and manage articles from your dashboard.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/blogs/new">
            <Button size="sm" className="bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg px-4 h-9 cursor-pointer border-0">
              Create Blog
            </Button>
          </Link>
          <Link href="/admin/case-studies/new">
            <Button size="sm" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg px-4 h-9 cursor-pointer">
              Add Case Study
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
                  {loading ? (
                    <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-lg mt-1" />
                  ) : (
                    <h3 className="font-heading font-bold text-3xl mt-1 text-[#070b19]">{card.value}</h3>
                  )}
                </div>
                <div className={`size-10 rounded-xl border flex items-center justify-center ${card.color}`}>
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                <span className="text-[11px] text-muted-foreground">{card.desc}</span>
                <Link href={card.href} className="text-primary hover:underline text-[11px] font-bold flex items-center gap-0.5 cursor-pointer">
                  Manage <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scoping Stats */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp className="size-4" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#070b19]">Pipeline Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-600">Total Leads Received</span>
              <span className="font-bold text-[#070b19]">{stats.leadsCount}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-600">Calendars Synced (Booked)</span>
              <span className="font-bold text-emerald-600">{stats.leadsBooked} ({stats.leadsCount > 0 ? Math.round((stats.leadsBooked / stats.leadsCount) * 100) : 0}%)</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="text-slate-600">Pending Scheduling Actions</span>
              <span className="font-bold text-amber-600">{stats.leadsPending}</span>
            </div>
          </div>
        </div>

        {/* System Vitals */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <UserCheck className="size-4" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#070b19]">CMS Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-600">Active Careers Applications</span>
              <span className="font-bold text-[#070b19]">{stats.appsCount}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-600">Active Case Studies published</span>
              <span className="font-bold text-[#070b19]">{stats.casesCount}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="text-slate-600">Insights Articles written</span>
              <span className="font-bold text-[#070b19]">{stats.blogsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
