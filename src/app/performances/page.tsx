import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PerformanceCharts } from "@/components/performances/PerformanceCharts";
import {
  fetchWeltradeMetrics,
  formatPct,
} from "@/lib/weltrade";
import { LeadModal } from "@/components/shared/LeadModal";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeTag } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  try {
    const m = await fetchWeltradeMetrics();
    return buildMetadata({
      title: dict.nav.performances,
      description: `Smart Forex Pro live: win rate ${m.winRatePct.toFixed(1)} %, avg monthly ${formatPct(m.avgMonthlyReturnPct)}, max DD ${formatPct(-Math.abs(m.maxDrawdownPct))}. Past results not guaranteed.`,
      path: "/performances",
    });
  } catch {
    return buildMetadata({
      title: dict.nav.performances,
      description: dict.performances.pageDesc,
      path: "/performances",
    });
  }
}

export default async function PerformancesPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const tag = localeTag(locale);
  let metrics = null;
  let error: string | null = null;
  try {
    metrics = await fetchWeltradeMetrics();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error";
  }

  const chartLabels = {
    totalReturn: dict.performances.totalReturn,
    since: dict.performances.since,
    avgMonthly: dict.performances.avgMonthly,
    overMonths: dict.performances.overMonths,
    maxDd: dict.performances.maxDd,
    drawdownHint: dict.performances.drawdownHint,
    winRate: dict.performances.winRate,
    closedTrades: dict.performances.closedTrades,
    strategyTitle: dict.performances.strategyTitle,
    period: dict.performances.period,
    minDeposit: dict.performances.minDeposit,
    perfFee: dict.performances.perfFee,
    monthInProgress: dict.performances.monthInProgress,
    activeDays: dict.performances.activeDays,
    monthsSince: dict.performances.monthsSince,
    totalRoi: dict.performances.totalRoi,
    last3m: dict.performances.last3m,
    insufficientMonths: dict.performances.insufficientMonths,
    minDepositLabel: dict.performances.minDepositLabel,
    updated: dict.performances.updated,
    requestAccess: dict.common.requestAccess,
    live: dict.common.live,
    monthlyChart: dict.performances.monthlyChart,
    equityChart: dict.performances.equityChart,
    recentTrades: dict.performances.recentTrades,
  };

  return (
    <>
      <PageHero
        badge={dict.performances.badge}
        title={dict.performances.pageTitle}
        description={dict.performances.pageDesc}
      />

      <section className="section-padding">
        <div className="container-page">
          <FadeIn>
            {metrics ? (
              <PerformanceCharts
                metrics={metrics}
                labels={chartLabels}
                locale={tag}
              />
            ) : (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-100">
                {dict.performances.loadError}
                {error ? ` (${error})` : null}
                <div className="mt-4 flex flex-wrap gap-3">
                  <WhatsAppButton label={dict.performances.contactUs} />
                  <LeadModal
                    triggerLabel={dict.performances.requestCallback}
                  />
                </div>
              </div>
            )}
          </FadeIn>

          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
            <strong>{dict.performances.riskTitle}</strong>{" "}
            {dict.performances.riskBody}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
