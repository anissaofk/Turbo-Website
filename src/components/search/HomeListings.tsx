"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CarCard } from "@/components/cars";
import { filterCars } from "@/data/filter";
import { useT } from "@/i18n/LanguageProvider";

export function HomeListings() {
  const t = useT();
  const results = useMemo(
    () => filterCars({ category: "buy", sort: "newest" }).slice(0, 8),
    [],
  );

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
            {t.home.recentEyebrow}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-blue-navy sm:text-3xl">
            {t.home.recentTitle}
          </h2>
        </div>
        <Link
          href="/search?category=buy"
          className="text-sm font-semibold text-blue hover:text-blue-deep"
        >
          {t.home.seeAll} →
        </Link>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-[1.25rem] border border-dashed border-line bg-white px-6 py-16 text-center">
          <h3 className="font-display text-2xl font-semibold text-blue-navy">
            {t.home.noResultsTitle}
          </h3>
          <p className="mt-2 text-muted">{t.home.noResultsCopy}</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
