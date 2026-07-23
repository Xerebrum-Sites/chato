"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { PricingCard } from "@/components/molecules/PricingCard";
import { URLS } from "@/lib/config";

const API_URL = URLS.api;

interface PlanData {
  id: string;
  name: string;
  slug: string;
  features: Record<string, unknown>;
  price_ars: number | null;
  price_usd: number | null;
  annual_discount_pct?: number;
  price_annual_ars?: number | null;
  price_annual_usd?: number | null;
  is_visible_landing?: boolean;
}

type BillingCycle = "monthly" | "annual";

// Map backend slugs to landing display config
const PLAN_CONFIG: Record<string, {
  displayName: string;
  description: string;
  baseFeatures: string[];
  advancedFeatures?: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}> = {
  starter: {
    displayName: "Starter",
    description: "Para emprendedores que usan Modo Simple.",
    baseFeatures: [
      "✓ Modo Simple (Telegram)",
      "✓ Hasta 3 canales",
      "✓ Etiquetas y seguimiento",
      "✓ Respuestas rápidas",
      "✓ 14 días gratis",
    ],
    highlighted: false,
    cta: "Empezar gratis",
  },
  pro: {
    displayName: "Pro",
    description: "Para negocios que crecen. Con dashboard avanzado.",
    baseFeatures: [
      "✓ Modo Simple (Telegram)",
      "✓ Modo Avanzado (Dashboard)",
      "✓ Hasta 5 canales",
      "✓ Hasta 3 agentes",
      "✓ Analytics básicos",
    ],
    advancedFeatures: [
      "✓ Automatizaciones con IA",
      "✓ Base de conocimiento (RAG)",
      "✓ Horarios automáticos",
      "✓ 14 días gratis",
    ],
    highlighted: true,
    badge: "Más popular",
    cta: "Empezar gratis",
  },
  business: {
    displayName: "Business",
    description: "Sin límites. Para equipos y agencias.",
    baseFeatures: [
      "✓ Modo Simple (Telegram)",
      "✓ Modo Avanzado (Dashboard completo)",
      "✓ Canales ilimitados",
      "✓ Agentes ilimitados",
      "✓ Analytics avanzados",
    ],
    advancedFeatures: [
      "✓ Automatizaciones avanzadas con IA",
      "✓ RAG ilimitado",
      "✓ Prioridad en soporte",
      "✓ SLA personalizado",
    ],
    highlighted: false,
    cta: "Hablar con ventas",
  },
};

type Currency = "ARS" | "USD" | "BRL";

function formatPrice(priceArs: number | null, priceUsd: number | null, currency: Currency, usdToBrl: number): string {
  if (currency === "ARS") {
    if (priceArs === null) return "Gratis";
    if (priceArs === 0) return "Gratis";
    return `$${priceArs.toLocaleString("es-AR")}`;
  }
  if (currency === "BRL") {
    if (priceUsd === null || priceUsd === 0) return "Grátis";
    const brl = Math.round(priceUsd * usdToBrl);
    return `R$${brl.toLocaleString("pt-BR")}`;
  }
  // USD
  if (priceUsd === null || priceUsd === 0) return "Free";
  return `$${priceUsd}`;
}

function getPeriodLabel(priceUsd: number | null, cycle: BillingCycle): string {
  if (priceUsd === 0 || priceUsd === null) return "";
  return cycle === "annual" ? "/año" : "/mes";
}

function pickPriceForCycle(
  plan: PlanData | undefined,
  cycle: BillingCycle,
): { priceArs: number | null; priceUsd: number | null } {
  if (!plan) return { priceArs: null, priceUsd: null };
  if (cycle === "monthly") {
    return { priceArs: plan.price_ars, priceUsd: plan.price_usd };
  }
  return {
    priceArs: plan.price_annual_ars ?? plan.price_ars,
    priceUsd: plan.price_annual_usd ?? plan.price_usd,
  };
}

async function detectCountry(): Promise<string> {
  try {
    const res = await fetch("/cdn-cgi/trace", { cache: "no-store" });
    if (!res.ok) throw new Error("no trace");
    const text = await res.text();
    const match = text.match(/loc=([A-Z]{2})/);
    return match?.[1] ?? "XX";
  } catch {
    // Fallback: use browser language
    const lang = navigator.language ?? "en";
    if (lang.startsWith("es-AR")) return "AR";
    if (lang.startsWith("pt-BR") || lang.startsWith("pt")) return "BR";
    return "XX";
  }
}

