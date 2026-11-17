import type { Metadata } from "next";
import { AffiliateStatsRedirect } from "@/components/affiliate/AffiliateStatsRedirect";

export const metadata: Metadata = {
  title: "Sign up | Smart Forex Pro",
  robots: { index: false, follow: false },
};

/**
 * Intermediate affiliation hop (EN):
 * RoboForex referral cookie → copy-trading offer.
 */
export default function GoSignUpPage() {
  return (
    <AffiliateStatsRedirect
      loadingTitle="Setting up your access…"
      loadingSubtitle="Secure redirect in progress. Please keep this page open."
      continueLabel="Continue to sign up"
    />
  );
}
