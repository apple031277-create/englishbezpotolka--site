import { groq } from "next-sanity";

export const allArticleSlugsQuery = groq`*[_type == "article" && !("разбор" in tags) && defined(slug.current)]{"slug": slug.current, publishedAt}`;

export const articleListQuery = groq`*[_type == "article" && !("разбор" in tags) && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt
}`;

export const articleBySlugQuery = groq`*[_type == "article" && !("разбор" in tags) && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  body,
  publishedAt,
  tags,
  seoTitle,
  seoDescription,
  "leadMagnet": leadMagnet->{title, "slug": slug.current, description}
}`;

export const razboryAllSlugsQuery = groq`*[_type == "article" && "разбор" in tags && defined(slug.current)]{"slug": slug.current}`;

export const razboryListQuery = groq`*[_type == "article" && "разбор" in tags && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt
}`;

export const razborBySlugQuery = groq`*[_type == "article" && "разбор" in tags && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  body,
  publishedAt,
  tags,
  seoTitle,
  seoDescription,
  "leadMagnet": leadMagnet->{title, "slug": slug.current, description}
}`;

export const relatedRazboryQuery = groq`*[_type == "article" && "разбор" in tags && slug.current != $slug] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt
}`;

export const leadMagnetBySlugQuery = groq`*[_type == "leadMagnet" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  "pdfUrl": pdfFile.asset->url,
  mailingListId
}`;

export const purchaseByPaymentIdQuery = groq`*[_type == "purchase" && paymentId == $paymentId][0]{ _id, status }`;

export const purchaseByTokenQuery = groq`*[_type == "purchase" && token == $token][0]{ status }`;
