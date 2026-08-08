import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { writeClient } from "@/lib/sanity/client";
import { createYookassaPayment } from "@/lib/yookassa";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AMOUNT_VALUE = "590.00";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const token = randomUUID();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let payment;
  try {
    payment = await createYookassaPayment({
      amountValue: AMOUNT_VALUE,
      description: "Воркбук «Английский без потолка» B2→C2",
      returnUrl: `${siteUrl}/workbook/success?token=${token}`,
      idempotenceKey: token,
      email,
    });
  } catch (err) {
    console.error("create-payment failed:", err);
    return NextResponse.json({ error: "payment creation failed" }, { status: 502 });
  }

  try {
    await writeClient().create({
      _type: "purchase",
      email,
      token,
      paymentId: payment.id,
      amount: 590,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("failed to save purchase:", err);
  }

  return NextResponse.json({ confirmationUrl: payment.confirmation?.confirmation_url });
}
