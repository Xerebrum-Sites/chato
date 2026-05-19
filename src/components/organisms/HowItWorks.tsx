import { Badge } from "@/components/atoms/Badge";

const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Conecta tus canales",
    description:
      "Vincula WhatsApp Business, tu página de Facebook, cuenta de Instagram y tu web en menos de 2 minutos. Sin código, sin complicaciones.",
    detail: "Solo necesitas escanear un QR o pegar un token",
  },
  {
    number: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    title: "Los mensajes llegan a Telegram",
    description:
      "Cada mensaje de cualquier canal aparece en tu Telegram con contexto completo: de dónde viene, quién escribe y el historial de conversación.",
    detail: "Funciona en tu Telegram actual, sin apps nuevas",
  },
  {
    number: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Responde desde donde estés",
    description:
      "Escribe desde Telegram y el mensaje llega al canal original del cliente. WhatsApp, Instagram o Facebook: el cliente recibe en su app favorita.",
    detail: "Tu respuesta llega al canal correcto automáticamente",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">
            Así de simple
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Configurado en{" "}
            <span className="gradient-text">menos de 5 minutos</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Sin conocimientos técnicos, sin IT, sin contratos largos.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-violet-200 via-violet-400 to-cyan-400" />

          <div className="grid lg:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Step number bubble */}
                <div className="relative mb-6 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 text-white flex items-center justify-center shadow-lg shadow-violet-200">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-violet-200 flex items-center justify-center">
                    <span className="text-xs font-black text-violet-700">{i + 1}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.description}</p>
                <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-gray-600">{step.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
