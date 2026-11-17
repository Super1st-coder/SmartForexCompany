import { DEFAULT_LOCALE, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/fr";
import fr from "./dictionaries/fr";
import en from "./dictionaries/en";
import ptBR from "./dictionaries/pt-BR";

const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en,
  "pt-BR": ptBR,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
