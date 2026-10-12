import { Button } from "@/components/atoms/Button";
import { URLS } from "@/lib/config";

interface PricingCardProps {
  name: string;
  monthlyPrice: PriceDisplay | null;
  annualPrice?: PriceDisplay | null;
  showAnnualPrice: boolean;
  description: string;
  baseFeatures: string[];
  advancedFeatures?: string[];
  highlighted?: boolean;
  badge?: string;
  cta?: string;
  slug?: string;
  /** Destino del botón (registro por defecto; contacto para planes de ventas). */
  ctaHref?: string;
  /** Shown with the annual amount when a discount is available. */
  annualSavings?: string | null;
  trialLabel?: string | null;
}

export interface PriceDisplay {
  currency: string;
  symbol: string;
  amount: string;
  period: string;
}

export function PricingCard({
  name,
  monthlyPrice,
  annualPrice,
  showAnnualPrice,
  description,
  baseFeatures,
  advancedFeatures,
  highlighted = false,
  badge,
  cta = "Empezar gratis",
  ctaHref = URLS.signIn,
  annualSavings,
  trialLabel,
}: PricingCardProps) {
  const mutedText = highlighted ? "text-violet-200" : "text-gray-500";
  const mainText = highlighted ? "text-white" : "text-gray-900";

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl p-8 transition-all duration-300 ${
        highlighted
          ? "bg-gradient-to-br from-violet-700 to-violet-900 text-white shadow-2xl shadow-violet-200 scale-[1.02]"
          : "bg-white border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-6 min-h-[13rem]">
        <h3 className={`mb-1 text-lg font-bold ${mutedText}`}>
          {name}
        </h3>
        <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.16em] ${mutedText}`}>
          Por mes
        </p>
        {monthlyPrice ? (
          <div className="mb-3 flex items-end gap-1">
            <span className={`text-base font-black leading-none ${mainText}`}>
              {monthlyPrice.currency} {monthlyPrice.symbol}
            </span>
            <span className={`text-4xl font-black leading-none ${mainText}`}>
              {monthlyPrice.amount}
            </span>
            <span className={`pb-0.5 text-sm ${highlighted ? "text-violet-300" : "text-gray-400"}`}>
              {monthlyPrice.period}
            </span>
          </div>
        ) : (
          <div className={`mb-3 text-4xl font-black ${mainText}`}>...</div>
        )}
        {showAnnualPrice && annualPrice && (
          <div className={`mb-3 rounded-xl px-3 py-2.5 ${highlighted ? "bg-violet-800/60" : "bg-gray-50"}`}>
            <p className={`mb-1 text-[11px] font-bold uppercase tracking-[0.14em] ${mutedText}`}>
              Facturación anual
            </p>
            <div className="flex items-end gap-1">
              <span className={`text-sm font-black leading-none ${mainText}`}>
                {annualPrice.currency} {annualPrice.symbol}
              </span>
              <span className={`text-2xl font-black leading-none ${mainText}`}>
                {annualPrice.amount}
              </span>
              <span className={`pb-0.5 text-xs ${highlighted ? "text-violet-300" : "text-gray-400"}`}>
                {annualPrice.period}
              </span>
            </div>
            {annualSavings && (
              <p className={`mt-1.5 text-xs font-semibold ${highlighted ? "text-emerald-300" : "text-emerald-600"}`}>
                ✨ {annualSavings}
              </p>
            )}
          </div>
        )}
        <p className={`text-sm ${mutedText}`}>{description}</p>
      </div>

      <div className="mb-8 space-y-6">
        {/* Base Features */}
        <div>
          <h4 className={`text-xs font-black uppercase tracking-wider mb-3 ${
            highlighted ? "text-violet-200" : "text-gray-600"
          }`}>
            Incluye
          </h4>
          <ul className="space-y-2">
            {baseFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    highlighted ? "bg-violet-500 text-white" : "bg-violet-100 text-violet-600"
                  }`}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className={`text-sm ${highlighted ? "text-violet-100" : "text-gray-600"}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Advanced Features (if present) */}
        {advancedFeatures && advancedFeatures.length > 0 && (
          <div className={`pt-4 ${highlighted ? "border-t border-violet-500" : "border-t border-gray-100"}`}>
            <h4 className={`text-xs font-black uppercase tracking-wider mb-3 ${
              highlighted ? "text-cyan-300" : "text-gray-600"
            }`}>
              Capacidades adicionales
            </h4>
            <ul className="space-y-2">
              {advancedFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      highlighted ? "bg-cyan-400 text-violet-900" : "bg-cyan-100 text-cyan-600"
                    }`}
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className={`text-sm ${highlighted ? "text-cyan-100" : "text-gray-600"}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {trialLabel && (
        <p className={`mb-3 text-center text-xs font-semibold ${highlighted ? "text-violet-200" : "text-gray-500"}`}>
          {trialLabel}
        </p>
      )}

      <Button
        href={ctaHref}
        variant={highlighted ? "secondary" : "outline"}
        size="md"
        className="mt-auto w-full justify-center"
      >
        {cta}
      </Button>
    </div>
  );
}
