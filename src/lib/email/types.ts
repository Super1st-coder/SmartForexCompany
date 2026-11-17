export type ContactFormType = "contact" | "lead";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: ContactFormType;
};

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string | string[];
  /** Tags Resend pour analytics / filtrage */
  tags?: { name: string; value: string }[];
};

export type SendEmailResult =
  | { ok: true; id: string; simulated?: boolean }
  | { ok: false; error: string };
