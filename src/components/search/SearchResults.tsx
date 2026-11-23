"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CarCard } from "@/components/cars";
import { FiltersPanel } from "@/components/search/FiltersPanel";
import {
  IntentBanner,
  SearchEmptyState,
  SearchResultsCount,
} from "@/components/search/SearchResultsChrome";
import { SortSelect } from "@/components/search/SortSelect";
import { filterCars, parseFilters } from "@/data/filter";
import { describeIntent, parseSmartIntent } from "@/lib/smartSearch";

function SearchResultsInner() {
  const searchParams = useSearchParams();

  const { filters, results, chips } = useMemo(() => {
    const raw: Record<string, string | string[] | undefined> = {};
    searchParams.forEach((value, key) => {
      const existing = raw[key];
      if (existing == null) {
        raw[key] = value;
      } else if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        raw[key] = [existing, value];
      }
    });

    const nextFilters = parseFilters(raw);
    return {
      filters: nextFilters,
      results: filterCars(nextFilters),
      chips: nextFilters.intent
        ? describeIntent(parseSmartIntent(nextFilters.intent))
        : [],
    };
  }, [searchParams]);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="max-h-[calc(100vh-3rem)] overflow-y-auto lg:sticky lg:top-6 lg:self-start">
        <FiltersPanel filters={filters} />
      </aside>

      <section>
        {filters.intent && (
          <IntentBanner intent={filters.intent} chips={chips} />
        )}

        <div className="mb-6 flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchResultsCount count={results.length} />
          <Suspense fallback={null}>
            <SortSelect />
          </Suspense>
        </div>

        {results.length === 0 ? (
          <SearchEmptyState />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export function SearchResults() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <div className="h-[32rem] border border-line bg-white/50" />
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-[16/10] bg-paper-deep" />
                <div className="h-5 w-3/4 bg-paper-deep" />
                <div className="h-4 w-1/2 bg-paper-deep" />
              </div>
            ))}
          </div>
        </div>
      }
    >
      <SearchResultsInner />
    </Suspense>
  );
}
