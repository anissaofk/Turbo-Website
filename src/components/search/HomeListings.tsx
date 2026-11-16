"use client";

import { useMemo, useState } from "react";
import { CarCard } from "@/components/cars";
import { HomeSearchPanel } from "@/components/search/HomeSearchPanel";
import { filterCars, parseFilters } from "@/data/filter";
import type { CarFilters } from "@/types";

export function HomeListings() {
  const [filters, setFilters] = useState<CarFilters>({ sort: "newest" });

  const results = useMemo(() => filterCars(filters), [filters]);

  function onFilterChange(params: URLSearchParams) {
    const record: Record<string, string> = {};
    params.forEach((value, key) => {
      record[key] = value;
    });
    setFilters(parseFilters(record));
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-8">
      <HomeSearchPanel liveFilter onFilterChange={onFilterChange} />

      <div className="mt-8 flex items-center justify-between border-b border-line pb-3">
        <p className="text-sm text-muted">
          <span className="font-semibold text-blue-navy">{results.length}</span>{" "}
          véhicules
        </p>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-[1.25rem] border border-dashed border-line bg-white px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold text-blue-navy">
            Aucune voiture trouvée
          </h2>
          <p className="mt-2 text-muted">
            Modifiez les filtres ou élargissez votre recherche.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
