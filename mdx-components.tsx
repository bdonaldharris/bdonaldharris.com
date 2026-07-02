import type { MDXComponents } from "mdx/types";

// Required by @next/mdx with the App Router. Article typography is styled via
// scoped CSS in app/globals.css (.writing-article-body), so rendered MDX maps
// to plain HTML elements — no custom component system to maintain.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
