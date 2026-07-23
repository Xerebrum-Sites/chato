"use client";

import { useEffect, useState } from "react";
import { URLS } from "@/lib/config";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface DemoConfig {
  enabled: boolean;
  email_blocklist: string[];
}

type Step = 1 | 2;

function todayPlusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function fmtDateLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function DemoForm({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<DemoConfig>({
    enabled: true,
    email_blocklist: [],
  });

  useEffect(() => {
    if (!open) return;
    fetch(`${URLS.api}/api/public/demo/config`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { enabled: true, email_blocklist: [] }))
      .then((d) => setConfig(d))
      .catch(() => {
        // keep defaults
      });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  function reset() {
    setStep(1);
    setName("");
    setEmail("");
    setWebsite("");
    setDate(null);
    setTime(null);
    setNotes("");
    setSubmitting(false);
    setSuccess(null);
    setError(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function validateStep1(): string | null {
    if (name.trim().length < 2) return "Ingresá tu nombre.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Email inválido.";
    const domain = email.split("@")[1]?.toLowerCase() ?? "";
    if (config.email_blocklist.includes(domain)) {
      return "Necesitamos un email corporativo (no gmail / hotmail / etc.).";
    }
    if (!/\./.test(website.trim())) return "Ingresá la URL de tu sitio.";
    return null;
  }

  function goToStep2() {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep(2);
  }

  async function submit() {
    if (!date || !time) {
      setError("Elegí una fecha y horario.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const resp = await fetch(`${URLS.api}/api/public/demo/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          corporate_email: email.trim(),
          website_url: website.trim(),
          preferred_date: date,
          preferred_time: time,
          notes: notes.trim() || null,
        }),
      });
      if (!resp.ok) {
        const body = (await resp.json().catch(() => null)) as
          | { detail?: string }
          | null;
        throw new Error(body?.detail ?? "Algo falló al enviar. Reintentá.");
      }
      const data = (await resp.json()) as { confirmation_message: string };
      setSuccess(data.confirmation_message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Algo falló al enviar.");
    } finally {
      setSubmitting(false);
    }
  }

  const dateOptions = Array.from({ length: 14 }).map((_, i) =>
    todayPlusDays(i + 1),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-gray-900">Solicitar demo</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {success
                ? "¡Listo!"
                : step === 1
                  ? "Paso 1 de 2 — contanos sobre vos"
                  : "Paso 2 de 2 — elegí cuándo"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="h-8 w-8 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 flex items-center justify-center"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Stepper */}
        {!success && (
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-violet-600 rounded-full" />
              <div
                className={`flex-1 h-1 rounded-full ${
                  step === 2 ? "bg-violet-600" : "bg-gray-200"
                }`}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-4">
          {success ? (
            <div className="text-center space-y-3 py-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                ✓
              </div>
              <p className="text-gray-700">{success}</p>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 bg-violet-600 text-white rounded-full text-sm font-semibold hover:bg-violet-700"
              >
                Cerrar
              </button>
            </div>
          ) : step === 1 ? (
            <>
              <label className="block">
                <span className="text-xs font-semibold text-gray-700">Nombre completo</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-500"
                  placeholder="Juan Pérez"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-700">Email corporativo</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-500"
                  placeholder="juan@empresa.com"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-700">URL de tu sitio web</span>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-500"
                  placeholder="https://empresa.com"
                />
              </label>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                type="button"
                onClick={goToStep2}
                className="w-full px-6 py-2.5 bg-violet-600 text-white rounded-full text-sm font-semibold hover:bg-violet-700"
              >
                Siguiente
              </button>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold text-gray-700">
                Elegí un día
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                {dateOptions.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDate(d);
                      setTime(null);
                    }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      date === d
                        ? "bg-violet-600 text-white border-violet-700"
                        : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
                    }`}
                  >
                    {fmtDateLabel(d)}
                  </button>
                ))}
              </div>
              {date && (
                <>
                  <p className="text-xs font-semibold text-gray-700 mt-3">
                    Elegí un horario
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`px-2 py-2 rounded-lg text-xs font-medium border transition-colors ${
                          time === t
                            ? "bg-violet-600 text-white border-violet-700"
                            : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <label className="block">
                <span className="text-xs font-semibold text-gray-700">
                  Mensaje (opcional)
                </span>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-500"
                  placeholder="Contanos brevemente qué buscás resolver…"
                />
              </label>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-100"
                >
                  ← Atrás
                </button>
                <button
                  type="button"
                  onClick={() => void submit()}
                  disabled={submitting || !date || !time}
                  className="flex-1 px-6 py-2.5 bg-violet-600 text-white rounded-full text-sm font-semibold hover:bg-violet-700 disabled:opacity-60"
                >
                  {submitting ? "Enviando…" : "Confirmar demo"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
