"use client";

import { FormEvent, useEffect, useEffectEvent, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconArrow, IconRobot } from "@/components/icons";
import { getSearchableCategories } from "@/data/categories";
import { getAllMakes } from "@/data/makes";
import { formatPostalInput, RADIUS_OPTIONS_KM } from "@/data/geo";
import { getModelsForMake } from "@/data/models";
import { tBodyType, tFuel, tTransmission } from "@/i18n/format";
import { useT } from "@/i18n/LanguageProvider";
import {
  describeIntent,
  intentToQuery,
  parseSmartIntent,
} from "@/lib/smartSearch";
import { cn } from "@/lib/utils";
import type { SiteCaseId } from "@/types";

type HomeSearchPanelProps = {
  /** Si true, soumet vers /search. Sinon, filtre la page d'accueil via callback. */
  onFilterChange?: (params: URLSearchParams) => void;
  liveFilter?: boolean;
};

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
const yearOptions = Array.from({ length: 16 }, (_, i) => 2026 - i);
const mileageOptions = [25000, 50000, 75000, 100000, 150000];

function buildParams(values: {
  intent: string;
  postalCode: string;
  radiusKm: string;
  category: string;
  make: string;
  model: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  mileageMax: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  excludeDamaged: boolean;
  sporty: boolean;
  reliable: boolean;
  offer: boolean;
}) {
  const params = new URLSearchParams();

  if (values.intent.trim()) {
    const parsed = parseSmartIntent(values.intent);
    Object.entries(intentToQuery(parsed)).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
  }

  if (values.postalCode.trim()) {
    params.set("postalCode", values.postalCode.trim());
    params.set("radiusKm", values.radiusKm || "100");
  }
  if (values.category) params.set("category", values.category);
  if (values.make) params.set("make", values.make);
  if (values.model.trim()) params.set("model", values.model.trim());
  if (values.priceMin) params.set("priceMin", values.priceMin);
  if (values.priceMax) params.set("priceMax", values.priceMax);
  if (values.yearMin) params.set("yearMin", values.yearMin);
  if (values.yearMax) params.set("yearMax", values.yearMax);
  if (values.mileageMax) params.set("mileageMax", values.mileageMax);
  if (values.fuel) params.set("fuel", values.fuel);
  if (values.transmission) params.set("transmission", values.transmission);
  if (values.bodyType) params.set("bodyType", values.bodyType);
  params.set("excludeDamaged", values.excludeDamaged ? "1" : "0");
  if (values.sporty) params.set("sporty", "1");
  if (values.reliable) params.set("reliable", "1");
  if (values.offer) params.set("offer", "1");
  if (!params.get("sort")) params.set("sort", "newest");

  return params;
}

