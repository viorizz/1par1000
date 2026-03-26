import { AdminNav } from "./AdminNav";
import { getDb } from "@/lib/db";

interface StatsRow {
  c: number;
}

export function AdminDashboard() {
  const db = getDb();

  const totalDemandes = (
    db.prepare("SELECT COUNT(*) as c FROM demandes").get() as StatsRow
  ).c;
  const totalBenevoles = (
    db.prepare("SELECT COUNT(*) as c FROM benevoles").get() as StatsRow
  ).c;
  const demandesAujourdhui = (
    db
      .prepare(
        "SELECT COUNT(*) as c FROM demandes WHERE date(created_at) = date('now')"
      )
      .get() as StatsRow
  ).c;
  const benevolesAujourdhui = (
    db
      .prepare(
        "SELECT COUNT(*) as c FROM benevoles WHERE date(created_at) = date('now')"
      )
      .get() as StatsRow
  ).c;

  const recentDemandes = db
    .prepare("SELECT * FROM demandes ORDER BY created_at DESC LIMIT 5")
    .all() as Array<{
    id: number;
    commune: string;
    canton: string;
    nom: string;
    created_at: string;
  }>;

  const recentBenevoles = db
    .prepare("SELECT * FROM benevoles ORDER BY created_at DESC LIMIT 5")
    .all() as Array<{
    id: number;
    nom: string;
    type_engagement: string;
    created_at: string;
  }>;

  const stats = [
    { label: "Total demandes", value: totalDemandes, color: "bg-blue-500" },
    { label: "Total bénévoles", value: totalBenevoles, color: "bg-amber-500" },
    {
      label: "Demandes aujourd'hui",
      value: demandesAujourdhui,
      color: "bg-green-500",
    },
    {
      label: "Bénévoles aujourd'hui",
      value: benevolesAujourdhui,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <AdminNav />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Tableau de bord
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-lg shadow-sm border p-5"
            >
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {s.label}
              </div>
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-5 py-4 border-b">
              <h2 className="font-semibold text-gray-900">
                Dernières demandes
              </h2>
            </div>
            <div className="divide-y">
              {recentDemandes.length === 0 && (
                <div className="px-5 py-4 text-sm text-gray-400">
                  Aucune demande pour le moment.
                </div>
              )}
              {recentDemandes.map((d) => (
                <div key={d.id} className="px-5 py-3 flex justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {d.nom}
                    </div>
                    <div className="text-xs text-gray-500">
                      {d.commune}, {d.canton}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{d.created_at}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-5 py-4 border-b">
              <h2 className="font-semibold text-gray-900">
                Derniers bénévoles
              </h2>
            </div>
            <div className="divide-y">
              {recentBenevoles.length === 0 && (
                <div className="px-5 py-4 text-sm text-gray-400">
                  Aucun bénévole pour le moment.
                </div>
              )}
              {recentBenevoles.map((b) => (
                <div key={b.id} className="px-5 py-3 flex justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {b.nom}
                    </div>
                    <div className="text-xs text-gray-500">
                      {b.type_engagement}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{b.created_at}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
