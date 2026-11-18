import { Suspense } from "react";
import { CarCard } from "@/components/cars";
import {
  FiltersPanel,
  SearchEmptyState,
  SearchPageHeader,
  SearchResultsCount,
  IntentBanner,
  SmartSearchForm,
  SortSelect,
} from "@/components/search";
import { filterCars, parseFilters } from "@/data/filter";
import { describeIntent, parseSmartIntent } from "@/lib/smartSearch";
import type { CarFilters } from "@/types";

export const metadata = {
  title: "Annonces",
  description:
    "Recherche détaillée Autiva — filtres et intention en langage naturel.",
};

function ResultsSkeleton() {
  return (
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
  );
}

async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters: CarFilters = parseFilters(params);
  const results = filterCars(filters);
  const chips = filters.intent
    ? describeIntent(parseSmartIntent(filters.intent))
    : [];

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

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SearchPageHeader />

      <div className="mt-8 rounded-[1.5rem] bg-blue-soft/60 p-5">
        <SmartSearchForm />
      </div>

      <div className="mt-10">
        <Suspense fallback={<ResultsSkeleton />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
