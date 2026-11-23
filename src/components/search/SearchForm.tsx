"use client";

import { getMakes } from "@/data/cars";
import { getSearchableCategories } from "@/data/categories";
import { useT } from "@/i18n/LanguageProvider";
import type { SiteCaseId } from "@/types";

export function SearchForm() {
  const t = useT();
  const makes = getMakes();
  const cats = getSearchableCategories();

  return (
    <form
      action="/search"
      method="get"
      className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_auto]"
    >
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          {t.search.category}
        </span>
        <select name="category" defaultValue="" className="field">
          <option value="">{t.search.allCategories}</option>
          {cats.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {t.categories[cat.id as SiteCaseId]}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          {t.search.make}
        </span>
        <select name="make" defaultValue="" className="field">
          <option value="">{t.search.allMakes}</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end">
        <button type="submit" className="btn-primary w-full">
          {t.search.search}
        </button>
      </div>
    </form>
  );
}
