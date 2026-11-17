import type { Metadata } from "next";
import { ThankYouView } from "@/components/shared/ThankYouView";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "pt-BR" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = {
  ...buildMetadata({
    title: dict.thankYou.metaTitle,
    description: dict.thankYou.metaDescription,
    path: "/obrigado",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function ObrigadoPage() {
  return <ThankYouView locale={locale} dict={dict} />;
}
