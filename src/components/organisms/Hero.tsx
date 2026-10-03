"use client";

import { useEffect, useState } from "react";
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
  { channel: "facebook" as const, name: "Diego", text: "Necesito ayuda con mi pedido", age: "8 min" },
];

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoEnabled, setDemoEnabled] = useState(true);

  useEffect(() => {
    fetch(`${URLS.api}/api/public/demo/config`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { enabled: true }))
      .then((data) => setDemoEnabled(data.enabled !== false))
      .catch(() => setDemoEnabled(true));
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 gradient-bg opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(124,58,237,0.12),transparent_35%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <Badge variant="violet" className="mb-6">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            Atención omnicanal, sin conversaciones perdidas
          </Badge>
          <h1 className="mb-6 text-balance text-4xl font-black leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Todos tus canales en <span className="gradient-text">una sola bandeja</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Atendé WhatsApp, Instagram, Facebook, Telegram y tu web desde Cható. Sumá agentes IA,
            coordiná a tu equipo y seguí cada conversación sin cambiar de herramienta.
          </p>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row">
            <Button href={URLS.signIn} size="lg">Empezar gratis 14 días</Button>
            {demoEnabled ? (
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center justify-center rounded-full border-2 border-violet-600 px-6 py-3.5 text-base font-semibold text-violet-700 transition-colors hover:bg-violet-50"
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
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-violet-300/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-2xl shadow-violet-200/50 backdrop-blur">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                  <Inbox className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Bandeja de entrada</p>
                  <p className="text-xs text-gray-500">Todos los canales, en tiempo real</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">4 nuevas</span>
            </div>

            <div className="grid sm:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-gray-100 p-3 sm:border-b-0 sm:border-r">
                {conversations.map((conversation, index) => (
                  <div
                    key={conversation.name}
                    className={`mb-1 flex items-center gap-3 rounded-2xl p-3 ${index === 0 ? "bg-violet-50 ring-1 ring-violet-100" : "hover:bg-gray-50"}`}
                  >
                    <ChannelIcon channel={conversation.channel} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-gray-900">{conversation.name}</p>
                        <span className="text-[10px] text-gray-400">{conversation.age}</span>
                      </div>
                      <p className="truncate text-xs text-gray-500">{conversation.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex min-h-72 flex-col p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Lucía</p>
                    <p className="text-xs text-emerald-600">WhatsApp · en línea</p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-xs font-bold text-violet-700">IA</div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-xs font-bold text-amber-700">AM</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-sm text-gray-700">¿Tienen la talla M disponible?</div>
                  <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-violet-600 px-4 py-3 text-sm text-white">¡Sí! La tenemos en azul y negro. ¿Querés que te reserve una?</div>
                </div>
                <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
                  {[
                    { icon: Sparkles, label: "IA activa" },
                    { icon: Users, label: "Equipo" },
                    { icon: BarChart3, label: "Métricas" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="rounded-xl bg-gray-50 p-2 text-center text-[10px] font-semibold text-gray-600">
                      <Icon className="mx-auto mb-1 h-4 w-4 text-violet-600" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
