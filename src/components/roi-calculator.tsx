"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const HORAS_POR_AÑO = 52;
const COSTO_HORA_PROMEDIO = 25; // USD/EUR aproximado

export function ROICalculator() {
  const [horas, setHoras] = useState(10);
  const perdidaAnual = horas * HORAS_POR_AÑO * COSTO_HORA_PROMEDIO;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl md:p-10"
    >
      <h3 className="mb-2 text-2xl font-semibold text-white md:text-3xl">
        Calcula tu potencial de ahorro
      </h3>
      <p className="mb-8 text-text-muted">
        Horas de trabajo manual que podrías automatizar cada semana.
      </p>
      <div className="space-y-6">
        <div>
          <div className="mb-3 flex justify-between">
            <Label className="text-text-muted">Horas manuales por semana</Label>
            <span className="font-mono text-electric-volt">{horas}h</span>
          </div>
          <Slider
            value={[horas]}
            onValueChange={([v]) => setHoras(v)}
            min={1}
            max={80}
            step={1}
            className="[&_[data-slot=slider-range]]:bg-electric-volt"
          />
        </div>
        <div className="rounded-xl border border-electric-volt/20 bg-electric-volt/5 p-6">
          <p className="mb-1 text-sm text-text-muted">
            ¿Cuánto dinero pierdes al año?
          </p>
          <p className="font-mono text-3xl font-bold text-electric-volt md:text-4xl">
            ${(perdidaAnual / 1000).toFixed(0)}k
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Estimado en coste de oportunidad (≈${COSTO_HORA_PROMEDIO}/h)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
