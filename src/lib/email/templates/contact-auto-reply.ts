import { SITE, getWhatsAppUrl } from "@/lib/constants";
import type { ContactPayload } from "../types";
import { escapeHtml } from "../utils";
import { emailLayout } from "./layout";

/**
 * Email de confirmation → visiteur
 * (accusé de réception après envoi du formulaire)
 */
export function buildContactAutoReplyEmail(payload: ContactPayload) {
  const subject = `Nous avons bien reçu votre message, ${SITE.name}`;
  const whatsappUrl = getWhatsAppUrl();

  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#0f172a;">
      Merci, ${escapeHtml(payload.name)}
    </h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
      Votre message a bien été transmis à l'équipe <strong>${escapeHtml(SITE.name)}</strong>.
      Nous vous répondrons dans les plus brefs délais (généralement sous 24 à 48&nbsp;h ouvrées).
    </p>

    <div style="padding:14px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;margin-bottom:20px;">
      <p style="margin:0;font-size:13px;line-height:1.5;color:#1e40af;">
        En attendant, vous pouvez aussi nous écrire directement sur WhatsApp pour un échange plus rapide.
      </p>
    </div>

    <p style="margin:0 0 20px;">
      <a href="${escapeHtml(whatsappUrl)}"
         style="display:inline-block;padding:12px 20px;background:#25D366;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:14px;">
        Ouvrir WhatsApp
      </a>
    </p>

    <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
      À bientôt,<br/>
      L'équipe ${escapeHtml(SITE.name)}
    </p>
  `;

  const html = emailLayout({
    title: subject,
    preheader: "Votre message a bien été reçu. Nous vous recontactons rapidement.",
    bodyHtml,
  });

  const text = [
    `Merci, ${payload.name}`,
    "",
    `Votre message a bien été transmis à l'équipe ${SITE.name}.`,
    "Nous vous répondrons sous 24 à 48 h ouvrées.",
    "",
    `WhatsApp: ${SITE.phone}`,
    whatsappUrl,
    "",
    `${SITE.name}`,
  ].join("\n");

  return { subject, html, text };
}
