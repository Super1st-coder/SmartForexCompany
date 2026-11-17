import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
  /** Show brand name next to the mark */
  withText?: boolean;
  /** Extra classes on the brand name (e.g. hide on xs) */
  textClassName?: string;
  /** Footer / dark backgrounds */
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { box: "h-8 w-8", img: 32, text: "text-base" },
  md: { box: "h-9 w-9", img: 36, text: "text-lg" },
  lg: { box: "h-11 w-11", img: 44, text: "text-xl" },
} as const;

export function Logo({
  href = "/",
  className,
  withText = true,
  textClassName,
  variant = "default",
  size = "md",
}: LogoProps) {
  const s = sizes[size];
  const textTone =
    variant === "light"
      ? "text-white"
      : "text-foreground";

  const content = (
    <>
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-xl shadow-sm shadow-primary/20 ring-1 ring-border/60",
          s.box
        )}
      >
        <Image
          src="/logo-smartforexpro.png"
          alt="Smart Forex Pro"
          width={s.img}
          height={s.img}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {withText ? (
        <span
          className={cn(
            "font-display font-bold tracking-tight",
            s.text,
            textTone,
            textClassName
          )}
        >
          Smart Forex{" "}
          <span className={variant === "light" ? "text-blue-400" : "text-primary"}>
            Pro
          </span>
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      {content}
    </Link>
  );
}
