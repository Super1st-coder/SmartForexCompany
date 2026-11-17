import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE, getWhatsAppUrl } from "@/lib/constants";
import { Logo } from "@/components/shared/Logo";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { getNavLinks } from "@/lib/nav";

export function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();
  const links = getNavLinks(dict);

  return (
    <footer className="border-t border-border bg-slate-900 text-slate-300">
      <div className="container-page section-padding !pb-10 !pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="mb-4" variant="light" />
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {dict.footer.blurb}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.nav}
            </h3>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.legal}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {dict.footer.legalMentions}
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {dict.nav.faq}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.contact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-slate-400">{dict.contact.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-center text-xs leading-relaxed text-slate-500">
            © {year} {SITE.name}. {dict.footer.rights}
            <br />
            {dict.footer.risk}
          </p>
        </div>
      </div>
    </footer>
  );
}
