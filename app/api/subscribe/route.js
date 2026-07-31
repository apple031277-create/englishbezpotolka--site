import { NextResponse } from "next/server";
import { client, writeClient } from "@/lib/sanity/client";
import { leadMagnetBySlugQuery } from "@/lib/sanity/queries";
import { pushToUnisender } from "@/lib/unisender";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.trim();
  const leadMagnetSlug = body?.leadMagnetSlug;

  if (!email || !EMAIL_RE.test(email) || !leadMagnetSlug) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const leadMagnet = await client.fetch(leadMagnetBySlugQuery, { slug: leadMagnetSlug });
  if (!leadMagnet?.pdfUrl) {
    return NextResponse.json({ error: "lead magnet not configured" }, { status: 404 });
  }

  try {
    await writeClient().create({
      _type: "subscriber",
      email,
      leadMagnet: { _type: "reference", _ref: leadMagnet._id },
      subscribedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "subscribe failed" }, { status: 502 });
  }

  await pushToUnisender(email, leadMagnet.mailingListId);

  return NextResponse.json({ ok: true, downloadUrl: leadMagnet.pdfUrl });
}
