import { RevealOnScroll } from "./RevealOnScroll";
import type { Dictionary } from "@/lib/i18n";

export function Identity({ dict }: { dict: Dictionary }) {
  const id = dict.identite;

  return (
    <section id="identite" className="py-24 px-[5vw] bg-bleu">
      <RevealOnScroll>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-or mb-3">
          {id.label}
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={70}>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-blanc mb-1 leading-tight">
          {id.titre}
        </h2>
      </RevealOnScroll>
      <RevealOnScroll delay={140}>
        <p className="text-base text-or italic mb-3">{id.sous}</p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {id.items.map((item, i) => (
          <RevealOnScroll key={i} delay={200 + i * 70}>
            <div className="bg-blanc/[.05] rounded p-7 border-t-[3px] border-or hover:bg-blanc/[.09] transition-colors h-full">
              <h3 className="font-serif text-lg text-or font-bold mb-3">
                {item.titre}
              </h3>
              <p className="text-sm text-blanc/75 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
