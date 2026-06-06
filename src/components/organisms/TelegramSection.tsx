"use client";

import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { ChannelIcon } from "@/components/atoms/ChannelIcon";
import { Button } from "@/components/atoms/Button";

type Channel = "whatsapp" | "instagram" | "facebook" | "web";

const channels: { id: Channel; label: string; color: string; message: string; sender: string }[] = [
  { id: "whatsapp", label: "WhatsApp", color: "from-[#25D366] to-[#1da851]", message: "Hola! ¿Tienen el producto en azul?", sender: "María G." },
  { id: "instagram", label: "Instagram", color: "from-[#f09433] to-[#bc1888]", message: "Vi su publicación, ¿hacen envíos?", sender: "carlos_dev" },
  { id: "facebook", label: "Facebook", color: "from-[#1877F2] to-[#0d5fc2]", message: "Buenos días, necesito información", sender: "Juan Pérez" },
  { id: "web", label: "Web Chat", color: "from-violet-500 to-violet-700", message: "¿Cuánto demora el pedido?", sender: "Visitante Web" },
];

const benefits = [
  "Una sola app para gestionar todo - Telegram ya la tienes instalada",
  "Notificaciones en tiempo real sin depender de apps de terceros",
  "Historial completo de conversaciones por canal",
  "Responde igual de rápido desde el móvil o el escritorio",
  "Funciona offline: cuando vuelves a conectarte se sincroniza",
];

export function TelegramSection() {
  const [activeChannel, setActiveChannel] = useState<Channel>("whatsapp");
  const active = channels.find((c) => c.id === activeChannel)!;

  return (
    <section id="modo-simple" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2AABEE]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Explanation */}
          <div>
            <Badge className="mb-6" variant="cyan">
              ✨ Rápido y accesible
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
              Modo Simple:{" "}
              <span className="gradient-text">todo centralizado</span>
            </h2>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Sin aprender nuevas herramientas. Sin complicaciones.
              Centraliza WhatsApp, Instagram, Facebook y tu web en un único lugar de trabajo,
              utilizando la plataforma de mensajería que prefieras.
            </p>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Tus clientes te escriben donde prefieren. Tú respondes siempre desde el mismo hub.
              Una bandeja unificada, un contexto completo, sin duplicados.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2AABEE]/15 text-[#2AABEE] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button href="#registro" size="lg">
              Empezar ahora
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>

          {/* Right: Interactive mockup */}
          <div className="relative">
            {/* Channel selector tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeChannel === ch.id
                      ? "bg-white shadow-md border border-gray-200 text-gray-900"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
                >
                  <ChannelIcon channel={ch.id} size="sm" />
                  {ch.label}
                </button>
              ))}
            </div>

            {/* Flow visualization */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Source channel header */}
              <div className={`bg-gradient-to-r ${active.color} px-5 py-4 flex items-center gap-3`}>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ChannelIcon channel={activeChannel} size="sm" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Mensaje desde {active.label}</p>
                  <p className="text-white/70 text-xs">Recibido ahora</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Incoming message */}
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {active.sender[0]}
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%]">
                    <p className="text-xs font-semibold text-gray-600 mb-0.5">{active.sender}</p>
                    <p className="text-sm text-gray-800">{active.message}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">10:23 am</p>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-[#2AABEE]/40" />
                  <div className="flex items-center gap-1.5 bg-[#2AABEE]/10 rounded-full px-3 py-1.5">
                    <svg className="w-3.5 h-3.5 text-[#2AABEE]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="text-xs font-semibold text-[#2AABEE]">Llega a tu Telegram</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#2AABEE]/40 to-gray-200" />
                </div>

                {/* Telegram view */}
                <div className="bg-[#2AABEE]/5 rounded-2xl border border-[#2AABEE]/20 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#2AABEE] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-[#2AABEE]">Cható → Bot de Telegram</span>
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2.5 border border-[#2AABEE]/20">
                    <p className="text-xs text-gray-500 mb-1">
                      📱 <strong>{active.label}</strong> · {active.sender}
                    </p>
                    <p className="text-sm text-gray-800">{active.message}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-right">Responde aquí y llegará a {active.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
