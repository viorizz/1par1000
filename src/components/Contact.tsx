import type { Dictionary } from "@/lib/i18n";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-16 px-[5vw] bg-gris text-center">
      <h2 className="font-serif text-2xl text-bleu mb-2">
        {dict.contact.titre}
      </h2>
      <p className="text-sm text-texte-leger mb-5">{dict.contact.desc}</p>
      <a
        href={`mailto:${dict.contact.email}`}
        className="inline-block bg-bleu text-blanc px-8 py-3 rounded-sm no-underline font-semibold hover:bg-bleu-clair transition-colors"
      >
        {dict.contact.email}
      </a>
    </section>
  );
}
