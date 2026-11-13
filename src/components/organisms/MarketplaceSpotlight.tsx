import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Reveal } from "@/components/atoms/Reveal";

export function MarketplaceSpotlight() {
  return (
    <section className="marketplace-atmosphere relative overflow-hidden py-24 text-white">
      <div className="actros-grid absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="actros-flow actros-flow-marketplace-one" aria-hidden="true" />
      <div className="actros-flow actros-flow-marketplace-two" aria-hidden="true" />
      <div className="actros-dots absolute right-5 top-4 h-60 w-60 opacity-25" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal direction="right">
          <Badge variant="violet" className="mb-5 border-white/20 bg-white/10 text-white">
            Marketplace Actroos
          </Badge>
          <h2 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-balance sm:text-5xl">
            Una plataforma que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee7d16] via-[#e54746] to-[#c61261]">crece con tu negocio</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Empezás con el núcleo de Actroos y sumás capacidades cuando las necesitás. Reservas, catálogo, ventas, campañas y agentes especializados viven en la misma plataforma, con el mismo historial de cada cliente.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
            {[
              "Activá solo lo que necesitás",
              "Conservá todo el contexto",
              "Escalá sin migrar de sistema",
              "Accedé a nuevos módulos",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 flex-none text-actros-orange" />
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/herramientas/"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#001f34] transition hover:-translate-y-0.5 hover:bg-[#fff1e8]"
          >
            Explorar el Marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div
            role="img"
            aria-label="Marketplace de Actroos representado por una estación de trabajo conectada a reservas, catálogo, ventas, campañas, reseñas, encuestas y agentes de inteligencia artificial"
            className="relative mx-auto aspect-[1.598] w-full max-w-[44rem]"
          >
            <Image
              src="/images/brand/marketplace-ecosystem-figurative-v2.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
