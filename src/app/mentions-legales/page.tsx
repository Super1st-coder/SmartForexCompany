import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${SITE.domain}, Smart Forex Pro.`,
  path: "/mentions-legales",
});

export default function LegalPage() {
  return (
    <>
      <PageHero badge="Légal" title="Mentions légales" />
      <section className="section-padding">
        <div className="container-page prose prose-slate max-w-3xl space-y-8 text-muted-foreground">
          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              Éditeur du site
            </h2>
            <p>
              Le site <strong>{SITE.domain}</strong> est édité par{" "}
              <strong>{SITE.name}</strong>.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>Email : {SITE.email}</li>
              <li>Téléphone : {SITE.phone}</li>
              <li>Zone d’activité : Internationale</li>
            </ul>
            <p className="mt-3 text-sm">
              Les informations d’identification complètes (raison sociale,
              numéro IDE, adresse) seront finalisées avant la mise en production
              publique.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              Hébergement
            </h2>
            <p className="text-sm">
              Le site est conçu pour un déploiement moderne (ex. Vercel ou
              équivalent). Les détails d’hébergement figureront sur cette page
              lors de la mise en ligne.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              Propriété intellectuelle
            </h2>
            <p className="text-sm leading-relaxed">
              L’ensemble des contenus présents sur ce site (textes, graphismes,
              logos, structure) est protégé. Toute reproduction non autorisée
              est interdite.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              Avertissement trading
            </h2>
            <p className="text-sm leading-relaxed">
              Le trading de devises, CFD et instruments financiers comporte un
              risque élevé de perte en capital. Les informations et services de
              copy trading présentés par {SITE.name} sont à caractère éducatif et
              informatif. Ils ne constituent pas un conseil en investissement
              personnalisé. Les performances passées ne garantissent pas les
              résultats futurs. Vous êtes seul responsable de vos décisions de
              trading.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              Contact
            </h2>
            <p className="text-sm">
              Pour toute question relative aux présentes mentions :{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-primary hover:underline"
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
