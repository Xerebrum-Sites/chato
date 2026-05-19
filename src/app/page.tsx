import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { LogoStrip } from "@/components/organisms/LogoStrip";
import { HowItWorks } from "@/components/organisms/HowItWorks";
import { TelegramSection } from "@/components/organisms/TelegramSection";
import { Features } from "@/components/organisms/Features";
import { UseCases } from "@/components/organisms/UseCases";
import { Pricing } from "@/components/organisms/Pricing";
import { CtaSection } from "@/components/organisms/CtaSection";
import { Footer } from "@/components/organisms/Footer";
import { FloatingWidget } from "@/components/organisms/FloatingWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <HowItWorks />
        <TelegramSection />
        <Features />
        <UseCases />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
      <FloatingWidget />
    </>
  );
}
