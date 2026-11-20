"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, ShoppingBag, ClipboardList, Star, Filter, Megaphone, Bot, Puzzle, Check } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Stagger, StaggerItem, Reveal } from "@/components/atoms/Reveal";
import { URLS } from "@/lib/config";
import { type PricingCurrency, usePricingCurrency } from "@/hooks/usePricingCurrency";

interface AddonResponse {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  included_features: string[];
  price_monthly_ars: number;
  price_monthly_usd: number;
}

const icons: Record<string, LucideIcon> = {
  booking: CalendarCheck, catalog: ShoppingBag, surveys: ClipboardList, reviews: Star,
  sales_pipeline: Filter, broadcast: Megaphone, multi_agent: Bot,
};

function fmtPrice(priceArs: number, priceUsd: number, currency: PricingCurrency | null): string {
  if (currency === "ARS" && priceArs > 0) {
    return `Desde ARS $${priceArs.toLocaleString("es-AR")}/mes`;
  }
  if (currency === "USD" && priceUsd > 0) return `Desde USD $${priceUsd.toLocaleString("en-US")}/mes`;
  if (currency === null) return "Consultando precio local…";
  return "Consultá el precio";
}

export function OptionalTools() {
  const [addons, setAddons] = useState<AddonResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const currency = usePricingCurrency();

  useEffect(() => {
    let alive = true;
    fetch(`${URLS.api}/api/public/marketplace-products`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("Catálogo no disponible");
        return r.json();
      })
      .then((d) => {
        if (!alive) return;
        if (!Array.isArray(d)) throw new Error("Catálogo inválido");
        setAddons(d);
        setLoading(false);
      })
      .catch(() => {
        if (alive) { setFailed(true); setLoading(false); }
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
    <section id="modulos" className="scroll-mt-24 bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Catálogo del Marketplace"
          badgeVariant="green"
          title={
            <>
              Elegí los módulos que <span className="gradient-text">hacen avanzar tu operación</span>
            </>
          }
          subtitle="Activá solo lo que necesitás hoy. El catálogo se expande con nuevas capacidades para que tu plataforma siga creciendo sin perder simplicidad ni contexto."
          className="mb-16"
        />

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 bg-white rounded-2xl border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-center text-gray-500">{failed ? "No pudimos cargar el catálogo. Volvé a intentar en unos minutos." : "Todavía no hay módulos publicados."}</p>
        ) : (
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((addon) => {
              const features = addon.included_features ?? [];
              return (
                <StaggerItem
                  key={addon.id}
                  className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-violet-200 transition-all duration-300"
                >
                  <div className="px-6 py-8 text-center border-b border-gray-100 bg-gradient-to-br from-violet-50 to-cyan-50">
                    <IconBadge icon={icons[addon.slug] ?? Puzzle} size="lg" className="mx-auto mb-3" />
                    <h3 className="text-xl font-black text-gray-900">{addon.name}</h3>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{addon.short_description ?? ""}</p>

                    {features.length > 0 && (
                      <div className="mb-8 flex-1">
                        <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3">Incluye</p>
                        <ul className="space-y-2">
                          {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                              <span className="text-xs text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <p className="text-sm font-bold text-gray-900">{fmtPrice(addon.price_monthly_ars, addon.price_monthly_usd, currency)}</p>
                      <p className="text-xs text-gray-500 mt-1">Se suma a tu Axtroos Workstation</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}

        <Reveal className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-black text-gray-900 mb-4">¿Cómo funciona el Marketplace?</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              {[
                ["Módulos independientes:", "activás solo las capacidades que tu negocio necesita."],
                ["Una plataforma compartida:", "cada módulo aprovecha los mismos clientes, canales e historial."],
                ["Expansión continua:", "el catálogo suma nuevas soluciones a medida que Axtroos evoluciona."],
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
