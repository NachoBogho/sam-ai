"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import {
  ArrowRight,
  Monitor,
  Database,
  BarChart3,
  Users,
  CheckCircle2,
  Search,
  FileText,
  Wrench,
  Headphones,
  Globe,
  Zap,
  Package,
  Layers,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiElectron,
  SiPython,
  SiNodedotjs,
  SiDocker,
} from "react-icons/si";

// ─── Data ──────────────────────────────────────────────────────────────────

const softwareTypes = [
  {
    icon: Monitor,
    tag: "Desktop Applications",
    title: "Offline-first apps for your team",
    description:
      "Windows and macOS applications for teams that need offline capability, hardware access, or local file processing. Built with Electron or Tauri.",
    features: [
      "Works without internet",
      "Access to local hardware & printers",
      "File system integration",
      "Auto-update system",
    ],
    accent: "#A78BFA",
    mockupRows: [
      { w: "w-1/2", h: "h-5", opacity: "bg-[#A78BFA]/30" },
      { w: "w-full", h: "h-2", opacity: "bg-white/10" },
      { w: "w-4/5", h: "h-2", opacity: "bg-white/8" },
    ],
  },
  {
    icon: Layers,
    tag: "Web Applications",
    title: "Internal tools & portals",
    description:
      "Browser-based tools for internal operations: inventory management, order processing, HR portals, project dashboards. Your team's exact workflow, in software.",
    features: [
      "Role-based access control",
      "Real-time data updates",
      "Works on any device",
      "Connects to your existing systems",
    ],
    accent: "#38BDF8",
    mockupRows: [
      { w: "w-2/3", h: "h-4", opacity: "bg-[#38BDF8]/30" },
      { w: "w-full", h: "h-2", opacity: "bg-white/10" },
      { w: "w-3/4", h: "h-2", opacity: "bg-white/8" },
    ],
  },
  {
    icon: Database,
    tag: "Data Management",
    title: "Systems that track what matters to you",
    description:
      "Custom databases, reporting tools, and ERP-lite systems built around your data model — not a generic template that forces you to adapt your workflow.",
    features: [
      "Custom data model",
      "Import / export any format",
      "Automated reports & alerts",
      "Audit trail & history",
    ],
    accent: "#34D399",
    mockupRows: [
      { w: "w-3/5", h: "h-4", opacity: "bg-[#34D399]/30" },
      { w: "w-full", h: "h-2", opacity: "bg-white/10" },
      { w: "w-4/5", h: "h-2", opacity: "bg-white/8" },
    ],
  },
  {
    icon: BarChart3,
    tag: "Dashboards & Reporting",
    title: "Real-time visibility into your business",
    description:
      "Operational dashboards that pull data from multiple sources and present exactly the metrics your team needs — no more spreadsheet exports.",
    features: [
      "Live data from any source",
      "Custom KPIs & charts",
      "Scheduled email reports",
      "Embeddable in existing portals",
    ],
    accent: "#F59E0B",
    mockupRows: [
      { w: "w-1/2", h: "h-4", opacity: "bg-[#F59E0B]/30" },
      { w: "w-full", h: "h-2", opacity: "bg-white/10" },
      { w: "w-3/4", h: "h-2", opacity: "bg-white/8" },
    ],
  },
];

const useCases = [
  {
    icon: Package,
    title: "Inventory & warehousing",
    description:
      "Track stock levels, movements, suppliers, and purchase orders in a system built for how your warehouse actually works.",
  },
  {
    icon: Users,
    title: "HR & employee management",
    description:
      "Onboarding, time tracking, leave requests, and performance reviews — without paying enterprise SaaS fees for features you'll never use.",
  },
  {
    icon: Globe,
    title: "Client & project management",
    description:
      "A CRM and project tracker built around your sales process and delivery workflow, not the other way around.",
  },
  {
    icon: Zap,
    title: "Workflow & approval systems",
    description:
      "Multi-step approval flows, task routing, and notification systems that mirror exactly how your team makes decisions.",
  },
];

