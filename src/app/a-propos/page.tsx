import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, Flag } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Card, CardContent } from "@/components/ui/card";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

const icons = [Target, Eye, HeartHandshake, Flag];

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return buildMetadata({
    title: dict.nav.about,
    description: dict.about.description,
    path: "/a-propos",
  });
}

export default async function AboutPage() {
  const dict = getDictionary(await getLocale());

  return (
    <>
      <PageHero
        badge={dict.about.badge}
        title={dict.about.title}
        description={dict.about.description}
      />

      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {dict.about.storyTitle}
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
              {dict.about.story.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h3 className="font-display text-xl font-semibold">
                {dict.about.beliefsTitle}
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                {dict.about.beliefs.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-muted/40">
        <div className="container-page">
          <h2 className="mb-10 text-center font-display text-2xl font-bold sm:text-3xl">
            {dict.about.valuesTitle}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.values.map((v, i) => {
              const Icon = icons[i] ?? Target;
              return (
                <FadeIn key={v.title} delay={i * 0.05}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{v.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {v.text}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
