import type { Metadata } from "next";
import { Pricing } from "@/components/organisms/Pricing";
import { CtaSection } from "@/components/organisms/CtaSection";

export const metadata: Metadata = {
  title: "Precios — Plan base de Axtroos con prueba gratis",
  description:
    "Un solo plan base con bandeja omnicanal, canales y usuarios sin cargo adicional. Sumá módulos del Marketplace cuando los necesites. Prueba gratis, sin tarjeta de crédito.",
  alternates: { canonical: "/precios/" },
};

export default function PreciosPage() {
  return (
    <>
      <Pricing />
      <CtaSection />
    </>
  );
}
