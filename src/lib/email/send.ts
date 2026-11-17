import { emailConfig } from "./config";
import { getResendClient } from "./resend";
import { htmlToPlainText } from "./utils";
import type { SendEmailInput, SendEmailResult } from "./types";

/**
 * Envoie un email via Resend.
 * En dev sans API key : log console + succès simulé (ne bloque pas les tests locaux).
 */
export async function sendEmail(
  input: SendEmailInput
): Promise<SendEmailResult> {
  const to = Array.isArray(input.to) ? input.to : [input.to];
  const html = input.html;
  const text = input.text || htmlToPlainText(html);

  const resend = getResendClient();

  if (!resend) {
    if (emailConfig.isProduction) {
      console.error("[email] RESEND_API_KEY manquante en production");
      return {
        ok: false,
        error: "Service email non configuré.",
      };
    }

    console.info("[email] Simulation (pas de RESEND_API_KEY):", {
      from: emailConfig.from,
      to,
      subject: input.subject,
      replyTo: input.replyTo,
      tags: input.tags,
      preview: text.slice(0, 200),
    });

    return { ok: true, id: `sim_${Date.now()}`, simulated: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      subject: input.subject,
      html,
      text,
      replyTo: input.replyTo,
      tags: input.tags,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return {
        ok: false,
        error: error.message || "Échec de l'envoi Resend.",
      };
    }

    return { ok: true, id: data?.id || "unknown" };
  } catch (err) {
    console.error("[email] Unexpected send error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Erreur d'envoi inattendue.",
    };
  }
}
