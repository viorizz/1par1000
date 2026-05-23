import { RevealOnScroll } from "./RevealOnScroll";
import type { Dictionary } from "@/lib/i18n";

export function Metaphor({ dict }: { dict: Dictionary }) {
  const m = dict.metaphore;

  return (
    <section
      id="metaphore"
      className="py-24 px-[5vw] bg-vert-foret relative overflow-hidden"
    >
      {/* Subtle radial glow from the right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_100%_40%,rgba(74,155,99,0.12),transparent)]" />
      {/* Very faint leaf-texture overlay using a second gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_80%,rgba(46,107,69,0.2),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-vert-clair mb-3">
            {m.label}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={70}>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-blanc leading-tight mb-2">
            {m.titre}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={140}>
          <h3 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-vert-clair leading-tight mb-8">
            {m.sous}
          </h3>
        </RevealOnScroll>

        {/* Green divider */}
        <RevealOnScroll delay={180}>
          <div className="w-10 h-[3px] bg-vert-clair mb-10" />
        </RevealOnScroll>

        {/* Body paragraphs */}
        <RevealOnScroll delay={220}>
          <p className="font-serif italic text-blanc/80 text-base leading-[1.9] mb-6 max-w-3xl">
            {m.p1}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={290}>
          <p className="text-base text-blanc/90 leading-relaxed mb-12 max-w-3xl">
            {m.p2_before}{" "}
            <strong className="text-blanc font-bold">{m.p2_strong}</strong>
          </p>
        </RevealOnScroll>

        {/* Three cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {m.cards.map((card, i) => (
            <RevealOnScroll key={i} delay={360 + i * 70}>
              <div className="border border-vert-clair/30 rounded-lg p-6 bg-vert-feuille/20 hover:bg-vert-feuille/35 transition-colors group">
                <div className="text-vert-clair font-serif font-bold text-xl mb-3 group-hover:text-blanc transition-colors">
                  {card.titre}
                </div>
                <p className="text-sm text-blanc/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* CO₂ badge */}
        <RevealOnScroll delay={570}>
          <div className="inline-flex items-center gap-3 border border-vert-clair/25 rounded-full px-5 py-2.5 bg-vert-feuille/15">
            <span className="text-vert-clair text-lg" aria-hidden="true">
              🌿
            </span>
            <p className="text-sm text-blanc/70 leading-snug">{m.co2}</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
