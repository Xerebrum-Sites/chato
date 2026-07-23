"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, ShoppingBag, ClipboardList, Star, Puzzle, Check } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Stagger, StaggerItem, Reveal } from "@/components/atoms/Reveal";
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

// Los nombres/precios los define la API; los iconos y bullets viven acá porque
// son presentación y no pertenecen al catálogo.
const SLUG_PRESENTATION: Record<string, { icon: LucideIcon; features: string[] }> = {
  booking: {
    icon: CalendarCheck,
    features: ["Calendario automático", "Confirmación al instante", "Recordatorios automáticos", "Sincronización en tiempo real"],
  },
  catalog: {
    icon: ShoppingBag,
    features: ["Fotos y descripciones", "Búsqueda y filtros", "Pedidos directos", "Sincronización con tu inventario"],
  },
  surveys: {
    icon: ClipboardList,
    features: ["Encuestas personalizadas", "Análisis en tiempo real", "Reportes automáticos", "Integración con CRM"],
  },
  reviews: {
    icon: Star,
    features: ["Solicitud automática", "Gestión de respuestas", "Integración con reseñas", "Alertas de críticas"],
  },
};

function presentationFor(slug: string): { icon: LucideIcon; features: string[] } {
  return SLUG_PRESENTATION[slug] ?? { icon: Puzzle, features: [] };
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
        <SectionHeader
          badge="Herramientas opcionales"
          badgeVariant="green"
          title={
            <>
              Potenciá tu negocio <span className="gradient-text">a medida que crecés</span>
            </>
          }
          subtitle="Sumá herramientas específicas según tu necesidad. Cualquier plan puede activar cualquier add-on. Pagás solo por lo que usás."
          className="mb-16"
        />

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 bg-white rounded-2xl border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-center text-gray-500">No hay herramientas disponibles por ahora.</p>
        ) : (
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((addon) => {
              const pres = presentationFor(addon.slug);
              return (
                <StaggerItem
                  key={addon.id}
                  className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-violet-200 transition-all duration-300"
                >
                  <div className="px-6 py-8 text-center border-b border-gray-100 bg-gradient-to-br from-violet-50 to-cyan-50">
                    <IconBadge icon={pres.icon} size="lg" className="mx-auto mb-3" />
                    <h3 className="text-xl font-black text-gray-900">{addon.name}</h3>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{addon.description ?? ""}</p>

                    {pres.features.length > 0 && (
                      <div className="mb-8 flex-1">
                        <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3">Incluye</p>
                        <ul className="space-y-2">
                          {pres.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                              <span className="text-xs text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <p className="text-sm font-bold text-gray-900">{fmtPrice(addon.price_ars, addon.price_usd)}</p>
                      <p className="text-xs text-gray-500 mt-1">Disponible en cualquier plan</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}

        <Reveal className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-black text-gray-900 mb-4">¿Cómo funcionan los add-ons?</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              {[
                ["Sin compromisos:", "activás y desactivás cuando quieras."],
                ["Para cualquier plan:", "Starter, Pro y Business pueden acceder a cualquier herramienta."],
                ["Se suman a tu factura:", "pagás solo por los que usás, junto con tu plan base."],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span>
                    <strong className="text-gray-900">{bold}</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