export function HomeSearchPanel({
  onFilterChange,
  liveFilter = false,
}: HomeSearchPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const t = useT();
  const makes = useMemo(() => getAllMakes(), []);

  const [intent, setIntent] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [radiusKm, setRadiusKm] = useState("100");
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");
  const [mileageMax, setMileageMax] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [excludeDamaged, setExcludeDamaged] = useState(true);
  const [sporty, setSporty] = useState(false);
  const [reliable, setReliable] = useState(false);
  const [offer, setOffer] = useState(false);

  const models = useMemo(() => getModelsForMake(make || undefined), [make]);

  const chips = intent.trim() ? describeIntent(parseSmartIntent(intent)) : [];

  const notifyFilterChange = useEffectEvent((params: URLSearchParams) => {
    if (liveFilter && onFilterChange) {
      onFilterChange(params);
    }
  });

  useEffect(() => {
    const nextCategory = searchParams.get("category") ?? "";
    const nextOffer = searchParams.get("offer") === "1";
    setCategory(nextCategory);
    setOffer(nextOffer);
    const nextPostal = searchParams.get("postalCode") ?? "";
    const nextRadius = searchParams.get("radiusKm") ?? "100";
    setPostalCode(nextPostal);
    setRadiusKm(nextRadius);
    setMake(searchParams.get("make") ?? "");
    setModel(searchParams.get("model") ?? "");
    setPriceMin(searchParams.get("priceMin") ?? "");
    setPriceMax(searchParams.get("priceMax") ?? "");
    setYearMin(searchParams.get("yearMin") ?? "");
    setYearMax(searchParams.get("yearMax") ?? "");
    setMileageMax(searchParams.get("mileageMax") ?? "");
    setFuel(searchParams.get("fuel") ?? "");
    setTransmission(searchParams.get("transmission") ?? "");
    setBodyType(searchParams.get("bodyType") ?? "");
    setExcludeDamaged(searchParams.get("excludeDamaged") !== "0");
    setSporty(searchParams.get("sporty") === "1");
    setReliable(searchParams.get("reliable") === "1");
    setIntent(searchParams.get("intent") ?? "");

    const params = buildParams({
      intent: searchParams.get("intent") ?? "",
      postalCode: nextPostal,
      radiusKm: nextRadius,
      category: nextCategory,
      make: searchParams.get("make") ?? "",
      model: searchParams.get("model") ?? "",
      priceMin: searchParams.get("priceMin") ?? "",
      priceMax: searchParams.get("priceMax") ?? "",
      yearMin: searchParams.get("yearMin") ?? "",
      yearMax: searchParams.get("yearMax") ?? "",
      mileageMax: searchParams.get("mileageMax") ?? "",
      fuel: searchParams.get("fuel") ?? "",
      transmission: searchParams.get("transmission") ?? "",
      bodyType: searchParams.get("bodyType") ?? "",
      excludeDamaged: searchParams.get("excludeDamaged") !== "0",
      sporty: searchParams.get("sporty") === "1",
      reliable: searchParams.get("reliable") === "1",
      offer: nextOffer,
    });
    notifyFilterChange(params);
  }, [pathname, searchKey, searchParams]);

  function currentValues() {
    return {
      intent,
      postalCode,
      radiusKm,
      category,
      make,
      model,
      priceMin,
      priceMax,
      yearMin,
      yearMax,
      mileageMax,
      fuel,
      transmission,
      bodyType,
      excludeDamaged,
      sporty,
      reliable,
      offer,
    };
  }

  function emit(next?: Partial<ReturnType<typeof currentValues>>) {
    const values = { ...currentValues(), ...next };
    const params = buildParams(values);
    if (liveFilter && onFilterChange) {
      onFilterChange(params);
    }
  }

  function goSearch(event: FormEvent) {
    event.preventDefault();
    const params = buildParams(currentValues());
    if (liveFilter && onFilterChange) {
      onFilterChange(params);
      return;
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      id="recherche"
      onSubmit={goSearch}
      className="w-full scroll-mt-28 space-y-4"
    >
      <div className="flex items-center gap-3 rounded-full border border-line bg-white px-3 py-2.5 shadow-lg sm:px-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-soft text-blue">
          <IconRobot className="h-5 w-5" />
        </span>
        <input
          value={intent}
          onChange={(e) => {
            setIntent(e.target.value);
          }}
          placeholder={t.search.placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:text-base"
        />
        <button
          type="submit"
          className="btn-primary !px-4 !py-2.5 text-sm sm:!px-5"
        >
          <span className="hidden sm:inline">{t.search.search}</span>
          <IconArrow className="h-4 w-4" />
        </button>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 px-1">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-blue-soft px-3 py-1 text-xs font-medium text-blue-deep"
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      <div className="card-soft p-4 sm:p-5">
        <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
          {t.search.filters}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="grid grid-cols-[1.4fr_1fr] gap-3 sm:col-span-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                {t.search.postalCode}
              </span>
              <input
                value={postalCode}
                onChange={(e) => {
                  const next = formatPostalInput(e.target.value);
                  setPostalCode(next);
                  emit({ postalCode: next });
                }}
                placeholder={t.search.postalPlaceholder}
                className="field uppercase"
                maxLength={7}
                autoComplete="postal-code"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                {t.search.radius}
              </span>
              <select
                value={radiusKm}
                onChange={(e) => {
                  setRadiusKm(e.target.value);
                  emit({ radiusKm: e.target.value });
                }}
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
            <span className="mb-1 block text-[11px] font-semibold text-muted">
              {t.search.category}
            </span>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                emit({ category: e.target.value });
              }}
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

          <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                {t.search.make}
              </span>
              <select
                value={make}
                onChange={(e) => {
                  const nextMake = e.target.value;
                  setMake(nextMake);
                  setModel("");
                  emit({ make: nextMake, model: "" });
                }}
                className="field"
              >
                <option value="">{t.search.allMakes}</option>
                {makes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                {t.search.model}
              </span>
              <select
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                  emit({ model: e.target.value });
                }}
                className="field"
                disabled={!make}
              >
                <option value="">
                  {make ? t.search.allModels : t.search.chooseMake}
                </option>
                {models.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                {t.search.yearMin}
              </span>
              <select
                value={yearMin}
                onChange={(e) => {
                  setYearMin(e.target.value);
                  emit({ yearMin: e.target.value });
                }}
                className="field"
              >
                <option value="">{t.search.none}</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                {t.search.yearMax}
              </span>
              <select
                value={yearMax}
                onChange={(e) => {
                  setYearMax(e.target.value);
                  emit({ yearMax: e.target.value });
                }}
                className="field"
              >
                <option value="">{t.search.none}</option>
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
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                {t.search.priceMin}
              </span>
              <input
                type="number"
                min={0}
                step={500}
                inputMode="numeric"
                placeholder="10000"
                value={priceMin}
                onChange={(e) => {
                  setPriceMin(e.target.value);
                  emit({ priceMin: e.target.value });
                }}
                className="field"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                {t.search.priceMax}
              </span>
              <input
                type="number"
                min={0}
                step={500}
                inputMode="numeric"
                placeholder="25000"
                value={priceMax}
                onChange={(e) => {
                  setPriceMax(e.target.value);
                  emit({ priceMax: e.target.value });
                }}
                className="field"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted">
              {t.search.bodyType}
            </span>
            <select
              value={bodyType}
              onChange={(e) => {
                setBodyType(e.target.value);
                emit({ bodyType: e.target.value });
              }}
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
            <span className="mb-1 block text-[11px] font-semibold text-muted">
              {t.search.mileageMax}
            </span>
            <select
              value={mileageMax}
              onChange={(e) => {
                setMileageMax(e.target.value);
                emit({ mileageMax: e.target.value });
              }}
              className="field"
            >
              <option value="">{t.search.none}</option>
              {mileageOptions.map((km) => (
                <option key={km} value={km}>
                  {km.toLocaleString("fr-CA")} km
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted">
              {t.search.fuel}
            </span>
            <select
              value={fuel}
              onChange={(e) => {
                setFuel(e.target.value);
                emit({ fuel: e.target.value });
              }}
              className="field"
            >
              <option value="">{t.search.allFuels}</option>
              {fuels.map((item) => (
                <option key={item} value={item}>
                  {tFuel(t, item)}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted">
              {t.search.transmission}
            </span>
            <select
              value={transmission}
              onChange={(e) => {
                setTransmission(e.target.value);
                emit({ transmission: e.target.value });
              }}
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

        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              [
                t.search.excludeDamaged,
                excludeDamaged,
                setExcludeDamaged,
                "excludeDamaged",
              ],
              [t.search.sporty, sporty, setSporty, "sporty"],
              [t.search.reliable, reliable, setReliable, "reliable"],
              [t.search.offers, offer, setOffer, "offer"],
            ] as const
          ).map(([label, active, setActive, key]) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                const next = !active;
                setActive(next);
                emit({ [key]: next });
              }}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
                active
                  ? "bg-blue text-white"
                  : "bg-paper-deep text-ink-soft hover:bg-blue-soft hover:text-blue-deep",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
