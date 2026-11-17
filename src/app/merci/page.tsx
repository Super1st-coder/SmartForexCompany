import type { Metadata } from "next";
import { ThankYouView } from "@/components/shared/ThankYouView";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "fr" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = {
  ...buildMetadata({
    title: dict.thankYou.metaTitle,
    description: dict.thankYou.metaDescription,
    path: "/merci",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerciPage() {
  return <ThankYouView locale={locale} dict={dict} />;
}
