import type { Metadata } from "next";
import { SITE } from "./constants";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = path === "" || path === "/" ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.description,
    areaServed: "Worldwide",
    sameAs: [],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Copy trading Forex professionnel",
    provider: {
      "@type": "Organization",
      name: SITE.name,
    },
    description: SITE.description,
    areaServed: "Worldwide",
    serviceType: "Forex copy trading",
  };
}

export function faqJsonLd(
  items: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
