import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { IndustriesShowcase } from "@/components/organisms/IndustriesShowcase";
import { CtaSection } from "@/components/organisms/CtaSection";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Casos de uso — Cható para tu industria",
  description:
    "Moda, gastronomía, salud, servicios, belleza, educación, ecommerce, inmobiliaria y turismo: descubrí cómo Cható ordena la atención al cliente en tu rubro.",
  alternates: { canonical: "/casos-de-uso/" },
};

export default function CasosDeUsoPage() {
  return (
    <>
      <PageHero
        badge="Casos de uso"
        badgeVariant="green"
        title={
          <>
            Pensado para <span className="gradient-text">tu industria</span>
          </>
        }
        subtitle="No importa el rubro: si tenés clientes que te escriben por más de un canal, Cható ordena tu atención. Mirá cómo se aplica en distintos negocios."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Hablar con nosotros", href: "/contacto/" }}
        imageLabel="Distintos comercios y profesionales atendiendo a sus clientes"
      />
      <IndustriesShowcase />
      <CtaSection />
    </>
  );
}
