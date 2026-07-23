import type { Metadata } from "next";
import Link from "next/link";
import { URLS, EMAILS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Eliminación de datos – Cható",
  description:
    "Cómo solicitar la eliminación de tus datos personales en Cható, incluidos los datos obtenidos a través de Instagram, Messenger y WhatsApp.",
};

const UPDATED = "21 de julio de 2026";
const EMAIL = EMAILS.legal;
const SITE = URLS.landing;
const APP = URLS.app;

const sections = [
  {
    id: "resumen",
    title: "1. Resumen",
    content: `
      <p>En Cható podés solicitar la eliminación de tus datos personales en cualquier momento. Esta página explica <strong>qué datos podemos eliminar</strong>, <strong>cómo pedirlo</strong> y <strong>en cuánto tiempo</strong> lo hacemos, incluyendo los datos que recibimos a través de las plataformas de Meta (Instagram, Facebook Messenger y WhatsApp).</p>
      <p>Hay dos tipos de solicitantes:</p>
      <ul>
        <li><strong>Negocios (titulares de cuenta):</strong> empresas que usan Cható para atender a sus clientes.</li>
        <li><strong>Usuarios finales:</strong> personas que escribieron a un negocio por WhatsApp, Instagram, Messenger o el chat web y cuyos mensajes pasaron por Cható.</li>
      </ul>
    `,
  },
  {
    id: "que-eliminamos",
    title: "2. Qué datos podemos eliminar",
    content: `
      <p>Según tu caso, la eliminación cubre:</p>
      <ul>
        <li>Datos de cuenta y perfil (nombre, email, teléfono, datos del negocio).</li>
        <li>Contactos y su historial unificado de conversaciones.</li>
        <li>El contenido de los mensajes intercambiados (entrantes y salientes) y sus adjuntos.</li>
        <li>Identificadores de los canales de origen (número de WhatsApp, ID de usuario de Instagram/Messenger, etc.).</li>
        <li>Documentos que el negocio haya subido para el asistente de IA.</li>
      </ul>
      <p>Cada negocio (tenant) tiene sus datos <strong>aislados en su propio espacio</strong>. Al eliminar una cuenta de negocio se borra por completo su espacio de datos, sin dejar fragmentos.</p>
    `,
  },
  {
    id: "como-solicitar",
    title: "3. Cómo solicitar la eliminación",
    content: `
      <h3>3.1 Si sos un negocio con cuenta en Cható</h3>
      <ul>
        <li><strong>Desde la plataforma:</strong> iniciá sesión en <a href="${APP}">${APP}</a> y solicitá la baja y eliminación de tu cuenta desde <em>Configuración</em>, o escribinos.</li>
        <li><strong>Por correo:</strong> enviá un email a <a href="mailto:${EMAIL}">${EMAIL}</a> desde la dirección de tu cuenta, con el asunto <strong>"Eliminar mis datos"</strong>.</li>
      </ul>
      <h3>3.2 Si sos un usuario final</h3>
      <p>Si le escribiste a un negocio y querés que eliminemos tus datos, tenés dos vías:</p>
      <ul>
        <li>Pedirle directamente al negocio con el que hablaste que elimine tu contacto (ellos controlan sus datos).</li>
        <li>Escribirnos a <a href="mailto:${EMAIL}">${EMAIL}</a> con el asunto <strong>"Eliminar mis datos"</strong>, indicando <strong>la plataforma</strong> (WhatsApp / Instagram / Messenger / chat web) y <strong>el identificador</strong> con el que escribiste (tu número de teléfono o tu usuario), y con qué negocio te comunicaste.</li>
      </ul>
      <p>Podemos pedirte una verificación mínima para confirmar que la solicitud es tuya antes de proceder.</p>
    `,
  },
  {
    id: "datos-meta",
    title: "4. Datos obtenidos a través de Meta",
    content: `
      <p>Cuando un usuario final se comunica con un negocio vía <strong>Instagram, Facebook Messenger o WhatsApp</strong>, Meta nos envía el contenido del mensaje, el identificador del usuario (PSID o número de teléfono según la plataforma) y la marca de tiempo, con el único fin de atender esa conversación.</p>
      <p>Para eliminar estos datos, seguí el procedimiento de la sección 3.2. Al procesar tu solicitud borramos el contenido de los mensajes, sus adjuntos y los identificadores asociados a tu perfil de esa plataforma. No usamos estos datos para publicidad ni perfilado, y no los compartimos con terceros fuera del flujo de entrega del mensaje.</p>
    `,
  },
  {
    id: "plazos",
    title: "5. Plazos",
    content: `
      <ul>
        <li>Confirmamos la recepción de tu solicitud dentro de <strong>5 días hábiles</strong>.</li>
        <li>Completamos la eliminación en un plazo máximo de <strong>30 días</strong>.</li>
        <li>Las copias de seguridad que puedan contener tus datos se sobrescriben en sus ciclos normales de rotación (hasta 30 días adicionales), tras lo cual quedan definitivamente eliminadas.</li>
      </ul>
    `,
  },
  {
    id: "excepciones",
    title: "6. Qué se conserva y por qué",
    content: `
      <p>Podemos retener cierta información cuando la ley nos obliga o para proteger derechos legítimos, incluso después de una solicitud de eliminación:</p>
      <ul>
        <li><strong>Datos de facturación:</strong> se conservan durante el plazo exigido por la normativa fiscal.</li>
        <li><strong>Registros mínimos</strong> necesarios para acreditar el cumplimiento de una solicitud o para prevenir fraude/abuso.</li>
      </ul>
      <p>Estos datos se guardan de forma acotada y se eliminan al vencer la obligación correspondiente.</p>
    `,
  },
  {
    id: "contacto",
    title: "7. Contacto",
    content: `
      <p>Para cualquier consulta sobre la eliminación de tus datos:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:${EMAIL}">${EMAIL}</a></li>
        <li><strong>Asunto recomendado:</strong> "Eliminar mis datos"</li>
      </ul>
      <p>También podés consultar nuestra <a href="/privacidad">Política de Privacidad</a> para conocer en detalle cómo tratamos tus datos.</p>
    `,
  },
];

export default function EliminarDatosPage() {
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
          <h1 className="text-4xl font-black text-gray-900 mb-4">Eliminación de datos</h1>
          <p className="text-gray-500 text-sm">Última actualización: <strong className="text-gray-700">{UPDATED}</strong></p>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
            Cómo pedir que eliminemos tus datos personales en Cható, incluidos los datos que recibimos a través de Instagram, Messenger y WhatsApp.
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
            Esta página aplica a{" "}
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
