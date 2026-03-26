import { NextRequest, NextResponse } from "next/server";

export const locales = ["fr", "de", "it", "en"] as const;
export type Locale = (typeof locales)[number];
const defaultLocale: Locale = "fr";

function getLocale(request: NextRequest): Locale {
  const accept = request.headers.get("accept-language") ?? "";
  for (const locale of locales) {
    if (accept.toLowerCase().includes(locale)) return locale;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon|.*\\..*).*)"],
};
