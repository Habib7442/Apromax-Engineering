"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { createLeadAction } from "@/lib/actions/leads";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "engineering",
    message: ""
  });
  
  // Honeypot field for simple spam prevention
  const [honeypot, setHoneypot] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Ignore submission from spam bots
      setSubmitted(true);
      return;
    }
    
    setLoading(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const serviceLabels: Record<string, string> = {
      engineering: "Engineering (Mechanical/Electrical)",
      design: "CAD Design & 3D Modeling",
      analysis: "Analysis & Simulation (FEA/CFD)",
      development: "Web & App Development",
      other: "Specialized Services"
    };
    const serviceLabel = serviceLabels[formData.service] || formData.service;
    const notes = `Service: ${serviceLabel}\nNotes: ${formData.message || "N/A"}`;

    // Save lead to Supabase
    const result = await createLeadAction(formData);
    if (!result.success) {
      console.error("Failed to save lead:", result.error);
    }

    const params = new URLSearchParams({
      name: fullName,
      email: formData.email,
      notes: notes
    });

    setLoading(false);
    setSubmitted(true);
    
    // Redirect to scheduling page
    router.push(`/book?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdff]">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />

      <main className="flex-grow py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header section */}
          <div className="w-full max-w-none mb-6 md:mb-8">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">
              Contact Us
            </span>
            <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-[#070b19] tracking-tight mb-3 lg:whitespace-nowrap">
              Have an engineering project in mind?
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-none">
              Share your requirements with our team. We will review your project and connect with you to discuss the scope, deliverables and next steps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Office info & Regional indicators */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Regional coordination card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="font-heading font-semibold text-base sm:text-lg text-[#070b19] mb-4 whitespace-nowrap">
                  Global Engineering. Delivered from India.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  We support OEMs, EPC companies, engineering firms and technology businesses with reliable, scalable and cost-effective engineering design solutions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="size-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#070b19] uppercase tracking-wider mb-1">Registered HQ</h4>
                      <p className="text-muted-foreground text-sm">
                        AproMax Engineering LLP<br />
                        57 Idgah Rd, Sijubari, Hatigaon,<br />
                        Guwahati, Assam 781038, India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="size-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#070b19] uppercase tracking-wider mb-1">Timezone / Support Hours</h4>
                      <p className="text-muted-foreground text-sm">
                        9:00 AM – 6:00 PM IST (Mon – Fri)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="size-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#070b19] uppercase tracking-wider mb-1">Email Correspondence</h4>
                      <a href="mailto:info@apromaxeng.com" className="text-primary hover:underline text-sm font-medium">
                        info@apromaxeng.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="size-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#070b19] uppercase tracking-wider mb-1">Direct Call</h4>
                      <div className="flex flex-col gap-1.5">
                        <a href="tel:+919577291349" className="text-muted-foreground hover:text-primary text-sm font-medium flex items-center gap-2">
                          <span>+91-9577291349</span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-700">
                            <svg className="w-3.5 h-2.5 rounded-[1px] inline-block shrink-0" viewBox="0 0 640 480">
                              <path fill="#f93" d="0 0h640v160H0z"/>
                              <path fill="#fff" d="0 160h640v160H0z"/>
                              <path fill="#128807" d="0 320h640v160H0z"/>
                              <circle cx="320" cy="240" r="50" fill="none" stroke="#000080" strokeWidth="14"/>
                            </svg>
                            IN
                          </span>
                        </a>
                        <a href="tel:+13123139125" className="text-muted-foreground hover:text-primary text-sm font-medium flex items-center gap-2">
                          <span>+1 (312) 313-9125</span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-700">
                            <svg className="w-3.5 h-2.5 rounded-[1px] inline-block shrink-0" viewBox="0 0 640 480">
                              <path fill="#bd3d44" d="0 0h640v480H0z"/>
                              <path stroke="#fff" strokeWidth="37" d="0 55.5h640M0 130h640M0 204h640M0 278h640M0 352h640M0 426h640"/>
                              <path fill="#192f5d" d="0 0h256v258H0z"/>
                            </svg>
                            US
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NDA Protection banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 items-start">
                <div className="size-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-[#070b19] mb-1">NDA Secured Scoping</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    We maintain absolute intellectual property safety. All CAD files, FEA/CFD models, and source code are protected under robust corporate confidentiality agreements.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Contact form card */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-2">
                    Request a Technical Consultation
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Fill out the form below to initiate. You'll be redirected to schedule a date/time on our calendar.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Honeypot field (hidden from normal users) */}
                  <input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                      Primary Service of Interest
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-foreground outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="engineering">Engineering (Mechanical/Electrical)</option>
                        <option value="design">CAD Design & 3D Modeling</option>
                        <option value="analysis">Analysis & Simulation (FEA/CFD)</option>
                        <option value="development">Web & App Development</option>
                        <option value="other">Specialized Services</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                      Briefly Outline Your Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Brief description of requirements, tolerances, or solver inputs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-4 transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow"
                  >
                    {loading ? (
                      <>
                        <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving Lead Details...
                      </>
                    ) : (
                      <>
                        Proceed to Schedule Scoping
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

          </div>

          {/* Full-width Google Map Embed */}
          <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-[350px] md:h-[450px] relative mt-12 md:mt-16">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14328.211116543436!2d91.7801895!3d26.129822049999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a592f3d88b54b%3A0xda331cb5555e5dfc!2sHatigaon%2C%20Guwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1782900438016!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="AproMax office location map"
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
