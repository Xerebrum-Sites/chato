"use client";

import { useEffect, useState } from "react";
import { Puzzle } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { PricingCard, type PriceDisplay } from "@/components/molecules/PricingCard";
import { URLS } from "@/lib/config";
import { type PricingCurrency, usePricingCurrency } from "@/hooks/usePricingCurrency";

const API_URL = URLS.api;
const BASE_PLAN_SLUG = "base";

interface PlanData {
  id: string;
  name: string;
  slug: string;
  price_ars: number | null;
  price_usd: number | null;
  annual_discount_pct?: number | null;
  price_annual_ars?: number | null;
  price_annual_usd?: number | null;
  is_visible_landing?: boolean;
}

interface TrialData {
  trial_days: number;
}

type BillingCycle = "monthly" | "annual";

// El catálogo publica el precio; lo que incluye el plan es presentación y no
// lleva cifras (créditos, GB) mientras la API no las exponga.
const PLAN_INCLUDES = [
  "Canales de atención sin cargo adicional",
  "Usuarios sin cargo adicional",
  "Departamentos incluido",
  "Modelos de IA disponibles: el costo se controla con créditos según el peso de cada modelo",
];

const CURRENCIES: PricingCurrency[] = ["ARS", "USD"];

function priceFor(plan: PlanData | null, currency: PricingCurrency | null, annual: boolean): number | null {
  if (!plan || !currency) return null;
  const value = currency === "ARS" ? (annual ? plan.price_annual_ars : plan.price_ars) : annual ? plan.price_annual_usd : plan.price_usd;
  return typeof value === "number" && value > 0 ? value : null;
}

function priceDisplay(price: number | null, currency: PricingCurrency, period: string): PriceDisplay | null {
  if (price === null) return null;
  return {
    currency,
    symbol: "$",
    amount: price.toLocaleString(currency === "ARS" ? "es-AR" : "en-US", currency === "ARS" ? { maximumFractionDigits: 0 } : { minimumFractionDigits: Number.isInteger(price) ? 0 : 2, maximumFractionDigits: 2 }),
    period,
  };
}

function toggleClass(active: boolean): string {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
    active ? "bg-violet-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
  }`;
}

export function Pricing() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [trialDays, setTrialDays] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [currencyChoice, setCurrencyChoice] = useState<PricingCurrency | null>(null);
  const [loading, setLoading] = useState(true);
  const detectedCurrency = usePricingCurrency();
  const currency = currencyChoice ?? detectedCurrency;

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
  const plan = visiblePlans.find((item) => item.slug === BASE_PLAN_SLUG) ?? visiblePlans[0] ?? null;

  const monthlyPrice = priceFor(plan, currency, false);
  const annualPrice = priceFor(plan, currency, true);
  const cycle: BillingCycle = billingCycle === "annual" && annualPrice !== null ? "annual" : "monthly";
  const shownPrice = cycle === "annual" ? annualPrice : monthlyPrice;
  const discount = plan?.annual_discount_pct ?? 0;
  const discountLabel = annualPrice !== null && discount > 0 ? `${discount.toFixed(0)}%` : null;
  const resolving = loading || currency === null;
  const hasPrice = !resolving && shownPrice !== null && currency !== null;
  const trialLabel = trialDays ? `${trialDays} días gratis, sin tarjeta` : null;

  return (
    <section id="precios" className="bg-gray-50 pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="green" className="mb-4">Precios transparentes</Badge>
          <h2 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl">Un solo plan, <span className="gradient-text">sumás lo que necesitás</span></h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            Una suscripción base con la bandeja omnicanal y sin escalones. Lo demás se suma por módulo desde el Marketplace.
            {trialDays ? ` ${trialDays} días gratis para probar, sin tarjeta.` : ""}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div role="group" aria-label="Ciclo de facturación" className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              <button type="button" aria-pressed={cycle === "monthly"} onClick={() => setBillingCycle("monthly")} className={toggleClass(cycle === "monthly")}>Mensual</button>
              <button type="button" aria-pressed={cycle === "annual"} disabled={!resolving && annualPrice === null} title={!resolving && annualPrice === null ? "Facturación anual no disponible" : undefined} onClick={() => setBillingCycle("annual")} className={toggleClass(cycle === "annual")}>
                Anual{cycle !== "annual" && discountLabel && <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald-700">Ahorrás {discountLabel}</span>}
              </button>
            </div>
            <div role="group" aria-label="Moneda" className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              {CURRENCIES.map((option) => (
                <button key={option} type="button" aria-pressed={currency === option} onClick={() => setCurrencyChoice(option)} className={toggleClass(currency === option)}>{option}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <PricingCard
            name={plan?.name ?? "Plan base"}
            description="Todo lo que necesitás para atender a tus clientes desde una sola bandeja."
            price={hasPrice ? priceDisplay(shownPrice, currency, cycle === "annual" ? "/año" : "/mes") : null}
            loading={resolving}
            annualSavings={cycle === "annual" && discountLabel ? `Ahorrás ${discountLabel}` : null}
            annualHint={cycle === "monthly" && discountLabel ? `Pagando anual ahorrás ${discountLabel}` : null}
            unpricedLabel="Consultanos"
            unpricedNote={plan && (monthlyPrice !== null || annualPrice !== null) ? "Todavía no publicamos este precio en esta moneda. Escribinos y te lo confirmamos." : "Estamos definiendo el precio. Escribinos y te contamos cómo empezar."}
            includes={PLAN_INCLUDES}
            trialLabel={trialLabel}
            cta={hasPrice || resolving ? "Empezar gratis" : "Hablar con nosotros"}
            ctaHref={hasPrice || resolving ? URLS.signIn : "/contacto/"}
          />

          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:items-center">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600"><Puzzle className="h-5 w-5" aria-hidden="true" /></span>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">Lo demás se suma por módulo.</strong> Reservas, catálogo, encuestas y más se activan desde el Marketplace, sólo cuando los necesitás.{" "}
              <a href="/herramientas/" className="font-semibold text-violet-700 underline underline-offset-2 hover:text-violet-900">Ver módulos</a>
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 text-center sm:grid-cols-3">
          {[{ q: "¿Necesito tarjeta para probar?", a: trialDays ? `No. Los ${trialDays} días de prueba son completamente gratis y sin tarjeta de crédito.` : "No. La prueba es completamente gratis y sin tarjeta de crédito." }, { q: "¿Pago por canal o por usuario?", a: "No. Los canales y los usuarios no tienen cargo adicional en el plan base." }, { q: "¿Cómo funcionan los módulos?", a: "Se suman a tu factura. Activá sólo las capacidades que necesitás." }].map(({ q, a }) => <div key={q} className="rounded-2xl border border-gray-100 bg-white p-5"><p className="mb-2 text-sm font-semibold text-gray-900">{q}</p><p className="text-sm text-gray-500">{a}</p></div>)}
        </div>
      </div>
    </section>
  );
}
