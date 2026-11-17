"use client";

import { BarChart3 } from "lucide-react";
import { AFFILIATE } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Libellé du bouton (PT par défaut) */
  label?: string;
  /** URL stats (défaut : FX Blue) */
  href?: string;
  /** Variante visuelle */
  variant?: "primary" | "outline" | "ghost-neon";
  size?: "default" | "lg";
  /** Ouvrir dans un nouvel onglet (défaut true pour FX Blue externe) */
  external?: boolean;
};

/**
 * Bouton stats → page FX Blue publique (vérifiable).
 */
export function VoirLesStatistiquesButton({
  className,
  label = "View statistics",
  href = AFFILIATE.statsUrl,
  variant = "outline",
  size = "default",
  external = true,
}: Props) {
  const sizeCls =
    size === "lg"
      ? "min-h-12 px-6 py-3.5 text-base sm:text-lg"
      : "min-h-11 px-5 py-2.5 text-sm sm:text-base";

  const variantCls =
    variant === "primary"
      ? "ln-cta ln-cta-pulse text-[#041018]"
      : variant === "ghost-neon"
        ? "border border-[rgba(0,245,255,0.45)] bg-[rgba(0,245,255,0.08)] text-[var(--ln-cyan)] shadow-[0_0_24px_rgba(0,245,255,0.15)] hover:bg-[rgba(0,245,255,0.14)] hover:shadow-[0_0_32px_rgba(0,245,255,0.28)]"
        : "border border-[rgba(245,197,24,0.45)] bg-[rgba(245,197,24,0.08)] text-[var(--ln-gold)] shadow-[0_0_20px_rgba(245,197,24,0.12)] hover:border-[rgba(245,197,24,0.7)] hover:bg-[rgba(245,197,24,0.14)] hover:shadow-[0_0_28px_rgba(245,197,24,0.22)]";

  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 active:scale-[0.98] sm:w-auto",
        sizeCls,
        variantCls,
        className
      )}
    >
      <BarChart3 className="h-5 w-5 shrink-0" aria-hidden />
      {label}
    </a>
  );
}
