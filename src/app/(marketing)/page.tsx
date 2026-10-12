import Image from "next/image";
import { Check } from "lucide-react";
import { Hero } from "@/components/organisms/Hero";
import { TrustBand } from "@/components/organisms/TrustBand";
import { Pillars } from "@/components/organisms/Pillars";
import { HowItWorks } from "@/components/organisms/HowItWorks";
import { IndustriesTeaser } from "@/components/organisms/IndustriesShowcase";
import { CtaSection } from "@/components/organisms/CtaSection";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { URLS } from "@/lib/config";

/**
 * Home liviana: muestra "un poco de todo" con enlaces profundos a cada sección,
 * clara sobre cómo funciona el producto y dónde está el valor.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Pillars />
      <HowItWorks />
      <HumanValueBand />
      <IndustriesTeaser />
      <CtaSection />
    </>
  );
}

function HumanValueBand() {
  const points = [
    "Respondé a tiempo en cada canal, sin cambiar de app",
    "No pierdas ventas por mensajes que se traspapelan",
    "Sumá a tu equipo cuando lo necesites, ordenado",
  ];
  return (
    <section className="bg-[#fffaf5] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal direction="right">
          <div className="relative min-h-[24rem] p-2 sm:min-h-[32rem] sm:p-4">
            <Image
              src="/images/brand/team-desktop-v2.webp"
              alt="Equipo latino y europeo atendiendo clientes desde estaciones de trabajo de escritorio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-2 sm:p-3"
            />
          </div>
        </Reveal>
        <Reveal direction="left" delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5 leading-tight text-balance">
            Atendé a todos tus clientes <span className="gradient-text">como si tuvieras un equipo entero</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Cható reúne WhatsApp, Instagram, Facebook, Telegram y tu web en una única estación de trabajo.
            Cada agente opera desde desktop con el historial, las asignaciones y la ayuda de IA a la vista.
          </p>
          <ul className="space-y-3 mb-8">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-gray-700">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={URLS.signIn} size="lg">
              Empezar gratis 14 días
            </Button>
            <Button href="/contacto/" variant="outline" size="lg">
              Hablar con nosotros
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
