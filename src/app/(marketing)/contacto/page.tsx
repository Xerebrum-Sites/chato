import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { ContactSection } from "@/components/organisms/ContactSection";
import { ContactHeroVisual } from "@/components/organisms/ConceptVisuals";
import { URLS } from "@/lib/config";
import { TrialCopy } from "@/components/atoms/TrialCopy";

export const metadata: Metadata = {
  title: "Contacto — Hablemos de tu negocio",
  description:
    "Envianos tu consulta desde el formulario, escribinos por WhatsApp o agendá una demo en vivo. Empezá a centralizar tus canales con Axtroos con una prueba gratis, sin tarjeta.",
  alternates: { canonical: "/contacto/" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        badge="Contacto"
        title={
          <>
            Hablemos de <span className="gradient-text">tu negocio</span>
          </>
        }
        subtitle="¿Querés contratar Axtroos o tenés dudas? Estamos para ayudarte. Elegí el canal que más te convenga y te respondemos enseguida."
        primaryCta={{ label: <TrialCopy />, href: URLS.signIn }}
        secondaryCta={{ label: "Enviar una consulta", href: "#consulta" }}
        visual={<ContactHeroVisual />}
      />
      <ContactSection />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="datos-proveedor">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-gray-700">
          <h2 id="datos-proveedor" className="mb-3 text-xl font-bold text-gray-900">Datos del proveedor en Argentina</h2>
          <p>Jose Alberto Guevara · CUIT 20-28407325-9</p>
          <p>Presidente Roca 187, piso 9, departamento B, CP 2000, Rosario, Santa Fe, Argentina</p>
        </div>
      </section>
    </>
  );
}
