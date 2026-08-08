import { NextResponse } from "next/server";
import { client, writeClient } from "@/lib/sanity/client";
import { purchaseByPaymentIdQuery } from "@/lib/sanity/queries";
import { getYookassaPayment } from "@/lib/yookassa";

// ЮKassa не подписывает вебхуки — вместо доверия телу запроса перезапрашиваем
// платёж напрямую по id через наш секретный ключ, и верим только этому ответу.
export async function POST(request) {
  const body = await request.json().catch(() => null);
  const paymentId = body?.object?.id;

  if (!paymentId) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  let payment;
  try {
    payment = await getYookassaPayment(paymentId);
  } catch (err) {
    console.error("yookassa-webhook: failed to verify payment:", err);
    return NextResponse.json({ error: "verify failed" }, { status: 502 });
  }

  if (payment.status === "succeeded" && payment.paid) {
    const purchase = await client.fetch(purchaseByPaymentIdQuery, { paymentId });
    if (purchase && purchase.status !== "paid") {
      await writeClient()
        .patch(purchase._id)
        .set({ status: "paid", paidAt: new Date().toISOString() })
        .commit()
        .catch((err) => console.error("yookassa-webhook: failed to update purchase:", err));
    }
  }

  return NextResponse.json({ ok: true });
}
