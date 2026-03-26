import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/proxy";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="bg-bleu pt-16 pb-10 px-[5vw] border-t-[3px] border-or">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10 max-w-6xl mx-auto">
        <div>
          <div className="font-serif text-xl text-blanc mb-1">
            Un franc <span className="text-or">par mille</span>
          </div>
          <div className="text-sm text-or italic mb-3">{dict.footer.tagline}</div>
          <p className="text-sm text-blanc/50 leading-relaxed max-w-xs">
            {dict.footer.desc}
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-or mb-4">
            {dict.footer.nav_titre}
          </div>
          <ul className="list-none space-y-2">
            {[
              { href: `/${lang}#preambule`, label: dict.nav.conviction },
              { href: `/${lang}#chiffres`, label: dict.nav.chiffres },
              { href: `/${lang}#pouvoir`, label: dict.nav.pouvoir },
              { href: `/${lang}#identite`, label: dict.nav.identite },
              { href: `/${lang}#objections`, label: dict.nav.questions },
              { href: `/${lang}/signer`, label: dict.nav.signer },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-blanc/55 no-underline hover:text-blanc transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-or mb-4">
            {dict.footer.docs_titre}
          </div>
          <ul className="list-none space-y-2">
            {[
              dict.footer.doc_texte,
              dict.footer.doc_dossier,
              dict.footer.doc_note,
              dict.footer.doc_preambule,
            ].map((label) => (
              <li key={label}>
                <span className="text-sm text-blanc/55 cursor-default">
                  {label}
                </span>
              </li>
            ))}
            <li>
              <Link
                href={`/${lang}/signer`}
                className="text-sm text-blanc/55 no-underline hover:text-blanc transition-colors"
              >
                {dict.footer.doc_signer}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blanc/[.08] pt-6 flex flex-wrap justify-between items-center gap-4 max-w-6xl mx-auto">
        <span className="text-xs text-blanc/30">{dict.footer.legal}</span>
        <span className="text-xs text-blanc/30">{dict.contact.email}</span>
      </div>
    </footer>
  );
}
