"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/shared/ContactForm";
import type { Locale } from "@/i18n/config";

type LeadModalProps = {
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary" | "ghost";
  triggerSize?: "default" | "sm" | "lg" | "xl";
  className?: string;
  /** Locale pour la page de remerciement (sinon cookie) */
  locale?: Locale;
};

export function LeadModal({
  triggerLabel = "Demander plus d’infos",
  triggerVariant = "outline",
  triggerSize = "lg",
  className,
  locale,
}: LeadModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize} className={className}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demander plus d’informations</DialogTitle>
          <DialogDescription>
            Laissez-nous vos coordonnées. Nous vous recontactons rapidement pour
            répondre à vos questions sur notre copy trading.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          type="lead"
          locale={locale}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
