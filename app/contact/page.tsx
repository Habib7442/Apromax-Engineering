"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { createLeadAction } from "@/lib/actions/leads";
import { Button } from "@/components/ui/button";

const COUNTRIES = [
  { name: "United States", code: "+1", placeholder: "+1 (555) 000-0000" },
  { name: "India", code: "+91", placeholder: "+91 98765 43210" },
  { name: "United Kingdom", code: "+44", placeholder: "+44 7911 123456" },
  { name: "Canada", code: "+1", placeholder: "+1 (416) 000-0000" },
  { name: "Germany", code: "+49", placeholder: "+49 151 12345678" },
  { name: "Australia", code: "+61", placeholder: "+61 400 123 456" },
  { name: "United Arab Emirates", code: "+971", placeholder: "+971 50 123 4567" },
  { name: "Saudi Arabia", code: "+966", placeholder: "+966 50 123 4567" },
  { name: "Singapore", code: "+65", placeholder: "+65 8123 4567" },
  { name: "Japan", code: "+81", placeholder: "+81 90 1234 5678" },
  { name: "France", code: "+33", placeholder: "+33 6 12 34 56 78" },
  { name: "Netherlands", code: "+31", placeholder: "+31 6 12345678" },
  { name: "Switzerland", code: "+41", placeholder: "+41 79 123 45 67" },
  { name: "Italy", code: "+39", placeholder: "+39 312 345 6789" },
  { name: "Spain", code: "+34", placeholder: "+34 612 34 56 78" },
  { name: "Brazil", code: "+55", placeholder: "+55 11 91234-5678" },
  { name: "Mexico", code: "+52", placeholder: "+52 55 1234 5678" },
  { name: "South Korea", code: "+82", placeholder: "+82 10-1234-5678" },
  { name: "Other / Rest of World", code: "+", placeholder: "+1 555 000 0000" },
];

export default function ContactPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "+1 ",
    country: "United States",
    service: "engineering",
    message: ""
  });

  const handleCountryChange = (selectedCountryName: string) => {
    const found = COUNTRIES.find((c) => c.name === selectedCountryName);
    const newCode = found ? found.code : "+";
    
    // Automatically update phone prefix when changing country
    let currentPhone = formData.phone;
    const matchedDial = COUNTRIES.find((c) => currentPhone.startsWith(c.code));
    
    if (!currentPhone || matchedDial || currentPhone.trim() === "" || currentPhone.startsWith("+")) {
      currentPhone = `${newCode} `;
    }

    setFormData({
      ...formData,
      country: selectedCountryName,
      phone: currentPhone,
    });
  };
  
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
      "engineering": "Engineering Services — Mechanical, Piping, Structural, Electrical & Controls",
      "drafting-3d": "Drafting & 3D Modeling",
      "electronics-product": "Electronics & Product Design",
      "software-digital": "Software & Digital Solutions",
      "analysis-simulation": "Analysis & Simulation",
      "specialized-services": "Specialized Services"
    };
    const serviceLabel = serviceLabels[formData.service] || formData.service;
    const notes = `Company: ${formData.company || "N/A"}\nPhone: ${formData.phone || "N/A"}\nCountry: ${formData.country || "N/A"}\nService: ${serviceLabel}\nDetails: ${formData.message || "N/A"}`;

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
                      <h4 className="text-xs font-bold text-[#070b19] uppercase tracking-wider mb-1">Phone</h4>
                      <div className="flex flex-col gap-1 text-sm">
                        <a href="tel:+919577291349" className="text-muted-foreground hover:text-primary font-medium flex items-center gap-1.5">
                          <strong className="font-semibold text-[#070b19]">India:</strong>
                          <span>+91-9577291349</span>
                        </a>
                        <a href="tel:+13123139125" className="text-muted-foreground hover:text-primary font-medium flex items-center gap-1.5">
                          <strong className="font-semibold text-[#070b19]">USA:</strong>
                          <span>+1 (312) 313-9125</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NDA Protection banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 items-start">
                <div className="size-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="size-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm md:text-base text-[#070b19] mb-1">Confidential &amp; NDA-Supported</h4>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    We understand the importance of protecting engineering designs, intellectual property and project information. NDA-supported engagements are available, with secure handling of CAD files, engineering documents, source code and other project data.
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
                        First Name*
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
                        Last Name*
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Company Name*
                      </label>
                      <input
                        type="text"
                        id="company"
                        required
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Business Email*
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="country" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Country / Region*
                      </label>
                      <div className="relative">
                        <select
                          id="country"
                          required
                          value={formData.country}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-foreground outline-none transition-all appearance-none cursor-pointer"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name} ({c.code})
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder={COUNTRIES.find((c) => c.name === formData.country)?.placeholder || "+1 (555) 000-0000"}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>
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
                        <option value="engineering">Engineering Services — Mechanical, Piping, Structural, Electrical &amp; Controls</option>
                        <option value="drafting-3d">Drafting &amp; 3D Modeling</option>
                        <option value="electronics-product">Electronics &amp; Product Design</option>
                        <option value="software-digital">Software &amp; Digital Solutions</option>
                        <option value="analysis-simulation">Analysis &amp; Simulation</option>
                        <option value="specialized-services">Specialized Services</option>
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
                      rows={4}
                      required
                      placeholder="Briefly describe your project, required deliverables, software/platforms and expected timeline."
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
