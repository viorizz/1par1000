import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDb } from "@/lib/db";

function escapeCsv(val: string | null | undefined): string {
  if (val == null) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "demandes";
  const search = searchParams.get("search") || "";

  const db = getDb();
  let whereClause = "";
  const params: string[] = [];

  if (search) {
    whereClause =
      "WHERE commune LIKE ? OR canton LIKE ? OR nom LIKE ? OR email LIKE ?";
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  if (type === "demandes") {
    const rows = db
      .prepare(`SELECT * FROM demandes ${whereClause} ORDER BY created_at DESC`)
      .all(...params) as Array<Record<string, unknown>>;

    const headers = [
      "id",
      "canton",
      "commune",
      "npa",
      "nom",
      "email",
      "langue",
      "statut",
      "created_at",
    ];
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => escapeCsv(r[h] as string)).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="demandes.csv"`,
      },
    });
  } else {
    const rows = db
      .prepare(`SELECT * FROM benevoles ${whereClause} ORDER BY created_at DESC`)
      .all(...params) as Array<Record<string, unknown>>;

    const headers = [
      "id",
      "nom",
      "email",
      "commune",
      "canton",
      "type_engagement",
      "message",
      "statut",
      "created_at",
    ];
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => escapeCsv(r[h] as string)).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="benevoles.csv"`,
      },
    });
  }
}
