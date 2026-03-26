import { NextResponse } from "next/server";
import { buildAuthorizeUrl, clearAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const url = buildAuthorizeUrl();
    return NextResponse.redirect(url);
  } catch (err) {
    console.error("OAuth init error:", err);
    return NextResponse.json(
      { error: "OAuth configuration error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true });
}
