import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, email, commune, type_engagement, message } = body;

    if (!nom || !email || !commune || !type_engagement) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const parts = commune.split(",").map((s: string) => s.trim());
    const communeName = parts[0] || commune;
    const canton = parts[1] || "";

    const db = getDb();
    db.prepare(
      `INSERT INTO benevoles (nom, email, commune, canton, type_engagement, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(nom, email, communeName, canton, type_engagement, message || null);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Volunteer registration error:", err);
    return NextResponse.json(
      { error: "Failed to register volunteer" },
      { status: 500 }
    );
  }
}
