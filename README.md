# Smart Forex Pro

Site Next.js 15 (App Router + TypeScript) pour **smartforexpro.com** — signaux Forex professionnels orientés marché suisse / Suisse romande.

## Stack

- Next.js 15 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Radix UI (accordion, dialog, etc.)
- Resend (formulaires)
- Lucide React

## Démarrage

```bash
npm install
cp .env.example .env.local
# Renseigner RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Emails (Resend)

```bash
cp .env.example .env.local
# Puis renseigner RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL
```

Structure du module : `src/lib/email/` (client, templates, pipeline contact).  
Sans `RESEND_API_KEY` en dev, les envois sont **simulés** (log serveur).  
Doc détaillée : `src/lib/email/README.md`.

## Scripts

| Commande        | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Serveur de développement |
| `npm run build` | Build production         |
| `npm run start` | Serveur production       |
| `npm run lint`  | ESLint                   |

## Pages

- `/` — Homepage conversion
- `/a-propos`
- `/performances`
- `/comment-ca-marche`
- `/tarifs`
- `/faq`
- `/contact`
- `/mentions-legales`
- `/politique-de-confidentialite`

## Structure

```
src/
  app/           # routes App Router + API
  components/    # UI, layout, home, shared
  lib/           # constants, seo, utils
```

## WhatsApp

Numéro configuré : `+41 77 946 32 33` (voir `src/lib/constants.ts`).

## SEO

- Metadata natives + Open Graph / Twitter
- Schema.org Organization + Service + FAQ
- `sitemap.xml` et `robots.txt` générés

## Avertissement

Le trading comporte un risque de perte en capital. Les performances présentées sont illustratives.
