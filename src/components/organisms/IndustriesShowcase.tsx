"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Quote } from "lucide-react";
import { InfinityTrails } from "@/components/atoms/InfinityTrails";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { industries } from "@/lib/content";

export function IndustriesTeaser() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const reduceMotion = useReducedMotion();
  const active = industries.find((industry) => industry.id === activeId) ?? industries[0];

  return (
    <section className="relative isolate overflow-hidden bg-[#fffaf5] py-24">
      <div className="absolute inset-0 opacity-[0.14]" aria-hidden="true"><InfinityTrails tone="light" /></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Para tu industria"
          badgeVariant="green"
          title={<>Cada rubro tiene su forma de atender. <span className="gradient-text">Axtroos se adapta.</span></>}
          subtitle="Elegí un sector y mirá una operación concreta: personas reales, en su contexto y con Axtroos como puesto de trabajo."
          className="mb-10"
        />

        <div role="tablist" aria-label="Elegir industria" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {industries.map((industry) => {
            const selected = industry.id === active.id;
            return (
              <button
                key={industry.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="industry-panel"
                onClick={() => setActiveId(industry.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${selected ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200" : "border-violet-100 bg-white text-gray-700 hover:border-violet-300 hover:text-violet-700"}`}
              >
                <industry.icon className="h-4 w-4" strokeWidth={1.9} />
                {industry.sector}
              </button>
            );
          })}
        </div>

        <div id="industry-panel" role="tabpanel" className="relative min-h-[38rem] lg:min-h-[32rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid items-center gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12"
            >
              <div className="relative z-10 order-2 lg:order-1 lg:pl-8">
                <div className="mb-5 flex items-center gap-3">
                  <IconBadge icon={active.icon} size="md" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">{active.sector}</p>
                </div>
                <h3 className="mb-4 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">{active.title}</h3>
                <p className="mb-5 max-w-xl text-lg leading-relaxed text-gray-600">{active.solution}</p>
                <div className="mb-7 inline-flex items-start gap-2.5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  {active.result}
                </div>
                <div>
                  <Link href={`/casos-de-uso/#${active.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-violet-700 hover:text-violet-800">
                    Ver este caso en detalle <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <IndustryVisual industry={active} priority />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function IndustriesShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fffaf5] py-8 lg:py-12">
      <div className="absolute inset-0 opacity-[0.11]" aria-hidden="true"><InfinityTrails tone="light" /></div>
      <div className="relative mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:space-y-28 lg:px-8">
        {industries.map((industry, index) => {
          const reversed = index % 2 === 1;
          return (
            <div key={industry.id} id={industry.id} className="scroll-mt-28">
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <Reveal direction={reversed ? "left" : "right"} className={reversed ? "lg:order-2" : ""}>
                  <IndustryVisual industry={industry} />
                </Reveal>

                <Reveal direction={reversed ? "right" : "left"} delay={0.1} className={reversed ? "lg:order-1" : ""}>
                  <h2 className="mb-5 text-2xl font-black text-gray-900 sm:text-3xl">{industry.title}</h2>
                  <div className="mb-5 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <Quote className="mb-2 h-5 w-5 text-violet-300" strokeWidth={2} />
                    <p className="italic leading-relaxed text-gray-600">{industry.problem}</p>
                  </div>
                  <div className="mb-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-violet-700">Cómo ayuda Axtroos</p>
                    <p className="leading-relaxed text-gray-600">{industry.solution}</p>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    <p className="text-sm font-medium text-emerald-800">{industry.result}</p>
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

function IndustryVisual({ industry, priority = false }: { industry: (typeof industries)[number]; priority?: boolean }) {
  return (
    <div className="relative isolate min-h-[22rem] overflow-hidden rounded-[2.25rem] border border-white/80 bg-[#fffdf9] shadow-[0_24px_60px_rgba(0,31,52,.09)] sm:min-h-[30rem]">
      <div className="absolute inset-0 opacity-[0.3]" aria-hidden="true"><InfinityTrails tone="light" /></div>
      <div className="absolute right-[7%] top-[6%] h-[76%] w-[76%] rounded-[42%] bg-gradient-to-br from-[#ee7d16]/18 via-[#c61261]/10 to-transparent blur-2xl" aria-hidden="true" />
      <Image
        src={industry.image}
        alt={industry.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-contain object-center p-6 sm:p-10 [mask-image:radial-gradient(ellipse_78%_76%_at_57%_48%,#000_51%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-[-8%] bottom-[-11%] h-[48%] opacity-[0.3]" aria-hidden="true">
        <InfinityTrails tone="light" />
      </div>
      <div className="pointer-events-none absolute inset-x-7 bottom-0 h-24 bg-gradient-to-t from-[#fffdf9]/85 via-[#fffdf9]/20 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-full border border-white/80 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur">
        <IconBadge icon={industry.icon} size="sm" />
        <span className="text-xs font-bold uppercase tracking-wide text-violet-700">{industry.sector}</span>
      </div>
      <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/75 text-actros-magenta shadow-lg backdrop-blur" aria-hidden="true">
        <industry.icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
    </div>
  );
}
