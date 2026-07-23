"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { IconBadge } from "@/components/atoms/IconBadge";
import { ChannelIcon } from "@/components/atoms/ChannelIcon";
import { productLinks, solutionLinks, topLevelLinks } from "@/lib/nav";
import { supportedChannels } from "@/lib/content";
import { URLS } from "@/lib/config";

type MenuKey = "producto" | "soluciones";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const panelMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.18, ease: EASE },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>("producto");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Cerrar el mega menú al hacer click afuera
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const openMenu = useCallback((key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  }, []);

  const solid = scrolled || open !== null;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur-md border-gray-100 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-20 lg:h-24"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="Cható — inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg?v=2"
            alt="Cható"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-11 lg:h-14"}`}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {/* Producto */}
          <li
            className="relative"
            onMouseEnter={() => openMenu("producto")}
            onMouseLeave={scheduleClose}
          >
            <MenuTrigger
              label="Producto"
              expanded={open === "producto"}
              onClick={() => setOpen((o) => (o === "producto" ? null : "producto"))}
            />
            <AnimatePresence>
              {open === "producto" && (
                <motion.div {...panelMotion} className="absolute left-0 top-full pt-3">
                  <div className="w-[620px] rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {productLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(null)}
                          className="flex items-start gap-3 rounded-xl p-3 hover:bg-violet-50 transition-colors group/item"
                        >
                          {link.icon && <IconBadge icon={link.icon} size="sm" />}
                          <span>
                            <span className="block text-sm font-semibold text-gray-900 group-hover/item:text-violet-700">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="block text-xs text-gray-500 mt-0.5 leading-snug">
                                {link.description}
                              </span>
                            )}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-4 bg-gray-50 border-t border-gray-100 px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-medium text-gray-500">Centralizás:</span>
                        <div className="flex items-center gap-1.5">
                          {supportedChannels.map((c) => (
                            <ChannelIcon key={c} channel={c} size="sm" />
                          ))}
                        </div>
                      </div>
                      <Link
                        href="/contacto/"
                        onClick={() => setOpen(null)}
                        className="text-xs font-semibold text-violet-700 hover:text-violet-800 inline-flex items-center gap-1"
                      >
                        Solicitar demo <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Soluciones */}
          <li
            className="relative"
            onMouseEnter={() => openMenu("soluciones")}
            onMouseLeave={scheduleClose}
          >
            <MenuTrigger
              label="Soluciones"
              expanded={open === "soluciones"}
              onClick={() => setOpen((o) => (o === "soluciones" ? null : "soluciones"))}
            />
            <AnimatePresence>
              {open === "soluciones" && (
                <motion.div {...panelMotion} className="absolute left-0 top-full pt-3">
                  <div className="w-[680px] rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="px-5 pt-4 pb-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Casos de uso por industria
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-1 p-3">
                      {solutionLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(null)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-violet-50 transition-colors group/item"
                        >
                          {link.icon && <IconBadge icon={link.icon} size="sm" />}
                          <span className="text-sm font-medium text-gray-700 group-hover/item:text-violet-700 leading-tight">
                            {link.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="bg-gray-50 border-t border-gray-100 px-5 py-3.5">
                      <Link
                        href="/casos-de-uso/"
                        onClick={() => setOpen(null)}
                        className="text-xs font-semibold text-violet-700 hover:text-violet-800 inline-flex items-center gap-1"
                      >
                        Ver todos los casos de uso <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Top-level directos */}
          {topLevelLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-violet-600 rounded-lg hover:bg-violet-50 transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={URLS.signIn}
            className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors"
          >
            Iniciar sesión
          </a>
          <Button href={URLS.signIn} size="sm">
            Empezar gratis
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 space-y-1">
              <MobileAccordion
                title="Producto"
                openKey="producto"
                current={mobileSection}
                setCurrent={setMobileSection}
                links={productLinks}
                onNavigate={() => setMobileOpen(false)}
              />
              <MobileAccordion
                title="Soluciones"
                openKey="soluciones"
                current={mobileSection}
                setCurrent={setMobileSection}
                links={solutionLinks}
                onNavigate={() => setMobileOpen(false)}
              />
              {topLevelLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 text-sm font-semibold text-gray-800 hover:bg-violet-50 hover:text-violet-700 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-gray-100 space-y-2">
                <a
                  href={URLS.signIn}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-600 text-center hover:text-violet-600"
                >
                  Iniciar sesión
                </a>
                <Button href={URLS.signIn} size="md" className="w-full justify-center">
                  Empezar gratis
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuTrigger({
  label,
  expanded,
  onClick,
}: {
  label: string;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
        expanded ? "text-violet-700 bg-violet-50" : "text-gray-600 hover:text-violet-600 hover:bg-violet-50"
      }`}
    >
      {label}
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        strokeWidth={2}
      />
    </button>
  );
}

function MobileAccordion({
  title,
  openKey,
  current,
  setCurrent,
  links,
  onNavigate,
}: {
  title: string;
  openKey: MenuKey;
  current: MenuKey | null;
  setCurrent: (k: MenuKey | null) => void;
  links: { label: string; href: string; description?: string; icon?: React.ComponentType<{ className?: string; strokeWidth?: number }> }[];
  onNavigate: () => void;
}) {
  const isOpen = current === openKey;
  return (
    <div className="border-b border-gray-50 last:border-0">
      <button
        type="button"
        onClick={() => setCurrent(isOpen ? null : openKey)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-800"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-1 pb-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4 text-violet-500" strokeWidth={1.75} />}
                    <span className="leading-tight">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
