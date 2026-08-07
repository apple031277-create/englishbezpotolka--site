import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactRequest",
  title: "Заявка с сайта",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Имя", type: "string" }),
    defineField({
      name: "contact",
      title: "Как связаться (телеграм / email / телефон)",
      type: "string",
    }),
    defineField({ name: "message", title: "Сообщение", type: "text" }),
    defineField({
      name: "source",
      title: "Откуда заявка",
      type: "string",
      options: { list: ["workbook", "format", "general"] },
    }),
    defineField({
      name: "createdAt",
      title: "Когда пришла",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "contact" },
  },
});
