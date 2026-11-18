"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useT } from "@/i18n/LanguageProvider";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useT();
  const current = searchParams.get("sort") ?? "newest";

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span className="whitespace-nowrap">{t.search.sortLabel}</span>
      <select
        value={current}
        onChange={(event) => onChange(event.target.value)}
        className="field w-auto min-w-[12rem] py-2"
      >
        <option value="newest">{t.search.sortNewest}</option>
        <option value="oldest">{t.search.sortOldest}</option>
        <option value="price-asc">{t.search.sortPriceAsc}</option>
        <option value="price-desc">{t.search.sortPriceDesc}</option>
        <option value="mileage-asc">{t.search.sortMileageAsc}</option>
        <option value="mileage-desc">{t.search.sortMileageDesc}</option>
        <option value="year-desc">{t.search.sortYearDesc}</option>
        <option value="monthly-asc">{t.search.sortMonthlyAsc}</option>
      </select>
    </label>
  );
}
