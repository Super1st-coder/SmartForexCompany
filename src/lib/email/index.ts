/**
 * Module email Resend — Smart Forex Pro
 *
 * Usage :
 *   import { processContactForm, parseContactPayload, sendEmail } from "@/lib/email";
 *
 * Config (.env.local) :
 *   RESEND_API_KEY=
 *   RESEND_FROM_EMAIL=Smart Forex Pro <contact@smartforexpro.com>
 *   RESEND_TO_EMAIL=contact@smartforexpro.com,smaylle10@gmail.com
 *   RESEND_AUTO_REPLY=true
 */

export { emailConfig } from "./config";
export { getResendClient } from "./resend";
export { sendEmail } from "./send";
export {
  parseContactPayload,
  processContactForm,
  type ContactValidationError,
  type ProcessContactResult,
} from "./contact";
export { isValidEmail, escapeHtml, textToHtml, htmlToPlainText } from "./utils";
export type {
  ContactFormType,
  ContactPayload,
  SendEmailInput,
  SendEmailResult,
} from "./types";
