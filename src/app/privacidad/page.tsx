import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad – Cható",
  description: "Política de privacidad de Cható. Conocé cómo recopilamos, usamos y protegemos tus datos.",
};

const UPDATED = "20 de mayo de 2026";
const EMAIL = "privacidad@chato.app";
const SITE = "https://chato.xerebrumgroup.com";

const sections = [
  {
    id: "responsable",
    title: "1. Responsable del tratamiento",
    content: `
      <p>El responsable del tratamiento de los datos personales recabados a través de este sitio web y de la plataforma Cható es:</p>
      <ul>
        <li><strong>Nombre comercial:</strong> Cható</li>
        <li><strong>Operado por:</strong> Xerebrum</li>
        <li><strong>Sitio web:</strong> ${SITE}</li>
        <li><strong>Correo de contacto:</strong> <a href="mailto:${EMAIL}">${EMAIL}</a></li>
      </ul>
    `,
  },
  {
    id: "datos-recopilados",
    title: "2. Datos que recopilamos",
    content: `
      <p>Recopilamos los siguientes tipos de datos según el contexto de uso:</p>

      <h3>2.1 Datos de registro y cuenta</h3>
      <ul>
        <li>Nombre y apellido</li>
        <li>Dirección de correo electrónico</li>
        <li>Número de teléfono (para la vinculación con Telegram y canales de mensajería)</li>
        <li>Información de facturación (gestionada por procesadores de pago de terceros; no almacenamos datos de tarjeta)</li>
      </ul>

      <h3>2.2 Mensajes en tránsito</h3>
      <p>Cható actúa como <strong>enrutador de mensajes</strong> entre los canales de comunicación del negocio (WhatsApp, Instagram, Facebook, Web Chat) y Telegram. Los mensajes recibidos a través de las APIs de Meta son procesados en tiempo real para ser retransmitidos al operador del negocio vía Telegram. <strong>No almacenamos el contenido de los mensajes de forma permanente.</strong> Los mensajes se conservan temporalmente en memoria durante el procesamiento (segundos) y en un buffer de hasta 24 horas para garantizar la entrega en caso de interrupciones.</p>

      <h3>2.3 Metadatos de mensajes</h3>
      <ul>
        <li>Identificador de usuario del canal de origen (ej. número de WhatsApp, ID de usuario de Instagram)</li>
        <li>Marca de tiempo del mensaje</li>
        <li>Canal de origen (WhatsApp, Instagram, Facebook, Web Chat)</li>
        <li>Estado de entrega</li>
      </ul>

      <h3>2.4 Datos de uso y técnicos</h3>
      <ul>
        <li>Dirección IP</li>
        <li>Tipo y versión del navegador</li>
        <li>Páginas visitadas y tiempo de sesión</li>
        <li>Cookies de sesión y preferencias (ver sección 7)</li>
      </ul>
    `,
  },
  {
    id: "plataformas-meta",
    title: "3. Integración con plataformas de Meta",
    content: `
      <p>Cható se integra con las siguientes plataformas de Meta Platforms, Inc. mediante sus APIs oficiales:</p>
      <ul>
        <li><strong>WhatsApp Business API</strong> – Para recibir y enviar mensajes de WhatsApp en nombre del negocio.</li>
        <li><strong>Instagram Graph API / Messenger Platform</strong> – Para recibir y responder mensajes directos de Instagram.</li>
        <li><strong>Facebook Messenger Platform</strong> – Para gestionar conversaciones de Facebook.</li>
      </ul>

      <h3>3.1 Qué datos obtenemos de Meta</h3>
      <p>Cuando un usuario final se comunica con un negocio a través de cualquiera de estas plataformas, Meta nos envía:</p>
      <ul>
        <li>El contenido del mensaje (texto, multimedia)</li>
        <li>El identificador de usuario de Meta (PSID o número de teléfono según la plataforma)</li>
        <li>La marca de tiempo del mensaje</li>
      </ul>

      <h3>3.2 Finalidad</h3>
      <p>Estos datos se utilizan exclusivamente para enrutar el mensaje al operador del negocio (vía Telegram) y para enviar la respuesta de vuelta al usuario final a través del mismo canal. No utilizamos estos datos para publicidad, perfilado ni los compartimos con terceros fuera del flujo de entrega del mensaje.</p>

      <h3>3.3 Cumplimiento de políticas de Meta</h3>
      <p>Cható cumple con las <a href="https://developers.facebook.com/policy/" target="_blank" rel="noopener noreferrer">Políticas para Desarrolladores de Meta</a> y con los <a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noopener noreferrer">Términos del Servicio de WhatsApp Business</a>. No utilizamos los datos obtenidos a través de estas plataformas para ningún fin distinto al especificado en estas políticas.</p>

      <h3>3.4 Eliminación de datos de Meta</h3>
      <p>Si un usuario final desea que eliminemos los metadatos asociados a su identificador de Meta, puede solicitarlo enviando un correo a <a href="mailto:${EMAIL}">${EMAIL}</a> indicando la plataforma y el número/ID correspondiente. Procesamos las solicitudes en un plazo máximo de 30 días.</p>
    `,
  },
  {
    id: "finalidad",
    title: "4. Cómo usamos tus datos",
    content: `
      <p>Utilizamos los datos recopilados para las siguientes finalidades:</p>
      <ul>
        <li><strong>Prestación del servicio:</strong> Crear y gestionar tu cuenta, enrutar mensajes entre canales y Telegram, enviar notificaciones relacionadas con el servicio.</li>
        <li><strong>Facturación:</strong> Gestionar suscripciones y pagos.</li>
        <li><strong>Soporte:</strong> Responder consultas y resolver incidencias.</li>
        <li><strong>Mejora del producto:</strong> Analizar patrones de uso agregados (sin identificar usuarios) para mejorar la plataforma.</li>
        <li><strong>Seguridad:</strong> Detectar y prevenir accesos no autorizados o uso fraudulento.</li>
        <li><strong>Comunicaciones legales:</strong> Cumplir con obligaciones legales o requerimientos de autoridades competentes.</li>
      </ul>
      <p>No utilizamos tus datos para publicidad de terceros ni los vendemos bajo ninguna circunstancia.</p>
    `,
  },
  {
    id: "comparticion",
    title: "5. Compartición de datos con terceros",
    content: `
      <p>Cható no vende ni alquila datos personales. Podemos compartir datos únicamente en estos casos:</p>
      <ul>
        <li><strong>Proveedores de infraestructura:</strong> Servicios de hosting y base de datos que procesan datos en nuestro nombre bajo acuerdos de confidencialidad (ej. servidores propios en infraestructura Xerebrum).</li>
        <li><strong>Procesadores de pago:</strong> Para gestionar transacciones de suscripción (no compartimos datos de mensajes).</li>
        <li><strong>Telegram:</strong> Los mensajes enrutados se envían a través de la API de Telegram Bot al número/chat del operador del negocio.</li>
        <li><strong>Obligaciones legales:</strong> Cuando sea requerido por ley, orden judicial o para proteger derechos legítimos.</li>
      </ul>
    `,
  },
  {
    id: "conservacion",
    title: "6. Conservación de datos",
    content: `
      <table>
        <thead>
          <tr><th>Tipo de dato</th><th>Periodo de conservación</th></tr>
        </thead>
        <tbody>
          <tr><td>Contenido de mensajes en tránsito</td><td>Máximo 24 horas (buffer de entrega)</td></tr>
          <tr><td>Metadatos de mensajes (ID, timestamp, canal)</td><td>90 días desde la fecha del mensaje</td></tr>
          <tr><td>Datos de cuenta</td><td>Durante la vigencia de la cuenta + 30 días tras la cancelación</td></tr>
          <tr><td>Registros de acceso (logs)</td><td>60 días</td></tr>
          <tr><td>Datos de facturación</td><td>5 años (obligación fiscal)</td></tr>
        </tbody>
      </table>
    `,
  },
  {
    id: "cookies",
    title: "7. Cookies",
    content: `
      <p>Este sitio web utiliza cookies con las siguientes finalidades:</p>
      <ul>
        <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio (sesión, seguridad). No pueden desactivarse.</li>
        <li><strong>Cookies de análisis:</strong> Nos permiten entender cómo se usa el sitio de forma agregada y anónima. Pueden desactivarse desde la configuración de tu navegador.</li>
      </ul>
      <p>No utilizamos cookies de publicidad ni de seguimiento entre sitios. Podés gestionar tus preferencias de cookies desde la configuración de tu navegador.</p>
    `,
  },
  {
    id: "derechos",
    title: "8. Tus derechos",
    content: `
      <p>Dependiendo de tu país de residencia, podés ejercer los siguientes derechos respecto a tus datos personales:</p>
      <ul>
        <li><strong>Acceso:</strong> Solicitar una copia de los datos que tenemos sobre vos.</li>
        <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
        <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos (sujeto a obligaciones legales de conservación).</li>
        <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado y legible por máquina.</li>
        <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos para determinadas finalidades.</li>
        <li><strong>Limitación:</strong> Solicitar que limitemos el tratamiento de tus datos en ciertas circunstancias.</li>
      </ul>
      <p>Para ejercer cualquiera de estos derechos, enviá un correo a <a href="mailto:${EMAIL}">${EMAIL}</a> con el asunto "Ejercicio de derechos" indicando tu nombre, el derecho que deseás ejercer y el detalle de la solicitud. Respondemos en un plazo máximo de 30 días hábiles.</p>
    `,
  },
  {
    id: "seguridad",
    title: "9. Seguridad",
    content: `
      <p>Implementamos medidas técnicas y organizativas para proteger tus datos:</p>
      <ul>
        <li>Comunicaciones cifradas mediante TLS/HTTPS</li>
        <li>Acceso restringido a datos por roles y necesidad</li>
        <li>Monitoreo continuo de infraestructura</li>
        <li>Revisiones periódicas de seguridad</li>
      </ul>
      <p>Ningún sistema es 100% infalible. En caso de una brecha de seguridad que afecte tus datos, te notificaremos en el menor tiempo posible conforme a la normativa aplicable.</p>
    `,
  },
  {
    id: "menores",
    title: "10. Menores de edad",
    content: `
      <p>Cható no está dirigido a menores de 18 años. No recopilamos datos de menores de forma intencional. Si detectamos que hemos recibido datos de un menor sin consentimiento parental, los eliminaremos de inmediato. Si sos padre/madre o tutor y creés que tu hijo/a nos ha proporcionado datos personales, contactanos en <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    `,
  },
  {
    id: "cambios",
    title: "11. Cambios en esta política",
    content: `
      <p>Podemos actualizar esta Política de Privacidad para reflejar cambios en nuestras prácticas, en la normativa vigente o en las APIs que integramos. Cuando hagamos cambios significativos, te notificaremos mediante un aviso en la plataforma o por correo electrónico con al menos 15 días de anticipación. La fecha de última actualización siempre estará visible al inicio de este documento.</p>
    `,
  },
  {
    id: "contacto",
    title: "12. Contacto",
    content: `
      <p>Para cualquier consulta sobre esta Política de Privacidad o el tratamiento de tus datos personales:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:${EMAIL}">${EMAIL}</a></li>
        <li><strong>Asunto recomendado:</strong> "Privacidad – [tu consulta]"</li>
      </ul>
      <p>Nos comprometemos a responder toda consulta en un plazo no mayor a 5 días hábiles.</p>
    `,
  },
];

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="font-black text-xl text-gray-900 tracking-tight">Cható</span>
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title */}
        <div className="mb-12 pb-8 border-b border-gray-100">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Política de Privacidad</h1>
          <p className="text-gray-500 text-sm">Última actualización: <strong className="text-gray-700">{UPDATED}</strong></p>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
            En Cható nos tomamos tu privacidad en serio. Esta política explica qué datos recopilamos, cómo los usamos y qué derechos tenés sobre ellos, incluyendo información específica sobre nuestra integración con las plataformas de Meta (WhatsApp, Instagram y Facebook).
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
            Esta política aplica a{" "}
            <a href={SITE} className="text-violet-600 hover:underline">{SITE}</a>{" "}
            y a la plataforma Cható.
          </p>
          <a
            href="/"
            className="inline-block mt-6 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>
      </main>
    </div>
  );
}
