import { defineField, defineType } from "sanity";

export default defineType({
  name: "subscriber",
  title: "Подписчик (собрал email за гайд)",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "leadMagnet",
      title: "За какой гайд",
      type: "reference",
      to: [{ type: "leadMagnet" }],
    }),
    defineField({
      name: "subscribedAt",
      title: "Когда подписался",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "subscribedAt" },
  },
});
