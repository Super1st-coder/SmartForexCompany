"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trackMetaFormConversion } from "@/lib/meta-pixel";
import { getThankYouPath } from "@/lib/thank-you";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

type ContactFormProps = {
  type?: "contact" | "lead";
  /** Locale explicite ; sinon cookie sfp_locale */
  locale?: Locale;
  onSuccess?: () => void;
  className?: string;
};

function resolveLocale(explicit?: Locale): Locale {
  if (explicit && isLocale(explicit)) return explicit;
  if (typeof document !== "undefined") {
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${LOCALE_COOKIE}=`))
      ?.split("=")[1];
    if (raw) {
      const value = decodeURIComponent(raw);
      if (isLocale(value)) return value;
    }
  }
  return DEFAULT_LOCALE;
}

export function ContactForm({
  type = "contact",
  locale,
  onSuccess,
  className,
}: ContactFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      type,
      // Honeypot anti-spam (doit rester vide)
      website: String(formData.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      trackMetaFormConversion({
        form: type === "lead" ? "lead" : "contact",
        formType: type,
        contentName: type === "lead" ? "Lead modal / form" : "Contact form",
        contentCategory: type === "lead" ? "lead_form" : "contact_form",
      });

      form.reset();
      onSuccess?.();
      router.push(getThankYouPath(resolveLocale(locale)));
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Honeypot — invisible pour les humains, piège pour bots */}
      <div
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${type}-website`}>Site web</label>
        <input
          id={`${type}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="relative grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-1">
          <Label htmlFor={`${type}-name`}>Nom complet</Label>
          <Input
            id={`${type}-name`}
            name="name"
            required
            placeholder="Jean Dupont"
            autoComplete="name"
          />
        </div>
        <div className="space-y-2 sm:col-span-1">
          <Label htmlFor={`${type}-email`}>Email</Label>
          <Input
            id={`${type}-email`}
            name="email"
            type="email"
            required
            placeholder="jean@email.ch"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${type}-phone`}>Téléphone (optionnel)</Label>
          <Input
            id={`${type}-phone`}
            name="phone"
            type="tel"
            placeholder="+41 79 000 00 00"
            autoComplete="tel"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${type}-message`}>
            {type === "lead"
              ? "Que souhaitez-vous savoir ?"
              : "Votre message"}
          </Label>
          <Textarea
            id={`${type}-message`}
            name="message"
            required
            placeholder={
              type === "lead"
                ? "Je souhaite des infos sur la formule Pro..."
                : "Décrivez votre besoin..."
            }
            rows={4}
          />
        </div>
      </div>

      {status === "error" ? (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : type === "lead" ? (
          "Demander plus d’infos"
        ) : (
          "Envoyer le message"
        )}
      </Button>

      <p className="mt-3 text-xs text-muted-foreground">
        En soumettant ce formulaire, vous acceptez d’être recontacté par Smart
        Forex Pro. Aucun spam.
      </p>
    </form>
  );
}
