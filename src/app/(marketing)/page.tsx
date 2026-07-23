import { Check } from "lucide-react";
import { Hero } from "@/components/organisms/Hero";
import { TrustBand } from "@/components/organisms/TrustBand";
import { ModesTeaser } from "@/components/organisms/ModesTeaser";
import { HowItWorks } from "@/components/organisms/HowItWorks";
import { IndustriesTeaser } from "@/components/organisms/IndustriesShowcase";
import { CtaSection } from "@/components/organisms/CtaSection";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
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
      <ModesTeaser />
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal direction="right">
          <ImagePlaceholder
            label="Comerciante atendiendo a sus clientes desde el celular"
            className="aspect-[4/3] w-full shadow-xl"
          />
        </Reveal>
        <Reveal direction="left" delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5 leading-tight text-balance">
            Atendé a todos tus clientes <span className="gradient-text">como si tuvieras un equipo entero</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Cható reúne WhatsApp, Instagram, Facebook y tu web en un solo lugar de trabajo. Vos te concentrás en
            vender y atender bien; nosotros ponemos orden en los mensajes.
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
