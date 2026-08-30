"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1220] text-white border-t border-white/5 pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Logo & Pitch */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <Link href="/" className="mb-5 inline-block">
              <Image
                src="/logo.webp"
                alt="AproMax Engineering"
                width={120}
                height={32}
                style={{ width: "auto", height: "auto" }}
                className="h-8 w-auto brightness-0 invert"
                priority
              />
            </Link>
            <p className="text-white/60 text-[12.5px] leading-relaxed max-w-sm mb-6">
              AproMax Engineering LLP is a managed engineering services partner and specialist orchestrator. We scope, coordinate, and quality-check complex technical projects delivered through a vetted global network.
            </p>
            <div className="flex items-center gap-2">
              {[
                { name: "linkedin", href: "https://www.linkedin.com/company/apromax-eng-llp/posts/?feedView=all" },
                { name: "X", href: "https://x.com/apromaxeng" },
                { name: "facebook", href: "https://facebook.com/apromaxeng" },
                { name: "instagram", href: "https://www.instagram.com/apromax__/" },
                { name: "whatsapp", href: "https://wa.me/919577291349" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group/social"
                  aria-label={social.name}
                >
                  <Image
                    src={`/social-icons/${social.name}.webp`}
                    alt={social.name}
                    width={16}
                    height={18}
                    className={`size-4 opacity-75 group-hover/social:opacity-100 transition-opacity ${social.name === "X" ? "invert" : ""}`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column 1: Services */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-xs text-accent uppercase tracking-widest mb-4">
              Disciplines
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/services/engineering" className="text-white/60 hover:text-white text-xs transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/design" className="text-white/60 hover:text-white text-xs transition-colors">
                  Design & 3D Modeling
                </Link>
              </li>
              <li>
                <Link href="/services/analysis" className="text-white/60 hover:text-white text-xs transition-colors">
                  Analysis & Simulation
                </Link>
              </li>
              <li>
                <Link href="/services/prototyping" className="text-white/60 hover:text-white text-xs transition-colors">
                  Prototyping & Testing
                </Link>
              </li>
              <li>
                <Link href="/services/web-app" className="text-white/60 hover:text-white text-xs transition-colors">
                  Web & App Development
                </Link>
              </li>
              <li>
                <Link href="/services/specialized" className="text-white/60 hover:text-white text-xs transition-colors">
                  Specialized Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Company */}
          <div className="md:col-span-2">
            <h4 className="font-heading font-semibold text-xs text-accent uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/about" className="text-white/60 hover:text-white text-xs transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/60 hover:text-white text-xs transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/60 hover:text-white text-xs transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white text-xs transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact coordinates */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-xs text-accent uppercase tracking-widest mb-4">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5 text-white/60 text-xs">
                <MapPin className="size-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  AproMax Engineering LLP<br />
                  57 Idgah Rd, Sijubari, Hatigaon,<br />
                  Guwahati, Assam 781038, India
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-xs">
                <Phone className="size-4 text-accent shrink-0 mt-0.5" />
                <span className="flex flex-col gap-1.5">
                  <a href="tel:+919577291349" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span>+91-9577291349</span>
                    <span className="inline-flex items-center gap-1 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white/80">
                      <svg className="w-3.5 h-2.5 rounded-[1px] inline-block shrink-0" viewBox="0 0 640 480">
                        <path fill="#f93" d="0 0h640v160H0z"/>
                        <path fill="#fff" d="0 160h640v160H0z"/>
                        <path fill="#128807" d="0 320h640v160H0z"/>
                        <circle cx="320" cy="240" r="50" fill="none" stroke="#000080" strokeWidth="14"/>
                      </svg>
                      IN
                    </span>
                  </a>
                  <a href="tel:+13123139125" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span>+1 (312) 313-9125</span>
                    <span className="inline-flex items-center gap-1 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white/80">
                      <svg className="w-3.5 h-2.5 rounded-[1px] inline-block shrink-0" viewBox="0 0 640 480">
                        <path fill="#bd3d44" d="0 0h640v480H0z"/>
                        <path stroke="#fff" strokeWidth="37" d="0 55.5h640M0 130h640M0 204h640M0 278h640M0 352h640M0 426h640"/>
                        <path fill="#192f5d" d="0 0h256v258H0z"/>
                      </svg>
                      US
                    </span>
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-xs">
                <Mail className="size-4 text-accent shrink-0" />
                <span>info@apromaxeng.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-[11px]">
            &copy; {currentYear} AproMax Engineering LLP. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-white/40 hover:text-white text-[11px] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-white/40 hover:text-white text-[11px] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
