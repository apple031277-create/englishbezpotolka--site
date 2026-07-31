import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Статья",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (часть ссылки)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Короткое описание (для карточки и превью в соцсетях)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Обложка",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Текст статьи",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Дата публикации",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "tags",
      title: "Теги",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "leadMagnet",
      title: "Лид-магнит к статье",
      type: "reference",
      to: [{ type: "leadMagnet" }],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO-заголовок (если не задан — берётся обычный заголовок)",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO-описание (если не задано — берётся короткое описание)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "publishedAt" },
  },
});
