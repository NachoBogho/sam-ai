"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActivePage = "automation" | "web" | "contact" | "demo";

interface SiteHeaderProps {
  activePage: ActivePage;
  lang?: "es" | "en";
  onLangToggle?: () => void;
}

interface NavItem {
  href: string;
  label: string;
  pill?: boolean;
}

// ─── Nav link definitions ─────────────────────────────────────────────────────

function getNavItems(activePage: ActivePage, lang: "es" | "en"): NavItem[] {
  const isEs = lang === "es";
  switch (activePage) {
    case "automation":
      return [
        { href: "#solucion", label: isEs ? "Solución" : "Solution" },
        { href: "#servicios", label: isEs ? "Servicios" : "Services" },
        { href: "#proceso", label: isEs ? "Proceso" : "Process" },
        { href: "#faq", label: "FAQ" },
        { href: "/desarrolloweb", label: "Web", pill: true },
      ];
    case "web":
      return [
        { href: "#proyectos", label: "Proyectos" },
        { href: "#stack", label: "Stack" },
        { href: "#proceso", label: "Proceso" },
        { href: "/", label: isEs ? "Automatización" : "Automation", pill: true },
      ];
    case "contact":
    case "demo":
      return [
        { href: "/", label: isEs ? "Automatización" : "Automation" },
        { href: "/desarrolloweb", label: "Web" },
      ];
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SiteHeader({ activePage, lang = "es", onLangToggle }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isEs = lang === "es";
  const navItems = getNavItems(activePage, lang);

  const showContacto = activePage !== "contact";
  const showDemo = activePage !== "demo";
  const showLangToggle = Boolean(onLangToggle);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-surface/90 backdrop-blur-xl">

      {/* ── Nav — grid 3 cols: 1fr | auto | 1fr
           Las columnas exteriores son iguales → los navlinks quedan
           con exactamente el mismo espacio a cada lado. ── */}
      <nav className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">

        {/* Col 1 — logo */}
        <Link
          href="/"
          className="logo-text justify-self-start text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-80"
        >
          SAM-<span className="text-electric-volt">AI</span>
        </Link>

        {/* Col 2 — nav links (solo desktop) */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.pill ? (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm font-bold text-electric-volt transition-opacity hover:opacity-70"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-white/45 transition-colors hover:bg-white/5 hover:text-white/90"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Col 3 — CTAs en desktop / hamburger en mobile */}
        <div className="flex items-center justify-end gap-2">

          {/* Desktop CTAs */}
          {showLangToggle && (
            <button
              onClick={onLangToggle}
              className="hidden items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white/35 transition-colors hover:bg-white/5 hover:text-white/60 lg:flex"
            >
              <span className={lang === "es" ? "text-white/80" : "text-white/35"}>ES</span>
              <span className="text-white/20">/</span>
              <span className={lang === "en" ? "text-white/80" : "text-white/35"}>EN</span>
            </button>
          )}
          {showContacto && (
            <Button
              variant="ghost"
              size="sm"
              className="hidden text-white/45 hover:bg-white/5 hover:text-white/80 lg:flex"
              asChild
            >
              <Link href="/contacto">{isEs ? "Contacto" : "Contact"}</Link>
            </Button>
          )}
          {showDemo && (
            <Button
              size="sm"
              className="hidden bg-electric-volt font-semibold text-black shadow-[0_0_20px_rgba(198,255,0,0.18)] transition-all hover:bg-electric-volt/90 hover:shadow-[0_0_28px_rgba(198,255,0,0.32)] lg:flex"
              asChild
            >
              <Link href="/agendar-demo">{isEs ? "Agendar demo" : "Book demo"}</Link>
            </Button>
          )}

          {/* Mobile lang toggle */}
          {showLangToggle && (
            <button
              onClick={onLangToggle}
              className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white/35 hover:text-white/60 lg:hidden"
            >
              <span className={lang === "es" ? "text-white/80" : "text-white/35"}>ES</span>
              <span className="text-white/20">/</span>
              <span className={lang === "en" ? "text-white/80" : "text-white/35"}>EN</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="rounded-md p-2 text-white/40 transition-colors hover:text-white/80 lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/5 bg-surface/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item) =>
                item.pill ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-white/5 py-3.5 text-base font-bold text-electric-volt transition-opacity hover:opacity-70 last:border-0"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-white/5 py-3.5 text-base font-medium text-white/45 transition-colors hover:text-white/90 last:border-0"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-4 flex flex-col gap-2 pt-2">
                {showContacto && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/10 bg-transparent text-white/45 hover:bg-white/5 hover:text-white/80"
                    asChild
                  >
                    <Link href="/contacto" onClick={() => setMobileOpen(false)}>
                      {isEs ? "Contacto" : "Contact"}
                    </Link>
                  </Button>
                )}
                {showDemo && (
                  <Button
                    size="sm"
                    className="w-full bg-electric-volt font-semibold text-black hover:bg-electric-volt/95"
                    asChild
                  >
                    <Link href="/agendar-demo" onClick={() => setMobileOpen(false)}>
                      {isEs ? "Agendar demo" : "Book demo"}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
