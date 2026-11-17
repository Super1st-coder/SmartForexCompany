# Email (Resend)

Structure d’envoi d’emails pour Smart Forex Pro.

## Fichiers

| Fichier | Rôle |
|---------|------|
| `config.ts` | Variables d’env + flags |
| `resend.ts` | Client Resend singleton |
| `send.ts` | `sendEmail()` générique |
| `contact.ts` | Validation + pipeline formulaires |
| `types.ts` | Types partagés |
| `utils.ts` | Escape HTML, validation email |
| `templates/` | HTML des emails |
| `index.ts` | API publique du module |

## Configuration

Copier `.env.example` → `.env.local` :

```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Smart Forex Pro <contact@smartforexpro.com>
RESEND_TO_EMAIL=contact@smartforexpro.com,smaylle10@gmail.com
RESEND_AUTO_REPLY=true
```

Chaque lead est envoyé **en une fois** à tous les destinataires de `RESEND_TO_EMAIL` (défaut : `contact@smartforexpro.com` + `smaylle10@gmail.com`).

### Domaine

1. Créer un compte sur [resend.com](https://resend.com)
2. Ajouter le domaine `smartforexpro.com` (DNS : SPF, DKIM, éventuellement DMARC)
3. Créer une API key
4. Utiliser une adresse d’expéditeur du domaine vérifié

Sans clé API en **développement**, les envois sont **simulés** (log console, réponse `ok`).

## Flux formulaire

```
ContactForm / LeadModal
        │
        ▼
POST /api/contact
        │
        ▼
parseContactPayload()  → validation
        │
        ▼
processContactForm()
   ├─ notification équipe  (RESEND_TO_EMAIL)
   └─ auto-reply visiteur  (si RESEND_AUTO_REPLY)
```

## Ajouter un nouvel email

```ts
// 1. Template
// src/lib/email/templates/mon-template.ts
import { emailLayout } from "./layout";

export function buildMonEmail(data: { name: string }) {
  const subject = "…";
  const html = emailLayout({
    title: subject,
    bodyHtml: `<p>Bonjour ${data.name}</p>`,
  });
  return { subject, html, text: "…" };
}

// 2. Envoi
import { sendEmail } from "@/lib/email";
import { buildMonEmail } from "@/lib/email/templates/mon-template";

const { subject, html, text } = buildMonEmail({ name: "Jean" });
await sendEmail({ to: "jean@email.ch", subject, html, text });
```

## Endpoint

`POST /api/contact`

```json
{
  "name": "Jean Dupont",
  "email": "jean@email.ch",
  "phone": "+41 79 000 00 00",
  "message": "Je souhaite des infos sur la formule Pro.",
  "type": "lead"
}
```
