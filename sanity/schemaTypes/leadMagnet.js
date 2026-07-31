import { defineField, defineType } from "sanity";

export default defineType({
  name: "leadMagnet",
  title: "Лид-магнит (гайд)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название гайда",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Описание (что человек получит)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pdfFile",
      title: "PDF-файл гайда",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sendpulseListId",
      title: "ID списка в SendPulse",
      description:
        "Найти в SendPulse: Рассылки → Список адресов → выбрать список → ID в адресной строке. Подписчики этого гайда попадут именно в этот список.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "sendpulseListId" },
  },
});
