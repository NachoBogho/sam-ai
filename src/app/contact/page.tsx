"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Shield,
  Workflow,
  Globe,
  Zap,
  MessageSquare,
  HelpCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ─── Web3Forms config ────────────────────────────────────────────────────────
// 1. Obtené tu access key gratis en https://web3forms.com
// 2. Agregá en .env.local:
//    NEXT_PUBLIC_WEB3FORMS_KEY=tu-access-key

const W3F_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const W3F_CONFIGURED = Boolean(W3F_KEY);

// ─── Servicios ──────────────────────────────────────────────────────────────

const services = [
  {
    id: "automation",
    icon: Workflow,
    label: "Automatización",
    sublabel: "Flujos n8n, integraciones, agentes",
    placeholder:
      "Contanos qué proceso repetitivo querés automatizar. Por ejemplo: carga de datos entre sistemas, respuestas automáticas, reportes, notificaciones...",
  },
  {
    id: "web",
    icon: Globe,
    label: "Desarrollo Web",
    sublabel: "Landing, e-commerce, portal, app",
    placeholder:
      "Describí qué tipo de sitio o app necesitás. Por ejemplo: landing page para captar leads, tienda online, portal para clientes...",
  },
  {
    id: "both",
    icon: Zap,
    label: "Web + Automatización",
    sublabel: "Sitio conectado a tus sistemas",
    placeholder:
      "Contanos sobre tu proyecto: qué web necesitás y qué procesos querés automatizar alrededor de ella...",
  },
  {
    id: "chatbot",
    icon: MessageSquare,
    label: "Chatbot / IA",
    sublabel: "Agente de IA para tu negocio",
    placeholder:
      "Describí cómo imaginás el chatbot: ¿para atención al cliente? ¿respuestas sobre tu producto? ¿integrado en qué canal (web, WhatsApp, etc.)?",
  },
  {
    id: "general",
    icon: HelpCircle,
    label: "Consulta general",
    sublabel: "No estoy seguro, quiero asesoramiento",
    placeholder:
      "Contanos un poco sobre tu empresa y el problema que querés resolver. Te orientamos sin compromiso.",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [selectedService, setSelectedService] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const selectedServiceData = services.find((s) => s.id === selectedService);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setStatus("loading");

    const templateVars = {
      user_name:     form.name,
      user_email:    form.email,
      user_phone:    form.phone,
      user_company:  form.company || "—",
      service_label: selectedServiceData?.label ?? selectedService,
      message:       form.message,
    };

    try {
      const serviceLabel = selectedServiceData?.label ?? selectedService;

      if (W3F_CONFIGURED) {
        const [w3fRes] = await Promise.all([
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: W3F_KEY,
              name:        form.name,
              email:       form.email,
              phone:       form.phone,
              company:     form.company || "—",
              service:     serviceLabel,
              message:     form.message,
              subject:     `Nuevo lead: ${serviceLabel} — ${form.name}`,
              from_name:   "SAM-AI Web",
            }),
          }),
          fetch("/api/send-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: form.name, email: form.email, service: serviceLabel }),
          }),
        ]);

        const w3fData = await w3fRes.json();
        if (!w3fData.success) throw new Error(w3fData.message);
      } else {
        await new Promise((r) => setTimeout(r, 900));
        console.info("Form data (Web3Forms not configured):", { ...form, service: serviceLabel });
      }
      setStatus("success");
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  };

  const isEs = lang === "es";

  return (
    <div className="min-h-screen text-white">
      <SiteHeader
        activePage="contact"
        lang={lang}
        onLangToggle={() => setLang(lang === "es" ? "en" : "es")}
      />

      {/* ── Main ── */}
      <main className="mx-auto min-h-screen max-w-5xl px-6 pb-8 pt-24">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            {isEs ? "Volver al inicio" : "Back to home"}
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 rounded-2xl border border-electric-volt/20 bg-electric-volt/5 p-14 text-center shadow-[0_0_60px_rgba(198,255,0,0.06)] max-w-lg mx-auto mt-16"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-electric-volt/30 bg-electric-volt/10">
                <CheckCircle2 className="size-8 text-electric-volt" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isEs ? "¡Mensaje recibido!" : "Message received!"}
                </h2>
                <p className="mt-3 text-text-muted">
                  {isEs
                    ? "Te enviamos un mail de confirmación. Nos vamos a comunicar con vos en menos de 24 horas hábiles."
                    : "We sent you a confirmation email. We'll reach out within 24 business hours."}
                </p>
              </div>
              <Button
                asChild
                className="mt-2 bg-electric-volt font-semibold text-black hover:bg-electric-volt/90"
              >
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  {isEs ? "Volver al inicio" : "Back to home"}
                </Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16"
            >
              {/* ── Left: context ── */}
              <div className="flex flex-col justify-start pt-2">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-volt">
                  {isEs ? "Contacto" : "Contact"}
                </p>
                <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {isEs ? "Contanos qué necesitás" : "Tell us what you need"}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {isEs
                    ? "Elegí el servicio que más te interesa y nos ponemos en contacto. Sin compromiso."
                    : "Pick the service that interests you most and we'll get in touch. No commitment."}
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    { icon: Clock, text: isEs ? "Respondemos en < 24 h hábiles" : "We reply in < 24 business hours" },
                    { icon: CheckCircle2, text: isEs ? "Recibís un mail de confirmación automático" : "You get an instant confirmation email" },
                    { icon: Shield, text: isEs ? "Sin compromisos ni letra chica" : "No commitment, no fine print" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-electric-volt/20 bg-electric-volt/10">
                        <item.icon className="size-4 text-electric-volt" />
                      </div>
                      <span className="text-sm text-text-muted">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="pointer-events-none mt-8 hidden h-px w-full bg-gradient-to-r from-electric-volt/20 via-electric-volt/5 to-transparent lg:block" />
              </div>

              {/* ── Right: form ── */}
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl md:p-7 space-y-4"
              >
                {/* Step 1: service */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-white">
                    {isEs ? "¿Qué servicio te interesa?" : "Which service interests you?"}
                    <span className="ml-1 text-electric-volt">*</span>
                  </Label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {services.map((svc) => {
                      const active = selectedService === svc.id;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => setSelectedService(svc.id)}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150 ${
                            active
                              ? "border-electric-volt/40 bg-electric-volt/10 text-white"
                              : "border-white/8 bg-white/[0.02] text-text-muted hover:border-white/15 hover:bg-white/[0.04]"
                          }`}
                        >
                          <svc.icon
                            className={`size-4 shrink-0 ${active ? "text-electric-volt" : "text-white/35"}`}
                          />
                          <div className="min-w-0">
                            <p className={`text-sm font-medium leading-none ${active ? "text-white" : ""}`}>
                              {svc.label}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-white/35">{svc.sublabel}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: personal data */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium text-white/50">
                      {isEs ? "Nombre" : "Name"} <span className="text-electric-volt">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={isEs ? "Tu nombre" : "Your name"}
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:ring-electric-volt"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-xs font-medium text-white/50">
                      {isEs ? "Empresa" : "Company"}{" "}
                      <span className="text-white/25 text-[10px]">({isEs ? "opcional" : "optional"})</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={isEs ? "Nombre de la empresa" : "Company name"}
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:ring-electric-volt"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium text-white/50">
                      Email <span className="text-electric-volt">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={isEs ? "tu@empresa.com" : "you@company.com"}
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:ring-electric-volt"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium text-white/50">
                      {isEs ? "Teléfono / WhatsApp" : "Phone / WhatsApp"}{" "}
                      <span className="text-electric-volt">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+54 9 11 ..."
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:ring-electric-volt"
                    />
                  </div>
                </div>

                {/* Step 3: message — placeholder changes with service */}
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-medium text-white/50">
                    {isEs ? "Contanos más" : "Tell us more"} <span className="text-electric-volt">*</span>
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={
                      selectedServiceData?.placeholder ??
                      (isEs
                        ? "Primero elegí un servicio arriba, y después contanos qué necesitás..."
                        : "First pick a service above, then tell us what you need...")
                    }
                    className="flex w-full resize-none rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-volt transition-all"
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertCircle className="size-4 shrink-0" />
                    {isEs
                      ? "Algo salió mal. Intentá de nuevo o escribinos directamente."
                      : "Something went wrong. Try again or reach out directly."}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={!selectedService || status === "loading"}
                  className="w-full bg-electric-volt font-semibold text-black shadow-[0_0_24px_rgba(198,255,0,0.25)] hover:bg-electric-volt/95 hover:shadow-[0_0_32px_rgba(198,255,0,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {isEs ? "Enviando..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      {isEs ? "Enviar consulta" : "Send inquiry"}
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-white/25">
                  {isEs
                    ? "Al enviar, recibís un mail de confirmación automático."
                    : "On submit, you receive an automatic confirmation email."}
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
