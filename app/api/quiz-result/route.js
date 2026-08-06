import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_ARCHETYPES = ["A", "B", "C", "D"];

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.trim();
  const archetype = body?.archetype;

  if (!email || !EMAIL_RE.test(email) || !VALID_ARCHETYPES.includes(archetype)) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  try {
    await writeClient().create({
      _type: "quizResult",
      email,
      archetype,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
