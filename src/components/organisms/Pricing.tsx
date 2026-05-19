import { Badge } from "@/components/atoms/Badge";
import { PricingCard } from "@/components/molecules/PricingCard";

const plans = [
  {
    name: "Emprendedor",
    price: "$9",
    period: "/mes",
    description: "Perfecto para negocios unipersonales que están empezando.",
    features: [
      "1 agente (tú mismo)",
      "WhatsApp + 1 canal adicional",
      "100 conversaciones/mes",
      "Respuestas rápidas ilimitadas",
      "Historial 30 días",
      "Soporte vía Telegram",
    ],
    highlighted: false,
    cta: "Empezar gratis",
  },
  {
    name: "Comercio",
    price: "$24",
    period: "/mes",
    description: "Para negocios activos que atienden varios canales y tienen equipo.",
    features: [
      "Hasta 3 agentes",
      "Todos los canales (WhatsApp, IG, FB, Web, Email)",
      "Conversaciones ilimitadas",
      "Respuestas automáticas y bots básicos",
      "Etiquetas y seguimiento de clientes",
      "Dashboard de métricas",
      "Historial 6 meses",
      "Alertas de mensajes sin respuesta",
    ],
    highlighted: true,
    badge: "Más popular",
    cta: "Empezar gratis",
  },
  {
    name: "Equipo",
    price: "$49",
    period: "/mes",
    description: "Para negocios en crecimiento con múltiples puntos de atención.",
    features: [
      "Hasta 10 agentes",
      "Todos los canales",
      "Conversaciones ilimitadas",
      "Bots avanzados y automatizaciones",
      "Integraciones vía API",
      "Reportes exportables",
      "Historial ilimitado",
      "Soporte prioritario",
    ],
    highlighted: false,
    cta: "Hablar con ventas",
  },
];

export function Pricing() {
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
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
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
