import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation for Business",
  description:
    "We implement AI agents and n8n automation flows that respond, connect and execute for your team — 24/7. Free audit included.",
  alternates: {
    canonical: "/automation",
  },
  openGraph: {
    title: "AI Automation for Business | SAM-AI",
    description:
      "Chatbots 24/7, n8n automations and app integrations. Free your team from repetitive work.",
    url: "https://samdev-ai.com/automation",
  },
};

export default function AutomationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
