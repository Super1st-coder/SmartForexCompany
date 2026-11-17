import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données, ${SITE.name}.`,
  path: "/politique-de-confidentialite",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        badge="Légal"
        title="Politique de confidentialité"
        description="Comment nous collectons, utilisons et protégeons vos données personnelles."
      />
      <section className="section-padding">
        <div className="container-page max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              1. Responsable du traitement
            </h2>
            <p>
              {SITE.name} ({SITE.email}) est responsable du traitement des
              données collectées via le site {SITE.domain}.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              2. Données collectées
            </h2>
            <p>Nous pouvons collecter :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Identité : nom, prénom</li>
              <li>Coordonnées : email, téléphone</li>
              <li>Contenu des messages envoyés via les formulaires</li>
              <li>
                Données techniques de base (logs serveur, type de navigateur)
                nécessaires au fonctionnement du site
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              3. Finalités
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Répondre à vos demandes de contact ou d’information</li>
              <li>Gérer la relation client et l’accès aux services</li>
              <li>Améliorer le site et la sécurité</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              4. Base légale
            </h2>
            <p>
              Selon le cas : consentement (formulaires), exécution d’un contrat
              ou mesures précontractuelles, intérêt légitime (sécurité, amélioration
              du service), obligation légale.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              5. Destinataires & sous-traitants
            </h2>
            <p>
              Vos messages de contact peuvent être transmis via le service
              d’emailing Resend. Nous ne vendons pas vos données à des tiers.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              6. Durée de conservation
            </h2>
            <p>
              Les données de contact sont conservées le temps nécessaire au
              traitement de votre demande, puis archivées selon les délais légaux
              applicables, ou supprimées sur demande lorsque la loi le permet.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              7. Vos droits
            </h2>
            <p>
              Conformément à la réglementation applicable en matière de protection des données (notamment RGPD le cas échéant),
              vous disposez d’un droit d’accès, de rectification, d’effacement,
              de limitation et d’opposition. Pour exercer ces droits :{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-primary hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              8. Cookies
            </h2>
            <p>
              Le site peut utiliser des cookies techniques strictement
              nécessaires. D’éventuels cookies analytiques ne seront activés
              qu’avec votre consentement si mis en place.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
              9. Mise à jour
            </h2>
            <p>
              Cette politique peut être mise à jour. Dernière mise à jour : août
              2026.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
