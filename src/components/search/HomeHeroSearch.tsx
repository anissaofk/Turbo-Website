"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrow } from "@/components/icons";
import { categories } from "@/data/categories";
import { formatPostalInput, RADIUS_OPTIONS_KM } from "@/data/geo";
import { getAllMakes } from "@/data/makes";
import { getModelsForMake } from "@/data/models";
import { useT } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import type { SiteCaseId } from "@/types";

const BODY_SHORTCUTS = [
  { id: "VUS", labelKey: "suv" as const },
  { id: "Berline", labelKey: "sedan" as const },
  { id: "Compacte", labelKey: "hatch" as const },
  { id: "Sportive", labelKey: "sport" as const },
  { id: "Familiale", labelKey: "wagon" as const },
  { id: "Cabriolet", labelKey: "convertible" as const },
] as const;

export function HomeHeroSearch() {
  const router = useRouter();
  const t = useT();
  const makes = useMemo(() => getAllMakes(), []);

  const [postalCode, setPostalCode] = useState("");
  const [radiusKm, setRadiusKm] = useState("100");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const models = useMemo(() => getModelsForMake(make || undefined), [make]);

  function goSearch(event?: FormEvent) {
    event?.preventDefault();
    const params = new URLSearchParams();
    params.set("category", "buy");
    if (postalCode.trim()) {
      params.set("postalCode", postalCode.trim());
      params.set("radiusKm", radiusKm || "100");
    }
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    params.set("sort", "newest");
    router.push(`/search?${params.toString()}`);
  }

  function goBody(bodyType: string) {
    const params = new URLSearchParams({
      category: "buy",
      bodyType,
      sort: "newest",
    });
    if (postalCode.trim()) {
      params.set("postalCode", postalCode.trim());
      params.set("radiusKm", radiusKm || "100");
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
      <form
        onSubmit={goSearch}
        className="animate-rise rounded-[1.5rem] border border-white/40 bg-white/95 p-4 shadow-[0_20px_50px_rgba(10,31,68,0.22)] backdrop-blur-md sm:p-5"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted uppercase">
              {t.home.makeModel}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel("");
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
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
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
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted uppercase">
              {t.search.postalCode}
            </span>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(formatPostalInput(e.target.value))}
              placeholder={t.search.postalPlaceholder}
              className="field uppercase"
              maxLength={7}
              autoComplete="postal-code"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted uppercase">
              {t.search.radius}
            </span>
            <select
              value={radiusKm}
              onChange={(e) => setRadiusKm(e.target.value)}
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

        <button
          type="submit"
          className="btn-primary mt-4 w-full justify-center gap-2 text-base"
        >
          {t.home.seeVehicles}
          <IconArrow className="h-4 w-4" />
        </button>
      </form>

      <div className="animate-rise delay-1 mt-5 flex flex-wrap justify-center gap-2">
        {BODY_SHORTCUTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goBody(item.id)}
            className={cn(
              "rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur transition",
              "hover:bg-white hover:text-blue-navy",
            )}
          >
            {t.home.bodyTypes[item.labelKey]}
          </button>
        ))}
      </div>

      <div className="animate-rise delay-2 mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="rounded-2xl border border-white/20 bg-white/10 px-3 py-3 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-blue-navy"
          >
            {t.categories[cat.id as SiteCaseId]}
          </Link>
        ))}
      </div>
    </div>
  );
}
