import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./config";

/**
 * Locale de rendu pour la requête courante.
 * - Priorité au header middleware (x-sfp-locale), qui applique
 *   la préférence cookie ou la locale forcée des landings.
 * - Fallback cookie / défaut.
 */
export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const fromHeader = h.get("x-sfp-locale");
  if (isLocale(fromHeader)) return fromHeader;

  const jar = await cookies();
  const fromCookie = jar.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  return DEFAULT_LOCALE;
}

/**
 * Préférence utilisateur (cookie), sans forçage landing.
 * Utile si un composant doit ignorer la locale forcée d’une landing.
 */
export async function getLocalePreference(): Promise<Locale> {
  const h = await headers();
  const fromPref = h.get("x-sfp-locale-preference");
  if (isLocale(fromPref)) return fromPref;

  const jar = await cookies();
  const fromCookie = jar.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  return DEFAULT_LOCALE;
}
