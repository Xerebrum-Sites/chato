"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "1234567890";
const WHATSAPP_MESSAGE = "Hola! Me interesa Cható. ¿Pueden darme más información?";

export function FloatingWidget() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      {/* Options panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end"
          role="region"
          aria-label="Opciones de contacto"
        >
          {/* Web Chat */}
          <div>
            <button
              onClick={() => { setChatOpen(true); setOpen(false); }}
              className="flex items-center gap-3 bg-white rounded-2xl pl-4 pr-5 py-3 shadow-xl border border-gray-100 text-gray-700 font-medium text-sm hover:border-violet-300 hover:shadow-violet-100 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              Chat en vivo
            </button>
          </div>

          {/* WhatsApp */}
          <div>
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
        </div>
      )}

      {/* Backdrop for close */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {/* Main FAB */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-gray-700 hover:bg-gray-800 rotate-45"
              : "bg-gradient-to-br from-violet-600 to-violet-800 hover:from-violet-700 hover:to-violet-900 hover:scale-110 shadow-glow"
          }`}
          aria-label={open ? "Cerrar menú de contacto" : "Abrir opciones de contacto"}
          aria-expanded={open}
        >
          {open ? (
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

      {/* Embedded web chat */}
      {chatOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 sm:w-96 h-[480px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          role="dialog"
          aria-label="Chat en vivo"
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-violet-700 to-violet-900 px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Soporte Cható</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/70 text-xs">En línea</span>
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

          {/* Chat iframe placeholder (replace src with real chat URL) */}
          <div className="flex-1 relative bg-gray-50 flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-900 mb-2">¡Hola! ¿En qué podemos ayudarte?</p>
            <p className="text-sm text-gray-500 mb-4">Nuestro equipo responde en menos de 5 minutos.</p>
            <div className="w-full space-y-2">
              {["Quiero probar Cható gratis", "¿Cómo funciona?", "Ver planes y precios"].map((q) => (
                <button
                  key={q}
                  className="w-full text-sm text-left px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:bg-violet-50 text-gray-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
              <button className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-700 flex items-center justify-center text-white transition-colors flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
