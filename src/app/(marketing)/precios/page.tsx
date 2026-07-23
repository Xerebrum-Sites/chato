import type { Metadata } from "next";
import { Pricing } from "@/components/organisms/Pricing";
import { CtaSection } from "@/components/organisms/CtaSection";

export const metadata: Metadata = {
  title: "Precios — Planes de Cható con 14 días gratis",
  description:
    "Planes Starter, Pro y Business. Todos incluyen el Modo Simple; el Modo Avanzado se desbloquea en Pro. 14 días gratis, sin tarjeta de crédito.",
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
