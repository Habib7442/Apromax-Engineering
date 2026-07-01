"use client";

import * as React from "react";
import { Users, Award, Rocket, Briefcase, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { createApplicationAction } from "@/lib/actions/careers";

const benefits = [
  {
    icon: Users,
    title: "Collaborative Culture",
    desc: "Work with talented professionals in a supportive environment"
  },
  {
    icon: Award,
    title: "Growth Opportunities",
    desc: "Continuous learning and career advancement paths"
  },
  {
    icon: Rocket,
    title: "Innovation Focus",
    desc: "Work on cutting-edge engineering projects"
  },
  {
    icon: Briefcase,
    title: "Great Benefits",
    desc: "Competitive salary and comprehensive benefits package"
  }
];

const positions = [
  "CAD Design Engineer (Mechanical/Plant)",
  "FEA/CFD Simulation Analyst",
  "Full-Stack Web & App Developer",
  "Engineering Project Coordinator",
  "Industrial UX/UI Designer",
  "Other / Open Application"
];

export default function CareersPage() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    position: "",
    message: ""
  });
  
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setSubmitError("Only PDF resumes are accepted.");
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else if (file.size > 5 * 1024 * 1024) {
        setSubmitError("File size exceeds the 5MB limit.");
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setSubmitError(null);
        setSelectedFile(file);
      }
    }
  };

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("phone", formData.phone);
      submissionData.append("experience", formData.experience);
      submissionData.append("position", formData.position);
      submissionData.append("message", formData.message);
      
      if (selectedFile) {
        submissionData.append("resume", selectedFile);
      }

      const result = await createApplicationAction(submissionData);
      
      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          experience: "",
          position: "",
          message: ""
        });
        setSelectedFile(null);
      } else {
        setSubmitError(result.error || "Failed to submit application.");
      }
    } catch (err: any) {
      console.error("Careers submission error:", err);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdff]">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />

      <main className="flex-grow py-12 md:py-20 text-[#070b19] relative overflow-hidden">
        {/* Subtle blur background effects */}
        <div className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full bg-blue-100/30 blur-[130px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-cyan-100/20 blur-[130px] pointer-events-none transform-gpu" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header section */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-[#070b19]"
            >
              Join Our Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              At AproMax Engineering, we're looking for talented individuals to join our innovative team. If you're passionate about engineering, we'd love to hear from you!
            </motion.p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-24">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-300 hover:border-primary/45 shadow-sm"
                >
                  <div className="size-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-5">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-[#070b19] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Application Form section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative">
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#070b19] mb-2">
                  Apply Now
                </h2>
                <p className="text-muted-foreground text-sm">
                  Outline your qualifications below and upload your resume. We will get back to you shortly.
                </p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="size-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-3">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-8">
                    Thank you for applying. Our engineering coordinators will review your resume and experience, and contact you if there is a matching scoping role.
                  </p>
                  <Button 
                    onClick={() => setSubmitted(false)}
                    className="bg-primary hover:bg-primary/95 text-white rounded-lg px-6 h-11 transition-all cursor-pointer border-0"
                  >
                    Submit Another Application
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 items-start text-red-700 text-sm">
                      <AlertCircle className="size-5 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="+1234567890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="experience"
                        required
                        min="0"
                        max="50"
                        placeholder="5"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                      Position
                    </label>
                    <div className="relative">
                      <select
                        id="position"
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-white text-slate-400">Select a position</option>
                        {positions.map((pos) => (
                          <option key={pos} value={pos} className="bg-white text-[#070b19]">
                            {pos}
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
                    <label htmlFor="message" className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                      Why do you want to join our team?
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Tell us about your motivation and what you can bring to the team..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-[#070b19] placeholder:text-slate-400 outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-[#070b19] uppercase tracking-wider mb-2">
                      Upload Resume (PDF only)
                    </span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleTriggerUpload}
                        className="flex items-center justify-between w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm text-slate-500 text-left outline-none transition-all cursor-pointer"
                      >
                        <span>
                          {selectedFile ? selectedFile.name : "Choose File (Max 5MB)"}
                        </span>
                        <Upload className="size-4 text-primary shrink-0" />
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-4 transition-all flex items-center justify-center gap-2 group shadow-sm cursor-pointer border-0"
                  >
                    {loading ? (
                      <>
                        <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
