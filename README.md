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

## Essays

Essays are a file-based, version-controlled archive. There is no CMS, database,
or runtime content backend for essay publishing. Each essay lives as an MDX
file under `content/essays/`, and publishing happens through the normal Git and
deployment flow.

### File and route convention

Each essay file must be named for its slug:

```text
content/essays/<slug>.mdx
```

The frontmatter `slug` must exactly match the filename without `.mdx`. For
example:

```text
content/essays/responsible-architecture-agentic-development.mdx
```

must contain:

```yaml
slug: "responsible-architecture-agentic-development"
```

Published essays are statically routed at:

```text
/essays/<slug>
```

Only essays with `status: "published"` are included in generated static routes.
Drafts remain in the repository but return 404 publicly.

### Frontmatter

A typical essay begins with YAML frontmatter like this:

```yaml
---
title: "Responsible Architecture in the Age of Agentic Development"
slug: "responsible-architecture-agentic-development"
description: "Why AI-assisted software construction makes human architectural judgment more important, not less."
publishedAt: "2026-07-02"
updatedAt: "2026-07-02"
status: "published"
featured: true
tags:
  - architecture
  - AI-assisted development
  - responsible software
canonicalUrl:
syndicated:
  linkedin:
  devto:
  hashnode:
  medium:
ogImage: "/images/essays/responsible-architecture-agentic-development.png"
featuredImage: "/images/essays/featured/responsible-architecture-agentic-development.png"
---
```

Required fields:

- `title`
- `slug`
- `description`
- `publishedAt` in `YYYY-MM-DD` form
- `status`, which must be either `draft` or `published`
- `tags`, as a non-empty list of strings

Optional fields:

- `updatedAt`
- `featured`
- `canonicalUrl`
- `syndicated.linkedin`
- `syndicated.devto`
- `syndicated.hashnode`
- `syndicated.medium`
- `series`
- `ogImage`
- `featuredImage`

The parser accepts quoted ISO dates and YAML dates, then normalizes them to
`YYYY-MM-DD`.

### Publishing behavior

`lib/essays.ts` is the canonical content loader. It reads every `.mdx` file in
`content/essays/`, validates frontmatter, calculates derived metadata, and sorts
entries newest-first by `publishedAt`.

The public site uses only published entries. Setting an essay to
`status: "published"`, committing it, and deploying the site makes it eligible
for the public archive and its static article route. Setting `featured: true`
makes the essay eligible for the featured position on `/essays`; the page uses
the newest published featured essay it encounters in the newest-first list.

Reading time does not belong in frontmatter. It is calculated automatically at
build/render time from the essay body at 200 words per minute, with Markdown and
code syntax stripped from the estimate.

### Essay images

Essay image assets are served from `public/images/essays/`.

`ogImage` is used for Open Graph metadata on the individual essay page. Use a
site-root-relative public path such as:

```yaml
ogImage: "/images/essays/my-essay-og.png"
```

`featuredImage` is the visual shown alongside the essay header on the article
page. New essays should declare this field directly, normally using an asset
under `public/images/essays/featured/`:

```yaml
featuredImage: "/images/essays/featured/my-essay.png"
```

A small compatibility map in `lib/essays.ts` supplies `featuredImage` values for
older essays that predate the field. That map is migration support, not the
preferred convention for new essays.

If `featuredImage` is omitted and there is no migration entry, the article uses
the header layout without an image. If `ogImage` is omitted, the essay page does
not add an essay-specific Open Graph image.

### `/essays` archive

`app/essays/page.tsx` renders the essay index from `getPublishedEssays()`.
Published essays are sorted newest-first. The page can show one featured essay,
with the remaining published essays rendered through the shared
`EssayArchive` component.

The page also displays the site's recurring themes from `content/ideas.ts`.
Those themes are separate from essay tags and do not control essay routing or
publication.

### Individual essay pages

`app/essays/[slug]/page.tsx` statically generates routes from the published
essay slug list. The route:

- rejects drafts and unknown slugs with 404
- dynamically imports `content/essays/<slug>.mdx`
- renders title, description, publication date, calculated reading time, tags,
  and optional updated date
- renders `featuredImage` when present
- builds canonical and Open Graph metadata from frontmatter
- shows the essay body as MDX
- includes the published essay archive in the sidebar

`canonicalUrl`, when present, overrides the site's own essay URL for the
canonical metadata value. Otherwise the canonical URL defaults to
`https://bdonaldharris.com/essays/<slug>`.

### Machine-readable essay feed

The site also exposes:

```text
/essays.json
```

This is a static JSON representation of the same published essay source of
truth. Each item contains:

- `title`
- `slug`
- `url`
- `publishedAt`
- `summary`
- `tags`

Drafts are excluded, and the output is newest-first. Because the route is
force-static, it changes when essay content is committed and the site is
rebuilt/deployed.

### Adding a new essay

1. Create `content/essays/<slug>.mdx`.
2. Add the required frontmatter fields and make sure `slug` matches the
   filename exactly.
3. Add the MDX essay body below the frontmatter.
4. Add any essay artwork under `public/images/essays/` and reference it with
   `ogImage` and/or `featuredImage`.
5. Use `status: "draft"` while the essay should remain unavailable publicly.
6. Change to `status: "published"` when ready to publish.
7. Run validation and a production build before deployment.
8. Commit and deploy through the normal repository workflow.

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
