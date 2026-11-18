"use client";

import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/dictionaries";

export function AppShell({
  children,
  initialLocale = "fr",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <Suspense fallback={<div className="h-[57px] border-b border-line bg-white/95" />}>
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
