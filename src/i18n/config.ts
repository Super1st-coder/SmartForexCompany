export const LOCALES = ["pt-BR", "en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt-BR";
export const LOCALE_COOKIE = "sfp_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  "pt-BR": "PT",
  en: "EN",
  fr: "FR",
};

/** Pays → locale (IP geo) */
export const COUNTRY_LOCALE: Record<string, Locale> = {
  // Portugais (Brésil prioritaire)
  BR: "pt-BR",
  PT: "pt-BR",
  AO: "pt-BR",
  MZ: "pt-BR",
  CV: "pt-BR",
  GW: "pt-BR",
  ST: "pt-BR",
  TL: "pt-BR",
  // Anglais
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  IE: "en",
  ZA: "en",
  IN: "en",
  PH: "en",
  NG: "en",
  KE: "en",
  GH: "en",
  SG: "en",
  MY: "en",
  PK: "en",
  BD: "en",
  AE: "en",
  // Français
  FR: "fr",
  BE: "fr",
  LU: "fr",
  MC: "fr",
  SN: "fr",
  CI: "fr",
  CM: "fr",
  CD: "fr",
  MG: "fr",
  HT: "fr",
  MA: "fr",
  TN: "fr",
  DZ: "fr",
  GA: "fr",
  CG: "fr",
  BJ: "fr",
  TG: "fr",
  NE: "fr",
  ML: "fr",
  BF: "fr",
  CH: "fr",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const lower = header.toLowerCase();
  if (lower.includes("pt")) return "pt-BR";
  if (lower.includes("en")) return "en";
  if (lower.includes("fr")) return "fr";
  return null;
}

export function localeTag(locale: Locale): string {
  if (locale === "pt-BR") return "pt-BR";
  return locale;
}
