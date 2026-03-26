import { locales, type Locale } from "@/proxy";
import { getDictionary } from "@/lib/i18n";
import { Hero } from "@/components/Hero";
import { Preamble } from "@/components/Preamble";
import { Stats } from "@/components/Stats";
import { PurchasingPower } from "@/components/PurchasingPower";
import { Identity } from "@/components/Identity";
import { Comparison } from "@/components/Comparison";
import { Objections } from "@/components/Objections";
import { SignSection } from "@/components/SignSection";
import { notFound } from "next/navigation";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!(locales as readonly string[]).includes(rawLang)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero lang={lang} dict={dict} />
      <Preamble dict={dict} />
      <Stats dict={dict} />
      <PurchasingPower dict={dict} />
      <Identity dict={dict} />
      <Comparison dict={dict} />
      <Objections dict={dict} />
      <SignSection lang={lang} dict={dict} />
    </main>
  );
}
