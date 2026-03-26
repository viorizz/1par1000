"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AdminNav } from "./AdminNav";

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

export function DemandesTable({
  demandes,
  total,
  page,
  perPage,
  search,
}: {
  demandes: Demande[];
  total: number;
  page: number;
  perPage: number;
  search: string;
}) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(search);
  const totalPages = Math.ceil(total / perPage);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/admin/demandes?search=${encodeURIComponent(searchInput)}&page=1`);
  }

  async function handleExport() {
    const res = await fetch(`/api/admin/export?type=demandes&search=${encodeURIComponent(search)}`);
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demandes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function updateStatut(id: number, statut: string) {
    await fetch("/api/admin/demandes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, statut }),
    });
    router.refresh();
  }

  return (
    <div>
      <AdminNav />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Demandes de listes</h1>
            <p className="text-sm text-gray-500">{total} demande{total !== 1 ? "s" : ""} au total</p>
          </div>
          <button
            onClick={handleExport}
            className="bg-[#1A3A5C] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#2A5280] transition-colors"
          >
            Exporter CSV
          </button>
        </div>

        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher par commune, canton, nom, email..."
            className="flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-gray-100 border rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
          >
            Rechercher
          </button>
        </form>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nom</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Commune</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Canton</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">NPA</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {demandes.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      Aucune demande trouvée.
                    </td>
                  </tr>
                )}
                {demandes.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.created_at}</td>
                    <td className="px-4 py-3 font-medium">{d.nom}</td>
                    <td className="px-4 py-3 text-gray-600">{d.email}</td>
                    <td className="px-4 py-3">{d.commune}</td>
                    <td className="px-4 py-3">{d.canton}</td>
                    <td className="px-4 py-3">{d.npa}</td>
                    <td className="px-4 py-3">
                      <select
                        value={d.statut}
                        onChange={(e) => updateStatut(d.id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded border-none cursor-pointer ${
                          d.statut === "nouvelle"
                            ? "bg-blue-100 text-blue-700"
                            : d.statut === "traitée"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="nouvelle">Nouvelle</option>
                        <option value="traitée">Traitée</option>
                        <option value="archivée">Archivée</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() =>
                  router.push(
                    `/admin/demandes?search=${encodeURIComponent(search)}&page=${p}`
                  )
                }
                className={`px-3 py-1.5 rounded text-sm ${
                  p === page
                    ? "bg-[#1A3A5C] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
