import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";

const serviceDetails: Record<string, {
  name: string;
  tagline: string;
  intro: string;
  image: string;
  capabilities: { title: string; desc: string }[];
  tools: string[];
  workflow: { step: string; title: string; desc: string }[];
}> = {
  engineering: {
    name: "Engineering Services",
    tagline: "Managed coordination of mechanical, electrical, and control systems",
    intro: "We act as your technical coordinator, matching parameters to vetted global specialists to deliver cohesive civil designs, mechanical blueprints, electrical schematics, and electronics piping systems.",
    image: "/images/service_engineering.webp",
    capabilities: [
      { title: "Mechanical Engineering", desc: "Coordinating chassis design, component stress, heat exchange, tolerances, and HVAC layouts." },
      { title: "Electrical Engineering", desc: "Schematics modeling, high/low voltage load calculation, and wiring routing." },
      { title: "Civil Engineering", desc: "Scoping structural foundations, site development plans, and drainage configurations." },
      { title: "Electronics Engineering", desc: "PCB layout designs, circuit components, and signal integrations." },
      { title: "Control Systems", desc: "Configuring feedback loops, automation logic, and sensor interfaces." },
      { title: "Plant Engineering", desc: "Drafting complete industrial plant models, piping routes, and valve access systems." }
    ],
    tools: ["AutoCAD", "SolidWorks", "MATLAB", "LabVIEW", "Revit"],
    workflow: [
      { step: "01", title: "Parameter Scoping", desc: "We document dimensional envelopes, load limits, and performance specs." },
      { step: "02", title: "Specialist Matching", desc: "Vetted mechanical and electrical coordinators are assigned to draft initial schematics." },
      { step: "03", title: "Quality Verification", desc: "Our team verifies all outputs against ISO standards before delivery." }
    ]
  },
  design: {
    name: "Design & 3D Modeling",
    tagline: "High-fidelity CAD layouts, product shells, and assembly blueprints",
    intro: "We bridge the gap between concept and production, drafting manufacturing-ready component blueprints and structural assembly models with absolute geometric precision.",
    image: "/images/service_design.webp",
    capabilities: [
      { title: "CAD Design", desc: "Drafting 2D engineering blueprints, tolerance profiles, and fabrication details." },
      { title: "3D Modeling", desc: "Building SolidWorks/CATIA digital twins, assembly constraints, and hardware casings." },
      { title: "Product Design", desc: "Formulating physical shell casings, weight distribution, and component nesting." },
      { title: "Industrial Design", desc: "Developing product styling, material selections, and aesthetic lines." },
      { title: "UX/UI Design", desc: "Styling custom device layouts, user dashboards, and touchpoint interfaces." }
    ],
    tools: ["SolidWorks", "CATIA", "Autodesk Inventor", "Figma", "Rhino 3D"],
    workflow: [
      { step: "01", title: "Industrial Styling", desc: "Evaluating user aesthetics, shell constraints, and weight envelopes." },
      { step: "02", title: "Detailed CAD Twin", desc: "Modeling 3D components, drafting tolerance specifications, and assembly constraints." },
      { step: "03", title: "Fabrication Handover", desc: "Exporting standard STEP/DXF drawing sheets to fabrication centers." }
    ]
  },
  "web-app": {
    name: "Web And App Development",
    tagline: "Enterprise platforms, custom portals, and secure mobile apps",
    intro: "Delivering responsive web structures, database dashboards, and native mobile apps designed to handle robust business operations with clean code architecture.",
    image: "/images/service_web.webp",
    capabilities: [
      { title: "Website Design", desc: "Creating responsive interface mockups, interactive state models, and branding layouts." },
      { title: "Website Development", desc: "Implementing fast web architectures, databases, and Server Action logic paths." },
      { title: "Responsive Design", desc: "Ensuring visual elements scale perfectly across desktop, tablet, and mobile views." },
      { title: "Mobile Apps", desc: "Cross-platform React Native app builds with local hardware sync features." },
      { title: "Custom Apps", desc: "Secure multi-tenant customer dashboards, billing structures, and API gateways." }
    ],
    tools: ["Next.js / React", "TypeScript", "Node.js", "PostgreSQL", "React Native"],
    workflow: [
      { step: "01", title: "UI Mockups", desc: "Designing responsive layout workflows and interactive state models." },
      { step: "02", title: "API Integrations", desc: "Building serverless logic, database schemas, and external API pipelines." },
      { step: "03", title: "CI/CD Deployment", desc: "Deploying updates to cloud services with auto-scaling infrastructure." }
    ]
  },
  analysis: {
    name: "Analysis & Simulation",
    tagline: "High-fidelity structural FEA and fluid thermodynamics CFD solvers",
    intro: "We evaluate structural models under extreme environment loads, simulating flow parameters, thermal bottlenecks, and fatigue margins before hardware fabrication begins.",
    image: "/images/case_thermal.webp",
    capabilities: [
      { title: "Structural Analysis", desc: "Simulating structural loads, bending moments, material fatigue, and safety coefficients." },
      { title: "Thermal Analysis", desc: "Modeling convective and radiative thermal paths inside compact electrical shells." },
      { title: "FEA Solver", desc: "Deploying high-fidelity finite element solvers to isolate stress points and material limits." },
      { title: "CFD Simulation", desc: "Analyzing fluid stress, piping pressure drops, heat sink dissipation, and drag values." }
    ],
    tools: ["ANSYS Fluent", "Abaqus", "SolidWorks Simulation", "Nastran"],
    workflow: [
      { step: "01", title: "Geometry Cleanup", desc: "Preparing CAD models, isolating mesh boundaries, and defining shell solids." },
      { step: "02", title: "Solver Run", desc: "Setting load directions, thermal boundaries, and run convergence parameters." },
      { step: "03", title: "Verification Report", desc: "Summarizing safety factors, flow profiles, and engineering recommendations." }
    ]
  },
  prototyping: {
    name: "Development & Testing",
    tagline: "Hardware verification, physical load tests, and custom controls software",
    intro: "Bridging simulation and physical reality, coordinating prototype assembly tests, data collection, and integration software setup.",
    image: "/images/about_engineers.webp",
    capabilities: [
      { title: "Prototype Dev", desc: "Testing physical assembly clearances, component fittings, and hardware iterations." },
      { title: "Product Testing", desc: "Deploying sensor pipelines (strain gauges, thermal couplers) to verify simulated margins." },
      { title: "Custom Software", desc: "Scripting custom instrumentation handlers and data collection pipelines." },
      { title: "Python / C++", desc: "Integrating low-level C++ controllers and Python scripting automation tools." }
    ],
    tools: ["Python", "C++ / C", "NI LabVIEW", "Arduino / Raspberry Pi", "MATLAB"],
    workflow: [
      { step: "01", title: "Clearance Review", desc: "Reviewing physical assembly fittings and noting tolerance collisions." },
      { step: "02", title: "Sensor Logging", desc: "Running test load profiles and compiling logs from data loggers." },
      { step: "03", title: "Iteration Drafting", desc: "Refining CAD models and software logic based on test results." }
    ]
  },
  specialized: {
    name: "Specialized Services",
    tagline: "Reverse engineering, failure forensics, and patent-ready IP blueprints",
    intro: "Supporting special client requirements including legacy rebuilds, forensic engineering reviews, and value optimization audits.",
    image: "/images/case_plant.webp",
    capabilities: [
      { title: "Reverse Engineering", desc: "Converting physical component scans into structured, editable CAD geometry." },
      { title: "Value Engineering", desc: "Evaluating material configurations to reduce weight and fabrication costs." },
      { title: "Failure Analysis", desc: "Investigating mechanical stress failures to trace weak geometries or material issues." },
      { title: "IP Development", desc: "Creating patent-ready technical illustrations and intellectual property layouts." }
    ],
    tools: ["Laser Scanning CAD", "ANSYS Solvers", "Value Audit Frameworks", "Patent Spec Drafts"],
    workflow: [
      { step: "01", title: "Capture Data", desc: "Scanning physical parts or inspecting mechanical failure points." },
      { step: "02", title: "Parametric Reconstruction", desc: "Building feature-based CAD trees matching scanned shapes." },
      { step: "03", title: "Optimization Review", desc: "Proposing material or geometric updates to prevent future failures." }
    ]
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDetails[slug];
  if (!service) return {};
  return {
    title: `${service.name} | AproMax Engineering`,
    description: service.intro
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDetails[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdff]">
      <Header />
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />

      <main className="flex-grow py-8 md:py-12 text-[#070b19] relative overflow-hidden">
        {/* Subtle blur background effects */}
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-blue-100/30 blur-[130px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-cyan-100/20 blur-[130px] pointer-events-none transform-gpu" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="font-medium text-slate-900 truncate">
              {service.name}
            </span>
          </div>

          {/* Hero Header */}
          <div className="max-w-3xl mb-8 md:mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              Core Pillars
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-[#070b19] tracking-tight mb-3">
              {service.name}
            </h1>
            <p className="text-[#070b19]/80 text-base md:text-lg font-medium mb-3 leading-relaxed">
              {service.tagline}
            </p>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              {service.intro}
            </p>
          </div>

          {/* Split Detail Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch mb-10 md:mb-14">
            
            {/* Left: Vetted Real Image Card */}
            <div className="w-full lg:w-1/2 flex">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 aspect-[16/10] shadow-sm bg-slate-50 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right: Key Capabilities (2-Column Grid to avoid vertical whitespace) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between py-1">
              <div>
                <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-3">
                  Capabilities & Competencies
                </h2>
                <div className="h-0.5 w-12 bg-primary mb-5" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.capabilities.map((cap) => (
                  <div key={cap.title} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex gap-3 h-full items-start transition-all hover:border-primary/20">
                    <div className="size-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <CheckCircle2 className="size-3.5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xs text-[#070b19] mb-1">
                        {cap.title}
                      </h3>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Workflow & Tools Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-slate-100 pt-10 md:pt-12 mb-10 md:mb-12">
            
            {/* Left Col (8 spans): Workflow / Methodology */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-1">
                  Our Process & Delivery Workflow
                </h3>
                <p className="text-muted-foreground text-xs">
                  How we scope, align, and verify technical outcomes stage-by-stage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {service.workflow.map((wf) => (
                  <div key={wf.step} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-bold text-primary font-heading mb-3 block">
                      {wf.step}
                    </span>
                    <div>
                      <h4 className="font-heading font-semibold text-xs text-[#070b19] mb-1">
                        {wf.title}
                      </h4>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        {wf.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col (4 spans): Tech Stack & Tooling */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 md:p-6 shadow-sm flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <h3 className="font-heading font-semibold text-[#070b19] text-sm mb-1.5">
                  Software Stack & Standards
                </h3>
                <p className="text-muted-foreground text-[11px] leading-relaxed mb-4">
                  Typical tools used by our specialists to generate layouts, models, and solvers:
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {service.tools.map((tool) => (
                  <span 
                    key={tool}
                    className="text-[10px] font-semibold text-[#070b19] bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* CTA Banner */}
          <div className="bg-slate-950 rounded-3xl p-8 md:p-10 text-center text-white relative overflow-hidden shadow-lg border border-white/5">
            {/* Background design glow */}
            <div className="absolute top-[-50%] left-[-20%] w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none transform-gpu" />
            <div className="absolute bottom-[-50%] right-[-20%] w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none transform-gpu" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3 text-white">
                Scope Your {service.name} Project
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 max-w-lg">
                Partner with AproMax to draft a comprehensive design checklist, assign coordinators, and engage vetted engineering specialists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full h-10 bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg px-6 flex items-center justify-center gap-2 group cursor-pointer border-0 text-xs">
                    Request Scoping Call
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/book" className="w-full sm:w-auto">
                  <Button className="w-full h-10 border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 font-semibold rounded-lg px-6 transition-all cursor-pointer text-xs">
                    direct Calendar Book
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
