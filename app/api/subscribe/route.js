import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { leadMagnetBySlugQuery } from "@/lib/sanity/queries";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function getSendPulseToken() {
  const res = await fetch("https://api.sendpulse.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.SENDPULSE_CLIENT_ID,
      client_secret: process.env.SENDPULSE_CLIENT_SECRET,
    }),
  });
  if (!res.ok) throw new Error("sendpulse auth failed");
  const data = await res.json();
  return data.access_token;
}

async function addToSendPulseList(listId, email, token) {
  const res = await fetch(`https://api.sendpulse.com/addressbooks/${listId}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ emails: [{ email }] }),
  });
  if (!res.ok) throw new Error("sendpulse add contact failed");
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.trim();
  const leadMagnetSlug = body?.leadMagnetSlug;

  if (!email || !EMAIL_RE.test(email) || !leadMagnetSlug) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const leadMagnet = await client.fetch(leadMagnetBySlugQuery, { slug: leadMagnetSlug });
  if (!leadMagnet?.sendpulseListId) {
    return NextResponse.json({ error: "lead magnet not configured" }, { status: 404 });
  }

  try {
    const token = await getSendPulseToken();
    await addToSendPulseList(leadMagnet.sendpulseListId, email, token);
  } catch {
    return NextResponse.json({ error: "subscribe failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
