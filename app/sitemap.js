import { client } from "@/lib/sanity/client";
import { allArticleSlugsQuery, razboryAllSlugsQuery } from "@/lib/sanity/queries";

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = await client.fetch(allArticleSlugsQuery).catch(() => []);
  const razbory = await client.fetch(razboryAllSlugsQuery).catch(() => []);

  const staticRoutes = [
    "",
    "/blog",
    "/razbory",
    "/exams",
    "/olympiads",
    "/reviews",
    "/level-up",
    "/format",
    "/workbook",
    "/bot",
    "/social",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
  }));

  const razborRoutes = razbory.map((r) => ({
    url: `${base}/razbory/${r.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...razborRoutes];
}
