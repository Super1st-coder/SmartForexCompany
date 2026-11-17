import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const routes = [
  "",
  "/contato",
  "/get-started",
  "/a-propos",
  "/performances",
  "/comment-ca-marche",
  "/tarifs",
  "/faq",
  "/contact",
  "/nous-contacter",
  "/mentions-legales",
  "/politique-de-confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency:
      path === "" ||
      path === "/contato" ||
      path === "/contact" ||
      path === "/get-started" ||
      path === "/performances"
        ? "weekly"
        : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/contato" || path === "/contact" || path === "/get-started"
          ? 0.95
          : path === "/tarifs" || path === "/nous-contacter"
            ? 0.9
            : 0.7,
  }));
}
