import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

export async function FaqSection({ limit = 5 }: { limit?: number }) {
  const dict = getDictionary(await getLocale());
  const items = dict.faq.items.slice(0, limit);

  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeading
          badge={dict.faq.badge}
          title={dict.faq.title}
          description={dict.faq.description}
        />

        <FadeIn>
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card px-5 shadow-sm sm:px-8">
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem key={item.q} value={`item-${index}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/faq">{dict.nav.faq}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
