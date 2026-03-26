import { RevealOnScroll } from "./RevealOnScroll";
import type { Dictionary } from "@/lib/i18n";

export function Stats({ dict }: { dict: Dictionary }) {
  const c = dict.chiffres;

  return (
    <section id="chiffres" className="py-24 px-[5vw] bg-gris">
      <RevealOnScroll>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-or mb-3">
          {c.label}
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={70}>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-bleu mb-1 leading-tight">
          {c.titre}
        </h2>
      </RevealOnScroll>
      <RevealOnScroll delay={140}>
        <p className="text-base text-or italic mb-3">{c.sous}</p>
      </RevealOnScroll>
      <RevealOnScroll delay={200}>
        <p className="text-base text-texte-leger max-w-xl leading-relaxed mb-10">
          {c.intro}
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
        {c.items.map((item, i) => (
          <RevealOnScroll key={i} delay={250 + i * 70}>
            <div className="bg-bleu p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-or scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className="font-serif text-[2.8rem] font-black text-or leading-none mb-1">
                {item.nb}
              </div>
              <div className="text-xs font-semibold tracking-wider uppercase text-blanc/50 mb-2">
                {item.titre}
              </div>
              <div className="text-sm text-blanc/80 leading-relaxed">
                {item.desc}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
