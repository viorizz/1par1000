"use client";

import { useState, useCallback } from "react";
import type { Dictionary } from "@/lib/i18n";

const CANTONS = [
  "Vaud",
  "Genève",
  "Fribourg",
  "Neuchâtel",
  "Valais",
  "Jura",
  "Berne",
  "Zurich",
  "Bâle-Ville",
  "Bâle-Campagne",
  "Argovie",
  "Soleure",
  "Lucerne",
  "Zoug",
  "Schwyz",
  "Uri",
  "Obwald",
  "Nidwald",
  "Glaris",
  "Schaffhouse",
  "Thurgovie",
  "Saint-Gall",
  "Appenzell Rh.-Ext.",
  "Appenzell Rh.-Int.",
  "Grisons",
  "Tessin",
];

interface CommuneResult {
  commune: string;
  npa: string;
  canton: string;
}

export function SignatureForm({ dict }: { dict: Dictionary }) {
  const t = dict.signer_page;
  const [canton, setCanton] = useState("");
  const [commune, setCommune] = useState("");
  const [npa, setNpa] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<CommuneResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCommunes = useCallback(
    async (query: string, type: "npa" | "commune") => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `/api/communes?q=${encodeURIComponent(query)}&type=${type}`
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.results || []);
          setShowSuggestions(true);
        }
      } catch {
        // Silently fail
      }
    },
    []
  );

  function selectSuggestion(s: CommuneResult) {
    setCommune(s.commune);
    setNpa(s.npa);
    setCanton(s.canton);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canton || !commune || !npa || !nom || !email) {
      setError(dict.common.required);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canton, commune, npa, nom, email }),
      });

      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `liste-signatures-${commune.toLowerCase().replace(/\s+/g, "-")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setSuccess(true);
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
          {t.form_canton}
        </label>
        <select
          value={canton}
          onChange={(e) => setCanton(e.target.value)}
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-bleu transition-colors"
        >
          <option value="">{t.form_choisir}</option>
          {CANTONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <label className="block text-xs font-semibold tracking-wider uppercase text-texte-leger mb-1">
          {t.form_npa}
        </label>
        <input
          type="text"
          value={npa}
          onChange={(e) => {
            setNpa(e.target.value);
            searchCommunes(e.target.value, "npa");
          }}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={t.form_placeholder_npa}
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-bleu transition-colors"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-20 top-full left-0 right-0 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto list-none">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onMouseDown={() => selectSuggestion(s)}
                className="px-3 py-2 text-sm hover:bg-gris cursor-pointer"
              >
                <span className="font-semibold">{s.npa}</span> — {s.commune} (
                {s.canton})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative">
        <label className="block text-xs font-semibold tracking-wider uppercase text-texte-leger mb-1">
          {t.form_commune}
        </label>
        <input
          type="text"
          value={commune}
          onChange={(e) => {
            setCommune(e.target.value);
            searchCommunes(e.target.value, "commune");
          }}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={t.form_placeholder_commune}
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-bleu transition-colors"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-20 top-full left-0 right-0 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto list-none">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onMouseDown={() => selectSuggestion(s)}
                className="px-3 py-2 text-sm hover:bg-gris cursor-pointer"
              >
                <span className="font-semibold">{s.commune}</span> — {s.npa} (
                {s.canton})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-texte-leger mb-1">
          {t.form_nom}
        </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder={t.form_placeholder_nom}
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-bleu transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-texte-leger mb-1">
          {t.form_email}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.form_placeholder_email}
          className="w-full border-[1.5px] border-gray-300 bg-blanc text-texte font-sans text-sm p-2.5 rounded-sm outline-none focus:border-bleu transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-bleu text-blanc font-bold text-sm tracking-wide py-3 rounded-sm hover:bg-bleu-clair hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
      >
        {loading ? dict.common.loading : `↓ ${t.form_submit}`}
      </button>

      {success && (
        <div className="bg-vert/10 border-[1.5px] border-vert text-vert p-3 rounded-sm text-sm text-center font-semibold">
          {t.form_success}
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
