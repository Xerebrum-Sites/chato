/**
 * Fuente única de contenido reutilizado entre la home (teasers) y las páginas
 * dedicadas. Centralizar acá evita duplicar copy y mantiene coherencia.
 *
 * Reglas de copy (producto pre-lanzamiento, mercado hispano):
 * - Sin cifras de clientes ni testimonios inventados.
 * - Sin nombrar países.
 * - Sin promesas duras de tiempo ("en 5 minutos"): lenguaje relativo y honesto.
 */

import type { LucideIcon } from "lucide-react";
import {
  Shirt,
  UtensilsCrossed,
  Stethoscope,
  Wrench,
  Scissors,
  GraduationCap,
  ShoppingBag,
  Building2,
  Plane,
  MessageSquare,
  LayoutDashboard,
  Inbox,
  Zap,
  BarChart3,
  Users,
  Tags,
  BellRing,
  CreditCard,
  ShieldCheck,
  Layers,
  Ban,
  ConciergeBell,
  TrendingUp,
  LifeBuoy,
  UserCheck,
  CalendarCheck,
  MessagesSquare,
  BrainCircuit,
  Sparkles,
  ArrowLeftRight,
} from "lucide-react";

// ─── Canales soportados ───────────────────────────────────────────────────────
export type ChannelId = "whatsapp" | "instagram" | "facebook" | "web" | "telegram";
export const supportedChannels: ChannelId[] = ["whatsapp", "instagram", "facebook", "web", "telegram"];

// ─── Modos de uso ─────────────────────────────────────────────────────────────
export interface Mode {
  id: "simple" | "avanzado";
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  audience: string;
  benefits: string[];
  href: string;
  /** Acento visual: el Modo Simple usa el celeste de Telegram; el Avanzado, la marca. */
  accent: "telegram" | "brand";
}

export const modes: Mode[] = [
  {
    id: "simple",
    icon: MessageSquare,
    title: "Modo Simple",
    subtitle: "Tu centro de mensajes en Telegram",
    description:
      "Centralizá todos tus canales en Telegram. Recibís y respondés desde una sola app, sin aprender una interfaz nueva ni sumar complicaciones.",
    audience: "Ideal para emprendedores y comercios que atienden por su cuenta.",
    benefits: [
      "Bandeja unificada dentro de tu Telegram",
      "Respondé desde el celular o la computadora",
      "Etiquetas y seguimientos para no perder nada",
      "Respuestas rápidas personalizadas",
      "Notificaciones en tiempo real",
    ],
    href: "/modo-simple/",
    accent: "telegram",
  },
  {
    id: "avanzado",
    icon: LayoutDashboard,
    title: "Modo Avanzado",
    subtitle: "Un panel completo con control total",
    description:
      "Tu propia bandeja interna con dashboard, analytics, gestión de equipos y automatizaciones. Para crecer sin límites y con visibilidad total.",
    audience: "Ideal para equipos, agencias y negocios de alto volumen.",
    benefits: [
      "Bandeja interna pensada para escalar",
      "Analytics y reportes por canal",
      "Gestión de agentes y equipos",
      "Automatizaciones con IA",
      "Base de conocimiento (RAG) para respuestas mejores",
    ],
    href: "/modo-avanzado/",
    accent: "brand",
  },
];

// ─── Señales de producto (reemplazan la "prueba social" de clientes) ──────────
export interface Signal {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const trustSignals: Signal[] = [
  {
    icon: CreditCard,
    title: "14 días gratis, sin tarjeta",
    description: "Probás todas las funciones sin ingresar datos de pago.",
  },
  {
    icon: Ban,
    title: "Sin permanencia",
    description: "Cancelás cuando quieras. Sin contratos largos ni letra chica.",
  },
  {
    icon: Layers,
    title: "Ambos modos incluidos",
    description: "Modo Simple y Modo Avanzado disponibles en todos los planes.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y privacidad",
    description: "Los datos de cada negocio viven en su propio espacio privado.",
  },
];

// ─── Características (unificadas, iconografía lucide) ──────────────────────────
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: string;
}

