"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Globe,
  Monitor,
  CheckCircle2,
  ChevronRight,
  Clock,
  Shield,
  TrendingUp,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

// ─── Data ───────────────────────────────────────────────────────────────────

const services = [
  {
    id: "automation",
    href: "/automation",
    tag: "AI & Automation",
    icon: Zap,
    headline: "Replace repetitive work with intelligent flows",
    description:
      "AI agents and n8n workflows that respond, connect, and execute around the clock — so your team focuses on what actually creates value.",
    features: ["Smart chatbots 24/7", "Process automation with n8n", "CRM & app integrations"],
    accent: "#C6FF00",
    accentBg: "rgba(198,255,0,0.04)",
    accentBorder: "rgba(198,255,0,0.18)",
  },
  {
    id: "web",
    href: "/web",
    tag: "Web Development",
    icon: Globe,
    headline: "Build the web presence your business deserves",
    description:
      "Landing pages, e-commerce, portals, and corporate sites built with Next.js — fast, SEO-ready, and connected to your tools from day one.",
    features: ["Landing pages & online stores", "Client portals & dashboards", "Automation-native from day one"],
    accent: "#38BDF8",
    accentBg: "rgba(56,189,248,0.04)",
    accentBorder: "rgba(56,189,248,0.18)",
  },
  {
    id: "software",
    href: "/software",
    tag: "Custom Software",
    icon: Monitor,
    headline: "Software that fits your workflow exactly",
    description:
      "Desktop apps, internal tools, data management systems, and dashboards — built to your exact spec, not shaped around someone else's template.",
    features: ["Desktop & web applications", "Internal tools & ERP-lite", "Data systems & reporting"],
    accent: "#A78BFA",
    accentBg: "rgba(167,139,250,0.04)",
    accentBorder: "rgba(167,139,250,0.18)",
  },
];

const stats = [
  { value: "40+", label: "Projects delivered" },
  { value: "2–4 wks", label: "From brief to first delivery" },
  { value: "24/7", label: "Systems uptime" },
];

const reasons = [
  {
    icon: Shield,
    title: "One team, full stack",
    description:
      "No handoffs between agencies. We build the web, automate the workflows, and write the custom software — all together, all aligned.",
  },
  {
    icon: TrendingUp,
    title: "Built for SMBs",
    description:
      "Sized and priced for companies of 5–100 people who need real tools, not enterprise bloat or freelancer chaos.",
  },
  {
    icon: Clock,
    title: "Fast, iterative delivery",
    description:
      "First deliverables in weeks, not months. We ship, you validate, we iterate. No black-box development.",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader activePage="home" />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-electric-volt/4 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-volt/20 bg-electric-volt/5 px-4 py-1.5 text-sm text-electric-volt">
            <span>AI Automation</span>
            <span className="text-white/30">·</span>
            <span>Web Development</span>
            <span className="text-white/30">·</span>
            <span>Custom Software</span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Your tech partner
            <br />
            <span className="bg-gradient-to-r from-electric-volt to-electric-volt/70 bg-clip-text text-transparent">
              for what&apos;s next
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            We help small and medium businesses automate operations, launch on the web, and build
            software that fits how they actually work — not how a template assumes they do.
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
                Start free audit
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-text-muted hover:bg-white/5 hover:text-white sm:w-auto"
              asChild
            >
              <Link href="/agendar-demo">Book a demo</Link>
            </Button>
          </motion.div>
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
                <p className="mt-2 text-sm font-medium text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              What we do
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Three services, one team
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              Use one, two, or all three — they&apos;re designed to work independently or as a
              unified stack.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                  style={{
                    borderColor: service.accentBorder,
                    background: service.accentBg,
                  }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className="inline-flex size-12 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: service.accentBorder,
                        background: service.accent + "18",
                      }}
                    >
                      <service.icon className="size-6" style={{ color: service.accent }} />
                    </div>
                    <ChevronRight className="size-5 text-white/20 transition-colors group-hover:text-white/50" />
                  </div>
                  <p
                    className="mb-2 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: service.accent }}
                  >
                    {service.tag}
                  </p>
                  <h3 className="mb-3 text-xl font-bold leading-snug">{service.headline}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                        <CheckCircle2
                          className="size-3.5 shrink-0"
                          style={{ color: service.accent + "CC" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="mt-6 flex items-center gap-2 text-sm font-semibold transition-colors group-hover:opacity-100"
                    style={{ color: service.accent, opacity: 0.7 }}
                  >
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SAM-AI ── */}
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              Why SAM-AI
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for companies that are ready to grow
            </h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/8 bg-black/30 p-8 backdrop-blur-sm"
              >
                <div className="mb-5 inline-flex rounded-xl border border-electric-volt/20 bg-electric-volt/10 p-3">
                  <r.icon className="size-5 text-electric-volt" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{r.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{r.description}</p>
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
          <div className="rounded-3xl border border-electric-volt/20 bg-electric-volt/5 px-8 py-16 md:py-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Not sure where to start?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-text-muted">
              A free, no-commitment audit. We map what you have, identify the biggest opportunities,
              and show you exactly what to build first.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-electric-volt px-8 font-semibold text-black shadow-[0_0_24px_rgba(198,255,0,0.3)] hover:bg-electric-volt/95 hover:shadow-[0_0_32px_rgba(198,255,0,0.4)]"
                asChild
              >
                <Link href="/contact">
                  Start free audit
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
            Solution Agent Manager — AI automation, web development, and custom software for SMBs
            ready to scale.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: "/automation", label: "AI Automation" },
              { href: "/web", label: "Web Development" },
              { href: "/software", label: "Custom Software" },
              { href: "/contact", label: "Contact" },
              { href: "/agendar-demo", label: "Book demo" },
              { href: "/portal", label: "Client portal" },
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
