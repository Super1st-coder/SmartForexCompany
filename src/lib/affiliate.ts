/**
 * Affiliation RoboForex + stats publiques FX Blue.
 *
 * - Stats : page FX Blue (vérifiable)
 * - Inscription : page intermédiaire cookie RoboForex → offre copy trading
 */

export const AFFILIATE = {
  /** Pose le cookie d’affiliation RoboForex (à charger en premier) */
  visitUrl: "https://my.roboforex.com/en/?a=qnbt",
  /** Page finale copy trading RoboForex (après cookie) */
  offerUrl: "https://roboforex.com/copy-trading/rating/bbba/37389652",
  /** Stats publiques vérifiables (FX Blue) */
  statsUrl: "https://www.fxblue.com/users/SmartForexPro",
  /** Délai ms pour laisser le cookie se poser avant redirect */
  redirectDelayMs: 1200,
  /** Route intermédiaire on-site (PT) — cookie → offre */
  goPath: "/go/estatisticas",
  /** Route intermédiaire on-site (FR) — cookie → offre */
  goPathFr: "/go/statistiques",
  /** Route intermédiaire on-site (EN) — cookie → offre */
  goPathEn: "/go/sign-up",
} as const;

export function getAffiliateSignupPath(
  locale: "en" | "fr" | "pt-BR" | string
): string {
  if (locale === "fr") return AFFILIATE.goPathFr;
  if (locale === "en") return AFFILIATE.goPathEn;
  return AFFILIATE.goPath;
}
