# Horizon

Plateforme de location de voitures — Paris / Île-de-France. PWA installable
construite avec Next.js 16 (App Router), TypeScript, Tailwind CSS et
Supabase.

> Exercice de formation / portfolio. MVP sans paiement en ligne.

## Stack

- **Frontend** — Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4
- **Backend / BDD** — Supabase (PostgreSQL, Auth, RLS)
- **IA** — API Claude (Anthropic) pour le chatbot de conseil
- **Photos véhicules** — API Unsplash
- **PWA** — Serwist (manifest + service worker + fallback hors-ligne)

## Installation

```bash
npm install
```

### 1. Variables d'environnement

Copiez `.env.example` vers `.env.local` et renseignez les clés :

```bash
cp .env.example .env.local
```

| Variable                       | Où l'obtenir                                                        |
| ------------------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase → Project Settings → API                                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API                                    |
| `ANTHROPIC_API_KEY`             | console.anthropic.com/settings/keys (utilisée côté serveur seulement) |
| `UNSPLASH_ACCESS_KEY`           | unsplash.com/oauth/applications (côté serveur seulement)              |

Aucune clé n'est codée en dur dans le code — tout passe par ces variables.

### 2. Base de données Supabase

Dans l'éditeur SQL de votre projet Supabase, exécutez dans l'ordre :

1. [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) —
   tables `vehicles`, `bookings`, `profiles`, policies RLS (SELECT / INSERT /
   UPDATE / DELETE sur chaque table) et fonctions de disponibilité.
2. [`supabase/seed.sql`](supabase/seed.sql) — quelques véhicules de démo
   (Paris / Île-de-France).

Vérifiez ensuite dans Supabase → Authentication → Providers que
**Email** est activé (avec ou sans confirmation par email selon vos
préférences pour la démo).

### 3. Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

> Le service worker (PWA) est désactivé en développement (`next dev`) —
> c'est le comportement par défaut de Serwist. Pour le tester réellement,
> utilisez `npm run build && npm run start`, puis DevTools → Application
> → Service Workers.

## Structure du projet

```
app/
  (site)/          pages avec Header/Footer/Chatbot (accueil, catalogue,
                    fiche véhicule, réservation, compte, connexion)
  hors-ligne/       page de fallback PWA (statique, hors du groupe (site)
                    pour rester précachable sans dépendance à Supabase)
  api/              routes API (chat Claude, photos Unsplash)
  sw.ts             service worker (Serwist)
  manifest.ts       manifest PWA
components/
  brand/            logo Horizon (SVG)
  ui/                Button, Badge, Modal, Container
  layout/            Header, Footer, UserMenu
  home/              Hero, SearchBar, PopularVehicles
  vehicles/          VehicleCard, Gallery, Specs, Reviews, calendrier
  booking/           assistant de réservation multi-étapes
  account/           réservations, préférences de marques
  chat/              widget de chat IA
lib/                 accès Supabase, Anthropic, Unsplash, utilitaires
types/               types Database (Supabase) et domaine
supabase/            migrations SQL + seed de démo
```

## Identité de marque

Le monogramme et le logotype Horizon sont reconstruits en SVG pur dans
[`components/brand/`](components/brand) d'après la planche de marque
fournie (palette noir `#080B0D` / ivoire `#F8F8F4` / orange `#FF6A00`,
typographie Manrope). Favicon et icônes PWA sont générées à partir du
même SVG via `scripts/generate-icons.mjs` (`node scripts/generate-icons.mjs`
pour régénérer les PNG après modification du monogramme).

## Sécurité — RLS Supabase

Chaque table a ses 4 policies (SELECT/INSERT/UPDATE/DELETE) :

- `vehicles` — catalogue public en lecture ; écriture bloquée côté client
  (alimentée via la clé `service_role`, en attendant le back-office V2).
- `profiles` / `bookings` — un utilisateur ne voit et ne modifie que ses
  propres données. Une réservation est toujours créée avec le statut
  `en_attente` (le client ne peut pas s'auto-confirmer).
- Deux fonctions SQL `security definer` (`get_unavailable_vehicle_ids`,
  `get_vehicle_booked_ranges`) exposent uniquement des dates de
  disponibilité, sans jamais exposer les réservations d'autres
  utilisateurs.

## Contrôle qualité effectué

- `npm run build` — compile sans erreur TypeScript.
- `npm run lint` — aucun warning ESLint bloquant.
- Aucune clé API en dur dans le code (vérifié par recherche).
- Testé manuellement en local (build de production) : rendu des pages,
  ouverture/fermeture du chatbot, enregistrement effectif du service
  worker PWA, manifest valide, page `/hors-ligne` statiquement précachée.
- **Non testé de bout en bout** faute de projet Supabase / clés API
  réelles à disposition dans cet environnement : les flux de données
  (catalogue, réservation, authentification, chatbot avec Claude) doivent
  être vérifiés une fois vos propres clés renseignées dans `.env.local`.

## Prochaines étapes (V2 — hors périmètre MVP)

Back-office admin, favoris, comparateur, notifications email, dark mode,
multi-langue, etc. — voir la structure de types et de policies RLS,
pensée pour accueillir ces évolutions sans réécriture majeure (ex. les
policies d'écriture de `vehicles` sont déjà prêtes à être remplacées par
une condition `is_admin(auth.uid())`).
