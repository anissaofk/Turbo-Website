"use client";

import { useT } from "@/i18n/LanguageProvider";

export function SearchResultsCount({ count }: { count: number }) {
  const t = useT();
  return (
    <p className="text-sm text-muted">
      <span className="font-semibold text-ink">{count}</span> {t.search.resultsFound}
    </p>
  );
}

export function SearchEmptyState() {
  const t = useT();
  return (
    <div className="border border-dashed border-line bg-white/70 px-6 py-16 text-center">
      <h2 className="font-display text-2xl font-semibold">
        {t.search.noResultsTitle}
      </h2>
      <p className="mt-2 text-muted">{t.search.noResultsCopy}</p>
      <a href="/search" className="btn-primary mt-6 inline-flex">
        {t.search.reset}
      </a>
    </div>
  );
}

export function IntentBanner({
  intent,
  chips,
}: {
  intent: string;
  chips: string[];
}) {
  const t = useT();
  return (
    <div className="mb-6 border border-line bg-white p-4">
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
        {t.search.intentUnderstood}
      </p>
      <p className="mt-2 text-sm text-ink-soft">&ldquo;{intent}&rdquo;</p>
      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="bg-paper-deep px-2.5 py-1 text-xs font-medium"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
