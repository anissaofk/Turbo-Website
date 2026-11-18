"use client";

import { useT } from "@/i18n/LanguageProvider";

export function SearchPageHeader() {
  const t = useT();

  return (
    <div className="animate-rise max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
        {t.search.pageEyebrow}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-blue-navy sm:text-5xl">
        {t.search.pageTitle}
      </h1>
      <p className="mt-3 text-muted">{t.search.pageSubtitle}</p>
    </div>
  );
}