export const features: Feature[] = [
  {
    icon: Inbox,
    title: "Bandeja unificada real",
    description:
      "Un solo hilo por cliente, aunque te escriba desde varios canales. Sin pestañas abiertas ni mensajes perdidos.",
    highlight: "Sin mensajes duplicados",
  },
  {
    icon: Zap,
    title: "Respuestas rápidas con comandos",
    description:
      "Guardá respuestas frecuentes como /precio, /horario o /envios y usalas con un toque, desde donde estés.",
    highlight: "Menos tiempo por respuesta",
  },
  {
    icon: BarChart3,
    title: "Panel de rendimiento",
    description:
      "Mirá cuántos mensajes atendiste por canal, en qué horarios recibís más y cuánto tardás en responder.",
    highlight: "Métricas accionables",
  },
  {
    icon: Users,
    title: "Múltiples agentes",
    description:
      "Sumá a tu equipo: cada agente atiende su canal asignado, con historial compartido y sin pisarse.",
    highlight: "Historial compartido",
  },
  {
    icon: Tags,
    title: "Etiquetas y seguimiento",
    description:
      "Marcá conversaciones como #prospecto, #pagado o #pendiente. Filtrá y retomá seguimientos sin olvidar a nadie.",
    highlight: "Sin CRM extra",
  },
  {
    icon: BellRing,
    title: "Alertas de mensajes sin responder",
    description:
      "Si un cliente lleva rato esperando, recibís un aviso. Ninguna venta se enfría por una demora.",
    highlight: "Configurable por tiempo",
  },
];

// ─── Industrias / Casos de uso ────────────────────────────────────────────────
export interface Industry {
  /** Slug usado como ancla (#id) desde el mega menú. */
  id: string;
  icon: LucideIcon;
  sector: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  /** Descripción de la foto que irá en el placeholder. */
  photoLabel: string;
}

export const industries: Industry[] = [
  {
    id: "moda",
    icon: Shirt,
    sector: "Moda y Ropa",
    title: "Tienda de indumentaria",
    problem:
      "Me escriben por WhatsApp, Instagram y Facebook para preguntar talles y colores, y entre tantas apps se me escapan ventas.",
    solution:
      "Todos los mensajes de tus canales llegan a un solo lugar. Etiquetás las consultas de talle, respondés con fotos del producto y el cliente recibe la respuesta en el canal donde escribió.",
    result: "Respondés más rápido y dejás de perder consultas entre pestañas.",
    photoLabel: "Dueña de tienda de ropa respondiendo desde el celular",
  },
  {
    id: "gastronomia",
    icon: UtensilsCrossed,
    sector: "Gastronomía y Delivery",
    title: "Local de comidas y delivery",
    problem:
      "Tomo pedidos por WhatsApp, pero a veces llegan por Instagram y se me traspapelan.",
    solution:
      "Configurás respuestas rápidas como /menu para enviar tu carta al instante. Los pedidos entran etiquetados y los seguís de #nuevo a #en_camino sin cambiar de app.",
    result: "Ningún pedido se pierde y confirmás por el mismo canal del cliente.",
    photoLabel: "Encargado de un local gastronómico tomando pedidos",
  },
  {
    id: "salud",
    icon: Stethoscope,
    sector: "Salud y Bienestar",
    title: "Consultorio o profesional independiente",
    problem:
      "Los pacientes piden turnos por WhatsApp, Messenger y hasta por comentarios de Instagram.",
    solution:
      "Cada solicitud de turno llega ordenada en una sola bandeja. Confirmás respondiendo y el paciente recibe la confirmación —y un recordatorio— en su canal preferido.",
    result: "Agenda ordenada sin sumar personal solo para atender mensajes.",
    photoLabel: "Profesional de la salud organizando turnos",
  },
  {
    id: "servicios",
    icon: Wrench,
    sector: "Servicios y Oficios",
    title: "Técnico o prestador de servicios",
    problem:
      "Trabajo solo y no puedo revisar cuatro apps mientras estoy en una reparación.",
    solution:
      "Recibís todos los mensajes en un único hub con notificaciones. Los priorizás con etiquetas y respondés cuando terminás el trabajo en curso.",
    result: "Atención profesional aunque trabajes solo, sin dejar gente esperando.",
    photoLabel: "Técnico revisando mensajes entre trabajos",
  },
  {
    id: "belleza",
    icon: Scissors,
    sector: "Belleza y Estética",
    title: "Salón o centro de estética",
    problem:
      "Quiero que mi equipo atienda los mensajes sin darle acceso a mi WhatsApp personal.",
    solution:
      "Sumás a tu equipo como agentes: cada persona atiende su canal asignado con el historial compartido, sin mezclar cuentas personales.",
    result: "Todo el equipo atiende desde sus propios dispositivos, ordenado.",
    photoLabel: "Equipo de un salón de belleza atendiendo clientas",
  },
  {
    id: "educacion",
    icon: GraduationCap,
    sector: "Educación",
    title: "Academia o clases particulares",
    problem:
      "Padres y alumnos preguntan por horarios, precios e inscripciones en distintos momentos y canales.",
    solution:
      "Creás respuestas rápidas para las preguntas frecuentes (/horarios, /precios, /inscripcion) y resolvés lo repetitivo en segundos.",
    result: "Menos tiempo respondiendo lo mismo, más tiempo enseñando.",
    photoLabel: "Docente respondiendo consultas de alumnos",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    sector: "Ecommerce y Retail",
    title: "Tienda online",
    problem:
      "Mi tienda recibe consultas de preventa y posventa por todos lados y cuesta darles seguimiento.",
    solution:
      "Unificás preventa y posventa en una bandeja, con etiquetas por estado (#consulta, #pagado, #envío) y respuestas rápidas para las dudas típicas.",
    result: "Seguimiento claro de cada cliente, del carrito a la entrega.",
    photoLabel: "Emprendedor de ecommerce gestionando pedidos",
  },
  {
    id: "inmobiliaria",
    icon: Building2,
    sector: "Inmobiliaria",
    title: "Inmobiliaria o agente independiente",
    problem:
      "Los interesados escriben por avisos en distintas redes y es difícil no perder ninguno.",
    solution:
      "Centralizás todas las consultas de propiedades en un lugar, las etiquetás por interés y coordinás visitas respondiendo desde el mismo hub.",
    result: "Cada consulta queda registrada y con seguimiento.",
    photoLabel: "Agente inmobiliario coordinando visitas",
  },
  {
    id: "turismo",
    icon: Plane,
    sector: "Turismo y Hotelería",
    title: "Hotel, hostel o agencia de viajes",
    problem:
      "Recibo reservas y preguntas por WhatsApp, Instagram y la web, y responder a tiempo es clave.",
    solution:
      "Reunís todas las consultas en una bandeja, usás respuestas rápidas para disponibilidad y precios, y derivás a tu equipo cuando hace falta.",
    result: "Respondés a tiempo y con información consistente en cada canal.",
    photoLabel: "Recepcionista de hotel atendiendo huéspedes",
  },
];

