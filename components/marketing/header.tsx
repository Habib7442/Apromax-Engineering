"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Services", href: "/services", hasMegaMenu: true },
  { name: "Industries", href: "/industries" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/blog" },
];

const servicePillars = [
  {
    name: "Engineering Services",
    href: "/services/engineering",
    bullets: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Electronics Engineering", "Control Systems", "Plant Engineering"]
  },
  {
    name: "Design Services",
    href: "/services/design",
    bullets: ["CAD Design", "3D Modeling", "Product Design", "Industrial Design", "UX/UI Design"]
  },
  {
    name: "Web And App Development",
    href: "/services/web-app",
    bullets: ["Website Design", "Website Development", "Responsive Design", "Mobile Apps", "Custom Apps"]
  },
  {
    name: "Analysis Services",
    href: "/services/analysis",
    bullets: ["Structural Analysis", "Thermal Analysis", "FEA Solver", "CFD Simulation"]
  },
  {
    name: "Development Services",
    href: "/services/prototyping",
    bullets: ["Prototype Dev", "Product Testing", "Custom Software", "Python / C++"]
  },
  {
    name: "Other Services",
    href: "/services/specialized",
    bullets: ["Reverse Engineering", "Value Engineering", "Failure Analysis", "IP Development"]
  }
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);

  const isHome = pathname === "/";
  const shouldBeSolid = scrolled || isOpen || !isHome;

  React.useEffect(() => {
    let active = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== active) {
        active = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-[background-color,padding,border-color,box-shadow] duration-300 border-b",
        shouldBeSolid
          ? "bg-white py-3 shadow-sm border-border"
          : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="AproMax Engineering"
            width={120}
            height={32}
            style={{ width: "auto", height: "auto" }}
            className={cn(
              "h-8 w-auto transition-transform group-hover:scale-[1.02]",
              !shouldBeSolid && "brightness-0 invert"
            )}
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.hasMegaMenu && setMegaOpen(true)}
              onMouseLeave={() => link.hasMegaMenu && setMegaOpen(false)}
            >
              {link.hasMegaMenu ? (
                <button
                  onClick={() => setMegaOpen(!megaOpen)}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-pointer",
                    shouldBeSolid
                      ? "text-foreground/80 hover:text-primary"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.name}
                  <ChevronDown className={cn("size-3.5 transition-transform duration-200", megaOpen && "rotate-180")} />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors py-2",
                    shouldBeSolid
                      ? "text-foreground/80 hover:text-primary"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              )}

              {/* Services Mega Menu */}
              {link.hasMegaMenu && megaOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[720px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-lg border border-border shadow-lg p-5 grid grid-cols-3 gap-5">
                    {servicePillars.map((pillar) => (
                      <Link
                        key={pillar.name}
                        href={pillar.href}
                        className="group/item p-2.5 rounded-md hover:bg-muted/70 transition-colors border border-transparent hover:border-border"
                        onClick={() => setMegaOpen(false)}
                      >
                        <span className="block text-[13px] font-bold text-foreground group-hover/item:text-primary transition-colors">
                          {pillar.name}
                        </span>
                        <ul className="mt-2 space-y-1">
                          {pillar.bullets.map((bullet) => (
                            <li 
                              key={bullet}
                              className="text-[10.5px] font-bold text-slate-700 flex items-center gap-1.5 group-hover/item:text-slate-900 transition-colors"
                            >
                              <span className="size-1 rounded-full bg-primary shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </Link>
                    ))}
                    <div className="col-span-3 border-t border-border pt-3 mt-1 flex justify-end">
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
                        onClick={() => setMegaOpen(false)}
                      >
                        All Services Overview <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link href="/contact">
            <Button
              className="bg-primary hover:bg-primary/95 text-white font-semibold text-xs px-5 py-2.5 rounded-md transition-all shadow-sm hover:shadow"
            >
              Get a Free Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden p-1 cursor-pointer transition-colors",
            shouldBeSolid
              ? "text-foreground hover:text-primary"
              : "text-white hover:text-white/80"
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] z-40 bg-white border-t border-border animate-in slide-in-from-right duration-300">
          <div className="flex flex-col h-full p-6 justify-between bg-background">
            <nav className="flex flex-col gap-6">
              <div className="border-b border-border pb-3">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Capabilities</span>
                <div className="grid grid-cols-1 gap-3.5 mt-3 pl-2">
                  {servicePillars.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className="text-sm font-semibold text-foreground hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5 pl-2 mt-2">
                <Link
                  href="/industries"
                  className="text-base font-semibold text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Industries
                </Link>
                <Link
                  href="/case-studies"
                  className="text-base font-semibold text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Case Studies
                </Link>
                <Link
                  href="/about"
                  className="text-base font-semibold text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="text-base font-semibold text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Insights
                </Link>
              </div>
            </nav>
            <div className="border-t border-border pt-6 pb-12 flex flex-col gap-4">
              <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full">
                <Button className="w-full bg-primary text-white font-semibold rounded-md py-5">
                  Get a Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
