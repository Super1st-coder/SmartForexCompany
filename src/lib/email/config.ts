import { SITE } from "@/lib/constants";

/** Destinataires par défaut de chaque lead / contact (notification équipe) */
export const DEFAULT_CONTACT_RECIPIENTS = [
  "contact@smartforexpro.com",
  "smaylle10@gmail.com",
] as const;

/**
 * Parse une liste d'emails (séparateur virgule ou point-virgule).
 */
function parseEmailList(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split(/[,;]/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.includes("@"));
}

/**
 * Configuration email Resend.
 * Variables d'environnement documentées dans `.env.example`.
 */
export const emailConfig = {
  /** Clé API Resend (obligatoire en production) */
  get apiKey() {
    return process.env.RESEND_API_KEY?.trim() || "";
  },

  /** Expéditeur vérifié chez Resend — format: "Nom <email@domaine.com>" */
  get from() {
    return (
      process.env.RESEND_FROM_EMAIL?.trim() ||
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "Smart Forex Pro <contact@smartforexpro.com>"
    );
  },

  /**
   * Destinataires des formulaires contact / leads (tous reçoivent chaque entrée).
   * RESEND_TO_EMAIL / CONTACT_TO_EMAIL : liste séparée par des virgules.
   * Défaut : contact@smartforexpro.com + smaylle10@gmail.com
   */
  get to(): string[] {
    const fromEnv = parseEmailList(
      process.env.RESEND_TO_EMAIL || process.env.CONTACT_TO_EMAIL
    );
    if (fromEnv.length > 0) {
      // Toujours garantir la copie Gmail si absente de l'env
      const set = new Set(fromEnv);
      if (!set.has("smaylle10@gmail.com")) {
        set.add("smaylle10@gmail.com");
      }
      if (!set.has(SITE.email.toLowerCase())) {
        set.add(SITE.email.toLowerCase());
      }
      return Array.from(set);
    }
    return [...DEFAULT_CONTACT_RECIPIENTS];
  },

  /**
   * Envoie une confirmation automatique au visiteur.
   * Désactiver avec RESEND_AUTO_REPLY=false
   */
  get autoReplyEnabled() {
    const v = process.env.RESEND_AUTO_REPLY?.trim().toLowerCase();
    if (v === "false" || v === "0" || v === "off") return false;
    return true;
  },

  get isConfigured() {
    return Boolean(this.apiKey);
  },

  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
} as const;
