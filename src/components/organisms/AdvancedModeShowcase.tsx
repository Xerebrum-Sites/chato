"use client";

import { LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { URLS } from "@/lib/config";

const benefits = [
  "Panel completo con todas tus conversaciones",
  "Analytics y reportes en tiempo real por canal",
  "Gestioná equipos: asigná agentes y monitoreá conversaciones",
  "Automatizaciones avanzadas con IA integrada",
  "Base de conocimiento (RAG) para respuestas más precisas",
  "Integración con tus herramientas favoritas",
];

export function AdvancedModeShowcase() {
  return (
    <section id="modo-avanzado" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-800 rounded-3xl opacity-10 blur-2xl" />
            <div className="relative bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-violet-600 to-violet-800 px-8 py-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                    <LayoutDashboard className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-black text-white">Tu Panel</h3>
                </div>
                <p className="text-white/90 text-sm">Control total en una interfaz intuitiva</p>
              </div>

              {/* Dashboard mockup */}
              <div className="p-8 space-y-6">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                    <p className="text-xs text-gray-500">Hoy</p>
                    <p className="text-2xl font-bold text-blue-600">2.4k</p>
                    <p className="text-xs text-gray-400">mensajes</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-gray-500">Tiempo resp.</p>
                    <p className="text-2xl font-bold text-green-600">3m</p>
                    <p className="text-xs text-gray-400">promedio</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                    <p className="text-xs text-gray-500">Satisf.</p>
                    <p className="text-2xl font-bold text-purple-600">94%</p>
                    <p className="text-xs text-gray-400">clientes</p>
                  </div>
                </div>

                {/* Channels overview */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">
                    Por canal
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-700">WhatsApp</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-[65%] bg-green-500 rounded-full" />
                        </div>
                        <span className="text-gray-500 font-medium min-w-[2.5rem]">1.6k</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-700">Instagram</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-[40%] bg-pink-500 rounded-full" />
                        </div>
                        <span className="text-gray-500 font-medium min-w-[2.5rem]">970</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-700">Facebook</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-[35%] bg-blue-500 rounded-full" />
                        </div>
                        <span className="text-gray-500 font-medium min-w-[2.5rem]">850</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex gap-2">
                  <div className="flex-1 bg-violet-50 rounded-lg px-3 py-2 border border-violet-200">
                    <p className="text-xs font-semibold text-violet-700">10 conversaciones</p>
                    <p className="text-xs text-violet-600">sin responder</p>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200">
                    <p className="text-xs font-semibold text-amber-700">3 agentes</p>
                    <p className="text-xs text-amber-600">en línea</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <Badge className="mb-6" variant="violet">
              Escalá sin límites
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
              Modo Avanzado:{" "}
              <span className="gradient-text">control total</span>
            </h2>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Para equipos que necesitan más. Dashboard diseñado para escala,
              con todas las herramientas que necesitas para gestionar cientos de conversaciones.
            </p>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Automatizaciones, analytics, gestión de agentes y integraciones avanzadas.
              Todo en una plataforma cohesiva.
            </p>

            {/* Benefits list */}
            <div className="mb-10">
              <h4 className="text-sm font-black text-gray-900 mb-4 uppercase tracking-wider">
                ¿Qué incluye?
              </h4>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center flex-shrink-0 mt-0.5">
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

            <Button href={URLS.signIn} size="lg">
              Probar Modo Avanzado
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
