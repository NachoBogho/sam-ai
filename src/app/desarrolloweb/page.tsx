"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import {
  ArrowRight,
  Zap,
  Globe,
  ShoppingBag,
  LayoutDashboard,
  Building2,
  CheckCircle2,
  Code2,
  Workflow,
  MessageSquare,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiN8N,
  SiFigma,
  SiVercel,
  SiNodedotjs,
} from "react-icons/si";

// ─── Data ──────────────────────────────────────────────────────────────────

const projectTypes = [
  {
    icon: Globe,
    tag: "Landing Page",
    title: "Páginas de aterrizaje de alto impacto",
    description:
      "Diseñadas para convertir. Velocidad de carga extrema, SEO técnico y formularios conectados a tu CRM o email automáticamente.",
    features: ["Carga < 1s", "SEO técnico on-page", "Formularios → CRM automático", "A/B testing listo"],
    accent: "#C6FF00",
    mockup: "landing",
  },
  {
    icon: ShoppingBag,
    tag: "E-commerce",
    title: "Tiendas que venden mientras dormís",
    description:
      "Catálogo, pagos, inventario y fulfillment. Cada venta dispara flujos automáticos: confirmación, logística y seguimiento.",
    features: ["Pagos con Stripe / MercadoPago", "Stock sincronizado", "Notificaciones automáticas", "Panel de gestión"],
    accent: "#818CF8",
    mockup: "ecommerce",
  },
  {
    icon: LayoutDashboard,
    tag: "Portal de Clientes",
    title: "Apps web a medida para tu equipo o clientes",
    description:
      "Dashboards, portales de autogestión, intranets. Tu cliente ve su información en tiempo real, sin que tu equipo tenga que enviársela.",
    features: ["Auth segura", "Datos en tiempo real", "Integraciones API", "Roles y permisos"],
    accent: "#38BDF8",
    mockup: "portal",
  },
  {
    icon: Building2,
    tag: "Sitio Corporativo",
    title: "Presencia digital que genera confianza",
    description:
      "Multi-idioma, multi-sucursal, blog con CMS. Tu equipo de marketing publica sin tocar código. Formularios conectados al instante.",
    features: ["CMS headless", "Multi-idioma", "Blog / noticias", "Analíticas integradas"],
    accent: "#34D399",
    mockup: "corporate",
  },
];

const stack = [
  { Icon: SiNextdotjs, name: "Next.js", role: "Framework" },
  { Icon: SiReact, name: "React", role: "UI" },
  { Icon: SiTypescript, name: "TypeScript", role: "Lenguaje" },
  { Icon: SiTailwindcss, name: "Tailwind", role: "Estilos" },
  { Icon: SiN8N, name: "n8n", role: "Automatización" },
  { Icon: SiNodedotjs, name: "Node.js", role: "Backend" },
  { Icon: SiVercel, name: "Vercel", role: "Deploy" },
  { Icon: SiFigma, name: "Figma", role: "Diseño" },
];

const process = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Entendemos tu negocio, tus usuarios y qué debe lograr el sitio. Definimos métricas de éxito.",
    tag: "1–2 días",
  },
  {
    number: "02",
    title: "Diseño",
    description: "Prototipo en Figma. Revisás cada pantalla antes de que escribamos una línea de código.",
    tag: "3–5 días",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construimos con Next.js, TypeScript y Tailwind. Código limpio, rápido y mantenible.",
    tag: "1–3 semanas",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Publicamos en Vercel con SSL, dominio propio y CI/CD. Cero downtime en futuras actualizaciones.",
    tag: "1 día",
  },
  {
    number: "05",
    title: "Automatización",
    description: "Conectamos el sitio a tus herramientas con n8n. Formularios, notificaciones, datos — todo fluye solo.",
    tag: "Incluido",
  },
];

// ─── Mock browser frames ────────────────────────────────────────────────────

function MockupLanding() {
  return (
    <div className="h-full flex flex-col gap-1.5 p-3">
      <div className="h-6 w-2/3 rounded bg-white/20" />
      <div className="h-3 w-full rounded bg-white/10" />
      <div className="h-3 w-4/5 rounded bg-white/10" />
      <div className="mt-1 h-7 w-28 rounded bg-electric-volt/60" />
      <div className="mt-3 grid grid-cols-3 gap-1.5 flex-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded bg-white/5 border border-white/8" />
        ))}
      </div>
    </div>
  );
}

function MockupEcommerce() {
  return (
    <div className="h-full flex flex-col gap-1.5 p-3">
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded bg-white/5 border border-white/8 flex flex-col gap-1 p-1.5">
            <div className="flex-1 rounded bg-white/8" />
            <div className="h-2 w-3/4 rounded bg-white/15" />
            <div className="h-2 w-1/2 rounded bg-[#818CF8]/50" />
          </div>
        ))}
      </div>
      <div className="h-6 w-full rounded bg-[#818CF8]/40" />
    </div>
  );
}

