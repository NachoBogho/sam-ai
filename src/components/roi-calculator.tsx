"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

type Lang = "es" | "en";

const WEEKS_PER_YEAR = 52;
const ANNUAL_WORK_HOURS = 2080; // 40h × 52 weeks

interface CurrencyConfig {
  code: string;
  symbol: string;
  defaultRate: number;
  presets: number[];
  rateMin: number;
  rateMax: number;
  rateStep: number;
}

const CURRENCIES: CurrencyConfig[] = [
  {
    code: "USD",
    symbol: "$",
    defaultRate: 25,
    presets: [15, 25, 40, 65],
    rateMin: 5,
    rateMax: 500,
    rateStep: 1,
  },
  {
    code: "EUR",
    symbol: "€",
    defaultRate: 20,
    presets: [12, 20, 35, 55],
    rateMin: 5,
    rateMax: 400,
    rateStep: 1,
  },
  {
    code: "ARS",
    symbol: "$",
    defaultRate: 1500,
    presets: [800, 1500, 3000, 5000],
    rateMin: 200,
    rateMax: 20000,
    rateStep: 100,
  },
  {
    code: "CLP",
    symbol: "$",
    defaultRate: 8000,
    presets: [5000, 8000, 15000, 25000],
    rateMin: 1000,
    rateMax: 80000,
    rateStep: 500,
  },
  {
    code: "MXN",
    symbol: "$",
    defaultRate: 200,
    presets: [100, 200, 400, 700],
    rateMin: 50,
    rateMax: 2000,
    rateStep: 10,
  },
];

interface ROICalculatorProps {
  lang?: Lang;
}

function fmtAmount(n: number, symbol: string): string {
  if (n >= 1_000_000) return `${symbol}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${symbol}${Math.round(n / 1000)}k`;
  if (n >= 1_000) return `${symbol}${(n / 1000).toFixed(1)}k`;
  return `${symbol}${Math.round(n)}`;
}

function fmtPreset(n: number): string {
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  if (n >= 1_000) return `${(n / 1000).toFixed(n % 500 === 0 ? 1 : 1)}k`;
  return `${n}`;
}

