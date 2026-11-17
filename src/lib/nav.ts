import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { NAV_HREFS } from "@/lib/constants";

export type NavLink = {
  href: string;
  key: (typeof NAV_HREFS)[number]["key"];
  label: string;
};

/** Liens de menu avec libellés traduits selon le dictionnaire. */
export function getNavLinks(dict: Dictionary): NavLink[] {
  return NAV_HREFS.map((item) => ({
    href: item.href,
    key: item.key,
    label: dict.nav[item.key],
  }));
}

/** Message aria du bouton menu mobile. */
export function getMenuAriaLabels(locale: Locale): {
  open: string;
  close: string;
} {
  if (locale === "en") {
    return { open: "Open menu", close: "Close menu" };
  }
  if (locale === "pt-BR") {
    return { open: "Abrir menu", close: "Fechar menu" };
  }
  return { open: "Ouvrir le menu", close: "Fermer le menu" };
}
