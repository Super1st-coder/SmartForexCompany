import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/FadeIn";

type PageHeroProps = {
  badge?: string;
  title: string;
  description?: string;
};

export function PageHero({ badge, title, description }: PageHeroProps) {
  return (
    <section className="gradient-hero border-b border-border pt-24 md:pt-28">
      <div className="container-page py-12 md:py-16">
        <FadeIn>
          {badge ? (
            <Badge className="mb-4">{badge}</Badge>
          ) : null}
          <h1 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
