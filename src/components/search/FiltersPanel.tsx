"use client";

import type { ReactNode } from "react";
import { getCommonFeatures, getMakes } from "@/data/cars";
import { getSearchableCategories } from "@/data/categories";
import { RADIUS_OPTIONS_KM } from "@/data/geo";
import {
  tBodyType,
  tDrivetrain,
  tFuel,
  tSellerType,
  tTransmission,
} from "@/i18n/format";
import { useT } from "@/i18n/LanguageProvider";
import type {
  CarFilters,
  ColorFamily,
  Drivetrain,
  SellerType,
  SiteCaseId,
} from "@/types";

const fuels = ["Essence", "Diesel", "Hybride", "Électrique"] as const;
const transmissions = ["Manuelle", "Automatique"] as const;
const bodyTypes = [
  "Berline",
  "VUS",
  "Compacte",
  "Coupé",
  "Familiale",
  "Cabriolet",
  "Sportive",
] as const;
const drivetrains: Drivetrain[] = [
  "Traction avant",
  "Propulsion",
  "Intégral",
  "4x4",
];
const colors: ColorFamily[] = [
  "Blanc",
  "Noir",
  "Rouge",
  "Bleu",
  "Gris",
  "Vert",
  "Autre",
];
const sellerTypes: SellerType[] = ["Concessionnaire", "Particulier", "Garage"];
const yearOptions = Array.from({ length: 16 }, (_, i) => 2026 - i);
const mileageOptions = [10000, 25000, 50000, 75000, 100000, 150000, 200000];
const powerOptions = [100, 150, 200, 250, 300, 400];
const doorOptions = [2, 3, 4, 5];
const seatOptions = [2, 4, 5, 7];

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
      {children}
    </span>
  );
}

