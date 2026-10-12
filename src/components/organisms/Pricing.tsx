"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { PricingCard, type PriceDisplay } from "@/components/molecules/PricingCard";
import { URLS } from "@/lib/config";
import { type PricingCurrency, usePricingCurrency } from "@/hooks/usePricingCurrency";

const API_URL = URLS.api;
const PLAN_ORDER = ["starter", "pro", "business"] as const;

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
  max_human_agents: number;
  is_visible_landing?: boolean;
}

interface TrialData {
  trial_days: number;
}

type BillingCycle = "monthly" | "annual";

const PLAN_CONFIG: Record<(typeof PLAN_ORDER)[number], { description: string; audience: string[]; highlighted: boolean; badge?: string; cta: string }> = {
  starter: {
    description: "Para empezar a ordenar la atención.",
    audience: ["Emprendedores y comercios pequeños", "Una persona atendiendo clientes", "Un canal principal de atención"],
    highlighted: false,
    cta: "Empezar gratis",
  },
  pro: {
    description: "Para equipos que quieren crecer ordenados.",
    audience: ["Equipos de atención en crecimiento", "Negocios con varios canales", "Operaciones que suman IA"],
    highlighted: true,
    badge: "Más popular",
    cta: "Empezar gratis",
  },
  business: {
    description: "Para operaciones que necesitan escalar.",
    audience: ["Equipos consolidados y agencias", "Operaciones con alta demanda", "Negocios que buscan soporte prioritario"],
    highlighted: false,
    cta: "Hablar con ventas",
  },
};

function priceFor(plan: PlanData, currency: PricingCurrency, annual = false): number | null {
  if (currency === "ARS") return annual ? plan.price_annual_ars ?? null : plan.price_ars;
  return annual ? plan.price_annual_usd ?? null : plan.price_usd;
}

function priceDisplay(price: number | null, currency: PricingCurrency, period: string): PriceDisplay | null {
  if (price === null || price <= 0) return null;
  return {
    currency,
    symbol: "$",
    amount: price.toLocaleString(currency === "ARS" ? "es-AR" : "en-US", { maximumFractionDigits: currency === "ARS" ? 0 : 2 }),
    period,
  };
}

function enabled(features: Record<string, unknown>, key: string): boolean {
  return features[key] === true || (typeof features[key] === "number" && features[key] > 0);
}

function limitLabel(value: unknown, singular: string, plural: string): string {
  if (value === -1) return "Ilimitados";
  if (typeof value !== "number" || value <= 0) return "No incluido";
  return `${value} ${value === 1 ? singular : plural}`;
}

const COMPARISON_ROWS: Array<{ label: string; read: (plan: PlanData) => string }> = [
  { label: "Canales", read: (plan) => limitLabel(plan.features.max_channels, "canal", "canales") },
  { label: "Agentes humanos", read: (plan) => limitLabel(plan.max_human_agents, "agente", "agentes") },
  { label: "Web Chat", read: (plan) => enabled(plan.features, "webchat_enabled") ? "Incluido" : "—" },
  { label: "Automatizaciones con IA", read: (plan) => enabled(plan.features, "bot_enabled") ? "Incluido" : "—" },
  { label: "Base de conocimiento", read: (plan) => enabled(plan.features, "rag_enabled") ? "Incluida" : "—" },
  { label: "Agentes IA", read: (plan) => limitLabel(plan.features.max_ai_agents, "agente", "agentes") },
  { label: "Horarios automáticos", read: (plan) => enabled(plan.features, "schedules_enabled") ? "Incluidos" : "—" },
  { label: "Soporte prioritario", read: (plan) => enabled(plan.features, "priority_support") ? "Incluido" : "—" },
  { label: "Almacenamiento incluido", read: (plan) => `${plan.features.included_storage_gb ?? 0} GB` },
  { label: "Tokens de IA incluidos / mes", read: (plan) => Number(plan.features.included_ai_tokens_monthly ?? 0).toLocaleString("es-AR") },
];

