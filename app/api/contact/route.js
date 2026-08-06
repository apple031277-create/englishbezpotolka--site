import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/client";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();
  const contact = body?.contact?.trim();
  const message = body?.message?.trim() || "";
  const source = body?.source === "workbook" ? "workbook" : "general";

  if (!name || !contact) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  try {
    await writeClient().create({
      _type: "contactRequest",
      name,
      contact,
      message,
      source,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
