"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Blocks, Check, Database, MessagesSquare, Smartphone, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { InfinityTrails } from "@/components/atoms/InfinityTrails";
import { Button } from "@/components/atoms/Button";
import { CorporateWorkstation } from "./CorporateWorkstation";
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
const coreGroups = [
  {
    title: "Atención y canales",
    icon: MessagesSquare,
    standard: ["Bandeja omnicanal con historial por cliente"],
    keys: ["webchat_enabled", "max_channels", "schedules_enabled"],
  },
  {
    title: "Equipo y operación",
    icon: Users,
    standard: ["Asignación y seguimiento de conversaciones", "Usuarios sin cargo adicional"],
    keys: ["departments_enabled", "max_departments", "agent_routing_llm_enabled", "priority_support"],
  },
  {
    title: "IA y conocimiento",
    icon: Sparkles,
    standard: [],
    keys: ["bot_enabled", "rag_enabled", "custom_prompt", "agent_tools_enabled", "max_ai_agents", "max_faqs", "max_bot_channels"],
  },
];

function featureLabels(keys: string[], plan: PlanData | null) {
  const items: string[] = [];
  for (const key of keys) {
    const value = plan?.features?.[key];
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
  const mobileOptions = catalog?.options.filter(option => option.family === "mobile") ?? [];
  const groups = coreGroups.map(group => ({
    ...group,
    items: [...group.standard, ...featureLabels(group.keys, plan)],
  })).filter(group => group.items.length > 0);
  return (
    <section id="precios" className="relative isolate overflow-hidden bg-[#fffaf5] pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-15"><InfinityTrails tone="light" /></div>
      <div className="relative mx-auto max-w-6xl px-5">
        <Badge variant="green">Precios transparentes</Badge>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">Tu <span className="gradient-text">Axtroos Workstation</span>, a medida</h1>
        <p className="mt-3 text-gray-600">Configurá los recursos de tu equipo y consultá el costo de tu plataforma.</p>
        <div className="mb-10 mt-7 inline-flex flex-wrap gap-1 rounded-3xl border border-violet-100 bg-white p-1" role="group" aria-label="Contrato">
          {(["monthly", "annual"] as const).map(value => (
            <button key={value} type="button" aria-pressed={cycle === value} onClick={() => setCycle(value)}
              className={`rounded-full px-4 py-2.5 text-sm font-bold ${cycle === value ? "bg-violet-700 text-white" : "text-gray-700"}`}>
              {value === "monthly" ? "Contrato mensual" : "Contrato anual"}
            </button>
          ))}
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="divide-y divide-gray-100 rounded-3xl bg-white px-6 shadow-sm sm:px-8">
            <div className="py-8 sm:py-10">
              <h2 className="text-2xl font-bold">{WORKSTATION_NAME}</h2>
              <p className="mt-1 text-sm text-gray-600">Precio de la estación de trabajo</p>
              <p className="mt-5 font-bold">{available ? <>{currency} $ <span className="text-3xl">{format(monthlyDisplay!)}</span> /mes</> : loading ? "Cargando…" : "Precio por confirmar"}</p>
              {annual && available && annualBase != null && <p className="mt-1 text-sm text-gray-600">{money(annualBase)} al año{plan?.annual_discount_pct ? " · " + plan.annual_discount_pct + "% de ahorro en Workstation" : ""}</p>}
            </div>
            {(["credits", "storage"] as const).map(family => {
              const options = (catalog?.options ?? []).filter(o => o.family === family).sort((a,b) => (a.quantity ?? 0) - (b.quantity ?? 0));
              const [label, help] = copy[family];
              const Icon = family === "credits" ? Sparkles : Database;
              return (
                <fieldset key={family} aria-labelledby={"label-" + family} aria-describedby={"help-" + family} className="min-w-0 py-8">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Icon aria-hidden className="size-5 text-violet-600" />
                    <h3 id={"label-" + family} className="text-xl font-bold">{label}</h3>
                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">Obligatorio</span>
                  </div>
                  <p id={"help-" + family} className="mt-3 max-w-prose text-sm leading-relaxed text-gray-600">{help}</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {options.map(o => (
                      <label key={o.id} className="flex min-w-0 cursor-pointer items-start gap-2 rounded-xl border border-gray-200 p-3 has-checked:border-violet-500 has-checked:bg-violet-50 has-focus-visible:ring-2">
                        <input type="radio" name={family} checked={selection[family] === o.id}
                          onChange={() => setSelection(current => ({ ...current, [family]: o.id }))}
                          className="mt-1 shrink-0 accent-violet-600" />
                        <span className="min-w-0 text-sm leading-snug [overflow-wrap:anywhere]">
                          <strong className="block">{o.name}</strong>
                          {o.quantity != null && <span className="mt-1 block text-gray-600">{o.quantity.toLocaleString("es-AR")} {o.unit}</span>}
                        </span>
                      </label>
                    ))}
                  </div>
                  {!options.length && <p className="text-sm text-gray-500">{loading ? "Cargando opciones…" : "Sin opciones publicadas"}</p>}
                </fieldset>
              );
            })}
            <div className="py-8">
              <label className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 has-checked:border-violet-500 has-checked:bg-violet-50">
                <Smartphone aria-hidden className="mt-1 size-5 shrink-0 text-violet-600" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-bold">App móvil</span>
                  <span className="mt-1 block text-xs font-semibold text-violet-700">Opcional</span>
                  <span className="mt-3 block text-sm leading-relaxed text-gray-600">{copy.mobile[1]}</span>
                  {!loading && !mobileOptions.length && <span className="mt-2 block text-sm text-gray-600">Actualmente fuera del catálogo.</span>}
                </span>
                <input type="checkbox" aria-label="Incluir app móvil" checked={Boolean(selection.mobile)} disabled={!mobileOptions.length}
                  onChange={event => {
                    const id = event.target.checked ? mobileOptions[0].id : "";
                    setSelection(current => ({ ...current, mobile: id }));
                  }}
                  className="mt-1 size-5 shrink-0 accent-violet-600" />
              </label>
              {selection.mobile && mobileOptions.length > 1 && (
                <select aria-label="Variante de app móvil" className="mt-3 w-full rounded-xl border border-gray-200 p-3"
                  value={selection.mobile} onChange={event => setSelection({ ...selection, mobile: event.target.value })}>
                  {mobileOptions.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                </select>
              )}
            </div>
          </div>
          <aside className="rounded-3xl bg-actros-navy p-6 text-white lg:sticky lg:top-24 sm:p-8">
            <h2 className="text-xl font-bold">Tu contratación</h2>
            <div aria-live="polite" aria-atomic="true">
              {quote && <ul className="my-7 space-y-4">{quote.lines.map(line => (
                <li key={line.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm leading-relaxed">
                  <span>{line.name}</span><span className="ml-auto shrink-0 font-semibold tabular-nums">{money(annual ? line.annual_amount : line.monthly_amount)}</span>
                </li>
              ))}</ul>}
              <p className="mt-7 border-t border-white/20 pt-6 text-sm">{missing ? "Subtotal de la selección" : "Total de tu configuración"}</p>
              {quote ? <>
                <p className="mt-1 text-sm font-semibold">{currency} $ <strong className="text-4xl">{format(annual ? quote.annual_total / 12 : quote.monthly_total)}</strong> /mes</p>
                {annual && <div className="mt-4 space-y-2 text-sm">
                  <p>{money(quote.annual_total)} facturados al año</p>
                  {quote.annual_savings > 0 && <p className="font-semibold text-orange-200">Ahorrás {money(quote.annual_savings)} al año</p>}
                </div>}
                {Boolean(missing) && <p className="mt-3 text-sm text-white/80">Para completar el total, elegí {quote.missing_required_families.map(f => f === "credits" ? "créditos IA" : "almacenamiento").join(" y ")}.</p>}
              </> : <p className="mt-3">{loading || (request && !failed) ? "Calculando…" : "No pudimos obtener la cotización."}</p>}
            </div>
            {failed && <button className="mt-3 underline" onClick={() => { setResult(null); setAttempt(n => n + 1); }}>Reintentar cálculo</button>}
            <div className="mt-6"><Button href={URLS.signIn} variant="secondary">Empezar gratis</Button>
              <p className="mt-2 text-sm text-white/75">{trialDays ? trialDays + " días gratis, sin tarjeta" : "Prueba gratis, sin tarjeta"}</p>
            </div>
          </aside>
        </div>
        <div className="mt-10"><CorporateWorkstation /></div>
        <section aria-labelledby="core-title" className="relative isolate mt-16 overflow-hidden rounded-[2rem] border border-orange-100 bg-white px-5 py-9 sm:mt-20 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#ffeadc,transparent_52%)]" />
          <h2 id="core-title" className="max-w-2xl text-balance text-3xl font-black tracking-tight text-actros-navy sm:text-4xl">
            Qué incluye el Core de <span className="gradient-text">Axtroos Workstation</span>
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {groups.map(({ title, icon: Icon, items }) => (
              <div key={title} className="rounded-2xl border border-orange-100 bg-white/90 p-5 sm:p-6">
                <span className="inline-flex rounded-xl bg-violet-50 p-3 text-violet-700"><Icon aria-hidden className="size-5" /></span>
                <h3 className="mt-4 text-lg font-bold text-actros-navy">{title}</h3>
                <ul className="mt-4 space-y-3">
                  {items.map(item => <li className="flex gap-2 text-sm leading-relaxed text-gray-700" key={item}>
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-violet-600" />{item}
                  </li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-orange-100 pt-6">
            <Button href="/herramientas/#modulos" className="max-w-full">
              <Blocks aria-hidden className="size-5 shrink-0" />
              <span>Explorar módulos del Marketplace</span>
              <ArrowUpRight aria-hidden className="size-4 shrink-0" />
            </Button>
          </div>
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
