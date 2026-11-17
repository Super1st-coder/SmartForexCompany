/**
 * Métriques de performance pour le site.
 * Source live : FX Blue (https://www.fxblue.com/users/SmartForexPro)
 * L’offre d’affiliation RoboForex est dans affiliate.ts (non exposée ici).
 */

import { fetchFxBlueMetrics } from "@/lib/fxblue";

export type WeltradeMetrics = {
  fetchedAt: string;
  strategyName: string;
  traderName: string;
  country: string | null;
  currency: string;
  displayCurrency: string;
  /** Multiplier to convert account money → display currency (USC → USD = 0.01) */
  moneyScale: number;
  balance: number;
  equity: number;
  profit: number;
  minDeposit: number;
  leverage: number;
  ageMonths: number;
  ageDays: number;
  firstDealAt: string | null;
  lastUpdateAt: string | null;
  /** Total return (TWR) in % */
  totalReturnPct: number;
  returnWeekPct: number;
  returnMonthPct: number;
  returnDayPct: number;
  avgMonthlyReturnPct: number;
  maxDrawdownPct: number;
  sharpe: number;
  riskLevel: number;
  winRatePct: number;
  lossRatePct: number;
  totalTrades: number;
  openTrades: number;
  profitableDaysPct: number;
  losingDaysPct: number;
  recoveryFactor: number | null;
  volatility: number | null;
  performanceFeePct: number;
  subscriptionFee: number;
  managementFeePct: number;
  symbols: string[];
  monthlyReturns: Array<{
    month: string;
    label: string;
    shortLabel: string;
    returnPct: number;
  }>;
  equityCurve: Array<{
    date: string;
    timestamp: number;
    balance: number;
    equity: number;
    returnPct: number;
    profit: number;
  }>;
  recentTrades: Array<{
    id: number;
    symbol: string;
    type: "Long" | "Short";
    lots: number;
    priceOpen: number;
    priceClose: number;
    profit: number;
    closedAt: string;
    openAt: string;
  }>;
  cumulativePerf: number[];
};

/** Récupère les métriques live depuis FX Blue. */
export async function fetchWeltradeMetrics(): Promise<WeltradeMetrics> {
  return fetchFxBlueMetrics();
}

/** Formateurs partagés */
export function formatPct(value: number, digits = 1, locale = "pt-BR") {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })} %`;
}

export function formatMoney(
  value: number,
  currency = "USD",
  digits = 2,
  locale = "pt-BR"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatLots(lots: number, locale = "pt-BR") {
  return lots.toLocaleString(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: lots > 0 && lots < 0.1 ? 2 : 0,
  });
}

/** Affiche le % sans abréviation « k » (chiffres réels). */
export function formatCompactPct(value: number, locale = "pt-BR") {
  const digits = Math.abs(value) >= 100 ? 0 : Math.abs(value) >= 10 ? 1 : 2;
  return formatPct(value, digits, locale);
}
