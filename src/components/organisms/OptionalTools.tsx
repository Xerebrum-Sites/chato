"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { URLS } from "@/lib/config";

interface AddonResponse {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price_ars: number;
  price_usd: number;
  included_in_plans: string[] | Record<string, boolean>;
  is_active?: boolean;
}

// Per-slug presentation defaults — the API names/prices win, but icons,
// gradients and feature bullets stay client-side because they don't belong
// in the catalog.
const SLUG_PRESENTATION: Record<
  string,
  { icon: string; color: string; borderColor: string; features: string[] }
> = {
  booking: {
    icon: "📅",
    color: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    features: [
      "Calendario automático",
      "Confirmación al instante",
      "Recordatorios automáticos",
      "Sincronización en tiempo real",
    ],
  },
  catalog: {
    icon: "🛍️",
    color: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    features: [
      "Fotos y descripciones",
      "Búsqueda y filtros",
      "Pedidos directos",
      "Sincronización con tu inventario",
    ],
  },
  surveys: {
    icon: "📋",
    color: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    features: [
      "Encuestas personalizadas",
      "Análisis en tiempo real",
      "Reportes automáticos",
      "Integración con CRM",
    ],
  },
  reviews: {
    icon: "⭐",
    color: "from-orange-50 to-yellow-50",
    borderColor: "border-orange-200",
    features: [
      "Solicitud automática",
      "Gestión de respuestas",
      "Integración con Google/Trustpilot",
      "Alertas de críticas",
    ],
  },
};

function fallbackPresentation(slug: string) {
  return {
    icon: "🔧",
    color: "from-gray-50 to-zinc-50",
    borderColor: "border-gray-200",
    features: [],
  };
}

function fmtPrice(priceArs: number, priceUsd: number): string {
  if (priceArs && priceArs > 0) return `Desde $${priceArs.toLocaleString("es-AR")}/mes`;
  if (priceUsd && priceUsd > 0) return `Desde $${priceUsd}/mes`;
  return "Disponible en planes superiores";
}

export function OptionalTools() {
  const [addons, setAddons] = useState<AddonResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`${URLS.api}/api/public/addons`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        if (!alive) return;
        const list = Array.isArray(d) ? d : [];
        setAddons(list.filter((x) => x.is_active !== false));
        setLoading(false);
      })
      .catch(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Pin the canonical order; new addons go to the end.
  const ORDER = ["booking", "catalog", "surveys", "reviews"];
  const sorted = [...addons].sort((a, b) => {
    const ai = ORDER.indexOf(a.slug);
    const bi = ORDER.indexOf(b.slug);
    if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

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

        {/* Tools Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-72 bg-white rounded-2xl border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay addons disponibles por ahora.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((addon) => {
              const pres = SLUG_PRESENTATION[addon.slug] ?? fallbackPresentation(addon.slug);
              return (
                <div
                  key={addon.id}
                  className={`bg-white rounded-2xl border ${pres.borderColor} overflow-hidden hover:shadow-lg transition-shadow duration-300`}
                >
                  {/* Header with icon */}
                  <div
                    className={`bg-gradient-to-br ${pres.color} px-6 py-8 text-center border-b ${pres.borderColor}`}
                  >
                    <div className="text-5xl mb-2">{pres.icon}</div>
                    <h3 className="text-xl font-black text-gray-900">{addon.name}</h3>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col h-full">
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {addon.description ?? ""}
                    </p>

                    {/* Features */}
                    {pres.features.length > 0 && (
                      <div className="mb-8 flex-1">
                        <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3">
                          Incluye
                        </p>
                        <ul className="space-y-2">
                          {pres.features.map((feature, i) => (
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
                    )}

                    {/* CTA */}
                    <div className="pt-6 border-t border-gray-100">
                      <p className="text-sm font-bold text-gray-900">
                        {fmtPrice(addon.price_ars, addon.price_usd)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Disponible en cualquier plan
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
