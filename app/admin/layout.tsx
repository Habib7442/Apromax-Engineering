"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  LayoutDashboard, 
  Mail, 
  FileText, 
  BookOpen, 
  LogOut, 
  Globe,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Leads Inbox", href: "/admin/leads", icon: Mail },
  { name: "Applications", href: "/admin/applications", icon: FileText },
  { name: "Manage Blogs", href: "/admin/blogs", icon: BookOpen },
  { name: "Case Studies", href: "/admin/case-studies", icon: Globe },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [loggingOut, setLoggingOut] = React.useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    try {
      setLoggingOut(true);
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  // If login page, render children raw without admin shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-[#070b19]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 flex flex-col justify-between">
        <div>
          {/* Logo / Header */}
          <div className="h-[76px] border-b border-slate-200 px-6 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg tracking-tight text-[#070b19]">
                AproMax <span className="text-primary">Admin</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer",
                    isActive 
                      ? "bg-blue-50 text-primary" 
                      : "text-slate-600 hover:text-[#070b19] hover:bg-slate-50"
                  )}
                >
                  <Icon className={cn("size-4 shrink-0", isActive ? "text-primary" : "text-slate-400")} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:text-[#070b19] rounded-xl hover:bg-slate-50 mb-1 cursor-pointer"
          >
            <Globe className="size-4 text-slate-400 shrink-0" />
            <span>Go to Live Site</span>
          </Link>
          
          <button
            onClick={handleSignOut}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:text-red-700 rounded-xl hover:bg-red-50 transition-all cursor-pointer border-0 bg-transparent text-left"
          >
            {loggingOut ? (
              <Loader2 className="size-4 shrink-0 animate-spin text-red-600" />
            ) : (
              <LogOut className="size-4 text-red-500 shrink-0" />
            )}
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow pl-64 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="h-[76px] bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-heading font-bold text-xl text-[#070b19]">
            {sidebarLinks.find((link) => link.href === pathname || (link.href !== "/admin" && pathname?.startsWith(link.href)))?.name || "Dashboard"}
          </h1>
          
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-xs text-primary">
              AM
            </div>
            <span className="text-xs font-bold text-slate-600">Owner Session</span>
          </div>
        </header>

        {/* Render children inside container */}
        <main className="flex-grow p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
