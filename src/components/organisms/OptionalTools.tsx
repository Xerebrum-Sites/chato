"use client";

import React, { useState } from "react";
import { Badge } from "@/components/atoms/Badge";

const tools = [
  {
    icon: "📅",
    name: "Reservas",
    description: "Sistema de reservas integrado. Clientes reservan directamente en tus canales.",
    features: ["Calendario automático", "Confirmación al instante", "Recordatorios automáticos", "Sincronización en tiempo real"],
    cta: "Desde $15/mes",
    color: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
  },
  {
    icon: "🛍️",
    name: "Catálogo de Productos",
    description: "Catálogo visual que funciona en todos tus canales. Navega, compra, sin salir del chat.",
    features: ["Fotos y descripciones", "Búsqueda y filtros", "Pedidos directos", "Sincronización con tu inventario"],
    cta: "Desde $20/mes",
    color: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
  },
  {
    icon: "📋",
    name: "Encuestas",
    description: "Crea encuestas de satisfacción, feedback o NPS. Análisis automático de respuestas.",
    features: ["Encuestas personalizadas", "Análisis en tiempo real", "Reportes automáticos", "Integración con CRM"],
    cta: "Desde $10/mes",
    color: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
  },
  {
    icon: "⭐",
    name: "Reseñas",
    description: "Solicita reseñas y gestiona tu reputación online desde Cható. Responde directamente.",
    features: ["Solicitud automática", "Gestión de respuestas", "Integración con Google/Trustpilot", "Alertas de críticas"],
    cta: "Desde $15/mes",
    color: "from-orange-50 to-yellow-50",
    borderColor: "border-orange-200",
  },
  {
    icon: "📞",
    name: "Soporte Prioritario",
    description: "Acceso prioritario a nuestro equipo de soporte. Respuestas en menos de 1 hora.",
    features: ["Chat prioritario", "Soporte en español", "Onboarding personalizado", "Sesiones de training"],
    cta: "Desde $25/mes",
    color: "from-red-50 to-pink-50",
    borderColor: "border-red-200",
  },
  {
    icon: "🤖",
    name: "Automaciones Avanzadas",
    description: "Flujos de automatización complejos con condicionales y triggers personalizados.",
    features: ["Flujos con ramificaciones", "Triggers por comportamiento", "Variables dinámicas", "Webhooks personalizados"],
    cta: "Desde $30/mes",
    color: "from-indigo-50 to-purple-50",
    borderColor: "border-indigo-200",
  },
  {
    icon: "📊",
    name: "Analytics Pro",
    description: "Reportes avanzados, dashboards personalizables y análisis predictivo de tendencias.",
    features: ["Dashboards personalizables", "Exportación de datos", "Análisis predictivo", "Comparativas históricas"],
    cta: "Desde $40/mes",
    color: "from-cyan-50 to-blue-50",
    borderColor: "border-cyan-200",
  },
  {
    icon: "🔗",
    name: "Integraciones Premium",
    description: "Conecta con tus herramientas favoritas: CRM, ERP, bases de datos personalizadas.",
    features: ["Zapier", "Make", "APIs custom", "Webhooks ilimitados"],
    cta: "Desde $35/mes",
    color: "from-yellow-50 to-amber-50",
    borderColor: "border-yellow-200",
  },
];

export function OptionalTools() {
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 400;
      const newPos =
        direction === "left"
          ? Math.max(0, scrollPos - scrollAmount)
          : scrollPos + scrollAmount;
      setScrollPos(newPos);
      containerRef.current.scrollTo({
        left: newPos,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="green" className="mb-4">
            Herramientas opcionales
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Potencia tu negocio{" "}
            <span className="gradient-text">a medida que creces</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Añade herramientas específicas según tu necesidad. Todos los planes pueden acceder a cualquier
            add-on. Paga solo por lo que usas.
          </p>
        </div>

        {/* Tools Slider */}
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {tools.map((tool) => (
            <div
              key={tool.name}
              className={`flex-shrink-0 w-80 bg-white rounded-2xl border ${tool.borderColor} overflow-hidden hover:shadow-lg transition-shadow duration-300 snap-center`}
            >
              {/* Header with icon */}
              <div className={`bg-gradient-to-br ${tool.color} px-6 py-8 text-center border-b ${tool.borderColor}`}>
                <div className="text-5xl mb-2">{tool.icon}</div>
                <h3 className="text-xl font-black text-gray-900">{tool.name}</h3>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="mb-8 flex-1">
                  <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3">
                    Incluye
                  </p>
                  <ul className="space-y-2">
                    {tool.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm font-bold text-gray-900">{tool.cta}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Disponible en cualquier plan
                  </p>
                </div>
              </div>
            </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Bottom info */}
        <div className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-black text-gray-900 mb-4">
              💡 ¿Cómo funcionan los add-ons?
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>
                  <strong className="text-gray-900">Sin compromisos:</strong> Activa y desactiva cuando quieras.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>
                  <strong className="text-gray-900">Para cualquier plan:</strong> Starter, Pro y Business pueden
                  acceder a cualquier herramienta.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>
                  <strong className="text-gray-900">Se suman a tu factura:</strong> Paga solo por los que usas, junto
                  con tu plan base.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
