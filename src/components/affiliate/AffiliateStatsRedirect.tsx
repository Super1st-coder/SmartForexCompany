"use client";

import { useEffect, useRef, useState } from "react";
import { AFFILIATE } from "@/lib/affiliate";

type Props = {
  /** Textes d’attente / fallback (PT par défaut) */
  loadingTitle?: string;
  loadingSubtitle?: string;
  continueLabel?: string;
  /** Destination après pose du cookie (défaut : offre RoboForex) */
  destinationUrl?: string;
};

/**
 * Page intermédiaire :
 * 1) charge le referral RoboForex (cookie)
 * 2) redirige vers l’offre copy trading
 */
export function AffiliateStatsRedirect({
  loadingTitle = "Setting up your access…",
  loadingSubtitle = "Secure redirect in progress. Please keep this page open.",
  continueLabel = "Continue to sign up",
  destinationUrl = AFFILIATE.offerUrl,
}: Props = {}) {
  const started = useRef(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let cancelled = false;
    const timers: number[] = [];

    const go = () => {
      if (cancelled) return;
      window.location.replace(destinationUrl);
    };

    // 1) Pixel image (tracking classique)
    const img = new Image();
    img.referrerPolicy = "no-referrer-when-downgrade";
    img.src = AFFILIATE.visitUrl;

    // 2) Iframe cachée (meilleure chance de poser le cookie)
    const iframe = document.createElement("iframe");
    iframe.src = AFFILIATE.visitUrl;
    iframe.title = "affiliate-track";
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.style.cssText =
      "position:absolute;width:1px;height:1px;left:-9999px;top:0;border:0;opacity:0;pointer-events:none";
    document.body.appendChild(iframe);

    // 3) Fallback si le tracking est lent / bloqué
    timers.push(
      window.setTimeout(go, AFFILIATE.redirectDelayMs),
      window.setTimeout(() => {
        if (!cancelled) setError(true);
      }, 4000)
    );

    img.onload = () => {
      /* délai géré par setTimeout principal */
    };
    img.onerror = () => {
      /* on redirige quand même après le délai */
    };

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      iframe.remove();
    };
  }, [destinationUrl]);

  return (
    <div className="landing-neon flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="ln-glass max-w-md rounded-3xl p-8 sm:p-10">
        <div
          className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-[rgba(0,245,255,0.25)] border-t-[var(--ln-cyan)]"
          aria-hidden
        />
        <p className="font-display text-lg font-semibold text-white">
          {loadingTitle}
        </p>
        <p className="mt-2 text-sm text-[var(--ln-muted)]">
          {loadingSubtitle}
        </p>
        {error ? (
          <a
            href={destinationUrl}
            className="ln-cta mt-6 inline-flex rounded-xl px-5 py-3 text-sm"
          >
            {continueLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}
