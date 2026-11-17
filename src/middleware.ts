import { NextRequest, NextResponse } from "next/server";
import {
  COUNTRY_LOCALE,
  DEFAULT_LOCALE,
  isLocale,
  localeFromAcceptLanguage,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

function clientIp(req: NextRequest): string | null {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || null;
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

async function countryFromIp(ip: string | null): Promise<string | null> {
  if (!ip || ip === "127.0.0.1" || ip === "::1") return null;
  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      success?: boolean;
      country_code?: string;
    };
    if (data.success === false) return null;
    return data.country_code?.toUpperCase() ?? null;
  } catch {
    return null;
  }
}

function localeFromCountry(country: string | null): Locale | null {
  if (!country) return null;
  return COUNTRY_LOCALE[country] ?? null;
}

/** Locale forcée pour une landing campagne (ne doit PAS écraser le cookie). */
function forcedLocaleForPath(path: string): Locale | null {
  if (
    path === "/contato" ||
    path.startsWith("/contato/") ||
    path === "/obrigado" ||
    path.startsWith("/obrigado/") ||
    path === "/go/estatisticas" ||
    path.startsWith("/go/estatisticas/")
  ) {
    return "pt-BR";
  }
  if (
    path === "/contact" ||
    path.startsWith("/contact/") ||
    path === "/merci" ||
    path.startsWith("/merci/") ||
    path === "/go/statistiques" ||
    path.startsWith("/go/statistiques/")
  ) {
    return "fr";
  }
  if (
    path === "/thank-you" ||
    path.startsWith("/thank-you/") ||
    path === "/get-started" ||
    path.startsWith("/get-started/") ||
    path === "/go/sign-up" ||
    path.startsWith("/go/sign-up/")
  ) {
    return "en";
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const existing = req.cookies.get(LOCALE_COOKIE)?.value;
  const forced = forcedLocaleForPath(path);

  // Préférence utilisateur (cookie) — ou détection 1ère visite
  let preference: Locale = isLocale(existing) ? existing : DEFAULT_LOCALE;

  if (!isLocale(existing)) {
    const ip = clientIp(req);
    const country = await countryFromIp(ip);
    const fromIp = localeFromCountry(country);
    const fromLang = localeFromAcceptLanguage(
      req.headers.get("accept-language")
    );
    preference = fromIp ?? fromLang ?? DEFAULT_LOCALE;
  }

  // Locale de rendu : forcée sur landings, sinon préférence utilisateur
  const locale: Locale = forced ?? preference;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-sfp-locale", locale);
  requestHeaders.set("x-sfp-pathname", path);
  // Préférence stable pour le switcher / navigation hors landing
  requestHeaders.set("x-sfp-locale-preference", preference);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // N'écrit le cookie QUE pour la préférence (jamais la locale forcée d'une landing)
  if (!isLocale(existing) || existing !== preference) {
    res.cookies.set(LOCALE_COOKIE, preference, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  // Empêche le cache CDN/navigateur de servir une mauvaise langue
  res.headers.set(
    "Vary",
    "Cookie, Accept-Language, x-sfp-locale, x-sfp-locale-preference"
  );
  res.headers.set("Cache-Control", "private, no-store");

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|api/).*)",
  ],
};
