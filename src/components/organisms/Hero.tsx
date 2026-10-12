"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BarChart3, Check, Inbox, Sparkles, Users } from "lucide-react";
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

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoEnabled, setDemoEnabled] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72]);
  const productY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -34]);

  useEffect(() => {
    fetch(`${URLS.api}/api/public/demo/config`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { enabled: true }))
      .then((data) => setDemoEnabled(data.enabled !== false))
      .catch(() => setDemoEnabled(true));
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#fffaf5] pt-20 lg:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(6,182,212,0.12),transparent_26%),radial-gradient(circle_at_17%_80%,rgba(255,150,0,0.12),transparent_28%)]" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

      <div className="relative mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <motion.div
          style={{ y: photoY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, x: 28 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-4 inset-y-3 hidden sm:inset-x-6 lg:inset-x-8 lg:block"
        >
          <Image
            src="/images/brand/hero-desktop-owner-v2.webp"
            alt="Responsable de atención trabajando con Cható desde una estación de escritorio"
            fill
            priority
            sizes="(min-width: 1024px) 1280px, 100vw"
            className="object-contain object-center"
          />
        </motion.div>

        <div className="relative grid min-h-[calc(100vh-9rem)] items-center gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 max-w-xl"
        >
          <Badge variant="violet" className="mb-6 bg-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            Operación omnicanal desde tu escritorio
          </Badge>

          <h1 className="mb-6 text-balance text-[2.75rem] font-black leading-[0.98] tracking-[-0.045em] text-gray-950 sm:text-6xl lg:text-[4.7rem]">
            {titleLines.map((line, lineIndex) => (
              <span key={line.join("-")} className="block overflow-hidden pb-1">
                {line.map((word, wordIndex) => {
                  const gradient = lineIndex === 1 && wordIndex > 0;
                  return (
                    <motion.span
                      key={word}
                      initial={reduceMotion ? false : { opacity: 0, x: lineIndex === 0 ? -70 : 70, y: 14 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ delay: 0.12 + lineIndex * 0.28 + wordIndex * 0.09, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                      className={`mr-[0.22em] inline-block ${gradient ? "gradient-text" : ""}`}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            WhatsApp, Instagram, Facebook, Telegram y tu web llegan a una única estación de trabajo.
            Tu equipo y tus agentes IA atienden con contexto, orden y seguimiento real.
          </p>

          <div className="mb-9 flex flex-col gap-3 sm:flex-row">
            <Button href={URLS.signIn} size="lg">Empezar gratis 14 días</Button>
            {demoEnabled ? (
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center justify-center rounded-full border-2 border-violet-600 bg-white/70 px-6 py-3.5 text-base font-semibold text-violet-700 backdrop-blur transition-colors hover:bg-white"
              >
                Solicitar demo
              </button>
            ) : (
              <Button href="/bandeja-omnicanal/" variant="outline" size="lg">Ver cómo funciona</Button>
            )}
          </div>
          <DemoForm open={demoOpen} onClose={() => setDemoOpen(false)} />

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
            {["14 días gratis", "Sin tarjeta de crédito", "Sin permanencia"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[34rem] sm:min-h-[41rem] lg:min-h-full">
          <motion.div
            style={{ y: photoY }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 h-[76%] overflow-hidden rounded-[2rem] sm:h-[80%] lg:hidden"
          >
            <Image
              src="/images/brand/hero-desktop-owner-v2.webp"
              alt="Responsable de atención trabajando con Cható desde una estación de escritorio"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[74%_center]"
            />
          </motion.div>

          <motion.div
            style={{ y: productY }}
            initial={reduceMotion ? false : { opacity: 0, y: 54, rotate: 1.4 }}
            animate={{ opacity: 1, y: 0, rotate: -1.1 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-1/2 z-10 w-[96%] -translate-x-1/2 sm:bottom-2 sm:w-[88%] lg:bottom-7 lg:left-auto lg:right-2 lg:w-[74%] lg:translate-x-0"
          >
            <InboxPreview />
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}

function InboxPreview() {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-white/80 bg-white/92 shadow-[0_30px_80px_rgba(77,5,48,0.22)] backdrop-blur-xl">
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
