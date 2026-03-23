import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import { ParticlesBackground } from "@/components/particles-background";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samdev-ai.com"),
  title: {
    default: "Automatización con IA para Empresas | SAM-AI",
    template: "%s | SAM-AI",
  },
  description:
    "Automatizamos procesos de tu empresa con IA: chatbots 24/7, integraciones entre apps y flujos n8n. Ahorrá horas de trabajo manual. Consulta gratuita.",
  keywords: [
    "automatización con IA",
    "chatbot para empresas",
    "n8n automatización",
    "agencia automatización IA",
    "integración de aplicaciones",
    "automatización de procesos",
    "SAM-AI",
    "agentes de IA",
    "automatización LATAM",
    "chatbot inteligente",
  ],
  authors: [{ name: "SAM-AI" }],
  creator: "SAM-AI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Automatización con IA para Empresas | SAM-AI",
    description:
      "Chatbots 24/7, automatizaciones n8n e integración de apps. Liberá a tu equipo del trabajo manual. Consulta gratuita.",
    url: "https://samdev-ai.com",
    siteName: "SAM-AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAM-AI — Automatización con IA para Empresas",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatización con IA para Empresas | SAM-AI",
    description:
      "Chatbots 24/7, automatizaciones n8n e integración de apps. Consulta gratuita.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SAM-AI",
  description:
    "Automatizamos procesos empresariales con IA: chatbots 24/7, flujos n8n e integraciones entre aplicaciones.",
  url: "https://samdev-ai.com",
  logo: "https://samdev-ai.com/logo.png",
  serviceType: [
    "Automatización de Procesos con IA",
    "Desarrollo de Chatbots",
    "Integración de Aplicaciones",
    "Automatización n8n",
    "Desarrollo Web",
  ],
  areaServed: "América Latina",
  offers: [
    {
      "@type": "Offer",
      name: "Chatbots Inteligentes",
      description:
        "Atención 24/7 entrenada con tu base de conocimiento, integrada en web, WhatsApp o email",
    },
    {
      "@type": "Offer",
      name: "Automatización de Procesos",
      description:
        "Flujos n8n que eliminan el trabajo manual y conectan tus herramientas",
    },
    {
      "@type": "Offer",
      name: "Conectividad entre Apps",
      description:
        "CRM, facturación, email y bases de datos integrados en un solo flujo",
    },
    {
      "@type": "Offer",
      name: "Desarrollo Web",
      description:
        "Landings, e-commerce y portales construidos con Next.js y automatización nativa",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://samdev-ai.com/contact",
    availableLanguage: ["Spanish", "English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} font-sans antialiased bg-surface min-h-screen`}
      >
        <ParticlesBackground />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
