import { Button } from "@/components/atoms/Button";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta?: string;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  badge,
  cta = "Empezar gratis",
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
        <p className={`text-sm ${highlighted ? "text-violet-200" : "text-gray-500"}`}>{description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
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

      <Button
        href="#registro"
        variant={highlighted ? "secondary" : "outline"}
        size="md"
        className="w-full justify-center"
      >
        {cta}
      </Button>
    </div>
  );
}
