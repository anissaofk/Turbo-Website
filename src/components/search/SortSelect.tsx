"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "newest";

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span className="whitespace-nowrap">Sort by</span>
      <select
        value={current}
        onChange={(event) => onChange(event.target.value)}
        className="field w-auto min-w-[10rem] py-2"
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="mileage-asc">Mileage ↑</option>
        <option value="year-desc">Year ↓</option>
      </select>
    </label>
  );
}
