import { Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export interface PriceDisplay {
  currency: string;
  symbol: string;
  amount: string;
  period: string;
}

interface PricingCardProps {
  name: string;
  description: string;
  /** Precio a mostrar; null cuando todavía no hay precio publicado. */
  price: PriceDisplay | null;
  /** El precio aún se está resolviendo (catálogo o moneda). */
  loading?: boolean;
  /** Texto del descuento anual (p. ej. «Ahorrás 20%»), solo en ciclo anual. */
  annualSavings?: string | null;
  /** Pista bajo el precio mensual: lo que se ahorra pagando anual. */
  annualHint?: string | null;
  /** Qué se muestra cuando no hay precio publicado. */
  unpricedLabel: string;
  unpricedNote: string;
  includes: string[];
  trialLabel?: string | null;
  cta: string;
  ctaHref: string;
}

export function PricingCard({
  name,
  description,
  price,
  loading = false,
  annualSavings,
  annualHint,
  unpricedLabel,
  unpricedNote,
  includes,
  trialLabel,
  cta,
  ctaHref,
}: PricingCardProps) {
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-violet-200 bg-white p-6 shadow-xl shadow-violet-100 sm:p-10">
      <div className="mb-8 text-center">
        <h3 className="mb-1 text-lg font-bold text-violet-700">{name}</h3>
        <p className="mx-auto mb-6 max-w-md text-sm text-gray-500">{description}</p>

        <div aria-live="polite" className="flex min-h-24 flex-col items-center justify-center">
          {loading ? (
            <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-100" aria-label="Cargando precio" />
          ) : price ? (
            <>
              <div className="flex flex-wrap items-end justify-center gap-x-1.5 gap-y-1">
                <span className="text-base font-black leading-none text-gray-900">
                  {price.currency} {price.symbol}
                </span>
                <span className="text-5xl font-black leading-none text-gray-900">{price.amount}</span>
                <span className="pb-0.5 text-sm text-gray-500">{price.period}</span>
              </div>
              {annualSavings && (
                <span className="mt-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-700">
                  {annualSavings}
                </span>
              )}
              {annualHint && <p className="mt-3 text-xs font-semibold text-emerald-700">{annualHint}</p>}
            </>
          ) : (
            <>
              <p className="text-4xl font-black text-gray-900">{unpricedLabel}</p>
              <p className="mt-2 max-w-sm text-sm text-gray-500">{unpricedNote}</p>
            </>
          )}
        </div>
      </div>

      <div className="mb-8 border-t border-gray-100 pt-8">
        <h4 className="mb-4 text-xs font-black uppercase tracking-wider text-gray-600">Incluye</h4>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-sm text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {trialLabel && price && <p className="mb-3 text-center text-xs font-semibold text-gray-500">{trialLabel}</p>}

      <Button href={ctaHref} variant={price ? "primary" : "outline"} size="md" className="mt-auto w-full justify-center sm:mx-auto sm:max-w-xs">
        {cta}
      </Button>
    </div>
  );
}
