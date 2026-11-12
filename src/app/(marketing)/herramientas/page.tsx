import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { OptionalTools } from "@/components/organisms/OptionalTools";
import { MarketplaceValue } from "@/components/organisms/MarketplaceValue";
import { CtaSection } from "@/components/organisms/CtaSection";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Marketplace Actros — Módulos para expandir tu plataforma",
  description:
    "Activá reservas, catálogo, pipeline, campañas, encuestas, agentes especializados y los próximos módulos que se sumen a Actros.",
  alternates: { canonical: "/herramientas/" },
};

export default function HerramientasPage() {
  return (
    <>
      <PageHero
        badge="Marketplace Actros"
        badgeVariant="green"
        title={
          <>
            El núcleo que usás hoy. <span className="gradient-text">Las capacidades que sumás mañana.</span>
          </>
        }
        subtitle="Actros crece sin obligarte a cambiar de plataforma: sumá módulos cuando tu operación los necesite y mantené canales, clientes e historial siempre conectados."
        primaryCta={{ label: "Explorar módulos", href: "#modulos" }}
        secondaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        imageSrc="/images/brand/hero-marketplace-v1.webp"
        imageLabel="Marketplace modular de Actros con reservas, catálogo, pipeline, campañas, encuestas, agentes de IA y espacios para futuras capacidades"
      />
      <MarketplaceValue />
      <OptionalTools />
      <CtaSection />
    </>
  );
}
