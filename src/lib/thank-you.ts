import type { Locale } from "@/i18n/config";

/** Routes de remerciement par locale (formulaires + landings) */
export const THANK_YOU_PATH: Record<Locale, string> = {
  "pt-BR": "/obrigado",
  fr: "/merci",
  en: "/thank-you",
};

export function getThankYouPath(locale: Locale): string {
  return THANK_YOU_PATH[locale] ?? THANK_YOU_PATH["pt-BR"];
}

/** Locale forcée sur chaque page de remerciement */
export const THANK_YOU_LOCALE_BY_PATH: Record<string, Locale> = {
  "/obrigado": "pt-BR",
  "/merci": "fr",
  "/thank-you": "en",
};

export function isThankYouPath(pathname: string): boolean {
  return (
    pathname === "/obrigado" ||
    pathname.startsWith("/obrigado/") ||
    pathname === "/merci" ||
    pathname.startsWith("/merci/") ||
    pathname === "/thank-you" ||
    pathname.startsWith("/thank-you/")
  );
}

/** Lien « page contact » selon la langue de la thank-you */
export function getThankYouContactHref(locale: Locale): string {
  if (locale === "fr") return "/contact";
  if (locale === "pt-BR") return "/contato";
  return "/get-started";
}

/** Stats publiques FX Blue */
export function getThankYouStatsHref(_locale: Locale): string {
  return "https://www.fxblue.com/users/SmartForexPro";
}
