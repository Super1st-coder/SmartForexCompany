import { NextResponse } from "next/server";
import {
  parseContactPayload,
  processContactForm,
  emailConfig,
} from "@/lib/email";

export const runtime = "nodejs";

/**
 * POST /api/contact
 * Body JSON: { name, email, phone?, message, type?: "contact" | "lead" }
 */
export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Corps de requête JSON invalide." },
        { status: 400 }
      );
    }

    const parsed = parseContactPayload(body);
    if (!parsed.ok) {
      // Honeypot : on renvoie un faux succès pour ne pas alerter les bots
      if (parsed.field === "honeypot") {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json(
        { error: parsed.error, field: parsed.field },
        { status: 400 }
      );
    }

    // En production, refuser si Resend n'est pas configuré
    if (emailConfig.isProduction && !emailConfig.isConfigured) {
      console.error("[api/contact] RESEND_API_KEY manquante en production");
      return NextResponse.json(
        { error: "Service email temporairement indisponible." },
        { status: 503 }
      );
    }

    const result = await processContactForm(parsed.data);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({
      ok: true,
      simulated: result.simulated ?? false,
      message: result.simulated
        ? "Message reçu (mode simulation : configurez RESEND_API_KEY)."
        : "Message envoyé avec succès.",
    });
  } catch (err) {
    console.error("[api/contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue." },
      { status: 500 }
    );
  }
}
