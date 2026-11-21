"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { URLS } from "@/lib/config";

const field = "mt-2 block w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-base font-normal text-gray-900 focus:border-violet-600 focus:outline-2 focus:outline-violet-600";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    for (const name of ["subject", "message"]) {
      if (!String(data.get(name) ?? "").trim()) {
        const input = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
        input.focus();
        setError(name === "subject" ? "Escribí el asunto de tu consulta." : "Escribí tu mensaje.");
        return;
      }
    }
    setPending(true);
    setError("");
    try {
      const response = await fetch(`${URLS.api}/api/public/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (response.status === 204) {
        setSent(true);
      } else {
        setError(response.status === 429
          ? "Ya recibimos varias consultas desde esta conexión. Intentá más tarde."
          : "No pudimos enviar tu consulta. Tu mensaje sigue acá para que puedas reintentar.");
      }
    } catch {
      setError("Revisá tu conexión y volvé a enviar la consulta.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div id="consulta" className="scroll-mt-28 rounded-3xl border border-white/80 bg-white p-6 shadow-sm sm:p-9">
      <h2 className="text-2xl font-bold text-gray-900">Envianos tu consulta</h2>
      <div role="status" aria-live="polite">
        {sent && <div className="mt-5">
          <p className="flex items-start gap-2 text-gray-800"><CircleCheck aria-hidden className="shrink-0 text-emerald-600" />Recibimos tu consulta. Te responderemos al email que indicaste.</p>
          <button type="button" onClick={() => setSent(false)} className="mt-5 font-semibold text-violet-700 underline">Enviar otra consulta</button>
        </div>}
      </div>
      {!sent && <form onSubmit={submit} className="mt-6">
        <fieldset disabled={pending} className="grid min-w-0 gap-5 text-sm font-semibold text-gray-800 sm:grid-cols-2">
          <label>Área
            <select name="area" defaultValue="" required className={field}>
              <option value="" disabled>Elegí un área</option>
              <option value="ventas">Ventas</option>
              <option value="soporte">Soporte</option>
              <option value="administracion">Administración</option>
              <option value="general">Consulta general</option>
            </select>
          </label>
          <label>Email de respuesta
            <input className={field} type="email" name="email" autoComplete="email" maxLength={254} required />
          </label>
          <label className="sm:col-span-2">Asunto
            <input className={field} name="subject" maxLength={120} required />
          </label>
          <label className="sm:col-span-2">Mensaje
            <textarea className={field + " resize-y"} name="message" rows={5} maxLength={3000} required />
          </label>
          <div className="sm:col-span-2">
            {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-6 py-3 font-bold text-white hover:bg-violet-800 disabled:opacity-60" disabled={pending}>
              {pending ? "Enviando…" : "Enviar consulta"} <ArrowRight aria-hidden className="size-4" />
            </button>
          </div>
        </fieldset>
      </form>}
    </div>
  );
}
