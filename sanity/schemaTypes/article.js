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
        {
          type: "block",
          styles: [
            { title: "Обычный", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Цитата", value: "blockquote" },
            { title: "Закрывающая мысль", value: "closingThought" },
          ],
        },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "example",
          title: "Пример ❌/✅",
          fields: [
            {
              name: "kind",
              title: "Тип",
              type: "string",
              options: { list: [{ title: "❌ Плохой", value: "bad" }, { title: "✅ Хороший", value: "good" }] },
              validation: (Rule) => Rule.required(),
            },
            { name: "tag", title: "Подпись (например «B2, плоско»)", type: "string" },
            { name: "text", title: "Пример на английском", type: "string" },
            { name: "translation", title: "Перевод (необязательно)", type: "string" },
          ],
          preview: {
            select: { title: "text", subtitle: "kind" },
          },
        },
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
