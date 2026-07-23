import type { ReactNode } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Reveal } from "@/components/atoms/Reveal";

/**
 * Encabezado de sección reutilizable (badge + título + subtítulo) con animación
 * de entrada. `title` acepta ReactNode para poder resaltar palabras con
 * <span className="gradient-text">…</span>.
 */

type BadgeVariant = "violet" | "cyan" | "green" | "gray";

interface SectionHeaderProps {
  badge?: ReactNode;
  badgeVariant?: BadgeVariant;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = "violet",
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-4 ${
        isCenter ? "items-center text-center max-w-2xl mx-auto" : "items-start text-left"
      } ${className}`}
    >
      {badge ? <Badge variant={badgeVariant}>{badge}</Badge> : null}
      <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight text-balance">
        {title}
      </h2>
      {subtitle ? <p className="text-lg text-gray-500 max-w-2xl">{subtitle}</p> : null}
    </Reveal>
  );
}
