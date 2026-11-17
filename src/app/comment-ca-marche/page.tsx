import type { Metadata } from "next";
import {
  MessageCircle,
  UserPlus,
  Bot,
  Shield,
  LineChart,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { LeadModal } from "@/components/shared/LeadModal";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

const icons = [MessageCircle, UserPlus, Bot, Shield, LineChart];

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return buildMetadata({
    title: dict.nav.how,
    description: dict.how.description,
    path: "/comment-ca-marche",
  });
}

export default async function HowItWorksPage() {
  const dict = getDictionary(await getLocale());

  return (
    <>
      <PageHero
        badge={dict.how.badge}
        title={dict.how.title}
        description={dict.how.description}
      />

      <section className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-5">
            {dict.how.steps.map((item, i) => {
              const Icon = icons[i] ?? Bot;
              const step = String(i + 1).padStart(2, "0");
              return (
                <FadeIn key={item.title} delay={i * 0.05}>
                  <Card>
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-6">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-display text-lg font-bold shadow-sm shadow-primary/25">
                        {step}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2 text-primary">
                          <Icon className="h-4 w-4" />
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            {step}
                          </span>
                        </div>
                        <h2 className="font-display text-xl font-semibold">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground">{dict.how.ready}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton label={dict.common.whatsapp} size="xl" />
              <LeadModal
                triggerLabel={dict.common.learnMore}
                triggerVariant="outline"
                triggerSize="xl"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