async function fetchUsdToBrl(): Promise<number> {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("no rate");
    const data = await res.json() as { usd: Record<string, number> };
    return data.usd?.brl ?? 5.8;
  } catch {
    return 5.8;
  }
}

export function Pricing() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [currency, setCurrency] = useState<Currency>("ARS");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [usdToBrl, setUsdToBrl] = useState(5.8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const [plansData, country, brlRate] = await Promise.all([
        fetch(`${API_URL}/api/public/plans`).then((r) => r.json()).then((d) => Array.isArray(d) ? d : []).catch(() => []) as Promise<PlanData[]>,
        detectCountry(),
        fetchUsdToBrl(),
      ]);
      setPlans(plansData);
      setUsdToBrl(brlRate);
      if (country === "AR") setCurrency("ARS");
      else if (country === "BR") setCurrency("BRL");
      else setCurrency("USD");
      setLoading(false);
    }
    init();
  }, []);

  // Selector de moneda por código (sin banderas de país). El label "R$" cubre
  // el real; "ARS"/"USD" hablan por sí mismos.
  const currencyChip: Record<Currency, string> = { ARS: "ARS", USD: "USD", BRL: "R$ BRL" };

  // Merge API data with display config. Plans hidden from the landing
  // (is_visible_landing === false) are silently skipped.
  const visiblePlans = plans.filter((p) => p.is_visible_landing !== false);
  const displayPlans = (["starter", "pro", "business"] as const)
    .map((slug) => ({ slug, apiPlan: visiblePlans.find((p) => p.slug === slug) }))
    .filter(({ apiPlan }) => apiPlan !== undefined)
    .map(({ slug, apiPlan }) => {
      const config = PLAN_CONFIG[slug];
      const priced = pickPriceForCycle(apiPlan, billingCycle);
      const discountPct = apiPlan?.annual_discount_pct ?? 0;
      return {
        slug,
        name: config.displayName,
        price: loading
          ? "..."
          : formatPrice(priced.priceArs, priced.priceUsd, currency, usdToBrl),
        period: loading ? "" : getPeriodLabel(priced.priceUsd, billingCycle),
        description: config.description,
        baseFeatures: config.baseFeatures,
        advancedFeatures: config.advancedFeatures,
        highlighted: config.highlighted,
        badge: config.badge,
        cta: config.cta,
        ctaHref: slug === "business" ? "/contacto/" : URLS.signIn,
        annualSavings:
          billingCycle === "annual" && discountPct > 0
            ? `Ahorrás ${discountPct.toFixed(0)}%`
            : null,
      };
    });

  return (
    <section id="precios" className="pt-32 lg:pt-40 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="green" className="mb-4">
            Precios transparentes
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Empezá en pequeño,{" "}
            <span className="gradient-text">escalá sin límites</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Todos los planes incluyen el Modo Simple. El Modo Avanzado se desbloquea en Pro.
            Herramientas opcionales (Reservas, Catálogo y más) disponibles en cualquier plan.
            14 días gratis para probar, sin tarjeta.
          </p>

          {/* Selector de moneda — códigos, sin banderas de país */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {(["ARS", "USD", "BRL"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  currency === c
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-violet-300"
                }`}
              >
                {currencyChip[c]}
              </button>
            ))}
          </div>

          {/* Billing cycle toggle: monthly ↔ annual (annual shows discount) */}
          <div className="flex items-center justify-center mt-6">
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-violet-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mensual
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  billingCycle === "annual"
                    ? "bg-violet-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Anual
                {billingCycle !== "annual" && (
                  <span className="text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                    Ahorrás
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-center">
          {displayPlans.map((plan) => (
            <PricingCard
              key={plan.slug}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              baseFeatures={plan.baseFeatures}
              advancedFeatures={plan.advancedFeatures}
              highlighted={plan.highlighted}
              badge={plan.badge}
              cta={plan.cta}
              slug={plan.slug}
              ctaHref={plan.ctaHref}
              annualSavings={plan.annualSavings}
            />
          ))}
        </div>

        {/* FAQ mini */}
        <div className="mt-14 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { q: "¿Necesito tarjeta para probar?", a: "No. Los 14 días de prueba son completamente gratis y sin tarjeta de crédito." },
            { q: "¿Puedo cambiar de plan?", a: "Sí, cuando quieras. Sube a un plan superior o baja si necesitas menos. Pago prorrateado." },
            { q: "¿Cómo funcionan los add-ons?", a: "Se añaden a tu factura. Activa solo los que usas (Reservas, Catálogo, Encuestas, etc.)." },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="font-semibold text-gray-900 text-sm mb-2">{q}</p>
              <p className="text-gray-500 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
