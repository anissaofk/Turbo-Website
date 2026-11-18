"use client";

import Link from "next/link";
import { ListingGallery } from "@/components/cars/ListingGallery";
import { getCategory } from "@/data/categories";
import { formatMileage, formatPrice } from "@/data/filter";
import {
  formatLocaleDate,
  tBodyType,
  tDrivetrain,
  tFuel,
  tSellerType,
  tTransmission,
} from "@/i18n/format";
import { useLanguage, useT } from "@/i18n/LanguageProvider";
import type { Car } from "@/types";

function priceLabel(
  car: Car,
  perDay: string,
  locale: "fr" | "en" | "es",
) {
  if (car.price > 0) return formatPrice(car.price);
  if (car.dailyRate != null) {
    const n = new Intl.NumberFormat(
      locale === "fr" ? "fr-CA" : locale === "es" ? "es-CA" : "en-CA",
    ).format(car.dailyRate);
    return `${n} ${perDay}`;
  }
  return formatPrice(car.price);
}

export function CarDetailView({ car }: { car: Car }) {
  const t = useT();
  const { locale } = useLanguage();
  const category = getCategory(car.category);
  const isService = car.category === "inspection";
  const title = `${car.year} ${car.make} ${car.model}`;
  const price = priceLabel(car, t.listing.perDay, locale);
  const categoryLabel =
    t.categories[car.category as keyof typeof t.categories] ??
    category?.title ??
    car.category;

  const phoneHref = `tel:${car.seller.phone.replace(/\s/g, "")}`;
  const mailBody = t.listing.mailBody
    .replace("{title}", title)
    .replace("{price}", price);
  const mailHref = `mailto:hello@autiva.ca?subject=${encodeURIComponent(
    `${t.listing.mailSubject} ${car.make} ${car.model} (${car.id})`,
  )}&body=${encodeURIComponent(mailBody)}`;

  const keyFacts = isService
    ? [
        { label: t.listing.service, value: car.model },
        { label: t.listing.city, value: car.location },
        { label: t.listing.seller, value: tSellerType(t, car.seller.type) },
        {
          label: t.listing.note,
          value: `★ ${car.seller.rating.toFixed(1)}`,
        },
      ]
    : [
        { label: t.listing.mileage, value: formatMileage(car.mileage) },
        {
          label: t.listing.transmission,
          value: tTransmission(t, car.transmission),
        },
        { label: t.listing.fuel, value: tFuel(t, car.fuel) },
        { label: t.listing.seller, value: tSellerType(t, car.seller.type) },
      ];

  const basicRows = isService
    ? [
        { label: t.listing.category, value: categoryLabel },
        { label: t.listing.city, value: car.location },
        { label: t.listing.postalCode, value: car.postalCode },
        {
          label: t.listing.listedOn,
          value: formatLocaleDate(car.createdAt, locale),
        },
      ]
    : [
        { label: t.listing.year, value: String(car.year) },
        { label: t.listing.make, value: car.make },
        { label: t.listing.model, value: car.model },
        { label: t.listing.bodyType, value: tBodyType(t, car.bodyType) },
        { label: t.listing.mileage, value: formatMileage(car.mileage) },
        {
          label: t.listing.sellerType,
          value: tSellerType(t, car.seller.type),
        },
        { label: t.listing.category, value: categoryLabel },
        {
          label: t.listing.listedOn,
          value: formatLocaleDate(car.createdAt, locale),
        },
      ];

  const techRows = isService
    ? []
    : [
        {
          label: t.listing.transmission,
          value: tTransmission(t, car.transmission),
        },
        { label: t.listing.fuelType, value: tFuel(t, car.fuel) },
        {
          label: t.listing.drivetrain,
          value: tDrivetrain(t, car.drivetrain),
        },
        {
          label: t.listing.power,
          value: `${car.powerHp} ${t.listing.hp}`,
        },
        { label: t.listing.doors, value: String(car.doors) },
        { label: t.listing.seats, value: String(car.seats) },
      ];

  const appearanceRows = isService
    ? []
    : [
        { label: t.listing.color, value: car.color },
        {
          label: t.listing.reliability,
          value: `${car.reliability.toFixed(1)} / 5`,
        },
        {
          label: t.listing.certification,
          value: car.certified
            ? t.listing.certifiedYes
            : t.listing.certifiedNo,
        },
        {
          label: t.listing.condition,
          value: car.damaged ? t.listing.damagedYes : t.listing.damagedNo,
        },
      ];

  return (
    <div className="pb-24 lg:pb-12">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <Link
          href="/search?category=buy"
          className="text-sm font-semibold text-blue hover:text-blue-deep"
        >
          {t.common.backListings}
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-10">
          <div className="min-w-0 space-y-8">
            <ListingGallery images={car.images} alt={title} />

            <header className="animate-rise space-y-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">
                  {categoryLabel}
                  {car.offer ? ` · ${t.common.offer}` : ""}
                </p>
                <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-blue-navy sm:text-[2rem] sm:leading-tight">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-muted">
                  {car.location}, QC
                  {car.postalCode ? ` · ${car.postalCode}` : ""}
                </p>
              </div>

              <div className="flex flex-wrap items-end gap-3">
                <div className="rounded-2xl bg-blue-soft px-4 py-3">
                  <p className="font-display text-3xl font-bold tracking-tight text-blue-deep sm:text-4xl">
                    {price}
                  </p>
                  {car.price > 0 && (
                    <p className="mt-0.5 text-[11px] font-semibold tracking-wide text-blue-deep/70 uppercase">
                      {t.listing.taxesNote}
                    </p>
                  )}
                </div>
                {car.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {car.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-soft ring-1 ring-line"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            <section className="animate-rise delay-1">
              <h2 className="sr-only">{t.listing.overview}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {keyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl bg-white px-4 py-3.5 ring-1 ring-line"
                  >
                    <p className="text-[11px] font-medium text-muted">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <SpecBlock title={t.listing.basicData} rows={basicRows} />
            {techRows.length > 0 && (
              <SpecBlock title={t.listing.techData} rows={techRows} />
            )}
            {appearanceRows.length > 0 && (
              <SpecBlock title={t.listing.appearance} rows={appearanceRows} />
            )}

            {car.features.length > 0 && (
              <section className="animate-rise">
                <h2 className="font-display text-xl font-semibold text-blue-navy">
                  {t.listing.features}
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {car.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-sm text-ink-soft ring-1 ring-line"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="animate-rise">
              <h2 className="font-display text-xl font-semibold text-blue-navy">
                {t.listing.description}
              </h2>
              <div className="mt-3 rounded-2xl bg-white p-4 ring-1 ring-line sm:p-5">
                <p className="max-w-3xl text-[15px] leading-relaxed text-ink-soft whitespace-pre-line">
                  {car.description}
                </p>
              </div>
            </section>

            <section className="animate-rise rounded-2xl bg-white p-5 ring-1 ring-line sm:p-6">
              <h2 className="font-display text-xl font-semibold text-blue-navy">
                {t.listing.seller}
              </h2>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-ink">
                    {car.seller.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {tSellerType(t, car.seller.type)} · {car.seller.city}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {t.listing.rating} ★ {car.seller.rating.toFixed(1)} / 5
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    {car.location}
                    {car.postalCode ? `, ${car.postalCode}` : ""}, QC
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:min-w-[200px]">
                  <a href={phoneHref} className="btn-primary w-full">
                    {t.listing.call}
                  </a>
                  <a
                    href={mailHref}
                    className="inline-flex w-full items-center justify-center rounded-full border border-line px-4 py-3 text-sm font-semibold transition hover:bg-paper-deep"
                  >
                    {t.listing.email}
                  </a>
                </div>
              </div>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                {t.listing.disclaimer}
              </p>
            </section>
          </div>

          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <div className="animate-slide space-y-4 rounded-2xl bg-white p-5 ring-1 ring-line">
              <div className="rounded-2xl bg-blue-soft px-4 py-3">
                <p className="text-[11px] font-semibold tracking-wide text-blue-deep uppercase">
                  {t.listing.askingPrice}
                </p>
                <p className="mt-0.5 font-display text-3xl font-bold tracking-tight text-blue-deep">
                  {price}
                </p>
                {car.price > 0 && (
                  <p className="mt-1 text-[11px] font-medium text-blue-deep/70">
                    {t.listing.taxesNote}
                  </p>
                )}
              </div>

              {!isService && (
                <ul className="space-y-2 text-sm text-ink-soft">
                  <li className="flex justify-between gap-3">
                    <span className="text-muted">{t.listing.year}</span>
                    <span className="font-semibold text-ink">{car.year}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-muted">{t.listing.mileage}</span>
                    <span className="font-semibold text-ink">
                      {formatMileage(car.mileage)}
                    </span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-muted">{t.listing.fuel}</span>
                    <span className="font-semibold text-ink">
                      {tFuel(t, car.fuel)}
                    </span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-muted">{t.listing.transmission}</span>
                    <span className="font-semibold text-ink">
                      {tTransmission(t, car.transmission)}
                    </span>
                  </li>
                </ul>
              )}

              <div className="space-y-2.5 border-t border-line pt-4">
                <a href={phoneHref} className="btn-primary w-full">
                  {t.listing.call} {car.seller.phone}
                </a>
                <a
                  href={mailHref}
                  className="inline-flex w-full items-center justify-center rounded-full border border-line px-4 py-3 text-sm font-semibold transition hover:bg-paper-deep"
                >
                  {t.listing.sendEmail}
                </a>
              </div>

              <div className="border-t border-line pt-4">
                <p className="text-sm font-semibold text-ink">
                  {car.seller.name}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {tSellerType(t, car.seller.type)} · {car.seller.city}
                </p>
                <p className="mt-1 text-sm text-muted">
                  ★ {car.seller.rating.toFixed(1)}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted">{car.make}</p>
            <p className="truncate font-display text-base font-bold text-blue-deep">
              {price}
            </p>
          </div>
          <a href={phoneHref} className="btn-primary shrink-0 px-5">
            {t.listing.call}
          </a>
          <a
            href={mailHref}
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-line px-4 py-3 text-sm font-semibold"
          >
            {t.listing.email}
          </a>
        </div>
      </div>
    </div>
  );
}

function SpecBlock({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <section className="animate-rise">
      <h2 className="font-display text-xl font-semibold text-blue-navy">
        {title}
      </h2>
      <dl className="mt-3 divide-y divide-line overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 px-4 py-3.5"
          >
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="text-right text-sm font-semibold text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
