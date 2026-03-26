import { RevealOnScroll } from "./RevealOnScroll";
import type { Dictionary } from "@/lib/i18n";

export function Comparison({ dict }: { dict: Dictionary }) {
  const c = dict.comparaison;

  return (
    <section className="py-10 px-[5vw] bg-bleu">
      <RevealOnScroll>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-or mb-3">
          {c.label}
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={70}>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-blanc mb-1 leading-tight">
          {c.titre}
        </h2>
      </RevealOnScroll>
      <RevealOnScroll delay={140}>
        <p className="text-base text-blanc/65 max-w-xl leading-relaxed mb-8">
          {c.intro}
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-xs tracking-[0.15em] uppercase font-semibold bg-blanc/[.05] text-blanc/50 text-left" />
                <th className="p-4 text-xs tracking-[0.15em] uppercase font-semibold bg-blanc/[.05] text-blanc/50 text-left">
                  {c.col_avant}
                </th>
                <th className="p-4 text-xs tracking-[0.15em] uppercase font-semibold bg-or text-bleu text-left">
                  {c.col_apres}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr key={i}>
                  <td className="p-4 text-blanc/50 font-semibold text-xs uppercase tracking-wider border-b border-blanc/[.06]">
                    {row.label}
                  </td>
                  <td className="p-4 text-blanc/60 italic text-sm border-b border-blanc/[.06]">
                    {row.avant}
                  </td>
                  <td className="p-4 text-blanc font-semibold text-sm border-b border-blanc/[.06] bg-or/[.08]">
                    {row.apres}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RevealOnScroll>
    </section>
  );
}
