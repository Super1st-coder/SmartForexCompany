import Link from "next/link";
import { ShieldCheck, Copy, ChartLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { LeadModal } from "@/components/shared/LeadModal";
import { FadeIn } from "@/components/shared/FadeIn";
import {
  fetchWeltradeMetrics,
  formatPct,
  type WeltradeMetrics,
} from "@/lib/weltrade";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeTag } from "@/i18n/config";

function HeroMetricsCard({
  metrics,
  labels,
  locale,
}: {
  metrics: WeltradeMetrics | null;
  labels: {
    cardLabel: string;
    strategy: string;
    live: string;
    winRate: string;
    avgMonthly: string;
    maxDd: string;
    monthNow: string;
    autoCopy: string;
    requestAccess: string;
    pastResults: string;
    fallback: string;
  };
  locale: string;
}) {
  const stats = metrics
    ? [
        {
          label: labels.winRate,
          value: `${metrics.winRatePct.toLocaleString(locale, {
            maximumFractionDigits: 1,
          })} %`,
        },
        {
          label: labels.avgMonthly,
          value: formatPct(metrics.avgMonthlyReturnPct, 1, locale),
        },
        {
          label: labels.maxDd,
          value: formatPct(-Math.abs(metrics.maxDrawdownPct), 1, locale),
        },
        {
          label: labels.monthNow,
          value: formatPct(metrics.returnMonthPct, 1, locale),
        },
      ]
    : [
        { label: labels.winRate, value: "n/d" },
        { label: labels.avgMonthly, value: "n/d" },
        { label: labels.maxDd, value: "n/d" },
        { label: labels.monthNow, value: "n/d" },
      ];

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-success/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {labels.cardLabel}
            </p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">
              {labels.strategy}
            </p>
          </div>
          <Badge variant="success" className="shrink-0 gap-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {labels.live}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-muted/50 p-3"
            >
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 font-semibold tabular-nums text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium text-foreground">
            {labels.autoCopy} · {metrics?.symbols?.[0] ?? "XAUUSD"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {metrics
              ? `${metrics.totalTrades} trades · ${metrics.ageMonths} · fee ${metrics.performanceFeePct} %`
              : labels.fallback}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
          <LeadModal triggerLabel={labels.requestAccess} triggerSize="sm" />
          <p className="text-xs text-muted-foreground">{labels.pastResults}</p>
        </div>
      </div>
    </div>
  );
}

export async function Hero() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const tag = localeTag(locale);

  let metrics: WeltradeMetrics | null = null;
  try {
    metrics = await fetchWeltradeMetrics();
  } catch {
    metrics = null;
  }

  return (
    <section className="gradient-hero relative overflow-hidden pt-24 md:pt-28">
      <div className="container-page section-padding !pt-10 md:!pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeIn>
              <Badge variant="success" className="mb-5 gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                {dict.hero.badge}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1] text-balance">
                {dict.hero.title}{" "}
                <span className="text-primary">{dict.hero.titleHighlight}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {dict.hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <WhatsAppButton label={dict.common.joinNow} size="xl" />
                <LeadModal
                  triggerLabel={dict.common.learnMore}
                  triggerVariant="outline"
                  triggerSize="xl"
                />
                <Button asChild variant="ghost" size="xl">
                  <Link href="/performances">{dict.common.seePerformances}</Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Copy className="h-4 w-4 text-primary" />
                  {dict.hero.auto}
                </li>
                <li className="flex items-center gap-2">
                  <ChartLine className="h-4 w-4 text-primary" />
                  {dict.hero.metricsLive}
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  {dict.hero.risk}
                </li>
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.12} className="relative">
            <HeroMetricsCard
              metrics={metrics}
              locale={tag}
              labels={{
                cardLabel: dict.hero.cardLabel,
                strategy: dict.hero.strategy,
                live: dict.common.live,
                winRate: dict.hero.winRate,
                avgMonthly: dict.hero.avgMonthly,
                maxDd: dict.hero.maxDd,
                monthNow: dict.hero.monthNow,
                autoCopy: dict.hero.autoCopy,
                requestAccess: dict.common.requestAccess,
                pastResults: dict.common.pastResults,
                fallback: dict.hero.metricsLive,
              }}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
