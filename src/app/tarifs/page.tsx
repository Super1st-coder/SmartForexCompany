import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";
import {
  fetchWeltradeMetrics,
  formatMoney,
  formatPct,
} from "@/lib/weltrade";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { LeadModal } from "@/components/shared/LeadModal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeTag } from "@/i18n/config";



export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return buildMetadata({
    title: dict.nav.pricing,
    description: dict.pricing.description,
    path: "/tarifs",
  });
}

export default async function PricingPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const tag = localeTag(locale);

  let feePct: number | null = null;
  let minDeposit: string | null = null;
  try {
    const m = await fetchWeltradeMetrics();
    feePct = m.performanceFeePct;
    minDeposit = formatMoney(m.minDeposit, m.displayCurrency, 0, tag);
  } catch {
    feePct = null;
    minDeposit = null;
  }

  const planIds = ["copy", "accompagnement", "premium"] as const;

  return (
    <>
      <PageHero
        badge={dict.pricing.badge}
        title={dict.pricing.title}
        description={dict.pricing.description}
      />

      <section className="section-padding">
        <div className="container-page">
          <FadeIn className="mb-10 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-5 text-center sm:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.pricing.monthly}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground">
                  0
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dict.pricing.forCopy}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center sm:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.pricing.perfFee}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">
                  {feePct != null
                    ? formatPct(feePct, 0, tag).replace("+", "")
                    : "35 %"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dict.pricing.onGainsOnly}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center sm:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.pricing.minDeposit}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground">
                  {minDeposit ?? "n/d"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dict.pricing.confirmed}
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-3">
            {dict.pricing.plans.map((plan, i) => {
              const id = planIds[i] ?? `plan-${i}`;
              const highlighted = i === 0;
              return (
                <FadeIn key={plan.name} delay={i * 0.06}>
                  <Card
                    className={cn(
                      "relative flex h-full flex-col",
                      highlighted &&
                        "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                    )}
                  >
                    {highlighted ? (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                        {dict.pricing.mainOffer}
                      </Badge>
                    ) : null}
                    <CardHeader className="p-6 pb-2">
                      <h2 className="font-display text-xl font-bold">
                        {plan.name}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                      <div className="mt-5 flex items-end gap-1">
                        <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                          {plan.price}
                        </span>
                        {plan.period ? (
                          <span className="mb-1 text-sm text-muted-foreground">
                            {plan.period}
                          </span>
                        ) : null}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-6 pt-4">
                      <ul className="space-y-3">
                        {plan.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 p-6 pt-0">
                      {id === "premium" ? (
                        <LeadModal
                          triggerLabel={plan.cta}
                          triggerVariant="outline"
                          triggerSize="lg"
                          className="w-full"
                        />
                      ) : (
                        <Button
                          asChild
                          size="lg"
                          variant={highlighted ? "default" : "outline"}
                          className="w-full"
                        >
                          <Link
                            href={getWhatsAppUrl(
                              `Smart Forex Pro - ${plan.name}`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {plan.cta}
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn className="mt-12 rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
            <h3 className="font-display text-lg font-semibold">
              {dict.pricing.needHelp}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {dict.pricing.needHelpText}
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton label={dict.common.whatsapp} />
              <LeadModal triggerLabel={dict.common.learnMore} />
            </div>
          </FadeIn>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
