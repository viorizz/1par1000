import { RevealOnScroll } from "./RevealOnScroll";
import type { Dictionary } from "@/lib/i18n";

export function Objections({ dict }: { dict: Dictionary }) {
  const o = dict.objections;

  return (
    <section id="objections" className="py-24 px-[5vw] bg-gris">
      <RevealOnScroll>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-or mb-3">
          {o.label}
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={70}>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-bleu mb-1 leading-tight">
          {o.titre}
        </h2>
      </RevealOnScroll>
      <RevealOnScroll delay={140}>
        <p className="text-base text-texte-leger max-w-xl leading-relaxed mb-10">
          {o.intro}
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
        {o.items.map((item, i) => (
          <RevealOnScroll key={i} delay={200 + i * 70}>
            <div className="bg-blanc rounded overflow-hidden hover:-translate-y-1 transition-transform h-full">
              <div className="px-5 py-4 bg-bleu/[.06] border-l-[3px] border-rouge italic text-sm text-rouge font-semibold">
                {item.q}
              </div>
              <div className="px-5 py-4 text-sm text-texte-leger leading-relaxed">
                {item.r}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
