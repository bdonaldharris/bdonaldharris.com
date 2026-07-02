import type { MetadataRoute } from "next";
import { getPublishedWriting } from "@/lib/writing";

const routes = [
  "",
  "/about",
  "/speaking",
  "/ideas",
  "/writing",
  "/projects",
  "/media",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-06-13");
  const writing = await getPublishedWriting();

  return [
    ...routes.map((route) => ({
      url: `https://bdonaldharris.com${route}`,
      lastModified,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...writing.map((entry) => ({
      url: `https://bdonaldharris.com/writing/${entry.slug}`,
      lastModified: new Date(`${entry.updatedAt ?? entry.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
