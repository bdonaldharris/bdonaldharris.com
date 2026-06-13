import type { MetadataRoute } from "next";

const routes = ["", "/about", "/speaking", "/ideas", "/projects", "/media", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-13");

  return routes.map((route) => ({
    url: `https://bdonaldharris.com${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
