import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { OptionalTools } from "@/components/organisms/OptionalTools";
import { CtaSection } from "@/components/organisms/CtaSection";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Herramientas opcionales — Reservas, catálogo y más",
  description:
    "Sumá herramientas específicas a tu plan según tu necesidad: reservas, catálogo, encuestas y reseñas. Disponibles en cualquier plan, pagás solo por lo que usás.",
  alternates: { canonical: "/herramientas/" },
};

export default function HerramientasPage() {
  return (
    <>
      <PageHero
        badge="Herramientas opcionales"
        badgeVariant="green"
        title={
          <>
            Sumá funciones <span className="gradient-text">a medida que crecés</span>
          </>
        }
        subtitle="Activá herramientas específicas según lo que necesite tu negocio. Cualquier plan puede acceder a cualquier add-on y pagás solo por lo que usás."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Ver precios", href: "/precios/" }}
        imageLabel="Negocio usando reservas y catálogo dentro de Cható"
      />
      <OptionalTools />
      <CtaSection />
    </>
  );
}
