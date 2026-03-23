import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — Hablemos de tu proyecto",
  description:
    "Escribinos y te respondemos en menos de 24 horas. Sin compromiso. Automatización con IA, chatbots, desarrollo web e integraciones n8n.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contacto | SAM-AI",
    description:
      "Escribinos y te respondemos en menos de 24 horas. Sin compromiso.",
    url: "https://samdev-ai.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