const stack = [
  { Icon: SiNextdotjs, name: "Next.js", role: "Web apps" },
  { Icon: SiReact, name: "React", role: "UI" },
  { Icon: SiTypescript, name: "TypeScript", role: "Language" },
  { Icon: SiElectron, name: "Electron", role: "Desktop" },
  { Icon: SiPostgresql, name: "PostgreSQL", role: "Database" },
  { Icon: SiNodedotjs, name: "Node.js", role: "Backend" },
  { Icon: SiPython, name: "Python", role: "Scripting" },
  { Icon: SiDocker, name: "Docker", role: "Deploy" },
];

const process = [
  {
    icon: Search,
    number: "01",
    title: "Requirements workshop",
    description:
      "We spend time in your workflow. We document exactly what the software needs to do and how your team will use it daily.",
    tag: "1–3 days",
  },
  {
    icon: FileText,
    number: "02",
    title: "Wireframes & spec",
    description:
      "Every screen wireframed and every interaction documented before we write a line of code. You approve before we build.",
    tag: "3–5 days",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Development & testing",
    description:
      "Built in sprints with working demos at every checkpoint. You test real software throughout the process.",
    tag: "2–8 weeks",
  },
  {
    icon: Headphones,
    number: "04",
    title: "Deploy & training",
    description:
      "Deployed to your infrastructure or ours. Full documentation, training session for your team, and 30 days of support included.",
    tag: "Included",
  },
];

// ─── Mock software window ────────────────────────────────────────────────────

