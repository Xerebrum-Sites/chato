import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CirclePlus,
  Filter,
  Megaphone,
  Puzzle,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Reveal } from "@/components/atoms/Reveal";

const modules = [
  { icon: CalendarCheck, label: "Reservas", className: "left-0 top-0" },
  { icon: ShoppingBag, label: "Catálogo", className: "right-0 top-2" },
  { icon: Filter, label: "Pipeline", className: "left-0 bottom-3" },
  { icon: Megaphone, label: "Campañas", className: "right-0 bottom-0" },
];

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
            aria-label="Ecosistema de módulos conectados al núcleo de Cható"
            className="relative mx-auto min-h-[31rem] w-full max-w-[39rem] rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:min-h-[36rem] sm:p-8"
          >
            <div className="absolute inset-[16%] rounded-full border border-dashed border-white/15" />
            <div className="absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-white/15 bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-2xl shadow-fuchsia-950/60 sm:h-48 sm:w-48">
              <Puzzle className="mb-3 h-9 w-9 text-orange-300" />
              <span className="text-lg font-black">Núcleo Cható</span>
              <span className="mt-1 text-xs text-white/65">Un solo contexto</span>
            </div>

            {modules.map(({ icon: Icon, label, className }) => (
              <div key={label} className={`absolute z-20 ${className} w-32 rounded-2xl border border-white/10 bg-white/[0.09] p-4 shadow-xl backdrop-blur sm:w-40 sm:p-5`}>
                <Icon className="mb-3 h-6 w-6 text-cyan-300" />
                <p className="text-sm font-black">{label}</p>
                <p className="mt-1 text-[10px] text-white/55">Módulo conectado</p>
              </div>
            ))}

            <div className="absolute bottom-[3.5rem] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-xs font-bold text-orange-200 backdrop-blur">
              <CirclePlus className="h-4 w-4" /> Próximos módulos
            </div>
            <div className="absolute left-1/2 top-[3.7rem] z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold text-fuchsia-200 backdrop-blur">
              <Bot className="h-4 w-4" /> Agentes especializados
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
