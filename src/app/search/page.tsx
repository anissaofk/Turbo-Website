import { Suspense } from "react";
import { CarCard } from "@/components/cars";
import {
  FiltersPanel,
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
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
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
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <FiltersPanel filters={filters} />
      </aside>

      <section>
        {filters.intent && (
          <div className="mb-6 border border-line bg-white p-4">
            <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
              Intention comprise
            </p>
            <p className="mt-2 text-sm text-ink-soft">&ldquo;{filters.intent}&rdquo;</p>
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
        )}

        <div className="mb-6 flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            annonces trouvées
          </p>
          <Suspense fallback={null}>
            <SortSelect />
          </Suspense>
        </div>

        {results.length === 0 ? (
          <div className="border border-dashed border-line bg-white/70 px-6 py-16 text-center">
            <h2 className="font-display text-2xl font-semibold">
              Aucune annonce ne correspond
            </h2>
            <p className="mt-2 text-muted">
              Élargissez le budget mensuel ou retirez quelques filtres.
            </p>
            <a href="/search" className="btn-primary mt-6 inline-flex">
              Réinitialiser
            </a>
          </div>
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
      <div className="animate-rise max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
          Recherche
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-blue-navy sm:text-5xl">
          Annonces Autiva
        </h1>
        <p className="mt-3 text-muted">
          Écrivez votre besoin en français, ou utilisez les filtres détaillés.
        </p>
      </div>

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
