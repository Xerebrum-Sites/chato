"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { InfinityTrails } from "@/components/atoms/InfinityTrails";
import { Button } from "@/components/atoms/Button";
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
  features: Record<string, unknown>;
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

const families = ["credits", "storage", "mobile"] as const;
const copy = {
  credits: ["Créditos IA", "Elegí un cupo mensual. Los agentes consumen créditos cuando procesan consultas y generan respuestas."],
  storage: ["Almacenamiento", "Elegí la capacidad que necesita tu equipo para conservar los archivos y adjuntos de las conversaciones."],
  mobile: ["App móvil", "Sumá el acceso desde el celular para quienes atienden fuera del escritorio."],
};

const capabilities: Record<string, string> = {
  webchat_enabled: "Chat en vivo para tu sitio web",
  departments_enabled: "Organización por departamentos",
  schedules_enabled: "Horarios de atención",
  bot_enabled: "Atención con agentes de IA",
  rag_enabled: "Base de conocimiento para respuestas con contexto",
  custom_prompt: "Instrucciones personalizadas para la IA",
  agent_tools_enabled: "Herramientas para agentes de IA",
  agent_routing_llm_enabled: "Enrutamiento inteligente de conversaciones",
  priority_support: "Soporte prioritario",
};
const limits: Record<string, [string, string]> = {
  max_channels: ["Canales conectados", "Canales sin límite"],
  max_departments: ["Departamentos", "Departamentos sin límite"],
  max_ai_agents: ["Agentes IA", "Agentes IA sin límite"],
  max_faqs: ["Preguntas frecuentes", "Preguntas frecuentes sin límite"],
  max_bot_channels: ["Canales con bot", "Canales con bot sin límite"],
};
function coreFeatures(plan: PlanData | null) {
  const items = ["Bandeja omnicanal con historial por cliente", "Asignación y seguimiento de conversaciones", "Trabajo en equipo con usuarios sin cargo adicional"];
  for (const [key, value] of Object.entries(plan?.features ?? {})) {
    if (value === true && capabilities[key]) items.push(capabilities[key]);
    if (typeof value === "number" && limits[key]) {
      const [label, unlimited] = limits[key];
      if (value === -1) items.push(unlimited);
      if (value > 0) items.push(label + " · hasta " + value);
    }
  }
  return items;
}

async function getPublic<T>(path: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(API_URL + "/api/public/" + path, { signal, cache: "no-store" });
  if (!response.ok) throw new Error("Catálogo no disponible");
  return response.json();
}

