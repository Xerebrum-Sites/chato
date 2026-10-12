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
        badge="Industrias"
        badgeVariant="green"
        title={
          <>
            Cada industria conversa <span className="gradient-text">a su manera</span>
          </>
        }
        subtitle="Moda, gastronomía, salud, servicios y cada rubro tienen recorridos distintos. Cható organiza los canales y adapta la operación a lo que realmente pasa en tu negocio."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Hablar con nosotros", href: "/contacto/" }}
        imageSrc="/images/brand/hero-industries-v1.webp"
        imageLabel="Ecosistema de industrias conectadas a una estación de trabajo de Cható: moda, gastronomía, salud, belleza, educación, ecommerce, inmobiliaria y turismo"
      />
      <IndustriesShowcase />
      <CtaSection />
    </>
  );
}
