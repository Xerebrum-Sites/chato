"use client";

import { useState } from "react";
import { MessageCircle, CalendarClock, ArrowRight, Check } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { InfinityTrails } from "@/components/atoms/InfinityTrails";
import { Stagger, StaggerItem, Reveal } from "@/components/atoms/Reveal";
import { DemoForm } from "@/components/organisms/DemoForm";
import { ContactForm } from "@/components/organisms/ContactForm";
import { CONTACT } from "@/lib/config";
import { useTrialDays } from "@/hooks/useTrialDays";

/**
 * Opciones de contacto comercial: formulario, WhatsApp directo y agenda de demo.
 * Pensado para que el usuario llegue rápido a contratar o consultar.
 */
export function ContactSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  const trialDays = useTrialDays();

  const cards = [
    {
      icon: MessageCircle,
      title: "Escribinos por WhatsApp",
      description: "La vía más rápida para resolver tus dudas y empezar hoy mismo.",
      action: (
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-800"
        >
          Abrir WhatsApp <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </a>
      ),
    },
    {
      icon: CalendarClock,
      title: "Agendá una demo",
      description: "Te mostramos Axtroos en vivo y respondemos todo lo que necesites.",
      action: (
        <button
          type="button"
          onClick={() => setDemoOpen(true)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-800"
        >
          Elegí día y horario <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </button>
      ),
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#fffaf5] py-20">
      <div className="absolute inset-0 opacity-[0.16]" aria-hidden="true"><InfinityTrails tone="light" /></div>
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#ee7d16]/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#c61261]/10 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <ContactForm />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {cards.map((c) => (
              <StaggerItem
                key={c.title}
                className="flex flex-col rounded-2xl border border-white/80 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-lg"
              >
                <IconBadge icon={c.icon} size="lg" className="mb-5" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{c.description}</p>
                {c.action}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-white/80 bg-white/70 px-6 py-3 text-sm text-gray-600 shadow-sm backdrop-blur">
          {[trialDays ? `${trialDays} días gratis` : "Prueba gratis", "Sin tarjeta de crédito", "Sin permanencia"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
              {t}
            </span>
          ))}
        </Reveal>
      </div>

      <DemoForm open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
