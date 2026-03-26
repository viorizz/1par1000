import { NextRequest, NextResponse } from "next/server";
import {
  authenticateAdmin,
  setAdminSession,
  clearAdminSession,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!authenticateAdmin(username, password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    await setAdminSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true });
}
