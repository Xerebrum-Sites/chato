"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/atoms/Button";

const navLinks = [
  { label: "Características", href: "#caracteristicas" },
  { label: "Telegram Hub", href: "#telegram" },
  { label: "Casos de uso", href: "#casos" },
  { label: "Precios", href: "#precios" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 overflow-hidden border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-gray-100 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-24"
        }`}
      >
        {/* Logo — grande al inicio, se achica al scrollear */}
        <a href="/" className="flex items-center">
          <img
            src="/logo.svg?v=2"
            alt="Cható"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-14"}`}
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-violet-600 rounded-lg hover:bg-violet-100 transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://chato-app.xerebrumgroup.com/signin"
            className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors"
          >
            Iniciar sesión
          </a>
          <Button href="https://chato-app.xerebrumgroup.com/signin" size="sm">
            Empezar gratis
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-100 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100">
            <Button href="https://chato-app.xerebrumgroup.com/signin" size="md" className="w-full justify-center">
              Empezar gratis
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
