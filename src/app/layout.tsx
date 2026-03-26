import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Un franc par mille — Initiative citoyenne, humaniste et apolitique",
  description:
    "Initiative populaire fédérale suisse pour l'instauration d'un micro-impôt sur les transactions électroniques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
