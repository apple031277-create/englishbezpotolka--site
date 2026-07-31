import { groq } from "next-sanity";

export const allArticleSlugsQuery = groq`*[_type == "article" && defined(slug.current)]{"slug": slug.current, publishedAt}`;

export const articleListQuery = groq`*[_type == "article" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt
}`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]{
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

export const leadMagnetBySlugQuery = groq`*[_type == "leadMagnet" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  pdfFile,
  sendpulseListId
}`;
