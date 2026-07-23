import type { Metadata } from "next";
import { PageHero } from "@/components/organisms/PageHero";
import { AiAgents } from "@/components/organisms/AiAgents";
import { CtaSection } from "@/components/organisms/CtaSection";
import { URLS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Agentes IA — Un asistente que atiende por vos",
  description:
    "El Agente IA de Cható responde con la información de tu negocio, en tu tono, y escala a una persona cuando hace falta. Sumá agentes especializados: Recepcionista, Ventas, Soporte, Reservas y Cualificador.",
  alternates: { canonical: "/agentes-ia/" },
};

export default function AgentesIaPage() {
  return (
    <>
      <PageHero
        badge="Agentes IA"
        title={
          <>
            Un equipo de IA que <span className="gradient-text">atiende por vos</span>
          </>
        }
        subtitle="Respuestas al instante 24/7 con la información real de tu negocio. La IA resuelve lo repetitivo y te pasa la conversación cuando se necesita una persona."
        primaryCta={{ label: "Empezar gratis 14 días", href: URLS.signIn }}
        secondaryCta={{ label: "Ver herramientas", href: "/herramientas/" }}
        imageLabel="Comerciante viendo cómo la IA responde a sus clientes"
      />
      <AiAgents />
      <CtaSection
        title={<>Dejá que la IA se ocupe de lo repetitivo</>}
        subtitle="El Agente IA está disponible desde el plan Pro. Probalo 14 días gratis, sin tarjeta."
      />
    </>
  );
}
