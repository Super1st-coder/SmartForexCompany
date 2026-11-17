/**
 * Helpers Meta (Facebook) Pixel — événements de conversion.
 * Le script d'init est chargé via <MetaPixel /> dans le layout.
 */

export type MetaFormSource =
  | "contato"
  | "contact"
  | "lead"
  | "lead_modal"
  | string;

export type MetaFormSubmitParams = {
  /** Identifiant du formulaire (ex. contato, contact, lead) */
  form: MetaFormSource;
  /** Type métier : lead | contact */
  formType?: "lead" | "contact";
  /** Objectif sélectionné (landing /contato) */
  contentName?: string;
  contentCategory?: string;
};

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

function fbq(
  action: string,
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }
  window.fbq(action, event, params);
}

/**
 * Événement standard Meta **Lead** (optimisation campagnes).
 */
export function trackMetaLead(params?: Record<string, unknown>) {
  fbq("track", "Lead", params);
}

/**
 * Événement standard Meta **Contact** (prise de contact).
 */
export function trackMetaContact(params?: Record<string, unknown>) {
  fbq("track", "Contact", params);
}

/**
 * Événement custom **FormSubmit** (soumission de formulaire réussie).
 */
export function trackMetaFormSubmit(params: MetaFormSubmitParams) {
  fbq("trackCustom", "FormSubmit", {
    form: params.form,
    form_type: params.formType ?? "lead",
    content_name: params.contentName,
    content_category: params.contentCategory ?? "form",
  });
}

/**
 * Pipeline conversion après envoi réussi d’un formulaire :
 * 1. FormSubmit (custom)
 * 2. Lead (standard — toujours pour les leads)
 * 3. Contact (standard — formulaires contact)
 */
export function trackMetaFormConversion(params: MetaFormSubmitParams) {
  const payload: Record<string, unknown> = {
    content_name: params.contentName ?? params.form,
    content_category: params.contentCategory ?? "form",
    form: params.form,
    form_type: params.formType ?? "lead",
  };

  trackMetaFormSubmit(params);

  if (params.formType === "contact") {
    trackMetaContact(payload);
    // Lead aussi : utile pour optim. campagne « messages / demandes »
    trackMetaLead(payload);
  } else {
    trackMetaLead(payload);
  }
}