// ─── Agentes IA ───────────────────────────────────────────────────────────────
// El Agente IA base (bot + base de conocimiento) está disponible desde el plan
// Pro. Los agentes especializados llegan con el add-on "Múltiples agentes IA".

export interface AiCapability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const aiCapabilities: AiCapability[] = [
  {
    icon: MessagesSquare,
    title: "Responde solo, 24/7",
    description:
      "Atiende consultas al instante en todos tus canales, también fuera de horario y cuando estás ocupado.",
  },
  {
    icon: BrainCircuit,
    title: "Con tu base de conocimiento",
    description:
      "Responde con la información real de tu negocio —precios, políticas, catálogo, preguntas frecuentes— que vos cargás (RAG).",
  },
  {
    icon: Sparkles,
    title: "Con el tono de tu marca",
    description:
      "Configurás su personalidad y estilo para que hable como tu negocio, no como un robot genérico.",
  },
  {
    icon: ArrowLeftRight,
    title: "Escala a una persona",
    description:
      "Cuando la consulta lo requiere, deriva la conversación a vos o a tu equipo con todo el contexto de la charla.",
  },
];

export interface AiRole {
  icon: LucideIcon;
  name: string;
  description: string;
}

// Agentes especializados del add-on "Múltiples agentes IA".
export const aiAgentRoles: AiRole[] = [
  {
    icon: ConciergeBell,
    name: "Recepcionista",
    description: "Da la bienvenida, responde lo frecuente y deriva cada consulta al área correcta.",
  },
  {
    icon: TrendingUp,
    name: "Ventas",
    description: "Asesora sobre productos, arma presupuestos y acompaña la conversación hacia la compra.",
  },
  {
    icon: LifeBuoy,
    name: "Soporte",
    description: "Resuelve dudas de posventa y problemas comunes con la información de tu negocio.",
  },
  {
    icon: CalendarCheck,
    name: "Reservas",
    description: "Toma y coordina turnos o citas, conectado con tu agenda.",
  },
  {
    icon: UserCheck,
    name: "Cualificador",
    description: "Detecta si un contacto es un lead válido y lo prepara antes de pasarlo a una persona.",
  },
];
