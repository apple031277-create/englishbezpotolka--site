import { client } from "@/lib/sanity/client";
import { allArticleSlugsQuery } from "@/lib/sanity/queries";

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = await client.fetch(allArticleSlugsQuery).catch(() => []);

  const staticRoutes = ["", "/blog"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
  }));

  return [...staticRoutes, ...articleRoutes];
}
