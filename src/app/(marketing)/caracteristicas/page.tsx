import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { Features } from "@/components/organisms/Features";
import { CtaSection } from "@/components/organisms/CtaSection";
import { FeaturesHeroVisual } from "@/components/organisms/ConceptVisuals";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Características — Todo lo que incluye Actroos",
  description:
    "Bandeja unificada, respuestas rápidas, etiquetas, analytics, múltiples agentes y alertas. Descubrí todo lo que Actroos hace por tu atención al cliente.",
  alternates: { canonical: "/caracteristicas/" },
};

export default function CaracteristicasPage() {
  return (
    <>
      <PageHero
        badge="Características"
        title={
          <>
            Todo lo que incluye <span className="gradient-text">Actroos</span>
          </>
        }
        subtitle="Las herramientas que tu negocio necesita para atender mejor, sin funciones de más ni curvas de aprendizaje."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Ver precios", href: "/precios/" }}
        visual={<FeaturesHeroVisual />}
      />
      <Features />
      <CtaSection />
    </>
  );
}
