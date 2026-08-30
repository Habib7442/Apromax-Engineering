"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createLeadAction } from "@/lib/actions/leads";
import { Button } from "@/components/ui/button";

export default function BookingSection() {
  const router = useRouter();
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    service: "engineering",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const serviceLabels: Record<string, string> = {
      engineering: "Engineering (Mechanical/Electrical)",
      design: "Design Services",
      development: "Web and App Development",
      analysis: "Analysis Services",
      other: "Specialized Services"
    };
    const serviceLabel = serviceLabels[formData.service] || formData.service;
    const notes = `Company: ${formData.company || "N/A"}\nPhone: ${formData.phone || "N/A"}\nCountry: ${formData.country || "N/A"}\nService: ${serviceLabel}\nDetails: ${formData.message || "N/A"}`;

    const result = await createLeadAction(formData);
    if (!result.success) {
      console.warn("Failed to persist lead in database:", result.error);
    }

    const params = new URLSearchParams({
      name: fullName,
      email: formData.email,
      notes: notes
    });

    setLoading(false);
    setSubmitted(true);
    router.push(`/book?${params.toString()}`);
  };

  return (
    <section id="booking-section" className="relative py-20 lg:py-28 bg-[#070b19] border-b border-white/5 overflow-hidden scroll-mt-20">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[15%] w-96 h-96 rounded-full bg-[#0a5cf0]/15 blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-[20%] right-[15%] w-96 h-96 rounded-full bg-[#06b6d4]/10 blur-[130px] pointer-events-none transform-gpu" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Copywriting */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 text-white space-y-6"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full uppercase tracking-widest">
              Project Scoping
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight leading-tight text-white">
              Have an engineering <br className="hidden md:inline" />
              <span className="text-accent">project in mind?</span>
            </h2>
            <p className="text-[#ECEFF4] text-sm md:text-base leading-relaxed max-w-lg">
              Share your requirements with our team. We will review your project and connect with you to discuss the scope, deliverables and next steps.
            </p>
          </motion.div>

          {/* Right Side: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(11,18,32,0.4)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-[#0a5cf0]" />

              {submitted ? (
                <div className="text-center py-12 flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <div className="relative size-20 mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-75" />
                    <div className="relative size-14 rounded-full bg-gradient-to-tr from-accent to-[#0a5cf0] flex items-center justify-center text-white shadow-lg shadow-accent/25">
                      <CheckCircle2 className="size-7 stroke-[2.5]" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-4">
                    NDA Confidentiality Secured
                  </span>

                  <h3 className="font-heading font-bold text-2xl text-white mb-2">
                    Request Received!
                  </h3>
                  
                  <p className="text-white/70 text-xs md:text-[13px] leading-relaxed max-w-xs mx-auto">
                    Redirecting you to our scheduling calendar to pick a time slot...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">
                      Request <span className="text-accent">Consultation</span>
                    </h3>
                    <p className="text-[12px] text-white/60 mt-1">
                      Confidential B2B scoping. Response within <span className="text-accent font-bold">24 hours</span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                        Company Name*
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                        Business Email*
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                        Country / Region*
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="United States, India..."
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                      Primary Service of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0d1527] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                    >
                      <option value="engineering">Engineering (Mechanical/Electrical)</option>
                      <option value="design">Design &amp; 3D Modeling (CAD)</option>
                      <option value="analysis">Analysis &amp; Simulation (FEA/CFD)</option>
                      <option value="prototyping">Prototyping &amp; Development</option>
                      <option value="web-app">Web &amp; Custom App Development</option>
                      <option value="specialized">Specialized / Niche Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                      Briefly Outline Your Project Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief description of requirements, tolerances, or solver inputs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none min-h-[70px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 mt-1 bg-[#0a5cf0] hover:bg-[#0a5cf0]/90 text-white font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer border-0"
                  >
                    {loading ? "Processing..." : "Get a Free Consultation"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
