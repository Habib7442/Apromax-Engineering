import Header from "@/components/marketing/header";
import Hero from "@/components/marketing/hero";
import TrustBar from "@/components/marketing/trust-bar";
import Stats from "@/components/marketing/stats";
import ServicesGrid from "@/components/marketing/services-grid";
import WhyChooseUs from "@/components/marketing/why-choose-us";
import FeaturedCases from "@/components/marketing/featured-cases";
import Process from "@/components/marketing/process";
import BookingSection from "@/components/marketing/booking-section";
import Testimonials from "@/components/marketing/testimonials";
import CTABand from "@/components/marketing/cta-band";
import Footer from "@/components/marketing/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <Header />

      {/* Main content body */}
      <main className="flex-grow">
        {/* Split screen landing Hero */}
        <Hero />

        {/* Grayscale tool sets bar */}
        <TrustBar />

        {/* Services grid displaying 6 pillars */}
        <ServicesGrid />

        {/* Technical stats container */}
        <Stats />

        {/* Core business value differentiators */}
        <WhyChooseUs />

        {/* Premium asymmetrical case study blocks */}
        <FeaturedCases />

        {/* 4-step pipeline layout */}
        <Process />

        {/* Dedicated Scoping Consultation Booking Section */}
        <BookingSection />

        {/* Customer testimonial quotes */}
        <Testimonials />

        {/* Action call floating section */}
        <CTABand />
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}
