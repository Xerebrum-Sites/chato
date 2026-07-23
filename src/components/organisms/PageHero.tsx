import type { ReactNode } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";

/**
 * Hero estándar para páginas interiores (modos, características, casos de uso,
 * herramientas, contacto). Copy a la izquierda, imagen/placeholder a la derecha.
 */

interface CtaConfig {
  label: string;
  href: string;
}

interface PageHeroProps {
  badge?: ReactNode;
  badgeVariant?: "violet" | "cyan" | "green" | "gray";
  title: ReactNode;
  subtitle: ReactNode;
  primaryCta?: CtaConfig;
  secondaryCta?: CtaConfig;
  /** Descripción de la foto de persona que irá en el placeholder de la derecha. */
  imageLabel?: string;
  /** Contenido visual alternativo a la derecha (p.ej. un mockup). Prioriza sobre imageLabel. */
  visual?: ReactNode;
}

export function PageHero({
  badge,
  badgeVariant = "violet",
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  imageLabel,
  visual,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 lg:pt-40 pb-16 lg:pb-24">
      <div className="absolute inset-0 gradient-bg opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal direction="right">
          {badge ? (
            <Badge variant={badgeVariant} className="mb-5">
              {badge}
            </Badge>
          ) : null}
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-5 text-balance">
            {title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">{subtitle}</p>
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-3">
              {primaryCta && (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          {visual ? (
            visual
          ) : (
            <ImagePlaceholder
              label={imageLabel ?? "Foto de una persona usando Cható"}
              className="aspect-[4/3] w-full shadow-xl"
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}
