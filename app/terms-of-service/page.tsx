import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";

export default function TermsOfServicePage() {
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
              Legal Agreement
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-[#070b19] tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Terms content */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm md:text-base leading-relaxed space-y-8">
            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing our website or engaging with the services of AproMax Engineering LLP ("we," "our," or "us"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree to these terms, you are prohibited from using this website or engaging our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                2. Scope of Services & Managed Model
              </h2>
              <p>
                AproMax Engineering LLP operates as a **Managed Engineering Services Partner & Specialist Orchestrator**. 
              </p>
              <p className="mt-2">
                Our scope of services includes:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Project scoping, cost estimation, and technical parameter verification.</li>
                <li>Coordination and matching of project deliverables with certified engineers, designers, analysts, and fabricators.</li>
                <li>Rigorous engineering checkpoints and quality assurance (QA) validations before shipping final design packages or components.</li>
              </ul>
              <p className="mt-2 font-semibold text-slate-800">
                Outsourced Delivery Acknowledgment:
              </p>
              <p>
                Client explicitly acknowledges that AproMax coordinates and delegates technical execution to vetted third-party vendors and subcontractor facilities within our global network. AproMax acts as the centralized project manager and quality auditor, ensuring compliance with specified guidelines and NDAs.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                3. Intellectual Property (IP) Rights
              </h2>
              <p>
                Unless otherwise agreed in a separate written agreement (such as a Master Services Agreement or specific Statement of Work):
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Client Background IP:</strong> All technical drawings, specifications, components, patents, and CAD data provided by the Client to AproMax for scoping remain the exclusive property of the Client.</li>
                <li><strong>Deliverable IP:</strong> Upon receipt of full payment, all custom design files, calculations, software, and mechanical layouts generated for the Client will be transferred to the Client.</li>
                <li><strong>Subcontractor Terms:</strong> AproMax secures appropriate IP assignments from all network vendors, ensuring all rights transfer cleanly to the Client upon project completion and payment settlement.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                4. Client Responsibilities & Data Inputs
              </h2>
              <p>
                The Client is responsible for providing accurate technical requirements, tolerances, material requirements, and operational conditions. AproMax and its network of coordinators rely on Client-furnished parameters to guide design and simulation sweeps. We are not liable for design failures or physical errors resulting from faulty, incomplete, or inaccurate specifications supplied by the Client.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                5. Non-Disclosure & Confidentiality
              </h2>
              <p>
                We handle all technical assets and client details under strict NDA guidelines. Scoping requirements shared with network vendors are sanitized of corporate branding wherever possible. The Client agrees to treat any pricing schedules, vendor details, and proprietary workflows shared by AproMax as strictly confidential.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                6. Limitation of Liability
              </h2>
              <p>
                In no event shall AproMax Engineering LLP, its members, coordinators, or network partners be liable for any consequential, incidental, indirect, or punitive damages (including loss of profits, downtime, or production delays) arising from the use of our services or deliverables, even if advised of the possibility of such damages. Our aggregate liability under any agreement shall not exceed the fees paid by the Client to AproMax for the specific service module in question.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#070b19] mb-4">
                7. Dispute Resolution & Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AproMax Engineering LLP is registered, without giving effect to conflict of laws principles. Any legal action or proceeding arising under these terms shall be brought exclusively in courts located within our primary place of registration.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
