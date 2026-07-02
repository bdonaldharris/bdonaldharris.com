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
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
