import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { razboryAllSlugsQuery, razborBySlugQuery, relatedRazboryQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { portableTextComponents } from "@/components/PortableTextComponents";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import RazborCard from "@/components/RazborCard";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(razboryAllSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

async function getRazbor(slug) {
  return client.fetch(razborBySlugQuery, { slug });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const razbor = await getRazbor(slug);
  if (!razbor) return {};

  const title = razbor.seoTitle || razbor.title;
  const description = razbor.seoDescription || razbor.excerpt;
  const ogImage = razbor.coverImage
    ? urlForImage(razbor.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/razbory/${razbor.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: razbor.publishedAt,
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

export default async function RazborPage({ params }) {
  const { slug } = await params;
  const razbor = await getRazbor(slug);
  if (!razbor) notFound();

  const related = await client.fetch(relatedRazboryQuery, { slug });

  const coverUrl = razbor.coverImage
    ? urlForImage(razbor.coverImage).width(1000).height(650).fit("crop").url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: razbor.title,
    description: razbor.excerpt,
    datePublished: razbor.publishedAt,
    image: coverUrl ? [coverUrl] : undefined,
    author: { "@type": "Person", name: "Наталья Боброва" },
  };

  return (
    <section>
      <div className="wrap">
        <div className="article-header">
          <div className="eyebrow">Разбор</div>
          <h1>{razbor.title}</h1>
          <div className="article-date">{formatDate(razbor.publishedAt)}</div>
        </div>

        {coverUrl && (
          <div className="article-cover" style={{ maxWidth: 620 }}>
            <Image src={coverUrl} alt="" fill sizes="(max-width: 620px) 100vw, 620px" priority />
          </div>
        )}

        <div className="razbor-body">
          {razbor.body && (
            <PortableText value={razbor.body} components={portableTextComponents} />
          )}
        </div>

        {razbor.leadMagnet && (
          <LeadMagnetForm
            leadMagnetSlug={razbor.leadMagnet.slug}
            title={razbor.leadMagnet.title}
            description={razbor.leadMagnet.description}
          />
        )}

        {related.length > 0 && (
          <div className="related-razbory">
            <h2>Ещё разборы</h2>
            <div className="razbor-grid">
              {related.map((item) => (
                <RazborCard article={item} key={item._id} />
              ))}
            </div>
            <p style={{ marginTop: 20 }}>
              <Link href="/razbory">Все разборы →</Link>
            </p>
          </div>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
