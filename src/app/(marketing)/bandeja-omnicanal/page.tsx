import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { AdvancedModeShowcase } from "@/components/organisms/AdvancedModeShowcase";
import { HowItWorks } from "@/components/organisms/HowItWorks";
import { CtaSection } from "@/components/organisms/CtaSection";
import { OmnichannelHeroVisual } from "@/components/organisms/ConceptVisuals";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Bandeja omnicanal — Todos tus canales en Actros",
  description: "Centralizá WhatsApp, Instagram, Facebook, Telegram y tu web en una sola bandeja con IA, equipos y métricas.",
  alternates: { canonical: "/bandeja-omnicanal/" },
};

export default function BandejaOmnicanalPage() {
  return (
    <>
      <PageHero
        badge="Bandeja omnicanal"
        badgeVariant="violet"
        title={<>Una conversación continua, <span className="gradient-text">sin importar el canal</span></>}
        subtitle="Atendé todos tus canales desde Actros, con historial, asignaciones, automatizaciones y métricas en un mismo espacio de trabajo."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Ver precios", href: "/precios/" }}
        visual={<OmnichannelHeroVisual />}
      />
      <AdvancedModeShowcase />
      <HowItWorks />
      <CtaSection
        title={<>Ordená hoy todas tus conversaciones</>}
        subtitle="Probá Actros 14 días gratis, sin tarjeta ni permanencia."
      />
    </>
  );
}
