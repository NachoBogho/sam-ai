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
    default: "AI Automation, Web Development & Custom Software | SAM-AI",
    template: "%s | SAM-AI",
  },
  description:
    "SAM-AI helps small and medium businesses automate operations, launch on the web, and build custom software. AI agents, n8n flows, and tailored development. Free audit.",
  keywords: [
    "AI automation",
    "business automation",
    "n8n automation",
    "custom software development",
    "web development agency",
    "chatbot for business",
    "app integrations",
    "SMB software",
    "SAM-AI",
    "AI agents",
    "internal tools",
    "desktop application development",
  ],
  authors: [{ name: "SAM-AI" }],
  creator: "SAM-AI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Automation, Web Development & Custom Software | SAM-AI",
    description:
      "Chatbots 24/7, n8n automations, web development and custom software for SMBs. Free audit — no commitment.",
    url: "https://samdev-ai.com",
    siteName: "SAM-AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAM-AI — AI Automation, Web Development & Custom Software",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation, Web Development & Custom Software | SAM-AI",
    description:
      "Chatbots 24/7, n8n automations and custom software for SMBs. Free audit.",
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
    "SAM-AI helps small and medium businesses automate operations, launch on the web, and build custom software — AI agents, n8n flows, and tailored development.",
  url: "https://samdev-ai.com",
  logo: "https://samdev-ai.com/logo.png",
  serviceType: [
    "AI Process Automation",
    "Chatbot Development",
    "App Integrations",
    "n8n Automation",
    "Web Development",
    "Custom Software Development",
  ],
  areaServed: "Worldwide",
  offers: [
    {
      "@type": "Offer",
      name: "AI Automation",
      description:
        "n8n flows and AI agents that eliminate manual work and connect your tools 24/7",
    },
    {
      "@type": "Offer",
      name: "Web Development",
      description:
        "Landing pages, e-commerce and portals built with Next.js with native automation",
    },
    {
      "@type": "Offer",
      name: "Custom Software",
      description:
        "Desktop apps, internal tools, and data systems built exactly to your spec",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://samdev-ai.com/contact",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
