import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { purchaseByTokenQuery } from "@/lib/sanity/queries";

const PDF_URL = "/downloads/workbook-b2c2-vol1.pdf";

export async function GET(request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const purchase = await client.fetch(purchaseByTokenQuery, { token });
  if (!purchase) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    status: purchase.status,
    downloadUrl: purchase.status === "paid" ? PDF_URL : null,
  });
}
