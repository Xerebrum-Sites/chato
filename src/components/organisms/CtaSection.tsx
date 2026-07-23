"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ChannelIcon } from "@/components/atoms/ChannelIcon";
import { DemoForm } from "@/components/organisms/DemoForm";
import { URLS, CONTACT } from "@/lib/config";
import { supportedChannels } from "@/lib/content";

interface CtaSectionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
}

/**
 * Banda de cierre reutilizable. Aparece al final de la home y de las páginas
 * interiores para llevar al usuario a registrarse o pedir una demo.
 */
export function CtaSection({ title, subtitle }: CtaSectionProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoEnabled, setDemoEnabled] = useState(true);

  useEffect(() => {
    fetch(`${URLS.api}/api/public/demo/config`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { enabled: true }))
      .then((d) => setDemoEnabled(d.enabled !== false))
      .catch(() => setDemoEnabled(true));
  }, []);

  return (
    <section id="registro" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          {supportedChannels.map((ch) => (
            <div key={ch} className="opacity-90">
              <ChannelIcon channel={ch} size="md" />
            </div>
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight text-balance">
          {title ?? (
            <>
              Empezá a responder todos
              <br />
              tus canales desde hoy
            </>
          )}
        </h2>

        <p className="text-violet-100 text-lg mb-10 max-w-lg mx-auto">
          {subtitle ?? "14 días gratis. Sin tarjeta de crédito. Cancelás cuando quieras."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href={URLS.signIn} variant="secondary" size="lg" className="w-full sm:w-auto">
            Crear cuenta gratis
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </Button>
          {demoEnabled && (
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full text-base font-semibold text-white hover:bg-white/10 transition-colors border-2 border-white/30"
            >
              Solicitar demo
            </button>
          )}
        </div>
        <DemoForm open={demoOpen} onClose={() => setDemoOpen(false)} />

        <p className="mt-8 text-violet-100/80 text-sm">
          ¿Tenés dudas?{" "}
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            Escribinos por WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
