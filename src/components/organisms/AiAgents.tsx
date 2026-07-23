import Link from "next/link";
import { Route, ArrowLeftRight } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Stagger, StaggerItem, Reveal } from "@/components/atoms/Reveal";
import { aiCapabilities, aiAgentRoles } from "@/lib/content";

/**
 * Explica los Agentes IA: primero el Agente IA base (bot + base de conocimiento,
 * desde el plan Pro) y luego el add-on "Múltiples agentes IA" con agentes
 * especializados, router de intenciones y handoff.
 */
export function AiAgents() {
  return (
    <>
      {/* Agente IA base */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Agente IA"
            title={
              <>
                Un asistente que <span className="gradient-text">atiende por vos</span>
              </>
            }
            subtitle="El Agente IA responde a tus clientes con la información real de tu negocio, en tu tono, y te pasa la conversación cuando hace falta. Disponible desde el plan Pro."
            className="mb-16"
          />

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aiCapabilities.map((c) => (
              <StaggerItem
                key={c.title}
                className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all duration-300"
              >
                <IconBadge icon={c.icon} size="md" className="mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Add-on: Múltiples agentes IA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Add-on · Múltiples agentes IA"
            badgeVariant="green"
            title={
              <>
                Un equipo de agentes IA, <span className="gradient-text">cada uno experto en lo suyo</span>
              </>
            }
            subtitle="En vez de un solo bot que hace de todo, sumás agentes especializados. Cada uno tiene su rol, su personalidad y su propia base de conocimiento."
            className="mb-16"
          />

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiAgentRoles.map((role) => (
              <StaggerItem
                key={role.name}
                className="h-full rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:border-violet-200 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconBadge icon={role.icon} size="sm" />
                  <h3 className="font-bold text-gray-900">{role.name}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{role.description}</p>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Router + handoff */}
          <Stagger className="grid md:grid-cols-2 gap-5 mt-6">
            {[
              {
                icon: Route,
                title: "Router de intenciones",
                text: "Según lo que escribe el cliente, la consulta llega al agente indicado automáticamente. Nadie tiene que elegir con quién hablar.",
              },
              {
                icon: ArrowLeftRight,
                title: "Handoff transparente",
                text: "Los agentes se pasan la conversación entre sí —y a una persona de tu equipo— sin que el cliente note el cambio ni repita lo que ya dijo.",
              },
            ].map((b) => (
              <StaggerItem
                key={b.title}
                className="flex items-start gap-4 rounded-2xl border border-violet-100 bg-white p-6"
              >
                <IconBadge icon={b.icon} size="md" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ¿Preferís atención humana? Sumá a tu equipo como agentes en el{" "}
              <Link href="/modo-avanzado/" className="font-semibold text-violet-700 hover:text-violet-800">
                Modo Avanzado
              </Link>
              . La IA y las personas trabajan sobre la misma bandeja.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
