import { NextRequest, NextResponse } from "next/server";
import { generateSignatureList } from "@/lib/pdf";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { canton, commune, npa, nom, email } = body;

    if (!canton || !commune || !npa || !nom || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getDb();
    db.prepare(
      `INSERT INTO demandes (canton, commune, npa, nom, email, langue)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(canton, commune, npa, nom, email, "fr");

    const pdfBytes = await generateSignatureList({ canton, commune, npa });

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="liste-signatures-${commune.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
