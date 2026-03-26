import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { BenevolesTable } from "@/components/admin/BenevolesTable";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Benevole {
  id: number;
  nom: string;
  email: string;
  commune: string;
  canton: string;
  type_engagement: string;
  message: string | null;
  statut: string;
  created_at: string;
}

export default async function BenevolesPage({
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
      .prepare(`SELECT COUNT(*) as c FROM benevoles ${whereClause}`)
      .get(...queryParams) as { c: number }
  ).c;

  const benevoles = db
    .prepare(
      `SELECT * FROM benevoles ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...queryParams, perPage, offset) as Benevole[];

  return (
    <BenevolesTable
      benevoles={benevoles}
      total={total}
      page={page}
      perPage={perPage}
      search={search}
    />
  );
}