function SoftwareMockup({ type, accent }: { type: (typeof softwareTypes)[0]; accent: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0f1a] overflow-hidden shadow-xl h-40">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/8 bg-white/[0.03]">
        <div className="size-2 rounded-full bg-white/15" />
        <div className="size-2 rounded-full bg-white/15" />
        <div className="size-2 rounded-full bg-white/15" />
        <div className="ml-3 text-[10px] text-white/20 font-mono">
          {type.tag.toLowerCase().replace(/ /g, "-")}.app
        </div>
      </div>
      {/* Content mockup */}
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div
            className="size-6 rounded-lg flex items-center justify-center"
            style={{ background: accent + "20", border: `1px solid ${accent}30` }}
          >
            <type.icon className="size-3.5" style={{ color: accent }} />
          </div>
          <div className={`h-2.5 rounded ${type.mockupRows[0].w} ${type.mockupRows[0].opacity}`} />
        </div>
        <div className={`h-px w-full bg-white/5 my-1`} />
        <div className="grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-white/8 bg-white/[0.03] p-2 flex flex-col gap-1">
              <div className="h-1.5 w-1/2 rounded bg-white/20" />
              <div className="h-3 w-3/4 rounded" style={{ background: accent + "40" }} />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5 mt-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-2 flex-1 rounded bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function SoftwarePage() {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader activePage="software" />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#A78BFA]/4 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/20 bg-[#A78BFA]/5 px-4 py-1.5 text-sm text-[#A78BFA]">
            <Monitor className="size-3.5" />
            <span>Custom Software</span>
            <span className="text-white/30">·</span>
            <span>Desktop & Web</span>
            <span className="text-white/30">·</span>
            <span>Built to spec</span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Software that fits
            <br />
            <span className="bg-gradient-to-r from-[#A78BFA] to-[#A78BFA]/70 bg-clip-text text-transparent">
              your workflow exactly
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            Off-the-shelf software makes you adapt your process to it. We build the other way around
            — desktop apps, internal tools, and data systems shaped precisely around how your
            business actually works.
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
                Start a project
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-text-muted hover:bg-white/5 hover:text-white sm:w-auto"
              asChild
            >
              <Link href="#types">See what we build</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Why custom ── */}
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-red-500/15 bg-red-500/5 p-8 md:p-10"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-red-400/80">
                Off-the-shelf SaaS
              </p>
              <h3 className="text-xl font-semibold text-white">
                You adapt your process to the software
              </h3>
              <ul className="mt-4 space-y-2">
                {[
                  "Paying for features you never use",
                  "Workarounds for your edge cases",
                  "Data locked in someone else's system",
                  "Per-seat pricing that grows with every hire",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="mt-1.5 size-1.5 rounded-full bg-red-400/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#A78BFA]/25 bg-[#A78BFA]/5 p-8 shadow-[0_0_40px_rgba(167,139,250,0.06)] md:p-10"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#A78BFA]">
                Custom software
              </p>
              <h3 className="text-xl font-semibold text-white">
                The software adapts to your process
              </h3>
              <ul className="mt-4 space-y-2">
                {[
                  "Only the features your team actually needs",
                  "Your data model, your rules",
                  "Owned by you, no vendor lock-in",
                  "One-time build, zero per-seat fees",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                    <CheckCircle2 className="mt-0.5 size-3.5 text-[#A78BFA]/70 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What we build ── */}
      <section id="types" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#A78BFA]">
              What we build
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Four types of custom software
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-muted">
              From desktop applications to data systems — we work across the full spectrum.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {softwareTypes.map((type, i) => (
              <motion.div
                key={type.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/14 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: type.accent + "15",
                      color: type.accent,
                      border: `1px solid ${type.accent}25`,
                    }}
                  >
                    <type.icon className="size-3" />
                    {type.tag}
                  </span>
                  <div
                    className="size-2 rounded-full"
                    style={{ background: type.accent, boxShadow: `0 0 8px ${type.accent}` }}
                  />
                </div>

                <div className="mb-5">
                  <SoftwareMockup type={type} accent={type.accent} />
                </div>

                <h3 className="mb-2 text-lg font-semibold leading-snug">{type.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-text-muted">{type.description}</p>

                <ul className="space-y-2">
                  {type.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/40">
                      <span
                        className="size-1.5 rounded-full shrink-0"
                        style={{ background: type.accent + "80" }}
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

      {/* ── Use cases ── */}
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#A78BFA]">
              Common use cases
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What our clients build
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 rounded-2xl border border-white/8 bg-black/30 p-6 backdrop-blur-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/10">
                  <uc.icon className="size-5 text-[#A78BFA]" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">{uc.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{uc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#A78BFA]">
              Tech stack
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Production-grade tools, every time
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
                  <p className="text-[10px] font-semibold text-white/50 group-hover:text-white/80 transition-colors">
                    {item.name}
                  </p>
                  <p className="text-[9px] text-white/25 mt-0.5">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#A78BFA]">
              How we build
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From requirements to running software
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="inline-flex rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 p-2.5">
                    <step.icon className="size-5 text-[#A78BFA]" />
                  </div>
                  <span className="font-mono text-3xl font-bold text-[#A78BFA]/20">{step.number}</span>
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
                <span className="mt-4 inline-flex rounded-full bg-[#A78BFA]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#A78BFA]">
                  {step.tag}
                </span>
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
          className="mx-auto max-w-4xl text-center"
        >
          <div className="rounded-3xl border border-[#A78BFA]/20 bg-[#A78BFA]/5 px-8 py-16 md:py-20">
            <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl border border-[#A78BFA]/20 bg-[#A78BFA]/10">
              <Monitor className="size-7 text-[#A78BFA]" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Have a software idea?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-text-muted">
              Tell us about the problem you&apos;re trying to solve. We&apos;ll scope it honestly and
              show you what&apos;s possible.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-electric-volt px-8 font-semibold text-black shadow-[0_0_24px_rgba(198,255,0,0.3)] hover:bg-electric-volt/95 hover:shadow-[0_0_32px_rgba(198,255,0,0.4)]"
                asChild
              >
                <Link href="/contact">
                  Start the conversation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-text-muted hover:bg-white/5 hover:text-white"
                asChild
              >
                <Link href="/agendar-demo">Book a demo first</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 bg-white/[0.02] px-6 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <Link href="/" className="logo-text text-xl font-bold text-white">
            SAM-<span className="text-electric-volt">AI</span>
          </Link>
          <p className="max-w-md text-sm text-text-muted">
            Custom software, AI automation, and web development for SMBs ready to grow.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/automation", label: "AI Automation" },
              { href: "/web", label: "Web Dev" },
              { href: "/contact", label: "Contact" },
              { href: "/agendar-demo", label: "Book demo" },
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
            © {new Date().getFullYear()} SAM-AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
