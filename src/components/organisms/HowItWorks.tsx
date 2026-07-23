"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { QrCode, Send, Reply, PlugZap, LayoutDashboard, Users, Check } from "lucide-react";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Stagger, StaggerItem } from "@/components/atoms/Reveal";

type FlowMode = "simple" | "advanced";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}

const flows: Record<FlowMode, Step[]> = {
  simple: [
    {
      icon: QrCode,
      title: "Conectá tus canales",
      description:
        "Vinculás WhatsApp Business, Facebook, Instagram y tu web escaneando un QR o pegando un token. Sin código.",
      detail: "Sin conocimientos técnicos",
    },
    {
      icon: Send,
      title: "Recibí en tu Telegram",
      description:
        "Cada mensaje de tus canales aparece en Telegram con contexto completo: quién escribe, de dónde viene y el historial.",
      detail: "En tu Telegram actual, sin apps nuevas",
    },
    {
      icon: Reply,
      title: "Respondé directo",
      description:
        "Escribís en Telegram y el mensaje llega al canal original del cliente: WhatsApp, Instagram o Facebook, en su app favorita.",
      detail: "Automático, sin conversiones",
    },
  ],
  advanced: [
    {
      icon: PlugZap,
      title: "Integrá tus canales",
      description:
        "Conectás WhatsApp, Facebook, Instagram, la web y tu CRM. Toda la información en un solo lugar, sincronizada en tiempo real.",
      detail: "Integraciones nativas por API",
    },
    {
      icon: LayoutDashboard,
      title: "Accedé a tu panel",
      description:
        "Panel con conversaciones, analytics, reportes por canal, tiempos de respuesta, métricas de equipo y automatizaciones.",
      detail: "Control total en una UI moderna",
    },
    {
      icon: Users,
      title: "Gestioná tu equipo",
      description:
        "Sumás agentes, asignás canales, monitoreás conversaciones y automatizás flujos con IA. Escalás sin perder control.",
      detail: "Equipos colaborativos y coordinados",
    },
  ],
};

interface HowItWorksProps {
  /** Si se define, muestra solo ese flujo sin selector (para páginas de modo). */
  flow?: FlowMode;
}

export function HowItWorks({ flow }: HowItWorksProps) {
  const [activeFlow, setActiveFlow] = useState<FlowMode>(flow ?? "simple");
  const showToggle = !flow;
  const steps = flows[activeFlow];
  const isSimple = activeFlow === "simple";

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Así de simple"
          badgeVariant="cyan"
          title={
            <>
              Ponés en marcha Cható <span className="gradient-text">en pocos pasos</span>
            </>
          }
          subtitle="Sin conocimientos técnicos, sin equipo de IT y sin contratos largos."
          className="mb-8"
        />

        {showToggle && (
          <div className="flex justify-center gap-3 mb-16">
            {(["simple", "advanced"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveFlow(mode)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFlow === mode
                    ? mode === "simple"
                      ? "bg-[#2AABEE] text-white shadow-lg"
                      : "bg-violet-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {mode === "simple" ? "Flujo Simple" : "Flujo Avanzado"}
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-violet-200 via-violet-400 to-cyan-400" />

          <Stagger className="grid lg:grid-cols-3 gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={i} className="relative flex flex-col items-center text-center">
                  <div className="relative mb-6 z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center shadow-lg ${
                        isSimple
                          ? "bg-gradient-to-br from-[#2AABEE] to-cyan-700 shadow-cyan-200"
                          : "bg-gradient-to-br from-violet-600 to-violet-800 shadow-violet-200"
                      }`}
                    >
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <div
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center ${
                        isSimple ? "border-[#2AABEE]" : "border-violet-200"
                      }`}
                    >
                      <span className={`text-xs font-black ${isSimple ? "text-[#2AABEE]" : "text-violet-700"}`}>
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.description}</p>
                  <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs text-gray-600">{step.detail}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
