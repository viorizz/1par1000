import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/proxy";

export function SignSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const s = dict.signer_section;

  return (
    <section id="signer" className="py-24 px-[5vw] bg-blanc">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
        <div>
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-or mb-3">
              {s.label}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={70}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-bleu mb-1 leading-tight">
              {s.titre}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={140}>
            <p className="text-base text-or italic mb-3">{s.sous}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-base text-texte-leger max-w-xl leading-relaxed mb-8">
              {s.intro}
            </p>
          </RevealOnScroll>

          <ol className="list-none mt-6">
            {s.etapes.map((etape, i) => (
              <RevealOnScroll key={i} delay={250 + i * 70}>
                <li className="flex gap-4 items-start py-4 border-b border-gris last:border-b-0">
                  <span className="bg-bleu text-or font-serif font-black text-sm w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                    {i + 1}
                  </span>
                  <div className="text-sm text-texte-leger leading-relaxed pt-1">
                    <strong className="text-bleu font-semibold block mb-0.5">
                      {etape.titre}
                    </strong>
                    {etape.desc}
                  </div>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>

        <RevealOnScroll delay={300}>
          <div className="bg-bleu p-10 rounded lg:sticky lg:top-24">
            <h3 className="font-serif text-2xl text-blanc mb-1">
              {dict.signer_page.option1_titre}
            </h3>
            <p className="text-sm text-blanc/60 leading-relaxed mb-6">
              {dict.signer_page.option1_desc}
            </p>
            <Link
              href={`/${lang}/signer`}
              className="block w-full bg-or text-bleu font-bold text-base text-center py-4 no-underline tracking-wide uppercase rounded-sm hover:bg-or-clair hover:-translate-y-0.5 transition-all"
            >
              {dict.hero.cta_signer}
            </Link>
            <p className="text-xs text-blanc/40 mt-3 leading-relaxed text-center">
              {dict.signer_page.form_note}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
