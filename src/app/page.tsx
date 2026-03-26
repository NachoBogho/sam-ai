"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { N8nFlowDemo } from "@/components/n8n-flow-demo";
import { ToolsMarquee } from "@/components/tools-marquee";
import { VideoDemo } from "@/components/video-demo";
import {
  MessageSquare,
  Workflow,
  Plug,
  ArrowRight,
  Clock,
  Shield,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Search,
  FileText,
  Wrench,
  Headphones,
  Plus,
  Minus,
  Globe,
  ShoppingBag,
  LayoutDashboard,
  Code2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

type Lang = "es" | "en";

// ─── Stats ─────────────────────────────────────────────────────────────────

const statsEs = [
  { value: "40+", label: "Automatizaciones entregadas" },
  { value: "2–4 sem", label: "De auditoría a primer flujo en producción" },
  { value: "24/7", label: "Disponibilidad de tus procesos" },
];

const statsEn = [
  { value: "40+", label: "Automations delivered" },
  { value: "2–4 wks", label: "From audit to first live flow" },
  { value: "24/7", label: "Availability of your processes" },
];

// ─── Benefits ──────────────────────────────────────────────────────────────

const benefitsEs = [
  {
    icon: Clock,
    title: "Recuperá tu tiempo",
    description:
      "Tu equipo deja de perder horas en tareas repetitivas y se enfoca en lo que realmente genera valor.",
  },
  {
    icon: Shield,
    title: "Menos errores, más control",
    description:
      "Flujos automatizados y consistentes. Sin copiar/pegar ni olvidos entre sistemas.",
  },
  {
    icon: TrendingUp,
    title: "Escalá sin contratar",
    description:
      "Misma calidad de atención y procesos con más volumen, sin multiplicar la plantilla.",
  },
];

const benefitsEn = [
  {
    icon: Clock,
    title: "Win back your time",
    description:
      "Your team stops wasting hours on repetitive tasks and focuses on work that actually creates value.",
  },
  {
    icon: Shield,
    title: "Fewer errors, more control",
    description:
      "Automated, consistent flows. No more copy/paste or forgotten steps between systems.",
  },
  {
    icon: TrendingUp,
    title: "Scale without hiring",
    description:
      "Same quality of service and processes with more volume, without multiplying headcount.",
  },
];

// ─── Services ──────────────────────────────────────────────────────────────

const servicesEs = [
  {
    icon: MessageSquare,
    title: "Chatbots Inteligentes",
    description:
      "Atención 24/7. Respuestas instantáneas entrenadas con tu base de conocimiento, integradas donde ya operás.",
    features: ["Multi-canal (web, WhatsApp, email)", "Conectado a tus datos", "Escalado automático a humano"],
  },
  {
    icon: Workflow,
    title: "Automatización de Procesos",
    description:
      "Tareas repetitivas resueltas por flujos construidos en n8n que no se cansan, no se olvidan y no cometen errores.",
    features: ["n8n + modelos de IA", "Conectado a tus herramientas", "Monitoreo y alertas incluidos"],
  },
  {
    icon: Plug,
    title: "Conectividad entre Apps",
    description:
      "CRMs, facturación, email, bases de datos y más hablando entre sí en un solo flujo sin intervención manual.",
    features: ["APIs REST y webhooks", "Sin código o low-code", "Documentado y mantenible"],
  },
];

const servicesEn = [
  {
    icon: MessageSquare,
    title: "Intelligent Chatbots",
    description:
      "24/7 support. Instant answers trained on your knowledge base, integrated wherever you already operate.",
    features: ["Multi-channel (web, WhatsApp, email)", "Connected to your data", "Automatic escalation to human"],
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description:
      "Repetitive tasks handled by n8n flows that never get tired, never forget, and never make mistakes.",
    features: ["n8n + AI models", "Connected to your tools", "Monitoring and alerts included"],
  },
  {
    icon: Plug,
    title: "App Connectivity",
    description:
      "CRMs, billing, email, databases and more talking to each other in a single flow — no manual entry.",
    features: ["REST APIs and webhooks", "No-code or low-code", "Documented and maintainable"],
  },
];

// ─── Process steps ─────────────────────────────────────────────────────────

const processStepsEs = [
  {
    icon: Search,
    number: "01",
    title: "Auditoría gratuita",
    description:
      "Mapeamos tus procesos actuales en 2–3 días e identificamos dónde automatizar tiene más impacto.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Propuesta personalizada",
    description:
      "Un plan concreto: qué flujos construir, qué herramientas usar, tiempos y ahorro estimado.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Implementación",
    description:
      "Construimos e integramos en 2–4 semanas. Iteramos hasta que cada flujo funcione exactamente como necesitás.",
  },
  {
    icon: Headphones,
    number: "04",
    title: "Handoff y soporte",
    description:
      "Todo documentado y tuyo. Seguimos disponibles para ajustes, nuevos flujos o escalar lo que ya funciona.",
  },
];

const processStepsEn = [
  {
    icon: Search,
    number: "01",
    title: "Free audit",
    description:
      "We map your current processes in 2–3 days and identify where automation has the most impact.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Custom proposal",
    description:
      "A concrete plan: which flows to build, which tools to use, timeline, and estimated savings.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Implementation",
    description:
      "Built and integrated in 2–4 weeks. We iterate until every flow works exactly as needed.",
  },
  {
    icon: Headphones,
    number: "04",
    title: "Handoff & support",
    description:
      "Everything documented and yours. We stay available for adjustments, new flows, or scaling what already works.",
  },
];

// ─── FAQs ──────────────────────────────────────────────────────────────────

const faqsEs = [
  {
    q: "¿En cuánto tiempo vemos resultados?",
    a: "La mayoría de los clientes tiene un primer flujo operativo en 2–4 semanas. Los beneficios son visibles desde el primer día que el flujo corre en producción.",
  },
  {
    q: "¿Necesitamos conocimientos técnicos?",
    a: "No. Nosotros diseñamos, implementamos y dejamos todo documentado y operativo. Tu equipo solo tiene que usar el resultado.",
  },
  {
    q: "¿Qué herramientas usan?",
    a: "Principalmente n8n para los flujos de automatización, APIs REST para integraciones, y modelos de OpenAI o Anthropic para funcionalidades de IA. Nos adaptamos a lo que ya usás.",
  },
  {
    q: "¿Qué pasa con la seguridad de nuestros datos?",
    a: "Trabajamos con tus sistemas existentes y aplicamos buenas prácticas: acceso mínimo necesario, credenciales cifradas y trazabilidad de cada operación.",
  },
  {
    q: "¿Qué pasa si algo falla después de la entrega?",
    a: "Todos los proyectos incluyen un período de soporte post-entrega. Configuramos alertas, monitoreo y un canal de contacto directo antes de salir a producción.",
  },
  {
    q: "¿Solo para empresas grandes?",
    a: "No. Trabajamos con equipos desde 5 personas. El tamaño importa menos que tener procesos repetitivos que valga la pena automatizar.",
  },
];

const faqsEn = [
  {
    q: "How soon will we see results?",
    a: "Most clients have a first live flow in 2–4 weeks. Benefits are visible from the first day the flow runs in production.",
  },
  {
    q: "Do we need technical knowledge?",
    a: "No. We design, implement, and leave everything documented and operational. Your team only has to use the result.",
  },
  {
    q: "What tools do you use?",
    a: "Mainly n8n for automation flows, REST APIs for integrations, and OpenAI or Anthropic models for AI features. We adapt to what you already use.",
  },
  {
    q: "What about the security of our data?",
    a: "We work with your existing systems and apply best practices: least-privilege access, encrypted credentials, and full traceability for every operation.",
  },
  {
    q: "What happens if something breaks after delivery?",
    a: "All projects include a post-delivery support period. We set up alerts, monitoring, and a direct contact channel before going live.",
  },
  {
    q: "Is this only for large companies?",
    a: "No. We work with teams from 5 people up. Size matters less than having repetitive processes worth automating.",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stats = lang === "es" ? statsEs : statsEn;
  const benefits = lang === "es" ? benefitsEs : benefitsEn;
  const services = lang === "es" ? servicesEs : servicesEn;
  const processSteps = lang === "es" ? processStepsEs : processStepsEn;
  const faqs = lang === "es" ? faqsEs : faqsEn;

  return (
    <div className="min-h-screen text-white">

      <SiteHeader
        activePage="automation"
        lang={lang}
        onLangToggle={() => setLang(lang === "es" ? "en" : "es")}
      />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-electric-volt/5 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-volt/20 bg-electric-volt/5 px-4 py-1.5 text-sm text-electric-volt">
            <span>{lang === "es" ? "Agentes de IA" : "AI Agents"}</span>
            <span className="text-white/30">·</span>
            <span>n8n</span>
            <span className="text-white/30">·</span>
            <span>{lang === "es" ? "Automatización" : "Automation"}</span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {lang === "es" ? (
              <>
                La IA que devuelve
                <br />
                <span className="bg-gradient-to-r from-electric-volt to-electric-volt/70 bg-clip-text text-transparent">
                  tu tiempo
                </span>
              </>
            ) : (
              <>
                The AI that gives you
                <br />
                <span className="bg-gradient-to-r from-electric-volt to-electric-volt/70 bg-clip-text text-transparent">
                  your time back
                </span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            {lang === "es"
              ? "Tu empresa deja de perder horas en tareas repetitivas. Implementamos agentes de IA y flujos automáticos que responden, conectan y ejecutan por tu equipo."
              : "Your company stops wasting hours on repetitive work. We implement AI agents and automated flows that respond, connect, and execute for your team."}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="w-full bg-electric-volt px-8 font-semibold text-black shadow-[0_0_24px_rgba(198,255,0,0.3)] transition-all hover:scale-[1.02] hover:bg-electric-volt/95 hover:shadow-[0_0_32px_rgba(198,255,0,0.4)] sm:w-auto"
              asChild
            >
              <Link href="/contact">
                {lang === "es" ? "Iniciar auditoría gratuita" : "Start free audit"}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-text-muted hover:bg-white/5 hover:text-white sm:w-auto"
              asChild
            >
              <Link href="/desarrolloweb">
                {lang === "es" ? "Ver servicios web" : "See web services"}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a
            href="#solucion"
            className="flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-white"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              {lang === "es" ? "Descubrí más" : "Discover more"}
            </span>
            <ChevronDown className="size-5 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 text-center md:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-mono text-3xl font-bold text-electric-volt md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Marquee ── */}
      <ToolsMarquee lang={lang} />

      {/* ── Problema → Solución ── */}
      <section id="solucion" className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              {lang === "es" ? "El problema que resolvemos" : "The problem we solve"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {lang === "es" ? (
                <>
                  De horas perdidas a resultados
                  <br />
                  <span className="text-electric-volt">sin tocar código</span>
                </>
              ) : (
                <>
                  From wasted hours to results
                  <br />
                  <span className="text-electric-volt">without touching code</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              {lang === "es"
                ? "No te explicamos cómo funciona por dentro. Te mostramos qué ganás: menos fricción, menos errores y más tiempo para crecer."
                : "We don't explain how it works inside. We show you what you gain: less friction, fewer errors, and more time to grow."}
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-red-500/15 bg-red-500/5 p-8 md:p-10"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-red-400/80">
                {lang === "es" ? "Sin automatización" : "Without automation"}
              </p>
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                {lang === "es"
                  ? "Tiempo y dinero que se van en tareas repetitivas"
                  : "Time and money lost in repetitive tasks"}
              </h3>
              <p className="mt-4 leading-relaxed text-text-muted">
                {lang === "es"
                  ? "Equipos atados a copiar datos entre sistemas, responder siempre lo mismo o revisar manualmente lo que una máquina podría resolver en segundos."
                  : "Teams stuck copying data between systems, answering the same questions, or manually checking what a machine could handle in seconds."}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-electric-volt/25 bg-electric-volt/5 p-8 shadow-[0_0_40px_rgba(198,255,0,0.06)] md:p-10"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-electric-volt">
                {lang === "es" ? "Con SAM AI" : "With SAM AI"}
              </p>
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                {lang === "es"
                  ? "Un sistema que trabaja por tu equipo"
                  : "A system that works for your team"}
              </h3>
              <p className="mt-4 leading-relaxed text-text-muted">
                {lang === "es"
                  ? "Agentes que responden, flujos que conectan tus herramientas y procesos que corren solos, sin que nadie tenga que supervisarlos."
                  : "Agents that answer, flows that connect your tools, and processes that run on their own — without anyone having to babysit them."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Beneficios ── */}
      <section
        id="beneficios"
        className="border-t border-white/5 bg-white/[0.02] px-6 py-28"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              {lang === "es" ? "Por qué SAM AI" : "Why SAM AI"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {lang === "es"
                ? "Resultados que notás desde el día uno"
                : "Results you notice from day one"}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              {lang === "es"
                ? "No vendemos promesas. Entregamos flujos que funcionan y métricas que mejoran."
                : "No hype. We deliver flows that work and metrics that actually improve."}
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-sm transition-all hover:border-electric-volt/20 hover:bg-black/50"
              >
                <div className="mb-5 inline-flex rounded-xl border border-electric-volt/20 bg-electric-volt/10 p-3 transition-colors group-hover:bg-electric-volt/15">
                  <item.icon className="size-6 text-electric-volt" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Servicios ── */}
      <section id="servicios" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              {lang === "es" ? "Servicios" : "Services"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {lang === "es"
                ? "Soluciones que escalan con tu negocio"
                : "Solutions that scale with your business"}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              {lang === "es"
                ? "Desde atención al cliente hasta back-office: todo en un mismo ecosistema."
                : "From customer support to back-office: everything in one ecosystem."}
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <Card className="h-full border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 hover:border-electric-volt/25 hover:shadow-[0_0_40px_rgba(198,255,0,0.08)]">
                  <CardHeader className="pb-4">
                    <div className="mb-4 inline-flex rounded-xl border border-electric-volt/20 bg-electric-volt/10 p-3 transition-colors group-hover:bg-electric-volt/15">
                      <service.icon className="size-6 text-electric-volt" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-white">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="mt-2 leading-relaxed text-text-muted">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-text-muted"
                        >
                          <CheckCircle2 className="size-3.5 text-electric-volt" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── n8n Flow Demo ── */}
      <section className="border-t border-white/5 px-6 py-28">
        <N8nFlowDemo lang={lang} />
      </section>

      {/* ── Video Demo ── */}
      <section className="border-t border-white/5 px-6 py-28">
        <VideoDemo lang={lang} />
      </section>

      {/* ── Proceso ── */}
      <section
        id="proceso"
        className="border-t border-white/5 bg-white/[0.02] px-6 py-28"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              {lang === "es" ? "Cómo trabajamos" : "How we work"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {lang === "es"
                ? "De cero a producción en 4 pasos"
                : "From zero to production in 4 steps"}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              {lang === "es"
                ? "Un proceso predecible y sin sorpresas. Sabés en todo momento qué se está haciendo y cuándo."
                : "A predictable process with no surprises. You always know what's happening and when."}
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="inline-flex rounded-xl border border-electric-volt/20 bg-electric-volt/10 p-2.5">
                    <step.icon className="size-5 text-electric-volt" />
                  </div>
                  <span className="font-mono text-3xl font-bold text-electric-volt/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Web Dev Promo ── */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/8 bg-white/[0.02] p-8 md:p-12"
          >
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
              {/* Left — text */}
              <div className="lg:w-80 shrink-0">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">
                  {lang === "es" ? "También somos una agencia web" : "We also build websites"}
                </p>
                <h2 className="mb-4 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                  {lang === "es"
                    ? "Diseño y desarrollo web moderno"
                    : "Modern web design & development"}
                </h2>
                <p className="mb-8 text-sm leading-relaxed text-text-muted">
                  {lang === "es"
                    ? "Landing pages, e-commerce, portales y apps. Solo web, solo automatización, o los dos juntos. Vos elegís."
                    : "Landing pages, e-commerce, portals and apps. Web only, automation only, or both together. Your choice."}
                </p>
                <Button
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/8 hover:border-white/30 hover:text-white"
                  asChild
                >
                  <Link href="/desarrolloweb">
                    {lang === "es" ? "Ver servicios web" : "See web services"}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              {/* Right — 3 service mini-cards */}
              <div className="grid grid-cols-1 gap-3 flex-1 sm:grid-cols-3">
                {[
                  {
                    icon: Globe,
                    label: lang === "es" ? "Landing Pages" : "Landing Pages",
                    desc: lang === "es" ? "Conversión y velocidad" : "Conversion & speed",
                    features: lang === "es"
                      ? ["SEO técnico", "Formularios → CRM"]
                      : ["Technical SEO", "Forms → CRM"],
                    accent: "#C6FF00",
                  },
                  {
                    icon: ShoppingBag,
                    label: lang === "es" ? "E-commerce" : "Online Store",
                    desc: lang === "es" ? "Ventas 24/7 automatizadas" : "Automated 24/7 sales",
                    features: lang === "es"
                      ? ["Pagos integrados", "Stock sincronizado"]
                      : ["Integrated payments", "Stock sync"],
                    accent: "#818CF8",
                  },
                  {
                    icon: LayoutDashboard,
                    label: lang === "es" ? "Portales y Apps" : "Portals & Apps",
                    desc: lang === "es" ? "A medida para tu negocio" : "Tailored to your business",
                    features: lang === "es"
                      ? ["Auth + roles", "Datos en tiempo real"]
                      : ["Auth + roles", "Real-time data"],
                    accent: "#38BDF8",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:border-white/14 hover:bg-white/[0.05] transition-all duration-200"
                  >
                    <div
                      className="mb-3 inline-flex size-9 items-center justify-center rounded-xl border"
                      style={{ background: item.accent + "15", borderColor: item.accent + "25" }}
                    >
                      <item.icon className="size-4" style={{ color: item.accent }} />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-white">{item.label}</p>
                    <p className="mb-3 text-xs text-white/40">{item.desc}</p>
                    <ul className="space-y-1.5">
                      {item.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-white/35">
                          <span
                            className="size-1 rounded-full shrink-0"
                            style={{ background: item.accent + "90" }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-6 py-28">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              FAQ
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {lang === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  <span className="shrink-0 text-electric-volt">
                    {openFaq === i ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 leading-relaxed text-text-muted">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="border-t border-white/5 bg-white/[0.02] px-6 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-electric-volt/20 bg-electric-volt/5 px-8 py-16 md:py-20"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {lang === "es"
                ? "Listo para recuperar tu tiempo"
                : "Ready to win your time back"}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-text-muted">
              {lang === "es"
                ? "Una auditoría gratuita, sin compromiso. Te mostramos exactamente dónde automatizar y cuánto podés ahorrar."
                : "A free audit, no strings attached. We show you exactly where to automate and how much you can save."}
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                className="bg-electric-volt px-8 font-semibold text-black shadow-[0_0_24px_rgba(198,255,0,0.3)] hover:bg-electric-volt/95 hover:shadow-[0_0_32px_rgba(198,255,0,0.4)]"
                asChild
              >
                <Link href="/contact">
                  {lang === "es" ? "Pedir auditoría gratuita" : "Request free audit"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 bg-white/[0.02] px-6 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <Link
            href="/"
            className="logo-text text-xl font-bold text-white"
          >
            SAM-<span className="text-electric-volt">AI</span>
          </Link>
          <p className="max-w-md text-sm text-text-muted">
            {lang === "es"
              ? "Solution Agent Manager — IA y automatización con n8n para empresas que quieren recuperar su tiempo."
              : "Solution Agent Manager — AI and automation with n8n for companies that want to win their time back."}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: "#solucion", label: lang === "es" ? "Solución" : "Solution" },
              { href: "#servicios", label: lang === "es" ? "Servicios" : "Services" },
              { href: "#proceso", label: lang === "es" ? "Proceso" : "Process" },
              { href: "#faq", label: "FAQ" },
              { href: "/desarrolloweb", label: "Web" },
              { href: "/contacto", label: lang === "es" ? "Contacto" : "Contact" },
              { href: "/agendar-demo", label: lang === "es" ? "Agendar demo" : "Book demo" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-text-muted/50">
            {lang === "es"
              ? `© ${new Date().getFullYear()} SAM AI. Todos los derechos reservados.`
              : `© ${new Date().getFullYear()} SAM AI. All rights reserved.`}
          </p>
        </div>
      </footer>
    </div>
  );
}
