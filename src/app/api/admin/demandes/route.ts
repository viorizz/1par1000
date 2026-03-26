import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, statut } = await request.json();
    const db = getDb();
    db.prepare(
      "UPDATE demandes SET statut = ?, updated_at = datetime('now') WHERE id = ?"
    ).run(statut, id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
