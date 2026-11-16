"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrow, IconRobot } from "@/components/icons";
import { categories } from "@/data/categories";
import { getLocations } from "@/data/cars";
import { getAllMakes } from "@/data/makes";
import { getModelsForMake } from "@/data/models";
import {
  describeIntent,
  intentToQuery,
  parseSmartIntent,
} from "@/lib/smartSearch";
import { cn } from "@/lib/utils";

type HomeSearchPanelProps = {
  /** Si true, soumet vers /search. Sinon, filtre la page d'accueil via callback. */
  onFilterChange?: (params: URLSearchParams) => void;
  liveFilter?: boolean;
};

function buildParams(values: {
  intent: string;
  category: string;
  make: string;
  model: string;
  priceMin: string;
  priceMax: string;
  monthlyMax: string;
  location: string;
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

  if (values.category) params.set("category", values.category);
  if (values.make) params.set("make", values.make);
  if (values.model.trim()) params.set("model", values.model.trim());
  if (values.priceMin) params.set("priceMin", values.priceMin);
  if (values.priceMax) params.set("priceMax", values.priceMax);
  if (values.monthlyMax) params.set("monthlyMax", values.monthlyMax);
  if (values.location) params.set("location", values.location);
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
  const makes = useMemo(() => getAllMakes(), []);
  const locations = useMemo(() => getLocations(), []);

  const [intent, setIntent] = useState("");
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [monthlyMax, setMonthlyMax] = useState("");
  const [location, setLocation] = useState("");
  const [sporty, setSporty] = useState(false);
  const [reliable, setReliable] = useState(false);
  const [offer, setOffer] = useState(false);

  const models = useMemo(() => getModelsForMake(make || undefined), [make]);

  const chips = intent.trim() ? describeIntent(parseSmartIntent(intent)) : [];

  function currentValues() {
    return {
      intent,
      category,
      make,
      model,
      priceMin,
      priceMax,
      monthlyMax,
      location,
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
    <form onSubmit={goSearch} className="w-full space-y-4">
      {/* 1. Barre de recherche */}
      <div className="flex items-center gap-3 rounded-full border border-line bg-white px-3 py-2.5 shadow-lg sm:px-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-soft text-blue">
          <IconRobot className="h-5 w-5" />
        </span>
        <input
          value={intent}
          onChange={(e) => {
            setIntent(e.target.value);
          }}
          placeholder="Rechercher une voiture… Ex. : sportive fiable à moins de 700 $/mois"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:text-base"
        />
        <button
          type="submit"
          className="btn-primary !px-4 !py-2.5 text-sm sm:!px-5"
        >
          <span className="hidden sm:inline">Rechercher</span>
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

      {/* 2. Filtres en dessous */}
      <div className="card-soft p-4 sm:p-5">
        <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
          Filtres
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted">
              Catégorie
            </span>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                emit({ category: e.target.value });
              }}
              className="field"
            >
              <option value="">Toutes</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.short}
                </option>
              ))}
            </select>
          </label>

          {/* Marque + Modèle côte à côte */}
          <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                Marque
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
                <option value="">Toutes</option>
                {makes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                Modèle
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
                  {make ? "Tous les modèles" : "Choisir une marque"}
                </option>
                {models.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold text-muted">
                Prix min ($)
              </span>
              <input
                type="number"
                min={0}
                step={500}
                inputMode="numeric"
                placeholder="Ex. : 10000"
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
                Prix max ($)
              </span>
              <input
                type="number"
                min={0}
                step={500}
                inputMode="numeric"
                placeholder="Ex. : 25000"
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
              Max $/mois
            </span>
            <select
              value={monthlyMax}
              onChange={(e) => {
                setMonthlyMax(e.target.value);
                emit({ monthlyMax: e.target.value });
              }}
              className="field"
            >
              <option value="">Aucun</option>
              <option value="400">400 $</option>
              <option value="500">500 $</option>
              <option value="700">700 $</option>
              <option value="900">900 $</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted">
              Ville
            </span>
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                emit({ location: e.target.value });
              }}
              className="field"
            >
              <option value="">Partout</option>
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["Sportive", sporty, setSporty, "sporty"],
              ["Fiable", reliable, setReliable, "reliable"],
              ["Offres", offer, setOffer, "offer"],
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
