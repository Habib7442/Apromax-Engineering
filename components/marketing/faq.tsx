"use client";

import * as React from "react";
import { ChevronDown, HelpCircle, Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: "who-we-are",
    question: "Who is AproMax Engineering LLP?",
    answer: (
      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
        AproMax Engineering LLP is a multidisciplinary engineering and technology services company delivering <strong className="font-bold text-slate-900">mechanical, electrical, electronics, automation, PCB, embedded, CAD and software engineering solutions</strong> to clients in the USA and across global markets. We provide reliable, innovative and cost-effective engineering solutions from concept through detailed design and development.
      </p>
    )
  },
  {
    id: "services-offered",
    question: "What services do you offer?",
    answer: (
      <div className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
        <p>We offer a wide range of engineering services including:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-2">
          {[
            "Civil & Structural Engineering",
            "Mechanical Engineering",
            "Electrical Engineering",
            "Software Development",
            "Hardware Engineering",
            "Environmental Engineering",
            "Project Management",
            "Quality Assurance"
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-800">
              <span className="size-1.5 rounded-full bg-[#0a5cf0] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="pt-1 text-xs md:text-sm text-slate-500 italic">
          Each service is tailored to meet our clients&apos; specific needs and industry standards.
        </p>
      </div>
    )
  },
  {
    id: "contact-info",
    question: "How can I contact AproMax Engineering LLP?",
    answer: (
      <div className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
        <p>You can reach us through multiple channels:</p>
        <div className="space-y-2 pl-1 pt-1">
          <div className="flex items-center gap-2.5 text-xs md:text-sm text-slate-800">
            <Mail className="size-4 text-[#0a5cf0] shrink-0" />
            <span><strong>Email:</strong> info@apromaxeng.com</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-800">
            <Phone className="size-4 text-[#0a5cf0] shrink-0 mt-0.5" />
            <span><strong>Phone:</strong> +91-9577291349 (India) / +1 (312) 313-9125 (US)</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-800">
            <MapPin className="size-4 text-[#0a5cf0] shrink-0 mt-0.5" />
            <span><strong>Office:</strong> 57 Idgah Rd, Sijubari, Hatigaon, Guwahati, Assam 781038, India</span>
          </div>
        </div>
        <p className="pt-1 text-xs md:text-sm text-slate-500 font-medium">
          Our team typically responds within 24 business hours.
        </p>
      </div>
    )
  },
  {
    id: "business-hours",
    question: "What are your business days?",
    answer: (
      <div className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
        <p>Our business hours are:</p>
        <ul className="space-y-1.5 pl-2 text-xs md:text-sm text-slate-800 font-medium">
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#0a5cf0]" />
            <span><strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM IST</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#0a5cf0]" />
            <span><strong>Saturday:</strong> 9:00 AM - 1:00 PM IST</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-slate-400" />
            <span><strong>Sunday:</strong> Closed</span>
          </li>
        </ul>
        <p className="text-xs md:text-sm text-slate-500">
          We also accommodate different time zones for our international clients.
        </p>
      </div>
    )
  },
  {
    id: "international-projects",
    question: "Do you work on international projects?",
    answer: (
      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
        Yes, we have extensive experience working on international projects. Our team has successfully delivered projects across multiple countries, particularly in the United States. We maintain clear communication channels and adapt to different time zones to ensure smooth project execution.
      </p>
    )
  },
  {
    id: "delivery-process",
    question: "What is your project delivery process?",
    answer: (
      <div className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
        <p>Our project delivery process follows these key steps:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {[
            "1. Initial Consultation",
            "2. Requirements Analysis",
            "3. Proposal & Planning",
            "4. Design & Development",
            "5. Quality Assurance",
            "6. Client Review & Feedback",
            "7. Implementation",
            "8. Post-Project Support"
          ].map((step) => (
            <div key={step} className="bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-xs md:text-sm font-semibold text-slate-800">
              {step}
            </div>
          ))}
        </div>
        <p className="pt-1 text-xs md:text-sm text-slate-500 font-medium">
          We maintain transparent communication throughout the process.
        </p>
      </div>
    )
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = React.useState<string | null>("who-we-are");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a5cf0] bg-[#0a5cf0]/10 border border-[#0a5cf0]/20 px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            <HelpCircle className="size-3.5" />
            Support Center
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Find answers to common questions about our services and processes
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={cn(
                  "bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-sm",
                  isOpen
                    ? "border-[#0a5cf0]/40 shadow-md ring-1 ring-[#0a5cf0]/20"
                    : "border-slate-200/80 hover:border-slate-300"
                )}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-heading font-bold text-base md:text-lg text-slate-900">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200",
                      isOpen ? "bg-[#0a5cf0] text-white rotate-180" : "bg-slate-100 text-slate-600"
                    )}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
