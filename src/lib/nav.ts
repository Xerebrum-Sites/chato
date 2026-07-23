/**
 * Estructura de navegación compartida por el mega menú (Navbar) y el Footer.
 * Las industrias se derivan de `content.ts` para no duplicarlas.
 */

import type { LucideIcon } from "lucide-react";
import { MessageSquare, LayoutDashboard, Bot, Sparkles, Puzzle } from "lucide-react";
import { industries } from "@/lib/content";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

/** Columna "Producto" del mega menú. */
export const productLinks: NavLink[] = [
  {
    label: "Modo Simple",
    href: "/modo-simple/",
    description: "Todos tus canales dentro de Telegram",
    icon: MessageSquare,
  },
  {
    label: "Modo Avanzado",
    href: "/modo-avanzado/",
    description: "Panel completo, equipos y automatización",
    icon: LayoutDashboard,
  },
  {
    label: "Agentes IA",
    href: "/agentes-ia/",
    description: "Un asistente que atiende por vos, 24/7",
    icon: Bot,
  },
  {
    label: "Características",
    href: "/caracteristicas/",
    description: "Todo lo que incluye la plataforma",
    icon: Sparkles,
  },
  {
    label: "Herramientas opcionales",
    href: "/herramientas/",
    description: "Reservas, catálogo, encuestas y más",
    icon: Puzzle,
  },
];

/** Columna "Soluciones" del mega menú: industrias con ancla a /casos-de-uso/. */
export const solutionLinks: NavLink[] = industries.map((i) => ({
  label: i.sector,
  href: `/casos-de-uso/#${i.id}`,
  icon: i.icon,
}));

/** Enlaces de nivel superior sin panel (se muestran directos en la barra). */
export const topLevelLinks: NavLink[] = [
  { label: "Precios", href: "/precios/" },
  { label: "Contacto", href: "/contacto/" },
];

/** Enlaces del footer, agrupados por columna. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Producto",
    links: productLinks,
  },
  {
    title: "Soluciones",
    links: [
      { label: "Casos de uso", href: "/casos-de-uso/" },
      { label: "Moda y Ropa", href: "/casos-de-uso/#moda" },
      { label: "Gastronomía y Delivery", href: "/casos-de-uso/#gastronomia" },
      { label: "Salud y Bienestar", href: "/casos-de-uso/#salud" },
      { label: "Ecommerce y Retail", href: "/casos-de-uso/#ecommerce" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Precios", href: "/precios/" },
      { label: "Contacto", href: "/contacto/" },
    ],
  },
];
