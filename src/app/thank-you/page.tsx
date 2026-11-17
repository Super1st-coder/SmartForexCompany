import type { Metadata } from "next";
import { ThankYouView } from "@/components/shared/ThankYouView";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "en" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = {
  ...buildMetadata({
    title: dict.thankYou.metaTitle,
    description: dict.thankYou.metaDescription,
    path: "/thank-you",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <ThankYouView locale={locale} dict={dict} />;
}
