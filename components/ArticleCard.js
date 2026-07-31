import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({ article }) {
  const cover = article.coverImage
    ? urlForImage(article.coverImage).width(600).height(375).fit("crop").url()
    : null;

  return (
    <Link className="blog-card" href={`/blog/${article.slug}`}>
      <div className="blog-card-cover">
        {cover && (
          <Image src={cover} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" />
        )}
      </div>
      <div className="blog-card-date">{formatDate(article.publishedAt)}</div>
      <h3>{article.title}</h3>
      {article.excerpt && <p>{article.excerpt}</p>}
    </Link>
  );
}
