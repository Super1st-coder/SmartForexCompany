import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  fetchWeltradeMetrics,
  formatLots,
  formatMoney,
  formatPct,
  type WeltradeMetrics,
} from "@/lib/weltrade";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/shared/LeadModal";
import { cn } from "@/lib/utils";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeTag } from "@/i18n/config";

function buildStats(
  metrics: WeltradeMetrics,
  labels: {
    winRate: string;
    avgMonthly: string;
    maxDd: string;
    monthNow: string;
    closedTrades: string;
    monthsActive: string;
  },
  locale: string
) {
  return [
    {
      label: labels.winRate,
      value: `${metrics.winRatePct.toLocaleString(locale, {
        maximumFractionDigits: 1,
      })} %`,
      hint: `${metrics.totalTrades} ${labels.closedTrades}`,
    },
    {
      label: labels.avgMonthly,
      value: formatPct(metrics.avgMonthlyReturnPct, 1, locale),
      hint: `${metrics.ageMonths} ${labels.monthsActive}`,
    },
    {
      label: labels.maxDd,
      value: formatPct(-Math.abs(metrics.maxDrawdownPct), 1, locale),
      hint: "TWR",
    },
    {
      label: labels.monthNow,
      value: formatPct(metrics.returnMonthPct, 1, locale),
      hint: "live",
    },
  ];
}

export async function PerformancesPreview() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const tag = localeTag(locale);

  let metrics: WeltradeMetrics | null = null;
  try {
    metrics = await fetchWeltradeMetrics();
  } catch {
    metrics = null;
  }

  const stats = metrics
    ? buildStats(
        metrics,
        {
          winRate: dict.performances.winRate,
          avgMonthly: dict.performances.avgMonthly,
          maxDd: dict.performances.maxDd,
          monthNow: dict.performances.monthNow,
          closedTrades: dict.performances.closedTrades,
          monthsActive: dict.performances.monthsActive,
        },
        tag
      )
    : [
        {
          label: dict.performances.winRate,
          value: "n/d",
          hint: dict.performances.closedTrades,
        },
        {
          label: dict.performances.avgMonthly,
          value: "n/d",
          hint: dict.performances.monthsActive,
        },
        { label: dict.performances.maxDd, value: "n/d", hint: "TWR" },
        { label: dict.performances.monthNow, value: "n/d", hint: "live" },
      ];

  const trades = metrics?.recentTrades.slice(0, 6) ?? [];

  return (
    <section className="section-padding border-y border-border bg-muted/40">
      <div className="container-page">
        <SectionHeading
          badge={dict.performances.badge}
          title={dict.performances.title}
          description={dict.performances.description}
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.05}>
              <Card>
                <CardContent className="p-5 text-center sm:text-left">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {trades.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trades.map((trade, i) => {
              const positive = trade.profit >= 0;
              return (
                <FadeIn key={trade.id} delay={0.04 * i}>
                  <Card className="h-full">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">
                            {trade.symbol}
                          </p>
                          <Badge variant="outline">{trade.type}</Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {trade.lots > 0
                            ? `${formatLots(trade.lots, tag)} ${dict.performances.lot} · `
                            : ""}
                          {dict.performances.closed}{" "}
                          {trade.closedAt
                            ? new Date(trade.closedAt).toLocaleDateString(tag)
                            : "n/d"}
                        </p>
                      </div>
                      <p
                        className={cn(
                          "font-display text-xl font-bold tabular-nums",
                          positive ? "text-success" : "text-red-500"
                        )}
                      >
                        {formatMoney(
                          trade.profit,
                          metrics?.displayCurrency ?? "USD",
                          2,
                          tag
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        ) : null}

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
          {dict.common.riskDisclaimer}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline" size="lg">
            <Link href="/performances">
              {dict.performances.detail}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <LeadModal
            triggerLabel={dict.common.requestAccess}
            triggerSize="lg"
          />
        </div>
      </div>
    </section>
  );
}
