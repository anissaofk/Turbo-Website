"use client";

import { SellForm } from "@/components/sell/SellForm";
import { useT } from "@/i18n/LanguageProvider";

export function SellPageView() {
  const t = useT();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-rise max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          {t.sell.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.sell.heading}
        </h1>
        <p className="mt-4 text-muted">{t.sell.subtitle}</p>
      </div>

      <div className="mt-10">
        <SellForm />
      </div>
    </div>
  );
}
