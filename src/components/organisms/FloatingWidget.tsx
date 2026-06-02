"use client";

import { useState, useRef, useEffect } from "react";

const WHATSAPP_NUMBER = "1234567890";
const WHATSAPP_MESSAGE = "Hola! Me interesa Cható. ¿Pueden darme más información?";
const TENANT_SLUG = "chato";
const CHAT_API = `https://chato-api.xerebrumgroup.com/api/chat/${TENANT_SLUG}/messages`;
const POLL_API = `https://chato-api.xerebrumgroup.com/api/chat/${TENANT_SLUG}/poll`;
const STATUS_API = `https://chato-api.xerebrumgroup.com/api/chat/${TENANT_SLUG}/status`;
const SESSION_KEY = `chato_session_${TENANT_SLUG}`;
const CURSOR_KEY = `chato_cursor_${TENANT_SLUG}`;
const POLL_INTERVAL_MS = 2000;

type Role = "user" | "bot";
interface Message { id: number; text: string; role: Role }
interface ApiButton { label: string; payload: string }

export function FloatingWidget() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [buttons, setButtons] = useState<ApiButton[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const msgEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgCounter = useRef(0);
  const cursorRef = useRef<string | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // Load session from localStorage
  useEffect(() => {
    setSessionId(localStorage.getItem(SESSION_KEY));
    cursorRef.current = localStorage.getItem(CURSOR_KEY);
  }, []);

  // Stop the poller when the component unmounts.
  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, buttons]);

  // Focus input when chat opens
  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [chatOpen]);

  function addMessage(text: string, role: Role) {
    setMessages((prev) => [...prev, { id: ++msgCounter.current, text, role }]);
  }

  function bumpCursor(ts: string | null | undefined) {
    if (!ts) return;
    const current = cursorRef.current;
    if (!current || ts > current) {
      cursorRef.current = ts;
      localStorage.setItem(CURSOR_KEY, ts);
    }
  }

  async function pollOnce(sid: string | null) {
    const id = sid ?? sessionId;
    if (!id) return;
    try {
      const cursor = cursorRef.current;
      const url =
        POLL_API +
        "?session_id=" +
        encodeURIComponent(id) +
        (cursor ? "&last_delivered_at=" + encodeURIComponent(cursor) : "");
      const res = await fetch(url, { method: "GET", credentials: "omit" });
      if (!res.ok) return;
      const data = await res.json();
      const msgs: { content: string; role: string; buttons: ApiButton[]; created_at: string }[] =
        data.messages ?? [];
      let lastButtons: ApiButton[] | null = null;
      for (const m of msgs) {
        if (m.content) addMessage(m.content, "bot");
        if (m.buttons && m.buttons.length) lastButtons = m.buttons;
      }
      if (lastButtons) setButtons(lastButtons);
      bumpCursor(data.last_delivered_at);
    } catch {
      /* swallow — next tick will retry */
    }
  }

  function startPolling(sid: string | null) {
    if (pollTimerRef.current) return;
    pollOnce(sid);
    pollTimerRef.current = setInterval(() => pollOnce(null), POLL_INTERVAL_MS);
  }

  async function send(payload: { text?: string; button_payload?: string }, userLabel: string) {
    addMessage(userLabel, "user");
    setButtons([]);
    setLoading(true);
    try {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, ...payload }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const newSessionId = data.session_id as string;
      setSessionId(newSessionId);
      localStorage.setItem(SESSION_KEY, newSessionId);
      // Do NOT bump the cursor with data.last_delivered_at: the bot
      // reply the pipeline just persisted is exactly what the poller
      // has to deliver on its next tick.
      startPolling(newSessionId);
    } catch {
      addMessage("Error al conectar. Intentá de nuevo.", "bot");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    send({ text }, text);
  }

  async function openChat() {
    setChatOpen(true);
    setMenuOpen(false);
    // If a session already exists, start polling so any messages an
    // agent may have sent while the widget was closed get rendered
    // before the user types again.
    if (sessionId) startPolling(sessionId);
    // Check online status
    try {
      const res = await fetch(STATUS_API);
      const data = await res.json();
      setIsOnline(data.online);
      if (!data.online && messages.length === 0) {
        setTimeout(() => {
          addMessage(
            data.reason === "outside_schedule"
              ? "Estamos fuera de horario de atención. Podés dejarnos un mensaje y te respondemos en cuanto estemos disponibles."
              : "En este momento no estamos disponibles. Podés contactarnos por WhatsApp o volver más tarde.",
            "bot"
          );
        }, 400);
        return;
      }
    } catch {
      setIsOnline(true); // assume online if status check fails
    }
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage("¡Hola! ¿En qué podemos ayudarte?", "bot");
        setButtons([
          { label: "Quiero probar Cható gratis", payload: "probar_gratis" },
          { label: "¿Cómo funciona?", payload: "como_funciona" },
          { label: "Ver planes y precios", payload: "ver_precios" },
        ]);
      }, 400);
    }
  }

  return (
    <>
      {/* Options panel */}
      {menuOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end"
          role="region"
          aria-label="Opciones de contacto"
        >
          {/* Web Chat option */}
          <button
            onClick={openChat}
            className="flex items-center gap-3 bg-white rounded-2xl pl-4 pr-5 py-3 shadow-xl border border-gray-100 text-gray-700 font-medium text-sm hover:border-violet-300 hover:shadow-violet-100 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            Chat en vivo
          </button>

          {/* WhatsApp option */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-2xl pl-4 pr-5 py-3 shadow-xl border border-gray-100 text-gray-700 font-medium text-sm hover:border-green-300 hover:shadow-green-50 transition-all duration-200 group"
            aria-label="Contactar por WhatsApp"
          >
            <div className="w-8 h-8 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            WhatsApp
          </a>
        </div>
      )}

      {/* Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      {/* Main FAB */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => {
            if (chatOpen) { setChatOpen(false); return; }
            setMenuOpen(!menuOpen);
          }}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
            menuOpen || chatOpen
              ? "bg-gray-700 hover:bg-gray-800 rotate-45"
              : "gradient-primary hover:opacity-90 hover:scale-110 shadow-glow"
          }`}
          aria-label={menuOpen || chatOpen ? "Cerrar" : "Contacto"}
          aria-expanded={menuOpen || chatOpen}
        >
          {menuOpen || chatOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat window */}
      {chatOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          role="dialog"
          aria-label="Chat en vivo"
        >
          {/* Header */}
          <div className="gradient-primary px-5 py-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Soporte Cható</p>
              <div className="flex items-center gap-1.5">
                {isOnline === null ? (
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                ) : isOnline ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                )}
                <span className="text-white/80 text-xs">
                  {isOnline === null ? "Conectando..." : isOnline ? "En línea" : "Fuera de línea"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Cerrar chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                  msg.role === "user"
                    ? "self-end bg-violet-600 text-white rounded-br-sm"
                    : "self-start bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Quick reply buttons from API */}
            {buttons.length > 0 && (
              <div className="self-start flex flex-wrap gap-2 max-w-full">
                {buttons.map((b) => (
                  <button
                    key={b.payload}
                    onClick={() => { setButtons([]); send({ button_payload: b.payload }, b.label); }}
                    className="text-xs px-3 py-1.5 bg-white border border-violet-200 text-violet-700 rounded-full hover:bg-violet-50 hover:border-violet-400 transition-colors"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="self-start bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            )}
            <div ref={msgEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isOnline === false ? "No disponible ahora..." : "Escribí tu mensaje..."}
                disabled={loading || isOnline === false}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white transition-opacity disabled:opacity-40 flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
