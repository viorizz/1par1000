import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/proxy";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const h = dict.hero;

  return (
    <section className="min-h-screen bg-bleu flex items-center relative overflow-hidden pt-[130px] pb-20 px-[5vw]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(200,169,81,0.08),transparent_70%),radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(200,169,81,0.05),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,169,81,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,81,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[820px]">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-or mb-1 animate-fade-up [animation-delay:0.2s] opacity-0">
          {h.surtitre}
        </p>
        <p className="text-sm text-blanc/50 italic mb-7 animate-fade-up [animation-delay:0.35s] opacity-0">
          {h.tagline}
        </p>
        <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] font-black leading-none text-blanc mb-4 animate-fade-up [animation-delay:0.4s] opacity-0">
          {h.titre1}
          <span className="text-or block">{h.titre2}</span>
        </h1>
        <p className="font-serif text-[clamp(1rem,2vw,1.35rem)] text-blanc/70 italic mb-8 max-w-[580px] leading-relaxed animate-fade-up [animation-delay:0.55s] opacity-0">
          {h.sous}
        </p>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-blanc font-light mb-10 leading-relaxed border-l-[3px] border-or pl-6 animate-fade-up [animation-delay:0.7s] opacity-0">
          {h.slogan1} <strong className="font-semibold text-or">{h.slogan_strong1}</strong>.
          <br />
          {h.slogan2} <strong className="font-semibold text-or">{h.slogan_strong2}</strong>.
        </p>
        <div className="flex gap-4 flex-wrap animate-fade-up [animation-delay:0.9s] opacity-0">
          <Link
            href={`/${lang}/signer`}
            className="inline-block bg-or text-bleu font-bold text-base py-4 px-8 no-underline tracking-wide uppercase rounded-sm border-2 border-or hover:bg-transparent hover:text-or hover:-translate-y-0.5 transition-all"
          >
            {h.cta_signer}
          </Link>
          <a
            href="#preambule"
            className="inline-block bg-transparent text-blanc font-normal text-base py-4 px-8 no-underline tracking-wide uppercase rounded-sm border-2 border-blanc/30 hover:border-blanc hover:-translate-y-0.5 transition-all"
          >
            {h.cta_decouvrir}
          </a>
        </div>
      </div>

      <div className="absolute right-[5vw] bottom-16 hidden lg:flex gap-10 animate-fade-up [animation-delay:1.1s] opacity-0">
        <div>
          <span className="font-serif text-5xl font-black text-or leading-none block">
            {h.stat_taux}
          </span>
          <span className="text-[0.7rem] tracking-[0.1em] uppercase text-blanc/45 block mt-1">
            {h.stat_taux_label}
          </span>
        </div>
        <div>
          <span className="font-serif text-5xl font-black text-or leading-none block">
            {h.stat_recettes}
            <small className="text-2xl">{h.stat_recettes_unit}</small>
          </span>
          <span className="text-[0.7rem] tracking-[0.1em] uppercase text-blanc/45 block mt-1">
            {h.stat_recettes_label}
          </span>
        </div>
        <div>
          <span className="font-serif text-5xl font-black text-or leading-none block">
            {h.stat_impot}
          </span>
          <span className="text-[0.7rem] tracking-[0.1em] uppercase text-blanc/45 block mt-1">
            {h.stat_impot_label}
          </span>
        </div>
      </div>
    </section>
  );
}