export function Pricing() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [trialDays, setTrialDays] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [loading, setLoading] = useState(true);
  const currency = usePricingCurrency();

  useEffect(() => {
    async function loadPricing() {
      const [plansResult, trialResult] = await Promise.all([
        fetch(`${API_URL}/api/public/plans`).then((response) => response.json()).then((data) => Array.isArray(data) ? data : []).catch(() => []) as Promise<PlanData[]>,
        fetch(`${API_URL}/api/public/trial-days`).then((response) => response.ok ? response.json() : null).catch(() => null) as Promise<TrialData | null>,
      ]);
      setPlans(plansResult);
      setTrialDays(trialResult?.trial_days ?? null);
      setLoading(false);
    }
    loadPricing();
  }, []);

  const visiblePlans = plans.filter((plan) => plan.is_visible_landing !== false);
  const displayPlans = PLAN_ORDER.map((slug) => ({ slug, plan: visiblePlans.find((item) => item.slug === slug) })).filter((item): item is { slug: (typeof PLAN_ORDER)[number]; plan: PlanData } => item.plan !== undefined);
  const trialLabel = trialDays ? `${trialDays} días gratis, sin tarjeta` : null;

  return (
    <section id="precios" className="bg-gray-50 pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Badge variant="green" className="mb-4">Precios transparentes</Badge>
          <h2 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl">Empezá en pequeño, <span className="gradient-text">escalá sin límites</span></h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            Todos los planes trabajan sobre la misma bandeja omnicanal. Sumá módulos del Marketplace para ampliar la plataforma cuando lo necesites.
            {trialDays ? ` ${trialDays} días gratis para probar, sin tarjeta.` : ""}
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              <button type="button" onClick={() => setBillingCycle("monthly")} className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${billingCycle === "monthly" ? "bg-violet-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}>Mensual</button>
              <button type="button" onClick={() => setBillingCycle("annual")} className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${billingCycle === "annual" ? "bg-violet-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}>Anual{billingCycle !== "annual" && <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald-700">Ahorrás</span>}</button>
            </div>
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {displayPlans.map(({ slug, plan }) => {
            const config = PLAN_CONFIG[slug];
            return <PricingCard key={plan.id} name={plan.name} monthlyPrice={loading || currency === null ? null : priceDisplay(priceFor(plan, currency), currency, "/mes")} annualPrice={loading || currency === null ? null : priceDisplay(priceFor(plan, currency, true), currency, "/año")} showAnnualPrice={billingCycle === "annual"} description={config.description} audience={config.audience} highlighted={config.highlighted} badge={config.badge} cta={config.cta} ctaHref={slug === "business" ? "/contacto/" : URLS.signIn} annualSavings={billingCycle === "annual" && (plan.annual_discount_pct ?? 0) > 0 ? `Ahorrás ${plan.annual_discount_pct?.toFixed(0)}%` : null} trialLabel={trialLabel} />;
          })}
        </div>

        {displayPlans.length > 0 && <div className="mt-16 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-6 py-6 sm:px-8"><h3 className="text-2xl font-black text-gray-900">Compará cada plan en detalle</h3><p className="mt-2 text-sm text-gray-500">Los límites y capacidades se actualizan desde el catálogo de planes.</p></div>
          <div className="overflow-x-auto"><table className="min-w-[720px] w-full border-collapse text-left"><thead><tr className="border-b border-gray-100 bg-gray-50"><th className="px-6 py-4 text-sm font-bold text-gray-500 sm:px-8">Incluye</th>{displayPlans.map(({ plan }) => <th key={plan.id} className="px-6 py-4 text-sm font-black text-gray-900">{plan.name}</th>)}</tr></thead><tbody>{COMPARISON_ROWS.map((row) => <tr key={row.label} className="border-b border-gray-100 last:border-b-0"><th scope="row" className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-700 sm:px-8">{row.label}</th>{displayPlans.map(({ plan }) => <td key={plan.id} className="px-6 py-4 text-sm text-gray-600">{row.read(plan)}</td>)}</tr>)}</tbody></table></div>
        </div>}

        <div className="mt-14 grid gap-6 text-center sm:grid-cols-3">
          {[{ q: "¿Necesito tarjeta para probar?", a: trialDays ? `No. Los ${trialDays} días de prueba son completamente gratis y sin tarjeta de crédito.` : "No. La prueba es completamente gratis y sin tarjeta de crédito." }, { q: "¿Puedo cambiar de plan?", a: "Sí, cuando quieras. Sube a un plan superior o baja si necesitás menos. Pago prorrateado." }, { q: "¿Cómo funcionan los módulos?", a: "Se suman a tu factura. Activá sólo las capacidades que necesitás." }].map(({ q, a }) => <div key={q} className="rounded-2xl border border-gray-100 bg-white p-5"><p className="mb-2 text-sm font-semibold text-gray-900">{q}</p><p className="text-sm text-gray-500">{a}</p></div>)}
        </div>
      </div>
    </section>
  );
}
