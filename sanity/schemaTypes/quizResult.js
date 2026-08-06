import { defineField, defineType } from "sanity";

export default defineType({
  name: "quizResult",
  title: "Результат теста «Какой ты ученик»",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "archetype", title: "Архетип", type: "string" }),
    defineField({
      name: "createdAt",
      title: "Когда прошёл тест",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "archetype" },
  },
});
