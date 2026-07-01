import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 1, 2026";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-[76px]" />

      <main className="flex-grow bg-[#fcfdff] py-16 lg:py-24">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Header section */}
          <div className="border-b border-slate-200 pb-8 mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">
              Legal Information
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-[#070b19] tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Policy content */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm md:text-base leading-relaxed space-y-8">
            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to AproMax Engineering LLP ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit project inquiries, or engage with our managed engineering services.
              </p>
              <p>
                As a managed engineering services partner and specialist orchestrator, we coordinate complex engineering, design, and development projects through a vetted network of global specialist vendors. We act as an intermediary manager, applying rigorous quality control and technical oversight. This policy applies to information collected directly by us, as well as project details shared for scheduling and matching.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                2. Data We Collect
              </h2>
              <p>
                We collect personal and professional data to facilitate service scoping, vendor matching, and quality control. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Identity Information:</strong> Name, professional title, company name.</li>
                <li><strong>Contact Information:</strong> Email address, phone number, physical corporate address.</li>
                <li><strong>Project Assets:</strong> Blueprints, CAD files, technical requirements, tolerances, and design constraints that you upload or share with us for scoping.</li>
                <li><strong>Usage Details:</strong> IP address, device type, browser settings, and page interaction data collected via cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                3. How We Use Your Data
              </h2>
              <p>
                We use the information we collect for business operations, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Evaluating project requirements and formulating cost estimates.</li>
                <li>Matching projects with specialized coordinator engineers and vetted manufacturing/design vendors in our network.</li>
                <li>Ensuring strict quality assurance (QA) checkpoints are met before delivery.</li>
                <li>Communicating updates, managing accounts, and responding to inquiries.</li>
                <li>Fulfilling legal obligations and enforcing non-disclosure agreements (NDAs).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                4. Data Sharing & Vendor Coordination
              </h2>
              <p>
                Because we utilize an outsourced network model, we must share scoped project criteria and technical requirements with vetted third-party vendors to execute your order. 
              </p>
              <p className="mt-2 font-medium text-slate-800">
                How we protect your intellectual property:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Strict NDA Isolation:</strong> All engineering partners, manufacturing vendors, and analysts in our network are bound by legally enforceable Non-Disclosure Agreements (NDAs).</li>
                <li><strong>Anonymized Scoping:</strong> Whenever possible, we sanitize project files to remove identifying client branding before distributing them for vendor bids.</li>
                <li><strong>No Public Sharing:</strong> We do not sell or lease your technical files or personal information to third parties.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                5. Data Security
              </h2>
              <p>
                We implement robust security controls to prevent your technical assets from being accidentally lost, used, accessed, or altered. Transmission of CAD models and documentation is protected via secure encryption, and access to client folder directories is restricted to authorized coordinators on a need-to-know basis.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                6. Your Rights
              </h2>
              <p>
                Depending on your jurisdiction, you have the right to request access to, correction of, or deletion of the personal data we hold. If you wish to update your contact details or withdraw your engineering files from our active scoping catalog, please contact us directly at <span className="font-medium text-primary">legal@apromax.com</span>.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                7. Policy Updates
              </h2>
              <p>
                We may revise this Privacy Policy periodically. Any modifications will be posted on this page with an updated "Last updated" timestamp. We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
