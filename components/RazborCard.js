import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

export default function RazborCard({ article }) {
  const cover = article.coverImage
    ? urlForImage(article.coverImage).width(400).height(260).fit("crop").url()
    : null;

  return (
    <Link className="razbor-card" href={`/razbory/${article.slug}`}>
      <div className="razbor-card-cover">
        {cover && <Image src={cover} alt="" fill sizes="(max-width: 640px) 100vw, 25vw" />}
      </div>
      <h3>{article.title}</h3>
      {article.excerpt && <p>{article.excerpt}</p>}
    </Link>
  );
}
