"use client";

import Link from "next/link";
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
  BarChart3,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { value: "40+", label: "Automations delivered" },
  { value: "2–4 wks", label: "From audit to first live flow" },
  { value: "24/7", label: "Availability of your processes" },
];

const benefits = [
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

const services = [
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

const processSteps = [
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

const faqs = [
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

// ─── Component ──────────────────────────────────────────────────────────────

export default function AutomationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen text-white">
      <SiteHeader activePage="automation" />

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
            <span>AI Agents</span>
            <span className="text-white/30">·</span>
            <span>n8n</span>
            <span className="text-white/30">·</span>
            <span>Automation</span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The AI that gives you
            <br />
            <span className="bg-gradient-to-r from-electric-volt to-electric-volt/70 bg-clip-text text-transparent">
              your time back
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            Your company stops wasting hours on repetitive work. We implement AI agents and automated
            flows that respond, connect, and execute for your team.
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
              <Link href="/web">See web services</Link>
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
            href="#solution"
            className="flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-white"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Discover more</span>
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
                <p className="mt-2 text-sm font-medium text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Marquee ── */}
      <ToolsMarquee lang="en" />

      {/* ── Problem → Solution ── */}
      <section id="solution" className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              The problem we solve
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              From wasted hours to results
              <br />
              <span className="text-electric-volt">without touching code</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              We don&apos;t explain how it works inside. We show you what you gain: less friction,
              fewer errors, and more time to grow.
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
                Without automation
              </p>
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                Time and money lost in repetitive tasks
              </h3>
              <p className="mt-4 leading-relaxed text-text-muted">
                Teams stuck copying data between systems, answering the same questions, or manually
                checking what a machine could handle in seconds.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-electric-volt/25 bg-electric-volt/5 p-8 shadow-[0_0_40px_rgba(198,255,0,0.06)] md:p-10"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-electric-volt">
                With SAM-AI
              </p>
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                A system that works for your team
              </h3>
              <p className="mt-4 leading-relaxed text-text-muted">
                Agents that answer, flows that connect your tools, and processes that run on their
                own — without anyone having to babysit them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="border-t border-white/5 bg-white/[0.02] px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              Why SAM-AI
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Results you notice from day one
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              No hype. We deliver flows that work and metrics that actually improve.
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

      {/* ── Services ── */}
      <section id="services" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Solutions that scale with your business
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              From customer support to back-office: everything in one ecosystem.
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
        <N8nFlowDemo lang="en" />
      </section>

      {/* ── Video Demo ── */}
      <section className="border-t border-white/5 px-6 py-28">
        <VideoDemo lang="en" />
      </section>

      {/* ── Process ── */}
      <section id="process" className="border-t border-white/5 bg-white/[0.02] px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
              How we work
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              From zero to production in 4 steps
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              A predictable process with no surprises. You always know what&apos;s happening and when.
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
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Portal ── */}
      <section className="border-t border-white/5 bg-white/[0.02] px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-electric-volt">
              Client portal
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Your business in real time, always visible
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-muted">
              Every client gets their own panel where they can see active automations, monthly
              metrics, and chatbots in real time. No asking, no waiting for reports.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              {[
                {
                  icon: BarChart3,
                  title: "Automatic metrics",
                  desc: "Messages, leads, executions and hours saved update automatically on every event via n8n webhooks.",
                },
                {
                  icon: Zap,
                  title: "Automation status",
                  desc: "Clients see in real time if their flows are active, paused, or erroring. Execution count, average time, last run.",
                },
                {
                  icon: MessageSquare,
                  title: "Connected chatbots",
                  desc: "Conversations, resolution rate, and captured leads per channel. All in one place.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-electric-volt/20 bg-electric-volt/5">
                    <item.icon className="h-5 w-5 text-electric-volt" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link href="/portal">
                  <Button
                    variant="ghost"
                    className="border border-white/15 px-5 py-2 text-sm font-medium text-white hover:border-electric-volt/40 hover:text-electric-volt"
                  >
                    See a portal demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex justify-center lg:justify-end"
            >
              <div
                className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(198,255,0,0.07)]"
                style={{ transform: "perspective(1000px) rotateX(2deg) rotateY(-4deg)" }}
              >
                <div className="flex items-center justify-between bg-white/[0.04] px-4 py-2.5 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="ml-3 text-xs font-semibold text-white/70">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Sample Company</span>
                    <span className="rounded-full border border-electric-volt/30 bg-electric-volt/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-electric-volt">
                      Starter
                    </span>
                  </div>
                </div>
                <div className="bg-[#0a0f1a] p-4">
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    {[
                      { label: "Active automations", value: "3" },
                      { label: "Messages this month", value: "1,247" },
                      { label: "Captured leads", value: "89" },
                      { label: "Hours saved", value: "47h" },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-white/8 bg-white/[0.03] p-3"
                        style={{ borderTop: "2px solid #C6FF00" }}
                      >
                        <p className="mb-1 text-[10px] leading-tight text-white/40">{metric.label}</p>
                        <p className="text-xl font-bold tracking-tight text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                      Recent activity
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { label: "WhatsApp lead scoring", time: "2 min ago", status: "active", dot: "bg-green-400" },
                        { label: "Sync CRM → Sheets", time: "18 min ago", status: "active", dot: "bg-green-400" },
                        { label: "Weekly email report", time: "3h ago", status: "paused", dot: "bg-yellow-400" },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`h-2 w-2 shrink-0 rounded-full ${row.dot}`} />
                            <span className="truncate text-xs text-white/70">{row.label}</span>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <span className="text-[10px] text-white/30">{row.time}</span>
                            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                              row.status === "active"
                                ? "border border-electric-volt/30 bg-electric-volt/10 text-electric-volt"
                                : "border border-white/10 bg-white/5 text-white/40"
                            }`}>
                              {row.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              Frequently asked questions
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
                    {openFaq === i ? <Minus className="size-4" /> : <Plus className="size-4" />}
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
                      <p className="px-6 pb-5 leading-relaxed text-text-muted">{faq.a}</p>
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
              Ready to win your time back?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-text-muted">
              A free audit, no strings attached. We show you exactly where to automate and how much
              you can save.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                className="bg-electric-volt px-8 font-semibold text-black shadow-[0_0_24px_rgba(198,255,0,0.3)] hover:bg-electric-volt/95 hover:shadow-[0_0_32px_rgba(198,255,0,0.4)]"
                asChild
              >
                <Link href="/contact">
                  Request free audit
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
          <Link href="/" className="logo-text text-xl font-bold text-white">
            SAM-<span className="text-electric-volt">AI</span>
          </Link>
          <p className="max-w-md text-sm text-text-muted">
            Solution Agent Manager — AI and automation with n8n for companies that want to win their
            time back.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: "#solution", label: "Solution" },
              { href: "#services", label: "Services" },
              { href: "#process", label: "Process" },
              { href: "#faq", label: "FAQ" },
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
