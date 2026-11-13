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
    title: "Atendé desde Axtroos",
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
          title={<>Poné en marcha Axtroos <span className="gradient-text">en pocos pasos</span></>}
          subtitle="Una sola experiencia para conectar canales, atender clientes y coordinar a tu equipo."
          className="mb-16"
        />
        <div className="relative">
          <div className="how-it-works-rail absolute left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] top-9 hidden h-px lg:block" aria-hidden="true" />
          <Stagger className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, index) => (
              <StaggerItem key={step.title} className="relative flex flex-col items-center text-center">
                <div className="how-it-works-emblem relative z-10 mb-6 flex h-[4.65rem] w-[4.65rem] items-center justify-center rounded-[1.45rem] text-white">
                  <span className="absolute inset-[3px] rounded-[1.2rem] bg-[#16103e]" />
                  <step.icon className="h-6 w-6" strokeWidth={1.75} />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#ff6e43]/50 bg-white text-xs font-black text-[#c61261] shadow-[0_4px_14px_rgba(198,18,97,.22)]">0{index + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-extrabold tracking-tight text-[#071642]">{step.title}</h3>
                <p className="mb-4 max-w-sm text-sm leading-relaxed text-slate-500">{step.description}</p>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#071642]/10 bg-white px-3.5 py-1.5 shadow-[0_8px_24px_rgba(26,17,70,.06)]">
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
