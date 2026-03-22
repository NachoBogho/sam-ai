"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, MessageSquare, Zap, Database, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Lang = "es" | "en";

interface VideoDemoProps {
  lang: Lang;
}

const content = {
  es: {
    tag: "Demo en vivo",
    heading: "Mirá cómo se ve por dentro",
    subheading:
      "En 20 minutos te mostramos exactamente cómo quedaría tu flujo — con tus herramientas, tu proceso, tu equipo.",
    playLabel: "Ver demo completa",
    points: [
      "Conectamos en vivo tu herramienta principal",
      "Armamos el flujo frente a vos, paso a paso",
      "Estimamos el ahorro específico para tu empresa",
    ],
    cta: "Agendar demo gratuita",
    ctaSub: "Sin compromiso · 20 minutos · 100% personalizada",
    windowTitle: "n8n — Demo en vivo",
    nodes: [
      { label: "Trigger", color: "#25D366" },
      { label: "AI Agent", color: "#A78BFA" },
      { label: "Tu CRM", color: "#38BDF8" },
      { label: "Respuesta", color: "#C6FF00" },
    ],
  },
  en: {
    tag: "Live demo",
    heading: "See how it looks inside",
    subheading:
      "In 20 minutes we'll show you exactly how your flow would look — with your tools, your process, your team.",
    playLabel: "Watch full demo",
    points: [
      "We connect your main tool live",
      "We build the flow in front of you, step by step",
      "We estimate specific savings for your business",
    ],
    cta: "Book a free demo",
    ctaSub: "No commitment · 20 minutes · 100% personalized",
    windowTitle: "n8n — Live demo",
    nodes: [
      { label: "Trigger",   color: "#25D366" },
      { label: "AI Agent",  color: "#A78BFA" },
      { label: "Your CRM",  color: "#38BDF8" },
      { label: "Response",  color: "#C6FF00" },
    ],
  },
};

// Minimal static node for the preview canvas
function PreviewNode({
  label,
  color,
  style,
}: {
  label: string;
  color: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute flex items-center gap-2 rounded-xl border px-3 py-2"
      style={{
        background: `${color}12`,
        borderColor: `${color}30`,
        ...style,
      }}
    >
      <div
        className="size-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      <span className="font-mono text-[11px] font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

export function VideoDemo({ lang }: VideoDemoProps) {
  const c = content[lang];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        {/* ── Left: copy ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
            {c.tag}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {c.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-muted">
            {c.subheading}
          </p>

          <ul className="mt-8 space-y-3.5">
            {c.points.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-electric-volt" />
                <span className="text-text-muted">{point}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              size="lg"
              className="bg-electric-volt px-7 font-semibold text-black shadow-[0_0_24px_rgba(198,255,0,0.3)] transition-all hover:scale-[1.02] hover:bg-electric-volt/95 hover:shadow-[0_0_32px_rgba(198,255,0,0.4)]"
              asChild
            >
              <Link href="/contact">
                {c.cta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-white/25">{c.ctaSub}</p>
          </div>
        </motion.div>

        {/* ── Right: preview window ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/contact" className="group block">
            {/* macOS window chrome */}
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.025] px-5 py-3.5">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-red-500/70" />
                  <div className="size-3 rounded-full bg-yellow-400/70" />
                  <div className="size-3 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-xs text-white/25">{c.windowTitle}</span>
              </div>

              {/* Canvas preview */}
              <div
                className="relative aspect-video overflow-hidden"
                style={{
                  backgroundColor: "#0D1117",
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              >
                {/* Static node previews — intentionally dim until hovered */}
                <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40 opacity-60">
                  <PreviewNode label={c.nodes[0].label} color={c.nodes[0].color} style={{ top: "20%", left: "4%" }} />
                  {/* Connector line 1 */}
                  <div className="absolute top-[28%] left-[19%] h-px w-[13%] bg-white/10" />
                  <PreviewNode label={c.nodes[1].label} color={c.nodes[1].color} style={{ top: "20%", left: "32%" }} />
                  {/* Connector line 2 */}
                  <div className="absolute top-[28%] left-[48%] h-px w-[13%] bg-white/10" />
                  <PreviewNode label={c.nodes[2].label} color={c.nodes[2].color} style={{ top: "20%", left: "61%" }} />
                  {/* Connector line 3 */}
                  <div className="absolute top-[28%] left-[77%] h-px w-[13%] bg-white/10" />
                  <PreviewNode label={c.nodes[3].label} color={c.nodes[3].color} style={{ top: "20%", right: "2%" }} />

                  {/* Second row: faint detail shapes */}
                  <div className="absolute bottom-[28%] left-[8%] h-14 w-28 rounded-xl border border-white/[0.04] bg-white/[0.02]" />
                  <div className="absolute bottom-[28%] left-[40%] h-14 w-36 rounded-xl border border-white/[0.04] bg-white/[0.02]" />
                  <div className="absolute bottom-[28%] right-[6%] h-14 w-28 rounded-xl border border-white/[0.04] bg-white/[0.02]" />
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Pulse rings */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute rounded-full border border-electric-volt/20"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                      style={{ width: 90, height: 90 }}
                    />
                    <motion.div
                      className="absolute rounded-full border border-electric-volt/15"
                      animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                      style={{ width: 90, height: 90 }}
                    />
                    {/* Play button */}
                    <div
                      className="relative flex h-16 w-16 items-center justify-center rounded-full border border-electric-volt/40 bg-electric-volt/15 backdrop-blur-sm transition-all duration-300 group-hover:bg-electric-volt/25 group-hover:border-electric-volt/60 group-hover:scale-105"
                      style={{ boxShadow: "0 0 32px rgba(198,255,0,0.2)" }}
                    >
                      <Play
                        className="size-6 text-electric-volt"
                        style={{ marginLeft: "3px" }}
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <p className="mt-5 font-medium text-white/70 text-sm group-hover:text-white/90 transition-colors">
                    {c.playLabel}
                  </p>
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D1117] to-transparent" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
