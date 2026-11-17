import { SITE } from "@/lib/constants";
import { escapeHtml } from "../utils";

type LayoutOptions = {
  title: string;
  preheader?: string;
  bodyHtml: string;
};

/**
 * Layout HTML email responsive (compatible clients majeurs).
 * Design aligné Smart Forex Pro : fond clair, accent bleu.
 */
export function emailLayout({ title, preheader = "", bodyHtml }: LayoutOptions): string {
  const safeTitle = escapeHtml(title);
  const safePreheader = escapeHtml(preheader);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;color:#0f172a;">
  ${
    safePreheader
      ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safePreheader}</div>`
      : ""
  }
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#1e40af 0%,#2563eb 100%);padding:20px 28px;">
              <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                ${escapeHtml(SITE.name)}
              </p>
              <p style="margin:4px 0 0;font-size:12px;color:#bfdbfe;">
                ${escapeHtml(SITE.tagline)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px;border-top:1px solid #e2e8f0;background:#f8fafc;">
              <p style="margin:0;font-size:11px;line-height:1.5;color:#64748b;">
                ${escapeHtml(SITE.name)} ·
                <a href="https://${SITE.domain}" style="color:#2563eb;text-decoration:none;">${SITE.domain}</a>
                · ${escapeHtml(SITE.phone)}
              </p>
              <p style="margin:8px 0 0;font-size:11px;line-height:1.5;color:#94a3b8;">
                Message automatique. Ne pas répondre à cette adresse si elle est no-reply.
                Le trading comporte un risque de perte en capital.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
