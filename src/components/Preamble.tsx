import { RevealOnScroll } from "./RevealOnScroll";
import type { Dictionary } from "@/lib/i18n";

export function Preamble({ dict }: { dict: Dictionary }) {
  const p = dict.preambule;

  return (
    <section
      id="preambule"
      className="py-24 px-[5vw] bg-bleu relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(200,169,81,0.06),transparent)]" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-or mb-3">
            {p.label}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={70}>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-blanc mb-1 leading-tight">
            {p.titre}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={140}>
          <p className="text-base text-or italic mb-10">{p.sous}</p>
        </RevealOnScroll>

        {[p.p1, p.p3, p.p5].map((text, i) => (
          <RevealOnScroll key={i} delay={200 + i * 70}>
            <p className="text-base leading-[1.85] text-blanc/80 mb-5 pl-5 border-l-2 border-or/35 font-serif italic">
              {text}
            </p>
          </RevealOnScroll>
        ))}

        {[p.p2, p.p4, p.p6].map((text, i) => (
          <RevealOnScroll key={`acc-${i}`} delay={250 + i * 70}>
            <p className="text-lg leading-[1.85] text-blanc mb-5 pl-5 border-l-2 border-or font-serif italic">
              {text}
            </p>
          </RevealOnScroll>
        ))}

        <RevealOnScroll delay={600}>
          <p className="mt-8 pt-6 border-t border-or/25 text-sm text-blanc/45 italic">
            {p.signature}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
