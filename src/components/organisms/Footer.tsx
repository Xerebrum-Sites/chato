import Link from "next/link";
import { Mail } from "lucide-react";
import { EMAILS } from "@/lib/config";
import { footerNav } from "@/lib/nav";

const legalLinks = [
  { label: "Términos y Condiciones", href: "/terminos/" },
  { label: "Privacidad", href: "/privacidad/" },
  { label: "Eliminación de datos", href: "/eliminar-datos/" },
];

export function Footer() {
  return (
    <footer className="bg-[#001f34] text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4" aria-label="Actros — inicio">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/actros-logo-negative.svg?v=1" alt="Actros" className="h-10 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Centralizá WhatsApp, Instagram, Facebook, Telegram y Web Chat en un solo lugar. Pensado para
              pequeños comercios y emprendedores de habla hispana.
            </p>
            <a
              href={`mailto:${EMAILS.contact}`}
              className="inline-flex items-center gap-2 px-3 h-9 rounded-lg bg-white/10 hover:bg-[#c61261] text-xs font-medium transition-colors duration-200"
            >
              <Mail className="w-4 h-4" strokeWidth={1.75} />
              {EMAILS.contact}
            </a>
          </div>

          {/* Columnas de navegación */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold text-sm mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-[#ee7d16] transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-[#ee7d16] transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Actros. Todos los derechos reservados.
          </p>
          <p className="text-xs">Hecho con ❤️ para quienes atienden clientes todos los días.</p>
        </div>
      </div>
    </footer>
  );
}
