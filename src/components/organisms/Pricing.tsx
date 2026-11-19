"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Puzzle } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { PricingCard, type PriceDisplay } from "@/components/molecules/PricingCard";
import { URLS } from "@/lib/config";
import { type PricingCurrency, usePricingCurrency } from "@/hooks/usePricingCurrency";
import { useTrialDays } from "@/hooks/useTrialDays";

const API_URL = URLS.api;
const BASE_PLAN_SLUG = "base";
const WORKSTATION_NAME = "Axtroos Workstation";

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

interface QuoteOption {
  id: string;
  name: string;
  family: "credits" | "storage" | "mobile";
  quantity: number | null;
  unit: string | null;
}

interface QuoteCatalog {
  workstation: PlanData;
  options: QuoteOption[];
}

interface QuoteLine {
  id: string;
  name: string;
  family: string | null;
  quantity: number | null;
  unit: string | null;
  monthly_amount: number;
  annual_amount: number;
}

interface Quote {
  currency: PricingCurrency;
  billing_cycle: BillingCycle;
  lines: QuoteLine[];
  monthly_total: number;
  annual_total: number;
  annual_savings: number;
  missing_required_families: string[];
}

type BillingCycle = "monthly" | "annual";

const PLAN_INCLUDES = [
  "Bandeja omnicanal para tu operación",
  "Canales y usuarios sin cargo adicional",
  "Departamentos y trabajo en equipo",
  "Recursos configurables según tu operación",
];

const CURRENCIES: PricingCurrency[] = ["ARS", "USD"];

const FAMILY_COPY: Record<QuoteOption["family"], { label: string; placeholder: string; required: boolean }> = {
  credits: { label: "Créditos IA", placeholder: "Elegí créditos para tu operación", required: true },
  storage: { label: "Almacenamiento", placeholder: "Elegí almacenamiento", required: true },
  mobile: { label: "App móvil", placeholder: "Sin app móvil", required: false },
};

function priceFor(plan: PlanData | null, currency: PricingCurrency | null, annual: boolean): number | null {
  if (!plan || !currency) return null;
  const value = currency === "ARS" ? (annual ? plan.price_annual_ars : plan.price_ars) : annual ? plan.price_annual_usd : plan.price_usd;
  return typeof value === "number" && value > 0 ? value : null;
}

function formatAmount(price: number, currency: PricingCurrency): string {
  return price.toLocaleString(currency === "ARS" ? "es-AR" : "en-US", currency === "ARS" ? { maximumFractionDigits: 0 } : { minimumFractionDigits: Number.isInteger(price) ? 0 : 2, maximumFractionDigits: 2 });
}

function priceDisplay(price: number | null, currency: PricingCurrency, period: string): PriceDisplay | null {
  if (price === null) return null;
  return { currency, symbol: "$", amount: formatAmount(price, currency), period };
}

