import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { ContactSection } from "@/components/organisms/ContactSection";
import { CONTACT, URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contacto — Hablemos de tu negocio",
  description:
    "Escribinos por WhatsApp, mandanos un email o agendá una demo en vivo. Empezá a centralizar tus canales con Cható: 14 días gratis, sin tarjeta.",
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
        subtitle="¿Querés contratar Cható o tenés dudas? Estamos para ayudarte. Elegí el canal que más te convenga y te respondemos enseguida."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Escribinos por WhatsApp", href: CONTACT.whatsappUrl }}
        imageLabel="Equipo de Cható listo para ayudarte"
      />
      <ContactSection />
    </>
  );
}
