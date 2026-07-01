"use client";

import * as React from "react";
import { Suspense } from "react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { useSearchParams } from "next/navigation";

function BookingLoader() {
  return (
    <main className="flex-grow bg-[#fcfdff] py-24 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="size-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground text-sm font-medium">
          Loading scheduling calendar...
        </p>
      </div>
    </main>
  );
}

function CalContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const notes = searchParams.get("notes") || "";

  React.useEffect(() => {
    // Inject Cal.com script dynamic loader
    (function (C, A, L) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      C.Cal = C.Cal || function () {
        const o = C.Cal;
        if (!o.q) {
          o.q = [];
          C.addEventListener("DOMContentLoaded", function () {
            C.Cal.init();
          });
        }
        const ar = arguments;
        if (!ar) return;
        p(o, ar);
      };
    })(window as any, "https://app.cal.com/embed/embed.js", "Cal");

    // Initialize Cal.com and render inline
    const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "apromax-engineering/consultation";
    
    const cal = (window as any).Cal;
    if (cal) {
      cal("init", {
        theme: "light"
      });
      
      cal("inline", {
        elementOrSelector: "#my-cal-inline",
        calLink: calLink,
        config: {
          name: name,
          email: email,
          notes: notes,
          theme: "light"
        }
      });

      cal("ui", {
        styles: {
          branding: {
            brandColor: "#0046be"
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    }
  }, [name, email, notes]);

  return (
    <main className="flex-grow bg-[#fcfdff] py-12">
      <div className="max-w-[1000px] mx-auto px-4 md:px-12 flex flex-col items-center">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            Schedule Scoping Meeting
          </span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#070b19] tracking-tight mb-3">
            Select Your Consultation Slot
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Time slots are displayed in your local timezone and verified against our coordinators' availability in India (IST).
          </p>
        </div>

        {/* Cal.com inline element container */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-2 md:p-6 shadow-sm min-h-[650px] relative overflow-hidden">
          <div id="my-cal-inline" className="w-full h-full min-h-[600px]" />
        </div>
      </div>
    </main>
  );
}

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />
      
      <Suspense fallback={<BookingLoader />}>
        <CalContent />
      </Suspense>

      <Footer />
    </div>
  );
}
