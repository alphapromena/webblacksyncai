import { Navbar } from "@/components/navbar";
import { PricingSection } from "@/components/pricing-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { Footer } from "@/components/footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-pricing">
      <Navbar />
      <div className="pt-16" />
      <PricingSection />
      <FinalCtaSection />
      <Footer />
    </div>
  );
}
