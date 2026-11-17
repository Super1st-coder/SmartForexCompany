import { Bot, Code, Shield, Eye } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

const icons = [Bot, Code, Shield, Eye];

export async function Approach() {
  const dict = getDictionary(await getLocale());

  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeading
          badge={dict.approach.badge}
          title={dict.approach.title}
          description={dict.approach.description}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.approach.items.map((item, i) => {
            const Icon = icons[i] ?? Bot;
            return (
              <FadeIn key={item.title} delay={i * 0.06}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
