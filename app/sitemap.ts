import type { MetadataRoute } from "next";
import { getPublishedEssays } from "@/lib/essays";

const routes = [
  "",
  "/about",
  "/essays",
  "/projects",
  "/media",
  "/speaking",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-06-13");
  const essays = await getPublishedEssays();

  return [
    ...routes.map((route) => ({
      url: `https://bdonaldharris.com${route}`,
      lastModified,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...essays.map((entry) => ({
      url: `https://bdonaldharris.com/essays/${entry.slug}`,
      lastModified: new Date(`${entry.updatedAt ?? entry.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
