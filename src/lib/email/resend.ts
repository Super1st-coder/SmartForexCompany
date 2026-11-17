import { Resend } from "resend";
import { emailConfig } from "./config";

/**
 * Client Resend singleton (lazy).
 * Retourne null si RESEND_API_KEY n'est pas définie (mode dev / simulation).
 */
let client: Resend | null | undefined;

export function getResendClient(): Resend | null {
  if (client !== undefined) return client;

  if (!emailConfig.apiKey) {
    client = null;
    return client;
  }

  client = new Resend(emailConfig.apiKey);
  return client;
}
