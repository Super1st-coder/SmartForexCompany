import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

export async function Testimonials() {
  const dict = getDictionary(await getLocale());

  return (
    <section className="section-padding border-y border-border bg-card">
      <div className="container-page">
        <SectionHeading
          badge={dict.testimonials.badge}
          title={dict.testimonials.title}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dict.testimonialsItems.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.05}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/30" />
                  <p className="flex-1 text-sm leading-relaxed text-slate-700">
                    “{t.content}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
