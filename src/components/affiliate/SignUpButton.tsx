"use client";

import { UserPlus } from "lucide-react";
import { getAffiliateSignupPath } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  label?: string;
  /** Route intermédiaire cookie (défaut EN) */
  href?: string;
  locale?: "en" | "fr" | "pt-BR";
  variant?: "primary" | "outline" | "ghost-neon";
  size?: "default" | "lg";
};

/**
 * Bouton inscription → page intermédiaire cookie RoboForex → offre copy.
 */
export function SignUpButton({
  className,
  label = "Sign up",
  href,
  locale = "en",
  variant = "primary",
  size = "default",
}: Props) {
  const target = href ?? getAffiliateSignupPath(locale);

  const sizeCls =
    size === "lg"
      ? "min-h-12 px-6 py-3.5 text-base sm:text-lg"
      : "min-h-11 px-5 py-2.5 text-sm sm:text-base";

  const variantCls =
    variant === "primary"
      ? "ln-cta ln-cta-pulse text-[#041018]"
      : variant === "ghost-neon"
        ? "border border-[rgba(0,245,255,0.45)] bg-[rgba(0,245,255,0.08)] text-[var(--ln-cyan)] shadow-[0_0_24px_rgba(0,245,255,0.15)] hover:bg-[rgba(0,245,255,0.14)] hover:shadow-[0_0_32px_rgba(0,245,255,0.28)]"
        : "border border-[rgba(0,255,157,0.45)] bg-[rgba(0,255,157,0.08)] text-[var(--ln-green)] shadow-[0_0_20px_rgba(0,255,157,0.12)] hover:border-[rgba(0,255,157,0.7)] hover:bg-[rgba(0,255,157,0.14)] hover:shadow-[0_0_28px_rgba(0,255,157,0.22)]";

  return (
    <a
      href={target}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 active:scale-[0.98] sm:w-auto",
        sizeCls,
        variantCls,
        className
      )}
    >
      <UserPlus className="h-5 w-5 shrink-0" aria-hidden />
      {label}
    </a>
  );
}
