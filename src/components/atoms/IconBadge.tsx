import type { LucideIcon } from "lucide-react";

/**
 * Contenedor único y suave para iconografía lucide.
 *
 * Mantiene la regla de marca: iconos con trazo fino y un solo tono (por defecto
 * el magenta corporativo sobre fondo suave). No usar tonos distintos por capricho;
 * `tone` existe solo para casos puntuales (p.ej. acento cyan del Modo Avanzado).
 */

type Size = "sm" | "md" | "lg";
type Tone = "brand" | "cyan" | "neutral" | "solid";

interface IconBadgeProps {
  icon: LucideIcon;
  size?: Size;
  tone?: Tone;
  className?: string;
}

const sizeMap: Record<Size, { box: string; icon: string }> = {
  sm: { box: "w-10 h-10 rounded-xl", icon: "w-5 h-5" },
  md: { box: "w-12 h-12 rounded-2xl", icon: "w-6 h-6" },
  lg: { box: "w-14 h-14 rounded-2xl", icon: "w-7 h-7" },
};

const toneMap: Record<Tone, string> = {
  brand: "bg-violet-50 text-violet-600",
  cyan: "bg-cyan-50 text-cyan-600",
  neutral: "bg-gray-100 text-gray-500",
  solid: "gradient-primary text-white shadow-sm",
};

export function IconBadge({ icon: Icon, size = "md", tone = "brand", className = "" }: IconBadgeProps) {
  const s = sizeMap[size];
  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 ${s.box} ${toneMap[tone]} ${className}`}
    >
      <Icon className={s.icon} strokeWidth={1.75} aria-hidden />
    </span>
  );
}
