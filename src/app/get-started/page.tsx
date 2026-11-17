import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { fetchWeltradeMetrics, formatPct } from "@/lib/weltrade";
import {
  GetStartedLanding,
  type GetStartedMetricsDisplay,
} from "@/components/landing/en/GetStartedLanding";

export const revalidate = 60;

const FALLBACK: GetStartedMetricsDisplay = {
  winRate: "76.5 %",
  avgMonthly: "+7.2 %",
  maxDd: "-4.5 %",
  monthNow: "+0.2 %",
  live: false,
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Automatic Forex Copy Trading | Get Started",
    description:
      "Automatic copy trading with a live strategy. Public FX Blue stats, strict risk management. Priority contact within 24h. Limited spots.",
    path: "/get-started",
  }),
  openGraph: {
    title:
      "Automatic Forex Copy Trading | Get Started | Smart Forex Pro",
    description:
      "Automatic copy trading with a live strategy. Public FX Blue stats, strict risk management. Priority contact within 24h.",
    url: "https://smartforexpro.com/get-started",
    siteName: "Smart Forex Pro",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function formatWinRate(value: number) {
  return `${value.toLocaleString("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })} %`;
}

export default async function GetStartedPage() {
  let metrics: GetStartedMetricsDisplay = FALLBACK;

  try {
    const m = await fetchWeltradeMetrics();
    metrics = {
      winRate: formatWinRate(m.winRatePct),
      avgMonthly: formatPct(m.avgMonthlyReturnPct, 1, "en-US"),
      maxDd: formatPct(-Math.abs(m.maxDrawdownPct), 1, "en-US"),
      monthNow: formatPct(m.returnMonthPct, 1, "en-US"),
      live: true,
    };
  } catch {
    metrics = FALLBACK;
  }

  return <GetStartedLanding metrics={metrics} />;
}
