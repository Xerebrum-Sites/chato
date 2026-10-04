import { Check, LayoutDashboard, PlugZap, Users } from "lucide-react";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Stagger, StaggerItem } from "@/components/atoms/Reveal";

const steps = [
  {
    icon: PlugZap,
    title: "Conectá tus canales",
    description: "Vinculá WhatsApp, Instagram, Facebook, Telegram y tu web. Sin desarrollos a medida.",
    detail: "Configuración guiada",
  },
  {
    icon: LayoutDashboard,
    title: "Atendé desde Cható",
    description: "Cada conversación llega a una bandeja ordenada, con contexto, historial y estado.",
    detail: "Una única fuente de verdad",
  },
  {
    icon: Users,
    title: "Coordiná personas e IA",
    description: "Asigná conversaciones, automatizá respuestas y tomá el control cuando haga falta.",
    detail: "Handoff sin perder contexto",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Así funciona"
          title={<>Poné en marcha Cható <span className="gradient-text">en pocos pasos</span></>}
          subtitle="Una sola experiencia para conectar canales, atender clientes y coordinar a tu equipo."
          className="mb-16"
        />
        <div className="relative">
          <div className="absolute left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] top-8 hidden h-0.5 bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-300 lg:block" />
          <Stagger className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, index) => (
              <StaggerItem key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 text-white shadow-lg shadow-violet-200">
                  <step.icon className="h-6 w-6" strokeWidth={1.75} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-violet-200 bg-white text-xs font-black text-violet-700">{index + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">{step.description}</p>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} />
                  <span className="text-xs text-gray-600">{step.detail}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
