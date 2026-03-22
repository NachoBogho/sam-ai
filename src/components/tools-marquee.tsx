"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  SiWhatsapp,
  SiSlack,
  SiNotion,
  SiHubspot,
  SiGooglesheets,
  SiAirtable,
  SiGmail,
  SiStripe,
  SiOpenai,
  SiAnthropic,
  SiCalendly,
  SiSalesforce,
  SiClickup,
  SiTypeform,
  SiMake,
  SiZapier,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Lang = "es" | "en";

interface ToolsMarqueeProps {
  lang: Lang;
}

const tools: { name: string; Icon: IconType; color: string }[] = [
  { name: "WhatsApp",      Icon: SiWhatsapp,      color: "#25D366" },
  { name: "Slack",         Icon: SiSlack,          color: "#E01E5A" },
  { name: "Notion",        Icon: SiNotion,         color: "#e5e7eb" },
  { name: "HubSpot",       Icon: SiHubspot,        color: "#FF7A59" },
  { name: "Google Sheets", Icon: SiGooglesheets,   color: "#34A853" },
  { name: "Airtable",      Icon: SiAirtable,       color: "#18BFFF" },
  { name: "Gmail",         Icon: SiGmail,          color: "#EA4335" },
  { name: "Stripe",        Icon: SiStripe,         color: "#7A73FF" },
  { name: "OpenAI",        Icon: SiOpenai,         color: "#10A37F" },
  { name: "Anthropic",     Icon: SiAnthropic,      color: "#C6FF00" },
  { name: "Calendly",      Icon: SiCalendly,       color: "#006BFF" },
  { name: "Salesforce",    Icon: SiSalesforce,     color: "#00A1E0" },
  { name: "ClickUp",       Icon: SiClickup,        color: "#7B68EE" },
  { name: "Typeform",      Icon: SiTypeform,       color: "#A855F7" },
  { name: "Make",          Icon: SiMake,           color: "#8B5CF6" },
  { name: "Zapier",        Icon: SiZapier,         color: "#FF4A00" },
];

const SCROLL_STEP = 340;

export function ToolsMarquee({ lang }: ToolsMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    trackRef.current?.scrollBy({ left: dir * SCROLL_STEP, behavior: "smooth" });
  };

  return (
    <div className="border-y border-white/5 py-14">
      <p className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-white/20">
        {lang === "es"
          ? "Nos conectamos a las herramientas que ya usás"
          : "We connect to the tools you already use"}
      </p>

      <div className="relative w-[90%] mx-auto">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-[#030712]/90 text-white/40 hover:text-electric-volt hover:border-electric-volt/30 transition-all duration-200 backdrop-blur-sm"
          aria-label={lang === "es" ? "Anterior" : "Previous"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-[#030712] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-[#030712] to-transparent" />

        {/* Scrollable track */}
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto scroll-smooth py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-[#030712]/90 text-white/40 hover:text-electric-volt hover:border-electric-volt/30 transition-all duration-200 backdrop-blur-sm"
          aria-label={lang === "es" ? "Siguiente" : "Next"}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  return (
    <div
      className="group shrink-0 flex flex-col items-center gap-3 w-[96px] py-5 px-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-200 cursor-default select-none"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <tool.Icon
          size={28}
          style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s, filter 0.2s" }}
          className="group-hover:!opacity-100"
          onMouseEnter={(e) => {
            (e.currentTarget as SVGElement).style.color = tool.color;
            (e.currentTarget as SVGElement).style.filter = `drop-shadow(0 0 6px ${tool.color}66)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as SVGElement).style.color = "rgba(255,255,255,0.35)";
            (e.currentTarget as SVGElement).style.filter = "none";
          }}
        />
      </div>
      <span className="text-[10px] font-medium text-white/35 group-hover:text-white/60 text-center leading-tight transition-colors duration-200 w-full">
        {tool.name}
      </span>
    </div>
  );
}
