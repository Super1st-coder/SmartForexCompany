export const SITE = {
  name: "Smart Forex Pro",
  domain: "smartforexpro.com",
  url: "https://smartforexpro.com",
  email: "contact@smartforexpro.com",
  phone: "+41 77 946 32 33",
  phoneE164: "+41779463233",
  locale: "pt_BR",
  tagline: "Trading Forex filtrado por IA",
  description:
    "Copy trading e gestão de trading Forex com filtragem de sinais por IA. Estratégia aprimorada ao longo de 3 anos, performance verificável ao vivo, gestão de risco rigorosa.",
} as const;

/** Meta (Facebook) Pixel ID — tracking site-wide */
export const META_PIXEL_ID = "1043755965237132";

export const WHATSAPP_MESSAGE =
  "Olá, gostaria de saber mais sobre o copy trading Smart Forex Pro.";

export function getWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${SITE.phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export const NAV_HREFS = [
  { href: "/", key: "home" as const },
  { href: "/a-propos", key: "about" as const },
  { href: "/performances", key: "performances" as const },
  { href: "/comment-ca-marche", key: "how" as const },
  { href: "/tarifs", key: "pricing" as const },
  { href: "/faq", key: "faq" as const },
  { href: "/nous-contacter", key: "contact" as const },
] as const;
