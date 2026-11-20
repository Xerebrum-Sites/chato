import type { Metadata } from "next";
import { Pricing } from "@/components/organisms/Pricing";
import { CtaSection } from "@/components/organisms/CtaSection";

export const metadata: Metadata = {
  title: "Precios — Axtroos Workstation con prueba gratis",
  description:
    "Axtroos Workstation reúne la bandeja omnicanal, canales y usuarios sin cargo adicional. Configurá créditos IA, almacenamiento y app móvil según tu operación. Prueba gratis, sin tarjeta de crédito.",
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