export function FiltersPanel({ filters }: { filters: CarFilters }) {
  const t = useT();
  const makes = getMakes();
  const features = getCommonFeatures();
  const listedOptions = [
    { value: 1, label: "24h" },
    { value: 7, label: "7" },
    { value: 14, label: "14" },
    { value: 30, label: "30" },
  ];

  return (
    <form
      action="/search"
      method="get"
      className="card-soft animate-rise space-y-5 p-5"
    >
      <div>
        <p className="font-display text-lg font-semibold">
          {t.search.detailedTitle}
        </p>
        <p className="mt-1 text-sm text-muted">{t.search.detailedSubtitle}</p>
      </div>

      {filters.intent && (
        <input type="hidden" name="intent" value={filters.intent} />
      )}

      <div className="grid grid-cols-[1.3fr_1fr] gap-2">
        <label className="block">
          <FieldLabel>{t.search.postalCode}</FieldLabel>
          <input
            name="postalCode"
            defaultValue={filters.postalCode ?? ""}
            placeholder={t.search.postalPlaceholder}
            className="field uppercase"
            maxLength={7}
            autoComplete="postal-code"
          />
        </label>
        <label className="block">
          <FieldLabel>{t.search.radius}</FieldLabel>
          <select
            name="radiusKm"
            defaultValue={filters.radiusKm ?? 100}
            className="field"
          >
            {RADIUS_OPTIONS_KM.map((km) => (
              <option key={km} value={km}>
                {km} km
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <FieldLabel>{t.search.category}</FieldLabel>
        <select
          name="category"
          defaultValue={filters.category ?? ""}
          className="field"
        >
          <option value="">{t.search.allCategories}</option>
          {getSearchableCategories().map((cat) => (
            <option key={cat.id} value={cat.id}>
              {t.categories[cat.id as SiteCaseId]}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-2">
        <input type="hidden" name="excludeDamaged" value="0" />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="excludeDamaged"
            value="1"
            defaultChecked={filters.excludeDamaged !== false}
          />
          {t.search.excludeDamagedFull}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="certified"
            value="1"
            defaultChecked={!!filters.certified}
          />
          {t.search.certified}
        </label>
      </div>

      <label className="block">
        <FieldLabel>{t.search.seller}</FieldLabel>
        <select
          name="sellerType"
          defaultValue={filters.sellerType ?? ""}
          className="field"
        >
          <option value="">{t.search.allSellers}</option>
          {sellerTypes.map((type) => (
            <option key={type} value={type}>
              {tSellerType(t, type)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>{t.search.make}</FieldLabel>
        <select name="make" defaultValue={filters.make ?? ""} className="field">
          <option value="">{t.search.allMakes}</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>{t.search.model}</FieldLabel>
        <input
          name="model"
          defaultValue={filters.model ?? ""}
          placeholder="Civic, RAV4…"
          className="field"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <FieldLabel>{t.search.yearMin}</FieldLabel>
          <select
            name="yearMin"
            defaultValue={filters.yearMin ?? ""}
            className="field"
          >
            <option value="">{t.search.min}</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <FieldLabel>{t.search.yearMax}</FieldLabel>
          <select
            name="yearMax"
            defaultValue={filters.yearMax ?? ""}
            className="field"
          >
            <option value="">{t.search.max}</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <FieldLabel>{t.search.priceMin}</FieldLabel>
          <input
            name="priceMin"
            type="number"
            min={0}
            step={500}
            defaultValue={filters.priceMin ?? ""}
            className="field"
          />
        </label>
        <label className="block">
          <FieldLabel>{t.search.priceMax}</FieldLabel>
          <input
            name="priceMax"
            type="number"
            min={0}
            step={500}
            defaultValue={filters.priceMax ?? ""}
            className="field"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <FieldLabel>{t.search.monthlyMax}</FieldLabel>
          <input
            name="monthlyMax"
            type="number"
            min={0}
            defaultValue={filters.monthlyMax ?? ""}
            className="field"
          />
        </label>
        <label className="block">
          <FieldLabel>{t.search.downPaymentMax}</FieldLabel>
          <input
            name="downPaymentMax"
            type="number"
            min={0}
            defaultValue={filters.downPaymentMax ?? ""}
            className="field"
          />
        </label>
      </div>

      <label className="block">
        <FieldLabel>{t.search.bodyType}</FieldLabel>
        <select
          name="bodyType"
          defaultValue={filters.bodyType ?? ""}
          className="field"
        >
          <option value="">{t.search.allBodyTypes}</option>
          {bodyTypes.map((item) => (
            <option key={item} value={item}>
              {tBodyType(t, item)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>{t.search.color}</FieldLabel>
        <select
          name="color"
          defaultValue={filters.color ?? ""}
          className="field"
        >
          <option value="">{t.search.allColors}</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>{t.search.mileageMax}</FieldLabel>
        <select
          name="mileageMax"
          defaultValue={filters.mileageMax ?? ""}
          className="field"
        >
          <option value="">{t.search.all}</option>
          {mileageOptions.map((km) => (
            <option key={km} value={km}>
              {km.toLocaleString("fr-CA")} km
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>{t.search.drivetrain}</FieldLabel>
        <select
          name="drivetrain"
          defaultValue={filters.drivetrain ?? ""}
          className="field"
        >
          <option value="">{t.search.allDrivetrains}</option>
          {drivetrains.map((item) => (
            <option key={item} value={item}>
              {tDrivetrain(t, item)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>{t.search.fuel}</FieldLabel>
        <select name="fuel" defaultValue={filters.fuel ?? ""} className="field">
          <option value="">{t.search.allFuels}</option>
          {fuels.map((fuel) => (
            <option key={fuel} value={fuel}>
              {tFuel(t, fuel)}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <FieldLabel>{t.search.powerMin}</FieldLabel>
          <select
            name="powerMin"
            defaultValue={filters.powerMin ?? ""}
            className="field"
          >
            <option value="">{t.search.min}</option>
            {powerOptions.map((hp) => (
              <option key={hp} value={hp}>
                {hp} {t.listing.hp}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <FieldLabel>{t.search.powerMax}</FieldLabel>
          <select
            name="powerMax"
            defaultValue={filters.powerMax ?? ""}
            className="field"
          >
            <option value="">{t.search.max}</option>
            {powerOptions.map((hp) => (
              <option key={hp} value={hp}>
                {hp} {t.listing.hp}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <FieldLabel>{t.search.transmission}</FieldLabel>
        <select
          name="transmission"
          defaultValue={filters.transmission ?? ""}
          className="field"
        >
          <option value="">{t.search.allTransmissions}</option>
          {transmissions.map((item) => (
            <option key={item} value={item}>
              {tTransmission(t, item)}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <FieldLabel>{t.search.doors}</FieldLabel>
          <select
            name="doors"
            defaultValue={filters.doors ?? ""}
            className="field"
          >
            <option value="">{t.search.all}</option>
            {doorOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <FieldLabel>{t.search.seats}</FieldLabel>
          <select
            name="seats"
            defaultValue={filters.seats ?? ""}
            className="field"
          >
            <option value="">{t.search.all}</option>
            {seatOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <FieldLabel>{t.search.feature}</FieldLabel>
        <select
          name="feature"
          defaultValue={filters.feature ?? ""}
          className="field"
        >
          <option value="">{t.search.allFeatures}</option>
          {features.map((feature) => (
            <option key={feature} value={feature}>
              {feature}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>{t.search.listedWithin}</FieldLabel>
        <select
          name="listedWithinDays"
          defaultValue={filters.listedWithinDays ?? ""}
          className="field"
        >
          <option value="">{t.search.listedAny}</option>
          {listedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>{t.search.keywords}</FieldLabel>
        <input
          name="q"
          defaultValue={filters.q ?? ""}
          placeholder={t.search.keywordsPlaceholder}
          className="field"
        />
      </label>

      <div className="space-y-2 border-t border-line pt-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="sporty"
            value="1"
            defaultChecked={!!filters.sporty}
          />
          {t.search.sporty}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="reliable"
            value="1"
            defaultChecked={!!filters.reliable}
          />
          {t.search.reliableFull}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="offer"
            value="1"
            defaultChecked={!!filters.offer}
          />
          {t.search.offersOnly}
        </label>
      </div>

      <input type="hidden" name="sort" value={filters.sort ?? "newest"} />

      <div className="flex gap-2 pt-1">
        <button type="submit" className="btn-primary flex-1 text-sm">
          {t.search.apply}
        </button>
        <a
          href="/search"
          className="inline-flex flex-1 items-center justify-center border border-line px-3 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
        >
          {t.search.reset}
        </a>
      </div>
    </form>
  );
}
