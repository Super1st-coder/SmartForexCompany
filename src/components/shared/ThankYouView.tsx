import Link from "next/link";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { VoirLesStatistiquesButton } from "@/components/affiliate/VoirLesStatistiquesButton";
import { getWhatsAppUrl } from "@/lib/constants";
import {
  getThankYouContactHref,
  getThankYouStatsHref,
} from "@/lib/thank-you";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function ThankYouView({ locale, dict }: Props) {
  const t = dict.thankYou;
  const whatsappUrl = getWhatsAppUrl(t.whatsappMessage);
  const contactHref = getThankYouContactHref(locale);
  const statsHref = getThankYouStatsHref(locale);

  return (
    <div className="landing-neon relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="ln-grid absolute inset-0 opacity-80" />
        <div className="ln-glow-orb absolute -left-24 top-0 h-72 w-72 rounded-full bg-[rgba(0,245,255,0.14)]" />
        <div className="ln-glow-orb absolute -right-16 top-40 h-80 w-80 rounded-full bg-[rgba(0,255,157,0.1)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,245,255,0.12),transparent_55%)]" />
      </div>

      <header className="relative z-20 border-b border-white/5 bg-[rgba(10,10,15,0.65)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Logo variant="light" href="/" />
          <span className="rounded-full border border-[rgba(0,255,157,0.35)] bg-[rgba(0,255,157,0.08)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--ln-green)]">
            {t.badge}
          </span>
        </div>
      </header>

      <main className="relative z-10 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-xl">
          <div className="ln-glass ln-glass-hot ln-fade-up rounded-3xl p-6 text-center sm:p-10">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(0,255,157,0.12)] ln-check-glow">
              <CheckCircle2
                className="h-11 w-11 text-[var(--ln-green)]"
                strokeWidth={2}
              />
            </div>

            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--ln-muted)] sm:text-lg">
              {t.body}{" "}
              <span className="font-semibold text-[var(--ln-green)]">
                {t.hoursHighlight}
              </span>
              .
            </p>
            <p className="mt-3 text-sm text-slate-500">{t.watchChannels}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ln-cta inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base no-underline"
              >
                <MessageCircle className="h-5 w-5" />
                {t.whatsappCta}
              </a>
              <VoirLesStatistiquesButton
                variant="outline"
                size="lg"
                label={t.statsLabel}
                href={statsHref}
                external
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          <div
            className="ln-fade-up mt-8 space-y-3"
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-[var(--ln-cyan)]">
              {t.nextStepsTitle}
            </p>
            {t.steps.map((step, i) => (
              <div
                key={step.title}
                className="ln-glass flex gap-4 rounded-2xl p-4 text-left"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(0,245,255,0.3)] bg-[rgba(0,245,255,0.08)] text-sm font-bold text-[var(--ln-cyan)]">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-semibold text-white">{step.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--ln-muted)]">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
            <Mail className="h-4 w-4 shrink-0" />
            {t.emailNote}
          </p>

          <p className="mt-6 text-center text-[11px] text-slate-600">
            <Link href="/" className="text-slate-500 hover:text-[var(--ln-cyan)]">
              {t.backHome}
            </Link>
            {" · "}
            <Link
              href={contactHref}
              className="text-slate-500 hover:text-[var(--ln-cyan)]"
            >
              {t.backContact}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
