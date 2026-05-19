import { Badge } from "@/components/atoms/Badge";
import { FeatureCard } from "@/components/molecules/FeatureCard";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    title: "Bandeja unificada real",
    description:
      "Un solo hilo por cliente, aunque te escriba desde 3 canales distintos. No más pestañas abiertas ni mensajes perdidos.",
    highlight: "Sin mensajes duplicados",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Respuestas rápidas con comandos",
    description:
      "Guarda respuestas frecuentes como /precio, /horario, /envios y úsalas con un solo toque directamente desde Telegram.",
    highlight: "Responde 5x más rápido",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Dashboard de rendimiento",
    description:
      "Ve cuántos mensajes atendiste por canal, en qué horarios recibes más, y cuánto tardas en responder. Datos reales para mejorar.",
    highlight: "Métricas accionables",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Múltiples agentes",
    description:
      "Añade a tu equipo: cada agente atiende en su canal asignado, con historial compartido y sin pisarse entre ellos.",
    highlight: "Hasta 5 agentes en plan Base",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Etiquetas y seguimiento",
    description:
      "Marca conversaciones como #prospecto, #pagado, #pendiente. Filtra y retoma seguimientos sin olvidar ningún cliente.",
    highlight: "Sin CRM extra necesario",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Alertas de mensajes sin respuesta",
    description:
      "Si un cliente lleva más de 30 minutos esperando, Telegram te manda una alerta. Nunca más pierdas una venta por tardanza.",
    highlight: "Configurable por tiempo",
  },
];

export function Features() {
  return (
    <section id="caracteristicas" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="violet" className="mb-4">
            Características
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Todo lo que tu comercio necesita,{" "}
            <span className="gradient-text">nada de lo que no</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Diseñado específicamente para pequeños comercios: sin funciones innecesarias,
            sin curvas de aprendizaje, sin contratos anuales.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              highlight={feature.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
