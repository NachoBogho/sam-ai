"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Zap,
  Brain,
  Database,
  CheckCircle2,
  Play,
  RotateCcw,
} from "lucide-react";

type Lang = "es" | "en";

interface N8nFlowDemoProps {
  lang: Lang;
}

const flowContent = {
  es: {
    sectionTag: "Cómo funciona por dentro",
    heading: (
      <>
        Mirá la automatización{" "}
        <span className="bg-gradient-to-r from-electric-volt to-electric-volt/70 bg-clip-text text-transparent">
          en tiempo real
        </span>
      </>
    ),
    headingPlain: "Mirá la automatización en tiempo real",
    subheading:
      "Esto es lo que pasa dentro de nuestros flujos — explicado para cualquier persona, sin tecnicismos.",
    scenario: "Ejemplo: soporte al cliente por WhatsApp",
    playBtn: "Simular flujo",
    resetBtn: "Reiniciar",
    techLabel: "Nodo en n8n",
    windowTitle: "n8n — Soporte WhatsApp Automatizado",
    clickHint: "Hacé clic en cada paso para ver qué pasa por dentro",
    nodes: [
      {
        icon: MessageSquare,
        accentColor: "#25D366",
        label: "WhatsApp",
        subtitle: "Mensaje recibido",
        title: "El cliente escribe un mensaje",
        description:
          'Un cliente escribe: "¿Cuándo llega mi pedido #4521?" Es una consulta normal, como las que tu equipo recibe decenas de veces al día.',
        insight:
          "El sistema se activa solo — tu equipo no tiene que hacer nada.",
        tech: "WhatsApp Trigger",
      },
      {
        icon: Zap,
        accentColor: "#C6FF00",
        label: "n8n",
        subtitle: "Flujo activado",
        title: "n8n recibe el mensaje al instante",
        description:
          "n8n funciona como el director de orquesta del flujo. En menos de un segundo detecta el mensaje y pone en marcha todos los pasos automáticos.",
        insight: "Funciona 24/7, los 365 días del año. Sin días de enfermedad.",
        tech: "Webhook Trigger",
      },
      {
        icon: Brain,
        accentColor: "#A78BFA",
        label: "IA",
        subtitle: "Analizando intención",
        title: "La IA entiende qué necesita el cliente",
        description:
          "Un modelo de IA lee el mensaje y comprende que el cliente quiere saber el estado de un pedido. No busca palabras exactas — entiende el significado real.",
        insight:
          "Como un empleado que entiende contexto, tono y urgencia, sin cansarse.",
        tech: "AI Agent (Claude / GPT-4)",
      },
      {
        icon: Database,
        accentColor: "#38BDF8",
        label: "Tus datos",
        subtitle: "Consultando registros",
        title: "Busca en tus propios sistemas",
        description:
          "La IA consulta tu base de datos, CRM o planilla para encontrar el pedido #4521: en camino, con fecha estimada y dirección de entrega.",
        insight:
          "Se conecta a lo que ya usás: Google Sheets, Airtable, Notion, tu CRM o base de datos.",
        tech: "Database / Sheets Node",
      },
      {
        icon: CheckCircle2,
        accentColor: "#C6FF00",
        label: "Respuesta",
        subtitle: "< 3 segundos",
        title: "Respuesta precisa enviada automáticamente",
        description:
          '"Tu pedido #4521 está en camino y llega el jueves antes de las 18h. ¿Podemos ayudarte con algo más?" — sin que nadie lo haya escrito.',
        insight:
          "Si la consulta es demasiado compleja, el sistema avisa a un agente humano.",
        tech: "WhatsApp Send Node",
      },
    ],
  },
  en: {
    sectionTag: "How it works inside",
    heading: (
      <>
        Watch the automation{" "}
        <span className="bg-gradient-to-r from-electric-volt to-electric-volt/70 bg-clip-text text-transparent">
          in real time
        </span>
      </>
    ),
    headingPlain: "Watch the automation in real time",
    subheading:
      "This is what our flows look like under the hood — explained for anyone, no tech jargon.",
    scenario: "Example: WhatsApp customer support",
    playBtn: "Simulate flow",
    resetBtn: "Reset",
    techLabel: "n8n Node",
    windowTitle: "n8n — Automated WhatsApp Support",
    clickHint: "Click each step to see what happens inside",
    nodes: [
      {
        icon: MessageSquare,
        accentColor: "#25D366",
        label: "WhatsApp",
        subtitle: "Message received",
        title: "Customer sends a message",
        description:
          'A customer types: "When does my order #4521 arrive?" A normal question — the kind your team gets dozens of times a day.',
        insight: "The system activates on its own — your team doesn't lift a finger.",
        tech: "WhatsApp Trigger",
      },
      {
        icon: Zap,
        accentColor: "#C6FF00",
        label: "n8n",
        subtitle: "Flow triggered",
        title: "n8n receives the message instantly",
        description:
          "n8n acts as the conductor of the entire flow. In under a second it detects the message and kicks off every step automatically.",
        insight: "Runs 24/7, 365 days a year. No sick days.",
        tech: "Webhook Trigger",
      },
      {
        icon: Brain,
        accentColor: "#A78BFA",
        label: "AI",
        subtitle: "Analyzing intent",
        title: "AI understands what the customer needs",
        description:
          "An AI model reads the message and understands the customer wants a shipping status update for a specific order. Not keyword matching — real comprehension.",
        insight:
          "Like having a team member who understands context, tone, and urgency, non-stop.",
        tech: "AI Agent (Claude / GPT-4)",
      },
      {
        icon: Database,
        accentColor: "#38BDF8",
        label: "Your data",
        subtitle: "Querying records",
        title: "Searches your own systems",
        description:
          "The AI queries your database, CRM, or spreadsheet to find order #4521: in transit, with the estimated delivery date and address.",
        insight:
          "Connects to what you already use: Google Sheets, Airtable, Notion, your CRM or database.",
        tech: "Database / Sheets Node",
      },
      {
        icon: CheckCircle2,
        accentColor: "#C6FF00",
        label: "Reply sent",
        subtitle: "< 3 seconds",
        title: "Precise reply sent automatically",
        description:
          '"Your order #4521 is on its way and arrives Thursday before 6 PM. Can we help with anything else?" — written by no one.',
        insight:
          "If the query is too complex, the system escalates to a human agent.",
        tech: "WhatsApp Send Node",
      },
    ],
  },
};

