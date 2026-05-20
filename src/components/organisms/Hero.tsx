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

const channelHex: Record<Channel, string> = { whatsapp: "#25D366", instagram: "#C13584", facebook: "#1877F2", web: "#7C3AED" };
const channelBg: Record<Channel, string> = {
  whatsapp: "bg-[#25D366]",
  instagram: "bg-gradient-to-br from-[#f09433] to-[#bc1888]",
  facebook: "bg-[#1877F2]",
  web: "bg-violet-600",
};

// ─── Flow Background SVG ──────────────────────────────────────────────────────

// Icon path data (24×24 viewBox, from brand SVGs)
const ICONS = {
  whatsapp: {
    fill: true,
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
  instagram: {
    fill: true,
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  facebook: {
    fill: true,
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  web: {
    fill: false,
    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  telegram: {
    fill: true,
    d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  },
};

// Symmetric channel positions (avg y = hub y = 370)
const CHANNELS_CFG = [
  { id: "whatsapp" as const, color: "#25D366", y: 160, label: "WhatsApp" },
  { id: "instagram" as const, color: "#C13584", y: 290, label: "Instagram" },
  { id: "facebook" as const, color: "#1877F2", y: 430, label: "Facebook" },
  { id: "web" as const, color: "#7C3AED", y: 560, label: "Web Chat" },
];

const VW = 1440;
const VH = 720;
const LX = 108;  // left channel x
const RX = 1332; // right channel x (symmetric)
const HUB = { x: 720, y: 370 };
const TG = { x: 720, y: 96, color: "#2AABEE" };

function bezIn(y: number) {
  const mx = (LX + HUB.x) / 2; // 414
  return `M ${LX} ${y} C ${mx} ${y} ${mx} ${HUB.y} ${HUB.x} ${HUB.y}`;
}
function bezOut(y: number) {
  const mx = (HUB.x + RX) / 2; // 1026
  return `M ${HUB.x} ${HUB.y} C ${mx} ${HUB.y} ${mx} ${y} ${RX} ${y}`;
}
// Telegram → Hub (straight vertical)
const TG_IN_D = `M ${TG.x} ${TG.y + 18} L ${HUB.x} ${HUB.y - 28}`;
// Telegram → WA right (index 0, y=160) — human replies to WhatsApp customer
const TG_OUT_D = bezOut(CHANNELS_CFG[0].y);

interface IconProps { cx: number; cy: number; id: keyof typeof ICONS }
function SvgIcon({ cx, cy, id }: IconProps) {
  const icon = ICONS[id];
  const scale = icon.fill ? 0.62 : 0.60;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale}) translate(-12 -12)`}>
      {icon.fill ? (
        <path d={icon.d} fill="white" fillOpacity={0.55} />
      ) : (
        <path d={icon.d} stroke="white" strokeOpacity={0.55} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
    </g>
  );
}

function FlowBackground() {
  // Dot animation: [pathId, color, dur, begin, r, opacity]
  type DotDef = [string, string, string, string, number, number];
  const dots: DotDef[] = [
    // Incoming — 2 staggered dots per channel
    ...CHANNELS_CFG.flatMap((ch, i): DotDef[] => {
      const d = (3.0 + i * 0.25).toFixed(2) + "s";
      const half = (3.0 + i * 0.25) / 2;
      return [
        [`bg-in-${i}`, ch.color, d, "0s", 3.0, 0.32],
        [`bg-in-${i}`, ch.color, d, `${half.toFixed(2)}s`, 3.0, 0.28],
      ];
    }),
    // Outgoing bot — 2 staggered dots per channel (delayed)
    ...CHANNELS_CFG.flatMap((ch, i): DotDef[] => {
      const d = (2.6 + i * 0.2).toFixed(2) + "s";
      const half = (2.6 + i * 0.2) / 2;
      const delay = 1.2 + i * 0.3;
      return [
        [`bg-out-${i}`, ch.color, d, `${delay.toFixed(2)}s`, 3.0, 0.26],
        [`bg-out-${i}`, ch.color, d, `${(delay + half).toFixed(2)}s`, 3.0, 0.22],
      ];
    }),
    // Human intervention (Telegram) — periodic, larger dot
    ["bg-tg-in", TG.color, "1.8s", "2.0s", 3.8, 0.45],
    ["bg-tg-out", TG.color, "2.6s", "3.8s", 3.8, 0.40],
    ["bg-tg-in", TG.color, "1.8s", "12.0s", 3.8, 0.45],
    ["bg-tg-out", TG.color, "2.6s", "13.8s", 3.8, 0.40],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="absolute inset-0 w-full h-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Path definitions for animateMotion ───────── */}
        <defs>
          {CHANNELS_CFG.map((ch, i) => (
            <path key={`d-in-${i}`} id={`bg-in-${i}`} d={bezIn(ch.y)} />
          ))}
          {CHANNELS_CFG.map((ch, i) => (
            <path key={`d-out-${i}`} id={`bg-out-${i}`} d={bezOut(ch.y)} />
          ))}
          <path id="bg-tg-in" d={TG_IN_D} />
          <path id="bg-tg-out" d={TG_OUT_D} />
        </defs>

        {/* ── Section header labels ─────────────────────── */}
        <text x={LX} y={44} textAnchor="middle" fontSize={9} fill="#9CA3AF" fillOpacity={0.55}
          fontFamily="system-ui,sans-serif" fontWeight={500} letterSpacing="1.5">
          MENSAJES
        </text>
        <text x={HUB.x} y={44} textAnchor="middle" fontSize={9} fill="#7C3AED" fillOpacity={0.38}
          fontFamily="system-ui,sans-serif" fontWeight={600} letterSpacing="1.5">
          CHATÓ HUB
        </text>
        <text x={RX} y={44} textAnchor="middle" fontSize={9} fill="#9CA3AF" fillOpacity={0.55}
          fontFamily="system-ui,sans-serif" fontWeight={500} letterSpacing="1.5">
          RESPUESTAS
        </text>

        {/* ── Subtle vertical separators ────────────────── */}
        <line x1={390} y1={60} x2={390} y2={VH - 60} stroke="#E5E7EB" strokeOpacity={0.25} strokeWidth={1} strokeDasharray="3 8" />
        <line x1={1050} y1={60} x2={1050} y2={VH - 60} stroke="#E5E7EB" strokeOpacity={0.25} strokeWidth={1} strokeDasharray="3 8" />

        {/* ── Guide lines: channels → hub ───────────────── */}
        {CHANNELS_CFG.map((ch, i) => (
          <path key={`gl-in-${i}`} d={bezIn(ch.y)} stroke={ch.color} strokeOpacity={0.08} strokeWidth={1.2} />
        ))}
        {/* ── Guide lines: hub → channels ───────────────── */}
        {CHANNELS_CFG.map((ch, i) => (
          <path key={`gl-out-${i}`} d={bezOut(ch.y)} stroke={ch.color} strokeOpacity={0.07} strokeWidth={1.2} />
        ))}
        {/* ── Telegram guide paths (dashed) ─────────────── */}
        <path d={TG_IN_D} stroke={TG.color} strokeOpacity={0.12} strokeWidth={1.5} strokeDasharray="4 6" />
        <path d={TG_OUT_D} stroke={TG.color} strokeOpacity={0.09} strokeWidth={1.5} strokeDasharray="4 6" />

        {/* ── Channel nodes – LEFT (inputs) ────────────── */}
        {CHANNELS_CFG.map((ch) => (
          <g key={`L-${ch.id}`}>
            <circle cx={LX} cy={ch.y} r={26} fill={ch.color} fillOpacity={0.05} />
            <circle cx={LX} cy={ch.y} r={18} fill={ch.color} fillOpacity={0.11} />
            <SvgIcon cx={LX} cy={ch.y} id={ch.id} />
            <text x={LX} y={ch.y + 34} textAnchor="middle" fontSize={8.5} fill={ch.color}
              fillOpacity={0.48} fontFamily="system-ui,sans-serif" fontWeight={500}>
              {ch.label}
            </text>
          </g>
        ))}

        {/* ── Hub (Bot) ────────────────────────────────── */}
        {/* Outer pulse ring */}
        <circle cx={HUB.x} cy={HUB.y} r={38} stroke="#7C3AED" strokeOpacity={0.1} strokeWidth={1.5} fill="none">
          <animate attributeName="r" values="38;62;38" dur="4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.12;0;0.12" dur="4s" repeatCount="indefinite" />
        </circle>
        {/* Glow area */}
        <circle cx={HUB.x} cy={HUB.y} r={52} fill="#7C3AED" fillOpacity={0.04} />
        {/* Outer circle */}
        <circle cx={HUB.x} cy={HUB.y} r={32} fill="#7C3AED" fillOpacity={0.08} />
        {/* Inner circle */}
        <circle cx={HUB.x} cy={HUB.y} r={22} fill="#7C3AED" fillOpacity={0.11} />
        {/* Bot label */}
        <text x={HUB.x} y={HUB.y + 3} textAnchor="middle" fontSize={9} fill="#7C3AED"
          fillOpacity={0.55} fontFamily="system-ui,sans-serif" fontWeight={700} letterSpacing="0.5">
          Bot
        </text>
        {/* "Auto" sub-label below hub */}
        <text x={HUB.x} y={HUB.y + 48} textAnchor="middle" fontSize={8} fill="#7C3AED"
          fillOpacity={0.25} fontFamily="system-ui,sans-serif" fontWeight={500} letterSpacing="1">
          AUTO-RESPUESTA
        </text>

        {/* ── Telegram node (human intervention) ───────── */}
        <circle cx={TG.x} cy={TG.y} r={26} fill={TG.color} fillOpacity={0.06} />
        <circle cx={TG.x} cy={TG.y} r={18} fill={TG.color} fillOpacity={0.12} />
        <SvgIcon cx={TG.x} cy={TG.y} id="telegram" />
        {/* Label above Telegram node */}
        <text x={TG.x} y={TG.y - 32} textAnchor="middle" fontSize={8} fill={TG.color}
          fillOpacity={0.5} fontFamily="system-ui,sans-serif" fontWeight={600} letterSpacing="0.5">
          INTERVENCIÓN
        </text>
        <text x={TG.x} y={TG.y - 21} textAnchor="middle" fontSize={8} fill={TG.color}
          fillOpacity={0.5} fontFamily="system-ui,sans-serif" fontWeight={600} letterSpacing="0.5">
          HUMANA
        </text>
        {/* Vertical dotted connection between Telegram label and hub */}
        <line x1={TG.x} y1={TG.y - 16} x2={TG.x} y2={TG.y - 6} stroke={TG.color} strokeOpacity={0.2} strokeWidth={1} />

        {/* ── Channel nodes – RIGHT (outputs) ──────────── */}
        {CHANNELS_CFG.map((ch) => (
          <g key={`R-${ch.id}`}>
            <circle cx={RX} cy={ch.y} r={26} fill={ch.color} fillOpacity={0.05} />
            <circle cx={RX} cy={ch.y} r={18} fill={ch.color} fillOpacity={0.11} />
            <SvgIcon cx={RX} cy={ch.y} id={ch.id} />
            <text x={RX} y={ch.y + 34} textAnchor="middle" fontSize={8.5} fill={ch.color}
              fillOpacity={0.48} fontFamily="system-ui,sans-serif" fontWeight={500}>
              {ch.label}
            </text>
          </g>
        ))}

        {/* ── Animated dots ─────────────────────────────── */}
        {dots.map(([pathId, color, dur, begin, r, op], i) => (
          <circle key={`dot-${i}`} r={r} fill={color} fillOpacity={op}>
            <animateMotion dur={dur} repeatCount="indefinite" begin={begin}>
              <mpath href={`#${pathId}`} />
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
    let currentIdx = 0;
    const runCycle = () => {
      const idx = currentIdx;
      setConvIdx(idx); setPhase(0);
      t(() => setPhase(1), 300);
      t(() => setPhase(2), 1000);
      t(() => setPhase(3), 1500);
      t(() => setPhase(4), 2400);
      t(() => setPhase(5), 3600);
      t(() => setPhase(6), 4200);
      t(() => setPhase(7), 4700);
      t(() => { currentIdx = (idx + 1) % conversations.length; runCycle(); }, 7200);
    };
    t(runCycle, 400);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const conv = conversations[convIdx];
  const hex = channelHex[conv.channel];
  const bg = channelBg[conv.channel];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 gradient-bg opacity-60" />
      {/* Layer 2: Top radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.08),transparent)]" />
      {/* Layer 3: Dot grid */}
      <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      {/* Layer 4: Flow diagram */}
      <FlowBackground />
      {/* Layer 5: Left readability fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent pointer-events-none" />

      {/* Foreground content */}
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

        {/* Right: Bidirectional flow chat window */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {conversations.map((c, i) => (
                <div key={c.channel} className={`transition-all duration-300 rounded-full ${i === convIdx ? "w-6 h-2 bg-violet-500" : "w-2 h-2 bg-gray-200"}`} />
              ))}
            </div>

            <div className="bg-white/92 backdrop-blur-md rounded-3xl shadow-2xl shadow-violet-100/60 border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3.5 bg-gray-50/90 border-b border-gray-100 flex items-center gap-2.5">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-semibold transition-all duration-500 ${bg}`}>
                  <span className="w-2 h-2 rounded-full bg-white/60" />
                  {conv.label}
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
                {/* Phase 1: Customer message */}
                <div className={`transition-all duration-500 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Cliente en {conv.label}</p>
                  <div className="flex items-start gap-2">
                    <ChannelIcon channel={conv.channel} size="sm" />
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                      <p className="text-sm text-gray-800">{conv.customerMsg}</p>
                    </div>
                  </div>
                </div>

                {/* Phase 2: Arrow → Telegram */}
                <div className={`flex items-center gap-2 transition-all duration-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-300 to-[#2AABEE]" />
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap px-1">llega a Telegram</span>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#2AABEE" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M19 12l-4-4M19 12l-4 4" />
                  </svg>
                </div>

                {/* Phase 3+: Telegram Hub */}
                <div className={`transition-all duration-500 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
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
                      <div className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-md ${bg} flex-shrink-0 mt-0.5`} />
                        <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm max-w-[85%]">
                          <p className="text-[10px] font-semibold mb-0.5" style={{ color: hex }}>{conv.label}</p>
                          <p className="text-xs text-gray-700">{conv.customerMsg}</p>
                        </div>
                      </div>
                      <div className={`flex justify-end transition-all duration-300 ${phase === 4 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <div className="bg-[#2AABEE] rounded-xl px-3 py-2.5 flex items-center gap-1">
                          {[0, 1, 2].map((i) => (
                            <span key={i} className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }} />
                          ))}
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

                {/* Phase 6: Arrow ← back */}
                <div className={`flex items-center gap-2 transition-all duration-500 ${phase >= 6 ? "opacity-100" : "opacity-0"}`}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#2AABEE" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l4-4M5 12l4 4" />
                  </svg>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap px-1">respuesta enviada</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-violet-300 to-[#2AABEE]" />
                </div>

                {/* Phase 7: Reply in channel */}
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
