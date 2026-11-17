import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl md:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge ? (
        <Badge variant="default" className="mb-4">
          {badge}
        </Badge>
      ) : null}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
