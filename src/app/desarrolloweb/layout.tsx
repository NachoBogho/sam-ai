import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desarrollo Web con IA y Automatización",
  description:
    "Construimos tu web con Next.js y la conectamos a tus sistemas. Landings, e-commerce, portales y sitios corporativos con automatización nativa desde el día uno.",
  alternates: {
    canonical: "/desarrolloweb",
  },
  openGraph: {
    title: "Desarrollo Web con IA y Automatización | SAM-AI",
    description:
      "Construimos tu web y la conectamos a tus sistemas. Landings, e-commerce, portales y sitios corporativos.",
    url: "https://samdev-ai.com/desarrolloweb",
  },
};

export default function DesarrolloWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
