import Link from "next/link";
import { ArrowRight, Quote, Check } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { Reveal, Stagger, StaggerItem } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { industries } from "@/lib/content";

/**
 * Teaser de industrias para la home: grilla compacta de rubros que enlaza a la
 * página de casos de uso.
 */
export function IndustriesTeaser() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Para tu industria"
          badgeVariant="green"
          title={
            <>
              Hecho para negocios <span className="gradient-text">como el tuyo</span>
            </>
          }
          subtitle="No importa el rubro: si tenés clientes que te escriben por más de un canal, Cható es para vos."
          className="mb-14"
        />

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {industries.map((ind) => (
            <StaggerItem key={ind.id}>
              <Link
                href={`/casos-de-uso/#${ind.id}`}
                className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50"
              >
                <IconBadge icon={ind.icon} size="md" />
                <span className="text-sm font-semibold text-gray-800 group-hover:text-violet-700 leading-tight">
                  {ind.sector}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 text-center">
          <Link
            href="/casos-de-uso/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-800"
          >
            Ver casos de uso en detalle
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Showcase completo para la página /casos-de-uso/: una fila por industria con
 * placeholder de foto (persona del rubro) y bloque problema → solución →
 * resultado. Filas alternadas para dar ritmo. Cada fila tiene ancla (#id).
 */
export function IndustriesShowcase() {
  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        {industries.map((ind, i) => {
          const reversed = i % 2 === 1;
          return (
            <div key={ind.id} id={ind.id} className="scroll-mt-28">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Visual */}
                <Reveal
                  direction={reversed ? "left" : "right"}
                  className={reversed ? "lg:order-2" : ""}
                >
                  <div className="relative">
                    <ImagePlaceholder label={ind.photoLabel} className="aspect-[4/3] w-full shadow-xl" />
                    <div className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
                      <IconBadge icon={ind.icon} size="sm" />
                      <span className="text-xs font-bold uppercase tracking-wide text-violet-700">
                        {ind.sector}
                      </span>
                    </div>
                  </div>
                </Reveal>

                {/* Copy */}
                <Reveal
                  direction={reversed ? "right" : "left"}
                  delay={0.1}
                  className={reversed ? "lg:order-1" : ""}
                >
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5">{ind.title}</h2>

                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5 mb-5">
                    <Quote className="w-5 h-5 text-violet-300 mb-2" strokeWidth={2} />
                    <p className="text-gray-600 italic leading-relaxed">{ind.problem}</p>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-2">
                      Cómo ayuda Cható
                    </p>
                    <p className="text-gray-600 leading-relaxed">{ind.solution}</p>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-sm font-medium text-emerald-800">{ind.result}</p>
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
