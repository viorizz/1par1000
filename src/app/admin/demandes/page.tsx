import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { DemandesTable } from "@/components/admin/DemandesTable";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Demande {
  id: number;
  canton: string;
  commune: string;
  npa: string;
  nom: string;
  email: string;
  langue: string;
  statut: string;
  created_at: string;
}

export default async function DemandesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const perPage = 25;
  const offset = (page - 1) * perPage;

  const db = getDb();

  let whereClause = "";
  const queryParams: string[] = [];

  if (search) {
    whereClause = "WHERE commune LIKE ? OR canton LIKE ? OR nom LIKE ? OR email LIKE ?";
    const like = `%${search}%`;
    queryParams.push(like, like, like, like);
  }

  const total = (
    db
      .prepare(`SELECT COUNT(*) as c FROM demandes ${whereClause}`)
      .get(...queryParams) as { c: number }
  ).c;

  const demandes = db
    .prepare(
      `SELECT * FROM demandes ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...queryParams, perPage, offset) as Demande[];

  return (
    <DemandesTable
      demandes={demandes}
      total={total}
      page={page}
      perPage={perPage}
      search={search}
    />
  );
}
