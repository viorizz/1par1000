import { NextRequest, NextResponse } from "next/server";

const GEO_ADMIN_BASE =
  "https://api3.geo.admin.ch/rest/services/api/SearchServer";

const NPA_CANTON_RANGES: [number, number, string][] = [
  [1000, 1099, "Vaud"],
  [1100, 1199, "Vaud"],
  [1200, 1299, "Genève"],
  [1300, 1399, "Vaud"],
  [1400, 1499, "Vaud"],
  [1500, 1599, "Vaud"],
  [1600, 1699, "Vaud"],
  [1700, 1799, "Fribourg"],
  [1800, 1899, "Vaud"],
  [1900, 1999, "Valais"],
  [2000, 2099, "Neuchâtel"],
  [2100, 2199, "Neuchâtel"],
  [2200, 2299, "Neuchâtel"],
  [2300, 2399, "Neuchâtel"],
  [2400, 2499, "Jura"],
  [2500, 2599, "Berne"],
  [2600, 2699, "Berne"],
  [2700, 2799, "Jura"],
  [2800, 2899, "Jura"],
  [2900, 2999, "Jura"],
  [3000, 3999, "Berne"],
  [4000, 4099, "Bâle-Ville"],
  [4100, 4199, "Bâle-Campagne"],
  [4200, 4299, "Bâle-Campagne"],
  [4300, 4399, "Soleure"],
  [4400, 4499, "Soleure"],
  [4500, 4599, "Soleure"],
  [4600, 4699, "Soleure"],
  [4700, 4799, "Soleure"],
  [4800, 4899, "Argovie"],
  [4900, 4999, "Argovie"],
  [5000, 5999, "Argovie"],
  [6000, 6099, "Lucerne"],
  [6100, 6199, "Lucerne"],
  [6200, 6299, "Lucerne"],
  [6300, 6399, "Zoug"],
  [6400, 6499, "Schwyz"],
  [6500, 6599, "Tessin"],
  [6600, 6699, "Tessin"],
  [6700, 6799, "Tessin"],
  [6800, 6899, "Tessin"],
  [6900, 6999, "Tessin"],
  [7000, 7199, "Grisons"],
  [7200, 7299, "Grisons"],
  [7300, 7399, "Grisons"],
  [7400, 7499, "Grisons"],
  [7500, 7599, "Grisons"],
  [7600, 7699, "Grisons"],
  [8000, 8099, "Zurich"],
  [8100, 8199, "Zurich"],
  [8200, 8299, "Zurich"],
  [8300, 8399, "Zurich"],
  [8400, 8499, "Zurich"],
  [8500, 8599, "Thurgovie"],
  [8600, 8699, "Zurich"],
  [8700, 8799, "Zurich"],
  [8800, 8899, "Zurich"],
  [8900, 8999, "Saint-Gall"],
  [9000, 9099, "Saint-Gall"],
  [9100, 9199, "Appenzell Rh.-Ext."],
  [9200, 9299, "Saint-Gall"],
  [9300, 9399, "Saint-Gall"],
  [9400, 9499, "Saint-Gall"],
  [9500, 9599, "Saint-Gall"],
  [9600, 9699, "Thurgovie"],
  [6370, 6379, "Nidwald"],
  [6380, 6389, "Obwald"],
  [6440, 6449, "Schwyz"],
  [6460, 6479, "Uri"],
  [8750, 8759, "Glaris"],
  [8760, 8769, "Glaris"],
  [8770, 8779, "Glaris"],
  [8200, 8209, "Schaffhouse"],
];

function cantonFromNpa(npa: string): string {
  const n = parseInt(npa);
  if (isNaN(n)) return "";
  for (const [min, max, canton] of NPA_CANTON_RANGES) {
    if (n >= min && n <= max) return canton;
  }
  return "";
}

interface GeoAdminResult {
  attrs: {
    label: string;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const isNumeric = /^\d+$/.test(query.trim());

    const url = new URL(GEO_ADMIN_BASE);
    url.searchParams.set("searchText", query);
    url.searchParams.set("type", "locations");
    url.searchParams.set(
      "origins",
      isNumeric ? "zipcode" : "zipcode,gazetteer"
    );
    url.searchParams.set("limit", "10");

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    const results = (data.results || [])
      .map((r: GeoAdminResult) => {
        const rawLabel = r.attrs.label || "";

        // Skip non-settlement entries (exits, airports, etc.)
        if (rawLabel.match(/<i>(Ausfahrt|Einfahrt|Flugplatz|Haltestelle|Bahnhof)/i)) {
          return null;
        }

        const label = rawLabel.replace(/<[^>]*>/g, "").trim();

        // Format: "1400 - Yverdon-les-Bains" (zipcode)
        const zipMatch = label.match(/^(\d{4})\s*-\s*(.+?)$/);
        if (zipMatch) {
          const npa = zipMatch[1];
          const commune = zipMatch[2].trim();
          return { commune, npa, canton: cantonFromNpa(npa) };
        }

        // Format: "Lausanne (VD) - ..." or "Ortschaft Lausanne (VD) - ..." (gazetteer)
        const gazMatch = label.match(/(?:^|\s)([A-ZÀ-Ü][\w\s\-'.À-ü]+?)\s*\(([A-Z]{2})\)\s*-/);
        if (gazMatch) {
          const commune = gazMatch[1].trim();
          const cantonCode = gazMatch[2];
          const CANTON_MAP: Record<string, string> = {
            ZH: "Zurich",
            BE: "Berne",
            LU: "Lucerne",
            UR: "Uri",
            SZ: "Schwyz",
            OW: "Obwald",
            NW: "Nidwald",
            GL: "Glaris",
            ZG: "Zoug",
            FR: "Fribourg",
            SO: "Soleure",
            BS: "Bâle-Ville",
            BL: "Bâle-Campagne",
            SH: "Schaffhouse",
            AR: "Appenzell Rh.-Ext.",
            AI: "Appenzell Rh.-Int.",
            SG: "Saint-Gall",
            GR: "Grisons",
            AG: "Argovie",
            TG: "Thurgovie",
            TI: "Tessin",
            VD: "Vaud",
            VS: "Valais",
            NE: "Neuchâtel",
            GE: "Genève",
            JU: "Jura",
          };
          return {
            commune,
            npa: "",
            canton: CANTON_MAP[cantonCode] || cantonCode,
          };
        }

        return null;
      })
      .filter(
        (r: { commune: string; npa: string } | null): r is { commune: string; npa: string; canton: string } =>
          r !== null
      );

    const unique = results.filter(
      (
        r: { commune: string; npa: string },
        i: number,
        arr: { commune: string; npa: string }[]
      ) =>
        arr.findIndex(
          (x: { commune: string; npa: string }) =>
            x.commune === r.commune && x.npa === r.npa
        ) === i
    );

    return NextResponse.json({ results: unique });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
