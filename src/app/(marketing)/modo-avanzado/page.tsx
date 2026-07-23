import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { AdvancedModeShowcase } from "@/components/organisms/AdvancedModeShowcase";
import { HowItWorks } from "@/components/organisms/HowItWorks";
import { CtaSection } from "@/components/organisms/CtaSection";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Modo Avanzado — Panel completo con analytics y equipos",
  description:
    "Un panel con analytics, gestión de equipos y automatizaciones con IA para escalar tu atención al cliente. Para equipos, agencias y negocios de alto volumen.",
  alternates: { canonical: "/modo-avanzado/" },
};

export default function ModoAvanzadoPage() {
  return (
    <>
      <PageHero
        badge="Modo Avanzado"
        badgeVariant="violet"
        title={
          <>
            Un panel completo para <span className="gradient-text">escalar tu atención</span>
          </>
        }
        subtitle="Bandeja interna, analytics, gestión de equipos y automatizaciones con IA. Todo el control que necesitás cuando tu volumen de mensajes crece."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Ver precios", href: "/precios/" }}
        imageLabel="Equipo de atención al cliente trabajando con el panel de Cható"
      />
      <AdvancedModeShowcase />
      <HowItWorks flow="advanced" />
      <CtaSection
        title={<>Llevá tu atención al siguiente nivel</>}
        subtitle="El Modo Avanzado se desbloquea desde el plan Pro. Probalo 14 días gratis, sin tarjeta."
      />
    </>
  );
}
