import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { Features } from "@/components/organisms/Features";
import { CorporateWorkstation } from "@/components/organisms/CorporateWorkstation";
import { CtaSection } from "@/components/organisms/CtaSection";
import { FeaturesHeroVisual } from "@/components/organisms/ConceptVisuals";
import { URLS } from "@/lib/config";
import { TrialCopy } from "@/components/atoms/TrialCopy";

export const metadata: Metadata = {
  title: "Características — Todo lo que incluye Axtroos",
  description:
    "Bandeja unificada, respuestas rápidas, etiquetas, analytics, múltiples agentes y alertas. Descubrí todo lo que Axtroos hace por tu atención al cliente.",
  alternates: { canonical: "/caracteristicas/" },
};

export default function CaracteristicasPage() {
  return (
    <>
      <PageHero
        badge="Características"
        title={
          <>
            Todo lo que incluye <span className="gradient-text">Axtroos</span>
          </>
        }
        subtitle="Las herramientas que tu negocio necesita para atender mejor, sin funciones de más ni curvas de aprendizaje."
        primaryCta={{ label: <TrialCopy />, href: URLS.signIn }}
        secondaryCta={{ label: "Ver precios", href: "/precios/" }}
        visual={<FeaturesHeroVisual />}
      />
      <Features />
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><CorporateWorkstation /></div>
      <CtaSection />
    </>
  );
}
