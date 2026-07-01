"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return null;
  }

  return (
    <a
      href="https://wa.me/919577291349?text=Hello%20AproMax%2C%20I%20have%20a%20project%20inquiry%20and%20would%20like%20to%20discuss%20it%20with%20a%20coordinator."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-[#25d366] hover:bg-[#20ba5a] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110 group cursor-pointer"
      aria-label="Contact via WhatsApp"
    >
      <Image
        src="/social-icons/whatsapp.webp"
        alt="WhatsApp"
        width={32}
        height={32}
        className="size-8 object-contain transition-transform group-hover:rotate-[10deg]"
      />
    </a>
  );
}