function toggleClass(active: boolean): string {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
    active ? "bg-violet-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
  }`;
}

function optionLabel(option: QuoteOption): string {
  return option.quantity ? `${option.name} · ${option.quantity.toLocaleString("es-AR")} ${option.unit ?? ""}` : option.name;
}

export function Pricing() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [catalog, setCatalog] = useState<QuoteCatalog | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [currencyChoice, setCurrencyChoice] = useState<PricingCurrency | null>(null);
  const [loading, setLoading] = useState(true);
  const quoteRequest = useRef(0);
  const detectedCurrency = usePricingCurrency();
  const trialDays = useTrialDays();
  const currency = currencyChoice ?? detectedCurrency;

  useEffect(() => {
    async function loadPricing() {
      const [plansResult, catalogResult] = await Promise.all([
        fetch(`${API_URL}/api/public/plans`).then((response) => response.json()).then((data) => Array.isArray(data) ? data : []).catch(() => []) as Promise<PlanData[]>,
        fetch(`${API_URL}/api/public/quote-catalog`).then((response) => response.ok ? response.json() : null).catch(() => null) as Promise<QuoteCatalog | null>,
      ]);
      setPlans(plansResult);
      setCatalog(catalogResult);
      setLoading(false);
    }
    loadPricing();
  }, []);

  const plan = catalog?.workstation ?? plans.find((item) => item.slug === BASE_PLAN_SLUG && item.is_visible_landing !== false) ?? null;
  const monthlyPrice = priceFor(plan, currency, false);
  const annualPrice = priceFor(plan, currency, true);
  const cycle: BillingCycle = billingCycle === "annual" && (quote || annualPrice !== null) ? "annual" : "monthly";
  const fallbackPrice = cycle === "annual" ? annualPrice : monthlyPrice;
  const discount = plan?.annual_discount_pct ?? 0;
  const discountLabel = discount > 0 ? `${discount.toFixed(0)}%` : null;
  const resolving = loading || currency === null;
  const quotePrice = quote ? (cycle === "annual" ? quote.annual_total : quote.monthly_total) : fallbackPrice;
  const hasPrice = !resolving && quotePrice !== null && currency !== null;
  const trialLabel = trialDays ? `${trialDays} días gratis, sin tarjeta` : "Prueba gratis, sin tarjeta";

  const optionsByFamily = useMemo(() => {
    const groups: Record<QuoteOption["family"], QuoteOption[]> = { credits: [], storage: [], mobile: [] };
    catalog?.options.forEach((option) => groups[option.family].push(option));
    return groups;
  }, [catalog]);

  useEffect(() => {
    if (!catalog || !currency) return;
    const controller = new AbortController();
    const requestId = ++quoteRequest.current;
    fetch(`${API_URL}/api/public/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan_id: catalog.workstation.id, option_ids: selectedOptionIds, currency, billing_cycle: billingCycle }),
      signal: controller.signal,
    })
      .then((response) => response.ok ? response.json() : null)
      .then((data: Quote | null) => {
        if (requestId === quoteRequest.current) setQuote(data);
      })
      .catch(() => {
        if (!controller.signal.aborted && requestId === quoteRequest.current) setQuote(null);
      })
    return () => controller.abort();
  }, [billingCycle, catalog, currency, selectedOptionIds]);

  function selectOption(family: QuoteOption["family"], id: string | null) {
    setSelectedOptionIds((current) => [
      ...current.filter((optionId) => !optionsByFamily[family].some((option) => option.id === optionId)),
      ...(id ? [id] : []),
    ]);
  }

  return (
    <section id="precios" className="bg-gray-50 pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="green" className="mb-4">Precios transparentes</Badge>
          <h2 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl">Tu <span className="gradient-text">Axtroos Workstation</span>, a medida</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">La estación de trabajo omnicanal para tu equipo. Configurá los recursos de tu operación y conocé el costo de tu plataforma.{trialDays ? ` ${trialDays} días gratis para probar, sin tarjeta.` : " Prueba gratis, sin tarjeta."}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div role="group" aria-label="Ciclo de facturación" className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              <button type="button" aria-pressed={cycle === "monthly"} onClick={() => setBillingCycle("monthly")} className={toggleClass(cycle === "monthly")}>Mensual</button>
              <button type="button" aria-pressed={cycle === "annual"} disabled={!resolving && annualPrice === null && !quote} title={!resolving && annualPrice === null && !quote ? "Facturación anual no disponible" : undefined} onClick={() => setBillingCycle("annual")} className={toggleClass(cycle === "annual")}>Anual{cycle !== "annual" && discountLabel && <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald-700">Ahorrás {discountLabel}</span>}</button>
            </div>
            <div role="group" aria-label="Moneda" className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              {CURRENCIES.map((option) => <button key={option} type="button" aria-pressed={currency === option} onClick={() => setCurrencyChoice(option)} className={toggleClass(currency === option)}>{option}</button>)}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <PricingCard name={WORKSTATION_NAME} description="La base de tu operación, con los recursos que elegís para tu equipo." price={hasPrice && currency ? priceDisplay(quotePrice, currency, cycle === "annual" ? "/año" : "/mes") : null} loading={resolving} annualSavings={cycle === "annual" && quote && quote.annual_savings > 0 && currency ? `Ahorrás ${currency} $${formatAmount(quote.annual_savings, currency)} al año` : null} annualHint={cycle === "monthly" && quote && quote.annual_savings > 0 && currency ? `Pagando anual ahorrás ${currency} $${formatAmount(quote.annual_savings, currency)}` : cycle === "monthly" && discountLabel ? `Pagando anual ahorrás ${discountLabel}` : null} unpricedLabel="Consultanos" unpricedNote="Estamos preparando el precio de esta configuración. Escribinos y te ayudamos a armarla." includes={PLAN_INCLUDES} trialLabel={trialLabel} cta={hasPrice || resolving ? "Empezar gratis" : "Hablar con nosotros"} ctaHref={hasPrice || resolving ? URLS.signIn : "/contacto/"} />

          <aside className="rounded-2xl border border-violet-100 bg-white p-6 shadow-lg shadow-violet-100 sm:p-8" aria-label="Cotizador de Axtroos Workstation">
            <div className="mb-6"><p className="text-sm font-black uppercase tracking-wider text-violet-700">Configurá tu plataforma</p><h3 className="mt-2 text-2xl font-black text-gray-900">Cotizador</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">Elegí los recursos que necesita tu operación. Los importes se consultan al catálogo de Axtroos.</p></div>
            <div className="space-y-5">
              {(["credits", "storage"] as const).map((family) => {
                const selected = selectedOptionIds.find((id) => optionsByFamily[family].some((option) => option.id === id)) ?? "";
                return <label key={family} className="block"><span className="mb-2 flex items-center justify-between text-sm font-bold text-gray-800"><span>{FAMILY_COPY[family].label}</span><span className="text-xs font-semibold text-violet-600">Obligatorio</span></span><select value={selected} onChange={(event) => selectOption(family, event.target.value || null)} disabled={loading || optionsByFamily[family].length === 0} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-gray-50"><option value="">{optionsByFamily[family].length ? FAMILY_COPY[family].placeholder : "No disponible por ahora"}</option>{optionsByFamily[family].map((option) => <option key={option.id} value={option.id}>{optionLabel(option)}</option>)}</select></label>;
              })}
              {optionsByFamily.mobile.length > 0 && <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4"><span><span className="block text-sm font-bold text-gray-800">App móvil</span><span className="mt-1 block text-xs text-gray-500">Sumala si tu equipo también necesita operar desde el celular.</span></span><input type="checkbox" checked={selectedOptionIds.some((id) => optionsByFamily.mobile.some((option) => option.id === id))} onChange={(event) => selectOption("mobile", event.target.checked ? optionsByFamily.mobile[0].id : null)} className="h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500" /></label>}
            </div>
            {quote && <div className="mt-6 border-t border-gray-100 pt-5"><p className="mb-3 text-xs font-black uppercase tracking-wider text-gray-500">Tu configuración</p><ul className="space-y-2">{quote.lines.map((line) => <li key={line.id} className="flex items-start justify-between gap-3 text-sm"><span className="text-gray-600">{line.name}{line.quantity ? ` · ${line.quantity.toLocaleString("es-AR")} ${line.unit ?? ""}` : ""}</span><span className="shrink-0 font-semibold text-gray-900">{currency} ${formatAmount(cycle === "annual" ? line.annual_amount : line.monthly_amount, currency ?? "USD")}{cycle === "annual" ? "/año" : "/mes"}</span></li>)}</ul>{quote.missing_required_families.length > 0 && <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">Elegí las opciones obligatorias para completar tu configuración.</p>}</div>}
          </aside>
        </div>

        <div className="mx-auto mt-6 flex max-w-5xl items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:items-center"><span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600"><Puzzle className="h-5 w-5" aria-hidden="true" /></span><p className="text-sm text-gray-600"><strong className="text-gray-900">Expandí tu operación cuando lo necesites.</strong> Los módulos del Marketplace se activan sobre tu plataforma sin perder el historial ni el contexto. <a href="/herramientas/" className="font-semibold text-violet-700 underline underline-offset-2 hover:text-violet-900">Ver módulos</a></p></div>
        <div className="mt-14 grid gap-6 text-center sm:grid-cols-3">{[{ q: "¿Necesito tarjeta para probar?", a: trialDays ? `No. Los ${trialDays} días de prueba son completamente gratis y sin tarjeta de crédito.` : "No. La prueba es completamente gratis y sin tarjeta de crédito." }, { q: "¿Pago por canal o por usuario?", a: "No. Los canales y los usuarios no tienen cargo adicional en Axtroos Workstation." }, { q: "¿Cómo se calcula el total?", a: "Es la suma de la Workstation y los recursos que elegís desde el catálogo vigente." }].map(({ q, a }) => <div key={q} className="rounded-2xl border border-gray-100 bg-white p-5"><p className="mb-2 text-sm font-semibold text-gray-900">{q}</p><p className="text-sm text-gray-500">{a}</p></div>)}</div>
      </div>
    </section>
  );
}
