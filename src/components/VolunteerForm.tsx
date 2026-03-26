"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

export function VolunteerForm({ dict }: { dict: Dictionary }) {
  const t = dict.signer_page;
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [commune, setCommune] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom || !email || !commune || !type) {
      setError(dict.common.required);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/benevole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          email,
          commune,
          type_engagement: type,
        }),
      });

      if (!res.ok) throw new Error();
      setSuccess(true);
      setNom("");
      setEmail("");
      setCommune("");
      setType("");
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError(dict.common.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-texte-leger mb-1">
          {t.benevole_nom}
        </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder={dict.signer_page.form_placeholder_nom}
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-or transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-texte-leger mb-1">
          {t.benevole_email}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.signer_page.form_placeholder_email}
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-or transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-texte-leger mb-1">
          {t.benevole_commune}
        </label>
        <input
          type="text"
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
          placeholder="Yverdon-les-Bains, VD"
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-or transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-texte-leger mb-1">
          {t.benevole_type}
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-or transition-colors"
        >
          <option value="">{dict.signer_page.form_choisir}</option>
          {t.benevole_types.map((bt) => (
            <option key={bt} value={bt}>
              {bt}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-or text-bleu font-bold text-sm tracking-wide py-3 rounded-sm hover:bg-or-clair hover:-translate-y-0.5 transition-all disabled:opacity-50 mt-2"
      >
        {loading ? dict.common.loading : `${t.benevole_submit} →`}
      </button>

      {success && (
        <div className="bg-vert/10 border-[1.5px] border-vert text-vert p-3 rounded-sm text-sm text-center font-semibold">
          {t.benevole_success}
        </div>
      )}

      {error && (
        <div className="bg-rouge/10 border-[1.5px] border-rouge text-rouge p-3 rounded-sm text-sm text-center font-semibold">
          {error}
        </div>
      )}
    </form>
  );
}
