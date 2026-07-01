"use client";

import * as React from "react";
import { Suspense } from "react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { useSearchParams } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import { updateLeadStatusAction } from "@/lib/actions/leads";

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
    (async function initCal() {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        if (cal) {
          cal("ui", {
            theme: "light",
            styles: {
              branding: {
                brandColor: "#0046be"
              }
            },
            hideEventTypeDetails: false,
            layout: "month_view"
          });

          // Listen for successful booking event from the iframe
          cal("on", {
            action: "bookingSuccessful",
            callback: async (e: any) => {
              console.log("Cal.com -> Booking successful event received:", e?.detail);
              if (email) {
                const result = await updateLeadStatusAction(email, "booked");
                if (result.success) {
                  console.log("Cal.com -> Lead status updated to 'booked' in Supabase!");
                } else {
                  console.error("Cal.com -> Failed to update lead status:", result.error);
                }
              }
            }
          });
        }
      } catch (err) {
        console.error("Cal.com initialization error caught:", err);
      }
    })();
  }, [email]);

  const baseLink = process.env.NEXT_PUBLIC_CAL_LINK || "apromax-engineering/30min";

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

        {/* Cal.com React component container */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-2 md:p-6 shadow-sm min-h-[650px] relative overflow-hidden">
          <Cal
            namespace="30min"
            calLink={baseLink}
            style={{ width: "100%", height: "100%", minHeight: "600px", border: "0" }}
            config={{
              name: name,
              email: email,
              notes: notes,
              layout: "month_view"
            }}
          />
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
