import type { Metadata } from "next";
import { AffiliateStatsRedirect } from "@/components/affiliate/AffiliateStatsRedirect";

export const metadata: Metadata = {
  title: "Inscription | Smart Forex Pro",
  robots: { index: false, follow: false },
};

/**
 * Intermediate affiliation hop (FR):
 * RoboForex referral cookie → copy-trading offer.
 */
export default function GoStatistiquesPage() {
  return (
    <AffiliateStatsRedirect
      loadingTitle="Préparation de votre accès…"
      loadingSubtitle="Redirection sécurisée en cours. Ne fermez pas cette page."
      continueLabel="Continuer vers l’inscription"
    />
  );
}
