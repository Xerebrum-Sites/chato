"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { PricingCard } from "@/components/molecules/PricingCard";

const API_URL = "https://chato-api.xerebrumgroup.com";

interface PlanData {
  id: string;
  name: string;
  slug: string;
  features: Record<string, unknown>;
  price_ars: number | null;
  price_usd: number | null;
}

// Map backend slugs to landing display config
const PLAN_CONFIG: Record<string, {
  displayName: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}> = {
  starter: {
    displayName: "Starter",
    description: "Para emprendedores que están dando sus primeros pasos con IA.",
    features: [
      "1 canal de atención",
      "Prompt personalizado",
      "Conversaciones ilimitadas",
      "14 días gratis",
    ],
    highlighted: false,
    cta: "Empezar gratis",
  },
  pro: {
    displayName: "Pro",
    description: "Para negocios activos con múltiples canales y bot de respuesta.",
    features: [
      "Hasta 3 canales (WhatsApp, IG, Web...)",
      "Bot con IA activado",
      "Documentos y base de conocimiento (RAG)",
      "Horarios automáticos de atención",
      "Prompt personalizado",
      "14 días gratis",
    ],
    highlighted: true,
    badge: "Más popular",
    cta: "Empezar gratis",
  },
  business: {
    displayName: "Business",
    description: "Sin límites. Para equipos que escalan en todos los canales.",
    features: [
      "Canales ilimitados",
      "Bot con IA en todos los canales",
      "RAG ilimitado",
      "Horarios automáticos",
      "Soporte prioritario",
      "Prompt personalizado",
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

function getPeriodLabel(priceUsd: number | null, currency: Currency): string {
  if (priceUsd === 0 || priceUsd === null) return "";
  return "/mes";
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

  const currencyLabel: Record<Currency, string> = {
    ARS: "🇦🇷 ARS",
    USD: "🇺🇸 USD",
    BRL: "🇧🇷 BRL",
  };

  // Merge API data with display config
  const displayPlans = (["starter", "pro", "business"] as const).map((slug) => {
    const apiPlan = plans.find((p) => p.slug === slug);
    const config = PLAN_CONFIG[slug];
    return {
      slug,
      name: config.displayName,
      price: loading
        ? "..."
        : formatPrice(apiPlan?.price_ars ?? null, apiPlan?.price_usd ?? null, currency, usdToBrl),
      period: loading ? "" : getPeriodLabel(apiPlan?.price_usd ?? null, currency),
      description: config.description,
      features: config.features,
      highlighted: config.highlighted,
      badge: config.badge,
      cta: config.cta,
    };
  });

  return (
    <section id="precios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="green" className="mb-4">
            Precios simples
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Tan accesible como debería ser{" "}
            <span className="gradient-text">la tecnología</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Sin tarifas por canal. Sin contratos anuales. Sin sorpresas en la factura.
            14 días gratis en todos los planes.
          </p>

          {/* Currency toggle */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {(["ARS", "USD", "BRL"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  currency === c
                    ? "bg-violet-700 text-white shadow"
                    : "bg-white border border-gray-200 text-gray-500 hover:border-violet-300"
                }`}
              >
                {currencyLabel[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-center">
          {displayPlans.map((plan) => (
            <PricingCard key={plan.slug} {...plan} />
          ))}
        </div>

        {/* FAQ mini */}
        <div className="mt-14 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { q: "¿Necesito tarjeta para probar?", a: "No. Los 14 días de prueba son completamente gratis y sin tarjeta." },
            { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalizaciones. Cancelas en un clic." },
            { q: "¿Qué pasa si supero el límite?", a: "Te avisamos antes. Puedes subir de plan o pagar solo las conversaciones extra." },
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
