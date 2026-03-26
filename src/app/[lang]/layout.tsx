import { locales, type Locale } from "@/proxy";
import { getDictionary } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

function isLocale(val: string): val is Locale {
  return (locales as readonly string[]).includes(val);
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Header lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
