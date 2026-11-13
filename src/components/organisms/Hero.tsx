"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Check, Layers3, MessagesSquare, Play, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { DemoForm } from "@/components/organisms/DemoForm";
import { URLS } from "@/lib/config";

const pillars = [
  { icon: MessagesSquare, title: "Todos tus canales", detail: "en un solo lugar" },
  { icon: Zap, title: "Automatizaciones", detail: "inteligentes" },
  { icon: Layers3, title: "Módulos que se", detail: "adaptan a tu operación" },
  { icon: BarChart3, title: "Resultados", detail: "medibles" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoEnabled, setDemoEnabled] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    fetch(`${URLS.api}/api/public/demo/config`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { enabled: true }))
      .then((data) => setDemoEnabled(data.enabled !== false))
      .catch(() => setDemoEnabled(true));
  }, []);

  return (
    <section className="actros-approved-hero relative isolate overflow-hidden bg-[#08091a] pb-7 pt-20 text-white sm:pb-11 lg:pt-24">
      <div className="actros-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="actros-dots absolute -left-12 top-12 h-80 w-80 opacity-20" aria-hidden="true" />
      <div className="actros-hero-vignette absolute inset-0" aria-hidden="true" />
      <div className="actros-hero-ribbon actros-hero-ribbon-one" aria-hidden="true" />
      <div className="actros-hero-ribbon actros-hero-ribbon-two" aria-hidden="true" />
      <div className="actros-hero-ribbon actros-hero-ribbon-three" aria-hidden="true" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.05, ease: EASE }}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[70%] overflow-hidden lg:block"
      >
        <Image
          src="/images/brand/hero-collaboration-v1.png"
          alt="Dos profesionales colaborando desde una computadora portátil"
          fill
          priority
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,59,.76)_0%,rgba(31,19,64,.57)_17%,rgba(32,16,50,.2)_52%,rgba(26,9,37,.04)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,9,43,.38),transparent_48%)]" />
      </motion.div>
      <HeroSignals reduceMotion={reduceMotion} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[37rem] items-center gap-7 py-8 lg:min-h-[25rem] lg:grid-cols-[.82fr_1.18fr] lg:py-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.72, ease: EASE }}
            className="relative z-20 max-w-[35rem]"
          >
            <h1 className="mb-5 text-balance text-[2.4rem] font-black leading-[.97] tracking-[-.05em] sm:text-5xl lg:text-[2.85rem]">
              <span className="block">Conectá conversaciones.</span>
              <span className="block">Potenciá equipos.</span>
              <span className="actros-headline-gradient block italic">Multiplicá oportunidades.</span>
            </h1>
            <p className="mb-7 max-w-xl text-base leading-relaxed text-white/88 sm:text-[1.02rem]">
              Una plataforma omnicanal con inteligencia artificial que conecta personas, automatiza procesos y transforma cada interacción en resultados.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/bandeja-omnicanal/" size="lg" className="gap-2">
                <Play className="h-4 w-4 fill-current" /> Ver cómo funciona
              </Button>
              {demoEnabled ? (
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/75 bg-white/8 px-6 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/18"
                >
                  Solicitar demo
                </button>
              ) : (
                <Button href={URLS.signIn} variant="outline" size="lg">Empezar gratis</Button>
              )}
            </div>
            <DemoForm open={demoOpen} onClose={() => setDemoOpen(false)} />
          </motion.div>

          <div className="relative z-10 min-h-[25rem] lg:min-h-full">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 28 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.14, ease: EASE }}
              className="relative h-72 overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_32px_88px_rgba(221,23,146,.28)] lg:hidden"
            >
              <Image src="/images/brand/hero-collaboration-v1.png" alt="Equipo colaborando" fill priority sizes="100vw" className="object-cover object-[64%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,9,26,.55),transparent_62%)]" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.64, ease: EASE }}
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
    </section>
  );
}

function HeroSignals({ reduceMotion }: { reduceMotion: boolean | null }) {
  const motionEnabled = !reduceMotion;
  return (
    <>
      <motion.div
        initial={motionEnabled ? { opacity: 0, y: -16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.54, duration: 0.58, ease: EASE }}
        className="absolute left-[39%] top-28 z-20 hidden w-[14rem] rounded-2xl border border-white/55 bg-[#431e57]/75 p-3 shadow-[0_12px_38px_rgba(252,56,160,.34)] backdrop-blur-xl lg:block"
      >
        <div className="flex items-center gap-2 border-b border-white/20 pb-2 text-xs font-semibold"><MessagesSquare className="h-5 w-5 text-emerald-300" /> Nuevos mensajes <span className="ml-auto rounded-full bg-actros-magenta px-1.5 py-0.5 text-[10px]">+12</span></div>
        <div className="flex items-center gap-2 pt-2 text-xs font-medium"><Check className="h-5 w-5 rounded-full bg-emerald-500 p-1" /> Reserva confirmada</div>
      </motion.div>

      <motion.div
        initial={motionEnabled ? { opacity: 0, x: 18 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.68, duration: 0.58, ease: EASE }}
        className="absolute right-[3%] top-[20rem] z-20 hidden w-[13rem] rounded-2xl border border-white/55 bg-[#591f53]/75 p-3 shadow-[0_12px_38px_rgba(252,56,160,.34)] backdrop-blur-xl 2xl:right-[6%] 2xl:top-24 lg:block"
      >
        <p className="text-sm font-bold">Resultados del mes</p>
        <div className="mt-3 flex h-11 items-end gap-2 border-b border-white/25 pb-1">
          {[14, 22, 29, 38].map((height, index) => <span key={height} style={{ height }} className="flex-1 rounded-t bg-gradient-to-t from-actros-orange to-actros-magenta" />)}
          <span className="mb-1 text-actros-magenta">↗</span>
        </div>
      </motion.div>

      <motion.div
        initial={motionEnabled ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.82, duration: 0.58, ease: EASE }}
        className="absolute left-[39%] top-[17rem] z-20 hidden items-center gap-2 rounded-2xl border border-white/55 bg-[#491c4a]/75 px-4 py-3 text-sm font-semibold shadow-[0_12px_38px_rgba(252,56,160,.34)] backdrop-blur-xl lg:flex"
      >
        <Sparkles className="h-5 w-5 text-[#ffca39]" /> Automatización activa
        <span className="ml-1 flex h-5 w-9 items-center justify-end rounded-full bg-gradient-to-r from-actros-magenta to-[#ff376c] p-0.5"><span className="h-4 w-4 rounded-full bg-white shadow" /></span>
      </motion.div>
    </>
  );
}