export function Pricing() {
  const currency = usePricingCurrency();
  const trialDays = useTrialDays();
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [catalog, setCatalog] = useState<QuoteCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState({ credits: "", storage: "", mobile: "" });
  const [result, setResult] = useState<{ key: string; quote: Quote | null } | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function load() {
      try {
        const data = await getPublic<QuoteCatalog>("quote-catalog", signal);
        if (signal.aborted) return;
        setPlan(data.workstation);
        setCatalog(data);
      } catch {
        if (signal.aborted) return;
        const plans = await getPublic<PlanData[]>("plans", signal).catch(() => []);
        if (!signal.aborted) setPlan(plans.find(p => p.slug === BASE_PLAN_SLUG) ?? null);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  const request = catalog && currency ? JSON.stringify({
    plan_id: catalog.workstation.id,
    option_ids: families.map(family => selection[family]).filter(Boolean),
    currency, billing_cycle: cycle,
  }) : "";
  useEffect(() => {
    if (!request) return;
    const controller = new AbortController();
    async function calculate() {
      try {
        const response = await fetch(API_URL + "/api/public/quote", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: request, signal: controller.signal,
        });
        if (!response.ok) throw new Error("Cotización no disponible");
        const quote: Quote = await response.json();
        if (!controller.signal.aborted) setResult({ key: request, quote });
      } catch {
        if (!controller.signal.aborted) setResult({ key: request, quote: null });
      }
    }
    void calculate();
    return () => controller.abort();
  }, [request, attempt]);

  const annual = cycle === "annual";
  const quote = result?.key === request ? result.quote : null;
  const failed = Boolean(request && result?.key === request && !quote);
  const monthlyBase = currency === "ARS" ? plan?.price_ars : plan?.price_usd;
  const annualBase = currency === "ARS" ? plan?.price_annual_ars : plan?.price_annual_usd;
  const monthlyDisplay = annual && annualBase != null ? annualBase / 12 : monthlyBase;
  const available = currency && monthlyDisplay != null && (!annual || annualBase != null);
  const format = (value: number) => value.toLocaleString(currency === "ARS" ? "es-AR" : "en-US", { maximumFractionDigits: 2 });
  const money = (value: number) => currency + " $" + format(value);
  const missing = quote?.missing_required_families.length;
  return (
    <section id="precios" className="relative isolate overflow-hidden bg-[#fffaf5] pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-15"><InfinityTrails tone="light" /></div>
      <div className="relative mx-auto max-w-6xl px-5">
        <Badge variant="green">Precios transparentes</Badge>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">Tu <span className="gradient-text">Axtroos Workstation</span>, a medida</h1>
        <p className="mt-3 text-gray-600">Configurá los recursos de tu equipo y consultá el costo de tu plataforma.</p>
        <div className="my-7 inline-flex flex-wrap gap-1 rounded-3xl border border-violet-100 bg-white p-1" role="group" aria-label="Contrato">
          {(["monthly", "annual"] as const).map(value => (
            <button key={value} type="button" aria-pressed={cycle === value} onClick={() => setCycle(value)}
              className={`rounded-full px-4 py-2.5 text-sm font-bold ${cycle === value ? "bg-violet-700 text-white" : "text-gray-700"}`}>
              {value === "monthly" ? "Contrato mensual" : "Contrato anual"}
            </button>
          ))}
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="divide-y divide-gray-100 rounded-3xl bg-white px-6 shadow-sm sm:px-8">
            <div className="py-6">
              <h2 className="text-2xl font-bold">{WORKSTATION_NAME}</h2>
              <p className="mt-1 text-sm text-gray-600">Precio de la estación de trabajo</p>
              <p className="mt-3 font-bold">{available ? <>{currency} $ <span className="text-3xl">{format(monthlyDisplay!)}</span> /mes</> : loading ? "Cargando…" : "Precio por confirmar"}</p>
              {annual && available && annualBase != null && <p className="mt-1 text-sm text-gray-600">{money(annualBase)} al año{plan?.annual_discount_pct ? " · " + plan.annual_discount_pct + "% de ahorro en Workstation" : ""}</p>}
            </div>
            {families.map(family => {
              const optional = family === "mobile";
              const options = (catalog?.options ?? []).filter(o => o.family === family).sort((a,b) => (a.quantity ?? 0) - (b.quantity ?? 0));
              const [label, help] = copy[family];
              return (
                <div key={family} className="py-5">
                  <label htmlFor={"option-" + family} className="flex items-center gap-3 font-bold">{label}
                    <span className="rounded-full bg-violet-50 px-2 py-1 text-xs text-violet-700">{optional ? "Opcional" : "Obligatorio"}</span>
                  </label>
                  <p id={"help-" + family} className="my-2 text-sm text-gray-600">{help}</p>
                  <select id={"option-" + family} aria-describedby={"help-" + family} required={!optional} value={selection[family]}
                    disabled={!options.length} onChange={e => setSelection({ ...selection, [family]: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm disabled:bg-gray-50">
                    <option value="">{loading ? "Cargando…" : !options.length ? "Sin opciones publicadas" : optional ? "Sin app móvil" : "Elegí una opción"}</option>
                    {options.map(o => <option key={o.id} value={o.id}>{o.name}{o.quantity != null ? " · " + o.quantity.toLocaleString("es-AR") + " " + (o.unit ?? "") : ""}</option>)}
                  </select>
                </div>
              );
            })}
          </div>
          <aside className="rounded-3xl bg-actros-navy p-6 text-white lg:sticky lg:top-24 sm:p-8">
            <h2 className="text-xl font-bold">Tu contratación</h2>
            <div aria-live="polite" aria-atomic="true">
              {quote && <ul className="my-5 space-y-3">{quote.lines.map(line => (
                <li key={line.id} className="flex justify-between gap-3 text-sm">
                  <span>{line.name}</span><span className="shrink-0">{money(annual ? line.annual_amount : line.monthly_amount)}</span>
                </li>
              ))}</ul>}
              <p className="mt-5 border-t border-white/20 pt-5 text-sm">{missing ? "Subtotal de la selección" : "Total de tu configuración"}</p>
              {quote ? <>
                <p className="mt-1 text-sm font-semibold">{currency} $ <strong className="text-4xl">{format(annual ? quote.annual_total / 12 : quote.monthly_total)}</strong> /mes</p>
                {annual && <p className="mt-2 text-sm">{money(quote.annual_total)} facturados al año{quote.annual_savings > 0 && " · Ahorrás " + money(quote.annual_savings)}</p>}
                {Boolean(missing) && <p className="mt-3 text-sm text-white/80">Para completar el total, elegí {quote.missing_required_families.map(f => f === "credits" ? "créditos IA" : "almacenamiento").join(" y ")}.</p>}
              </> : <p className="mt-3">{loading || (request && !failed) ? "Calculando…" : "No pudimos obtener la cotización."}</p>}
            </div>
            {failed && <button className="mt-3 underline" onClick={() => { setResult(null); setAttempt(n => n + 1); }}>Reintentar cálculo</button>}
            <div className="mt-6"><Button href={URLS.signIn} variant="secondary">Empezar gratis</Button>
              <p className="mt-2 text-sm text-white/75">{trialDays ? trialDays + " días gratis, sin tarjeta" : "Prueba gratis, sin tarjeta"}</p>
            </div>
          </aside>
        </div>
        <section className="mt-12 rounded-3xl bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Qué incluye el Core de Axtroos Workstation</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{coreFeatures(plan).map(item => (
            <li className="flex items-start gap-2 text-sm" key={item}><Check aria-hidden className="h-4 w-4 shrink-0 text-violet-600" />{item}</li>
          ))}</ul>
          <a className="mt-6 inline-block font-semibold text-violet-700 underline" href="/herramientas/">Explorar módulos adicionales del Marketplace</a>
        </section>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            ["¿Necesito tarjeta para probar?", "Podés iniciar la prueba sin tarjeta de crédito."],
            ["¿Pago por canal o por usuario?", "Los canales y los usuarios están incluidos en Workstation."],
            ["¿Cómo se calcula el total?", "El catálogo vigente determina el precio de la estación y de los recursos seleccionados."],
          ].map(([question, answer]) => (
            <div key={question} className="rounded-2xl bg-white p-5 text-sm">
              <h3 className="font-bold">{question}</h3><p className="mt-2 text-gray-600">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
