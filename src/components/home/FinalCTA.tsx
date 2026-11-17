import { FadeIn } from "@/components/shared/FadeIn";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { LeadModal } from "@/components/shared/LeadModal";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";

export async function FinalCTA() {
  const dict = getDictionary(await getLocale());

  return (
    <section className="section-padding">
      <div className="container-page">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.35),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.2),transparent_45%)]" />
            <div className="relative">
              <p className="text-sm font-medium uppercase tracking-wider text-blue-300">
                {dict.cta.kicker}
              </p>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                {dict.cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
                {dict.cta.text}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <WhatsAppButton label={dict.common.whatsapp} size="xl" />
                <LeadModal
                  triggerLabel={dict.common.contactUs}
                  triggerVariant="outline"
                  triggerSize="xl"
                  className="border-slate-600 bg-transparent text-white hover:bg-white/10 hover:text-white"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
