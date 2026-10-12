import { Boxes, Layers3, Rocket, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Stagger, StaggerItem } from "@/components/atoms/Reveal";

const stages = [
  {
    icon: Layers3,
    eyebrow: "01 · Base sólida",
    title: "Empezás con el núcleo",
    description: "Canales, conversaciones, equipo e historial comparten una misma base. No tenés que armar un sistema desde cero.",
  },
  {
    icon: Boxes,
    eyebrow: "02 · A tu medida",
    title: "Sumás módulos",
    description: "Activás las funciones que hacen avanzar tu operación sin llenar la plataforma de herramientas que todavía no necesitás.",
  },
  {
    icon: Rocket,
    eyebrow: "03 · Expansión continua",
    title: "Escalás sin migrar",
    description: "Cada nueva capacidad se integra al mismo contexto. El catálogo se amplía y Cható evoluciona junto con tu negocio.",
  },
];

export function MarketplaceValue() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Cómo crece la plataforma"
          badgeVariant="violet"
          title={
            <>
              Una base común. <span className="gradient-text">Más capacidades con el tiempo.</span>
            </>
          }
          subtitle="El Marketplace convierte a Cható en una plataforma extensible: cada módulo aprovecha los canales, los clientes y el historial que ya organizaste."
          className="mb-14"
        />

        <Stagger className="grid gap-6 lg:grid-cols-3">
          {stages.map(({ icon: Icon, eyebrow, title, description }) => (
            <StaggerItem key={title} className="h-full">
              <article className="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-[#fffaf5] p-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-fuchsia-100 blur-2xl" />
                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b1020] text-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">{eyebrow}</p>
                  <h2 className="mt-3 text-2xl font-black text-gray-900">{title}</h2>
                  <p className="mt-3 leading-relaxed text-gray-600">{description}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-5 text-sm text-violet-900 sm:items-center">
          <Sparkles className="mt-0.5 h-5 w-5 flex-none text-fuchsia-600 sm:mt-0" />
          <p>
            <strong>El Marketplace está vivo:</strong> abajo vas a encontrar los módulos disponibles hoy. A medida que la plataforma sume nuevas capacidades, van a aparecer en este mismo catálogo.
          </p>
        </div>
      </div>
    </section>
  );
}
