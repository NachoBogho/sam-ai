"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActivePage = "home" | "automation" | "web" | "software" | "contact" | "demo";

interface SiteHeaderProps {
  activePage: ActivePage;
}

// ─── Nav items ────────────────────────────────────────────────────────────────

const navItems: { href: string; label: string; page: ActivePage }[] = [
  { href: "/automation", label: "AI Automation", page: "automation" },
  { href: "/web", label: "Web Dev", page: "web" },
  { href: "/software", label: "Custom Software", page: "software" },
  { href: "/contact", label: "Contact", page: "contact" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function SiteHeader({ activePage }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const showDemo = activePage !== "demo";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-surface/90 backdrop-blur-xl">

      <nav className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">

        {/* Col 1 — logo */}
        <Link
          href="/"
          className="logo-text justify-self-start text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-80"
        >
          SAM-<span className="text-electric-volt">AI</span>
        </Link>

        {/* Col 2 — nav links (desktop) */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activePage === item.page
                  ? "bg-white/5 text-white/90"
                  : "text-white/45 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Col 3 — CTAs */}
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden items-center gap-1.5 text-white/35 hover:bg-white/5 hover:text-white/70 lg:flex"
            asChild
          >
            <Link href="/portal">
              <LogIn className="size-3.5" />
              Portal
            </Link>
          </Button>
          {showDemo && (
            <Button
              size="sm"
              className="hidden bg-electric-volt font-semibold text-black shadow-[0_0_20px_rgba(198,255,0,0.18)] transition-all hover:bg-electric-volt/90 hover:shadow-[0_0_28px_rgba(198,255,0,0.32)] lg:flex"
              asChild
            >
              <Link href="/agendar-demo">Book demo</Link>
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-white/5 py-3.5 text-base font-medium transition-colors last:border-0 ${
                    activePage === item.page
                      ? "text-white/90"
                      : "text-white/45 hover:text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white/10 bg-transparent text-white/45 hover:bg-white/5 hover:text-white/80"
                  asChild
                >
                  <Link href="/portal" onClick={() => setMobileOpen(false)} className="flex items-center gap-1.5">
                    <LogIn className="size-3.5" />
                    Portal
                  </Link>
                </Button>
                {showDemo && (
                  <Button
                    size="sm"
                    className="w-full bg-electric-volt font-semibold text-black hover:bg-electric-volt/95"
                    asChild
                  >
                    <Link href="/agendar-demo" onClick={() => setMobileOpen(false)}>
                      Book demo
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
