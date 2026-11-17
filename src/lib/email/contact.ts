import { emailConfig } from "./config";
import { sendEmail } from "./send";
import { isValidEmail } from "./utils";
import { buildContactNotificationEmail } from "./templates/contact-notification";
import { buildContactAutoReplyEmail } from "./templates/contact-auto-reply";
import type { ContactFormType, ContactPayload, SendEmailResult } from "./types";

export type ContactValidationError = {
  field?: string;
  message: string;
};

export type ProcessContactResult =
  | {
      ok: true;
      simulated?: boolean;
      notificationId: string;
      autoReplyId?: string;
    }
  | {
      ok: false;
      status: number;
      error: string;
      field?: string;
    };

/**
 * Valide et normalise le payload formulaire contact / lead.
 */
export function parseContactPayload(body: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string; field?: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Requête invalide." };
  }

  const raw = body as Record<string, unknown>;
  const name = String(raw.name ?? "").trim();
  const email = String(raw.email ?? "").trim().toLowerCase();
  const phone = String(raw.phone ?? "").trim();
  const message = String(raw.message ?? "").trim();
  const type: ContactFormType = raw.type === "lead" ? "lead" : "contact";

  // Honeypot anti-spam (champ caché côté form si ajouté)
  if (raw.website || raw.company_url || raw.honeypot) {
    return { ok: false, error: "Requête rejetée.", field: "honeypot" };
  }

  if (name.length < 2 || name.length > 100) {
    return {
      ok: false,
      error: "Veuillez indiquer un nom valide.",
      field: "name",
    };
  }

  if (!email || !isValidEmail(email)) {
    return {
      ok: false,
      error: "Veuillez indiquer un email valide.",
      field: "email",
    };
  }

  if (message.length < 5 || message.length > 5000) {
    return {
      ok: false,
      error: "Veuillez écrire un message un peu plus détaillé.",
      field: "message",
    };
  }

  if (phone && phone.length > 40) {
    return {
      ok: false,
      error: "Numéro de téléphone trop long.",
      field: "phone",
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone: phone || undefined,
      message,
      type,
    },
  };
}

/**
 * Pipeline complet :
 * 1. Notification à l'équipe
 * 2. Auto-reply au visiteur (si activé)
 */
export async function processContactForm(
  payload: ContactPayload
): Promise<ProcessContactResult> {
  const notification = buildContactNotificationEmail(payload);

  const notifyResult = await sendEmail({
    to: emailConfig.to,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo: payload.email,
    tags: [
      { name: "category", value: "form" },
      { name: "form_type", value: payload.type },
    ],
  });

  if (!notifyResult.ok) {
    return {
      ok: false,
      status: 502,
      error: "Impossible d'envoyer le message pour le moment.",
    };
  }

  let autoReplyResult: SendEmailResult | undefined;

  if (emailConfig.autoReplyEnabled) {
    const autoReply = buildContactAutoReplyEmail(payload);
    autoReplyResult = await sendEmail({
      to: payload.email,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
      tags: [
        { name: "category", value: "auto-reply" },
        { name: "form_type", value: payload.type },
      ],
    });

    // L'auto-reply ne doit pas faire échouer le flux principal
    if (!autoReplyResult.ok) {
      console.warn("[email] Auto-reply failed:", autoReplyResult.error);
    }
  }

  return {
    ok: true,
    simulated: notifyResult.simulated,
    notificationId: notifyResult.id,
    autoReplyId:
      autoReplyResult && autoReplyResult.ok ? autoReplyResult.id : undefined,
  };
}