export function N8nFlowDemo({ lang }: N8nFlowDemoProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedOnce, setCompletedOnce] = useState(false);
  const content = flowContent[lang];
  const { nodes } = content;
  const activeNode = nodes[activeStep];

  const advance = useCallback(() => {
    setActiveStep((prev) => {
      if (prev >= nodes.length - 1) {
        setIsPlaying(false);
        setCompletedOnce(true);
        return prev;
      }
      return prev + 1;
    });
  }, [nodes.length]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(advance, 2200);
    return () => clearTimeout(timer);
  }, [isPlaying, activeStep, advance]);

  const handlePlay = () => {
    if (activeStep >= nodes.length - 1) {
      setActiveStep(0);
      setCompletedOnce(false);
      // slight delay so reset is visible before playing
      setTimeout(() => setIsPlaying(true), 80);
    } else {
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
    setCompletedOnce(false);
  };

  const handleNodeClick = (i: number) => {
    setIsPlaying(false);
    setActiveStep(i);
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
          {content.sectionTag}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {content.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
          {content.subheading}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {/* n8n Canvas Window */}
        <div
          className="overflow-hidden rounded-2xl border border-white/10"
          style={{
            backgroundColor: "#0D1117",
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          {/* macOS-style chrome */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.025] px-5 py-3.5">
            <div className="flex gap-2">
              <div className="size-3 rounded-full bg-red-500/70" />
              <div className="size-3 rounded-full bg-yellow-400/70" />
              <div className="size-3 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs text-white/25">
              {content.windowTitle}
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-electric-volt/60 animate-pulse" />
              <span className="font-mono text-[10px] text-electric-volt/60">
                {isPlaying ? "running" : "idle"}
              </span>
            </div>
          </div>

          {/* Flow canvas */}
          <div className="p-6 md:p-10 lg:p-12">
            {/* Click hint */}
            <p className="mb-8 text-center text-xs text-white/20 font-mono">
              {content.clickHint}
            </p>

            {/* Nodes row */}
            <div className="flex items-center justify-between">
              {nodes.map((node, i) => {
                const isActive = i === activeStep;
                const isPast = i < activeStep;
                const isLit = isActive || isPast;

                return (
                  <div key={node.tech} className="flex items-center flex-1 min-w-0">
                    {/* Node button */}
                    <button
                      onClick={() => handleNodeClick(i)}
                      className="group relative flex flex-col items-center gap-2.5 focus:outline-none"
                    >
                      {/* Glow halo for active node */}
                      {isActive && (
                        <motion.div
                          layoutId="nodeGlow"
                          className="absolute -inset-5 rounded-3xl"
                          style={{
                            background: `radial-gradient(ellipse at center, ${node.accentColor}18 0%, transparent 70%)`,
                          }}
                          transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        />
                      )}

                      {/* Node card */}
                      <motion.div
                        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 md:h-[4.5rem] md:w-[4.5rem] md:rounded-2xl"
                        style={{
                          background: isLit
                            ? `${node.accentColor}1A`
                            : "rgba(255,255,255,0.04)",
                          borderColor: isActive
                            ? `${node.accentColor}70`
                            : isPast
                            ? `${node.accentColor}35`
                            : "rgba(255,255,255,0.07)",
                          boxShadow: isActive
                            ? `0 0 20px ${node.accentColor}20, inset 0 0 20px ${node.accentColor}08`
                            : "none",
                        }}
                        animate={isActive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <node.icon
                          className="size-6 transition-colors duration-300 md:size-7"
                          style={{
                            color: isLit ? node.accentColor : "#374151",
                          }}
                        />
                        {/* Step badge */}
                        <div
                          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-all duration-300"
                          style={{
                            background: isLit
                              ? node.accentColor
                              : "rgba(255,255,255,0.06)",
                            color: isLit ? "#000" : "#4B5563",
                          }}
                        >
                          {i + 1}
                        </div>
                      </motion.div>

                      {/* Label */}
                      <div className="text-center">
                        <div
                          className="text-[11px] font-semibold leading-none transition-colors duration-300 md:text-xs"
                          style={{
                            color: isLit ? "rgba(255,255,255,0.9)" : "#374151",
                          }}
                        >
                          {node.label}
                        </div>
                        <div
                          className="mt-1 hidden text-[10px] leading-none transition-colors duration-300 md:block"
                          style={{
                            color: isLit
                              ? "rgba(255,255,255,0.35)"
                              : "rgba(255,255,255,0.1)",
                          }}
                        >
                          {node.subtitle}
                        </div>
                      </div>
                    </button>

                    {/* Connector line */}
                    {i < nodes.length - 1 && (
                      <div className="relative mx-1.5 h-px flex-1 md:mx-3">
                        {/* Base line */}
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            background:
                              i < activeStep
                                ? `linear-gradient(to right, ${node.accentColor}55, ${nodes[i + 1].accentColor}55)`
                                : "rgba(255,255,255,0.06)",
                          }}
                        />
                        {/* Arrow head */}
                        <div
                          className="absolute -right-1 top-1/2 -translate-y-1/2 transition-colors duration-500"
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "3px solid transparent",
                            borderBottom: "3px solid transparent",
                            borderLeft: `5px solid ${i < activeStep ? nodes[i + 1].accentColor + "55" : "rgba(255,255,255,0.06)"}`,
                          }}
                        />
                        {/* Traveling dot */}
                        {isPlaying && i === activeStep && (
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 rounded-full"
                            style={{
                              width: 6,
                              height: 6,
                              background: node.accentColor,
                              boxShadow: `0 0 10px ${node.accentColor}, 0 0 20px ${node.accentColor}80`,
                            }}
                            initial={{ left: "0%" }}
                            animate={{ left: "100%" }}
                            transition={{ duration: 1.9, ease: "easeInOut" }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mt-4 overflow-hidden rounded-2xl border p-6 backdrop-blur-sm md:p-8"
            style={{
              borderColor: `${activeNode.accentColor}25`,
              background: `linear-gradient(135deg, ${activeNode.accentColor}06 0%, rgba(0,0,0,0) 60%)`,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex items-start gap-5">
              {/* Icon */}
              <div
                className="mt-0.5 shrink-0 rounded-xl p-3 md:rounded-2xl md:p-3.5"
                style={{
                  background: `${activeNode.accentColor}18`,
                  border: `1px solid ${activeNode.accentColor}30`,
                }}
              >
                <activeNode.icon
                  className="size-5 md:size-6"
                  style={{ color: activeNode.accentColor }}
                />
              </div>

              <div className="flex-1 min-w-0">
                {/* Title + tech badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-white md:text-lg">
                    {activeNode.title}
                  </h3>
                  <span
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[10px]"
                    style={{
                      borderColor: `${activeNode.accentColor}30`,
                      color: activeNode.accentColor,
                      background: `${activeNode.accentColor}10`,
                    }}
                  >
                    {content.techLabel}: {activeNode.tech}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 leading-relaxed text-text-muted">
                  {activeNode.description}
                </p>

                {/* Insight */}
                <div
                  className="mt-4 flex items-start gap-2 text-sm"
                  style={{ color: activeNode.accentColor }}
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  <span>{activeNode.insight}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls + step dots */}
        <div className="mt-5 flex items-center justify-between">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {nodes.map((node, i) => (
              <button
                key={i}
                onClick={() => handleNodeClick(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === activeStep ? 24 : 8,
                  background:
                    i <= activeStep
                      ? activeNode.accentColor
                      : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>

          {/* Play / Reset */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-text-muted transition-colors hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="size-3.5" />
              {content.resetBtn}
            </button>
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all disabled:opacity-50"
              style={{
                background: isPlaying
                  ? "rgba(198,255,0,0.15)"
                  : "#C6FF00",
                color: isPlaying ? "#C6FF00" : "#000",
                boxShadow: isPlaying
                  ? "none"
                  : "0 0 20px rgba(198,255,0,0.3)",
              }}
            >
              <Play className="size-3.5" />
              {content.playBtn}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
