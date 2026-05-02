"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Users,
  Zap,
  CalendarCheck,
} from "lucide-react";

// ─── Calendly config ──────────────────────────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/contacto-samdev-ai/30min";
const CALENDLY_CONFIGURED = Boolean(CALENDLY_URL);

// ─── Content ──────────────────────────────────────────────────────────────────

const expectItems = [
  {
    icon: Clock,
    title: "Exactly 30 minutes",
    description: "A focused session, no fluff.",
  },
  {
    icon: CheckCircle2,
    title: "Live initial audit",
    description: "We review your current processes and where automation has the most impact.",
  },
  {
    icon: Zap,
    title: "Custom proposal",
    description: "We show you a concrete plan tailored to your business.",
  },
  {
    icon: Users,
    title: "No commitment",
    description: "100% free. You decide if we move forward.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AgendarDemoPage() {
  useEffect(() => {
    if (!CALENDLY_CONFIGURED) return;
    const existing = document.querySelector('script[src*="calendly"]');
    if (existing) {
      (window as any).Calendly?.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: document.querySelector(".calendly-inline-widget"),
      });
    } else {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen text-white">
      <SiteHeader activePage="demo" />

      <main className="mx-auto min-h-screen max-w-6xl px-6 pb-8 pt-24">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
        >
          {/* ── Left: context ── */}
          <div className="flex flex-col justify-start pt-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              Free demo
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Book your 30-minute session
            </h1>
            <p className="mt-3 text-base leading-relaxed text-text-muted">
              Show us how your team works today. In 30 minutes we identify what to automate and how.
            </p>

            <ul className="mt-6 space-y-4">
              {expectItems.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-electric-volt/20 bg-electric-volt/10 mt-0.5">
                    <item.icon className="size-4 text-electric-volt" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-sm text-text-muted">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pointer-events-none mt-8 hidden h-px w-full bg-gradient-to-r from-electric-volt/20 via-electric-volt/5 to-transparent lg:block" />
          </div>

          {/* ── Right: Calendly embed ── */}
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
            {CALENDLY_CONFIGURED ? (
              <div
                className="calendly-inline-widget w-full"
                data-url={CALENDLY_URL}
                style={{ minWidth: "320px", height: "650px" }}
              />
            ) : (
              <div className="flex h-full min-h-[600px] flex-col items-center justify-center gap-6 p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-electric-volt/20 bg-electric-volt/5">
                  <CalendarCheck className="size-9 text-electric-volt" />
                </div>
                <div className="max-w-xs">
                  <p className="text-lg font-semibold text-white">Calendly will be set up here</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Once your Calendly account is linked, the scheduling widget will appear in this
                    space.
                  </p>
                </div>
                <div className="mt-2 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3">
                  <p className="font-mono text-xs text-white/30">
                    CALENDLY_URL = &quot;https://calendly.com/your-user/30min&quot;
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
