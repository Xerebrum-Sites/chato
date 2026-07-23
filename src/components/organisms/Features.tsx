import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Stagger, StaggerItem, Reveal } from "@/components/atoms/Reveal";
import { features } from "@/lib/content";

interface FeaturesProps {
  /** Cantidad máxima de características a mostrar (para el teaser de la home). */
  limit?: number;
  /** Muestra un enlace "Ver todas" (útil cuando está limitado en la home). */
  showViewAll?: boolean;
  className?: string;
}

export function Features({ limit, showViewAll = false, className = "" }: FeaturesProps) {
  const list = typeof limit === "number" ? features.slice(0, limit) : features;

  return (
    <section id="caracteristicas" className={`py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Características"
          title={
            <>
              Todo lo que tu negocio necesita, <span className="gradient-text">nada de lo que no</span>
            </>
          }
          subtitle="Pensado para pequeños comercios y equipos: sin funciones innecesarias, sin curvas de aprendizaje, sin contratos largos."
          className="mb-16"
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((feature) => (
            <StaggerItem
              key={feature.title}
              className="group h-full rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50"
            >
              <IconBadge icon={feature.icon} size="md" className="mb-4" />
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              {feature.highlight && (
                <div className="mt-4 inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  {feature.highlight}
                </div>
              )}
            </StaggerItem>
          ))}
        </Stagger>

        {showViewAll && (
          <Reveal className="mt-10 text-center">
            <Link
              href="/caracteristicas/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-800"
            >
              Ver todas las características
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
