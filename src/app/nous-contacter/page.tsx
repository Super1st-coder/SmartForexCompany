import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SITE, getWhatsAppUrl } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { ContactForm } from "@/components/shared/ContactForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const { getLocale } = await import("@/i18n/get-locale");
  const { getDictionary } = await import("@/i18n/get-dictionary");
  const dict = getDictionary(await getLocale());
  return buildMetadata({
    title: dict.nav.contact,
    description: dict.contact.description,
    path: "/nous-contacter",
  });
}

export default async function NousContacterPage() {
  const { getLocale } = await import("@/i18n/get-locale");
  const { getDictionary } = await import("@/i18n/get-dictionary");
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        badge={dict.contact.badge}
        title={dict.contact.title}
        description={dict.contact.description}
      />

      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-5">
          <FadeIn className="lg:col-span-2">
            <div className="space-y-4">
              <Card>
                <CardContent className="flex gap-3 p-5">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">WhatsApp / Téléphone</p>
                    <Link
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                    >
                      {SITE.phone}
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex gap-3 p-5">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex gap-3 p-5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Zone</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {dict.contact.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex gap-3 p-5">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Disponibilité</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {dict.contact.hours}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <WhatsAppButton className="w-full" label={dict.common.whatsapp} />
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold">
                  {dict.common.contactUs}
                </h2>
                <p className="mt-2 mb-6 text-sm text-muted-foreground">
                  {dict.contact.formNote}
                </p>
                <ContactForm type="contact" locale={locale} />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
