# bdonaldharris.com

Static personal authority site for B Donald Harris.

Positioning:

> Founder. Builder. Technologist. Ecosystem Architect.

The site connects B Donald Harris, NotableBIT, HindSite, BitVoices Network, BIT Voices Podcast, speaking, essays, media, and contact paths.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Static content files under `content/`
- Reusable UI under `components/`

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

Next.js 16 uses Turbopack by default, and `npm run dev` runs plain `next dev`
(Turbopack). This is the supported local workflow, including for `/essays`
MDX article pages.

A webpack dev server is available as a fallback (`npm run dev:webpack`), but
it currently has a known upstream Next.js 16 / React 19 bug when rendering
MDX routes in dev: opening a `/essays/[slug]` article crashes with `Cannot
read properties of undefined (reading 'recentlyCreatedOwnerStacks')`. This is
an RSC dev-renderer issue that reproduces the same way with other MDX
libraries (not specific to this project's config) and does not affect `next
build`, `next build --webpack`, or the deployed site — only live rendering in
the webpack dev server. Do not use `dev:webpack` for iterating on essay
content until upstream resolves this.

## Contact Form Environment Variables

The `/api/contact` endpoint uses Resend and expects these server-side env vars:

- `RESEND_API_KEY` (required)
- `CONTACT_FROM_EMAIL` (required in production; must be a verified sender domain in Resend, not `@resend.dev`)
- `CONTACT_TO_EMAIL` (optional; defaults to `bdonaldharris@notablebit.com`)

## Validate

```bash
npm run lint
npm run typecheck
npm run build
```

A webpack production build is also available for parity checks:

```bash
npm run build:webpack
```

In restricted Codex runtimes where `npm` is not on `PATH`, run scripts through the bundled Node binary or local package binaries.

## Content Rules

- Keep Black builders, Black technologists, and Black tech ownership explicit where relevant.
- Keep faith integrated but balanced.
- Use current-stage honest language.
- Do not overclaim product maturity, community outcomes, or unavailable media assets.
- Do not add authentication, user accounts, databases, dashboards, or CMS features to the first static build.
