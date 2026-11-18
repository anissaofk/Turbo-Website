"use client";

import { useState } from "react";
import { LOCALES } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t.nav.language}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-xs font-bold tracking-wide text-blue-navy transition hover:border-blue/40 hover:bg-blue-tint"
      >
        {LOCALES.find((l) => l.code === locale)?.short ?? "FR"}
        <span className="text-[10px] text-muted">▾</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 min-w-[10.5rem] overflow-hidden rounded-2xl border border-line bg-white py-1 shadow-xl">
            {LOCALES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLocale(item.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition hover:bg-blue-soft",
                  locale === item.code
                    ? "font-semibold text-blue-deep"
                    : "text-ink-soft",
                )}
              >
                <span>{item.label}</span>
                <span className="text-xs font-bold text-muted">{item.short}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
