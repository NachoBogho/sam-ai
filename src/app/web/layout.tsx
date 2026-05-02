import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development — Landing Pages, E-commerce & Portals",
  description:
    "We build your website with Next.js and connect it to your systems. Landing pages, e-commerce, portals and corporate sites with native automation from day one.",
  alternates: {
    canonical: "/web",
  },
  openGraph: {
    title: "Web Development | SAM-AI",
    description:
      "We build your web and connect it to your systems. Landing pages, e-commerce, portals and corporate sites.",
    url: "https://samdev-ai.com/web",
  },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
