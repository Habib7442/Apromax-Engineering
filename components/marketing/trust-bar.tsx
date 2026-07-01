"use client";

import * as React from "react";

// 1. SolidWorks Icon (3D Isometric Red Cube Block)
const SolidWorksIcon = () => (
  <svg className="size-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6.5v9L12 22l8-4.5v-9L12 2z" fill="url(#solidworks-grad-top)" />
    <path d="M12 22v-10L4 7.5v9l8 5.5z" fill="url(#solidworks-grad-left)" />
    <path d="M12 12l8-4.5v9l-8 5.5V12z" fill="url(#solidworks-grad-right)" />
    <defs>
      <linearGradient id="solidworks-grad-top" x1="4" y1="2" x2="20" y2="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ff4d4d" />
        <stop offset="100%" stopColor="#d11a1a" />
      </linearGradient>
      <linearGradient id="solidworks-grad-left" x1="4" y1="7.5" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#b31212" />
        <stop offset="100%" stopColor="#7a0606" />
      </linearGradient>
      <linearGradient id="solidworks-grad-right" x1="12" y1="12" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e62e2e" />
        <stop offset="100%" stopColor="#a30f0f" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Autodesk Icon (Geometric Origami Green/Cyan 'A')
const AutodeskIcon = () => (
  <svg className="size-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <path d="M3 19.5h4.5v-12L12 15l4.5-7.5v12H21v-15H16.5L12 12 7.5 4.5H3v15z" fill="url(#autodesk-grad)" />
    <defs>
      <linearGradient id="autodesk-grad" x1="3" y1="4.5" x2="21" y2="19.5" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="50%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. ANSYS Fluent Icon (Dynamic Orange/Cyan streamline flow swoosh)
const AnsysIcon = () => (
  <svg className="size-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <path d="M4 18c4-1 6-4 8-8s4-7 8-7v3c-3 0-5 3-7 7s-4 8-9 8v-3z" fill="url(#ansys-grad-1)" />
    <path d="M2 13c5 0 7-3 9-7s4-5 9-5v3c-4 0-6 2-8 6s-4 7-10 7v-3z" fill="url(#ansys-grad-2)" />
    <defs>
      <linearGradient id="ansys-grad-1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ff9900" />
        <stop offset="100%" stopColor="#ff5500" />
      </linearGradient>
      <linearGradient id="ansys-grad-2" x1="2" y1="1" x2="20" y2="15" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00ffff" />
        <stop offset="100%" stopColor="#0088cc" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. MATLAB Icon (Mathematical L-shaped membrane wave in bronze/orange)
const MatlabIcon = () => (
  <svg className="size-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <path d="M12 3c-4 0-7 2-9 5 1 2 3 3 6 3 2 0 4-1 6-3 2-2 4-3 7-3-3-2-6-2-10-2z" fill="url(#matlab-grad-1)" />
    <path d="M3 8c0 3 2 6 5 8 2-1 3-3 4-6-3 0-5-1-9-2z" fill="url(#matlab-grad-2)" />
    <path d="M8 16c3 2 6 3 10 3 1-2 2-5 3-8-3 0-5 1-7 3-2 2-4 3-6 2z" fill="url(#matlab-grad-3)" />
    <path d="M18 19c-3 0-5-1-7-3 1-3 2-5 4-6 3 0 5 1 9 2-2 3-4 6-6 7z" fill="url(#matlab-grad-4)" />
    <defs>
      <linearGradient id="matlab-grad-1" x1="3" y1="3" x2="21" y2="8" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#d27d2d" />
        <stop offset="100%" stopColor="#8b5a2b" />
      </linearGradient>
      <linearGradient id="matlab-grad-2" x1="3" y1="8" x2="12" y2="14" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#b86d29" />
        <stop offset="100%" stopColor="#5c3814" />
      </linearGradient>
      <linearGradient id="matlab-grad-3" x1="8" y1="14" x2="21" y2="19" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e59848" />
        <stop offset="100%" stopColor="#8f571b" />
      </linearGradient>
      <linearGradient id="matlab-grad-4" x1="11" y1="10" x2="21" y2="19" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f39c12" />
        <stop offset="100%" stopColor="#d35400" />
      </linearGradient>
    </defs>
  </svg>
);

// 5. Python & C++ Icon (Intertwined blue and yellow snakes)
const PythonCppIcon = () => (
  <svg className="size-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <path d="M11.75 2.25c-2.35 0-3.5.75-3.5 2.75v1.5h3.5v.5h-5C4.5 7 3.5 8.35 3.5 10.7c0 2.55 1.25 3.55 3.25 3.55H8.5v-1.5c0-2.05 1.45-3.5 3.5-3.5h3.5v-2c0-2.35-1.15-5-3.75-5z" fill="#306998" />
    <circle cx="10" cy="4.25" r="0.6" fill="#fff" />
    <path d="M12.25 21.75c2.35 0 3.5-.75 3.5-2.75v-1.5h-3.5v-.5h5c2.25 0 3.25-1.35 3.25-3.7 0-2.55-1.25-3.55-3.25-3.55H15.5v1.5c0 2.05-1.45 3.5-3.5 3.5h-3.5v2c0 2.35 1.15 5 3.75 5z" fill="#ffe873" />
    <circle cx="14" cy="19.75" r="0.6" fill="#fff" />
  </svg>
);

// 6. ISO 9001 Standards Icon (Gold Medal seal with checkmark)
const IsoIcon = () => (
  <svg className="size-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="11" r="7" fill="url(#iso-gold-bg)" stroke="#e5a93b" strokeWidth="1.5" />
    <path d="M9 11l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 17.5L7 22l3-1.5L13 22l-3-4.5z" fill="url(#iso-gold-ribbon-left)" />
    <path d="M14 17.5L17 22l-3-1.5L11 22l3-4.5z" fill="url(#iso-gold-ribbon-right)" />
    <defs>
      <linearGradient id="iso-gold-bg" x1="5" y1="4" x2="19" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f7d070" />
        <stop offset="50%" stopColor="#e5a93b" />
        <stop offset="100%" stopColor="#b57e1b" />
      </linearGradient>
      <linearGradient id="iso-gold-ribbon-left" x1="7" y1="17.5" x2="13" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e5a93b" />
        <stop offset="100%" stopColor="#96630f" />
      </linearGradient>
      <linearGradient id="iso-gold-ribbon-right" x1="11" y1="17.5" x2="17" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f7d070" />
        <stop offset="100%" stopColor="#b57e1b" />
      </linearGradient>
    </defs>
  </svg>
);

export default function TrustBar() {
  const tools = [
    { name: "SolidWorks", icon: SolidWorksIcon },
    { name: "Autodesk", icon: AutodeskIcon },
    { name: "ANSYS Fluent", icon: AnsysIcon },
    { name: "MATLAB", icon: MatlabIcon },
    { name: "Python / C++", icon: PythonCppIcon },
    { name: "ISO 9001 Standards", icon: IsoIcon },
  ];

  return (
    <section className="bg-white border-y border-border py-8">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            Engineering Capabilities Powered by Industry-Standard Toolsets
          </p>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="flex items-center gap-2.5 transition-all duration-300 group cursor-default"
                >
                  <div className="opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <Icon />
                  </div>
                  <span className="font-heading font-bold text-xs tracking-tight text-slate-500 group-hover:text-slate-800 transition-colors duration-300">
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
