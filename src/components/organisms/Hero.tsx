"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BarChart3, Check, Inbox, MessagesSquare, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ChannelIcon } from "@/components/atoms/ChannelIcon";
import { DemoForm } from "@/components/organisms/DemoForm";
import { URLS } from "@/lib/config";

const conversations = [
  { channel: "whatsapp" as const, name: "Lucía", text: "¿Tienen la talla M?", age: "ahora" },
  { channel: "instagram" as const, name: "Marcos", text: "Quiero reservar para mañana", age: "2 min" },
  { channel: "telegram" as const, name: "Sofía", text: "¿Hacen envíos?", age: "5 min" },
];

const titleLines = [
  ["Todos", "tus", "canales"],
  ["en", "una", "sola", "bandeja"],
];

const heroPillars = [
  { icon: MessagesSquare, label: "Todos tus canales", detail: "un solo lugar" },
  { icon: Sparkles, label: "Automatizaciones", detail: "con contexto" },
  { icon: Users, label: "Equipo e IA", detail: "coordinados" },
  { icon: BarChart3, label: "Seguimiento", detail: "en tiempo real" },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoEnabled, setDemoEnabled] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 56]);
  const productY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -30]);

  useEffect(() => {
    fetch(`${URLS.api}/api/public/demo/config`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { enabled: true }))
      .then((data) => setDemoEnabled(data.enabled !== false))
      .catch(() => setDemoEnabled(true));
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#0b0b17" }} className="relative isolate overflow-hidden pb-10 pt-20 text-white sm:pb-14 lg:pt-24">
      <div className="actros-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="actros-dots absolute -left-16 top-16 h-80 w-80 opacity-25" aria-hidden="true" />
      <div className="actros-hero-trail actros-hero-trail-one" aria-hidden="true" />
      <div className="actros-hero-trail actros-hero-trail-two" aria-hidden="true" />
      <div className="actros-hero-glow absolute inset-0" aria-hidden="true" />

      <motion.div
        style={{ y: photoY }}
        initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease }}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[68%] overflow-hidden lg:block"
      >
        <Image
          src="/images/brand/hero-desktop-owner-v3.webp"
          alt="Responsable de atención trabajando con Actroos desde una estación de escritorio"
          fill
          priority
          sizes="(min-width: 1024px) 68vw, 100vw"
          className="object-cover object-[78%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0b17_0%,rgba(11,11,23,0.94)_12%,rgba(11,11,23,0.35)_47%,rgba(11,11,23,0.1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,11,23,0.72),transparent_42%)]" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[36rem] items-center gap-10 py-10 lg:min-h-[39rem] lg:grid-cols-[0.88fr_1.12fr] lg:py-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.72, ease }}
            className="relative z-20 max-w-2xl"
          >
            <Badge variant="violet" className="mb-6 border-white/20 bg-white/10 text-white backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-actros-orange" />
              Operación omnicanal desde tu escritorio
            </Badge>

            <h1 className="mb-6 text-balance text-[2.75rem] font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.45rem]">
              {titleLines.map((line, lineIndex) => (
                <span key={line.join("-")} className="block overflow-hidden pb-1">
                  {line.map((word, wordIndex) => {
                    const gradient = lineIndex === 1 && wordIndex > 0;
                    return (
                      <motion.span
                        key={word}
                        initial={reduceMotion ? false : { opacity: 0, x: lineIndex === 0 ? -60 : 60, y: 14 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.12 + lineIndex * 0.23 + wordIndex * 0.08, duration: 0.66, ease }}
                        className={`mr-[0.2em] inline-block ${gradient ? "gradient-text" : ""}`}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/76 sm:text-xl">
              WhatsApp, Instagram, Facebook, Telegram y tu web llegan a una única estación de trabajo.
              Tu equipo y tus agentes IA atienden con contexto, orden y seguimiento real.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <Button href={URLS.signIn} size="lg">Empezar gratis 14 días</Button>
              {demoEnabled ? (
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="inline-flex items-center justify-center rounded-xl border border-white/45 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-md transition hover:border-white hover:bg-white/20"
                >
                  Solicitar demo
                </button>
              ) : (
                <Button href="/bandeja-omnicanal/" variant="outline" size="lg">Ver cómo funciona</Button>
              )}
            </div>
            <DemoForm open={demoOpen} onClose={() => setDemoOpen(false)} />

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/68">
              {["14 días gratis", "Sin tarjeta de crédito", "Sin permanencia"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-actros-orange" strokeWidth={2.5} />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 min-h-[23rem] lg:min-h-full">
            <motion.div
              style={{ y: photoY }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease }}
              className="relative h-64 overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_30px_90px_rgba(198,18,97,0.25)] lg:hidden"
            >
              <Image
                src="/images/brand/hero-desktop-owner-v3.webp"
                alt="Responsable de atención trabajando con Actroos desde una estación de escritorio"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[78%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,11,23,0.55),transparent_58%)]" />
            </motion.div>

            <motion.div
              style={{ y: productY }}
              initial={reduceMotion ? false : { opacity: 0, y: 44, rotate: 1.2 }}
              animate={{ opacity: 1, y: 0, rotate: -1.2 }}
              transition={{ duration: 0.82, delay: 0.62, ease }}
              className="absolute -bottom-4 left-3 right-3 z-20 sm:left-auto sm:right-0 sm:w-[78%] lg:bottom-4 lg:right-2 lg:w-[76%]"
            >
              <InboxPreview />
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.75, ease }}
              className="absolute right-2 top-8 hidden rounded-2xl border border-white/35 bg-[#0b0b17]/70 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(198,18,97,0.25)] backdrop-blur-xl lg:block"
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-actros-magenta"><Sparkles className="h-3.5 w-3.5" /></span>
              Automatización activa
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.85, ease }}
          className="relative z-20 grid overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/95 text-[#001f34] shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
        >
          {heroPillars.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex items-center gap-3 border-b border-[#001f34]/10 px-5 py-4 last:border-b-0 sm:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1e8] text-actros-orange">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-sm font-black leading-tight">{label}<br /><span className="font-semibold text-[#001f34]/65">{detail}</span></span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function InboxPreview() {
  return (
    <div className="overflow-hidden rounded-[1.45rem] border border-white/80 bg-white/95 text-[#001f34] shadow-[0_24px_72px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white"><Inbox className="h-4 w-4" /></div>
          <div>
            <p className="text-sm font-bold text-gray-900 sm:text-base">Bandeja omnicanal</p>
            <p className="text-[10px] text-gray-500 sm:text-xs">Operación de escritorio · en tiempo real</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:text-xs">4 nuevas</span>
      </div>

      <div className="grid grid-cols-[0.9fr_1.1fr]">
        <div className="border-r border-gray-100 p-2 sm:p-3">
          {conversations.map((conversation, index) => (
            <div key={conversation.name} className={`flex items-center gap-2 rounded-xl p-2 ${index === 0 ? "bg-violet-50 ring-1 ring-violet-100" : ""}`}>
              <ChannelIcon channel={conversation.channel} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[11px] font-semibold text-gray-900 sm:text-xs">{conversation.name}</p>
                  <span className="hidden text-[9px] text-gray-400 sm:block">{conversation.age}</span>
                </div>
                <p className="truncate text-[9px] text-gray-500 sm:text-[10px]">{conversation.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex min-h-48 flex-col p-3 sm:min-h-56 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-900 sm:text-sm">Lucía</p>
              <p className="text-[9px] text-emerald-600 sm:text-[10px]">WhatsApp · en línea</p>
            </div>
            <div className="flex -space-x-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-[9px] font-bold text-violet-700">IA</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-[9px] font-bold text-amber-700">AM</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="max-w-[86%] rounded-xl rounded-tl-sm bg-gray-100 px-3 py-2 text-[9px] text-gray-700 sm:text-[11px]">¿Tienen la talla M?</div>
            <div className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm bg-violet-600 px-3 py-2 text-[9px] text-white sm:text-[11px]">Sí, en azul y negro. ¿Te reservo una?</div>
          </div>
          <div className="mt-auto grid grid-cols-3 gap-1.5 pt-3">
            {[{ icon: Sparkles, label: "IA" }, { icon: Users, label: "Equipo" }, { icon: BarChart3, label: "Métricas" }].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-lg bg-gray-50 p-1.5 text-center text-[8px] font-semibold text-gray-600 sm:text-[9px]">
                <Icon className="mx-auto mb-0.5 h-3 w-3 text-violet-600" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