function MockupPortal() {
  return (
    <div className="h-full flex gap-2 p-3">
      <div className="w-14 flex flex-col gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-5 rounded ${i === 1 ? "bg-[#38BDF8]/50" : "bg-white/5 border border-white/8"}`} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 rounded bg-white/5 border border-white/8" />
          ))}
        </div>
        <div className="flex-1 rounded bg-white/5 border border-white/8 p-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-1 flex gap-1">
              <div className="h-2 w-2 rounded-full bg-[#38BDF8]/40 mt-0.5" />
              <div className="h-2 flex-1 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupCorporate() {
  return (
    <div className="h-full flex flex-col gap-1.5 p-3">
      <div className="flex items-center justify-between">
        <div className="h-4 w-16 rounded bg-[#34D399]/50" />
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-2 w-8 rounded bg-white/10" />
          ))}
        </div>
      </div>
      <div className="flex-1 rounded bg-white/5 border border-white/8 flex flex-col gap-1.5 p-2">
        <div className="h-4 w-1/2 rounded bg-white/20" />
        <div className="h-2 w-full rounded bg-white/10" />
        <div className="h-2 w-4/5 rounded bg-white/10" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 rounded bg-white/5 border border-white/8" />
        ))}
      </div>
    </div>
  );
}

function BrowserMockup({ type, accent }: { type: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0f1e] overflow-hidden shadow-xl h-44">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/8 bg-white/[0.03]">
        <div className="size-2 rounded-full bg-white/15" />
        <div className="size-2 rounded-full bg-white/15" />
        <div className="size-2 rounded-full bg-white/15" />
        <div className="ml-2 flex-1 h-4 rounded bg-white/5 border border-white/8" />
      </div>
      {/* Content */}
      <div className="h-[calc(100%-32px)]" style={{ color: accent }}>
        {type === "landing" && <MockupLanding />}
        {type === "ecommerce" && <MockupEcommerce />}
        {type === "portal" && <MockupPortal />}
        {type === "corporate" && <MockupCorporate />}
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function DesarrolloWebPage() {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader activePage="web" />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-electric-volt/4 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-volt/20 bg-electric-volt/5 px-4 py-1.5 text-sm text-electric-volt">
            <Code2 className="size-3.5" />
            <span>Desarrollo Web</span>
            <span className="text-white/30">·</span>
            <span>Automatización nativa</span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Tu web construida por
            <br />
            <span className="bg-gradient-to-r from-electric-volt to-electric-volt/70 bg-clip-text text-transparent">
              quienes la automatizan
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            La diferencia entre tener una web y tener una web que convierte, responde y se conecta sola con tus sistemas.
            Nosotros construimos ambas capas.
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
                Empezar proyecto
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-text-muted hover:bg-white/5 hover:text-white sm:w-auto"
              asChild
            >
              <Link href="#proyectos">Ver tipos de proyectos</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Tres modalidades ── */}
      <section className="px-6 py-20 border-y border-white/5">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">
              Cómo podemos trabajar
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Un servicio, dos servicios, o los dos juntos
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-text-muted text-sm">
              No son servicios atados. Podés contratar solo el desarrollo web, solo la automatización, o combinarlos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Web solo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-8"
            >
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Code2 className="size-5 text-white/50" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/30">Opción A</p>
              <h3 className="mb-3 text-xl font-bold">Solo desarrollo web</h3>
              <p className="mb-5 text-sm leading-relaxed text-text-muted">
                Diseño y código. Landing page, tienda o portal. Entregado en producción con un stack moderno, rápido y mantenible.
              </p>
              <ul className="space-y-2">
                {["Diseño a medida", "Next.js + TypeScript", "SEO técnico incluido", "Deploy en Vercel"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/40">
                    <span className="size-1.5 rounded-full bg-white/25 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Automatización solo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-8"
            >
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Zap className="size-5 text-white/50" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/30">Opción B</p>
              <h3 className="mb-3 text-xl font-bold">Solo automatización</h3>
              <p className="mb-5 text-sm leading-relaxed text-text-muted">
                Tu web ya existe y está bien. Lo que necesitás es conectarla a tus sistemas: CRM, email, facturación, Slack.
              </p>
              <ul className="space-y-2">
                {["Flujos con n8n", "Webhooks y APIs", "Alertas y reportes", "Sin tocar tu código"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/40">
                    <span className="size-1.5 rounded-full bg-white/25 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Ambos — destacado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="rounded-2xl border border-electric-volt/20 bg-electric-volt/[0.04] p-8 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 rounded-full bg-electric-volt/15 px-2.5 py-0.5 text-[10px] font-semibold text-electric-volt">
                Recomendado
              </div>
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-electric-volt/20 bg-electric-volt/10">
                <Workflow className="size-5 text-electric-volt" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-electric-volt/60">Opción C</p>
              <h3 className="mb-3 text-xl font-bold">Web + Automatización</h3>
              <p className="mb-5 text-sm leading-relaxed text-text-muted">
                Construimos el sitio y además lo conectamos a tus herramientas desde el día uno. La combinación más potente.
              </p>
              <ul className="space-y-2">
                {["Todo lo del desarrollo", "Automatizaciones nativas", "Un solo equipo", "Menos fricción, más resultado"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                    <CheckCircle2 className="size-3.5 text-electric-volt/60 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tipos de proyectos ── */}
      <section id="proyectos" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              Qué construimos
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Cuatro tipos de proyectos web
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-muted">
              Los podemos entregar solos o con automatizaciones integradas, según lo que necesites.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projectTypes.map((project, i) => (
              <motion.div
                key={project.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/14 hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Tag + icon */}
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: project.accent + "15",
                      color: project.accent,
                      border: `1px solid ${project.accent}25`,
                    }}
                  >
                    <project.icon className="size-3" />
                    {project.tag}
                  </span>
                  <div
                    className="size-2 rounded-full"
                    style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
                  />
                </div>

                {/* Browser mockup */}
                <div className="mb-5">
                  <BrowserMockup type={project.mockup} accent={project.accent} />
                </div>

                {/* Text */}
                <h3 className="mb-2 text-lg font-semibold leading-snug">{project.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-text-muted">{project.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/40">
                      <span
                        className="size-1.5 rounded-full shrink-0"
                        style={{ background: project.accent + "80" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="border-y border-white/5 py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              Stack tecnológico
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Herramientas de producción, no de prototipo
            </h2>
          </motion.div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {stack.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.03] py-5 px-2 hover:border-white/14 hover:bg-white/[0.06] transition-all duration-200"
              >
                <item.Icon
                  size={24}
                  className="text-white/40 group-hover:text-white/80 transition-colors duration-200"
                />
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-white/50 group-hover:text-white/80 transition-colors duration-200">
                    {item.name}
                  </p>
                  <p className="text-[9px] text-white/25 mt-0.5">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proceso ── */}
      <section id="proceso" className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              Cómo trabajamos
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              De brief a producción en semanas
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              {process.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col"
                >
                  {/* Number bubble */}
                  <div className={`mb-5 flex size-16 items-center justify-center rounded-2xl border font-mono text-sm font-bold ${
                    i === 4
                      ? "border-electric-volt/30 bg-electric-volt/10 text-electric-volt"
                      : "border-white/10 bg-white/[0.03] text-white/50"
                  }`}>
                    {step.number}
                  </div>

                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-white/40">{step.description}</p>
                  <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    i === 4
                      ? "bg-electric-volt/10 text-electric-volt"
                      : "bg-white/5 text-white/30"
                  }`}>
                    {step.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services reminder ── */}
      <section className="border-y border-white/5 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              Todo en uno
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              El mismo equipo que construye, automatiza
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Code2,
                title: "Desarrollo web",
                desc: "Next.js, TypeScript, diseño a medida y performance real.",
              },
              {
                icon: Workflow,
                title: "Automatización",
                desc: "n8n conectando tu web con CRMs, emails y bases de datos.",
              },
              {
                icon: MessageSquare,
                title: "Chatbots",
                desc: "Agentes de IA integrados directamente en tu sitio.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-6"
              >
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <item.icon className="size-4 text-white/50" />
                </div>
                <h3 className="mb-2 text-sm font-semibold">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/40">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl border border-electric-volt/20 bg-electric-volt/10">
            <Zap className="size-7 text-electric-volt" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="mb-10 text-text-muted">
            Contanos qué necesitás. Te respondemos en menos de 24 horas con un plan concreto.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="w-full bg-electric-volt px-8 font-semibold text-black shadow-[0_0_24px_rgba(198,255,0,0.3)] transition-all hover:scale-[1.02] hover:bg-electric-volt/95 hover:shadow-[0_0_32px_rgba(198,255,0,0.4)] sm:w-auto"
              asChild
            >
              <Link href="/contact">
                Empezar proyecto
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-text-muted hover:bg-white/5 hover:text-white sm:w-auto"
              asChild
            >
              <Link href="/">Ver automatizaciones</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link href="/" className="logo-text text-base font-bold text-white/70 hover:text-white transition-colors">
            SAM<span className="text-electric-volt">.</span>AI
          </Link>
          <p className="text-xs text-white/25">© 2025 SAM-AI · Desarrollo Web + Automatización</p>
          <div className="flex gap-6">
            <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">Inicio</Link>
            <Link href="/contact" className="text-xs text-white/30 hover:text-white/60 transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
