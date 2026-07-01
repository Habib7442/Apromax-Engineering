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
    // 1. Setup the queue and inject the script element dynamically
    (function (C, A, L) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const c = C.document;
      C.Cal = C.Cal || function () {
        const o = C.Cal;
        if (!o.q) {
          o.q = [];
          const s = c.createElement("script");
          s.src = A;
          s.async = true;
          const firstScript = c.getElementsByTagName("script")[0];
          if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(s, firstScript);
          } else {
            c.head.appendChild(s);
          }
          o.init = function () {
            const i = setInterval(function () {
              if (typeof C.Cal.ns !== "undefined") {
                clearInterval(i);
              } else {
                p(o, ["init"]);
              }
            }, 10);
          };
        }
        const ar = arguments;
        if (!ar) return;
        p(o, ar);
      };
    })(window as any, "https://app.cal.com/embed/embed.js", "Cal");

    // 2. Initialize and configure the inline embed
    const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "apromax-engineering/30min";
    const cal = (window as any).Cal;
    const container = document.getElementById("my-cal-inline");
    
    if (cal && container && container.children.length === 0) {
      cal("init", { theme: "light" });
      
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

    // Cleanup container content on unmount to prevent stale/ignored re-initialization calls
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
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
