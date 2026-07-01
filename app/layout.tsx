import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { cn } from "@/lib/utils";
import { defaultMetadata } from "@/lib/seo";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import FloatingWhatsApp from "@/components/marketing/whatsapp-button";

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
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
