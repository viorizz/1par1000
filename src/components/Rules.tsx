import type { Dictionary } from "@/lib/i18n";

export function Rules({ dict }: { dict: Dictionary }) {
  const r = dict.regles;

  return (
    <section className="bg-bleu py-16 px-[5vw]">
      <h2 className="font-serif text-2xl text-blanc mb-2">{r.titre}</h2>
      <p className="text-sm text-blanc/60 mb-8">{r.sous}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1100px]">
        {r.items.map((item, i) => (
          <div
            key={i}
            className="bg-blanc/[.06] rounded px-5 py-4 border-l-[3px] border-or"
          >
            <div className="font-semibold text-or text-sm uppercase tracking-wide mb-1">
              {item.titre}
            </div>
            <div className="text-sm text-blanc/75 leading-relaxed">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
