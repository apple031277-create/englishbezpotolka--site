import { defineField, defineType } from "sanity";

export default defineType({
  name: "purchase",
  title: "Покупка воркбука",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "token",
      title: "Токен заказа",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "paymentId", title: "ID платежа в ЮKassa", type: "string" }),
    defineField({ name: "amount", title: "Сумма, ₽", type: "number" }),
    defineField({
      name: "status",
      title: "Статус",
      type: "string",
      options: { list: ["pending", "paid", "canceled"] },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      title: "Когда создан заказ",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({ name: "paidAt", title: "Когда оплачен", type: "datetime" }),
  ],
  preview: {
    select: { title: "email", subtitle: "status" },
  },
});
