import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Autiva — Trouvez. Comparez. Achetez.",
    template: "%s · Autiva",
  },
  description:
    "Votre assistant automobile intelligent pour trouver la voiture parfaite, au meilleur prix.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  // Pas de cookies() ici : /_not-found doit rester statique.
  // La langue est synchronisée côté client via LanguageProvider.
  return (
    <html
      lang="fr"
      className={`${body.variable} ${display.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="page-shell relative flex min-h-full flex-col">
        <AppShell initialLocale="fr">{children}</AppShell>
      </body>
    </html>
  );
}
