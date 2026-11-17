import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  fetchWeltradeMetrics,
  formatPct,
} from "@/lib/weltrade";
import {
  ContatoLanding,
  type ContatoMetricsDisplay,
} from "@/components/landing/contato/ContatoLanding";

export const revalidate = 60;

const FALLBACK: ContatoMetricsDisplay = {
  winRate: "76,5 %",
  avgMonthly: "+7,2 %",
  maxDd: "-4,5 %",
  monthNow: "+0,2 %",
  live: false,
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Copy Trading Forex Automático | Contato Prioritário",
    description:
      "Copy trading automático com estratégia em conta real. Performance ao vivo, gestão de risco rigorosa. Solicite contato prioritário em até 24h. Vagas limitadas.",
    path: "/contato",
  }),
  openGraph: {
    title: "Copy Trading Forex Automático | Contato Prioritário | Smart Forex Pro",
    description:
      "Copy trading automático com estratégia em conta real. Performance ao vivo, gestão de risco rigorosa. Contato prioritário em 24h.",
    url: "https://smartforexpro.com/contato",
    siteName: "Smart Forex Pro",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function formatWinRate(value: number) {
  return `${value.toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })} %`;
}

export default async function ContatoPage() {
  let metrics: ContatoMetricsDisplay = FALLBACK;

  try {
    const m = await fetchWeltradeMetrics();
    metrics = {
      winRate: formatWinRate(m.winRatePct),
      avgMonthly: formatPct(m.avgMonthlyReturnPct, 1, "pt-BR"),
      maxDd: formatPct(-Math.abs(m.maxDrawdownPct), 1, "pt-BR"),
      monthNow: formatPct(m.returnMonthPct, 1, "pt-BR"),
      live: true,
    };
  } catch {
    metrics = FALLBACK;
  }

  return <ContatoLanding metrics={metrics} />;
}
