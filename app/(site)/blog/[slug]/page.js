import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { allArticleSlugsQuery, articleBySlugQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { portableTextComponents } from "@/components/PortableTextComponents";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(allArticleSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

async function getArticle(slug) {
  return client.fetch(articleBySlugQuery, { slug });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const ogImage = article.coverImage
    ? urlForImage(article.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const coverUrl = article.coverImage
    ? urlForImage(article.coverImage).width(1400).height(788).fit("crop").url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    image: coverUrl ? [coverUrl] : undefined,
    author: { "@type": "Person", name: "Наталья Боброва" },
  };

  return (
    <section>
      <div className="wrap">
        <div className="article-header">
          <div className="eyebrow">Статья</div>
          <h1>{article.title}</h1>
          <div className="article-date">{formatDate(article.publishedAt)}</div>
        </div>

        {coverUrl && (
          <div className="article-cover">
            <Image src={coverUrl} alt="" fill sizes="(max-width: 720px) 100vw, 720px" priority />
          </div>
        )}

        <div className="article-body">
          {article.body && (
            <PortableText value={article.body} components={portableTextComponents} />
          )}
        </div>

        {article.leadMagnet && (
          <LeadMagnetForm
            leadMagnetSlug={article.leadMagnet.slug}
            title={article.leadMagnet.title}
            description={article.leadMagnet.description}
          />
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
