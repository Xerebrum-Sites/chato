"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ChannelIcon } from "@/components/atoms/ChannelIcon";

type Channel = "whatsapp" | "instagram" | "facebook" | "web";

const conversations: { channel: Channel; label: string; customerMsg: string; ownerReply: string }[] = [
  { channel: "whatsapp", label: "WhatsApp", customerMsg: "¿Tienen la talla M disponible?", ownerReply: "¡Sí! La tenemos en azul y negro 🎉" },
  { channel: "instagram", label: "Instagram", customerMsg: "¿A qué hora cierran hoy?", ownerReply: "Cerramos a las 20hs, ¡te esperamos!" },
  { channel: "facebook", label: "Facebook", customerMsg: "Quiero hacer un pedido de delivery", ownerReply: "¡Claro! ¿Cuál es tu dirección? 😊" },
  { channel: "web", label: "Web Chat", customerMsg: "¿Cuál es el precio del plan mensual?", ownerReply: "El Básico arranca en solo $9/mes 🚀" },
];

const channelHex: Record<Channel, string> = { whatsapp: "#25D366", instagram: "#C13584", facebook: "#1877F2", web: "#be146e" };
const channelBg: Record<Channel, string> = {
  whatsapp: "bg-[#25D366]",
  instagram: "bg-gradient-to-br from-[#f09433] to-[#bc1888]",
  facebook: "bg-[#1877F2]",
  web: "bg-violet-600",
};

// ─── Abstract Flow Background ─────────────────────────────────────────────────
// Red de líneas ortogonales con puntos animados en colores de marca.
// Sin participantes explícitos — solo la idea de flujo.

const STREAMS = [215, 305, 400, 470] as const;   // y positions
const VERTS   = [380, 720, 1060] as const;        // x positions

// 6 caminos para los puntos animados
const PATHS = [
  { id: "pa", d: "M 0 215 H 1440" },
  { id: "pb", d: "M 1440 305 H 0" },
  { id: "pc", d: "M 0 215 H 720 V 400 H 1440" },
  { id: "pd", d: "M 1440 305 H 380 V 215 H 0" },
  { id: "pe", d: "M 0 400 H 1060 V 305 H 1440" },
  { id: "pf", d: "M 1440 470 H 720 V 400 H 0" },
] as const;

type DotCfg = { path: string; color: string; r: number; op: number; dur: string; begin: string };

const DOTS: DotCfg[] = [
  // pa — naranja, izq→der, y=215
  { path: "pa", color: "#ff9600", r: 3,   op: 0.58, dur: "3.8s", begin: "0s"   },
  { path: "pa", color: "#fdc800", r: 2.5, op: 0.35, dur: "3.8s", begin: "2s"   },
  // pb — magenta, der→izq, y=305
  { path: "pb", color: "#be146e", r: 3,   op: 0.52, dur: "3.5s", begin: "0.8s" },
  { path: "pb", color: "#9a0d58", r: 2,   op: 0.30, dur: "3.5s", begin: "5s"   },
  // pc — coral, izq→der con bajada a y=400
  { path: "pc", color: "#e65a64", r: 3.5, op: 0.48, dur: "5.5s", begin: "1.5s" },
  { path: "pc", color: "#ff9600", r: 2.5, op: 0.30, dur: "5.5s", begin: "10s"  },
  // pd — dorado, der→izq con subida a y=215
  { path: "pd", color: "#fdc800", r: 3,   op: 0.45, dur: "4.8s", begin: "3s"   },
  // pe — coral, izq→der con subida a y=305
  { path: "pe", color: "#e65a64", r: 3,   op: 0.45, dur: "5.0s", begin: "2.5s" },
  { path: "pe", color: "#be146e", r: 2,   op: 0.28, dur: "5.0s", begin: "9s"   },
  // pf — magenta oscuro, der→izq con subida a y=400
  { path: "pf", color: "#9a0d58", r: 3.5, op: 0.42, dur: "4.2s", begin: "1s"   },
  { path: "pf", color: "#ff9600", r: 2.5, op: 0.32, dur: "4.2s", begin: "7s"   },
];

function FlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none hidden lg:block" aria-hidden>
      <svg
        viewBox="0 0 1440 680"
        className="absolute inset-0 w-full h-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {PATHS.map((p) => <path key={p.id} id={p.id} d={p.d} />)}
        </defs>

        {/* Halo central suave */}
        <ellipse cx={720} cy={340} rx={520} ry={220}
          fill="url(#halo)" fillOpacity={0.18} />
        <defs>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff9600" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#ff9600" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Líneas horizontales — guías de flujo */}
        {STREAMS.map((y, i) => {
          const colors = ["#ff9600", "#be146e", "#e65a64", "#fdc800"];
          return (
            <line key={`h${i}`}
              x1={0} y1={y} x2={1440} y2={y}
              stroke={colors[i]} strokeOpacity={0.07} strokeWidth={1} />
          );
        })}

        {/* Líneas verticales — conectores */}
        {VERTS.map((x, i) => (
          <line key={`v${i}`}
            x1={x} y1={STREAMS[0]} x2={x} y2={STREAMS[STREAMS.length - 1]}
            stroke="#9ca3af" strokeOpacity={0.09} strokeWidth={1}
            strokeDasharray="4 7" />
        ))}

        {/* Tramos de cruce — refuerzo visual en los cambios de nivel */}
        <line x1={720}  y1={215} x2={720}  y2={400} stroke="#e65a64" strokeOpacity={0.08} strokeWidth={1} />
        <line x1={380}  y1={215} x2={380}  y2={305} stroke="#fdc800" strokeOpacity={0.08} strokeWidth={1} />
        <line x1={1060} y1={305} x2={1060} y2={400} stroke="#e65a64" strokeOpacity={0.08} strokeWidth={1} />
        <line x1={720}  y1={400} x2={720}  y2={470} stroke="#9a0d58" strokeOpacity={0.08} strokeWidth={1} />

        {/* Nodos en intersecciones */}
        {STREAMS.flatMap((y) =>
          VERTS.map((x) => (
            <circle key={`n${x}-${y}`} cx={x} cy={y} r={2.5}
              fill="#be146e" fillOpacity={0.14} />
          ))
        )}

        {/* Puntos animados */}
        {DOTS.map((d, i) => (
          <circle key={i} r={d.r} fill={d.color} fillOpacity={d.op}>
            <animateMotion dur={d.dur} repeatCount="indefinite" begin={d.begin}>
              <mpath href={`#${d.path}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
    </div>
  );
}

// ─── Chat window animation ────────────────────────────────────────────────────

export function Hero() {
  const [convIdx, setConvIdx] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); timeouts.push(id); };
    let idx = 0;
    const runCycle = () => {
      const i = idx;
      setConvIdx(i); setPhase(0);
      t(() => setPhase(1), 300);
      t(() => setPhase(2), 1000);
      t(() => setPhase(3), 1500);
      t(() => setPhase(4), 2400);
      t(() => setPhase(5), 3600);
      t(() => setPhase(6), 4200);
      t(() => setPhase(7), 4700);
      t(() => { idx = (i + 1) % conversations.length; runCycle(); }, 7200);
    };
    t(runCycle, 400);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const conv = conversations[convIdx];
  const hex = channelHex[conv.channel];
  const bg = channelBg[conv.channel];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 gradient-bg opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,150,0,0.06),transparent)]" />
      <FlowBackground />
      {/* Fade izquierda para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Copy */}
        <div>
          <Badge variant="violet" className="mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Omnicanalidad lista para escalar
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6 text-balance">
            Centraliza tus canales{" "}
            <span className="gradient-text">y escala</span>{" "}
            a tu ritmo
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
            Comienza con Telegram como tu hub central. Cuando crezcas, accede a tu propio dashboard con analytics,
            equipos y automatizaciones. Ambos modos disponibles desde{" "}
            <strong className="text-gray-900">$9/mes.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button href="https://chato-app.xerebrumgroup.com/signin" size="lg">
              Empezar gratis 14 días
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button href="#como-funciona" variant="outline" size="lg">Ver cómo funciona</Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {["🧕", "👨‍💼", "👩‍🍳", "🧑‍🔧"].map((emoji, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-cyan-100 border-2 border-white flex items-center justify-center text-sm">{emoji}</div>
              ))}
            </div>
            <span><strong className="text-gray-900">+500 comercios</strong> ya centralizan sus chats</span>
          </div>
        </div>

        {/* Right: Chat window */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {conversations.map((c, i) => (
                <div key={c.channel} className={`transition-all duration-300 rounded-full ${i === convIdx ? "w-6 h-2 bg-violet-500" : "w-2 h-2 bg-gray-200"}`} />
              ))}
            </div>

            <div className="bg-white/92 backdrop-blur-md rounded-3xl shadow-2xl shadow-violet-100/60 border border-gray-100 overflow-hidden">
              <div className="px-5 py-3.5 bg-gray-50/90 border-b border-gray-100 flex items-center gap-2.5">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-semibold transition-all duration-500 ${bg}`}>
                  <span className="w-2 h-2 rounded-full bg-white/60" />{conv.label}
                </div>
                <div className="flex-1 flex items-center justify-center gap-0.5">
                  <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                </div>
                <div className="flex items-center gap-2 bg-[#2AABEE] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Tu Telegram
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className={`transition-all duration-500 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Cliente en {conv.label}</p>
                  <div className="flex items-start gap-2">
                    <ChannelIcon channel={conv.channel} size="sm" />
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                      <p className="text-sm text-gray-800">{conv.customerMsg}</p>
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-2 transition-all duration-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-300 to-[#2AABEE]" />
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap px-1">llega a Telegram</span>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#2AABEE" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M19 12l-4-4M19 12l-4 4" />
                  </svg>
                </div>

                <div className={`transition-all duration-500 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                  <div className="rounded-2xl bg-[#EBF5FB] border border-[#2AABEE]/20 overflow-hidden">
                    <div className="bg-[#2AABEE] px-3 py-2 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.277-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </div>
                      <span className="text-white text-xs font-semibold">Cható Hub</span>
                      <div className="ml-auto flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-white/80 text-[10px]">en línea</span>
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-md ${bg} flex-shrink-0 mt-0.5`} />
                        <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm max-w-[85%]">
                          <p className="text-[10px] font-semibold mb-0.5" style={{ color: hex }}>{conv.label}</p>
                          <p className="text-xs text-gray-700">{conv.customerMsg}</p>
                        </div>
                      </div>
                      <div className={`flex justify-end transition-all duration-300 ${phase === 4 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <div className="bg-[#2AABEE] rounded-xl px-3 py-2.5 flex items-center gap-1">
                          {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }} />)}
                        </div>
                      </div>
                      <div className={`flex justify-end transition-all duration-500 ${phase >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                        <div className="bg-[#2AABEE] rounded-xl px-3 py-2 max-w-[85%]">
                          <p className="text-xs text-white">{conv.ownerReply}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-2 transition-all duration-500 ${phase >= 6 ? "opacity-100" : "opacity-0"}`}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#2AABEE" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l4-4M5 12l4 4" />
                  </svg>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap px-1">respuesta enviada</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-violet-300 to-[#2AABEE]" />
                </div>

                <div className={`transition-all duration-500 ${phase >= 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
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

            <div className="mt-2 mx-6 h-4 bg-gradient-to-r from-violet-200/30 to-cyan-200/30 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
