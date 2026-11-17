import {
  CalendarCheck,
  Filter,
  Copy,
  Headphones,
  ChartNoAxesCombined,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

const icons = [
  CalendarCheck,
  Filter,
  Copy,
  ChartNoAxesCombined,
  Headphones,
];

export async function Advantages() {
  const dict = getDictionary(await getLocale());

  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeading
          badge={dict.advantages.badge}
          title={dict.advantages.title}
          description={dict.advantages.description}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.advantages.items.map((item, i) => {
            const Icon = icons[i] ?? Copy;
            return (
              <FadeIn key={item.title} delay={i * 0.05}>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm shadow-slate-900/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
