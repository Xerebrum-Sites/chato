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
    <footer className="footer-atmosphere relative overflow-hidden text-white/60">
      <div className="actros-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="actros-contours absolute -right-20 bottom-0 h-72 w-[42rem] opacity-35" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4" aria-label="Axtroos — inicio">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/actros-logo-negative.svg?v=1" alt="Axtroos" className="h-7 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Una plataforma B2B para centralizar conversaciones, automatizar operaciones y acompañar a los
              equipos comerciales y de atención.
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
            © {new Date().getFullYear()} Axtroos. Todos los derechos reservados.
          </p>
          <p className="text-xs">Hecho con ❤️ para quienes atienden clientes todos los días.</p>
        </div>
      </div>
    </footer>
  );
}
