"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { MessageSquare, LayoutDashboard, Check } from "lucide-react";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Reveal } from "@/components/atoms/Reveal";

type Mode = "simple" | "advanced";

interface ModeInfo {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  usesFor: string;
  gradient: string;
}

const modeData: Record<Mode, ModeInfo> = {
  simple: {
    title: "Modo Simple",
    subtitle: "Centro de mensajes en Telegram",
    description:
      "Centralizás todos tus canales en Telegram. Recibís mensajes y respondés desde una sola app, sin aprender una interfaz nueva ni sumar complicaciones.",
    icon: MessageSquare,
    benefits: [
      "Bandeja unificada en tu Telegram actual",
      "Respondé desde donde estés (celular o compu)",
      "Etiquetas y seguimientos básicos",
      "Respuestas rápidas personalizadas",
      "Notificaciones en tiempo real",
      "Ideal para: emprendedores y comercios que atienden solos",
    ],
    usesFor: "Rápido, directo y sin sobrecarga",
    gradient: "from-[#2AABEE] to-[#0d47a1]",
  },
  advanced: {
    title: "Modo Avanzado",
    subtitle: "Panel completo con control total",
    description:
      "Tu propia bandeja interna con panel, analytics, gestión de equipos y herramientas avanzadas. Para escalar sin límites y con visibilidad total.",
    icon: LayoutDashboard,
    benefits: [
      "Bandeja interna pensada para escalar",
      "Panel con analytics y reportes",
      "Gestión de múltiples agentes y equipos",
      "Automatizaciones avanzadas con IA",
      "Integración con herramientas opcionales",
      "Ideal para: equipos, agencias, ecommerce y alto volumen",
    ],
    usesFor: "Control total, escalabilidad y análisis profundo",
    gradient: "from-violet-600 to-violet-800",
  },
};

export function ModeComparison() {
  const [activeMode, setActiveMode] = useState<Mode>("simple");
  const mode = modeData[activeMode];
  const Icon = mode.icon;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Dos caminos, una plataforma"
          title={
            <>
              Elegí cómo escalar <span className="gradient-text">tu negocio</span>
            </>
          }
          subtitle="Cualquier rubro, cualquier tamaño. Lo que cambia es tu necesidad de control y escala. Empezá donde te sientas cómodo y evolucioná cuando crezcas."
          className="mb-12"
        />

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-gray-100 p-1">
            {(["simple", "advanced"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeMode === m ? "bg-white text-gray-900 shadow-md" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {m === "simple" ? "Modo Simple" : "Modo Avanzado"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Visual */}
          <Reveal direction="right" className="relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} rounded-3xl opacity-10 blur-2xl`}
              aria-hidden
            />
            <div className="relative bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl h-full">
              <div className={`bg-gradient-to-r ${mode.gradient} px-8 py-10`}>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{mode.title}</h3>
                <p className="text-white/90 text-sm">{mode.subtitle}</p>
              </div>

              <div className="p-8">
                {activeMode === "simple" ? (
                  <div className="space-y-3">
                    <div className="bg-[#2AABEE]/10 rounded-2xl p-4 border border-[#2AABEE]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-[#2AABEE]" strokeWidth={2} />
                        <span className="text-xs font-bold text-[#2AABEE]">Cható Hub</span>
                      </div>
                      <p className="text-sm text-gray-700">Mensaje de cliente desde WhatsApp</p>
                      <p className="text-xs text-gray-500 mt-1">Todo en tu Telegram, listo para responder</p>
                    </div>
                    <div className="space-y-2">
                      {["/precio", "/horarios"].map((cmd) => (
                        <div key={cmd} className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-violet-200 flex-shrink-0" />
                          <div className="bg-gray-100 rounded-xl px-3 py-2 flex-1 text-xs text-gray-700">{cmd}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                        <p className="text-xs text-gray-500">Mensajes hoy</p>
                        <p className="text-xl font-bold text-green-600">1.247</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs text-gray-500">Resp. promedio</p>
                        <p className="text-xl font-bold text-blue-600">2,4 min</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Conversaciones activas</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">WhatsApp</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">24</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Instagram</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded">18</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal direction="left" delay={0.1} className="flex flex-col justify-center">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">{mode.description}</p>

            <div className="mb-10">
              <h4 className="text-sm font-black text-gray-900 mb-4 uppercase tracking-wider">¿Qué incluye?</h4>
              <ul className="space-y-3">
                {mode.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-100 to-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-violet-600" strokeWidth={3} />
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-cyan-50 rounded-2xl p-6 border border-violet-100">
              <p className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-2">Mejor para</p>
              <p className="text-lg font-black text-gray-900">{mode.usesFor}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 bg-violet-50 border border-violet-100 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">Nota:</strong> todos los planes incluyen el Modo Simple. El Modo
            Avanzado se desbloquea a partir del plan Pro. Además, podés activar herramientas opcionales (Reservas,
            Catálogo y más) en cualquier plan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
