"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/proxy";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bleu/[.97] backdrop-blur-sm border-b-2 border-or">
      <div className="flex items-center justify-between px-[5vw] h-[72px]">
        <Link href={`/${lang}`} className="flex flex-col">
          <span className="font-serif text-[1.1rem] text-blanc">
            Un franc <span className="text-or">par mille</span>
          </span>
          <span className="text-[0.68rem] text-blanc/45 italic tracking-wide">
            {dict.hero.tagline}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-6 list-none">
            {[
              { href: "#preambule", label: dict.nav.conviction },
              { href: "#chiffres", label: dict.nav.chiffres },
              { href: "#pouvoir", label: dict.nav.pouvoir },
              { href: "#identite", label: dict.nav.identite },
              { href: "#objections", label: dict.nav.questions },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-blanc/80 no-underline text-[0.82rem] tracking-wider uppercase hover:text-or transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={`/${lang}/signer`}
                className="bg-or text-bleu font-semibold px-4 py-1.5 rounded-sm text-[0.82rem] tracking-wider uppercase no-underline hover:bg-or-clair transition-colors"
              >
                {dict.nav.signer}
              </Link>
            </li>
          </ul>
          <LanguageSwitcher currentLang={lang} />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher currentLang={lang} />
          <button
            onClick={() => setOpen(!open)}
            className="text-blanc p-2"
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-bleu border-t border-blanc/10 px-[5vw] py-4">
          <ul className="flex flex-col gap-3 list-none">
            {[
              { href: "#preambule", label: dict.nav.conviction },
              { href: "#chiffres", label: dict.nav.chiffres },
              { href: "#pouvoir", label: dict.nav.pouvoir },
              { href: "#identite", label: dict.nav.identite },
              { href: "#objections", label: dict.nav.questions },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-blanc/80 no-underline text-sm tracking-wider uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={`/${lang}/signer`}
                onClick={() => setOpen(false)}
                className="inline-block bg-or text-bleu font-semibold px-4 py-2 rounded-sm text-sm tracking-wider uppercase no-underline mt-2"
              >
                {dict.nav.signer}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
