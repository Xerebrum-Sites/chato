"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ChannelIcon } from "@/components/atoms/ChannelIcon";

type Channel = "whatsapp" | "instagram" | "facebook" | "telegram" | "web" | "email";

const incomingMessages = [
  { id: 1, channel: "whatsapp" as Channel, text: "Hola! ¿Tienen disponible la talla M?", time: "10:21" },
  { id: 2, channel: "instagram" as Channel, text: "¿A qué hora cierran hoy?", time: "10:22" },
  { id: 3, channel: "facebook" as Channel, text: "Quiero hacer un pedido de delivery", time: "10:23" },
  { id: 4, channel: "web" as Channel, text: "¿Cuál es el precio del plan mensual?", time: "10:24" },
];

const channelColors: Record<Channel, string> = {
  whatsapp: "bg-[#25D366]",
  instagram: "bg-gradient-to-br from-[#f09433] to-[#bc1888]",
  facebook: "bg-[#1877F2]",
  telegram: "bg-[#2AABEE]",
  web: "bg-violet-600",
  email: "bg-[#EA4335]",
};

const channelLabels: Record<Channel, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
  telegram: "Telegram",
  web: "Web Chat",
  email: "Email",
};

export function Hero() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [telegramVisible, setTelegramVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let step = 0;
    const run = () => {
      if (step < incomingMessages.length) {
        setVisibleMessages((prev) => [...prev, incomingMessages[step].id]);
        step++;
      } else if (step === incomingMessages.length) {
        setTimeout(() => setTelegramVisible(true), 400);
        step++;
      } else {
        setVisibleMessages([]);
        setTelegramVisible(false);
        step = 0;
      }
    };
    intervalRef.current = setInterval(run, 800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.1),transparent)]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div>
          <Badge variant="violet" className="mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Omnicanalidad accesible para tu negocio
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6 text-balance">
            Todos tus canales,{" "}
            <span className="gradient-text">un solo lugar:</span>{" "}
            <span className="text-[#2AABEE]">Telegram</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
            Cható centraliza WhatsApp, Instagram, Facebook y web chat en tu Telegram.
            Responde a todos tus clientes sin cambiar de app, sin complicaciones y{" "}
            <strong className="text-gray-900">desde $9/mes.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button href="#registro" size="lg">
              Empezar gratis 14 días
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button href="#como-funciona" variant="outline" size="lg">
              Ver cómo funciona
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {["🧕", "👨‍💼", "👩‍🍳", "🧑‍🔧"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-cyan-100 border-2 border-white flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <span>
              <strong className="text-gray-900">+500 comercios</strong> ya centralizan sus chats
            </span>
          </div>
        </div>

        {/* Right: Animated mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Floating channel badges */}
            <div className="absolute -left-8 top-8 flex flex-col gap-3 z-10">
              {(["whatsapp", "instagram", "facebook", "web"] as Channel[]).map((ch) => (
                <div
                  key={ch}
                  className={`flex items-center gap-2 bg-white rounded-full pl-1 pr-3 py-1 shadow-md border border-gray-100 transition-all duration-500 ${
                    visibleMessages.some(
                      (id) => incomingMessages.find((m) => m.id === id)?.channel === ch
                    )
                      ? "opacity-100 translate-x-0 scale-105"
                      : "opacity-50 -translate-x-1 scale-100"
                  }`}
                >
                  <ChannelIcon channel={ch} size="sm" />
                  <span className="text-xs font-semibold text-gray-700">{channelLabels[ch]}</span>
                </div>
              ))}
            </div>

            {/* Main mockup card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-100 border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-[#2AABEE] px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Cható Hub</p>
                  <p className="text-white/70 text-xs">Tu bandeja omnicanal en Telegram</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/80 text-xs">En línea</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 min-h-[280px] bg-gray-50">
                {incomingMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`transition-all duration-500 ${
                      visibleMessages.includes(msg.id)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="flex items-end gap-2">
                      <div className={`w-7 h-7 rounded-full ${channelColors[msg.channel]} flex-shrink-0`} />
                      <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm border border-gray-100 max-w-[80%]">
                        <p className="text-xs font-semibold text-violet-600 mb-0.5">{channelLabels[msg.channel]}</p>
                        <p className="text-sm text-gray-700">{msg.text}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{msg.time}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {telegramVisible && (
                  <div className="flex justify-end">
                    <div className="bg-[#2AABEE] rounded-2xl rounded-br-sm px-3 py-2 max-w-[80%]">
                      <p className="text-sm text-white">✅ Respondido desde Telegram</p>
                      <p className="text-[10px] text-white/70 mt-0.5">10:24</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs text-gray-400">
                  Escribe desde Telegram...
                </div>
                <div className="w-8 h-8 rounded-full bg-[#2AABEE] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-200/30 to-cyan-200/30 rounded-4xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
