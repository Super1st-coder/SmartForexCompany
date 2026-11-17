import type { Metadata } from "next";
import { AffiliateStatsRedirect } from "@/components/affiliate/AffiliateStatsRedirect";

export const metadata: Metadata = {
  title: "Inscrição | Smart Forex Pro",
  robots: { index: false, follow: false },
};

/**
 * Intermediate affiliation hop (PT):
 * RoboForex referral cookie → copy-trading offer.
 */
export default function GoEstatisticasPage() {
  return (
    <AffiliateStatsRedirect
      loadingTitle="Preparando o seu acesso…"
      loadingSubtitle="Redirecionamento seguro em andamento. Não feche esta página."
      continueLabel="Continuar para a inscrição"
    />
  );
}
