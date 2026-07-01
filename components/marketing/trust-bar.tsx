"use client";

import { Cpu, Layers, Settings, Shield, Award, HardDrive } from "lucide-react";

export default function TrustBar() {
  const tools = [
    { name: "SolidWorks", icon: Settings },
    { name: "Autodesk", icon: Layers },
    { name: "ANSYS Fluent", icon: Cpu },
    { name: "MATLAB", icon: HardDrive },
    { name: "Python / C++", icon: Shield },
    { name: "ISO 9001 Standards", icon: Award },
  ];

  return (
    <section className="bg-white border-y border-border py-8">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-center">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-6">
            Engineering Capabilities Powered by Industry-Standard Toolsets
          </p>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 text-foreground/40 hover:text-foreground/75 transition-colors group cursor-default"
                >
                  <Icon className="size-5 transition-transform duration-300 group-hover:-rotate-6" />
                  <span className="font-heading font-semibold text-xs tracking-tight">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
