"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 0 },
  background: { color: "transparent" },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 120,
        duration: 0.3,
        factor: 0.5,
        speed: 0.5,
      },
    },
  },
  particles: {
    color: {
      value: ["#C6FF00", "#9ca3af"],
    },
    links: {
      color: "#C6FF00",
      distance: 140,
      enable: true,
      opacity: 0.18,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      outModes: { default: "bounce" },
    },
    number: {
      density: {
        enable: true,
        width: 1200,
        height: 800,
      },
      value: 70,
    },
    opacity: {
      value: { min: 0.12, max: 0.35 },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 0.8, max: 2.2 },
    },
  },
  detectRetina: true,
};

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="sam-particles"
      className="absolute inset-0 -z-10"
      options={options}
      particlesLoaded={async () => {}}
    />
  );
}
