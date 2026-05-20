"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ChannelIcon } from "@/components/atoms/ChannelIcon";

type Channel = "whatsapp" | "instagram" | "facebook" | "web";

const conversations: {
  channel: Channel;
  label: string;
  customerMsg: string;
  ownerReply: string;
}[] = [
  {
    channel: "whatsapp",
    label: "WhatsApp",
    customerMsg: "¿Tienen la talla M disponible?",
    ownerReply: "¡Sí! La tenemos en azul y negro 🎉",
  },
  {
    channel: "instagram",
    label: "Instagram",
    customerMsg: "¿A qué hora cierran hoy?",
    ownerReply: "Cerramos a las 20hs, ¡te esperamos!",
  },
  {
    channel: "facebook",
    label: "Facebook",
    customerMsg: "Quiero hacer un pedido de delivery",
    ownerReply: "¡Claro! ¿Cuál es tu dirección? 😊",
  },
  {
    channel: "web",
    label: "Web Chat",
    customerMsg: "¿Cuál es el precio del plan mensual?",
    ownerReply: "El Básico arranca en solo $9/mes 🚀",
  },
];

const channelHex: Record<Channel, string> = {
  whatsapp: "#25D366",
  instagram: "#C13584",
  facebook: "#1877F2",
  web: "#7C3AED",
};

const channelBg: Record<Channel, string> = {
  whatsapp: "bg-[#25D366]",
  instagram: "bg-gradient-to-br from-[#f09433] to-[#bc1888]",
  facebook: "bg-[#1877F2]",
  web: "bg-violet-600",
};

export function Hero() {
  const [convIdx, setConvIdx] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeouts.push(id);
      return id;
    };

    let currentIdx = 0;
    const runCycle = () => {
      const idx = currentIdx;
      setConvIdx(idx);
      setPhase(0);
      t(() => setPhase(1), 300);
      t(() => setPhase(2), 1000);
      t(() => setPhase(3), 1500);
      t(() => setPhase(4), 2400);
      t(() => setPhase(5), 3600);
      t(() => setPhase(6), 4200);
      t(() => setPhase(7), 4700);
      t(() => {
        currentIdx = (idx + 1) % conversations.length;
        runCycle();
      }, 7200);
    };

    t(runCycle, 400);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const conv = conversations[convIdx];
  const hex = channelHex[conv.channel];
  const bg = channelBg[conv.channel];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 gradient-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.1),transparent)]" />
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

        {/* Right: Bidirectional flow animation */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            {/* Channel progress dots */}
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {conversations.map((c, i) => (
                <div
                  key={c.channel}
                  className={`transition-all duration-300 rounded-full ${
                    i === convIdx ? "w-6 h-2 bg-violet-500" : "w-2 h-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Flow card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-100/60 border border-gray-100 overflow-hidden">
              {/* Header: channel ⇄ Telegram */}
              <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2.5">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-semibold transition-all duration-500 ${bg}`}
                >
                  <span
                    className="w-2 h-2 rounded-full bg-white/60"
                    style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.3)" }}
                  />
                  {conv.label}
                </div>

                <div className="flex-1 flex items-center justify-center gap-0.5">
                  <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </div>

                <div className="flex items-center gap-2 bg-[#2AABEE] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Tu Telegram
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Phase 1: Customer incoming message */}
                <div
                  className={`transition-all duration-500 ${
                    phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                >
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Cliente en {conv.label}
                  </p>
                  <div className="flex items-start gap-2">
                    <ChannelIcon channel={conv.channel} size="sm" />
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                      <p className="text-sm text-gray-800">{conv.customerMsg}</p>
                    </div>
                  </div>
                </div>

                {/* Phase 2: Arrow → Telegram */}
                <div
                  className={`flex items-center gap-2 transition-all duration-500 ${
                    phase >= 2 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-300 to-[#2AABEE]" />
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap px-1">
                    llega a Telegram
                  </span>
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="#2AABEE"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M19 12l-4-4M19 12l-4 4" />
                  </svg>
                </div>

                {/* Phase 3+: Telegram Hub */}
                <div
                  className={`transition-all duration-500 ${
                    phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                >
                  <div className="rounded-2xl bg-[#EBF5FB] border border-[#2AABEE]/20 overflow-hidden">
                    <div className="bg-[#2AABEE] px-3 py-2 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </div>
                      <span className="text-white text-xs font-semibold">Cható Hub</span>
                      <div className="ml-auto flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-white/80 text-[10px]">en línea</span>
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                      {/* Received message in Telegram */}
                      <div className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-md ${bg} flex-shrink-0 mt-0.5`} />
                        <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm max-w-[85%]">
                          <p className="text-[10px] font-semibold mb-0.5" style={{ color: hex }}>
                            {conv.label}
                          </p>
                          <p className="text-xs text-gray-700">{conv.customerMsg}</p>
                        </div>
                      </div>

                      {/* Typing indicator — phase 4 only */}
                      <div
                        className={`flex justify-end transition-all duration-300 ${
                          phase === 4 ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                        style={{ minHeight: phase <= 4 ? undefined : 0 }}
                      >
                        <div className="bg-[#2AABEE] rounded-xl px-3 py-2.5 flex items-center gap-1">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Owner reply — phase 5+ */}
                      <div
                        className={`flex justify-end transition-all duration-500 ${
                          phase >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                      >
                        <div className="bg-[#2AABEE] rounded-xl px-3 py-2 max-w-[85%]">
                          <p className="text-xs text-white">{conv.ownerReply}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 6: Arrow ← back to channel */}
                <div
                  className={`flex items-center gap-2 transition-all duration-500 ${
                    phase >= 6 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="#2AABEE"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l4-4M5 12l4 4" />
                  </svg>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap px-1">
                    respuesta enviada
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-violet-300 to-[#2AABEE]" />
                </div>

                {/* Phase 7: Reply shown in the originating channel */}
                <div
                  className={`transition-all duration-500 ${
                    phase >= 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                >
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Cliente recibe respuesta en {conv.label}
                  </p>
                  <div className="flex justify-end items-end gap-2">
                    <div className={`${bg} rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]`}>
                      <p className="text-sm text-white">{conv.ownerReply}</p>
                    </div>
                    <ChannelIcon channel={conv.channel} size="sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative glow under the card */}
            <div className="mt-2 mx-6 h-4 bg-gradient-to-r from-violet-200/40 to-cyan-200/40 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
