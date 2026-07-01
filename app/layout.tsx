import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { cn } from "@/lib/utils";
import { defaultMetadata } from "@/lib/seo";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", sora.variable, inter.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        <SmoothScrollProvider>
          {children}
          {/* Floating WhatsApp Action Button */}
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
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
