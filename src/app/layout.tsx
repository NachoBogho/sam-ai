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
  title: "SAM-AI",
  description:
    "Implementamos agentes de IA y automatizaciones con n8n para liberar a las empresas del trabajo manual.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} font-sans antialiased bg-surface min-h-screen`}
      >
        <ParticlesBackground />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
