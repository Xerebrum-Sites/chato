import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { LogoStrip } from "@/components/organisms/LogoStrip";
import { ModeComparison } from "@/components/organisms/ModeComparison";
import { HowItWorks } from "@/components/organisms/HowItWorks";
import { TelegramSection } from "@/components/organisms/TelegramSection";
import { AdvancedModeShowcase } from "@/components/organisms/AdvancedModeShowcase";
import { Features } from "@/components/organisms/Features";
import { OptionalTools } from "@/components/organisms/OptionalTools";
import { UseCases } from "@/components/organisms/UseCases";
import { Pricing } from "@/components/organisms/Pricing";
import { CtaSection } from "@/components/organisms/CtaSection";
import Script from "next/script";
import { Footer } from "@/components/organisms/Footer";
import { URLS } from "@/lib/config";

const WIDGET_SRC = `${URLS.api}/api/chat/chato/widget.js`;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <ModeComparison />
        <HowItWorks />
        <TelegramSection />
        <AdvancedModeShowcase />
        <Features />
        <OptionalTools />
        <UseCases />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
      {/* The floating button + chat panel come from the public widget so
          chato.xerebrumgroup.com renders exactly the same UI a tenant gets
          on their own site - single source of truth for the look and the
          per-tenant config. */}
      <Script src={WIDGET_SRC} strategy="afterInteractive" />
    </>
  );
}
