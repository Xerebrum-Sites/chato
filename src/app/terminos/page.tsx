import type { Metadata } from "next";
import Link from "next/link";
import { URLS, EMAILS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Términos y Condiciones – Cható",
  description:
    "Términos y condiciones de uso de Cható: cuentas, planes y facturación, uso aceptable, inteligencia artificial, integraciones y responsabilidad.",
};

const UPDATED = "27 de agosto de 2026";
const EMAIL = EMAILS.legal;
const SITE = URLS.landing;
const APP = URLS.app;

const sections = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los términos",
    content: `
      <p>Estos Términos y Condiciones (los "Términos") rigen el acceso y uso de la plataforma Cható, operada por Xerebrum ("nosotros", "nuestro"), disponible a través de <a href="${SITE}">${SITE}</a> y de la aplicación en <a href="${APP}">${APP}</a>.</p>
      <p>Al crear una cuenta, iniciar sesión o utilizar Cható de cualquier forma, aceptás quedar obligado por estos Términos y por nuestra <a href="/privacidad">Política de Privacidad</a>. Si estás aceptando estos Términos en nombre de una empresa u organización, declarás tener la autoridad para vincularla y las referencias a "vos" incluyen a dicha organización.</p>
      <p>Si no estás de acuerdo con alguna parte de estos Términos, no debés utilizar el servicio.</p>
    `,
  },
  {
    id: "descripcion",
    title: "2. Descripción del servicio",
    content: `
      <p>Cható es una plataforma de mensajería omnicanal que centraliza conversaciones provenientes de WhatsApp, Instagram, Facebook Messenger, chat web, Telegram y email en una única bandeja de entrada, con dos modos de uso:</p>
      <ul>
        <li><strong>Modo Simple:</strong> gestión de la bandeja directamente desde Telegram, sin necesidad de instalar una app adicional.</li>
        <li><strong>Modo Avanzado:</strong> panel de control web con gestión de equipos, automatizaciones, analíticas y agentes de inteligencia artificial.</li>
      </ul>
      <p>El servicio puede incluir herramientas opcionales ("add-ons") como Reservas, Catálogo o Encuestas, activables según el plan contratado. Nos reservamos el derecho de modificar, agregar o discontinuar funcionalidades del servicio, notificando cambios relevantes con antelación razonable cuando sea posible.</p>
    `,
  },
  {
    id: "cuentas",
    title: "3. Cuentas de usuario y registro",
    content: `
      <p>Para usar Cható necesitás crear una cuenta proporcionando información precisa, completa y actualizada (nombre, email, teléfono y datos del negocio). Sos responsable de:</p>
      <ul>
        <li>Mantener la confidencialidad de tus credenciales de acceso.</li>
        <li>Toda actividad que ocurra bajo tu cuenta, incluida la de los miembros de tu equipo que invites.</li>
        <li>Notificarnos de inmediato ante cualquier uso no autorizado o brecha de seguridad.</li>
      </ul>
      <p>Debés tener al menos 18 años y capacidad legal para contratar en tu jurisdicción. Nos reservamos el derecho de suspender o eliminar cuentas con información falsa, duplicada o utilizada para fines fraudulentos.</p>
    `,
  },
  {
    id: "planes-facturacion",
    title: "4. Prueba gratuita, planes y facturación",
    content: `
      <h3>4.1 Prueba gratuita</h3>
      <p>Ofrecemos un período de prueba de 14 días sin necesidad de tarjeta de crédito. Al finalizar la prueba, deberás elegir un plan pago para continuar usando el servicio; de lo contrario, tu cuenta pasará a modo restringido conforme a la sección 6.</p>
      <h3>4.2 Planes y precios</h3>
      <p>Cható ofrece los planes <strong>Starter</strong>, <strong>Pro</strong> y <strong>Business</strong>, con precios publicados en <a href="${SITE}/precios/">${SITE}/precios/</a>, facturables en ciclo mensual o anual y expresados en la moneda disponible según tu país. Los precios pueden actualizarse; los cambios no afectan el ciclo de facturación ya abonado y se notificarán con al menos 15 días de anticipación antes de aplicarse a renovaciones futuras.</p>
      <h3>4.3 Cambios de plan</h3>
      <p>Podés subir o bajar de plan en cualquier momento desde tu cuenta. Los cambios se prorratean automáticamente en tu próxima factura. Los add-ons se facturan de forma adicional según los que actives.</p>
      <h3>4.4 Pagos y renovación</h3>
      <p>Las suscripciones se renuevan automáticamente al final de cada ciclo salvo que canceles antes de la fecha de renovación. El procesamiento de pagos lo realizan proveedores externos; no almacenamos datos completos de tarjetas de crédito.</p>
      <h3>4.5 Reembolsos</h3>
      <p>Los pagos no son reembolsables salvo que la ley aplicable indique lo contrario o que ofrezcamos una excepción a nuestro exclusivo criterio (por ejemplo, un cobro duplicado o un error de facturación).</p>
    `,
  },
  {
    id: "uso-aceptable",
    title: "5. Uso aceptable",
    content: `
      <p>Al usar Cható te comprometés a no:</p>
      <ul>
        <li>Enviar spam, mensajes masivos no solicitados o contenido que infrinja las políticas de WhatsApp, Instagram, Facebook o Telegram.</li>
        <li>Utilizar la plataforma para actividades ilegales, fraudulentas, difamatorias o que violen derechos de terceros.</li>
        <li>Intentar acceder sin autorización a sistemas, cuentas o datos de otros usuarios.</li>
        <li>Realizar ingeniería inversa, descompilar o intentar extraer el código fuente de la plataforma.</li>
        <li>Sobrecargar deliberadamente la infraestructura (ataques de denegación de servicio, scraping masivo, uso abusivo de la API).</li>
        <li>Revender, sublicenciar o redistribuir el acceso al servicio sin autorización expresa por escrito.</li>
        <li>Cargar contenido que incluya malware, virus o código malicioso.</li>
      </ul>
      <p>El incumplimiento de esta sección puede resultar en la suspensión inmediata de la cuenta, sin perjuicio de otras acciones legales que correspondan.</p>
    `,
  },
  {
    id: "contenido-datos",
    title: "6. Contenido del usuario y datos de tus clientes",
    content: `
      <p>Vos sos el titular y responsable del contenido que cargás en Cható (mensajes, adjuntos, catálogos, bases de conocimiento, datos de contactos) y de contar con las bases legales necesarias para tratar los datos personales de tus propios clientes que gestionás a través de la plataforma.</p>
      <p>Nos otorgás una licencia limitada, no exclusiva y revocable para almacenar, procesar y mostrar dicho contenido únicamente con el fin de prestarte el servicio. No usamos tu contenido para entrenar modelos de terceros ni lo compartimos fuera del flujo de atención descrito en nuestra <a href="/privacidad">Política de Privacidad</a>.</p>
      <p>Si cancelás tu cuenta o dejás de pagar, tu contenido se conserva según el período indicado en la sección 6 de la Política de Privacidad y luego se elimina, salvo solicitud expresa de eliminación anticipada a través de nuestra página de <a href="/eliminar-datos">Eliminación de datos</a>.</p>
    `,
  },
  {
    id: "inteligencia-artificial",
    title: "7. Inteligencia artificial y automatizaciones",
    content: `
      <p>Cható ofrece agentes de inteligencia artificial y automatizaciones opcionales que pueden responder mensajes, sugerir respuestas o ejecutar acciones (por ejemplo, mediante bases de conocimiento propias del negocio) según la configuración que definas.</p>
      <ul>
        <li>Las respuestas generadas por IA son asistidas por modelos de lenguaje y <strong>pueden contener errores o imprecisiones</strong>. Sos responsable de revisar y supervisar el comportamiento del asistente configurado para tu negocio.</li>
        <li>Podés escalar cualquier conversación a un operador humano en cualquier momento.</li>
        <li>No garantizamos que las respuestas generadas por IA sean exactas, completas o adecuadas para toda circunstancia; el uso de estas funcionalidades es bajo tu propio criterio y responsabilidad.</li>
        <li>No debés usar los agentes de IA de la plataforma para generar contenido ilegal, engañoso o que infrinja derechos de terceros.</li>
      </ul>
    `,
  },
  {
    id: "integraciones",
    title: "8. Integraciones con terceros",
    content: `
      <p>Cható se integra con plataformas de terceros, incluyendo Meta (WhatsApp Business API, Instagram y Facebook Messenger), Telegram y proveedores de pago. El uso de estas integraciones está sujeto también a los términos y políticas propios de cada plataforma, incluyendo:</p>
      <ul>
        <li><a href="https://developers.facebook.com/policy/" target="_blank" rel="noopener noreferrer">Políticas para Desarrolladores de Meta</a></li>
        <li><a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noopener noreferrer">Términos del Servicio de WhatsApp Business</a></li>
        <li>Términos de servicio de Telegram (Bot API)</li>
      </ul>
      <p>No somos responsables por interrupciones, cambios de API o suspensiones de cuenta impuestas directamente por estas plataformas de terceros. Es tu responsabilidad cumplir con las políticas de uso de cada canal que conectes a tu cuenta de Cható.</p>
    `,
  },
  {
    id: "propiedad-intelectual",
    title: "9. Propiedad intelectual",
    content: `
      <p>La plataforma Cható, su código, diseño, marca, logotipos y documentación son propiedad de Xerebrum y están protegidos por leyes de propiedad intelectual. Estos Términos no te otorgan ningún derecho de propiedad sobre el software, solo una licencia de uso limitada, no exclusiva e intransferible mientras mantengas una cuenta activa.</p>
      <p>Conservás todos los derechos sobre tu propio contenido (marca de tu negocio, catálogos, mensajes) según lo descrito en la sección 6.</p>
    `,
  },
  {
    id: "disponibilidad",
    title: "10. Disponibilidad del servicio y soporte",
    content: `
      <p>Nos esforzamos por mantener Cható disponible de forma continua, pero no garantizamos un servicio ininterrumpido o libre de errores. Podemos realizar mantenimientos programados o de emergencia que impliquen interrupciones temporales, procurando notificarlos con antelación cuando sea posible.</p>
      <p>El nivel de soporte (tiempos de respuesta, canales disponibles) varía según el plan contratado; los planes Business pueden incluir un SLA personalizado acordado por separado.</p>
    `,
  },
  {
    id: "cancelacion",
    title: "11. Cancelación y terminación",
    content: `
      <p>Podés cancelar tu suscripción en cualquier momento desde tu cuenta en <a href="${APP}">${APP}</a> o escribiéndonos a <a href="mailto:${EMAIL}">${EMAIL}</a>. La cancelación tiene efecto al final del ciclo de facturación vigente; no se realizan reembolsos por el período ya iniciado, salvo lo indicado en la sección 4.5.</p>
      <p>Podemos suspender o cancelar tu cuenta, con o sin previo aviso, si:</p>
      <ul>
        <li>Incumplís estos Términos o nuestra Política de Privacidad.</li>
        <li>Existe falta de pago luego de los intentos de cobro correspondientes.</li>
        <li>Detectamos uso fraudulento, abusivo o que ponga en riesgo la plataforma o a otros usuarios.</li>
        <li>Debemos hacerlo para cumplir con una obligación legal.</li>
      </ul>
      <p>Tras la terminación, tu contenido se conserva y elimina según lo descrito en la sección 6.</p>
    `,
  },
  {
    id: "responsabilidad",
    title: "12. Limitación de responsabilidad",
    content: `
      <p>Cható se ofrece "tal cual" y "según disponibilidad". En la medida máxima permitida por la ley aplicable, no garantizamos que el servicio sea ininterrumpido, libre de errores o que cumpla con requisitos específicos no acordados por escrito.</p>
      <p>No seremos responsables por daños indirectos, incidentales, especiales, consecuentes o lucro cesante derivados del uso o la imposibilidad de uso del servicio, incluyendo pérdidas causadas por interrupciones de plataformas de terceros (Meta, Telegram, proveedores de pago) o por respuestas generadas por agentes de IA.</p>
      <p>Nuestra responsabilidad total frente a vos por cualquier reclamo relacionado con el servicio se limita al monto efectivamente abonado por vos en los 6 meses previos al hecho que originó el reclamo.</p>
    `,
  },
  {
    id: "indemnizacion",
    title: "13. Indemnización",
    content: `
      <p>Te comprometés a mantener indemne a Xerebrum, sus directivos, empleados y colaboradores frente a cualquier reclamo, daño o gasto (incluidos honorarios legales razonables) que surja de: (i) tu uso indebido del servicio, (ii) tu incumplimiento de estos Términos, (iii) contenido que hayas cargado a la plataforma, o (iv) tu infracción de derechos de terceros, incluyendo las políticas de las plataformas integradas (Meta, Telegram).</p>
    `,
  },
  {
    id: "modificaciones",
    title: "14. Modificaciones a estos términos",
    content: `
      <p>Podemos actualizar estos Términos para reflejar cambios en el servicio, en la normativa aplicable o en las APIs que integramos. Ante cambios significativos, te notificaremos mediante un aviso en la plataforma o por correo electrónico con al menos 15 días de anticipación. El uso continuado del servicio después de la entrada en vigencia de los cambios implica tu aceptación de los nuevos Términos. La fecha de última actualización siempre estará visible al inicio de este documento.</p>
    `,
  },
  {
    id: "ley-aplicable",
    title: "15. Ley aplicable y resolución de disputas",
    content: `
      <p>Estos Términos se rigen por las leyes de la República Argentina, sin perjuicio de las normas de protección al consumidor u otras disposiciones de orden público que puedan aplicar en tu jurisdicción de residencia.</p>
      <p>Antes de iniciar cualquier acción legal, ambas partes procurarán resolver la disputa de buena fe mediante comunicación directa a <a href="mailto:${EMAIL}">${EMAIL}</a>. De no llegar a un acuerdo, las disputas se someterán a los tribunales ordinarios competentes de la ciudad de Rosario, provincia de Santa Fe, Argentina.</p>
    `,
  },
  {
    id: "contacto",
    title: "16. Contacto",
    content: `
      <p>Para cualquier consulta sobre estos Términos y Condiciones:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:${EMAIL}">${EMAIL}</a></li>
        <li><strong>Asunto recomendado:</strong> "Términos – [tu consulta]"</li>
      </ul>
      <p>También podés consultar nuestra <a href="/privacidad">Política de Privacidad</a> y nuestra página de <a href="/eliminar-datos">Eliminación de datos</a>.</p>
    `,
  },
];

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg?v=2" alt="Cható" className="h-9 w-auto" />
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title */}
        <div className="mb-12 pb-8 border-b border-gray-100">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Términos y Condiciones</h1>
          <p className="text-gray-500 text-sm">Última actualización: <strong className="text-gray-700">{UPDATED}</strong></p>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
            Estos son los términos que rigen el uso de Cható: cómo funcionan las cuentas, los planes y la facturación, qué podés y no podés hacer en la plataforma, y cómo tratamos las respuestas generadas por inteligencia artificial y las integraciones con WhatsApp, Instagram, Facebook y Telegram.
          </p>
        </div>

        {/* Table of contents */}
        <nav className="mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Contenido</p>
          <ol className="space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {s.title}
              </h2>
              <div
                className="prose-policy"
                dangerouslySetInnerHTML={{ __html: s.content }}
              />
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            Estos términos aplican a{" "}
            <a href={SITE} className="text-violet-600 hover:underline">{SITE}</a>{" "}
            y a la plataforma Cható.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
