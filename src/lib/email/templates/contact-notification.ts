import { SITE } from "@/lib/constants";
import type { ContactPayload } from "../types";
import { escapeHtml, textToHtml } from "../utils";
import { emailLayout } from "./layout";

const TYPE_LABELS = {
  contact: "Message de contact",
  lead: "Demande d'informations (lead)",
} as const;

/**
 * Email interne → équipe Smart Forex Pro
 * (nouveau contact ou lead depuis le site)
 */
export function buildContactNotificationEmail(payload: ContactPayload) {
  const typeLabel = TYPE_LABELS[payload.type];
  const subject =
    payload.type === "lead"
      ? `[Lead] ${payload.name} : demande d'infos`
      : `[Contact] ${payload.name} : nouveau message`;

  const bodyHtml = `
    <h1 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#0f172a;">
      ${escapeHtml(typeLabel)}
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:#64748b;">
      Reçu via le site ${escapeHtml(SITE.domain)}
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="padding:12px 16px;background:#f8fafc;font-size:12px;color:#64748b;width:120px;">Nom</td>
        <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#0f172a;">${escapeHtml(payload.name)}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;background:#f8fafc;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;">Email</td>
        <td style="padding:12px 16px;font-size:14px;border-top:1px solid #e2e8f0;">
          <a href="mailto:${escapeHtml(payload.email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(payload.email)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;background:#f8fafc;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;">Téléphone</td>
        <td style="padding:12px 16px;font-size:14px;color:#0f172a;border-top:1px solid #e2e8f0;">${escapeHtml(payload.phone || "n/d")}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;background:#f8fafc;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;">Type</td>
        <td style="padding:12px 16px;font-size:14px;color:#0f172a;border-top:1px solid #e2e8f0;">${escapeHtml(typeLabel)}</td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#64748b;">
      Message
    </p>
    <div style="padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;font-size:14px;line-height:1.6;color:#0f172a;">
      ${textToHtml(payload.message)}
    </div>

    <p style="margin:20px 0 0;font-size:13px;">
      <a href="mailto:${escapeHtml(payload.email)}?subject=${encodeURIComponent(`Re: ${SITE.name}`)}"
         style="display:inline-block;padding:10px 18px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:13px;">
        Répondre à ${escapeHtml(payload.name)}
      </a>
    </p>
  `;

  const html = emailLayout({
    title: subject,
    preheader: `${payload.name} : ${typeLabel}`,
    bodyHtml,
  });

  const text = [
    typeLabel,
    "",
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    `Téléphone: ${payload.phone || "n/d"}`,
    `Type: ${payload.type}`,
    "",
    "Message:",
    payload.message,
    "",
    `${SITE.domain}`,
  ].join("\n");

  return { subject, html, text };
}
