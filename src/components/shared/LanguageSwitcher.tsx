"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_LABELS,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

function setLocaleCookie(locale: Locale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);

  async function setLocale(next: Locale) {
    if (next === locale || pending) return;
    setPending(true);

    // Cookie immédiat (middleware + SSR)
    setLocaleCookie(next);

    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
        cache: "no-store",
      });
    } catch {
      /* cookie client déjà posé */
    }

    // Reload complet : header/menu/footer + pages serveur se rechargent
    // avec le bon dictionnaire (force-dynamic + cookie).
    const target = pathname && pathname.length > 0 ? pathname : "/";
    window.location.assign(target);
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-border bg-card p-0.5 text-xs font-semibold",
        pending && "pointer-events-none opacity-70",
        className
      )}
      role="group"
      aria-label={
        locale === "en"
          ? "Language"
          : locale === "pt-BR"
            ? "Idioma"
            : "Langue"
      }
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          disabled={pending}
          onClick={() => setLocale(code)}
          className={cn(
            "rounded-md px-2 py-1 transition-colors",
            locale === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
