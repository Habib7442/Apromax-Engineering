"use client";

import * as React from "react";
import { Suspense } from "react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

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

function CalContent({ scriptLoaded }: { scriptLoaded: boolean }) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const notes = searchParams.get("notes") || "";

  React.useEffect(() => {
    const cal = (window as any).Cal;
    const container = document.getElementById("my-cal-inline");
    
    if (scriptLoaded && cal && container && container.children.length === 0) {
      // 1. Initialize namespace with official origin parameter
      cal("init", { origin: "https://cal.com" });
      
      // 2. Build link with prefilled parameters to avoid embed.js config parsing bugs
      const baseLink = process.env.NEXT_PUBLIC_CAL_LINK || "apromax-engineering/30min";
      const calLink = `${baseLink}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&notes=${encodeURIComponent(notes)}`;
      
      // 3. Render inline
      cal("inline", {
        elementOrSelector: "#my-cal-inline",
        calLink: calLink
      });

      // 4. Style widget
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

    // Cleanup container content on unmount
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [scriptLoaded, name, email, notes]);

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
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  React.useEffect(() => {
    // If the script is already loaded (e.g. on route change back to book page)
    if (typeof window !== "undefined" && (window as any).Cal) {
      setScriptLoaded(true);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />
      
      {/* Load Cal.com embed.js via Next.js optimized Script loader */}
      <Script
        src="https://app.cal.com/embed/embed.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      <Suspense fallback={<BookingLoader />}>
        <CalContent scriptLoaded={scriptLoaded} />
      </Suspense>

      <Footer />
    </div>
  );
}
