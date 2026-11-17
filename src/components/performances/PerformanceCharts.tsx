"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import type { WeltradeMetrics } from "@/lib/weltrade";
import { formatLots, formatMoney, formatPct } from "@/lib/weltrade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeadModal } from "@/components/shared/LeadModal";
import { cn } from "@/lib/utils";

function formatDate(iso: string | null, locale: string) {
  if (!iso) return "n/d";
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "n/d";
  }
}

type TooltipPayload = {
  value?: number;
  name?: string;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
};

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  valueFormatter: (v: number, key?: string) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <p className="mb-1.5 font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={String(entry.dataKey)} className="text-muted-foreground">
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full"
            style={{ background: entry.color }}
          />
          {entry.name}:{" "}
          <span className="font-semibold text-foreground">
            {valueFormatter(Number(entry.value ?? 0), String(entry.dataKey))}
          </span>
        </p>
      ))}
    </div>
  );
}

/** Downsample equity curve for chart readability */
function downsample<T>(arr: T[], maxPoints: number): T[] {
  if (arr.length <= maxPoints) return arr;
  const step = Math.ceil(arr.length / maxPoints);
  const out: T[] = [];
  for (let i = 0; i < arr.length; i += step) out.push(arr[i]);
  const last = arr[arr.length - 1];
  if (out[out.length - 1] !== last) out.push(last);
  return out;
}

export type PerformanceChartsLabels = {
  totalReturn: string;
  since: string;
  avgMonthly: string;
  overMonths: string;
  maxDd: string;
  drawdownHint: string;
  winRate: string;
  closedTrades: string;
  strategyTitle: string;
  period: string;
  minDeposit: string;
  perfFee: string;
  monthInProgress: string;
  activeDays: string;
  monthsSince: string;
  totalRoi: string;
  last3m: string;
  insufficientMonths: string;
  minDepositLabel: string;
  updated: string;
  requestAccess: string;
  live: string;
  monthlyChart: string;
  equityChart: string;
  recentTrades: string;
};

type Props = {
  metrics: WeltradeMetrics;
  labels: PerformanceChartsLabels;
  locale?: string;
};

const MIN_DEPOSIT_USD = 500;

/** Rendement composé des 3 derniers mois (en %). */
function lastThreeMonthsReturnPct(
  monthly: WeltradeMetrics["monthlyReturns"]
): number | null {
  if (!monthly.length) return null;
  const last3 = monthly.slice(-3);
  if (!last3.length) return null;
  const compounded = last3.reduce(
    (acc, m) => acc * (1 + m.returnPct / 100),
    1
  );
  return (compounded - 1) * 100;
}

