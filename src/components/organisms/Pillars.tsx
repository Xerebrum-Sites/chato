import Link from "next/link";
import { MessagesSquare, Bot, Blocks, ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Stagger, StaggerItem } from "@/components/atoms/Reveal";

const pillars = [
  {
    icon: MessagesSquare,
    title: "Hub omnicanal",
    description:
      "Centralizá WhatsApp, Instagram, Facebook y tu web en una sola bandeja. Respondé a todos desde un mismo lugar.",
    href: "/modo-simple/",
    cta: "Ver el Hub",
  },
  {
    icon: Bot,
    title: "Agentes IA",
    description:
      "Un asistente responde por vos 24/7 con la información de tu negocio y escala a una persona cuando hace falta.",
    href: "/agentes-ia/",
    cta: "Conocer los agentes IA",
  },
  {
    icon: Blocks,
    title: "Herramientas modulares",
    description:
      "Reservas, catálogo, pipeline de ventas, campañas y más. Activás solo las que tu negocio necesita.",
    href: "/herramientas/",
    cta: "Ver herramientas",
  },
];

/**
 * Tres pilares del producto en la home. Equilibra la comunicación: Cható no es
 * solo el Hub, también son los Agentes IA y las herramientas modulares.
 */
export function Pillars() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Todo lo que Cható hace por vos"
          title={
            <>
              Mucho más que <span className="gradient-text">centralizar mensajes</span>
            </>
          }
          subtitle="Cható combina tres piezas que trabajan juntas —y activás solo lo que necesitás."
          className="mb-14"
        />

        <Stagger className="grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-50"
              >
                <IconBadge icon={p.icon} size="lg" className="mb-5" />
                <h3 className="text-xl font-black text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{p.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 group-hover:gap-2.5 transition-all">
                  {p.cta}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
