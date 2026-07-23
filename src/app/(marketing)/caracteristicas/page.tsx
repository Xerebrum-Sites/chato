import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { Features } from "@/components/organisms/Features";
import { ModeComparison } from "@/components/organisms/ModeComparison";
import { CtaSection } from "@/components/organisms/CtaSection";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Características — Todo lo que incluye Cható",
  description:
    "Bandeja unificada, respuestas rápidas, etiquetas, analytics, múltiples agentes y alertas. Descubrí todo lo que Cható hace por tu atención al cliente.",
  alternates: { canonical: "/caracteristicas/" },
};

export default function CaracteristicasPage() {
  return (
    <>
      <PageHero
        badge="Características"
        title={
          <>
            Todo lo que incluye <span className="gradient-text">Cható</span>
          </>
        }
        subtitle="Las herramientas que tu negocio necesita para atender mejor, sin funciones de más ni curvas de aprendizaje."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Ver precios", href: "/precios/" }}
        imageLabel="Persona usando Cható para organizar sus conversaciones"
      />
      <Features />
      <ModeComparison />
      <CtaSection />
    </>
  );
}
