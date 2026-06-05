"use client";

import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";

type FlowMode = "simple" | "advanced";

const flows = {
  simple: [
    {
      number: "01",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: "Conecta tus canales",
      description:
        "Vincula WhatsApp Business, Facebook, Instagram y tu web en menos de 2 minutos. Solo escanea un QR o pega un token.",
      detail: "Sin código, sin complicaciones",
    },
    {
      number: "02",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      ),
      title: "Recibe en tu Telegram",
      description:
        "Cada mensaje de tus canales aparece en Telegram con contexto completo: quién escribe, de dónde viene, historial de conversación.",
      detail: "En tu Telegram actual, sin apps nuevas",
    },
    {
      number: "03",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Responde directamente",
      description:
        "Escribe en Telegram y el mensaje llega al canal original del cliente. WhatsApp, Instagram o Facebook: siempre en su app favorita.",
      detail: "Automático, sin conversiones",
    },
  ],
  advanced: [
    {
      number: "01",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: "Integra tus canales",
      description:
        "Conecta WhatsApp, Facebook, Instagram, web y tu CRM. Toda la información en un solo lugar, datos sincronizados en tiempo real.",
      detail: "Integraciones nativas con APIs",
    },
    {
      number: "02",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Accede a tu dashboard",
      description:
        "Dashboard con conversaciones, analytics, reportes por canal, tiempos de respuesta, métricas de equipo y automatizaciones avanzadas.",
      detail: "Control total en una UI moderna",
    },
    {
      number: "03",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Gestiona tu equipo",
      description:
        "Añade agentes, asigna canales, monitorea conversaciones, automatiza flujos con IA. Escala sin límites, sin perder control.",
      detail: "Equipos colaborativos y coordinados",
    },
  ],
};

export function HowItWorks() {
  const [activeFlow, setActiveFlow] = useState<FlowMode>("simple");
  const steps = flows[activeFlow];

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">
            Así de simple
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Configurado en{" "}
            <span className="gradient-text">menos de 5 minutos</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Sin conocimientos técnicos, sin IT, sin contratos largos.
          </p>

          {/* Mode Toggle */}
          <div className="flex justify-center gap-3 mt-8">
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
                {mode === "simple" ? "📱 Flujo Simple" : "🎛️ Flujo Avanzado"}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-violet-200 via-violet-400 to-cyan-400" />

          <div className="grid lg:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Step number bubble */}
                <div className="relative mb-6 z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center shadow-lg ${
                      activeFlow === "simple"
                        ? "bg-gradient-to-br from-[#2AABEE] to-cyan-700 shadow-cyan-200"
                        : "bg-gradient-to-br from-violet-600 to-violet-800 shadow-violet-200"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center ${
                      activeFlow === "simple"
                        ? "border-[#2AABEE]"
                        : "border-violet-200"
                    }`}
                  >
                    <span
                      className={`text-xs font-black ${
                        activeFlow === "simple"
                          ? "text-[#2AABEE]"
                          : "text-violet-700"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.description}</p>
                <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-gray-600">{step.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
