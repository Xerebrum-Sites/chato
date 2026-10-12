import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Reveal } from "@/components/atoms/Reveal";

export function MarketplaceSpotlight() {
  return (
    <section className="relative overflow-hidden bg-[#180b18] py-24 text-white">
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-fuchsia-600/25 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal direction="right">
          <Badge variant="cyan" className="mb-5 border-white/15 bg-white/10 text-cyan-200">
            Marketplace Cható
          </Badge>
          <h2 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-balance sm:text-5xl">
            Una plataforma que <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400">crece con tu negocio</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Empezás con el núcleo de Cható y sumás capacidades cuando las necesitás. Reservas, catálogo, ventas, campañas y agentes especializados viven en la misma plataforma, con el mismo historial de cada cliente.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
            {[
              "Activá solo lo que necesitás",
              "Conservá todo el contexto",
              "Escalá sin migrar de sistema",
              "Accedé a nuevos módulos",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 flex-none text-orange-400" />
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/herramientas/"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#180b18] transition hover:-translate-y-0.5 hover:bg-orange-50"
          >
            Explorar el Marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div
            role="img"
            aria-label="Marketplace de Cható representado por una estación de trabajo conectada a reservas, catálogo, ventas, campañas, reseñas, encuestas y agentes de inteligencia artificial"
            className="relative mx-auto aspect-[1.598] w-full max-w-[44rem]"
          >
            <Image
              src="/images/brand/marketplace-ecosystem-figurative-v1.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-contain"
              style={{
                maskImage: "radial-gradient(ellipse 96% 94% at center, black 72%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 96% 94% at center, black 72%, transparent 100%)",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
