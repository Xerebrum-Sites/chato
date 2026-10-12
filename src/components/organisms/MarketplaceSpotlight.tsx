import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  ClipboardList,
  Filter,
  Infinity as InfinityIcon,
  Megaphone,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Reveal } from "@/components/atoms/Reveal";

const modules = [
  { icon: CalendarCheck, label: "Reservas", className: "left-[5%] top-[12%]", tone: "from-orange-400 to-rose-500" },
  { icon: ShoppingBag, label: "Catálogo", className: "right-[7%] top-[6%]", tone: "from-cyan-400 to-blue-500" },
  { icon: Filter, label: "Pipeline", className: "right-0 top-[42%]", tone: "from-fuchsia-500 to-violet-600" },
  { icon: Megaphone, label: "Campañas", className: "right-[8%] bottom-[15%] sm:right-[10%] sm:bottom-[5%]", tone: "from-orange-400 to-fuchsia-500" },
  { icon: Bot, label: "Agentes IA", className: "left-[11%] bottom-[15%] sm:left-[13%] sm:bottom-[4%]", tone: "from-violet-500 to-cyan-500" },
  { icon: ClipboardList, label: "Encuestas", className: "left-0 top-[46%]", tone: "from-cyan-400 to-emerald-500" },
  { icon: Star, label: "Reseñas", className: "left-[42%] top-0", tone: "from-amber-300 to-orange-500" },
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
            aria-label="Ecosistema visual de capacidades que se expanden de forma continua alrededor de Cható"
            className="relative mx-auto min-h-[32rem] w-full max-w-[41rem] sm:min-h-[37rem]"
          >
            <div className="absolute left-[8%] top-[12%] h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute bottom-[8%] right-[5%] h-56 w-56 rounded-full bg-fuchsia-600/25 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />

            <svg
              aria-hidden="true"
              viewBox="0 0 640 520"
              className="absolute inset-[4%] h-[92%] w-[92%] overflow-visible"
              fill="none"
            >
              <defs>
                <linearGradient id="marketplace-loop" x1="40" y1="80" x2="600" y2="440" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff8a16" />
                  <stop offset="0.48" stopColor="#d4146e" />
                  <stop offset="1" stopColor="#50d7e6" />
                </linearGradient>
                <filter id="marketplace-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M66 260C66 118 205 72 320 260C435 448 574 402 574 260C574 118 435 72 320 260C205 448 66 402 66 260Z"
                stroke="url(#marketplace-loop)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.6"
                filter="url(#marketplace-glow)"
              />
              <path
                d="M66 260C66 118 205 72 320 260C435 448 574 402 574 260C574 118 435 72 320 260C205 448 66 402 66 260Z"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="3 12"
                strokeLinecap="round"
                opacity="0.22"
              />
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 rotate-3 flex-col items-center justify-center rounded-[44%_56%_48%_52%] border border-white/20 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 shadow-2xl shadow-fuchsia-950/60 sm:h-48 sm:w-48">
              <div className="absolute inset-2 rounded-[48%_52%_46%_54%] border border-white/10" />
              <Sparkles className="mb-3 h-8 w-8 -rotate-3 text-orange-200" />
              <span className="-rotate-3 text-xl font-black">Cható</span>
              <span className="mt-1 -rotate-3 text-xs text-white/70">Todo conectado</span>
            </div>

            {modules.map(({ icon: Icon, label, className, tone }) => (
              <div key={label} className={`group absolute z-30 ${className} flex w-24 flex-col items-center sm:w-28`}>
                <div className={`flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br ${tone} shadow-xl shadow-black/30 transition duration-300 group-hover:-translate-y-1 group-hover:rotate-3 sm:h-20 sm:w-20 sm:rounded-[1.65rem]`}>
                  <Icon className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                </div>
                <p className="mt-2 rounded-full border border-white/10 bg-[#251326]/85 px-3 py-1.5 text-center text-[10px] font-black shadow-lg backdrop-blur sm:text-xs">
                  {label}
                </p>
              </div>
            ))}

            <div className="absolute bottom-[1%] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur">
              <InfinityIcon className="h-5 w-5 text-orange-300" /> Un ecosistema que se expande
            </div>

            <div className="absolute left-[28%] top-[28%] h-2 w-2 rounded-full bg-orange-300 shadow-[0_0_18px_6px_rgba(253,186,116,0.5)]" />
            <div className="absolute right-[29%] top-[25%] h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_rgba(103,232,249,0.45)]" />
            <div className="absolute bottom-[26%] left-[30%] h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_6px_rgba(240,171,252,0.45)]" />
            <div className="absolute bottom-[29%] right-[28%] h-1.5 w-1.5 rounded-full bg-orange-200" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
