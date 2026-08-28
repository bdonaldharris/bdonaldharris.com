# Essay discussions with Giscus

Essay discussions are rendered by `components/essays/giscus-discussion.tsx` below the MDX article body. The essay files themselves do not contain commenting configuration.

Giscus stores comments in GitHub Discussions for `bdonaldharris/bdonaldharris.com` and associates each essay with a Discussion by URL pathname. That keeps the discussion identity tied to the stable `/essays/<slug>` route rather than the essay title.

## GitHub prerequisite

GitHub Discussions must be enabled for this repository and the Giscus GitHub App must have access to it. At the time this integration was added, Discussions was not yet enabled for the repository.

After enabling Discussions, choose the Discussion category that should hold essay conversations and use the Giscus configuration page to obtain its category ID.

## Environment variables

Set these public environment variables in local development and Vercel:

```text
NEXT_PUBLIC_GISCUS_CATEGORY=<discussion category name>
NEXT_PUBLIC_GISCUS_CATEGORY_ID=<discussion category id>
```

The repository name and repository ID are fixed in the component because they are properties of this site repository:

```text
bdonaldharris/bdonaldharris.com
R_kgDOS59KfA
```

If either Giscus environment variable is absent, the discussion section does not render. This prevents a broken Giscus embed from appearing before Discussions has been configured.

## Current behavior

- Giscus is loaded only on individual essay pages.
- Discussions are mapped by `pathname` with strict matching enabled.
- Reactions are enabled.
- The comment input appears above existing comments.
- Giscus follows the visitor's preferred light/dark color scheme.
- The iframe loads lazily.
- The visible invitation is: `I'm interested in your thoughts. Let's discuss`.
