"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/shared/LeadModal";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { getMenuAriaLabels, getNavLinks } from "@/lib/nav";

export function Header({
  locale,
  dict: dictProp,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  // Toujours dériver le dict de la locale (évite un menu figé si les props RSC tardent)
  const dict = useMemo(() => getDictionary(locale) ?? dictProp, [locale, dictProp]);
  const links = useMemo(() => getNavLinks(dict), [dict]);
  const aria = useMemo(() => getMenuAriaLabels(locale), [locale]);

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      key={`header-${locale}`}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-border/80 bg-card/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-page flex h-16 min-w-0 items-center justify-between gap-2 md:h-[4.25rem]">
        <Logo className="min-w-0 shrink" textClassName="max-[380px]:hidden" />

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
          aria-label={dict.footer.nav}
        >
          {links
            .filter((l) => l.href !== "/")
            .map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <LeadModal
            triggerLabel={dict.common.learnMore}
            triggerSize="default"
            triggerVariant="ghost"
            locale={locale}
          />
        </div>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1 lg:hidden">
          <LanguageSwitcher
            locale={locale}
            className="text-[0.65rem] sm:text-xs [&_button]:px-1.5 [&_button]:py-0.5 sm:[&_button]:px-2 sm:[&_button]:py-1"
          />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-label={mobileOpen ? aria.close : aria.open}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <button
        type="button"
        aria-label={aria.close}
        className={cn(
          "fixed inset-0 top-16 z-40 bg-foreground/20 backdrop-blur-[2px] transition-opacity md:top-[4.25rem] lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
        tabIndex={mobileOpen ? 0 : -1}
      />

      <div
        id="mobile-nav"
        className={cn(
          "absolute inset-x-0 top-full z-50 max-h-[min(100dvh-4rem,32rem)] overflow-y-auto overscroll-contain border-b border-border bg-card shadow-lg transition-[visibility,opacity,transform] duration-200 md:max-h-[min(100dvh-4.25rem,36rem)] lg:hidden",
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <nav
          className="container-page flex flex-col gap-1 py-4"
          aria-label={dict.footer.nav}
        >
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
            <LeadModal
              triggerLabel={dict.common.learnMore}
              triggerSize="lg"
              className="w-full"
              locale={locale}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
