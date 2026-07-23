import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { TelegramSection } from "@/components/organisms/TelegramSection";
import { HowItWorks } from "@/components/organisms/HowItWorks";
import { CtaSection } from "@/components/organisms/CtaSection";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Modo Simple — Todos tus canales en Telegram",
  description:
    "Centralizá WhatsApp, Instagram, Facebook y tu web dentro de Telegram. Recibí y respondé desde una sola app, sin aprender nada nuevo. Ideal para emprendedores.",
  alternates: { canonical: "/modo-simple/" },
};

export default function ModoSimplePage() {
  return (
    <>
      <PageHero
        badge="Modo Simple"
        badgeVariant="cyan"
        title={
          <>
            Todos tus canales, <span className="gradient-text">dentro de Telegram</span>
          </>
        }
        subtitle="Centralizá WhatsApp, Instagram, Facebook y tu web en la app que ya usás todos los días. Sin instalar nada nuevo ni aprender una interfaz distinta."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Ver precios", href: "/precios/" }}
        imageLabel="Emprendedor respondiendo mensajes desde Telegram en el celular"
      />
      <TelegramSection />
      <HowItWorks flow="simple" />
      <CtaSection
        title={
          <>
            Empezá con el Modo Simple hoy
          </>
        }
        subtitle="14 días gratis, sin tarjeta. Todo dentro del Telegram que ya usás."
      />
    </>
  );
}
