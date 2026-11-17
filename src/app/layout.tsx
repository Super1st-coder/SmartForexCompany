import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { SITE } from "@/lib/constants";
import { buildMetadata, organizationJsonLd, serviceJsonLd } from "@/lib/seo";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeTag } from "@/i18n/config";
import "./globals.css";

/** Locale via cookie/header — rendu dynamique obligatoire pour tout le site. */
export const dynamic = "force-dynamic";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return {
    ...buildMetadata({
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      path: "/",
    }),
    keywords: [
      "AI forex trading",
      "AI signal filtering",
      "copy trading",
      "copy trading forex",
      "forex trading management",
      "smart forex pro",
      "forex risk management",
    ],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const lang = localeTag(locale);
  const h = await headers();
  const pathname = h.get("x-sfp-pathname") ?? "";
  const isContatoLanding =
    pathname === "/contato" || pathname.startsWith("/contato/");
  const isObrigadoLanding =
    pathname === "/obrigado" || pathname.startsWith("/obrigado/");
  const isMerciLanding =
    pathname === "/merci" || pathname.startsWith("/merci/");
  const isThankYouLanding =
    pathname === "/thank-you" || pathname.startsWith("/thank-you/");
  const isContactLanding =
    pathname === "/contact" || pathname.startsWith("/contact/");
  const isGetStartedLanding =
    pathname === "/get-started" || pathname.startsWith("/get-started/");
  const isGoFr =
    pathname === "/go/statistiques" ||
    pathname.startsWith("/go/statistiques/");
  const isGoPt =
    pathname === "/go/estatisticas" ||
    pathname.startsWith("/go/estatisticas/");
  const isGoEn =
    pathname === "/go/sign-up" || pathname.startsWith("/go/sign-up/");
  const isGoLanding =
    isGoFr || isGoPt || isGoEn || pathname.startsWith("/go/");
  const isLanding =
    isContatoLanding ||
    isObrigadoLanding ||
    isMerciLanding ||
    isThankYouLanding ||
    isContactLanding ||
    isGetStartedLanding ||
    isGoLanding;
  const landingLang =
    isContactLanding || isMerciLanding || isGoFr
      ? "fr"
      : isContatoLanding || isObrigadoLanding || isGoPt
        ? "pt-BR"
        : isThankYouLanding || isGetStartedLanding || isGoEn
          ? "en"
          : lang;

  return (
    <html
      lang={landingLang}
      className={`${inter.variable} ${geist.variable}${isLanding ? " dark" : ""}`}
      suppressHydrationWarning
    >
      <head>
        {!isLanding ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
            }}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd()),
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <MetaPixel />
        {isLanding ? (
          <main className="min-h-screen">{children}</main>
        ) : (
          <>
            <Header key={`hdr-${locale}`} locale={locale} dict={dict} />
            <main className="min-h-[70vh]">{children}</main>
            <Footer key={`ftr-${locale}`} dict={dict} />
          </>
        )}
      </body>
    </html>
  );
}
