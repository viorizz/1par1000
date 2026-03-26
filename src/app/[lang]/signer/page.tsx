import { locales, type Locale } from "@/proxy";
import { getDictionary } from "@/lib/i18n";
import { SignatureForm } from "@/components/SignatureForm";
import { VolunteerForm } from "@/components/VolunteerForm";
import { QRShare } from "@/components/QRShare";
import { Rules } from "@/components/Rules";
import { Contact } from "@/components/Contact";
import { notFound } from "next/navigation";

export default async function SignerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!(locales as readonly string[]).includes(rawLang)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.signer_page;

  return (
    <main>
      {/* Hero */}
      <div className="bg-bleu pt-28 pb-20 px-[5vw] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_100%,rgba(200,169,81,0.12),transparent)]" />
        <div className="relative z-10 max-w-[680px] mx-auto">
          <h1 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-black text-blanc mb-4 leading-tight">
            {t.titre} <span className="text-or">{t.titre_accent}</span>
          </h1>
          <p className="text-base text-blanc/70 leading-relaxed mb-8">
            {t.intro}
          </p>
          <div className="bg-blanc/[.08] rounded px-6 py-4 inline-flex gap-10 border border-or/30">
            <div className="text-center">
              <span className="font-serif text-3xl font-black text-or block">
                0
              </span>
              <span className="text-[0.72rem] tracking-wider uppercase text-blanc/45 block mt-0.5">
                {t.signatures_label}
              </span>
            </div>
            <div className="text-center">
              <span className="font-serif text-3xl font-black text-or block">
                100&apos;000
              </span>
              <span className="text-[0.72rem] tracking-wider uppercase text-blanc/45 block mt-0.5">
                {t.objectif_label}
              </span>
            </div>
            <div className="text-center">
              <span className="font-serif text-3xl font-black text-or block">
                —
              </span>
              <span className="text-[0.72rem] tracking-wider uppercase text-blanc/45 block mt-0.5">
                {t.jours_label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Three options */}
      <div className="max-w-[1100px] mx-auto -mt-10 px-[5vw] pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Option 1: Download */}
          <div className="bg-blanc rounded-md shadow-lg overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-xl transition-all">
            <div className="px-6 pt-6 pb-4 border-b border-gris flex items-center gap-3">
              <div className="w-12 h-12 bg-bleu rounded-full flex items-center justify-center text-xl shrink-0">
                📄
              </div>
              <div>
                <div className="font-serif text-base text-bleu font-bold">
                  {t.option1_titre}
                </div>
                <div className="text-xs text-texte-leger mt-0.5">
                  {t.option1_sous}
                </div>
              </div>
            </div>
            <div className="p-6 flex-1">
              <p className="text-sm text-texte-leger leading-relaxed mb-5">
                {t.option1_desc}
              </p>
              <SignatureForm dict={dict} />
            </div>
          </div>

          {/* Option 2: Volunteer */}
          <div className="bg-blanc rounded-md shadow-lg overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-xl transition-all">
            <div className="px-6 pt-6 pb-4 border-b border-gris flex items-center gap-3">
              <div className="w-12 h-12 bg-or rounded-full flex items-center justify-center text-xl shrink-0">
                🤝
              </div>
              <div>
                <div className="font-serif text-base text-bleu font-bold">
                  {t.option2_titre}
                </div>
                <div className="text-xs text-texte-leger mt-0.5">
                  {t.option2_sous}
                </div>
              </div>
            </div>
            <div className="p-6 flex-1">
              <p className="text-sm text-texte-leger leading-relaxed mb-5">
                {t.option2_desc}
              </p>
              <VolunteerForm dict={dict} />
            </div>
          </div>

          {/* Option 3: QR Code */}
          <div className="bg-blanc rounded-md shadow-lg overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-xl transition-all">
            <div className="px-6 pt-6 pb-4 border-b border-gris flex items-center gap-3">
              <div className="w-12 h-12 bg-bleu rounded-full flex items-center justify-center text-2xl shrink-0">
                📱
              </div>
              <div>
                <div className="font-serif text-base text-bleu font-bold">
                  {t.option3_titre}
                </div>
                <div className="text-xs text-texte-leger mt-0.5">
                  {t.option3_sous}
                </div>
              </div>
            </div>
            <div className="p-6 flex-1">
              <p className="text-sm text-texte-leger leading-relaxed mb-5">
                {t.option3_desc}
              </p>
              <QRShare dict={dict} />
            </div>
          </div>
        </div>
      </div>

      <Rules dict={dict} />
      <Contact dict={dict} />
    </main>
  );
}
