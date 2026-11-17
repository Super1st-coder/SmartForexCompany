import type { Metadata } from "next";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { FinalCTA } from "@/components/home/FinalCTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return buildMetadata({
    title: dict.nav.faq,
    description: dict.faq.pageDesc,
    path: "/faq",
  });
}

export default async function FaqPage() {
  const dict = getDictionary(await getLocale());
  const items = dict.faq.items.map((i) => ({
    question: i.q,
    answer: i.a,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(items)),
        }}
      />

      <PageHero
        badge={dict.faq.badge}
        title={dict.faq.pageTitle}
        description={dict.faq.pageDesc}
      />

      <section className="section-padding">
        <div className="container-page">
          <FadeIn>
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card px-5 shadow-sm sm:px-8">
              <Accordion type="single" collapsible className="w-full">
                {dict.faq.items.map((item, index) => (
                  <AccordionItem key={item.q} value={`faq-${index}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
