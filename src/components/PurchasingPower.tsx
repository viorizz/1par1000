import { RevealOnScroll } from "./RevealOnScroll";
import type { Dictionary } from "@/lib/i18n";

export function PurchasingPower({ dict }: { dict: Dictionary }) {
  const p = dict.pouvoir;

  return (
    <section id="pouvoir" className="py-24 px-[5vw] bg-blanc">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div>
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-or mb-3">
              {p.label}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={70}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-bleu mb-1 leading-tight">
              {p.titre}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={140}>
            <p className="text-base text-or italic mb-3">{p.sous}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-base text-texte-leger max-w-xl leading-relaxed mb-10">
              {p.intro}
            </p>
          </RevealOnScroll>

          {p.items.map((item, i) => (
            <RevealOnScroll key={i} delay={250 + i * 70}>
              <div className="flex items-baseline gap-4 py-4 border-b border-gris last:border-b-0">
                <span className="font-serif text-xl font-bold text-bleu shrink-0 min-w-[120px]">
                  {item.montant}
                </span>
                <span className="text-sm text-texte-leger leading-relaxed">
                  {item.desc}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={300}>
          <div className="bg-bleu p-10 rounded text-center">
            <span className="font-serif text-5xl font-black text-or block">
              {p.box_montant}
            </span>
            <span className="text-sm text-blanc/65 uppercase tracking-wider block mt-1 mb-6">
              {p.box_label}
            </span>
            <div className="border-t border-blanc/15 pt-5">
              <p className="text-sm text-blanc/60 leading-relaxed">
                {p.box_contre}
              </p>
              <p className="font-serif text-3xl font-black text-or my-2">
                {p.box_valeur}
              </p>
              <p className="text-sm text-blanc/50 italic">
                {p.box_conclusion}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