export function ROICalculator({ lang = "es" }: ROICalculatorProps) {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(25);
  const [rateInput, setRateInput] = useState("25");

  const currency = CURRENCIES.find((c) => c.code === currencyCode)!;

  const handleCurrencyChange = (code: string) => {
    const next = CURRENCIES.find((c) => c.code === code)!;
    setCurrencyCode(code);
    setRate(next.defaultRate);
    setRateInput(String(next.defaultRate));
  };

  const clamp = (val: number, cfg: CurrencyConfig) =>
    Math.min(Math.max(val, cfg.rateMin), cfg.rateMax);

  const handlePreset = (p: number) => {
    setRate(p);
    setRateInput(String(p));
  };

  const handleStep = (dir: 1 | -1) => {
    const next = clamp(rate + dir * currency.rateStep, currency);
    setRate(next);
    setRateInput(String(next));
  };

  const annual = hours * WEEKS_PER_YEAR * rate;
  const monthly = annual / 12;
  const fte = (hours * WEEKS_PER_YEAR) / ANNUAL_WORK_HOURS;
  const fteDisplay = fte < 0.1 ? "< 0.1" : fte.toFixed(2).replace(".", lang === "es" ? "," : ".");

  const labels =
    lang === "es"
      ? {
          title: "Calculá tu potencial de ahorro",
          subtitle:
            "Configurá tu moneda, valor hora y horas manuales para ver cuánto cuesta realmente el trabajo repetitivo.",
          currency: "Moneda",
          rate: "Valor por hora",
          hours: "Horas manuales por semana",
          annual: "Costo anual estimado",
          monthly: "Por mes",
          fte: "Equivalente FTE",
          fteDesc: `Equivale a dedicar ${fteDisplay} persona${fte >= 1.5 ? "s" : ""} a tiempo completo solo a trabajo manual.`,
          note: `Costo de oportunidad laboral estimado (~${currency.symbol}${rate}/h × ${hours}h/sem × 52 sem)`,
        }
      : {
          title: "Calculate your savings potential",
          subtitle:
            "Set your currency, hourly rate, and manual hours to see what repetitive work is really costing you.",
          currency: "Currency",
          rate: "Hourly rate",
          hours: "Manual hours per week",
          annual: "Estimated annual cost",
          monthly: "Per month",
          fte: "FTE equivalent",
          fteDesc: `Equivalent to ${fteDisplay} full-time person${fte >= 1.5 ? "s" : ""} dedicated exclusively to manual work.`,
          note: `Estimated labor opportunity cost (~${currency.symbol}${rate}/hr × ${hours}h/wk × 52 wks)`,
        };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl md:p-10"
    >
      <h3 className="mb-1.5 text-2xl font-semibold text-white md:text-3xl">
        {labels.title}
      </h3>
      <p className="mb-8 text-sm leading-relaxed text-text-muted">
        {labels.subtitle}
      </p>

      <div className="space-y-7">

        {/* ── Currency ── */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted/60">
            {labels.currency}
          </p>
          <div className="flex flex-wrap gap-2">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                onClick={() => handleCurrencyChange(c.code)}
                className={[
                  "rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-all duration-150",
                  currencyCode === c.code
                    ? "border-electric-volt/50 bg-electric-volt/10 text-electric-volt shadow-[0_0_12px_rgba(198,255,0,0.1)]"
                    : "border-white/10 bg-white/[0.04] text-text-muted hover:border-white/20 hover:text-white",
                ].join(" ")}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>

        {/* ── Hourly rate ── */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted/60">
            {labels.rate}
          </p>

          {/* Presets + stepper on same row */}
          <div className="flex flex-wrap items-center gap-2">
            {currency.presets.map((p) => (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={[
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-150",
                  rate === p
                    ? "border-electric-volt/40 bg-electric-volt/10 text-electric-volt"
                    : "border-white/10 bg-white/[0.04] text-text-muted hover:border-white/20 hover:text-white",
                ].join(" ")}
              >
                {currency.symbol}{fmtPreset(p)}
              </button>
            ))}

            {/* Stepper */}
            <div className="ml-auto flex items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
              <button
                onClick={() => handleStep(-1)}
                disabled={rate <= currency.rateMin}
                aria-label="Decrease rate"
                className="flex h-8 w-8 shrink-0 items-center justify-center text-text-muted transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Minus className="size-3" />
              </button>

              <div className="flex min-w-[3.5rem] items-center justify-center gap-0.5 px-1">
                <span className="text-xs text-text-muted/60">{currency.symbol}</span>
                <input
                  type="number"
                  value={rateInput}
                  onChange={(e) => {
                    setRateInput(e.target.value);
                    const parsed = parseFloat(e.target.value);
                    if (!isNaN(parsed) && parsed > 0) {
                      setRate(clamp(parsed, currency));
                    }
                  }}
                  onBlur={() => {
                    const parsed = parseFloat(rateInput);
                    const safe = isNaN(parsed) || parsed <= 0 ? currency.defaultRate : clamp(parsed, currency);
                    setRate(safe);
                    setRateInput(String(safe));
                  }}
                  className="w-14 bg-transparent text-center font-mono text-sm font-semibold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>

              <button
                onClick={() => handleStep(1)}
                disabled={rate >= currency.rateMax}
                aria-label="Increase rate"
                className="flex h-8 w-8 shrink-0 items-center justify-center text-text-muted transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Hours slider ── */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted/60">
              {labels.hours}
            </p>
            <span className="font-mono text-sm font-semibold text-electric-volt">
              {hours}h
            </span>
          </div>
          <Slider
            value={[hours]}
            onValueChange={([v]) => setHours(v)}
            min={1}
            max={80}
            step={1}
            className="[&_[data-slot=slider-range]]:bg-electric-volt"
          />
          <div className="flex justify-between text-xs text-text-muted/40">
            <span>1h</span>
            <span>80h</span>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
          {/* Annual — hero row */}
          <div className="border-b border-white/[0.06] px-5 py-4">
            <p className="mb-0.5 text-xs font-medium text-text-muted/50">
              {labels.annual}
            </p>
            <p className="font-mono text-4xl font-bold tracking-tight text-electric-volt">
              {fmtAmount(annual, currency.symbol)}
            </p>
          </div>

          {/* Monthly + FTE */}
          <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
            <div className="px-5 py-4">
              <p className="mb-0.5 text-xs font-medium text-text-muted/50">
                {labels.monthly}
              </p>
              <p className="font-mono text-2xl font-semibold text-white">
                {fmtAmount(monthly, currency.symbol)}
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="mb-0.5 text-xs font-medium text-text-muted/50">
                {labels.fte}
              </p>
              <p className="font-mono text-2xl font-semibold text-white">
                {fteDisplay}
                <span className="ml-1.5 text-sm font-normal text-text-muted/50">
                  FTE
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-1">
          <p className="text-xs leading-relaxed text-text-muted/70">
            {labels.fteDesc}
          </p>
          <p className="text-xs text-text-muted/40">{labels.note}</p>
        </div>
      </div>
    </motion.div>
  );
}
