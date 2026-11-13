"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Check, Layers3, MessagesSquare, Sparkles, Zap } from "lucide-react";

const pillars = [
  { icon: MessagesSquare, title: "Todos tus canales", detail: "en un solo lugar" },
  { icon: Zap, title: "Automatizaciones", detail: "inteligentes" },
  { icon: Layers3, title: "Módulos que se", detail: "adaptan a tu operación" },
  { icon: BarChart3, title: "Resultados", detail: "medibles" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="actros-approved-hero relative isolate overflow-hidden pb-6 pt-20 text-white sm:pb-10 lg:pt-24">
      <div className="actros-grid absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="actros-dots absolute -left-12 top-12 h-80 w-80 opacity-20" aria-hidden="true" />
      <div className="actros-hero-vignette absolute inset-0" aria-hidden="true" />
      <div className="actros-hero-ribbon actros-hero-ribbon-one" aria-hidden="true" />
      <div className="actros-hero-ribbon actros-hero-ribbon-two" aria-hidden="true" />
      <div className="actros-hero-ribbon actros-hero-ribbon-three" aria-hidden="true" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.05, ease: EASE }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Image
          src="/images/brand/hero-collaboration-v1.png"
          alt="Dos profesionales colaborando desde una computadora portátil"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,18,76,.94)_0%,rgba(48,23,85,.78)_27%,rgba(42,17,62,.34)_53%,rgba(23,9,40,.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,10,43,.46),transparent_48%)]" />
      </motion.div>

      <HeroSignals reduceMotion={reduceMotion} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[32rem] items-center py-8 lg:min-h-[27rem] lg:grid-cols-[.82fr_1.18fr] lg:py-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.72, ease: EASE }}
            className="relative z-20 max-w-[32rem]"
          >
            <h1 className="text-balance text-[2.35rem] font-black leading-[.98] tracking-[-.048em] sm:text-5xl lg:text-[3.15rem]">
              <span className="block">Conectá tus conversaciones.</span>
              <span className="actros-headline-gradient block italic">Multiplicá oportunidades.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/88 sm:text-[1.02rem]">
              Omnicanalidad e inteligencia para convertir cada conversación en una oportunidad.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56, ease: EASE }}
          className="relative z-30 grid overflow-hidden rounded-[1.7rem] border border-white/80 bg-white/[.97] text-[#071642] shadow-[0_22px_64px_rgba(5,4,25,.32)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center gap-3 border-b border-[#071642]/10 px-5 py-4 last:border-b-0 sm:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff2e9] text-actros-orange">
                <Icon className="h-6 w-6" strokeWidth={2.15} />
              </span>
              <span className="text-[.93rem] font-black leading-[1.08] tracking-[-.025em]">{title}<br />{detail}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="hero-soft-transition absolute inset-x-0 -bottom-px z-10 h-36" aria-hidden="true" />
    </section>
  );
}

function HeroSignals({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="pointer-events-none">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -16 }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 0.5, duration: 0.55, ease: EASE }, y: { delay: 0.7, duration: 4.8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute left-[32%] top-28 z-20 hidden w-[14rem] rounded-2xl border border-white/60 bg-[#4b255f]/78 p-3 shadow-[0_12px_42px_rgba(252,56,160,.45)] backdrop-blur-xl lg:block"
      >
        <div className="flex items-center gap-2 border-b border-white/20 pb-2 text-xs font-semibold"><MessagesSquare className="h-5 w-5 text-emerald-300" /> Nuevos mensajes <span className="ml-auto rounded-full bg-actros-magenta px-1.5 py-0.5 text-[10px]">+12</span></div>
        <div className="flex items-center gap-2 pt-2 text-xs font-medium"><Check className="h-5 w-5 rounded-full bg-emerald-500 p-1" /> Reserva confirmada</div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 18 }}
        animate={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: [0, 7, 0] }}
        transition={{ opacity: { delay: 0.72, duration: 0.55, ease: EASE }, x: { delay: 0.72, duration: 0.55, ease: EASE }, y: { delay: 1.1, duration: 5.4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-[8.6rem] right-[3%] z-20 hidden w-[13rem] rounded-2xl border border-white/60 bg-[#692957]/80 p-3 shadow-[0_12px_42px_rgba(252,56,160,.45)] backdrop-blur-xl lg:block"
      >
        <p className="text-sm font-bold">Resultados del mes</p>
        <div className="mt-3 flex h-11 items-end gap-2 border-b border-white/25 pb-1">
          {[14, 22, 29, 38].map((height) => <span key={height} style={{ height }} className="flex-1 rounded-t bg-gradient-to-t from-actros-orange to-actros-magenta" />)}
          <span className="mb-1 text-actros-magenta">↗</span>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, x: [0, 8, 0] }}
        transition={{ opacity: { delay: 0.88, duration: 0.55, ease: EASE }, y: { delay: 0.88, duration: 0.55, ease: EASE }, x: { delay: 1.2, duration: 5.1, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute left-[40%] top-[16.5rem] z-20 hidden items-center gap-2 rounded-2xl border border-white/60 bg-[#52234f]/80 px-4 py-3 text-sm font-semibold shadow-[0_12px_42px_rgba(252,56,160,.45)] backdrop-blur-xl lg:flex"
      >
        <Sparkles className="h-5 w-5 text-[#ffca39]" /> Automatización activa
        <span className="ml-1 flex h-5 w-9 items-center justify-end rounded-full bg-gradient-to-r from-actros-magenta to-[#ff376c] p-0.5"><span className="h-4 w-4 rounded-full bg-white shadow" /></span>
      </motion.div>
    </div>
  );
}
