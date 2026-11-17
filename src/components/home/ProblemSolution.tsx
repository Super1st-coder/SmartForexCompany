import { XCircle, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

export async function ProblemSolution() {
  const dict = getDictionary(await getLocale());

  return (
    <section className="section-padding bg-card border-y border-border">
      <div className="container-page">
        <SectionHeading
          badge={dict.problem.badge}
          title={dict.problem.title}
          description={dict.problem.description}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <Card className="h-full border-red-100 bg-red-50/40">
              <CardContent className="p-6 sm:p-8">
                <h3 className="mb-5 font-display text-lg font-semibold text-red-800">
                  {dict.problem.problemsTitle}
                </h3>
                <ul className="space-y-3.5">
                  {dict.problem.problems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card className="h-full border-success/20 bg-success/5">
              <CardContent className="p-6 sm:p-8">
                <h3 className="mb-5 font-display text-lg font-semibold text-emerald-800">
                  {dict.problem.solutionsTitle}
                </h3>
                <ul className="space-y-3.5">
                  {dict.problem.solutions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
