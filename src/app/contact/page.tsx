import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  fetchWeltradeMetrics,
  formatPct,
} from "@/lib/weltrade";
import {
  ContactLanding,
  type ContactMetricsDisplay,
} from "@/components/landing/contact/ContactLanding";

export const revalidate = 60;

const FALLBACK: ContactMetricsDisplay = {
  winRate: "76,5 %",
  avgMonthly: "+7,2 %",
  maxDd: "-4,5 %",
  monthNow: "+0,2 %",
  live: false,
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Copy Trading Forex Automatique | Contact Prioritaire",
    description:
      "Copy trading automatique avec stratégie en compte réel. Performance en direct, gestion du risque rigoureuse. Demandez un contact prioritaire sous 24h. Places limitées.",
    path: "/contact",
  }),
  openGraph: {
    title:
      "Copy Trading Forex Automatique | Contact Prioritaire | Smart Forex Pro",
    description:
      "Copy trading automatique avec stratégie en compte réel. Performance en direct, gestion du risque rigoureuse. Contact prioritaire sous 24h.",
    url: "https://smartforexpro.com/contact",
    siteName: "Smart Forex Pro",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function formatWinRate(value: number) {
  return `${value.toLocaleString("fr-FR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })} %`;
}

export default async function ContactPage() {
  let metrics: ContactMetricsDisplay = FALLBACK;

  try {
    const m = await fetchWeltradeMetrics();
    metrics = {
      winRate: formatWinRate(m.winRatePct),
      avgMonthly: formatPct(m.avgMonthlyReturnPct, 1, "fr-FR"),
      maxDd: formatPct(-Math.abs(m.maxDrawdownPct), 1, "fr-FR"),
      monthNow: formatPct(m.returnMonthPct, 1, "fr-FR"),
      live: true,
    };
  } catch {
    metrics = FALLBACK;
  }

  return <ContactLanding metrics={metrics} />;
}
