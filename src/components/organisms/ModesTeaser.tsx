import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/atoms/Reveal";
import { modes } from "@/lib/content";

/**
 * Teaser de los dos modos de uso para la home. Cada tarjeta enlaza a su página
 * dedicada. Presenta ambos como parte de una misma plataforma ("empezá simple,
 * escalá cuando crezcas").
 */
export function ModesTeaser() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Dos modos, una plataforma"
          title={
            <>
              Elegí cómo trabajar <span className="gradient-text">y escalá a tu ritmo</span>
            </>
          }
          subtitle="Empezá simple con Telegram y, cuando tu negocio crezca, activá el panel avanzado. Ambos modos están incluidos en todos los planes."
          className="mb-14"
        />

        <Stagger className="grid lg:grid-cols-2 gap-6">
          {modes.map((mode) => {
            const isCyan = mode.accent === "telegram";
            return (
              <StaggerItem key={mode.id}>
                <Link
                  href={mode.href}
                  className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-50"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <IconBadge icon={mode.icon} size="lg" tone={isCyan ? "cyan" : "brand"} />
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{mode.title}</h3>
                      <p className="text-sm text-gray-500">{mode.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{mode.description}</p>
                  <ul className="space-y-2.5 mb-6">
                    {mode.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <Check
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isCyan ? "text-cyan-500" : "text-violet-500"}`}
                          strokeWidth={2.5}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 group-hover:gap-2.5 transition-all">
                    Conocer {mode.title}
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            El Modo Simple está en todos los planes. El Modo Avanzado se desbloquea a partir del plan Pro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
