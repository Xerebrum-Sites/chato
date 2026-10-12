import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  BrainCircuit,
  Check,
  Clock3,
  Inbox,
  Mail,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Tags,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { ChannelIcon } from "@/components/atoms/ChannelIcon";

function VisualShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative mx-auto min-h-[23rem] w-full max-w-[37rem] overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 p-5 shadow-2xl shadow-violet-100/70 backdrop-blur sm:min-h-[29rem] sm:p-8"
    >
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-orange-200/55 blur-2xl" />
      <div className="absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-fuchsia-200/50 blur-2xl" />
      <div className="absolute right-8 top-10 h-24 w-24 rounded-full bg-cyan-200/55 blur-2xl" />
      <div className="relative flex min-h-[19rem] h-full items-center justify-center sm:min-h-[25rem]">{children}</div>
    </div>
  );
}

export function OmnichannelHeroVisual() {
  return (
    <VisualShell label="Bandeja de escritorio donde convergen WhatsApp, Instagram, Facebook, Telegram y web chat">
      <div className="relative w-full max-w-[31rem]">
        <div className="mb-5 flex items-center justify-center gap-2.5 sm:gap-4">
          <ChannelIcon channel="whatsapp" size="md" />
          <ChannelIcon channel="instagram" size="md" />
          <ChannelIcon channel="facebook" size="md" />
          <ChannelIcon channel="telegram" size="md" />
          <ChannelIcon channel="web" size="md" />
        </div>
        <div className="mx-auto mb-[-1px] h-8 w-px bg-gradient-to-b from-violet-200 to-violet-500" />
        <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-xl">
          <div className="flex items-center gap-2 border-b border-gray-100 bg-[#18111f] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#ff7a18]" />
            <span className="h-2 w-2 rounded-full bg-[#d4146e]" />
            <span className="h-2 w-2 rounded-full bg-[#72dbe8]" />
            <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">Bandeja unificada</span>
          </div>
          <div className="grid grid-cols-[5.25rem_1fr] sm:grid-cols-[7rem_1fr]">
            <div className="space-y-3 border-r border-gray-100 bg-gray-50 p-3">
              {["Todos", "Ventas", "Soporte"].map((item, index) => (
                <div key={item} className={`rounded-lg px-2 py-2 text-[10px] font-bold ${index === 0 ? "bg-violet-100 text-violet-700" : "text-gray-500"}`}>
                  {item}
                </div>
              ))}
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
                <ChannelIcon channel="whatsapp" size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="h-2 w-20 rounded-full bg-gray-800" />
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100" />
                </div>
                <span className="rounded-full bg-orange-100 px-2 py-1 text-[9px] font-bold text-orange-700">Nuevo</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
                <ChannelIcon channel="instagram" size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="h-2 w-24 rounded-full bg-gray-800" />
                  <div className="mt-2 h-2 w-4/5 rounded-full bg-gray-100" />
                </div>
                <Check className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-violet-50 px-3 py-2 text-[10px] font-bold text-violet-700">
                Un solo historial
                <Inbox className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

export function AiHeroVisual() {
  return (
    <VisualShell label="Flujo de atención donde un agente de inteligencia artificial resuelve consultas y deriva a una persona cuando hace falta">
      <div className="w-full max-w-[31rem]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
            <MessageSquareText className="mb-3 h-6 w-6 text-orange-500" />
            <p className="text-xs font-black text-gray-900">Consulta del cliente</p>
            <div className="mt-3 h-2 w-full rounded-full bg-gray-100" />
            <div className="mt-2 h-2 w-3/4 rounded-full bg-gray-100" />
          </div>
          <ArrowRight className="h-5 w-5 text-violet-400" />
          <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 text-white shadow-xl shadow-violet-200">
            <Bot className="mb-3 h-7 w-7" />
            <p className="text-xs font-black">Agente IA Cható</p>
            <p className="mt-2 text-[10px] leading-relaxed text-white/75">Responde con el conocimiento real del negocio.</p>
          </div>
        </div>

        <div className="mx-auto my-4 h-8 w-px bg-gradient-to-b from-fuchsia-400 to-cyan-400" />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-black">Resuelve al instante</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-emerald-800/70">
              <Clock3 className="h-4 w-4" /> Atención 24/7
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
            <div className="flex items-center gap-2 text-cyan-800">
              <UserRoundCheck className="h-5 w-5" />
              <span className="text-xs font-black">Deriva con contexto</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-cyan-900/65">
              <BrainCircuit className="h-4 w-4" /> Humano cuando importa
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

export function FeaturesHeroVisual() {
  const capabilities = [
    { icon: Inbox, label: "Bandeja", tone: "bg-orange-50 text-orange-700" },
    { icon: Tags, label: "Etiquetas", tone: "bg-fuchsia-50 text-fuchsia-700" },
    { icon: Users, label: "Equipos", tone: "bg-cyan-50 text-cyan-800" },
    { icon: BellRing, label: "Alertas", tone: "bg-amber-50 text-amber-700" },
    { icon: BarChart3, label: "Métricas", tone: "bg-violet-50 text-violet-700" },
    { icon: ShieldCheck, label: "Control", tone: "bg-emerald-50 text-emerald-700" },
  ];

  return (
    <VisualShell label="Capacidades incluidas en Cható organizadas alrededor de una única plataforma de escritorio">
      <div className="w-full max-w-[31rem]">
        <div className="relative mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[#18111f] text-white shadow-2xl shadow-violet-200 sm:h-36 sm:w-36">
          <div className="absolute inset-2 rounded-[1.55rem] border border-white/10" />
          <div className="text-center">
            <Sparkles className="mx-auto mb-2 h-7 w-7 text-orange-400" />
            <span className="text-sm font-black">Todo en Cható</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {capabilities.map(({ icon: Icon, label, tone }) => (
            <div key={label} className="rounded-2xl border border-white bg-white p-3 shadow-lg shadow-gray-100">
              <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-xs font-black text-gray-900">{label}</p>
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-gray-100" />
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-[10px] font-black uppercase tracking-[0.22em] text-violet-600">Una plataforma · Un historial · Un equipo</p>
      </div>
    </VisualShell>
  );
}

export function ContactHeroVisual() {
  return (
    <VisualShell label="Tres formas de contactar al equipo de Cható: WhatsApp, email o una demostración">
      <div className="w-full max-w-[30rem]">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-gray-100 bg-white px-2 py-4 text-center shadow-lg">
            <ChannelIcon channel="whatsapp" size="md" className="mb-2" />
            <span className="text-[10px] font-black text-gray-700">WhatsApp</span>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white px-2 py-4 text-center shadow-lg">
            <Mail className="mx-auto mb-3 h-9 w-9 rounded-xl bg-violet-100 p-2 text-violet-700" />
            <span className="text-[10px] font-black text-gray-700">Email</span>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white px-2 py-4 text-center shadow-lg">
            <MessageSquareText className="mx-auto mb-3 h-9 w-9 rounded-xl bg-violet-100 p-2 text-violet-700" />
            <span className="text-[10px] font-black text-gray-700">Demo</span>
          </div>
        </div>
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-violet-300 to-fuchsia-400" />
        <div className="rounded-[2rem] bg-[#18111f] p-6 text-white shadow-2xl shadow-violet-200">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-fuchsia-600">
              <UserRoundCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-black">Hablás con una persona</p>
              <p className="mt-1 text-xs leading-relaxed text-white/65">Te ayudamos a encontrar la mejor forma de usar Cható.</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-[10px] font-bold text-white/75">
            <Clock3 className="h-4 w-4 text-cyan-300" /> Te respondemos por el canal que elijas
          </div>
        </div>
      </div>
    </VisualShell>
  );
}
