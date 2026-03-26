import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendar Demo — 30 minutos, sin compromiso",
  description:
    "Agendá una sesión gratuita de 30 minutos con el equipo de SAM-AI. Analizamos tus procesos y te mostramos cómo automatizarlos con IA.",
  alternates: {
    canonical: "/agendar-demo",
  },
  openGraph: {
    title: "Agendar Demo | SAM-AI",
    description:
      "30 minutos, sin compromiso. Te mostramos en vivo cómo automatizar tus procesos con IA.",
    url: "https://samdev-ai.com/agendar-demo",
  },
};

export default function AgendarDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
