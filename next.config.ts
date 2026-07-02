import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

const withMDX = createMDX({
  options: {
    // String plugin specifiers keep the config serializable so it works with
    // both the webpack dev server (`next dev --webpack`) and Turbopack builds.
    // remark-frontmatter strips the YAML frontmatter block from rendered MDX;
    // lib/writing.ts parses the same frontmatter for metadata.
    //
    // Known issue: rendering an MDX route under `next dev --webpack` (this
    // project's `dev` script) currently crashes with "Cannot read properties
    // of undefined (reading 'recentlyCreatedOwnerStacks')". This is an
    // upstream Next.js 16 / React 19 RSC dev-renderer bug affecting MDX
    // broadly, not specific to this config — it reproduces the same way for
    // @next/mdx and next-mdx-remote alike (see
    // https://github.com/vercel/next.js/issues/76395,
    // https://github.com/vercel/next.js/issues/77216, and
    // https://github.com/vercel/next.js/issues/83505). It does not affect
    // `next build` (static generation) or the deployed site — only live
    // rendering in the webpack dev server. `next dev` (Turbopack, Next's
    // default) is unaffected; use that when iterating on /writing content
    // locally until upstream resolves this.
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
