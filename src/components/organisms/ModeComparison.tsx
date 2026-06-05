"use client";

import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";

type Mode = "simple" | "advanced";

const modeData = {
  simple: {
    title: "Modo Simple",
    subtitle: "Centro de comandos en Telegram",
    description: "Centraliza todos tus canales en Telegram. Recibe mensajes, responde desde una sola app. Sin aprender UI nueva, sin complicaciones.",
    icon: "✈️",
    benefits: [
      "Bandeja unificada en tu Telegram actual",
      "Responde desde donde estés (móvil o desktop)",
      "Etiquetas y seguimientos básicos",
      "Respuestas rápidas personalizadas",
      "Notificaciones en tiempo real",
      "Perfecto para: Emprendedores, pequeños negocios, trabajo solo",
    ],
    usesFor: "Rápido, directo, sin overhead",
    gradient: "from-[#2AABEE] to-[#0d47a1]",
  },
  advanced: {
    title: "Modo Avanzado",
    subtitle: "Dashboard completo con control total",
    description: "Tu propia bandeja interna con dashboard, analytics, gestión de equipos y herramientas avanzadas. Escala sin límites.",
    icon: "🚀",
    benefits: [
      "Bandeja interna con UI diseñada para escala",
      "Dashboard con analytics y reportes",
      "Gestión de múltiples agentes/equipos",
      "Automatizaciones avanzadas",
      "Integración con herramientas opcionales",
      "Perfecto para: Equipos, agencias, ecommerce, alto volumen",
    ],
    usesFor: "Control total, escalabilidad, análisis profundo",
    gradient: "from-violet-600 to-violet-800",
  },
};

export function ModeComparison() {
  const [activeMode, setActiveMode] = useState<Mode>("simple");
  const mode = modeData[activeMode];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="violet" className="mb-4">
            Dos caminos, una plataforma
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Elige cómo escalar{" "}
            <span className="gradient-text">tu negocio</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Cualquier rubro, cualquier tamaño. Lo que cambia es tu necesidad de control y escala.
            Comienza donde te sientas cómodo y evoluciona cuando crezcas.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-gray-100 p-1">
            {(["simple", "advanced"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeMode === m
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {m === "simple" ? "📱 Modo Simple" : "🎛️ Modo Avanzado"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Visual representation */}
          <div className="relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} rounded-3xl opacity-10 blur-2xl`}
              aria-hidden
            />
            <div className="relative bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl">
              {/* Header */}
              <div className={`bg-gradient-to-r ${mode.gradient} px-8 py-10`}>
                <div className="text-5xl mb-4">{mode.icon}</div>
                <h3 className="text-2xl font-black text-white mb-2">{mode.title}</h3>
                <p className="text-white/90 text-sm">{mode.subtitle}</p>
              </div>

              {/* Visual mockup area */}
              <div className="p-8">
                {activeMode === "simple" ? (
                  // Telegram-style mockup
                  <div className="space-y-3">
                    <div className="bg-[#2AABEE]/10 rounded-2xl p-4 border border-[#2AABEE]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          viewBox="0 0 24 24"
                          fill="#2AABEE"
                          className="w-4 h-4"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        <span className="text-xs font-bold text-[#2AABEE]">
                          Cható Hub
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Mensaje de cliente desde WhatsApp
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Todo en tu Telegram, lista para responder
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-violet-200 flex-shrink-0" />
                        <div className="bg-gray-100 rounded-xl px-3 py-2 flex-1 text-xs text-gray-700">
                          /precio
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-violet-200 flex-shrink-0" />
                        <div className="bg-gray-100 rounded-xl px-3 py-2 flex-1 text-xs text-gray-700">
                          /horarios
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Dashboard-style mockup
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                        <p className="text-xs text-gray-500">Mensajes hoy</p>
                        <p className="text-xl font-bold text-green-600">1,247</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs text-gray-500">Resp. promedio</p>
                        <p className="text-xl font-bold text-blue-600">2.4 min</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">
                        Conversaciones activas
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">WhatsApp</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            24
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Instagram</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded">
                            18
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {mode.description}
            </p>

            {/* Benefits list */}
            <div className="mb-10">
              <h4 className="text-sm font-black text-gray-900 mb-4 uppercase tracking-wider">
                ¿Qué incluye?
              </h4>
              <ul className="space-y-3">
                {mode.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-100 to-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-violet-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use case highlight */}
            <div className="bg-gradient-to-br from-violet-50 to-cyan-50 rounded-2xl p-6 border border-violet-100">
              <p className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-2">
                Mejor para
              </p>
              <p className="text-lg font-black text-gray-900">{mode.usesFor}</p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">💡 Nota:</strong> Todos los planes incluyen Modo Simple. El Modo Avanzado se desbloquea
            a partir del plan Pro. Además, puedes activar herramientas opcionales (Reservas, Catálogo, etc.) en
            cualquier plan.
          </p>
        </div>
      </div>
    </section>
  );
}
