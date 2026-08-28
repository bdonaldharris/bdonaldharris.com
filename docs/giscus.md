# Essay discussions with Giscus

Essay discussions are rendered by `components/essays/giscus-discussion.tsx` below the MDX article body. The essay files themselves do not contain commenting configuration.

Giscus stores comments in GitHub Discussions for `bdonaldharris/bdonaldharris.com` and associates each essay with a Discussion by URL pathname. That keeps the discussion identity tied to the stable `/essays/<slug>` route rather than the essay title.

## GitHub configuration

GitHub Discussions is enabled for the repository and the Giscus GitHub App has access to it.

Essay conversations use the dedicated `Essay Discussions` category:

```text
Category: Essay Discussions
Category ID: DIC_kwDOS59KfM4DEYEQ
```

The repository identity is:

```text
Repository: bdonaldharris/bdonaldharris.com
Repository ID: R_kgDOS59KfA
```

These values are fixed properties of this site and are declared directly in the Giscus component. No environment variables are required for the integration.

## Current behavior

- Giscus is loaded only on individual essay pages.
- Discussions are mapped by `pathname` with strict matching enabled.
- Reactions are enabled.
- The comment input appears above existing comments.
- Giscus follows the visitor's preferred light/dark color scheme.
- The iframe loads lazily.
- The visible invitation is: `I'm interested in your thoughts. Let's discuss`.
