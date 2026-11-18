"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import {
  IconCalendar,
  IconCar,
  IconChevron,
  IconSwap,
  IconTag,
  IconUsers,
  IconWrench,
} from "@/components/icons";
import { categories } from "@/data/categories";
import { useT } from "@/i18n/LanguageProvider";
import type { SiteCaseId } from "@/types";

const icons: Record<SiteCaseId, ComponentType<SVGProps<SVGSVGElement>>> = {
  buy: IconCar,
  vendre: IconTag,
  location: IconCalendar,
  "lease-takeover": IconSwap,
  inspection: IconWrench,
  "location-particulier": IconUsers,
};

export function CategoryGrid() {
  const t = useT();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {categories.map((category) => {
        const Icon = icons[category.id];
        return (
          <Link
            key={category.id}
            href={category.href}
            className="card-soft group relative flex min-h-[110px] flex-col justify-between p-4 transition hover:-translate-y-0.5 hover:border-blue/30"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-soft text-blue">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="font-display text-sm font-semibold leading-snug text-blue-navy">
                {t.categories[category.id]}
              </p>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue transition group-hover:bg-blue group-hover:text-white">
                <IconChevron className="h-4 w-4" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
