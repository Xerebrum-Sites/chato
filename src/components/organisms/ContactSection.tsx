"use client";

import { useState } from "react";
import { MessageCircle, Mail, CalendarClock, ArrowRight, Check } from "lucide-react";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Stagger, StaggerItem, Reveal } from "@/components/atoms/Reveal";
import { DemoForm } from "@/components/organisms/DemoForm";
import { CONTACT, EMAILS } from "@/lib/config";

/**
 * Opciones de contacto comercial: WhatsApp directo, email y agenda de demo.
 * Pensado para que el usuario llegue rápido a contratar o consultar.
 */
export function ContactSection() {
  const [demoOpen, setDemoOpen] = useState(false);

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
      icon: Mail,
      title: "Mandanos un email",
      description: "Contanos sobre tu negocio y te respondemos a la brevedad.",
      action: (
        <a
          href={`mailto:${EMAILS.contact}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-800"
        >
          {EMAILS.contact} <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </a>
      ),
    },
    {
      icon: CalendarClock,
      title: "Agendá una demo",
      description: "Te mostramos Cható en vivo y respondemos todo lo que necesites.",
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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stagger className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <StaggerItem
              key={c.title}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all duration-300"
            >
              <IconBadge icon={c.icon} size="lg" className="mb-5" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{c.description}</p>
              {c.action}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {["14 días gratis", "Sin tarjeta de crédito", "Sin permanencia"].map((t) => (
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
