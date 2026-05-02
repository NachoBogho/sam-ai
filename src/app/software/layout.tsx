import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development — Desktop, Web & Internal Tools",
  description:
    "We build custom software that fits your exact workflow. Desktop applications, internal tools, data management systems, and dashboards — tailored to your business.",
  alternates: {
    canonical: "/software",
  },
  openGraph: {
    title: "Custom Software Development | SAM-AI",
    description:
      "Desktop apps, internal tools, ERP-lite, and dashboards built exactly to your spec. No templates, no compromise.",
    url: "https://samdev-ai.com/software",
  },
};

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
