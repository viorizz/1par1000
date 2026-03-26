"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, type Locale } from "@/proxy";

const labels: Record<Locale, string> = {
  fr: "FR",
  de: "DE",
  it: "IT",
  en: "EN",
};

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();

  function getLocalizedPath(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  }

  return (
    <div className="flex gap-1">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale)}
          className={`text-xs px-1.5 py-0.5 rounded-sm no-underline transition-colors ${
            locale === currentLang
              ? "bg-or text-bleu font-semibold"
              : "text-blanc/50 hover:text-blanc"
          }`}
        >
          {labels[locale]}
        </Link>
      ))}
    </div>
  );
}
