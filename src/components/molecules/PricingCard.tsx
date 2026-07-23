import { Button } from "@/components/atoms/Button";
import { URLS } from "@/lib/config";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  baseFeatures: string[];
  advancedFeatures?: string[];
  highlighted?: boolean;
  badge?: string;
  cta?: string;
  slug?: string;
  /** Destino del botón (registro por defecto; contacto para planes de ventas). */
  ctaHref?: string;
  /** Shown under the price when annual cycle is active and discount > 0. */
  annualSavings?: string | null;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  baseFeatures,
  advancedFeatures,
  highlighted = false,
  badge,
  cta = "Empezar gratis",
  ctaHref = URLS.signIn,
  annualSavings,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 ${
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

      <div className="mb-6">
        <h3 className={`font-bold text-lg mb-1 ${highlighted ? "text-violet-200" : "text-gray-500"}`}>
          {name}
        </h3>
        <div className="flex items-end gap-1 mb-2">
          <span className={`text-4xl font-black ${highlighted ? "text-white" : "text-gray-900"}`}>
            {price}
          </span>
          {period && (
            <span className={`text-sm pb-1.5 ${highlighted ? "text-violet-300" : "text-gray-400"}`}>
              {period}
            </span>
          )}
        </div>
        {annualSavings && (
          <p className={`text-xs font-semibold mb-2 ${highlighted ? "text-emerald-300" : "text-emerald-600"}`}>
            ✨ {annualSavings}
          </p>
        )}
        <p className={`text-sm ${highlighted ? "text-violet-200" : "text-gray-500"}`}>{description}</p>
      </div>

      <div className="space-y-6 mb-8">
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
              Modo Avanzado
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

      <Button
        href={ctaHref}
        variant={highlighted ? "secondary" : "outline"}
        size="md"
        className="w-full justify-center"
      >
        {cta}
      </Button>
    </div>
  );
}
