import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/constants";

type WhatsAppButtonProps = {
  label?: string;
  message?: string;
  size?: ButtonProps["size"];
  className?: string;
  variant?: "whatsapp" | "default" | "outline";
};

export function WhatsAppButton({
  label = "Rejoindre maintenant",
  message,
  size = "lg",
  className,
  variant = "whatsapp",
}: WhatsAppButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link
        href={getWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-5 w-5" />
        {label}
      </Link>
    </Button>
  );
}