export function PerformanceCharts({
  metrics,
  labels,
  locale = "fr-CH",
}: Props) {
  const currency = metrics.displayCurrency;
  const monthly = metrics.monthlyReturns;
  const curve = downsample(metrics.equityCurve, 120);
  const last3mPct = lastThreeMonthsReturnPct(monthly);
  const fmt = (iso: string | null) => formatDate(iso, locale);
  const pct = (v: number, digits?: number) => formatPct(v, digits, locale);

  const kpiCards = [
    {
      label: labels.totalReturn,
      value: pct(
        metrics.totalReturnPct,
        metrics.totalReturnPct >= 100 ? 0 : 1
      ),
      hint: `${labels.since} ${fmt(metrics.firstDealAt)}`,
      accent: "text-success",
    },
    {
      label: labels.avgMonthly,
      value: pct(metrics.avgMonthlyReturnPct),
      hint: labels.overMonths.replace("{n}", String(metrics.ageMonths)),
      accent: "text-primary",
    },
    {
      label: labels.maxDd,
      value: pct(-Math.abs(metrics.maxDrawdownPct)),
      hint: labels.drawdownHint,
      accent: "text-amber-600",
    },
    {
      label: labels.winRate,
      value: `${metrics.winRatePct.toLocaleString(locale, {
        maximumFractionDigits: 1,
      })} %`,
      hint: `${metrics.totalTrades} ${labels.closedTrades}`,
      accent: "text-primary",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Live · {metrics.symbols[0] ?? "XAUUSD"} ·{" "}
                {metrics.displayCurrency}
              </p>
              <Badge variant="success" className="gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                {labels.live}
              </Badge>
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-foreground sm:text-2xl">
              {labels.strategyTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {labels.period} : {fmt(metrics.firstDealAt)} →{" "}
              {fmt(metrics.lastUpdateAt)} · {labels.minDeposit}{" "}
              {formatMoney(MIN_DEPOSIT_USD, "USD", 0, locale)} ·{" "}
              {labels.perfFee} {metrics.performanceFeePct} %
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {labels.monthInProgress} {pct(metrics.returnMonthPct)}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              {metrics.totalTrades} trades
            </span>
            <LeadModal
              triggerLabel={labels.requestAccess}
              triggerSize="sm"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {kpi.label}
              </p>
              <p
                className={cn(
                  "mt-2 font-display text-2xl font-bold tabular-nums sm:text-3xl",
                  kpi.accent
                )}
              >
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{kpi.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {monthly.length > 0 ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">
              {labels.monthlyChart} (%)
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {labels.avgMonthly} : {pct(metrics.avgMonthlyReturnPct)} ·{" "}
              {monthly.filter((m) => m.returnPct >= 0).length} /{" "}
              {monthly.length}
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[280px] w-full sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthly}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border)"
                  />
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                    minTickGap={28}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                    width={48}
                  />
                  <Tooltip
                    content={
                      <ChartTooltip valueFormatter={(v) => pct(v)} />
                    }
                  />
                  <ReferenceLine y={0} stroke="var(--border)" />
                  <ReferenceLine
                    y={metrics.avgMonthlyReturnPct}
                    stroke="var(--primary)"
                    strokeDasharray="4 4"
                    strokeOpacity={0.7}
                  />
                  <Bar
                    dataKey="returnPct"
                    name={labels.avgMonthly}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  >
                    {monthly.map((entry) => (
                      <Cell
                        key={entry.month}
                        fill={
                          entry.returnPct >= 0 ? "var(--success)" : "#ef4444"
                        }
                        fillOpacity={0.9}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              {labels.avgMonthly} ({pct(metrics.avgMonthlyReturnPct)})
            </p>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {curve.length > 0 ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                {labels.equityChart} (TWR)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {labels.totalReturn}
              </p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[260px] w-full sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={curve}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="twrFill" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="var(--primary)"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--primary)"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={40}
                      tickFormatter={(d: string) => {
                        const [, m, day] = d.split("-");
                        return `${day}/${m}`;
                      }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) =>
                        v >= 1000
                          ? `${(v / 1000).toFixed(0)}k%`
                          : `${v}%`
                      }
                      width={52}
                    />
                    <Tooltip
                      content={
                        <ChartTooltip
                          valueFormatter={(v) => pct(v, 1)}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="returnPct"
                      name="TWR"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fill="url(#twrFill)"
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {curve.length > 0 ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                {labels.equityChart}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {currency}
              </p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[260px] w-full sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={curve}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="equityFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--success)"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--success)"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={40}
                      tickFormatter={(d: string) => {
                        const [, m, day] = d.split("-");
                        return `${day}/${m}`;
                      }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) =>
                        v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
                      }
                      width={48}
                    />
                    <Tooltip
                      content={
                        <ChartTooltip
                          valueFormatter={(v) =>
                            formatMoney(v, currency, 2, locale)
                          }
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="equity"
                      name={labels.equityChart}
                      stroke="var(--success)"
                      strokeWidth={2}
                      fill="url(#equityFill)"
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>

      {metrics.recentTrades.length > 0 ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">
              {labels.recentTrades}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Extrait de l’historique public du compte
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-2 pr-3 font-medium">Date</th>
                    <th className="pb-2 pr-3 font-medium">Symbole</th>
                    <th className="pb-2 pr-3 font-medium">Sens</th>
                    <th className="pb-2 pr-3 font-medium">Lots</th>
                    <th className="pb-2 pr-3 font-medium">Ouverture</th>
                    <th className="pb-2 pr-3 font-medium">Clôture</th>
                    <th className="pb-2 font-medium text-right">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.recentTrades.map((t) => (
                    <tr key={t.id} className="border-b border-border/60">
                      <td className="py-2.5 pr-3 text-muted-foreground">
                        {fmt(t.closedAt)}
                      </td>
                      <td className="py-2.5 pr-3 font-medium">{t.symbol}</td>
                      <td className="py-2.5 pr-3">
                        <Badge variant="outline">{t.type}</Badge>
                      </td>
                      <td className="py-2.5 pr-3 tabular-nums">
                      {formatLots(t.lots, locale)}
                    </td>
                      <td className="py-2.5 pr-3 tabular-nums text-muted-foreground">
                        {t.priceOpen.toLocaleString(locale)}
                      </td>
                      <td className="py-2.5 pr-3 tabular-nums text-muted-foreground">
                        {t.priceClose.toLocaleString(locale)}
                      </td>
                      <td
                        className={cn(
                          "py-2.5 text-right font-semibold tabular-nums",
                          t.profit >= 0 ? "text-success" : "text-red-500"
                        )}
                      >
                        {formatMoney(t.profit, currency, 2, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {labels.activeDays}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">
              {metrics.ageDays.toLocaleString(locale, {
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {labels.monthsSince
                .replace("{n}", String(metrics.ageMonths))
                .replace("{date}", fmt(metrics.firstDealAt))}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {labels.totalRoi}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">
              {pct(
                metrics.totalReturnPct,
                metrics.totalReturnPct >= 100 ? 0 : 1
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {labels.last3m}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">
              {last3mPct != null ? pct(last3mPct, 1) : "n/d"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {monthly.length >= 3
                ? monthly
                    .slice(-3)
                    .map((m) => m.shortLabel)
                    .join(" · ")
                : labels.insufficientMonths}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {labels.minDepositLabel}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">
              {formatMoney(MIN_DEPOSIT_USD, "USD", 0, locale)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {labels.updated} {fmt(metrics.fetchedAt)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
