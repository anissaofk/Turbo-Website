"use client";

import Link from "next/link";
import { CarCard } from "@/components/cars";
import { useT } from "@/i18n/LanguageProvider";
import type { Car, SiteCaseId } from "@/types";

export function CategoryPageView({
  slug,
  listings,
}: {
  slug: SiteCaseId;
  listings: Car[];
}) {
  const t = useT();
  const title = t.categories[slug];
  const description = t.categoryDesc[slug];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        {t.common.backHome}
      </Link>

      <div className="mt-6 animate-rise max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          {t.common.caseEyebrow}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-muted">{description}</p>
      </div>

      <div className="mt-10 flex items-center justify-between border-b border-line pb-4">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{listings.length}</span>{" "}
          {t.common.listings}
        </p>
        <Link
          href={`/search?category=${slug}`}
          className="text-sm font-semibold text-accent hover:text-accent-deep"
        >
          {t.common.filterInSearch}
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="mt-10 text-muted">{t.common.noListings}</p>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
